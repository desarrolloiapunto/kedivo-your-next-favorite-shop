// Utility functions for combining CSS classes
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility functions for WooCommerce GraphQL data normalization

export interface NormalizedProduct {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  sku?: string;
  price?: string;
  regularPrice?: string;
  salePrice?: string;
  stockStatus?: string;
  stockQuantity?: number;
  type?: string;
  status?: string;
  featured?: boolean;
  catalogVisibility?: string;
  purchasable?: boolean;
  virtual?: boolean;
  downloadable?: boolean;
  externalUrl?: string;
  buttonText?: string;
  reviewsAllowed?: boolean;
  averageRating?: number;
  reviewCount?: number;
  // Campos calculados para el diseño
  discount?: number; // Porcentaje de descuento
  isNational?: boolean; // Envío nacional vs internacional
  isNew?: boolean; // Producto nuevo
  shippingDays?: string; // Texto de días de envío
  image?: {
    sourceUrl: string;
    altText?: string;
  };
  galleryImages?: Array<{
    sourceUrl: string;
    altText?: string;
  }>;
  categories?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  attributes?: Array<{
    id: string;
    name: string;
    label?: string;
    options?: string[];
    position?: number;
    visible?: boolean;
    variation?: boolean;
  }>;
  variations?: Array<any>;
  metaData?: Array<{
    key: string;
    value: string;
  }>;
}

// Helper functions for product calculations
export function cleanPrice(price: string | undefined): number {
  if (!price) return 0;

  // Remover símbolos de moneda, espacios y caracteres HTML
  const cleaned = price
    .replace(/[$,]/g, "") // Remover $ y ,
    .replace(/&nbsp;/g, "") // Remover &nbsp;
    .replace(/\s+/g, "") // Remover espacios
    .trim();

  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

function calculateDiscount(
  regularPrice: string | undefined,
  salePrice: string | undefined,
): number | undefined {
  if (!regularPrice || !salePrice) return undefined;

  const regular = cleanPrice(regularPrice);
  const sale = cleanPrice(salePrice);

  if (regular <= 0 || sale >= regular) return undefined;

  return Math.round(((regular - sale) / regular) * 100);
}

function determineShipping(product: any): {
  isNational: boolean;
  shippingDays: string;
} {
  // Lógica para determinar envío nacional vs internacional
  // Basado en metadata, atributos o precio del producto

  // Verificar metadata específica para envío
  const shippingMeta = product.metaData?.find(
    (meta: any) =>
      meta.key === "_shipping_zone" || meta.key === "shipping_zone",
  );

  if (shippingMeta) {
    const isNational =
      shippingMeta.value.toLowerCase().includes("nacional") ||
      shippingMeta.value.toLowerCase().includes("colombia");
    const shippingDays = isNational ? "2-4 días" : "15-20 días";
    return { isNational, shippingDays };
  }

  // Verificar atributos de envío
  const shippingAttribute = product.attributes?.find(
    (attr: any) =>
      attr.name?.toLowerCase().includes("envio") ||
      attr.name?.toLowerCase().includes("shipping"),
  );

  if (shippingAttribute && shippingAttribute.options) {
    const hasInternational = shippingAttribute.options.some(
      (option: string) =>
        option.toLowerCase().includes("internacional") ||
        option.toLowerCase().includes("internacional"),
    );

    if (hasInternational) {
      // Si tiene opción internacional, asumimos internacional por defecto
      return { isNational: false, shippingDays: "15-20 días" };
    }
  }

  // Lógica basada en precio: productos caros tienden a ser importados
  const price = parseFloat(product.price || "0");
  if (price > 500000) {
    // Productos > $500.000 tienden a ser importados
    return { isNational: false, shippingDays: "15-20 días" };
  }

  // Por defecto nacional para productos colombianos
  return { isNational: true, shippingDays: "2-4 días" };
}

function isNewProduct(product: any): boolean {
  // Lógica para determinar si un producto es "nuevo"
  // Por defecto usamos el campo featured, pero se puede mejorar
  return product.featured || false;
}

// Normalize WooCommerce GraphQL product data to a consistent structure
export function normalizeProduct(product: any): NormalizedProduct {
  const discount = calculateDiscount(product.regularPrice, product.salePrice);
  const { isNational, shippingDays } = determineShipping(product);
  const isNew = isNewProduct(product);

  return {
    id: product.id,
    databaseId: product.databaseId,
    name: product.name,
    slug: product.slug,
    description: product.description,
    shortDescription: product.shortDescription,
    sku: product.sku,
    price: product.price,
    regularPrice: product.regularPrice,
    salePrice: product.salePrice,
    stockStatus: product.stockStatus,
    stockQuantity: product.stockQuantity,
    type: product.type,
    status: product.status,
    featured: product.featured,
    catalogVisibility: product.catalogVisibility,
    purchasable: product.purchasable,
    virtual: product.virtual,
    downloadable: product.downloadable,
    externalUrl: product.externalUrl,
    buttonText: product.buttonText,
    reviewsAllowed: product.reviewsAllowed,
    averageRating: parseFloat(product.averageRating) || 0,
    reviewCount: product.reviewCount,
    // Campos calculados
    discount,
    isNational,
    isNew,
    shippingDays,
    image: product.image
      ? {
          sourceUrl: product.image.sourceUrl,
          altText: product.image.altText,
        }
      : undefined,
    galleryImages:
      product.galleryImages?.nodes?.map((img: any) => ({
        sourceUrl: img.sourceUrl,
        altText: img.altText,
      })) || [],
    categories:
      product.productCategories?.nodes?.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })) || [],
    tags:
      product.productTags?.nodes?.map((tag: any) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
      })) || [],
    attributes:
      product.attributes?.nodes?.map((attr: any) => ({
        id: attr.id,
        name: attr.name,
        label: attr.label,
        options: attr.options,
        position: attr.position,
        visible: attr.visible,
        variation: attr.variation,
      })) || [],
    variations: product.variations?.nodes || [],
    metaData:
      product.metaData?.map((meta: any) => ({
        key: meta.key,
        value: meta.value,
      })) || [],
  };
}

// Normalize array of products
export function normalizeProducts(products: any[]): NormalizedProduct[] {
  return products.map(normalizeProduct);
}

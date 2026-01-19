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

// Normalize WooCommerce GraphQL product data to a consistent structure
export function normalizeProduct(product: any): NormalizedProduct {
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

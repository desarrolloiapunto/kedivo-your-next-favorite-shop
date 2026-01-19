import { useQuery } from "@tanstack/react-query";
import {
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCTS_BY_CATEGORY,
} from "@/lib/queries";
import { normalizeProducts, normalizeProduct } from "@/lib/utils";

// Función helper para hacer requests GraphQL con configuración de WooGraphQL
const makeGraphQLRequest = async (query: string, variables?: any) => {
  const response = await fetch(
    `${import.meta.env.VITE_WORDPRESS_URL}/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(
      `GraphQL errors: ${data.errors.map((e: any) => e.message).join(", ")}`,
    );
  }

  return data.data;
};

// Hook para obtener conteo de productos por categoría
export const useCategoryCounts = () => {
  return useQuery({
    queryKey: ["category-counts"],
    queryFn: async () => {
      // Obtener todos los productos para contar por categoría
      const data = await makeGraphQLRequest(GET_PRODUCTS, {
        first: 1000, // Obtener muchos productos para conteo preciso
      });

      const products = data.products.nodes;

      // Contar productos por categoría
      const categoryCounts: Record<string, number> = {};

      products.forEach((product: any) => {
        if (product.productCategories?.nodes) {
          product.productCategories.nodes.forEach((cat: any) => {
            categoryCounts[cat.slug] = (categoryCounts[cat.slug] || 0) + 1;
          });
        }
      });

      return categoryCounts;
    },
  });
};

export const useCategoriesGraphQL = (first: number = 20) => {
  const { data: countsData } = useCategoryCounts();

  return useQuery({
    queryKey: ["categories-graphql", first],
    queryFn: () => makeGraphQLRequest(GET_CATEGORIES, { first }),
    select: (data) => {
      return data.productCategories.nodes.map((category: any) => ({
        ...category,
        count: countsData?.[category.slug] || 0,
      }));
    },
  });
};

// Hook para cargar TODOS los productos usando paginación del servidor
export const useProductsGraphQL = (variables?: {
  first?: number;
  after?: string;
  where?: any;
}) => {
  return useQuery({
    queryKey: ["products-graphql-all"],
    queryFn: async () => {
      try {
        const allProducts: any[] = [];
        let hasNextPage = true;
        let endCursor: string | null = null;

        // Cargar productos por páginas hasta obtener todos
        while (hasNextPage && allProducts.length < 1000) {
          // Límite de seguridad
          const data = await makeGraphQLRequest(GET_PRODUCTS, {
            first: 100, // Máximo por página que permite GraphQL
            after: endCursor,
            where: variables?.where,
          });

          if (data.products.nodes) {
            allProducts.push(...data.products.nodes);
          }

          hasNextPage = data.products.pageInfo?.hasNextPage || false;
          endCursor = data.products.pageInfo?.endCursor || null;
        }

        console.log("Total products loaded:", allProducts.length);

        return {
          nodes: allProducts,
          pageInfo: {
            hasNextPage: false,
            endCursor: null,
          },
        };
      } catch (error) {
        console.error("GraphQL Error:", error);
        // Fallback: devolver datos vacíos
        return { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } };
      }
    },
    staleTime: 5 * 60 * 1000, // Cache por 5 minutos
    gcTime: 10 * 60 * 1000, // Garbage collection después de 10 minutos
  });
};

export const useProductGraphQL = (
  id: string | number,
  idType: string = "SLUG",
) => {
  return useQuery({
    queryKey: ["product-graphql", id, idType],
    queryFn: () =>
      makeGraphQLRequest(GET_PRODUCT, {
        id: id.toString(),
        idType,
      }),
    select: (data) => data.product,
    enabled: !!id,
  });
};

export const useProductsByCategoryGraphQL = (
  categorySlug: string,
  variables?: {
    first?: number;
    after?: string;
  },
) => {
  return useQuery({
    queryKey: ["products-by-category", categorySlug, variables],
    queryFn: () =>
      makeGraphQLRequest(GET_PRODUCTS_BY_CATEGORY, {
        category: categorySlug,
        first: variables?.first || 20,
        after: variables?.after,
      }),
    select: (data) => data.products,
    enabled: !!categorySlug,
  });
};

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

export const useProductsGraphQL = (variables?: {
  first?: number;
  after?: string;
  where?: any;
}) => {
  return useQuery({
    queryKey: ["products-graphql", variables],
    queryFn: async () => {
      try {
        // Usar la query completa que funciona
        const data = await makeGraphQLRequest(GET_PRODUCTS, {
          first: variables?.first || 20,
          after: variables?.after,
          where: variables?.where,
        });
        return data.products;
      } catch (error) {
        console.error("GraphQL Error:", error);
        // Fallback: devolver datos vacíos
        return { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } };
      }
    },
    select: (data) => data,
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

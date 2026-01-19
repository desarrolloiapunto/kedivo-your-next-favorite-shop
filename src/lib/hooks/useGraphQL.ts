import { useQuery } from "@tanstack/react-query";
import {
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCTS_BY_CATEGORY,
} from "@/lib/queries";

// Función helper para hacer requests GraphQL con configuración de WooGraphQL
const makeGraphQLRequest = async (query: string, variables?: any) => {
  const response = await fetch(
    `${import.meta.env.VITE_WORDPRESS_URL}/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Incluir cookies para sesiones de usuario según WooGraphQL docs
        credentials: "include",
      },
      credentials: "include", // Importante para sesiones de usuario
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

export const useCategoriesGraphQL = (first: number = 20) => {
  return useQuery({
    queryKey: ["categories-graphql", first],
    queryFn: () => makeGraphQLRequest(GET_CATEGORIES, { first }),
    select: (data) => data.productCategories.nodes,
  });
};

export const useProductsGraphQL = (variables?: {
  first?: number;
  after?: string;
  where?: any;
}) => {
  return useQuery({
    queryKey: ["products-graphql", variables],
    queryFn: () =>
      makeGraphQLRequest(GET_PRODUCTS, {
        first: variables?.first || 20,
        after: variables?.after,
        where: variables?.where,
      }),
    select: (data) => data.products,
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

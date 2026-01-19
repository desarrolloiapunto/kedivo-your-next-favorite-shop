import { useQuery } from "@tanstack/react-query";
import { GET_CATEGORIES, GET_PRODUCTS, GET_PRODUCT } from "@/lib/queries";

export const useCategoriesGraphQL = () => {
  return useQuery({
    queryKey: ["categories-graphql"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_WORDPRESS_URL}/graphql`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: GET_CATEGORIES,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      return data.data.productCategories.nodes;
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
      const response = await fetch(
        `${import.meta.env.VITE_WORDPRESS_URL}/graphql`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: GET_PRODUCTS,
            variables: {
              first: variables?.first || 20,
              after: variables?.after,
              where: variables?.where,
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      return data.data.products.nodes;
    },
  });
};

export const useProductGraphQL = (id: string | number) => {
  return useQuery({
    queryKey: ["product-graphql", id],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_WORDPRESS_URL}/graphql`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: GET_PRODUCT,
            variables: { id: id.toString() },
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const data = await response.json();
      return data.data.product;
    },
    enabled: !!id,
  });
};

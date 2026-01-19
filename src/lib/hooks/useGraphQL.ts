import { useQuery } from "@apollo/client";
import { GET_CATEGORIES, GET_PRODUCTS, GET_PRODUCT } from "@/lib/queries";

export const useCategoriesGraphQL = () => {
  return useQuery(GET_CATEGORIES, {
    fetchPolicy: "cache-first",
  });
};

export const useProductsGraphQL = (variables?: {
  first?: number;
  after?: string;
  where?: any;
}) => {
  return useQuery(GET_PRODUCTS, {
    variables: {
      first: variables?.first || 20,
      after: variables?.after,
      where: variables?.where,
    },
    fetchPolicy: "cache-first",
  });
};

export const useProductGraphQL = (id: string | number) => {
  return useQuery(GET_PRODUCT, {
    variables: { id: id.toString() },
    fetchPolicy: "cache-first",
    skip: !id,
  });
};

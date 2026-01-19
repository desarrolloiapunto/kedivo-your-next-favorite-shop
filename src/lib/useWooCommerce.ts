import { useQuery } from "@tanstack/react-query";

const WC_API_BASE = `${import.meta.env.VITE_WORDPRESS_URL}/wp-json/wc/v3`;

interface WooCommerceConfig {
  consumerKey: string;
  consumerSecret: string;
}

const getWooCommerceConfig = (): WooCommerceConfig => ({
  consumerKey: import.meta.env.VITE_WC_CONSUMER_KEY,
  consumerSecret: import.meta.env.VITE_WC_CONSUMER_SECRET,
});

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const config = getWooCommerceConfig();
      const response = await fetch(
        `${WC_API_BASE}/products/categories?consumer_key=${config.consumerKey}&consumer_secret=${config.consumerSecret}&per_page=100`,
      );
      if (!response.ok) throw new Error("Failed to fetch categories");
      return response.json();
    },
  });
};

export const useProducts = (params?: {
  category?: string;
  per_page?: number;
  page?: number;
}) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const config = getWooCommerceConfig();
      const queryParams = new URLSearchParams({
        consumer_key: config.consumerKey,
        consumer_secret: config.consumerSecret,
        per_page: (params?.per_page || 20).toString(),
        ...(params?.page && { page: params.page.toString() }),
        ...(params?.category && { category: params.category }),
      });

      const response = await fetch(`${WC_API_BASE}/products?${queryParams}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    },
  });
};

export const useProduct = (id: string | number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const config = getWooCommerceConfig();
      const response = await fetch(
        `${WC_API_BASE}/products/${id}?consumer_key=${config.consumerKey}&consumer_secret=${config.consumerSecret}`,
      );
      if (!response.ok) throw new Error("Failed to fetch product");
      return response.json();
    },
    enabled: !!id,
  });
};

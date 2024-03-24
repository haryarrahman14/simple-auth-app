import queries from "@/const/queries";
import {
  getProducts,
  getProductsByCategory,
  getProductsCategories,
} from "@/client/api/products";
import {
  ProductsCategoriesResponse,
  ProductsParams,
  ProductsResponse,
} from "@/client/models/products";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useGetProducts = (
  params: ProductsParams,
  options?: Omit<UseQueryOptions<ProductsResponse>, "queryKey" | "queryFn">
) => {
  const queryKey = queries.products.list(params).queryKey;

  if (params?.category) {
    return useQuery<ProductsResponse, Error>({
      queryKey,
      queryFn: () => getProductsByCategory(params),
      ...options,
    });
  }

  return useQuery<ProductsResponse, Error>({
    queryKey,
    queryFn: () => getProducts(params),
    ...options,
  });
};

export const useGetProductsCategories = (
  options?: Omit<
    UseQueryOptions<ProductsCategoriesResponse>,
    "queryKey" | "queryFn"
  >
) => {
  const queryKey = queries.products.categories.queryKey;

  return useQuery<ProductsCategoriesResponse, Error>({
    queryKey,
    queryFn: () => getProductsCategories(),
    ...options,
  });
};

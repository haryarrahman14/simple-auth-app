import queries from "@/const/queries";
import {
  getProductDetail,
  getProducts,
  getProductsByCategory,
  getProductsCategories,
} from "@/client/api/products";
import {
  ProductResponse,
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

  return useQuery<ProductsResponse, Error>({
    queryKey,
    queryFn: () =>
      params?.category ? getProductsByCategory(params) : getProducts(params),
    ...options,
  });
};

export const useGetProductDetail = (
  id: string,
  options?: Omit<UseQueryOptions<ProductResponse>, "queryKey" | "queryFn">
) => {
  const queryKey = queries.products.detail(id).queryKey;

  return useQuery<ProductResponse, Error>({
    queryKey,
    queryFn: () => getProductDetail(id),
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

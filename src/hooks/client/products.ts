import queries from "@/const/queries";
import { getProducts } from "@/client/api/products";
import { ProductsParams, ProductsResponse } from "@/client/models/products";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useGetProducts = (
  params: ProductsParams,
  options?: Omit<UseQueryOptions<ProductsResponse>, "queryKey" | "queryFn">
) => {
  const queryKey = queries.products.list(params).queryKey;

  return useQuery<ProductsResponse, Error>({
    queryKey,
    queryFn: () => getProducts(params),
    ...options,
  });
};

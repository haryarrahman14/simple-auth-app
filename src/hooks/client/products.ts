import queries from "@/const/queries";
import { getProducts } from "@/client/api/products";
import { ProductsParams } from "@/client/models/products";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useGetProducts = (
  params: ProductsParams,
  options?: UseQueryOptions
) => {
  const queryKey = queries.products.list(params).queryKey;

  const fetchData = () => {
    return getProducts(params);
  };

  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchData(),
    ...options,
  });
};

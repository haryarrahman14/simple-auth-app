import queries from "@/const/queries";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { CartsParams, CartsResponse } from "@/client/models/carts";
import { getCarts } from "@/client/api/carts";

export const useGetCarts = (
  params: CartsParams,
  options?: Omit<UseQueryOptions<CartsResponse>, "queryKey" | "queryFn">
) => {
  const queryKey = queries.carts.list(params).queryKey;

  return useQuery<CartsResponse, Error>({
    queryKey,
    queryFn: () => getCarts(params),
    ...options,
  });
};

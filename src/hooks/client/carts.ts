import queries from "@/const/queries";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import {
  CartsParams,
  CartsResponse,
  PostCartBody,
} from "@/client/models/carts";
import { getCarts, postCart } from "@/client/api/carts";

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

export const usePostCart = () => {
  return useMutation({
    mutationFn: (body: PostCartBody) => postCart(body),
  });
};

import queries from "@/const/queries";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { PostUsersBody, UserResponse } from "@/client/models/users";
import { getUsersDetail, postUsers } from "@/client/api/users";

export const useGetUsersDetail = (
  id: string,
  options?: Omit<UseQueryOptions<UserResponse>, "queryKey" | "queryFn">
) => {
  const queryKey = queries.users.detail(id).queryKey;

  return useQuery<UserResponse, Error>({
    queryKey,
    queryFn: () => getUsersDetail(id),
    ...options,
  });
};

export const usePostUsers = () => {
  return useMutation({
    mutationFn: (body: PostUsersBody) => postUsers(body),
  });
};

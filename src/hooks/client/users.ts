import { useMutation } from "@tanstack/react-query";
import { PostUsersBody } from "@/client/models/users";
import { postUsers } from "@/client/api/users";

export const usePostUsers = () => {
  return useMutation({
    mutationFn: (body: PostUsersBody) => postUsers(body),
  });
};

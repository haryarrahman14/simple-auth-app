import { useMutation } from "@tanstack/react-query";
import { LoginBody } from "@/client/models/login";
import { postLogin } from "@/client/api/login";

export const usePostLogin = () => {
  return useMutation({
    mutationFn: (body: LoginBody) => postLogin(body),
  });
};

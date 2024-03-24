import { useMutation } from "@tanstack/react-query";
import { postLogout } from "@/client/api/logout";
import { useRouter } from "next/navigation";

export const usePostLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => router.push("/login"),
  });
};

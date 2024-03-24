import client from "./client";
import { LoginBody } from "@/client/models/login";

export const postLogin = (body: LoginBody) => {
  return client.post("/api/login", body);
};

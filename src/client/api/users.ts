import client from "./client";
import { PostUsersBody } from "../models/users";

export const postUsers = (body: PostUsersBody) => {
  return client.post("/api/register", body);
};

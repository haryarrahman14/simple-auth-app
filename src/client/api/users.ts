import client from "./client";
import { PostUsersBody, UserResponse } from "../models/users";

export const postUsers = (body: PostUsersBody) => {
  return client.post("/api/register", body);
};

export const getUsersDetail = (id: string): Promise<UserResponse> => {
  return client.get(`/api/users/${id}`);
};

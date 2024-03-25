import client from "./client";
import { CartsParams, CartsResponse, PostCartBody } from "../models/carts";

export const getCarts = (params: CartsParams): Promise<CartsResponse> => {
  return client.get("/api/carts", {
    params,
  });
};

export const postCart = (body: PostCartBody): Promise<PostCartBody> => {
  return client.post("/api/carts", body);
};

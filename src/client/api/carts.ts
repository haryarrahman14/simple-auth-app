import client from "./client";
import { CartsParams, CartsResponse } from "../models/carts";

export const getCarts = (params: CartsParams): Promise<CartsResponse> => {
  return client.get("/api/carts", {
    params,
  });
};

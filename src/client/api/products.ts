import client from "./client";
import { ProductsParams } from "../models/products";

export const getProducts = (params: ProductsParams) => {
  return client.get("/api/products", {
    params,
  });
};

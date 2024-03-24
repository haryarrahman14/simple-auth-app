import client from "./client";
import { ProductsParams, ProductsResponse } from "../models/products";

export const getProducts = (
  params: ProductsParams
): Promise<ProductsResponse> => {
  return client.get("/api/products", {
    params,
  });
};

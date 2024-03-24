import client from "./client";
import {
  ProductsCategoriesResponse,
  ProductsParams,
  ProductsResponse,
} from "../models/products";

export const getProducts = (
  params: ProductsParams
): Promise<ProductsResponse> => {
  return client.get("/api/products", {
    params,
  });
};

export const getProductsByCategory = (
  params: ProductsParams
): Promise<ProductsResponse> => {
  return client.get(`/api/products/category/${params?.category}`, {
    params,
  });
};

export const getProductsCategories =
  (): Promise<ProductsCategoriesResponse> => {
    return client.get("/api/products/categories");
  };

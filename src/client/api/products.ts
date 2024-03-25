import client from "./client";
import {
  Product,
  ProductResponse,
  ProductsCategoriesResponse,
  ProductsParams,
  ProductsResponse,
} from "../models/products";
import { useMutation } from "@tanstack/react-query";

export const getProducts = (
  params: ProductsParams
): Promise<ProductsResponse> => {
  return client.get("/api/products", {
    params,
  });
};

export const getProductDetail = (id: string): Promise<ProductResponse> => {
  return client.get(`/api/products/${id}`);
};

export const getProductsByCategory = (
  params: ProductsParams
): Promise<ProductsResponse> => {
  return client.get(`/api/products/category/${params?.category}`, {
    params,
  });
};

export const deleteProduct = (id: string): Promise<ProductsResponse> => {
  return client.delete(`/api/products/${id}`);
};

export const getProductsCategories =
  (): Promise<ProductsCategoriesResponse> => {
    return client.get("/api/products/categories");
  };

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
  });
};

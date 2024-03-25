import { ResponseGlobal } from "./globals";

export interface ProductsParams {
  limit?: number;
  sort?: "asc" | "desc";
  category?: string;
}

export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export interface ProductResponse extends ResponseGlobal {
  data: Product;
}

export interface ProductsResponse extends ResponseGlobal {
  data: Product[];
}

export interface ProductsCategoriesResponse extends ResponseGlobal {
  data: string[];
}

import { ResponseGlobal } from "./globals";

export interface ProductsParams {
  limit?: number;
  sort?: "asc" | "desc";
}

export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export interface ProductsResponse extends ResponseGlobal {
  data: Product[];
}

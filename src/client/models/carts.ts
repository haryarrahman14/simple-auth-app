import { ResponseGlobal } from "./globals";

export interface CartsParams {
  limit?: number;
  sort?: "asc" | "desc";
  startdate?: string;
  enddate?: string;
}

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
}

export interface CartsResponse extends ResponseGlobal {
  data: Cart[];
}

export interface ProductsParams {
  limit?: number;
  sort?: "asc" | "desc";
}

export interface Products {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export type ProductsResponse = Products[];

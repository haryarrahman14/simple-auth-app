import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { ProductsParams } from "@/client/models/products";
import { CartsParams } from "@/client/models/carts";

const queries = createQueryKeyStore({
  products: {
    list: (params: ProductsParams) => [params],
    detail: (id: string) => [id],
    categories: ["categories"],
  },
  carts: {
    list: (params: CartsParams) => [params],
  },
  users: {
    detail: (id: string) => [id],
  },
});

export default queries;

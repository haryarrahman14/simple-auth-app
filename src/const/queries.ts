import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { ProductsParams } from "@/client/models/products";

const queries = createQueryKeyStore({
  products: {
    list: (params: ProductsParams) => [params],
    categories: ["categories"],
  },
});

export default queries;

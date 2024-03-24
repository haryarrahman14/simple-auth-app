"use client";

import { useGetProducts } from "@/hooks/client/products";

export default function ProductsPage() {
  useGetProducts({
    limit: 5,
  });
  return <>TEST AJJA</>;
}

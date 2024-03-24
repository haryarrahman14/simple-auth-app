import axios from "axios";
import { API_URL } from "@/const/env";
import { NextRequest, NextResponse } from "next/server";
import { ProductsParams } from "@/client/models/products";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  const limit = request.nextUrl.searchParams.get("limit");
  const sort = request.nextUrl.searchParams.get("sort");

  let params: ProductsParams = {};

  if (limit) {
    params.limit = parseInt(limit);
  }

  if (sort && ["asc", "desc"].includes(sort)) {
    params.sort = sort as ProductsParams["sort"];
  }

  return await axios
    .get(`${API_URL}/products/category/${category}`, {
      params,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return NextResponse.json(
        {
          message: "OK",
          data: response?.data,
        },
        {
          status: response?.status,
          statusText: "success",
        }
      );
    })
    .catch((reason) => {
      return NextResponse.json(
        {
          message: reason?.response?.data,
        },
        {
          status: reason?.status,
          statusText: "failed",
        }
      );
    });
}

import axios from "axios";
import { API_URL } from "@/const/env";
import { NextRequest, NextResponse } from "next/server";
import { ProductsParams } from "@/client/models/products";

export async function GET(request: NextRequest, { params }: any) {
  const { category } = params;
  const limit = request.nextUrl.searchParams.get("limit");
  const sort = request.nextUrl.searchParams.get("sort");

  let param: ProductsParams = {};

  if (limit) {
    param.limit = parseInt(limit);
  }

  if (sort && ["asc", "desc"].includes(sort)) {
    param.sort = sort as ProductsParams["sort"];
  }

  return await axios
    .get(`${API_URL}/products/category/${category}`, {
      params: param,
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

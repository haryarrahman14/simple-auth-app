import axios from "axios";
import { API_URL } from "@/const/env";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  return await axios
    .delete(`${API_URL}/products/${id}`, {
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

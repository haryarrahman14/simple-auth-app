import axios from "axios";
import { API_URL } from "@/const/env";
import { NextRequest, NextResponse } from "next/server";
import { CartsParams } from "@/client/models/carts";

export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get("limit");
  const sort = request.nextUrl.searchParams.get("sort");
  const startdate = request.nextUrl.searchParams.get("startdate");
  const enddate = request.nextUrl.searchParams.get("enddate");

  let params: CartsParams = {};

  if (limit) {
    params.limit = parseInt(limit);
  }

  if (sort && ["asc", "desc"].includes(sort)) {
    params.sort = sort as CartsParams["sort"];
  }

  if (startdate) {
    params.startdate = startdate;
  }

  if (enddate) {
    params.enddate = enddate;
  }

  return await axios
    .get(`${API_URL}/carts`, {
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

export async function POST(request: NextRequest) {
  const body = await request.json();

  return await axios
    .post(`${API_URL}/carts`, JSON.stringify(body), {
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

import { API_URL } from "@/const/env";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  return await axios
    .post(`${API_URL}/auth/login`, JSON.stringify(payload), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return Response.json(
        {
          data: {
            message: "OK",
            ...response?.data,
          },
        },
        {
          status: response?.status,
        }
      );
    })
    .catch((reason) => {
      return Response.json(
        {
          data: {
            message: "FAILED",
            error: reason?.response?.data,
          },
        },
        {
          status: reason?.status,
        }
      );
    });
}

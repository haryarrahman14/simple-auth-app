import axios from "axios";
import { API_URL } from "@/const/env";
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
      const res = NextResponse.json(
        {
          data: {
            message: "OK",
          },
        },
        {
          status: response?.status,
          statusText: "login successfully",
        }
      );

      res.cookies.set({
        name: "jwt",
        value: response?.data?.token,
        maxAge: 60 * 60 * 24,
        httpOnly: true,
      });

      return res;
    })
    .catch((reason) => {
      return NextResponse.json(
        {
          data: {
            message: reason?.response?.data,
          },
        },
        {
          status: reason?.status,
          statusText: "login failed",
        }
      );
    });
}

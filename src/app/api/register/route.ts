import axios from "axios";
import { API_URL } from "@/const/env";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();

  const hardcodePayload = {
    ...payload,
    address: {
      city: "kilcoole",
      street: "7835 new road",
      number: 3,
      zipcode: "12926-3874",
      geolocation: {
        lat: "-37.3159",
        long: "81.1496",
      },
    },
  };

  return await axios
    .post(`${API_URL}/users`, JSON.stringify(hardcodePayload), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return NextResponse.json(
        {
          data: {
            message: "OK",
            ...response?.data,
          },
        },
        {
          status: response?.status,
          statusText: "register successfully",
        }
      );
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
          statusText: "register failed",
        }
      );
    });
}

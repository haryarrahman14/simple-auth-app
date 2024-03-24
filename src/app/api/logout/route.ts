import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.json(
    {
      message: "OK",
    },
    {
      status: 200,
      statusText: "logout successfully",
    }
  );

  response.cookies.delete("jwt");

  return response;
}

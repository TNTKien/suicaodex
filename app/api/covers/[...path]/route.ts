import { NextRequest, NextResponse } from "next/server";

import { siteConfig } from "@/config/site";

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);

  const imagePath = pathname.replace("/api/covers/", "");
  if (!imagePath) return new NextResponse("Bad Request", { status: 400 });

  const targetUrl = `${siteConfig.mangadexAPI.webURL}/covers/${imagePath}`;
  console.log(targetUrl);

  try {
    const response = await fetch(targetUrl);

    const headers = new Headers(response.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    headers.delete("content-encoding");
    headers.delete("transfer-encoding");

    return new NextResponse(response.body, {
      status: response.status,
      headers: headers,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

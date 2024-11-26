import { siteConfig } from "@/config/site";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { pathname, search } = new URL(request.url);

  const proxyPath = pathname.replace("/api/mangadex/", "");

  if (!proxyPath) {
    return new NextResponse("Bad Request: Missing proxy path", { status: 400 });
  }

  const urlSearchParams = new URLSearchParams(search);
  urlSearchParams.forEach((_, key) => {
    if (key === "path") {
      urlSearchParams.delete(key);
    }
  });

  const sanitizedSearch = urlSearchParams.toString();

  const targetUrl = `${siteConfig.mangadexAPI.baseURL}/${proxyPath}${
    sanitizedSearch ? `?${sanitizedSearch}` : ""
  }`;

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        ...request.headers,
        "Content-Type": "application/json",
      },
      body: request.body,
    });

    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        ...response.headers,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

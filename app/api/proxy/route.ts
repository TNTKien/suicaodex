export async function GET(request: Request) {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get("url");

  if (!targetUrl) {
    return new Response("Bad Request: Missing target URL", { status: 400 });
  }

  const targetUrlObj = new URL(targetUrl);

  // Merge query parameters from the original request
  url.searchParams.forEach((value, key) => {
    if (key !== "url") {
      targetUrlObj.searchParams.append(key, value);
    }
  });

  const proxyRequest = new Request(targetUrlObj.toString(), {
    method: request.method,
    headers: {
      ...request.headers,
      // "User-Agent": "YourCustomUserAgent", // Ensure User-Agent header is present
    },
    body: request.body,
    redirect: "follow",
  });

  proxyRequest.headers.delete("Via"); // Remove Via header if present

  try {
    const response = await fetch(proxyRequest);

    // Create a new response to inject CORS headers
    const proxyResponse = new Response(JSON.stringify(await response.json()), {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...response.headers,
        "Access-Control-Allow-Origin": "*", // Inject CORS headers
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Content-Type": "application/json", // Ensure the response is JSON
      },
    });

    return proxyResponse;
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching the target URL" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

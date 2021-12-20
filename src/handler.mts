export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  return new Response(
    `request method: ${request.method}, url: ${url.pathname}`
  );
}

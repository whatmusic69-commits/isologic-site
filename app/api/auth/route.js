export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const siteUrl = "https://www.isologic.lv";
  const redirectUri = `${siteUrl}/api/callback`;

  if (!clientId) {
    return new Response("Missing GITHUB_CLIENT_ID", { status: 500 });
  }

  const url =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=repo`;

  return Response.redirect(url, 302);
}
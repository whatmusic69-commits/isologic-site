export async function GET(request) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new Response("Missing GITHUB_CLIENT_ID", { status: 500 });
  }

  const referer = request.headers.get("referer") || "";
  let openerOrigin = "https://www.isologic.lv";

  try {
    if (referer) {
      openerOrigin = new URL(referer).origin;
    }
  } catch {}

  const siteUrl = "https://www.isologic.lv";
  const redirectUri = `${siteUrl}/api/callback`;

  const state = Buffer.from(
    JSON.stringify({ openerOrigin }),
    "utf8"
  ).toString("base64url");

  const url =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=repo` +
    `&state=${encodeURIComponent(state)}`;

  return Response.redirect(url, 302);
}
export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response("Missing GitHub OAuth env vars", { status: 500 });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const data = await tokenRes.json();

  if (!data.access_token) {
    return new Response(
      `OAuth failed: ${JSON.stringify(data, null, 2)}`,
      {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }
    );
  }

  const token = data.access_token;

  const html = `
    <!doctype html>
    <html>
      <body>
        <script>
          (function () {
            if (window.opener) {
              window.opener.postMessage(
                "authorization:github:success:" + JSON.stringify({
                  token: "${token}",
                  provider: "github"
                }),
                "https://isologic.lv"
              );
            }
            window.close();
          })();
        </script>
      </body>
    </html>
  `;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
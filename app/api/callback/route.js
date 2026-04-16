export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response("Missing GitHub OAuth env vars", { status: 500 });
  }

  let openerOrigin = "https://www.isologic.lv";
  try {
    if (state) {
      const parsed = JSON.parse(Buffer.from(state, "base64url").toString("utf8"));
      if (parsed?.openerOrigin) openerOrigin = parsed.openerOrigin;
    }
  } catch {}

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

  const payload = JSON.stringify({
    token: data.access_token,
    provider: "github",
  });

  const html = `
    <!doctype html>
    <html>
      <body>
        <script>
          (function () {
            try {
              if (window.opener && !window.opener.closed) {
                window.opener.postMessage(
                  "authorization:github:success:" + ${JSON.stringify(payload)},
                  ${JSON.stringify(openerOrigin)}
                );
              }
            } catch (e) {
              document.body.innerText = "postMessage failed: " + e.message;
              return;
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
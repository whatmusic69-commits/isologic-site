function renderPopup(status, content) {
  const serialized = JSON.stringify(content);

  return `<!doctype html>
<html>
  <body>
    <script>
      (function () {
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(
            "authorization:github:${status}:${serialized}",
            window.location.origin
          );
          window.close();
        } else {
          document.body.innerText = "OAuth opener window was not found.";
        }
      })();
    </script>
  </body>
</html>`;
}

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

  if (data.error || !data.access_token) {
    return new Response(renderPopup("error", data), {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return new Response(
    renderPopup("success", {
      token: data.access_token,
      provider: "github",
    }),
    {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}
export default async function handler(req, res) {
  const code = req.query.code;

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json();

  const token = data.access_token;

  res.send(`
    <script>
      window.opener.postMessage(
        'authorization:github:success:${token}',
        '*'
      );
      window.close();
    </script>
  `);
}
export default async function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;

  const redirect_uri = `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/callback`;

  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=repo`;

  res.redirect(githubAuthURL);
}
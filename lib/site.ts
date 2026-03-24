export function getBaseUrl() {
  const env = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL;
  const base = env ? (env.startsWith("http") ? env : `https://${env}`) : "http://localhost:3000";
  return base.replace(/\/$/, "");
}


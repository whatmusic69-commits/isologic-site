import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Ensure Next doesn't infer an incorrect workspace root when other lockfiles exist higher up
  turbopack: {
    // Use the project directory as the root for resolution and builds
    root: __dirname,
  },
  // Align output file tracing with this project root (helps in monorepo-like setups or stray lockfiles)
  outputFileTracingRoot: __dirname,
};

export default nextConfig;

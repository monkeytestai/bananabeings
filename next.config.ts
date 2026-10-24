import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(import.meta.dirname),
  async rewrites() {
    // App Router ignores folders that start with "_", so the public
    // /__monkeytest/mode URL is served by a normal route handler.
    return [{ source: "/__monkeytest/mode", destination: "/api/monkeytest-mode" }];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Hanya jalankan compiler berat saat production build agar npm run dev tetap cepat
  reactCompiler: isProd,
  turbopack: {
    root: process.cwd(),
  },
  agentRules: false,
};

export default nextConfig;

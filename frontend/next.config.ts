import type { NextConfig } from "next";

const staticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  output: staticExport ? "export" : "standalone",
  poweredByHeader: false,
  ...(staticExport ? {
    trailingSlash: true,
    images: { unoptimized: true },
  } : {
    async headers() {
      return [{ source: '/:path*', headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Content-Security-Policy', value: "object-src 'none'; base-uri 'self'; frame-ancestors 'none'" },
      ] }, { source: '/admin/:path*', headers: [{ key: 'Cache-Control', value: 'no-store, private' }] }];
    },
    async rewrites() {
      return [
        { source: "/api/:path*", destination: `${process.env.API_INTERNAL_URL || "http://127.0.0.1:8000/api"}/:path*` },
        { source: "/healthz", destination: "http://127.0.0.1:8000/up" },
      ];
    },
  }),
};

export default nextConfig;

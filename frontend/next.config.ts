import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Docker standalone build
  output: 'standalone',

  // Redirects - serve static HTML files from public folder
  async redirects() {
    return [
      {
        source: '/',
        destination: '/paz-bem.html',
        permanent: false,
      },
      {
        source: '/academy',
        destination: '/academy.html',
        permanent: false,
      },
      {
        source: '/cursos/:path*',
        destination: '/curso-:path*.html',
        permanent: false,
      },
      {
        source: '/perguntas-biblia',
        destination: '/perguntas-biblia.html',
        permanent: false,
      },
      {
        source: '/perguntas-dificeis',
        destination: '/perguntas-dificeis.html',
        permanent: false,
      },
      {
        source: '/sala-teologica',
        destination: '/sala-teologica.html',
        permanent: false,
      },
    ];
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Captura chamadas feitas para /api/*
        // destination: "http://100.28.23.135:8888/:path*", // Redireciona para o backend de prod
        destination: "http://localhost:8888/:path*", // Redireciona para o backend local
      },
    ];
  },
};

export default nextConfig;

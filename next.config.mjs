/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Captura chamadas feitas para /api/*
        destination: "http://16.171.208.190:8888/:path*", // Redireciona para o backend de prod
        // destination: "http://localhost:8888/:path*", // Redireciona para o backend local
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['127.0.0.1', 'localhost'], // Agrega aquí tus hostnames permitidos
  },
};

export default nextConfig;

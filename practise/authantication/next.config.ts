/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://10.71.83.247:3000",
    "http://10.71.83.247",     // add without port as well
  ],
};

export default nextConfig;

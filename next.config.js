// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  // (varsa kendi mevcut ayarların burada kalsın)
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname), // <-- ALIAS: @ = proje kökü
    };
    return config;
  },
};

module

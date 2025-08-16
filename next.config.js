/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // @ = proje kökü (path değişkeni tanımlamadan çözüyoruz)
      '@': require('path').resolve(__dirname),
    };
    return config;
  },
};

module.exports = nextConfig;

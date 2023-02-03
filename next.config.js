/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Filter out default Next.js CSS rules:
    config.module.rules = config.module.rules.filter(r => !r.oneOf);

    // Add your own rules

    config.module.rules.push({
      test: /\.scss$/i,
      use: ['style-loader', 'css-loader'],
    })
    return config
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  /* sassOptions: {
    data: '@import "./scss/_variables.scss"',
    sourceMap: true,
  } */
}

/* Old Value */
/* webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  // Filter out default Next.js CSS rules:
  config.module.rules = config.module.rules.filter(r => !r.oneOf);

  // Add your own rules

  config.module.rules.push({
    test: /\.scss$/i,
    use: ['style-loader', 'css-loader'],
  })
  return config
},
sassOptions: {
  includePaths: [path.join(__dirname, 'styles')],
}, */

module.exports = nextConfig

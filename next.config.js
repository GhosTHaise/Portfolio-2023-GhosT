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
  env : {
    SANITY_PROJECT_ID : process.env.REACT_APP_SANITY_PROJECT_ID,
    SANITY_TOKEN : process.env.REACT_APP_SANITY_TOKEN
  }
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

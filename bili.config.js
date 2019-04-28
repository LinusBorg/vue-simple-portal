const { version } = require('./package/package.json')
/** @type {import('bili').Config} */
module.exports = {
  banner: `
/**
 * vue-simple-portal
 * version: ${version},
 * (c) Thorsten Lünborg, ${new Date().getFullYear()}
 * LICENCE: Apache-2.0
 * http://github.com/linusborg/vue-simple-portal
*/`,
  plugins: {
    commonjs: true,
    vue: true,
  },
  // bundleNodeModules: true,
  externals: ['nanoid'],
  globals: {
    vue: 'Vue',
  },
}

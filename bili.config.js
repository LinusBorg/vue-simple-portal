/** @type {import('bili').Config} */
module.exports = {
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

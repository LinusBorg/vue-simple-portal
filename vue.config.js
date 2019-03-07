module.exports = {
  lintOnSave: false,
  configureWebpack: {
    externals: {
      nanoid: {
        commonjs: 'nanoid',
        commonjs2: 'nanoid',
      },
    },
  },
}

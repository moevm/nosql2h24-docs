const { defineConfig } = require('@vue/cli-service');
const { DefinePlugin } = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        fs: 'empty',
      },
      fallback: {
        fs: false,
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('add_flag').use(DefinePlugin, [
      {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      },
    ]);
  },
});

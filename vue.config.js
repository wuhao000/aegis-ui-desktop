/**
 * @Author : Duyuntao
 * @Date : 2019/4/2
 * @Version : 1.0
 * @Content : 项目配置文件
 */

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const resolve = dir => {
  return path.join(__dirname, dir);
};
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css'];
const analyze = false;
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  runtimeCompiler: false,
  configureWebpack: (config) => {
    config.entry = {
      app: [
        './src/main.ts'
      ]
    };
    if (config.devServer) {
      config.devServer.port = 8021;
    } else {
      config.devServer = {
        port: 8021
      };
    }
    config.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 1024 * 30, // 30K
          minRatio: 0.8,
          exclude: /node_modules/
        })
    );
    config.externals = {
      'ant-design-vue': 'antd',
      'vue': 'Vue',
      'axios': 'axios',
      'core-js': 'CoreJS'
    };
    if (analyze) {
      config.plugins.push(new BundleAnalyzerPlugin({
        generateStatsFile: true,
        statsOptions: {
          source: true
        }
      }));
    }
  },
  chainWebpack: config => {
    config.resolve.alias
        .set('@ant-design/icons/lib/dist', resolve('src/icons.ts'))
        .set('@', resolve('src'))
        .set('_p', resolve('packages'))
        .set('_t', resolve('types'));
  }
};

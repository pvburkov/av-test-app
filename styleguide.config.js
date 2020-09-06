const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const defaultInclude = path.resolve(__dirname, 'src');

module.exports = {
  components: 'src/components/**/*.jsx',
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.jsx?$/, // loader for react
          exclude: '/node_modules/',
          loader: 'babel-loader'
        },
        {
          test: /\.css$/, // loader CSS
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        styles: path.resolve(__dirname, 'src/styles')
      },
      extensions: ['.js', '.jsx', '.css'],
      modules: [defaultInclude, 'node_modules']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html'
      })
    ]
  }
};

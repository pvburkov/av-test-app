const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const defaultInclude = path.resolve(__dirname, 'src');

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/, // loader CSS
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.jsx?$/, // loader for react
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      modules: path.resolve(__dirname, 'src/modules'),
      store: path.resolve(__dirname, 'src/store'),
      styles: path.resolve(__dirname, 'src/styles'),
      utils: path.resolve(__dirname, 'src/utils')
    },
    extensions: ['.js', '.jsx', '.css'],
    modules: [defaultInclude, 'node_modules']
  },
  target: 'electron-renderer',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  }
};
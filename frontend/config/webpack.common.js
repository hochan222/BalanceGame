const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CopyPlugin = require('copy-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  entry: {
    app: '/src/index.tsx',
  },
  output: {
    filename: '[name].bundle.[contenthash].js',
    path: path.resolve(__dirname, '../../backend/src/main/resources/static'),
    publicPath: '/',
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules\/(?!nanoid)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: 'last 2 version, > 1%, ie >= 10',
                },
              ],
              '@babel/react',
              '@babel/preset-typescript',
            ],
            plugins: [
              ['@babel/plugin-proposal-class-properties'],
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 3,
                  regenerator: true,
                },
              ],
              ['@babel/plugin-syntax-dynamic-import'],
            ],
          },
        },
      },
      {
        test: /\.(css|scss)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/[name].[ext]',
          },
        },
      },
      // {
      //   test: /\.(eot|svg|ttf|webp|woff|woff2|png|jpg|gif)$/i,
      //   loader: 'file-loader',
      //   options: {
      //     name: 'static/[name].[ext]',
      //   },
      // },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, `../env/.env.${process.env.ENV || 'local'}`),
      safe: false,
    }),
    new MiniCssExtractPlugin(),
    // new ImageMinimizerPlugin({
    //   minimizerOptions: {
    //     plugins: [['optipng', { optimizationLevel: 5 }]],
    //   },
    // }),
    new HtmlWebpackPlugin({
      template: '/public/index.html',
      filename: 'index.html',
      inject: 'body',
      environment: process.env.ENV,
    }),
    new HtmlWebpackPlugin({
      template: '/public/error.html',
      filename: 'error.html',
      inject: false,
    }),
    // new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
    //   STATIC_URL_C: 'http://localhost:0222',
    // }),
    new CopyPlugin({
      patterns: [
        { from: 'public/*.txt', to: 'public/../[name][ext]' },
        { from: 'public/*.xml', to: 'public/../[name][ext]' },
        { from: 'public/*.json', to: 'public/../[name][ext]' },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      src: path.resolve(__dirname, '../src/'),
      public: path.resolve(__dirname, '../public/'),
    },
    extensions: ['.js', '.jsx', '.json', '.tsx', '.ts'],
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
};

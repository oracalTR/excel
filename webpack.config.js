const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: [
        'core-js/stable',
        'regenerator-runtime/runtime',
        './index.js'
      ],
    },
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src', 'core'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyPlugin({
            patterns: [
              { 
                  from: path.resolve(__dirname, 'src', 'images'), 
                  to: path.resolve(__dirname, 'dist', 'images') },
            ],
          }),
          new MiniCssExtractPlugin({
            filename: 'css/style.css'
          }),
    ],
    module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              MiniCssExtractPlugin.loader,
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
          },
        ],
      },
    devServer: {
        hot: true,
        static: {
            directory: './dist',
            watch: true
        }
    }
};
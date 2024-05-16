const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const pluginChangeMapHash = require('./src/plugins/plugin-change-map-hash')
const CreateFileInfo = require('./src/plugins/plugin-create-file-info')

const config = {
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[chunkhash:5].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["./src/loaders/style-loader.js", "./src/loaders/css-loader.js"]
      },
      {
        test: /\.png$/,
        use: {
          loader: './src/loaders/file-loader.js',
          options: {
            limit: 1024 * 5,
            filename: 'img-[contenthash:5].[ext]',
            outputPath: '/imgs',
            publicPath: '/dist'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/html/index.html')
    }),
    new CleanWebpackPlugin(),
    new pluginChangeMapHash(),
    new CreateFileInfo(),
  ]
}

module.exports = config
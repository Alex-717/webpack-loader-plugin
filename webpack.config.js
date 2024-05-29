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
    new pluginChangeMapHash({
      changeFileHash (filePath, changeHashFn) {
        const sep = path.sep
        const array = filePath.split(sep)
        const nameSplitArray = array[array.length - 1].split('.')
        if (nameSplitArray.length >= 3) {
          const [hash, extname, mapExtname] = nameSplitArray.slice(-3)
          if (hash && extname === 'js') {
            const newHash = changeHashFn(hash)
            const newFileName = [...nameSplitArray.slice(0, -3), newHash, extname, mapExtname].join('.')
            array[array.length - 1] = newFileName
            return array.join(sep)
          }
        }
      }
    }),
    new CreateFileInfo(),
  ]
}

module.exports = config
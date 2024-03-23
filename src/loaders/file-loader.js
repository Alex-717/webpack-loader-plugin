const loaderUtils = require("loader-utils")

function fileLoader (buffer) {
  const size = buffer.length
  const { limit = 1024, filename = '[contenthash:8].[ext]', outputPath = '/', publicPath = '/dist'} = this.getOptions()
  let content = ''
  if (limit < size) {
    content = getfilePath.call(this, buffer, filename, outputPath, publicPath)
  } else {
    content = `data:image/png;base64,${buffer.toString('base64')}`
  }
  return `module.exports = '${content}'`
}
fileLoader.raw = true

function getfilePath (buffer, filename, outputPath, publicPath) {
  const pathName = loaderUtils.interpolateName(this, filename, { content: buffer })
  const assetKey = `${outputPath}/${pathName}`
  this.emitFile(assetKey, buffer)
  return `${publicPath}${assetKey}`
}

module.exports = fileLoader

class CreateFileInfo {
  constructor () {}
  apply (compiler) {
    compiler.hooks.emit.tap('CreateFileInfo', function (compilation) {
      const fileList = []
      for (const key in compilation.assets) {
        fileList.push(`${key}的大小：${(compilation.assets[key].size() / 1024).toFixed(2)}kb`)
      }

      const resultStr = fileList.join('\n')
      compilation.assets['fileInfo.txt'] = {
        source () {
          return resultStr
        },
        size () {
          return resultStr.length
        }
      }
    })
  }
}

module.exports = CreateFileInfo
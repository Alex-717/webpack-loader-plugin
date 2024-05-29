const path = require('path')

class pluginChangeMapHash{
  constructor ({ changeFileHash = null }) {
    this.customGetFileHash = changeFileHash
  }
  apply (compiler) {
    compiler.hooks.emit.tap('pluginChangeMapHash', (compilation) => {
      const assets = compilation.assets
      Object.entries(assets).forEach(([filePath, code]) => {
        if (isMapFile(filePath)) {
          const newFilePath = getNewFilePath.call(this, filePath, path.sep)
          if (!newFilePath) return
          assets[newFilePath] = code
          delete assets[filePath]
        }
      })
      // Object.entries(assets).forEach(([filePath, code]) => {
      //   console.log('filePath:', filePath)
      // })
    })
  }
}

function isMapFile (filePath) {
  if (path.extname(filePath) === '.map') return true
  return false
}

function getNewFilePath (filePath, sep = '/') {
  if (this.customChangeFileHash && typeof this.customChangeFileHash === 'function') {
    const newFileName = this.customChangeFileHash(filePath, changeHash)
    return newFileName
  }
  // 默认支持[name].[hash].js.map格式
  const array = filePath.split(sep)
  const nameSplitArray = array[array.length - 1].split('.')
  if (nameSplitArray.length >= 3) {
    const [hash, extname, mapExtname] = nameSplitArray.slice(-3)
    if (hash && extname === 'js') {
      const newHash = changeHash(hash)
      const newFileName = [...nameSplitArray.slice(0, -3), newHash, extname, mapExtname].join('.')
      array[array.length - 1] = newFileName
      return array.join(sep)
    }
  }
  return ''
}

function changeHash (hash) {
  if (!hash) return ''
  const reverseStr = hash.split('').reverse()
  let newHash = ''
  reverseStr.forEach(str => {
    const unicode = str.charCodeAt(0)
    const str16 = (unicode+1).toString(16)
    newHash += str16
  })
  return newHash
}

module.exports = pluginChangeMapHash
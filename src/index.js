

const webpackImg = require('./imgs/webpack.png')
const webpackImgCompressed = require('./imgs/webpack-compress.png')
require('./css/index.css')

function createImg (imgSource) {
  const img = document.createElement('img')
  img.onload = function () {
    document.body.appendChild(img)
  }
  img.src = imgSource
}

function createDiv (text, classes = []) {
  const div = document.createElement('div')
  classes.length && classes.forEach(it => {
    div.classList.add(it)
  })
  div.innerText = text
  document.body.appendChild(div)
}

function init () {
  createDiv("style-loader!css-loader", ['txt'])
  createImg(webpackImg)
  createImg(webpackImgCompressed)
}


init()


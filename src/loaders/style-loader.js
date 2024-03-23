
function styleLoader (code) {
  // 要使用\`${code}\`，不能使用'${code}'，因为code带格式的
  const result = `
  var style = document.createElement('style');
  style.innerHTML = \`${code}\`;
  document.head.appendChild(style);
  `
  return result
}

module.exports = styleLoader

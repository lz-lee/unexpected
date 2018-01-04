/**
 *
 * @param 目标对象 target
 * @param 拷贝对象 rest
 */
export function extend(target, ...rest) {
  for (let i = 0;i < rest.length; i++) {
    let source = rest[i]
    for (let k in source) {
      target[k] = source[k]
    }
  }
  return target
}

// 根据不同浏览器自动加样式前缀

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let k in transformNames) {
    if (elementStyle[transformNames[k]] !== undefined) {
      return k
    }
  }
  return false
})()

export fucntion prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    if (style === 'transitionEnd') {
      return 'transitionend'
    }
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substring(1)
}
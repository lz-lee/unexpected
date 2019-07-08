/**
 * 千位分隔，可以处理负数、整数、小数
 * @param {num} num
 */
export const milliFormat = num => {
  return num && num.toString().replace(/-?\d+/, (m) => {
    return m.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  })
}

// 或者使用 Number.prototype.toLocalString('en-US', options)
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString

/**
 *
 * @param {需要格式化的数字} num
 * @param {最小小数位位数} scale
 */
export const formatValue = (num, scale) => {
  return num && num.toLocalString('en-US', {
    minimumFractionDigits: scale
  })
}
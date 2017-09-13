/**
 * 交换数组元素，用于置顶 置底 
 */
export function swapeArr(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}

export function moveUp(arr，index) {
  if (index === 0) {
    return
  }
  swapeArr(arr, index, index - 1)
}
export function moveDown(arr，index) {
  if (index === arr.length - 1) {
    return
  }
  swapeArr(arr, index, index + 1)
}
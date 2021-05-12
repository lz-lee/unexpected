import { ObjectIS } from './impl-objectIs'

const hasOwnProperty = Object.prototype.hasOwnProperty


export function shallowEqual(objA, objB) {
  if (ObjectIS(objA, objB)) {
    return true
  }
  if (typeof objA !== 'object' || typeof objB !== 'object' || objA === null || objB === null) {
    return false
  }
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, objA[keysA[i]]) || !ObjectIS(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true
}
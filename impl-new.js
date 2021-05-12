const myNew = (fn, ...args) => {
  const obj = Object.create(fn.prototype)
  const result = fn.call(obj, ...args)
  return typeof result === 'object' ? result : obj
}
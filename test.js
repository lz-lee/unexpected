var BIG_ERROR = new Error('BIG_ERROR')

Promise.prototype.next = function(onResolved, onRejected) {
  return this.then(function(value) {
    if (value === BIG_ERROR) {
      return BIG_ERROR
    } else {
      return onResolved(value)
    }
  }, onRejected)
}

var mmm = Promise.resolve(9)
.next(function(value) {
  if (true) {
    return BIG_ERROR
  }
  // normal logic
})
.next(value => {
  // will never get called
  console.log('wd')
})

console.log(mmm)
// 这里 mmm 是 pending状态，会导致后面Promise链回调函数一直挂起，引起内存泄漏
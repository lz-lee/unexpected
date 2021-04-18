const setTimeout = (fn, delay, ...args) => {
  let start = performance.now()
  let timer
  const loop = (timestamp) => {
    timer = window.requestAnimationFrame(loop)
    if (timestamp - start >= delay) {
      // 到时间执行
      fn.apply(this,args)
      window.cancelAnimationFrame(timer)
    }
  }
  timer = window.requestAnimationFrame(loop)
  return timer
}

const setInterval = (fn, interval, ...args) => {
  let start = performance.now()
  let timer
  // 该回调函数会被传入DOMHighResTimeStamp参数，
  // 该参数与performance.now()的返回值相同
  // 它表示requestAnimationFrame() 开始去执行回调函数的时刻
  const loop = (timestamp) => {
    timer = window.requestAnimationFrame(loop)
    if (timestamp - start >= interval) {
      // 重新赋值，间隔执行
      start = performance.now()
      fn.apply(this, args)
    }
  }
  timer = window.requestAnimationFrame(loop)
  return timer
}

// setInterval(() => {
//     console.log('interval 1s')
// }, 1000)
// requestAnimationFrame 自带函数节流功能，基本可以保证在 16.6 毫秒内只执行一次（不掉帧的情况下, 即 回调函数执行次数通常是每秒 60 次），并且该函数的延时效果是精确的，没有其他定时器时间不准的问题
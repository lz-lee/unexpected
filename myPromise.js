function Promise(executor) {
  var self = this
  self.status = 'pending'   // Promise 的状态
  self.data = undefined     // Promise 的值
  self.onResolvedCallback = []  // resolve 的回调函数集
  self.onRejectedCallback = []  // reject 的回调函数集

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(function() {   // 异步调用
      if (self.status === 'pending') {
        self.status = 'resovled'
        self.data = value
        for (var i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    })
  }

  function reject(value) {
    setTimeout(function() {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = value
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](value)
        }
      }
    })
  }

  try {
    executor(resolve, reject)   // 执行器
  } catch (e) {
    reject(e)
  }
}
/**
 * promise主要解决程序，根据 x 的值来决定promise2的状态的函数
 * @param {*} promise
 * @param {*} x 为 promise2 = promise1.then(onResolved, onRejected) 里 resolve/reject 的返回值
 * @param {*} resolve
 * @param {*} reject
 */

function resolvePromise(promise, x, resolve, reject) {
  var then
  var isThenCalledOrThrow = false

  if (promise === x) {  // 2.3.1
    // then里不能返回 this
    return reject(new TypeError('promise 循环引用'))
  }

  if (x instanceof Promise) { // 2.3.2
    // 返回的 x 状态未确定
    if (x.status === 'pending') {
      x.then(function(val) {
        resolvePromise(promise2, val, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) { // 2.3.3
    // 返回的 x 是一个对象或函数
    try {
      then = x.then;  // 2.3.3.1

      if (typeof then === 'function') { // 2.3.3.3

        var resolveP = function(y) {
          if (isThenCalledOrThrow) return // 2.3.3.3 即这三处谁选执行就以谁的结果为准
          isThenCalledOrThrow = true

          return resolvePromise(promise2, y, resolve, reject) // 2.3.3.3.1
        }

        var rejectP = function(r) {
          if (isThenCalledOrThrow) return // 2.3.3.3 即这三处谁选执行就以谁的结果为准
          isThenCalledOrThrow = true

          return reject(r)  // 2.3.3.3.2
        }

        // 2.3.3.3 即这三处谁选执行就以谁的结果为准
        then.call(x, resolveP, rejectP)
      } else {
        // then 非函数，即x 不是一个thenable对象，直接resolve x值
        resolve(x)  // 2.3.3.4
      }
    } catch (e) {   // 2.3.3.2
      if (isThenCalledOrThrow) return // 2.3.3.3 即这三处谁选执行就以谁的结果为准
      isThenCalledOrThrow = true

      return reject(e)
    }
  } else {  // 2.3.4
    // then 不是对象/函数，直接resolve x作为结果
    resolve(x)
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  var self = this
  var promise2
  // then 接受函数为参数
  // 值穿透，then默认参数就把值往后传或者抛出
  onResolved = typeof onResolved === 'function' ? onResolved : function(value) {return value}
  onRejected = typeof onRejected === 'function' ? onRejected : function(reason) {throw reason}

  if (self.status === 'resolved') {
    // this的状态为resolved，调用onResolved，考虑throw，用try-catch
    return promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          var x = onResolved(self.data)
          // 如果返回一个Promise对象，则取它的结果作为promose2的结果
          // if (x instanceof Promise) {
          //   x.then(resolve, reject)
          // }
          // // 否则以它的返回值作为promise2的结果
          // resolve(x)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          // 如果出错
          reject(e)
        }
      })
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          var x = onRejected(self.data)
          // if (x instanceof Promise) {
          //   x.then(resolve, reject)
          // }
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  if (self.status === 'pending') {
    return promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        try {
          var x = onResolved(self.data)
          // if (x instanceof Promise) {
          //   x.then(resolve, reject)
          // }
          // resolve(x)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })

      self.onRejectedCallback.push(function(reason) {
        try {
          var x = onRejected(self.data)
          // if (x instanceof Promise) {
          //   x.then(resolve, reject)
          // }
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    var count = 0
    var len = promises.length
    var result = []

    for (var i = 0; i < len; i++) {
      (function(i){
        Promise.resolve(promises(i)).then(val => {
          count++
          result[i] = val

          if (count === len) {
            return resolve(result)
          }
        }, reason => {
          return reject(reason)
        })
      })(i)
    }
  })
}

Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (var i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(val => {
        resolve(val)
      }, reason => {
        reject(reason)
      })
    }
  })
}

Promise.resolve = function(val) {
  if (val instanceof Promise) {
    return val
  }
  return new Promise((resolve, reject) => {
    resolve(val)
  })
}

Promise.reject = function(reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}
// 如何停止一个Promise
// https://github.com/xieranmaya/blog/issues/5

// (function() {
//   var STOP_VALUE = {}
//   // 停止的Promise
//   var STOP_PROMISE = Promise.resolve(STOP_VALUE)

//   Promise.prototype._then = Promise.prototype.then

//   // 现实一个stop方法，返回一个resolve状态的Promise
//   Promise.stop = function() {
//     return STOP_PROMISE
//   }

//   // 重写then并在回调函数里面判断value是否与stop方法返回的值相等
//   Promise.prototype.then = function(onResolved, onRejected) {
//     return this._then(function(value) {
//       console.log('value === ' + value)
//       // 如果相等，则返回停止的Promise，（而这个停止的Promise是resolve状态，所以后面的Promise链都不会执行）; 否则执行回调
//       return value === STOP_VALUE ? STOP_VALUE : onResolved(value)
//     }, onRejected)
//   }
// })()

// Promise.resolve(8).then(v => {
//   console.log(v)
//   return 9
// }).then(v => {
//   console.log(v)
//   return Promise.stop()
// }).catch(() => {
//   console.log('catch')
// }).then(() => {
//   console.log('then')
// })

var p3 = new Promise( function(resolve,reject){
  resolve( "B" );
} );
// var p1 = new Promise( function(resolve,reject){
//          resolve( p3 );
// } );

var p1 = Promise.resolve(p3)
var p2 = new Promise( function(resolve,reject){
  resolve( "A" );
} );

console.log(p3, '1')
console.log(p1, 'p1')
p1.then( function(v){
  console.log( v );
} );

console.log(p3, '2')
console.log(p1, 'p11')
p2.then((v) => console.log(v))

console.log(p3, '3')
console.log(p1, 'p111')
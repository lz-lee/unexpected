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
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
          // 否则以它的返回值作为promise2的结果
          resolve(x)
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
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
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
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })

      self.onRejectedCallback.push(function(reason) {
        try {
          var x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
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

// 如何停止一个Promise
// https://github.com/xieranmaya/blog/issues/5

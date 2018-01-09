/**
 * 基于状态机的promise 实现
 */

const PENDING = 0
const FULFILLED = 1
const REJECTED = 2

function Promise(fn) {

  // 存储状态信息
  let state = PENDING

  // 存储 FULFILLED 或 REJECTED 时带来的数据
  let value = null

  // 存储 then 时调用的成功或失败回调
  let handlers = []

  function fulfill(result) {
    state = FULFILLED
    value = result
  }

  function reject(error) {
    state = REJECTED
    value = error
  }

  function resolve(result) {
    // resolve 可接受一个 promise 或 基础类型
    try {
      let then = getThen(result)
      if (then) {
        // 当 resolve 一个 promise 时，递归 resolve 待解析的 promise
        doResolve(then.bind(result), resolve, reject)
        return
      }
      fulfill(result)
    } catch (err) {
      reject(err)
    }
  }

  function handle(handler) {
    if (state = PENDING) {
      handlers.push(handler)
    } else {
      if (state === FULFILLED && typeof handler.onFulfilled === 'function') {
        handler.onFulfilled()
      }
      if (state === REJECTED && typeof handler.onRejected === 'function') {
        handler.onRejected()
      }
    }
  }

  /**
   *
   * onFulfilled 与 onRejected 只有一个被调用
   * 总是异步调用
   *  调用done的执行世杰与promise 的状态无关
   */
  this.done = function(onFulfilled, onRejected) {
    setTimeout(() => {
      handle({
        onFulfilled,
        onRejected
      })
    }, 0)
  }

  // 注意这里then 使用的是done来完成的，并未解决 promise是microtask的问题
  this.then = function (onFulfilled, onRejected) {
    const _this = this
    return new Promise(function (resolve, reject) {
      return _this.done(function (result) {
        if (typeof onFulfilled === 'function') {
          try {
            return resolve(onFulfilled(result))
          } catch (ex) {
            return reject(ex)
          }
        } else return resolve(result)
      }, function (error) {
        if (typeof onRejected === 'function') {
          try {
            return resolve(onRejected(error))
          } catch (ex) {
            return reject(ex)
          }
        } else return reject(error)
      })
    })
  }

  doResolve(fn, resolve, reject)
}

/**
 * 检查一个值是否为 promise
 * 若为 promise 则返回该 promise 的 then 方法
 * @param {promise | any} value
 * @return {function | null}
 */
function getThen(value) {
  let t = typeof value
  if (value && (t === 'object' || t === 'function')) {
    // 如果是 promise
    const then = value.then
    if (typeof then === 'function') return then
  }
  return null
}

/**
 * 传入一个需被 resolve 的函数，该函数可成功 或 拒绝
 * 确保 onFulfilled 和 onRejected 只会被调用一次
 * 不保证该函数一定会被异步执行
 *
 * @param {function} fn
 * @param {function} onFulfilled
 * @param {function} onRejected
 */
function doResolve(fn, onFulfilled, onRejected) {
  let done = false
  try {
    fn(function(value) {
      if (done) return
      done = true
      // 执行由 resolve 传入的 成功 回调
      onFulfilled(value)
    }, function(reason) {
      if (done) return
      done = true
      onRejected(reason)
    })
  } catch (err) {
    if (done) return
    done = true
    onRejected(err)
  }
}
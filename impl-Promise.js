function Promise(executor) {
    if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function');
    }
    if (new.target === undefined) {
        throw new TypeError('Promise must use by new');
    }
    var self = this;
    self.status = 'pending'; // Promise 的状态
    self.data = undefined; // Promise 的值
    self.onResolvedCallback = []; // resolve 的回调函数集
    self.onRejectedCallback = []; // reject 的回调函数集

    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject);
        }
        setTimeout(function () {
            // 异步调用
            if (self.status === 'pending') {
                self.status = 'resovled';
                self.data = value;
                for (var i = 0; i < self.onResolvedCallback.length; i++) {
                    self.onResolvedCallback[i](value);
                }
            }
        });
    }

    function reject(value) {
        setTimeout(function () {
            if (self.status === 'pending') {
                self.status = 'rejected';
                self.data = value;
                for (var i = 0; i < self.onRejectedCallback.length; i++) {
                    self.onRejectedCallback[i](value);
                }
            }
        });
    }

    try {
        executor(resolve, reject); // 执行器
    } catch (e) {
        reject(e);
    }
}

Promise.prototype.then = function (onResolved, onRejected) {
    var self = this;
    var promise2;
    // then 接受函数为参数
    // 值穿透，then默认参数就把值往后传或者抛出
    onResolved =
        typeof onResolved === 'function'
            ? onResolved
            : function (value) {
                  return value;
              };
    onRejected =
        typeof onRejected === 'function'
            ? onRejected
            : function (reason) {
                  throw reason;
              };

    if (self.status === 'pending') {
        return (promise2 = new Promise(function (resolve, reject) {
            self.onResolvedCallback.push(function () {
                try {
                    var x = onResolved(self.data);
                    // if (x instanceof Promise) {
                    //   x.then(resolve, reject)
                    // }
                    // resolve(x)
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });

            self.onRejectedCallback.push(function () {
                try {
                    var x = onRejected(self.data);
                    // if (x instanceof Promise) {
                    //   x.then(resolve, reject)
                    // }
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        }));
    }

    if (self.status === 'resolved') {
        // this的状态为resolved，调用onResolved，考虑throw，用try-catch
        return (promise2 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    var x = onResolved(self.data);
                    // 如果返回一个Promise对象，则取它的结果作为promose2的结果
                    // if (x instanceof Promise) {
                    //   x.then(resolve, reject)
                    // }
                    // // 否则以它的返回值作为promise2的结果
                    // resolve(x)
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    // 如果出错
                    reject(e);
                }
            });
        }));
    }

    if (self.status === 'rejected') {
        return (promise2 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    var x = onRejected(self.data);
                    // if (x instanceof Promise) {
                    //   x.then(resolve, reject)
                    // }
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        }));
    }
};

/**
 * promise A+ 规范
 * https://promisesaplus.com/
 * promise主要解决程序，根据 x 的值来决定 promise2 的状态的函数
 * @param {*} promise
 * @param {*} x 为 promise2 = promise1.then(onResolved, onRejected) 里 onResolved/onRejected 的返回值
 * @param {*} resolve
 * @param {*} reject
 */

function resolvePromise(promise2, x, resolve, reject) {
    var then;
    var isThenCalledOrThrow = false;

    if (promise2 === x) {
        // 2.3.1
        // then里不能返回 this
        return reject(new TypeError('promise 循环引用'));
    }

    if (x instanceof Promise) {
        // 2.3.2
        // 返回的 x 状态未确定
        if (x.status === 'pending') {
            x.then(function (val) {
                resolvePromise(promise2, val, resolve, reject);
            }, reject);
        } else {
            x.then(resolve, reject);
        }
    } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        // 2.3.3
        // 返回的 x 是一个对象或函数
        try {
            then = x.then; // 2.3.3.1

            if (typeof then === 'function') {
                // 2.3.3.3

                var resolveP = function (y) {
                    if (isThenCalledOrThrow) return; // 2.3.3.3.3 即这三处谁先执行就以谁的结果为准
                    isThenCalledOrThrow = true;

                    return resolvePromise(promise2, y, resolve, reject); // 2.3.3.3.1
                };

                var rejectP = function (r) {
                    if (isThenCalledOrThrow) return; // 2.3.3.3.3 即这三处谁先执行就以谁的结果为准
                    isThenCalledOrThrow = true;

                    return reject(r); // 2.3.3.3.2
                };

                // 2.3.3.3 即这三处谁先执行就以谁的结果为准
                then.call(x, resolveP, rejectP);
            } else {
                // then 非函数，即 x 不是一个thenable对象，直接 resolve x值
                resolve(x); // 2.3.3.4
            }
        } catch (e) {
            // 2.3.3.2
            if (isThenCalledOrThrow) return; // 2.3.3.3.4 即这三处谁先执行就以谁的结果为准, 如果 call then 跑出错误，如果resolveP / rejectP 已经执行，则忽略，即 isThenCalledOrThrow 已经为 true
            isThenCalledOrThrow = true;

            return reject(e);
        }
    } else {
        // 2.3.4
        // then 不是对象/函数，直接resolve x作为结果
        resolve(x);
    }
}

Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
};

// 适合彼此相互依赖或者在其中任何一个reject时立即结束。
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        var count = 0;
        var len = promises.length;
        var result = [];

        for (var i = 0; i < len; i++) {
            (function (i) {
                Promise.resolve(promises(i)).then(
                    (val) => {
                        count++;
                        result[i] = val;

                        if (count === len) {
                            return resolve(result);
                        }
                    },
                    (reason) => {
                        return reject(reason);
                    },
                );
            })(i);
        }
        // for (const [i, promise] of promises) {
        //   Promise.resolve(promise).then(res => {
        //       count++;
        //       result[i] = res;
        //       if (count === len) {
        //           return resolve(result);
        //       }
        //   }, err => {
        //     reject(err);
        //   });
        // }
    });
};

// 返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果, 彼此不依赖
Promise.allSettled = function (promises) {
    return new Promise((resolve, reject) => {
        let len = promises.length;
        const result = []
        const getStatus = () => {
            if (--len === 0) {
                resolve(result)
            }
        }
        for (const [i, promise] of promises) {
            Promise.resolve(promise).then(
                (val) => {
                    result[i] = { status: 'fulfilled', value: val}
                    getStatus()
                },
                (err) => {
                    result[i] = { status: 'rejected', reason: err }
                    getStatus()
                })
        }
    })
}

Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (var i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(
                (val) => {
                    resolve(val);
                },
                (reason) => {
                    reject(reason);
                },
            );
        }
    });
};

Promise.resolve = function (val) {
    if (val instanceof Promise) {
        return val;
    }
    let promise
    return (promise = new Promise((resolve, reject) => {
        resolvePromise(promise, val, resolve, reject);
    }));
};

Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
};

Promise.finally = function(cb) {
    return this.then(
        (value) => {
            return Promise.resolve(cb()).then(() => value);
        },
        (err) => {
            return Promise.resolve(cb()).then(() => {
                throw err
            })
        }
    )
}
// 如何停止一个Promise, 即不执行promise链后续的promise的 resolve / reject 方法
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
//       // 如果相等，则返回 STOP_VALUE，不调用 onResolved.即相当于 new Promise((resovle, reject) => { return 2; 这里什么都不干 }) 那么这个promise 就是 pending 状态;
//       //   否则执行回调
//       return value === STOP_VALUE ? STOP_VALUE : onResolved(value)
//     }, onRejected)
//   }
// })()

// var op = Promise.resolve(8).then(v => {
//   console.log(v)
//   return 9
// }).then(v => {
//   console.log(v)
//   return Promise.stop()
// });
// console.log(op) // ====> 这里 op 的状态 是 pending，Promise<pending> 后续则不会执行
// op.catch(() => {
//   console.log('catch')
// }).then(() => {
//   console.log('then')
// })

var p3 = new Promise(function (resolve, reject) {
    resolve('B');
});
// var p1 = new Promise( function(resolve,reject){
//          resolve( p3 );
// } );

var p1 = Promise.resolve(p3);
var p2 = new Promise(function (resolve, reject) {
    resolve('A');
});

console.log(p3, '1');
console.log(p1, 'p1');
p1.then(function (v) {
    console.log(v);
});

console.log(p3, '2');
console.log(p1, 'p11');
p2.then((v) => console.log(v));

console.log(p3, '3');
console.log(p1, 'p111');

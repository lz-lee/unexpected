// async-await

async function async1() {
    await async2();
}

async function async2() {
    console.log('12');
}

let async1 = (function() {
    var _async1 = asyncToGenerator(function* (){
        yield async2();
    });
    return () => {
        return _async1.apply(this, arguments);
    };
})()

function asyncToGenerator(fn) {
    return function wrapperAsync() {
        var gen = fn.apply(this, arguments);
        return new Promise(function(resolve, reject) {
            function step(key, ...args) {
                var value;
                try {
                    var it = gen[key](...args);
                    value = it.value;
                } catch (err) {
                    reject(err);
                    return;
                }

                if (it.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then((val) => step('next', val), (err) => step('throw', err));
                }
            }
            return step('next');
        });
    }
}
// Promise

function MPromise(executor) {

    try {
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }
    const _this = this;

    this.status = 'pending';
    this.data = undefined;
    this.resolveCb = [];
    this.rejectCb = [];

    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject);
        }
        setTimeout(() => {
            if (_this.status === 'pending') {
                _this.status = 'resolved';
                _this.data = value;
                for (const fn of _this.resolveCb) {
                    fn(value);
                }
            }
        });
    }


    function reject(reason) {
        setTimeout(() => {
            if (_this.status === 'pending') {
                _this.status = 'rejected';
                _this.data = reason;
                for (const fn of _this.rejectCb) {
                    fn(reason);
                }
            }
        });
    }
}

MPromise.prototype.then = function(_resolve, _reject) {
    const _this = this;
    let promise;

    _resolve = typeof _resolve === "function" ? _resolve : value => value;
    _reject = typeof _reject === "function" ? _reject : error => { throw error };

    if (_this.status === 'pending') {
        return (promise = new Promise((resolve, reject) => {
            // pending 状态 push 待执行函数，待到 resolve 或者 reject 时执行
            _this.resolveCb.push(() => {
                try {
                    const x = _resolve(_this.data);
                    // x 状态的判决在主要解决程序里做，
                    resolvePromise(promise, x, resolve, reject);
                } catch (err) {
                    //
                    reject(err);
                }
            });

            _this.rejectCb.push(() => {
               try {
                const x = _reject(_this.data);
                resolvePromise(promise, x, resolve, reject);
               } catch (err) {
                    reject(err);
               }
            });
        }));
    }

    // 完成态 和 拒绝态 都是异步的

    if (_this.status === 'resolved') {
        return (promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const x = _resolve(_this.data);
                    // x 状态的判决在主要解决程序里做，
                    resolvePromise(promise, x, resolve, reject);
                } catch (err) {
                    reject(err)
                }
            });
        }));
    }

    if (_this.status === 'rejected') {
        return (promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const x = _reject(_this.data);
                    resolvePromise(promise, x, resolve, reject);
                } catch (err) {
                    reject(err);
                }
            });
        }));
    }
}

/**
 *
 * @param {then之后返回的新的 Promise} promise
 * @param {then的回调执行的结果，需要根据这个结果去决议新返回的 Promise} x
 * @param {*} resolve
 * @param {*} reject
 */
function resolvePromise(promise, x, resolve, reject) {
    let then;
    let isThenCalledOrThrow = false;
    if (promise === x) {
        return reject(new Error('promise 循环引用'));
    }

    if (x instanceof MPromise) {
        if (x.status === 'pending') {
            x.then((val) => {
                resolvePromise(promise, val, resolve, reject);
            }, reject);
        } else {
            x.then(resolve, reject);
        }
    } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
        try {
            then = x.then;

            if (typeof then === "function") {
                then.call(x, (val) => {
                    if (isThenCalledOrThrow) return;
                    isThenCalledOrThrow = true;
                    return resolvePromise(promise, val, resolve, reject);
                }, (e) => {
                    if (isThenCalledOrThrow) return;
                    isThenCalledOrThrow = true;
                    return reject(e);
                })
            } else {
                // then 非函数, 直接决议
                resolve(x);
            }
        } catch (err) {
            if (isThenCalledOrThrow) return;
            isThenCalledOrThrow = true;
            reject(err);
        }
    } else {
        resolve(x);
    }
}

MPromise.prototype.catch = function(reject) {
    return this.then(null, reject);
}

MPromise.all = function(promises) {
    return new MPromise((resolve, reject) => {
        const result = [];
        const count = 0;
        for (const [i, promise] of promises) {
            MPromise.resolve(promise).then(res => {
                count += 1;
                result[i] = res;
                if (count === promises.length) {
                    return resolve(result);
                }
             }, err => reject(err));
        }
    });
}
MPromise.resolve = function(val) {
    if (val instanceof MPromise) {
        return val
    }
    let promise
    return (promise = new MPromise((resolve, reject) => {
        resolvePromise(promise, val, resolve, reject)
    }))
}
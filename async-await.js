// console.log('script start');

async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2 start");
}

// async1();

// setTimeout(() => {
//     console.log('setTimeout');
// }, 0);

// new Promise((resolve) => {
//     console.log('Promise executor');
//     resolve();
// }).then(() => {
//     console.log('Promise1');
// }).then(() => {
//     console.log('Promise2');
// });

// console.log('script end');

// 经过 babel 转化的代码为

let async1 = (function () {
  var _async1 = _asyncToGenerator(function* () {
    console.log("async1 start");
    yield async2();
    console.log("async1 end");
  });

  return function async1() {
    return _async1.apply(this, arguments);
  };
})();

let async2 = (function () {
  var _async2 = _asyncToGenerator(function* () {
    console.log("async2 start");
  });
  return function async2() {
    return _async2.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) {
  return function wrapperAsync() {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
            var info = gen[key](arg);
            var value = info.value;
        } catch (err) {
            reject(err);
            return;
        }
        if (info.done) {
            resolve(value);
        } else {
            return Promise.resolve(value).then(function(value) {
                step('next', value);
            }, function(err) {
                step('throw', err);
            });
        }
      }
      return step("next");
    });
  };
}

async1()
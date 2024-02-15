/**
 * 接口按顺序返回结果，如果后面的先返回也要等前面的返回才能输出
 * 思考点：
 * promise 串行执行
 * 1、请求是批量发
 * 2、请求回来的顺序是固定的，如果后面部分的接口先返回结果，应该等前面接口结果返回并展示后才能展示。（即不能使用 Promise.all）
 * 3、处理错误和数据应该请求单独处理
 * @param {[url1, url2, ...]} arr
 */

function fetchAPI(url, time, err) {
  return new Promise((resolve, reject) => {
    console.log(`fetch url ${url} start`);
    setTimeout(() => {
      err ? reject(`fetchAPI-fail-${url}-${time}`) : resolve(`fetchAPI-success-${url}-${time}`);
    }, time);
  });
}
const arr = ['url1', 'url2', 'url3', 'url4'];
const promises = arr.map(async (item, index) => {
  const time = ((index + 1) % 2) * 1000;
  const p = await fetchAPI(item, time);
  return p;
});

/**
 * 方法一：for……of 顺序输出
 * @param {[url1, url2, url3]} arr
 */
async function loadDataOrder1(promises) {
  // Promise.all(promises).then((res) => {
  //     console.log('res is >>>>>>>>>>>', res)
  // })
  for (const item of promises) {
    try {
      const data = await item;
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
}

/**
 * 方法二：reduce 函数，依次处理，传入的参考值为 Promise.resolve() 函数
 * @param {[url1, url2, url3]} arr
 */
function loadDataOrder2(promises) {
  promises.reduce((chain, p, index) => {
    return chain
      .then(() => p)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, Promise.resolve());
}

// 方法一 二 都没有单独处理错误的和数据

/**
 * 方法三：generate 函数。next方法可以带一个参数，该参数就会被当作上一次 yield 表达式的返回值
 * @param {*} arr
 */
async function loadDataOrder3(arr) {
  const gens = arr.map((item, index) => {
    const time = ((index + 1) % 2) * 1000;
    const gen = loadOne(item, time);
    return {
      gen, // it 方法
      p: gen.next().value, // 启动请求
    };
  });
  for (const { gen, p } of gens) {
    try {
      const d = await p;
      console.log('ddd>>>', d);
    } catch (err) {
      console.log(err);
    } finally {
      console.log('resolve 了 Promise >>>', p);
      // next 传入的 p 是 resolve 过后的 p，那么在 loadOne 里，yield 暂停后再执行 gen.next(p),即将这个 resolve 的 promise 传递给上一次 yield 的返回值 pData
      gen.next(p);
    }
  }
}

function* loadOne(url, time) {
  const pData = yield fetchAPI(url, time);
  pData
    .then((data) => {
      console.log('load one ===> ', data);
    })
    .catch((err) => console.log(err));
}

// loadDataOrder3(arr);

function createQueue(promises) {
  const t = promises;
  const next = () => {
    const cur = t.shift();
    if (cur) {
      return Promise.resolve(cur).then((val) => {
        console.log(val);
        return next();
      });
    } else {
      return Promise.resolve('done');
    }
  };
  return next();
}

loadDataOrder2(promises);

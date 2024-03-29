/**
 *
 * @param 目标对象 target
 * @param 拷贝对象 rest
 */
export function extend(target, ...rest) {
  for (let i = 0; i < rest.length; i++) {
    let source = rest[i];
    for (let k in source) {
      target[k] = source[k];
    }
  }
  return target;
}

// 根据不同浏览器自动加样式前缀

let elementStyle = document.createElement('div').style;

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform',
  };

  for (let k in transformNames) {
    if (elementStyle[transformNames[k]] !== undefined) {
      return k;
    }
  }
  return false;
})();

export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }

  if (vendor === 'standard') {
    if (style === 'transitionEnd') {
      return 'transitionend';
    }
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substring(1);
}
/**
 * 数组洗牌 Knuth shuffle
 * @param {Array} arr
 */
export function shuffle(arr) {
  let res = arr.slice();
  for (let i = res.length - 1; i >= 0; --i) {
    var j = (getRandomIndex(i)[(res[i], res[j])] = [res[j], res[i]]);
  }
  return res;
}

function getRandomIndex(max) {
  return (Math.random() * (max + 1)) | 0;
}

/**
 * 防抖函数
 * @param {Function} fn
 * @param {Number} delay
 * 在一段时间内用户连续操作不触发，在用户停止某操作后触发
 */
export function debounce(fn, delay) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 截流函数--时间戳
 * 每隔一段时间触发
 */

export function throttle(func, delay) {
  let last = 0;
  return function (...args) {
    const now = Date.now();

    if (now - last > delay) {
      func.apply(this, args);
      last = Date.now();
    } else {
      console.log('时间差不到要求');
    }
  };
}
/**
 * 截流--定时器
 * @returns
 */
function throttle1(func, delay) {
  let timer;
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    } else {
      console.log('上一个定时器还没完成');
    }
  };
}
/**
 * 解析url 参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function getParameter() {
  let search = window.location.search.substr(1);
  let vars = search.split('&');
  let parameters = {};
  vars.forEach((item) => {
    let temp = item.split('=');
    let key = decodeURIComponent(temp[0]);
    let val = decodeURIComponent(temp[1]);
    parameters[key] = val;
  });
  return parameters;
}

/**
 * 拼接get请求参数
 * data为键值对对象
 * {id: 5, name: 'lee'}
 * @return url?id=5&name=lee
 */

export function formatUrl(url, data) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + formatParams(data);
  return url;
}

function formatParams(data) {
  let url = '';
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  return url.substring(1);
}

/**
 *
 * @param {Date} date Date对象，后端返回的时间戳乘1000
 * @param {String} fmt 'yyyy-MM-dd hh:mm'
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };

  for (let k in o) {
    if (new RegExp(`${k}`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(new RegExp(`${k}`), RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

/**
 * 导出excel
 * featch api不支持IE
 */
export function exportExcel(url, data) {
  let token = 'token';

  let headers = new Headers();

  headers.append('token', token);

  let url = formatUrl(url, data);

  let request = new Request(url, { headers: headers, method: 'GET' });

  fetch(request).then((res) =>
    res.blob().then((blob) => {
      let a = document.createElement('a');
      let url = window.URL.createObjectURL(blob);
      let filename = 'myfile.xls';
      a.href = url;
      // a标签的download属性
      a.download = filename;

      a.click();

      window.URL.revokeObjectURL(url);
    })
  );
}

export function getJSONP(url, callback) {
  let cbnum = getJSONP.count++;
  let cbname = 'getJSONP.' + cbnum;
  url += (url.indexOf('?') > 0 ? '&' : '?') + 'jsonp=' + cbname;
  let script = document.createElement('script');

  getJSONP[cbnum] = function (res) {
    try {
      callback(res);
    } finally {
      delete getJSONP[cbnum];
      script.parentNode.removeChild(script);
    }
  };

  script.scr = url;
  document.body.appendChild(script);
}

getJSONP.count = 0;

function padLeftZero(str) {
  return ('00' + str).slice(str.length);
}

/**
 * lodash get
 * @param {*} source
 * @param {*} path
 * @param {*} defaultValue
 * @returns
 */
function _get(source, path, defaultValue = undefined) {
  // translate array case to dot case, then split witth .
  // a[0].b -> a.0.b -> ['a', '0', 'b']
  const keyList = path.replace(/\[(\d+)\]/g, '.$1').split('.');

  const result = keyList.reduce((obj, key) => {
    return Object(obj)[key]; // null undefined get attribute will throwError, Object() can return a object
  }, source);

  // let result = source
  // for (const k of paths) {
  //   result = Object(result)[k] // null 与 undefined 取属性会报错, 用Object包装一下
  // }
  return result === undefined ? defaultValue : result;
}

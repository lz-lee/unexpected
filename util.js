/**
 *
 * @param 目标对象 target
 * @param 拷贝对象 rest
 */
export function extend(target, ...rest) {
  for (let i = 0;i < rest.length; i++) {
    let source = rest[i]
    for (let k in source) {
      target[k] = source[k]
    }
  }
  return target
}

// 根据不同浏览器自动加样式前缀

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let k in transformNames) {
    if (elementStyle[transformNames[k]] !== undefined) {
      return k
    }
  }
  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    if (style === 'transitionEnd') {
      return 'transitionend'
    }
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substring(1)
}
/**
 * 数组洗牌
 * @param {Array} arr
 */
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomIndex(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
}

/**
 * 去抖函数
 * @param {Function} fn
 * @param {Number} delay
 */
export function debounce(fn, delay) {
  let timer
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 截流函数
 */

export function throttle(func, delay) {
  let last, timer
  return function(...args) {
      const now = Date.now()
      if (last && now - last < delay) {
          clearTimeout(timer)
          timer = setTimeout(() => {
              last = now
              func.apply(this, args)
          }, delay)
      } else {
          last = now
          func.apply(this, args)
      }
  }
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
	url += (url.indexOf('?') < 0 ? '?' : '&') + formatParams(data)
	return url
}

function formatParams(data) {
	let url = ''
	for (let k in data) {
		let value = data[k] !== undefined ? data[k] : ''
		url += `&${k}=${encodeURIComponent(value)}`
	}
	return url.substring(1)
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
		's+': date.getSeconds()
	};

	for (let k in o) {
		if (new RegExp(`${k}`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(new RegExp(`${k}`), (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};

/**
 * 导出excel
 * featch api不支持IE
 */
export function exportExcel(url, data) {
  let token = 'token'

  let headers = new Headers()

  headers.append('token', token)

  let url = formatUrl(url, data)

  let request = new Request(url, {headers: headers, method: 'GET'})

  fetch(request).then(res => res.blob().then(blob => {

    let a = document.createElement('a')
    let url = window.URL.createObjectURL(blob)
    let filename = 'myfile.xls'
    a.href = url
    // a标签的download属性
    a.download = filename

    a.click()

    window.URL.revokeObjectURL(url)
  }))
}

export function getJSONP(url, callback) {
  let cbnum = getJSONP.count++
  let cbname = 'getJSONP.' + cbnum
  url += (url.indexOf('?') > 0 ? '&' : '?') + 'jsonp=' + cbname
  let script = document.createElement('script')

  getJSONP[cbnum] = function(res) {
    try {
      callback(res)
    }
    finally {
      delete getJSONP[cbnum]
      script.parentNode.removeChild(script)
    }
  }

  script.scr = url
  document.body.appendChild(script)
}

getJSONP.count = 0

function padLeftZero(str) {
	return ('00' + str).substr(str.length)
}


function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
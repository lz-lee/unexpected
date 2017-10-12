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
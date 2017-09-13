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

/*
data：时间戳乘1000
fmt：日期格式'yyyy-MM-dd hh:mm'
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

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
};

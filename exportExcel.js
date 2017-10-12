/**
 * 导出excel
 * featch api不支持IE
 */

import {formatUrl} from './getUrlParams'

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
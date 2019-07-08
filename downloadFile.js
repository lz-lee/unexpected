// a 标签只能用于单次单个文件下载，当用于多次单个文件下载时只有最后一个会成功，其他的请求都会canceled
export const singleFileDownload = (url, name) => {
  const link = document.createElement('a');

    if (typeof link.download === 'string') {
      document.body.appendChild(link);
      link.download = name;
      link.href = url;
      link.click();
      document.body.removeChild(link);
    } else {
      location.replace(url);
    }
};

// 可以用iframe标签用于多次单文件下载，可以避免a标签的问题
export const multiFileDownload = url => {
  const iframe = document.createElement('iframe');

    iframe.style.display = 'none';
    iframe.style.height = 0;
    iframe.src = url;
    document.body.appendChild(iframe);
    setTimeout(() => {
      iframe.remove();
    }, 30000);
};

// 另外还有 form表单下载、window.open打开新标签的方式下载。
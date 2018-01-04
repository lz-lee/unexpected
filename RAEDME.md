### 1、transitionEnd

* transitionEnd事件会在css transition结束后触发

### 2、[addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)(type, listener, options)

* listener: 实现了EventListener接口（实现handleEvent方法，其参数为type）的对象 或者 函数，如果是函数的话，在清除事件操作中需要清除函数名或者提供一个完全相同的函数才行；而如果提供一个对象的话，只需要removeEventListener即可。

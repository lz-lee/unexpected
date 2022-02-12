function myInstanceOf(left, right) {
  let proto = left.__proto__
  while(proto) {
    if (proto === right.prototype) {
      return true
    }
    proto = proto.__proto__
  }
  return false
}

// 关联知识点：Symbol.hasInstance: 对象的静态方法， 用于判断某对象是否为某构造器的实例。自定义 instanceof 操作符在某个类上的行为。

class myArray {
  static [Symbol.hasInstance](instance) {
      return Array.isArray(instance);
  }
}
[] instanceof myArray // => true

// 可以直接调用
myArray[Symbol.hasInstance]([]) // => true
// 发布订阅模式的事件管理器

// var Event = (function () {
//   var events = {};
//   function on(type, callback) {
//     events[type] = events[type] || [];
//     events[type].push(callback);
//   }

//   function emit(type, ...args) {
//     if (!events[type]) {
//       return;
//     }
//     for (var i = 0; i < events[type].length; i++) {
//       events[type][i].call(this, ...args);
//     }
//   }
//   return {
//     on: on,
//     emit: emit,
//   };
// })();

// Event.on('serach', function (data) {
//   console.log(data);
// });
// Event.emit('serach', 'doing something');

// // es6
// class Event {
//   // static 表示该方法不会被实例继承，而是直接通过类来调用，静态方法中的 this 指的是类，而不是实例
//   static on(type, callback) {
//     return document.addEventListener(type, callback);
//   }
//   static emit(type, args) {
//     // CustomEvent 事件是由程序创建的，可以有任意自定义功能的事件。浏览器内置）
//     // new CustomEvent(type, customeEventInit)
//     // customeEventInit是一个对象，detail ：可选的默认值是 null 的任意类型数据，是一个与 event 相关的值
//     return document.dispatchEvent(
//       new CustomEvent(type, {
//         detail: args,
//       })
//     );
//   }
// }
// Event.on('search', (e) => console.log(e.detail));
// Evetn.emit('search', 'doing something');

class MEvent {
  constructor() {
    this.events = {};
  }

  on(type, callback) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(callback);
  }

  emit(type, ...args) {
    if (!this.events[type]) {
      return;
    }
    for (let i = 0; i < this.events[type].length; i++) {
      this.events[type][i].call(this, ...args);
    }
  }

  off(type, cb) {
    if (this.events[type]) {
      this.events[type] = this.events[type].filter((s) => s !== cb);
    }
  }

  once(type, cb) {
    const onceCb = (data) => {
      cb(data);
      this.off(type, onceCb);
    };
    this.on(type, onceCb);
  }
}
const sayHi = (name) => console.log(`Hello ${name}`);
const sayHi2 = (name) => console.log(`Good night, ${name}`);

const myEvent = new MEvent();
// myEvent.on('hi', sayHi)
// myEvent.on('hi', sayHi2)

// myEvent.emit('hi', 'lee')

// myEvent.off('hi', sayHi)
// myEvent.emit('hi', 'niuniu')

myEvent.on('hi', (name, age) => {
  console.log(`I am ${name}, and I am ${age} years old`);
});
const onceCb = (data) => console.log(`callback once ${data}`);
myEvent.once('hi', onceCb);
myEvent.emit('hi', 'lee', 25);
myEvent.emit('hi', 'leelz', 31);

// 接受匿名函数，增加一个标志位
// const token1 = myEvent.on('hi', (name) => console.log(`Hello ${name}`))
// const token2 = myEvent.on('hi', (name) => console.log(`Good night, ${name}`))

// // myEvent.emit('hi', 'lee')

// myEvent.off('hi', token1)
// myEvent.emit('hi', 'niuniu')

// Proxy 实现观察者
const obj = {
  cbs: [],
};
const proxyObj = new Proxy(obj, {
  set: (target, prop, value, receiver) => {
    target.cbs.forEach((fn) => fn());
    return Reflect.set(target, prop, value, receiver);
  },
});
const print = () => console.log(obj.name);
obj.cbs.push(print);
obj.name = 'xxx';

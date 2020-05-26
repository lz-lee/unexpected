// 方案一
Function.prototype.bind = function(ctx, ...args) {
    if (typeof this !== 'function') {
        throw new Error('Function.prototype.bind - - what is trying to be bound is not callable');
    }
    const that = this;
    function bound(...newArgs) {
        // new 操作符使用 会执行 [[constructor]] 函数，new.target 指向构造函数
        // this instanceof bound 也可以判断是否被 new 操作符使用
        // instanceof 有缺陷，当被外部函数显示的 call 时 this 不一定指向 bound
        return that.apply(new.target === bound ? this : ctx, [...args, ...newArgs]);
    }
    // 维护原型链 或者 通过一个空函数中转
    bound.prototype = Object.create(this.prototype);
    return bound;
}

// 方案二
Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
      throw new TypeError('Error');
    }
    const _this = this;
    const args = [...arguments].slice(1);
    return function F() {
      if (this instanceof F) {
          // if (new.target === F)
          console.log(_this, '<<<< _this is');
        // 直接使用 new 来执行 _this
        return new _this(...args, ...arguments);
      }
      return _this.apply(context, args.concat(...arguments));
    }
  }


function foo(...args) {
    console.log(args, '<<<args');
	this.args = args;
}

var ff = foo.bind({name: 'AAA'}, 1,2,3)

console.log(new ff());
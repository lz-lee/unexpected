// impl call

Function.prototype.myCall = function (context) {
    if (typeof this !== 'function') {
        throw new Error('not function');
    }
    context = context || window;
    context.fn = this;
    const result = context.fn(...arguments.slice(1));
    delete context.fn;
    return result;
};

// impl apply

Function.prototype.myApply = function (ctx, ...args) {
    if (typeof this !== 'function') {
        throw new Error('not function');
    }
    ctx = ctx || window;
    ctx.fn = this;
    const result = args.length > 0 ? ctx.fn(...args) : ctx.fn();
    delete ctx.fn;
    return result;
};

// impl bind

Function.prototype.myBind = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }
    const _this = this;
    return function F() {
        if (this instanceof F) {
            // if (new.target === F)
            console.log(_this, '<<<< _this is');
            // 直接使用 new 来执行 _this
            return new _this(...args, ...arguments);
        }
        return _this.apply(context, args.concat(...arguments));
    };
};

function foo(...args) {
    console.log(args, '<<<args');
    this.args = args;
    console.log(this.name, '<<this.name');
}

var ff = foo.myBind({ name: 'AAA' }, 1, 2, 3);

console.log(new ff());

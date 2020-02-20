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
    return bound;
}
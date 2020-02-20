export const curry = fn => {
    return function foo(...args) {
        return args.length >= fn.length ? fn(...args) : (...newArgs) => foo(...args, ...newArgs);
    }
}
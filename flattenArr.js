var arr = [1,2,3, ['a', 'b', ['c', ['d']]], 'f'];

// 递归的形式
function flatten1(arr, deep) {
    const ret = [];
    for (let i of arr) {
        if (Array.isArray(i) && deep) {
            deep--
            ret.push(...flatten1(i, deep))
        } else {
            ret.push(i);
        }
    }
    return ret;
}
flatten1(arr, 2);

// 迭代的形式
function flatten2(arr, deep) {
    while(deep && arr.some(v => Array.isArray(v))) {
        arr = [].concat(...arr);
        deep--
    }
    return arr;
}
flatten2(arr, 2);

// 栈
function flatten3(arr, deep = Infinity) {
    const stack = [];
    const newArr = [...arr];

    while(newArr.length) {
        const item = newArr.shift(); // 从队首取元素
        if (Array.isArray(item) && deep) {
            newArr.unshift(...item); // 如果是数组继续加入到原数组里
            deep--;
        } else {
            stack.push(item);
        }
    }
    return stack;
}
flatten3(arr);

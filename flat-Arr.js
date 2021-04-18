var arr = [1,2,3, ['a', 'b', ['c', ['d']]], 'f'];

// 递归的形式
function flat1(arr, deep) {
    const ret = [];
    for (let i of arr) {
        if (Array.isArray(i) && deep) {
            deep--
            ret.push(...flat1(i, deep))
        } else {
            ret.push(i);
        }
    }
    return ret;
}
flat1(arr, 2);

// 迭代的形式
function flat2(arr, deep) {
    while(deep && arr.some(v => Array.isArray(v))) {
        deep--
        arr = [].concat(...arr);
    }
    return arr;
}
flat2(arr, 2);

// 栈
function flat3(arr, deep = Infinity) {
    const stack = [];
    const newArr = [...arr];

    while(newArr.length) {
        const item = newArr.shift(); // 从队首取元素
        if (Array.isArray(item) && deep) {
            deep--;
            newArr.unshift(...item); // 如果是数组继续加入到原数组里
        } else {
            stack.push(item);
        }
    }
    return stack;
}
flat3(arr);

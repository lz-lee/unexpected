function deepClone(obj, cache = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    // const hit = cache.find(v => v.original === obj);
    const hit = cache.get(obj)
    if (hit) {
        // return hit.copy;
        return hit
    }
    const copy = Array.isArray(obj) ? [] : {};
    // cache 处理循环引用的情况
    // cache.push({
    //     original: obj,
    //     copy
    // });
    cache.set(obj, copy);
    // ownKeys = Object.getOwnPropertyNames （包括不可枚举属性） (而 Object.keys 返回的是自身可枚举属性组成的数组，“可枚举”即“可遍历”) + Object.getOwnPropertySymbols
    Reflect.ownKeys(obj).forEach(key => {
        copy[key] = deepClone(obj[key], cache);
    });
    return copy;
}


const test = {
    a: [1,2, Symbol('123')],

    b: {
        c: 45,
        d: Symbol('abc'),
    },
    aa: null
}

test.f = test

const newTest = deepClone(test);
console.log(newTest);
function deepClone(obj, cache = []) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const hit = cache.find(v => v.original === obj);
    if (hit) {
        return hit.copy;
    }
    const copy = Array.isArray(obj) ? [] : {};
    // cache 处理循环引用的情况
    cache.push({
        original: obj,
        copy
    });
    // ownKeys = Object.getOwnPropertyNames (即 Object.keys) + Object.getOwnPropertySymbols
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
    }
}

test.f = test

const newTest = deepClone(test);
console.log(newTest);
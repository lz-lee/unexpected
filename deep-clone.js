function deepClone(obj, cache = []) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const hit = cache.find(v => v.original === obj);
    if (hit) {
        return hit.copy;
    }
    const copy = Array.isArray(obj) ? [] : {};
    cache.push({
        original: obj,
        copy
    });
    Reflect.ownKeys(obj).forEach(key => {
        copy[key] = deepClone(obj[key], cache);
    });
    return copy;
}
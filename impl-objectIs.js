const ObjectIS = (x, y) => {
    if (x === y) {
        // +0 !== -0 而实际上 +0 === -0 => true 但 Object.is(+0, -0) 为 false
        return x !== 0 || 1 / x === 1 / y;
    } else {
        return x !== x && y !== y;
    }
}

// 尾调用优化 严格模式下生效
// 尾递归：就是递归只出现在 return 语句，且 return 语句里只有递归
//（即迭代的形式--即每次都更新换代）：不用回到现场的递归调用
// "use strict"
function fibonacci(n, n1 = 0, n2 = 1) {
    if(n <= 1) {
        return n2;
    }
    return fibonacci(n - 1, n2, n1 + n2);
}

// 非尾调用优化
function fb(n) {
    if (n < 3) return 1;
    return fb(n -1) + fb(n -2);
}

// 动态规划
function fab(n) {
    let n1 = 1, n2 = 1, sum = 1;
    for (let i = 3; i <= n; i++) {
      sum = n1 + n2;
      n1 = n2;
      n2 = sum;
    }
    return sum;
}
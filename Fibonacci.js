// 尾调用优化 某个函数的最后一步有且仅调用另一个函数，没有别的其他操作，不需要保留外部函数的调用栈，因此直接使用内部函数的调用栈取代外部函数的调用栈即可
// 严格模式下生效：
    // 尾调用优化发生时，函数的调用栈会改写，因此 func.caller, func.arguments 这两个变量就会失真，而在严格模式下禁止使用这两个变量。因此仅在严格模式下生效

// 尾递归：就是递归只出现在 return 语句，且 return 语句里只有递归
//（即迭代的形式--即每次都更新换代）：不用回到现场的递归调用

// "use strict"
// 利用参数默认值达到动态规划的效果，
// 即 n1 = n2, n2 = n1 + n2;
function fibonacci(n, n1 = 0, n2 = 1) {
    if(n <= 1) {
        return n2;
    }
    return fibonacci(n - 1, n2, n1 + n2);
}

// 实现迭代：迭代不需要压栈
// 1、循环 -- while or for
// 2、尾递归

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

// 阶乘函数
function factorial(n, result = 1) {
    if (n === 1) return result;
    return factorial(n - 1, n * result);
}
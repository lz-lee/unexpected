
/**
 * 20. 有效的括号
 * https://leetcode-cn.com/problems/valid-parentheses/
 * 数组模拟栈
 * @param '({[{)}'
 */
function isValid(str) {
    const stack = [];
    const strMap = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    const leftStrArr = ['(', '{', '['];
    for (const i of str) {
        if (leftStrArr.includes(i)) {
            stack.push(i);
        } else {
            const peak = stack.pop();
            if (i !== strMap[peak]) {
                return false;
            }
        }
    }
    if (stack.length > 0) {
        return false;
    }
    return true;
}

/**
 * 26.删除排序数组中的重复项，且返回新数组的长度
 * 双指针
 * @param [0,0,1,1,1,2,2,3,3,4]
 * @return 5
 */
function removeDuplicates(arr) {
    const len = nums.length;
    let slow = 0;
    for (let fast = 0; fast < len; fast++) {
        // slow 和 fast 不相同时 slow 前进一位
        if (nums[slow] !== nums[fast]) {
            slow++;
            nums[slow] = nums[fast]
        }

    }
    return slow + 1;
}

/**
 * 53.最大子序和
 * 动态规划：其思想是重新对变量赋值，重复利用变量，一般会要声明多个变量
 * 在这里，sum 如果小于 0 则舍弃，将下一个 i 赋值给 sum；
 * sum 如果大于 0 则继续累加
 * @param {nums: number[]} [-2,1,-3,4,-1,2,1,-5,4]
 * @return number
 */

function maxSubArr(arr) {
    let max = arr[0];
    let sum = 0;
    for (const i of arr) {
        if (sum > 0) {
            sum += i;
        } else {
            sum = i
        }
        max = Math.max(max, sum);
    }
    return max;
}

/**
 * 104.求二叉树深度
 * 递归
 */
function maxDepth(root) {
    if (!root) return 0;
    if (!root.left && !root.right) return 1;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

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
 * 动态规划：其思想是重新对变量赋值，重复利用变量，一般会要声明多个变量。状态转移方程
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
 * 300.最长递增子序列的长度
 * @param {*} root
 * dp[i] 表示以 nums[i] 这个数结尾的最长递增子序列的长度。
 * dp[i] 初始值为 1，因为以 nums[i] 结尾的最长递增子序列起码要包含它自己。
 * 怎么求 dp[i] ?
 * 既然是递增子序列，我们只要找到前面那些结尾比 nums[i] 小的子序列(即如果nums[j] < nums[i])，然后把 nums[i] 接到最后，就可以形成一个新的递增子序列，而且这个新的子序列长度加一.(即 在 dp[j] 这个位置开始长度加 1)
 * 显然，可能形成很多种新的子序列，但是我们只选择最长的那一个，把最长子序列的长度作为 dp[i] 的值即可。
 * https://labuladong.github.io/ebook/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E7%B3%BB%E5%88%97/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E8%AE%BE%E8%AE%A1%EF%BC%9A%E6%9C%80%E9%95%BF%E9%80%92%E5%A2%9E%E5%AD%90%E5%BA%8F%E5%88%97.html
 */

function lengthOfLIS(nums) {
    let len = nums.length;
    let dp = new Array(len).fill(1);
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    return len < 2 ? len : Math.max(...dp);
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
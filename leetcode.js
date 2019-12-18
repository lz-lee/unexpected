
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
 * 26.删除排序数组中的重复项
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
 * 104.求二叉树深度
 * 递归
 */
function maxDepth(root) {
    if (!root) return 0;
    if (!root.left && !root.right) return 1;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
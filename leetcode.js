
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
 * 双指针：前提是数组有序
 * @param [0,0,1,1,1,2,2,3,3,4]
 * @return 5
 */
function removeDuplicates(arr) {
    const len = arr.length;
    let slow = 0;
    for (let fast = 0; fast < len; fast++) {
        // slow 和 fast 不相同时 slow 前进一位
        if (arr[slow] !== arr[fast]) {
            slow++;
            arr[slow] = arr[fast]
        }

    }
    return slow + 1;
}

/**
 * 53.最大子序和
 * https://leetcode-cn.com/problems/maximum-subarray/
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
 * 动态规划
 * @param {*} root
 * dp[i] 表示以 nums[i] 这个数结尾的最长递增子序列的长度。
 * dp[i] 初始值为 1，因为以 nums[i] 结尾的最长递增子序列起码要包含它自己。
 * 怎么求 dp[i] ?
 * 既然是递增子序列，我们只要找到前面那些结尾比 nums[i] 小的子序列(即如果nums[j] < nums[i])，然后把 nums[i] 接到最后，就可以形成一个新的递增子序列，而且这个新的子序列长度加一.(即 在 dp[j] 这个位置开始长度加 1)
 * 显然，可能形成很多种新的子序列，但是我们只选择最长的那一个，把最长子序列的长度作为 dp[i] 的值即可。
 * https://labuladong.gitbook.io/algo/di-er-zhang-shou-ba-shou-shua-dong-tai-gui-hua/zi-xu-lie-lei-xing-wen-ti/dong-tai-gui-hua-she-ji-zui-chang-di-zeng-zi-xu-lie
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

/**
 * 491.求递增子序列 -- https://leetcode-cn.com/problems/increasing-subsequences/
 * 递归--也是求组合问题，只不过这个组合是排序的
 * 输入：[4, 6, 7, 7]
 * 输出：[[4, 6], [4, 7], [4, 6, 7], [4, 6, 7, 7], [6, 7], [6, 7, 7], [7,7], [4,7,7]]
 */

function findSubsequences (nums) {
    const len = nums.length
    const res = []
    const subset = []
    // 判断是否重复 push
    const set = new Set()
    function dfs(n) {
        if (subset.length > 1) {
            const str = subset.toString()
            if (!set.has(str)) {
                res.push(subset.slice())
                set.add(str)
            }
        }
        for (let i = n; i < len; i++) {
            // 上一个选择，即path数组的末尾元素
            const prev = subset[subset.length - 1]
            //  如果path为空，或满足递增关系，则可选择
            if (subset.length === 0 || prev <= nums[i]) {
                subset.push(nums[i])
                // 基于当前数字存在于组合中的情况，继续 dfs，找到与当前数字存在的所有组合
                dfs(i + 1)
                subset.pop()
            }
        }
    }

    dfs(0)
    return res
}

/**
 * 双指针：前提是数组有序
 * 合并两个有序数组
 */

const mergeArr = (nums1, m, nums2, n) => {
    // 初始化两个指针的指向，初始化 nums1 的尾部索引 k
    // 从后往前排，大数在后边，将 nums2 的数插入到 nums1 中，原地合并
    let i = m - 1, j = n - 1, k = m + n -1

    while(i >= 0 && j >= 0) {
        if (nums1[i] >= nums2[j]) {
            nums1[k] = nums1[i]
            i--
            k--
        } else {
            nums1[k] = nums2[j]
            j--
            k--
        }
    }
    // nums2 没有剩余，剩下的是 nums1，则不需要处理
    // nums2 还有剩余的情况，直接把剩余的补到 nums1 中
    while (j >= 0) {
        nums1[k] = nums2[j]
        j--
        k--
    }
    return nums1
}

/**
 * 两数之和的索引
 * 空间换时间
 */
const twoSum = function(arr, target) {
    const map = {}
    for (let i = 0; i < arr.length; i++) {
        if (map[target - arr[i]] !== undefined) {
            return [map[target - arr[i]], i]
        }
        map[arr[i]] = i
    }
}

/**
 * 三数之和
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
 * 示例：给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
 */
const threeSum = (arr) => {
    const res = [];
    // 先排序
    arr = arr.sort((a, b) => a - b)
    // 注意我们遍历到倒数第三个数就足够了，因为左右指针会遍历后面两个数
    for (let i = 0; i < arr.length - 2; i++) {
        // 左指针
        let start = i + 1
        // 右指针
        let end = arr.length - 1
        if (i > 0 && arr[i] === arr[i - 1])  {
            // 遇到重复数据则 跳过
            continue
        }
        while (start < end) {
            // 三数之和小于 0 说明左侧数偏小，start 右移
            if (arr[i] + arr[start] + arr[end] < 0) {
                start++
                // 处理左指针元素重复
                while (start < end && arr[start] === arr[start - 1]) {
                    start++
                }
            } else if (arr[i] + arr[start] + arr[end] > 0) {
                // 三数之和大于0，说明右侧数偏大，end 左移
                end--
                // 处理右指针元素重复
                while (start < end && arr[end] === arr[end + 1]) {
                    end--
                }
            } else {
                // 得到结果
                res.push([arr[i], arr[start], arr[end]])
                start++
                end--

                // 若左指针元素重复，跳过
                while (start < end && arr[start] === arr[start - 1]) {
                    start++
                }

                // 若右指针元素重复，跳过
                while (start < end && arr[end] === arr[end + 1]) {
                    end--
                }
            }
        }
    }
}

/**
 * 判断是否回文字符串
 *
 */

const isPalindromeStr = str => {
    const reverseStr = str.split('').reverse().join('')
    return str === reverseStr
}
const isPalindromeStr2 = str => {
    // 利用对称性
    const len = str.length
    for (let i = 0; i< len / 2; i++) {
        if (str[i] !== str[len - i - 1]) {
            return false
        }
    }
    return true
}
/**
 * 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
 * abca => true
 */

const validPalindrome = str => {
    const len = str.length
    let start = 0
    let end = len - 1
    // 当左右指针均满足对称时，一起向中间前进
    while (start < end && str[start] === str[end]) {
        start++
        end--
    }
    // 尝试判断跳过左指针元素后，字符串是否是回文
    if (isPalindrome(start + 1, end)) {
        return true
    }

    // 尝试判断跳过右指针后，字符串是否是回文
    if (isPalindrome(start, end - 1)) {
        return true
    }

    // 工具方法，用于判断字符串是否回文
    // 利用对称性
    const isPalindrome = (i, j) => {
        while (i < j) {
            if (str[i] !== str[j]) {
                return false
            }
            i++
            j--
        }
        return true
    }
    return false
}

/**
 * 链表合并
 * 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的
 * 链表的插入/删除效率较高，而访问效率较低； 链表的删除直接将 cur.next 指向 next.next 就行
 * 数组的访问效率较高，而插入效率较低。
 */

class ListNode {
    val;
    next;

    constructor(val) {
        this.val = val
        this.next = null
    }
}
/**
 * 相交链表，返回相交的节点
 * https://leetcode-cn.com/problems/intersection-of-two-linked-lists/
 * @param {*} list1
 * @param {*} list2
 * @returns
 */
const getIntersectionNode = (list1, list2) => {
    if (!list1 || !list2) return null
    let cur1 = list1, cur2 = list2
    // 让两个链表都走相同长度的路径，那么如果有相交处，则节点相同
    // A、B 都走 A + B 长度的路线
    while(cur1 !== cur2) {
        // A 走完 A 的路线再去走 B
        cur1 = !cur1 ? list2 : cur1.next
        // B 走完 B 的路线再去走 A
        cur2 = !cur2 ? list1 : cur2.next
    }
    return cur1
}

const mergeTwoList = (list1, list2) => {
    // 定义头节点，确保链表可以被访问到
    let head = new ListNode()
    // 定义那根“针”
    let cur = head
    while (list1 && list2) {
        // 比较两个链表节点的值，谁的值小，那么先串谁，
        if (list1.val <= list2.val) {
            cur.next = list1
            list1 = list1.next
        } else {
            cur.next = list2
            list2 = list2.next
        }
         // “针”在串起一个结点后，也会往前一步
        cur = cur.next
    }
    // 处理链表不等长的情况
    cur.next = list1 !== null ? list1 : list2
    // 返回起始结点
    return head.next
    // 递归
//     if (l2 === null) {
//         return l1
//     }
//     if (l1 === null) {
//         return l2
//     }
//     if (l1.val < l2.val) {
//         // 谁先小，拿小的下一个再去对比
//         l1.next = mergeTwoList(l1.next, l2);
//         return l1;
//     } else {
//         l2.next = mergeTwoList(l1, l2.next);
//         return l2
//     }
}
/**
 * 链表节点删除
 * 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
 */

const removeDuplicatesList = head => {
    let cur = head
    while (cur && cur.next) {
        // 相邻节点值相同则删除靠后那个节点
        if (cur.val === cur.next.val) {
            cur.next = cur.next.next
        } else {
            cur = cur.next
        }
    }
    return head
}

/**
 * 给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。
 * 示例1:
 * 输入: 1->2->3->3->4->4->5
 * 输出: 1->2->5
 * 示例2:
 * 输入: 1->1->1->2->3
 * 输出: 2->3
 */

const deleteDuplicatesList = head => {
    if (!head || !head.next) return head
    // 创建空节点，从空节点的下一个开始遍历
    let dummy = new ListNode()

    dummy.next = head
    // 从头 dummy 开始遍历
    let cur = dummy

    // 当 cur 的后面至少两个节点时
    while (cur.next && cur.next.next) {
        // 值比较
        if (cur.next.val === cur.next.next.val)  {
            // 若值重复，则记下这个值，看看后面还有没有重复的
            let val = cur.next.val
            while (cur.next && cur.next.val === val) {
                // 若有，则删除
                cur.next = cur.next.next
            }
        } else {
            // 不重复，则正常遍历
            cur = cur.next
        }
    }
    return dummy.next
}
/**
 * 链表双指针，删除指定节点元素
 * 给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 示例
 * 给定一个链表: 1->2->3->4->5, 和 n = 2.
 * 变为 1->2->3->5
 */

const removeNthFromEnd = (head, n) => {
    const dummy = new ListNode()
    dummy.next = head
    let slow = dummy
    let fast = dummy
    // 快指针走完 n 步，
    while (n !== 0) {
        fast = fast.next
        n--
    }
    // 再快慢指针同时走，形成一个桶去套，快指针走到最后时，慢指针的下一个就是待删除的节点
    while (fast.next) {
        fast = fast.next
        slow = slow.next
    }
    slow.next = slow.next.next
    return dummy.next
}
/**
 * 反转链表
 */

const reverseList = head => {
    let prev = null
    let cur = head
    while (cur) {
        // 记录一下 next 结点
        const next = cur.next
        // 反转指针
        cur.next = prev
        // prev 往前走一步
        prev = cur
        // cur 往前走一步
        cur = next
    }
    return prev
}

/**
 * 判断是否是环形链表
 */

const hasCycle = head => {
    while (head) {
        if (head.flag) return true
        head.flag = true
        head = head.next
    }
    return false
}
/**
 * 栈
 * 对输入的字符串，去除其中的字符'b'以及连续出现的'a'和'c'
例如：
'aacbd' -> 'ad'
'aabcd' -> 'ad'
'aaabbccc' -> ''
不允许使用类似string.replace函数。要求时间、空间复杂度尽量优化
 */

const getStr = str => {
    const stack = []

    for (const i of str) {
        if (i !== 'b' && `${stack[stack.length - 1]}${i}` !== 'ac') {
            stack.push(i)
        }
        if (`${stack[stack.length - 1]}${i}` === 'ac') {
            stack.pop()
        }
    }
    return stack.join('')
}
/**
 * 去除重复字符
*/
const removeDuplicateStr = str => {
    const stack = []
    for (const i of str) {
        if (`${stack[stack.length - 1]}` !== i) {
            stack.push(i)
        }
    }
    return stack.join('')
}

// console.log(getStr('aaabbccc'))

/**
 * 每日温度问题
 * 根据每日气温列表，请重新生成一个列表对应位置的输出是需要等几天温度才会升高超过该日。如果之后都不会升高，请在该位置用 0 来代替。
 * 示例：给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
 */

const getTemperatures = arr => {
    const len = arr.length
    const stack = []
    const res = new Array(len).fill(0)
    for (let i = 0; i < len; i++) {
        // 如果栈不为空，且存在当前温度值大于上一个温度值
        while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
            // 将栈顶温度值对应的索引出栈
            const top = stack.pop()
            // 计算 当前栈顶温度值与第一个高于它的温度值 的索引差值, 即是需要等的天数
            res[top] = i - top
        }
        // 栈里存的是温度对应的 index
        stack.push(i)
    }
}
/**
 * 滑动窗口最大值
 */

 const maxSlidingWindow = function(nums, k) {
    let start = 0
    let end = k - 1
    let res = []
    const getMax = (arr, start, end) => {
        if (!arr || !arr.length) return
        let max = arr[start]
        for (let i = start; i <= end; i++) {
            if (arr[i] > max) {
                max = arr[i]
            }
        }
        return max
    }
    while (end < nums.length) {
        const max = getMax(nums, start, end)
        res.push(max)
        start++
        end++
    }

    return res
};

// console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))

/**
 * 递归-全排列
 * https://leetcode-cn.com/problems/permutations
 *
 */
const permute = nums => {
    const len = nums.length
    // 用来记录当前的排列内容
    const cur = []
    const res = []
    // 记录一次排列过程中访问过的数字，避免重复
    const visit = {}
    // 定义 dfs 函数，入参是坑位的索引（从 0 计数）
    function dfs(n) {
        // 递归边界,  遍历到了不存在的坑位（第 len+1 个），则触碰递归边界返回
        if (n === len) {
            // 此时前 len 个坑位已经填满，将对应的排列记录下来
            res.push(cur.slice())
            return
        }
        for (const i of nums) {
            if (!visit[i]) {
                // 标识已访问过
                visit[i] = true
                cur.push(i)
                // 基于这个排列坑位继续往下一个坑走去
                dfs(n+1)
                // 一次排列的回归，还原
                visit[i] = false
                cur.pop()
            }
        }
    }
     // 从索引为 0 的坑位（也就是第一个坑位）开始 dfs
    dfs(0)
    return res
}

/**
 * 递归-求子集(组合)
 * https://leetcode-cn.com/problems/subsets/
 */
const subsets = nums => {
    const len = nums.length
    const res = []
    const subset = []
    function dfs(n) {
        res.push(subset.slice())
        //  没有显示的 return 是因为 for 语句会遍历所有的数字，当数字遍历完全时，也就意味着递归走到了尽头。
        for (let i = n; i < len; i++) {
            // 当前数字存在于组合中的情况，
            subset.push(nums[i])
            // 基于当前数字存在于组合中的情况，继续 dfs，找到与当前数字存在的所有组合
            dfs(i+1)
            // 当前数字不存在与组合中的情况
            subset.pop()
        }
    }
    dfs(0)
    return res
}

console.log(subsets([1,2,3]))

/**
 * 递归-限定组合
 * 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 * https://leetcode-cn.com/problems/combinations/
 * 示例: 输入: n = 4, k = 2
    输出:
    [
    [2,4],
    [3,4],
    [2,3],
    [1,2],
    [1,3],
    [1,4],
    ]
 */

const combine = (n, k) => {
    const res = []
    const subset = []

    function dfs(index) {
        // 递归式：普通组合问题，每到一个新的坑位处，我们都需要对组合结果数组进行更新；这道题中，当且仅当组合内数字个数为 k 个时，才会对组合结果数组进行更新。
        // 递归边界：只要组合内数字个数达到了 k 个，就不再继续当前的路径往下遍历，而是直接返回。
        if (subset.length === k) {
            res.push(subset.slice())
            return
        }
        for (let i = index; i <= n; i++) {
            // 当前数字存在于组合中的情况，
            subset.push(i)
            // 基于当前数字存在于组合中的情况，继续 dfs，找到与当前数字存在的所有组合
            dfs(i + 1)
            // 当前数字不存在与组合中的情况
            subset.pop()
        }
    }
    // 从 1 开始
    dfs(1)
    return res
}

/**
 * 二叉树层序遍历 BFS + 队列
 * https://leetcode-cn.com/problems/binary-tree-level-order-traversal/
 * 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）
 */

const levelOrder = root => {
    const res = []
    const queue = []
    if (root) {
        queue.push(root)
        while (queue.length) {
            // level 用来存储当前层的结点
            let level = []
            // 缓存当前层级的长度，这一步很关键，因为队列长度后面会发生改变
            let len = queue.length
            for (let i = 0; i < len; i++) {
                let top = queue.shift()
                level.push(top.val)
                if (top.left) {
                    queue.push(top.left)
                }
                if (top.right) {
                    queue.push(top.right)
                }
            }
            res.push(level)
        }
    }
    return res
}
/**
 * 翻转二叉树-递归
 */

const invertTree = root => {
    if (!root) return root
    if (root.right) {
        root.left = invertTree(root.right)
    }
    if (root.left) {
        root.right = invertTree(root.left)
    }
    return root
}
/**
 * 动态规划--爬楼梯
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 关键特征：
 *  1、要求你给出达成某个目的的解法个数
 *  2、不要求你给出每一种解法对应的具体路径
 * 思想：倒着分析问题-->得出状态转移方程
 */

// 递归计算 -- 这是非尾调用优化的
const climbStep = n => {
    if (n < 3) return n
    return climbStep(n - 1) + climbStep(n - 2)
}

// 尾调用优化
const climbStepBetter1 = (n, n1 = 0, n2 = 1) => {
    if (n <= 1) return n2
    return climbStepBetter1(n -1, n2, n1 + n2)
}

// 动态规划
const climbStepBetter2 = n => {
    if (n < 3) return n
    let sum = 2
    let n1 = 1
    let n2 = 1
    for (let i = 3; i <= n; i++) {
        n1 = n2
        n2 = sum
        sum = n1 + n2;
    }
    // 或者用记忆化数组更直观
    // let f = []
    // f[1] = 1
    // f[2] = 2
    // for (let i = 3; i<= n; i++) {
    //     f[i] = f[n - 1] + f[n - 2]
    // }
    // return f[n]
    return sum
}

/**
 * 见到最值问题，应该想到动态规划
 * https://leetcode-cn.com/problems/coin-change/
 * "最值问题": 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1
 * 示例：输入: coins = [1, 2, 5], amount = 11
 * 输出： 3
 * 解释: 11 = 5 + 5 + 1
 */

const coinChange = (coins, amount) => {
    // 用于保存每个目标总额对应的最小硬币个数
    const f = []

    f[0] = 0
    // 遍历  [1, amount] 这个区间的硬币总额
    for (let i = 1; i <= amount; i++) {
        // 求的是最小值，因此我们预设为无穷大，确保它一定会被更小的数更新
        f[i] = Infinity
        // 遍历每个可用硬币的面额
        for (let j = 0; j < coins.length; j++) {
            // 如果硬币面额小于目标总值，那么问题成立
            if (i >= coins[j]) {
                f[i] = Math.min(f[i], f[i - coins[j]] + 1)
            }
        }
    }
    // 若目标总额对应的解为无穷大，则意味着没有一个符合条件的硬币总数来更新它，本题无解，返回-1
    if (f[amount] === Infinity) return -1
    return f[amount]
}


/**
 * 无重复字符最长子串
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
 */

const lengthOfLongestSubstring = str => {
    const stack = []
    let max = 0
    for (let i of str) {
        let index = stack.indexOf(i)
        if (index !== -1) {
            // 出现过，那么需要删除 i 及 i 之前的元素，也就是从第 1 个元素到 i 这个元素
            stack.splice(0, index + 1)
        }
        stack.push(i)
        max = Math.max(stack.length, max)
    }
    return max
}

/**
 * 双指针 -- 数组按奇偶排序
 * https://leetcode-cn.com/problems/sort-array-by-parity/
 * 输入：[3,1,2,4]
    输出：[2,4,3,1]
    输出 [4,2,3,1]，[2,4,1,3] 和 [4,2,1,3] 也会被接受。
 */

const sortArrayByParity = nums => {
    // return nums.sort((a, b) => a % 2 - b % 2)
    let slow = 0
    let fast = 0
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 0) {
            [arr[slow], arr[fast]] = [arr[fast], arr[slow]]
            slow++
            fast++
        } else {
            fast++
        }
    }
    return nums
}

/**
 * 二叉树所有路径和 -- 递归
 * https://leetcode-cn.com/problems/binary-tree-paths/
 */

const binaryTreePaths = root => {
    const res = []
    const dfs = (r, s) => {
        if (!r) return
        if (!r.left && !r.right) {
            s += r.val
            res.push(s)
            return
        }
        s += `${r.val}->`
        dfs(r.left, s)
        dfs(r.right, s)
    }
    dfs(root, '')
    return res
}
/**
 * 螺旋矩阵
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 * https://leetcode-cn.com/problems/spiral-matrix/submissions/
 */
const  spiralOrder = matrix => {
    const res = []
    let top = 0
    let right = matrix[0].length - 1
    let bottom = matrix.length - 1
    let left = 0
    const size = matrix.length * matrix[0].length
    while (res.length !== size) {
        for (let i = left; i <= right; i++) res.push(matrix[top][i])
        top++
        for (let i = top; i <= bottom; i++) res.push(matrix[i][right])
        right--
        if (size === res.length) break
        for (let i = right; i >= left; i--) res.push(matrix[bottom][i])
        bottom--
        for (let i = bottom; i >= top; i--) res.push(matrix[i][left])
        left++
    }
    return res
}
/**
 * 螺旋矩阵 ii
 * https://leetcode-cn.com/problems/spiral-matrix-ii/
 * 输入：n = 3
 * 输出：[[1,2,3],[8,9,4],[7,6,5]]
 */
const generateMatrix = n => {
    const size = n * n
    const res = new Array(n).fill(0).map(i => new Array(n).fill(0))
    let top = 0
    let right = n - 1
    let bottom = n - 1
    let left = 0
    let num = 1

    while(num <= size) {
        for (let i = left; i<= right; i++) res[top][i] = num++
        top++
        for (let i = top; i <= bottom; i++) res[i][right] = num++
        right--
        if (num === size) break
        for (let i = right; i >= left; i--) res[bottom][i] = num++
        bottom--
        for (let i = bottom; i >= top; i--) res[i][left] = num++
        left++
    }
    return res
}

/**
 * 旋转图像
 * https://leetcode-cn.com/problems/rotate-image/
 */
const rotate = matrix => {
    // 开辟空间旋转
    // 对于矩阵中第 i 行的第 j 个元素，在旋转后，它出现在倒数第 i 列的第 j 个位置。
    const n = matrix.length
    const res = new Array(n).fill(0).map(i => new Array(n).fill(0))
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            res[col][n - row - 1] = matrix[row][col]
        }
    }
    return res
}
const rotate2 = matrix => {
    // 原地旋转
    // 用翻转代替旋转的方法
    const n = matrix.length

    // 水平翻转
    for (let row = 0; row < Math.floor(n / 2 ); row++) {
        for (let col = 0; col < n; col++) {
            [matrix[row][col], matrix[n - row - 1][col]] = [matrix[n - row - 1][col], matrix[row][col]]
        }
    }
    // 主对角线翻转
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
        }
    }
    return matrix
}

/**
 * 两两交换链表中相邻的节点，返回新的链表
 * https://leetcode-cn.com/problems/swap-nodes-in-pairs/
 */
const swapListNode = head => {
    // 方法一 迭代
    const dummy = new ListNode('')
    dummy.next = head
    let cur = dummy
    while (cur.next && cur.next.next) {
        const node1 = cur.next
        const node2 = cur.next.next
        cur.next = node2
        node1.next = node2.next
        node2.next = node1
        cur = node1
    }
    return dummy.next
    // 方法二 递归
    // if (!head || !head.next) return head
    // const cur = head.next
    // head.next = swapListNode(cur.next)
    // cur.next = head
    // return cur
}

/**
 * 动态规划
 * 不同路径
 * https://leetcode-cn.com/problems/unique-paths/
 */
const uniquePaths = function(m, n) {
    const f = new Array(m).fill(0).map(() => new Array(n).fill(0))
    for (let i = 0; i < m; i++) {
        f[i][0] = 1
    }
    for (let j = 0; j < n; j++) {
        f[0][j] = 1
    }
    for (let i = 1;i < m; i++) {
        for (let j = 1; j < n; j++) {
            // 动态转移方程
            f[i][j] = f[i-1][j] + f[i][j-1]
        }
    }
    return f[m-1][n-1]
};

/**
 * 动态规划
 * 最小路径和
 * https://leetcode-cn.com/problems/minimum-path-sum/
 * @param {grid}
 * @returns
 */

const minPathSum = function(grid) {
    let m = grid.length
    let n = grid[0].length
    const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    }
    for (let j = 1; j < m; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j]
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
        }
    }
    return dp[m - 1][n - 1]
}

/**
 * 整数反转
 * https://leetcode-cn.com/problems/reverse-integer/
 * 思想：取余。
 * 余 10 拿到末位，再加回来
 */

const reverseInteger = x => {
    let res = 0
    while(x) {
        res = res * 10 + x % 10
        if (res > Math.pow(2, 31) - 1 || res < Math.pow(-2, 31)) return 0
        x = x / 10 | 0
    }
    return res
}

/**
 * 二叉搜素树：Binary Search Tree）简称 BST
 * 应该满足 左孩子 <= 根结点 <= 右孩子 这样的大小关系
 * 1、是一棵空树
 * 2、是一棵由根结点、左子树、右子树组成的树，同时左子树和右子树都是二叉搜索树，且左子树上所有结点的数据域都小于等于根结点的数据域，右子树上所有结点的数据域都大于等于根结点的数据域
 */
class TreeNode {
    val
    left
    right
    constructor(val) {
        this.val = val
        this.left = null
        this.right = null
    }
}

/**
 * 是否有效二叉搜索树
 * https://leetcode-cn.com/problems/validate-binary-search-tree/
 * @param {*} root
 * @returns
 */
const isValidBST = root => {
    function dfs(root, min, max) {
        if (!root) return true
        if (root.val <= min || root.val >= max) return false
        // 若左孩子大于根结点值， 或者右孩子小于根结点值， 则不合法
        return dfs(root.left, min, root.val) && dfs(root.right, root.val, max)
    }
    return dfs(root, -Infinity, Infinity)
}

/**
 * 搜索二叉树-搜索指定值的节点
 * https://leetcode-cn.com/problems/search-in-a-binary-search-tree/
 * @param {*} root
 * @param {*} n
 * @returns
 */
const search = (root, n) => {
    if (!root) return
    if (root.val === n) {
        return root
    } else if (n < root.val) {
        return search(root.left, n)
    } else {
        return search(root.right, n)
    }
}
/**
 * 插入新节点
 * https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/
 * @param {*} root
 * @param {*} n
 * @returns
 */

const insertInToBST = (root, n) => {
    if (!root) {
        const root = new TreeNode(n)
        return root
    }
    if (n < root.val) {
        // 小于当前值，往左边插入
        root.left = insertInToBST(root.left, n)
    } else {
        // 大于当前值，往右插入
        root.right = insertInToBST(root.right, n)
    }
    return root
}
/**
 * 删除指定节点
 * https://leetcode-cn.com/problems/delete-node-in-a-bst/
 * 维持二叉搜索树的数据有序性
 */
const deleteNode = (root, n) => {
     // 如果没找到目标结点，则直接返回
    if (!root) return root
     // 定位到目标结点，开始分情况处理删除动作
    if (root.val === n) {
        // 若是叶子结点，则不需要想太多，直接删除
        if (!root.left && !root.right) {
            root = null
        } else if (root.left) {
            // 寻找左子树里值最大的结点
            const maxLeft = findMax(root.left)
            // 用这个 maxLeft 覆盖掉需要删除的当前结点
            root.val = maxLeft.val
            // 覆盖动作会消耗掉原有的 maxLeft 结点
            root.left = deleteNode(root.left, maxLeft.val)
        } else {
            const minRight = findMin(root.right)
            root.val = minRight.val
            root.right = deleteNode(root.right, minRight.val)
        }
    } else if (root.val > n) {
        // 若当前结点的值比 n 大，则在左子树中继续寻找目标结点
        root.left = deleteNode(root.left, n)
    } else {
        // 若当前结点的值比 n 小，则在右子树中继续寻找目标结点
        root.right = deleteNode(root.right, n)
    }

    // 寻找左子树最大值
    function findMax(root) {
        while(root.right) {
            root = root.right
        }
        return root
    }
    // 寻找右子树的最小值
    function findMin(root) {
        while(root.left) {
            root = root.left
        }
        return root
    }
    return root
}

/**
 * 将排序数组转化为二叉搜索树
 * https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/
 * @param {*} nums
 */
const sorteArrayToBST = nums => {
    if (!nums.length) return null
    const buildBST = (start, end) => {
        if (start > end) return null
        const mid = Math.floor((start + end) / 2)
        const cur = new TreeNode(nums[mid])
        cur.left = buildBST(start, mid - 1)
        cur.right = buildBST(mid + 1, end)
    }
    return buildBST(0, nums.length - 1)
}


/**
 * 平衡二叉树： (又称 AVL Tree）指的是任意结点的左右子树高度差绝对值都不大于1的二叉搜索树。
 *
 */

/**
 * 是否是平衡二叉树
 * https://leetcode-cn.com/problems/balanced-binary-tree/
 */
const isValidAVL = root => {
    let flag = true
    function dfs(root) {
        if (!root || !flag) return 0
        // 左子树高度
        const left = dfs(root.left)
        // 右子树高度
        const right = dfs(root.right)
        // 如果左右子树的高度差绝对值大于1，那么不是平衡二叉树
        if (Math.abs(left - right) > 1) {
            flag = false
            return 0
        }
         // 返回当前子树的高度
        return Math.max(left, right) + 1
    }
    dfs(root)
    return flag
}

/**
 * 将二叉搜索树平衡
 * https://leetcode-cn.com/problems/balance-a-binary-search-tree/
 * 先中序遍历得出有序数组，再执行 sorteArrayToBST
 */

 const balanceBST = function(root) {
    // 初始化中序遍历序列数组
    const nums = []
    // 定义中序遍历二叉树，得到有序数组
    function inorder(root) {
        if(!root) {
            return
        }
        inorder(root.left)
        nums.push(root.val)
        inorder(root.right)
    }

    // 这坨代码的逻辑和上一节最后一题的代码一模一样
    function buildAVL(low, high) {
        // 若 low > high，则越界，说明当前索引范围对应的子树已经构建完毕
        if(low > high) {
            return null
        }
        // 取数组的中间值作为根结点值
        const mid = Math.floor((low + high) / 2)
        // 创造当前树的根结点
        const cur = new TreeNode(nums[mid])
        // 构建左子树
        cur.left = buildAVL(low, mid - 1)
        // 构建右子树
        cur.right = buildAVL(mid + 1, high)
        // 返回当前树的根结点
        return cur
    }
    // 调用中序遍历方法，求出 nums
    inorder(root)
    // 基于 nums，构造平衡二叉树
    return buildAVL(0, nums.length-1)
};

/**
 * 字符串大数相加
 * https://leetcode-cn.com/problems/add-strings/
 */

const addString = (a, b) => {
    // 末位开始相加
    let i = a.length - 1,
        j = b.length - 1,
        // 进位累加参数
        add = 0,
        // 每一位相加的结果
        res = []
    while (i >=0 || j >= 0 || add !== 0) {
        // 变为数字才能相加
        let x = i >= 0 ? -(-a.charAt(i)) : 0
        let y = j >= 0 ? -(-b.charAt(j)) : 0
        let cur = x + y + add
        // 从个位 push的
        res.push(cur % 10)
        add = cur / 10 | 0
        i--
        j--
    }
    return res.reverse().join('')
}

/**
 * 2 的幂
 * https://leetcode-cn.com/problems/power-of-two/
 * @param {number} n
 * @return {boolean}
 */
 var isPowerOfTwo = function(n) {
    return n > 0 && (n & (n - 1)) === 0
};
// 5 & 4 0b101 & 0b100 => 1
// 4 & 3 0b100 & 0b011 => 0


// 二分查找
/**
 * https://leetcode-cn.com/problems/binary-search/
  核心逻辑：折半思想， 也是双指针思想
  如果 val 比中间数小，则改 max 为 mid - 1
  如果 val 比中间数大，则改 min 为 mid + 1
*/
function binarySearch(arr, val) {
    let min = 0;
    let max = arr.length - 1;
    while (min <= max) {
      let mid = Math.floor((max + min) / 2);
      if (arr[mid] === val) {
        return mid;
      } else if (val < arr[mid]) {
        max = mid - 1;
      } else {
        min = mid + 1;
      }
    }
    return 'not found';
  }
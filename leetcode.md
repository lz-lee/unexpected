
# leetcode
| 分类 |
|--|
|[栈、队列](#栈、队列)|
|[双指针](#双指针)|
|[递归](#递归)|
|[二叉树遍历](#二叉树遍历)|
|[动态规划](#动态规划)|
|[链表](#链表)|
|[数字、数学题](#数字、数学题)|


---
## 栈、队列
| 题目 | 题解 |
| --- | --- |
|[有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)|[有效的括号](#有效的括号)|
|[每日温度](https://leetcode-cn.com/problems/daily-temperatures/)|[每日温度](#每日温度)|
|[]()|[去除重复字符](#去除重复字符)|
#### 有效的括号
```js
const isValid = str => {
  const stack = [];
  const strMap = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  for (const i of str) {
    if (i === '(' || i === '[' || i === '{') {
      stack.push(i);
    } else {
      const top = stack.pop();
      if (i !== strMap[top]) {
          return false;
      }
    }
  }
  if (stack.length > 0) {
    return false;
  }
  return true;
}
```

#### 每日温度
```js
/**
 * 思路：维护一个存储下标的单调栈，从栈底到栈顶的下标对应的温度列表中的温度依次递减。如果一个下标在单调栈里，则表示尚未找到下一次温度更高的下标
 *
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
  return res
}
```

#### 去除重复字符
```js
/**
 * 单调栈
 */
const removeDuplicateStr = str => {
  const stack = []
  for (let i of stack) {
    if (`${stack[stack.length - 1]}` !== i) {
      stack.push(i)
    }
  }
  return stack.join('')
}
```
---

## 双指针
| 题目 | 题解 |
| --- | --- |
|[删除有序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)|[删除有序数组中的重复项](#删除有序数组中的重复项)|
|[数组按奇偶排序](https://leetcode-cn.com/problems/sort-array-by-parity/)|[数组按奇偶排序](#数组按奇偶排序)|
|[合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)|[合并两个有序数组](#合并两个有序数组)|
|[二分查找](https://leetcode-cn.com/problems/binary-search/)|[二分查找](#二分查找)|
|[双指针-删除链表的倒数第N个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)|[双指针-删除链表的倒数第N个结点](#双指针-删除链表的倒数第N个结点)|

#### 删除有序数组中的重复项
```js
/**
 * 删除排序数组中的重复项，且返回新数组的长度
 * 双指针：前提是数组有序
 * @param [0,0,1,1,1,2,2,3,3,4]
 * @return 5 nums = [0,1,2,3,4]
 */
const  removeDuplicates = arr => {
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
```

#### 数组按奇偶排序
```js
/**
 * 双指针 -- 数组按奇偶排序
 * 输入：[3,1,2,4]
 * 输出：[2,4,3,1]
 * 输出 [4,2,3,1]，[2,4,1,3] 和 [4,2,1,3] 也会被接受。
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
```

#### 合并两个有序数组
```js
const mergeArr = (nums1, nums2) => {
  let m = nums1.length
  let n = nums2.length
  // 初始化两个指针的指向
  let i = m - 1, j = n - 1
  // 初始化 nums1 的尾部索引 k
  let k = m + n -1
  // 从后往前排，大数在后边，将 nums2 的数插入到 nums1 中，原地合并
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
```
#### 二分查找
```js
/**
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
 * 核心逻辑：折半思想(分而治之)， 也是双指针思想
 * 如果 val 比中间数小，则改 max 为 mid - 1
 * 如果 val 比中间数大，则改 min 为 mid + 1
*/
const binarySearch = (arr, val) => {
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
    return -1;
}
```

#### 双指针-删除链表的倒数第N个结点
```js
/**
 * 双指针
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
  while(fast.next) {
    slow = slow.next
    fast = fast.next
  }
  slow.next = slow.next.next
  return dummy.next
}
```

---

## 递归

| 题目 | 题解 |
| --- | --- |
|[递增子序列](https://leetcode-cn.com/problems/increasing-subsequences/) |[递增子序列](#递增子序列)|

#### 递增子序列
```js
/**
 * 491.求递增子序列
 * 递归--也是求组合问题，只不过这个组合是排序的
 * 输入：[4, 6, 7, 7]
 * 输出：[[4, 6], [4, 7], [4, 6, 7], [4, 6, 7, 7], [6, 7], [6, 7, 7], [7,7], [4,7,7]]
 */
const findSubSequences = nums => {
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
```


---

## 二叉树遍历
| 题目 | 题解 |
| --- | --- |
| [二叉树最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/) | [二叉树最大深度](#二叉树最大深度) |
| [二叉树最小深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/) | [二叉树最小深度](#二叉树最小深度) |
|[二叉树层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)|[二叉树层序遍历](#二叉树层序遍历)|
|[翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)|[翻转二叉树](#翻转二叉树)|
|[二叉树所有路径和](https://leetcode-cn.com/problems/binary-tree-paths/)|[二叉树所有路径和](#二叉树所有路径和)|
|[]()|[二叉树遍历](#二叉树遍历)|

```js
function TreeNode(val) {
  this.val = val
  this.next = null
  this.right = null
}
```
#### 二叉树最大深度

```js
/**
 * 递归
 */
const maxDepth = root => {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

```
#### 二叉树最小深度

```js
/**
 * 递归
 */
const minDepth = root => {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;
  return 1 + Math.min(root.left ? minDepth(root.left) : Infinity, root.right ? minDepth(root.right) : Infinity);
}

```

#### 二叉树层序遍历
```js
/**
 * 二叉树层序遍历 BFS + 队列
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
```
#### 翻转二叉树
```js
const invertTree = root => {
  if (!root) return root
  let right = inverTree(root.right)
  let left = inverTree(root.left)
  root.left = right
  root.right = left
  return root
}
```

#### 二叉树所有路径和
```js
/**
 * 递归
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
```

#### 二叉树遍历
```js
// 1、递归--深度优先
const preorderTraversal = root => {
  if (!root) return root
  const result = [];
  // 前序遍历
  result.push(root.val);
  result.push.apply(result, preorderTraversal(root.left));
  result.push.apply(result, preorderTraversal(root.right));
  // // 中序遍历
  // result.push.apply(result, preorderTraversal(root.left));
  // result.push(root.val);
  // result.push.apply(result, preorderTraversal(root.right));
  // // 后序遍历
  // result.push.apply(result, preorderTraversal(root.left));
  // result.push.apply(result, preorderTraversal(root.right));
  // result.push(root.val);
  return result;
}

// 2、迭代 -- 栈 前序遍历
const preorderTraversal = (root) => {
  if (!root) return []
  const stack = [root];
  const result = [];

  while (stack.length) {
    let item = stack.pop();
    result.push(item.val);
    // 倒序 push，后 push 的先 pop，即实现前序遍历 L=>D=>R
    if (item.right) stack.push(item.right);
    if (item.left) stack.push(item.left);
  }
  return result;
}
// 3、迭代--后序遍历：栈
// res =>  左 - 右 - 根
// 出 stack 顺序 => 根 - 右 - 左
const preorderTraversal = (root) => {
  if (!root) return root
  const stack = [root]
  const res = []
  while (stack.length) {
    let cur = stack.pop()
    res.unshift(cur.val)
    if (cur.left) stack.push(cur.left)
    if (cur.right) stack.push(cur.right)
  }
  return res
}
// 4、迭代--中序遍历
// res => 左 - 中 - 右
const preorderTraversal = (root) => {
    const stack = []
    const res = []
    let cur = root
    while (cur || stack.length) {
        // 内层 while 一直找左孩子
        while (cur) {
            stack.push(cur)
            cur = cur.left
        }
        // 取最左的孩子
        cur = stack.pop()
        res.push(cur.val)
        // 尝试读取 cur 的右孩子
        cur = cur.right
    }
    return res
}
```

---

## 动态规划
* 关键特征：
  *  1、要求你给出达成某个目的的解法个数（最值问题）
  *  2、不要求你给出每一种解法对应的具体路径
* 思想：倒着分析问题 --> 得出状态转移方程

| 题目 | 题解 |
| --- | --- |
| [最大子序和](https://leetcode-cn.com/problems/maximum-subarray/) | [最大子序和](#最大子序和) |
| [最长递增子序列的长度](https://leetcode-cn.com/problems/longest-increasing-subsequence/) | [最长递增子序列的长度](#最长递增子序列的长度) |
| [爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/) | [爬楼梯](#爬楼梯) |
| [零钱兑换](https://leetcode-cn.com/problems/coin-change/) | [零钱兑换](#零钱兑换) |
| [不同路径-i](https://leetcode-cn.com/problems/unique-paths/) | [不同路径-i](#不同路径-i) |
| [最小路径和](https://leetcode-cn.com/problems/minimum-path-sum/) | [最小路径和](#最小路径和) |
| [卖股票最佳时机-i](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/) | [卖股票最佳时机-i](#卖股票最佳时机-i) |
| [卖股票最佳时机-ii](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/) | [卖股票最佳时机-ii](#卖股票最佳时机-ii) |


#### 最大子序和
```js
/**
 * 在这里，sum 如果小于 0 则舍弃，将下一个 i 赋值给 sum；
 * sum 如果大于 0 则继续累加
 * @param {nums: number[]} [-2,1,-3,4,-1,2,1,-5,4]
 * @return number
 */
const maxSubArray = nums => {
  let max = arr[0]
  let sum = 0
  for (let i of nums) {
    if (sum > 0) {
      sum = sum + i
    } else {
      sum = i
    }
    max = Math.max(max, sum)
  }
  return max
}
```

#### 最长递增子序列的长度
```js
/**
 *  dp[i] 表示以 nums[i] 这个数结尾的最长递增子序列的长度。
 * dp[i] 初始值为 1，因为以 nums[i] 结尾的最长递增子序列起码要包含它自己。
 * 怎么求 dp[i] ?
 * 既然是递增子序列，我们只要找到前面那些结尾比 nums[i] 小的子序列(即如果nums[j] < nums[i])，然后把 nums[i] 接到最后，就可以形成一个新的递增子序列，而且这个新的子序列长度加一.(即 在 dp[j] 这个位置开始长度加 1)
 * 显然，可能形成很多种新的子序列，但是我们只选择最长的那一个，把最长子序列的长度作为 dp[i] 的值即可。
 * https://labuladong.gitbook.io/algo/di-er-zhang-shou-ba-shou-shua-dong-tai-gui-hua/zi-xu-lie-lei-xing-wen-ti/dong-tai-gui-hua-she-ji-zui-chang-di-zeng-zi-xu-lie
 */

const lengthOfLIS = nums => {
  let len = nums.length
  let dp = new Array(len).fill(1)
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return len < 2 ? len : Math.max(...dp)
}

```

#### 爬楼梯
```js
const climpStep = n => {
  let f = []
  f[1] = 1
  f[2] = 2
  for (let i = 3; i <= n; i++) {
    f[i] = f[n - 1] + f[n - 2]
  }

  return f[n]

  // if (n < 3) return n
  // let sum = 2
  // let n1 = 1
  // let n2 = 1
  // for (let i = 3; i <= n; i++) {
  //     n1 = n2
  //     n2 = sum
  //     sum = n1 + n2;
  // }
  // return sum
}

// 尾调用优化--斐波那契数列
const climbStepBetter1 = (n, n1 = 0, n2 = 1) => {
    if (n <= 1) return n2
    return climbStepBetter1(n -1, n2, n1 + n2)
}

```

#### 零钱兑换
```js
/**
 * 输入: coins = [1, 2, 5], amount = 11，输出 3
 * 倒推思想：f(11) = Math.min(f(11 - 1) + 1, f(11 - 2) + 1, f(11 - 5) + 1)
 * f[x] 表示每一个总额数字对应的最少硬币数
 * 动态转移方程 f[i] = Math.min(f[i], f[i - coin[j]] + 1)
 *
 */

const coinChange = nums => {
  // 用于保存每个目标总额对应的最小硬币个数
  const f = []
  // 提前定义已知情况
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
```

#### 不同路径-i
```js
/**
 * 一个机器人位于一个 m x n 网格的左上角,机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角, 问总共有多少条不同的路径？
 * 状态转移方程 f[m][n] = f[m - 1][n] + f[m][n - 1]
 */
const uniquePaths = (m, n) => {
  const f = new Array(m).fill(0).map(() => new Array(n).fill(0))
  // 横轴初始化为 1 步
  for (let i = 0; i < m; i++) {
      f[i][0] = 1
  }
  // 纵轴初始化为 1 步
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
}

```

#### 最小路径和
```js
/**
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 说明：每次只能向下或者向右移动一步。
 *
 */
const minPathSum = function(grid) {
  let m = grid.length
  let n = grid[0].length
  // 创建二维数组dp，与原始网格的大小相同，dp[i][j] 表示从左上角出发到 (i,j) 位置的最小路径和
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
  dp[0][0] = grid[0][0];
  // 累加第一列的和
  for (let i = 1; i < m; i++) {
      dp[i][0] = dp[i - 1][0] + grid[i][0]
  }
  // 累加第一行的和
  for (let j = 1; j < m; j++) {
      dp[0][j] = dp[0][j - 1] + grid[0][j]
  }
  // 再求之后的每一个单元格的最小和
  for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
          // 状态转移方程
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
      }
  }
  return dp[m - 1][n - 1]
}

```
#### 卖股票最佳时机-i
```js
/**
 * @param {number[]} prices
 * @return {number}
 */

const maxProfit = nums => {
  let min = nums[0]
  let max = 0
  for (let i of nums) {
    // 先求最小值
    min = Math.min(min, i)
    // 再求差值的最大值
    max = Math.max(max, i - min)
  }
  return max
}
```

#### 卖股票最佳时机-ii
```js
/**
 * 贪心算法
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let max = 0
  for (let i = 1; i < prices.length; i++) {
    let cur = prices[i] - prices[i - 1]
    if (cur > 0) max += cur
  }
  return max
};
```

---

## 链表
| 题目 | 题解 |
| --- | --- |
|[有序链表合并](https://leetcode-cn.com/problems/merge-two-sorted-lists/)|[有序链表合并](#有序链表合并)|
|[相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)|[相交链表](#相交链表)|
|[删除排序链表中的重复元素i](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)|[删除排序链表中的重复元素i](#删除排序链表中的重复元素i)|
|[删除排序链表中的重复元素ii](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii//)|[删除排序链表中的重复元素ii](#删除排序链表中的重复元素ii)|
|[反转链表i](https://leetcode-cn.com/problems/reverse-linked-list/)|[反转链表i](#反转链表i)|
|[反转链表ii](https://leetcode-cn.com/problems/reverse-linked-list/)|[反转链表ii](#反转链表ii)|
|[删除链表的倒数第N个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)|[删除链表的倒数第N个结点](#删除链表的倒数第N个结点)|
|[环形链表i](https://leetcode-cn.com/problems/linked-list-cycle/)|[环形链表i](#环形链表i)|
|[环形链表ii](https://leetcode-cn.com/problems/linked-list-cycle-ii/)|[环形链表ii](#环形链表ii)|

```js
class ListNode {
  val;
  next;

  constructor(val) {
      this.val = val
      this.next = null
  }
}
```

#### 有序链表合并
```js
const mergeTwoList = (l1, l2) => {
  let head = new ListNode()
  let cur = head
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      cur.next = l1
      l1 = l1.next
    } else {
      cur.next = l2
      l2 = l2.next
    }
    cur = cur.next
  }
  // 处理链表不等长的情况
  cur.next = l1 || l2
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
```
#### 相交链表
```js
/**
 * 相交链表，返回相交的节点
 * @param {*} l1
 * @param {*} l2
 * @returns
 */
const getIntersectionNode = (l1, l2) => {
  if (!l1 || !l2) return null
  let cur1 = l1, cur2 = l2
  // 让两个链表都走相同长度的路径，那么如果有相交处，则节点相同
  // A、B 都走 A + B 长度的路线
  while(cur1 !== cur2) {
    // A 走完 A 的路线再去走 B
    cur1 = !cur1 ? l2 : cur1.next
    // B 走完 B 的路线再去走 A
    cur2 = !cur2 ? l1 : cur2.next
  }
  return cur1
}
```

#### 删除排序链表中的重复元素i
```js
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
```

#### 删除排序链表中的重复元素ii
```js
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

```
#### 反转链表i
```js
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

```
#### 反转链表ii

```js
/**
 * 部分反转
 * 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
 * 头插法
 * 定义两个指针，分别称之为 g(guard 守卫) 和 p(point)。
 * 根据参数 m 确定 g 和 p 的位置， g 指向第一个反转参数的 prev, p 指向第一个反转节点
 * 移动 p 节点
 * 遍历过程中定义一个指针 remove 指向 p 后面的元素要删除的节点
 * 将 g.next 插入到 remove.next
 * 将 remove 插入到 g 的后面，
 */

const reverseBetween = (head, m, n) => {
  const dummy = new ListNode()
  dummy.next = head
  let g = dummy
  let p = dummy.next
  for (let i = 0; i < m - 1; i++) {
    g = g.next
    p = p.next
  }
  for (let i = 0; i < n - m; i++) {
    let remove = p.next
    p.next = p.next.next
    remove.next = g.next
    g.next = remove
  }
  return dummy.next
}

```

#### 删除链表的倒数第N个结点
```js
/**
 * 双指针
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
  while(fast.next) {
    slow = slow.next
    fast = fast.next
  }
  slow.next = slow.next.next
  return dummy.next
}
```
#### 环形链表i
```js
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
```

#### 环形链表ii
```js
/**
 * 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 */

const detectCycle = function(head) {
  while (head) {
    if (head.flag) return head
    head.flag = true
    head = head.next
  }
  return null
}
```
---

## 数字、数学题
| 题目 | 题解 |
| --- | --- |
|[]()|[]()|
|[]()|[]()|
|[]()|[]()|


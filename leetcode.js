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

/**
 * 版本对比
 * https://leetcode-cn.com/problems/compare-version-numbers/
 */

const compareVersions = (v1, v2) => {
    let nums1 = v1.split('.')
    let nums2 = v2.split('.')
    let len = Math.max(nums1.length, nums2.length)
    for (let i = 0; i < len; i++) {
        // 不足的就补 0
        let a = Number(nums1[i] || 0)
        let b = Number(nums2[i] || 0)
        if (a - b !== 0) {
            return a - b > 0 ? 1 : - 1
        }
    }
    return 0
}
/**
 * 56、区间合并 https://leetcode-cn.com/problems/merge-intervals/
 * 贪心算法
 */

const merge = (nums) => {
    nums = nums.sort((a,b) => a[0] - b[0])
    let prev = nums[0]
    let res = []
    for (let i = 1;i < nums.length; i++) {
        let cur = nums[i]
        // 区间断了
        if (cur[0] > prev[1]){
            // push 之前合并过的的 prev
            res.push(prev)
            // 更新指针
            prev = cur
        } else {
            // 没断找最大值
            prev[1] = Math.max(prev[1], cur[1])
        }
    }
    res.push(prev)
    return res;
}
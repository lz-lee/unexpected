function swap(arr, indexA, indexB) {
    [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}

const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];
/**
 * 冒泡排序
 */
function bubbleSort1(arr) {
    const len = arr.length;

    for (let i = 0; i < len; i++) {
        // 遍历数组的前 len - i 项，忽略已经排过序的 i 项
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}

// 优化的冒泡排序
function betterBubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        let flag = false;
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                // 只要发生了一次交换，就修改标志位
                flag = true;
            }
        }
        // 若一次交换也没发生，则说明数组有序，直接放过
        if (!flag) return arr;
    }
}

/**
 * 冒泡排序加入第二个参数控制升序降序
 */
function bubbleSort1(arr, fn) {
    const len = arr.length;

    for (let i = 0; i < len; i++) {
        // 遍历数组的前 len - i 项，忽略已经排过序的 i 项
        for (let j = 0; j < len - i - 1; j++) {
            if (fn(arr[j], arr[j + 1]) > 0) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}

bubbleSort1(arr, (a, b) => a - b);
bubbleSort1(arr, (a, b) => b - a);

/**
 * 冒泡排序 双向遍历
 */

function bubbleSort2(arr) {
    const len = arr.length;
    let start = 0;
    let end = len - 1;

    while (start < end) {
        for (let i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
            }
        }
        end--;
        for (let i = end; i > start; i--) {
            if (arr[i - 1] > arr[i]) {
                swap(arr, i - 1, i);
            }
        }
        start++;
    }
    return arr;
}

// 插入排序
/**
 * 核心思想是: “找到元素在它前面那个序列中的正确位置”
  1、数组从 i = 1 开始， i < arr.length 而不是 length - 1
  2、取 j = i, 从 j 位置开始遍历,
  3、如果 arr[j - 1] > arr[j] && j > 0 交换两个位置（即数组前一项大于后一项）
  4、j--
*/
function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0 && arr[j - 1] > arr[j]; j--) {
            swap(arr, j, j - 1);
        }
    }
    return arr;
}

// 选择排序
/**
  核心逻辑：找最小 index
  1、假设当前 i 为最小值 index
  2、将 i 与剩余值对比
  3、找出最小值的位置，放入到 i
  4、 i + 1 继续循环
*/
function selectSort(arr) {
    const len = arr.length;
    // 定义 minIndex，缓存当前区间最小值的索引，注意是索引
    let minIndex;
    for (let i = 0; i < len - 1; i++) {
        // 初始化 minIndex 为当前区间第一个元素
        minIndex = i;
        // i、j分别定义当前区间的上下界，i是左边界，j是右边界
        for (let j = i; j < len; j++) {
            minIndex = arr[j] < arr[minIndex] ? j : minIndex;
        }
        // 如果 minIndex 对应元素不是目前的头部元素，则交换两者
        if (minIndex !== i) {
            swap(arr, i, minIndex);
        }
    }
    return arr;
}

// 快速排序
/**
   核心逻辑：找基准元素
   1、将数组按基准元素大小分开两半
   2、对分开的两个子集继续递归，递归返回条件是数组长度为 1
   3、concat拼回原数组

*/
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let midIndex = Math.floor(arr.length / 2);
    let midVal = arr.splice(midIndex, 1)[0];
    let left = [];
    let right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < midVal) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(midVal, quickSort(right));
}

/**
 * 归并排序: 拆半递归
 * 二分思想
 */

function merge(left, right) {
    const result = [];
    while (left.length > 0 && right.length > 0) {
        result.push(left[0] <= right[0] ? left.shift() : right.shift());
    }
    return result.concat(left, right);
}

function mergeSort(arr) {
    if (arr.length === 1) return arr;
    const len = arr.length;
    const mid = Math.floor(len / 2);
    // 用 array.splice 取代 array.slice，减少一半的空间消耗，但是会改变原数组
    // const left = arr.splice(0, mid);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
}

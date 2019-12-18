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

    while(start < end) {
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
        start++
    }
    return arr;
 }


/**
 * 选择排序
 */
function selectSort(arr) {
    const len = arr.length;

    for (let i = 0; i < len - 1; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[min]) {
                // 每次将小的那项的索引重新赋值给min
                min = j;
            }
        }
        if (min !== i) {
            swap(arr, min, i);
        }
    }
    return arr;
}

/**
 * 插入排序: 从数组的第二项开始遍历
 *
 */
function insertSort(arr) {
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        const tmp = arr[i];
        let j = i;
        while( j > 0 && arr[j - 1] > tmp) { // 前一项比后一项大，将前一项赋值给后一项
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = tmp; // 将最小的赋值给前一项
    }
}

/**
 * 归并排序: 拆半递归
 * 二分思想
 */

function merge(left, right) {
    const resule = [];
    while(left.length > 0 && right.length > 0) {
        result.push(left[0] <= right[0] ? left.shift() : right.shift());
    }
    return result.concat(left, right);
}

function mergeSort(arr) {
    if (arr.length === 1) return arr;
    const len = arr.length;
    const mid = Math.floor(len / 2);
    const left = arr.splice(0, mid); // 用 array.splice 取代 array.slice，减少一半的空间消耗。
    const right = arr;
    return merge(mergeSort(left), mergeSort(right))
}

/**
 *  二分查找: 折半
 */
function binarySearch(arr, value) {
    let min = 0;
    let max = arr.length - 1;

    while (min <= max) {
        const mid = Math.floor((min + max) / 2);
        if (arr[mid] === value) {
            return mid;
        } else if (arr[mid] > value) {
            max = mid - 1;
        } else {
            min = mid + 1;
        }
    }
    return 'not found'
}
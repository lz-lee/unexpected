import { List } from 'immutable';

/**
 * https://github.com/immutable-js/immutable-js/issues/1452
 * https://github.com/immutable-js/immutable-js/pull/1344
 *  */

const isMergeble = a => {
  return  a && typeof a === 'object' && typeof a.mergeWith === 'function' && !List.isList(a);
}

export default mergeDeepOverWriteLists = (a, b) => {
  // If b is null, it would overwrite a, even if a is mergeable
  if (b === null) return b;
  if (isMergeble(a)) {
    return a.mergeWith(mergeDeepOverWriteLists, b);
  }
  return b;
}

// 此方法用于修复 mergeDeep 方法会直接 concat List类型<数组>，而不是 merge

import { fromJS, mergeDeep } from 'immutable';
import mergeDeepOverwriteLists from './mergeDeepOverwriteLists';

const a = {
  list: ['css', 'js', 'html']
};

const b = {
  list: ['css', 'js', 'html', 'react-router'],
  options: ['react', 'redux', 'webpack']
};

const resultConcat = {
  list: ['css', 'js', 'html', 'css', 'js', 'html', 'react-router'],
  options: ['react', 'redux', 'webpack']
};

const resultMerge = {
  list: ['css', 'js', 'html', 'react-router'],
  options: ['react', 'redux', 'webpack']
};

describe('mergeDeepConcatList', () => {
  test('merge deep a and b will concat a list', () => {
    const c = mergeDeep(fromJS(a), fromJS(b));

    expect(c.toJS()).toEqual(resultConcat);
  });
});

describe('mergeDeepOverwriteLists', () => {
  test('merge deep a and b overwrite Lists', () => {
    const c = mergeDeepOverwriteLists(fromJS(a), fromJS(b));

    expect(c.toJS()).toEqual(resultMerge);
  });
});

describe('mergeDeepOverwriteLists', () => {
  test('merge deep b is null return null', () => {
    const c = mergeDeepOverwriteLists(fromJS(a), fromJS(null));

    expect(c).toEqual(null);
  });
});

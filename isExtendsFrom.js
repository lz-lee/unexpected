function isExtendsFrom(subClass: any, superClass: any): boolean {
  if (typeof superClass !== 'function') return false;

  if (subClass === superClass) return true;

  return findInPrototype(subClass, p => p === superClass.prototype);
}

function findInPrototype(sub: any, matcher: (prototype: any) => boolean) {
  if (typeof sub !== 'function') return false;
  let p = sub.prototype;
  while (p) {
    if (matcher(p)) return true;
    p = p.__proto__;
  }
  return false;
}

// 子类 继承父类原型上的属性, 保证 Child 的实例能访问父类原型上的属性
//   subClass.prototype = Object.create(superClass && superClass.prototype, {
//     constructor: { value: subClass, writable: true, configurable: true },
// });

function hasBaseClassWithName(sub: any, baseClassName: string): boolean {
  return findInPrototype(sub, p => (p.constructor && p.constructor.name) === baseClassName)
}

class A {};

class B extends A {}

console.log('b isExtendsFrom A is >>>>>>>>>>>', isExtendsFrom(B, A))
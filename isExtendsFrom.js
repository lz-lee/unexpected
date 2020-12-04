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

function hasBaseClassWithName(sub: any, baseClassName: string): boolean {
  return findInPrototype(sub, p => (p.constructor && p.constructor.name) === baseClassName)
}

class A {};

class B extends A {}

console.log('b isExtendsFrom A is >>>>>>>>>>>', isExtendsFrom(B, A))
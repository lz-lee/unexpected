function Man() {
  console.log('我是战士')
}
Man.prototype = {
  sayName: function() {
    console.log('我是一等战士')
  },
  attack: function() {
    console.log('拳击')
  },
  defend: function() {
    console.log('防御')
  }
}

var man = new Man()
// 装饰器类
function Decorator(man) {
  this.man = man
}

Decorator.prototype = {
  sayName: function() {
    this.man.sayName()
  },
  attack: function() {
    this.man.attack()
  },
  defend: function() {
    this.man.defend()
  }
}

function ManGun(man) {
  Decorator.call(this, man)
}

ManGun.prototype = {
  sayName: function() {
    console.log('我是有枪的战士')
  },
  attack: function() {
    console.log('开枪攻击')
  },
  defend: function() {
    console.log('防御加🔟')
  }
}

function ManKnife(man) {
  Decorator.call(this, man)
}

ManKnife.prototype = {
  sayName: function() {
    console.log('我还是有刀的战士')
  },
  attack: function() {
    console.log('开枪和用刀')
  },
  defend: function() {
    console.log('防御加1')
  }
}

var manGun = new ManGun(man)
man.sayName()
man.attack()
man.defend()
console.log('---------')
manGun.sayName()
manGun.attack()
manGun.defend()


var manKnife = new ManKnife(man)
console.log('---------')
manKnife.sayName()
// manKnife.attack()
manKnife.defend()

// 原生js继承问题
// 1、子类一定要实现父类的方法，导致代码臃肿
// 2、不灵活，添加或删除不方便
// 3、需求变更频繁时，很难修改。 装饰器模式生成的子类，功能互不影响

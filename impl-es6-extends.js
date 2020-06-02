class Parent {
	constructor(name) {
      this.name = name
    }

  	say() {
    	console.log('my name is ', this.name);
    }
}

class Child extends Parent {
	constructor(name) {
    	super(name);
      	this.age = age
    }
}

// 经过 babel 转码为以下代码

'use strict';

function _typeof(obj) {
    '@babel/helpers - typeof';
    if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj;
        };
    }
    return _typeof(obj);
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
    }
    // 继承父类原型上的属性, 保证 Child 的实例能访问父类原型上的属性
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, writable: true, configurable: true },
    });
    // 继承父类的静态属性
    // 直接将 Child.__proto__ = Parent; 即可以通过 Child.xxx 直接访问 Parent.xxx
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf =
        Object.setPrototypeOf ||
        function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
    return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {

        // 因为 _setPrototypeOf(subClass, superClass); 即  Child.__proto__ = Super 了，为了继承父类的静态属性

        var Super = _getPrototypeOf(Derived),
            result;
        if (hasNativeReflectConstruct) {
            // 将执行父类构造函数的 newTarget 指向 子类的构造函数
            var NewTarget = _getPrototypeOf(this).constructor;
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct
            // Reflect.construct 的行为类似 new 操作符，
            // Reflect.construct(target, argumentsList[, newTarget])
            // super() ==> 即父类构造函数在子类构造函数里先执行，再返回结果
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
        return call;
    }
    return _assertThisInitialized(self);
}

// 断言如果没有父类构造函数执行的结果，则警告
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _isNativeReflectConstruct() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
        return true;
    } catch (e) {
        return false;
    }
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function _getPrototypeOf(o) {
              return o.__proto__ || Object.getPrototypeOf(o);
          };
    return _getPrototypeOf(o);
}

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
        // Symbol.hasInstance 用于判断某对象是否为某构造器的实例, 可以用来自定义 instanceof 操作符在某个类上的行为。
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _classCallCheck(instance, Constructor) {
    // 只能被 new 操作调用
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var Parent = /*#__PURE__*/ (function () {
    function Parent(name) {
        _classCallCheck(this, Parent);

        this.name = name;
    }

    _createClass(Parent, [
        {
            key: 'say',
            value: function say() {
                console.log('my name is ', this.name);
            },
        },
    ]);

    return Parent;
})();

var Child = /*#__PURE__*/ (function (_Parent) {
    _inherits(Child, _Parent);

    var _super = _createSuper(Child);

    function Child() {
        var _this;

        _classCallCheck(this, Child);
        // super() 即先创建父类的 this， 再来修改 this
        _this = _super.call(this, name);
        _this.age = age;
        return _this;
    }

    return Child;
})(Parent);



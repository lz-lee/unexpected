var Event = (function() {
    var global = this, Event, _default = 'default'
    Event = function() {
        var _listen,
            _trigger,
            _remove,
            _slice = Array.prototype.slice,
            _shift = Array.prototype.shift,
            _unshift = Array.prototype.unshift,
            ns_cache = {},
            _create,
            find

            each = function(ary, fn) {
                var ret
                for (var i = 0; i < ary.length; i++) {
                    var n = ary[i]
                    ret = fn.call(n, i, n)
                }
                return ret
            }

            _listen = function(key, fn, cache) {
                if (!cache[key]) {
                    cache[key] = []
                }
                cache[key].push(fn)
            }

            _remove = function(key, cache, fn) {
                if (cache[key]) {
                    if (fn) {
                        for (var i = cache[key].length; i >= 0; i--) {
                            if (cache[key][i] === fn) {
                                cache[key].splice(i, 1)
                            }
                        }
                    } else {
                        cache[key] = []
                    }
                }
            }

            _trigger = function() {
                var cache = _shift.call(arguments),
                    key = _shift.call(arguments),
                    args = arguments,
                    _self = this,
                    stack = cache[key]
                if (!stack || !stack.length) {
                    return
                }
                return each(stack, function() {
                    return this.apply(_self, args)
                })

            }

            _create = function(ns) {
                var ns = ns || _default
                var cache = {},
                    offlineStack = [],
                    ret = {
                        listen: function(key, fn, last) {
                            _listen(key, fn, cache)
                            if (offlineStack.length === 0) {
                                return
                            }
                            if (last === 'last') {
                                offlineStack.length && offlineStack.pop()()
                            } else {
                                each(offlineStack, function() {
                                    this()
                                })
                            }
                        }
                    }

            }
    }
})()
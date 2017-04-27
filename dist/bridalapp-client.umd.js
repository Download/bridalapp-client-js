(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['bridalapp-client'] = factory());
}(this, (function () { 'use strict';

// ulog - microscopically small universal logging library
// © 2016 by Stijn de Witt, some rights reserved
// License: CC-BY-4.0

function log$1(name) {
	return name ? mods[name] ? mods[name] : mods[name] = enhance({ name: name }, log$1) : log$1.debug ? log$1 : enhance(log$1);
}

log$1.ulog = { version: '0.1.0' };

log$1.enable = function (str) {
	var i,
	    split = (str || '').split(/[\s,]+/);
	for (i = 0; i < split.length; i++) {
		if (split[i]) {
			str = split[i].replace(/\*/g, '.*?');
			if (str[0] === '-') skipMods.push(new RegExp('^' + str.substr(1) + '$'));else dbgMods.push(new RegExp('^' + str + '$'));
		}
	}
	for (i in mods) {
		patch(mods[i]);
	}
};

log$1.enabled = function (name) {
	var i;
	for (i = 0; i < skipMods.length; i++) {
		if (skipMods[i].test(name)) return;
	}for (i = 0; i < dbgMods.length; i++) {
		if (dbgMods[i].test(name)) {
			return true;
		}
	}
};

log$1.disable = log$1.enable.bind(log$1, '');

var LVL = { ERROR: 1, WARN: 2, INFO: 3, LOG: 4, DEBUG: 5, TRACE: 6 };
var names = Object.keys(LVL).map(function (x) {
	return x.toLowerCase();
});
var mods = {};
var dbgMods = [];
var skipMods = [];

function enhance(o, parent, level) {
	o.NONE = 0;
	for (var key in LVL) {
		o[key] = LVL[key];
	}
	Object.defineProperty(o, 'level', {
		get: function get() {
			return level !== undefined ? level : parent && parent.level;
		},
		set: function set(n) {
			if (n === undefined && parent) {
				level = undefined;
			} else {
				var lvl = n && (Number(n) !== Number(n) ? o[n.toUpperCase()] : Number(n));
				if (lvl >= 0 && lvl <= 6) {
					level = lvl;
				}
			}
			patch(o);
			if (!parent) {
				for (mod in mods) {
					patch(mods[mod]);
				}
			}
		}
	});
	patch(o, parent);
	o.dir = bnd('dir') || nop;
	o.time = bnd('time') || nop;
	o.timeEnd = bnd('timeEnd') || nop;
	o.assert = function () {
		var a = [].concat.apply([], arguments),
		    ok = a.shift();
		if (!ok) {
			o.error.apply(o, a);
		}
	};
	return o;
}

function patch(o) {
	var lvl = Math.max(o.name && log$1.enabled(o.name) && o.DEBUG || o.level, o.level);
	for (var i = 0, name; name = names[i]; i++) {
		o[name] = lvl <= i ? nop : bnd(name) || typeof print == 'function' && print || function () {
			if (log$1.con()) {
				patch(o);
				o[name].apply(o, arguments);
			}
		};
	}
}

function bnd(n, c) {
	return (c = log$1.con()) && (c[n] || c.log).bind(c);
}
function nop() {}
var ulog$2 = log$1;

var qs = location.search.substring(1);
var args = qs && qs.split('&');
var lvl;
var dbg;
var i;
var m;

for (i = 0; m = args && args[i] && args[i].split('='); i++) {
	m[0] == 'log' ? lvl = m[1] : 0;
	m[0] == 'debug' ? dbg = m[1] : 0;
}

ulog$2.con = function () {
	return window.console && console;
};
dbg && ulog$2.enable(dbg);
var ulog = ulog$2();
ulog$2.level = lvl || ulog$2.WARN;

var browser$1 = ulog;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

function _possibleConstructorReturn$1(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits$1(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck$1(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var baseclass = function Object() {
	_classCallCheck$1(this, Object);
};
var derive = function derive(superclass) {
	return {}[superclass.name || 'Object'] = function (_superclass) {
		_inherits$1(_class, _superclass);

		function _class() {
			_classCallCheck$1(this, _class);

			return _possibleConstructorReturn$1(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
		}

		return _class;
	}(superclass);
};

function mix() {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	var superclass = !is(args[0]).a('factory') && args.shift() || baseclass;
	var factory = is(args[args.length - 1]).a('factory') && args.pop() || derive;
	if (!is(superclass, 'mix')) {
		superclass = derive(superclass);
		Object.defineProperties(superclass, {
			interface: { value: getInterface(superclass.prototype), writable: false }
		});
	}
	if (args.length) factory = function (org) {
		return function (superclass) {
			return org(args.reduce(function (s, m) {
				return m.mixin(s);
			}, superclass));
		};
	}(factory);
	function mixin(superclass) {
		var result = is(superclass).a(mixin) ? superclass : factory(superclass);
		if (mixin.classes.indexOf(result) == -1) mixin.classes.push(result);
		return result;
	}
	Object.defineProperties(mixin, {
		classes: { value: [], writable: false },
		mixins: { value: args, writable: false }
	});
	var constructor = mixin(superclass);
	return Object.defineProperties(constructor, {
		mixin: { value: mixin, writable: false },
		interface: { get: function (x) {
				return function () {
					return x ? x : x = getInterface(constructor.prototype);
				};
			}() }
	});
}

function is(x, type) {
	function a(type) {
		if (typeof type == 'string') {
			return type == 'mixin' ? typeof x == 'function' && !!x.mixin : type == 'mix' ? typeof x == 'function' && !!x.interface : type == 'factory' ? typeof x == 'function' && x.length == 1 && !x.interface : (typeof x === 'undefined' ? 'undefined' : _typeof(x)) == type;
		}
		if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object') {
			if (x instanceof type) return true;
			if (type.classes) return type.classes.reduce(function (f, c) {
				return f || a(c);
			}, false);
		} else if (typeof x == 'function') {
			if (x.mixin && x.mixin.mixins.indexOf(type) !== -1) return true;
			var c = x;
			while (c !== Object) {
				if (c === type || c === type.class) return true;
				if (type.mixin && type.mixin.classes && type.mixin.classes.indexOf(c) !== -1) return true;
				c = c.prototype.__proto__.constructor;
			}
		}
		return false;
	}

	function as(type) {
		if (a(type)) return true;
		var itf = type.interface || is(type, 'function') && getInterface(type.prototype);
		var subject = is(x, 'function') ? x.interface || getInterface(x.prototype) : x;
		return itf && Object.keys(itf).reduce(function (f, k) {
			return f && (is(itf[k], 'function') ? is(subject[k], 'function') : k in subject);
		}, true);
	}

	var str = x && x.toString() || '';
	return type !== undefined ? a(type) : { a: a, an: a, as: as };
}

function getPropertyNames(proto) {
	var results = [];
	while (proto !== Object.prototype) {
		Object.getOwnPropertyNames(proto).reduce(function (arr, k) {
			return arr.indexOf(k) === -1 ? arr.push(k) && arr : arr;
		}, results);
		proto = proto.__proto__.constructor.prototype;
	}
	return results;
}

function getInterface(proto) {
	return getPropertyNames(proto).reduce(function (o, k) {
		o[k] = proto[k];return o;
	}, {});
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var log$3 = browser$1('bridalapp-client:BridalappClient');
log$3.log(log$3.name);

var BridalappClient = mix(function (superclass) {
	return function (_superclass) {
		_inherits(BridalappClient, _superclass);

		function BridalappClient() {
			var _ref;

			_classCallCheck(this, BridalappClient);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var _this = _possibleConstructorReturn(this, (_ref = BridalappClient.__proto__ || Object.getPrototypeOf(BridalappClient)).call.apply(_ref, [this].concat(args)));

			var options = args.length && args[0];
			Object.defineProperties(_this, {
				options: { get: function get() {
						return options;
					}, enumerable: true }
			});
			return _this;
		}

		return BridalappClient;
	}(superclass);
});

var log = browser$1('bridalapp-client');

function client(options) {
	if (!options) options = client.DEFAULT_OPTIONS;
	return client.clients[options] || (client.clients[options] = new BridalappClient(options));
}

client.DEFAULT_OPTIONS = {};
client.clients = {};

return client;

})));
//# sourceMappingURL=bridalapp-client.umd.js.map

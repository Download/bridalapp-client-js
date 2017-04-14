(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function sayHelloTo(name) {
  return "Hello, " + name + "!";
}

function addArray(numbers) {
	return numbers.reduce(function (a, b) {
		return a + b;
	}, 0);
}

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

// Import a couple modules for testing.
// Import a logger for easier debugging.
var log = browser$1('app:log');

// The logger should only be enabled if we’re not in production.
if (ENV !== 'production') {
  // Enable the logger.
  browser$1.enable('*');
  log.log('Logging is enabled!');

  // Enable LiveReload
  //  document.write(
  //    '<script src="http://' + (location.host || 'localhost').split(':')[0] +
  //    ':35729/livereload.js?snipver=1"></' + 'script>'
  //  );
} else {
  browser$1.disable();
}

// Run some functions from our imported modules.
var result1 = sayHelloTo('Jason');
var result2 = addArray([1, 2, 3, 4]);

// Print the results on the page.
log.info('sayHelloTo(\'Jason\') => ' + result1 + '\n\n');
log.info('addArray([1, 2, 3, 4]) => ' + result2);

})));
//# sourceMappingURL=bridalapp-client.umd.js.map

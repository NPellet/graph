/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(8);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(5);

var ReactCurrentOwner = __webpack_require__(6);

var warning = __webpack_require__(1);
var canDefineProperty = __webpack_require__(7);
var hasOwnProperty = Object.prototype.hasOwnProperty;

var REACT_ELEMENT_TYPE = __webpack_require__(14);

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown, specialPropRefWarningShown;

function hasValidRef(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if (process.env.NODE_ENV !== 'production') {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (process.env.NODE_ENV !== 'production') {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

module.exports = ReactElement;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {

  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null

};

module.exports = ReactCurrentOwner;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var canDefineProperty = false;
if (process.env.NODE_ENV !== 'production') {
  try {
    // $FlowFixMe https://github.com/facebook/flow/issues/285
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

module.exports = canDefineProperty;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(4);

var ReactNoopUpdateQueue = __webpack_require__(12);

var canDefineProperty = __webpack_require__(7);
var emptyObject = __webpack_require__(9);
var invariant = __webpack_require__(2);
var warning = __webpack_require__(1);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
if (process.env.NODE_ENV !== 'production') {
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

module.exports = ReactComponent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(4);

var ReactCurrentOwner = __webpack_require__(6);

var invariant = __webpack_require__(2);
var warning = __webpack_require__(1);

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(hasOwnProperty)
  // Strip regex characters so we can use it for regex
  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  // Remove hasOwnProperty from the template to make it generic
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName;
  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
  return describeComponentFrame(name, element && element._source, ownerName);
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var name = getDisplayName(topElement);
      var owner = topElement._owner;
      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
    }

    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    info += ReactComponentTreeHook.getStackAddendumByID(id);
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs
};

module.exports = ReactComponentTreeHook;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var warning = __webpack_require__(1);

function warnNoop(publicInstance, callerName) {
  if (process.env.NODE_ENV !== 'production') {
    var constructor = publicInstance.constructor;
    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnNoop(publicInstance, 'setState');
  }
};

module.exports = ReactNoopUpdateQueue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

module.exports = REACT_ELEMENT_TYPE;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */



var ReactCurrentOwner = __webpack_require__(6);
var ReactComponentTreeHook = __webpack_require__(11);
var ReactElement = __webpack_require__(3);

var checkReactTypeSpec = __webpack_require__(33);

var canDefineProperty = __webpack_require__(7);
var getIteratorFn = __webpack_require__(17);
var warning = __webpack_require__(1);

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = ReactCurrentOwner.current.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return ' Check your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = ' Check the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (memoizer[currentComponentErrorInfo]) {
    return;
  }
  memoizer[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
  }

  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  if (componentClass.propTypes) {
    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

var ReactElementValidator = {

  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      if (typeof type !== 'function' && typeof type !== 'string') {
        var info = '';
        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + 'it\'s defined in.';
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);
        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += ReactComponentTreeHook.getCurrentStackAddendum();

        process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info) : void 0;
      }
    }

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if (process.env.NODE_ENV !== 'production') {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }

};

module.exports = ReactElementValidator;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactPropTypeLocationNames = {};

if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_jsgraph_es6_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_jsgraph_es6_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__lib_jsgraph_es6_js__);



class NMR1D extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

	constructor(props) {
		super(props);

		this.state = {};
	}

	setNMR(serie = null, molfile = null, annotation = null, uid = null) {

		nmrElement = this.nmrElement;

		if (serie) {
			nmrElement.serie = serie;
			this.updateSerie();
		}

		if (molfile) {
			nmrElement.molfile = molfile;
			this.updateSerie();
		}

		if (annotations) {
			nmrElement.annotation = annotations;
		}
	}

	updateSerie() {

		if (!this.mainSerie) {
			this.mainSerie = this.graph.newSerie("main", {}, "line").autoAxes();
			this.mainWaveform = this.graph.newWaveform();
		}

		this.mainWaveform.setData(this.nmrElement.serie);
	}

	componentDidMount() {
		this.graph = new __WEBPACK_IMPORTED_MODULE_1__lib_jsgraph_es6_js___default.a(this.dom);
	}

	componentDidUpdate() {
		this.graph.resize(this.props.width, this.props.height);
	}

	render() {
		return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { ref: el => this.dom = el });
	}
}

/* harmony default export */ __webpack_exports__["default"] = (NMR1D);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _get=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if("value"in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}(function webpackUniversalModuleDefinition(root,factory){if(( false?'undefined':_typeof(exports))==='object'&&( false?'undefined':_typeof(module))==='object')module.exports=factory();else if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if((typeof exports==='undefined'?'undefined':_typeof(exports))==='object')exports["Graph"]=factory();else root["Graph"]=factory();})(undefined,function(){return(/******/function(modules){// webpackBootstrap
/******/// The module cache
/******/var installedModules={};/******/// The require function
/******/function __webpack_require__(moduleId){/******/// Check if module is in cache
/******/if(installedModules[moduleId])/******/return installedModules[moduleId].exports;/******/// Create a new module (and put it into the cache)
/******/var module=installedModules[moduleId]={/******/exports:{},/******/id:moduleId,/******/loaded:false/******/};/******/// Execute the module function
/******/modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);/******/// Flag the module as loaded
/******/module.loaded=true;/******/// Return the exports of the module
/******/return module.exports;/******/}/******/// expose the modules object (__webpack_modules__)
/******/__webpack_require__.m=modules;/******/// expose the module cache
/******/__webpack_require__.c=installedModules;/******/// __webpack_public_path__
/******/__webpack_require__.p="";/******/// Load entry module and return exports
/******/return __webpack_require__(0);/******/}(/************************************************************************//******/[/* 0 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[module,__webpack_require__(1),__webpack_require__(2),__webpack_require__(8),__webpack_require__(9),__webpack_require__(11),__webpack_require__(12),__webpack_require__(13),__webpack_require__(14),__webpack_require__(18),__webpack_require__(20),__webpack_require__(21),__webpack_require__(22),__webpack_require__(23),__webpack_require__(24),__webpack_require__(25),__webpack_require__(26),__webpack_require__(27),__webpack_require__(28),__webpack_require__(29),__webpack_require__(30),__webpack_require__(50),__webpack_require__(32),__webpack_require__(33),__webpack_require__(31),__webpack_require__(34),__webpack_require__(35),__webpack_require__(36),__webpack_require__(37),__webpack_require__(38),__webpack_require__(39),__webpack_require__(40),__webpack_require__(41),__webpack_require__(42),__webpack_require__(43),__webpack_require__(44),__webpack_require__(45),__webpack_require__(47),__webpack_require__(48),__webpack_require__(49),__webpack_require__(5),__webpack_require__(6)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(module,require('./graph.core'),require('./graph.position'),require('./graph.legend'),require('./graph.axis.x'),require('./graph.axis.y'),require('./graph.axis.x.bar'),require('./graph.axis.x.time'),require('./series/graph.serie.line'),require('./series/graph.serie.line.3d'),require('./series/graph.serie.bar'),require('./series/graph.serie.box'),require('./series/graph.serie.line.colored'),require('./series/graph.serie.scatter'),require('./series/graph.serie.zone'),require('./series/graph.serie.zone.3d'),require('./series/graph.serie.densitymap'),require('./series/graph.serie.contour'),require('./shapes/graph.shape'),require('./shapes/graph.shape.areaundercurve'),require('./shapes/graph.shape.arrow'),require('./shapes/graph.shape.ellipse'),require('./shapes/graph.shape.label'),require('./shapes/graph.shape.polyline'),require('./shapes/graph.shape.line'),require('./shapes/graph.shape.nmrintegral'),require('./shapes/graph.shape.peakintegration2d'),require('./shapes/graph.shape.rect'),require('./shapes/graph.shape.cross'),require('./shapes/graph.shape.peakboundariescenter'),require('./shapes/graph.shape.html'),require('./plugins/graph.plugin'),require('./plugins/graph.plugin.drag'),require('./plugins/graph.plugin.shape'),require('./plugins/graph.plugin.selectScatter'),require('./plugins/graph.plugin.zoom'),require('./plugins/graph.plugin.timeseriemanager'),require('./plugins/graph.plugin.serielinedifference'),require('./plugins/graph.plugin.axissplitting'),require('./plugins/graph.plugin.makeTracesDifferent'),require('./util/waveform'),require('./util/fit_lm'));}else{var mod={exports:{}};factory(mod,global.graph,global.graph,global.graph,global.graphAxis,global.graphAxis,global.graphAxisX,global.graphAxisX,global.graphSerie,global.graphSerieLine,global.graphSerie,global.graphSerie,global.graphSerieLine,global.graphSerie,global.graphSerie,global.graphSerieZone,global.graphSerie,global.graphSerie,global.graph,global.graphShape,global.graphShape,global.graphShape,global.graphShape,global.graphShape,global.graphShape,global.graphShape,global.graphShape,global.graphShape,global.graphShape,global.graphShape,global.graphShape,global.graph,global.graphPlugin,global.graphPlugin,global.graphPlugin,global.graphPlugin,global.graphPlugin,global.graphPlugin,global.graphPlugin,global.graphPlugin,global.waveform,global.fit_lm);global.graph=mod.exports;}})(this,function(module,_graph,_graph3,_graph5,_graphAxis,_graphAxis3,_graphAxisX,_graphAxisX3,_graphSerie,_graphSerieLine,_graphSerie3,_graphSerie5,_graphSerieLine3,_graphSerie7,_graphSerie9,_graphSerieZone,_graphSerie11,_graphSerie13,_graph7,_graphShape,_graphShape3,_graphShape5,_graphShape7,_graphShape9,_graphShape11,_graphShape13,_graphShape15,_graphShape17,_graphShape19,_graphShape21,_graphShape23,_graph9,_graphPlugin,_graphPlugin3,_graphPlugin5,_graphPlugin7,_graphPlugin9,_graphPlugin11,_graphPlugin13,_graphPlugin15,_waveform,_fit_lm){'use strict';var _graph2=_interopRequireDefault(_graph);var _graph4=_interopRequireDefault(_graph3);var _graph6=_interopRequireDefault(_graph5);var _graphAxis2=_interopRequireDefault(_graphAxis);var _graphAxis4=_interopRequireDefault(_graphAxis3);var _graphAxisX2=_interopRequireDefault(_graphAxisX);var _graphAxisX4=_interopRequireDefault(_graphAxisX3);var _graphSerie2=_interopRequireDefault(_graphSerie);var _graphSerieLine2=_interopRequireDefault(_graphSerieLine);var _graphSerie4=_interopRequireDefault(_graphSerie3);var _graphSerie6=_interopRequireDefault(_graphSerie5);var _graphSerieLine4=_interopRequireDefault(_graphSerieLine3);var _graphSerie8=_interopRequireDefault(_graphSerie7);var _graphSerie10=_interopRequireDefault(_graphSerie9);var _graphSerieZone2=_interopRequireDefault(_graphSerieZone);var _graphSerie12=_interopRequireDefault(_graphSerie11);var _graphSerie14=_interopRequireDefault(_graphSerie13);var _graph8=_interopRequireDefault(_graph7);var _graphShape2=_interopRequireDefault(_graphShape);var _graphShape4=_interopRequireDefault(_graphShape3);var _graphShape6=_interopRequireDefault(_graphShape5);var _graphShape8=_interopRequireDefault(_graphShape7);var _graphShape10=_interopRequireDefault(_graphShape9);var _graphShape12=_interopRequireDefault(_graphShape11);var _graphShape14=_interopRequireDefault(_graphShape13);var _graphShape16=_interopRequireDefault(_graphShape15);var _graphShape18=_interopRequireDefault(_graphShape17);var _graphShape20=_interopRequireDefault(_graphShape19);var _graphShape22=_interopRequireDefault(_graphShape21);var _graphShape24=_interopRequireDefault(_graphShape23);var _graph10=_interopRequireDefault(_graph9);var _graphPlugin2=_interopRequireDefault(_graphPlugin);var _graphPlugin4=_interopRequireDefault(_graphPlugin3);var _graphPlugin6=_interopRequireDefault(_graphPlugin5);var _graphPlugin8=_interopRequireDefault(_graphPlugin7);var _graphPlugin10=_interopRequireDefault(_graphPlugin9);var _graphPlugin12=_interopRequireDefault(_graphPlugin11);var _graphPlugin14=_interopRequireDefault(_graphPlugin13);var _graphPlugin16=_interopRequireDefault(_graphPlugin15);var _waveform2=_interopRequireDefault(_waveform);var _fit_lm2=_interopRequireDefault(_fit_lm);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}// Corrent naming is important here !
_graph2.default.registerConstructor("graph.position",_graph4.default);_graph2.default.registerConstructor("graph.axis.x",_graphAxis2.default);_graph2.default.registerConstructor("graph.axis.y",_graphAxis4.default);_graph2.default.registerConstructor("graph.axis.x.bar",_graphAxisX2.default);_graph2.default.registerConstructor("graph.axis.x.time",_graphAxisX4.default);_graph2.default.registerConstructor("graph.serie.line",_graphSerie2.default);_graph2.default.registerConstructor("graph.serie.line.3d",_graphSerieLine2.default);_graph2.default.registerConstructor("graph.serie.line.color",_graphSerieLine4.default);_graph2.default.registerConstructor("graph.serie.contour",_graphSerie14.default);_graph2.default.registerConstructor("graph.serie.bar",_graphSerie4.default);_graph2.default.registerConstructor("graph.serie.box",_graphSerie6.default);_graph2.default.registerConstructor("graph.serie.scatter",_graphSerie8.default);_graph2.default.registerConstructor("graph.serie.zone",_graphSerie10.default);_graph2.default.registerConstructor("graph.serie.zone.3d",_graphSerieZone2.default);_graph2.default.registerConstructor("graph.serie.densitymap",_graphSerie12.default);_graph2.default.registerConstructor(_graph2.default.SERIE_LINE,_graphSerie2.default);_graph2.default.registerConstructor(_graph2.default.SERIE_LINE_3D,_graphSerieLine2.default);_graph2.default.registerConstructor(_graph2.default.SERIE_LINE_COLORED,_graphSerieLine4.default);_graph2.default.registerConstructor(_graph2.default.SERIE_CONTOUR,_graphSerie14.default);_graph2.default.registerConstructor(_graph2.default.SERIE_BAR,_graphSerie4.default);_graph2.default.registerConstructor(_graph2.default.SERIE_BOX,_graphSerie6.default);_graph2.default.registerConstructor(_graph2.default.SERIE_SCATTER,_graphSerie8.default);_graph2.default.registerConstructor(_graph2.default.SERIE_ZONE,_graphSerie10.default);_graph2.default.registerConstructor(_graph2.default.SERIE_ZONE_3D,_graphSerieZone2.default);_graph2.default.registerConstructor(_graph2.default.SERIE_DENSITYMAP,_graphSerie12.default);//Graph.registerConstructor( "graph.serie.line.broken", GraphSerieLineBroken );
_graph2.default.registerConstructor("graph.plugin.shape",_graphPlugin4.default);_graph2.default.registerConstructor("graph.plugin.drag",_graphPlugin2.default);_graph2.default.registerConstructor("graph.plugin.zoom",_graphPlugin8.default);_graph2.default.registerConstructor("graph.plugin.selectScatter",_graphPlugin6.default);_graph2.default.registerConstructor("graph.plugin.timeSerieManager",_graphPlugin10.default);_graph2.default.registerConstructor("graph.plugin.serielinedifference",_graphPlugin12.default);_graph2.default.registerConstructor("graph.plugin.serieLineDifference",_graphPlugin12.default);_graph2.default.registerConstructor("graph.plugin.axissplitting",_graphPlugin14.default);_graph2.default.registerConstructor("graph.plugin.makeTracesDifferent",_graphPlugin16.default);_graph2.default.registerConstructor("graph.shape",_graph8.default);_graph2.default.registerConstructor("graph.shape.areaundercurve",_graphShape2.default);_graph2.default.registerConstructor("graph.shape.arrow",_graphShape4.default);_graph2.default.registerConstructor("graph.shape.ellipse",_graphShape6.default);_graph2.default.registerConstructor("graph.shape.label",_graphShape8.default);_graph2.default.registerConstructor("graph.shape.polyline",_graphShape10.default);_graph2.default.registerConstructor("graph.shape.line",_graphShape12.default);_graph2.default.registerConstructor("graph.shape.nmrintegral",_graphShape14.default);_graph2.default.registerConstructor("graph.shape.html",_graphShape24.default);_graph2.default.registerConstructor("graph.shape.peakintegration2d",_graphShape16.default);//  Graph.registerConstructor( "graph.shape.peakinterval", GraphShapePeakInterval );
//  Graph.registerConstructor( "graph.shape.peakinterval2", GraphShapePeakInterval2 );
//  Graph.registerConstructor( "graph.shape.rangex", GraphShapeRangeX );
_graph2.default.registerConstructor("graph.shape.rect",_graphShape18.default);_graph2.default.registerConstructor("graph.shape.rectangle",_graphShape18.default);_graph2.default.registerConstructor("graph.shape.cross",_graphShape20.default);//Graph.registerConstructor( "graph.shape.zoom2d", GraphShapeZoom2D );
_graph2.default.registerConstructor("graph.shape.peakboundariescenter",_graphShape22.default);//   Graph.registerConstructor( "graph.toolbar", GraphToolbar );
_graph2.default.registerConstructor("graph.legend",_graph6.default);_graph2.default.registerConstructor("graph.waveform",_waveform2.default);module.exports=_graph2.default;});/***/},/* 1 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(2),__webpack_require__(3),__webpack_require__(4),__webpack_require__(5)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.position'),require('./graph.util'),require('./dependencies/eventEmitter/EventEmitter'),require('./util/waveform'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graph,global.EventEmitter,global.waveform);global.graphCore=mod.exports;}})(this,function(exports,_graph,_graph3,_EventEmitter,_waveform){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);var util=_interopRequireWildcard(_graph3);var _EventEmitter2=_interopRequireDefault(_EventEmitter);var _waveform2=_interopRequireDefault(_waveform);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	 * Default graph parameters
	 * @name Graph~GraphOptionsDefault
	 * @name GraphOptions
	 * @object
	 * @static
	 * @memberof Graph
	 * @prop {String} title - Title of the graph
	 * @prop {Number} paddingTop - The top padding
	 * @prop {Number} paddingLeft - The left padding
	 * @prop {Number} paddingRight - The right padding
	 * @prop {Number} paddingBottom - The bottom padding
	 * @prop {(Number|Boolean)} padding - A common padding value for top, bottom, left and right
	 * @prop {Number} fontSize - The basic text size of the graphs
	 * @prop {Number} fontFamily - The basic font family. Should be installed on the computer of the user
	 * @prop {Object.<String,Object>} plugins - A list of plugins to import with their options
	 * @prop {Object.<String,Object>} pluginAction - The default key combination to access those actions
	 * @prop {Object.<String,Object>} mouseActions - Alias of pluginActions
	 * @prop {Object.<String,Object>} keyActions - Defines what happens when keys are pressed
	 * @prop {Object} wheel - Define the mouse wheel action
	 * @prop {Object} dblclick - Define the double click action
	 * @prop {Boolean} shapesUniqueSelection - true to allow only one shape to be selected at the time
	 * @prop {Boolean} shapesUnselectOnClick - true to unselect all shapes on click
	 */var GraphOptionsDefault={title:'',paddingTop:30,paddingBottom:5,paddingLeft:20,paddingRight:20,close:{left:true,right:true,top:true,bottom:true},fontSize:12,fontFamily:'Myriad Pro, Helvetica, Arial',plugins:{},pluginAction:{},mouseActions:[],keyActions:[],wheel:{},dblclick:{},shapesUnselectOnClick:true,shapesUniqueSelection:true};var _constructors=new Map();/**
	 * Entry class of jsGraph that creates a new graph.
	 * @extends EventEmitter
	 * @tutorial basic
	 */var Graph=function(_EventEmitter2$defaul){_inherits(Graph,_EventEmitter2$defaul);/**
	   * Graph constructor
	   * @param {(HTMLElement|String)} wrapper - The DOM Wrapper element or the element ```id``` where it can be found
	   * @param {GraphOptions} [ options ] - The options of the graph
	   * @param {Object} [ axis ] - The list of axes
	   * @param {Array} axis.left - The list of left axes
	   * @param {Array} axis.bottom - The list of bottom axes
	   * @param {Array} axis.top - The list of top axes
	   * @param {Array} axis.right - The list of right axes
	   * @example var graph = new Graph("someDomID");
	   * @example var graph = new Graph("someOtherDomID", { title: 'Graph title', paddingRight: 100 } );
	   */function Graph(wrapper,options,axis){_classCallCheck(this,Graph);/*
	      The unique ID of the graph
	      @name Graph#uniqueid
	      @type String
	    */var _this=_possibleConstructorReturn(this,(Graph.__proto__||Object.getPrototypeOf(Graph)).call(this));_this._creation=util.guid();if(typeof wrapper=="string"){wrapper=document.getElementById(wrapper);}else if(typeof wrapper.length=="number"){wrapper=wrapper[0];}if(!wrapper){throw"The wrapper DOM element was not found.";}if(!wrapper.appendChild){throw"The wrapper appears to be an invalid HTMLElement";}wrapper.style['-webkit-user-select']='none';wrapper.style['-moz-user-select']='none';wrapper.style['-o-user-select']='none';wrapper.style['-ms-user-select']='none';wrapper.style['user-select']='none';/**
	     * @object
	     * @memberof Graph
	     * @name Graph#options
	     * @type GraphOptions
	     * @default {@link GraphOptionsDefault}
	     * Access directly the options of the graph using this public object.
	     * @example graph.options.mouseActions.push( {  } );
	     */_this.options=util.extend({},GraphOptionsDefault,options);_this.prevented=false;_this.axis={left:[],top:[],bottom:[],right:[]};_this.shapes=[];_this.shapesLocked=false;_this.plugins={};for(var i in _this.options.pluginAction){_this.options.pluginAction.plugin=i;_this.options.mouseActions.push(_this.options.pluginAction);}_this.selectedShapes=[];_this.ns='http://www.w3.org/2000/svg';_this.nsxlink="http://www.w3.org/1999/xlink";_this.series=[];_this._dom=wrapper;_this._axesHaveChanged=true;if(_this.options.hasOwnProperty('padding')&&util.isNumeric(_this.options.padding)){_this.options.paddingTop=_this.options.paddingBottom=_this.options.paddingLeft=_this.options.paddingRight=_this.options.padding;}// DOM
var wrapperStyle=getComputedStyle(wrapper);var w=parseInt(wrapperStyle.width);var h=parseInt(wrapperStyle.height);_this._doDom();_this.setSize(w,h);_this._resize();_registerEvents(_this);_this.currentAction=false;// Load all axes
if(axis){for(var i in axis){for(var j=0,l=axis[i].length;j<l;j++){switch(i){case'top':_this.getTopAxis(j,axis[i][j]);break;case'bottom':_this.getBottomAxis(j,axis[i][j]);break;case'left':_this.getLeftAxis(j,axis[i][j]);break;case'right':_this.getRightAxis(j,axis[i][j]);break;}}}}_this._pluginsInit();return _this;}/**
	   * Returns the graph SVG wrapper element
	   * @public
	   * @return {SVGElement} The DOM element wrapping the graph
	   */_createClass(Graph,[{key:'getDom',value:function getDom(){return this.dom;}/**
	   * Returns the unique id representing the graph
	   * @public
	   * @return {String} The unique ID of the graph
	   */},{key:'getId',value:function getId(){return this._creation;}/**
	   * Returns the graph wrapper element passed during the graph creation
	   * @public
	   * @return {HTMLElement} The DOM element wrapping the graph
	   */},{key:'getWrapper',value:function getWrapper(){return this._dom;}/**
	   * Sets an option of the graph
	   * @param {String} name - Option name
	   * @param value - New option value
	   * @returns {Graph} - Graph instance
	   */},{key:'setOption',value:function setOption(name,val){this.options[name]=val;return this;}/**
	   *  Sets the title of the graph
	   */},{key:'setTitle',value:function setTitle(title){this.options.title=title;this.domTitle.textContent=title;}/**
	   *  Shows the title of the graph
	   */},{key:'displayTitle',value:function displayTitle(){this.domTitle.setAttribute('display','inline');}/**
	   *  Hides the title of the graph
	   */},{key:'hideTitle',value:function hideTitle(){this.domTitle.setAttribute('display','none');}/**
	   * Calls a repaint of the container. Used internally when zooming on the graph, or when <code>.autoscaleAxes()</code> is called (see {@link Graph#autoscaleAxes}).<br />
	   * To be called after axes min/max are expected to have changed (e.g. after an <code>axis.zoom( from, to )</code>) has been called
	   * @param {Boolean} onlyIfAxesHaveChanged - Triggers a redraw only if min/max values of the axes have changed.
	   * @return {Boolean} if the redraw has been successful
	   */},{key:'redraw',value:function redraw(onlyIfAxesHaveChanged){if(!this.width||!this.height){return;}if(!this.sizeSet){this._resize();this.executeRedrawSlaves();return true;}else{if(!onlyIfAxesHaveChanged||haveAxesChanged(this)||hasSizeChanged(this)){this.executeRedrawSlaves();refreshDrawingZone(this);return true;}}this.executeRedrawSlaves(true);return false;}},{key:'executeRedrawSlaves',value:function executeRedrawSlaves(noLegend){this._pluginsExecute("preDraw");}/**
	   * Draw the graph and the series. This method will only redraw what is necessary. You may trust its use when you have set new data to series, changed serie styles or called for a zoom on an axis.
	   */},{key:'draw',value:function draw(force){this.updateLegend(true);this.drawSeries(this.redraw(true&&!force));}/**
	   *  Prevents the graph, the series and the legend from redrawing automatically. Valid until {@link Graph#resumeUpdate} is called
	   *  @memberof Graph
	   *  @return {Graph} The current graph instance
	   *  @see {@link Graph#resumeUpdate}
	   *  @see {@link Graph#doUpdate}
	   *  @since 1.16.19
	   */},{key:'delayUpdate',value:function delayUpdate(){this._lockUpdate=true;return this;}/**
	   *  Forces legend and graph update, even is {@link Graph#delayUpdate} has been called before.
	   *  @memberof Graph
	   *  @return {Graph} The current graph instance
	   *  @see {@link Graph#delayUpdate}
	   *  @see {@link Graph#resumeUpdate}
	   *  @since 1.16.19
	   */},{key:'doUpdate',value:function doUpdate(){if(this.legend){this.legend.update();}this.draw();if(this.legend){this.legend.update();}return this;}/**
	   *  Cancels the effect of {@link Graph#delayUpdate}, but does not redraw the graph automatically
	   *  @memberof Graph
	   *  @return {Graph} The current graph instance
	   *  @see {@link Graph#delayUpdate}
	   *  @see {@link Graph#doUpdate}
	   *  @since 1.16.19
	   */},{key:'resumeUpdate',value:function resumeUpdate(){this._lockUpdate=false;return this;}},{key:'isDelayedUpdate',value:function isDelayedUpdate(){return this._lockUpdate;}/**
	   * Sets the total width of the graph
	   * @param {Number} width - The new width of the graph
	   * @param {Boolean} skipResize - <code>true</code> to defer graph repaint. Use {@link Graph#resize} to force repain later on. (Useful if many graph sizing operations are done successively)
	   * @see Graph#setHeight
	   * @see Graph#resize
	   */},{key:'setWidth',value:function setWidth(width,skipResize){this.width=width;if(!skipResize){this._resize();}}/**
	   * Sets the total height of the graph
	   * @param {Number} height - The new height of the graph
	   * @param {Boolean} skipResize - <code>true</code> to defer graph repaint. Use {@link Graph#resize} to force repain later on. (Useful if many graph sizing operations are done successively)
	   * @see Graph#setWidth
	   * @see Graph#resize
	   */},{key:'setHeight',value:function setHeight(height,skipResize){this.height=height;if(!skipResize){this._resize();}}/**
	   * Sets the new dimension of the graph and repaints it. If width and height are omitted, a simple refresh is done.
	   * @param {Number} [ width ] - The new width of the graph
	   * @param {Number} [ height ] - The new height of the graph
	   * @see Graph#setWidth
	   * @see Graph#setHeight
	   * @return {Graph} The current graph
	   */},{key:'resize',value:function resize(w,h){if(w&&h){this.setSize(w,h);}this._resize();return this;}/**
	   * Sets the new dimension of the graph without repainting it. Use {@link Graph#resize} to perform the actual resizing of the graph.
	   * @param {Number} [ width ] - The new width of the graph
	   * @param {Number} [ height ] - The new height of the graph
	   * @see Graph#setWidth
	   * @see Graph#setHeight
	   * @see Graph#resize
	   */},{key:'setSize',value:function setSize(w,h){this.setWidth(w,true);this.setHeight(h,true);this.getDrawingHeight();this.getDrawingWidth();}/**
	   * Returns the width of the graph (set by setSize, setWidth or resize methods)
	   * @return {Number} Width of the graph
	   */},{key:'getWidth',value:function getWidth(){return this.width;}/**
	   * Returns the height of the graph (set by setSize, setHeight or resize methods)
	   * @return {Number} Height of the graph
	   */},{key:'getHeight',value:function getHeight(){return this.height;}/**
	   * Returns the top padding of the graph (space between the top of the svg container and the topmost axis)
	   * @return {Number} paddingTop
	   */},{key:'getPaddingTop',value:function getPaddingTop(){return this.options.paddingTop;}/**
	   * Returns the left padding of the graph (space between the left of the svg container and the leftmost axis)
	   * @return {Number} paddingTop
	   */},{key:'getPaddingLeft',value:function getPaddingLeft(){return this.options.paddingLeft;}/**
	   * Returns the bottom padding of the graph (space between the bottom of the svg container and the bottommost axis)
	   * @return {Number} paddingTop
	   */},{key:'getPaddingBottom',value:function getPaddingBottom(){return this.options.paddingBottom;}/**
	   * Returns the right padding of the graph (space between the right of the svg container and the rightmost axis)
	   * @return {Number} paddingRight
	   */},{key:'getPaddingRight',value:function getPaddingRight(){return this.options.paddingRight;}/**
	   * Returns the height of the drawable zone, including the space used by the axes
	   * @param {Boolean} useCache - Use cached value. Useful if one is sure the graph hasn't changed dimension. Automatically called after a Graph.resize();
	   * @returns {Number} Height of the graph
	   */},{key:'getDrawingHeight',value:function getDrawingHeight(useCache){if(useCache&&this.innerHeight){return this.innerHeight;}return this.innerHeight=this.height-this.options.paddingTop-this.options.paddingBottom;}/**
	   * Returns the width of the drawable zone, including the space used by the axes
	   * @param {Boolean} useCache - Use cached value. Useful if one is sure the graph hasn't changed dimension. Automatically called after a Graph.resize();
	   * @returns {Number} Width of the graph
	   */},{key:'getDrawingWidth',value:function getDrawingWidth(useCache){if(useCache&&this.innerWidth){return this.innerWidth;}return this.innerWidth=this.width-this.options.paddingLeft-this.options.paddingRight;}/**
	   * Caches the wrapper offset in the page.<br />
	   * The position of the wrapper is used when processing most of mouse events and it is fetched via the jQuery function .offset().
	   * If performance becomes a critical issue in your application, <code>cacheOffset()</code> should be used to store the offset position. It should be ensured that the graph doesn't move in the page. If one can know when the graph has moved, <code>cacheOffset()</code> should be called again to update the offset position.
	   * @see Graph#uncacheOffset
	   */},{key:'cacheOffset',value:function cacheOffset(){this.offsetCached=util.getOffset(this._dom);}/**
	   * Un-caches the wrapper offset value
	   * @see Graph#cacheOffset
	   */},{key:'uncacheOffset',value:function uncacheOffset(){this.offsetCached=false;}/**
	   * Returns the x axis at a certain index. If any top axis exists and no bottom axis exists, returns or creates a top axis. Otherwise, creates or returns a bottom axis
	   * Caution ! The <code>options</code> parameter will only be effective if an axis is created
	   * @param {Number} [ index=0 ] - The index of the axis
	   * @param {Object} [ options={} ] - The options to pass to the axis constructor
	   */},{key:'getXAxis',value:function getXAxis(index,options){if(this.axis.top.length>0&&this.axis.bottom.length==0){return this.getTopAxis(index,options);}return this.getBottomAxis(index,options);}/**
	   * Returns the y axis at a certain index. If any right axis exists and no left axis exists, returns or creates a right axis. Otherwise, creates or returns a left axis
	   * Caution ! The <code>options</code> parameter will only be effective if an axis is created
	   * @param {Number} [ index=0 ] - The index of the axis
	   * @param {Object} [ options={} ] - The options to pass to the axis constructor
	   */},{key:'getYAxis',value:function getYAxis(index,options){if(this.axis.right.length>0&&this.axis.left.length==0){return this.getRightAxis(index,options);}return this.getLeftAxis(index,options);}/**
	   * Returns the top axis at a certain index. Creates it if non-existant
	   * @param {Number} [ index=0 ] - The index of the axis
	   * @param {Object} [ options={} ] - The options to pass to the axis constructor
	   */},{key:'getTopAxis',value:function getTopAxis(index,options){return _getAxis(this,index,options,'top');}/**
	   * Returns the bottom axis at a certain index. Creates it if non-existant
	   * @param {Number} [ index=0 ] - The index of the axis
	   * @param {Object} [ options={} ] - The options to pass to the axis constructor
	   */},{key:'getBottomAxis',value:function getBottomAxis(index,options){return _getAxis(this,index,options,'bottom');}/**
	   * Returns the left axis at a certain index. Creates it if non-existant
	   * @param {Number} [ index=0 ] - The index of the axis
	   * @param {Object} [ options={} ] - The options to pass to the axis constructor
	   */},{key:'getLeftAxis',value:function getLeftAxis(index,options){return _getAxis(this,index,options,'left');}/**
	   * Returns the right axis at a certain index. Creates it if non-existant
	   * @param {Number} [ index=0 ] - The index of the axis
	   * @param {Object} [ options={} ] - The options to pass to the axis constructor
	   */},{key:'getRightAxis',value:function getRightAxis(index,options){return _getAxis(this,index,options,'right');}/**
	   * Sets a bottom axis
	   * @param {Axis} axis - The axis instance to set
	   * @param {Number} [ index=0 ] - The index of the axis
	   */},{key:'setXAxis',value:function setXAxis(axis,index){this.setBottomAxis(axis,index);}/**
	   * Sets a left axis
	   * @param {Axis} axis - The axis instance to set
	   * @param {Number} [ index=0 ] - The index of the axis
	   */},{key:'setYAxis',value:function setYAxis(axis,index){this.setLeftAxis(axis,index);}/**
	   * Sets a left axis
	   * @param {Axis} axis - The axis instance to set
	   * @param {Number} [ index=0 ] - The index of the axis
	   * @see Graph#setBottomAxis
	   * @see Graph#setTopAxis
	   * @see Graph#setRightAxis
	   * @see Graph#getLeftAxis
	   * @see Graph#getYAxis
	   */},{key:'setLeftAxis',value:function setLeftAxis(axis,index){index=index||0;if(this.axis.left[index]){this.axis.left[index].kill();}this.axis.left[index]=axis;}/**
	   * Sets a right axis
	   * @param {Axis} axis - The axis instance to set
	   * @param {Number} [ index=0 ] - The index of the axis
	   * @see Graph#setBottomAxis
	   * @see Graph#setLeftAxis
	   * @see Graph#setTopAxis
	   * @see Graph#getRightAxis
	   * @see Graph#getYAxis
	   */},{key:'setRightAxis',value:function setRightAxis(axis,index){index=index||0;if(this.axis.right[index]){this.axis.right[index].kill();}this.axis.right[index]=axis;}/**
	   * Sets a top axis
	   * @param {Axis} axis - The axis instance to set
	   * @param {Number} [ index=0 ] - The index of the axis
	   * @see Graph#setBottomAxis
	   * @see Graph#setLeftAxis
	   * @see Graph#setRightAxis
	   * @see Graph#getBottomAxis
	   * @see Graph#getXAxis
	   */},{key:'setTopAxis',value:function setTopAxis(axis,index){index=index||0;if(this.axis.top[index]){this.axis.top[index].kill();}this.axis.top[index]=axis;}/**
	   * Sets a bottom axis
	   * @param {Axis} axis - The axis instance to set
	   * @param {Number} [ index=0 ] - The index of the axis
	   * @see Graph#setTopAxis
	   * @see Graph#setLeftAxis
	   * @see Graph#setRightAxis
	   * @see Graph#getTopAxis
	   * @see Graph#getXAxis
	   */},{key:'setBottomAxis',value:function setBottomAxis(axis,index){index=index||0;if(this.axis.bottom[index]){this.axis.bottom[index].kill();}this.axis.bottom[index]=axis;}},{key:'killAxis',value:function killAxis(axis){var noRedraw=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var noSerieKill=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var index;if(axis.isX()){if((index=this.axis.bottom.indexOf(axis))>-1){this.axis.bottom.splice(index,1);}if((index=this.axis.top.indexOf(axis))>-1){this.axis.top.splice(index,1);}if(!noSerieKill){this.series.map(function(serie){if(serie.getXAxis()==axis){serie.kill();}});}}if(axis.isY()){if((index=this.axis.left.indexOf(axis))>-1){this.axis.left.splice(index,1);}if((index=this.axis.right.indexOf(axis))>-1){this.axis.right.splice(index,1);}if(!noSerieKill){this.series.map(function(serie){if(serie.getYAxis()==axis){serie.kill();}});}}this.axisGroup.removeChild(axis.group);// Removes all DOM
this.groupPrimaryGrids.removeChild(axis.gridPrimary);this.groupSecondaryGrids.removeChild(axis.gridSecondary);if(!noRedraw){this.draw(true);}}/**
	   * Determines if an x axis belongs to the graph
	   * @param {Axis} axis - The axis instance to check
	   */},{key:'hasXAxis',value:function hasXAxis(axis){return this.hasTopAxis(axis)||this.hasBottomAxis(axis);}/**
	   * Determines if an x axis belongs to the graph
	   * @param {Axis} axis - The axis instance to check
	   */},{key:'hasYAxis',value:function hasYAxis(axis){return this.hasLeftAxis(axis)||this.hasRightAxis(axis);}/**
	   * Determines if an x axis belongs to top axes list of the graph
	   * @param {Axis} axis - The axis instance to check
	   */},{key:'hasTopAxis',value:function hasTopAxis(axis){return this.hasAxis(axis,this.axis.top);}/**
	   * Determines if an x axis belongs to bottom axes list of the graph
	   * @param {Axis} axis - The axis instance to check
	   */},{key:'hasBottomAxis',value:function hasBottomAxis(axis){return this.hasAxis(axis,this.axis.bottom);}/**
	   * Determines if a y axis belongs to left axes list of the graph
	   * @param {Axis} axis - The axis instance to check
	   */},{key:'hasLeftAxis',value:function hasLeftAxis(axis){return this.hasAxis(axis,this.axis.left);}/**
	   * Determines if a y axis belongs to right axes list of the graph
	   * @param {Axis} axis - The axis instance to check
	   */},{key:'hasRightAxis',value:function hasRightAxis(axis){return this.hasAxis(axis,this.axis.right);}/**
	   * Determines if an axis belongs to a list of axes
	   * @param {Axis} axis - The axis instance to check
	   * @param {Array} axisList - The list of axes to check
	   * @private
	   */},{key:'hasAxis',value:function hasAxis(axis,axisList){for(var i=0,l=axisList.length;i<l;i++){if(axisList[i]==axis){return true;}if(axisList[i].hasAxis(axis)){return true;}}return false;}/**
	   * Autoscales the x and y axes of the graph.
	   * Does not repaint the canvas
	   * @return {Graph} The current graph instance
	   */},{key:'autoscaleAxes',value:function autoscaleAxes(){this._applyToAxes("setMinMaxToFitSeries",null,true,true);//this._applyToAxes( "scaleToFitAxis", [ this.getYAxis() ], false, true )
// X is not always ascending...
return this;}// See #138
/**
	   *  @alias Graph#autoscaleAxes
	   */},{key:'autoscale',value:function autoscale(){return this.autoscaleAxes.apply(this,arguments);}// See #138
/**
	   *  @alias Graph#autoscaleAxes
	   */},{key:'autoScale',value:function autoScale(){return this.autoscaleAxes.apply(this,arguments);}// See #138
/**
	   *  @alias Graph#autoscaleAxes
	   */},{key:'autoScaleAxes',value:function autoScaleAxes(){return this.autoscaleAxes.apply(this,arguments);}// See #138
/**
	   *  Autoscales a particular axis
	   *  @param {Axis} The axis to rescale
	   *  @return {Graph} The current graph instance
	   */},{key:'autoScaleAxis',value:function autoScaleAxis(axis){if(!axis){return this;}axis.setMinMaxToFitSeries();return this;}/**
	   * Sets the background color
	   * @param {String} color - An SVG accepted color for the background
	   * @return {Graph} The current graph instance
	   */},{key:'setBackgroundColor',value:function setBackgroundColor(color){this.rectEvent.setAttribute('fill',color);return this;}},{key:'getAxisState',value:function getAxisState(){var state={};for(var i in this.axis){state[i]=this.axis[i].map(function(axis){return[axis.getCurrentMin(),axis.getCurrentMax()];});}return state;}},{key:'setAxisState',value:function setAxisState(state){var j,l;for(var i in state){if(!this.axis[i]){continue;}for(j=0,l=state[i].length;j<l;j++){if(!this.axis[i][j]){continue;}this.axis[i][j].setCurrentMin(state[i][j][0]);this.axis[i][j].setCurrentMax(state[i][j][1]);}}this.draw();}},{key:'saveAxisState',value:function saveAxisState(savedName){this.savedAxisState=this.savedAxisState||{};this.savedAxisState[savedName]=this.getAxisState();return this;}},{key:'recallAxisState',value:function recallAxisState(stateName){if(this.savedAxisState[savedName]){this.recallAxisState(this.savedAxisState[savedName]);}return this;}},{key:'_applyToAxis',value:function _applyToAxis(type){switch(type){case'string':return function(type,func,params){//    params.splice(1, 0, type);
for(var i=0;i<this.axis[type].length;i++){this.axis[type][i][func].apply(this.axis[type][i],params);}};break;case'function':return function(type,func,params){for(var i=0;i<this.axis[type].length;i++){func.call(this,this.axis[type][i],type,params);}};break;}}/**
	   * Calculates the minimal or maximal value of the axis. Currently, alias of getBoudaryAxisFromSeries
	   */},{key:'getBoundaryAxis',value:function getBoundaryAxis(axis,minmax,usingZValues){var valSeries=this.getBoundaryAxisFromSeries(axis,minmax,usingZValues);//  var valShapes = this.getBoundaryAxisFromShapes( axis, xy, minmax );
return valSeries;//return Math[ minmax ]( valSeries, valShapes );
}/**
	   * Calculates the minimal or maximal value of the axis, based on the series that belong to it. The value is computed so that all series just fit in the value.
	   * @memberof Graph.prototype
	   * @param {Axis} axis - The axis for which the value should be computed
	   * @param {minmax} minmax - The minimum or maximum to look for. "min" for the minimum, anything else for the maximum
	   * @returns {Number} The minimimum or maximum of the axis based on its series
	   */},{key:'getBoundaryAxisFromSeries',value:function getBoundaryAxisFromSeries(axis,minmax,usingZValues){var min=minmax=='min',val,func=axis.isX()?['getMinX','getMaxX']:['getMinY','getMaxY'],func2use=func[min?0:1],infinity2use=min?+Infinity:-Infinity,currentSerie,serie,series,serieValue,i,l;val=min?Number.MAX_SAFE_INTEGER:Number.MIN_SAFE_INTEGER;series=this.getSeriesFromAxis(axis,true);for(i=0,l=series.length;i<l;i++){serie=series[i];if(!serie.isShown()){continue;}serieValue=serie[func2use](usingZValues);val=Math[minmax](isNaN(val)?infinity2use:val,isNaN(serieValue)?infinity2use:serieValue);}return val;}/**
	   *  Returns all the series associated to an axis
	   *  @param {Axis} axis - The axis to which the series belong
	   *  @returns {Serie[]} An array containing the list of series that belong to the axis
	   */},{key:'getSeriesFromAxis',value:function getSeriesFromAxis(axis){var series=[],i=this.series.length-1;for(;i>=0;i--){if(this.series[i].getXAxis()==axis||this.series[i].getYAxis()==axis){series.push(this.series[i]);}}return series;}/**
	   * Determines the maximum and minimum of each axes, based on {@link Graph#getBoundaryAxis}. It is usually called internally, but if the data of series has changed, called this function to make sure that minimum / maximum of the axes are properly updated.
	   * @see Graph#getBoundaryAxis
	   */},{key:'updateDataMinMaxAxes',value:function updateDataMinMaxAxes(usingZValues){var axisvars=['bottom','top','left','right'],axis,j,l,i,xy;for(j=0,l=axisvars.length;j<l;j++){for(i=this.axis[axisvars[j]].length-1;i>=0;i--){axis=this.axis[axisvars[j]][i];xy=j<2?'x':'y';if(axis.disabled){continue;}//console.log( axisvars[ j ], this.getBoundaryAxisFromSeries( this.axis[ axisvars[ j ] ][ i ], xy, 'min'), this.getBoundaryAxisFromSeries( this.axis[ axisvars[ j ] ][ i ], xy, 'max') );
axis.setMinValueData(this.getBoundaryAxis(this.axis[axisvars[j]][i],'min',usingZValues));axis.setMaxValueData(this.getBoundaryAxis(this.axis[axisvars[j]][i],'max',usingZValues));}}}/**
	   * Function that is called from {@link Graph#_applyToAxes}
	   * @function
	   * @name AxisCallbackFunction
	   * @param {Axis} axis - The axis of the function
	   * @param {String} type - The type of the axis (left,right,top,bottom)
	   * @param params - The params passed in the _applyToAxis function.
	   * @see Graph#_applyToAxes
	   *//**
	   * Applies a function to axes. The function will be executed once for every axis.
	   * If func is a string, the internal function belonging to <strong>the axis</strong> will be called, with the params array flattened out (in this case, params must be an array).
	   * If func is a function, the function will be called with the axis, its type and params as parameters. See {@link AxisCallbackFunction} for more details.
	   * @param {(AxisCallbackFunction|String)} func - The function or function name to execute
	   * @param params - Extra parameters to pass to the function
	   * @param {Boolean} topbottom=false - True to apply to function to top and bottom axes
	   * @param {Boolean} leftright=false - True to apply to function to left and right axes
	   */},{key:'_applyToAxes',value:function _applyToAxes(func,params,tb,lr){var ax=[],i=0,l;if(tb||tb==undefined){ax.push('top');ax.push('bottom');}if(lr||lr==undefined){ax.push('left');ax.push('right');}for(l=ax.length;i<l;i++){this._applyToAxis(typeof func==='undefined'?'undefined':_typeof(func)).call(this,ax[i],func,params);}}/**
	   * Axes can be dependant of one another (for instance for unit conversions)
	   * Finds and returns all the axes that are linked to a specific axis. Mostly used internally.
	   * @param {Axis} axis - The axis that links one or multiple other dependant axes
	   * @returns {Axis[]} The list of axes linked to the axis passed as parameter
	   */},{key:'findAxesLinkedTo',value:function findAxesLinkedTo(axis){var axes=[];this._applyToAxes(function(a){if(a.linkedToAxis&&a.linkedToAxis.axis==axis){axes.push(a);}},{},axis instanceof this.getConstructor("graph.axis.x"),axis instanceof this.getConstructor("graph.axis.y"));return axes;}},{key:'_axisHasChanged',value:function _axisHasChanged(axis){this._axesHaveChanged=true;}/**
	   * Creates a new serie.
	   * If the a serie with the same name exists, returns this serie with update options.
	   * The type of the serie is used to fetch the corresponding registered constructor registered with the name "graph.serie.<type>", e.g "line" will fetch the "graph.serie.line" prototype (built-in)<br />
	   * Built-in series types are "line", "contour", "zone" and "scatter".
	   * @param {String} name - The name of the serie (unique)
	   * @param {Object} options - The serie options
	   * @param {Type} type - The type of the serie.
	   * @returns {Serie} The newly created serie
	   */},{key:'newSerie',value:function newSerie(name,options,type){var serie=void 0;if((typeof options==='undefined'?'undefined':_typeof(options))!=="object"&&!type){type=options;options={};}if(!type){type=Graph.SERIE_LINE;}if(serie=this.getSerie(name)){return serie;}if(!(serie=makeSerie(this,name,options,type))){return;}this.series.push(serie);this.emit("newSerie",serie);return serie;}/**
	   * Looks for an existing serie by name or by index and returns it.
	   * The index of the serie follows the creation sequence (0 for the first one, 1 for the second one, ...)
	   * @param {(String|Number)} name - The name or the index of the serie
	   * @returns {Serie}
	   */},{key:'getSerie',value:function getSerie(name){if(typeof name=='number'){return this.series[name]||false;}var i=0,l=this.series.length;for(;i<l;i++){if(this.series[i].getName()==name){return this.series[i];}}return false;}/**
	   * Returns all the series
	   * @returns {Serie[]} An array of all the series
	   */},{key:'getSeries',value:function getSeries(){return this.series;}/**
	   * Returns all the series that correspond to one or multiple types
	   * @param {...Symbol} type - The serie types to select
	   * @returns {Serie[]} An array of all the series
	   * @example graph.allSeries( Graph.SERIE_LINE, Graph.SERIE_ZONE );
	   */},{key:'allSeries',value:function allSeries(){for(var _len=arguments.length,types=Array(_len),_key=0;_key<_len;_key++){types[_key]=arguments[_key];}return this.series.filter(function(serie){return types.include(serie.getType());});}/**
	   * Draws a specific serie
	   * @param {Serie} serie - The serie to redraw
	   * @param {Boolean} force - Forces redraw even if no data has changed
	   */},{key:'drawSerie',value:function drawSerie(serie,force){if(!serie.draw){throw"Serie has no method draw";}serie.draw(force);}/**
	   * Redraws all visible series
	   * @param {Boolean} force - Forces redraw even if no data has changed
	   */},{key:'drawSeries',value:function drawSeries(force){if(!this.width||!this.height){return;}var i=this.series.length-1;for(;i>=0;i--){if(this.series[i].isShown()){this.drawSerie(this.series[i],force);}}}/**
	   * @alias Graph#removeSeries
	   */},{key:'resetSeries',value:function resetSeries(){this.removeSeries();}/**
	   * @alias Graph#removeSeries
	   */},{key:'killSeries',value:function killSeries(){this.resetSeries();}/**
	   * Removes all series from the graph
	   */},{key:'removeSeries',value:function removeSeries(){while(this.series[0]){this.series[0].kill(true);}this.series=[];if(this.legend){this.legend.update();}}/**
	   * Selects a serie. Only one serie per graph can be selected.
	   * @param {Serie} serie - The serie to select
	   * @param {String} selectName="selected" - The name of the selection
	   */},{key:'selectSerie',value:function selectSerie(serie,selectName){if(!((typeof serie==='undefined'?'undefined':_typeof(serie))=="object")){serie=this.getSerie(serie);}if(this.selectedSerie==serie&&this.selectedSerie.selectionType==selectName){return;}if(this.selectedSerie!==serie){this.unselectSerie(serie);}this.selectedSerie=serie;this.triggerEvent('onSelectSerie',serie);serie.select(selectName||"selected");}/**
	   * Returns the selected serie
	   * @returns {(Serie|undefined)} The selected serie
	   */},{key:'getSelectedSerie',value:function getSelectedSerie(){return this.selectedSerie;}/**
	   * Unselects a serie
	   * @param {Serie} serie - The serie to unselect
	   */},{key:'unselectSerie',value:function unselectSerie(serie){serie.unselect();this.selectedSerie=false;this.triggerEvent('onUnselectSerie',serie);}/**
	   * Returns all the shapes associated to a serie. Shapes can (but don't have to) be associated to a serie. The position of the shape can then be relative to the same axes as the serie.
	   * @param {Serie} serie - The serie containing the shapes
	   * @returns {Shape[]} An array containing a list of shapes associated to the serie
	   */},{key:'getShapesOfSerie',value:function getShapesOfSerie(serie){var shapes=[];var i=this.shapes.length-1;for(;i>=0;i--){if(this.shapes[i].getSerie()==serie){shapes.push(this.shapes[i]);}}return shapes;}},{key:'makeToolbar',value:function makeToolbar(toolbarData){var constructor=this.getConstructor("graph.toolbar");if(constructor){return this.toolbar=new constructor(this,toolbarData);}else{return util.throwError("No constructor exists for toolbar");}}/**
	   *  Returns all shapes from the graph
	   */},{key:'getShapes',value:function getShapes(){return this.shapes||[];}/**
	   * Creates a new shape. jsGraph will look for the registered constructor "graph.shape.<shapeType>".
	   * @param {String} shapeType - The type of the shape
	   * @param {Object} [shapeData] - The options passed to the shape creator
	   * @param {Boolean} [mute=false] - <code>true</code> to create the shape quietly
	   * @param {Object} [shapeProperties] - The native object containing the shape properties in the jsGraph format (caution when using it)
	   * @returns {Shape} The created shape
	   * @see Graph#getConstructor
	   */},{key:'newShape',value:function newShape(shapeType,shapeData,mute,shapeProperties){var self=this,response;this.prevent(false);if(!mute){this.emit('beforeNewShape',shapeData);if(this.prevent(false)){return false;}}// Backward compatibility
if((typeof shapeType==='undefined'?'undefined':_typeof(shapeType))=="object"){mute=shapeData;shapeData=shapeType;shapeType=shapeData.type;}shapeData=shapeData||{};shapeData._id=util.guid();var constructor;if(typeof shapeType=="function"){constructor=shapeType;}else{constructor=this.getConstructor("graph.shape."+shapeType);}if(!constructor){return util.throwError("No constructor for this shape");}var shape=new constructor(this,shapeData);if(!shape){return util.throwError("Failed to construct shape.");}shape.type=shapeType;shape.graph=this;shape._data=shapeData;shape.init(this,shapeProperties);if(shapeData.position){for(var i=0,l=shapeData.position.length;i<l;i++){shape.setPosition(new _graph2.default(shapeData.position[i]),i);}}if(shapeData.properties!==undefined){shape.setProperties(shapeData.properties);}/* Setting shape properties */if(shapeData.fillColor!==undefined){shape.setFillColor(shapeData.fillColor);}if(shapeData.fillOpacity!==undefined){shape.setFillOpacity(shapeData.fillOpacity);}if(shapeData.strokeColor!==undefined){shape.setStrokeColor(shapeData.strokeColor);}if(shapeData.strokeWidth!==undefined){shape.setStrokeWidth(shapeData.strokeWidth);}if(shapeData.layer!==undefined){shape.setLayer(shapeData.layer);}if(shapeData.locked==true){shape.lock();}if(shapeData.movable==true){shape.movable();}if(shapeData.selectable==true){shape.selectable();}if(shapeData.resizable==true){shape.resizable();}if(shapeData.attributes!==undefined){shape.setProp("attributes",shapeData.attributes);}if(shapeData.handles!==undefined){shape.setProp('handles',shapeData.handles);}if(shapeData.selectOnMouseDown!==undefined){shape.setProp("selectOnMouseDown",true);}if(shapeData.selectOnClick!==undefined){shape.setProp("selectOnClick",true);}if(shapeData.highlightOnMouseOver!==undefined){shape.setProp("highlightOnMouseOver",true);}if(shapeData.labelEditable){shape.setProp("labelEditable",shapeData.labelEditable);}if(shapeData.labels&&!shapeData.label){shapeData.label=shapeData.labels;}if(shapeData.label!==undefined){if(!Array.isArray(shapeData.label)){shapeData.label=[shapeData.label];}for(var i=0,l=shapeData.label.length;i<l;i++){shape.showLabel(i);shape.setLabelText(shapeData.label[i].text,i);shape.setLabelPosition(shapeData.label[i].position,i);shape.setLabelColor(shapeData.label[i].color||'black',i);shape.setLabelSize(shapeData.label[i].size,i);shape.setLabelAngle(shapeData.label[i].angle||0,i);shape.setLabelBaseline(shapeData.label[i].baseline||'no-change',i);shape.setLabelAnchor(shapeData.label[i].anchor||'start',i);}}shape.createHandles();this.shapes.push(shape);if(!mute){this.emit('newShape',shape,shapeData);}return shape;}/**
	   * Creates a new position. Arguments are passed to the position constructor
	   * @param {...*} var_args
	   * @see Position
	   */},{key:'newPosition',value:function newPosition(var_args){return new(Function.prototype.bind.apply(_graph2.default,[null].concat(Array.prototype.slice.call(arguments))))();// 18 September 2016 Norman: What is that ?
Array.prototype.unshift.call(arguments,null);return new(Function.prototype.bind.apply(_graph2.default,arguments))();}/**
	   *  Redraws all shapes. To be called if their definitions have changed
	   */},{key:'redrawShapes',value:function redrawShapes(){//this.graphingZone.removeChild(this.shapeZone);
for(var i=0,l=this.shapes.length;i<l;i++){this.shapes[i].redraw();}//this.graphingZone.insertBefore(this.shapeZone, this.axisGroup);
}/**
	   *  Removes all shapes from the graph
	   */},{key:'removeShapes',value:function removeShapes(){for(var i=0,l=this.shapes.length;i<l;i++){if(this.shapes[i]&&this.shapes[i].kill){this.shapes[i].kill(true);}}this.shapes=[];}/**
	   * Selects a shape
	   * @param {Shape} shape - The shape to select
	   * @param {Boolean} mute - Select the shape quietly
	   */},{key:'selectShape',value:function selectShape(shape,mute){// Already selected. Returns false
if(!shape){return;}if(this.selectedShapes.indexOf(shape)>-1){return false;}if(!shape.isSelectable()){return false;}if(!mute){this.emit("beforeShapeSelect",shape);}if(this.prevent(false)){return;}if(this.selectedShapes.length>0&&this.options.shapesUniqueSelection){// Only one selected shape at the time
this.unselectShapes(mute);}shape._select(mute);this.selectedShapes.push(shape);if(!mute){this.emit("shapeSelect",shape);}}/**
	   * Unselects a shape
	   * @param {Shape} shape - The shape to unselect
	   * @param {Boolean} mute - Unselect the shape quietly
	   */},{key:'unselectShape',value:function unselectShape(shape,mute){if(this.selectedShapes.indexOf(shape)==-1){return;}if(!mute){this.emit("beforeShapeUnselect",shape);}if(this.cancelUnselectShape){this.cancelUnselectShape=false;return;}shape._unselect();this.selectedShapes.splice(this.selectedShapes.indexOf(shape),1);if(!mute){this.emit("shapeUnselect",shape);}}/**
	   * Unselects all shapes
	   * @param {Boolean} [ mute = false ] - Mutes all unselection events
	   * @return {Graph} The current graph instance
	   */},{key:'unselectShapes',value:function unselectShapes(mute){while(this.selectedShapes[0]){this.unselectShape(this.selectedShapes[0],mute);}return this;}},{key:'_removeShape',value:function _removeShape(shape){this.shapes.splice(this.shapes.indexOf(shape),1);}},{key:'appendShapeToDom',value:function appendShapeToDom(shape){this.getLayer(shape.getLayer(),'shape').appendChild(shape.group);}},{key:'removeShapeFromDom',value:function removeShapeFromDom(shape){this.getLayer(shape.getLayer(),'shape').removeChild(shape.group);}},{key:'appendSerieToDom',value:function appendSerieToDom(serie){this.getLayer(serie.getLayer(),'serie').appendChild(serie.groupMain);}},{key:'removeSerieFromDom',value:function removeSerieFromDom(serie){this.getLayer(serie.getLayer(),'serie').removeChild(serie.groupMain);}},{key:'getLayer',value:function getLayer(layer,mode){if(!this.layers[layer]){this.layers[layer]=[];this.layers[layer][0]=document.createElementNS(this.ns,'g');this.layers[layer][0].setAttribute('data-layer',layer);this.layers[layer][1]=document.createElementNS(this.ns,'g');this.layers[layer][2]=document.createElementNS(this.ns,'g');this.layers[layer][0].appendChild(this.layers[layer][1]);this.layers[layer][0].appendChild(this.layers[layer][2]);var i=1,prevLayer;while(!(prevLayer=this.layers[layer-i])&&layer-i>=0){i++;}if(!prevLayer){this.plotGroup.insertBefore(this.layers[layer][0],this.plotGroup.firstChild);}else if(prevLayer.nextSibling){this.plotGroup.insertBefore(this.layers[layer][0],prevLayer.nextSibling);}else{this.plotGroup.appendChild(this.layers[layer][0]);}}return this.layers[layer][mode=='shape'?2:1];}},{key:'focus',value:function focus(){this._dom.focus();}},{key:'elementMoving',value:function elementMoving(movingElement){this.bypassHandleMouse=movingElement;}},{key:'stopElementMoving',value:function stopElementMoving(element){if(element&&element==this.bypassHandleMouse){this.bypassHandleMouse=false;}else if(!element){this.bypassHandleMouse=false;}}},{key:'_makeClosingLines',value:function _makeClosingLines(){this.closingLines={};var els=['top','bottom','left','right'],i=0,l=4;for(;i<l;i++){var line=document.createElementNS(this.ns,'line');line.setAttribute('stroke','black');line.setAttribute('shape-rendering','crispEdges');line.setAttribute('stroke-linecap','square');line.setAttribute('display','none');this.closingLines[els[i]]=line;this.graphingZone.appendChild(line);}}},{key:'isActionAllowed',value:function isActionAllowed(e,action){if(action.type!==e.type&&(action.type!==undefined||e.type!=="mousedown")&&!((e.type==='wheel'||e.type==='mousewheel')&&action.type=='mousewheel')){return;}if(action.key){if(action.key!==e.keyCode){var keyCheck={'backspace':8,'enter':13,'tab':9,'shift':16,'ctrl':17,'alt':18,'pause':19,'escape':27,'up':33,'down':34,'left':37,'right':39};if(keyCheck[action.key]!==e.keyCode){return;}}}if(action.shift===undefined){action.shift=false;}if(action.ctrl===undefined){action.ctrl=false;}if(action.meta===undefined){action.meta=false;}if(action.alt===undefined){action.alt=false;}return e.shiftKey==action.shift&&e.ctrlKey==action.ctrl&&e.metaKey==action.meta&&e.altKey==action.alt;}},{key:'forcePlugin',value:function forcePlugin(plugin){this.forcedPlugin=plugin;}},{key:'unforcePlugin',value:function unforcePlugin(){this.forcedPlugin=false;}},{key:'_pluginsExecute',value:function _pluginsExecute(funcName,args){//			Array.prototype.splice.apply(args, [0, 0, this]);
for(var i in this.plugins){if(this.plugins[i]&&this.plugins[i][funcName]){this.plugins[i][funcName].apply(this.plugins[i],args);}}}},{key:'_pluginExecute',value:function _pluginExecute(which,func,args){//Array.prototype.splice.apply( args, [ 0, 0, this ] );
if(!which){return;}if(this.plugins[which]&&this.plugins[which][func]){this.plugins[which][func].apply(this.plugins[which],args);}}},{key:'pluginYieldActiveState',value:function pluginYieldActiveState(){this.activePlugin=false;}},{key:'_serieExecute',value:function _serieExecute(which,func,args){if((typeof serie==='undefined'?'undefined':_typeof(serie))!=='object'){serie=this.getSerie(serie);}if(typeof serie[func]=='function'){serie.apply(serie,args);}}},{key:'_pluginsInit',value:function _pluginsInit(){var constructor,pluginName,pluginOptions;for(var i in this.options.plugins){pluginName=i;pluginOptions=this.options.plugins[i];constructor=this.getConstructor("graph.plugin."+pluginName);if(constructor){var options=util.extend(true,{},constructor.defaults(),pluginOptions);this.plugins[pluginName]=new constructor(options);util.mapEventEmission(this.plugins[pluginName].options,this.plugins[pluginName]);this.plugins[pluginName].init(this,pluginOptions);}else{util.throwError("Plugin \""+pluginName+"\" has not been registered");}}}/**
	   * Returns an initialized plugin
	   * @param {String} pluginName
	   * @returns {Plugin} The plugin which name is <pluginName>
	   */},{key:'getPlugin',value:function getPlugin(pluginName){var plugin=this.plugins[pluginName];if(!plugin){return util.throwError("Plugin \""+pluginName+"\" has not been loaded or properly registered");}return plugin;}},{key:'triggerEvent',value:function triggerEvent(){var func=arguments[0],args=Array.prototype.splice.apply(arguments,[0,1]);if(typeof this.options[func]=="function"){return this.options[func].apply(this,arguments);}return;}/**
	   * Creates a legend. Only one legend is allowed per graph
	   * @param {Object} options - The legend options
	   */},{key:'makeLegend',value:function makeLegend(options){if(this.legend){return this.legend;}var constructor=this.getConstructor("graph.legend");if(constructor){this.legend=new constructor(this,options);}else{return util.throwError("Graph legend is not available as it has not been registered");}//    this.legend.update();
return this.legend;}/**
	   * Redraws the legend if it exists
	   * @param {Boolean} [ onlyIfRequired = false ] ```true``` to redraw the legend only when it actually needs to be updated
	   * @return {Graph} The graph instance
	   */},{key:'updateLegend',value:function updateLegend(){var onlyIfRequired=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;if(!this.legend){return;}this.legend.update(onlyIfRequired);return this;}/**
	   * @returns {Legend} The legend item
	   */},{key:'getLegend',value:function getLegend(){if(!this.legend){return;}return this.legend;}},{key:'requireLegendUpdate',value:function requireLegendUpdate(){if(!this.legend){return;}this.legend.requireDelayedUpdate();}},{key:'orthogonalProjectionSetup',value:function orthogonalProjectionSetup(options){this.options.zAxis=util.extend(true,{maxZ:10,minZ:0,shiftX:-25,shiftY:-15,xAxis:this.getXAxis(),yAxis:this.getYAxis()});}},{key:'orthogonalProjectionUpdate',value:function orthogonalProjectionUpdate(){var _this2=this;if(!this.zAxis){this.zAxis={g:document.createElementNS(this.ns,"g"),l:document.createElementNS(this.ns,"line")};this.zAxis.g.appendChild(this.zAxis.l);this.groupGrids.appendChild(this.zAxis.g);}var refAxisX=this.options.zAxis.xAxis;var refAxisY=this.options.zAxis.yAxis;var x0=refAxisX.getMinPx();var y0=refAxisY.getMinPx();var dx=refAxisX.getZProj(this.options.zAxis.maxZ);var dy=refAxisY.getZProj(this.options.zAxis.maxZ);this.zAxis.l.setAttribute('stroke','black');this.zAxis.l.setAttribute('x1',x0);this.zAxis.l.setAttribute('x2',x0+dx);this.zAxis.l.setAttribute('y1',y0);this.zAxis.l.setAttribute('y2',y0+dy);this.updateDataMinMaxAxes(true);var sort=this.series.map(function(serie){return[serie.getZPos(),serie];});sort.sort(function(sa,sb){return sb[0]-sa[0];});var i=0;sort.forEach(function(s){s[1].setLayer(i);_this2.appendSerieToDom(s[1]);i++;});this.drawSeries(true);}/**
	   * Kills the graph
	   **/},{key:'kill',value:function kill(){this._dom.removeChild(this.dom);}},{key:'_removeSerie',value:function _removeSerie(serie){this.series.splice(this.series.indexOf(serie),1);}},{key:'contextListen',value:function contextListen(target,menuElements,callback){var self=this;if(this.options.onContextMenuListen){return this.options.onContextMenuListen(target,menuElements,callback);}}},{key:'lockShapes',value:function lockShapes(){this.shapesLocked=true;// Removes the current actions of the shapes
for(var i=0,l=this.shapes.length;i<l;i++){this.shapes[i].moving=false;this.shapes[i].resizing=false;}}},{key:'unlockShapes',value:function unlockShapes(){//		console.log('unlock');
this.shapesLocked=false;}},{key:'prevent',value:function prevent(arg){var curr=this.prevented;if(arg!=-1){this.prevented=arg==undefined||arg;}return curr;}},{key:'_getXY',value:function _getXY(e){var x=e.pageX,y=e.pageY;var pos=this.offsetCached||util.getOffset(this._dom);x-=pos.left/* - window.scrollX*/;y-=pos.top/* - window.scrollY*/;return{x:x,y:y};}},{key:'_resize',value:function _resize(){if(!this.width||!this.height){return;}this.getDrawingWidth();this.getDrawingHeight();this.sizeSet=true;this.dom.setAttribute('width',this.width);this.dom.setAttribute('height',this.height);this.domTitle.setAttribute('x',this.width/2);this.requireLegendUpdate();this.draw(true);}},{key:'_doDom',value:function _doDom(){// Create SVG element, set the NS
this.dom=document.createElementNS(this.ns,'svg');this.dom.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink");//this.dom.setAttributeNS(this.ns, 'xmlns:xlink', this.nsxml);
util.setAttributeTo(this.dom,{'xmlns':this.ns,'font-family':this.options.fontFamily,'font-size':this.options.fontSize});this._dom.appendChild(this.dom);this._dom.setAttribute('tabindex',1);this._dom.style.outline="none";this.defs=document.createElementNS(this.ns,'defs');this.dom.appendChild(this.defs);this.groupEvent=document.createElementNS(this.ns,'g');this.rectEvent=document.createElementNS(this.ns,'rect');util.setAttributeTo(this.rectEvent,{'pointer-events':'fill','fill':'transparent'});this.groupEvent.appendChild(this.rectEvent);this.dom.appendChild(this.groupEvent);// Handling graph title
this.domTitle=document.createElementNS(this.ns,'text');this.setTitle(this.options.title);util.setAttributeTo(this.domTitle,{'text-anchor':'middle','y':20});this.groupEvent.appendChild(this.domTitle);//
this.graphingZone=document.createElementNS(this.ns,'g');this.updateGraphingZone();this.groupEvent.appendChild(this.graphingZone);/*  this.shapeZoneRect = document.createElementNS(this.ns, 'rect');
	    //this.shapeZoneRect.setAttribute('pointer-events', 'fill');
	    this.shapeZoneRect.setAttribute('fill', 'transparent');
	    this.shapeZone.appendChild(this.shapeZoneRect);
	  */this.axisGroup=document.createElementNS(this.ns,'g');this.graphingZone.appendChild(this.axisGroup);this.groupGrids=document.createElementNS(this.ns,'g');// With the z stacking, this should probably be removed
//this.groupGrids.setAttribute( 'clip-path', 'url(#_clipplot' + this._creation + ')' );
this.groupPrimaryGrids=document.createElementNS(this.ns,'g');this.groupSecondaryGrids=document.createElementNS(this.ns,'g');this.axisGroup.appendChild(this.groupGrids);this.groupGrids.appendChild(this.groupSecondaryGrids);this.groupGrids.appendChild(this.groupPrimaryGrids);this.plotGroup=document.createElementNS(this.ns,'g');this.graphingZone.appendChild(this.plotGroup);// 5 September 2014. I encountered a case here shapeZone must be above plotGroup
/*this.shapeZone = document.createElementNS( this.ns, 'g' );
	    this.graphingZone.appendChild( this.shapeZone );
	*/this.layers=[];this._makeClosingLines();this.clip=document.createElementNS(this.ns,'clipPath');this.clip.setAttribute('id','_clipplot'+this._creation);this.defs.appendChild(this.clip);this.clipRect=document.createElementNS(this.ns,'rect');this.clip.appendChild(this.clipRect);this.clip.setAttribute('clipPathUnits','userSpaceOnUse');this.markerArrow=document.createElementNS(this.ns,'marker');this.markerArrow.setAttribute('viewBox','0 0 10 10');this.markerArrow.setAttribute('id','arrow'+this._creation);this.markerArrow.setAttribute('refX','6');this.markerArrow.setAttribute('refY','5');this.markerArrow.setAttribute('markerUnits','strokeWidth');this.markerArrow.setAttribute('markerWidth','8');this.markerArrow.setAttribute('markerHeight','6');this.markerArrow.setAttribute('orient','auto');//this.markerArrow.setAttribute('fill', 'context-stroke');
//this.markerArrow.setAttribute('stroke', 'context-stroke');
var pathArrow=document.createElementNS(this.ns,'path');pathArrow.setAttribute('d','M 0 0 L 10 5 L 0 10 z');//pathArrow.setAttribute( 'fill', 'context-stroke' );
this.markerArrow.appendChild(pathArrow);this.defs.appendChild(this.markerArrow);// Horionzal split marker for axis
this.markerHorizontalSplit=document.createElementNS(this.ns,'marker');this.markerHorizontalSplit.setAttribute('viewBox','0 0 6 8');this.markerHorizontalSplit.setAttribute('id','horionzalsplit_'+this.getId());this.markerHorizontalSplit.setAttribute('refX','3');this.markerHorizontalSplit.setAttribute('refY','4');this.markerHorizontalSplit.setAttribute('markerUnits','strokeWidth');this.markerHorizontalSplit.setAttribute('markerWidth','6');this.markerHorizontalSplit.setAttribute('markerHeight','8');var path=document.createElementNS(this.ns,'line');path.setAttribute('x1','0');path.setAttribute('y1','8');path.setAttribute('x2','6');path.setAttribute('y2','0');path.setAttribute('stroke','black');this.markerHorizontalSplit.appendChild(path);this.defs.appendChild(this.markerHorizontalSplit);// Vertical split marker for axis
this.markerVerticalSplit=document.createElementNS(this.ns,'marker');this.markerVerticalSplit.setAttribute('viewBox','0 0 8 6');this.markerVerticalSplit.setAttribute('id','verticalsplit_'+this.getId());this.markerVerticalSplit.setAttribute('refX','4');this.markerVerticalSplit.setAttribute('refY','3');this.markerVerticalSplit.setAttribute('markerUnits','strokeWidth');this.markerVerticalSplit.setAttribute('markerWidth','8');this.markerVerticalSplit.setAttribute('markerHeight','6');var path=document.createElementNS(this.ns,'line');path.setAttribute('x1','0');path.setAttribute('y1','0');path.setAttribute('x2','8');path.setAttribute('y2','6');path.setAttribute('stroke','black');this.markerVerticalSplit.appendChild(path);this.defs.appendChild(this.markerVerticalSplit);this.vertLineArrow=document.createElementNS(this.ns,'marker');this.vertLineArrow.setAttribute('viewBox','0 0 10 10');this.vertLineArrow.setAttribute('id','verticalline'+this._creation);this.vertLineArrow.setAttribute('refX','0');this.vertLineArrow.setAttribute('refY','5');this.vertLineArrow.setAttribute('markerUnits','strokeWidth');this.vertLineArrow.setAttribute('markerWidth','20');this.vertLineArrow.setAttribute('markerHeight','10');this.vertLineArrow.setAttribute('orient','auto');//this.vertLineArrow.setAttribute('fill', 'context-stroke');
//this.vertLineArrow.setAttribute('stroke', 'context-stroke');
this.vertLineArrow.setAttribute('stroke-width','1px');var pathVertLine=document.createElementNS(this.ns,'path');pathVertLine.setAttribute('d','M 0 -10 L 0 10');pathVertLine.setAttribute('stroke','black');this.vertLineArrow.appendChild(pathVertLine);this.defs.appendChild(this.vertLineArrow);// Removed with z stacking ?
//    this.plotGroup.setAttribute( 'clip-path', 'url(#_clipplot' + this._creation + ')' );
this.bypassHandleMouse=false;}},{key:'updateGraphingZone',value:function updateGraphingZone(){util.setAttributeTo(this.graphingZone,{'transform':'translate('+this.options.paddingLeft+', '+this.options.paddingTop+')'});this._sizeChanged=true;}// We have to proxy the methods in case they are called anonymously
},{key:'getDrawingSpaceWidth',value:function getDrawingSpaceWidth(){var _this3=this;return function(){return _this3.drawingSpaceWidth;};}},{key:'getDrawingSpaceHeight',value:function getDrawingSpaceHeight(){var _this4=this;return function(){return _this4.drawingSpaceHeight;};}},{key:'getDrawingSpaceMinX',value:function getDrawingSpaceMinX(){var _this5=this;return function(){return _this5.drawingSpaceMinX;};}},{key:'getDrawingSpaceMinY',value:function getDrawingSpaceMinY(){var _this6=this;return function(){return _this6.drawingSpaceMinY;};}},{key:'getDrawingSpaceMaxX',value:function getDrawingSpaceMaxX(){var _this7=this;return function(){return _this7.drawingSpaceMaxX;};}},{key:'getDrawingSpaceMaxY',value:function getDrawingSpaceMaxY(){var _this8=this;return function(){return _this8.drawingSpaceMaxY;};}},{key:'trackingLine',value:function trackingLine(options){var self=this;if(options){this.options.trackingLine=options;}// Individual tracking
if(options.mode=="individual"){if(options.series){options.series.map(function(sOptions){if(_typeof(sOptions.serie)!=="object"){sOptions.serie=this.getSerie(sOptions.serie);}self.addSerieToTrackingLine(sOptions.serie,sOptions);});}}else{options.series.map(function(serie){serie.serie.disableTracking();});}this.trackingLine=this.newShape('line',util.extend(true,{position:[{y:'min'},{y:'max'}],stroke:'black',layer:-1},options.trackingLineShapeOptions));this.trackingLine.draw();return this.trackingLine;}},{key:'addSerieToTrackingLine',value:function addSerieToTrackingLine(serie,options){var self=this;if(!this.options.trackingLine){this.trackingLine({mode:'individual'});}serie.enableTracking(function(serie,index,x,y){if(index){self.trackingLine.show();var closestIndex=index.xIndexClosest;self.trackingLine.getPosition(0).x=serie.getData()[0][index.closestIndex*2];self.trackingLine.getPosition(1).x=serie.getData()[0][index.closestIndex*2];self.trackingLine.redraw();serie._trackingLegend=_trackingLegendSerie(self,{serie:serie},x,y,serie._trackingLegend,options.textMethod?options.textMethod:function(output){for(var i in output){return output[i].serie.serie.getName()+": "+output[i].serie.serie.getYAxis().valueToHtml(output[i].yValue);break;}},self.trackingLine.getPosition(0).x);serie._trackingLegend.style.display="block";}},function(serie){self.trackingLine.hide();if(serie.trackingShape){serie.trackingShape.hide();}if(serie._trackingLegend){serie._trackingLegend.style.display="none";}serie._trackingLegend=_trackingLegendSerie(self,{serie:serie},false,false,serie._trackingLegend,false,false);});}/**
	   *  Pass here the katex.render method to be used later
	   *   @param {Function} renderer -  katexRendered - renderer
	   *   @return {Graph} The current graph instance
	   */},{key:'setKatexRenderer',value:function setKatexRenderer(renderer){this._katexRenderer=renderer;}},{key:'hasKatexRenderer',value:function hasKatexRenderer(){return!!this._katexRenderer;}},{key:'renderWithKatex',value:function renderWithKatex(katexValue,katexElement){if(this._katexRenderer){if(katexElement){katexElement.removeChild(katexElement.firstChild);}else{katexElement=document.createElementNS(this.ns,'foreignObject');}var div=document.createElement("div");katexElement.appendChild(div);console.log(katexValue);this._katexRenderer(katexValue,div);return katexElement;}return false;}/**
	   * Returns a graph created from a schema
	   * @param {Object} schema - The schema (see https://github.com/cheminfo/json-chart/blob/master/chart-schema.json)
	   * @param {HTMLElement} wrapper - The wrapping element
	   * @returns {Graph} Newly created graph
	   */},{key:'exportToSchema',value:function exportToSchema(){var _this9=this;var schema={};schema.title=this.options.title;schema.width=this.getWidth();schema.height=this.getHeight();var axesPositions=['top','bottom','left','right'];var axesExport=[];var allaxes={x:[],y:[]};axesPositions.map(function(axisPosition){if(!_this9.axis[axisPosition]){return;}axesExport=axesExport.concat(_this9.axis[axisPosition].map(function(axis){return{type:axisPosition,label:axis.options.label,unit:axis.options.unit,min:axis.options.forcedMin,max:axis.options.forcedMax,flip:axis.options.flipped};}));if(axisPosition=='top'||axisPosition=='bottom'){allaxes.x=allaxes.x.concat(_this9.axis[axisPosition]);}else{allaxes.y=allaxes.y.concat(_this9.axis[axisPosition]);}});schema.axis=axesExport;var seriesExport=[];var toType=function toType(type){switch(type){case Graph.SERIE_LINE:return'line';break;case Graph.SERIE_BAR:return'bar';break;case Graph.SERIE_SCATTER:return'scatter';break;}};var exportData=function exportData(serie,x){var data=[];switch(serie.getType()){case Graph.SERIE_LINE:for(var i=0;i<serie.data.length;i++){for(var j=0;j<serie.data[i].length-1;j+=2){data.push(serie.data[i][j+(x&&serie.isFlipped()||!x&&!serie.isFlipped()?1:0)]);}}break;case Graph.SERIE_SCATTER:for(var j=0;j<serie.data.length-1;j+=2){data.push(serie.data[i+(x&&serie.isFlipped()||!x&&!serie.isFlipped()?1:0)]);}break;}return data;};schema.data=seriesExport.concat(this.series.map(function(serie){var style=[];var linestyle=[];if(serie.getType()==Graph.SERIE_LINE){for(var stylename in serie.styles){linestyle.push({styleName:stylename,color:serie.styles[stylename].lineColor,lineWidth:serie.styles[stylename].lineWidth,lineStyle:serie.styles[stylename].lineStyle});var styleObj={styleName:stylename,styles:[]};style.push(styleObj);styleObj.styles=styleObj.styles.concat((serie.styles[stylename].markers||[]).map(function(markers){return{shape:markers.type,zoom:markers.zoom,lineWidth:markers.strokeWidth,lineColor:markers.strokeColor,color:markers.fillColor,points:markers.points};}));}}return{label:serie.getLabel(),id:serie.getName(),type:toType(serie.getType()),x:exportData(serie,true),y:exportData(serie,false),xAxis:allaxes.x.indexOf(serie.getXAxis()),yAxis:allaxes.y.indexOf(serie.getYAxis()),style:style,lineStyle:linestyle};}));return schema;}/**
	   * Registers a constructor to jsGraph. Constructors are used on a later basis by jsGraph to create series, shapes or plugins
	   * @param {String} constructorName - The name of the constructor
	   * @param {Function} constructor - The constructor method
	   * @see Graph.getConstructor
	   * @static
	   */}],[{key:'fromSchema',value:function fromSchema(schema,wrapper){var graph;var options={};var axes={left:[],top:[],right:[],bottom:[]};var axesIndices=[];if(schema.title){options.title=schema.title;}if(schema.axis){schema.axis.map(function(schemaAxis){if(!schemaAxis.type){util.throwError("Axis type is required (top, bottom, left or right)");}var axisOptions={};if(schemaAxis.label){axisOptions.labelValue=schemaAxis.label;}if(schemaAxis.unit!==undefined){axisOptions.unit=schemaAxis.unit;}if(schemaAxis.unitWrapperAfter!==undefined){axisOptions.unitWrapperAfter=schemaAxis.unitWrapperAfter;}if(schemaAxis.unitWrapperBefore!==undefined){axisOptions.unitWrapperBefore=schemaAxis.unitWrapperBefore;}if(schemaAxis.min!==undefined){axisOptions.forcedMin=schemaAxis.min;}if(schemaAxis.max!==undefined){axisOptions.forcedMax=schemaAxis.max;}if(schemaAxis.flip!==undefined){axisOptions.flipped=schemaAxis.flip;}axes[schemaAxis.type].push(axisOptions);schemaAxis._jsGraphIndex=axes[schemaAxis.type].length-1;});}graph=new Graph(wrapper,options,axes);if(schema.width){graph.setWidth(schema.width);}if(schema.height){graph.setHeight(schema.width);}graph._resize();if(schema.data){schema.data.map(function(schemaSerie){var serieType=schemaSerie.type,serie,serieOptions={},serieAxis;switch(schemaSerie.type){case'bar':util.throwError("Bar charts not supported");serieType=false;break;case'scatter':serieType=Graph.SERIE_SCATTER;break;case'box':serieType=Graph.SERIE_BOX;if(schemaSerie.orientation=='x'||schemaSerie.orientation=='y'){serieOptions.orientation=schemaSerie.orientation;}break;default:serieType=Graph.SERIE_LINE;break;}if(!serieType){util.throwError("No valid serie type was found");return;}serie=graph.newSerie(schemaSerie.id||schemaSerie.label||util.guid(),serieOptions,serieType);if(schemaSerie.lineStyle){schemaSerie.lineStyle.map(function(style){var styleSerie={};style.styleName=style.styleName||"unselected";switch(serieType){case Graph.SERIE_LINE:if(style.lineWidth!==undefined){styleSerie.lineWidth=style.lineWidth;}if(style.color!==undefined){styleSerie.lineColor=style.color;}if(style.lineStyle){styleSerie.lineStyle=style.lineStyle;}serie.setStyle(styleSerie,style.styleName);break;}});}if(schemaSerie.style){schemaSerie.style.map(function(style){var styleSerie={};style.styleName=style.styleName||"unselected";if(!Array.isArray(style.styles)){style.styles=[style.styles];}var styles=style.styles.map(function(style){switch(serieType){case Graph.SERIE_LINE:return{type:style.shape,zoom:style.zoom,strokeWidth:style.lineWidth,strokeColor:style.lineColor,fillColor:style.color,points:style.points};break;case Graph.SERIE_BOX:return style;break;case Graph.SERIE_SCATTER:break;}});switch(serieType){case Graph.SERIE_LINE:serie.setMarkers(styles,style.styleName);break;case Graph.SERIE_SCATTER:serie.setStyle(styles,{},style.styleName);break;case Graph.SERIE_BOX:serie.setStyle(styles[0],style.stylename);break;}});}if(schemaSerie.errorX||schemaSerie.errorY){var errors=[];if(schemaSerie.errorX){for(var i=0,l=schemaSerie.errorX.length;i<l;i++){errors[i]=errors[i]||[[],[]];errors[i][0][0]=schemaSerie.errorX[i];}}if(schemaSerie.errorY){for(var i=0,l=schemaSerie.errorY.length;i<l;i++){errors[i]=errors[i]||[[]];errors[i][1][0]=schemaSerie.errorY[i];}}serie.setDataError(errors)// Adds the error data
.setErrorStyle([{type:'bar',x:{},y:{}}]);// Display bar errors
}if(schema.axis){serieAxis=schema.axis[schemaSerie.xAxis];if(!serieAxis||serieAxis.type!=='top'&&serieAxis.type!=='bottom'){util.warn("No x axis found. Setting automatically");serie.setXAxis(graph.getXAxis(0));}else{if(serieAxis.type=='top'){serie.setXAxis(graph.getTopAxis(serieAxis._jsGraphIndex));}else if(serieAxis.type=='bottom'){serie.setXAxis(graph.getBottomAxis(serieAxis._jsGraphIndex));}}serieAxis=schema.axis[schemaSerie.yAxis];if(!serieAxis||serieAxis.type!=='left'&&serieAxis.type!=='right'){util.warn("No y axis found. Setting automatically");serie.setYAxis(graph.getYAxis(0));}else{if(serieAxis.type=='left'){serie.setYAxis(graph.getLeftAxis(serieAxis._jsGraphIndex));}else if(serieAxis.type=='right'){serie.setYAxis(graph.getRightAxis(serieAxis._jsGraphIndex));}}}else{util.warn("No axes found. Setting automatically");serie.autoAxis();}switch(serieType){case Graph.SERIE_BOX:serie.setData(schemaSerie.boxes);break;default:case Graph.SERIE_SCATTER:case Graph.SERIE_LINE:serie.setData([{x:schemaSerie.x,y:schemaSerie.y}]);break;}});}graph.autoscaleAxes();graph.draw();return graph;}},{key:'registerConstructor',value:function registerConstructor(constructorName,constructor){if(_constructors.has(constructorName)){return util.throwError("Constructor "+constructor+" already exists.");}_constructors.set(constructorName,constructor);}/**
	   * Returns a registered constructor
	   * @param {String} constructorName - The constructor name to look for
	   * @returns {Function} The registered constructor
	   * @throws Error
	   * @see Graph.registerConstructor
	   * @static
	   */},{key:'getConstructor',value:function getConstructor(constructorName,softFail){if(!_constructors.has(constructorName)){if(softFail){return false;}return util.throwError("Constructor \""+constructorName+"\" doesn't exist");}return _constructors.get(constructorName);}},{key:'newWaveform',value:function newWaveform(){return new(Function.prototype.bind.apply(_waveform2.default,[null].concat(Array.prototype.slice.call(arguments))))();}},{key:'waveform',value:function waveform(){return new(Function.prototype.bind.apply(_waveform2.default,[null].concat(Array.prototype.slice.call(arguments))))();}}]);return Graph;}(_EventEmitter2.default);// Adds getConstructor to the prototype. Cannot do that in ES6 classes
Graph.prototype.getConstructor=Graph.getConstructor;function makeSerie(graph,name,options,type){var constructor=graph.getConstructor(type,true);if(!constructor&&typeof type=="string"){constructor=graph.getConstructor("graph.serie."+type,true);}if(constructor){var serie=new constructor();serie.init(graph,name,options);graph.appendSerieToDom(serie);}else{return util.throwError("No constructor exists for the serie type provided. Use Graph.registerConstructor( name, constructor ) first is you use your own series");}return serie;};function getAxisLevelFromSpan(span,level){for(var i=0,l=level.length;i<l;i++){var possible=true;for(var k=0,m=level[i].length;k<m;k++){if(!(span[0]<level[i][k][0]&&span[1]<level[i][k][0]||span[0]>level[i][k][1]&&span[1]>level[i][k][1])){possible=false;}}if(possible){level[i].push(span);return i;}}level.push([span]);return level.length-1;}function refreshDrawingZone(graph){var i,j,l,xy,min,max,axis;var shift={top:[],bottom:[],left:[],right:[]};var levels={top:[],bottom:[],left:[],right:[]};graph._painted=true;// Apply to top and bottom
graph._applyToAxes(function(axis,position){if(axis.disabled||axis.floating){return;}var level=getAxisLevelFromSpan(axis.getSpan(),levels[position]);axis.setLevel(level);shift[position][level]=Math.max(axis.getAxisPosition(),shift[position][level]||0);},false,true,false);var shiftTop=shift.top.reduce(function(prev,curr){return prev+curr;},0);var shiftBottom=shift.bottom.reduce(function(prev,curr){return prev+curr;},0);[shift.top,shift.bottom].map(function(arr){arr.reduce(function(prev,current,index){arr[index]=prev+current;return prev+current;},0);});// Apply to top and bottom
graph._applyToAxes(function(axis,position){if(axis.disabled||axis.floating){return;}axis.setShift(shift[position][axis.getLevel()]);},false,true,false);// Applied to left and right
graph._applyToAxes(function(axis,position){if(axis.disabled){return;}axis.setMinPx(shiftTop);axis.setMaxPx(graph.getDrawingHeight(true)-shiftBottom);if(axis.floating){return;}// First we need to draw it in order to determine the width to allocate
// graph is done to accomodate 0 and 100000 without overlapping any element in the DOM (label, ...)
// Let's not draw dependant axes yet
var drawn=!axis.linkedToAxis?axis.draw():0;// Get axis position gives the extra shift that is common
var level=getAxisLevelFromSpan(axis.getSpan(),levels[position]);axis.setLevel(level);shift[position][level]=Math.max(drawn,shift[position][level]||0);},false,false,true);var shift2=util.extend(true,{},shift);// Applied to left and right
graph._applyToAxes(function(axis,position){if(axis.disabled){return;}if(axis.floating){return;}shift2[position][axis.getLevel()]=Math.max(shift[position][axis.getLevel()],axis.equalizePosition(shift[position][axis.getLevel()]));},false,false,true);shift=shift2;var shiftLeft=shift.left.reduce(function(prev,curr){return prev+curr;},0);var shiftRight=shift.right.reduce(function(prev,curr){return prev+curr;},0);[shift.left,shift.right].map(function(arr){arr.reduce(function(prev,current,index){arr[index]=prev+current;return prev+current;},0);});// Apply to left and right
graph._applyToAxes(function(axis,position){if(axis.disabled||axis.floating){return;}axis.setShift(shift[position][axis.getLevel()]);},false,false,true);// Apply to top and bottom
graph._applyToAxes(function(axis,position){if(axis.disabled){return;}axis.setMinPx(shiftLeft);axis.setMaxPx(graph.getDrawingWidth(true)-shiftRight);if(axis.floating){return;}if(!axis.linkedToAxis){axis.draw();}},false,true,false);// Floating axes
graph._applyToAxes(function(axis){if(!axis.floating){return;}var floatingAxis=axis.getFloatingAxis();var floatingValue=axis.getFloatingValue();var floatingPx=floatingAxis.getPx(floatingValue);axis.setShift(floatingPx);if(!axis.linkedToAxis){axis.draw();}},false,true,true);_closeLine(graph,'right',graph.getDrawingWidth(true),graph.getDrawingWidth(true),shiftTop,graph.getDrawingHeight(true)-shiftBottom);_closeLine(graph,'left',0,0,shiftTop,graph.getDrawingHeight(true)-shiftBottom);_closeLine(graph,'top',shiftLeft,graph.getDrawingWidth(true)-shiftRight,0,0);_closeLine(graph,'bottom',shiftLeft,graph.getDrawingWidth(true)-shiftRight,graph.getDrawingHeight(true)-shiftBottom,graph.getDrawingHeight(true)-shiftBottom);graph.clipRect.setAttribute('y',shiftTop);graph.clipRect.setAttribute('x',shiftLeft);graph.clipRect.setAttribute('width',graph.getDrawingWidth()-shiftLeft-shiftRight);graph.clipRect.setAttribute('height',graph.getDrawingHeight()-shiftTop-shiftBottom);graph.rectEvent.setAttribute('y',shiftTop+graph.getPaddingTop());graph.rectEvent.setAttribute('x',shiftLeft+graph.getPaddingLeft());graph.drawingSpaceWidth=graph.getDrawingWidth()-shiftLeft-shiftRight;graph.drawingSpaceHeight=graph.getDrawingHeight()-shiftTop-shiftBottom;graph.rectEvent.setAttribute('width',graph.drawingSpaceWidth);graph.rectEvent.setAttribute('height',graph.drawingSpaceHeight);graph.drawingSpaceMinX=shiftLeft+graph.getPaddingLeft();// + "px";
graph.drawingSpaceMinY=shiftTop+graph.getPaddingTop();// + "px";
graph.drawingSpaceMaxX=graph.getDrawingWidth()-shiftRight+graph.getPaddingLeft();// + "px";
graph.drawingSpaceMaxY=graph.getDrawingHeight()-shiftBottom+graph.getPaddingTop();//  + "px";
/*
		graph.shapeZoneRect.setAttribute('x', shift[1]);
		graph.shapeZoneRect.setAttribute('y', shift[2]);
		graph.shapeZoneRect.setAttribute('width', graph.getDrawingWidth() - shift[2] - shift[3]);
		graph.shapeZoneRect.setAttribute('height', graph.getDrawingHeight() - shift[1] - shift[0]);
	*/graph.shift=shift;graph.redrawShapes();// Not sure this should be automatic here. The user should be clever.
}function _handleKey(graph,event,type){var self=graph;if(graph.forcedPlugin){graph.activePlugin=graph.forcedPlugin;graph._pluginExecute(graph.activePlugin,type,[graph,e]);return;}checkKeyActions(graph,event,[graph,event],type);}// Similar to checkMouseActions
function checkKeyActions(graph,e,parameters,methodName){var keyComb=graph.options.keyActions,i,l;for(i=0,l=keyComb.length;i<l;i++){if(keyComb[i].plugin){// Is it a plugin ?
if(graph.forcedPlugin==keyComb[i].plugin||graph.isActionAllowed(e,keyComb[i])){if(keyComb[i].options){parameters.push(keyComb[i].options);}graph.activePlugin=keyComb[i].plugin;// Lease the mouse action to the current action
graph._pluginExecute(keyComb[i].plugin,methodName,parameters);e.preventDefault();e.stopPropagation();return true;}}else if(keyComb[i].callback&&graph.isActionAllowed(e,keyComb[i])){if(keyComb[i].options){parameters.push(keyComb[i].options);}e.preventDefault();e.stopPropagation();keyComb[i].callback.apply(graph,parameters);return true;}if(keyComb[i].removeSelectedShape&&graph.isActionAllowed(e,keyComb[i])){e.preventDefault();e.stopPropagation();graph.selectedShapes.map(function(shape){shape.kill();});}/* else if ( keyComb[ i ].series ) {

	      var series;
	      if ( keyComb[ i ].series === 'all' ) {
	        series = graph.series;
	      }

	      if ( !Array.isArray( keyComb[ i ].series ) ) {
	        series = [  series ];
	      }

	      if ( keyComb[ i ].options ) {
	        parameters.push( keyComb[ i ].options );
	      }

	      for ( var j = 0; j < series.length; i++ ) {
	        graph._serieExecute( series[  i ], methodName, parameters );
	      }
	      return true;
	    }*/}return false;};function _registerEvents(graph){var self=graph;graph._dom.addEventListener('keydown',function(e){_handleKey(graph,e,'keydown');});graph._dom.addEventListener('keypress',function(e){_handleKey(graph,e,'keypress');});graph._dom.addEventListener('keyup',function(e){_handleKey(graph,e,'keyup');});// Not sure this has to be prevented
graph.groupEvent.addEventListener('mousemove',function(e){//e.preventDefault();
var coords=graph._getXY(e);_handleMouseMove(graph,coords.x,coords.y,e);});graph.dom.addEventListener('mouseleave',function(e){_handleMouseLeave(graph);});graph.groupEvent.addEventListener('mousedown',function(e){graph.focus();//   e.preventDefault();
if(e.which==3||e.ctrlKey){return;}var coords=graph._getXY(e);_handleMouseDown(graph,coords.x,coords.y,e);});graph.dom.addEventListener('mouseup',function(e){graph.emit("mouseUp",e);var coords=graph._getXY(e);_handleMouseUp(graph,coords.x,coords.y,e);});graph.dom.addEventListener('dblclick',function(e){graph.emit("dblClick",e);var coords=graph._getXY(e);_handleDblClick(graph,coords.x,coords.y,e);});graph.groupEvent.addEventListener('click',function(e){// Cancel right click or Command+Click
if(e.which==3||e.ctrlKey){return;}//   e.preventDefault();
var coords=graph._getXY(e);if(!graph.prevent(false)){_handleClick(graph,coords.x,coords.y,e);}//}, 200 );
});graph.groupEvent.addEventListener('mousewheel',function(e){var deltaY=e.wheelDeltaY||e.wheelDelta||-e.deltaY;_handleMouseWheel(graph,deltaY,e);return false;});graph.groupEvent.addEventListener('wheel',function(e){var deltaY=e.wheelDeltaY||e.wheelDelta||-e.deltaY;_handleMouseWheel(graph,deltaY,e);return false;});}function _handleMouseDown(graph,x,y,e){var self=graph;if(graph.forcedPlugin){graph.activePlugin=graph.forcedPlugin;graph._pluginExecute(graph.activePlugin,'onMouseDown',[graph,x,y,e]);return;}checkMouseActions(graph,e,[graph,x,y,e],'onMouseDown');}function _handleMouseMove(graph,x,y,e){if(graph.bypassHandleMouse){graph.bypassHandleMouse.handleMouseMove(e);return;}if(graph.activePlugin&&graph._pluginExecute(graph.activePlugin,'onMouseMove',[graph,x,y,e])){return;};//			return;
graph._applyToAxes('handleMouseMove',[x-graph.options.paddingLeft,e],true,false);graph._applyToAxes('handleMouseMove',[y-graph.options.paddingTop,e],false,true);if(!graph.activePlugin){var index;if(graph.options.trackingLine&&graph.options.trackingLine.snapToSerie){if(graph.options.trackingLine.mode=="common"){var snapToSerie=graph.options.trackingLine.snapToSerie;index=snapToSerie.handleMouseMove(false,true);if(!index){graph.trackingLine.hide();}else{graph.trackingLine.show();var closestIndex=index.xIndexClosest;graph.trackingLine.getPosition(0).x=snapToSerie.getData()[0][closestIndex*2];graph.trackingLine.getPosition(1).x=snapToSerie.getData()[0][closestIndex*2];graph.trackingLine.redraw();var x=snapToSerie.getXAxis().getPx(graph.trackingLine.getPosition(0).x)+graph.options.paddingLeft;}var series=graph.options.trackingLine.series;if(!series){series=graph.getSeries().map(function(serie){return{serie:serie,withinPx:20,withinVal:-1};});}graph._trackingLegend=_trackingLegendSerie(graph,series,x,y,graph._trackingLegend,graph.options.trackingLine.textMethod,graph.trackingLine.getPosition(1).x);}}}if(graph.options.onMouseMoveData){var results={};for(var i=0;i<graph.series.length;i++){results[graph.series[i].getName()]=graph.series[i].handleMouseMove(false,true);}graph.options.onMouseMoveData.call(graph,e,results);}checkMouseActions(graph,e,[graph,x,y,e],'onMouseMove');return;}function checkMouseActions(graph,e,parameters,methodName){var keyComb=graph.options.mouseActions,i,l;for(i=0,l=keyComb.length;i<l;i++){if(keyComb[i].plugin){// Is it a plugin ?
if(graph.forcedPlugin==keyComb[i].plugin||graph.isActionAllowed(e,keyComb[i])){if(keyComb[i].options){parameters.push(keyComb[i].options);}graph.activePlugin=keyComb[i].plugin;// Lease the mouse action to the current action
graph._pluginExecute(keyComb[i].plugin,methodName,parameters);return true;}}else if(keyComb[i].callback&&graph.isActionAllowed(e,keyComb[i])){if(keyComb[i].options){parameters.push(keyComb[i].options);}keyComb[i].callback.apply(graph,parameters);return true;}else if(keyComb[i].series){var series;if(keyComb[i].series==='all'){series=graph.series;}if(!Array.isArray(keyComb[i].series)){series=[series];}if(keyComb[i].options){parameters.push(keyComb[i].options);}for(var j=0;j<series.length;i++){graph._serieExecute(series[i],methodName,parameters);}return true;}}return false;};var _trackingLegendSerie=function _trackingLegendSerie(graph,serie,x,y,legend,textMethod,xValue){var justCreated=false;if(!Array.isArray(serie)){serie=[serie];}var output=[];if(!legend){justCreated=true;legend=_makeTrackingLegend(graph);}serie.map(function(serie){var index=serie.serie.handleMouseMove(xValue,false);if(!index||!textMethod){if(serie.serie.trackingShape){serie.serie.trackingShape.hide();}return legend;}// Should we display the dot ?
if(serie.withinPx>0&&Math.abs(x-graph.options.paddingLeft-serie.serie.getXAxis().getPx(serie.serie.getData()[0][index.xIndexClosest*2]))-serie.withinPx>1e-14||serie.withinVal>0&&Math.abs(serie.serie.getXAxis().getVal(x-graph.options.paddingLeft)-serie.serie.getData()[0][index.xIndexClosest*2])-serie.withinVal>serie.serie.getXAxis().getVal(x-graph.options.paddingLeft)/100000){if(serie.serie.trackingShape){serie.serie.trackingShape.hide();}}else{output[serie.serie.getName()]={xIndex:index.xIndexClosest,yValue:serie.serie.getData()[0][index.xIndexClosest*2+1],xValue:serie.serie.getData()[0][index.xIndexClosest*2],serie:serie,index:index};if(!serie.serie.trackingShape){serie.serie.trackingShape=graph.newShape("ellipse",{fillColor:serie.serie.getLineColor(),strokeColor:"White",strokeWidth:serie.serie.getLineWidth()}).setSerie(serie.serie).setProp('rx',serie.serie.getLineWidth()*3).setProp('ry',serie.serie.getLineWidth()*3).forceParentDom(serie.serie.groupMain).draw();}serie.serie.trackingShape.show();serie.serie.trackingShape.getPosition(0).x=serie.serie.getData()[0][index.xIndexClosest*2];serie.serie.trackingShape.redraw();}});// End map
if(Object.keys(output).length==0||!textMethod){legend.style.display="none";}else{if(legend.style.display=="none"||justCreated){forceTrackingLegendMode(graph,legend,x,y,true);}else{_trackingLegendMove(graph,legend,x,y);}legend.style.display="block";var txt=textMethod(output,xValue,x,y);legend.innerHTML=txt;//legend.innerHTML = textMethod( output, xValue, x, y );
}return legend;};var forceTrackingLegendMode=function forceTrackingLegendMode(graph,legend,toX,toY,skip){var ratio=0,start=Date.now(),h=legend.offsetHeight,startX=parseInt(legend.style.marginLeft.replace("px","")||0),startY=parseInt(legend.style.marginTop.replace("px","")||0);toX=toX>graph.getWidth()/2?toX-toX%10-20-legend.offsetWidth:toX-toX%10+30;toY=toY-toY%10+h/2;if(skip){legend.style.marginLeft=toX+"px";legend.style.marginTop=toY+"px";return;}function next(){var progress=(Date.now()-start)/200;if(progress>1){progress=1;}legend.style.marginLeft=(toX-startX)*progress+startX+"px";legend.style.marginTop=(toY-startY)*progress+startY+"px";if(progress<1){window.requestAnimationFrame(next);}}window.requestAnimationFrame(next);};var _trackingLegendMove=util.debounce(forceTrackingLegendMode,50);function _makeTrackingLegend(graph){var group=document.createElement('div');group.setAttribute('class','trackingLegend');group.style.position='absolute';group.style.borderRadius='4px';group.style.boxShadow="1px 1px 3px 0px rgba(100,100,100,0.6)";group.style.border="2px solid #333333";group.style.backgroundColor="rgba(255, 255, 255, 0.5 )";group.style.pointerEvents="none";group.style.paddingTop="5px";group.style.paddingBottom="5px";group.style.paddingLeft="10px";group.style.paddingRight="10px";graph.getWrapper().insertBefore(group,graph.getDom());return group;}function _handleDblClick(graph,x,y,e){//	var _x = x - graph.options.paddingLeft;
//	var _y = y - graph.options.paddingTop;
var pref=graph.options.dblclick;checkMouseActions(graph,e,[x,y,e],'onDblClick');/*
	      if ( !pref ||  !pref.type ) {
	        return;
	      }

	      switch ( pref.type ) {

	        case 'plugin':

	          var plugin;

	          if ( ( plugin = graph.plugins[ pref.plugin ] ) ) {

	            plugin.onDblClick( graph, x, y, pref.options, e );
	          }

	          break;
	      }*/}function _handleMouseUp(graph,x,y,e){if(graph.bypassHandleMouse){graph.bypassHandleMouse.handleMouseUp(e);graph.activePlugin=false;return;}graph._pluginExecute(graph.activePlugin,'onMouseUp',[graph,x,y,e]);graph.activePlugin=false;}function _handleClick(graph,x,y,e){graph.emit('click',[graph,x,y,e]);// Not on a shape
if(!e.target.jsGraphIsShape&&!graph.prevent(false)&&graph.options.shapesUnselectOnClick){graph.unselectShapes();}}function _getAxis(graph,num,options,pos){var options=options||{};var inst;var _availableAxes={def:{x:graph.getConstructor("graph.axis.x"),y:graph.getConstructor("graph.axis.y")},time:{x:graph.getConstructor("graph.axis.x.time")},bar:{x:graph.getConstructor("graph.axis.x.bar")}};switch(options.type){case'time':var axisInstance=_availableAxes.time;break;case'bar':var axisInstance=_availableAxes.bar;break;case'broken':var axisInstance=_availableAxes.broken;break;default:var axisInstance=_availableAxes.def;break;}switch(pos){case'top':case'bottom':inst=axisInstance.x;break;case'left':case'right':inst=axisInstance.y;break;}num=num||0;if((typeof num==='undefined'?'undefined':_typeof(num))=="object"){options=num;num=0;}if(!graph.axis[pos][num]){graph.axis[pos][num]=new inst(graph,pos,options);graph.axis[pos][num].init(graph,options);}return graph.axis[pos][num];}function _closeLine(graph,mode,x1,x2,y1,y2){if(graph.options.close===false){return;}var l=0;graph.axis[mode].map(function(g){if(g.isDisplayed()&&!g.floating){l++;}});if((graph.options.close===true||graph.options.close[mode])&&l==0){graph.closingLines[mode].setAttribute('display','block');graph.closingLines[mode].setAttribute('x1',x1);graph.closingLines[mode].setAttribute('x2',x2);graph.closingLines[mode].setAttribute('y1',y1);graph.closingLines[mode].setAttribute('y2',y2);}else{graph.closingLines[mode].setAttribute('display','none');}}function _handleMouseWheel(graph,delta,e){if(checkMouseActions(graph,e,[delta,e],'onMouseWheel')){e.preventDefault();e.stopPropagation();}}function _handleMouseLeave(graph){if(graph.options.handleMouseLeave){graph.options.handleMouseLeave.call(graph);}}function haveAxesChanged(graph){var temp=graph._axesHaveChanged;graph._axesHaveChanged=false;return temp;}function hasSizeChanged(graph){var temp=graph._sizeChanged;graph._sizeChanged=false;return temp;}// Constants
Graph.SERIE_LINE=Symbol();Graph.SERIE_SCATTER=Symbol();Graph.SERIE_CONTOUR=Symbol();Graph.SERIE_BAR=Symbol();Graph.SERIE_BOX=Symbol();Graph.SERIE_ZONE=Symbol();Graph.SERIE_LINE_COLORED=Symbol();Graph.SERIE_ZONE=Symbol();Graph.SERIE_DENSITYMAP=Symbol();Graph.SERIE_LINE_3D=Symbol();Graph.SERIE_ZONE_3D=Symbol();Graph.TICKS_OUTSIDE=Symbol();Graph.TICKS_INSIDE=Symbol();Graph.TICKS_CENTERED=Symbol();exports.default=Graph;});/***/},/* 2 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports);}else{var mod={exports:{}};factory(mod.exports);global.graphPosition=mod.exports;}})(this,function(exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});function _parsePx(px){if(px&&px.indexOf&&px.indexOf('px')>-1){return parseInt(px.replace('px',''));}return false;};function isNumeric(n){return!isNaN(parseFloat(n))&&isFinite(n);}/**
	   * Utility class to compute positioning
	   * @class
	   */var Position=function(){function Position(x,y,dx,dy){_classCallCheck(this,Position);if((typeof x==='undefined'?'undefined':_typeof(x))=="object"){this.x=x.x;this.y=x.y;this.dx=x.dx;this.dy=x.dy;}else{this.x=x;this.y=y;this.dx=dx;this.dy=dy;}}/**
	     *  Computes the position of the position
	     *  @param {Graph} graph - The graph for which the position has to be computed
	     *  @param {AxisX} xAxis - The x axis to consider (has to belong to the graph)
	     *  @param {AxisY} yAxis - The y axis to consider (has to belong to the graph)
	     *  @param {Serie} [serie] - For non-existing y value, use a serie to compute it automatically from the serie data
	     *  @return {Object} An object in the format ```{x: xPx, y: yPx}``` containing the position in pixels of the position
	     */_createClass(Position,[{key:'compute',value:function compute(graph,xAxis,yAxis,serie){if(!graph||!xAxis||!yAxis||!graph.hasXAxis||!graph.hasYAxis){graph.throw();}if(!graph.hasXAxis(xAxis)){throw"Graph does not contain the x axis that was used as a parameter";}if(!graph.hasYAxis(yAxis)){throw"Graph does not contain the x axis that was used as a parameter";}return this._compute(graph,xAxis,yAxis,serie);}},{key:'_compute',value:function _compute(graph,xAxis,yAxis,serie){var relativeTo=this._relativeTo;if(relativeTo){var relativeToComputed=relativeTo._compute(graph,xAxis,yAxis,serie);}var parsed,pos={x:false,y:false};if(!xAxis){xAxis=graph.getXAxis();}if(!yAxis){yAxis=graph.getYAxis();}for(var i in pos){var axis=i=='x'?xAxis:yAxis;var val=this[i];var dval=this["d"+i];if(val===undefined&&(dval!==undefined&&relativeTo===undefined||relativeTo===undefined)){if(i=='x'){if(dval===undefined){continue;}pos[i]=relativeTo?relativeTo[i]:axis.getPos(0);}else if(this.x!==undefined&&serie){if(_parsePx(this.x)!==false){console.warn("You have defined x in px and not y. Makes no sense. Returning 0 for y");pos[i]=0;}else{var closest=serie.searchClosestValue(this.x);if(!closest){console.warn("Could not find y position for x = "+this.x+" on serie \""+serie.getName()+"\". Returning 0 for y.");pos[i]=0;}else{pos[i]=serie.getY(closest.yMin);}}}}else if(val!==undefined){pos[i]=this.getPx(val,axis);}if(dval!==undefined){var def=val!==undefined||relativeToComputed==undefined||relativeToComputed[i]==undefined?pos[i]:relativeToComputed[i];if(i=='y'&&relativeToComputed&&relativeToComputed.x!==undefined&&relativeToComputed.y==undefined){if(!serie){throw"Error. No serie exists. Cannot find y value";return;}var closest=serie.searchClosestValue(relativeTo.x);if(closest){def=serie.getY(closest.yMin);}//console.log( relativeTo.x, closest, serie.getY( closest.yMin ), def );
}if((parsed=_parsePx(dval))!==false){// dx in px => val + 10px
pos[i]=def+parsed;// return integer (will be interpreted as px)
}else if((parsed=this._parsePercent(dval))!==false){pos[i]=def+this._getPositionPx(parsed,true,axis,graph);// returns xx%
}else if(axis){pos[i]=def+axis.getRelPx(dval);// px + unittopx
}}}return pos;}},{key:'_getPositionPx',value:function _getPositionPx(value,x,axis,graph){var parsed;if((parsed=_parsePx(value))!==false){return parsed;// return integer (will be interpreted as px)
}if((parsed=this._parsePercent(value))!==false){return parsed/100*(x?graph.getDrawingWidth():graph.getDrawingHeight());}else if(axis){return axis.getPos(value);}}},{key:'_parsePercent',value:function _parsePercent(percent){if(percent&&percent.indexOf&&percent.indexOf('%')>-1){return percent;}return false;}/**
	     *  Computes the value in pixels of an amplitude (or a distance) for a certain axis
	     *  @param {Number} value - The value in axis unit
	     *  @param {Axis} Axis - The x axis to consider (has to belong to the graph)
	     *  @return {String} The value in pixels, e.g. "20px"
	     */},{key:'getDeltaPx',value:function getDeltaPx(value,axis){var v;if((v=_parsePx(value))!==false){return v+"px";}else{return axis.getRelPx(value)+"px";}}},{key:'deltaPosition',value:function deltaPosition(mode,delta,axis){mode=mode=='y'?'y':'x';var ref=this[mode],refd=this['d'+mode],refPx,deltaPx;if(ref!==undefined){if((refPx=_parsePx(ref))!==false){if((deltaPx=_parsePx(delta))!==false){this[mode]=refPx+deltaPx+"px";}else{this[mode]=refPx+axis.getRelPx(delta)+"px";}}else{ref=this.getValPosition(ref,axis);if((deltaPx=_parsePx(delta))!==false){this[mode]=ref+axis.getRelVal(deltaPx);}else{this[mode]=ref+delta;}}}else if(refd!==undefined){if(mode=='y'&&ref===undefined&&!this._relativeTo){// This means that the shape is placed by the x value. Therefore, the dy is only a stand-off.
// Therefore, we do nothing
return;}if((refPx=_parsePx(refd))!==false){if((deltaPx=_parsePx(delta))!==false){this['d'+mode]=refPx+deltaPx+"px";}else{this['d'+mode]=refPx+axis.getRelPx(delta)+"px";}}else{refd=this.getValPosition(refd,axis);if((deltaPx=_parsePx(delta))!==false){this['d'+mode]=refd+axis.getRelVal(deltaPx);}else{this['d'+mode]=refd+delta;}}}}},{key:'getValPosition',value:function getValPosition(rel,axis){if(rel=='max'){return axis.getMaxValue();}if(rel=='min'){return axis.getMinValue();}return rel;}/**
	     *  Computes a value in pixels
	     *  @param {Number} value - The value in axis unit
	     *  @param {Axis} axis - The x or y axis to consider (has to belong to the graph)
	     *  @param {Boolean} rel - Whether or not the value is a distance
	     *  @return {(Number|String)} The computed value
	     */},{key:'getPx',value:function getPx(value,axis,rel){var parsed;if(typeof value=="function"){return value(axis,rel);}else if((parsed=_parsePx(value))!==false){return parsed;// return integer (will be interpreted as px)
}else if((parsed=this._parsePercent(value))!==false){return parsed;// returns xx%
}else if(axis){if(value=="min"){return axis.getMinPx();}else if(value=="max"){return axis.getMaxPx();}else if(rel){return axis.getRelPx(value);}else if(isNumeric(value)){return axis.getPos(value);}}}},{key:'getPxRel',value:function getPxRel(value,axis){return this.getPx(value,axis,true);}/**
	     *  Assigns the current position as relative to another. This is used when a position is used with "dx" or "dy" and not "x" or "y"
	     *  @param {Position} pos - The reference position
	     *  @return {Position} The current position
	     */},{key:'relativeTo',value:function relativeTo(pos){this._relativeTo=Position.check(pos);return this;}/**
	     *  Checks if an object is a position. If not, creates a new Position instance with the ```pos``` object. If a new position is created, ```callback``` is fired with the position as a unique parameter. The return of the function, if not false, should be a ```Position``` instance which serves as the reference position.
	     *  @example Position.check( { x: 1, y: 2 }, function() { return someOtherPosition; } );
	     *  @param {(Object|Position)} pos - The position object or the object fed into the constructor
	     *  @param {Function} callback - The callback fired if a new position is created
	     *  @return {Position} The resulting position object
	     */}],[{key:'check',value:function check(pos,callback){if(pos instanceof Position){return pos;}var posObject=new Position(pos);if(pos&&pos.relativeTo){var position=callback(pos.relativeTo);if(position){posObject.relativeTo(position);}}return posObject;}}]);return Position;}();exports.default=Position;});/***/},/* 3 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports);}else{var mod={exports:{}};factory(mod.exports);global.graphUtil=mod.exports;}})(this,function(exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.setAttributeTo=setAttributeTo;exports.mapEventEmission=mapEventEmission;exports.guid=guid;exports.throwError=throwError;exports.warn=warn;exports.isNumeric=isNumeric;exports.hue2rgb=hue2rgb;exports.hslToRgb=hslToRgb;exports.saveDomAttributes=saveDomAttributes;exports.hasSavedAttribute=hasSavedAttribute;exports.overwriteDomAttribute=overwriteDomAttribute;exports.restoreDomAttributes=restoreDomAttributes;exports.debounce=debounce;exports.SVGParser=SVGParser;exports.reverseArray=reverseArray;exports.getOffset=getOffset;exports.setCSS=setCSS;exports.ajaxGet=ajaxGet;exports.extend=extend;exports.mix=mix;exports.emptyDom=emptyDom;/**
	   * Easy set attribute method to apply to a SVG Element the attributes listed. Optional namespacing
	   * @param {SVGElement} to - The SVG element to apply the attributes to
	   * @param {Object<String,Any>} attr - A key/value hashmap of attributes
	   * @param {String} [ ns = undefined ] - The namespace to use (with <code>setAttributeNS</code>). Default if without namespacing
	   */function setAttributeTo(to,params,ns){var i;if(ns){for(i in params){to.setAttributeNS(ns,i,params[i]);}}else{for(i in params){to.setAttribute(i,params[i]);}}};/**
	   * Maps old-style events defined within the creation (i.e. <code>{ onMouseOver: function() }</code>) to modern event listening <code>.on("mouseover")</code>
	   * The function will read any object and select the ones starting with "on"
	   * @params {Object} options - An option object to read the events from
	   * @param {Object} source - The source object to which the options belong
	   * @example util.mapEventEmission( this.options, this );
	   */function mapEventEmission(options,source){if(!source){source=this;}var eventName;for(var i in options){// Starts with onXXX
if(i.indexOf("on")==0&&typeof options[i]=="function"){eventName=i.substring(2);eventName=eventName.substring(0,1).toLowerCase()+eventName.substring(1);if(source.on){(function(j){source.on(eventName,function(){options[j].apply(source,arguments);});})(i);}}}};/**
	   * @link http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
	   * @return {String} a random id
	   */function guid(){//
return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});};function throwError(message){console.error(message);};function warn(message){console.warn(message);};/**
	   * Checks if a variable is a numeric or not
	   * @return {Boolean} <code>true</code> for a numeric value, false otherwise
	   */function isNumeric(obj){return!Array.isArray(obj)&&obj-parseFloat(obj)+1>=0;};/**
	   * @see http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
	   * Converts an HSL color value to RGB. Conversion formula
	   * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	   * Assumes h, s, and l are contained in the set [0, 1] and
	   * returns r, g, and b in the set [0, 255].
	   *
	   * @param   Number  h       The hue
	   * @param   Number  s       The saturation
	   * @param   Number  l       The lightness
	   * @return  Array           The RGB representation
	   */function hue2rgb(p,q,t){if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p;};function hslToRgb(h,s,l){var r,g,b;if(s==0){r=g=b=l;// achromatic
}else{var q=l<0.5?l*(1+s):l+s-l*s;var p=2*l-q;r=hue2rgb(p,q,h+1/3);g=hue2rgb(p,q,h);b=hue2rgb(p,q,h-1/3);}return[Math.round(r*255),Math.round(g*255),Math.round(b*255)];};function saveDomAttributes(to,attributes,identification){if(!to)return;to._savedAttributesIds=to._savedAttributesIds||[];if(to._savedAttributesIds.indexOf(identification)>-1){restoreDomAttributes(to,identification);}to._savedAttributes=to._savedAttributes||{};to._attributes=to._attributes||{};to._attributes[identification]=attributes;to._savedAttributesIds.push(identification);for(var i in attributes){if(!to._savedAttributes[i]){to._savedAttributes[i]=to.getAttribute(i);}to.setAttribute(i,attributes[i]);}};function hasSavedAttribute(dom,attr){return dom._savedAttributes&&dom._savedAttributes[attr]!==undefined;}function overwriteDomAttribute(dom,attribute,newValue){if(hasSavedAttribute(dom,attribute)){dom._savedAttributes[attribute]=newValue;}}function restoreDomAttributes(to,identification){if(!to||!to._savedAttributesIds){return;}to._savedAttributesIds.splice(to._savedAttributesIds.indexOf(identification),1);delete to._attributes[identification];var attrs={};for(var i in to._savedAttributes){attrs[i]=to._savedAttributes[i];};for(var i=0,l=to._savedAttributesIds.length;i<l;i++){for(var j in to._attributes[to._savedAttributesIds[i]]){attrs[j]=to._attributes[to._savedAttributesIds[i]][j];}}for(var j in attrs){to.setAttribute(j,attrs[j]);}};// https://davidwalsh.name/function-debounce
function debounce(func,wait,immediate){var timeout;return function(){var context=this,args=arguments;var later=function later(){timeout=null;if(!immediate)func.apply(context,args);};var callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow)func.apply(context,args);};};function SVGParser(svgString){var parser=new DOMParser();var doc=parser.parseFromString(svgString,"image/svg+xml");// returns a SVGDocument, which also is a Document.
return doc;};// http://stackoverflow.com/questions/5276953/what-is-the-most-efficient-way-to-reverse-an-array-in-javascript
function reverseArray(array){var left=null;var right=null;var length=array.length;for(left=0,right=length-1;left<right;left+=1,right-=1){var temporary=array[left];array[left]=array[right];array[right]=temporary;}return array;};// jQuery.fn.offset
function getOffset(el){var rect=el.getBoundingClientRect();return{top:rect.top+document.body.scrollTop,left:rect.left+document.body.scrollLeft};};// jQuery.fn.css
function setCSS(element,values){var style=element.style;for(var i in values){style[i]=values[i];}};function ajaxGet(options){return new Promise(function(resolve,reject){var request=new XMLHttpRequest();request.open(options.type||'GET',options.url,true);if(options.json)request.setRequestHeader('Accept','application/json');request.onload=function(){if(request.status===200){var response=request.responseText;if(options.json)response=JSON.parse(response);resolve(response);}else{reject(new Error('Request error: '+request.status));}};request.onerror=function(){reject(new Error('Network error: '+request.status));};request.send();});};// https://raw.githubusercontent.com/justmoon/node-extend/888f153645115d1c6aa9a7e346e8e9cd9a83de9b/index.js
// Copyright (c) 2014 Stefan Thomas
var hasOwn=Object.prototype.hasOwnProperty;var toStr=Object.prototype.toString;var isArray=function isArray(arr){if(typeof Array.isArray==='function'){return Array.isArray(arr);}return toStr.call(arr)==='[object Array]';};var isPlainObject=function isPlainObject(obj){if(!obj||toStr.call(obj)!=='[object Object]'){return false;}var hasOwnConstructor=hasOwn.call(obj,'constructor');var hasIsPrototypeOf=obj.constructor&&obj.constructor.prototype&&hasOwn.call(obj.constructor.prototype,'isPrototypeOf');// Not own constructor property must be Object
if(obj.constructor&&!hasOwnConstructor&&!hasIsPrototypeOf){return false;}// Own properties are enumerated firstly, so to speed up,
// if last one is own, then all properties are own.
var key;for(key in obj){/**/}return typeof key==='undefined'||hasOwn.call(obj,key);};function extend(){var options,name,src,copy,copyIsArray,clone;var target=arguments[0];var i=1;var length=arguments.length;var deep=false;// Handle a deep copy situation
if(typeof target==='boolean'){deep=target;target=arguments[1]||{};// skip the boolean and the target
i=2;}else if((typeof target==='undefined'?'undefined':_typeof(target))!=='object'&&typeof target!=='function'||target==null){target={};}for(;i<length;++i){options=arguments[i];// Only deal with non-null/undefined values
if(options!=null){// Extend the base object
for(name in options){src=target[name];copy=options[name];// Prevent never-ending loop
if(target!==copy){// Recurse if we're merging plain objects or arrays
if(deep&&copy&&(isPlainObject(copy)||(copyIsArray=isArray(copy)))){if(copyIsArray){copyIsArray=false;clone=src&&isArray(src)?src:[];}else{clone=src&&isPlainObject(src)?src:{};}// Never move original objects, clone them
target[name]=extend(deep,clone,copy);// Don't bring in undefined values
}else if(typeof copy!=='undefined'){target[name]=copy;}}}}}// Return the modified object
return target;};exports.isArray=isArray;exports.isPlainObject=isPlainObject;function mix(baseClass,mixin){for(var prop in mixin){if(mixin.hasOwnProperty(prop)){baseClass.prototype[prop]=mixin[prop];}}}function emptyDom(dom){while(dom.firstChild){dom.removeChild(dom.firstChild);}}});/***/},/* 4 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory();}else{var mod={exports:{}};factory();global.EventEmitter=mod.exports;}})(this,function(){'use strict';/*!
	   * EventEmitter v4.2.9 - git.io/ee
	   * Oliver Caldwell
	   * MIT license
	   * @preserve
	   */!(__WEBPACK_AMD_DEFINE_ARRAY__=[],__WEBPACK_AMD_DEFINE_RESULT__=function(){'use strict';/**
	     * Class for managing events.
	     * Can be extended to provide event functionality in other classes.
	     *
	     * @class EventEmitter Manages event registering and emitting.
	     */function EventEmitter(){}// Shortcuts to improve speed and size
var proto=EventEmitter.prototype;/**
	     * Finds the index of the listener for the event in its storage array.
	     *
	     * @param {Function[]} listeners Array of listeners to search through.
	     * @param {Function} listener Method to look for.
	     * @return {Number} Index of the specified listener, -1 if not found
	     * @api private
	     */function indexOfListener(listeners,listener){var i=listeners.length;while(i--){if(listeners[i].listener===listener){return i;}}return-1;}/**
	     * Alias a method while keeping the context correct, to allow for overwriting of target method.
	     *
	     * @param {String} name The name of the target method.
	     * @return {Function} The aliased method
	     * @api private
	     */function alias(name){return function aliasClosure(){return this[name].apply(this,arguments);};}/**
	     * Returns the listener array for the specified event.
	     * Will initialise the event object and listener arrays if required.
	     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	     * Each property in the object response is an array of listener functions.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Function[]|Object} All listener functions for the event.
	     */proto.getListeners=function getListeners(evt){var events=this._getEvents();var response;var key;// Return a concatenated array of all matching events if
// the selector is a regular expression.
if(evt instanceof RegExp){response={};for(key in events){if(events.hasOwnProperty(key)&&evt.test(key)){response[key]=events[key];}}}else{response=events[evt]||(events[evt]=[]);}return response;};/**
	     * Takes a list of listener objects and flattens it into a list of listener functions.
	     *
	     * @param {Object[]} listeners Raw listener objects.
	     * @return {Function[]} Just the listener functions.
	     */proto.flattenListeners=function flattenListeners(listeners){var flatListeners=[];var i;for(i=0;i<listeners.length;i+=1){flatListeners.push(listeners[i].listener);}return flatListeners;};/**
	     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @return {Object} All listener functions for an event in an object.
	     */proto.getListenersAsObject=function getListenersAsObject(evt){var listeners=this.getListeners(evt);var response;if(listeners instanceof Array){response={};response[evt]=listeners;}return response||listeners;};/**
	     * Adds a listener function to the specified event.
	     * The listener will not be added if it is a duplicate.
	     * If the listener returns true then it will be removed after it is called.
	     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */proto.addListener=function addListener(evt,listener){var listeners=this.getListenersAsObject(evt);var listenerIsWrapped=(typeof listener==='undefined'?'undefined':_typeof(listener))==='object';var key;for(key in listeners){if(listeners.hasOwnProperty(key)&&indexOfListener(listeners[key],listener)===-1){listeners[key].push(listenerIsWrapped?listener:{listener:listener,once:false});}}return this;};/**
	     * Alias of addListener
	     */proto.on=alias('addListener');/**
	     * Semi-alias of addListener. It will add a listener that will be
	     * automatically removed after its first execution.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */proto.addOnceListener=function addOnceListener(evt,listener){return this.addListener(evt,{listener:listener,once:true});};/**
	     * Alias of addOnceListener.
	     */proto.once=alias('addOnceListener');/**
	     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	     * You need to tell it what event names should be matched by a regex.
	     *
	     * @param {String} evt Name of the event to create.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */proto.defineEvent=function defineEvent(evt){this.getListeners(evt);return this;};/**
	     * Uses defineEvent to define multiple events.
	     *
	     * @param {String[]} evts An array of event names to define.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */proto.defineEvents=function defineEvents(evts){for(var i=0;i<evts.length;i+=1){this.defineEvent(evts[i]);}return this;};/**
	     * Removes a listener function from the specified event.
	     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to remove the listener from.
	     * @param {Function} listener Method to remove from the event.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */proto.removeListener=function removeListener(evt,listener){var listeners=this.getListenersAsObject(evt);var index;var key;for(key in listeners){if(listeners.hasOwnProperty(key)){index=indexOfListener(listeners[key],listener);if(index!==-1){listeners[key].splice(index,1);}}}return this;};/**
	     * Alias of removeListener
	     */proto.off=alias('removeListener');/**
	     * Adds listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	     * You can also pass it a regular expression to add the array of listeners to all events that match it.
	     * Yeah, this function does quite a bit. That's probably a bad thing.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */proto.addListeners=function addListeners(evt,listeners){// Pass through to manipulateListeners
return this.manipulateListeners(false,evt,listeners);};/**
	     * Removes listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be removed.
	     * You can also pass it a regular expression to remove the listeners from all events that match it.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */proto.removeListeners=function removeListeners(evt,listeners){// Pass through to manipulateListeners
return this.manipulateListeners(true,evt,listeners);};/**
	     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	     * The first argument will determine if the listeners are removed (true) or added (false).
	     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be added/removed.
	     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	     *
	     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */proto.manipulateListeners=function manipulateListeners(remove,evt,listeners){var i;var value;var single=remove?this.removeListener:this.addListener;var multiple=remove?this.removeListeners:this.addListeners;// If evt is an object then pass each of its properties to this method
if((typeof evt==='undefined'?'undefined':_typeof(evt))==='object'&&!(evt instanceof RegExp)){for(i in evt){if(evt.hasOwnProperty(i)&&(value=evt[i])){// Pass the single listener straight through to the singular method
if(typeof value==='function'){single.call(this,i,value);}else{// Otherwise pass back to the multiple function
multiple.call(this,i,value);}}}}else{// So evt must be a string
// And listeners must be an array of listeners
// Loop over it and pass each one to the multiple method
i=listeners.length;while(i--){single.call(this,evt,listeners[i]);}}return this;};/**
	     * Removes all listeners from a specified event.
	     * If you do not specify an event then all listeners will be removed.
	     * That means every event will be emptied.
	     * You can also pass a regex to remove all events that match it.
	     *
	     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */proto.removeEvent=function removeEvent(evt){var type=typeof evt==='undefined'?'undefined':_typeof(evt);var events=this._getEvents();var key;// Remove different things depending on the state of evt
if(type==='string'){// Remove all listeners for the specified event
delete events[evt];}else if(evt instanceof RegExp){// Remove all events matching the regex.
for(key in events){if(events.hasOwnProperty(key)&&evt.test(key)){delete events[key];}}}else{// Remove all listeners in all events
delete this._events;}return this;};/**
	     * Alias of removeEvent.
	     *
	     * Added to mirror the node API.
	     */proto.removeAllListeners=alias('removeEvent');/**
	     * Emits an event of your choice.
	     * When emitted, every listener attached to that event will be executed.
	     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	     * So they will not arrive within the array on the other side, they will be separate.
	     * You can also pass a regular expression to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {Array} [args] Optional array of arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */proto.emitEvent=function emitEvent(evt,args){var listeners=this.getListenersAsObject(evt);var listener;var i;var key;var response;for(key in listeners){if(listeners.hasOwnProperty(key)){i=listeners[key].length;while(i--){// If the listener returns true then it shall be removed from the event
// The function is executed either with a basic call or an apply if there is an args array
listener=listeners[key][i];if(listener.once===true){this.removeListener(evt,listener.listener);}response=listener.listener.apply(this,args||[]);if(response===this._getOnceReturnValue()){this.removeListener(evt,listener.listener);}}}}return this;};/**
	     * Alias of emitEvent
	     */proto.trigger=alias('emitEvent');/**
	     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {...*} Optional additional arguments to be passed to each listener.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */proto.emit=function emit(evt){var args=Array.prototype.slice.call(arguments,1);return this.emitEvent(evt,args);};/**
	     * Sets the current value to check against when executing listeners. If a
	     * listeners return value matches the one set here then it will be removed
	     * after execution. This value defaults to true.
	     *
	     * @param {*} value The new value to check for when executing listeners.
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */proto.setOnceReturnValue=function setOnceReturnValue(value){this._onceReturnValue=value;return this;};/**
	     * Fetches the current value to check against when executing listeners. If
	     * the listeners return value matches this one then it should be removed
	     * automatically. It will return true by default.
	     *
	     * @return {*|Boolean} The current value to check for or the default, true.
	     * @api private
	     */proto._getOnceReturnValue=function _getOnceReturnValue(){if(this.hasOwnProperty('_onceReturnValue')){return this._onceReturnValue;}else{return true;}};/**
	     * Fetches the events object and creates one if required.
	     *
	     * @return {Object} The events storage object.
	     * @api private
	     */proto._getEvents=function _getEvents(){return this._events||(this._events={});};return EventEmitter;}.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__),__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));});/***/},/* 5 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(6),__webpack_require__(3),__webpack_require__(7)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./fit_lm'),require('../graph.util'),require('./data_aggregator'));}else{var mod={exports:{}};factory(mod.exports,global.fit_lm,global.graph,global.data_aggregator);global.waveform=mod.exports;}})(this,function(exports,_fit_lm,_graph,_data_aggregator){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _fit_lm2=_interopRequireDefault(_fit_lm);var _data_aggregator2=_interopRequireDefault(_data_aggregator);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var Waveform=function(){function Waveform(){var data=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[];var xOffset=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var xScale=arguments.length>2&&arguments[2]!==undefined?arguments[2]:1;_classCallCheck(this,Waveform);this.xOffset=xOffset;this.xScale=xScale;this.setData(data);}/** [ [ x1, y1 ], [ x2, y2 ] ] *//*
	    setDataXY( data ) {
	       let newData = [ this._makeArray( data.length ), this._makeArray( data.length ) ],
	        warnNaN = false;
	      const nanable = this.isNaNAllowed();
	       data.map( ( el, index ) => {
	         if ( !nanable && ( el[ 0 ] !== el[ 0 ] || el[ 1 ] !== el[ 1 ] ) ) {
	          warnNaN = true;
	        }
	         newData[ 0 ][ index ] = el[ 0 ];
	        newData[ 1 ][ index ] = el[ 1 ];
	      } );
	       if ( warnNaN ) {
	        this.warn( "Trying to assign NaN values to a typed array that does not support NaNs. 0's will be used instead" );
	      }
	       this._setData( ...newData );
	      return this;
	    }
	    */_createClass(Waveform,[{key:'setData',value:function setData(data){var dataX=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;/* First, we must treat the case of the array of array for backward compatibility */if(Array.isArray(data[0])){var x=[];var y=[];data.forEach(function(el){x.push(el[0]);y.push(el[1]);});this.setXWaveform(x);data=y;}var newData=this._makeArray(data.length),warnNaN=false;var nanable=this.isNaNAllowed();data.map(function(el,index){if(!nanable&&(el[0]!==el[0]||el[1]!==el[1])){warnNaN=true;}newData[index]=el;});if(warnNaN){this.warn("Trying to assign NaN values to a typed array that does not support NaNs. 0's will be used instead");}this._setData(newData);if(dataX){this.setXWaveform(dataX);}return this;}},{key:'getY',value:function getY(index){return this.data[index];}/*
	      flipXY() {
	        let temp;
	        temp = this.data.x;
	        this.data.x = this.data.y;
	        this.data.y = temp;
	         this._setData( this.data.x, this.data.y );
	      }*/},{key:'setXWaveform',value:function setXWaveform(waveform){if(!(waveform instanceof Waveform)){if(Array.isArray(waveform)){waveform=new Waveform(waveform);}else{throw"Cannot set X waveform. Data is not a valid array.";}}this.xdata=waveform;this.computeXMinMax();return this;}},{key:'hasXWaveform',value:function hasXWaveform(){return!!this.xdata;}},{key:'getXWaveform',value:function getXWaveform(){if(this.xdata){return this.xdata;}var wave=new Waveform();for(var i=0;i<this.getLength();i+=1){wave.append(this.getX(i));}return wave;}},{key:'rescaleX',value:function rescaleX(offset,scale){this.xScale=scale;this.xOffset=offset;this.computeXMinMax();}},{key:'getTypedArrayClass',value:function getTypedArrayClass(){return this._typedArrayClass||false;}},{key:'setTypedArrayClass',value:function setTypedArrayClass(constructor){if(this.getTypedArrayClass()&&this.isNaNAllowed()&&!this.isNaNAllowed(constructor)){this.warn("NaN values are not allowed by the new constructor ("+constructor.name+") while it was allowed by the previous one ("+this._typedArrayClass.name+")");}if(this.getTypedArrayClass()&&this.isUnsigned()&&!this.isUnsigned(constructor)){this.warn("You are switching from signed values to unsigned values. You may experience data corruption if there were some negative values.");}this._typedArrayClass=constructor;if(this.data){this._setData(constructor.from(this.data));}if(this.hasXWaveform()){this.getXWaveform().setTypedArrayClass(constructor);}}},{key:'isNaNAllowed',value:function isNaNAllowed(){var constructor=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this._typedArrayClass;// The following types accept NaNs
return constructor==Array||constructor==Float32Array||constructor==Float64Array;}},{key:'isUnsigned',value:function isUnsigned(){var constructor=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this._typedArrayClass;// The following types accept NaNs
return constructor==Uint8Array||constructor==Uint8ClampedArray||constructor==Uint16Array||constructor==Uint32Array;}},{key:'recalculateMinMaxNewPoint',value:function recalculateMinMaxNewPoint(x,y){if(x<this.minX||this.minX===undefined){this.minX=x;}if(x>this.maxX||this.maxX===undefined){this.maxX=x;}if(y<this.minY||this.minY===undefined){this.minY=y;}if(y>this.maxY||this.maxY===undefined){this.maxY=y;}}},{key:'prepend',value:function prepend(x,y){if(typeof x=="function"){x=x(this);}if(typeof y=="function"){y=y(this);}if(this.xdata){this.xdata.prepend(null,x);}else if(x!==null){this.xdata=this.getXWaveform();this.xdata.prepend(null,x);}else{this.xOffset-=this.xScale;}this.data.unshift(y);this.recalculateMinMaxNewPoint(x,y);return this;}},{key:'append',value:function append(x,y){if(typeof x=="function"){x=x(this);}if(typeof y=="function"){y=y(this);}if(this.xdata){this.xdata.append(null,x);}else if(x!==null){this.xdata=this.getXWaveform();this.xdata.append(null,x);}this.data.push(y);this.recalculateMinMaxNewPoint(x,y);return this;}},{key:'_makeArray',value:function _makeArray(length){var constructor=this.getTypedArrayClass();if(constructor){return new constructor(length);}return new Array(length);}},{key:'_setData',value:function _setData(dataY){var l=dataY.length;var i=1,monoDir=dataY[1]>dataY[0],minY=dataY[0],maxY=dataY[0];this._monotoneous=true;for(;i<l;i++){if(dataY[i]!==dataY[i-1]&&monoDir!==dataY[i]>dataY[i-1]){this._monotoneous=false;}if(dataY[i]===dataY[i]){// NaN support
minY=Math.min(dataY[i],minY);maxY=Math.max(dataY[i],maxY);}}if(this._monotoneous){this._monotoneousAscending=dataY[1]>dataY[0];}this.minY=minY;this.maxY=maxY;this.data=dataY;this.computeXMinMax();}},{key:'computeXMinMax',value:function computeXMinMax(){if(!this.data){return;}if(this.xdata){this.minX=this.xdata.getMin();this.maxX=this.xdata.getMax();}else{var b1=this.xOffset+this.xScale*this.getLength(),b2=this.xOffset;this.minX=Math.min(b1,b2);this.maxX=Math.max(b1,b2);}}},{key:'getIndexFromX',value:function getIndexFromX(xval){var useDataToUse=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(!this.isXMonotoneous()){throw"Impossible to get the index from the x value for a non-monotoneous wave !";}var data=void 0,xdata=void 0;if(useDataToUse&&this.dataInUse){xdata=this.dataInUse.x;}else if(this.xdata){xdata=this.xdata.getData();}if(xdata){return binarySearch(xval,xdata,!(this.xdata?this.xdata.getMonotoneousAscending():this.xScale>0));}else{return Math.max(0,Math.min(this.getLength()-1,Math.floor((xval-this.xOffset)/this.xScale)));}}},{key:'getXMin',value:function getXMin(){return this.minX;}},{key:'getXMax',value:function getXMax(){return this.maxX;}},{key:'getYMin',value:function getYMin(){return this.minY;}},{key:'getYMax',value:function getYMax(){return this.maxY;}},{key:'getMin',value:function getMin(){return this.minY;}},{key:'getMax',value:function getMax(){return this.maxY;}},{key:'getMinX',value:function getMinX(){return this.minX;}},{key:'getMaxX',value:function getMaxX(){return this.maxX;}},{key:'getMinY',value:function getMinY(){return this.minY;}},{key:'getMaxY',value:function getMaxY(){return this.maxY;}},{key:'getDataY',value:function getDataY(){return this.data;}},{key:'getData',value:function getData(optimized){if(!optimized||!this.dataInUse){return this.data;}return this.dataInUse.y;}},{key:'getLength',value:function getLength(){return this.data.length;}},{key:'getDataToUseFlat',value:function getDataToUseFlat(){var l=void 0;var j=0;var arr=void 0;if(this.dataInUse){l=this.dataInUse.x.length;arr=new Array(l*2).fill(0);for(var i=0;i<l;i+=1){arr[j]=this.dataInUse.x[i];arr[j+1]=this.dataInUse.y[i];j+=2;}}else{l=this.getLength();arr=new Array(l*2).fill(0);for(var i=0;i<l;i+=1){arr[j+1]=this.data[i];arr[j]=this.getX(i);j+=2;}}return arr;}},{key:'fit',value:function fit(options){var self=this;return new Promise(function(resolver,rejector){var fit=new _fit_lm2.default((0,_graph.extend)({},{dataY:self,dataX:self.getXWaveform(),done:function done(results){resolver(results);},waveform:new Waveform()},options));fit.init();fit.fit();});}},{key:'getX',value:function getX(index,optimized){if(optimized&&this.dataInUse){return this.dataInUse.x[index];}if(this.xdata){return this.xdata.data[index];}else{return this.xOffset+index*this.xScale;}}},{key:'_integrateP',value:function _integrateP(){var from=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var to=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this.getLength()-1;from=Math.round(from);to=Math.round(to);var l=to-from+1;var sum=0,delta;var deltaTot=0;var diff=void 0;var arrY=this.getData();for(;from<=to;from++){if(arrY.length-1>from){diff=this.getX(from+1)-this.getX(from);deltaTot+=diff;sum+=arrY[from]*diff;}}return[sum,l,deltaTot];}},{key:'integrateP',value:function integrateP(from,to){var val=this._integrateP(from,to);return val[0];}},{key:'average',value:function average(){var p0=arguments.length>0&&arguments[0]!==undefined?arguments[0]:0;var p1=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this.getLength()-1;return this.getAverageP(p0,p1);}},{key:'mean',value:function mean(){return this.average();}},{key:'getAverageP',value:function getAverageP(from,to){var sum=this._integrateP(from,to);return sum[0]/sum[2];}},{key:'getAverageX',value:function getAverageX(from,to){var sum=this._integrateX(from,to);return sum[0]/sum[2];}},{key:'checkMonotonicity',value:function checkMonotonicity(){var i=1,data=this.getData();var l=this.data.length;var dir=data[1]>data[0];for(;i<l;i++){if(data[i]!==data[i-1]&&dir!==data[i]>data[i-1]){return this._monotoneous=false;}}this._monotoneousAscending=data[1]>data[0];return this._monotoneous=true;}},{key:'requireXMonotonicity',value:function requireXMonotonicity(){if(this.xdata){this.xdata.requireMonotonicity();}}},{key:'requireMonotonicity',value:function requireMonotonicity(){if(!this.isMonotoneous()){throw"The wave must be monotonic";}}},{key:'isMonotoneous',value:function isMonotoneous(){return!!this._monotoneous;}},{key:'isXMonotoneous',value:function isXMonotoneous(){if(this.xdata){return this.xdata.isMonotoneous();}// Offset and scale is always monotoneous
return true;}},{key:'invert',value:function invert(data){var d=dataY||this.data;d.reverse();if(this.isMonotoneous()){this._monotoneousAscending=!this._monotoneousAscending;}return d;}},{key:'resampleForDisplay',value:function resampleForDisplay(options){// Serie redrawing
var i=0;this.requireXMonotonicity();var inverting=false,dataY=this.getDataY(),data={x:[],y:[]},dataMinMax=[],resampleSum=void 0,resampleMin=void 0,resampleMax=void 0,resampleNum=void 0,resample_x_start=void 0,resample_x_px_start=void 0,x_px=void 0,doing_mean=false,firstPointIndex=0,xval=void 0;var l=this.getLength();if(!options.xPosition){throw"No position calculation method provided";}if(!options.resampleToPx){throw"No \"resampleToPx\" method was provided. Unit: px per point";}if(options.minX>options.maxX){var temp=options.minX;options.minX=options.maxX;options.maxX=temp;}if(this.xdata&&!this.xdata.getMonotoneousAscending()||!this.xdata&&this.xScale<-0){inverting=true;i=l;}for(;inverting?i>0:i<l;inverting?i--:i++){xval=this.getX(i);if(options.minX>xval){firstPointIndex=i;continue;}x_px=options.xPosition(xval);if(!doing_mean){if(!firstPointIndex){firstPointIndex=i;}else{data.x.push(xval);data.y.push(dataY[firstPointIndex]);}while(isNaN(dataY[i])){if(inverting){i--;}else{i++;}}resampleSum=resampleMin=resampleMax=dataY[firstPointIndex];resampleNum=1;resample_x_px_start=x_px;resample_x_start=xval;firstPointIndex=0;doing_mean=true;continue;}if(Math.abs(x_px-resample_x_px_start)>options.resampleToPx||i==l||i==0||isNaN(dataY[i])){var xpos=(resample_x_start+xval)/2;data.x.push(xpos);data.y.push(resampleSum/resampleNum);dataMinMax.push(xpos,resampleMin,resampleMax);if(options.maxX!==undefined&&xval>options.maxX){break;}doing_mean=false;continue;}resampleSum+=dataY[i];resampleNum++;resampleMin=Math.min(resampleMin,dataY[i]);resampleMax=Math.max(resampleMax,dataY[i]);}this.dataInUse=data;return dataMinMax;}},{key:'interpolate',value:function interpolate(x){var xIndex=void 0;var yData=this.getDataY();if(this.xdata){var xData=this.xdata.getData(),_xIndex=binarySearch(x,xData,!this.xdata.getMonotoneousAscending());if(xData[_xIndex]==x){return yData[_xIndex];}return(x-xData[_xIndex])/(xData[_xIndex+1]-xData[_xIndex])*(yData[_xIndex+1]-yData[_xIndex])+yData[_xIndex];}else{xIndex=(x-this.xOffset)/this.xScale;var xIndexF=Math.floor(xIndex);return(xIndex-xIndexF)*(yData[xIndexF+1]-yData[xIndexF])+yData[xIndexF];}}},{key:'getMonotoneousAscending',value:function getMonotoneousAscending(){return this._monotoneousAscending;}},{key:'getXMonotoneousAscending',value:function getXMonotoneousAscending(){if(this.xdata){return this.xdata.getMonotoneousAscending();}return this.xScale>0;}},{key:'isXMonotoneousAscending',value:function isXMonotoneousAscending(){return this.getXMonotoneousAscending.apply(this,arguments);}},{key:'divide',value:function divide(numberOrWave){return this._arithmetic(numberOrWave,DIVIDE);}},{key:'divideBy',value:function divideBy(){return this.divide.apply(this,arguments);}},{key:'multiply',value:function multiply(numberOrWave){return this._arithmetic(numberOrWave,MULTIPLY);}},{key:'multiplyBy',value:function multiplyBy(){return this.multiply.apply(this,arguments);}},{key:'log',value:function log(){return this.logBase(10);}},{key:'ln',value:function ln(){return this.logBase(Math.E);}},{key:'logBase',value:function logBase(base){var logBase=Math.log(base);this.data.map(function(valY){return Math.log(valY)/logBase;});}},{key:'add',value:function add(numberOrWave){return this._arithmetic(numberOrWave,ADD);}},{key:'addBy',value:function addBy(){return this.add.apply(this,arguments);}},{key:'subtract',value:function subtract(numberOrWave){return this._arithmetic(numberOrWave,SUBTRACT);}},{key:'subtractBy',value:function subtractBy(){return this.subtract.apply(this,arguments);}},{key:'_arithmetic',value:function _arithmetic(numberOrWave,operator){if(numberOrWave instanceof Waveform){return this._waveArithmetic(numberOrWave,operator);}else if(typeof numberOrWave=='number'){return this._numberArithmetic(numberOrWave,operator);}}},{key:'_numberArithmetic',value:function _numberArithmetic(num,operation){var i=0,l=this.getLength();if(operation==MULTIPLY){for(;i<l;i++){this.data[i]*=num;}this.minY*=num;this.maxY*=num;}else if(operation==DIVIDE){for(;i<l;i++){this.data[i]/=num;}this.minY/=num;this.maxY/=num;}else if(operation==ADD){for(;i<l;i++){this.data[i]+=num;}this.minY+=num;this.maxY+=num;}else if(operation==SUBTRACT){for(;i<l;i++){this.data[i]-=num;}this.minY-=num;this.maxY-=num;}return this;}},{key:'_waveArithmetic',value:function _waveArithmetic(wave,operation){var yDataThis=this.getDataY(),i=0;var l=this.getLength();this.requireXMonotonicity();wave.requireXMonotonicity();if(operation==MULTIPLY){for(;i<l;i++){yDataThis[i]*=wave.interpolate(this.getX(i));}}else if(operation==DIVIDE){for(;i<l;i++){yDataThis[i]/=wave.interpolate(this.getX(i));}}else if(operation==ADD){for(;i<l;i++){yDataThis[i]+=wave.interpolate(this.getX(i));}}else if(operation==SUBTRACT){for(;i<l;i++){yDataThis[i]-=wave.interpolate(this.getX(i));}}this._setData(yDataThis);return this;}},{key:'aggregate',value:function aggregate(){var _this10=this;var levels=10;var level=128;// Starting with a 128 points spectrum
var i=0;this._dataAggregating={};this._dataAggregated={};for(;i<levels;i++){this._dataAggregating[level]=(0,_data_aggregator2.default)({min:this.getMinX(),max:this.getMaxX(),data:this.data,xdata:this.xdata?this.xdata.getData():undefined,xScale:this.xScale,xOffset:this.xOffset,numPoints:level}).then(function(data){_this10._dataAggregated[data.numPoints]=data.data;});if(level>this.getLength()){break;}level*=2;}}},{key:'hasAggregation',value:function hasAggregation(){return!!this._dataAggregated;}},{key:'selectAggregatedData',value:function selectAggregatedData(pxWidth,minX,maxX){var level=pow2ceil(pxWidth);if(this._dataAggregated[level]){this.dataInUse=this._dataAggregated[level];return;}else if(this._dataAggregating[level]){return this._dataAggregating[level];}this.dataInUse={y:this.data,x:this.getXWaveform().data};}},{key:'duplicate',value:function duplicate(alsoDuplicateXWave){var newWaveform=new Waveform();newWaveform._setData(this.getDataY().slice());if(this.xdata){if(alsoDuplicateXWave){newWaveform.setXWaveform(this.xdata.duplicate());}else{newWaveform.setXWaveform(this.xdata);}}else{newWaveform.xOffset=this.xOffset;newWaveform.xScale=this.xScale;}return newWaveform;}},{key:'warn',value:function warn(text){if(console){console.warn(text);}}}]);return Waveform;}();;var MULTIPLY=Symbol();var ADD=Symbol();var SUBTRACT=Symbol();var DIVIDE=Symbol();// http://stackoverflow.com/questions/26965171/fast-nearest-power-of-2-in-javascript
function pow2ceil(v){v--;var p=2;while(v>>=1){p<<=1;}return p;}function pow2floor(v){var p=1;while(v>>=1){p<<=1;}return p;}function binarySearch(target,haystack,reverse){var seedA=0,length=haystack.length,seedB=length-1,seedInt=void 0,i=0,nanDirection=1;if(haystack[seedA]==target){return seedA;}if(haystack[seedB]==target){return seedB;}while(true){i++;if(i>100){throw"Error loop";}seedInt=Math.floor((seedA+seedB)/2);//  seedInt -= seedInt % 2; // Always looks for an x.
while(isNaN(haystack[seedInt])){seedInt+=nanDirection;}if(seedInt==seedA||haystack[seedInt]==target||seedInt==seedB){return seedInt;}//    console.log(seedA, seedB, seedInt, haystack[seedInt]);
if(haystack[seedInt]<=target){if(reverse){seedB=seedInt;}else{seedA=seedInt;}}else if(haystack[seedInt]>target){if(reverse){seedA=seedInt;}else{seedB=seedInt;}}else{return false;}nanDirection*=-1;}}exports.default=Waveform;});/***/},/* 6 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports);}else{var mod={exports:{}};factory(mod.exports);global.fit_lm=mod.exports;}})(this,function(exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var FitHost=function(){function FitHost(options){_classCallCheck(this,FitHost);this.DELTAP=1e-6;this.BIGVAL=9e99;this.WEIGHT=1.0;console.log(options);this.setYData(options.dataY);this.setXData(options.dataX);this.setWeight(options.weight);this.setInitialParams(options.params);if(options.subsetIndex){this.setSubset.apply(this,_toConsumableArray(options.subsetIndex));}this.setFunction(options.function);if(options.progress){this.hookIteration(options.progress);}this.options=options;}//[ [ x1, y1 ], [ x2, y2 ] ]
_createClass(FitHost,[{key:'setYData',value:function setYData(data){// Waveform instance
this.data=data;}},{key:'setXData',value:function setXData(data){// Waveform instance
this.dataX=data;}},{key:'setWeight',value:function setWeight(weight){// Waveform instance
this.weight=weight;}},{key:'setInitialParams',value:function setInitialParams(params){var _this11=this;this.parms=params;this.parms=this.parms.map(function(el){if(typeof el=='function'){return el(_this11.data,_this11.dataX);}else{return el;}});this.NPARMS=params.length;}},{key:'setSubset',value:function setSubset(fromIndex,toIndex){if(fromIndex!==undefined&&toIndex!==undefined){this._from=fromIndex;this._to=toIndex;}}},{key:'hookIteration',value:function hookIteration(f){var _this12=this;this._hookIteration=function(params){var data=_this12.buildFit(params,200);f(data);};}},{key:'setFunction',value:function setFunction(func){this._func=func;}},{key:'init',value:function init(){var _this13=this;// Get data length
if(this._from!==undefined&&this._to!==undefined){if(this._from>=this._to){throw"Impossible to fit negative subranges. The starting index must be lower than the ending index";}this.NPTS=this._to-this._from+1;if(this.data&&this.data.getLength()<=this._to){throw"Wave Y has not enough point to be fitted to subrange ["+this._from+", "+this._to+"]";}if(this._from<0){throw"Impossible to fit a subrange with negative indices";}}else{this.NPTS=this.data.getLength();this._from=0;this._to=this.data.getLength()-1;}if(this.dataX&&this.dataX.getLength()<=this._to){throw"Wave X has not enough point to be fitted to subrange ["+this._from+", "+this._to+"]";}this.arrY=this.data.getDataY();if(this.dataX){this.arrX=this.dataX.getDataY();}else{this.arrX=this.data.getDataX();}this.resid=new Array(this.NPTS).fill(0);this.jac=new Array(this.NPTS).fill(0);this.jac=this.jac.map(function(el){return new Array(_this13.NPARMS);});}},{key:'fit',value:function fit(){this.log("Starting the fit with initial parameter list {"+this.parms.join()+"};");new LM(this,this.NPARMS,this.NPTS,this._hookIteration);this.log("Fit successful. Output parameters {"+this.parms.join()+"};");this._result=this.buildFit(this.parms,200);if(this.options.done){this.options.done(this.parms,this._result);}return this._result;}},{key:'func',value:function func(x,param){return this._func(x,param);}},{key:'computeResiduals',value:function computeResiduals(){var sumsq=0;for(var i=0;i<this.NPTS;i++){this.resid[i]=(this.func(this.arrX[i+this._from],this.parms)-this.arrY[i+this._from])*this.WEIGHT;sumsq+=this.resid[i]*this.resid[i];}return sumsq;}},{key:'log',value:function log(message){console.log(message);}//------the four mandated interface methods------------
},{key:'nudge',value:function nudge(dp){for(var j=0;j<this.NPARMS;j++){this.parms[j]+=dp[j];}return this.computeResiduals();}},{key:'buildJacobian',value:function buildJacobian(){// Allows LM to compute a new Jacobian.
// Uses current parms[] and two-sided finite difference.
// If current parms[] is bad, returns false.
var delta=new Array(this.NPARMS);var FACTOR=0.5/this.DELTAP;var d=0;for(var j=0;j<this.NPARMS;j++){for(var k=0;k<this.NPARMS;k++){delta[k]=k==j?this.DELTAP:0.0;}d=this.nudge(delta);// resid at pplus
if(d==this.BIGVAL){throw"Bad dBuildJacobian() exit 2";}for(var i=0;i<this.NPTS;i++){this.jac[i][j]=this.getResidualElement(i);}for(var k=0;k<this.NPARMS;k++){delta[k]=k==j?-2*this.DELTAP:0.0;}d=this.nudge(delta);// resid at pminus
if(d==this.BIGVAL){throw"Bad dBuildJacobian(). exit 3";}for(var i=0;i<this.NPTS;i++){this.jac[i][j]-=this.getResidualElement(i);}// fetches resid[]
for(var i=0;i<this.NPTS;i++){this.jac[i][j]*=FACTOR;}for(var k=0;k<this.NPARMS;k++){delta[k]=k==j?this.DELTAP:0.0;}d=this.nudge(delta);if(d==this.BIGVAL){throw"Bad dBuildJacobian(). exit 4";}}return true;}},{key:'getResidualElement',value:function getResidualElement(i){// Allows LM to see one element of the resid[] vector.
return this.resid[i];}},{key:'getJacobianElement',value:function getJacobianElement(i,j){// Allows LM to see one element of the Jacobian matrix.
return this.jac[i][j];}},{key:'buildFit',value:function buildFit(parms,length){var x=void 0;if(!length){x=this.arrX;}else{var xmin=this.dataX.getMin(this._from,this._to);var xmax=this.dataX.getMax(this._from,this._to);x=new Array(length).fill(0).map(function(el,index){return index*(xmax-xmin)/(length-1)+xmin;});}var fit=new Array(x.length);for(var i=0,l=x.length;i<l;i++){fit[i]=this.func(x[i],this.parms);}var waveformResult=this.options.waveform;waveformResult.setData(fit,x);//waveformResult.setXWaveform( x );
return waveformResult;}}]);return FitHost;}();var LM=function(){function LM(gH,gnadj,gnpnts,hook){var _this14=this;_classCallCheck(this,LM);this.LMITER=100;// max number of L-M iterations
this.LMBOOST=2.0;// damping increase per failed step
this.LMSHRINK=0.10;// damping decrease per successful step
this.LAMBDAZERO=0.001;// initial damping
this.LAMBDAMAX=1E9;// max damping
this.LMTOL=1E-12;// exit tolerance
this.BIGVAL=9e99;// trouble flag
this.sos;this.sosprev;this.lambda;this.myH=null;// overwritten by constructor
this.nadj=0;// overwritten by constructor
this.npts=0;// overwritten by constructor
this.delta;// local parm change
this.beta;this.alpha;this.amatrix;// Constructor sets up fields and drives iterations.
this.myH=gH;this.nadj=gnadj;this.npts=gnpnts;this.delta=new Array(this.nadj).fill(0);this.beta=new Array(this.nadj).fill(0);this.alpha=new Array(this.nadj).fill(0);this.amatrix=new Array(this.nadj).fill(0);this.alpha=this.alpha.map(function(){return new Array(_this14.nadj);});this.amatrix=this.amatrix.map(function(){return new Array(_this14.nadj);});this.lambda=this.LAMBDAZERO;var niter=0;var done=false;do{done=this.bLMiter();if(hook){hook(this.myH.params);}niter++;}while(!done&&niter<this.LMITER);}_createClass(LM,[{key:'bLMiter',value:function bLMiter(){// Each call performs one LM iteration.
// Returns true if done with iterations; false=wants more.
// Global nadj, npts; needs nadj, myH to be preset.
// Ref: M.Lampton, Computers in Physics v.11 pp.110-115 1997.
for(var k=0;k<this.nadj;k++){this.delta[k]=0.0;}this.sos=this.myH.nudge(this.delta);if(this.sos==this.BIGVAL){console.error("  bLMiter finds faulty initial nudge()");return false;}this.sosprev=this.sos;console.log("  bLMiter..SumOfSquares= "+this.sos);if(!this.myH.buildJacobian()){console.error("  bLMiter finds buildJacobian()=false");return false;}for(var k=0;k<this.nadj;k++)// get downhill gradient beta
{this.beta[k]=0.0;for(var i=0;i<this.npts;i++){this.beta[k]-=this.myH.getResidualElement(i)*this.myH.getJacobianElement(i,k);}}for(var k=0;k<this.nadj;k++){// get curvature matrix alpha
for(var j=0;j<this.nadj;j++){this.alpha[j][k]=0.0;for(var i=0;i<this.npts;i++){this.alpha[j][k]+=this.myH.getJacobianElement(i,j)*this.myH.getJacobianElement(i,k);}}}var rrise=0;do// inner damping loop searches for one downhill step
{for(var k=0;k<this.nadj;k++){// copy and damp it
for(var j=0;j<this.nadj;j++){this.amatrix[j][k]=this.alpha[j][k]+(j==k?this.lambda:0.0);}}this.gaussj(this.amatrix,this.nadj);// invert
for(var k=0;k<this.nadj;k++)// compute delta[]
{this.delta[k]=0.0;for(var j=0;j<this.nadj;j++){this.delta[k]+=this.amatrix[j][k]*this.beta[j];}}this.sos=this.myH.nudge(this.delta);// try it out.
if(this.sos==this.BIGVAL){console.error("  LMinner failed SOS step");return false;}rrise=(this.sos-this.sosprev)/(1+this.sos);if(rrise<=0.0)// good step!
{this.lambda*=this.LMSHRINK;// shrink lambda
break;// leave lmInner.
}for(var q=0;q<this.nadj;q++){// reverse course!
this.delta[q]*=-1.0;}this.myH.nudge(this.delta);// sosprev should still be OK
if(rrise<this.LMTOL){// finished but keep prev parms
break;// leave inner loop
}this.lambda*=this.LMBOOST;// else try more damping.
}while(this.lambda<this.LAMBDAMAX);return rrise>-this.LMTOL||this.lambda>this.LAMBDAMAX;}},{key:'gaussj',value:function gaussj(a,N){// Inverts the double array a[N][N] by Gauss-Jordan method
// M.Lampton UCB SSL (c)2003, 2005
var det=1.0,big,save;var i,j,k,L;var ik=new Array(100);var jk=new Array(100);for(k=0;k<N;k++){big=0.0;for(i=k;i<N;i++){for(j=k;j<N;j++){// find biggest element
if(Math.abs(big)<=Math.abs(a[i][j])){big=a[i][j];ik[k]=i;jk[k]=j;}}}if(big==0.0)return 0.0;i=ik[k];if(i>k)for(j=0;j<N;j++)// exchange rows
{save=a[k][j];a[k][j]=a[i][j];a[i][j]=-save;}j=jk[k];if(j>k)for(i=0;i<N;i++){save=a[i][k];a[i][k]=a[i][j];a[i][j]=-save;}for(i=0;i<N;i++){// build the inverse
if(i!=k)a[i][k]=-a[i][k]/big;}for(i=0;i<N;i++){for(j=0;j<N;j++){if(i!=k&&j!=k)a[i][j]+=a[i][k]*a[k][j];}}for(j=0;j<N;j++){if(j!=k)a[k][j]/=big;}a[k][k]=1.0/big;det*=big;// bomb point
}// end k loop
for(L=0;L<N;L++){k=N-L-1;j=ik[k];if(j>k)for(i=0;i<N;i++){save=a[i][k];a[i][k]=-a[i][j];a[i][j]=save;}i=jk[k];if(i>k)for(j=0;j<N;j++){save=a[k][j];a[k][j]=-a[i][j];a[i][j]=save;}}return det;}}]);return LM;}();exports.default=FitHost;});/***/},/* 7 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(3)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require("../graph.util"));}else{var mod={exports:{}};factory(mod.exports,global.graph);global.data_aggregator=mod.exports;}})(this,function(exports,_graph){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=function(toOptimize){var requestId=util.guid();toOptimize._queueId=requestId;var prom=new Promise(function(resolver){queue[requestId]=resolver;});aggregatorWorker.postMessage(toOptimize);return prom;};var util=_interopRequireWildcard(_graph);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}var aggregatorWorker;var queue={};var workerUrl=URL.createObjectURL(new Blob([" ( "+function(){onmessage=function onmessage(e){var data=e.data.data,// The initial data
numPoints=e.data.numPoints,// Total number of points in the slot
max=e.data.max,// Max X
min=e.data.min,// Min Y
dataPerSlot=numPoints/(max-min),// Computer number of aggregation per slot
l=data.length;// Number of data in the original buffer
var i=0;var k=-4;var slots=[];var dataAggregatedX=[];var dataAggregatedY=[];var getX=void 0;if(e.data.xdata){getX=function getX(index){return e.data.xdata[index];};}else{getX=function getX(index){return index*e.data.xScale+e.data.xOffset;};}for(;i<l;i++){// dataPerSlot: 1 / 1000 ( compression by 1'000 )
//console.log( dataPerSlot, getX( i ) );
slotNumber=Math.floor((getX(i)-min)*dataPerSlot);if(slots[k]!==slotNumber){k+=4;slots[k]=slotNumber;var slotX=(slotNumber+0.5)/dataPerSlot;dataAggregatedX[k]=slotX;dataAggregatedX[k+1]=slotX;dataAggregatedX[k+2]=slotX;dataAggregatedX[k+3]=slotX;dataAggregatedY[k]=data[i];dataAggregatedY[k+1]=data[i];dataAggregatedY[k+2]=data[i];dataAggregatedY[k+3]=data[i];}dataAggregatedY[k+1]=Math.min(data[i],dataAggregatedY[k+1]);dataAggregatedY[k+2]=Math.max(data[i],dataAggregatedY[k+2]);dataAggregatedY[k+3]=data[i];}postMessage({numPoints:numPoints,data:{x:dataAggregatedX,y:dataAggregatedY},_queueId:e.data._queueId});};}.toString()+")()"],{type:'application/javascript'}));aggregatorWorker=new Worker(workerUrl);aggregatorWorker.onmessage=function(e){var id=e.data._queueId;delete e.data._queueId;queue[id](e.data);delete queue[id];};});/***/},/* 8 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(2),__webpack_require__(3)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.position'),require('./graph.util'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graph);global.graphLegend=mod.exports;}})(this,function(exports,_graph,_graph3){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);var util=_interopRequireWildcard(_graph3);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Default legend configuration
	   * @name LegendOptionsDefault
	   * @object
	   * @static
	   * @prop {Boolean} frame - <code>true</code> to display a frame around the legend
	   * @prop {Number} frameWidth - The width of the frame stroke
	   * @prop {String} frameColor - The stroke color of the frame
	   * @prop {String} backgroundColor - The background color of the frame
	   * @prop {Number} paddingLeft - The left padding
	   * @prop {Number} paddingRight - The right padding
	   * @prop {Number} paddingTop - The top padding
	   * @prop {Number} paddingBottom - The bottom padding
	   * @prop {Boolean} shapesToggleable - <code>true</code> to toggle the shapes linked to serie with its status (shown or hidden)
	   * @prop {Boolean} isSerieHideable - <code>true</code> to allow series to be hidden through the legend
	   * @prop {Boolean} isSerieSelectable - <code>true</code> to allow series to be selected through the legend
	   */var legendDefaults={backgroundColor:'rgba(255, 255, 255, 0.8)',frame:true,frameWidth:1,frameColor:'black',paddingTop:10,paddingLeft:10,paddingBottom:10,paddingRight:10,frameRounding:0,movable:false,shapesToggleable:true,isSerieHideable:true,isSerieSelectable:true};/**
	   * Legend constructor. You should not call this method directly, but rather use {@link graph.makeLegend}
	   * @example var legend = graph.makeLegend( {  backgroundColor: 'rgba(255, 255, 255, 0.8)',
	   * frame: true,
	   * frameWidth: 1,
	   * frameColor: 'black',
	   * paddingTop: 10,
	   * paddingLeft: 10,
	   * paddingBottom: 10,
	   * paddingRight: 10,
	   * frameRounding: 3,
	   *
	   * movable: false,
	   *
	   * shapesToggleable: true,
	   * isSerieHideable: true,
	   * isSerieSelectable: true
	   * } );
	   */var Legend=function(){function Legend(graph,options){_classCallCheck(this,Legend);this.options=util.extend({},legendDefaults,options);this.graph=graph;this.svg=document.createElementNS(this.graph.ns,'g');this.subG=document.createElementNS(this.graph.ns,'g');this.groups=[];this.rect=document.createElementNS(this.graph.ns,'rect');this.rectBottom=document.createElementNS(this.graph.ns,'rect');this.rect.setAttribute('x',0);this.rect.setAttribute('y',0);this.rectBottom.setAttribute('x',0);this.rectBottom.setAttribute('y',0);this.series=false;this.svg.setAttribute('display','none');this.pos={x:undefined,y:undefined,transformX:0,transformY:0};this.setEvents();this.eyeId=util.guid();this.eyeCrossedId=util.guid();var eyeClosed=util.SVGParser('<svg xmlns="http://www.w3.org/2000/svg"><symbol id="'+this.eyeCrossedId+'" viewBox="0 -256 1850 1850"><rect pointer-events="fill" fill="transparent" x="-256" y="0" width="2106" height="1850" /><g transform="matrix(1,0,0,-1,30.372881,1214.339)"><path d="m 555,201 78,141 q -87,63 -136,159 -49,96 -49,203 0,121 61,225 Q 280,812 128,576 295,318 555,201 z m 389,759 q 0,20 -14,34 -14,14 -34,14 -125,0 -214.5,-89.5 Q 592,829 592,704 q 0,-20 14,-34 14,-14 34,-14 20,0 34,14 14,14 14,34 0,86 61,147 61,61 147,61 20,0 34,14 14,14 14,34 z m 363,191 q 0,-7 -1,-9 Q 1201,954 991,576 781,198 675,9 l -49,-89 q -10,-16 -28,-16 -12,0 -134,70 -16,10 -16,28 0,12 44,87 Q 349,154 228.5,262 108,370 20,507 0,538 0,576 q 0,38 20,69 153,235 380,371 227,136 496,136 89,0 180,-17 l 54,97 q 10,16 28,16 5,0 18,-6 13,-6 31,-15.5 18,-9.5 33,-18.5 15,-9 31.5,-18.5 16.5,-9.5 19.5,-11.5 16,-10 16,-27 z m 37,-447 Q 1344,565 1265,450.5 1186,336 1056,286 l 280,502 q 8,-45 8,-84 z m 448,-128 q 0,-35 -20,-69 Q 1733,443 1663,362 1513,190 1315.5,95 1118,0 896,0 l 74,132 q 212,18 392.5,137 180.5,119 301.5,307 -115,179 -282,294 l 63,112 q 95,-64 182.5,-153 87.5,-89 144.5,-184 20,-34 20,-69 z" fill="#c0c0c0"></path></g></symbol></svg>');//  var eyeClosed = util.SVGParser('<svg xmlns="http://www.w3.org/2000/svg"><symbol id="' + this.eyeId + '" viewBox="0 0 100 100"><rect fill="black" x="0" y="0" width="100" height="100" /></symbol></svg>');
/* var eyeClosed = document.createElementNS( this.graph.ns, "symbol");
	        eyeClosed.setAttribute('id', this.eyeId );
	        eyeClosed.setAttribute("viewBox", '0 0 100 100');
	         var rect = document.createElementNS( this.graph.ns, "rect" );
	        rect.setAttribute('width', 100 );
	        rect.setAttribute('height', 100 );
	        rect.setAttribute('x', 0 );
	        rect.setAttribute('y', 0 );
	        rect.setAttribute('fill', 'black');
	        eyeClosed.appendChild( rect );
	      */var eye=util.SVGParser('<svg xmlns="http://www.w3.org/2000/svg"><symbol id="'+this.eyeId+'" viewBox="0 -256 1850 1850"><rect pointer-events="fill" x="-256" y="0" fill="transparent" width="2106" height="1850" /><g transform="matrix(1,0,0,-1,30.372881,1259.8983)"><path d="m 1664,576 q -152,236 -381,353 61,-104 61,-225 0,-185 -131.5,-316.5 Q 1081,256 896,256 711,256 579.5,387.5 448,519 448,704 448,825 509,929 280,812 128,576 261,371 461.5,249.5 662,128 896,128 1130,128 1330.5,249.5 1531,371 1664,576 z M 944,960 q 0,20 -14,34 -14,14 -34,14 -125,0 -214.5,-89.5 Q 592,829 592,704 q 0,-20 14,-34 14,-14 34,-14 20,0 34,14 14,14 14,34 0,86 61,147 61,61 147,61 20,0 34,14 14,14 14,34 z m 848,-384 q 0,-34 -20,-69 Q 1632,277 1395.5,138.5 1159,0 896,0 633,0 396.5,139 160,278 20,507 0,542 0,576 q 0,34 20,69 140,229 376.5,368 236.5,139 499.5,139 263,0 499.5,-139 236.5,-139 376.5,-368 20,-35 20,-69 z" fill="#444444" /></g></symbol></svg>');this.svg.appendChild(document.adoptNode(eye.documentElement.firstChild));this.svg.appendChild(document.adoptNode(eyeClosed.documentElement.firstChild));this.svg.appendChild(this.subG);this.applyStyle();}/**
	     * Sets the position of the legend
	     * @param {Position} position - the position to set the legend to versus the graph main axes ({@link Graph#getXAxis} and {@link Graph#getYAxis})
	     * @param {String} alignToX - "right" or "left". References the legend right or left boundary using the position parameter
	     * @param {String} alignToY - "top" or "bottom". References the legend top or bottom boundary using the position parameter
	     * @example legend.setPosition( { x: 'max', y: '0px' }, 'right', 'top' ); // The rightmost side of the legend will at the maximum value of the axis, and will be positioned at the top
	     */_createClass(Legend,[{key:'setPosition',value:function setPosition(position,alignToX,alignToY){if(!position){return;}this.position=position;this.alignToX=alignToX||'left';this.alignToY=alignToY||'top';}},{key:'setDraggable',value:function setDraggable(bln){this.options.movable=bln;}},{key:'setAutoPosition',value:function setAutoPosition(position){if(['bottom','left','top','right'].indexOf(position=position.toLowerCase())>-1){this.autoPosition=position;return this;}this.requireDelayedUpdate();this.autoPosition=false;}},{key:'autoPosition',value:function autoPosition(){return this.setAutoPosition.apply(this,arguments);}},{key:'buildLegendBox',value:function buildLegendBox(){var series=this.series||this.graph.getSeries(),posX=0,posY=this.options.paddingTop;if(!this.autoPosition){this.graph.graphingZone.appendChild(this.getDom());}else{this.graph.getDom().appendChild(this.getDom());}for(var i=0,l=series.length;i<l;i++){if(series[i].excludedFromLegend&&!this.series){continue;}if(this.autoPosition=='bottom'||this.autoPosition=='top'){var bbox=getBBox(this.groups[i]);if(posX+bbox.width>this.graph.getDrawingWidth()-this.options.paddingRight){posY+=16;posX=0;}}this.groups[i].setAttribute('transform',"translate( "+posX+", "+posY+")");if(this.autoPosition=='bottom'||this.autoPosition=='top'){posX+=bbox.width+10;posY+=0;}else{posX=0;posY+=16;}}var bbox=getBBox(this.subG);/* Independant on box position */this.width=bbox.width+this.options.paddingRight+this.options.paddingLeft;this.height=bbox.height+this.options.paddingBottom+this.options.paddingTop;this.rect.setAttribute('width',this.width);this.rect.setAttribute('height',this.height);this.rect.setAttribute('fill','none');this.rect.setAttribute('pointer-events','fill');this.rect.setAttribute('display','none');if(this.options.movable){this.rectBottom.style.cursor="move";}this.rectBottom.setAttribute('width',this.width);this.rectBottom.setAttribute('height',this.height);this.rectBottom.setAttribute('x',bbox.x-this.options.paddingLeft);this.rectBottom.setAttribute('y',bbox.y-this.options.paddingTop);/* End independant on box position */this.position=this.position||{};switch(this.autoPosition){case'bottom':this.position.y=this.graph.getHeight()+"px";this.position.x=(this.graph.getWidth()-this.width)/2+"px";this.alignToY="bottom";this.alignToX=false;break;case'left':this.position.x="6px";this.position.y=(this.graph.getHeight()-this.height)/2+"px";this.alignToX="left";this.alignToY=false;break;case'right':this.position.x=this.graph.getWidth()+"px";this.position.y=(this.graph.getHeight()-this.height)/2+"px";this.alignToX="right";this.alignToY=false;break;case'top':this.position.x=(this.graph.getWidth()-this.width)/2+"px";this.position.y="10px";this.alignToY="top";this.alignToX=false;break;}if(this.autoPosition){switch(this.autoPosition){case'bottom':this.graph.options.paddingBottom=this.height+10;break;case'left':this.graph.options.paddingLeft=this.width+5;break;case'right':this.graph.options.paddingRight=this.width+10;break;case'top':this.graph.options.paddingTop=this.height+14;break;}this.graph.updateGraphingZone();this.graph.getDrawingHeight();this.graph.getDrawingWidth();// this.graph.redraw( false );
}this.bbox=bbox;}},{key:'calculatePosition',value:function calculatePosition(){var pos=_graph2.default.check(this.position);var poscoords=pos.compute(this.graph,this.graph.getXAxis(),this.graph.getYAxis());if(!poscoords){return;}if(this.alignToX=="right"){poscoords.x-=this.width;poscoords.x+=this.bbox.x;}else{//poscoords.x -= this.bbox.x;
}if(this.alignToY=="bottom"){poscoords.y-=this.height;poscoords.y+=this.bbox.y;}else{poscoords.y+=this.bbox.y;}this.pos.transformX=poscoords.x;this.pos.transformY=poscoords.y;this._setPosition();}/**
	     * Updates the legend position and content
	     */},{key:'update',value:function update(onlyIfRequired){if(this.graph.isDelayedUpdate()||!this._requiredUpdate&&onlyIfRequired){return;}this._requiredUpdate=false;var self=this;this.applyStyle();while(this.subG.hasChildNodes()){this.subG.removeChild(this.subG.lastChild);}this.svg.insertBefore(this.rectBottom,this.svg.firstChild);var series=this.series||this.graph.getSeries(),line,text,g;if(series.length>0){this.svg.setAttribute('display','block');}else{return;}if(this.autoPosition=='bottom'||this.autoPosition=='top'){var fullWidth=this.graph.getDrawingWidth();}var posX,posY;for(var i=0,l=series.length;i<l;i++){if(series[i].excludedFromLegend&&!this.series){continue;}(function(j){var g,line,text,xPadding=0;if(this.autoPosition=='bottom'||this.autoPosition=='top'){var fullWidth=this.graph.getDrawingWidth();}g=document.createElementNS(self.graph.ns,'g');var rect=document.createElementNS(self.graph.ns,'rect');self.subG.appendChild(g);g.appendChild(rect);var line=series[j].getSymbolForLegend();var marker=series[j].getMarkerForLegend();var text=series[j].getTextForLegend();var dx=35;if(this.isHideable()){dx+=20;var eyeUse=document.createElementNS(self.graph.ns,"use");eyeUse.setAttributeNS('http://www.w3.org/1999/xlink',"xlink:href","#"+this.eyeId);eyeUse.setAttribute("width",15);eyeUse.setAttribute("height",15);eyeUse.setAttribute("x",35);eyeUse.setAttribute("y",-8);eyeUse.addEventListener("click",function(e){e.stopPropagation();var id;if(series[j].isShown()){series[j].hide();id=self.eyeCrossedId;}else{series[j].show();id=self.eyeId;}eyeUse.setAttributeNS('http://www.w3.org/1999/xlink',"xlink:href","#"+id);});}text.setAttribute('transform','translate('+dx+', 3)');if(line){g.appendChild(line);}if(series[j].getType()=="scatter"){line.setAttribute('transform','translate( 20, 0 )');}if(marker){g.appendChild(marker);}if(eyeUse){g.appendChild(eyeUse);}g.appendChild(text);var bbox=getBBox(g);rect.setAttribute('x',bbox.x);rect.setAttribute('y',bbox.y);rect.setAttribute('width',bbox.width);rect.setAttribute('height',bbox.height);rect.setAttribute('fill','none');rect.setAttribute('pointer-events','fill');self.groups[j]=g;g.addEventListener('click',function(e){var serie=series[j];if(self.isSelectable()&&!serie.isSelected()){self.graph.selectSerie(serie);}else{self.graph.unselectSerie(serie);}e.preventDefault();e.stopPropagation();});}).call(this,i);}this.svg.appendChild(this.rect);this.buildLegendBox();this.calculatePosition();}/**
	     * @return {Boolean} true or false depending if the series can be hidden or not
	     */},{key:'isHideable',value:function isHideable(){return this.options.isSerieHideable;}},{key:'notHideable',value:function notHideable(){this.options.isSerieHideable=false;return this;}},{key:'hideable',value:function hideable(){this.options.isSerieHideable=true;return this;}},{key:'isSelectable',/**
	     * @return {Boolean} true or false depending if the series can be selected or not
	     */value:function isSelectable(){return this.options.isSerieSelectable;}/**
	     * @return {Boolean} true or false depending if the series can be t or not
	     */},{key:'isToggleShapes',value:function isToggleShapes(){return this.options.shapesToggleable;}/**
	     * @return {SVGGroupElement} The SVG group element wrapping the legend
	     */},{key:'getDom',value:function getDom(){return this.svg;}},{key:'setEvents',value:function setEvents(){var self=this;var pos=this.pos;var mousedown=function mousedown(e){e.stopPropagation();console.log("down");if(self.options.movable){pos.x=e.clientX;pos.y=e.clientY;e.preventDefault();self.mousedown=true;self.graph.elementMoving(self);self.rect.setAttribute('display','block');}};var mousemove=function mousemove(e){self.handleMouseMove(e);};this.svg.addEventListener('mousedown',mousedown);this.svg.addEventListener('click',function(e){e.stopPropagation();});this.svg.addEventListener('dblclick',function(e){e.stopPropagation();});this.svg.addEventListener('mousemove',mousemove);//this.rect.addEventListener( 'mousemove', mousemove );
}},{key:'handleMouseUp',value:function handleMouseUp(e){e.stopPropagation();e.preventDefault();this.mousedown=false;this.rect.setAttribute('display','none');this.graph.elementMoving(false);}},{key:'handleMouseMove',value:function handleMouseMove(e){if(!this.mousedown){return;}var pos=this.pos;var deltaX=e.clientX-pos.x;var deltaY=e.clientY-pos.y;pos.transformX+=deltaX;pos.transformY+=deltaY;pos.x=e.clientX;pos.y=e.clientY;e.stopPropagation();e.preventDefault();this._setPosition();}},{key:'_setPosition',value:function _setPosition(){var pos=this.pos;if(!isNaN(pos.transformX)&&!isNaN(pos.transformY)&&pos.transformX!==false&&pos.transformY!==false){this.svg.setAttribute('transform','translate('+pos.transformX+', '+pos.transformY+')');}}/**
	     * Re-applies the legend style
	     */},{key:'applyStyle',value:function applyStyle(){if(this.options.frame){this.rectBottom.setAttribute('stroke',this.options.frameColor);this.rectBottom.setAttribute('stroke-width',this.options.frameWidth+"px");this.rectBottom.setAttribute('rx',this.options.frameRounding);this.rectBottom.setAttribute('ry',this.options.frameRounding);}this.rectBottom.setAttribute('fill',this.options.backgroundColor);}/**
	     * Re-applies the legend style
	     * @param {...(GraphSerie|GraphSerie[])} a serie or an array of series
	     */},{key:'fixSeries',value:function fixSeries(){var series=[];if(arguments[0]===false){this.series=false;this.update();return;}for(var i=0,l=arguments.length;i<l;i++){if(Array.isArray(arguments[i])){series=series.concat(arguments[i]);}else{series.push(arguments[i]);}}this.update();this.series=series;}},{key:'fixSeriesAdd',value:function fixSeriesAdd(serie){this.series=this.series||[];this.series.push(serie);}},{key:'requireDelayedUpdate',value:function requireDelayedUpdate(){this._requiredUpdate=true;}},{key:'seriesHideable',set:function set(hideable){this.options.isSerieHideable=!!hideable;}/**
	     *  @type {Boolean}
	     */,get:function get(){return this.options.isSerieHideable;}}]);return Legend;}();function getBBox(svgElement){// Firefox throws when trying to call getBBox() on elements
// that are not yet rendered.
try{return svgElement.getBBox();}catch(e){return{height:0,width:0,x:0,y:0};}}exports.default=Legend;});/***/},/* 9 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(10)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.axis'));}else{var mod={exports:{}};factory(mod.exports,global.graph);global.graphAxisX=mod.exports;}})(this,function(exports,_graph){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Generic constructor of a y axis
	   * @augments Axis
	   */var AxisX=function(_graph2$default){_inherits(AxisX,_graph2$default);function AxisX(graph,topbottom){var options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};_classCallCheck(this,AxisX);var _this15=_possibleConstructorReturn(this,(AxisX.__proto__||Object.getPrototypeOf(AxisX)).call(this,graph,topbottom,options));_this15.top=topbottom=='top';return _this15;}/**
	     *  @private
	     *  Returns the position of the axis, used by refreshDrawingZone in core module
	     */_createClass(AxisX,[{key:'getAxisPosition',value:function getAxisPosition(){if(!this.options.display){return 0;}var size=(this.options.tickPosition==1?8:20)+this.graph.options.fontSize*1;if(this.getLabel()){size+=this.graph.options.fontSize;}return size;}/**
	     *  @returns {Boolean} always ```true```
	     */},{key:'isX',value:function isX(){return true;}/**
	     *  @returns {Boolean} always ```false```
	     */},{key:'isY',value:function isY(){return false;}/**
	     *  @private
	     *  Used to set the x position of the axis
	     */},{key:'setShift',value:function setShift(shift){this.shift=shift;if(this.getShift()===undefined||!this.graph.getDrawingHeight()){return;}this.group.setAttribute('transform','translate(0 '+(this.floating?this.getShift():this.top?this.shift:this.graph.getDrawingHeight()-this.shift)+')');}/**
	     *  Caclulates the maximum tick height
	     *  @return {Number} The maximum tick height
	     */},{key:'getMaxSizeTick',value:function getMaxSizeTick(){return(this.top?-1:1)*(this.options.tickPosition==1?10:10);}/**
	     *  Draws a tick. Mostly used internally but it can be useful if you want to make your own axes
	     *  @param {Number} value - The value in axis unit to place the tick
	     *  @param {Number} level - The importance of the tick
	     *  @param {Object} options - Further options to be passed to ```setTickContent```
	     *  @param {Number} forcedPos - Forces the position of the tick (for axis dependency)
	     */},{key:'drawTick',value:function drawTick(value,level,options,forcedPos){var self=this,val;val=forcedPos||this.getPos(value);if(val==undefined||isNaN(val)){return;}var tick=this.nextTick(level,function(tick){tick.setAttribute('y1',(self.top?1:-1)*self.tickPx1*self.tickScaling[level]);tick.setAttribute('y2',(self.top?1:-1)*self.tickPx2*self.tickScaling[level]);if(level==1){tick.setAttribute('stroke',self.getPrimaryTicksColor());}else{tick.setAttribute('stroke',self.getSecondaryTicksColor());}});//      tick.setAttribute( 'shape-rendering', 'crispEdges' );
tick.setAttribute('x1',val);tick.setAttribute('x2',val);this.nextGridLine(level==1,val,val,0,this.graph.getDrawingHeight());//  this.groupTicks.appendChild( tick );
if(level==1){var tickLabel=this.nextTickLabel(function(tickLabel){tickLabel.setAttribute('y',(self.top?-1:1)*((self.options.tickPosition==1?8:20)+(self.top?10:0)));tickLabel.setAttribute('text-anchor','middle');if(self.getTicksLabelColor()!=='black'){tickLabel.setAttribute('fill',self.getTicksLabelColor());}tickLabel.style.dominantBaseline='hanging';});tickLabel.setAttribute('x',val);this.setTickContent(tickLabel,value,options);}//    this.ticks.push( tick );
return[tick,tickLabel];}},{key:'drawLabel',value:function drawLabel(){// Place label correctly
if(this.katexElement){this.label.setAttribute('style','display: none;');this.katexElement.setAttribute('x',Math.abs(this.getMaxPx()+this.getMinPx())/2);this.katexElement.setAttribute('y',(this.top?-1:1)*((this.options.tickPosition==1?10:25)+this.graph.options.fontSize));this.group.appendChild(this.katexElement);}else{this.label.setAttribute('text-anchor','middle');this.label.setAttribute('style','display: initial;');this.label.setAttribute('x',Math.abs(this.getMaxPx()+this.getMinPx())/2);this.label.setAttribute('y',(this.top?-1:1)*((this.options.tickPosition==1?10:25)+this.graph.options.fontSize));this.labelTspan.textContent=this.getLabel();}}},{key:'draw',value:function draw(){var tickWidth=_get(AxisX.prototype.__proto__||Object.getPrototypeOf(AxisX.prototype),'draw',this).apply(this,arguments);this.drawSpecifics();return tickWidth;}/**
	     *  Paints the label, the axis line and anything else specific to x axes
	     */},{key:'drawSpecifics',value:function drawSpecifics(){// Adjusts group shift
//this.group.setAttribute('transform', 'translate(0 ' + this.getShift() + ')');
this.drawLabel();this.line.setAttribute('x1',this.getMinPx());this.line.setAttribute('x2',this.getMaxPx());this.line.setAttribute('y1',0);this.line.setAttribute('y2',0);this.line.setAttribute('stroke',this.getAxisColor());if(!this.top){this.labelTspan.style.dominantBaseline='hanging';this.expTspan.style.dominantBaseline='hanging';this.expTspanExp.style.dominantBaseline='hanging';this.unitTspan.style.dominantBaseline='hanging';this.preunitTspan.style.dominantBaseline='hanging';}var span=this.getSpan();this.line.setAttribute('marker-start',!this.options.splitMarks||span[0]==0?"":"url(#horionzalsplit_"+this.graph.getId()+")");this.line.setAttribute('marker-end',!this.options.splitMarks||span[1]==1?"":"url(#horionzalsplit_"+this.graph.getId()+")");}/**
	     *  @private
	     */},{key:'_draw0Line',value:function _draw0Line(px){if(!this._0line){this._0line=document.createElementNS(this.graph.ns,'line');}this._0line.setAttribute('x1',px);this._0line.setAttribute('x2',px);this._0line.setAttribute('y1',0);this._0line.setAttribute('y2',this.getMaxPx());this._0line.setAttribute('stroke','black');this.groupGrids.appendChild(this._0line);}/**
	     *  @private
	     */},{key:'handleMouseMoveLocal',value:function handleMouseMoveLocal(x,y,e){x-=this.graph.getPaddingLeft();this.mouseVal=this.getVal(x);}/**
	     *  Caches the minimum px and maximum px position of the axis. Includes axis spans and flipping. Mostly used internally
	     */},{key:'setMinMaxFlipped',value:function setMinMaxFlipped(){var interval=this.maxPx-this.minPx;if(isNaN(interval)){return;}var maxPx=interval*this.options.span[1]+this.minPx-this.options.marginMax;var minPx=interval*this.options.span[0]+this.minPx+this.options.marginMin;this.minPxFlipped=this.isFlipped()?maxPx:minPx;this.maxPxFlipped=this.isFlipped()?minPx:maxPx;}},{key:'getZProj',value:function getZProj(zValue){return zValue*this.graph.options.zAxis.shiftX;}}]);return AxisX;}(_graph2.default);exports.default=AxisX;});/***/},/* 10 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(1),__webpack_require__(4),__webpack_require__(3)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.core'),require('./dependencies/eventEmitter/EventEmitter'),require('./graph.util'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.EventEmitter,global.graph);global.graphAxis=mod.exports;}})(this,function(exports,_graph,_EventEmitter,_graph3){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);var _EventEmitter2=_interopRequireDefault(_EventEmitter);var util=_interopRequireWildcard(_graph3);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Default graph parameters
	   * @name AxisOptionsDefault
	   * @object
	   * @static
	   * @memberof Axis
	   * @prop {Boolean} display - Whether to display or not the axis
	   * @prop {Boolean} flipped - Flips the axis (maximum and minimum will be inverted)
	   * @prop {Numner} axisDataSpacing.min - The spacing of the at the bottom of the axis. The value is multiplied by the (max - min) values given by the series (0.1 means 10% of the serie width / height).
	   * @prop {Number} axisDataSpacing.max - The spacing of the at the top of the axis. The value is multiplied by the (max - min) values given by the series (0.1 means 10% of the serie width / height).
	   * @prop {String} unitModification - Used to change the units of the axis in a defined way. Currently, "time" and "time:min.sec" are supported. They will display the value in days, hours, minutes and seconds and the data should be expressed in seconds.
	   * @prop {Boolean} primaryGrid - Whether or not to display the primary grid (on the main ticks)
	   * @prop {Boolean} secondaryGrid - Whether or not to display the secondary grid (on the secondary ticks)
	   * @prop {Number} tickPosition - Sets the position of the ticks with regards to the axis ( 1 = inside, 2 = centered, 3 = outside ).
	   * @prop {Number} nbTicksPrimary - The number of primary ticks to use (approximately)
	   * @prop {Number} nbTicksSecondary - The number of secondary ticks to use (approximately)
	   * @prop {Number} ticklabelratio - Scaling factor on the labels under each primary ticks
	   * @prop {Number} exponentialFactor - Scales the labels under each primary ticks by 10^(exponentialFactor)
	   * @prop {Number} exponentialLabelFactor - Scales the axis label by 10^(exponentialFactor)
	   * @prop {Boolean} logScale - Display the axis in log scale (base 10)
	   * @prop {(Number|Boolean)} forcedMin - Use a number to force the minimum value of the axis (becomes independant of its series)
	   * @prop {(Number|Boolean)} forcedMax - Use a number to force the maximum value of the axis (becomes independant of its series)
	   */var defaults={lineAt0:false,display:true,flipped:false,axisDataSpacing:{min:0.1,max:0.1},unitModification:false,primaryGrid:true,secondaryGrid:true,primaryGridColor:"#f0f0f0",secondaryGridColor:"#f0f0f0",primaryGridWidth:1,secondaryGridWidth:1,shiftToZero:false,tickPosition:1,nbTicksPrimary:3,nbTicksSecondary:10,ticklabelratio:1,exponentialFactor:0,exponentialLabelFactor:0,logScale:false,forcedMin:false,forcedMax:false,span:[0,1],marginMin:0,marginMax:0,scientificScale:false,scientificScaleExponent:false,engineeringScale:false,unit:false,unitWrapperBefore:'',unitWrapperAfter:'',splitMarks:false,useKatexForLabel:false};/**
	   * Axis constructor. Usually not instanced directly, but for custom made axes, that's possible
	   * @class Axis
	   * @static
	   * @augments EventEmitter
	   * @example function myAxis() {};
	   * myAxis.prototype = new Graph.getConstructor("axis");
	   * graph.setBottomAxis( new myAxis( { } ) );
	   */var Axis=function(_EventEmitter2$defaul2){_inherits(Axis,_EventEmitter2$defaul2);function Axis(){_classCallCheck(this,Axis);return _possibleConstructorReturn(this,(Axis.__proto__||Object.getPrototypeOf(Axis)).call(this));}_createClass(Axis,[{key:'init',value:function init(graph,options,overwriteoptions){var _this17=this;this.unitModificationTimeTicks=[[1,[1,2,5,10,20,30]],[60,[1,2,5,10,20,30]],[3600,[1,2,6,12]],[3600*24,[1,2,3,4,5,10,20,40]]];this.graph=graph;this.options=util.extend(true,{},defaults,overwriteoptions,options);this.group=document.createElementNS(this.graph.ns,'g');this.hasChanged=true;this.rectEvent=document.createElementNS(this.graph.ns,'rect');this.rectEvent.setAttribute('pointer-events','fill');this.rectEvent.setAttribute('fill','transparent');this.group.appendChild(this.rectEvent);this.graph.axisGroup.appendChild(this.group);// Adds to the main axiszone
this.line=document.createElementNS(this.graph.ns,'line');this.line.setAttribute('stroke','black');this.line.setAttribute('shape-rendering','crispEdges');this.line.setAttribute('stroke-linecap','square');this.groupTicks=document.createElementNS(this.graph.ns,'g');this.groupTickLabels=document.createElementNS(this.graph.ns,'g');this.group.appendChild(this.groupTicks);this.group.appendChild(this.groupTickLabels);this.group.appendChild(this.line);this.labelValue;this.label=document.createElementNS(this.graph.ns,'text');this.labelTspan=document.createElementNS(this.graph.ns,'tspan');// Contains the main label
this.preunitTspan=document.createElementNS(this.graph.ns,'tspan');// Contains the scaling unit
this.unitTspan=document.createElementNS(this.graph.ns,'tspan');// Contains the unit
this.expTspan=document.createElementNS(this.graph.ns,'tspan');// Contains the exponent (x10)
this.expTspanExp=document.createElementNS(this.graph.ns,'tspan');// Contains the exponent value
this.label.appendChild(this.labelTspan);this.label.appendChild(this.preunitTspan);this.label.appendChild(this.unitTspan);this.label.appendChild(this.expTspan);this.label.appendChild(this.expTspanExp);this.preunitTspan.setAttribute('dx',6);this.expTspan.setAttribute('dx',6);this.expTspanExp.setAttribute('dy',-5);this.expTspanExp.setAttribute('font-size',"0.8em");this.label.setAttribute('text-anchor','middle');this.setTickPosition(this.options.tickPosition);this.gridLinePath={primary:"",secondary:""};this.gridPrimary=document.createElementNS(this.graph.ns,"path");this.gridSecondary=document.createElementNS(this.graph.ns,"path");this.graph.groupPrimaryGrids.appendChild(this.gridPrimary);this.graph.groupSecondaryGrids.appendChild(this.gridSecondary);this.setGridLinesStyle();this.group.appendChild(this.label);this.groupSeries=document.createElementNS(this.graph.ns,'g');this.group.appendChild(this.groupSeries);this.widthHeightTick=0;this.ticks={};this.ticksLabels=[];this.tickScaling={1:3,2:2,3:1,4:0.5};this.currentTick={};this.lastCurrentTick={};this.series=[];this.totalDelta=0;this.currentAction=false;this.group.addEventListener('mousemove',function(e){e.preventDefault();var coords=_this17.graph._getXY(e);_this17.handleMouseMoveLocal(coords.x,coords.y,e);for(var i=0,l=_this17.series.length;i<l;i++){_this17.series[i].handleMouseMove(false,true);}});this.labels=[];this.group.addEventListener('click',function(e){e.preventDefault();var coords=_this17.graph._getXY(e);_this17.addLabel(_this17.getVal(coords.x-_this17.graph.getPaddingLeft()));});this.axisRand=Math.random();this.clip=document.createElementNS(this.graph.ns,'clipPath');this.clip.setAttribute('id','_clip'+this.axisRand);this.graph.defs.appendChild(this.clip);this.clipRect=document.createElementNS(this.graph.ns,'rect');this.clip.appendChild(this.clipRect);this.clip.setAttribute('clipPathUnits','userSpaceOnUse');this.graph._axisHasChanged(this);}},{key:'handleMouseMoveLocal',value:function handleMouseMoveLocal(){}/**
	     * Hides the axis
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */},{key:'hide',value:function hide(){this.options.display=false;return this;}/**
	     * Shows the axis
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */},{key:'show',value:function show(){this.options.display=true;return this;}/**
	     * Shows or hides the axis
	     * @memberof Axis
	     * @param {Boolean} display - true to display the axis, false to hide it
	     * @return {Axis} The current axis
	     */},{key:'setDisplay',value:function setDisplay(bool){this.options.display=!!bool;return this;}/**
	     * @memberof Axis
	     * @return {Boolean} A boolean indicating the displayed state of the axis
	     */},{key:'isDisplayed',value:function isDisplayed(){return this.options.display;}},{key:'isShown',value:function isShown(){return this.isDisplayed.apply(this,arguments);}},{key:'kill',value:function kill(noRedraw,noSerieKill){this.graph.killAxis(this,noRedraw,noSerieKill);}/**
	     * Forces the appearence of a straight perpendicular line at value 0
	     * @param {Boolean} lineAt0 - true to display the line, false not to.
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */},{key:'setLineAt0',value:function setLineAt0(bool){this.options.lineAt0=!!bool;}// Used to adapt the 0 of the axis to the zero of another axis that has the same direction
/**
	     * Aligns ```thisValue``` of the axis to ```foreignValue``` of another axis
	     * @param {(Axis|Boolean)} axis - The axis with which the 0 should be aligned. Use "false" to deactivate the adapt to 0 mode.
	     * @param {Number} thisValue - The value of the current axis that should be aligned
	     * @param {Number} foreignValue - The value of the reference axis that should be aligned
	     * @param {String} preference - "min" or "max". Defined the boundary that should behave the more normally
	     * @memberof Axis
	     * @return {Axis} The current axis
	     * @since 1.13.2
	     */},{key:'adaptTo',value:function adaptTo(axis,thisValue,foreignValue,preference){if(!axis){this.options.adaptTo=false;return this;}this.options.adaptTo={axis:axis,thisValue:thisValue,foreignValue:foreignValue,preference:preference};this.adapt();return this;}/**
	     * Adapts maximum and minimum of the axis if options.adaptTo is defined
	     * @memberof Axis
	     * @returns {Axis} The current axis
	     * @since 1.13.2
	     */},{key:'adapt',value:function adapt(){if(!this.options.adaptTo){return;}if(!axis)var val;var axis=this.options.adaptTo.axis,current=this.options.adaptTo.thisValue,foreign=this.options.adaptTo.foreignValue;if(axis.currentAxisMin===undefined||axis.currentAxisMax===undefined){axis.setMinMaxToFitSeries();}if(this.options.forcedMin!==false&&this.options.forcedMax==false||this.options.adaptTo.preference!=="max"){if(this.options.forcedMin!==false){this.currentAxisMin=this.options.forcedMin;}else{this.currentAxisMin=this._zoomed?this.getCurrentMin():this.getMinValue()-(current-this.getMinValue())*(this.options.axisDataSpacing.min*(axis.getCurrentMax()-axis.getCurrentMin())/(foreign-axis.getCurrentMin()));}if(this.currentAxisMin==current){this.currentAxisMin-=this.options.axisDataSpacing.min*this.getInterval();}var use=this.options.forcedMin!==false?this.options.forcedMin:this.currentAxisMin;this.currentAxisMax=(current-use)*(axis.getCurrentMax()-axis.getCurrentMin())/(foreign-axis.getCurrentMin())+use;}else{if(this.options.forcedMax!==false){this.currentAxisMax=this.options.forcedMax;}else{this.currentAxisMax=this._zoomed?this.getCurrentMax():this.getMaxValue()+(this.getMaxValue()-current)*(this.options.axisDataSpacing.max*(axis.getCurrentMax()-axis.getCurrentMin())/(axis.getCurrentMax()-foreign));}if(this.currentAxisMax==current){this.currentAxisMax+=this.options.axisDataSpacing.max*this.getInterval();}var use=this.options.forcedMax!==false?this.options.forcedMax:this.currentAxisMax;this.currentAxisMin=(current-use)*(axis.getCurrentMin()-axis.getCurrentMax())/(foreign-axis.getCurrentMax())+use;}this.graph._axisHasChanged(this);}// Floating axis. Adapts axis position orthogonally to another axis at a defined value. Not taken into account for margins
/**
	     * Makes the axis floating (not aligned to the right or the left anymore). You need to specify another axis (perpendicular) and a value at which this axis should be located
	     * @param {Axis} axis - The axis on which the current axis should be aligned to
	     * @param {Number} value - The value on which the current axis should be aligned
	     * @memberof Axis
	     * @return {Axis} The current axis
	     * @example graph.getYAxis().setFloat( graph.getBottomAxis(), 0 ); // Alignes the y axis with the origin of the bottom axis
	     */},{key:'setFloating',value:function setFloating(axis,value){this.floating=true;this.floatingAxis=axis;this.floatingValue=value;return this;}/**
	     * @memberof Axis
	     * @return {Axis} The axis referencing the floating value of the current axis
	     */},{key:'getFloatingAxis',value:function getFloatingAxis(){return this.floatingAxis;}/**
	     * @memberof Axis
	     * @return {Axis} The value to which the current axis is aligned to
	     */},{key:'getFloatingValue',value:function getFloatingValue(){return this.floatingValue;}/**
	     * Sets the axis data spacing
	     * @memberof Axis
	     * @see AxisOptionsDefault
	     * @param {Number} min - The spacing at the axis min value
	     * @param {Number} [ max = min ] - The spacing at the axis max value. If omitted, will be equal to the "min" parameter
	     * @return {Axis} The current axis
	     */},{key:'setAxisDataSpacing',value:function setAxisDataSpacing(val1,val2){this.options.axisDataSpacing.min=val1;this.options.axisDataSpacing.max=val2||val1;return this;}},{key:'dataSpacing',value:function dataSpacing(){return this.setAxisDataSpacing.apply(this,arguments);}/**
	     * Sets the axis data spacing at the minimum of the axis
	     * @memberof Axis
	     * @see AxisOptionsDefault
	     * @param {Number} min - The spacing at the axis min value
	     * @return {Axis} The current axis
	     */},{key:'setAxisDataSpacingMin',value:function setAxisDataSpacingMin(val){this.options.axisDataSpacing.min=val;}/**
	     * Sets the axis data spacing at the maximum of the axis
	     * @memberof Axis
	     * @see AxisOptionsDefault
	     * @param {Number} max - The spacing at the axis max value
	     * @return {Axis} The current axis
	     */},{key:'setAxisDataSpacingMax',value:function setAxisDataSpacingMax(val){this.options.axisDataSpacing.max=val;}},{key:'setMinPx',value:function setMinPx(px){this.minPx=px;this.setMinMaxFlipped();}},{key:'setMaxPx',value:function setMaxPx(px){this.maxPx=px;this.setMinMaxFlipped();}/**
	     * @memberof Axis
	     * @return {Number} The position in px of the bottom of the axis
	     */},{key:'getMinPx',value:function getMinPx(){return this.minPxFlipped;}/**
	     * @memberof Axis
	     * @return {Number} The position in px of the top of the axis
	     */},{key:'getMaxPx',value:function getMaxPx(px){return this.maxPxFlipped;}},{key:'getMathMaxPx',value:function getMathMaxPx(){return this.maxPx;}},{key:'getMathMinPx',value:function getMathMinPx(){return this.minPx;}// Returns the true minimum of the axis. Either forced in options or the one from the data
/**
	     * Retrieves the minimum possible value of the axis. Can be set by "forcedMin", "adapt0ToAxis" or by the values of the series the axis contains. Does not take into account any zooming.
	     * @memberof Axis
	     * @return {Number} The minimum possible value of the axis
	     */},{key:'getMinValue',value:function getMinValue(){return this.options.forcedMin!==false?this.options.forcedMin:this.dataMin;}/**
	     * Retrieves the maximum possible value of the axis. Can be set by "forcedMax", "adapt0ToAxis" or by the values of the series the axis contains. Does not take into account any zooming.
	     * @memberof Axis
	     * @return {Number} The maximum possible value of the axis
	     */},{key:'getMaxValue',value:function getMaxValue(){return this.options.forcedMax!==false?this.options.forcedMax:this.dataMax;}},{key:'setMinValueData',value:function setMinValueData(min){this.dataMin=min;}},{key:'setMaxValueData',value:function setMaxValueData(max){this.dataMax=max;}/**
	     * Retrieves the maximum possible value of the axis based only on the data. Does not take into account the possible axis forcing
	     * @memberof Axis
	     * @return {Number} The maximum possible value of the axis
	     */},{key:'getDataMax',value:function getDataMax(){return this.dataMax;}/**
	     * Retrieves the minimum possible value of the axis based only on the data. Does not take into account the possible axis forcing
	     * @memberof Axis
	     * @return {Number} The minimum possible value of the axis
	     */},{key:'getDataMin',value:function getDataMin(){return this.dataMin;}/**
	     * Forces the minimum value of the axis (no more dependant on the serie values)
	     * @memberof Axis
	     * @param {Number} min - The minimum value of the axis
	     * @param {Boolean} noRescale - ```true``` to prevent the axis to rescale to set this minimum. Rescales anyway if current min is lower than the value
	     * @return {Axis} The current axis
	     */},{key:'forceMin',value:function forceMin(min,noRescale){this.options.forcedMin=min;this.setCurrentMin(noRescale?this.getCurrentMin():undefined);this.graph._axisHasChanged(this);return this;}/**
	     * Forces the maximum value of the axis (no more dependant on the serie values).
	     * @memberof Axis
	     * @param {Number} max - The maximum value of the axis
	     * @param {Boolean} noRescale - ```true``` to prevent the axis to rescale to set this maximum. Rescales anyway if current max is higher than the value
	     * @return {Axis} The current axis
	     */},{key:'forceMax',value:function forceMax(max,noRescale){this.options.forcedMax=max;this.setCurrentMax(noRescale?this.getCurrentMax():undefined);this.graph._axisHasChanged(this);return this;}/**
	     * Retrieves the forced minimum of the axis
	     * @memberof Axis
	     * @return {Number} The maximum possible value of the axis
	     */},{key:'getForcedMin',value:function getForcedMin(){return this.options.forcedMin;}/**
	     * Retrieves the forced minimum of the axis
	     * @memberof Axis
	     * @return {Number} The maximum possible value of the axis
	     */},{key:'getForcedMax',value:function getForcedMax(){return this.options.forcedMax;}/**
	     * Forces the min and max values of the axis to the min / max values of another axis
	     * @param {Axis} axis - The axis from which the min / max values are retrieved.
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */},{key:'forceToAxis',value:function forceToAxis(axis){if(axis.getMaxValue&&axis.getMinValue){this.options.forcedMin=axis.getMinValue();this.options.forcedMax=axis.getMaxValue();}return this;}},{key:'getNbTicksPrimary',value:function getNbTicksPrimary(){return this.options.nbTicksPrimary;}},{key:'setNbTicksPrimary',value:function setNbTicksPrimary(nb){this.options.nbTicksPrimary=nb;}},{key:'getNbTicksSecondary',value:function getNbTicksSecondary(){return this.options.nbTicksSecondary;}},{key:'handleMouseMove',value:function handleMouseMove(px,e){this.mouseVal=this.getVal(px);}},{key:'handleMouseWheel',value:function handleMouseWheel(delta,e,baseline){delta=Math.min(0.2,Math.max(-0.2,delta));if(baseline=="min"){baseline=this.getMinValue();}else if(baseline=="max"){baseline=this.getMaxValue();}else if(!baseline){baseline=0;}this._doZoomVal((this.getCurrentMax()-baseline)*(1+delta)+baseline,(this.getCurrentMin()-baseline)*(1+delta)+baseline);this.graph.draw();//	this.graph.drawSeries(true);
}},{key:'zoom',/**
	     * Performs a zoom on the axis, without redraw afterwards
	     * @param {Number} val1 - The new axis minimum
	     * @param {Number} val2 - The new axis maximum
	     * @memberof Axis
	     * @return {Axis} The current axis
	     * @example
	     * graph.getBottomAxis().zoom( 50, 70 ); // Axis boundaries will be 50 and 70 after next redraw
	     * graph.redraw();
	     * @example
	     * graph.getBottomAxis().forceMin( 0 ).forceMax( 100 ).zoom( 50, 70 );  // Axis boundaries will be 50 and 70 after next redraw
	     * graph.draw();
	     * graph.autoscaleAxes(); // New bottom axis boundaries will be 0 and 100, not 50 and 70 !
	     * graph.draw();
	     */value:function zoom(val1,val2,forceLock){if(!forceLock&&this.zoomLock){return;}return this._doZoomVal(val1,val2,true);}},{key:'_doZoomVal',value:function _doZoomVal(val1,val2,mute){return this._doZoom(this.getPx(val1),this.getPx(val2),val1,val2,mute);}},{key:'_doZoom',value:function _doZoom(px1,px2,val1,val2,mute){//if(this.options.display || 1 == 1) {
var val1=val1!==undefined?val1:this.getVal(px1);var val2=val2!==undefined?val2:this.getVal(px2);this.setCurrentMin(Math.min(val1,val2));this.setCurrentMax(Math.max(val1,val2));this.cacheCurrentMin();this.cacheCurrentMax();this.cacheInterval();this._zoomed=true;this.adapt();this._hasChanged=true;// New method
if(!mute){this.emit("zoom",[this.currentAxisMin,this.currentAxisMax,this]);}return this;}},{key:'getSerieShift',value:function getSerieShift(){return this._serieShift;}},{key:'getSerieScale',value:function getSerieScale(){return this._serieScale;}},{key:'getMouseVal',value:function getMouseVal(){return this.mouseVal;}},{key:'getUnitPerTick',value:function getUnitPerTick(px,nbTick,valrange){var umin;var pxPerTick=px/nbTicks;// 1000 / 100 = 10 px per tick
if(!nbTick){nbTick=px/10;}else{nbTick=Math.min(nbTick,px/10);}// So now the question is, how many units per ticks ?
// Say, we have 0.0004 unit per tick
var unitPerTick=valrange/nbTick;switch(this.options.unitModification){case'time':case'time:min.sec':var max=this.getModifiedValue(this.getMaxValue()),units=[[60,'min'],[3600,'h'],[3600*24,'d']];if(max<3600){// to minutes
umin=0;}else if(max<3600*24){umin=1;}else{umin=2;}var breaked=false;for(var i=0,l=this.unitModificationTimeTicks.length;i<l;i++){for(var k=0,m=this.unitModificationTimeTicks[i][1].length;k<m;k++){if(unitPerTick<this.unitModificationTimeTicks[i][0]*this.unitModificationTimeTicks[i][1][k]){breaked=true;break;}}if(breaked){break;}}//i and k contain the good variable;
if(i!==this.unitModificationTimeTicks.length){unitPerTickCorrect=this.unitModificationTimeTicks[i][0]*this.unitModificationTimeTicks[i][1][k];}else{unitPerTickCorrect=1;}break;default:// We take the log
var decimals=Math.floor(Math.log(unitPerTick)/Math.log(10));/*
	          Example:
	          13'453 => Math.log10() = 4.12 => 4
	          0.0000341 => Math.log10() = -4.46 => -5
	          */var numberToNatural=unitPerTick*Math.pow(10,-decimals);/*
	          Example:
	          13'453 (4) => 1.345
	          0.0000341 (-5) => 3.41
	          */this.decimals=-decimals;var possibleTicks=[1,2,5,10];var closest=false;for(var i=possibleTicks.length-1;i>=0;i--){if(!closest||Math.abs(possibleTicks[i]-numberToNatural)<Math.abs(closest-numberToNatural)){closest=possibleTicks[i];}}// Ok now closest is the number of unit per tick in the natural number
/*
	          Example:
	          13'453 (4) (1.345) => 1
	          0.0000341 (-5) (3.41) => 5
	          */// Let's scale it back
var unitPerTickCorrect=closest*Math.pow(10,decimals);/*
	          Example:
	          13'453 (4) (1.345) (1) => 10'000
	          0.0000341 (-5) (3.41) (5) => 0.00005
	          */break;}var nbTicks=valrange/unitPerTickCorrect;var pxPerTick=px/nbTick;return[unitPerTickCorrect,nbTicks,pxPerTick];}/**
	     * Resets the min and max of the serie to fit the series it contains
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */},{key:'setMinMaxToFitSeries',value:function setMinMaxToFitSeries(noNotify){var interval=this.getInterval();if(this.options.logScale){this.currentAxisMin=Math.max(1e-50,this.getMinValue()*0.9);this.currentAxisMax=Math.max(1e-50,this.getMaxValue()*1.1);}else{this.currentAxisMin=this.getMinValue();this.currentAxisMax=this.getMaxValue();if(this.getForcedMin()===false){this.currentAxisMin-=this.options.axisDataSpacing.min*interval;}if(this.getForcedMax()===false){this.currentAxisMax+=this.options.axisDataSpacing.max*interval;}}if(isNaN(this.currentAxisMin)||isNaN(this.currentAxisMax)){this.currentAxisMax=undefined;this.currentAxisMin=undefined;}this.cacheCurrentMin();this.cacheCurrentMax();this.cacheInterval();this._zoomed=false;this.adapt();if(!noNotify){this.graph._axisHasChanged(this);}this.emit("zoomOutFull",[this.currentAxisMin,this.currentAxisMax,this]);return this;}/**
	     * @memberof Axis
	     * @return {Number} the maximum interval ( max - min ) of the axis ( not nessarily the current one )
	     */},{key:'getInterval',value:function getInterval(){return this.getMaxValue()-this.getMinValue();}/**
	     * @memberof Axis
	     * @return {Number} the maximum interval ( max - min ) of the axis ( not nessarily the current one )
	     */},{key:'getCurrentInterval',value:function getCurrentInterval(){return this.cachedInterval;}/**
	     * @memberof Axis
	     * @return {Number} The current minimum value of the axis
	     */},{key:'getCurrentMin',value:function getCurrentMin(){return this.cachedCurrentMin;}/**
	     * @memberof Axis
	     * @return {Number} The current maximum value of the axis
	     */},{key:'getCurrentMax',value:function getCurrentMax(){return this.cachedCurrentMax;}/**
	     * Caches the current axis minimum
	     * @memberof Axis
	     */},{key:'cacheCurrentMin',value:function cacheCurrentMin(){this.cachedCurrentMin=this.currentAxisMin==this.currentAxisMax?this.options.logScale?this.currentAxisMin/10:this.currentAxisMin-1:this.currentAxisMin;}/**
	     * Caches the current axis maximum
	     * @memberof Axis
	     */},{key:'cacheCurrentMax',value:function cacheCurrentMax(){this.cachedCurrentMax=this.currentAxisMax==this.currentAxisMin?this.options.logScale?this.currentAxisMax*10:this.currentAxisMax+1:this.currentAxisMax;}/**
	     * Caches the current interval
	     * @memberof Axis
	     */},{key:'cacheInterval',value:function cacheInterval(){this.cachedInterval=this.cachedCurrentMax-this.cachedCurrentMin;}/**
	     * Sets the current minimum value of the axis. If lower that the forced value, the forced value is used
	     * @memberof Axis
	     * @param {Number} val - The new minimum value
	     * @return {Axis} The current axis
	     */},{key:'setCurrentMin',value:function setCurrentMin(val){if(val===undefined||this.getForcedMin()!==false&&val<this.getForcedMin()){val=this.getMinValue();}this.currentAxisMin=val;if(this.options.logScale){this.currentAxisMin=Math.max(1e-50,val);}this.graph._axisHasChanged(this);return this;}/**
	     * Sets the current maximum value of the axis. If higher that the forced value, the forced value is used
	     * @memberof Axis
	     * @param {Number} val - The new maximum value
	     * @return {Axis} The current axis
	     */},{key:'setCurrentMax',value:function setCurrentMax(val){if(val===undefined||this.getForcedMax()!==false&&val>this.getForcedMax()){val=this.getMaxValue();}this.currentAxisMax=val;if(this.options.logScale){this.currentAxisMax=Math.max(1e-50,val);}this.graph._axisHasChanged(this);}/**
	     * Sets the flipping state of the axis. If enabled, the axis is descending rather than ascending.
	     * @memberof Axis
	     * @param {Boolean} flip - The new flipping state of the axis
	     * @return {Axis} The current axis
	     */},{key:'flip',value:function flip(_flip){this.options.flipped=_flip;this.setMinMaxFlipped();return this;}/*
	      setMinMaxFlipped() {
	         var interval = this.maxPx - this.minPx;
	        var maxPx = this.maxPx - interval * this.options.span[ 0 ];
	        var minPx = this.maxPx - interval * this.options.span[ 1 ];
	         this.minPxFlipped = this.isFlipped() ? maxPx : minPx;
	        this.maxPxFlipped = this.isFlipped() ? minPx : maxPx;
	         // this.minPx = minPx;
	        //this.maxPx = maxPx;
	      }
	    *//**
	     * @memberof Axis
	     * @return {Boolean} The current flipping state of the axis
	     */},{key:'isFlipped',value:function isFlipped(){return this.options.flipped;}},{key:'_draw',value:function _draw(){// Redrawing of the axis
var self=this;var visible;//    this.drawInit();
this.cacheCurrentMax();this.cacheCurrentMin();this.cacheInterval();if(this.currentAxisMin==undefined||this.currentAxisMax==undefined){this.setMinMaxToFitSeries(true);// We reset the min max as a function of the series
}//   this.setSlaveAxesBoundaries();
// The data min max is stored in this.dataMin, this.dataMax
//var widthPx = this.maxPx - this.minPx;
var widthPx=Math.abs(this.getMaxPx()-this.getMinPx());var valrange=this.getCurrentInterval();/* Number of px per unit *//* Example: width: 1000px
	      /* 			10 - 100 => 11.11
	      /*			0 - 2 => 500
	      /*			0 - 0.00005 => 20'000'000
	      */if(!this.options.display){this.line.setAttribute('display','none');return 0;}this.line.setAttribute('display','block');if(this.options.scientificScale==true){if(this.options.scientificScaleExponent){this.scientificExponent=this.options.scientificScaleExponent;}else{this.scientificExponent=Math.floor(Math.log(Math.max(Math.abs(this.getCurrentMax()),Math.abs(this.getCurrentMin())))/Math.log(10));}}else{this.scientificExponent=0;}/************************************//*** DRAWING LABEL ******************//************************************/this.gridLinePath.primary="";this.gridLinePath.secondary="";/*
	      var label;
	      if ( label = this.getLabel() ) {
	        // Sets the label
	        this.labelTspan.textContent = label;
	      }
	      */var letter=void 0;if(!this.options.useKatexForLabel||!this.graph.hasKatexRenderer()){this.writeUnit();if(this.options.unitDecade&&this.options.unit&&this.scientificExponent!==0&&(this.scientificExponent=this.getEngineeringExponent(this.scientificExponent))&&(letter=this.getExponentGreekLetter(this.scientificExponent))){this.preunitTspan.innerHTML=letter;this.preunitTspan.setAttribute('display','visible');this.unitTspan.setAttribute('dx',0);}else if(this.scientificExponent!==0&&!isNaN(this.scientificExponent)){if(this.options.engineeringScale){this.scientificExponent=this.getEngineeringExponent(this.scientificExponent);}this.preunitTspan.textContent="";this.preunitTspan.setAttribute('display','none');this.expTspan.setAttribute('display','visible');this.expTspanExp.setAttribute('display','visible');this.expTspan.textContent="x10";this.expTspanExp.textContent=this.scientificExponent;}else{if(!this.options.unit){this.unitTspan.setAttribute('display','none');}this.preunitTspan.setAttribute('display','none');this.expTspan.setAttribute('display','none');this.expTspanExp.setAttribute('display','none');}}else{var string=this.getLabel(),domEl=void 0;if(this.options.unitDecade&&this.options.unit&&this.scientificExponent!==0&&(this.scientificExponent=this.getEngineeringExponent(this.scientificExponent))&&(letter=this.getExponentGreekLetter(this.scientificExponent))){string+=letter;this.preunitTspan.innerHTML=letter;this.preunitTspan.setAttribute('display','visible');this.unitTspan.setAttribute('dx',0);string+=" "+letter+" "+this.options.unit;}else if(this.scientificExponent!==0&&!isNaN(this.scientificExponent)){if(this.options.engineeringScale){this.scientificExponent=this.getEngineeringExponent(this.scientificExponent);}string+=" \\cdot 10^"+this.scientificExponent+" "+this.options.unit;}this.katexElement=this.graph.renderWithKatex(string,this.katexElement);}if(!this.options.hideTicks){this.resetTicksLength();if(this.linkedToAxis){// px defined, linked to another axis
this.linkedToAxis.deltaPx=10;var widthHeight=this.drawLinkedToAxisTicksWrapper(widthPx,valrange);}else if(!this.options.logScale){// So the setting is: How many ticks in total ? Then we have to separate it
var widthHeight=this.drawLinearTicksWrapper(widthPx,valrange);}else{var widthHeight=this.drawLogTicks();}}else{var widthHeight=0;}this.removeUselessTicks();this.removeUselessTickLabels();this.gridPrimary.setAttribute('d',this.gridLinePath.primary);this.gridSecondary.setAttribute('d',this.gridLinePath.secondary);// Looks for axes linked to this current axis
var axes=this.graph.findAxesLinkedTo(this);axes.map(function(axis){if(!axis.linkedToAxis){return;}axis.setMinPx(self.getMinPx());axis.setMaxPx(self.getMaxPx());axis.draw();});/************************************//*** DRAW CHILDREN IMPL SPECIFIC ****//************************************///   this.drawSpecifics();
if(this.options.lineAt0&&this.getCurrentMin()<0&&this.getCurrentMax()>0){this._draw0Line(this.getPx(0));}return widthHeight;}},{key:'writeUnit',value:function writeUnit(){if(this.options.unit){this.unitTspan.setAttribute('display','visible');this.unitTspan.setAttribute('dx',5);this.expTspan.setAttribute('display','none');this.expTspanExp.setAttribute('display','none');this.unitTspan.innerHTML=this.options.unitWrapperBefore+this.options.unit.replace(/\^([-+0-9]*)/g,"<tspan dy='-5' font-size='0.7em'>$1</tspan>")+this.options.unitWrapperAfter;}else{this.unitTspan.setAttribute('display','none');}}},{key:'getExponentGreekLetter',value:function getExponentGreekLetter(val){switch(val){case 3:return"k";break;case 6:return"M";break;case 9:return'G';break;case 12:return"T";break;case 15:return"E";break;case-3:return"m";break;case-6:return"&mu;";break;case-9:return'n';break;case-12:return'p';break;case-15:return'f';break;}}},{key:'drawLinearTicksWrapper',value:function drawLinearTicksWrapper(widthPx,valrange){var tickPrimaryUnit=void 0;if(this.options.primaryTickUnit){tickPrimaryUnit=this.options.primaryTickUnit;}else{tickPrimaryUnit=this.getUnitPerTick(widthPx,this.getNbTicksPrimary(),valrange)[0];if(this.options.maxPrimaryTickUnit&&this.options.maxPrimaryTickUnit<tickPrimaryUnit){tickPrimaryUnit=this.options.maxPrimaryTickUnit;}else if(this.options.minPrimaryTickUnit&&this.options.minPrimaryTickUnit>tickPrimaryUnit){tickPrimaryUnit=this.options.minPrimaryTickUnit;}}// We need to get here the width of the ticks to display the axis properly, with the correct shift
return this.drawTicks(tickPrimaryUnit,this.secondaryTicks());}},{key:'forcePrimaryTickUnit',value:function forcePrimaryTickUnit(primaryInterval){this.options.primaryTickUnit=primaryInterval;}},{key:'forcePrimaryTickUnitMax',value:function forcePrimaryTickUnitMax(value){this.options.maxPrimaryTickUnit=value;}},{key:'forcePrimaryTickUnitMin',value:function forcePrimaryTickUnitMin(value){this.options.minPrimaryTickUnit=value;}},{key:'getPrimaryTickUnit',value:function getPrimaryTickUnit(){return this.incrTick;}},{key:'setTickLabelRatio',value:function setTickLabelRatio(tickRatio){this.options.ticklabelratio=tickRatio;}},{key:'draw',value:function draw(){this._widthLabels=0;var drawn=this._draw();this._widthLabels+=drawn;return drawn;}},{key:'drawTicks',value:function drawTicks(primary,secondary){var unitPerTick=primary,min=this.getCurrentMin(),max=this.getCurrentMax(),widthHeight=0,secondaryIncr,incrTick,subIncrTick,loop=0;if(secondary){secondaryIncr=unitPerTick/secondary;}incrTick=this.options.shiftToZero?this.dataMin-Math.ceil((this.dataMin-min)/unitPerTick)*unitPerTick:Math.floor(min/unitPerTick)*unitPerTick;this.incrTick=primary;while(incrTick<=max){loop++;if(loop>200){break;}if(secondary){subIncrTick=incrTick+secondaryIncr;this.subIncrTick=subIncrTick;//widthHeight = Math.max(widthHeight, this.drawTick(subIncrTick, 1));
var loop2=0;while(subIncrTick<incrTick+unitPerTick){loop2++;if(loop2>100){break;}if(subIncrTick<min||subIncrTick>max){subIncrTick+=secondaryIncr;continue;}this.drawTickWrapper(subIncrTick,false,Math.abs(subIncrTick-incrTick-unitPerTick/2)<1e-4?2:3);subIncrTick+=secondaryIncr;}}if(incrTick<min||incrTick>max){incrTick+=primary;continue;}this.drawTickWrapper(incrTick,true,1);incrTick+=primary;}this.widthHeightTick=this.getMaxSizeTick();return this.widthHeightTick;}},{key:'nextTick',value:function nextTick(level,callback){this.ticks[level]=this.ticks[level]||[];this.lastCurrentTick[level]=this.lastCurrentTick[level]||0;this.currentTick[level]=this.currentTick[level]||0;if(this.currentTick[level]>=this.ticks[level].length){var tick=document.createElementNS(this.graph.ns,'line');this.groupTicks.appendChild(tick);this.ticks[level].push(tick);callback(tick);}var tick=this.ticks[level][this.currentTick[level]];if(this.currentTick[level]>=this.lastCurrentTick[level]){tick.setAttribute('display','visible');}this.currentTick[level]++;return tick;}},{key:'nextTickLabel',value:function nextTickLabel(callback){this.ticksLabels=this.ticksLabels||[];this.lastCurrentTickLabel=this.lastCurrentTickLabel||0;this.currentTickLabel=this.currentTickLabel||0;if(this.currentTickLabel>=this.ticksLabels.length){var tickLabel=document.createElementNS(this.graph.ns,'text');this.groupTickLabels.appendChild(tickLabel);this.ticksLabels.push(tickLabel);callback(tickLabel);}var tickLabel=this.ticksLabels[this.currentTickLabel];if(this.currentTickLabel>=this.lastCurrentTickLabel){tickLabel.setAttribute('display','visible');}this.currentTickLabel++;return tickLabel;}},{key:'removeUselessTicks',value:function removeUselessTicks(){for(var j in this.currentTick){for(var i=this.currentTick[j];i<this.ticks[j].length;i++){this.ticks[j][i].setAttribute('display','none');}this.lastCurrentTick[j]=this.currentTick[j];this.currentTick[j]=0;}}},{key:'removeUselessTickLabels',value:function removeUselessTickLabels(){for(var i=this.currentTickLabel;i<this.ticksLabels.length;i++){this.ticksLabels[i].setAttribute('display','none');}this.lastCurrentTickLabel=this.currentTickLabel;this.currentTickLabel=0;}/*
	      doGridLine() {
	        var gridLine = document.createElementNS( this.graph.ns, 'line' );
	        this.groupGrids.appendChild( gridLine );
	        return gridLine;
	      };*/},{key:'nextGridLine',value:function nextGridLine(primary,x1,x2,y1,y2){if(!(primary&&this.options.primaryGrid||!primary&&this.options.secondaryGrid)){return;}this.gridLinePath[primary?"primary":"secondary"]+="M "+x1+" "+y1+" L "+x2+" "+y2;}},{key:'setGridLineStyle',value:function setGridLineStyle(gridLine,primary){gridLine.setAttribute('shape-rendering','crispEdges');gridLine.setAttribute('stroke',primary?this.getPrimaryGridColor():this.getSecondaryGridColor());gridLine.setAttribute('stroke-width',primary?this.getPrimaryGridWidth():this.getSecondaryGridWidth());gridLine.setAttribute('stroke-opacity',primary?this.getPrimaryGridOpacity():this.getSecondaryGridOpacity());var dasharray;if(dasharray=primary?this.getPrimaryGridDasharray():this.getSecondaryGridDasharray()){gridLine.setAttribute('stroke-dasharray',dasharray);}}},{key:'setGridLinesStyle',value:function setGridLinesStyle(){this.setGridLineStyle(this.gridPrimary,true);this.setGridLineStyle(this.gridSecondary,false);return this;}},{key:'resetTicksLength',value:function resetTicksLength(){}},{key:'secondaryTicks',value:function secondaryTicks(){return this.options.nbTicksSecondary;}},{key:'drawLogTicks',value:function drawLogTicks(){var min=this.getCurrentMin(),max=this.getCurrentMax();var incr=Math.min(min,max);var max=Math.max(min,max);if(incr<1e-50){incr=1e-50;}if(Math.log(incr)-Math.log(max)>20){max=Math.pow(10,Math.log(incr)*20);}var optsMain={fontSize:'1.0em',exponential:true,overwrite:false};if(incr<0)incr=0;var pow=incr==0?0:Math.floor(Math.log(incr)/Math.log(10));var incr=1,k=0,val;while((val=incr*Math.pow(10,pow))<max){if(incr==1){// Superior power
if(val>min)this.drawTickWrapper(val,true,1,optsMain);}if(incr==10){incr=1;pow++;}else{if(incr!=1&&val>min){this.drawTickWrapper(val,false,2,{overwrite:"",fontSize:'0.6em'});}incr++;}}this.widthHeightTick=this.getMaxSizeTick();return this.widthHeightTick;}},{key:'drawTickWrapper',value:function drawTickWrapper(value,label,level,options){//var pos = this.getPos( value );
this.drawTick(value,level,options);}/**
	     * Used to scale the master axis into the slave axis
	     * @function SlaveAxisScalingFunction
	     * @param {Number} val - The master value to convert into a slave value
	     * @returns undefined
	     *//**
	     * Makes this axis a slave. This can be used to show the same data with different units, specifically when a conversion function exists from axis -> slaveAxis but not in reverse. This axis should actually have no series.
	     * @param {Axis} axis - The master axis
	     * @param {SlaveAxisScalingFunction} scalingFunction - The scaling function used to map masterValue -> slaveValue
	     * @param {Number} decimals - The number of decimals to round the value to
	     * @memberof Axis
	     * @return {Number} The width or height used by the axis (used internally)
	     */},{key:'linkToAxis',value:function linkToAxis(axis,scalingFunction,decimals){this.linkedToAxis={axis:axis,scalingFunction:scalingFunction,decimals:decimals||1};}},{key:'drawLinkedToAxisTicksWrapper',value:function drawLinkedToAxisTicksWrapper(widthPx,valrange){var opts=this.linkedToAxis,px=0,val,t,i=0,l,delta2;// Redrawing the main axis ? Why ?
//opts.axis.draw();
if(!opts.deltaPx){opts.deltaPx=10;}do{val=opts.scalingFunction(opts.axis.getVal(px+this.getMinPx()));if(opts.decimals){this.decimals=opts.decimals;}t=this.drawTick(val,1,{},px+this.getMinPx());if(!t){console.log(val,px,this.getMinPx());throw"Unable to draw tick. Please report the test-case";}l=String(t[1].textContent).length*8;delta2=Math.round(l/5)*5;if(delta2>opts.deltaPx){opts.deltaPx=delta2;//     this.drawInit();
this.drawLinkedToAxisTicksWrapper(widthPx,valrange);return;}i++;px+=opts.deltaPx;}while(px<widthPx);}/**
	     * Transform a value into pixels, according to the axis scaling. The value is referenced to the drawing wrapper, not the the axis minimal value
	     * @param {Number} value - The value to translate into pixels
	     * @memberof Axis
	     * @return {Number} The value transformed into pixels
	     */},{key:'getPos',value:function getPos(value){return this.getPx(value);}/**
	     * @alias Axis~getPos
	     */},{key:'getPx',value:function getPx(value){//      if(this.getMaxPx() == undefined)
//        console.log(this);
//console.log(this.getMaxPx(), this.getMinPx(), this.getCurrentInterval());
// Ex 50 / (100) * (1000 - 700) + 700
//console.log( value, this.getCurrentMin(), this.getMaxPx(), this.getMinPx(), this.getCurrentInterval() );
if(!this.options.logScale){return(value-this.getCurrentMin())/this.getCurrentInterval()*(this.getMaxPx()-this.getMinPx())+this.getMinPx();}else{// 0 if value = min
// 1 if value = max
if(value<0)return;var value=(Math.log(value)-Math.log(this.getCurrentMin()))/(Math.log(this.getCurrentMax())-Math.log(this.getCurrentMin()))*(this.getMaxPx()-this.getMinPx())+this.getMinPx();return value;}}/**
	     * @alias Axis~getPos
	     */},{key:'getRoundedPx',value:function getRoundedPx(value){//      if(this.getMaxPx() == undefined)
//        console.log(this);
//console.log(this.getMaxPx(), this.getMinPx(), this.getCurrentInterval());
// Ex 50 / (100) * (1000 - 700) + 700
//console.log( value, this.getCurrentMin(), this.getMaxPx(), this.getMinPx(), this.getCurrentInterval() );
return Math.round(this.getPx(value)*10)/10;}/**
	     * Transform a pixel position (referenced to the graph zone, not to the axis minimum) into a value, according to the axis scaling.
	     * @param {Number} pixels - The number of pixels to translate into a value
	     * @memberof Axis
	     * @return {Number} The axis value corresponding to the pixel position
	     */},{key:'getVal',value:function getVal(px){if(!this.options.logScale){return(px-this.getMinPx())/(this.getMaxPx()-this.getMinPx())*this.getCurrentInterval()+this.getCurrentMin();}else{return Math.exp((px-this.getMinPx())/(this.getMaxPx()-this.getMinPx())*(Math.log(this.getCurrentMax())-Math.log(this.getCurrentMin()))+Math.log(this.getCurrentMin()));}}/**
	     * Transform a delta value into pixels
	     * @param {Number} value - The value to translate into pixels
	     * @return {Number} The value transformed into pixels
	     * @example graph.getBottomAxis().forceMin( 20 ).forceMax( 50 ).getRelPx( 2 ); // Returns how many pixels will be covered by 2 units. Let's assume 600px of width, it's ( 2 / 30 ) * 600 = 40px
	     */},{key:'getRelPx',value:function getRelPx(delta){return delta/this.getCurrentInterval()*(this.getMaxPx()-this.getMinPx());}/**
	     * Transform a delta pixels value into value
	     * @param {Number} pixels - The pixel to convert into a value
	     * @return {Number} The delta value corresponding to delta pixels
	     * @see Axis~getRelPx
	     * @example graph.getBottomAxis().forceMin( 20 ).forceMax( 50 ).getRelVal( 40 ); // Returns 2 (for 600px width)
	     */},{key:'getRelVal',value:function getRelVal(px){return px/(this.getMaxPx()-this.getMinPx())*this.getCurrentInterval();}},{key:'valueToText',value:function valueToText(value){if(this.scientificExponent){value/=Math.pow(10,this.scientificExponent);return value.toFixed(1);}else{value=value*Math.pow(10,this.getExponentialFactor())*Math.pow(10,this.getExponentialLabelFactor());if(this.options.shiftToZero){value-=this.dataMin;}if(this.options.ticklabelratio){value*=this.options.ticklabelratio;}if(this.options.unitModification){value=this.modifyUnit(value,this.options.unitModification);return value;}var dec=this.decimals-this.getExponentialFactor()-this.getExponentialLabelFactor();if(isNaN(value)){return"";}if(dec>0){return value.toFixed(dec);}return value.toFixed(0);}}/**
	     *  Computes a value and returns it in HTML formatting
	     *  @memberof Axis
	     *  @param {Number} value - The value to compute
	     *  @param {Boolean} noScaling - Does not display scaling
	     *  @param {Boolean} noUnits - Does not display units
	     *  @return {String} An HTML string containing the computed value
	     *  @example graph.getXAxis().setUnit( "m" ).setUnitDecade( true ).setScientific( true );
	     *  graph.getXAxis().valueToHtml( 3500 ); // Returns "3.5 km"
	     *  @see Axis#valueToText
	     */},{key:'valueToHtml',value:function valueToHtml(value,noScaling,noUnits){var text=this.valueToText(value);var letter;if(this.options.unitDecade&&this.options.unit&&this.scientificExponent!==0&&(this.scientificExponent=this.getEngineeringExponent(this.scientificExponent))&&(letter=this.getExponentGreekLetter(this.scientificExponent))){text+=letter;}else if(this.scientificExponent!==0&&!isNaN(this.scientificExponent)&&!noScaling){text+="x10";text+='<sup>'+this.scientificExponent+'</sup>';}if(this.options.unit&&!noUnits){text+=this.options.unit.replace(/\^([-+0-9]*)/g,"<sup>$1</sup>");}return text;}},{key:'getModifiedValue',value:function getModifiedValue(value){if(this.options.ticklabelratio){value*=this.options.ticklabelratio;}if(this.options.shiftToZero){value-=this.getMinValue()*(this.options.ticklabelratio||1);}return value;}},{key:'modifyUnit',value:function modifyUnit(value,mode){var text="";var incr=this.incrTick;switch(mode){case'time':// val must be in seconds => transform in hours / days / months
var max=this.getModifiedValue(this.getMaxValue()),first,units=[[60,'min'],[3600,'h'],[3600*24,'d']];var umin;if(max<3600){// to minutes
umin=0;}else if(max<3600*24){umin=1;}else if(max<3600*24*30){umin=2;}if(!units[umin]){return false;}value=value/units[umin][0];var valueRounded=Math.floor(value);text=valueRounded+units[umin][1];// Addind lower unit for precision
umin--;while(incr<1*units[umin+1][0]&&umin>-1){first=false;value=(value-valueRounded)*units[umin+1][0]/units[umin][0];valueRounded=Math.round(value);text+=" "+valueRounded+units[umin][1];umin--;}break;case'time:min.sec':value=value/60;var valueRounded=Math.floor(value);var s=Math.round((value-valueRounded)*60)+"";s=s.length==1?'0'+s:s;text=valueRounded+"."+s;break;}return text;}},{key:'getExponentialFactor',value:function getExponentialFactor(){return this.options.exponentialFactor;}},{key:'setExponentialFactor',value:function setExponentialFactor(value){this.options.exponentialFactor=value;}},{key:'setExponentialLabelFactor',value:function setExponentialLabelFactor(value){this.options.exponentialLabelFactor=value;}},{key:'getExponentialLabelFactor',value:function getExponentialLabelFactor(){return this.options.exponentialLabelFactor;}/**
	     * Sets the label of the axis
	     * @param {Number} label - The label to display under the axis
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */},{key:'setLabel',value:function setLabel(label){this.options.labelValue=label;return this;}/**
	     * @memberof Axis
	     * @return {String} The label value
	     */},{key:'getLabel',value:function getLabel(){return this.options.labelValue;}},{key:'setSpan',value:function setSpan(_from,_to){this.options.span=[_from,_to];return this;}},{key:'getSpan',value:function getSpan(){return this.options.span;}},{key:'setLevel',value:function setLevel(level){this._level=level;return this;}},{key:'getLevel',value:function getLevel(){return this._level;}},{key:'setShift',value:function setShift(shift){this.shift=shift;}},{key:'getShift',value:function getShift(){return this.shift;}/**
	     * Changes the tick position
	     * @param {Number} pos - The new position ( "outside", "centered" or "inside" )
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */},{key:'setTickPosition',value:function setTickPosition(pos){switch(pos){case 3:case'outside':case _graph2.default.TICKS_OUTSIDE:pos=3;break;case 2:case'centered':case _graph2.default.TICKS_CENTERED:pos=2;break;default:case 1:case'inside':case _graph2.default.TICKS_INSIDE:pos=1;break;}this.options.tickPosition=pos;switch(this.options.tickPosition){case 3:this.tickPx1=-2;this.tickPx2=0;break;case 2:this.tickPx1=-1;this.tickPx2=1;break;case 1:this.tickPx1=0;this.tickPx2=2;break;}return this;}/**
	     * Displays or hides the axis grids
	     * @param {Boolean} on - true to enable the grids, false to disable them
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */},{key:'setGrids',value:function setGrids(on){this.options.primaryGrid=on;this.options.secondaryGrid=on;return this;}/**
	     * Displays or hides the axis primary grid
	     * @param {Boolean} on - true to enable the grids, false to disable it
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */},{key:'setPrimaryGrid',value:function setPrimaryGrid(on){this.options.primaryGrid=on;return this;}/**
	     * Displays or hides the axis secondary grid
	     * @param {Boolean} on - true to enable the grids, false to disable it
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */},{key:'setSecondaryGrid',value:function setSecondaryGrid(on){this.options.secondaryGrid=on;return this;}/**
	     * Enables primary grid
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */},{key:'primaryGridOn',value:function primaryGridOn(){return this.setPrimaryGrid(true);}/**
	     * Disables primary grid
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */},{key:'primaryGridOff',value:function primaryGridOff(){return this.setPrimaryGrid(false);}/**
	     * Enables secondary grid
	     * @memberof Axis
	     * @return {Axis} The current axis
	     */},{key:'secondaryGridOn',value:function secondaryGridOn(){return this.setSecondaryGrid(true);}/**
	     * Disables secondary grid
	     * @return {Axis} The current axis
	     */},{key:'secondaryGridOff',value:function secondaryGridOff(){return this.setSecondaryGrid(false);}/**
	     * Enables all the grids
	     * @return {Axis} The current axis
	     */},{key:'gridsOn',value:function gridsOn(){return this.setGrids(true);}/**
	     * Disables all the grids
	     * @return {Axis} The current axis
	     */},{key:'gridsOff',value:function gridsOff(){return this.setGrids(false);}/**
	     * @alias Axis#gridsOff
	     */},{key:'turnGridsOff',value:function turnGridsOff(){return this.gridsOff.apply(this,arguments);}/**
	     * @alias Axis#gridsOn
	     */},{key:'turnGridsOn',value:function turnGridsOn(){return this.gridsOn.apply(this,arguments);}/**
	     * Sets the axis color
	     * @memberof Axis
	     * @param {String} color - The color to set the axis
	     * @return {Axis} The current axis
	     * @since 1.13.2
	     */},{key:'setAxisColor',value:function setAxisColor(color){this.options.axisColor=color;return this;}/**
	     * Gets the axis color
	     * @memberof Axis
	     * @return {String} The color of the axis
	     * @since 1.13.2
	     */},{key:'getAxisColor',value:function getAxisColor(color){return this.options.axisColor||'black';}/**
	     * Sets the color of the main ticks
	     * @memberof Axis
	     * @param {String} color - The new color of the primary ticks
	     * @return {Axis} The current axis
	     * @since 1.13.2
	     */},{key:'setPrimaryTicksColor',value:function setPrimaryTicksColor(color){this.options.primaryTicksColor=color;return this;}/**
	     * Gets the color of the main ticks
	     * @memberof Axis
	     * @return {String} The color of the primary ticks
	     * @since 1.13.2
	     */},{key:'getPrimaryTicksColor',value:function getPrimaryTicksColor(color){return this.options.primaryTicksColor||'black';}/**
	     * Sets the color of the secondary ticks
	     * @memberof Axis
	     * @param {String} color - The new color of the secondary ticks
	     * @return {Axis} The current axis
	     * @since 1.13.2
	     */},{key:'setSecondaryTicksColor',value:function setSecondaryTicksColor(color){this.options.secondaryTicksColor=color;return this;}/**
	     * Gets the color of the secondary ticks
	     * @memberof Axis
	     * @return {String} The color of the secondary ticks
	     * @since 1.13.2
	     */},{key:'getSecondaryTicksColor',value:function getSecondaryTicksColor(color){return this.options.secondaryTicksColor||'black';}/**
	     * Sets the color of the tick labels
	     * @memberof Axis
	     * @param {String} color - The new color of the tick labels
	     * @return {Axis} The current axis
	     * @since 1.13.2
	     */},{key:'setTicksLabelColor',value:function setTicksLabelColor(color){this.options.ticksLabelColor=color;return this;}/**
	     * Gets the color of the tick labels
	     * @memberof Axis
	     * @return {String} The color of the tick labels
	     * @since 1.13.2
	     */},{key:'getTicksLabelColor',value:function getTicksLabelColor(color){return this.options.ticksLabelColor||'black';}/**
	     * Sets the color of the primary grid
	     * @memberof Axis
	     * @param {String} color - The primary grid color
	     * @return {Axis} The current axis
	     * @since 1.13.3
	     */},{key:'setPrimaryGridColor',value:function setPrimaryGridColor(color){this.options.primaryGridColor=color;return this;}/**
	     * Gets the color of the primary grid
	     * @memberof Axis
	     * @return {String} color - The primary grid color
	     * @since 1.13.3
	     */},{key:'getPrimaryGridColor',value:function getPrimaryGridColor(){return this.options.primaryGridColor;}/**
	     * Sets the color of the primary grid
	     * @memberof Axis
	     * @param {String} color - The primary grid color
	     * @return {Axis} The current axis
	     * @since 1.13.3
	     */},{key:'setSecondaryGridColor',value:function setSecondaryGridColor(color){this.options.secondaryGridColor=color;return this;}/**
	     * Gets the color of the secondary grid
	     * @memberof Axis
	     * @return {String} color - The secondary grid color
	     * @since 1.13.3
	     */},{key:'getSecondaryGridColor',value:function getSecondaryGridColor(){return this.options.secondaryGridColor;}/**
	     * Sets the width of the primary grid lines
	     * @memberof Axis
	     * @param {Number} width - The width of the primary grid lines
	     * @return {Axis} The current axis
	     * @since 1.13.3
	     */},{key:'setPrimaryGridWidth',value:function setPrimaryGridWidth(width){this.options.primaryGridWidth=width;return this;}/**
	     * Gets the width of the primary grid lines
	     * @memberof Axis
	     * @return {Number} width - The width of the primary grid lines
	     * @since 1.13.3
	     */},{key:'getPrimaryGridWidth',value:function getPrimaryGridWidth(){return this.options.primaryGridWidth;}/**
	     * Sets the width of the secondary grid lines
	     * @memberof Axis
	     * @param {Number} width - The width of the secondary grid lines
	     * @return {Axis} The current axis
	     * @since 1.13.3
	     */},{key:'setSecondaryGridWidth',value:function setSecondaryGridWidth(width){this.options.secondaryGridWidth=width;return this;}/**
	     * Gets the width of the secondary grid lines
	     * @memberof Axis
	     * @return {Number} width - The width of the secondary grid lines
	     * @since 1.13.3
	     */},{key:'getSecondaryGridWidth',value:function getSecondaryGridWidth(){return this.options.secondaryGridWidth;}/**
	     * Sets the opacity of the primary grid lines
	     * @memberof Axis
	     * @param {Number} opacity - The opacity of the primary grid lines
	     * @return {Axis} The current axis
	     * @since 1.13.3
	     */},{key:'setPrimaryGridOpacity',value:function setPrimaryGridOpacity(opacity){this.options.primaryGridOpacity=opacity;return this;}/**
	     * Gets the opacity of the primary grid lines
	     * @memberof Axis
	     * @return {Number} opacity - The opacity of the primary grid lines
	     * @since 1.13.3
	     */},{key:'getPrimaryGridOpacity',value:function getPrimaryGridOpacity(){return this.options.primaryGridOpacity;}/**
	     * Sets the opacity of the secondary grid lines
	     * @memberof Axis
	     * @param {Number} opacity - The opacity of the secondary grid lines
	     * @return {Axis} The current axis
	     * @since 1.13.3
	     */},{key:'setSecondaryGridOpacity',value:function setSecondaryGridOpacity(opacity){this.options.secondaryGridOpacity=opacity;return this;}/**
	     * Gets the opacity of the secondary grid lines
	     * @memberof Axis
	     * @return {Number} opacity - The opacity of the secondary grid lines
	     * @since 1.13.3
	     */},{key:'getSecondaryGridOpacity',value:function getSecondaryGridOpacity(){return this.options.secondaryGridOpacity;}/**
	     * Sets the dasharray of the primary grid lines
	     * @memberof Axis
	     * @param {String} dasharray - The dasharray of the primary grid lines
	     * @return {Axis} The current axis
	     * @since 1.13.3
	     */},{key:'setPrimaryGridDasharray',value:function setPrimaryGridDasharray(dasharray){this.options.primaryGridDasharray=dasharray;return this;}/**
	     * Gets the dasharray of the primary grid lines
	     * @memberof Axis
	     * @return {String} dasharray - The dasharray of the primary grid lines
	     * @since 1.13.3
	     */},{key:'getPrimaryGridDasharray',value:function getPrimaryGridDasharray(){return this.options.primaryGridDasharray;}/**
	     * Sets the dasharray of the secondary grid lines
	     * @memberof Axis
	     * @param {String} dasharray - The dasharray of the secondary grid lines
	     * @return {Axis} The current axis
	     * @since 1.13.3
	     */},{key:'setSecondaryGridDasharray',value:function setSecondaryGridDasharray(dasharray){this.options.secondaryGridDasharray=dasharray;return this;}/**
	     * Gets the dasharray of the secondary grid lines
	     * @memberof Axis
	     * @return {String} dasharray - The dasharray of the secondary grid lines
	     * @since 1.13.3
	     */},{key:'getSecondaryGridDasharray',value:function getSecondaryGridDasharray(){return this.options.secondaryGridDasharray;}/**
	     * Sets the color of the label
	     * @memberof Axis
	     * @param {String} color - The new color of the label
	     * @return {Axis} The current axis
	     * @since 1.13.2
	     */},{key:'setLabelColor',value:function setLabelColor(color){this.options.labelColor=color;}/**
	     * Gets the color of the label
	     * @memberof Axis
	     * @return {String} The color of the label
	     * @since 1.13.2
	     */},{key:'getLabelColor',value:function getLabelColor(){return this.options.labelColor;}},{key:'setTickContent',value:function setTickContent(dom,val,options){if(!options)options={};if(options.overwrite||!options.exponential){dom.textContent=options.overwrite||this.valueToText(val);}else{var log=Math.round(Math.log(val)/Math.log(10));var unit=Math.floor(val*Math.pow(10,-log));dom.textContent=unit!=1?unit+"x10":"10";var tspan=document.createElementNS(this.graph.ns,'tspan');tspan.textContent=log;tspan.setAttribute('font-size','0.7em');tspan.setAttribute('dy',-5);dom.appendChild(tspan);}if(options.fontSize){dom.setAttribute('font-size',options.fontSize);}}/**
	     * @memberof Axis
	     * @returns {Boolean} true if it is an x axis, false otherwise
	     */},{key:'isX',value:function isX(){return false;}/**
	     * @memberof Axis
	     * @returns {Boolean} true if it is an y axis, false otherwise
	     */},{key:'isY',value:function isY(){return false;}/**
	     * Sets the unit of the axis
	     * @param {String} unit - The unit of the axis
	     * @return {Axis} The current axis
	     * @memberof Axis
	     * @since 1.13.3
	     */},{key:'setUnit',value:function setUnit(unit){this.options.unit=unit;return this;}/**
	     * Sets characters wrapping the unit
	     * @param {String} before - The string to insert before
	     * @param {String} after - The string to insert after
	     * @return {Axis} The current axis
	     * @memberof Axis
	     * @example axis.setUnitWrapper("[", "]").setUnit('m'); // Will display [m]
	     * @since 1.13.3
	     */},{key:'setUnitWrapper',value:function setUnitWrapper(before,after){this.options.unitWrapperBefore=before;this.options.unitWrapperAfter=after;return this;}/**
	     * Allows the unit to scale with thousands
	     * @param {Boolean} on - Enables this mode
	     * @return {Axis} The current axis
	     * @memberof Axis
	     * @since 1.13.3
	     */},{key:'setUnitDecade',value:function setUnitDecade(on){this.options.unitDecade=on;return this;}/**
	     * Enable the scientific mode for the axis values. This way, big numbers can be avoided, e.g. "1000000000" would be displayed 1 with 10<sup>9</sup> or "G" shown on near the axis unit.
	     * @param {Boolean} on - Enables the scientific mode
	     * @return {Axis} The current axis
	     * @memberof Axis
	     * @since 1.13.3
	     */},{key:'setScientific',value:function setScientific(on){this.options.scientificScale=on;return this;}/**
	     * In the scientific mode, forces the axis to take a specific power of ten. Useful if you want to show kilometers instead of meters for example. In this case you would use "3" as a value.
	     * @param {Number} scientificScaleExponent - Forces the scientific scale to take a defined power of ten
	     * @return {Axis} The current axis
	     * @memberof Axis
	     * @since 1.13.3
	     * @see Axis#setScientific
	     */},{key:'setScientificScaleExponent',value:function setScientificScaleExponent(scientificScaleExponent){this.options.scientificScaleExponent=scientificScaleExponent;return this;}/**
	     * The engineer scaling is similar to the scientific scaling ({@link Axis#setScientificScale}) but allowing only mupltiples of 3 to be used to scale the axis (for instance, go from grams to kilograms while skipping decagrams and hexagrams)
	     * @param {Boolean} engineeringScaling - <code>true</code> to turn on the engineering scaling
	     * @return {Axis} The current axis
	     * @memberof Axis
	     * @since 1.13.3
	     * @see Axis#setScientific
	     */},{key:'setEngineering',value:function setEngineering(engineeringScaling){//bool
this.options.scientificScale=engineeringScaling;this.options.engineeringScale=engineeringScaling;return this;}/**
	     * Calculates the closest engineering exponent from a scientific exponent
	     * @param {Number} scientificExponent - The exponent of 10 based on which the axis will be scaled
	     * @return {Number} The appropriate engineering exponent
	     * @memberof Axis
	     * @since 1.13.3
	     * @private
	     */},{key:'getEngineeringExponent',value:function getEngineeringExponent(scientificExponent){if(scientificExponent>0){scientificExponent-=scientificExponent%3;}else{scientificExponent-=(3- -scientificExponent%3)%3;}return scientificExponent;}/**
	     * Enables log scaling
	     * @param {Boolean} logScale - ```true``` to enable the log scaling, ```false``` to disable it
	     * @return {Axis} The current axis
	     * @memberof Axis
	     * @since 1.13.3
	     */},{key:'setLogScale',value:function setLogScale(log){this.options.logScale=log;return this;}},{key:'isZoomed',value:function isZoomed(){return!(this.currentAxisMin==this.getMinValue()||this.currentAxisMax==this.getMaxValue());}},{key:'hasAxis',value:function hasAxis(){return false;}},{key:'getType',value:function getType(){return null;}},{key:'useKatexForLabel',value:function useKatexForLabel(){var use=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;this.options.useKatexForLabel=use;return this;}},{key:'zoomLock',set:function set(bln){this._zoomLocked=bln;},get:function get(){return this._zoomLocked||false;}}]);return Axis;}(_EventEmitter2.default);/**
	   *  @alias Axis#getVal
	   */Axis.prototype.getValue=Axis.prototype.getVal;/**
	   *  @alias Axis#getRelPx
	   */Axis.prototype.getDeltaPx=Axis.prototype.getRelPx;exports.default=Axis;});/***/},/* 11 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(10)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.axis'));}else{var mod={exports:{}};factory(mod.exports,global.graph);global.graphAxisY=mod.exports;}})(this,function(exports,_graph){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Generic constructor of a y axis
	   * @extends Axis
	   */var AxisY=function(_graph2$default2){_inherits(AxisY,_graph2$default2);function AxisY(graph,leftright,options){_classCallCheck(this,AxisY);var _this18=_possibleConstructorReturn(this,(AxisY.__proto__||Object.getPrototypeOf(AxisY)).call(this,graph,leftright,options));_this18.leftright=leftright;_this18.left=leftright=='left';return _this18;}/**
	     *  @private
	     */_createClass(AxisY,[{key:'setAxisPosition',value:function setAxisPosition(shift){this.shiftPosition=shift;}},{key:'getAxisPosition',value:function getAxisPosition(shift){return this.shiftPosition||0;}},{key:'getAdditionalWidth',value:function getAdditionalWidth(){var pos=0;if(this.getLabel()){pos+=this.graph.options.fontSize;}if(this.isShown()){pos+=Math.abs(this.tickMargin);}return pos;}/**
	     *  @returns {Boolean} always ```false```
	     */},{key:'isX',value:function isX(){return false;}/**
	     *  @returns {Boolean} always ```true```
	     */},{key:'isY',value:function isY(){return true;}/**
	     *  @private
	     */},{key:'resetTicksLength',value:function resetTicksLength(){this.longestTick=[false,0];}/**
	     *  @private
	     */},{key:'getMaxSizeTick',value:function getMaxSizeTick(){// Gives an extra margin of 5px
return this.longestTick&&this.longestTick[0]?this.longestTick[0].getComputedTextLength()+5:0;//(this.left ? 10 : 0);
}},{key:'draw',value:function draw(){this.tickMargin=this.left?-5-this.tickPx1*this.tickScaling[1]:5+this.tickPx1*this.tickScaling[1];var tickWidth=_get(AxisY.prototype.__proto__||Object.getPrototypeOf(AxisY.prototype),'draw',this).apply(this,arguments);tickWidth+=this.getAdditionalWidth();this.drawSpecifics(tickWidth);this.fullwidthlabel=tickWidth;return tickWidth;}},{key:'equalizePosition',value:function equalizePosition(width){this.placeLabel(this.left?-width:width);if(this.getLabel()){return width+this.graph.options.fontSize;}return 0;}/**
	     *  @private
	     */},{key:'drawTick',value:function drawTick(value,level,options,forcedPos){var _this19=this;var pos;var self=this,group=this.groupTicks,tickLabel;pos=forcedPos||this.getPos(value);if(pos==undefined||isNaN(pos)){return;}var tick=this.nextTick(level,function(tick){tick.setAttribute('x1',(_this19.left?1:-1)*_this19.tickPx1*_this19.tickScaling[level]);tick.setAttribute('x2',(_this19.left?1:-1)*_this19.tickPx2*_this19.tickScaling[level]);if(level==1){tick.setAttribute('stroke',_this19.getPrimaryTicksColor());}else{tick.setAttribute('stroke',_this19.getSecondaryTicksColor());}});tick.setAttribute('y1',pos);tick.setAttribute('y2',pos);this.nextGridLine(level==1,0,this.graph.getDrawingWidth(),pos,pos);//  this.groupTicks.appendChild( tick );
if(level==1){var tickLabel=this.nextTickLabel(function(tickLabel){tickLabel.setAttribute('x',_this19.tickMargin);if(_this19.getTicksLabelColor()!=='black'){tickLabel.setAttribute('fill',_this19.getTicksLabelColor());}if(_this19.left){tickLabel.setAttribute('text-anchor','end');}else{tickLabel.setAttribute('text-anchor','start');}tickLabel.style.dominantBaseline='central';});tickLabel.setAttribute('y',pos);this.setTickContent(tickLabel,value,options);if(String(tickLabel.textContent).length>=this.longestTick[1]){this.longestTick[0]=tickLabel;this.longestTick[1]=String(tickLabel.textContent).length;}}}},{key:'drawLabel',value:function drawLabel(){if(this.getLabelColor()!=='black'){this.label.setAttribute('fill',this.getLabelColor());}this.label.setAttribute('dominant-baseline',!this.left?'hanging':'auto');this.labelTspan.textContent=this.getLabel();}},{key:'placeLabel',value:function placeLabel(y){this.label.setAttribute('transform','translate('+y+', '+Math.abs(this.getMaxPx()+this.getMinPx())/2+') rotate(-90)');}/**
	     *  @private
	     */},{key:'drawSpecifics',value:function drawSpecifics(){// Place label correctly
//this.label.setAttribute('x', (this.getMaxPx() - this.getMinPx()) / 2);
/*
	      if ( !this.left ) {
	         this.labelTspan.style.dominantBaseline = 'hanging';
	        this.expTspan.style.dominantBaseline = 'hanging';
	        this.expTspanExp.style.dominantBaseline = 'hanging';
	         this.unitTspan.style.dominantBaseline = 'hanging';
	        this.preunitTspan.style.dominantBaseline = 'hanging';
	      }
	      */this.line.setAttribute('y1',this.getMinPx());this.line.setAttribute('y2',this.getMaxPx());this.line.setAttribute('x1',0);this.line.setAttribute('x2',0);this.line.setAttribute('stroke',this.getAxisColor());var span=this.getSpan();this.line.setAttribute('marker-start',!this.options.splitMarks||span[0]==0?"":"url(#verticalsplit_"+this.graph.getId()+")");this.line.setAttribute('marker-end',!this.options.splitMarks||span[1]==1?"":"url(#verticalsplit_"+this.graph.getId()+")");}/**
	     *  @private
	     */},{key:'setShift',value:function setShift(shift){this.shift=shift;if(!this.shift||!this.graph.getWidth()){return;}var xshift=this.shift;xshift=this.floating?xshift:this.isLeft()?xshift:this.graph.getWidth()-this.graph.getPaddingRight()-this.graph.getPaddingLeft()-xshift;this.group.setAttribute('transform','translate( '+xshift+' 0 )');this.drawLabel();}/**
	     *  @private
	     */},{key:'isLeft',value:function isLeft(){return this.left;}/**
	     *  @private
	     */},{key:'isRight',value:function isRight(){return!this.left;}/**
	     *  @private
	     */},{key:'isFlipped',value:function isFlipped(){return!this.options.flipped;}/**
	     *  @private
	     */},{key:'_draw0Line',value:function _draw0Line(px){if(!this._0line){this._0line=document.createElementNS(this.graph.ns,'line');}this._0line.setAttribute('y1',px);this._0line.setAttribute('y2',px);this._0line.setAttribute('x1',0);this._0line.setAttribute('x2',this.graph.getDrawingWidth());this._0line.setAttribute('stroke','black');this.groupGrids.appendChild(this._0line);}/**
	     *  @private
	     */},{key:'handleMouseMoveLocal',value:function handleMouseMoveLocal(x,y,e){y-=this.graph.getPaddingTop();this.mouseVal=this.getVal(y);}/**
	     * Scales the axis with respect to the series contained in an x axis
	     * @param {Axis} [ axis = graph.getXAxis() ] - The X axis to use as a reference
	     * @param {Serie} [ excludeSerie ] - A serie to exclude
	     * @param {Number} [ start = xaxis.getCurrentMin() ] - The start of the boundary
	     * @param {Number} [ end = xaxis.getCurrentMax() ] - The end of the boundary
	     * @param {Boolean} [ min = true ] - Adapt the min
	     * @param {Boolean} [ max = true ] - Adapt the max
	     * @returns {Axis} The current axis
	     */},{key:'scaleToFitAxis',value:function scaleToFitAxis(axis,excludeSerie,start,end,min,max){//console.log( axis instanceof GraphAxis );
if(!axis||!axis.isX()){axis=this.graph.getXAxis();}if(isNaN(start)){start=axis.getCurrentMin();}if(isNaN(end)){end=axis.getCurrentMax();}if(min===undefined){min=true;}if(max===undefined){max=true;}if(typeof excludeSerie=="number"){end=start;start=excludeSerie;excludeSerie=false;}var maxV=-Infinity,minV=Infinity,j=0;for(var i=0,l=this.graph.series.length;i<l;i++){if(!this.graph.series[i].isShown()){continue;}if(this.graph.series[i]==excludeSerie){continue;}if(!(this.graph.series[i].getXAxis()==axis)||this.graph.series[i].getYAxis()!==this){continue;}j++;maxV=max?Math.max(maxV,this.graph.series[i].getMax(start,end)):0;minV=min?Math.min(minV,this.graph.series[i].getMin(start,end)):0;}if(j==0){this.setMinMaxToFitSeries();// No point was found
}else{// If we wanted originally to resize min and max. Otherwise we use the current value
minV=min?minV:this.getCurrentMin();maxV=max?maxV:this.getCurrentMax();var interval=maxV-minV;minV-=this.options.axisDataSpacing.min*interval;maxV+=this.options.axisDataSpacing.max*interval;this._doZoomVal(minV,maxV);}return this;}/**
	     *  Caches the minimum px and maximum px position of the axis. Includes axis spans and flipping. Mostly used internally
	     *  @return {Axis} The current axis instance
	     */},{key:'setMinMaxFlipped',value:function setMinMaxFlipped(){var interval=this.maxPx-this.minPx;if(isNaN(interval)){return;}var maxPx=this.maxPx-interval*this.options.span[0]-this.options.marginMin;var minPx=this.maxPx-interval*this.options.span[1]+this.options.marginMax;this.minPxFlipped=this.isFlipped()?maxPx:minPx;this.maxPxFlipped=this.isFlipped()?minPx:maxPx;}},{key:'getZProj',value:function getZProj(zValue){return zValue*this.graph.options.zAxis.shiftY;}}]);return AxisY;}(_graph2.default);exports.default=AxisY;});/***/},/* 12 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(9)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.axis.x'));}else{var mod={exports:{}};factory(mod.exports,global.graphAxis);global.graphAxisXBar=mod.exports;}})(this,function(exports,_graphAxis){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graphAxis2=_interopRequireDefault(_graphAxis);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Generic constructor of a y axis
	   * @class AxisXBar
	   * @augments Axis
	   */var AxisXBar=function(_graphAxis2$default){_inherits(AxisXBar,_graphAxis2$default);function AxisXBar(graph,topbottom){var options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};_classCallCheck(this,AxisXBar);return _possibleConstructorReturn(this,(AxisXBar.__proto__||Object.getPrototypeOf(AxisXBar)).call(this,graph,topbottom,options));}/**
	     * @param {Object[]} categories - Categories array
	     * @param {(String|Number)} categories[].title - The title of the category (to be dispalyed)
	     * @param {(String|Number)} categories[].name - The name of the category (to indentify series)
	     * @returns {AxisBar} The current axis instance
	     */_createClass(AxisXBar,[{key:'draw',value:function draw(){var self=this,tickLabel,width=this.graph.drawingSpaceWidth,elements=this._barCategories;this.forceMin(0);this.forceMax(1);this.cacheCurrentMin();this.cacheCurrentMax();this.cacheInterval();if(!elements){return;}if(!Array.isArray(elements)){elements=[elements];}// this.drawInit();
//var widthPerElement = width / elements.length;
for(var i=0;i<=elements.length;i++){this.drawTick(i/elements.length,2);if(i<elements.length){tickLabel=this.nextTickLabel(function(tickLabel){tickLabel.setAttribute('y',(self.top?-1:1)*((self.options.tickPosition==1?8:20)+(self.top?10:0)));tickLabel.setAttribute('text-anchor','middle');if(self.getTicksLabelColor()!=='black'){tickLabel.setAttribute('fill',self.getTicksLabelColor());}tickLabel.style.dominantBaseline='hanging';});tickLabel.setAttribute('x',this.getPos((i+0.5)/elements.length));tickLabel.textContent=elements[i].title;}}this.drawSpecifics();return this;}/**
	     * Sets the series automatically
	     * @returns {AxisBar} The current axis instance
	     */},{key:'autoSeries',value:function autoSeries(){var series=[];var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=this.graph.series[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var _serie=_step.value;if(_serie.getXAxis()==this){series.push(_serie);}}}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}this.setSeries.apply(this,series);return this;}/**
	     * Sets the series that should belong to the axis
	     * @param {...(Series|Number|String)} series - List of series identified either by their instance, or their index (string or number)
	     * @returns {AxisBar} The current axis instance
	     */},{key:'setSeries',value:function setSeries(){var self=this;this.series=arguments;Array.prototype.map.call(this.series,function(serie,index){if(!((typeof serie==='undefined'?'undefined':_typeof(serie))=="object")){serie=self.graph.getSerie(serie);}if(serie.setCategoryConfig){serie.setCategoryConfig(index,self._barCategories,self.series.length);}});this._getUsedCategories();return this;}},{key:'_getUsedCategories',value:function _getUsedCategories(){var categories={},total=0;Array.prototype.map.call(this.series,function(serie){var usedCategories=serie.getUsedCategories();var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=usedCategories[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var cat=_step2.value;if(!categories.hasOwnProperty(cat)){categories[cat]=1;total+=1;}categories[cat]++;total++;}}catch(err){_didIteratorError2=true;_iteratorError2=err;}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return();}}finally{if(_didIteratorError2){throw _iteratorError2;}}}});var accumulator=0;for(var _i in categories){var temp=categories[_i];categories[_i]=accumulator;accumulator+=temp;}var dispatchedCategories={};var i=0;Array.prototype.map.call(this.series,function(serie){var scategories=serie.getUsedCategories(),indices={};scategories.map(function(cat){dispatchedCategories[cat]=dispatchedCategories[cat]||0.5;indices[cat]=(categories[cat]+dispatchedCategories[cat])/total;dispatchedCategories[cat]++;});serie.setDataIndices(indices,total);i++;});}},{key:'getType',value:function getType(){return'category';}},{key:'categories',set:function set(categories){this._barCategories=categories;return this;}}]);return AxisXBar;}(_graphAxis2.default);exports.default=AxisXBar;});/***/},/* 13 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(10),__webpack_require__(3)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.axis'),require('./graph.util'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graph);global.graphAxisXTime=mod.exports;}})(this,function(exports,_graph,_graph3){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);var util=_interopRequireWildcard(_graph3);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var axisFormat=[{threshold:20,increments:{1:{increment:1,// 1 minute
unit:'i',format:'HH"h"MM (dd/mm/yy)'},2:{// 10 seconds
increment:1,unit:'s',format:'MM:ss"s"'}}},{threshold:50,increments:{1:{increment:1,// 1 minute
unit:'i',format:'HH"h"MM (dd/mm/yy)'},2:{// 2 seconds
increment:2,unit:'s',format:'MM:ss"s"'}}},{threshold:100,increments:{1:{increment:1,// 1 minute
unit:'i',format:'HH"h"MM (dd/mm/yy)'},2:{// 5 seconds
increment:5,unit:'s',format:'MM:ss"s"'}}},{threshold:600,increments:{1:{increment:10,// 1 minute
unit:'i',format:'HH"h"MM (dd/mm/yy)'},2:{// 10 seconds
increment:30,unit:'s',format:'MM:ss"s"'}}},{// One day
threshold:1000,increments:{1:{// 1h
increment:1,unit:'h',format:'HH"h"MM (dd/mm/yy)'},2:{// 10 minutes
increment:10,unit:'i',format:'MM"min"'}}},{// One day
threshold:1500,increments:{1:{increment:1,// One day on the first axis
unit:'d',format:'dd/mm/yyyy'},2:{increment:1,unit:'i',format:'H"h"MM'}}},{// One day
threshold:3000,increments:{1:{increment:1,// One day on the first axis
unit:'d',format:'dd/mm/yyyy'},2:{increment:2,unit:'i',format:'H"h"MM'}}},{// One day
threshold:8000,increments:{1:{increment:1,// One day on the first axis
unit:'d',format:'dd/mm/yyyy'},2:{increment:10,unit:'i',format:'H"h"MM'}}},{// One day
threshold:26400,increments:{1:{increment:1,// One day on the first axis
unit:'d',format:'dd/mm/yyyy'},2:{increment:20,unit:'i',format:'H"h"MM'}}},{// One day
threshold:86400,increments:{1:{increment:1,// One day on the first axis
unit:'d',format:'dd/mm/yyyy'},2:{increment:1,unit:'h',format:'H"h"MM'}}},{// One day
threshold:200000,increments:{1:{increment:1,unit:'d',format:'dd/mm/yyyy'},2:{increment:2,// One day on the first axis
unit:'h',format:'H"h"MM'}}},{// One day
threshold:400000,increments:{1:{increment:1,unit:'d',format:'dd/mm/yyyy'},2:{increment:6,// One day on the first axis
unit:'h',format:'H"h"MM'}}},{// One day
threshold:1400000,increments:{1:{increment:1,unit:'d',format:'dd/mm/yyyy'},2:{increment:12,// One day on the first axis
unit:'h',format:'HH"h"MM'}}},{// One day
threshold:6400000,increments:{1:{increment:1,unit:'m',format:'mmmm yyyy'},2:{increment:1,// One day on the first axis
unit:'d',format:'dd'}}},{// One day
threshold:12400000,increments:{1:{increment:1,unit:'m',format:'mmmm yyyy'},2:{increment:2,// One day on the first axis
unit:'d',format:'dd'}}},{// One day
threshold:86400000*0.5,increments:{1:{increment:1,unit:'m',format:'mmmm yyyy'},2:{increment:7,// One day on the first axis
unit:'d',format:'dd'}}},{// One day
threshold:86400000*0.8,increments:{1:{increment:1,unit:'m',format:'mmmm yyyy'},2:{increment:15,// One day on the first axis
unit:'d',format:'dd'}}},{// One month
threshold:86400000*1,increments:{1:{increment:1,unit:'y',format:'yyyy'},2:{increment:3,// One day on the first axis
unit:'m',format:'mm/yyyy'}}},{// One month
threshold:86400000*2,increments:{1:{increment:1,unit:'y',format:'yyyy'},2:{increment:4,// One day on the first axis
unit:'m',format:'mm/yyyy'}}},{// One month
threshold:86400000*10,increments:{1:{increment:1,unit:'y',format:'yyyy'},2:{increment:6,// One day on the first axis
unit:'m',format:'mm/yyyy'}}},{// One month
threshold:86400000*12,increments:{1:{increment:1,unit:'y',format:'yyyy'},2:{increment:1,// One day on the first axis
unit:'y',format:'yyyy'}}}];/*
	   * Date Format 1.2.3
	   * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
	   * MIT license
	   *
	   * Includes enhancements by Scott Trenda <scott.trenda.net>
	   * and Kris Kowal <cixar.com/~kris.kowal/>
	   *
	   * Accepts a date, a mask, or a date and a mask.
	   * Returns a formatted version of the given date.
	   * The date defaults to the current date/time.
	   * The mask defaults to dateFormat.masks.default.
	   */var dateFormat=function(){var token=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[WLloSZ]|"[^"]*"|'[^']*'/g,timezone=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,timezoneClip=/[^-+\dA-Z]/g,pad=function pad(val,len){val=String(val);len=len||2;while(val.length<len){val="0"+val;}return val;},getWeek=function getWeek(d,f){var onejan=new Date(d[f+'FullYear'](),0,1);return Math.ceil(((d-onejan)/86400000+onejan[f+'Day']()+1)/7);};// Regexes and supporting functions are cached through closure
return function(date,mask,utc){var dF=dateFormat;// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
if(arguments.length==1&&Object.prototype.toString.call(date)=="[object String]"&&!/\d/.test(date)){mask=date;date=undefined;}// Passing date through Date applies Date.parse, if necessary
date=date?new Date(date):new Date();if(isNaN(date))throw SyntaxError("invalid date:"+date);mask=String(dF.masks[mask]||mask||dF.masks["default"]);// Allow setting the utc argument via the mask
if(mask.slice(0,4)=="UTC:"){mask=mask.slice(4);utc=true;}var _=utc?"getUTC":"get",d=date[_+"Date"](),D=date[_+"Day"](),m=date[_+"Month"](),y=date[_+"FullYear"](),H=date[_+"Hours"](),M=date[_+"Minutes"](),s=date[_+"Seconds"](),L=date[_+"Milliseconds"](),o=utc?0:date.getTimezoneOffset(),flags={d:d,dd:pad(d),ddd:dF.i18n.dayNames[D],dddd:dF.i18n.dayNames[D+7],m:m+1,mm:pad(m+1),mmm:dF.i18n.monthNames[m],mmmm:dF.i18n.monthNames[m+12],yy:String(y).slice(2),yyyy:y,h:H%12||12,hh:pad(H%12||12),H:H,HH:pad(H),M:M,MM:pad(M),s:s,ss:pad(s),l:pad(L,3),L:pad(L>99?Math.round(L/10):L),t:H<12?"a":"p",tt:H<12?"am":"pm",T:H<12?"A":"P",TT:H<12?"AM":"PM",Z:utc?"UTC":(String(date).match(timezone)||[""]).pop().replace(timezoneClip,""),o:(o>0?"-":"+")+pad(Math.floor(Math.abs(o)/60)*100+Math.abs(o)%60,4),S:["th","st","nd","rd"][d%10>3?0:(d%100-d%10!=10)*d%10],W:getWeek(date,_)};return mask.replace(token,function($0){return $0 in flags?flags[$0]:$0.slice(1,$0.length-1);});};}();// Some common format strings
dateFormat.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};// Internationalization strings
dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};/* END DATE FORMAT */function getClosestIncrement(value,basis){return Math.round(value/basis)*basis;}function roundDate(date,format){switch(format.unit){case's':// Round at n hour
date.setSeconds(getClosestIncrement(date.getSeconds(),format.increment));date.setMilliseconds(0);break;case'i':// Round at n hour
date.setMinutes(getClosestIncrement(date.getMinutes(),format.increment));date.setSeconds(0);date.setMilliseconds(0);break;case'h':// Round at n hour
date.setHours(getClosestIncrement(date.getHours(),format.increment));date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0);break;case'd':date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0);date.setHours(0);date.setDate(getClosestIncrement(date.getDate(),format.increment));break;case'm':date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0);date.setHours(0);date.setDate(1);date.setMonth(getClosestIncrement(date.getMonth(),format.increment));break;case'y':date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0);date.setHours(0);date.setDate(1);date.setMonth(0);//date.setYear( getClosest( date.getDate(), format.increment ) );
break;default:throw"Date format not recognized";break;}return date;}function incrementDate(date,format){switch(format.unit){case's':date.setSeconds(date.getSeconds()+format.increment);date.setMilliseconds(0);break;case'i':date.setMinutes(date.getMinutes()+format.increment);date.setSeconds(0);date.setMilliseconds(0);break;case'h':// Round at n hour
date.setHours(date.getHours()+format.increment);date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0);break;case'd':date.setDate(date.getDate()+format.increment);date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0);date.setHours(0);break;case'm':date.setMonth(date.getMonth()+format.increment);date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0);date.setHours(0);date.setDate(1);break;case'y':date.setFullYear(date.getFullYear()+format.increment);date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0);date.setHours(0);date.setDate(1);date.setMonth(0);break;default:throw"Date format not recognized";break;}return date;}function getGroup(axis,level,number){if(axis.groups[level][number]){axis.groups[level][number].group.setAttribute('display','block');return axis.groups[level][number];}var g={group:document.createElementNS(axis.graph.ns,'g'),text:document.createElementNS(axis.graph.ns,'text')};var line=document.createElementNS(axis.graph.ns,'line');line.setAttribute('stroke','black');line.setAttribute('y1',0);switch(level){case 2:line.setAttribute('y2',6);g.text.setAttribute('y',15);g.line=line;g.group.appendChild(g.line);break;case 1:line.setAttribute('y2',20);g.text.setAttribute('y',10);g.line1=line;g.line2=line.cloneNode();g.group.appendChild(g.line1);g.group.appendChild(g.line2);break;}g.text.setAttribute('text-anchor','middle');g.text.setAttribute('dominant-baseline','middle');g.group.appendChild(g.text);axis.getWrapper(level).appendChild(g.group);return axis.groups[level][number]=g;}function hideGroups(axis,level,from){for(;from<axis.groups[level].length;from++){hideGroup(axis.groups[level][from]);}}function hideGroup(group){group.group.setAttribute('display','none');}function getDateText(date,format){return dateFormat(date,format);}function renderGroup(level,group,text,minPx,maxPx,x1,x2){switch(level){case 1:var x1B=Math.max(minPx,Math.min(maxPx,x1)),x2B=Math.max(minPx,Math.min(maxPx,x2));if(isNaN(x2B)||isNaN(x1B)){return;}group.line1.setAttribute('x1',x1B);group.line2.setAttribute('x1',x2B);group.line1.setAttribute('x2',x1B);group.line2.setAttribute('x2',x2B);group.text.setAttribute('x',(x1B+x2B)/2);while(text.length*8>x2B-x1B){text=text.substr(0,text.length-2)+".";if(text.length==1){text="";break;}}group.text.textContent=text;break;case 2:if(x1<minPx||x1>maxPx){hideGroup(group);return;}group.line.setAttribute('x1',x1);group.line.setAttribute('x2',x1);group.text.setAttribute('x',x1);group.text.textContent=text;break;}}var GraphXAxis=function(_graph2$default3){_inherits(GraphXAxis,_graph2$default3);function GraphXAxis(graph,topbottom,options){_classCallCheck(this,GraphXAxis);return _possibleConstructorReturn(this,(GraphXAxis.__proto__||Object.getPrototypeOf(GraphXAxis)).apply(this,arguments));}_createClass(GraphXAxis,[{key:'init',value:function init(graph,options){_get(GraphXAxis.prototype.__proto__||Object.getPrototypeOf(GraphXAxis.prototype),'init',this).call(this,graph,options);this.wrapper={1:document.createElementNS(graph.ns,'g'),2:document.createElementNS(graph.ns,'g')};this.groups={1:[],2:[]};var rect=document.createElementNS(graph.ns,'rect');rect.setAttribute('fill','#c0c0c0');rect.setAttribute('stroke','#808080');rect.setAttribute('height','20');rect.setAttribute('x','0');rect.setAttribute('y','0');this.rect=rect;this.wrapper[1].appendChild(this.rect);//    this.init( graph, options );
this.group.appendChild(this.wrapper[1]);this.group.appendChild(this.wrapper[2]);this.wrapper[1].setAttribute('transform','translate( 0, 25 )');this.wrapper[2].setAttribute('transform','translate( 0, 00 )');}},{key:'draw',value:function draw(){// Redrawing of the axis
var visible;//this.drawInit();
this.cacheCurrentMax();this.cacheCurrentMin();if(this.currentAxisMin==undefined||this.currentAxisMax==undefined){this.setMinMaxToFitSeries(true);// We reset the min max as a function of the series
}this.line.setAttribute('x1',this.getMinPx());this.line.setAttribute('x2',this.getMaxPx());this.line.setAttribute('y1',0);this.line.setAttribute('y2',0);var widthPx=this.maxPx-this.minPx;var widthTime=this.getCurrentInterval();var timePerPx=widthTime/widthPx;var maxVal=this.getCurrentMax();var minVal=this.getCurrentMin();this.rect.setAttribute('width',widthPx);this.rect.setAttribute('x',this.minPx);if(!maxVal||!minVal){return 0;}var currentFormat;for(i=0;i<axisFormat.length;i++){if(axisFormat[i].threshold>timePerPx){currentFormat=axisFormat[i];break;}}if(!currentFormat){currentFormat=axisFormat[axisFormat.length-1];}var xVal1,xVal2,level=0,dateFirst,currentDate,text,group,i;for(level=1;level<=2;level++){if(!util.isNumeric(minVal)){hideGroups(this,level,0);break;}dateFirst=new Date(minVal);currentDate=roundDate(dateFirst,currentFormat.increments[level]);i=0;do{/** @ignore */text=getDateText(currentDate,currentFormat.increments[level].format);group=getGroup(this,level,i);xVal1=this.getPx(currentDate.getTime());currentDate=incrementDate(currentDate,currentFormat.increments[level]);xVal2=this.getPx(currentDate.getTime());renderGroup(level,group,text,this.getMinPx(),this.getMaxPx(),xVal1,xVal2);i++;if(i>100){break;}}while(currentDate.getTime()<maxVal);hideGroups(this,level,i);}}},{key:'isX',value:function isX(){return true;}},{key:'getWrapper',value:function getWrapper(level){return this.wrapper[level];}},{key:'setShift',value:function setShift(shift,totalDimension){this.shift=shift;this.group.setAttribute('transform','translate(0 '+(this.top?this.shift:this.graph.getDrawingHeight()-this.shift)+')');}},{key:'getAxisPosition',value:function getAxisPosition(){return 60;}},{key:'setMinMaxFlipped',value:function setMinMaxFlipped(){var interval=this.maxPx-this.minPx;var maxPx=interval*this.options.span[1]+this.minPx;var minPx=interval*this.options.span[0]+this.minPx;this.minPxFlipped=this.isFlipped()?maxPx:minPx;this.maxPxFlipped=this.isFlipped()?minPx:maxPx;}}]);return GraphXAxis;}(_graph2.default);exports.default=GraphXAxis;});/***/},/* 14 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(1),__webpack_require__(15),__webpack_require__(16),__webpack_require__(3),__webpack_require__(17),__webpack_require__(5)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('../graph.core'),require('./graph.serie'),require('./slotoptimizer'),require('../graph.util'),require('../mixins/graph.mixin.errorbars'),require('../util/waveform'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graph,global.slotoptimizer,global.graph,global.graphMixin,global.waveform);global.graphSerieLine=mod.exports;}})(this,function(exports,_graph,_graph3,_slotoptimizer,_graph5,_graphMixin,_waveform){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);var _graph4=_interopRequireDefault(_graph3);var _slotoptimizer2=_interopRequireDefault(_slotoptimizer);var util=_interopRequireWildcard(_graph5);var _graphMixin2=_interopRequireDefault(_graphMixin);var _waveform2=_interopRequireDefault(_waveform);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * @name SerieLineDefaultOptions
	   * @object
	   * @static
	   * @memberof SerieLine
	   */var defaults={lineColor:'black',lineStyle:1,flip:false,label:"",lineWidth:1,markers:false,trackMouse:false,trackMouseLabel:false,trackMouseLabelRouding:1,lineToZero:false,selectableOnClick:true,markersIndependant:false};/**
	   * Serie line
	   * @example graph.newSerie( name, options, "line" );
	   * @see Graph#newSerie
	   * @extends Serie
	   */var SerieLine=function(_graph4$default){_inherits(SerieLine,_graph4$default);function SerieLine(){_classCallCheck(this,SerieLine);return _possibleConstructorReturn(this,(SerieLine.__proto__||Object.getPrototypeOf(SerieLine)).apply(this,arguments));}/**
	     * Initializes the serie
	     * @memberof SerieLine
	     */_createClass(SerieLine,[{key:'init',value:function init(graph,name,options){var _this23=this;this.selectionType="unselected";this.markerFamilies={};this.graph=graph;this.name=name;this.options=util.extend(true,{},defaults,options||{});// Creates options
util.mapEventEmission(this.options,this);// Register events
// Creates an empty style variable
this.styles={};// Unselected style
this.styles.unselected={lineColor:this.options.lineColor,lineStyle:this.options.lineStyle,lineWidth:this.options.lineWidth,markers:this.options.markers};this.styles.selected={lineWidth:3};this.extendStyles();this.markersDom=new Map();this.shown=true;this.data=[];this._isMinOrMax={x:{min:false,max:false},y:{min:false,max:false}};// Optimize is no markerPoints => save loops
//      this.markerPoints = {};
this.groupLines=document.createElementNS(this.graph.ns,'g');this.domMarker=document.createElementNS(this.graph.ns,'path');this.domMarker.style.cursor='pointer';this.groupMain=document.createElementNS(this.graph.ns,'g');this.additionalData={};this.marker=document.createElementNS(this.graph.ns,'circle');this.marker.setAttribute('fill','black');this.marker.setAttribute('r',3);this.marker.setAttribute('display','none');this.markerLabel=document.createElementNS(this.graph.ns,'text');this.markerLabelSquare=document.createElementNS(this.graph.ns,'rect');this.markerLabelSquare.setAttribute('fill','white');this.domMarkerHover={};this.domMarkerSelect={};this.markerHovered=0;this.groupMarkerSelected=document.createElementNS(this.graph.ns,'g');this.markerPoints={};//this.scale = 1;
//this.shift = 0;
this.lines=[];this.groupMain.appendChild(this.groupLines);this.groupMain.appendChild(this.marker);this.groupMain.appendChild(this.groupMarkerSelected);this.groupMain.appendChild(this.markerLabelSquare);this.groupMain.appendChild(this.markerLabel);this.groupMarkers=document.createElementNS(this.graph.ns,'g');this.groupMain.appendChild(this.groupMarkers);this.independantMarkers=[];if(this.initExtended1){this.initExtended1();}this.groupLines.addEventListener('click',function(e){if(_this23.options.selectableOnClick){if(_this23.isSelected()){_this23.graph.unselectSerie(_this23);}else{_this23.graph.selectSerie(_this23);}}});if(this.options.markers){this.setMarkers(this.options.markers,"unselected");}}},{key:'setWaveform',value:function setWaveform(waveform){if(!(waveform instanceof _waveform2.default)){throw"Cannot assign waveform to serie. Waveform is not of the proper Waveform instance";}this._waveform=waveform;this.minX=this._waveform.getXMin();this.maxX=this._waveform.getXMax();this.minY=this._waveform.getMin();this.maxY=this._waveform.getMax();this.graph.updateDataMinMaxAxes();this.dataHasChanged();return this;}/**
	     * Sets the options of the serie
	     * @see SerieLineDefaultOptions
	     * @param {Object} options - A object containing the options to set
	     * @return {SerieLine} The current serie
	     * @memberof SerieLine
	     */},{key:'setOptions',value:function setOptions(options){this.options=util.extend(true,{},SerieLine.prototype.defaults,options||{});// Unselected style
this.styles.unselected={lineColor:this.options.lineColor,lineStyle:this.options.lineStyle,markers:this.options.markers};this.applyLineStyles();return this;}},{key:'calculateSlots',value:function calculateSlots(){var self=this;this.slotsData={};for(var i=0,l=this.slots.length;i<l;i++){this.calculateSlot(this.slots[i],i);}}},{key:'slotCalculator',value:function slotCalculator(slot,slotNumber){return(0,_slotoptimizer2.default)({min:this.minX,max:this.maxX,data:this.data,slot:slot,slotNumber:slotNumber,flip:this.getFlip()});}},{key:'calculateSlot',value:function calculateSlot(slot,slotNumber){var self=this;this.slotsData[slot]=this.slotCalculator(slot,slotNumber);this.slotsData[slot].then(function(data){self.slotsData[slot]=data;return data;});}},{key:'onMouseOverMarker',value:function onMouseOverMarker(e,index){var toggledOn=this.toggleMarker(index,true,true);if(this.options.onMouseOverMarker){this.options.onMouseOverMarker(index,this.infos?this.infos[index[0]]||false:false,[this.data[index[1]][index[0]*2],this.data[index[1]][index[0]*2+1]]);}}},{key:'onMouseOutMarker',value:function onMouseOutMarker(e,index){this.markersOffHover();if(this.options.onMouseOutMarker){this.options.onMouseOutMarker(index,this.infos?this.infos[index[0]]||false:false,[this.data[index[1]][index[0]*2],this.data[index[1]][index[0]*2+1]]);}}/**
	     * Selects one of the markers of the serie
	     * @param {Number} index - The point index to select (starting at 0)
	     * @param {Boolean} [force = undefined] - Forces state of the marker. <code>true</code> forces selection, <code>false</code> forces deselection. <code>undefined</code> toggles the state of the marker
	     * @param {Boolean} [hover = false] - <code>true</code> to set the selection in mode "hover" (will disappear on mouse out of the marker). <code>false</code> to set the selection in mode "select" (will disappear when another marker is selected)
	     * @returns {Boolean} The new state of the marker
	     * @memberof SerieLine
	     */},{key:'toggleMarker',value:function toggleMarker(index,force,hover){var i=index[0];index=index.join();var _on;if(typeof force==='undefined'){_on=!hover?!this.domMarkerSelect[index]:!this.domMarkerHover[index];}var el=this['domMarker'+(hover?'Hover':'Select')];if(_on||force===true){if(!el[index]){var dom=document.createElementNS(this.graph.ns,'path');this.setMarkerStyleTo(dom,this.markerFamilies[this.selectionType][this.getMarkerCurrentFamily(i)]);this['domMarker'+(hover?'Hover':'Select')][index]=dom;this.groupMarkerSelected.appendChild(dom);}else{dom=el[index];}var x,y;if(this.mode=='x_equally_separated'){x=this._xDataToUse.x+i*this._xDataToUse.dx;y=this.data[i];}else{x=this.data[i*2];y=this.data[i*2+1];}x=this.getX(x);y=this.getY(y);dom.setAttribute('d',"M "+x+" "+y+" "+this.getMarkerPath(this.markerFamilies[this.selectionType][this.getMarkerCurrentFamily(i)],1));if(hover){this.markerHovered++;}}else if(!_on||force===false){if(hover&&this.domMarkerHover[index]&&!this.domMarkerSelect[index]||this.domMarkerSelect[index]){if(!el[index]){return;}this.groupMarkerSelected.removeChild(el[index]);delete el[index];if(hover)this.markerHovered--;}}return _on;}/**
	     * Toggles off markers that have the hover mode "on"
	     * @returns {SerieLine} The current serie
	     * @memberof SerieLine
	     */},{key:'markersOffHover',value:function markersOffHover(){for(var i in this.domMarkerHover){this.toggleMarker(i.split(','),false,true);}return this;}/**
	     * Toggles off markers that have the select mode "on"
	     * @returns {SerieLine} The current serie
	     * @memberof SerieLine
	     */},{key:'markersOffSelect',value:function markersOffSelect(){for(var i in this.domMarkerSelect){this.toggleMarker(i.split(','),false,false);}return this;}},{key:'onClickOnMarker',value:function onClickOnMarker(e,index){var toggledOn=this.toggleMarker(index);if(toggledOn&&this.options.onSelectMarker){this.options.onSelectMarker(index,this.infos?this.infos[index[0]]||false:false);}if(!toggledOn&&this.options.onUnselectMarker){this.options.onUnselectMarker(index,this.infos?this.infos[index[0]]||false:false);}if(this.options.onToggleMarker){this.options.onToggleMarker(index,this.infos?this.infos[index[0]]||false:false,toggledOn);}}},{key:'_getMarkerIndexFromEvent',value:function _getMarkerIndexFromEvent(e){var px=this.graph._getXY(e);//  return this.searchIndexByPxXY( ( px.x ), ( px.y ) );
return this.searchIndexByPxXY(px.x-this.graph.getPaddingLeft(),px.y-this.graph.getPaddingTop());}},{key:'onMouseWheel',value:function onMouseWheel(){}/**
	     * Cleans the DOM from the serie internal object (serie and markers). Mostly used internally when a new {@link Serie#setData} is called
	     * @returns {SerieLine} The current serie
	     * @memberof SerieLine
	     */},{key:'empty',value:function empty(){for(var i=0,l=this.lines.length;i<l;i++){this.groupLines.removeChild(this.lines[i]);}this.lines=[];return this;}/**
	     * Applies a selection to the serie
	     * @param {String} [ selectionType = "selected" ] - The selection name
	     * @returns {SerieLine} The current serie
	     * @see SerieLine#unselect
	     * @memberof SerieLine
	     */},{key:'select',value:function select(selectionType){selectionType=selectionType||"selected";this.selected=selectionType!=="unselected";if(this.areMarkersShown()||this.areMarkersShown(selectionType)){this.selectionType=selectionType;this.draw(true);// Drawing is absolutely required here
this.applyLineStyles();}else{this.selectionType=selectionType;this.applyLineStyles();}this.applyLineStyle(this.getSymbolForLegend());return this;}/**
	     * Removes the selection to the serie. Effectively, calls {@link SerieLine#select}("unselected").
	     * @returns {SerieLine} The current serie
	     * @see SerieLine#select
	     * @memberof SerieLine
	     */},{key:'unselect',value:function unselect(){this.selected=false;return this.select("unselected");}/**
	     * Degrades the data of the serie. This option is used for big data sets that have monotoneously increasing (or decreasing) x values.
	     * For example, a serie containing 1'000'000 points, displayed over 1'000px, will have 1'000 points per pixel. Often it does not make sense to display more than 2-3 points per pixel.
	     * <code>degrade( pxPerPoint )</code> allows a degradation of the serie, based on a a number of pixel per point. It computes the average of the data that would be displayed over each pixel range
	     * Starting from jsGraph 2.0, it does not calculate the minimum and maximum and creates the zone serie anymore
	     * @return {SerieLine} The current serie instance
	     * @example serie.degrade( 0.5 ); // Will display 2 points per pixels
	     * @memberof SerieLine
	     */},{key:'degrade',value:function degrade(pxPerP){this.degradationPx=pxPerP;return this;}},{key:'drawInit',value:function drawInit(force){var _this24=this;var data,xData;this.currentLineId=0;this.counter=0;this._drawn=true;this.currentLine="";// Degradation
if(this._waveform){if(this.degradationPx){this._waveform.resampleForDisplay({resampleToPx:this.degradationPx,xPosition:this.getXAxis().getPx.bind(this.getXAxis()),minX:this.getXAxis().getCurrentMin(),maxX:this.getXAxis().getCurrentMax()});this._dataToUse=[this._waveform.getDataToUseFlat()];}else if(this._waveform.hasAggregation()){var xaxis=this.getXAxis(),numberOfPointsInTotal=this.graph.getDrawingWidth()*(xaxis.getDataMax()-xaxis.getDataMin())/(xaxis.getCurrentMax()-xaxis.getCurrentMin()),promise=this._waveform.selectAggregatedData(numberOfPointsInTotal,this.getXAxis().getCurrentMin(),this.getXAxis().getCurrentMax());if(promise instanceof Promise){promise.then(function(){_this24.draw(force);});return false;}else{this._dataToUse=this._waveform.getDataToUseFlat();}}//    this._dataToUse = this._waveform.getDataToUseFlat();
}else{this._dataToUse=this.data;this._xDataToUse=this.xData;}return true;}},{key:'removeLinesGroup',value:function removeLinesGroup(){this._afterLinesGroup=this.groupLines.nextSibling;this.groupMain.removeChild(this.groupLines);}},{key:'insertLinesGroup',value:function insertLinesGroup(){if(!this._afterLinesGroup){throw"Could not find group after lines to insertion.";}this.groupMain.insertBefore(this.groupLines,this._afterLinesGroup);this._afterLinesGroup=false;}},{key:'removeExtraLines',value:function removeExtraLines(){var i=this.currentLineId,l=this.lines.length;for(;i<l;i++){this.groupLines.removeChild(this.lines[i]);}this.lines.splice(this.currentLineId,l-this.currentLineId);this.currentLineId=0;}/**
	     * Draws the serie
	     * @memberof SerieLine
	     */},{key:'draw',value:function draw(force){// Serie redrawing
if(!this.getXAxis()||!this.getYAxis()){throw"No axes were defined for this serie";}if(force||this.hasDataChanged()){if(!this.drawInit(force)){return;}var data=this._dataToUse,xData=this._xDataToUse,slotToUse=this._slotToUse;this.removeLinesGroup();this.eraseMarkers();this.lookForMaxima=true;this.lookForMinima=false;this.markerFamily=this.markerFamilies[this.selectionType||"unselected"];this.pos0=this.getYAxis().getPos(0);if(this.error){this.errorDrawInit();}this._draw();if(this.error){this.errorDraw();}this.removeExtraLines();this.insertMarkers();this.insertLinesGroup();}// Unhovers everything
for(var i in this.domMarkerHover){this.toggleMarker(i.split(','),false,true);}// Deselects everything
for(var i in this.domMarkerSelect){this.toggleMarker(i.split(','),false,false);}this.applyLineStyle(this.getSymbolForLegend());if(this.hasStyleChanged(this.selectionType)){this.updateStyle();}this.dataHasChanged(false);}},{key:'_draw',value:function _draw(){var self=this,waveform=this._waveform,data=void 0,x=void 0,y=void 0,lastX=false,lastY=false,xpx=void 0,ypx=void 0,xpx2=void 0,ypx2=void 0,xAxis=this.getXAxis(),yAxis=this.getYAxis(),xMin=xAxis.getCurrentMin(),yMin=yAxis.getCurrentMin(),xMax=xAxis.getCurrentMax(),yMax=yAxis.getCurrentMax();if(!waveform){return;}data=waveform.getData(true);// Y crossing
var yLeftCrossingRatio=void 0,yLeftCrossing=void 0,yRightCrossingRatio=void 0,yRightCrossing=void 0,xTopCrossingRatio=void 0,xTopCrossing=void 0,xBottomCrossingRatio=void 0,xBottomCrossing=void 0;var pointOutside=false;var lastPointOutside=false;var pointOnAxis=void 0;var _monotoneous=this.isMonotoneous(),_markersShown=this.markersShown();var i=0,l=waveform.getLength();this.counter1=0;this.currentLine="";if(waveform.isXMonotoneous()){if(waveform.isXMonotoneousAscending()){i=waveform.getIndexFromX(xMin,true)||0;l=waveform.getIndexFromX(xMax,true);if(l===false){l=waveform.getLength();}}else{i=waveform.getIndexFromX(xMax,true)||0;l=waveform.getIndexFromX(xMin,true);if(l===false){l=data.length;}}l+=2;if(l>data.length){l=data.length;}}for(;i<l;i+=1){x=waveform.getX(i,true);y=data[i];if(x!=x||y!=y){// NaN checks
this._createLine();continue;}if(x<xMin&&lastX<xMin||x>xMax&&lastX>xMax||(y<yMin&&lastY<yMin||y>yMax&&lastY>yMax)&&!this.options.lineToZero){lastX=x;lastY=y;lastPointOutside=true;continue;}this.counter2=i;if(_markersShown){this.getMarkerCurrentFamily(this.counter2);}xpx2=this.getX(x);ypx2=this.getY(y);//xpx2 = 0;
//ypx2 = 0;
if(xpx2==xpx&&ypx2==ypx){continue;}if(!_monotoneous){pointOutside=x<xMin||y<yMin||x>xMax||y>yMax;}else{pointOutside=y<yMin||y>yMax;}if(this.options.lineToZero){pointOutside=x<xMin||x>xMax;if(pointOutside){continue;}}else{if(pointOutside||lastPointOutside){if((lastX===false||lastY===false)&&!lastPointOutside){xpx=xpx2;ypx=ypx2;lastX=x;lastY=y;}else{pointOnAxis=[];// Y crossing
yLeftCrossingRatio=(x-xMin)/(x-lastX);yLeftCrossing=y-yLeftCrossingRatio*(y-lastY);yRightCrossingRatio=(x-xMax)/(x-lastX);yRightCrossing=y-yRightCrossingRatio*(y-lastY);// X crossing
xTopCrossingRatio=(y-yMin)/(y-lastY);xTopCrossing=x-xTopCrossingRatio*(x-lastX);xBottomCrossingRatio=(y-yMax)/(y-lastY);xBottomCrossing=x-xBottomCrossingRatio*(x-lastX);if(yLeftCrossingRatio<1&&yLeftCrossingRatio>0&&yLeftCrossing!==false&&yLeftCrossing<yMax&&yLeftCrossing>yMin){pointOnAxis.push([xMin,yLeftCrossing]);}if(yRightCrossingRatio<1&&yRightCrossingRatio>0&&yRightCrossing!==false&&yRightCrossing<yMax&&yRightCrossing>yMin){pointOnAxis.push([xMax,yRightCrossing]);}if(xTopCrossingRatio<1&&xTopCrossingRatio>0&&xTopCrossing!==false&&xTopCrossing<xMax&&xTopCrossing>xMin){pointOnAxis.push([xTopCrossing,yMin]);}if(xBottomCrossingRatio<1&&xBottomCrossingRatio>0&&xBottomCrossing!==false&&xBottomCrossing<xMax&&xBottomCrossing>xMin){pointOnAxis.push([xBottomCrossing,yMax]);}if(pointOnAxis.length>0){if(!pointOutside){// We were outside and now go inside
if(pointOnAxis.length>1){console.error("Programmation error. Please e-mail me.");console.log(pointOnAxis,xBottomCrossing,xTopCrossing,yRightCrossing,yLeftCrossing,y,yMin,yMax,lastY);}this._createLine();this._addPoint(this.getX(pointOnAxis[0][0]),this.getY(pointOnAxis[0][1]),pointOnAxis[0][0],pointOnAxis[0][1],false,false,false);this._addPoint(xpx2,ypx2,lastX,lastY,false,false,true);}else if(!lastPointOutside){// We were inside and now go outside
if(pointOnAxis.length>1){console.error("Programmation error. Please e-mail me.");console.log(pointOnAxis,xBottomCrossing,xTopCrossing,yRightCrossing,yLeftCrossing,y,yMin,yMax,lastY);}this._addPoint(this.getX(pointOnAxis[0][0]),this.getY(pointOnAxis[0][1]),pointOnAxis[0][0],pointOnAxis[0][1],false,false,false);}else{// No crossing: do nothing
if(pointOnAxis.length==2){this._createLine();this._addPoint(this.getX(pointOnAxis[0][0]),this.getY(pointOnAxis[0][1]),pointOnAxis[0][0],pointOnAxis[0][1],false,false,false);this._addPoint(this.getX(pointOnAxis[1][0]),this.getY(pointOnAxis[1][1]),pointOnAxis[0][0],pointOnAxis[0][1],false,false,false);}}}else if(!pointOutside){this._addPoint(xpx2,ypx2,lastX,lastY,i,false,false);}// else {
// Norman:
// This else case is not the sign of a bug. If yLeftCrossing == 0 or 1 for instance, pointOutside or lastPointOutside will be true
// However, there's no need to draw anything because the point is on the axis and will already be covered.
// 28 Aug 2015
/*
	                if ( lastPointOutside !== pointOutside ) {
	                  console.error( "Programmation error. A crossing should have been found" );
	                  console.log( yLeftCrossing, yLeftCrossingRatio, yMax, yMin );
	                  console.log( yRightCrossing, yRightCrossingRatio, yMax, yMin );
	                  console.log( xTopCrossing, xTopCrossingRatio, xMax, xMin );
	                  console.log( xBottomCrossing, xBottomCrossingRatio, xMax, xMin );
	                  console.log( pointOutside, lastPointOutside )
	                 }
	                */// }
}xpx=xpx2;ypx=ypx2;lastX=x;lastY=y;lastPointOutside=pointOutside;continue;}}if(xpx2!=xpx2||ypx2!=ypx2){// NaN checks
if(this.counter>0){this._createLine();}continue;}this._addPoint(xpx2,ypx2,x,y,i,false,true);//this.detectPeaks( x, y );
xpx=xpx2;ypx=ypx2;lastX=x;lastY=y;}this._createLine();if(this._tracker){if(this._trackerDom){this._trackerDom.remove();}var cloned=this.groupLines.cloneNode(true);this.groupMain.appendChild(cloned);for(i=0,l=cloned.children.length;i<l;i++){cloned.children[i].setAttribute('stroke','transparent');cloned.children[i].setAttribute('stroke-width','25px');cloned.children[i].setAttribute('pointer-events','stroke');}self._trackerDom=cloned;self.groupMain.addEventListener("mousemove",function(e){var coords=self.graph._getXY(e),ret=self.handleMouseMove(false,false);self._trackingCallback(self,ret,coords.x,coords.y);});self.groupMain.addEventListener("mouseleave",function(e){self._trackingOutCallback(self);});}return this;}},{key:'kill',value:function kill(){_get(SerieLine.prototype.__proto__||Object.getPrototypeOf(SerieLine.prototype),'kill',this).call(this);}/**
	     * @param {Number} k - Index of the point for which we should get the family
	     * @memberof SerieLine
	     */},{key:'getMarkerCurrentFamily',value:function getMarkerCurrentFamily(k){if(!this.markerPoints||!this.markerPoints[this.selectionType]){return;}var family;for(var z=0;z<this.markerPoints[this.selectionType].length;z++){if(this.markerPoints[this.selectionType][z][0]<=k){// This one is a possibility !
if(this.markerPoints[this.selectionType][z][1]>=k){// Verify that it's in the boundary
this.markerCurrentFamily=this.markerPoints[this.selectionType][z][2];family=this.markerFamilies[this.selectionType][this.markerCurrentFamily];}}else{break;}}if(!family){return false;}this.getMarkerDom(family);return this.markerCurrentFamily;}},{key:'drawSlot',value:function drawSlot(slotToUse,y){var k=0;var i=0,xpx,ypx,max;var j;if(this.isFlipped()){var dataPerSlot=this.slots[y]/(this.maxY-this.minY);var slotInit=Math.floor((this.getYAxis().getCurrentMin()-this.minY)*dataPerSlot);var slotFinal=Math.ceil((this.getYAxis().getCurrentMax()-this.minY)*dataPerSlot);}else{var dataPerSlot=this.slots[y]/(this.maxX-this.minX);var slotInit=Math.floor((this.getXAxis().getCurrentMin()-this.minX)*dataPerSlot);var slotFinal=Math.ceil((this.getXAxis().getCurrentMax()-this.minX)*dataPerSlot);}for(j=slotInit;j<=slotFinal;j++){if(!slotToUse[j]){continue;}if(this.isFlipped()){ypx=Math.floor(this.getY(slotToUse[j].x));max=this.getX(slotToUse[j].max);/*if ( this.options.autoPeakPicking ) {
	              allY.push( [ slotToUse[ j ].max, slotToUse[ j ].x ] );
	            }
	          * @memberof SerieLine
	          */this._addPoint(this.getX(slotToUse[j].start),ypx,false,false,false,false,false);this._addPoint(max,ypx,false,false,false,true,false);this._addPoint(this.getX(slotToUse[j].min),ypx,false,false,false,false,false);this._addPoint(this.getX(slotToUse[j].stop),ypx,false,false,false,true,false);//    k++;
}else{xpx=Math.floor(this.getX(slotToUse[j].x));max=this.getY(slotToUse[j].max);this._addPoint(xpx,this.getY(slotToUse[j].start),false,false,false,false,false);this._addPoint(xpx,max,false,false,false,true,false);this._addPoint(xpx,this.getY(slotToUse[j].min),false,false,false,false,false);this._addPoint(xpx,this.getY(slotToUse[j].stop),false,false,false,true,false);//this.counter ++;
}}this._createLine();i++;}},{key:'setMarkerStyleTo',value:function setMarkerStyleTo(dom,family){if(!dom||!family){console.trace();throw"Cannot set marker style. DOM does not exist.";}dom.setAttribute('fill',family.fillColor||'transparent');dom.setAttribute('stroke',family.strokeColor||this.getLineColor());dom.setAttribute('stroke-width',family.strokeWidth||1);}/**
	     * Hides the tracking marker (see the trackMouse option)
	     * @memberof SerieLine
	     */},{key:'hideTrackingMarker',value:function hideTrackingMarker(){this.marker.setAttribute('display','none');this.markerLabel.setAttribute('display','none');this.markerLabelSquare.setAttribute('display','none');}},{key:'_addPoint',value:function _addPoint(xpx,ypx,x,y,j,move,allowMarker){/*if( ! this.currentLineId ) {
	          throw "No current line"
	        }* @memberof SerieLine
	      */if(xpx!==xpx||ypx!==ypx){return;}if(this.counter==0){this.currentLine='M ';}else{if(this.options.lineToZero||move){this.currentLine+='M ';}else{this.currentLine+="L ";}}this.currentLine+=xpx;this.currentLine+=" ";this.currentLine+=ypx;this.currentLine+=" ";if(this.options.lineToZero&&this.pos0!==undefined){this.currentLine+="L ";this.currentLine+=xpx;this.currentLine+=" ";this.currentLine+=pos;this.currentLine+=" ";}if(this.error){this.errorAddPoint(j,x,y,xpx,ypx);}if(!this.markerPoints){this.counter++;return;}if(this.markersShown()&&allowMarker!==false&&this.markerFamily){drawMarkerXY(this,this.markerFamily[this.markerCurrentFamily],xpx,ypx,this.markersDom.get(this.markerFamily[this.markerCurrentFamily]));}this.counter++;}// Returns the DOM
},{key:'_createLine',value:function _createLine(){var i=this.currentLineId++,line;// Creates a line if needed
if(this.lines[i]){line=this.lines[i];}else{line=document.createElementNS(this.graph.ns,'path');this.applyLineStyle(line);this.groupLines.appendChild(line);this.lines[i]=line;}if(this.counter==0){line.setAttribute('d','');}else{line.setAttribute('d',this.currentLine);}this.currentLine="M ";this.counter=0;return line;}/**
	     * Reapply the current style to the serie lines elements. Mostly used internally
	     * @memberof SerieLine
	     */},{key:'applyLineStyles',value:function applyLineStyles(){for(var i=0;i<this.lines.length;i++){this.applyLineStyle(this.lines[i]);}}/**
	     * Applies the current style to a line element. Mostly used internally
	     * @memberof SerieLine
	     */},{key:'applyLineStyle',value:function applyLineStyle(line){line.setAttribute('stroke',this.getLineColor());line.setAttribute('stroke-width',this.getLineWidth());if(this.getLineDashArray()){line.setAttribute('stroke-dasharray',this.getLineDashArray());}else{line.removeAttribute('stroke-dasharray');}line.setAttribute('fill','none');//	line.setAttribute('shape-rendering', 'optimizeSpeed');
}/**
	     * Updates the current style (lines + legend) of the serie. Use this method if you have explicitely changed the options of the serie
	     * @example var opts = { lineColor: 'red' };
	     * var s = graph.newSerie( "name", opts ).setData( someData );
	     * opts.lineColor = 'green';
	     * s.updateStyle(); // Sets the lineColor to green
	     * s.draw(); // Would also do the same thing, but recalculates the whole serie display (including (x,y) point pairs)
	     * @memberof SerieLine
	     */},{key:'updateStyle',value:function updateStyle(){this.applyLineStyles();this.setLegendSymbolStyle();this.styleHasChanged(false);}// Revised August 2014. Ok
},{key:'getMarkerPath',value:function getMarkerPath(family,add){var z=family.zoom||1,add=add||0,el=[];switch(family.type){case 2:el=['m',-2,-2,'l',4,4,'m',-4,0,'l',4,-4];break;case 3:el=['m',-2,0,'l',4,0,'m',-2,-2,'l',0,4];break;case 4:el=['m',-1,-1,'l',2,0,'l',-1,2,'z'];break;default:case 1:el=['m',-2,-2,'l',4,0,'l',0,4,'l',-4,0,'z'];break;}if((z==1||!z)&&!add){return el.join(" ");}var num="number";if(!el){return;}for(var i=0,l=el.length;i<l;i++){if(_typeof(el[i])==num){el[i]*=z+add;}}return el.join(" ");}// Revised August 2014. Ok
},{key:'getMarkerDom',value:function getMarkerDom(family){var self=this;if(!this.markersDom.has(family)){var dom=document.createElementNS(this.graph.ns,'path');this.setMarkerStyleTo(dom,family);this.markersDom.set(family,{dom:dom,path:""});dom.addEventListener('mouseover',function(e){var closest=self._getMarkerIndexFromEvent(e);self.onMouseOverMarker(e,closest);});dom.addEventListener('mouseout',function(e){var closest=self._getMarkerIndexFromEvent(e);self.onMouseOutMarker(e,closest);});dom.addEventListener('click',function(e){var closest=self._getMarkerIndexFromEvent(e);self.onClickOnMarker(e,closest);});}return family.dom;}// In case markers are not grouped in families but independant
},{key:'getMarkerDomIndependant',value:function getMarkerDomIndependant(index1,index2,family){var self=this;var index=index1+","+index2;if(!this.independantMarkers[index]){var dom=document.createElementNS(this.graph.ns,'path');this.setMarkerStyleTo(dom,family);dom.addEventListener('mouseover',function(e){self.onMouseOverMarker(e,[index2,index1]);});dom.addEventListener('mouseout',function(e){self.onMouseOutMarker(e,[index2,index1]);});dom.addEventListener('click',function(e){self.onClickOnMarker(e,[index2,index1]);});this.independantMarkers[index]=dom;}this.groupMarkers.appendChild(this.independantMarkers[index]);return this.independantMarkers[index];}/**
	     * Searches the closest point pair (x,y) to the a pair of pixel position
	     * @param {Number} x - The x position in pixels (from the left)
	     * @param {Number} y - The y position in pixels (from the left)
	     * @returns {Number} Index in the data array of the closest (x,y) pair to the pixel position passed in parameters
	     * @memberof SerieLine
	     */},{key:'searchIndexByPxXY',value:function searchIndexByPxXY(x,y){var oldDist=false,xyindex=false,dist;var xData=this._xDataToUse,p_x,p_y;if(this.mode=="x_equally_separated"){for(var i=0,l=this.data.length;i<l;i++){for(var k=0,m=this.data[i].length;k<m;k+=1){p_x=xData[i].x+k*xData[i].dx;p_y=this.data[i][k];dist=Math.pow(this.getX(p_x)-x,2)+Math.pow(this.getY(p_y)-y,2);//console.log(x, y, dist, this.data[i][k], this.data[i][k + 1]);
if(!oldDist||dist<oldDist){oldDist=dist;xyindex=[k,i];}}}}else{for(var i=0,l=this.data.length;i<l;i++){for(var k=0,m=this.data[i].length;k<m;k+=2){p_x=this.data[i][k];p_y=this.data[i][k+1];dist=Math.pow(this.getX(p_x)-x,2)+Math.pow(this.getY(p_y)-y,2);if(!oldDist||dist<oldDist){oldDist=dist;xyindex=[k/2,i];}}}}return xyindex;}/**
	     * Performs a binary search to find the closest point index to an x value. For the binary search to work, it is important that the x values are monotoneous.
	     * @param {Number} valX - The x value to search for
	     * @returns {Object} Index in the data array of the closest (x,y) pair to the pixel position passed in parameters
	     * @memberof SerieLine
	     */},{key:'searchClosestValue',value:function searchClosestValue(valX,data){if(this._waveform){var indexX=this._waveform.getIndexFromX(valX);return{xMin:this._waveform.getX(indexX),xMax:this._waveform.getX(indexX+1),yMin:this._waveform.getY(indexX),yMax:this._waveform.getY(indexX+1)};}return;}},{key:'handleMouseMove',value:function handleMouseMove(xValue,doMarker){var valX=xValue||this.getXAxis().getMouseVal(),xMinIndex,xMin,yMin,xMax,yMax;var value=this.searchClosestValue(valX);if(!value)return;var ratio=(valX-value.xMin)/(value.xMax-value.xMin);var intY=(1-ratio)*value.yMin+ratio*value.yMax;if(doMarker&&this.options.trackMouse){if(value.xMin==undefined){return false;}else{var x=this.getX(this.getFlip()?intY:valX);var y=this.getY(this.getFlip()?valX:intY);this.marker.setAttribute('display','block');this.marker.setAttribute('cx',x);this.marker.setAttribute('cy',y);this.markerLabel.setAttribute('display','block');this.markerLabelSquare.setAttribute('display','block');switch(this.options.trackMouseLabel){case false:break;default:this.markerLabel.textContent=this.options.trackMouseLabel.replace('<x>',valX.toFixed(this.options.trackMouseLabelRouding)).replace('<y>',intY.toFixed(this.options.trackMouseLabelRouding));break;}this.markerLabel.setAttribute('x',x+5);this.markerLabel.setAttribute('y',y-5);this.markerLabelSquare.setAttribute('x',x+5);this.markerLabelSquare.setAttribute('y',y-5-this.graph.options.fontSize);this.markerLabelSquare.setAttribute('width',this.markerLabel.getComputedTextLength()+2);this.markerLabelSquare.setAttribute('height',this.graph.options.fontSize+2);}}return{xBefore:value.xMin,xAfter:value.xMax,yBefore:value.yMin,yAfter:value.yMax,trueX:valX,interpolatedY:intY,xBeforeIndex:value.xBeforeIndex,xIndexClosest:value.xClosest};}/**
	     * Gets the maximum value of the y values between two x values. The x values must be monotoneously increasing
	     * @param {Number} startX - The start of the x values
	     * @param {Number} endX - The end of the x values
	     * @returns {Number} Maximal y value in between startX and endX
	     * @memberof SerieLine
	     */},{key:'getMax',value:function getMax(start,end){var start2=Math.min(start,end),end2=Math.max(start,end),v1=this.searchClosestValue(start2),v2=this.searchClosestValue(end2),i,j,max=-Infinity,initJ,maxJ;//      console.log( start2, end2, v1, v2 );
if(!v1){start2=this.minX;v1=this.searchClosestValue(start2);}if(!v2){end2=this.maxX;v2=this.searchClosestValue(end2);}if(!v1||!v2){return-Infinity;}for(i=v1.dataIndex;i<=v2.dataIndex;i++){initJ=i==v1.dataIndex?v1.xBeforeIndexArr:0;maxJ=i==v2.dataIndex?v2.xBeforeIndexArr:this.data[i].length;for(j=initJ;j<=maxJ;j+=2){max=Math.max(max,this.data[i][j+1]);}}return max;}/**
	     * Gets the minimum value of the y values between two x values. The x values must be monotoneously increasing
	     * @param {Number} startX - The start of the x values
	     * @param {Number} endX - The end of the x values
	     * @returns {Number} Maximal y value in between startX and endX
	     * @memberof SerieLine
	     */},{key:'getMin',value:function getMin(start,end){var start2=Math.min(start,end),end2=Math.max(start,end),v1=this.searchClosestValue(start2),v2=this.searchClosestValue(end2),i,j,min=Infinity,initJ,maxJ;if(!v1){start2=this.minX;v1=this.searchClosestValue(start2);}if(!v2){end2=this.maxX;v2=this.searchClosestValue(end2);}if(!v1||!v2){return Infinity;}for(i=v1.dataIndex;i<=v2.dataIndex;i++){initJ=i==v1.dataIndex?v1.xBeforeIndexArr:0;maxJ=i==v2.dataIndex?v2.xBeforeIndexArr:this.data[i].length;for(j=initJ;j<=maxJ;j+=2){min=Math.min(min,this.data[i][j+1]);}}return min;}/* LINE STYLE * @memberof SerieLine
	     */},{key:'setStyle',value:function setStyle(style){var selectionType=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"unselected";this.styles[selectionType]=style;this.styleHasChanged(selectionType);}},{key:'setLineStyle',value:function setLineStyle(number){var selectionType=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"unselected";var applyToSelected=arguments[2];this.styles[selectionType]=this.styles[selectionType]||{};this.styles[selectionType].lineStyle=number;if(applyToSelected){this.setLineStyle(number,"selected");}this.styleHasChanged(selectionType);return this;}},{key:'getLineStyle',value:function getLineStyle(selectionType){return this.getStyle(selectionType).lineStyle;}},{key:'getLineDashArray',value:function getLineDashArray(){var selectionType=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.selectionType||"unselected";switch(this.getStyle(selectionType).lineStyle){case 2:return"1, 1";break;case 3:return"2, 2";break;case 4:return"3, 3";break;case 5:return"4, 4";break;case 6:return"5, 5";break;case 7:return"5 2";break;case 8:return"2 5";break;case 9:return"4 2 4 4";break;case 10:return"1,3,1";break;case 11:return"9 2";break;case 12:return"2 9";break;case 1:case false:return false;break;default:return this.styles[selectionType].lineStyle;break;}this.styleHasChanged(selectionType);}},{key:'getStyle',value:function getStyle(){var selectionType=arguments.length>0&&arguments[0]!==undefined?arguments[0]:this.selectionType||"unselected";return this.styles[selectionType];}},{key:'extendStyles',value:function extendStyles(){for(var i in this.styles){var s=this.styles[i];if(s){this.styles[i]=util.extend(true,{},this.styles.unselected,s);}}}},{key:'extendStyle',value:function extendStyle(styleTarget,styleOrigin){var s=this.styles[styleTarget];this.styles[styleTarget]=util.extend(true,{},this.styles[styleOrigin||"unselected"],s||{});this.styles[styleTarget].markers.map(function(marker){if(marker.dom){marker.dom="";}});this._recalculateMarkerPoints(styleTarget,this.styles[styleTarget].markers);this.styleHasChanged(styleTarget);}/*  * @memberof SerieLine
	     */},{key:'setLineWidth',value:function setLineWidth(width,selectionType,applyToSelected){selectionType=selectionType||"unselected";this.styles[selectionType]=this.styles[selectionType]||{};this.styles[selectionType].lineWidth=width;if(applyToSelected){this.setLineWidth(width,"selected");}this.styleHasChanged(selectionType);return this;}},{key:'getLineWidth',value:function getLineWidth(selectionType){return this.getStyle(selectionType).lineWidth||1;}/* LINE COLOR * @memberof SerieLine
	     */},{key:'setLineColor',value:function setLineColor(color,selectionType,applyToSelected){selectionType=selectionType||"unselected";this.styles[selectionType]=this.styles[selectionType]||{};this.styles[selectionType].lineColor=color;if(applyToSelected){this.setLineColor(color,"selected");}this.styleHasChanged(selectionType);return this;}},{key:'getLineColor',value:function getLineColor(selectionType){return this.getStyle(selectionType).lineColor||"black";}/* * @memberof SerieLine
	     *//* MARKERS * @memberof SerieLine
	     */},{key:'showMarkers',value:function showMarkers(selectionType,redraw){selectionType=selectionType||"unselected";this.styles[selectionType]=this.styles[selectionType]||{};this.styles[selectionType].showMarkers=true;if(redraw&&this._drawn){this.draw(true);}else{this.styleHasChanged(selectionType);}return this;}},{key:'hideMarkers',value:function hideMarkers(selectionType,redraw){selectionType=selectionType||"unselected";this.styles[selectionType].showMarkers=false;if(redraw&&this._drawn){this.draw(true);}else{this.styleHasChanged(selectionType);}return this;}},{key:'markersShown',value:function markersShown(selectionType){return this.getStyle(selectionType).showMarkers!==false;}},{key:'areMarkersShown',value:function areMarkersShown(){return this.markersShown.apply(this,arguments);}},{key:'isMarkersShown',value:function isMarkersShown(){return this.markersShown.apply(this,arguments);}// Multiple markers
},{key:'setMarkers',value:function setMarkers(families,selectionType,applyToSelected){// Family has to be an object
// Family looks like
/*
	      {
	      	type: 1,
	      	zoom: 1,
	      	strokeWidth: 1,
	      	strokeColor: '',
	      	fillColor: '',
	            points: []
	      }
	      * @memberof SerieLine
	      */this.styles[selectionType||"unselected"]=this.styles[selectionType||"unselected"]||{};this.showMarkers(selectionType,false);if(!Array.isArray(families)&&(typeof families==='undefined'?'undefined':_typeof(families))=='object'){families=[families];}else if(!families){families=[{type:1,zoom:1,points:'all'}];}this.styles[selectionType||"unselected"].markers=families;if(applyToSelected){this.styles["selected"].markers=util.extend(true,{},families);}this._recalculateMarkerPoints(selectionType,families);this.styleHasChanged(selectionType);this.dataHasChanged(true);// Data has not really changed, but marker placing is performed during the draw method
return this;}},{key:'setMarkersPoints',value:function setMarkersPoints(points,family,selectionType){this._extendMarkers("points",points,family,selectionType,true);}},{key:'setMarkersColor',value:function setMarkersColor(color,family,selectionType){this._extendMarkers("color",color,family,selectionType);}},{key:'setMarkersType',value:function setMarkersType(type,family,selectionType){this._extendMarkers("type",type,family,selectionType);}},{key:'setMarkersZoom',value:function setMarkersZoom(zoom,family,selectionType){this._extendMarkers("zoom",zoom,family,selectionType);}},{key:'setMarkersStrokeColor',value:function setMarkersStrokeColor(strokeColor,family,selectionType){this._extendMarkers("strokeColor",strokeColor,family,selectionType);}},{key:'setMarkersStrokeWidth',value:function setMarkersStrokeWidth(strokeWidth,family,selectionType){this._extendMarkers("strokeWidth",strokeWidth,family,selectionType);}},{key:'setMarkersFillColor',value:function setMarkersFillColor(fillColor,family,selectionType){this._extendMarkers("fillColor",fillColor,family,selectionType);}},{key:'_extendMarkers',value:function _extendMarkers(type,value,family,selectionType,recalculatePoints){family=family||0;selectionType=selectionType||"unselected";if(!this.styles[selectionType]||!this.styles[selectionType].markers){return;}this.styles[selectionType].markers[family][type]=value;if(recalculatePoints){this._recalculateMarkerPoints(selectionType,this.styles[selectionType].markers);}if(!this.markersDom[this.styles[selectionType].markers[family]]){// DOM doesn't exist yet.
return;}this.setMarkerStyleTo(this.markersDom[this.styles[selectionType].markers[family]].dom,this.styles[selectionType].markers[family]);}},{key:'_recalculateMarkerPoints',value:function _recalculateMarkerPoints(selectionType,families){var markerPoints=[];// Overwriting any other undefined families
markerPoints.push([0,Infinity,null]);for(var i=0,k=families.length;i<k;i++){families[i].markerPath=this.getMarkerPath(families[i]);if(!families[i].points){families[i].points='all';}if(!Array.isArray(families[i].points)){families[i].points=[families[i].points];}for(var j=0,l=families[i].points.length;j<l;j++){if(families[i].points[j]=='all'){markerPoints.push([0,Infinity,i]);}else if(!Array.isArray(families[i].points[j])){markerPoints.push([families[i].points[j],families[i].points[j],i]);//markerPoints.push( [ family[ i ].points[ j ] + 1, null ] );
}else{markerPoints.push([families[i].points[j][0],families[i].points[j][1],i]);}}}this.markerFamilies[selectionType||"unselected"]=families;// Let's sort if by the first index.
markerPoints.sort(function(a,b){return a[0]-b[0]||(a[2]==null?-1:1);});this.markerPoints[selectionType||"unselected"]=markerPoints;}},{key:'insertMarkers',value:function insertMarkers(selectionType){if(!this.markerFamilies||!this.markerFamilies[selectionType||this.selectionType]||this.options.markersIndependant){return;}for(var i=0,l=this.markerFamilies[selectionType||this.selectionType].length;i<l;i++){if(!this.markersDom.has(this.markerFamilies[selectionType||this.selectionType][i])){continue;}var dom=this.markersDom.get(this.markerFamilies[selectionType||this.selectionType][i]);dom.dom.setAttribute('d',dom.path);this.groupMarkers.appendChild(dom.dom);this.currentMarkersSelectionType=this.selectionType;}}},{key:'getMarkerForLegend',value:function getMarkerForLegend(){if(!this.markerPoints||!this.markerPoints[this.selectionType]){return;}if(!this.markerForLegend){var marker=document.createElementNS(this.graph.ns,'path');this.setMarkerStyleTo(marker,this.markerFamilies[this.selectionType][0]);marker.setAttribute('d',"M 14 0 "+this.getMarkerPath(this.markerFamilies[this.selectionType][0]));this.markerForLegend=marker;}return this.markerForLegend;}},{key:'eraseMarkers',value:function eraseMarkers(){var self=this;if(this.options.markersIndependant){for(var i in this.independantMarkers){self.groupMarkers.removeChild(this.independantMarkers[i]);}this.independantMarkers={};}else if(this.currentMarkersSelectionType){this.markersDom.forEach(function(el){if(!el.dom){return;}if(el.dom.parentNode!==self.groupMarkers){return;}self.groupMarkers.removeChild(el.dom);el.path="";});this.currentMarkersSelectionType=false;}}},{key:'isMonotoneous',value:function isMonotoneous(){if(this._waveform){return this._waveform.isMonotoneous();}return!!this.xmonotoneous;}}]);return SerieLine;}(_graph4.default);util.mix(SerieLine,_graphMixin2.default);exports.default=SerieLine;});/***/},/* 15 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(4),__webpack_require__(3),__webpack_require__(5)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('../dependencies/eventEmitter/EventEmitter'),require('../graph.util'),require('../util/waveform'));}else{var mod={exports:{}};factory(mod.exports,global.EventEmitter,global.graph,global.waveform);global.graphSerie=mod.exports;}})(this,function(exports,_EventEmitter,_graph,_waveform){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _EventEmitter2=_interopRequireDefault(_EventEmitter);var util=_interopRequireWildcard(_graph);var _waveform2=_interopRequireDefault(_waveform);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Serie class to be extended
	   * @static
	   */var Serie=function(_EventEmitter2$defaul3){_inherits(Serie,_EventEmitter2$defaul3);function Serie(){_classCallCheck(this,Serie);return _possibleConstructorReturn(this,(Serie.__proto__||Object.getPrototypeOf(Serie)).apply(this,arguments));}/**
	     * Sets data to the serie
	     * @memberof Serie
	     * @param {(Object|Array|Array[])} data - The data of the serie
	     * @param {Boolean} [ oneDimensional=false ] - In some cases you may need to force the 1D type. This is required when one uses an array or array to define the data (see examples)
	     * @param {String} [ type=float ] - Specify the type of the data. Use <code>int</code> to save memory (half the amount of bytes allocated to the data).
	     * @example serie.setData( [ [ x1, y1 ], [ x2, y2 ], ... ] );
	     * @example serie.setData( [ x1, y1, x2, y2, ... ] ); // Faster
	     * @example serie.setData( [ [ x1, y1, x2, y2, ..., xn, yn ] , [ xm, ym, x(m + 1), y(m + 1), ...] ], true ) // 1D array with a gap in the middle
	     * @example serie.setData( { x: x0, dx: spacing, y: [ y1, y2, y3, y4 ] } ); // Data with equal x separation. Fastest way
	     */_createClass(Serie,[{key:'setData',value:function setData(data,oneDimensional,type){if(data instanceof _waveform2.default){return this.setWaveform(data);}function isArray(arr){var stringed=Object.prototype.toString.call(arr);return stringed==='[object Array]'||stringed==='[object Int16Array]'||stringed==='[object Int32Array]'||stringed==='[object Float32Array]'||stringed==='[object Float64Array]'||stringed==='[object Uint8Array]'||stringed==='[object Uint16Array]'||stringed==='[object Uint32Array]'||stringed==='[object Int8Array]';}var z=0,x,dx,oneDimensional=oneDimensional||false,type=type||'float',arr,total=0,continuous;// In its current form, empty is a performance hindering method because it forces all the DOM to be cleared.
// We shouldn't need that for the lines
//this.empty();
this.minX=Number.MAX_SAFE_INTEGER;this.maxX=Number.MIN_SAFE_INTEGER;this.minY=Number.MAX_SAFE_INTEGER;this.maxY=Number.MIN_SAFE_INTEGER;var datas=[];var isDataArray=isArray(data);if(!isDataArray&&(typeof data==='undefined'?'undefined':_typeof(data))=='object'){data=[data];}else if(isDataArray&&!isArray(data[0])&&_typeof(data[0])!=='object'){// [100, 103, 102, 2143, ...]
data=[data];oneDimensional=true;}else if(isDataArray&&isArray(data[0])&&data[0].length>2){oneDimensional=true;}else if(!isDataArray){util.throwError("Data is not an array");return;}// [[100, 0.145], [101, 0.152], [102, 0.153], [...]] ==> [[[100, 0.145], [101, 0.152], [102, 0.153], [...]]]
var isData0Array=isArray(data[0]);var isData00Array=isArray(data[0][0]);if(isData0Array&&!oneDimensional&&!isData00Array){data=[data];}if(isData0Array){for(var i=0,k=data.length;i<k;i++){arr=this._addData(type,!oneDimensional?data.length*2:data.length);datas.push(arr);z=0;for(var j=0,l=data[i].length;j<l;j++){if(!oneDimensional){arr[z]=[data[i][j][0],data[i][j][1]];total++;z++;}else{// 1D Array
arr[z]=[data[i][j],data[i][j+1]];z++;total+=j%2?1:0;}}}}else if(_typeof(data[0])=='object'){if(data[0].x){for(var i=0,l=data.length;i<l;i++){var arr=this._addData(type,data[i].x.length*2);datas.push(arr);z=0;for(var j=0,m=data[0].x.length;j<m;j++){// Several piece of data together
arr[z]=[data[i].x[j],data[i].y[j]];total++;z++;}}}else{this.mode='x_equally_separated';var number=0,numbers=[],k=0,o;if(!data[0].y){console.log(data);util.throwError("No y data");return;}for(var i=0,l=data.length;i<l;i++){// Several piece of data together
number+=data[i].y.length;continuous=i!=0&&(!data[i+1]||data[i].x+data[i].dx*data[i].y.length==data[i+1].x);if(!continuous){datas.push(this._addData(type,number));numbers.push(number);number=0;}}this.xData=[];number=0;k=0;z=0;for(var i=0,l=data.length;i<l;i++){x=data[i].x;dx=data[i].dx;for(var j=0;j<o;j++){datas[k][z]=[x+j*dx,data[i].y[j]];z++;total++;}number+=data[i].y.length;if(numbers[k]==number){k++;number=0;z=0;}}}}// Determination of slots for low res spectrum
var w=(this.maxX-this.minX)/this.graph.getDrawingWidth(),ws=[];var min=this.graph.getDrawingWidth()*4;var max=total/4;var min=this.graph.getDrawingWidth();var max=total;// Temporary reduction
datas=datas.reduce(function(a,b,index){if(index>0){a.push([NaN,NaN]);}//console.log( a, b );
return a.concat(b);},[]);var wave=new _waveform2.default();wave.setData(datas);this.setWaveform(wave);return this;}},{key:'_addData',value:function _addData(type,howmany){return[];/*
	      switch ( type ) {
	        case 'int':
	          var size = howmany * 4; // 4 byte per number (32 bits)
	          break;
	        case 'float':
	          var size = howmany * 8; // 4 byte per number (64 bits)
	          break;
	      }
	       var arr = new ArrayBuffer( size );
	       switch ( type ) {
	        case 'int':
	          return new Int32Array( arr );
	          break;
	         default:
	        case 'float':
	          return new Float64Array( arr );
	          break;
	      }
	      */}/**
	     * Removes all the data from the serie, without redrawing
	     * @returns {Serie} The current serie
	     */},{key:'clearData',value:function clearData(){this.setData([]);return this;}/**
	     * Returns the data in its current form
	     * @returns {Array.<(Float64Array|Int32Array)>} An array containing the data chunks. Has only one member if the data has no gaps
	     * @memberof Serie
	     */},{key:'getData',value:function getData(){return this.data;}/**
	     * Sets the options of the serie (no extension of default options)
	     * @param {Object} options - The options of the serie
	     * @memberof Serie
	     */},{key:'setOptions',value:function setOptions(options){this.options=options||{};}/**
	     * Sets the options of the serie (no extension of default options)
	     * @param {String} name - The option name
	     * @param value - The option value
	     * @memberof Serie
	     * @example serie.setOption('selectableOnClick', true );
	     */},{key:'setOption',value:function setOption(name,value){this.options[name]=value;}/**
	     * Removes the serie from the graph. The method doesn't perform any axis autoscaling or repaint of the graph. This should be done manually.
	     * @return {Serie} The current serie instance
	     * @memberof Serie
	     */},{key:'kill',value:function kill(noLegendUpdate){this.graph.removeSerieFromDom(this);this.graph._removeSerie(this);if(this.graph.legend&&!noLegendUpdate){this.graph.legend.update();}this.graph=undefined;return this;}/**
	     * Hides the serie
	     * @memberof Serie
	     * @param {Boolean} [ hideShapes = false ] - <code>true</code> to hide the shapes associated to the serie
	     * @returns {Serie} The current serie
	     */},{key:'hide',value:function hide(hideShapes){this.hidden=true;this.groupMain.setAttribute('display','none');this.getSymbolForLegend().setAttribute('opacity',0.5);this.getTextForLegend().setAttribute('opacity',0.5);this.hideImpl();if(hideShapes){var shapes=this.graph.getShapesOfSerie(this);for(var i=0,l=shapes.length;i<l;i++){shapes[i].hide();}}this.emit("hide");return this;}/**
	     * Shows the serie
	     * @memberof Serie
	     * @param {Boolean} [showShapes=false] - <code>true</code> to show the shapes associated to the serie
	     * @returns {Serie} The current serie
	     */},{key:'show',value:function show(showShapes){this.hidden=false;this.groupMain.setAttribute('display','block');this.getSymbolForLegend().setAttribute('opacity',1);this.getTextForLegend().setAttribute('opacity',1);this.showImpl();this.draw(true);if(showShapes){var shapes=this.graph.getShapesOfSerie(this);for(var i=0,l=shapes.length;i<l;i++){shapes[i].show();}}this.emit("show");return this;}},{key:'hideImpl',value:function hideImpl(){}},{key:'showImpl',value:function showImpl(){}/**
	     * Toggles the display of the serie (effectively, calls <code>.show()</code> and <code>.hide()</code> alternatively on each call)
	     * @memberof Serie
	     * @param {Boolean} [hideShapes=false] - <code>true</code> to hide the shapes associated to the serie
	     * @returns {Serie} The current serie
	     */},{key:'toggleDisplay',value:function toggleDisplay(){if(!this.isShown()){this.show();}else{this.hide();}return this;}/**
	     * Determines if the serie is currently visible
	     * @memberof Serie
	     * @returns {Boolean} The current visibility status of the serie
	     */},{key:'isShown',value:function isShown(){return!this.hidden;}/**
	     * Returns the x position of a certain value in pixels position, based on the serie's axis
	     * @memberof Serie
	     * @param {Number} val - Value to convert to pixels position
	     * @returns {Number} The x position in px corresponding to the x value
	     */},{key:'getX',value:function getX(val){return(val=this.getXAxis().getPx(val))-val%0.2;}/**
	     * Returns the y position of a certain value in pixels position, based on the serie's axis
	     * @memberof Serie
	     * @param {Number} val - Value to convert to pixels position
	     * @returns {Number} The y position in px corresponding to the y value
	     */},{key:'getY',value:function getY(val){return(val=this.getYAxis().getPx(val))-val%0.2;}/**
	     * Returns the selection state of the serie. Generic for most serie types
	     * @memberof Serie
	     * @returns {Boolean} <code>true</code> if the serie is selected, <code>false</code> otherwise
	     */},{key:'isSelected',value:function isSelected(){return this.selected||this.selectionType!=="unselected";}},{key:'_checkX',value:function _checkX(val){this.minX=Math.min(this.minX,val);this.maxX=Math.max(this.maxX,val);}},{key:'_checkY',value:function _checkY(val){this.minY=Math.min(this.minY,val);this.maxY=Math.max(this.maxY,val);}/**
	     * Getter for the serie name
	     * @memberof Serie
	     * @returns {String} The serie name
	     */},{key:'getName',value:function getName(){return this.name;}/* AXIS *//**
	     * Assigns axes automatically, based on {@link Graph#getXAxis} and {@link Graph#getYAxis}.
	     * @memberof Serie
	     * @returns {Serie} The current serie
	     */},{key:'autoAxis',value:function autoAxis(){if(this.isFlipped()){this.setXAxis(this.graph.getYAxis());this.setYAxis(this.graph.getXAxis());}else{this.setXAxis(this.graph.getXAxis());this.setYAxis(this.graph.getYAxis());}// After axes have been assigned, the graph axes should update their min/max
this.graph.updateDataMinMaxAxes();return this;}},{key:'autoAxes',value:function autoAxes(){return this.autoAxis.apply(this,arguments);}/**
	     * Assigns an x axis to the serie
	     * @memberof Serie
	     * @param {Axis|Number} axis - The axis to use as an x axis. If an integer, {@link Graph#getXAxis} or {@link Graph#getYAxis} will be used
	     * @returns {Serie} The current serie
	     * @example serie.setXAxis( graph.getTopAxis( 1 ) ); // Assigns the second top axis to the serie
	     */},{key:'setXAxis',value:function setXAxis(axis){if(typeof axis=="number"){this.xaxis=this.isFlipped()?this.graph.getYAxis(axis):this.graph.getXAxis(axis);}else{this.xaxis=axis;}this.graph.updateDataMinMaxAxes();return this;}/**
	     * Assigns an y axis to the serie
	     * @memberof Serie
	     * @param {Axis|Number} axis - The axis to use as an y axis. If an integer, {@link Graph#getXAxis} or {@link Graph#getYAxis} will be used
	     * @returns {Serie} The current serie
	     * @example serie.setYAxis( graph.getLeftAxis( 4 ) ); // Assigns the 5th left axis to the serie
	     */},{key:'setYAxis',value:function setYAxis(axis){if(typeof axis=="number"){this.xaxis=this.isFlipped()?this.graph.getXAxis(axis):this.graph.getYAxis(axis);}else{this.yaxis=axis;}this.graph.updateDataMinMaxAxes();return this;}/**
	     * Assigns two axes to the serie
	     * @param {GraphAxis} axis1 - First axis to assign to the serie (x or y)
	     * @param {GraphAxis} axis2 - Second axis to assign to the serie (y or x)
	     * @returns {Serie} The current serie
	     * @memberof Serie
	     */},{key:'setAxes',value:function setAxes(){for(var i=0;i<2;i++){if(arguments[i]){this[arguments[i].isX()?'setXAxis':'setYAxis'](arguments[i]);}}return this;}/**
	     * @returns {GraphAxis} The x axis assigned to the serie
	     * @memberof Serie
	     */},{key:'getXAxis',value:function getXAxis(){return this.xaxis;}/**
	     * @returns {GraphAxis} The y axis assigned to the serie
	     * @memberof Serie
	     */},{key:'getYAxis',value:function getYAxis(){return this.yaxis;}/* *//* DATA MIN MAX *//**
	     * @returns {Number} Lowest x value of the serie's data
	     * @memberof Serie
	     */},{key:'getMinX',value:function getMinX(){return this.minX;}/**
	     * @returns {Number} Highest x value of the serie's data
	     * @memberof Serie
	     */},{key:'getMaxX',value:function getMaxX(){return this.maxX;}/**
	     * @returns {Number} Lowest y value of the serie's data
	     * @memberof Serie
	     */},{key:'getMinY',value:function getMinY(){return this.minY;}/**
	     * @returns {Number} Highest y value of the serie's data
	     * @memberof Serie
	     */},{key:'getMaxY',value:function getMaxY(){return this.maxY;}},{key:'getWaveform',value:function getWaveform(){return this._waveform;}},{key:'getWaveforms',value:function getWaveforms(){return[this._waveform];}/**
	     * Computes and returns a line SVG element with the same line style as the serie, or width 20px
	     * @returns {SVGElement}
	     * @memberof Serie
	     */},{key:'getSymbolForLegend',value:function getSymbolForLegend(){if(!this.lineForLegend){var line=document.createElementNS(this.graph.ns,'line');this.applyLineStyle(line);line.setAttribute('x1',5);line.setAttribute('x2',25);line.setAttribute('y1',0);line.setAttribute('y2',0);line.setAttribute('cursor','pointer');this.lineForLegend=line;}return this.lineForLegend;}/**
	     * Explicitely applies the line style to the SVG element returned by {@link Serie#getSymbolForLegend}
	     * @see Serie#getSymbolForLegend
	     * @returns {SVGElement}
	     * @memberof Serie
	     */},{key:'setLegendSymbolStyle',value:function setLegendSymbolStyle(){this.applyLineStyle(this.getSymbolForLegend());}/**
	     * @alias Serie#setLegendSymbolStyle
	     * @memberof Serie
	     */},{key:'updateStyle',value:function updateStyle(){this.setLegendSymbolStyle();this.graph.updateLegend();}/**
	     * Computes and returns a text SVG element with the label of the serie as a text, translated by 35px
	     * @returns {SVGElement}
	     * @memberof Serie
	     * @see Serie#getLabel
	     */},{key:'getTextForLegend',value:function getTextForLegend(){if(!this.textForLegend){var text=document.createElementNS(this.graph.ns,'text');text.setAttribute('cursor','pointer');text.textContent=this.getLabel();this.textForLegend=text;}return this.textForLegend;}/**
	     * @returns {Number} The current index of the serie
	     * @memberof Serie
	     */},{key:'getIndex',value:function getIndex(){return this.graph.series.indexOf(this);}/**
	     * @returns {String} The label or, alternatively - the name of the serie
	     * @memberof Serie
	     */},{key:'getLabel',value:function getLabel(){return this.options.label||this.name;}/**
	     * Sets the label of the serie. Note that this does not automatically updates the legend
	     * @param {String} label - The new label of the serie
	     * @returns {Serie} The current serie
	     * @memberof Serie
	     */},{key:'setLabel',value:function setLabel(label){this.options.label=label;if(this.textForLegend){this.textForLegend.textContent=label;}this.graph.requireLegendUpdate();return this;}/* FLIP *//**
	     * Assigns the flipping value of the serie. A flipped serie will have inverted axes. However this method does not automatically re-assigns the axes of the serie. Call {@link Serie#autoAxis} to re-assign the axes automatically, or any other axis setting method.
	     * @param {Boolean} [flipped=false] - <code>true</code> to flip the serie
	     * @returns {Serie} The current serie
	     * @memberof Serie
	     */},{key:'setFlip',value:function setFlip(flipped){this.options.flip=flipped;return this;}/**
	     * @returns {Boolean} <code>true</code> if the serie is flipped, <code>false</code> otherwise
	     * @memberof Serie
	     */},{key:'getFlip',value:function getFlip(){return this.options.flip;}/**
	     * @alias Serie#getFlip
	     * @memberof Serie
	     */},{key:'isFlipped',value:function isFlipped(){return this.options.flip;}/**
	     * Sets the layer onto which the serie should be displayed. This method does not trigger a graph redraw.
	     * @memberof Serie
	     * @param {Number} layerIndex=1 - The index of the layer into which the serie will be drawn
	     * @returns {Serie} The current serie
	     */},{key:'setLayer',value:function setLayer(layerIndex){this.options.layer=parseInt(layerIndex)||1;return this;}/**
	     * Sets the layer onto which the serie should be displayed. This method does not trigger a graph redraw.
	     * @memberof Serie
	     * @returns {Nunber} The index of the layer into which the serie will be drawn
	     */},{key:'getLayer',value:function getLayer(){return this.options.layer||1;}},{key:'setStyle',value:function setStyle(style){var selectionType=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"unselected";//console.log( style, selectionType );
this.styles[selectionType]=style;this.styleHasChanged(selectionType);}/**
	     * Notifies jsGraph that the style of the serie has changed and needs to be redrawn on the next repaint
	     * @param {String} selectionType - The selection for which the style may have changed
	     * @returns {Serie} The current serie
	     * @memberof Serie
	     */},{key:'styleHasChanged',value:function styleHasChanged(){var selectionType=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"unselected";this._changedStyles=this._changedStyles||{};if(selectionType===false){for(var i in this._changedStyles){this._changedStyles[i]=false;}}else{this._changedStyles[selectionType||"unselected"]=true;}this.graph.requireLegendUpdate();return this;}/**
	     * Checks if the style has changed for a selection type
	     * @param {String} selectionType - The selection for which the style may have changed
	     * @returns {Boolean} <code>true</code> if the style has changed
	     * @private
	     * @memberof Serie
	     */},{key:'hasStyleChanged',value:function hasStyleChanged(selectionType){this._changedStyles=this._changedStyles||{};return this._changedStyles[selectionType||"unselected"];}/**
	     * Notifies jsGraph that the data of the serie has changed
	     * @returns {Serie} The current serie
	     * @memberof Serie
	     */},{key:'dataHasChanged',value:function dataHasChanged(arg){this._dataHasChanged=arg===undefined||arg;return this;}/**
	     * Checks if the data has changed
	     * @returns {Boolean} <code>true</code> if the data has changed
	     * @private
	     * @memberof Serie
	     */},{key:'hasDataChanged',value:function hasDataChanged(){return this._dataHasChanged;}/**
	     * Set a key/value arbitrary information to the serie. It is particularly useful if you have this serie has a reference through an event for instance, and you want to retrieve data associated to it
	     * @param {String} prop - The property
	     * @param value - The value
	     * @returns {Serie} The current serie
	     * @see Serie#getInfo
	     * @memberof Serie
	     */},{key:'setInfo',value:function setInfo(prop,value){this.infos=this.infos||{};this.infos[prop]=value;return this;}/**
	     * Retrives an information value from its key
	     * @param {String} prop - The property
	     * @returns The value associated to the prop parameter
	     * @see Serie#setInfo
	     * @memberof Serie
	     */},{key:'getInfo',value:function getInfo(prop,value){return(this.infos||{})[prop];}/**
	     * @deprecated
	     * @memberof Serie
	     */},{key:'setAdditionalData',value:function setAdditionalData(data){this.additionalData=data;return this;}/**
	     * @deprecated
	     * @memberof Serie
	     */},{key:'getAdditionalData',value:function getAdditionalData(){return this.additionalData;}/**
	     * Flags the serie as selected
	     * @returns {Serie} The current serie
	     * @memberof Serie
	     */},{key:'select',value:function select(){this.selected=true;return this;}/**
	     * Flags the serie as unselected
	     * @returns {Serie} The current serie
	     * @memberof Serie
	     */},{key:'unselect',value:function unselect(){this.selected=false;return this;}/**
	     * Allows mouse tracking of the serie
	     * @memberof Serie
	     * @returns {Serie} The current serie
	     * @param {Function} hoverCallback - Function to be called when the mouse enters the serie area
	     * @param {Function} outCallback - Function to be called when the mouse exits the serie area
	     * @private
	     */},{key:'enableTracking',value:function enableTracking(hoverCallback,outCallback){this._tracker=true;this._trackingCallback=hoverCallback;this._trackingOutCallback=outCallback;return this;}/**
	     * Disables mouse tracking of the serie
	     * @memberof Serie
	     * @returns {Serie} The current serie
	     * @private
	     */},{key:'disableTracking',value:function disableTracking(){if(this._trackerDom){this._trackerDom.remove();this._trackerDom=null;}this._tracker=false;this._trackingCallback=null;return this;}/**
	     *  Allows mouse tracking of the serie
	     *  @memberof Serie
	     *  @param {Object} options - The tracking line options
	     *  @returns {Serie} The current serie
	     */},{key:'allowTrackingLine',value:function allowTrackingLine(options){options=options||{};this.graph.addSerieToTrackingLine(this,options);}},{key:'getMarkerForLegend',value:function getMarkerForLegend(){return false;}},{key:'getType',value:function getType(){return this._type;}},{key:'setDataIndices',value:function setDataIndices(categories,nb){this.categoryIndices=categories;this.nbCategories=nb;}},{key:'type',get:function get(){return this._type;}},{key:'excludedFromLegend',set:function set(){var bln=arguments.length>0&&arguments[0]!==undefined?arguments[0]:true;this._excludedFromLegend=bln;},get:function get(){return!!this._excludedFromLegend;}}]);return Serie;}(_EventEmitter2.default);exports.default=Serie;});/***/},/* 16 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(3)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require("../graph.util"));}else{var mod={exports:{}};factory(mod.exports,global.graph);global.slotoptimizer=mod.exports;}})(this,function(exports,_graph){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=function(toOptimize){if(!slotWorker){createWorker();}var requestId=util.guid();toOptimize._queueId=requestId;var resolve;var prom=new Promise(function(_resolve){resolve=_resolve;});queue[requestId]={promise:prom,resolve:resolve};slotWorker.postMessage(toOptimize);return queue[requestId].promise;};var util=_interopRequireWildcard(_graph);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}var slotWorker;var queue={};function createWorker(){var workerUrl=URL.createObjectURL(new Blob([" ( "+function(){onmessage=function onmessage(e){var data=e.data.data,slotNb=e.data.slotNumber,slot=e.data.slot,flip=e.data.flip,max=e.data.max,min=e.data.min,slotNumber,dataPerSlot=slot/(max-min);var slotsData=[];for(var j=0,k=data.length;j<k;j++){for(var m=0,n=data[j].length;m<n;m+=2){slotNumber=Math.floor((data[j][m]-min)*dataPerSlot);slotsData[slotNumber]=slotsData[slotNumber]||{min:data[j][m+1],max:data[j][m+1],start:data[j][m+1],stop:false,x:data[j][m]};slotsData[slotNumber].stop=data[j][m+1];slotsData[slotNumber].min=Math.min(data[j][m+1],slotsData[slotNumber].min);slotsData[slotNumber].max=Math.max(data[j][m+1],slotsData[slotNumber].max);}}postMessage({slotNumber:slotNb,slot:slot,data:slotsData,_queueId:e.data._queueId});};}.toString()+")()"],{type:'application/javascript'}));slotWorker=new Worker(workerUrl);slotWorker.onmessage=function(e){var id=e.data._queueId;delete e.data._queueId;queue[id].resolve(e.data.data);delete queue[id];};}});/***/},/* 17 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(3)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('../graph.util'));}else{var mod={exports:{}};factory(mod.exports,global.graph);global.graphMixinErrorbars=mod.exports;}})(this,function(exports,_graph){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var util=_interopRequireWildcard(_graph);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}var ErrorBarMixin={doErrorDraw:function doErrorDraw(orientation,error,originVal,originPx,xpx,ypx){if(!(error instanceof Array)){error=[error];}var functionName=orientation=='y'?'getY':'getX';var bars=orientation=='y'?['top','bottom']:['left','right'];var j;if(isNaN(xpx)||isNaN(ypx)){return;}for(var i=0,l=error.length;i<l;i++){if(error[i]instanceof Array){// TOP
j=bars[0];this.errorstyles[i].paths[j]+=" M "+xpx+" "+ypx;this.errorstyles[i].paths[j]+=this.makeError(orientation,i,this[functionName](originVal+error[i][0]),originPx,j);j=bars[1];this.errorstyles[i].paths[j]+=" M "+xpx+" "+ypx;this.errorstyles[i].paths[j]+=this.makeError(orientation,i,this[functionName](originVal-error[i][1]),originPx,j);}else{j=bars[0];this.errorstyles[i].paths[j]+=" M "+xpx+" "+ypx;this.errorstyles[i].paths[j]+=this.makeError(orientation,i,this[functionName](originVal+error[i]),originPx,j);j=bars[1];this.errorstyles[i].paths[j]+=" M "+xpx+" "+ypx;this.errorstyles[i].paths[j]+=this.makeError(orientation,i,this[functionName](originVal-error[i]),originPx,j);}}},makeError:function makeError(orientation,level,coord,origin,quadOrientation){var method;switch(this.errorstyles[level].type){case'bar':method="makeBar";break;case'box':method="makeBox";break;}return this[method+orientation.toUpperCase()](coord,origin,this.errorstyles[level][quadOrientation]);},makeBarY:function makeBarY(coordY,origin,style){if(!coordY||!style){return;}var width=!util.isNumeric(style.width)?10:style.width;return" V "+coordY+" m -"+width/2+" 0 h "+width+" m -"+width/2+" 0 V "+origin+" ";},makeBoxY:function makeBoxY(coordY,origin,style){if(!coordY||!style){return;}return" m 5 0 V "+coordY+" h -10 V "+origin+" m 5 0 ";},makeBarX:function makeBarX(coordX,origin,style){if(!coordX||!style){return;}var height=!util.isNumeric(style.width)?10:style.width;return" H "+coordX+" m 0 -"+height/2+" v "+height+" m 0 -"+height/2+" H "+origin+" ";},makeBoxX:function makeBoxX(coordX,origin,style){if(!coordX||!style){return;}return" v 5 H "+coordX+" v -10 H "+origin+" v 5 ";},check:function check(index,valY,valX){var dx,dy;if(this.getType()==Graph.SERIE_LINE||this.getType()==Graph.SERIE_SCATTER){if(!(dx=this.data[index*2])||!(dy=this.data[index*2+1])){//
return;}}if(dx===undefined){return;}for(var i=0,l=valY.length;i<l;i++){if(Array.isArray(valY[i])){if(!isNaN(valY[i][0])){this._checkY(dy+valY[i][0]);}if(!isNaN(valY[i][1])){this._checkY(dy-valY[i][1]);}}else{if(!isNaN(valY[i])){this._checkY(dy+valY[i]);this._checkY(dy-valY[i]);}}}for(var i=0,l=valX.length;i<l;i++){if(Array.isArray(valX[i])){if(!isNaN(valX[i][0])){this._checkX(dx-valX[i][0]);}if(!isNaN(valX[i][1])){this._checkX(dx+valX[i][1]);}}else{if(!isNaN(valY[i])){this._checkX(dx-valX[i]);this._checkX(dx+valX[i]);}}}},/**
	     *  Sets the data error values
	     */setDataError:function setDataError(error,noCheck){this.error=error;if(!noCheck){for(var _i2=0,l=this.error.length;_i2<l;_i2++){if(this.error[_i2]){this.check(_i2,this.error[_i2][0],this.error[_i2][1]);}}}this.dataHasChanged();this.graph.updateDataMinMaxAxes();return this;},/**
	     *
	     *  @example serie.setErrorStyle( [ { type: 'bar', x: {} }, { type: 'box', top: { strokeColor: 'green', fillColor: 'olive' }, bottom: { strokeColor: 'red', fillColor: "#800000" }  } ] );
	     */setErrorStyle:function setErrorStyle(errorstyles){var self=this;errorstyles=errorstyles||['box','bar'];// Ensure array
if(!Array.isArray(errorstyles)){errorstyles=[errorstyles];}var styles=[];var pairs=[['y','top','bottom'],['x','left','right']];function makePath(style){style.dom=document.createElementNS(self.graph.ns,'path');style.dom.setAttribute('fill',style.fillColor||'none');style.dom.setAttribute('stroke',style.strokeColor||'black');style.dom.setAttribute('stroke-opacity',style.strokeOpacity||1);style.dom.setAttribute('fill-opacity',style.fillOpacity||1);style.dom.setAttribute('stroke-width',style.strokeWidth||1);self.groupMain.appendChild(style.dom);}for(var i=0;i<errorstyles.length;i++){// i is bar or box
styles[i]={};if(typeof errorstyles[i]=="string"){errorstyles[i]={type:errorstyles[i],y:{}};}styles[i].type=errorstyles[i].type;for(var j=0,l=pairs.length;j<l;j++){if(errorstyles[i].all){errorstyles[i][pairs[j][1]]=util.extend(true,{},errorstyles[i].all);errorstyles[i][pairs[j][2]]=util.extend(true,{},errorstyles[i].all);}if(errorstyles[i][pairs[j][0]]){//.x, .y
errorstyles[i][pairs[j][1]]=util.extend(true,{},errorstyles[i][pairs[j][0]]);errorstyles[i][pairs[j][2]]=util.extend(true,{},errorstyles[i][pairs[j][0]]);}for(var k=1;k<=2;k++){if(errorstyles[i][pairs[j][k]]){styles[i][pairs[j][k]]=errorstyles[i][pairs[j][k]];makePath(styles[i][pairs[j][k]]);}}}}/*
	            // None is defined
	            if( ! errorstyles[ i ].top && ! errorstyles[ i ].bottom ) {
	               styles[ i ].top = errorstyles[ i ];
	              styles[ i ].top.dom = document.createElementNS( this.graph.ns, 'path' );
	              styles[ i ].bottom = errorstyles[ i ];
	              styles[ i ].bottom.dom = document.createElementNS( this.graph.ns, 'path' );
	             } else if( errrostyles[ i ].top ) {
	               styles[ i ].bottom = null; // No bottom displayed
	              styles[ i ].top = errrostyles[ i ].top;
	              styles[ i ].top.dom = document.createElementNS( this.graph.ns, 'path' );
	             } else {
	               styles[ i ].bottom = errorstyles[ i ].bottom;
	              styles[ i ].bottom.dom = document.createElementNS( this.graph.ns, 'path' );
	              styles[ i ].top = null;
	            }
	      */this.errorstyles=styles;return this;},errorDrawInit:function errorDrawInit(){var error;//  var pathError = "M 0 0 ";
if(this.errorstyles){for(var i=0,l=this.errorstyles.length;i<l;i++){this.errorstyles[i].paths={top:"",bottom:"",left:"",right:""};}}},errorAddPoint:function errorAddPoint(j,dataX,dataY,xpx,ypx){var error;if(this.error&&(error=this.error[j/2])){//    pathError += "M " + xpx + " " + ypx;
if(error[0]){this.doErrorDraw('y',error[0],dataY,ypx,xpx,ypx);}if(error[1]){this.doErrorDraw('x',error[1],dataX,xpx,xpx,ypx);}}},errorAddPointBarChart:function errorAddPointBarChart(j,posY,xpx,ypx){var error;if(this.error&&(error=this.error[j])){this.doErrorDraw('y',error,posY,ypx,xpx,ypx);}},errorDraw:function errorDraw(){if(this.error&&this.errorstyles){for(var i=0,l=this.errorstyles.length;i<l;i++){for(var j in this.errorstyles[i].paths){if(this.errorstyles[i][j]&&this.errorstyles[i][j].dom){this.errorstyles[i][j].dom.setAttribute('d',this.errorstyles[i].paths[j]);}}}}}};exports.default=ErrorBarMixin;});/***/},/* 18 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(1),__webpack_require__(14),__webpack_require__(5),__webpack_require__(19),__webpack_require__(3)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('../graph.core'),require('./graph.serie.line'),require('../util/waveform'),require('../mixins/graph.mixin.serie3d'),require('../graph.util'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graphSerie,global.waveform,global.graphMixin,global.graph);global.graphSerieLine3d=mod.exports;}})(this,function(exports,_graph,_graphSerie,_waveform,_graphMixin,_graph3){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);var _graphSerie2=_interopRequireDefault(_graphSerie);var _waveform2=_interopRequireDefault(_waveform);var _graphMixin2=_interopRequireDefault(_graphMixin);var util=_interopRequireWildcard(_graph3);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * @name SerieLineDefaultOptions
	   * @object
	   * @static
	   * @memberof SerieLine
	   */var defaults={zpos:0};/**
	   * Serie line with 3D projection
	   * @example graph.newSerie( name, options, "line" );
	   * @see Graph#newSerie
	   * @extends SerieLine
	   */var SerieLine3D=function(_graphSerie2$default){_inherits(SerieLine3D,_graphSerie2$default);function SerieLine3D(){_classCallCheck(this,SerieLine3D);return _possibleConstructorReturn(this,(SerieLine3D.__proto__||Object.getPrototypeOf(SerieLine3D)).apply(this,arguments));}_createClass(SerieLine3D,[{key:'init',value:function init(graph,name,options){_get(SerieLine3D.prototype.__proto__||Object.getPrototypeOf(SerieLine3D.prototype),'init',this).call(this,graph,name,options);this.options=util.extend(true,this.options,defaults,options||{});// Creates options
return this;}/**
	     * Sets the z-position
	     * @memberof SerieLine3D
	     * @param {Number} zPos - The position in the z axis
	     */},{key:'setZPos',value:function setZPos(zPos){this.options.zpos=zPos;return this;}},{key:'setz',value:function setz(){return this.setZPos.apply(this,arguments);}}]);return SerieLine3D;}(_graphSerie2.default);util.mix(SerieLine3D,_graphMixin2.default);exports.default=SerieLine3D;});/***/},/* 19 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports);}else{var mod={exports:{}};factory(mod.exports);global.graphMixinSerie3d=mod.exports;}})(this,function(exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var Serie3DMixin={/**
	     * Returns the x position of a certain value in pixels position, based on the serie's axis
	     * @memberof Serie
	     * @param {Number} val - Value to convert to pixels position
	     * @returns {Number} The x position in px corresponding to the x value
	     */getX:function getX(val){return(val=this.getXAxis().getPx(val))-val%0.2+this.getXAxis().getZProj(this.options.zpos);},/**
	     * Returns the y position of a certain value in pixels position, based on the serie's axis
	     * @memberof Serie3DMixin
	     * @param {Number} val - Value to convert to pixels position
	     * @returns {Number} The y position in px corresponding to the y value
	     */getY:function getY(val){return(val=this.getYAxis().getPx(val))-val%0.2+this.getYAxis().getZProj(this.options.zpos);},getZPos:function getZPos(){return this.options.zpos;},/**
	     * @returns {Number} Lowest x value of the serie's data
	     * @memberof Serie
	     */getMinX:function getMinX(useZValues){if(!useZValues){return this.minX;}return getZCorrectedValue(this,true,true);},/**
	     * @returns {Number} Highest x value of the serie's data
	     * @memberof Serie
	     */getMaxX:function getMaxX(useZValues){if(!useZValues){return this.maxX;}return getZCorrectedValue(this,true,false);},/**
	     * @returns {Number} Lowest y value of the serie's data
	     * @memberof Serie
	     */getMinY:function getMinY(useZValues){if(!useZValues){return this.minY;}return getZCorrectedValue(this,false,true);},/**
	     * @returns {Number} Highest y value of the serie's data
	     * @memberof Serie
	     */getMaxY:function getMaxY(useZValues){if(!useZValues){return this.maxY;}return getZCorrectedValue(this,false,false);}};function getZCorrectedValue(serie,x,min){var i=void 0,l=void 0,data=void 0,val=void 0,valFinal=void 0;var wf=serie.getWaveforms();var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=wf[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var wave=_step3.value;i=0;l=wave.getLength();data=wave.getData();for(;i<l;i+=1){if(x){val=serie.getXAxis().getVal(serie.getX(wave.getX(i,true)));}else{val=serie.getYAxis().getVal(serie.getY(data[i]));}if(i==0){valFinal=val;}else{if(min){valFinal=Math.min(valFinal,val);}else{valFinal=Math.max(valFinal,val);}}}}}catch(err){_didIteratorError3=true;_iteratorError3=err;}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return){_iterator3.return();}}finally{if(_didIteratorError3){throw _iteratorError3;}}}return valFinal;}exports.default=Serie3DMixin;});/***/},/* 20 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(3),__webpack_require__(14),__webpack_require__(17)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('../graph.util'),require('./graph.serie.line'),require('../mixins/graph.mixin.errorbars'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graphSerie,global.graphMixin);global.graphSerieBar=mod.exports;}})(this,function(exports,_graph,_graphSerie,_graphMixin){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var util=_interopRequireWildcard(_graph);var _graphSerie2=_interopRequireDefault(_graphSerie);var _graphMixin2=_interopRequireDefault(_graphMixin);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}/**
	   * Represents a bar serie.
	     Needs to be used exclusively with a bar axis ({@link AxisXBar}).
	     Supports error bars, line color, line width, fill color, fill opacity.
	   * @example graph.newSerie("serieName", { fillColor: 'red', fillOpacity: 0.2 }, "bar" );
	   * @extends Serie
	   */var SerieBar=function(_graphSerie2$default2){_inherits(SerieBar,_graphSerie2$default2);function SerieBar(){_classCallCheck(this,SerieBar);return _possibleConstructorReturn(this,(SerieBar.__proto__||Object.getPrototypeOf(SerieBar)).call(this));}_createClass(SerieBar,[{key:'init',value:function init(graph,name,options){this.graph=graph;this.name=name;this.options=options||{};this.groupMain=document.createElementNS(this.graph.ns,'g');this.pathDom=document.createElementNS(this.graph.ns,'path');this.groupMain.appendChild(this.pathDom);// Creates an empty style variable
this.styles={};// Unselected style
this.styles.unselected={lineColor:this.options.lineColor,lineStyle:this.options.lineStyle,lineWidth:this.options.lineWidth,fillColor:this.options.fillColor,fillOpacity:this.options.fillOpacity,markers:this.options.markers};}/**
	     *  Sets the data of the bar serie
	     *  @param {Object} data
	     *  @example serie.setData( { "cat1": val1, "cat2": val2, "cat4": val4 } );
	     *  @return {SerieBar} The current serie instance
	     */},{key:'setData',value:function setData(data){this.data=data;this.minY=Number.MAX_SAFE_INTEGER;this.maxY=Number.MIN_SAFE_INTEGER;for(var i in this.data){this._checkY(this.data[i]);}return this;}/**
	     *  Sets the fill color
	     */},{key:'setFillColor',value:function setFillColor(fillColor,selectionType,applyToSelected){selectionType=selectionType||"unselected";this.styles[selectionType]=this.styles[selectionType]||{};this.styles[selectionType].fillColor=fillColor;if(applyToSelected){this.setFillColor(fillColor,"selected");}this.styleHasChanged(selectionType);return this;}/**
	     *  Returns the fill color
	     */},{key:'getFillColor',value:function getFillColor(selectionType){return this.getStyle(selectionType).fillColor;}/*
	     * @memberof SerieBar
	     */},{key:'setFillOpacity',value:function setFillOpacity(opacity,selectionType,applyToSelected){selectionType=selectionType||"unselected";this.styles[selectionType]=this.styles[selectionType]||{};this.styles[selectionType].fillOpacity=opacity;if(applyToSelected){this.setLineWidth(opacity,"selected");}this.styleHasChanged(selectionType);return this;}},{key:'getFillOpacity',value:function getFillOpacity(selectionType){return this.getStyle(selectionType).fillOpacity||1;}/**
	     * Reapply the current style to the serie lines elements. Mostly used internally
	     */},{key:'applyLineStyles',value:function applyLineStyles(){this.applyLineStyle(this.pathDom);}/**
	     * Applies the current style to a line element. Mostly used internally
	     * @memberof SerieBar
	     */},{key:'applyLineStyle',value:function applyLineStyle(line){line.setAttribute('stroke',this.getLineColor());line.setAttribute('stroke-width',this.getLineWidth());if(this.getLineDashArray()){line.setAttribute('stroke-dasharray',this.getLineDashArray());}else{line.removeAttribute('stroke-dasharray');}line.setAttribute('fill',this.getFillColor());line.setAttribute('fill-opacity',this.getFillOpacity()||1);}},{key:'draw',value:function draw(){var path="";var categoryNumber,position;if(this.error){this.errorDrawInit();}for(var i in this.data){if(!this.categoryIndices[i]){continue;}path+="M "+this.getXAxis().getPos(this.categoryIndices[i])+" "+this.getYAxis().getPos(0)+" V "+this.getYAxis().getPos(this.data[i])+" h "+this.getXAxis().getDeltaPx(1/this.nbCategories)+" V "+this.getYAxis().getPos(0);if(this.error){this.errorAddPointBarChart(i,this.data[i],this.getXAxis().getPos(this.categoryIndices[i]+0.5/this.nbCategories),this.getYAxis().getPos(this.data[i]));}}if(this.error){this.errorDraw();}this.pathDom.setAttribute('d',path);this.applyLineStyles();}// Markers now allowed
},{key:'setMarkers',value:function setMarkers(){}},{key:'getUsedCategories',value:function getUsedCategories(){return Object.keys(this.data);}}]);return SerieBar;}(_graphSerie2.default);exports.default=SerieBar;});/***/},/* 21 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(15),__webpack_require__(3)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.serie'),require('../graph.util'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graph);global.graphSerieBox=mod.exports;}})(this,function(exports,_graph,_graph3){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * @name SerieZoneDefaultOptions
	   * @object
	   * @static
	   * @param {String} fillColor - The color to fill the zone with
	   * @param {String} lineColor - The line color
	   * @param {String} lineWidth - The line width (in px)
	   */var defaults={orientation:'y',maxBoxWidth:20,defaultStyle:{meanLineColor:'rgb( 100, 0, 0 )',meanLineWidth:2,boxAboveLineWidth:1,boxAboveLineColor:'rgb( 0, 0, 0 )',boxAboveFillColor:'transparent',boxAboveFillOpacity:1,boxBelowLineWidth:1,boxBelowLineColor:'rgb( 0, 0, 0 )',boxBelowFillColor:'transparent',boxBelowFillOpacity:1,barAboveLineColor:'rgba( 0, 0, 0, 1 )',barAboveLineWidth:1,barBelowLineColor:'rgba( 0, 0, 0, 1 )',barBelowLineWidth:1,outlierLineWidth:1,outlierLineColor:'rgb( 255, 255, 255 )',outlierFillColor:'rgb( 0, 0, 0 )',outlierFillOpacity:1}};/**
	   * @static
	   * @extends Serie
	   * @example graph.newSerie( name, options, "scatter" );
	   * @see Graph#newSerie
	   */var SerieBox=function(_graph2$default4){_inherits(SerieBox,_graph2$default4);function SerieBox(){_classCallCheck(this,SerieBox);return _possibleConstructorReturn(this,(SerieBox.__proto__||Object.getPrototypeOf(SerieBox)).call(this));}_createClass(SerieBox,[{key:'init',value:function init(graph,name,options){this.graph=graph;this.name=name;this.options=(0,_graph3.extend)(true,{},defaults,options||{});// Creates options
this.groupMain=document.createElementNS(this.graph.ns,'g');this.pathDom=document.createElementNS(this.graph.ns,'path');this.groupMain.appendChild(this.pathDom);// Creates an empty style variable
this.styles={};// Unselected style
this.styles.unselected=this.options.defaultStyle;}/**
	     *  Sets the data of the bar serie
	     *  @param {Object} data
	     *  @example serie.setData( [ { x: 'cat', Q2: valMean, Q1: valBoxMin, Q3: valBoxMax, whiskers: [ val1, val2 ], outliers: [ ...yList ] } ] );
	     *  @return {SerieBar} The current serie instance
	     */},{key:'setData',value:function setData(data,noRescale){this.data=data;if(!Array.isArray(data)){return;}var axisref=void 0,axisval=void 0,methodref=void 0,methodval=void 0,blnX=void 0;if(this.options.orientation=='y'){axisref=this.getXAxis();axisval=this.getYAxis();methodref=this._checkX.bind(this);methodval=this._checkY.bind(this);blnX=true;this.minY=data[0].Q2;this.maxY=data[0].Q2;this.maxX=data[0].x;this.minX=data[0].x;}else{axisref=this.getYAxis();axisval=this.getXAxis();methodref=this._checkY.bind(this);methodval=this._checkX.bind(this);blnX=false;this.minX=data[0].Q2;this.maxX=data[0].Q2;this.maxY=data[0].y;this.minY=data[0].y;}if(noRescale){methodref=function methodref(){};methodval=function methodval(){};}if(!axisref||!axisval){(0,_graph3.throwError)("Error in setting data of the box serie. The X and Y axes must be set beforehand");}for(var i in this.data){if(blnX){methodref(this.data[i].x);this.data[i].pos=this.data[i].x;}else{methodref(this.data[i].y);this.data[i].pos=this.data[i].y;}if(this.data[i].Q3){methodval(this.data[i].Q3);}if(this.data[i].Q1){methodval(this.data[i].Q1);}if(this.data[i].whiskers){if(Array.isArray(this.data[i].whiskers)){if(this.data[i].whiskers.length>0){methodval(this.data[i].whiskers[0]);}if(this.data[i].whiskers.length>1){methodval(this.data[i].whiskers[1]);}}else{methodval(this.data[i].whiskers);this.data[i].whiskers=[this.data[i].whiskers];}}else{this.data[i].whiskers=[];}if(Array.isArray(this.data[i].outliers)){this.data[i].outliers.map(function(val){return methodval(val);});}else{this.data[i].outliers=[];}}this.dataHasChanged();this.graph.updateDataMinMaxAxes();return this;}},{key:'_style',value:function _style(type,styleValue){var selectionType=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"unselected";var applyToSelected=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;this.styles[selectionType]=this.styles[selectionType]||{};this.styles[selectionType][type]=styleValue;if(applyToSelected){this._set(type,styleValue,"selected");}this.styleHasChanged(selectionType);return this;}},{key:'_gstyle',value:function _gstyle(type,selectionType){return this.getStyle(selectionType)[type];}/**
	     *  Retrives a selection object
	     *  @param {String} [ selectionType = "unselected" ] - The selection type
	     *  @returns {Object} The selection object
	     */},{key:'getStyle',value:function getStyle(){var selectionType=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"unselected";return this.styles[selectionType]||{};}/**
	     *  Sets the mean line color
	     *  @param {String} color - The mean line color
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setMeanLineColor',value:function setMeanLineColor(){return this._style.apply(this,['meanLineColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Returns the mean line color
	     * @return {String} The mean line color
	     */},{key:'getMeanLineColor',value:function getMeanLineColor(){return this._gstyle.apply(this,['meanLineColor'].concat(Array.prototype.slice.call(arguments)));}},{key:'setStyle',value:function setStyle(style){var selectionType=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"unselected";//console.log( style, selectionType );
this.styles[selectionType]=(0,_graph3.extend)({},defaults.defaultStyle,this.styles.unselected,style);this.styleHasChanged(selectionType);}/**
	     *  Sets the mean line width
	     *  @param {Number} width - The line width
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setMeanLineWidth',value:function setMeanLineWidth(){return this._style.apply(this,['meanLineWidth'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Returns the mean line width
	     * @return {Number} The mean line width
	     */},{key:'getMeanLineWidth',value:function getMeanLineWidth(){return this._gstyle.apply(this,['meanLineWidth'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Sets the box line color
	     *  @param {Number} color - The color of the box above the median
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setBoxAboveLineColor',value:function setBoxAboveLineColor(){return this._style.apply(this,['boxAboveLineColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     * Returns the box line color
	     * @return {String} The line color of the box above the median
	     */},{key:'getBoxAboveLineColor',value:function getBoxAboveLineColor(){return this._gstyle.apply(this,['boxAboveLineColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Sets the fill color
	     *  @param {Number} color - The color of the box below the median
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setBoxBelowLineColor',value:function setBoxBelowLineColor(){return this._style.apply(this,['boxBelowLineColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Returns the fill color
	     * @return {String} The line color of the box below the median
	     */},{key:'getBoxBelowLineColor',value:function getBoxBelowLineColor(){return this._gstyle.apply(this,['boxBelowLineColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Sets the fill color
	     *  @param {Number} width - The contour width of the box above the median
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setBoxAboveLineWidth',value:function setBoxAboveLineWidth(){return this._style.apply(this,['boxAboveLineWidth'].concat(Array.prototype.slice.call(arguments)));}/**
	     * Returns the line width of the box above the median
	     * @return {Number} The line width of the box above the median
	     */},{key:'getBoxAboveLineWidth',value:function getBoxAboveLineWidth(){return this._gstyle.apply(this,['boxAboveLineWidth'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Sets the fill color
	     *  @param {Number} width - The contour width of the box below the median
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setBoxBelowLineWidth',value:function setBoxBelowLineWidth(){return this._style.apply(this,['boxBelowLineWidth'].concat(Array.prototype.slice.call(arguments)));}/**
	     * Returns the line width of the box below the median
	     * @return {Number} The line width of the box below the median
	     */},{key:'getBoxBelowLineWidth',value:function getBoxBelowLineWidth(){return this._gstyle.apply(this,['boxBelowLineWidth'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Sets the fill color
	     *  @param {String} color - The fill color of the box above the median
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setBoxAboveFillColor',value:function setBoxAboveFillColor(){return this._style.apply(this,['boxAboveFillColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     * Returns the fill color of the box above the median
	     * @return {String} The fill color of the box above the median
	     */},{key:'getBoxAboveFillColor',value:function getBoxAboveFillColor(){return this._gstyle.apply(this,['boxAboveFillColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Sets the fill color
	     *  @param {String} color - The fill color of the box below the median
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setBoxBelowFillColor',value:function setBoxBelowFillColor(){return this._style.apply(this,['boxBelowFillColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     * Returns the fill color of the box below the median
	     * @return {String} The fill color of the box below the median
	     */},{key:'getBoxBelowFillColor',value:function getBoxBelowFillColor(){return this._gstyle.apply(this,['boxBelowFillColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Sets the fill color
	     *  @param {Number} opacity - The fill opacity of the box above the median
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setBoxAboveFillOpacity',value:function setBoxAboveFillOpacity(){return this._style.apply(this,['boxAboveFillOpacity'].concat(Array.prototype.slice.call(arguments)));}/**
	     * Returns the fill opacity of the box above the median
	     * @return {Number} The fill opacity of the box above the median
	     */},{key:'getBoxAboveFillOpacity',value:function getBoxAboveFillOpacity(){return this._gstyle.apply(this,['boxAboveFillOpacity'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Sets the fill color
	     *  @param {Number} opacity - The fill opacity of the box below the median
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setBoxBelowFillOpacity',value:function setBoxBelowFillOpacity(){return this._style.apply(this,['boxBelowFillOpacity'].concat(Array.prototype.slice.call(arguments)));}/**
	     * Returns the fill opacity of the box below the median
	     * @return {Number} The fill opacity of the box below the median
	     */},{key:'getBoxBelowFillOpacity',value:function getBoxBelowFillOpacity(){return this._gstyle.apply(this,['boxBelowFillOpacity'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Sets the whisker color
	     *  @param {String} color - The line color of the whisker above the median
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setBarAboveLineColor',value:function setBarAboveLineColor(){return this._style.apply(this,['barAboveLineColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     * Returns the line color of the whisker above the median
	     * @return {String} The line color of the whisker above the median
	     */},{key:'getBarAboveLineColor',value:function getBarAboveLineColor(){return this._gstyle.apply(this,['barAboveLineColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Sets the fill color
	     *  @param {String} color - The line color of the whisker below the median
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setBarBelowLineColor',value:function setBarBelowLineColor(){return this._style.apply(this,['barBelowLineColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     * Returns the line color of the whisker below the median
	     * @return {String} The line color of the whisker below the median
	     */},{key:'getBarBelowLineColor',value:function getBarBelowLineColor(){return this._gstyle.apply(this,['barBelowLineColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Sets the fill color
	     *  @param {Number} width - The line width of the whisker above the median
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setBarAboveLineWidth',value:function setBarAboveLineWidth(){return this._style.apply(this,['barAboveLineWidth'].concat(Array.prototype.slice.call(arguments)));}/**
	     * Returns the line width of the whisker above the median
	     * @return {Number} The line width of the whisker above the median
	     */},{key:'getBarAboveLineWidth',value:function getBarAboveLineWidth(){return this._gstyle.apply(this,['barAboveLineWidth'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Sets the fill color
	     *  @param {Number} width - The line width of the whisker below the median
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setBarBelowLineWidth',value:function setBarBelowLineWidth(){return this._style.apply(this,['barBelowLineWidth'].concat(Array.prototype.slice.call(arguments)));}/**
	     * Returns the line width of the whisker below the median
	     * @return {Number} The line width of the whisker below the median
	     */},{key:'getBarBelowLineWidth',value:function getBarBelowLineWidth(){return this._gstyle.apply(this,['barBelowLineWidth'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Sets the fill color
	     *  @param {String} color - The outlier stroke color
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setOutlierLineColor',value:function setOutlierLineColor(){return this._style.apply(this,['outlierLineColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     * Returns the line color of the outliers
	     * @return {String} The line color of the outliers
	     */},{key:'getOutlierLineColor',value:function getOutlierLineColor(){return this._gstyle.apply(this,['outlierLineColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Sets the stroke width
	     *  @param {Number} width - The outlier stroke width
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setOutlierLineWidth',value:function setOutlierLineWidth(){return this._style.apply(this,['outlierLineWidth'].concat(Array.prototype.slice.call(arguments)));}/**
	     * Returns the line width of the outliers
	     * @return {Number} The line width of the outliers
	     */},{key:'getOutlierLineWidth',value:function getOutlierLineWidth(){return this._gstyle.apply(this,['outlierLineWidth'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Sets the fill color
	     *  @param {String} color - The outlier fill color
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setOutlierFillColor',value:function setOutlierFillColor(){return this._style.apply(this,['outlierFillColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     * Returns the fill color of the outliers
	     * @return {String} The fill color of the outliers
	     */},{key:'getOutlierFillColor',value:function getOutlierFillColor(){return this._gstyle.apply(this,['outlierFillColor'].concat(Array.prototype.slice.call(arguments)));}/**
	     *  Sets the outlier fill opacity
	     *  @param {Number} opacity - The outlier fill opacity
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'setOutlierFillOpacity',value:function setOutlierFillOpacity(){return this._style.apply(this,['outlierFillOpacity'].concat(Array.prototype.slice.call(arguments)));}/**
	     * Returns the fill opacity of the outliers
	     * @return {Number} The fill opacity of the outliers
	     */},{key:'getOutlierFillOpacity',value:function getOutlierFillOpacity(){return this._gstyle.apply(this,['outlierFillOpacity'].concat(Array.prototype.slice.call(arguments)));}/**
	     * Reapply the current style to the serie lines elements. Mostly used internally
	     *  @returns {SerieBox} The current serie instance
	     */},{key:'applyLineStyles',value:function applyLineStyles(){this.applyLineStyle(this.pathDom);}/**
	     * Applies the current style to a line element. Mostly used internally
	     * @memberof SerieBar
	     */},{key:'applyLineStyle',value:function applyLineStyle(line){line.setAttribute('stroke',this.getLineColor());line.setAttribute('stroke-width',this.getLineWidth());line.removeAttribute('stroke-dasharray');line.setAttribute('fill',this.getFillColor());line.setAttribute('fill-opacity',this.getFillOpacity()||1);}},{key:'draw',value:function draw(){var _this29=this;if(!this.data){return;}var position=void 0;var axis=this.options.orientation=='y'?this.getYAxis():this.getXAxis();var axis2=this.options.orientation=='y'?this.getXAxis():this.getYAxis();var boxOtherDimension=void 0;// width or height of the box
var useCategories=false;var mean=void 0,boxAbove=void 0,boxBelow=void 0,barAbove=void 0,barBelow=void 0,outliers=void 0,posAbove=void 0,posBelow=void 0;var categoryNumber=void 0;(0,_graph3.emptyDom)(this.groupMain);if(axis2.getType()=='category'){boxOtherDimension=axis2.getRelPx(0.8/this.nbCategories);useCategories=true;}else{// Get all the spacing and determine the smallest one
boxOtherDimension=this.options.maxBoxWidth;//      console.log( boxOtherDimension );
for(var i=0,l=this.data.length;i<l-1;i++){//     console.log( Math.abs( axis.getPx( this.data[ i + 1 ].pos ) - axis.getPx( this.data[ i ].pos ) ), axis.getPx( this.data[ i + 1 ].pos ), axis.getPx( this.data[ i ].pos ) );
boxOtherDimension=Math.min(boxOtherDimension,Math.abs(axis2.getPx(this.data[i+1].pos)-axis2.getPx(this.data[i].pos)));}// console.log( boxOtherDimension );
}for(var i=0,l=this.data.length;i<l;i++){if(axis2.getType()=='category'){var cat=this.options.orientation=='y'?this.data[i].x:this.data[i].y;if(!this.categoryIndices.hasOwnProperty(cat)){if(Array.isArray(this._linkedToScatterSeries)){var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=this._linkedToScatterSeries[Symbol.iterator](),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){var scatter_serie=_step4.value;if(scatter_serie.categoryIndices.hasOwnProperty(cat)){position=[axis2.getPos(scatter_serie.categoryIndices[cat])+1.2*boxOtherDimension/2];if(this.options.orientation=='y'){axis=scatter_serie.getYAxis();}else{axis=scatter_serie.getXAxis();}break;}}}catch(err){_didIteratorError4=true;_iteratorError4=err;}finally{try{if(!_iteratorNormalCompletion4&&_iterator4.return){_iterator4.return();}}finally{if(_didIteratorError4){throw _iteratorError4;}}}}}else{position=[axis2.getPos(this.categoryIndices[cat])+1.2*boxOtherDimension/2];}}else{position=[axis2.getPos(this.options.orientation=='y'?this.data[i].x:this.data[i].y),boxOtherDimension];}mean=axis.getPos(this.data[i].Q2);boxAbove=axis.getPos(this.data[i].Q3);boxBelow=axis.getPos(this.data[i].Q1);this.data[i].whiskers.map(function(val){if(val<_this29.data[i].Q1){barBelow=axis.getPos(val);}else{barAbove=axis.getPos(val);}});outliers=this.data[i].outliers.map(function(val){return axis.getPos(val);});var lineMean=document.createElementNS(this.graph.ns,'line');this.applyMeanStyle(lineMean);var rectAbove=document.createElementNS(this.graph.ns,'rect');var rectBelow=document.createElementNS(this.graph.ns,'rect');if(this.options.orientation=='y'){rectAbove.setAttribute('width',boxOtherDimension);rectAbove.setAttribute('x',position[0]-boxOtherDimension/2);rectBelow.setAttribute('width',boxOtherDimension);rectBelow.setAttribute('x',position[0]-boxOtherDimension/2);lineMean.setAttribute('x1',position[0]-boxOtherDimension/2);lineMean.setAttribute('x2',position[0]+boxOtherDimension/2);lineMean.setAttribute('y1',mean);lineMean.setAttribute('y2',mean);}else{rectAbove.setAttribute('height',boxOtherDimension);rectAbove.setAttribute('y',position[0]-boxOtherDimension/2);rectBelow.setAttribute('height',boxOtherDimension);rectBelow.setAttribute('y',position[0]-boxOtherDimension/2);lineMean.setAttribute('y1',position[0]-boxOtherDimension/2);lineMean.setAttribute('y2',position[0]+boxOtherDimension/2);lineMean.setAttribute('x1',mean);lineMean.setAttribute('x2',mean);}this.boxPos(rectAbove,mean,boxAbove,this.options.orientation=='x');this.boxPos(rectBelow,mean,boxBelow,this.options.orientation=='x');this.applyBoxStyle(rectAbove,rectBelow);var whiskerAbove=document.createElementNS(this.graph.ns,'line');var whiskerBelow=document.createElementNS(this.graph.ns,'line');if(this.options.orientation=='y'){if(barAbove!==undefined){whiskerAbove.setAttribute('y1',boxAbove);whiskerAbove.setAttribute('y2',barAbove);whiskerAbove.setAttribute('x1',position[0]);whiskerAbove.setAttribute('x2',position[0]);}if(barBelow!==undefined){whiskerBelow.setAttribute('y1',boxBelow);whiskerBelow.setAttribute('y2',barBelow);whiskerBelow.setAttribute('x1',position[0]);whiskerBelow.setAttribute('x2',position[0]);}}else{if(barAbove!==undefined){whiskerAbove.setAttribute('x1',boxAbove);whiskerAbove.setAttribute('x2',barAbove);whiskerAbove.setAttribute('y1',position[0]);whiskerAbove.setAttribute('y2',position[0]);}if(barBelow!==undefined){whiskerBelow.setAttribute('x1',boxBelow);whiskerBelow.setAttribute('x2',barBelow);whiskerBelow.setAttribute('y1',position[0]);whiskerBelow.setAttribute('y2',position[0]);}}outliers.map(function(outliervalue){var outlier=document.createElementNS(_this29.graph.ns,'circle');outlier.setAttribute('r',2);if(_this29.options.orientation=='y'){outlier.setAttribute('cx',position[0]);outlier.setAttribute('cy',outliervalue);}else{outlier.setAttribute('cy',position[0]);outlier.setAttribute('cx',outliervalue);}_this29.setOutlierStyle(outlier);_this29.groupMain.appendChild(outlier);});if(barAbove!==undefined){this.groupMain.appendChild(whiskerAbove);}if(barBelow!==undefined){this.groupMain.appendChild(whiskerBelow);}if(boxAbove!==undefined){this.groupMain.appendChild(rectAbove);}if(boxBelow!==undefined){this.groupMain.appendChild(rectBelow);}this.groupMain.appendChild(lineMean);this.applyWhiskerStyle(whiskerAbove,whiskerBelow);}}},{key:'applyBoxStyle',value:function applyBoxStyle(above,below){above.setAttribute('stroke',this.getBoxAboveLineColor());above.setAttribute('stroke-width',this.getBoxAboveLineWidth());if(this.getBoxAboveFillColor()!==undefined){above.setAttribute('fill',this.getBoxAboveFillColor());}if(this.getBoxAboveFillOpacity()!==undefined){above.setAttribute('fill-opacity',this.getBoxAboveFillOpacity());}below.setAttribute('stroke',this.getBoxBelowLineColor());below.setAttribute('stroke-width',this.getBoxBelowLineWidth());if(this.getBoxBelowFillColor()!==undefined){below.setAttribute('fill',this.getBoxBelowFillColor());}if(this.getBoxAboveFillOpacity()!==undefined){below.setAttribute('fill-opacity',this.getBoxBelowFillOpacity());}}},{key:'applyWhiskerStyle',value:function applyWhiskerStyle(above,below){above.setAttribute('stroke',this.getBarAboveLineColor());above.setAttribute('stroke-width',this.getBarAboveLineWidth());below.setAttribute('stroke',this.getBarBelowLineColor());below.setAttribute('stroke-width',this.getBarBelowLineWidth());}},{key:'applyMeanStyle',value:function applyMeanStyle(line){line.setAttribute('stroke',this.getMeanLineColor());line.setAttribute('stroke-width',this.getMeanLineWidth());}},{key:'setOutlierStyle',value:function setOutlierStyle(outlier){outlier.setAttribute('stroke',this.getOutlierLineColor());outlier.setAttribute('stroke-width',this.getOutlierLineWidth());if(this.getBoxBelowFillColor()!==undefined){outlier.setAttribute('fill',this.getOutlierFillColor());}if(this.getBoxAboveFillOpacity()!==undefined){outlier.setAttribute('fill-opacity',this.getOutlierFillOpacity());}}/**
	     * Returns the index of a category based on its name
	     * @param {String} name - The name of the category
	     */},{key:'getCategoryIndex',value:function getCategoryIndex(name){if(!this.categories){throw new Error("No categories were defined. Probably axis.setSeries was not called");}for(var i=0;i<this.categories.length;i++){if(this.categories[i].name==name){return i;}}return false;}// Markers now allowed
},{key:'setMarkers',value:function setMarkers(){}},{key:'boxPos',value:function boxPos(box,mean,extremity,blnX){if(mean>extremity){box.setAttribute(blnX?'x':'y',extremity);box.setAttribute(blnX?'width':'height',mean-extremity);}else{box.setAttribute(blnX?'x':'y',mean);box.setAttribute(blnX?'width':'height',extremity-mean);}}},{key:'getUsedCategories',value:function getUsedCategories(){var xymode=this.options.orientation=='y'?'x':'y';var categories=this.data.map(function(d){return d[xymode];});if(Array.isArray(this._linkedToScatterSeries)){this._linkedToScatterSeries.map(function(scatter_serie){scatter_serie.getUsedCategories().map(function(scatter_serie_cat){var index=void 0;if((index=categories.indexOf(scatter_serie_cat))>-1){categories.splice(index,1);}});});}return categories;}},{key:'linkToScatterSerie',value:function linkToScatterSerie(){for(var _len2=arguments.length,series=Array(_len2),_key2=0;_key2<_len2;_key2++){series[_key2]=arguments[_key2];}this._linkedToScatterSeries=series;}}]);return SerieBox;}(_graph2.default);exports.default=SerieBox;});/***/},/* 22 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(14),__webpack_require__(3),__webpack_require__(17)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.serie.line'),require('../graph.util'),require('../mixins/graph.mixin.errorbars'));}else{var mod={exports:{}};factory(mod.exports,global.graphSerie,global.graph,global.graphMixin);global.graphSerieLineColored=mod.exports;}})(this,function(exports,_graphSerie,_graph,_graphMixin){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graphSerie2=_interopRequireDefault(_graphSerie);var util=_interopRequireWildcard(_graph);var _graphMixin2=_interopRequireDefault(_graphMixin);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Colored serie line
	   * @example graph.newSerie( name, options, "color" );
	   * @see Graph#newSerie
	   * @augments SerieLine
	   */var SerieLineColor=function(_graphSerie2$default3){_inherits(SerieLineColor,_graphSerie2$default3);function SerieLineColor(){_classCallCheck(this,SerieLineColor);return _possibleConstructorReturn(this,(SerieLineColor.__proto__||Object.getPrototypeOf(SerieLineColor)).apply(this,arguments));}_createClass(SerieLineColor,[{key:'initExtended1',value:function initExtended1(){this.lines=this.lines||{};if(this.initExtended2){this.initExtended2();}}},{key:'setColors',value:function setColors(colors){this.colors=colors;}},{key:'_draw_standard',value:function _draw_standard(){var self=this,data=this._dataToUse,toBreak,i=0,l=data.length,j,k,m,x,y,k,o,lastX=false,lastY=false,xpx,ypx,xpx2,ypx2,xAxis=this.getXAxis(),yAxis=this.getYAxis(),xMin=xAxis.getCurrentMin(),yMin=yAxis.getCurrentMin(),xMax=xAxis.getCurrentMax(),yMax=yAxis.getCurrentMax();// Y crossing
var yLeftCrossingRatio,yLeftCrossing,yRightCrossingRatio,yRightCrossing,xTopCrossingRatio,xTopCrossing,xBottomCrossingRatio,xBottomCrossing;var incrXFlip=0;var incrYFlip=1;var pointOutside=false;var lastPointOutside=false;var pointOnAxis;this.eraseLines();if(this.isFlipped()){incrXFlip=1;incrYFlip=0;}for(i=0;i<l;i++){toBreak=false;this.counter1=i;this.currentLine="";j=0;k=0;m=data[i].length;for(j=0;j<m;j+=2){x=data[i][j+incrXFlip];y=data[i][j+incrYFlip];if(x<xMin&&lastX<xMin||x>xMax&&lastX>xMax||(y<yMin&&lastY<yMin||y>yMax&&lastY>yMax)&&!this.options.lineToZero){lastX=x;lastY=y;lastPointOutside=true;continue;}this.counter2=j/2;if(this.markersShown()){this.getMarkerCurrentFamily(this.counter2);}xpx2=this.getX(x);ypx2=this.getY(y);if(xpx2==xpx&&ypx2==ypx){continue;}pointOutside=x<xMin||y<yMin||x>xMax||y>yMax;/*
	                  if ( this.options.lineToZero ) {
	                    pointOutside = ( x < xMin || x > xMax );
	                     if ( pointOutside ) {
	                      continue;
	                    }
	                  } else {
	                     if ( pointOutside || lastPointOutside ) {
	                       if ( ( lastX === false || lastY === false ) && !lastPointOutside ) {
	                         xpx = xpx2;
	                        ypx = ypx2;
	                        lastX = x;
	                        lastY = y;
	                       } else {
	                         pointOnAxis = [];
	                        // Y crossing
	                        yLeftCrossingRatio = ( x - xMin ) / ( x - lastX );
	                        yLeftCrossing = y - yLeftCrossingRatio * ( y - lastY );
	                        yRightCrossingRatio = ( x - xMax ) / ( x - lastX );
	                        yRightCrossing = y - yRightCrossingRatio * ( y - lastY );
	                         // X crossing
	                        xTopCrossingRatio = ( y - yMin ) / ( y - lastY );
	                        xTopCrossing = x - xTopCrossingRatio * ( x - lastX );
	                        xBottomCrossingRatio = ( y - yMax ) / ( y - lastY );
	                        xBottomCrossing = x - xBottomCrossingRatio * ( x - lastX );
	                         if ( yLeftCrossingRatio < 1 && yLeftCrossingRatio > 0 && yLeftCrossing !== false && yLeftCrossing < yMax && yLeftCrossing > yMin ) {
	                          pointOnAxis.push( [ xMin, yLeftCrossing ] );
	                        }
	                         if ( yRightCrossingRatio < 1 && yRightCrossingRatio > 0 && yRightCrossing !== false && yRightCrossing < yMax && yRightCrossing > yMin ) {
	                          pointOnAxis.push( [ xMax, yRightCrossing ] );
	                        }
	                         if ( xTopCrossingRatio < 1 && xTopCrossingRatio > 0 && xTopCrossing !== false && xTopCrossing < xMax && xTopCrossing > xMin ) {
	                          pointOnAxis.push( [ xTopCrossing, yMin ] );
	                        }
	                         if ( xBottomCrossingRatio < 1 && xBottomCrossingRatio > 0 && xBottomCrossing !== false && xBottomCrossing < xMax && xBottomCrossing > xMin ) {
	                          pointOnAxis.push( [ xBottomCrossing, yMax ] );
	                        }
	                         if ( pointOnAxis.length > 0 ) {
	                           if ( !pointOutside ) { // We were outside and now go inside
	                             if ( pointOnAxis.length > 1 ) {
	                              console.error( "Programmation error. Please e-mail me." );
	                              console.log( pointOnAxis, xBottomCrossing, xTopCrossing, yRightCrossing, yLeftCrossing, y, yMin, yMax, lastY );
	                            }
	                             this._createLine();
	                            this._addPoint( this.getX( pointOnAxis[ 0 ][ 0 ] ), this.getY( pointOnAxis[ 0 ][ 1 ] ), pointOnAxis[ 0 ][ 0 ], pointOnAxis[ 0 ][ 1 ], false, false, false );
	                            this._addPoint( xpx2, ypx2, lastX, lastY, false, false, true );
	                           } else if ( !lastPointOutside ) { // We were inside and now go outside
	                             if ( pointOnAxis.length > 1 ) {
	                              console.error( "Programmation error. Please e-mail me." );
	                              console.log( pointOnAxis, xBottomCrossing, xTopCrossing, yRightCrossing, yLeftCrossing, y, yMin, yMax, lastY );
	                            }
	                             this._addPoint( this.getX( pointOnAxis[ 0 ][ 0 ] ), this.getY( pointOnAxis[ 0 ][ 1 ] ), pointOnAxis[ 0 ][ 0 ], pointOnAxis[ 0 ][ 1 ], false, false, false );
	                           } else {
	                             // No crossing: do nothing
	                            if ( pointOnAxis.length == 2 ) {
	                              this._createLine();
	                               this._addPoint( this.getX( pointOnAxis[ 0 ][ 0 ] ), this.getY( pointOnAxis[ 0 ][ 1 ] ), pointOnAxis[ 0 ][ 0 ], pointOnAxis[ 0 ][ 1 ], false, false, false );
	                              this._addPoint( this.getX( pointOnAxis[ 1 ][ 0 ] ), this.getY( pointOnAxis[ 1 ][ 1 ] ), pointOnAxis[ 0 ][ 0 ], pointOnAxis[ 0 ][ 1 ], false, false, false );
	                            }
	                           }
	                        } else if ( !pointOutside ) {
	                          this._addPoint( xpx2, ypx2, lastX, lastY, j, false, false );
	                        }
	                      }
	                       xpx = xpx2;
	                      ypx = ypx2;
	                      lastX = x;
	                      lastY = y;
	                       lastPointOutside = pointOutside;
	                       continue;
	                    }
	                   }*/if(isNaN(xpx2)||isNaN(ypx2)){if(this.counter>0){//      this._createLine();
}continue;}// OPTIMIZATION START
if(!this._optimize_before(xpx2,ypx2)){continue;}// OPTIMIZATION END
var color=this.colors[i][j/2];this._addPoint(xpx2,ypx2,x,y,xpx,ypx,lastX,lastY,j,color,false,true);this.detectPeaks(x,y);// OPTIMIZATION START
if(!this._optimize_after(xpx2,ypx2)){toBreak=true;break;}// OPTIMIZATION END
xpx=xpx2;ypx=ypx2;lastX=x;lastY=y;}// this._createLine();
if(toBreak){break;}}this.latchLines();if(this._tracker){if(this._trackerDom){this._trackerDom.remove();}var cloned=this.groupLines.cloneNode(true);this.groupMain.appendChild(cloned);for(var i=0,l=cloned.children.length;i<l;i++){cloned.children[i].setAttribute('stroke','transparent');cloned.children[i].setAttribute('stroke-width','25px');cloned.children[i].setAttribute('pointer-events','stroke');}self._trackerDom=cloned;self.groupMain.addEventListener("mousemove",function(e){var coords=self.graph._getXY(e),ret=self.handleMouseMove(false,false);self._trackingCallback(self,ret,coords.x,coords.y);});self.groupMain.addEventListener("mouseleave",function(e){self._trackingOutCallback(self);});}return this;}},{key:'_addPoint',value:function _addPoint(xpx,ypx,x,y,xpxbefore,ypxbefore,xbefore,ybefore,j,color,move,allowMarker){if(xpxbefore===undefined||ypxbefore===undefined){return;}if(isNaN(xpx)||isNaN(ypx)){return;}var line=this.lines[color];if(!line){line=this.lines[color]={object:document.createElementNS(this.graph.ns,'path'),path:"",color:color};line.object.setAttribute('stroke',color);line.color=color;//      this.applyLineStyle( line );
this.groupLines.appendChild(line.object);}line.path+="M "+xpxbefore+" "+ypxbefore+" L "+xpx+" "+ypx;if(this.error){this.errorAddPoint(j,x,y,xpx,ypx);}/*if ( this.markersShown() && allowMarker !== false ) {
	        drawMarkerXY( this, this.markerFamilies[ this.selectionType ][ this.markerCurrentFamily ], xpx, ypx );
	      }*/}},{key:'removeExtraLines',value:function removeExtraLines(){}// Returns the DOM
},{key:'latchLines',value:function latchLines(){for(var i in this.lines){this.lines[i].object.setAttribute('d',this.lines[i].path);}}// Returns the DOM
},{key:'eraseLines',value:function eraseLines(){for(var i in this.lines){this.lines[i].path="";this.lines[i].object.setAttribute('d',"");}}/**
	     * Applies the current style to a line element. Mostly used internally
	     * @memberof SerieLine
	     */},{key:'applyLineStyle',value:function applyLineStyle(line){//line.setAttribute( 'stroke', this.getLineColor() );
line.setAttribute('stroke-width',this.getLineWidth());if(this.getLineDashArray()){line.setAttribute('stroke-dasharray',this.getLineDashArray());}else{line.removeAttribute('stroke-dasharray');}line.setAttribute('fill','none');//	line.setAttribute('shape-rendering', 'optimizeSpeed');
}}]);return SerieLineColor;}(_graphSerie2.default);exports.default=SerieLineColor;});/***/},/* 23 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(15),__webpack_require__(3),__webpack_require__(17)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.serie'),require('../graph.util'),require('../mixins/graph.mixin.errorbars'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graph,global.graphMixin);global.graphSerieScatter=mod.exports;}})(this,function(exports,_graph,_graph3,_graphMixin){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);var util=_interopRequireWildcard(_graph3);var _graphMixin2=_interopRequireDefault(_graphMixin);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var defaults={};var type="scatter";/**
	   * @static
	   * @augments Serie
	   * @example graph.newSerie( name, options, "scatter" );
	   * @see Graph#newSerie
	   */var SerieScatter=function(_graph2$default5){_inherits(SerieScatter,_graph2$default5);function SerieScatter(){_classCallCheck(this,SerieScatter);return _possibleConstructorReturn(this,(SerieScatter.__proto__||Object.getPrototypeOf(SerieScatter)).apply(this,arguments));}/**
	     * Initializes the series
	     * @private
	     */_createClass(SerieScatter,[{key:'init',value:function init(graph,name,options){var self=this;this.graph=graph;this.name=name;this.id=Math.random()+Date.now();this.shapes=[];// Stores all shapes
this.shown=true;this.options=util.extend(true,{},defaults,options);this.data=[];this.shapesDetails=[];this.shapes=[];this._type=type;util.mapEventEmission(this.options,this);this._isMinOrMax={x:{min:false,max:false},y:{min:false,max:false}};this.groupPoints=document.createElementNS(this.graph.ns,'g');this.groupMain=document.createElementNS(this.graph.ns,'g');this.additionalData={};this.selectedStyleGeneral={};this.selectedStyleModifiers={};this.groupPoints.addEventListener('mouseover',function(e){var id=parseInt(e.target.parentElement.getAttribute('data-shapeid'));self.emit("mouseover",id,self.data[id*2],self.data[id*2+1]);});this.groupPoints.addEventListener('mouseout',function(e){var id=parseInt(e.target.parentElement.getAttribute('data-shapeid'));self.emit("mouseout",id,self.data[id*2],self.data[id*2+1]);});this.minX=Number.MAX_VALUE;this.minY=Number.MAX_VALUE;this.maxX=Number.MIN_VALUE;this.maxY=Number.MIN_VALUE;this.groupMain.appendChild(this.groupPoints);this.currentAction=false;if(this.initExtended1){this.initExtended1();}this.styles={};this.styles.unselected={};this.styles.selected={};this.styles.unselected.default={shape:'circle',cx:0,cy:0,r:3,stroke:'transparent',fill:"black"};this.styles.selected.default={shape:'circle',cx:0,cy:0,r:4,stroke:'transparent',fill:"black"};}/**
	     * Sets data to the serie. The data serie is the same one than for a line serie, however the object definition is not available here
	     * @see GraphSerie#setData
	     */},{key:'setData',value:function setData(data,oneDimensional,type){var z=0,x,dx,oneDimensional=oneDimensional||"2D",type=type||'float',arr,total=0,continuous;this.empty();this.shapesDetails=[];this.shapes=[];if(!data instanceof Array){return this;}if(data instanceof Array&&!(data[0]instanceof Array)&&_typeof(data[0])!=="object"){// [100, 103, 102, 2143, ...]
oneDimensional="1D";}var _2d=oneDimensional=="2D";arr=this._addData(type,_2d?data.length*2:data.length);z=0;for(var j=0,l=data.length;j<l;j++){if(_2d){arr[z]=data[j][0];this._checkX(arr[z]);z++;arr[z]=data[j][1];this._checkY(arr[z]);z++;total++;}else{// 1D Array
arr[z]=data[j];this[j%2==0?'_checkX':'_checkY'](arr[z]);z++;total+=j%2?1:0;}}this.dataHasChanged();this.graph.updateDataMinMaxAxes();this.data=arr;return this;}/**
	     * Applies for x as the category axis
	     * @example serie.setData( { x: "someName", y: [ ...values ] } );
	     */},{key:'setDataCategory',value:function setDataCategory(data){for(var i in data){if(Array.isArray(data[i].y)){var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{for(var _iterator5=data[i].y[Symbol.iterator](),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){var j=_step5.value;this._checkY(j);}}catch(err){_didIteratorError5=true;_iteratorError5=err;}finally{try{if(!_iteratorNormalCompletion5&&_iterator5.return){_iterator5.return();}}finally{if(_didIteratorError5){throw _iteratorError5;}}}}}this.dataHasChanged();this.graph.updateDataMinMaxAxes();this.data=data;return this;}/**
	     * Removes all DOM points
	     * @private
	     */},{key:'empty',value:function empty(){while(this.groupPoints.firstChild){this.groupPoints.removeChild(this.groupPoints.firstChild);}}},{key:'getSymbolForLegend',value:function getSymbolForLegend(){if(this.symbol){return this.symbol;}var g=document.createElementNS(this.graph.ns,'g');g.setAttribute('data-shapeid',-1);var shape=this.doShape(g,this.styles["unselected"].default);var style=this.getStyle("unselected",-1,true);for(var i in style[-1]){if(i=="shape"){continue;}shape.setAttribute(i,style[-1][i]);}return g;}/**
	     * Sets style to the scatter points
	     * First argument is the style applied by default to all points
	     * Second argument is an array of modifiers that allows customization of any point of the scatter plot. Data for each elements of the array will augment <code>allStyles</code>, so be sure to reset the style if needed.
	     * All parameters - except <code>shape</code> - will be set as parameters to the DOM element of the shape
	     *
	     * @example
	     * var modifiers = [];
	     * modifiers[ 20 ] = { shape: 'circle', r: 12, fill: 'rgba(0, 100, 255, 0.3)', stroke: 'rgb(0, 150, 255)' };
	     * serie.setStyle( { shape: 'circle', r: 2, fill: 'rgba(255, 0, 0, 0.3)', stroke: 'rgb(255, 100, 0)' }, modifiers ); // Will modify scatter point n°20
	     *
	     * @param {Object} allStyles - The general style for all markers
	     * @param {Object} [ modifiers ] - The general style for all markers
	     * @param {String} [ selectionMode="unselected" ] - The selection mode to which this style corresponds. Default is unselected
	     *
	     */},{key:'setStyle',value:function setStyle(all,modifiers,mode){if(typeof modifiers=="string"){mode=modifiers;modifiers=false;}if(mode===undefined){mode="unselected";}/*
	      if( ! this.styles[ mode ] ) {
	       }
	       if ( mode !== "selected" && mode !== "unselected" ) {
	        throw "Style mode is not correct. Should be selected or unselected";
	      }
	      */this.styles[mode]=this.styles[mode]||{};this.styles[mode].all=all;this.styles[mode].modifiers=modifiers;this.styleHasChanged(mode);return this;}/**
	     * Redraws the serie
	     * @private
	     * @param {force} Boolean - Forces redraw even if the data hasn't changed
	     */},{key:'draw',value:function draw(force){// Serie redrawing
if(!force&&!this.hasDataChanged()&&!this.hasStyleChanged('unselected')){return;}var x,y,xpx,ypx,j=0,k,m,currentLine,max,self=this;var isCategory=this.getXAxis().getType()=='category';this._drawn=true;this.dataHasChanged(false);this.styleHasChanged(false);this.groupMain.removeChild(this.groupPoints);var incrXFlip=0;var incrYFlip=1;if(this.getFlip()){incrXFlip=1;incrYFlip=0;}var totalLength=this.data.length/2;var keys=[];j=0;k=0;m=this.data.length;if(this.error){this.errorDrawInit();}if(isCategory){var _k=0;for(;j<m;j+=1){if(!this.categoryIndices.hasOwnProperty(this.data[j].x)){continue;}//     let position = calculatePosition( categoryNumber, this.order, this.nbSeries, this.categories.length );
//xpx = this.getX( categoryNumber );
var ys=this.data[j].y,l=ys.length,_i3=0;if(this.error){//   this.errorAddPoint( j, position[ 0 ] + position[ 1 ] / 2, 0, this.getX( position[ 0 ] + position[ 1 ] / 2 ), ypx );
}var _iteratorNormalCompletion6=true;var _didIteratorError6=false;var _iteratorError6=undefined;try{for(var _iterator6=this.data[j].y[Symbol.iterator](),_step6;!(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done);_iteratorNormalCompletion6=true){var _y2=_step6.value;//let xpos = i / ( l - 1 ) * ( position[ 1 ] ) + position[ 0 ];
var xpos=_i3/(l-1)*(0.8/this.nbCategories)+this.categoryIndices[this.data[j].x]+0.1/this.nbCategories;ypx=this.getY(_y2);xpx=this.getX(xpos);_i3++;this.shapesDetails[_k]=this.shapesDetails[_k]||[];this.shapesDetails[_k][0]=xpx;this.shapesDetails[_k][1]=ypx;keys.push(_k);_k++;}}catch(err){_didIteratorError6=true;_iteratorError6=err;}finally{try{if(!_iteratorNormalCompletion6&&_iterator6.return){_iterator6.return();}}finally{if(_didIteratorError6){throw _iteratorError6;}}}}}else{for(;j<m;j+=2){if(this.data[j+incrXFlip]<this.getXAxis().getCurrentMin()||this.data[j+incrXFlip]>this.getXAxis().getCurrentMax()||this.data[j+incrYFlip]<this.getYAxis().getCurrentMin()||this.data[j+incrYFlip]>this.getYAxis().getCurrentMax()){continue;}xpx=this.getX(this.data[j+incrXFlip]);ypx=this.getY(this.data[j+incrYFlip]);if(this.error){this.errorAddPoint(j,this.data[j+incrXFlip],this.data[j+incrYFlip],xpx,ypx);}this.shapesDetails[j/2]=this.shapesDetails[j/2]||[];this.shapesDetails[j/2][0]=xpx;this.shapesDetails[j/2][1]=ypx;keys.push(j/2);//this.shapes[ j / 2 ] = this.shapes[ j / 2 ] ||  undefined;
}}if(this.error){this.errorDraw();}// This will automatically create the shapes
this.applyStyle("unselected",keys);this.groupMain.appendChild(this.groupPoints);}},{key:'_addPoint',value:function _addPoint(xpx,ypx,k){var g=document.createElementNS(this.graph.ns,'g');g.setAttribute('transform','translate('+xpx+', '+ypx+')');g.setAttribute('data-shapeid',k);if(this.extraStyle&&this.extraStyle[k]){shape=this.doShape(g,this.extraStyle[k]);}else if(this.stdStylePerso){shape=this.doShape(g,this.stdStylePerso);}else{shape=this.doShape(g,this.stdStyle);}this.shapes[k]=shape;this.groupPoints.appendChild(g);}},{key:'doShape',value:function doShape(group,shape){var el=document.createElementNS(this.graph.ns,shape.shape);group.appendChild(el);return el;}},{key:'getStyle',value:function getStyle(selection,index,noSetPosition){var selection=selection||'unselected';var indices;var styles={};if(typeof index=="number"){indices=[index];}else if(Array.isArray(index)){indices=index;}var shape,index,modifier,style,j;// loop variables
var styleAll;if(this.styles[selection].all!==undefined){styleAll=this.styles[selection].all;if(typeof styleAll=="function"){styleAll=styleAll();}else if(styleAll===false){styleAll={};}}var i=0,l=indices.length;for(;i<l;i++){index=indices[i];shape=this.shapes[index];if((modifier=this.styles[selection].modifiers)&&(typeof modifier=="function"||modifier[index])){if(typeof modifier=="function"){style=modifier(index,shape);}else if(modifier[index]){style=modifier[index];}var tmp=util.extend({},styleAll,style);style=util.extend(style,tmp);}else if(styleAll!==undefined){style=styleAll;}else{style=this.styles[selection].default;}if(!shape){// Shape doesn't exist, let's create it
var g=document.createElementNS(this.graph.ns,'g');g.setAttribute('data-shapeid',index);this.shapes[index]=this.doShape(g,style);this.groupPoints.appendChild(g);shape=this.shapes[index];}if(!noSetPosition){shape.parentNode.setAttribute('transform','translate('+this.shapesDetails[index][0]+', '+this.shapesDetails[index][1]+')');}styles[index]=style;}return styles;}},{key:'applyStyle',value:function applyStyle(selection,index,noSetPosition){var i,j;var styles=this.getStyle(selection,index,noSetPosition);for(i in styles){for(j in styles[i]){if(j!=="shape"){if(styles[i][j]){this.shapes[i].setAttribute(j,styles[i][j]);}else{this.shapes[i].removeAttribute(j);}}}}}},{key:'unselectPoint',value:function unselectPoint(index){this.selectPoint(index,false);}},{key:'selectPoint',value:function selectPoint(index,setOn,selectionType){if(this.shapesDetails[index][2]&&this.shapesDetails[index][2]==selectionType){return;}if(typeof setOn=="string"){selectionType=setOn;setOn=undefined;}if(Array.isArray(index)){return this.selectPoints(index);}if(this.shapes[index]&&this.shapesDetails[index]){if((this.shapesDetails[index][2]||setOn===false)&&setOn!==true){var selectionStyle=this.shapesDetails[index][2];this.shapesDetails[index][2]=false;var allStyles=this.getStyle(selectionStyle,index,true);for(var i in allStyles[index]){this.shapes[index].removeAttribute(i);}this.applyStyle("unselected",index,true);}else{selectionType=selectionType||"selected";this.shapesDetails[index][2]=selectionType;this.applyStyle(selectionType,index,true);}}}},{key:'getUsedCategories',value:function getUsedCategories(){if(_typeof(this.data[0])=='object'){return this.data.map(function(d){return d.x;});}return[];}}]);return SerieScatter;}(_graph2.default);util.mix(SerieScatter,_graphMixin2.default);exports.default=SerieScatter;});/***/},/* 24 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(15),__webpack_require__(5),__webpack_require__(3)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.serie'),require('../util/waveform'),require('../graph.util'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.waveform,global.graph);global.graphSerieZone=mod.exports;}})(this,function(exports,_graph,_waveform,_graph3){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);var _waveform2=_interopRequireDefault(_waveform);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * @name SerieZoneDefaultOptions
	   * @object
	   * @static
	   * @param {String} fillColor - The color to fill the zone with
	   * @param {String} lineColor - The line color
	   * @param {String} lineWidth - The line width (in px)
	   */var defaults={fillColor:'rgba( 0, 0, 0, 0.1 )',lineColor:'rgba( 0, 0, 0, 1 )',lineWidth:'1px'};/**
	   * @static
	   * @extends Serie
	   * @example graph.newSerie( name, options, "scatter" );
	   * @see Graph#newSerie
	   */var SerieZone=function(_graph2$default6){_inherits(SerieZone,_graph2$default6);function SerieZone(){_classCallCheck(this,SerieZone);return _possibleConstructorReturn(this,(SerieZone.__proto__||Object.getPrototypeOf(SerieZone)).apply(this,arguments));}_createClass(SerieZone,[{key:'init',value:function init(graph,name,options){var self=this;this.graph=graph;this.name=name;this.selectionType="unselected";this.id=(0,_graph3.guid)();this.options=(0,_graph3.extend)(true,{},defaults,options);this.groupZones=document.createElementNS(this.graph.ns,'g');this.groupMain=document.createElementNS(this.graph.ns,'g');this.lineZone=document.createElementNS(this.graph.ns,'path');this.lineZone.setAttribute('stroke','black');this.lineZone.setAttribute('stroke-width','1px');this.groupMain.appendChild(this.groupZones);this.groupZones.appendChild(this.lineZone);this.applyLineStyle(this.lineZone);this.styleHasChanged();this.clip=document.createElementNS(this.graph.ns,'clipPath');this.clipId=(0,_graph3.guid)();this.clip.setAttribute('id',this.clipId);this.graph.defs.appendChild(this.clip);//   this.clipRect = document.createElementNS( this.graph.ns, 'rect' );
//   this.clip.appendChild( this.clipRect );
//    this.clip.setAttribute( 'clipPathUnits', 'userSpaceOnUse' );
//  this.groupMain.setAttribute( 'clip-path', 'url(#' + this.clipId + ')' );
}/**
	     * Assigns a collection of waveforms that make up the zone
	     * The waveforms will appended one after the other, without break
	     * @param {...Waveform} waveforms - The collection of waveforms
	     * @return {SerieZone} - The current serie zone instance
	     * @memberof SerieZone
	     */},{key:'setWaveform',value:function setWaveform(){var _this33=this;for(var _len3=arguments.length,waveforms=Array(_len3),_key3=0;_key3<_len3;_key3++){waveforms[_key3]=arguments[_key3];}this.waveforms=waveforms;this.waveforms=this.waveforms.map(function(wave){if(!(wave instanceof _waveform2.default)){return new _waveform2.default(wave);}else{return wave;}});this.minX=this.waveforms[0].getXMin();this.maxX=this.waveforms[0].getXMax();this.minY=this.waveforms[0].getMin();this.maxY=this.waveforms[0].getMax();this.waveforms.map(function(wave){_this33.minX=Math.min(wave.getXMin(),_this33.minX);_this33.maxX=Math.max(wave.getXMin(),_this33.maxX);_this33.minY=Math.min(wave.getMin(),_this33.minY);_this33.maxY=Math.max(wave.getMax(),_this33.maxY);});this.graph.updateDataMinMaxAxes();this.dataHasChanged();return this;}},{key:'setWaveforms',value:function setWaveforms(){return this.setWaveform.apply(this,arguments);}},{key:'getWaveforms',value:function getWaveforms(){return this.waveforms;}},{key:'setMinMaxWaveforms',value:function setMinMaxWaveforms(min,max){this.waveforms=[min,max.reverse()];return this;}/**
	     * Removes all the dom concerning this serie from the drawing zone
	     */},{key:'empty',value:function empty(){while(this.group.firstChild){this.group.removeChild(this.group.firstChild);}}/**
	     * Redraws the serie
	     * @private
	     *
	     * @param {force} Boolean - Forces redraw even if the data hasn't changed
	     */},{key:'draw',value:function draw(force){// Serie redrawing
if(force||this.hasDataChanged()){if(!this.waveforms){return;}var dataX=0,_dataY=0,xpx=0,ypx=0,j=0,line="",buffer=void 0;var xminpx=this.getXAxis().getMinPx(),xmaxpx=this.getXAxis().getMaxPx(),yminpx=this.getYAxis().getMinPx(),ymaxpx=this.getYAxis().getMaxPx();var xmin=this.getXAxis().getCurrentMin(),xmax=this.getXAxis().getCurrentMax(),ymin=this.getYAxis().getCurrentMin(),ymax=this.getYAxis().getCurrentMax();//this.clipRect.setAttribute( "x", Math.min( xmin, xmax ) );
//this.clipRect.setAttribute( "y", Math.min( ymin, ymax ) );
//this.clipRect.setAttribute( "width", Math.abs( xmax - xmin ) );
//this.clipRect.setAttribute( "height", Math.abs( ymax - ymin ) );
this.groupMain.removeChild(this.groupZones);var _iteratorNormalCompletion7=true;var _didIteratorError7=false;var _iteratorError7=undefined;try{for(var _iterator7=this.waveforms[Symbol.iterator](),_step7;!(_iteratorNormalCompletion7=(_step7=_iterator7.next()).done);_iteratorNormalCompletion7=true){var waveform=_step7.value;_dataY=waveform.getData(true);for(j=0;j<_dataY.length;j+=1){dataX=waveform.getX(j,true);ypx=this.getY(_dataY[j]);xpx=this.getX(dataX);if(dataX<xmin||dataX>xmax){buffer=[dataX,_dataY[j],xpx,ypx];continue;}// The y axis in screen coordinate is inverted vs cartesians
if(_dataY[j]<ymin){ypx=this.getY(ymin);}else if(_dataY[j]>ymax){ypx=this.getY(ymax);}if(line.length>0){line+=" L ";}if(buffer){line+=buffer[2]+","+buffer[3]+" ";buffer=false;}else{line+=xpx+","+ypx+" ";}}}}catch(err){_didIteratorError7=true;_iteratorError7=err;}finally{try{if(!_iteratorNormalCompletion7&&_iterator7.return){_iterator7.return();}}finally{if(_didIteratorError7){throw _iteratorError7;}}}this.lineZone.setAttribute('d',"M "+line+" z");this.groupMain.appendChild(this.groupZones);}if(this.hasStyleChanged(this.selectionType)){this.applyLineStyle(this.lineZone);this.styleHasChanged(false);}}/**
	     * Applies the computed style to the DOM element fed as a parameter
	     * @private
	     *
	     * @param {SVGLineElement} line - The line to which the style has to be applied to
	     */},{key:'applyLineStyle',value:function applyLineStyle(line){line.setAttribute('stroke',this.getLineColor());line.setAttribute('stroke-width',this.getLineWidth());line.setAttribute('fill',this.getFillColor());line.setAttribute('fill-opacity',this.getFillOpacity());line.setAttribute('stroke-opacity',this.getLineOpacity());}/**
	     * Sets the line width
	     *
	     * @param {Number} width - The line width
	     * @returns {SerieZone} - The current serie
	     */},{key:'setLineWidth',value:function setLineWidth(width){this.options.lineWidth=width;this.styleHasChanged();return this;}/**
	     * Gets the line width
	     *
	     * @returns {Number} - The line width
	     */},{key:'getLineWidth',value:function getLineWidth(){return this.options.lineWidth;}/**
	     * Sets the line opacity
	     *
	     * @param {Number} opacity - The line opacity
	     * @returns {SerieZone} - The current serie
	     */},{key:'setLineOpacity',value:function setLineOpacity(opacity){this.options.lineOpacity=opacity;this.styleHasChanged();return this;}/**
	     * Gets the line opacity
	     *
	     * @returns {Number} - The line opacity
	     */},{key:'getLineOpacity',value:function getLineOpacity(){return this.options.lineOpacity;}/**
	     * Sets the line color
	     *
	     * @param {String} color - The line color
	     * @returns {SerieZone} - The current serie
	     */},{key:'setLineColor',value:function setLineColor(color){this.options.lineColor=color;this.styleHasChanged();return this;}/**
	     * Gets the line width
	     *
	     * @returns {Number} - The line width
	     */},{key:'getLineColor',value:function getLineColor(){return this.options.lineColor;}/**
	     * Sets the fill opacity
	     *
	     * @param {Number} opacity - The fill opacity
	     * @returns {SerieZone} - The current serie
	     */},{key:'setFillOpacity',value:function setFillOpacity(opacity){this.options.fillOpacity=opacity;this.styleHasChanged();return this;}/**
	     * Gets the fill opacity
	     *
	     * @returns {Number} - The fill opacity
	     */},{key:'getFillOpacity',value:function getFillOpacity(){return this.options.fillOpacity;}/**
	     * Sets the fill color
	     *
	     * @param {Number} width - The line width
	     * @returns {Number} - The line width
	     */},{key:'setFillColor',value:function setFillColor(color){this.options.fillColor=color;this.styleHasChanged();return this;}/**
	     * Gets the fill color
	     *
	     * @returns {Number} - The fill color
	     */},{key:'getFillColor',value:function getFillColor(){return this.options.fillColor;}}]);return SerieZone;}(_graph2.default);exports.default=SerieZone;});/***/},/* 25 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(1),__webpack_require__(24),__webpack_require__(5),__webpack_require__(19),__webpack_require__(3)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('../graph.core'),require('./graph.serie.zone'),require('../util/waveform'),require('../mixins/graph.mixin.serie3d'),require('../graph.util'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graphSerie,global.waveform,global.graphMixin,global.graph);global.graphSerieZone3d=mod.exports;}})(this,function(exports,_graph,_graphSerie,_waveform,_graphMixin,_graph3){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);var _graphSerie2=_interopRequireDefault(_graphSerie);var _waveform2=_interopRequireDefault(_waveform);var _graphMixin2=_interopRequireDefault(_graphMixin);var util=_interopRequireWildcard(_graph3);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * @name SerieLineDefaultOptions
	   * @object
	   * @static
	   * @memberof SerieLine
	   */var defaults={zpos:0};/**
	   * Serie line with 3D projection
	   * @example graph.newSerie( name, options, "line" );
	   * @see Graph#newSerie
	   * @extends SerieLine
	   */var SerieZone3D=function(_graphSerie2$default4){_inherits(SerieZone3D,_graphSerie2$default4);function SerieZone3D(){_classCallCheck(this,SerieZone3D);return _possibleConstructorReturn(this,(SerieZone3D.__proto__||Object.getPrototypeOf(SerieZone3D)).apply(this,arguments));}_createClass(SerieZone3D,[{key:'init',value:function init(graph,name,options){_get(SerieZone3D.prototype.__proto__||Object.getPrototypeOf(SerieZone3D.prototype),'init',this).call(this,graph,name,options);this.options=util.extend(true,this.options,defaults,options||{});// Creates options
return this;}/**
	     * Sets the z-position
	     * @memberof SerieZone3D
	     * @param {Number} zPos - The position in the z axis
	     */},{key:'setZPos',value:function setZPos(zPos){this.options.zpos=zPos;return this;}},{key:'setz',value:function setz(){return this.setZPos.apply(this,arguments);}}]);return SerieZone3D;}(_graphSerie2.default);util.mix(SerieZone3D,_graphMixin2.default);exports.default=SerieZone3D;});/***/},/* 26 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(15),__webpack_require__(3)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.serie'),require('../graph.util'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graph);global.graphSerieDensitymap=mod.exports;}})(this,function(exports,_graph,_graph3){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);var util=_interopRequireWildcard(_graph3);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * @name SerieDensityMapDefaultOptions
	   * @object
	   * @static
	   * @memberof SerieDensityMap
	   */var defaults={};/**
	   * Density map serie
	   * @example graph.newSerie( name, options, "densitymap" );
	   * @see Graph#newSerie
	   * @augments Serie
	   */var SerieDensityMap=function(_graph2$default7){_inherits(SerieDensityMap,_graph2$default7);function SerieDensityMap(){_classCallCheck(this,SerieDensityMap);return _possibleConstructorReturn(this,(SerieDensityMap.__proto__||Object.getPrototypeOf(SerieDensityMap)).apply(this,arguments));}_createClass(SerieDensityMap,[{key:'init',/**
	     * Initializes the serie
	     * @private
	     * @memberof SerieDensityMap
	     */value:function init(graph,name,options){this.options=util.extend(true,{},defaults,options||{});// Creates options
util.mapEventEmission(this.options,this);// Register events
this.graph=graph;this.groupMain=document.createElementNS(this.graph.ns,'g');this.rects=[];this.paths=[];this.recalculateBinsOnDraw=false;}/**
	     * Sets the data of the serie. Careful, only one format allowed for now.
	     * @memberof SerieDensityMap
	     * @param {Array} data - A vector containing 2-elements arrays
	     * @return {SerieDensityMap} The current instance
	     * @example serie.setData( [ [ x1, y1 ], [ x2, y2 ], ..., [ xn, yn ] ] );
	     */},{key:'setData',value:function setData(data){this.minX=this.maxX=this.minY=this.maxY=0;var i=0,l=data.length;this.data=data;this.minX=Number.POSITIVE_INFINITY;this.minY=Number.POSITIVE_INFINITY;this.maxX=Number.NEGATIVE_INFINITY;this.maxY=Number.NEGATIVE_INFINITY;for(i=0;i<l;i++){this._checkX(data[i][0]);this._checkY(data[i][1]);}this.dataHasChanged();this.graph.updateDataMinMaxAxes();return this;}/**
	     * Calculates the bins from the (x,y) dataset
	     * @memberof SerieDensityMap
	     * @param {Number} fromX - The first x element to consider
	     * @param {Number} deltaX - The x spacing between two bins
	     * @param {Number} numX - The number of x bins
	     * @param {Number} fromY - The first y element to consider
	     * @param {Number} deltaY - The y spacing between two bins
	     * @param {Number} numY - The number of y bins
	     * @return {Array} The generated density map
	     * @see SerieDensityMap#autoBins
	     * @see SerieDensityMap#autoColorMapBinBoundaries
	     * @see SerieDensityMap#setPxPerBin
	     */},{key:'calculateDensity',value:function calculateDensity(fromX,deltaX,numX,fromY,deltaY,numY){var densitymap=[],i,l=this.data.length,indexX,indexY;var binMin=Number.POSITIVE_INFINITY;var binMax=Number.NEGATIVE_INFINITY;for(i=0;i<l;i++){indexX=~~((this.data[i][0]-fromX)/deltaX);indexY=~~((this.data[i][1]-fromY)/deltaY);if(indexX>numX||indexY>numY||indexX<0||indexY<0){continue;}densitymap[indexX]=densitymap[indexX]||[];densitymap[indexX][indexY]=densitymap[indexX][indexY]+1||1;binMin=densitymap[indexX][indexY]<binMin?densitymap[indexX][indexY]:binMin;binMax=densitymap[indexX][indexY]>binMax?densitymap[indexX][indexY]:binMax;//binMax = Math.max( binMax, densitymap[ indexX ][ indexY ] );
}this.maxIndexX=numX;this.maxIndexY=numY;this.binMin=binMin;this.binMax=binMax;this.deltaX=deltaX;this.deltaY=deltaY;this.fromX=fromX;this.fromY=fromY;this.numX=numX;this.numY=numY;this.densitymap=densitymap;return densitymap;}/**
	     * Calculates the bins from the (x,y) dataset using bin weighing
	     * Will assign a set of (x,y) to the 4 neighbouring bins according to its exact position
	     * @memberof SerieDensityMap
	     * @param {Number} fromX - The first x element to consider
	     * @param {Number} deltaX - The x spacing between two bins
	     * @param {Number} numX - The number of x bins
	     * @param {Number} fromY - The first y element to consider
	     * @param {Number} deltaY - The y spacing between two bins
	     * @param {Number} numY - The number of y bins
	     * @return {Array} The generated density map
	     * @see SerieDensityMap#autoBins
	     * @see SerieDensityMap#autoColorMapBinBoundaries
	     * @see SerieDensityMap#setPxPerBin
	     */},{key:'calculateDensityWeighted',value:function calculateDensityWeighted(fromX,deltaX,numX,fromY,deltaY,numY){var densitymap=[],i,l=this.data.length,indexX,indexY;var binMin=Number.POSITIVE_INFINITY;var binMax=Number.NEGATIVE_INFINITY;var compX,compY;var exactX,exactY;var indexXLow,indexXHigh,indexYLow,indexYHigh;for(i=0;i<l;i++){exactX=(this.data[i][0]-fromX)/deltaX-0.5;exactY=(this.data[i][1]-fromY)/deltaY-0.5;indexX=Math.floor(exactX);indexY=Math.floor(exactY);indexXLow=indexX;//Math.floor( exactX );
indexYLow=indexY;//Math.floor( exactY );
indexXHigh=indexX+1;//Math.ceil( exactX );
indexYHigh=indexY+1;//Math.ceil( exactY );
compX=1-(exactX-indexX);compY=1-(exactY-indexY);//console.log( exactY, indexY );
//console.log( compY, indexYLow, indexYHigh );
if(indexX>numX||indexY>numY||indexX<0||indexY<0){continue;}densitymap[indexXLow]=densitymap[indexXLow]||[];densitymap[indexXHigh]=densitymap[indexXHigh]||[];densitymap[indexXLow][indexYLow]=densitymap[indexXLow][indexYLow]||0;densitymap[indexXHigh][indexYLow]=densitymap[indexXHigh][indexYLow]||0;densitymap[indexXLow][indexYHigh]=densitymap[indexXLow][indexYHigh]||0;densitymap[indexXHigh][indexYHigh]=densitymap[indexXHigh][indexYHigh]||0;densitymap[indexXLow][indexYLow]+=compX*compY;densitymap[indexXHigh][indexYLow]+=(1-compX)*compY;densitymap[indexXLow][indexYHigh]+=compX*(1-compY);densitymap[indexXHigh][indexYHigh]+=(1-compX)*(1-compY);// A loop would be nicer, but would it be faster ?
binMin=densitymap[indexXLow][indexYLow]<binMin?densitymap[indexXLow][indexYLow]:binMin;binMax=densitymap[indexXLow][indexYLow]>binMax?densitymap[indexXLow][indexYLow]:binMax;binMin=densitymap[indexXHigh][indexYLow]<binMin?densitymap[indexXHigh][indexYLow]:binMin;binMax=densitymap[indexXHigh][indexYLow]>binMax?densitymap[indexXHigh][indexYLow]:binMax;binMin=densitymap[indexXLow][indexYHigh]<binMin?densitymap[indexXLow][indexYHigh]:binMin;binMax=densitymap[indexXLow][indexYHigh]>binMax?densitymap[indexXLow][indexYHigh]:binMax;binMin=densitymap[indexXHigh][indexYHigh]<binMin?densitymap[indexXHigh][indexYHigh]:binMin;binMax=densitymap[indexXHigh][indexYHigh]>binMax?densitymap[indexXHigh][indexYHigh]:binMax;//binMax = Math.max( binMax, densitymap[ indexX ][ indexY ] );
}this.maxIndexX=numX;this.maxIndexY=numY;this.binMin=binMin;this.binMax=binMax;this.deltaX=deltaX;this.deltaY=deltaY;this.fromX=fromX;this.fromY=fromY;this.numX=numX;this.numY=numY;this.densitymap=densitymap;return densitymap;}/**
	     * Calculates the density map based on the minimum and maximum values found in the data array
	     * @memberof SerieDensityMap
	     * @param {Number} [ numX = 400 ] - The number of x bins
	     * @param {Number} [ numY = numX ] - The number of y bins
	     * @return {SerieDensityMap} The current instance
	     * @see SerieDensityMap#calculateDensity
	     */},{key:'autoBins',value:function autoBins(numX,numY){this.numX=numX||400;this.numY=numY||this.numX;this.calculateDensity(this.minX,(this.maxX-this.minX)/numX,numX,this.minY,(this.maxY-this.minY)/numY,numY);this.recalculateBinsOnDraw=false;return this;}/**
	     * Only calculates the density map upon redraw based on the current state of the graph. In this mode, a fixed number of pixels per bin is used to calculate the number of bins and fed into
	     * the calculation of the density map. In this method, the color map spans on the full scale of the density map values (i.e. a subrange cannot be defined, like you would do using {@link SerieDensityMap#setColorMapBinBoundaries}).
	     * @memberof SerieDensityMap
	     * @param {Number} pxPerBinX - The number of x bins per pixels. Should be an integer, but technically it doesn't have to
	     * @param {Number} pxPerBinY - The number of y bins per pixels. Should be an integer, but technically it doesn't have to
	     * @param {Boolean} weightedDensityMap - Whether jsGraph should use weighted density mapping or not
	     * @return {SerieDensityMap} The current instance
	     * @see SerieDensityMap#calculateDensity
	     */},{key:'setPxPerBin',value:function setPxPerBin(pxPerBinX,pxPerBinY,weightedDensityMap){if(pxPerBinX){this.calculationDensityMap({from:'min',to:'max',pxPerBin:pxPerBinX,weighted:weightedDensityMap});}if(pxPerBinY){this.calculationDensityMap(false,{from:'min',to:'max',pxPerBin:pxPerBinY,weighted:weightedDensityMap});}return this;}/**
	     * Sets bins in the ```x``` or ```y``` direction based on a from value, a to value and a number of bins.
	     * @memberof SerieDensityMap
	     * @param {String} mode - ```x``` or ```y```
	     * @param {Number} from - The from value of the bin for the calculation with ```calculateDensityMap```
	     * @param {Number} to - The to value
	     * @param {Number} num - The number of bins
	     * @return {SerieDensityMap} The current instance
	     * @see SerieDensityMap#calculateDensity
	     */},{key:'setBinsFromTo',value:function setBinsFromTo(mode,from,to,num){this.densityMapCalculation=this.densityMapCalculation||{};this.densityMapCalculation[mode]={from:from,to:to,numBins:num};this.calculationDensityMap();return this;}},{key:'calculationDensityMap',value:function calculationDensityMap(x,y){this.method=this.calculateDensityAdvanced;this.densityMapCalculation=this.densityMapCalculation||{};if(x){this.densityMapCalculation.x=x;}if(y){this.densityMapCalculation.y=y;}}},{key:'calculateDensityAdvanced',value:function calculateDensityAdvanced(){var results={x:{from:0,num:0,delta:0,weighing:false},y:{from:0,num:0,delta:0,weighing:false}};var widthValues={x:this.graph.drawingSpaceWidth,y:this.graph.drawingSpaceHeight};var axisGetter={x:this.getXAxis,y:this.getYAxis};var weighing=false;for(var i in this.densityMapCalculation){if(this.densityMapCalculation[i].weighted){weighing=true;results[i].weighing=true;}if(this.densityMapCalculation[i].pxPerBin){// In value
var from=this.densityMapCalculation[i].from=='min'?axisGetter[i].call(this).getCurrentMin():this.densityMapCalculation[i].from;var to=this.densityMapCalculation[i].to=='max'?axisGetter[i].call(this).getCurrentMax():this.densityMapCalculation[i].to;// In px
var dimension=Math.abs(axisGetter[i].call(this).getRelPx(to-from));results[i].num=Math.ceil(widthValues[i]/this.densityMapCalculation[i].pxPerBin);//console.log( from, from - axisGetter[ i ].call( this ).getRelVal( ( results[ i ].num * this.densityMapCalculation[ i ].pxPerBin - dimension ) / 2 ), ( results[ i ].num * this.densityMapCalculation[ i ].pxPerBin - dimension ) / 2 );
results[i].from=from-Math.abs(axisGetter[i].call(this).getRelVal((results[i].num*this.densityMapCalculation[i].pxPerBin-dimension)/2));results[i].delta=Math.abs(axisGetter[i].call(this).getRelVal(this.densityMapCalculation[i].pxPerBin));}else{results[i].num=this.densityMapCalculation[i].numBins||400;results[i].from=this.densityMapCalculation[i].from=='min'?axisGetter[i].call(this).getCurrentMin():this.densityMapCalculation[i].from;results[i].delta=this.densityMapCalculation[i].to?((this.densityMapCalculation[i].to=='max'?axisGetter[i].call(this).getCurrentMax():this.densityMapCalculation[i].to)-results[i].from)/results[i].num:this.densityMapCalculate[i].delta;}//      console.log( axisGetter[ i ].call( this ).getCurrentMin(), axisGetter[ i ].call( this ).getCurrentMax(), )
}//console.log( this.getYAxis().getCurrentMin(), this.getYAxis().getCurrentMax(), this.graph.drawingSpaceHeight );
//console.log( this.densityMapCalculation );
(weighing?this.calculateDensityWeighted:this.calculateDensity).call(this,results.x.from,results.x.delta,results.x.num,results.y.from,results.y.delta,results.y.num);}/**
	     * Selects a subrange of bins for the color mapping. There is no need to recalculate the color map after calling this method
	     * @memberof SerieDensityMap
	     * @param {Number} binMin - The minimum bin value
	     * @param {Number} binMax - The maximum bin value
	     * @return {SerieDensityMap} The current instance
	     * @example // In this case, all bins with values below binMin * 2 (the middle scale) will be rendered with the first color of the color map
	     * serie.setColorMapBinBoundaries( serie.binMin * 2, serie.binMax );
	     */},{key:'setColorMapBinBoundaries',value:function setColorMapBinBoundaries(min,max){this.colorMapMin=min;this.colorMapMax=max;return this;}/**
	     * Calls {@link SerieDensityMap#setColorMapBinBoundaries} using the minimum and maximum bin values calculated by {@link SerieDensityMap#calculateDensity}. This function must be called, since colorMinMap and colorMaxMap are not set automatically when the density map is calculated.
	     * @memberof SerieDensityMap
	     * @param {Number} binMin - The minimum bin value
	     * @param {Number} binMax - The maximum bin value
	     * @return {SerieDensityMap} The current instance
	     */},{key:'autoColorMapBinBoundaries',value:function autoColorMapBinBoundaries(){this.colorMapMin=this.binMin;this.colorMapMax=this.binMax;return this;}/**
	     * Allows the use of a callback to determine the color map min and max value just before the density map is redrawn. This is very useful when the density map is recalculate before redraw, such as in the case where bins per pixels are used
	     * @memberof SerieDensityMap
	     * @param {(String|Function)} callback - The callback function to call. Should return an array with two elements ```[ colorMapMin, colorMapMax ]```. This parameter can also take the value ```auto```, in which case ```autoColorMapBinBoundaries``` will be called before redraw
	     * @return {SerieDensityMap} The current instance
	     */},{key:'onRedrawColorMapBinBoundaries',value:function onRedrawColorMapBinBoundaries(callback){this.callbackColorMapMinMax=callback;return this;}/**
	     * Generates a color map based on a serie of HSL(A) values.
	     * @summary Colors can scale linearly, logarithmically (enhances short range differences) or exponentially (enhances long range differences).
	     * One word of advice though. SVG being not canvas, jsGraph has to create a path for each color value of the color map. In other words, if you're asking for 16-bit coloring (65536 values), 65536 SVG paths will be created and your browser will start to suffer from it.
	     * As of now, all the colors in colorStops will be places at equal distances from each other between <code>colorMapMin</code> and <code>colorMapMax</code> set by {@link autoColorMapBinBoundaries} or {@link setColorMapBinBoundaries}
	     * @memberof SerieDensityMap
	     * @param {Array<Object>} colorStops - An array of objects, each having the following format: <code>{ h: [ 0-360], s: 0-1, l: 0-1, a: 0-1}</code>
	     * @param {Number} numColors - The number of colors to compute.
	     * @param {String} [ method = "linear" ] - The method to use to calculate the density map: <code>linear</code>, <code>exp</code>, or <code>log</code>
	     * @return {SerieDensityMap} The current instance
	     */},{key:'colorMapHSL',value:function colorMapHSL(colorStops,numColors,method){method=method||"linear";var methods={"exp":function exp(value){return(Math.exp(value/numColors*1)-Math.exp(0))/(Math.exp(1)-Math.exp(0));},"log":function log(value){return(Math.log(value+1)-Math.log(1))/(Math.log(numColors+1)-Math.log(1));},"linear":function linear(value){return(value-0)/(numColors-0);}};var k=0,colorMap=[],opacities=[];var color={h:null,s:null,l:null,a:null};var ratio,first;var slices=colorStops.length-1;for(var i=0;i<=numColors;i++){ratio=methods[method](i);first=Math.floor(ratio*slices);if(first==colorStops.length-1){// Handle 1
first=slices-1;}ratio=(ratio-first/slices)/(1/slices);for(var j in color){color[j]=(colorStops[first+1][j]-colorStops[first][j])*ratio+colorStops[first][j];}colorMap[k]="hsl("+color.h+", "+Math.round(color.s*100)+"%, "+Math.round(color.l*100)+"%)";//this.HSVtoRGB( color.h, color.s, color.v );
opacities[k]=color.a;k++;}this.opacities=opacities;this.colorMap=colorMap;this.colorMapNum=numColors;return this;}/**
	     * Calls {@link SerieDensityMap#colorMapHSV} using 100 colors.
	     * @memberof SerieDensityMap
	     * @param {Array<Object>} colorStops - An array of objects, each having the following format: <code>{ h: [ 0-360], s: 0-1, l: 0-1, a: 0-1}</code>
	     * @param {String} [ method = "linear" ] - The method to use to calculate the density map: <code>linear</code>, <code>exp</code> or <code>log</code>
	     * @return {SerieDensityMap} The current instance
	     */},{key:'autoColorMapHSL',value:function autoColorMapHSL(colorStops,method){this.colorMapHSV(colorStops,100,method||"linear");return this;}/*  byteToHex( b ) {
	          return hexChar[ ( b >> 4 ) & 0x0f ] + hexChar[ b & 0x0f ];
	        }
	        *//*
	      HSVtoRGB( h, s, v ) {
	        var r, g, b, i, f, p, q, t;
	        if ( arguments.length === 1 ) {
	          s = h.s, v = h.v, h = h.h;
	        }
	        i = Math.floor( h * 6 );
	        f = h * 6 - i;
	        p = v * ( 1 - s );
	        q = v * ( 1 - f * s );
	        t = v * ( 1 - ( 1 - f ) * s );
	        switch ( i % 6 ) {
	          case 0:
	            r = v, g = t, b = p;
	            break;
	          case 1:
	            r = q, g = v, b = p;
	            break;
	          case 2:
	            r = p, g = v, b = t;
	            break;
	          case 3:
	            r = p, g = q, b = v;
	            break;
	          case 4:
	            r = t, g = p, b = v;
	            break;
	          case 5:
	            r = v, g = p, b = q;
	            break;
	        }
	        return "#" + this.byteToHex( Math.floor( r * 255 ) ) + this.byteToHex( Math.floor( g * 255 ) ) + this.byteToHex( Math.floor( b * 255 ) );
	      }
	    *//**
	     * Returns the color index (```[ 0 - 1 ]```) for a certain value, based on colorMapMin and colorMapMax.
	     * @memberof SerieDensityMap
	     * @param {Number} binValue - The value of the bin
	     * @return {Number} The color index
	     */},{key:'getColorIndex',value:function getColorIndex(binValue){return Math.max(0,Math.min(this.colorMapNum,Math.floor((binValue-this.colorMapMin)/(this.colorMapMax-this.colorMapMin)*this.colorMapNum)));}/**
	     * Draws the serie
	     * @memberof SerieDensityMap
	     * @private
	     */},{key:'draw',value:function draw(){var colorIndex;if(this.method){this.method();}if(!this.callbackColorMapMinMax||this.colorMapMin==undefined||this.colorMapMax==undefined||this.callbackColorMapMinMax=='auto'){this.autoColorMapBinBoundaries();}else{var val=this.callbackColorMapMinMax(this.binMin,this.binMax);this.setColorMapBinBoundaries(val[0],val[1]);}var deltaXPx=this.getXAxis().getRelPx(this.deltaX),deltaYPx=this.getYAxis().getRelPx(this.deltaY);for(var i=0;i<this.paths.length;i++){this.paths[i]="";}for(var i=0;i<this.maxIndexX;i++){for(var j=0;j<this.maxIndexY;j++){if(this.densitymap[i]==undefined||this.densitymap[i][j]==undefined){continue;}colorIndex=this.getColorIndex(this.densitymap[i][j]);if(!this.paths[colorIndex]){this.paths[colorIndex]="";}this.paths[colorIndex]+=" M "+this.getXAxis().getPx(i*this.deltaX+this.fromX)+" "+this.getYAxis().getPx(j*this.deltaY+this.fromY)+" h "+deltaXPx+" v "+deltaYPx+" h -"+deltaXPx+" z";;}}/*
	          this.maxIndexX = indexX;
	          this.maxIndexY = indexY;*/this.drawRects();}/**
	     * Draws the rectangles
	     * @memberof SerieDensityMap
	     * @private
	     */},{key:'drawRects',value:function drawRects(){for(var i=0;i<this.paths.length;i++){if(!this.rects[i]){this.rects[i]=document.createElementNS(this.graph.ns,"path");this.rects[i].setAttribute('shape-rendering','crispEdges');}if(this.paths[i]!==undefined){this.rects[i].setAttribute('d',this.paths[i]);this.rects[i].setAttribute('fill',this.colorMap[i]);this.rects[i].setAttribute('fill-opacity',this.opacities[i]);}this.groupMain.appendChild(this.rects[i]);}}/**
	     * Sets the options of the serie
	     * @see SerieDensityMapDefaultOptions
	     * @param {Object} options - A object containing the options to set
	     * @return {SerieDensityMap} The current serie
	     * @memberof SerieDensityMap
	     */},{key:'setOptions',value:function setOptions(options){this.options=util.extend(true,{},defaults,options||{});// Unselected style
return this;}}]);return SerieDensityMap;}(_graph2.default);exports.default=SerieDensityMap;});/***/},/* 27 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(14),__webpack_require__(3)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.serie.line'),require('../graph.util'));}else{var mod={exports:{}};factory(mod.exports,global.graphSerie,global.graph);global.graphSerieContour=mod.exports;}})(this,function(exports,_graphSerie,_graph){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graphSerie2=_interopRequireDefault(_graphSerie);var util=_interopRequireWildcard(_graph);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Constructor for the contour serie. Do not use this constructor directly, but use the {@link Graph#newSerie} method
	   * @private
	   * @extends Serie
	   * @example graph.newSerie( name, options, "contour" );
	   * @see Graph#newSerie
	   */var SerieContour=function(_graphSerie2$default5){_inherits(SerieContour,_graphSerie2$default5);function SerieContour(){_classCallCheck(this,SerieContour);var _this36=_possibleConstructorReturn(this,(SerieContour.__proto__||Object.getPrototypeOf(SerieContour)).apply(this,arguments));_this36.negativeDelta=0;_this36.positiveDelta=0;_this36.negativeThreshold=0;_this36.positiveThreshold=0;return _this36;}/**
	     * Sets the contour lines
	     * @memberof SerieContour.prototype
	     * @param {Object} data - The object data
	     * @param {Number} data.minX - The minimum x value
	     * @param {Number} data.maxX - The maximum x value
	     * @param {Number} data.minY - The minimum y value
	     * @param {Number} data.maxY - The maximum y value
	     * @param {Object[]} data.segments - The segments making up the contour lines
	     * @param {Number[]} data.segments.lines - An array of alternating (x1,y1,x2,y2) quadruplet
	     * @param {Number} data.segments.zValue - The corresponding z-value of this array
	     * @return {Serie} The current serie
	     */_createClass(SerieContour,[{key:'setData',value:function setData(data,arg,type){var z=0;var x,dx,arg=arg||"2D",type=type||'float',i,l=data.length,j,k,arr,datas=[];if(!(data instanceof Array)){if((typeof data==='undefined'?'undefined':_typeof(data))=='object'){// Def v2
this.minX=data.minX;this.minY=data.minY;this.maxX=data.maxX;this.maxY=data.maxY;data=data.segments;l=data.length;}}for(i=0;i<l;i++){k=data[i].lines.length;arr=this._addData(type,k);for(j=0;j<k;j+=2){arr[j]=data[i].lines[j];this._checkX(arr[j]);arr[j+1]=data[i].lines[j+1];this._checkY(arr[j+1]);}datas.push({lines:arr,zValue:data[i].zValue});}this.data=datas;this.graph.updateDataMinMaxAxes();this.dataHasChanged(true);return this;}/**
	     * Draws the serie if the data has changed
	     * @memberof SerieContour.prototype
	     * @param {Boolean} force - Forces redraw even if the data hasn't changed
	     * @return {Serie} The current serie
	     */},{key:'draw',value:function draw(force){if(force||this.hasDataChanged()){this.currentLine=0;var x,y,xpx,ypx,xpx2,ypx2,i=0,l=this.data.length,j=0,k,m,currentLine,domLine,arr;this.minZ=Infinity;this.maxZ=-Infinity;var next=this.groupLines.nextSibling;this.groupMain.removeChild(this.groupLines);this.zValues={};var incrXFlip=0;var incrYFlip=1;if(this.getFlip()){incrXFlip=0;incrYFlip=1;}var minY=this.getYAxis().getCurrentMin();var minX=this.getXAxis().getCurrentMin();var maxX=this.getXAxis().getCurrentMax();var maxY=this.getYAxis().getCurrentMax();this.counter=0;this.currentLineId=0;for(;i<l;i++){this.currentLine="";j=0;k=0;for(arr=this.data[i].lines,m=arr.length;j<m;j+=4){var lastxpx,lastypx;if(arr[j+incrXFlip]<minX&&arr[j+2+incrXFlip]<minX||arr[j+incrYFlip]<minY&&arr[j+2+incrYFlip]<minY||arr[j+incrYFlip]>maxY&&arr[j+2+incrYFlip]>maxY||arr[j+incrXFlip]>maxX&&arr[j+2+incrXFlip]>maxX){continue;}xpx2=this.getX(arr[j+incrXFlip]);ypx2=this.getY(arr[j+incrYFlip]);xpx=this.getX(arr[j+2+incrXFlip]);ypx=this.getY(arr[j+2+incrYFlip]);if(xpx==xpx2&&ypx==ypx2){continue;}/*	if( j > 0 && ( lastxpx !== undefined && lastypx !== undefined && Math.abs( xpx2 - lastxpx ) <= 30 && Math.abs( ypx2 - lastypx ) <= 30 ) ) {
	            currentLine += "L";
	            } else {
	            currentLine += "M";
	            }
	            */this.currentLine+="M ";this.currentLine+=xpx2;this.currentLine+=" ";this.currentLine+=ypx2;this.currentLine+="L ";this.currentLine+=xpx;this.currentLine+=" ";this.currentLine+=ypx;this.counter++;lastxpx=xpx;lastypx=ypx;k++;}this.currentLine+=" z";domLine=this._createLine();domLine.setAttribute('data-zvalue',this.data[i].zValue);this.zValues[this.data[i].zValue]={dom:domLine};this.minZ=Math.min(this.minZ,this.data[i].zValue);this.maxZ=Math.max(this.maxZ,this.data[i].zValue);}i++;for(i=this.currentLine+1;i<this.lines.length;i++){this.groupLines.removeChild(this.lines[i]);this.lines.splice(i,1);}i=0;for(;i<l;i++){this.setColorTo(this.lines[i],this.data[i].zValue,this.minZ,this.maxZ);}this.onMouseWheel(0,{shiftKey:false});this.groupMain.insertBefore(this.groupLines,next);}else if(this.hasStyleChanged(this.selectionType)){for(;i<l;i++){this.setColorTo(this.lines[i],this.data[i].zValue,this.minZ,this.maxZ);}}}},{key:'onMouseWheel',value:function onMouseWheel(delta,e,fixed,positive){delta/=250;if(fixed!==undefined){if(!positive){this.negativeThreshold=-fixed*this.minZ;this.negativeDelta=-Math.pow(Math.abs(this.negativeThreshold/-this.minZ),1/3);}if(positive){this.positiveThreshold=fixed*this.maxZ;this.positiveDelta=Math.pow(this.positiveThreshold/this.maxZ,1/3);}}else{if(!e.shiftKey||!this.options.hasNegative){this.positiveDelta=Math.min(1,Math.max(0,this.positiveDelta+Math.min(0.1,Math.max(-0.1,delta))));this.positiveThreshold=this.maxZ*Math.pow(this.positiveDelta,3);}else{this.negativeDelta=Math.min(0,Math.max(-1,this.negativeDelta+Math.min(0.1,Math.max(-0.1,delta))));this.negativeThreshold=-this.minZ*Math.pow(this.negativeDelta,3);}}if(isNaN(this.positiveDelta)){this.positiveDelta=0;}if(isNaN(this.negativeDelta)){this.negativeDelta=0;}for(var i in this.zValues){this.zValues[i].dom.setAttribute('display',i>=0&&i>=this.positiveThreshold||i<=0&&i<=this.negativeThreshold?'block':'none');}if(this._shapeZoom){if(!this.options.hasNegative){this._shapeZoom.hideHandleNeg();}else{this._shapeZoom.setHandleNeg(-Math.pow(this.negativeDelta,3),this.minZ);this._shapeZoom.showHandleNeg();}this._shapeZoom.setHandlePos(Math.pow(this.positiveDelta,3),this.maxZ);}}/**
	     * Sets rainbow colors based on hsl format
	     * @memberof SerieContour.prototype
	     * @param {Object} colors
	     * @param {Object} colors.fromPositive
	     * @param {Number} colors.fromPositive.h
	     * @param {Number} colors.fromPositive.s
	     * @param {Number} colors.fromPositive.l
	      * @param {Object} colors.toPositive
	     * @param {Number} colors.toPositive.h
	     * @param {Number} colors.toPositive.s
	     * @param {Number} colors.toPositive.l
	       * @param {Object} colors.fromNegative
	     * @param {Number} colors.fromNegative.h
	     * @param {Number} colors.fromNegative.s
	     * @param {Number} colors.fromNegative.l
	       * @param {Object} colors.toNegative
	     * @param {Number} colors.toNegative.h
	     * @param {Number} colors.toNegative.s
	     * @param {Number} colors.toNegative.l
	     * @return {Serie} The current serie
	     */},{key:'setDynamicColor',value:function setDynamicColor(colors){this.lineColors=colors;this.styleHasChanged();}},{key:'setNegative',value:function setNegative(bln){this.options.hasNegative=bln;if(bln){this.negativeThreshold=0;}}},{key:'setColorTo',value:function setColorTo(line,zValue,min,max){if(!this.lineColors){return;}var hsl={h:0,s:0,l:0};for(var i in hsl){if(zValue>0){hsl[i]=this.lineColors.fromPositive[i]+(this.lineColors.toPositive[i]-this.lineColors.fromPositive[i])*(zValue/max);}else{hsl[i]=this.lineColors.fromNegative[i]+(this.lineColors.toNegative[i]-this.lineColors.fromNegative[i])*(zValue/min);}}hsl.h/=360;var rgb=util.hslToRgb(hsl.h,hsl.s,hsl.l);line.setAttribute('stroke','rgb('+rgb.join()+')');}},{key:'getSymbolForLegend',value:function getSymbolForLegend(){if(!this.lineForLegend){var line=document.createElementNS(this.graph.ns,'ellipse');line.setAttribute('cx',7);line.setAttribute('cy',0);line.setAttribute('rx',8);line.setAttribute('ry',3);line.setAttribute('cursor','pointer');this.lineForLegend=line;}this.applyLineStyle(this.lineForLegend,this.maxZ);return this.lineForLegend;}},{key:'applyLineStyle',value:function applyLineStyle(line,overwriteValue){line.setAttribute('stroke',this.getLineColor());line.setAttribute('stroke-width',this.getLineWidth()+(this.isSelected()?2:0));if(this.getLineDashArray()){line.setAttribute('stroke-dasharray',this.getLineDashArray());}line.setAttribute('fill','none');this.setColorTo(line,overwriteValue!==undefined?overwriteValue:line.getAttribute('data-zvalue'),this.minZ,this.maxZ);//  line.setAttribute('shape-rendering', 'optimizeSpeed');
this.hasStyleChanged(false);}},{key:'setShapeZoom',value:function setShapeZoom(shape){this._shapeZoom=shape;}}]);return SerieContour;}(_graphSerie2.default);exports.default=SerieContour;});/***/},/* 28 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(2),__webpack_require__(3),__webpack_require__(4)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('../graph.position'),require('../graph.util'),require('../dependencies/eventEmitter/EventEmitter'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graph,global.EventEmitter);global.graphShape=mod.exports;}})(this,function(exports,_graph,_graph3,_EventEmitter){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);var util=_interopRequireWildcard(_graph3);var _EventEmitter2=_interopRequireDefault(_EventEmitter);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Shape class that should be extended
	   * @class Shape
	   * @static
	   */var Shape=function(_EventEmitter2$defaul4){_inherits(Shape,_EventEmitter2$defaul4);function Shape(){_classCallCheck(this,Shape);return _possibleConstructorReturn(this,(Shape.__proto__||Object.getPrototypeOf(Shape)).call(this));}/**
	     * Initializes the shape
	     * @param {Graph} graph - The graph containing the shape
	     * @param {Object} properties - The properties object (not copied)
	     * @return {Shape} The current shape
	     */_createClass(Shape,[{key:'init',value:function init(graph,properties){var self=this;this.graph=graph;this.properties=properties||{};this.handles=[];this.options=this.options||{};this.group=document.createElementNS(this.graph.ns,'g');this._selected=false;this.createDom();if(this._dom){this._dom.jsGraphIsShape=this;}this.group.jsGraphIsShape=this;this.classes=[];this.transforms=[];if(this._data.masker){var maskPath=document.createElementNS(this.graph.ns,'mask');this.maskingId=Math.random();maskPath.setAttribute('id',this.maskingId);this.maskDomWrapper=document.createElementNS(this.graph.ns,'rect');this.maskDomWrapper.setAttribute('fill','white');maskPath.appendChild(this.maskDomWrapper);var maskDom=this._dom.cloneNode();maskPath.appendChild(maskDom);this.maskDom=maskDom;this.graph.defs.appendChild(maskPath);}if(this.group){if(this._dom){this.group.appendChild(this._dom);}this.group.addEventListener('mouseover',function(e){self.handleMouseOver(e);});this.group.addEventListener('mouseout',function(e){self.handleMouseOut(e);});this.group.addEventListener('mousedown',function(e){self.graph.focus();self.handleMouseDown(e);});this.group.addEventListener('click',function(e){self.handleClick(e);});this.group.addEventListener('dblclick',function(e){//e.preventDefault();
// e.stopPropagation();
self.handleDblClick(e);});}//			this.group.appendChild(this.rectEvent);
this.initImpl();this.graph.emit("shapeNew",this);return this;}/**
	     * Implentation of the init method. To be extended if necessary on extended Shape classes
	     */},{key:'initImpl',value:function initImpl(){}/**
	     * @return {Object} The shape's underlying data object
	     */},{key:'getData',value:function getData(){return this._data;}/**
	     * @returns {String} The type of the shape
	     */},{key:'getType',value:function getType(){return this.type;}/**
	     * Removes the shape from the DOM and unlinks it from the graph
	     */},{key:'kill',value:function kill(keepDom){this.graph.removeShapeFromDom(this);if(!keepDom){this.graph._removeShape(this);}this.graph.stopElementMoving(this);this.graph.emit("shapeRemoved",this);this._inDom=false;}/**
	     * Hides the shape
	     * @return {Shape} The current shape
	     */},{key:'hide',value:function hide(){if(this.hidden){return;}this.hidden=true;this.group.style.display='none';return this;}/**
	     * Shows the shape
	     * @return {Shape} The current shape
	     */},{key:'show',value:function show(){if(!this.hidden){return;}this.hidden=false;this.group.style.display='block';this.redraw();return this;}/**
	     * Adds a class to the shape DOM
	     * @param {String} className - The class to add
	     * @return {Shape} The current shape
	     */},{key:'addClass',value:function addClass(className){this.classes=this.classes||[];if(this.classes.indexOf(className)==-1){this.classes.push(className);}this.makeClasses();return this;}/**
	     * Removes a class from the shape DOM
	     * @param {String} className - The class to remove
	     * @return {Shape} The current shape
	     */},{key:'removeClass',value:function removeClass(className){this.classes.splice(this.classes.indexOf(className),1);this.makeClasses();return this;}/**
	     * Builds the classes
	     * @private
	     * @return {Shape} The current shape
	     */},{key:'makeClasses',value:function makeClasses(){if(this._dom){this._dom.setAttribute('class',this.classes.join(" "));}return this;}/**
	     * Triggers a ```shapeChanged``` event on the graph
	     * @return {Shape} The current shape
	     */},{key:'changed',value:function changed(event){if(event){this.graph.emit(event,this);}this.graph.emit('shapeChanged',this);return this;}/**
	     * Creates an event receptacle with the coordinates of the shape bounding box
	     * @return {Shape} The current shape
	     */},{key:'setEventReceptacle',value:function setEventReceptacle(){if(!this.rectEvent){this.rectEvent=document.createElementNS(this.graph.ns,'rect');this.rectEvent.setAttribute('pointer-events','fill');this.rectEvent.setAttribute('fill','transparent');this.group.appendChild(this.rectEvent);this.rectEvent.jsGraphIsShape=this;}var box=this.group.getBBox();this.rectEvent.setAttribute('x',box.x);this.rectEvent.setAttribute('y',box.y-10);this.rectEvent.setAttribute('width',box.width);this.rectEvent.setAttribute('height',box.height+20);}/**
	     * Assigns a serie to the shape
	     * @param {Serie} The serie that owns the shape
	     * @return {Shape} The current shape
	     */},{key:'setSerie',value:function setSerie(serie){this.serie=serie;this.xAxis=serie.getXAxis();this.yAxis=serie.getYAxis();return this;}/**
	     * @return {Serie} The serie associated to the shape
	     */},{key:'getSerie',value:function getSerie(){return this.serie;}/**
	     * Assigns the shape to the default x and y axes of the graph, only if they don't exist yet
	     * @return {Shape} The current shape
	     * @see Graph#getXAxis
	     * @see Graph#getYAxis
	     */},{key:'autoAxes',value:function autoAxes(){if(!this.xAxis){this.xAxis=this.graph.getXAxis();}if(!this.yAxis){this.yAxis=this.graph.getYAxis();}return this;}/**
	     * Assigns the shape to an x axis
	     * @param {XAxis} The X axis related to the shape
	     * @return {Shape} The current shape
	     */},{key:'setXAxis',value:function setXAxis(axis){this.xAxis=axis;return this;}/**
	     * Assigns the shape to an y axis
	     * @param {YAxis} The Y axis related to the shape
	     * @return {Shape} The current shape
	     */},{key:'setYAxis',value:function setYAxis(axis){this.yAxis=axis;}/**
	     * Returns the x axis associated to the shape. If non-existent, assigns it automatically
	     * @return {XAxis} The x axis associated to the shape.
	     */},{key:'getXAxis',value:function getXAxis(){if(!this.xAxis){this.autoAxes();}return this.xAxis;}/**
	     * Returns the y axis associated to the shape. If non-existent, assigns it automatically
	     * @return {YAxis} The y axis associated to the shape.
	     */},{key:'getYAxis',value:function getYAxis(){if(!this.yAxis){this.autoAxes();}return this.yAxis;}/**
	     * Sets the layer of the shape
	     * @param {Number} layer - The layer number (1 being the lowest)
	     * @return {Shape} The current shape
	     * @see Shape#getLayer
	     */},{key:'setLayer',value:function setLayer(layer){this.setProp('layer',layer);return this;}/**
	     * Returns the layer on which the shape is placed
	     * @return {Number} The layer number (1 being the lowest layer)
	     */},{key:'getLayer',value:function getLayer(){var layer=this.getProp('layer');if(layer!==undefined){return layer;}return 1;}/**
	     * Initial drawing of the shape. Adds it to the DOM and creates the labels. If the shape was already in the DOM, the method simply recreates the labels and reapplies the shape style, unless ```force``` is set to ```true```
	     * @param {Boolean} force - Forces adding the shape to the DOM (useful if the shape has changed layer)
	     * @return {Shape} The current shape
	     */},{key:'draw',value:function draw(force){if(!this._inDom||force){this.appendToDom();this._inDom=true;}this.makeLabels();this.redraw();this.applyStyle();return this;}/**
	     * Redraws the shape. Repositions it, applies the style and updates the labels
	     * @return {Shape} The current shape
	     */},{key:'redraw',value:function redraw(){if(this.hidden){return this;}this.position=this.applyPosition();this.redrawImpl();if(!this.position){return this;}this.updateLabels();this._applyTransforms();return this;}/**
	     * Implementation of the redraw method. Extended Shape classes should override this method
	     */},{key:'redrawImpl',value:function redrawImpl(){}/**
	     * Sets all dumpable properties of the shape
	     * @param {Object} properties - The properties object
	     * @return {Shape} The current shape
	     */},{key:'setProperties',value:function setProperties(properties){this.properties=properties;if(!Array.isArray(this.properties.position)){this.properties.position=[this.properties.position];}var self=this;for(var i=0,l=this.properties.position.length;i<l;i++){var pos=_graph2.default.check(this.properties.position[i],function(relativeTo){return self.getRelativePosition(relativeTo);});this.properties.position[i]=pos;}this.emit("propertiesChanged");return this;}},{key:'getRelativePosition',value:function getRelativePosition(relativePosition){var result;if((result=/position([0-9]*)/.exec(relativePosition))!==null){return this.getPosition(result[1]);}else if((result=/labelPosition([0-9]*)/.exec(relativePosition))!==null){return this.getLabelPosition(result[1]);}}/**
	     * Gets all dumpable properties of the shape
	     * @return {Object} properties - The properties object
	     */},{key:'getProperties',value:function getProperties(properties){return this.properties;}/**
	     * Sets a property to the shape that is remembered and can be later reexported (or maybe reimported)
	     * @param {String} prop - The property to save
	     * @param val - The value to save
	     * @param [ index = 0 ] - The index of the property array to save the property
	     * @return {Shape} The current shape
	     */},{key:'setProp',value:function setProp(prop,val,index){this.properties=this.properties||{};this.properties[prop]=this.properties[prop]||[];this.properties[prop][index||0]=val;this.emit("propertyChanged",prop);return this;}/**
	     * Returns a property of the shape
	     * @param {String} prop - The property to retrieve
	     * @param [ index = 0 ] - The index of the property array
	     */},{key:'getProp',value:function getProp(prop,index){return(this.properties[prop]||[])[index||0];}/**
	     * Returns all the properties of the shape
	     * @param {String} prop - The property to retrieve
	     */},{key:'getProps',value:function getProps(prop,index){return this.properties[prop]||[];}/**
	     * Adds a property to the property array
	     * @param {String} prop - The property to add
	     * @param val - The value to save
	     */},{key:'addProp',value:function addProp(prop,value){this.properties[prop]=this.properties[prop]||[];this.properties[prop].push(value);}/**
	     * Resets the property array
	     * @param {String} prop - The property to reset
	     */},{key:'resetProp',value:function resetProp(prop){this.properties[prop]=[];}/**
	     * Sets a DOM property to the shape
	     */},{key:'setDom',value:function setDom(prop,val,noForce){if(this._dom){if(!noForce||!util.hasSavedAttribute(this._dom,prop)){this._dom.setAttribute(prop,val);}}}/**
	     * Sets a DOM property to the shape group
	     */},{key:'setDomGroup',value:function setDomGroup(prop,val){if(this.group){this.group.setAttribute(prop,val);}}/**
	     * Saves the stroke color
	     * @return {Shape} The current shape
	     */},{key:'setStrokeColor',value:function setStrokeColor(color){this.setProp('strokeColor',color);this.overwriteSavedProp('stroke',color);this.applySelectedStyle();return this;}/**
	     * Returns the stroke color
	     * @return {String} The stroke color of the shape
	     */},{key:'getStrokeColor',value:function getStrokeColor(){return this.getProp('strokeColor');}/**
	     * Saves the fill color
	     * @param {String} color - The filling color
	     * @return {Shape} The current shape
	     */},{key:'setFillColor',value:function setFillColor(color){this.setProp('fillColor',color);this.overwriteSavedProp('fill',color);this.applySelectedStyle();return this;}/**
	     * Returns the fill color
	     * @return {String} The fill color of the shape
	     */},{key:'getFillColor',value:function getFillColor(){return this.getProp('fillColor');}/**
	     * Saves the opacity of the filling color of the shape
	     * @param {Number} opacity - The filling opacity (0 to 1)
	     * @return {Shape} The current shape
	     */},{key:'setFillOpacity',value:function setFillOpacity(opacity){this.setProp('fillOpacity',opacity);this.overwriteSavedProp('fill-opacity',opacity);this.applySelectedStyle();return this;}/**
	     * Saves the stroke width
	     * @param {String} width - The stroke width
	     * @return {Shape} The current shape
	     */},{key:'setStrokeWidth',value:function setStrokeWidth(width){this.setProp('strokeWidth',width);this.overwriteSavedProp('stroke-width',width);this.applySelectedStyle();return this;}/**
	     * Returns the stroke width
	     * @return {String} The stroke width of the shape
	     */},{key:'getStrokeWidth',value:function getStrokeWidth(){return this.getProp('strokeWidth');}/**
	     * Saves the stroke dash array
	     * @param {String} dasharray - The dasharray string
	     * @example shape.setStrokeDasharray("5,5,1,4");
	     * shape.applyStyle();
	     * @return {Shape} The current shape
	     */},{key:'setStrokeDasharray',value:function setStrokeDasharray(dasharray){this.setProp('strokeDasharray',dasharray);this.overwriteSavedProp('stroke-dasharray',dasharray);this.applySelectedStyle();return this;}/**
	     * Sets any extra attributes to the DOM element of the shape
	     * @param {Object<String,String>} attributes - An extra attribute array to apply to the shape DOM
	     * @example shape.setAttributes( { "data-bindable" : true } );
	     * shape.applyStyle();
	     * @return {Shape} The current shape
	     */},{key:'setAttributes',value:function setAttributes(attributes){this.setProp("attributes",attributes);return this;}},{key:'overwriteSavedProp',value:function overwriteSavedProp(prop,newValue){util.overwriteDomAttribute(this._dom,prop,newValue);}/**
	     * Adds an extra attribute to the shape
	     * @param {String} attributeName - The name of the attribute
	     * @param {String} attributeValue - The value of the attribute
	     * @return {Shape} The current shape
	     */},{key:'addAttribute',value:function addAttribute(attributeName,attributeValue){var added={};added[attributeName]=attributeValue;this.addProp("attributes",added);return this;}/**
	     * Adds a transform property to the shape.
	     * @param {String} type - The transform type ("rotate", "transform" or "scale")
	     * @param {String} args - The arguments following the transform
	     * @return {Shape} The current shape
	     */},{key:'addTransform',value:function addTransform(type,args){this.addProp('transforms',{type:type,arguments:Array.isArray(args)?args:[args]});return this;}/**
	     * Resets the transforms
	     * @see Shape#addTransform
	     * @return {Shape} The current shape
	     */},{key:'resetTransforms',value:function resetTransforms(){this.resetProp('transforms');return this;}/**
	     * Sets the text of the label
	     * @param {String} text - The text of the label
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */},{key:'setLabelText',value:function setLabelText(text,index){this.setProp('labelText',text,index||0);return this;}/**
	     * Returns the text of the label
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {String} The text of the label
	     */},{key:'getLabelText',value:function getLabelText(text,index){return this.getProp('labelText',index||0);}/**
	     * Displays a hidden label
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */},{key:'displayLabel',value:function displayLabel(index){this.setProp('labelVisible',true,index||0);return this;}/**
	     * Hides a displayed label
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */},{key:'hideLabel',value:function hideLabel(index){this.setProp('labelVisible',false,index||0);return this;}/**
	     * Sets the color of the label
	     * @param {String} color - The color of the label
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */},{key:'setLabelColor',value:function setLabelColor(color,index){this.setProp('labelColor',color,index||0);return this;}/**
	     * Sets the font size of the label
	     * @param {String} size - The font size (in px) of the label
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */},{key:'setLabelFontSize',value:function setLabelFontSize(size,index){this.setProp('labelFontSize',size,index||0);return this;}/**
	     * Returns the position of the label
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Position} The current position of the label
	     */},{key:'getLabelPosition',value:function getLabelPosition(index){return this.getProp('labelPosition',index||0);}/**
	     * Sets the position of the label
	     * @param {Position} position - The position of the label
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */},{key:'setLabelPosition',value:function setLabelPosition(position,index){var self;var pos=_graph2.default.check(position,function(relativeTo){return self.getRelativePosition(relativeTo);});this.setProp('labelPosition',pos,index||0);return this;}/**
	     * Sets the angle of the label
	     * @param {Number} angle - The angle of the label in degrees (0 to 360°)
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */},{key:'setLabelAngle',value:function setLabelAngle(angle,index){this.setProp('labelAngle',angle,index||0);return this;}/**
	     * Sets the baseline of the label, which affects its y position with respect to the text direction. For text along the x direction, different baselines will reference differently the text to the ```y``` coordinate.
	     * @param {String} baseline - The baseline of the label. Most common baselines are ```no-change```, ```central```, ```middle``` and ```hanging```. You will find an explanation of those significations on the [corresponding MDN article]{@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline}
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */},{key:'setLabelBaseline',value:function setLabelBaseline(baseline,index){this.setProp('labelBaseline',baseline,index||0);return this;}/**
	     * Sets the anchoring of the label.
	     * @param {String} anchor - The anchor of the label. Values can be ```start```, ```middle```, ```end``` or ```inherit```.
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */},{key:'setLabelAnchor',value:function setLabelAnchor(anchor,index){this.setProp('labelAnchor',anchor,index||0);return this;}/**
	     * Sets the anchoring of the label.
	     * @param {String} size - The font size in px
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */},{key:'setLabelSize',value:function setLabelSize(size,index){this.setProp('labelSize',size,index||0);return this;}/**
	     * Sets the color of the stroke of the label.
	     * @param {String} color - The color of the stroke
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */},{key:'setLabelStrokeColor',value:function setLabelStrokeColor(color,index){this.setProp('labelStrokeColor',color,index||0);return this;}/**
	     * Sets the width of the stroke of the label.
	     * @param {Number} width - The width of the stroke
	     * @param {Number} [ index = 0 ] - The index of the label
	     * @return {Shape} The current shape
	     */},{key:'setLabelStrokeWidth',value:function setLabelStrokeWidth(width,index){this.setProp('labelStrokeWidth',width,index||0);return this;}/**
	     * Applies the generic style to the shape. This is a method that applies to most shapes, hence should not be overridden. However if you create a bundle of shapes that extend another one, you may use it to set common style properties to all your shapes.
	     * @return {Shape} The current shape
	     */},{key:'applyGenericStyle',value:function applyGenericStyle(){this.setDom("fill",this.getProp("fillColor"),true);this.setDom("fill-opacity",this.getProp("fillOpacity"),true);this.setDom("stroke",this.getProp("strokeColor"),true);this.setDom("stroke-width",this.getProp("strokeWidth"),true);this.setDom("stroke-dasharray",this.getProp("strokeDasharray"),true);var attributes=this.getProps("attributes");for(var j=0,l=attributes.length;j<l;j++){for(var i in attributes[j]){this.setDom(i,typeof attributes[j][i]=="function"?attributes[j][i].call(this,i):attributes[j][i],true);}}this._applyTransforms();return this;}/**
	     * Applies the style to the shape. This method can be extended to apply specific style to the shapes
	     * @return {Shape} The current shape
	     */},{key:'applyStyle',value:function applyStyle(){return this.applyGenericStyle();}/**
	     * Returns a computed position object
	     * @param {(Number|Position)} [ index = 0 ] - The index of the position to compute
	     * @param {Position} relToPosition - A base position from which to compute the position (useful for <code>dx</code> values)
	     * @return {Object} The computed position object in the format <code>{ x: x_in_px, y: y_in_px }</code>
	     */},{key:'calculatePosition',value:function calculatePosition(index){var position;position=index instanceof _graph2.default?index:this.getPosition(index);if(!position){return;}if(position&&position.compute){return position.compute(this.graph,this.getXAxis(),this.getYAxis(),this.getSerie());}this.graph.throw();}/**
	     * Returns a stored position object
	     * @param {Number} [ index = 0 ] - The index of the position to compute
	     * @return {Position} The current shape
	     */},{key:'getPosition',value:function getPosition(index){var pos=this.getProp('position',index||0);this.setProp('position',pos=_graph2.default.check(pos),index);return pos;}/**
	     * Sets a position object
	     * @param {Position} position - The position object to store
	     * @param {Number} [ index = 0 ] - The index of the position to store
	     * @return {Position} The current shape
	     */},{key:'setPosition',value:function setPosition(position,index){var self=this;var pos=_graph2.default.check(position,function(relativeTo){return self.getRelativePosition(relativeTo);});return this.setProp('position',pos,index||0);}/**
	     * Applies the style to the shape. This method can be extended to apply specific style to the shapes
	     * @private
	     * @return {Shape} The current shape
	     */},{key:'_applyTransforms',value:function _applyTransforms(){var transforms=this.getProp('transforms'),transformString="";if(!transforms){return;}transforms=Array.isArray(transforms)?transforms:[transforms];if(transforms.length==0){return;}for(var i=0;i<transforms.length;i++){transformString+=transforms[i].type+"(";switch(transforms[i].type){case'translate':var transform=transforms[i].arguments[0].compute(this.graph,this.getXAxis(),this.getYAxis(),this.getSerie());transformString+=transform.x;transformString+=", ";transformString+=transform.y;break;case'rotate':transformString+=transforms[i].arguments[0];transformString+=", ";if(this.transforms[i].arguments.length==1){var p=this.getPosition(0);transformString+=p.x+", "+p.y;}else{transformString+=_graph2.default.getDeltaPx(transforms[i].arguments[1],this.getXAxis()).replace('px','');transformString+=", ";transformString+=_graph2.default.getDeltaPx(transforms[i].arguments[2],this.getYAxis()).replace('px','');}break;}transformString+=") ";}this.setDomGroup('transform',transformString);return this;}/**
	     * Creates all the labels
	     * @private
	     * @returns {Shape} The current shape
	     */},{key:'makeLabels',value:function makeLabels(){var self=this;this._labels=this._labels||[];this._labels.map(function(label){self.group.removeChild(label);});this._labels=[];var i=0;while(this.getProp("labelText",i)){if(!self._labels[i]){self._labels[i]=document.createElementNS(self.graph.ns,'text');self._labels[i].setAttribute('data-label-i',i);self._labels[i].jsGraphIsShape=self;self.group.appendChild(this._labels[i]);self._labels[i].addEventListener('dblclick',function(e){e.stopPropagation();self.labelDblClickListener(e);});}i++;}this.updateLabels();return this;}/**
	     * Determines if the label is editable
	     * @param {Number} labelIndex - The index of the label
	     * @return {Boolean} ```true``` if the label is editable, ```false``` otherwise
	     */},{key:'isLabelEditable',value:function isLabelEditable(labelIndex){return this.getProp('labelEditable',labelIndex||0);}/**
	     * Applies the label data to the dom object
	     * @private
	     * @param {Number} labelIndex - The index of the label
	     * @returns {Shape} The current shape
	     */},{key:'updateLabels',value:function updateLabels(){var self=this;this._labels=this._labels||[];for(var i=0,l=this._labels.length;i<l;i++){this._applyLabelData(i);}}/**
	     * Applies the label data to the dom object
	     * @private
	     * @param {Number} labelIndex - The index of the label
	     * @returns {Shape} The current shape
	     */},{key:'_applyLabelData',value:function _applyLabelData(labelIndex){labelIndex=labelIndex||0;/** Sets the position */var visible=this.getProp('labelVisible',labelIndex);if(visible===false){this._labels[labelIndex].setAttribute('display','none');return;}else{this._labels[labelIndex].setAttribute('display','initial');}var position=this.calculatePosition(_graph2.default.check(this.getProp("labelPosition",labelIndex)));if(isNaN(position.x)||isNaN(position.y)){/*console.warn( "Cannot compute positioning for labelIndex " + labelIndex + " with text " + this.getProp( "labelText", labelIndex ) );
	        console.log( this, this._labels );
	        console.trace();*/return;}if(position.x!="NaNpx"&&!isNaN(position.x)&&position.x!=="NaN"&&position.x!==false){this._labels[labelIndex].setAttribute('x',position.x);this._labels[labelIndex].setAttribute('y',position.y);}/** Sets the angle */var currAngle=this.getProp('labelAngle',labelIndex)||0;if(currAngle!=0){var x=this._labels[labelIndex].getAttribute('x'),y=this._labels[labelIndex].getAttribute('y');this._labels[labelIndex].setAttribute('transform','rotate('+currAngle+' '+x+' '+y+')');}/** Sets the baseline */this._labels[labelIndex].setAttribute('dominant-baseline',this.getProp('labelBaseline',labelIndex)||'no-change');/** Sets the baseline */this._labels[labelIndex].textContent=this.getProp('labelText',labelIndex);/** Sets the color */this._labels[labelIndex].setAttribute("fill",this.getProp('labelColor',labelIndex)||'black');/** Sets the size */this._labels[labelIndex].setAttribute("font-size",this.getProp('labelSize',labelIndex)+"px"||"12px");/** Sets the anchor */this._labels[labelIndex].setAttribute('text-anchor',this._getLabelAnchor(labelIndex));/** Sets the stroke */this._labels[labelIndex].setAttribute('stroke',this.getProp('labelStrokeColor',labelIndex));/** Sets the stroke */this._labels[labelIndex].setAttribute('stroke-width',this.getProp('labelStrokeWidth',labelIndex)+"px");this._labels[labelIndex].setAttribute('stroke-location','outside');return this;}/**
	     * Returns the anchor of the label
	     * @private
	     * @param {Number} labelIndex - The index of the label
	     * @returns {String} The anchor in SVG string
	     */},{key:'_getLabelAnchor',value:function _getLabelAnchor(labelIndex){var anchor=this.getProp('labelAnchor',labelIndex);switch(anchor){case'middle':case'start':case'end':return anchor;break;case'right':return'end';break;case'left':return'start';break;default:return'start';break;}}/**
	     * Returns the shape selection status
	     * @returns {Boolean} true is the shape is selected, false otherwise
	     */},{key:'isSelected',value:function isSelected(){return this._selectStatus||false;}/**
	     * Sets or queries whether the shape can have handles. Even if the property is set to false, the getter can return true if the property ```statichandles``` is true (used when handles never disappear)
	     * @param {Boolean} setter - If used, defined if the shape has handles or not
	     * @returns {Boolean} true is the shape has handles, false otherwise
	     * @example Shape.hasHandles( true ); // Sets that the shape has handles
	     * @example Shape.hasHandles( false ); // Sets that the shape has no handles
	     * @example Shape.hasHandles( ); // Queries the shape to determine if it has handles or not. Also returns true if handles are static
	     */},{key:'hasHandles',value:function hasHandles(setter){if(setter!==undefined){this.setProp('handles',setter);}return!!this.getProp('handles')||!!this.getProp('statichandles');}/**
	     * Adds shape handles
	     * @private
	     * @return {Shape} The current shape
	     */},{key:'addHandles',value:function addHandles(){if(this.isLocked()){return;}if(!this.handlesInDom){this.handlesInDom=true;for(var i=1;i<this.handles.length;i++){if(this.handles[i]){this.group.appendChild(this.handles[i]);}}}return this;}/**
	     * Remove shape handles
	     * @private
	     * @return {Shape} The current shape
	     */},{key:'removeHandles',value:function removeHandles(){this.hideHandles();this.handles=[];}/**
	     * Hide shape handles
	     * @private
	     * @return {Shape} The current shape
	     */},{key:'hideHandles',value:function hideHandles(){if(!this.handlesInDom){return this;}for(var i=1;i<this.handles.length;i++){this.group.removeChild(this.handles[i]);}this.handlesInDom=false;return this;}/**
	     * @protected
	     * @return {Boolean} ```true``` if the handles are in the DOM
	     */},{key:'areHandlesInDom',value:function areHandlesInDom(){return this.handlesInDom;}/**
	     * Selects the shape. Should only be called from jsGraph main instance
	     * @private
	     * @param {Boolean} [ mute = false ] - Mutes the method (no event emission)
	     * @returns {Shape} the current shape
	     */},{key:'_select',value:function _select(mute){if(!this.isSelectable()){return false;}// Put on the stack
this.appendToDom();//this.graph.appendShapeToDom( this ); // Put the shape on top of the stack !
this._selectStatus=true;this.applySelectedStyle();if(this.hasHandles()&&!this.hasStaticHandles()){this.addHandles();this.setHandles();}if(!mute){this.graph.emit("shapeSelected",this);}}},{key:'applySelectedStyle',value:function applySelectedStyle(){if(!this._selectStatus){return;}var style=this.getSelectStyle();var style2={};for(var i in style){if(typeof style[i]=="function"){style2[i]=style[i].call(this);}else{style2[i]=style[i];}}util.saveDomAttributes(this._dom,style2,'select');}/**
	     * Unselects the shape. Should only be called from jsGraph main instance
	     * @private
	     * @param {Boolean} [ mute = false ] - Mutes the method (no event emission)
	     * @returns {Shape} the current shape
	     */},{key:'_unselect',value:function _unselect(mute){this._selectStatus=false;util.restoreDomAttributes(this._dom,'select');if(this.hasHandles()&&!this.hasStaticHandles()){this.hideHandles();}if(!mute){this.graph.emit("shapeUnselected",this);}}/**
	     * Returns the special style of the shape when it is selected.
	     * @see Shape#setSelectStyle
	     * @param {Object<String,String>} The SVG attributes to apply to the shape
	     */},{key:'getSelectStyle',value:function getSelectStyle(){return this.selectStyle;}/**
	     * Defines the style that is applied to the shape when it is selected. The style extends the default style of the shape
	     * @param {Object<String,String>} [ attr = {} ] - The SVG attributes to apply to the shape
	     * @example rectangle.setSelectStyle( { fill: 'red' } );
	     * @returns {Shape} the current shape
	     */},{key:'setSelectStyle',value:function setSelectStyle(attr){this.selectStyle=attr;this.applySelectedStyle();// Maybe the shape is already selected
return this;}/**
	     * Assigns static handles to the shape. In this mode, handles will not disappear
	     * @param {Boolean} staticHandles - true to enable static handles, false to disable them.
	     * @returns {Shape} the current shape
	     */},{key:'setStaticHandles',value:function setStaticHandles(staticHandles){this.setProp('staticHandles',staticHandles);}/**
	     * @returns {Boolean} ```true``` if the shape has static handles, ```false``` otherwise
	     */},{key:'hasStaticHandles',value:function hasStaticHandles(staticHandles){return!!this.getProp('staticHandles');}/**
	     * Creates the handles for the shape
	     * @param {Number} nb - The number of handles
	     * @param {String} type - The type of SVG shape to use
	     * @param {Object<String,String>} [ attr = {} ] - The SVG attributes to apply to the handles
	     * @param {Function} [ callbackEach ] - An additional callback the user can provide to further personalize the handles
	     * @returns {Shape} the current shape
	     * @private
	     */},{key:'_createHandles',value:function _createHandles(nb,type,attr,callbackEach){if(this.handles&&this.handles.length>0){return;}var self=this;for(var i=1,l=nb;i<=l;i++){(function(j){var self=this;var handle=document.createElementNS(self.graph.ns,type);handle.jsGraphIsShape=true;if(attr){for(var k in attr){handle.setAttribute(k,attr[k]);}}handle.addEventListener('mousedown',function(e){if(self.isResizable()){e.preventDefault();e.stopPropagation();self.graph.emit("beforeShapeResize",self);if(!self.graph.prevent(false)){self.resizing=true;self.handleSelected=j;self.handleMouseDown(e);}}});if(callbackEach){callbackEach(self.handles[j]);}self.handles[j]=handle;}).call(this,i);}return this.handles;}/**
	     * Creates the handles for the shape. Should be implemented by the children shapes classes.
	     */},{key:'createHandles',value:function createHandles(){}/**
	     * Handles mouse down event
	     * @private
	     * @param {Event} e - The native event.prototype
	     */},{key:'handleMouseDownImpl',value:function handleMouseDownImpl(){}/**
	     * Handles the mouse move event
	     * @private
	     * @param {Event} e - The native event.prototype
	     */},{key:'handleMouseMoveImpl',value:function handleMouseMoveImpl(){}/**
	     * Handles mouse up event
	     * @private
	     * @param {Event} e - The native event.prototype
	     */},{key:'handleMouseUpImpl',value:function handleMouseUpImpl(){}/**
	     * Called when the shape is created
	     * @private
	     * @param {Event} e - The native event.prototype
	     */},{key:'handleCreateImpl',value:function handleCreateImpl(){}/**
	     * Handles mouse down events
	     * @param {Event} e - The native event
	     * @return The result of the {@link Shape#handleMouseDownImpl} method.prototype
	     */},{key:'handleMouseDown',value:function handleMouseDown(e){//this.handleSelected = false;
if(this.isLocked()){return;}if(this.isMovable()||this.isResizable()){this.graph.elementMoving(this);}if(this.getProp('selectOnMouseDown')){this.graph.selectShape(this);}if(this.isMovable()){if(!this.resizing){this.graph.emit("beforeShapeMove",self);if(!this.graph.prevent(false)){this.moving=true;}}}this._mouseCoords=this.graph._getXY(e);return this.handleMouseDownImpl(e,this._mouseCoords);}/**
	     * Handles mouse click events
	     * @param {Event} e - The native event
	     * @return The result of the {@link Shape#handleMouseDownClick} method
	     * @private
	     */},{key:'handleClick',value:function handleClick(e){if(this.getProp('selectOnClick')){this.graph.selectShape(this);}if(!this.isSelectable()){return false;}if(!e.shiftKey){this.graph.unselectShapes();}this.graph.selectShape(this);}/**
	     * Handles mouse click events
	     * @param {Event} e - The native event
	     * @return The result of the {@link Shape#handleMouseUpImpl} method
	     * @private
	     */},{key:'handleMouseMove',value:function handleMouseMove(e){//console.log( this.resizinh, this.moving, this.isSelected(), this._mouseCoords );
if((this.resizing||this.moving)&&!this.isSelected()){this.graph.selectShape(this);}this.graph.emit("beforeShapeMouseMove",this);if(this.graph.prevent(false)||!this._mouseCoords){return false;}var coords=this.graph._getXY(e);var deltaX=this.getXAxis().getRelVal(coords.x-this._mouseCoords.x),deltaY=this.getYAxis().getRelVal(coords.y-this._mouseCoords.y);if(deltaX!=0||deltaY!==0){this.preventUnselect=true;}this._mouseCoords=coords;var ret=this.handleMouseMoveImpl(e,deltaX,deltaY,coords.x-this._mouseCoords.x,coords.y-this._mouseCoords.y);return ret;}/**
	     * Handles mouse up events
	     * @param {Event} e - The native event
	     * @return The result of the {@link Shape#handleMouseUpImpl} method
	     * @private
	     */},{key:'handleMouseUp',value:function handleMouseUp(e){if(this.moving){this.graph.emit("shapeMoved",this);}if(this.handleSelected||this.resize){this.graph.emit("shapeResized",this);}this.moving=false;this.resizing=false;this.handleSelected=false;this.graph.elementMoving(false);return this.handleMouseUpImpl(e);}/**
	     * Handles double click events
	     * @param {Event} e - The native event
	     * @return The result of the {@link Shape#handleMouseDblClickImpl} method
	     * @private
	     */},{key:'handleDblClick',value:function handleDblClick(e){}/**
	     * Handles mouse over events
	     * @param {Event} e - The native event
	     * @return The result of the {@link Shape#handleMouseOverImpl} method
	     * @private
	     */},{key:'handleMouseOver',value:function handleMouseOver(){if(this.getProp("highlightOnMouseOver")){if(!this.moving&&!this.resizing){this.highlight();}}this.graph.emit("shapeMouseOver",this);}/**
	     * Handles mouse out events
	     * @param {Event} e - The native event
	     * @return The result of the {@link Shape#handleMouseOutImpl} method
	     * @private
	     */},{key:'handleMouseOut',value:function handleMouseOut(){if(this.getProp("highlightOnMouseOver")){this.unHighlight();}this.graph.emit("shapeMouseOut",this);}/*
	     *  Updated July 1st, 2015
	     *//**
	     * Locks the shape (prevents selection, resizing and moving)
	     * @return {Shape} The current shape
	     */},{key:'lock',value:function lock(){this.setProp('locked',true);return this;}/**
	     * Unlocks the shape (prevents selection, resizing and moving)
	     * @return {Shape} The current shape
	     */},{key:'unlock',value:function unlock(){this.setProp('locked',false);return this;}/**
	     * @return {Boolean} True if the shape is locked, false otherwise
	     */},{key:'isLocked',value:function isLocked(){return this.getProp('locked')||this.graph.shapesLocked;}/**
	     * Makes the shape moveable
	     * @return {Shape} The current shape
	     */},{key:'movable',value:function movable(bln){this.setProp('movable',true);}/**
	     * Makes the shape non-moveable
	     * @return {Shape} The current shape
	     */},{key:'unmovable',value:function unmovable(){this.setProp('movable',false);return false;}/**
	     * @return {Boolean} True if the shape is movable, false otherwise
	     */},{key:'isMovable',value:function isMovable(){return this.getProp('movable');}/**
	     * Makes the shape resizable
	     * @return {Shape} The current shape
	     */},{key:'resizable',value:function resizable(){this.setProp('resizable',true);}/**
	     * Makes the shape non-resizable
	     * @return {Shape} The current shape
	     */},{key:'unresizable',value:function unresizable(){this.setProp('resizable',false);}/**
	     * @return {Boolean} True if the shape is resizable, false otherwise
	     */},{key:'isResizable',value:function isResizable(){return this.getProp('resizable');}/**
	     * Makes the shape selectable
	     * @return {Shape} The current shape
	     */},{key:'selectable',value:function selectable(){this.setProp('selectable',true);}/**
	     * Makes the shape non-selectable
	     * @return {Shape} The current shape
	     */},{key:'unselectable',value:function unselectable(){this.graph.unselectShape(this);this.setProp('selectable',false);}/**
	     * @return {Boolean} True if the shape is selectable, false otherwise
	     */},{key:'isSelectable',value:function isSelectable(){return this.getProp('selectable');}/**
	     * Highlights the shape with attributes
	     * @returns {Shape} The current shape
	     * @param {Object<String,String>} [ attributes ] - A hashmap of attributes to apply. If omitted, {@link Shape#getHighlightAttributes} will be called
	     * @param {String} [ saveDomName=highlight ] - The name to which the current shape attributes will be saved to be recovered later with the {@link Shape#unHighlight} method
	     * @example shape.highlight( { fill: 'red', 'fill-opacity': 0.5 } );
	     * @see Shape#unHighlight
	     */},{key:'highlight',value:function highlight(attributes,saveDomName){if(!attributes){attributes=this.getHighlightAttributes();}if(!saveDomName){saveDomName="highlight";}util.saveDomAttributes(this._dom,attributes,saveDomName);this.highlightImpl();return this;}/**
	     * Removes the highlight properties from the same
	     * @returns {Shape} The current shape
	     * @param {String} [ saveDomName=highlight ] - The name to which the current shape attributes will be saved to be recovered later with the {@link Shape#unHighlight} method
	     * @see Shape#highlight
	     */},{key:'unHighlight',value:function unHighlight(saveDomName){if(!saveDomName){saveDomName="highlight";}util.restoreDomAttributes(this._dom,saveDomName);this.unHighlightImpl();return this;}},{key:'highlightImpl',value:function highlightImpl(){}},{key:'unHighlightImpl',value:function unHighlightImpl(){}/**
	     * @returns {Object} The attributes taken by the shape when highlighted
	     * @see Shape#highlight
	     */},{key:'getHighlightAttributes',value:function getHighlightAttributes(){return this._highlightAttributes;}/**
	     * Sets the attributes the shape will take when highlighted
	     * @param {Object<String,String>} [ attributes ] - A hashmap of attributes to apply when the shape is highlighted
	     * @returns {Shape} The current shape
	     * @see Shape#highlight
	     */},{key:'setHighlightAttributes',value:function setHighlightAttributes(attributes){this._highlightAttributes=attributes;return this;}/**
	     * Returns the masking id of the shape. Returns null if the shape does not behave as a mask
	     * @returns {String} The ```id``` attribute of the shape
	     */},{key:'getMaskingID',value:function getMaskingID(){return this.maskingId;}/**
	     * Masks the current shape with another shape passed as the first parameter of the method
	     * @param {Shape} maskingShape - The shape used to mask the current shape
	     * @return {Shape} The current shape
	     */},{key:'maskWith',value:function maskWith(maskingShape){var maskingId=maskingShape.getMaskingID();if(maskingId){this._dom.setAttribute('mask','url(#'+maskingId+')');}else{this._dom.removeAttribute('mask');}}/**
	     * Manually updates the mask of the shape. This is needed because the shape needs to be surrounded by a white rectangle (because transparent is treated as black and will not render the shape)
	     * This method will work well for rectangles but should be overridden for other shapes
	     * @return {Shape} The current shape
	     * @todo Explore a way to make it compatible for all kinds of shapes. Maybe the masker position should span the whole graph...
	     */},{key:'updateMask',value:function updateMask(){return;if(!this.maskDom){return;}var position={x:'min',y:'min'};var position2={x:'max',y:'max'};position=this._getPosition(position);position2=this._getPosition(position2);this.maskDomWrapper.setAttribute('x',Math.min(position.x,position2.x));this.maskDomWrapper.setAttribute('y',Math.min(position.y,position2.y));this.maskDomWrapper.setAttribute('width',Math.abs(position2.x-position.x));this.maskDomWrapper.setAttribute('height',Math.abs(position2.y-position.y));for(var i=0;i<this._dom.attributes.length;i++){this.maskDom.setAttribute(this._dom.attributes[i].name,this._dom.attributes[i].value);}this.maskDom.setAttribute('fill','black');return this;}},{key:'labelDblClickListener',value:function labelDblClickListener(e){var i=parseInt(e.target.getAttribute('data-label-i'));var self=this;if(isNaN(i)){return;}if(!this.isLabelEditable(i)){return;}e.preventDefault();e.stopPropagation();var shapeLabel=document.createElement('input');shapeLabel.setAttribute('type','text');shapeLabel.setAttribute('value',self.getProp('labelText',i));self.graph._dom.prepend(shapeLabel);util.setCSS(shapeLabel,{position:'absolute',marginTop:parseInt(e.target.getAttribute('y').replace('px',''))-10+'px',marginLeft:parseInt(e.target.getAttribute('x').replace('px',''))-50+'px',textAlign:'center',width:'100px'});shapeLabel.addEventListener('blur',function(){self.setLabelText(shapeLabel.getAttribute('value'),i);self._labels[i].textContent=shapeLabel.getAttribute('value');shapeLabel.remove();self.changed("shapeLabelChanged");});shapeLabel.addEventListener('keyup',function(e){e.stopPropagation();e.preventDefault();if(e.keyCode===13){shapeLabel.dispatchEvent(new Event('blur'));}});shapeLabel.addEventListener('keypress',function(e){e.stopPropagation();});shapeLabel.addEventListener('keydown',function(e){e.stopPropagation();});shapeLabel.focus();}/**
	     * Appends the shape DOM to its parent
	     * @private
	     * @return {Shape} The current shape
	     */},{key:'appendToDom',value:function appendToDom(){if(this._forcedParentDom){this._forcedParentDom.appendChild(this.group);}else{this.graph.appendShapeToDom(this);}return this;}/**
	     * Forces the DOM parent (instead of the normal layer)
	     * @return {Shape} The current shape
	     */},{key:'forceParentDom',value:function forceParentDom(dom){this._forcedParentDom=dom;return this;}}]);return Shape;}(_EventEmitter2.default);/**
	   * @alias Shape#calculatePosition
	   */Shape.prototype.computePosition=Shape.prototype.calculatePosition;/**
	   * @alias Shape#displayLabel
	   */Shape.prototype.showLabel=Shape.prototype.displayLabel;/**
	   * @alias Shape#kill
	   */Shape.prototype.remove=Shape.prototype.kill;exports.default=Shape;});/***/},/* 29 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(28)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.shape'));}else{var mod={exports:{}};factory(mod.exports,global.graph);global.graphShapeAreaundercurve=mod.exports;}})(this,function(exports,_graph){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   *  Displays a surface under a line serie
	   *  @extends GraphShape
	   */var ShapeSurfaceUnderCurve=function(_graph2$default8){_inherits(ShapeSurfaceUnderCurve,_graph2$default8);function ShapeSurfaceUnderCurve(){_classCallCheck(this,ShapeSurfaceUnderCurve);return _possibleConstructorReturn(this,(ShapeSurfaceUnderCurve.__proto__||Object.getPrototypeOf(ShapeSurfaceUnderCurve)).apply(this,arguments));}_createClass(ShapeSurfaceUnderCurve,[{key:'createDom',value:function createDom(){this._dom=document.createElementNS(this.graph.ns,'path');}},{key:'createHandles',value:function createHandles(){this._createHandles(2,'line',{'stroke-width':'3','stroke':'transparent','pointer-events':'stroke','cursor':'ew-resize'});}},{key:'handleMouseMoveImpl',value:function handleMouseMoveImpl(e,deltaX,deltaY){if(this.isLocked()){return;}if(this.moving){this.getPosition(0).deltaPosition('x',deltaX,this.getXAxis());this.getPosition(1).deltaPosition('x',deltaX,this.getXAxis());}else if(this.serie&&this.handleSelected){this.resizingPosition=this.handleSelected==1?this.getPosition(0):this.getPosition(1);var value=this.serie.searchClosestValue(this.getXAxis().getVal(this.graph._getXY(e).x-this.graph.getPaddingLeft()));if(!value){return;}if(this.resizingPosition.x!=value.xMin){this.preventUnselect=true;}this.resizingPosition.x=value.xMin;}else if(this.handleSelected){this.resizingPosition=this.handleSelected==1?this.getPosition(0):this.getPosition(1);this.resizingPosition.deltaPosition('x',deltaX,this.getXAxis());}this.applyPosition();}/*
	        redrawImpl: function() {
	          //var doDraw = this.setPosition();
	          //	this.setDom('fill', 'url(#' + 'patternFill' + this.graph._creation + ')')
	           if ( this.position != this.doDraw ) {
	            this.group.setAttribute( "visibility", this.position ? "visible" : 'hidden' );
	            this.doDraw = this.position;
	          }
	        },
	    */},{key:'applyPosition',value:function applyPosition(){if(!this.serie){return;}var posXY=this.computePosition(0),posXY2=this.computePosition(1),w=Math.abs(posXY.x-posXY2.x),x=Math.min(posXY.x,posXY2.x);//  this.reversed = x == posXY2.x;
if(w<2||x+w<0||x>this.graph.getDrawingWidth()){this.setDom('d',"");return false;}var v1=this.serie.searchClosestValue(this.getPosition(0).x),v2=this.serie.searchClosestValue(this.getPosition(1).x),v3,i,j,init,max,k,x,y,firstX,firstY,currentLine,maxY=0,minY=Number.MAX_VALUE;if(!v1||!v2){return false;}if(v1.xBeforeIndex>v2.xBeforeIndex){v3=v1;v1=v2;v2=v3;//this.handleSelected = ( this.handleSelected == 1 ) ? 2 : 1;
}this.counter=0;for(i=v1.dataIndex;i<=v2.dataIndex;i++){this.currentLine="";init=i==v1.dataIndex?v1.xBeforeIndexArr:0;max=i==v2.dataIndex?v2.xBeforeIndexArr:this.serie.data[i].length;k=0;if(init==max){max++;}for(j=init;j<=max;j+=2){x=this.serie.getX(this.serie.data[i][j+0]);y=this.serie.getY(this.serie.data[i][j+1]);maxY=Math.max(this.serie.data[i][j+1],maxY);minY=Math.min(this.serie.data[i][j+1],minY);if(j==init){this.firstX=x;this.firstY=y;}if(k>0){this.currentLine+=" L "+x+" "+y+" ";}else{this.currentLine+=" M "+x+" "+y+" ";}//this.serie._addPoint( x, y, false, this.currentLine );
k++;}this.lastX=x;this.lastY=y;if(!this.firstX||!this.firstY||!this.lastX||!this.lastY){return;}this.currentLine+=" V "+this.getYAxis().getPx(0)+" H "+this.firstX+" z";this.setDom('d',this.currentLine);}this.maxY=this.serie.getY(maxY);this.setHandles();this.changed();return true;}},{key:'setHandles',value:function setHandles(){if(!this.firstX){return;}var posXY=this.computePosition(0),posXY2=this.computePosition(1);if(posXY.x<posXY2.x){this.handles[1].setAttribute('x1',this.firstX);this.handles[1].setAttribute('x2',this.firstX);this.handles[2].setAttribute('x1',this.lastX);this.handles[2].setAttribute('x2',this.lastX);}else{this.handles[1].setAttribute('x1',this.lastX);this.handles[1].setAttribute('x2',this.lastX);this.handles[2].setAttribute('x1',this.firstX);this.handles[2].setAttribute('x2',this.firstX);}this.handles[1].setAttribute('y1',this.getYAxis().getMaxPx());this.handles[1].setAttribute('y2',this.serie.getY(0));this.handles[2].setAttribute('y1',this.getYAxis().getMaxPx());this.handles[2].setAttribute('y2',this.serie.getY(0));}}]);return ShapeSurfaceUnderCurve;}(_graph2.default);exports.default=ShapeSurfaceUnderCurve;});/***/},/* 30 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(31)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.shape.line'));}else{var mod={exports:{}};factory(mod.exports,global.graphShape);global.graphShapeArrow=mod.exports;}})(this,function(exports,_graphShape){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graphShape2=_interopRequireDefault(_graphShape);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   *  Displays an arrow
	   *  @extends GraphShapeLine
	   */var ShapeArrow=function(_graphShape2$default){_inherits(ShapeArrow,_graphShape2$default);function ShapeArrow(graph){_classCallCheck(this,ShapeArrow);return _possibleConstructorReturn(this,(ShapeArrow.__proto__||Object.getPrototypeOf(ShapeArrow)).call(this,graph));}_createClass(ShapeArrow,[{key:'createDom',value:function createDom(){this._dom=document.createElementNS(this.graph.ns,'line');this._dom.setAttribute('marker-end','url(#arrow'+this.graph._creation+')');this.createHandles(this.nbHandles,'rect',{transform:"translate(-3 -3)",width:6,height:6,stroke:"black",fill:"white",cursor:'nwse-resize'});this.setStrokeColor('black');this.setStrokeWidth(1);}}]);return ShapeArrow;}(_graphShape2.default);exports.default=ShapeArrow;});/***/},/* 31 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(28)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.shape'));}else{var mod={exports:{}};factory(mod.exports,global.graph);global.graphShapeLine=mod.exports;}})(this,function(exports,_graph){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Represents a line
	   * @extends Shape
	   * @see Graph#newShape
	   */var ShapeLine=function(_graph2$default9){_inherits(ShapeLine,_graph2$default9);function ShapeLine(graph,options){_classCallCheck(this,ShapeLine);return _possibleConstructorReturn(this,(ShapeLine.__proto__||Object.getPrototypeOf(ShapeLine)).call(this,graph,options));}/**
	     * Creates the DOM
	     * @private
	     * @return {Shape} The current shape
	     */_createClass(ShapeLine,[{key:'createDom',value:function createDom(){this._dom=document.createElementNS(this.graph.ns,'line');this.setStrokeColor('black');this.setStrokeWidth(1);}/**
	     * Creates the handles
	     * @private
	     * @return {Shape} The current shape
	     */},{key:'createHandles',value:function createHandles(){this._createHandles(2,'rect',{transform:"translate(-3 -3)",width:6,height:6,stroke:"black",fill:"white",cursor:'nwse-resize'});}/**
	     * Recalculates the positions and applies them
	     * @private
	     * @return {Boolean} Whether the shape should be redrawn
	     */},{key:'applyPosition',value:function applyPosition(){var position=this.calculatePosition(0);var position2=this.calculatePosition(1);if(!position||!position.x||!position.y){return;}this.setDom('x2',position.x);this.setDom('y2',position.y);this.setDom('y1',position2.y);this.setDom('x1',position2.x);this.currentPos2x=position2.x;this.currentPos2y=position2.y;this.currentPos1x=position.x;this.currentPos1y=position.y;return true;}/**
	     * Handles mouse move events
	     * @private
	     */},{key:'handleMouseMoveImpl',value:function handleMouseMoveImpl(e,deltaX,deltaY,deltaXPx,deltaYPx){if(this.isLocked()){return;}var pos=this.getPosition(0);var pos2=this.getPosition(1);var posToChange;if(this.handleSelected==1){posToChange=pos;}else if(this.handleSelected==2){posToChange=pos2;}if(posToChange){if(!this._data.vertical){posToChange.deltaPosition('x',deltaX,this.getXAxis());}if(!this._data.horizontal){posToChange.deltaPosition('y',deltaY,this.getYAxis());}}if(this.moving){// If the pos2 is defined by a delta, no need to move them
if(pos.x){pos.deltaPosition('x',deltaX,this.getXAxis());}if(pos.y){pos.deltaPosition('y',deltaY,this.getYAxis());}// If the pos2 is defined by a delta, no need to move them
if(pos2.x){pos2.deltaPosition('x',deltaX,this.getXAxis());}if(pos2.y){pos2.deltaPosition('y',deltaY,this.getYAxis());}}if(this._data.forcedCoords){var forced=this._data.forcedCoords;if(forced.y!==undefined){if(typeof forced.y=="function"){pos2.y=pos.y=forced.y(this);}else{pos2.y=forced.y;pos.y=forced.y;}}if(forced.x!==undefined){if(typeof forced.x=="function"){pos2.x=pos.x=forced.x(this);}else{pos2.x=forced.x;pos.x=forced.x;}}}if(this.rectEvent){this.setEventReceptacle();}this.redraw();this.changed();this.setHandles();return true;}/**
	     * Sets the handle position
	     * @private
	     */},{key:'setHandles',value:function setHandles(){if(!this.areHandlesInDom()){return;}if(isNaN(this.currentPos1x)){return;}this.handles[1].setAttribute('x',this.currentPos1x);this.handles[1].setAttribute('y',this.currentPos1y);this.handles[2].setAttribute('x',this.currentPos2x);this.handles[2].setAttribute('y',this.currentPos2y);}/**
	     * Creates an line receptacle with the coordinates of the line, but continuous and thicker
	     * @return {Shape} The current shape
	     */},{key:'setEventReceptacle',value:function setEventReceptacle(){if(!this.currentPos1x){return;}if(!this.rectEvent){this.rectEvent=document.createElementNS(this.graph.ns,'line');this.rectEvent.setAttribute('pointer-events','stroke');this.rectEvent.setAttribute('stroke','transparent');this.rectEvent.jsGraphIsShape=this;this.group.appendChild(this.rectEvent);}this.rectEvent.setAttribute('x1',this.currentPos1x);this.rectEvent.setAttribute('y1',this.currentPos1y);this.rectEvent.setAttribute('x2',this.currentPos2x);this.rectEvent.setAttribute('y2',this.currentPos2y);this.rectEvent.setAttribute("stroke-width",this.getProp("strokeWidth")+2);}}]);return ShapeLine;}(_graph2.default);exports.default=ShapeLine;});/***/},/* 32 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(28)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.shape'));}else{var mod={exports:{}};factory(mod.exports,global.graph);global.graphShapeLabel=mod.exports;}})(this,function(exports,_graph){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Blank shape used to display label
	   * Use myShapelabel.setLabelText(); and associated methods
	   * @extend GraphShape
	   */var ShapeLabel=function(_graph2$default10){_inherits(ShapeLabel,_graph2$default10);function ShapeLabel(graph,options){_classCallCheck(this,ShapeLabel);return _possibleConstructorReturn(this,(ShapeLabel.__proto__||Object.getPrototypeOf(ShapeLabel)).call(this,graph,options));}_createClass(ShapeLabel,[{key:'createDom',value:function createDom(){return false;}},{key:'applyPosition',value:function applyPosition(){return true;}}]);return ShapeLabel;}(_graph2.default);exports.default=ShapeLabel;});/***/},/* 33 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(28)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.shape'));}else{var mod={exports:{}};factory(mod.exports,global.graph);global.graphShapePolyline=mod.exports;}})(this,function(exports,_graph){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Represents a line that extends the Shape class. Used by the plugin {@link PluginSerieLineDifference}
	   * @extends Shape
	   * @see Graph#newShape
	   */var ShapePolyline=function(_graph2$default11){_inherits(ShapePolyline,_graph2$default11);function ShapePolyline(graph,options){_classCallCheck(this,ShapePolyline);return _possibleConstructorReturn(this,(ShapePolyline.__proto__||Object.getPrototypeOf(ShapePolyline)).call(this,graph,options));}/**
	     * Creates the DOM
	     * @private
	     * @return {Shape} The current shape
	     */_createClass(ShapePolyline,[{key:'createDom',value:function createDom(){this._dom=document.createElementNS(this.graph.ns,'path');this.setStrokeColor('black');this.setStrokeWidth(1);}/**
	     * No handles for the polyline
	     * @private
	     * @return {Shape} The current shape
	     */},{key:'createHandles',value:function createHandles(){}/**
	     *  Force the points of the polyline already computed in pixels
	     *  @param {String} a SVG string to be used in the ```d``` attribute of the path.
	     *  @return {ShapePolyline} The current polyline instance
	     */},{key:'setPointsPx',value:function setPointsPx(points){this.pxPoints=points;return this;}/**
	     * Recalculates the positions and applies them
	     * @private
	     * @return {Boolean} Whether the shape should be redrawn
	     */},{key:'applyPosition',value:function applyPosition(){if(this.pxPoints){this.setDom('d',this.pxPoints);}else if(this.points){var xAxis,yAxis;if(this.serie){xAxis=this.serie.getXAxis();yAxis=this.serie.getYAxis();}else if(this.xAxis&&this.yAxis){xAxis=this.xAxis;yAxis=this.yAxis;}this.setDom('d','M '+this.points.map(function(p){return xAxis.getPx(p[0])+", "+yAxis.getPx(p[1]);}).join(" L "));}return true;}}]);return ShapePolyline;}(_graph2.default);exports.default=ShapePolyline;});/***/},/* 34 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(29),__webpack_require__(2)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.shape.areaundercurve'),require('../graph.position'));}else{var mod={exports:{}};factory(mod.exports,global.graphShape,global.graph);global.graphShapeNmrintegral=mod.exports;}})(this,function(exports,_graphShape,_graph){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graphShape2=_interopRequireDefault(_graphShape);var _graph2=_interopRequireDefault(_graph);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Displays an integral with NMR style
	   * @extends ShapeSurfaceUnderCurve
	   */var ShapeNMRIntegral=function(_graphShape2$default2){_inherits(ShapeNMRIntegral,_graphShape2$default2);function ShapeNMRIntegral(graph,options){_classCallCheck(this,ShapeNMRIntegral);var _this43=_possibleConstructorReturn(this,(ShapeNMRIntegral.__proto__||Object.getPrototypeOf(ShapeNMRIntegral)).call(this,graph,options));_this43.nbHandles=2;return _this43;}_createClass(ShapeNMRIntegral,[{key:'createHandles',value:function createHandles(){this._createHandles(2,'rect',{transform:"translate(-3 -3)",width:6,height:6,stroke:"black",fill:"white"});}},{key:'applyPosition',value:function applyPosition(){var posXY=this.calculatePosition(0),posXY2=this.calculatePosition(1),w,x,axis=this.getAxis(),points=[];var baseLine=this.yBaseline;if(!posXY||!posXY2){return;}if(!this.serie.isFlipped()){baseLine=this.getYAxis().getPx(0)-baseLine;w=Math.abs(posXY.x-posXY2.x);x=Math.min(posXY.x,posXY2.x);}else{baseLine=this.getXAxis().getPx(0)-baseLine;w=Math.abs(posXY.y-posXY2.y);x=Math.min(posXY.y,posXY2.y);}this.computedBaseline=baseLine;this.reversed=x==posXY2.x;var pos1=this.getPosition(0);var pos2=this.getPosition(1);if(axis=='x'&&(w<2||x+w<0||x>this.graph.getDrawingWidth())||axis=='y'&&(w<2||x+w<0||x>this.graph.getDrawingHeight())){points=[[0,0]];this.hideLabel(0);this.setDom("d","");this.hideHandles();}else{this.showLabel(0);var v1=this.serie.searchClosestValue(pos1[axis]),v2=this.serie.searchClosestValue(pos2[axis]),v3,i,j,init,max,k,x,y,firstX,firstY,currentLine="",maxY=0,incrYFlip=1,incrXFlip=0,minY=Number.MAX_VALUE;if(!v1||!v2){return false;}posXY.y=v1.yMin;posXY2.y=v2.yMin;if(v1.xBeforeIndex>v2.xBeforeIndex){v3=v1;v1=v2;v2=v3;}var firstX,firstY,lastX,lastY,firstXVal,firstYVal,lastXVal,lastYVal,sum=0,diff;var ratio=this.scaling;if(this.serie.isFlipped()){incrYFlip=0;incrXFlip=1;}for(i=v1.dataIndex;i<=v2.dataIndex;i++){init=i==v1.dataIndex?v1.xBeforeIndexArr:0;max=i==v2.dataIndex?v2.xBeforeIndexArr:this.serie.data[i].length;k=0;for(j=init;j<=max;j+=2){x=this.serie.getX(this.serie.data[i][j+incrXFlip]);y=this.serie.getY(this.serie.data[i][j+incrYFlip]);if(this.serie.isFlipped()){var x2=x;x=y;y=x2;}if(!firstX){firstX=x;firstY=y;firstXVal=this.serie.data[i][j+incrXFlip];firstYVal=this.serie.data[i][j+incrYFlip];}if(lastX==undefined){lastX=x;lastY=y;lastXVal=this.serie.data[i][j+incrXFlip];lastYVal=this.serie.data[i][j+incrYFlip];continue;}sum+=(this.serie.data[i][j+incrXFlip]-lastXVal)*this.serie.data[i][j+incrYFlip]*0.5;lastXVal=this.serie.data[i][j+incrXFlip];if(x==lastX&&y==lastY){continue;}lastX=x;lastY=y;points.push([x,sum]);k++;}this.lastX=x;this.lastY=y;if(!firstX||!firstY||!this.lastX||!this.lastY){return;}}if(sum==0){sum=1;// Will look line a line anyway
}var ratio;if(!this._ratio){ratio=150/sum;}else{ratio=this._ratio;}for(var i=0,l=points.length;i<l;i++){//   console.log( points[ i ][ 1 ] / sum );
points[i][1]=baseLine-points[i][1]*ratio;if(i==0){this.firstPointX=points[i][0];this.firstPointY=points[i][1];}currentLine+=" L "+points[i][incrXFlip]+", "+points[i][incrYFlip]+" ";this.lastPointX=points[i][0];this.lastPointY=points[i][1];}this.points=points;this.sum=sum;var lastY=firstY,lastX=this.lastX;var interX=firstX;diff=Math.min(20,lastX-firstX);if(this.serie.isFlipped()){currentLine=" M "+baseLine+", "+firstX+" "+currentLine;}else{currentLine=" M "+firstX+", "+baseLine+" "+currentLine;}this.setDom('d',currentLine);this.firstX=firstX;this.firstY=firstY;this.maxY=this.serie.getY(maxY);if(this._selected){this.select();}this.setHandles();}this.setLabelPosition(new _graph2.default({x:(pos1.x+pos2.x)/2,y:(this.firstPointY+this.lastPointY)/2+"px"}));this.updateLabels();this.changed();return true;}},{key:'getAxis',value:function getAxis(){return this._data.axis||'x';}/**
	     * User to screen coordinate transform. In (unit)/(px), (unit) being the unit of the integral (x * y)
	     * @type {Number}
	     */},{key:'selectStyle',value:function selectStyle(){this.setDom('stroke-width','2px');}},{key:'selectHandles',value:function selectHandles(){}// Cancel areaundercurve
},{key:'setHandles',value:function setHandles(){if(this.points==undefined){return;}if(!this.isSelected()){return;}this.addHandles();var posXY=this.computePosition(0),posXY2=this.computePosition(1);if(posXY.x<posXY2.x){this.handles[1].setAttribute('x',this.firstPointX);this.handles[1].setAttribute('y',this.firstPointY);this.handles[2].setAttribute('x',this.lastPointX);this.handles[2].setAttribute('y',this.lastPointY);}else{this.handles[2].setAttribute('x',this.firstPointX);this.handles[2].setAttribute('y',this.firstPointY);this.handles[1].setAttribute('x',this.lastPointX);this.handles[1].setAttribute('y',this.lastPointY);}}},{key:'ratio',set:function set(){var r=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;this._ratio=r;},get:function get(){return this._ratio;}},{key:'yBaseline',set:function set(){var y=arguments.length>0&&arguments[0]!==undefined?arguments[0]:30;this._yBaseline=y;},get:function get(){return this._yBaseline||30;}}]);return ShapeNMRIntegral;}(_graphShape2.default);exports.default=ShapeNMRIntegral;});/***/},/* 35 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(36)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.shape.rect'));}else{var mod={exports:{}};factory(mod.exports,global.graphShape);global.graphShapePeakintegration2d=mod.exports;}})(this,function(exports,_graphShape){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graphShape2=_interopRequireDefault(_graphShape);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var ShapePeakIntegration2D=function(_graphShape2$default3){_inherits(ShapePeakIntegration2D,_graphShape2$default3);function ShapePeakIntegration2D(graph,options){_classCallCheck(this,ShapePeakIntegration2D);var _this44=_possibleConstructorReturn(this,(ShapePeakIntegration2D.__proto__||Object.getPrototypeOf(ShapePeakIntegration2D)).call(this,graph,options));_this44.nbHandles=4;return _this44;}_createClass(ShapePeakIntegration2D,[{key:'createDom',value:function createDom(){this._dom=document.createElementNS(this.graph.ns,'rect');this._dom.element=this;this.createHandles(this.nbHandles,'rect',{transform:"translate(-3 -3)",width:6,height:6,stroke:"black",fill:"white",cursor:'nwse-resize'});}},{key:'redrawImpl',value:function redrawImpl(){this.setPosition();this.setHandles();this.setBindableToDom(this._dom);}}]);return ShapePeakIntegration2D;}(_graphShape2.default);exports.default=ShapePeakIntegration2D;});/***/},/* 36 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(28),__webpack_require__(3)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.shape'),require('../graph.util'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graph);global.graphShapeRect=mod.exports;}})(this,function(exports,_graph,_graph3){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);var util=_interopRequireWildcard(_graph3);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Represents a rectangle that extends the Shape class
	   * @class ShapeRectangle
	   * @augments Shape
	   * @see Graph#newShape
	   */var ShapeRectangle=function(_graph2$default12){_inherits(ShapeRectangle,_graph2$default12);function ShapeRectangle(graph,options){_classCallCheck(this,ShapeRectangle);return _possibleConstructorReturn(this,(ShapeRectangle.__proto__||Object.getPrototypeOf(ShapeRectangle)).call(this,graph,options));}/**
	     * Creates the DOM
	     * @private
	     * @return {Shape} The current shape
	     */_createClass(ShapeRectangle,[{key:'createDom',value:function createDom(){var self=this;this._dom=document.createElementNS(this.graph.ns,'rect');this.setStrokeColor('black');this.setStrokeWidth(1);this.setFillColor('transparent');return this;}/**
	     * Creates the Handles
	     * @private
	     * @return {Shape} The current shape
	     */},{key:'createHandles',value:function createHandles(){if(!this.hasHandles()){return;}/*
	            this._data.handles = this._data.handles ||  {
	              type: 'corners'
	            };
	      */var handles=this.getProp('handles');if((typeof handles==='undefined'?'undefined':_typeof(handles))!="object"){handles={};}if(!handles.type){handles.type="corners";}switch(handles.type){case'sides':util.extend(handles,{sides:{top:true,bottom:true,left:true,right:true}});var j=0;for(var i in handles.sides){if(handles.sides[i]){j++;}}this._createHandles(j,'g').map(function(g){var r=document.createElementNS(self.graph.ns,'rect');r.setAttribute('x','-3');r.setAttribute('width','6');r.setAttribute('y','-6');r.setAttribute('height','12');r.setAttribute('stroke','black');r.setAttribute('fill','white');r.setAttribute('cursor','pointer');g.appendChild(r);});var j=1;for(var i in handles.sides){if(handles.sides[i]){this.handles[i]=this['handle'+j];this.sides[j]=i;j++;}}break;case'corners':this._createHandles(4,'rect',{transform:"translate(-3 -3)",width:6,height:6,stroke:"black",fill:"white"});if(this.handles){this.handles[2].setAttribute('cursor','nesw-resize');this.handles[4].setAttribute('cursor','nesw-resize');this.handles[1].setAttribute('cursor','nwse-resize');this.handles[3].setAttribute('cursor','nwse-resize');}break;}return this;}/**
	     * Updates the position
	     * @memberof ShapeRectangle
	     * @private
	     * @return {Shape} The current shape
	     */},{key:'applyPosition',value:function applyPosition(){var pos=this.computePosition(0),pos2=this.computePosition(1),x,y,width,height;if(pos.x<pos2.x){x=pos.x;width=pos2.x-pos.x;}else{x=pos2.x;width=pos.x-pos2.x;}if(pos.y<pos2.y){y=pos.y;height=pos2.y-pos.y;}else{y=pos2.y;height=pos.y-pos2.y;}this.currentX=x;this.currentY=y;this.currentW=width;this.currentH=height;if(!isNaN(x)&&!isNaN(y)&&x!==false&&y!==false){this.setDom('width',width);this.setDom('height',height);this.setDom('x',x);this.setDom('y',y);this.setHandles();this.updateMask();return true;}return false;}/**
	     * Implements mouse move event
	     * @private
	     * @return {Shape} The current shape
	     */},{key:'handleMouseMoveImpl',value:function handleMouseMoveImpl(e,deltaX,deltaY,deltaXPx,deltaYPx){var handles=this.getProp('handles');if(!this.moving&&!this.handleSelected){return;}var pos=this.getPosition(0);var pos2=this.getPosition(1);var invX=this.getXAxis().isFlipped(),invY=this.getYAxis().isFlipped(),posX=pos.x,posY=pos.y,pos2X=pos2.x,pos2Y=pos2.y;if(this.moving){pos.deltaPosition('x',deltaX,this.getXAxis());pos.deltaPosition('y',deltaY,this.getYAxis());pos2.deltaPosition('x',deltaX,this.getXAxis());pos2.deltaPosition('y',deltaY,this.getYAxis());}else{switch(handles.type){case'sides':// Do nothing for now
switch(this.sides[this.handleSelected]){case'left':pos.deltaPosition('x',deltaX,this.getXAxis());break;case'right':pos2.deltaPosition('x',deltaX,this.getXAxis());break;case'top':pos.deltaPosition('y',deltaY,this.getYAxis());break;case'bottom':pos2.deltaPosition('y',deltaY,this.getYAxis());break;}break;case'corners':default:if(this.handleSelected==1){pos.deltaPosition('x',deltaX,this.getXAxis());pos.deltaPosition('y',deltaY,this.getYAxis());}else if(this.handleSelected==2){pos2.deltaPosition('x',deltaX,this.getXAxis());pos.deltaPosition('y',deltaY,this.getYAxis());}else if(this.handleSelected==3){pos2.deltaPosition('y',deltaY,this.getYAxis());pos2.deltaPosition('x',deltaX,this.getXAxis());}else if(this.handleSelected==4){pos.deltaPosition('x',deltaX,this.getXAxis());pos2.deltaPosition('y',deltaY,this.getYAxis());}break;}}this.redraw();this.changed();this.setHandles();return true;}/**
	     * Places handles properly
	     * @private
	     * @return {Shape} The current shape
	     */},{key:'setHandles',value:function setHandles(){if(this.isLocked()||!this.isSelectable()&&!this._staticHandles){return;}if(!this.handlesInDom){return;}var pos=this.computePosition(0);var pos2=this.computePosition(1);var handles=this.getProp('handles');switch(handles.type){case'sides':if(this.handles.left){this.handles.left.setAttribute('transform','translate('+this.currentX+' '+(this.currentY+this.currentH/2)+')');}if(this.handles.right){this.handles.right.setAttribute('transform','translate( '+(this.currentX+this.currentW)+' '+(this.currentY+this.currentH/2)+')');}if(this.handles.top){this.handles.top.setAttribute('transform','translate( '+(this.currentX+this.currentW/2)+' '+this.currentY+')');}if(this.handles.bottom){this.handles.bottom.setAttribute('transform','translate( '+(this.currentX+this.currentW/2)+' '+(this.currentY+this.currentH)+')');}break;case'corners':default:this.handles[1].setAttribute('x',pos.x);this.handles[1].setAttribute('y',pos.y);this.handles[2].setAttribute('x',pos2.x);this.handles[2].setAttribute('y',pos.y);this.handles[3].setAttribute('x',pos2.x);this.handles[3].setAttribute('y',pos2.y);this.handles[4].setAttribute('x',pos.x);this.handles[4].setAttribute('y',pos2.y);break;}}}]);return ShapeRectangle;}(_graph2.default);exports.default=ShapeRectangle;});/***/},/* 37 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(28)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.shape'));}else{var mod={exports:{}};factory(mod.exports,global.graph);global.graphShapeCross=mod.exports;}})(this,function(exports,_graph){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   *  Displays a cross
	   *  @extends Shape
	   */var ShapeCross=function(_graph2$default13){_inherits(ShapeCross,_graph2$default13);function ShapeCross(graph,options){_classCallCheck(this,ShapeCross);var _this46=_possibleConstructorReturn(this,(ShapeCross.__proto__||Object.getPrototypeOf(ShapeCross)).call(this,graph,options));_this46.nbHandles=1;return _this46;}/**
	     * Width of the cross, also available from the constructor
	     * @type {Number} width
	     */_createClass(ShapeCross,[{key:'createDom',value:function createDom(){this._dom=document.createElementNS(this.graph.ns,'path');this._dom.setAttribute('d','M -'+this.width/2+' 0 h '+this.width+' m -'+this.width/2+' -'+this.width/2+' v '+this.width+'');}},{key:'createHandles',value:function createHandles(){this._createHandles(this.nbHandles,'rect',{transform:"translate(-3 -3)",width:6,height:6,stroke:"black",fill:"white",cursor:'nwse-resize'});}},{key:'applyPosition',value:function applyPosition(){var position=this.calculatePosition(0);if(!position||!position.x||!position.y){return;}this.setDom('transform','translate( '+position.x+', '+position.y+')');this.currentPos1x=position.x;this.currentPos1y=position.y;return true;}},{key:'redrawImpl',value:function redrawImpl(){this.setHandles();}},{key:'handleCreateImpl',value:function handleCreateImpl(){return;}},{key:'handleMouseDownImpl',value:function handleMouseDownImpl(e){this.moving=true;return true;}},{key:'handleMouseUpImpl',value:function handleMouseUpImpl(){this.triggerChange();return true;}},{key:'handleMouseMoveImpl',value:function handleMouseMoveImpl(e,deltaX,deltaY,deltaXPx,deltaYPx){if(this.isLocked()){return;}var pos=this.getFromData('pos');if(this.moving){pos.x=this.graph.deltaPosition(pos.x,deltaX,this.getXAxis());pos.y=this.graph.deltaPosition(pos.y,deltaY,this.getYAxis());}this.redrawImpl();return true;}},{key:'createHandles',value:function createHandles(){this._createHandles(1,'rect',{transform:"translate(-3 -3)",width:6,height:6,stroke:"black",fill:"white",cursor:'nwse-resize'});}},{key:'setHandles',value:function setHandles(){if(!this.areHandlesInDom()){return;}if(isNaN(this.currentPos1x)){return;}this.handles[1].setAttribute('x',this.currentPos1x);this.handles[1].setAttribute('y',this.currentPos1y);}},{key:'selectStyle',value:function selectStyle(){this.setDom('stroke','red');this.setDom('stroke-width','2');}},{key:'width',get:function get(){return this.options.width||10;},set:function set(){var l=arguments.length>0&&arguments[0]!==undefined?arguments[0]:10;this.options.width=l;}}]);return ShapeCross;}(_graph2.default);exports.default=ShapeCross;});/***/},/* 38 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(31)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.shape.line'));}else{var mod={exports:{}};factory(mod.exports,global.graphShape);global.graphShapePeakboundariescenter=mod.exports;}})(this,function(exports,_graphShape){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graphShape2=_interopRequireDefault(_graphShape);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   *  Shows a horizontal line with three little vertical bars. Very useful to demonstrate a peak start, end and middle value
	   *  @extends ShapeLine
	   */var ShapePeakBoundaries=function(_graphShape2$default4){_inherits(ShapePeakBoundaries,_graphShape2$default4);function ShapePeakBoundaries(graph){_classCallCheck(this,ShapePeakBoundaries);var _this47=_possibleConstructorReturn(this,(ShapePeakBoundaries.__proto__||Object.getPrototypeOf(ShapePeakBoundaries)).call(this,graph));_this47.lineHeight=6;return _this47;}_createClass(ShapePeakBoundaries,[{key:'createDom',value:function createDom(){this._dom=document.createElementNS(this.graph.ns,'line');this.line1=document.createElementNS(this.graph.ns,'line');this.line2=document.createElementNS(this.graph.ns,'line');this.line3=document.createElementNS(this.graph.ns,'line');this.rectBoundary=document.createElementNS(this.graph.ns,'path');this.rectBoundary.setAttribute('fill','transparent');this.rectBoundary.setAttribute('stroke','none');this.rectBoundary.setAttribute('pointer-events','fill');this.rectBoundary.jsGraphIsShape=true;this.group.appendChild(this.rectBoundary);this.group.appendChild(this.line1);this.group.appendChild(this.line2);this.group.appendChild(this.line3);this._dom.element=this;}},{key:'createHandles',value:function createHandles(){this._createHandles(3,'rect',{transform:"translate(-3 -3)",width:6,height:6,stroke:"black",fill:"white",cursor:'nwse-resize'});}},{key:'redrawImpl',value:function redrawImpl(){this.line1.setAttribute('stroke',this.getStrokeColor());this.line2.setAttribute('stroke',this.getStrokeColor());this.line3.setAttribute('stroke',this.getStrokeColor());this.line1.setAttribute('stroke-width',this.getStrokeWidth());this.line2.setAttribute('stroke-width',this.getStrokeWidth());this.line3.setAttribute('stroke-width',this.getStrokeWidth());this.setHandles();this.redrawLines();}/**
	     * @memberof ShapePeakBoundaries
	     * Redraws the vertical lines according to the positions.
	     * Position 0 is the left line, position 1 is the right line and position 2 is the center line
	     * @returns {ShapePeakBoundaries} The shape instance
	     */},{key:'redrawLines',value:function redrawLines(){var posLeft=this.computePosition(0);var posRight=this.computePosition(1);var posCenter=this.computePosition(2);if(posLeft.x&&posRight.x&&posCenter.x&&this.posYPx){var height=this.lineHeight;this.rectBoundary.setAttribute('d','M '+posLeft.x+' '+(this.posYPx-height)+' v '+2*height+' H '+posRight.x+" v "+-2*height+"z");this.line1.setAttribute('x1',posLeft.x);this.line1.setAttribute('x2',posLeft.x);this.line2.setAttribute('x1',posRight.x);this.line2.setAttribute('x2',posRight.x);this.line3.setAttribute('x1',posCenter.x);this.line3.setAttribute('x2',posCenter.x);this._dom.setAttribute('x1',posLeft.x);this._dom.setAttribute('x2',posRight.x);this.redrawY(height);}return this;}/**
	     * @memberof ShapePeakBoundaries
	     * Redraws the vertical positions of the shape
	     * @returns {ShapePeakBoundaries} The shape instance
	     */},{key:'redrawY',value:function redrawY(){if(!this.posYPx){return this;}var height=this.lineHeight;this.line1.setAttribute('y1',this.posYPx-height);this.line1.setAttribute('y2',this.posYPx+height);this.line2.setAttribute('y1',this.posYPx-height);this.line2.setAttribute('y2',this.posYPx+height);this.line3.setAttribute('y1',this.posYPx-height);this.line3.setAttribute('y2',this.posYPx+height);this._dom.setAttribute('y1',this.posYPx);this._dom.setAttribute('y2',this.posYPx);return this;}},{key:'setHandles',value:function setHandles(){if(!this.posYPx){return;}var posLeft=this.computePosition(0);var posRight=this.computePosition(1);var posCenter=this.computePosition(2);if(posLeft.x&&posRight.x&&posCenter.x){this.handles[1].setAttribute('x',posLeft.x);this.handles[1].setAttribute('y',this.posYPx);this.handles[2].setAttribute('x',posRight.x);this.handles[2].setAttribute('y',this.posYPx);this.handles[3].setAttribute('x',posCenter.x);this.handles[3].setAttribute('y',this.posYPx);}}/**
	     * @memberof ShapePeakBoundaries
	     * Sets the y position of the shape
	     * @param {Number} y - The y position in px
	     * @returns {ShapePeakBoundaries} The shape instance
	     */},{key:'setY',value:function setY(y){this.posYPx=y;return this;}/**
	     * @memberof ShapePeakBoundaries
	     * Sets the height of the peak lines
	     * @param {Number} height - The height of the lines in px
	     * @returns {ShapePeakBoundaries} The shape instance
	     */},{key:'setLineHeight',value:function setLineHeight(height){this.lineHeihgt=height;}},{key:'handleMouseMoveImpl',value:function handleMouseMoveImpl(e,deltaX,deltaY){if(this.isLocked()){return;}var posLeft=this.getPosition(0);var posRight=this.getPosition(1);var posCenter=this.getPosition(2);switch(this.handleSelected){case 1:// left
posLeft.deltaPosition('x',deltaX,this.getXAxis());if(Math.abs(posCenter.x-posRight.x)>Math.abs(posRight.x-posLeft.x)||Math.abs(posCenter.x-posLeft.x)>Math.abs(posRight.x-posLeft.x)){posCenter.x=posLeft.x+(posRight.x-posLeft.x)*0.1;}break;case 2:// left
posRight.deltaPosition('x',deltaX,this.getXAxis());if(Math.abs(posCenter.x-posRight.x)>Math.abs(posRight.x-posLeft.x)||Math.abs(posCenter.x-posLeft.x)>Math.abs(posRight.x-posLeft.x)){posCenter.x=posRight.x+(posLeft.x-posRight.x)*0.1;}break;case 3:// left
posCenter.deltaPosition('x',deltaX,this.getXAxis());if(Math.abs(posCenter.x-posRight.x)>Math.abs(posRight.x-posLeft.x)||Math.abs(posCenter.x-posLeft.x)>Math.abs(posRight.x-posLeft.x)){return;}break;}this.setLabelPosition({y:this.getLabelPosition(0).y,x:posCenter.x});this.updateLabels();this.redrawLines();this.setHandles();}},{key:'applyPosition',value:function applyPosition(){this.redrawLines();return true;}}]);return ShapePeakBoundaries;}(_graphShape2.default);exports.default=ShapePeakBoundaries;});/***/},/* 39 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(3),__webpack_require__(28)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('../graph.util'),require('./graph.shape'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graph);global.graphShapeHtml=mod.exports;}})(this,function(exports,_graph,_graph2){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph3=_interopRequireDefault(_graph2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Represents a line
	   * @extends Shape
	   * @see Graph#newShape
	   */var ShapeHTML=function(_graph3$default){_inherits(ShapeHTML,_graph3$default);function ShapeHTML(graph,options){_classCallCheck(this,ShapeHTML);return _possibleConstructorReturn(this,(ShapeHTML.__proto__||Object.getPrototypeOf(ShapeHTML)).call(this,graph,options));}/**
	     * Creates the DOM
	     * @private
	     * @return {Shape} The current shape
	     */_createClass(ShapeHTML,[{key:'createDom',value:function createDom(){this._dom=document.createElementNS(this.graph.ns,'foreignObject');//  this._dom.setAttribute( "requiredExtensions", "http://www.w3.org/1999/xhtml" );
var div=document.createElement("div");this._dom.appendChild(div);this.div=div;}/**
	     * Creates the handles
	     * @private
	     * @return {Shape} The current shape
	     */},{key:'createHandles',value:function createHandles(){}},{key:'setHeight',value:function setHeight(height){this.setProp('height',height);}},{key:'setWidth',value:function setWidth(width){this.setProp('width',width);}},{key:'setContent',value:function setContent(content){this.setProp('content',content);}},{key:'setRenderer',value:function setRenderer(method){this._renderer=method;}},{key:'redraw',value:function redraw(){if(this._renderer){this._renderer(this.div);}else{this.div.innerHTML=this.getProp('content');}_get(ShapeHTML.prototype.__proto__||Object.getPrototypeOf(ShapeHTML.prototype),'redraw',this).apply(this,arguments);}/**
	     * Recalculates the positions and applies them
	     * @private
	     * @return {Boolean} Whether the shape should be redrawn
	     */},{key:'applyPosition',value:function applyPosition(){this.setDom("width",this.getProp("width"));this.setDom("height",this.getProp("height"));var position=this.calculatePosition(0);if(!position||!(0,_graph.isNumeric)(position.x)||!(0,_graph.isNumeric)(position.y)){return;}this.setDom('x',position.x);this.setDom('y',position.y);this.currentPosX=position.x;this.currentPosY=position.y;return true;}/**
	     * Handles mouse move events
	     * @private
	     */},{key:'handleMouseMoveImpl',value:function handleMouseMoveImpl(e,deltaX,deltaY,deltaXPx,deltaYPx){if(this.isLocked()){return;}var posToChange=this.getPosition(0);if(posToChange){if(!this._data.vertical){posToChange.deltaPosition('x',deltaX,this.getXAxis());}if(!this._data.horizontal){posToChange.deltaPosition('y',deltaY,this.getYAxis());}}if(this.moving){// If the pos2 is defined by a delta, no need to move them
if(pos.x){pos.deltaPosition('x',deltaX,this.getXAxis());}if(pos.y){pos.deltaPosition('y',deltaY,this.getYAxis());}// If the pos2 is defined by a delta, no need to move them
if(pos2.x){pos2.deltaPosition('x',deltaX,this.getXAxis());}if(pos2.y){pos2.deltaPosition('y',deltaY,this.getYAxis());}}this.redraw();this.changed();this.setHandles();return true;}/**
	     * Sets the handle position
	     * @private
	     */},{key:'setHandles',value:function setHandles(){if(!this.areHandlesInDom()){return;}if(isNaN(this.currentPos1x)){return;}}}]);return ShapeHTML;}(_graph3.default);exports.default=ShapeHTML;});/***/},/* 40 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(4)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('../dependencies/eventEmitter/EventEmitter'));}else{var mod={exports:{}};factory(mod.exports,global.EventEmitter);global.graphPlugin=mod.exports;}})(this,function(exports,_EventEmitter){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _EventEmitter2=_interopRequireDefault(_EventEmitter);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Represents a plugin
	   * @interface
	   */var Plugin=function(_EventEmitter2$defaul5){_inherits(Plugin,_EventEmitter2$defaul5);_createClass(Plugin,null,[{key:'defaults',value:function defaults(){return{};}}]);function Plugin(options){_classCallCheck(this,Plugin);var _this49=_possibleConstructorReturn(this,(Plugin.__proto__||Object.getPrototypeOf(Plugin)).apply(this,arguments));_this49.options=options;return _this49;}/**
	     * Init function called by jsGraph on load
	     */_createClass(Plugin,[{key:'init',value:function init(graph){this.graph=graph;}/**
	     * Handles the mousedown event from jsGraph
	     * @param {Graph} graph - The graph instance
	     * @param {Number} x - The x position in px
	     * @param {Number} y - The y position in px
	     * @param {Event} e - The original event
	     * @param {SVGElement} target - The target element
	     */},{key:'onMouseDown',value:function onMouseDown(){}/**
	     * Handles the mouseup event from jsGraph
	     * @param {Graph} graph - The graph instance
	     * @param {Number} x - The x position in px
	     * @param {Number} y - The y position in px
	     * @param {Event} e - The original event
	     * @param {SVGElement} target - The target element
	     */},{key:'onMouseUp',value:function onMouseUp(){}/**
	     * Handles the mousemove event from jsGraph
	     * @param {Graph} graph - The graph instance
	     * @param {Number} x - The x position in px
	     * @param {Number} y - The y position in px
	     * @param {Event} e - The original event
	     * @param {SVGElement} target - The target element
	     */},{key:'onMouseMove',value:function onMouseMove(){}}]);return Plugin;}(_EventEmitter2.default);exports.default=Plugin;});/***/},/* 41 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(40)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require("./graph.plugin"));}else{var mod={exports:{}};factory(mod.exports,global.graph);global.graphPluginDrag=mod.exports;}})(this,function(exports,_graph){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * Constructor for the drag plugin. Do not use this constructor directly.
	   * @class PluginDrag
	   * @implements Plugin
	   */var PluginDrag=function(_graph2$default14){_inherits(PluginDrag,_graph2$default14);function PluginDrag(){_classCallCheck(this,PluginDrag);return _possibleConstructorReturn(this,(PluginDrag.__proto__||Object.getPrototypeOf(PluginDrag)).apply(this,arguments));}_createClass(PluginDrag,[{key:'init',/**
	     * @private
	     */value:function init(graph){this.graph=graph;this.time=null;this.totaltime=2000;}/**
	     * @private
	     */},{key:'onMouseDown',value:function onMouseDown(graph,x,y,e,target){this._draggingX=x;this._draggingY=y;this._lastDraggingX=this._draggingX;this._lastDraggingY=this._draggingY;this.stopAnimation=true;this.moved=false;return true;}/**
	     * @memberof PluginDrag
	     * @private
	     */},{key:'onMouseMove',value:function onMouseMove(graph,x,y,e,target){var deltaX=x-this._draggingX;var deltaY=y-this._draggingY;if(this.options.dragX){graph._applyToAxes(function(axis){axis.setCurrentMin(axis.getVal(axis.getMinPx()-deltaX));axis.setCurrentMax(axis.getVal(axis.getMaxPx()-deltaX));},false,true,false);}if(this.options.dragY){graph._applyToAxes(function(axis){axis.setCurrentMin(axis.getVal(axis.getMinPx()-deltaY));axis.setCurrentMax(axis.getVal(axis.getMaxPx()-deltaY));},false,false,true);}this._lastDraggingX=this._draggingX;this._lastDraggingY=this._draggingY;this._draggingX=x;this._draggingY=y;this.moved=true;this.time=Date.now();this.emit("dragging");graph.draw(true);}},{key:'onMouseUp',value:function onMouseUp(graph,x,y,e,target){var dt=Date.now()-this.time;if(x==this._lastDraggingX||y==this._lastDraggingY){if(this.moved){this.emit("dragged");}return;}this.speedX=(x-this._lastDraggingX)/dt;this.speedY=(y-this._lastDraggingY)/dt;if(isNaN(this.speedX)||isNaN(this.speedY)){this.emit("dragged");return;}graph._applyToAxes(function(axis){axis._pluginDragMin=axis.getCurrentMin();axis._pluginDragMax=axis.getCurrentMax();},false,true,true);this.stopAnimation=false;this.accelerationX=-this.speedX/this.totaltime;this.accelerationY=-this.speedY/this.totaltime;if(this.options.persistanceX||this.options.persistanceY){this._persistanceMove(graph);}else{this.emit("dragged");}}},{key:'_persistanceMove',value:function _persistanceMove(graph){var self=this;if(self.stopAnimation){self.emit("dragged");return;}window.requestAnimationFrame(function(){var dt=Date.now()-self.time;var dx=(0.5*self.accelerationX*dt+self.speedX)*dt;var dy=(0.5*self.accelerationY*dt+self.speedY)*dt;if(self.options.persistanceX){graph._applyToAxes(function(axis){axis.setCurrentMin(-axis.getRelVal(dx)+axis._pluginDragMin);axis.setCurrentMax(-axis.getRelVal(dx)+axis._pluginDragMax);axis.cacheCurrentMin();axis.cacheCurrentMax();axis.cacheInterval();},false,true,false);}if(self.options.persistanceY){graph._applyToAxes(function(axis){axis.setCurrentMin(-axis.getRelVal(dy)+axis._pluginDragMin);axis.setCurrentMax(-axis.getRelVal(dy)+axis._pluginDragMax);axis.cacheCurrentMin();axis.cacheCurrentMax();axis.cacheInterval();},false,false,true);}graph.draw();if(dt<self.totaltime){self.emit("dragging");self._persistanceMove(graph);}else{self.emit("dragged");}});}}],[{key:'defaults',value:function defaults(){return{dragX:true,dragY:true,persistanceX:false,persistanceY:false};}}]);return PluginDrag;}(_graph2.default);exports.default=PluginDrag;});/***/},/* 42 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(40),__webpack_require__(3)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.plugin'),require('../graph.util'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graph);global.graphPluginShape=mod.exports;}})(this,function(exports,_graph,_graph3){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);var util=_interopRequireWildcard(_graph3);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * @class PluginShape
	   * @implements Plugin
	   */var PluginShape=function(_graph2$default15){_inherits(PluginShape,_graph2$default15);function PluginShape(){_classCallCheck(this,PluginShape);return _possibleConstructorReturn(this,(PluginShape.__proto__||Object.getPrototypeOf(PluginShape)).apply(this,arguments));}/**
	     * Init method
	     * @private
	     */_createClass(PluginShape,[{key:'init',value:function init(graph,options){_get(PluginShape.prototype.__proto__||Object.getPrototypeOf(PluginShape.prototype),'init',this).call(this,graph,options);this.shapeType=options.type;}/**
	     * Sets the shape that is created by the plugin
	     * @param {String} shapeType - The type of the shape
	     */},{key:'setShape',value:function setShape(shapeType){this.shapeInfo.shapeType=shapeType;}/**
	     * @private
	     */},{key:'onMouseDown',value:function onMouseDown(graph,x,y,e,target){if(!this.shapeType&&!this.options.url){return;}var self=this,selfPlugin=this;var xVal,yVal;this.count=this.count||0;x-=graph.getPaddingLeft();y-=graph.getPaddingTop();xVal=graph.getXAxis().getVal(x);yVal=graph.getYAxis().getVal(y);var shapeInfo={position:[{x:xVal,y:yVal},{x:xVal,y:yVal}],onChange:function onChange(newData){graph.triggerEvent('onAnnotationChange',newData);},locked:false,selectable:true,resizable:true,movable:true};util.extend(true,shapeInfo,this.options);this.emit("beforeNewShape",shapeInfo,e);if(this.graph.prevent(false)){return;}var shape=graph.newShape(shapeInfo.type,shapeInfo);this.emit("createdShape",shape,e);if(shape){self.currentShape=shape;self.currentShapeEvent=e;}graph.once("mouseUp",function(){self.emit("newShape",shape);});}/**
	     * @private
	     */},{key:'onMouseMove',value:function onMouseMove(graph,x,y,e){var self=this;if(self.currentShape){self.count++;var shape=self.currentShape;self.currentShape=false;if(graph.selectedSerie){shape.setSerie(graph.selectedSerie);}shape.resizing=true;if(shape.options&&shape.options.onCreate){shape.options.onCreate.call(shape);}shape.draw();graph.selectShape(shape);shape.handleMouseDown(self.currentShapeEvent,true);shape.handleSelected=1;shape.handleMouseMove(e,true);}}/**
	     * @private
	     */},{key:'onMouseUp',value:function onMouseUp(){var self=this;if(self.currentShape){// No need to kill it as it hasn't been actually put in the dom right now
//self.currentShape.kill();
self.currentShape=false;}}}]);return PluginShape;}(_graph2.default);exports.default=PluginShape;});/***/},/* 43 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(3),__webpack_require__(40)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('../graph.util'),require('./graph.plugin'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graph);global.graphPluginSelectScatter=mod.exports;}})(this,function(exports,_graph,_graph2){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var util=_interopRequireWildcard(_graph);var _graph3=_interopRequireDefault(_graph2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}/**
	   * @extends Plugin
	   */var PluginSelectScatter=function(_graph3$default2){_inherits(PluginSelectScatter,_graph3$default2);function PluginSelectScatter(){_classCallCheck(this,PluginSelectScatter);return _possibleConstructorReturn(this,(PluginSelectScatter.__proto__||Object.getPrototypeOf(PluginSelectScatter)).apply(this,arguments));}/**
	     * Init method
	     * @private
	     */_createClass(PluginSelectScatter,[{key:'init',value:function init(graph,options){this._path=document.createElementNS(graph.ns,'path');util.setAttributeTo(this._path,{'display':'none','fill':'rgba(0,0,0,0.1)','stroke':'rgba(0,0,0,1)','shape-rendering':'crispEdges','x':0,'y':0,'height':0,'width':0,'d':''});this.graph=graph;graph.dom.appendChild(this._path);}/**
	     * Assigns the scatter serie that should be selected to the plugin
	     * @param {ScatterSerie} serie - The serie
	     * @return {PluginSelectScatter} The current plugin instance
	     */},{key:'setSerie',value:function setSerie(serie){this.serie=serie;}/**
	     * @private
	     */},{key:'onMouseDown',value:function onMouseDown(graph,x,y,e,mute){if(!this.serie){return;}this.path='M '+x+' '+y+' ';this.currentX=x;this.currentY=y;this.xs=[this.serie.getXAxis().getVal(x-graph.getPaddingLeft())];this.ys=[this.serie.getYAxis().getVal(y-graph.getPaddingTop())];this._path.setAttribute('d','');this._path.setAttribute('display','block');}/**
	     * @private
	     */},{key:'onMouseMove',value:function onMouseMove(graph,x,y,e,mute){if(Math.pow(x-this.currentX,2)+Math.pow(y-this.currentY,2)>25){this.path+=" L "+x+" "+y+" ";this.currentX=x;this.currentY=y;this.xs.push(this.serie.getXAxis().getVal(x-graph.getPaddingLeft()));this.ys.push(this.serie.getYAxis().getVal(y-graph.getPaddingTop()));this._path.setAttribute('d',this.path+" z");this.findPoints();}}/**
	     * @private
	     */},{key:'findPoints',value:function findPoints(){var data=this.serie.data;var selected=[];var counter=0,j2;for(var i=0,l=data.length;i<l;i+=2){counter=0;for(var j=0,k=this.xs.length;j<k;j+=1){if(j==k-1){j2=0;}else{j2=j+1;}if(this.ys[j]<data[i+1]&&this.ys[j2]>data[i+1]||this.ys[j]>data[i+1]&&this.ys[j2]<data[i+1]){if(data[i]>(data[i+1]-this.ys[j])/(this.ys[j2]-this.ys[j])*(this.xs[j2]-this.xs[j])+this.xs[j]){counter++;}}}if(counter%2==1){selected.push(i/2);this.serie.selectPoint(i/2,true,"selected");}else{this.serie.unselectPoint(i/2);}}this.selected=selected;this.emit("selectionProcess",selected);}/**
	     * @private
	     */},{key:'onMouseUp',value:function onMouseUp(graph,x,y,e){this._path.setAttribute('display','none');this.emit("selectionEnd",this.selected);}}]);return PluginSelectScatter;}(_graph3.default);exports.default=PluginSelectScatter;});/***/},/* 44 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(3),__webpack_require__(40)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('../graph.util'),require('./graph.plugin'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graph);global.graphPluginZoom=mod.exports;}})(this,function(exports,_graph,_graph2){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var util=_interopRequireWildcard(_graph);var _graph3=_interopRequireDefault(_graph2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}/**
	   * @class PluginZoom
	   * @implements Plugin
	   */var PluginZoom=function(_graph3$default3){_inherits(PluginZoom,_graph3$default3);function PluginZoom(){_classCallCheck(this,PluginZoom);return _possibleConstructorReturn(this,(PluginZoom.__proto__||Object.getPrototypeOf(PluginZoom)).apply(this,arguments));}_createClass(PluginZoom,[{key:'init',/**
	     * Init method
	     * @private
	     */value:function init(graph,options){this._zoomingGroup=document.createElementNS(graph.ns,'g');this._zoomingSquare=document.createElementNS(graph.ns,'rect');this._zoomingSquare.setAttribute('display','none');util.setAttributeTo(this._zoomingSquare,{'display':'none','fill':'rgba(171,12,12,0.2)','stroke':'rgba(171,12,12,1)','shape-rendering':'crispEdges','x':0,'y':0,'height':0,'width':0,'pointer-events':'none'});this.graph=graph;graph.groupEvent.appendChild(this._zoomingGroup);this._zoomingGroup.appendChild(this._zoomingSquare);}/**
	     * @private
	     */},{key:'onMouseDown',value:function onMouseDown(graph,x,y,e,mute){var zoomMode=this.options.zoomMode;if(!zoomMode){return;}this._zoomingMode=zoomMode;if(x===undefined){this._backedUpZoomMode=this._zoomingMode;this._zoomingMode='y';x=0;}if(y===undefined){this._backedUpZoomMode=this._zoomingMode;this._zoomingMode='x';y=0;}this._zoomingXStart=x;this._zoomingYStart=y;this.x1=x-graph.getPaddingLeft();this.y1=y-graph.getPaddingTop();this._zoomingSquare.setAttribute('width',0);this._zoomingSquare.setAttribute('height',0);this._zoomingSquare.setAttribute('display','block');switch(this._zoomingMode){case'x':this._zoomingSquare.setAttribute('y',graph.options.paddingTop);this._zoomingSquare.setAttribute('height',graph.getDrawingHeight()-graph.shift.bottom);break;case'y':this._zoomingSquare.setAttribute('x',graph.options.paddingLeft/* + this.shift[1]*/);this._zoomingSquare.setAttribute('width',graph.getDrawingWidth()/* - this.shift[1] - this.shift[2]*/);break;case'forceY2':this.y2=graph.getYAxis().getPx(this.options.forcedY)+graph.options.paddingTop;break;}if(this.options.onZoomStart&&!mute){this.options.onZoomStart(graph,x,y,e,mute);}}/**
	     * @private
	     */},{key:'onMouseMove',value:function onMouseMove(graph,x,y,e,mute){//	this._zoomingSquare.setAttribute('display', 'none');
//	this._zoomingSquare.setAttribute('transform', 'translate(' + Math.random() + ', ' + Math.random() + ') scale(10, 10)');
switch(this._zoomingMode){case'xy':this._zoomingSquare.setAttribute('x',Math.min(this._zoomingXStart,x));this._zoomingSquare.setAttribute('y',Math.min(this._zoomingYStart,y));this._zoomingSquare.setAttribute('width',Math.abs(this._zoomingXStart-x));this._zoomingSquare.setAttribute('height',Math.abs(this._zoomingYStart-y));break;case'forceY2':this._zoomingSquare.setAttribute('y',Math.min(this._zoomingYStart,this.y2));this._zoomingSquare.setAttribute('height',Math.abs(this._zoomingYStart-this.y2));this._zoomingSquare.setAttribute('x',Math.min(this._zoomingXStart,x));this._zoomingSquare.setAttribute('width',Math.abs(this._zoomingXStart-x));break;case'x':this._zoomingSquare.setAttribute('x',Math.min(this._zoomingXStart,x));this._zoomingSquare.setAttribute('width',Math.abs(this._zoomingXStart-x));break;case'y':this._zoomingSquare.setAttribute('y',Math.min(this._zoomingYStart,y));this._zoomingSquare.setAttribute('height',Math.abs(this._zoomingYStart-y));break;}if(this.options.onZoomMove&&!mute){this.options.onZoomMove(graph,x,y,e,mute);}//		this._zoomingSquare.setAttribute('display', 'block');
}/**
	     * @private
	     */},{key:'onMouseUp',value:function onMouseUp(graph,x,y,e,mute){var self=this;this.removeZone();var _x=x-graph.options.paddingLeft;var _y=y-graph.options.paddingTop;if(x-this._zoomingXStart==0&&this._zoomingMode!='y'||y-this._zoomingYStart==0&&this._zoomingMode!='x'){return;}graph.cancelClick=true;if(this.options.transition||this.options.smooth){var modeX=false,modeY=false;if(this._zoomingMode=='x'||this._zoomingMode=='xy'||this._zoomingMode=='forceY2'){this.fullX=false;this.toAxes(function(axis){axis._pluginZoomMin=axis.getCurrentMin();axis._pluginZoomMax=axis.getCurrentMax();axis._pluginZoomMinFinal=Math.min(axis.getVal(_x),axis.getVal(self.x1));axis._pluginZoomMaxFinal=Math.max(axis.getVal(_x),axis.getVal(self.x1));},false,true,false);modeX=true;}if(this._zoomingMode=='y'||this._zoomingMode=='xy'){this.fullY=false;this.toAxes(function(axis){axis._pluginZoomMin=axis.getCurrentMin();axis._pluginZoomMax=axis.getCurrentMax();axis._pluginZoomMinFinal=Math.min(axis.getVal(_y),axis.getVal(self.y1));axis._pluginZoomMaxFinal=Math.max(axis.getVal(_y),axis.getVal(self.y1));},false,false,true);modeY=true;}if(this._zoomingMode=='forceY2'){this.fullY=false;this.toAxes(function(axis){axis._pluginZoomMin=axis.getCurrentMin();axis._pluginZoomMax=axis.getCurrentMax();axis._pluginZoomMinFinal=Math.min(axis.getVal(self.y2),axis.getVal(self.y1));axis._pluginZoomMaxFinal=Math.max(axis.getVal(self.y2),axis.getVal(self.y1));},false,false,true);modeY=true;}this.transition(modeX,modeY,"zoomEnd");}else{switch(this._zoomingMode){case'x':this.fullX=false;this.toAxes('_doZoom',[_x,this.x1],true,false);break;case'y':this.fullY=false;this.toAxes('_doZoom',[_y,this.y1],false,true);break;case'xy':this.fullX=false;this.fullY=false;this.toAxes('_doZoom',[_x,this.x1],true,false);this.toAxes('_doZoom',[_y,this.y1],false,true);break;case'forceY2':this.fullX=false;this.fullY=false;this.toAxes('_doZoom',[_x,this.x1],true,false);this.toAxes('_doZoom',[this.y1,this.y2],false,true);break;}graph.prevent(true);graph.draw();if(this._backedUpZoomMode){this._zoomingMode=this._backedUpZoomMode;}this.emit("zoomed");graph.pluginYieldActiveState();}}/**
	     * @private
	     */},{key:'removeZone',value:function removeZone(){this._zoomingSquare.setAttribute('display','none');}/**
	     * @private
	     */},{key:'onMouseWheel',value:function onMouseWheel(delta,e,options){if(!options){options={};}if(!options.baseline){options.baseline=0;}/*var serie;
	      if ( ( serie = this.graph.getSelectedSerie() ) ) {
	         if ( serie.getYAxis().handleMouseWheel( delta, e ) ) {
	          return;
	        }
	      }*/var doX=options.direction=='x';var doY=!(options.direction!=='y');this.toAxes('handleMouseWheel',[delta,e,options.baseline],doX,doY);this.graph.drawSeries();}/**
	     * @private
	     */},{key:'onDblClick',value:function onDblClick(x,y,e,pref,mute){var graph=this.graph;this.emit("beforeDblClick",{graph:graph,x:x,y:y,pref:pref,e:e,mute:mute});if(graph.prevent(false)){return;}if(this.options.transition||this.options.smooth){var modeX=false,modeY=false;if(pref.mode=='xtotal'||pref.mode=='total'){this.toAxes(function(axis){axis._pluginZoomMin=axis.getCurrentMin();axis._pluginZoomMax=axis.getCurrentMax();axis._pluginZoomMinFinal=axis.getMinValue()-axis.options.axisDataSpacing.min*axis.getInterval();axis._pluginZoomMaxFinal=axis.getMaxValue()+axis.options.axisDataSpacing.max*axis.getInterval();},false,true,false);modeX=true;}if(pref.mode=='ytotal'||pref.mode=='total'){this.toAxes(function(axis){axis._pluginZoomMin=axis.getCurrentMin();axis._pluginZoomMax=axis.getCurrentMax();axis._pluginZoomMinFinal=axis.getMinValue()-axis.options.axisDataSpacing.min*axis.getInterval();axis._pluginZoomMaxFinal=axis.getMaxValue()+axis.options.axisDataSpacing.max*axis.getInterval();},false,false,true);modeY=true;}if(pref.mode=='gradualX'||pref.mode=='gradualY'||pref.mode=='gradual'||pref.mode=='gradualXY'){var x=false,y=false;if(pref.mode=='gradualX'||pref.mode=='gradual'||pref.mode=='gradualXY'){x=true;modeX=true;}if(pref.mode=='gradualY'||pref.mode=='gradual'||pref.mode=='gradualXY'){y=true;modeY=true;}this.toAxes(function(axis){axis._pluginZoomMin=axis.getCurrentMin();axis._pluginZoomMax=axis.getCurrentMax();axis._pluginZoomMinFinal=axis.getCurrentMin()-(axis.getCurrentMax()-axis.getCurrentMin());axis._pluginZoomMaxFinal=axis.getCurrentMax()+(axis.getCurrentMax()-axis.getCurrentMin());},false,x,y);}this.transition(modeX,modeY,"dblClick");return;}var xAxis=this.graph.getXAxis(),yAxis=this.graph.getYAxis();if(pref.mode=='xtotal'){this.toAxes("setMinMaxToFitSeries",null,true,false);this.fullX=true;this.fullY=false;}else if(pref.mode=='ytotal'){this.toAxes("setMinMaxToFitSeries",null,false,true);this.fullX=false;this.fullY=true;}else if(pref.mode=='total'){this.toAxes("setMinMaxToFitSeries",null,true,true);this.fullX=true;this.fullY=true;// Nothing to do here
/*        this.graph._applyToAxes( function( axis ) {
	             axis.emit( 'zoom', axis.currentAxisMin, axis.currentAxisMax, axis );
	           }, null, true, true );
	        */}else{x-=this.graph.options.paddingLeft;y-=this.graph.options.paddingTop;var xMin=xAxis.getCurrentMin(),xMax=xAxis.getCurrentMax(),xActual=xAxis.getVal(x),diffX=xMax-xMin,yMin=yAxis.getCurrentMin(),yMax=yAxis.getCurrentMax(),yActual=yAxis.getVal(y),diffY=yMax-yMin;if(pref.mode=='gradualXY'||pref.mode=='gradualX'){var ratio=(xActual-xMin)/(xMax-xMin);xMin=Math.max(xAxis.getMinValue(),xMin-diffX*ratio);xMax=Math.min(xAxis.getMaxValue(),xMax+diffX*(1-ratio));xAxis.setCurrentMin(xMin);xAxis.setCurrentMax(xMax);if(xAxis.options.onZoom){xAxis.options.onZoom(xMin,xMax);}xAxis.cacheCurrentMin();xAxis.cacheCurrentMax();xAxis.cacheInterval();}if(pref.mode=='gradualXY'||pref.mode=='gradualY'){var ratio=(yActual-yMin)/(yMax-yMin);yMin=Math.max(yAxis.getMinValue(),yMin-diffY*ratio);yMax=Math.min(yAxis.getMaxValue(),yMax+diffY*(1-ratio));yAxis.setCurrentMin(yMin);yAxis.setCurrentMax(yMax);if(yAxis.options.onZoom){yAxis.options.onZoom(yMin,yMax);}yAxis.cacheCurrentMin();yAxis.cacheCurrentMax();yAxis.cacheInterval();}}graph.pluginYieldActiveState();this.graph.draw();/*
	          this.emit( "dblClick", {
	            graph: graph,
	            x: x,
	            y: y,
	            pref: pref,
	            e: e,
	            mute: mute
	          } );
	           if ( this.options.onDblClick && !mute ) {
	            this.options.onDblClick( graph, x, y, e, mute );
	          }*/}},{key:'transition',value:function transition(modeX,modeY,eventName){var self=this,maxTime=500;if(!self.gradualUnzoomStart){self.gradualUnzoomStart=Date.now();}window.requestAnimationFrame(function(){var dt=Date.now()-self.gradualUnzoomStart;if(dt>maxTime){dt=maxTime;}var progress=Math.sin(dt/maxTime*Math.PI/2);self.toAxes(function(axis){axis.setCurrentMin(axis._pluginZoomMin+(axis._pluginZoomMinFinal-axis._pluginZoomMin)*progress);axis.setCurrentMax(axis._pluginZoomMax+(axis._pluginZoomMaxFinal-axis._pluginZoomMax)*progress);axis.cacheCurrentMin();axis.cacheCurrentMax();axis.cacheInterval();},false,modeX,modeY);self.graph.draw();if(dt<maxTime){self.transition(modeX,modeY,eventName);self.emit("zooming");}else{self.emit("zoomed");self.graph.pluginYieldActiveState();if(eventName){self.emit(eventName);}self.gradualUnzoomStart=0;}});}},{key:'isFullX',value:function isFullX(){return this.fullX;}},{key:'isFullY',value:function isFullY(){return this.fullY;}},{key:'toAxes',value:function toAxes(func,params,tb,lr){var axes=this.options.axes;if(!axes||axes=='serieSelected'&&!this.graph.getSelectedSerie()){axes='all';}switch(axes){case'all':this.graph._applyToAxes.apply(this.graph,arguments);break;case'serieSelected':var serie=this.graph.getSelectedSerie();if(serie){if(tb){if(typeof func=="string"){serie.getXAxis()[func].apply(serie.getXAxis(),params);}else{func.apply(serie.getXAxis(),params);}}if(lr){if(typeof func=="string"){serie.getYAxis()[func].apply(serie.getYAxis(),params);}else{func.apply(serie.getYAxis(),params);}}}break;default:if(!Array.isArray(axes)){axes=[axes];}var _iteratorNormalCompletion8=true;var _didIteratorError8=false;var _iteratorError8=undefined;try{for(var _iterator8=axes[Symbol.iterator](),_step8;!(_iteratorNormalCompletion8=(_step8=_iterator8.next()).done);_iteratorNormalCompletion8=true){var axis=_step8.value;if(axis.isX()&&tb){// Not the best check
if(typeof func=="string"){axis[func].apply(axis,params);}else{func.apply(axis,params);}}else if(axis.isY()&&lr){// Not the best check
if(typeof func=="string"){axis[func].apply(axis,params);}else{func.apply(axis,params);}}}}catch(err){_didIteratorError8=true;_iteratorError8=err;}finally{try{if(!_iteratorNormalCompletion8&&_iterator8.return){_iterator8.return();}}finally{if(_didIteratorError8){throw _iteratorError8;}}}break;}}}],[{key:'defaults',value:function defaults(){return{"axes":"all"};}}]);return PluginZoom;}(_graph3.default);exports.default=PluginZoom;});/***/},/* 45 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(1),__webpack_require__(46),__webpack_require__(40),__webpack_require__(3)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('../graph.core'),require('../graph.lru'),require('./graph.plugin'),require('../graph.util'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graph,global.graph,global.graph);global.graphPluginTimeseriemanager=mod.exports;}})(this,function(exports,_graph,_graph3,_graph5,_graph7){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);var _graph4=_interopRequireDefault(_graph3);var _graph6=_interopRequireDefault(_graph5);var util=_interopRequireWildcard(_graph7);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * @class PluginTimeSerieManager
	   * @implements Plugin
	   */var PluginTimeSerieManager=function(_graph6$default){_inherits(PluginTimeSerieManager,_graph6$default);function PluginTimeSerieManager(){_classCallCheck(this,PluginTimeSerieManager);var _this54=_possibleConstructorReturn(this,(PluginTimeSerieManager.__proto__||Object.getPrototypeOf(PluginTimeSerieManager)).apply(this,arguments));_this54.series=[];_this54.plugins=[];_this54.currentSlots={};_this54.requestLevels=new Map();_this54.update=function(noRecalculate,force){_this54.series.forEach(function(serie){this.updateSerie(serie,noRecalculate);});if(!noRecalculate){_this54.recalculateSeries(force);}};return _this54;}_createClass(PluginTimeSerieManager,[{key:'init',/**
	     * Init method
	     * @private
	     * @memberof PluginTimeSerieManager
	     */value:function init(graph,options){this.graph=graph;_graph4.default.create(this.options.LRUName,200);this.requestsRunning=0;}},{key:'setURL',value:function setURL(url){this.options.url=url;return this;}},{key:'setAvailableIntervals',value:function setAvailableIntervals(){this.options.intervals=arguments;}},{key:'newSerie',value:function newSerie(serieName,serieOptions,serieType,dbElements,noZoneSerie){var s=this.graph.newSerie(serieName,serieOptions,serieType);this.currentSlots[serieName]={min:0,max:0,interval:0};s.on("hide",function(){if(s._zoneSerie){s._zoneSerie.hide();}});s.on("show",function(){if(s._zoneSerie){s._zoneSerie.show();}});s.setInfo("timeSerieManagerDBElements",dbElements);if(!noZoneSerie){s._zoneSerie=this.graph.newSerie(serieName+"_zone",{},_graph2.default.SERIE_ZONE);}this.series.push(s);return s;}},{key:'registerPlugin',value:function registerPlugin(plugin,event){var index;if((index=this.plugins.indexOf(plugin))>-1){for(var i=1;i<arguments.length;i++){plugin.removeListener(arguments[i],this.update);}}for(var i=1;i<arguments.length;i++){plugin.on(arguments[i],this.update);}}},{key:'updateSerie',value:function updateSerie(serie,noRecalculate){var self=this;var from=serie.getXAxis().getCurrentMin();var to=serie.getXAxis().getCurrentMax();var priority=1;var optimalInterval=this.getOptimalInterval(to-from);var optimalIntervalIndex=this.options.intervals.indexOf(optimalInterval);var interval;this.cleanRegister(optimalIntervalIndex);for(var i=optimalIntervalIndex;i<=optimalIntervalIndex+1;i++){interval=this.options.intervals[i];var startSlotId=self.computeSlotID(from,interval);var endSlotId=self.computeSlotID(to,interval);var intervalMultipliers=[[2,5,6],[1,2,4],[0,1,3]];intervalMultipliers.forEach(function(multiplier){var firstSlotId=startSlotId-multiplier[0]*(endSlotId-startSlotId);var lastSlotId=endSlotId+multiplier[0]*(endSlotId-startSlotId);var slotId=firstSlotId;while(slotId<=lastSlotId){if(self.computeTimeMin(slotId,interval)>Date.now()){break;}self.register(serie,slotId,interval,interval==optimalInterval?multiplier[1]:multiplier[2],true,noRecalculate);slotId++;}});}this.processRequests();}},{key:'cleanRegister',value:function cleanRegister(interval){if(!this.requestLevels){return;}this.requestLevels.forEach(function(levelArray){levelArray.forEach(function(levelElement,levelIndex){if(levelElement[4]<interval){levelArray.splice(levelIndex,1);}});});}},{key:'register',value:function register(serie,slotId,interval,priority,noProcess,noRecalculate){var id=this.computeUniqueID(serie,slotId,interval);var data=_graph4.default.get(this.options.LRUName,id);if(!data||this.computeTimeMax(slotId,interval)>Date.now()&&data.timeout<Date.now()-(noRecalculate?5000:100000)&&priority==1){this.request(serie,slotId,interval,priority,id,noProcess);}}},{key:'request',value:function request(serie,slotId,interval,priority,slotName,noProcess){for(var i in this.requestLevels){if(i==priority){continue;}if(this.requestLevels[i][slotName]){if(this.requestLevels[i][slotName][0]!==1){// If the request is not pending
delete this.requestLevels[i][slotName];}else{this.requestLevels[i][slotName][5]=priority;}}}if(this.requestLevels[priority]&&this.requestLevels[priority][slotName]){return;}this.requestLevels[priority]=this.requestLevels[priority]||{};this.requestLevels[priority][slotName]=[0,slotName,serie.getName(),slotId,interval,priority,serie.getInfo('timeSerieManagerDBElements')];if(!noProcess){this.processRequests();}}},{key:'processRequests',value:function processRequests(){if(this.requestsRunning>=this.options.maxParallelRequests){return;}var self=this,currentLevelChecking=1,requestToMake;while(true){for(var i in this.requestLevels[currentLevelChecking]){if(this.requestLevels[currentLevelChecking][i][0]==1){// Running request
continue;}requestToMake=this.requestLevels[currentLevelChecking][i];break;}if(requestToMake){break;}currentLevelChecking++;if(currentLevelChecking>10){return;}}this.requestsRunning++;if(!requestToMake){return;}requestToMake[0]=1;util.ajaxGet({url:this.getURL(requestToMake),method:'GET',json:true}).done(function(data){if(data.status==1){// Success
self.requestsRunning--;delete self.requestLevels[currentLevelChecking][i];_graph4.default.store(self.options.LRUName,requestToMake[1],data.data);// Element 1 is the unique ID
self.processRequests();if(requestToMake[5]==1&&Object.keys(self.requestLevels[1]).length==0){self.recalculateSeries(true);}}});}},{key:'computeTimeMax',value:function computeTimeMax(slotId,interval){return(slotId+1)*(interval*this.options.nbPoints);}},{key:'computeTimeMin',value:function computeTimeMin(slotId,interval){return slotId*(interval*this.options.nbPoints);}},{key:'getURL',value:function getURL(requestElements){var url=this.options.url.replace("<measurementid>",requestElements[2]).replace('<from>',this.computeTimeMin(requestElements[3],requestElements[4])).replace('<to>',this.computeTimeMax(requestElements[3],requestElements[4])).replace('<interval>',requestElements[4]);var dbElements=requestElements[6]||{};for(var i in dbElements){url=url.replace("<"+i+">",dbElements[i]);}return url;}},{key:'getOptimalInterval',value:function getOptimalInterval(totalspan){var optimalInterval=(this.options.optimalPxPerPoint||1)*totalspan/this.graph.getDrawingWidth(),diff=Infinity,optimalIntervalAmongAvailable;this.options.intervals.forEach(function(interval){var newDiff=Math.min(diff,Math.abs(interval-optimalInterval));if(diff!==newDiff){optimalIntervalAmongAvailable=interval;diff=newDiff;}});return optimalIntervalAmongAvailable||1000;}},{key:'computeUniqueID',value:function computeUniqueID(serie,slotId,interval){var extra="";var info=serie.getInfo('timeSerieManagerDBElements');for(var i in info){extra+=";"+i+":"+info[i];}return serie.getName()+";"+slotId+";"+interval+extra;}},{key:'computeSlotID',value:function computeSlotID(time,interval){return Math.floor(time/(interval*this.options.nbPoints));}},{key:'computeSlotTime',value:function computeSlotTime(slotId,interval){return slotId*(interval*this.options.nbPoints);}},{key:'getZoneSerie',value:function getZoneSerie(serie){return serie._zoneSerie;}},{key:'updateZoneSerie',value:function updateZoneSerie(serieName){var serie=this.graph.getSerie(serieName);if(!serie){return;}if(!serie._zoneSerie){return;}serie._zoneSerie.setXAxis(serie.getXAxis());serie._zoneSerie.setYAxis(serie.getYAxis());serie._zoneSerie.setFillColor(serie.getLineColor());serie._zoneSerie.setLineColor(serie.getLineColor());serie._zoneSerie.setFillOpacity(0.2);serie._zoneSerie.setLineOpacity(0.3);}},{key:'recalculateSeries',value:function recalculateSeries(force){var self=this;if(this.locked){return;}this.changed=false;this.series.map(function(serie){self.recalculateSerie(serie,force);});/*if ( this.changed ) {
	          self.graph._applyToAxes( "scaleToFitAxis", [ this.graph.getXAxis(), false, undefined, undefined, false, true ], false, true );
	        }
	      */this.changed=false;//self.graph.autoscaleAxes();
self.graph.draw();}},{key:'recalculateSerie',value:function recalculateSerie(serie,force){var from=serie.getXAxis().getCurrentMin(),to=serie.getXAxis().getCurrentMax(),interval=this.getOptimalInterval(to-from);var startSlotId=this.computeSlotID(from,interval);var endSlotId=this.computeSlotID(to,interval);var data=[];var dataMinMax=[];if(!force&&interval==this.currentSlots[serie.getName()].interval&&this.currentSlots[serie.getName()].min<=startSlotId&&this.currentSlots[serie.getName()].max>=endSlotId){return;}startSlotId-=2;endSlotId+=2;this.currentSlots[serie.getName()].min=startSlotId;this.currentSlots[serie.getName()].max=endSlotId;this.currentSlots[serie.getName()].interval=interval;var slotId=startSlotId;while(slotId<=endSlotId){var lruData=_graph4.default.get(this.options.LRUName,this.computeUniqueID(serie,slotId,interval));if(lruData){data=data.concat(lruData.data.mean);dataMinMax=dataMinMax.concat(lruData.data.minmax);}else{this.recalculateSerieUpwards(serie,slotId,interval,data,dataMinMax);}slotId++;}this.changed=true;serie.setData(data);if(serie._zoneSerie){serie._zoneSerie.setData(dataMinMax);}}},{key:'setIntervalCheck',value:function setIntervalCheck(interval){var _this55=this;if(this.interval){clearInterval(this.interval);}this.update(true,true);this.interval=setInterval(function(){_this55.update(true,false);},interval);}},{key:'recalculateSerieUpwards',value:function recalculateSerieUpwards(serie,downSlotId,downInterval,data,dataMinMax){var intervals=this.options.intervals.slice(0);intervals.sort();var nextInterval=intervals[intervals.indexOf(downInterval)+1]||-1;if(nextInterval<0){return[];}var newSlotTime=this.computeSlotTime(downSlotId,downInterval);var newSlotTimeEnd=this.computeSlotTime(downSlotId+1,downInterval);var newSlotId=this.computeSlotID(newSlotTime,nextInterval),start=false;var lruData=_graph4.default.get(this.options.LRUName,this.computeUniqueID(serie,newSlotId,nextInterval));if(lruData){for(var i=0,l=lruData.data.mean.length;i<l;i+=2){if(lruData.data.mean[i]<newSlotTime){continue;}else if(start===false){start=i;}if(lruData.data.mean[i]>=newSlotTimeEnd){data=data.concat(lruData.data.mean.slice(start,i));dataMinMax=data.concat(lruData.data.minmax.slice(start,i));return;}}}return this.recalculateSerieUpwards(serie,newSlotId,nextInterval,data,dataMinMax);}},{key:'lockRedraw',value:function lockRedraw(){this.locked=true;}},{key:'unlockRedraw',value:function unlockRedraw(){this.locked=false;}},{key:'isRedrawLocked',value:function isRedrawLocked(){return!!this.locked;}}],[{key:'defaults',value:function defaults(){return{LRUName:"PluginTimeSerieManager",intervals:[1000,15000,60000,900000,3600000,8640000],maxParallelRequests:3,optimalPxPerPoint:2,nbPoints:1000,url:""};}}]);return PluginTimeSerieManager;}(_graph6.default);exports.default=PluginTimeSerieManager;});/***/},/* 46 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports);}else{var mod={exports:{}};factory(mod.exports);global.graphLru=mod.exports;}})(this,function(exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.create=create;exports.get=get;exports.store=store;exports.empty=empty;exports.exist=exist;var memory={},memoryHead={},memoryCount={},memoryLimit={};function createStoreMemory(store,limit){limit=limit||50;if(!memory[store]){memory[store]={};memoryCount[store]=0;}memoryLimit[store]=limit;}function getFromMemory(store,index){var obj,head;if(memory[store]&&memory[store][index]){head=memoryHead[store];obj=memory[store][index];obj.prev=head;obj.next=head.next;head.next.prev=obj;head.next=obj;memoryHead[store]=obj;return obj.data;}}function storeInMemory(store,index,data){var toStore,toDelete,head;if(memory[store]&&memoryCount[store]!==undefined&&memoryLimit[store]){head=memoryHead[store];if(memory[store][index]){getFromMemory(store,index);memory[store][index].data.data=data;memory[store][index].data.timeout=Date.now();}else{toStore={data:{data:data,timeout:Date.now()}};if(typeof head=='undefined'){toStore.prev=toStore;toStore.next=toStore;}else{toStore.prev=head.prev;toStore.next=head.next;head.next.prev=toStore;head.next=toStore;}memoryHead[store]=toStore;memory[store][index]=toStore;memoryCount[store]++;}// Remove oldest one
if(memoryCount[store]>memoryLimit[store]&&head){toDelete=head.next;head.next.next.prev=head;head.next=head.next.next;toDelete.next.next=undefined;toDelete.next.prev=undefined;memoryCount[store]--;}return data;}}function create(store,limitMemory){createStoreMemory(store,limitMemory);};function get(store,index){var result;if((result=getFromMemory(store,index))!=undefined){return result;}}function store(store,index,value){storeInMemory(store,index,value);return value;};function empty(store){emptyMemory(store);};function exist(store){return memory[store];}});/***/},/* 47 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(40)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('./graph.plugin'));}else{var mod={exports:{}};factory(mod.exports,global.graph);global.graphPluginSerielinedifference=mod.exports;}})(this,function(exports,_graph){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	   * @class PluginSerieLineDifference
	   * @implements Plugin
	   */var PluginSerieLineDifference=function(_graph2$default16){_inherits(PluginSerieLineDifference,_graph2$default16);function PluginSerieLineDifference(){_classCallCheck(this,PluginSerieLineDifference);return _possibleConstructorReturn(this,(PluginSerieLineDifference.__proto__||Object.getPrototypeOf(PluginSerieLineDifference)).apply(this,arguments));}_createClass(PluginSerieLineDifference,[{key:'init',/**
	     * Init method
	     * @private
	     */value:function init(graph,options){this.graph=graph;this.pathsPositive=[];this.pathsNegative=[];this.positivePolyline=this.graph.newShape('polyline').draw();this.positivePolyline.setFillColor(this.options.positiveStyle.fillColor).setFillOpacity(this.options.positiveStyle.fillOpacity).setStrokeWidth(this.options.positiveStyle.strokeWidth).applyStyle();this.negativePolyline=this.graph.newShape('polyline').draw();this.negativePolyline.setFillColor(this.options.negativeStyle.fillColor).setFillOpacity(this.options.negativeStyle.fillOpacity).setStrokeWidth(this.options.negativeStyle.strokeWidth).applyStyle();}/**
	     * Assigns the two series for the shape. Postive values are defined when ```serieTop``` is higher than ```serieBottom```.
	     * @param {SerieLine} serieTop - The top serie
	     * @param {SerieLine} serieBottom - The bottom serie
	     */},{key:'setSeries',value:function setSeries(serieTop,serieBottom){this.serie1=serieTop;this.serie2=serieBottom;}/**
	     * Assigns the boundaries
	     */},{key:'setBoundaries',value:function setBoundaries(from,to){this.options.from=from;this.options.to=to;}/**
	     * @returns the starting value used to draw the zone
	     */},{key:'getFrom',value:function getFrom(){return this.options.from;}/**
	     * @returns the ending value used to draw the zone
	     */},{key:'getTo',value:function getTo(){return this.options.to;}/**
	     * Calculates and draws the zone series
	     * @returns {Plugin} The current plugin instance
	     */},{key:'draw',value:function draw(){var self=this;var s1=this.serie1.searchClosestValue(this.getFrom());var i1,j1,i2,j2,y,y2,crossing;var top=[];var bottom=[];var bottomBroken;if(!s1){i1=0;j1=0;}else{i1=s1.dataIndex;j1=s1.xAfterIndex*2;}y=this.interpolate(this.serie1,this.getFrom());top.push(this.getFrom());// x
top.push(y);// y
y=this.interpolate(this.serie2,this.getFrom());bottom.push(this.getFrom());// x
bottom.push(y);// y
var s2;var order;function nextSet(){if(order===true){self.pathsPositive.push([top,bottom]);}else if(order===false){self.pathsNegative.push([top,bottom]);}top=[];bottom=[];order=undefined;}var ended;for(;i1<this.serie1.data.length;i1++){for(;j1<this.serie1.data[i1].length;j1+=2){if(this.serie1.data[i1][j1]>this.getTo()){// FINISHED !
y=this.interpolate(this.serie1,this.getTo());y2=this.interpolate(this.serie2,this.getTo());crossing=this.computeCrossing(top[top.length-2],top[top.length-1],this.getTo(),y,bottom[bottom.length-2],bottom[bottom.length-1],this.getTo(),y2);if(crossing){top.push(crossing.x);top.push(crossing.y);bottom.push(crossing.x);bottom.push(crossing.y);nextSet();top.push(crossing.x);top.push(crossing.y);bottom.push(crossing.x);bottom.push(crossing.y);order=this.serie1.data[i1][j1+1]>this.serie2.data[i2][j2+1];}top.push(this.getTo());// x
top.push(y);// y
bottom.push(this.getTo());// x
bottom.push(y2);// y
ended=true;break;}if(!s2){s2=this.serie2.searchClosestValue(this.serie1.data[i1][j1]);// Finds the first point
if(s2){i2=s2.dataIndex;j2=s2.xBeforeIndex*2;// TODO: Add here first points
y=this.interpolate(this.serie2,this.serie1.data[i1][j1]);top.push(this.serie1.data[i1][j1]);// x
top.push(this.serie1.data[i1][j1+1]);// y
bottom.push(this.serie1.data[i1][j1]);// x
bottom.push(y);// y
order=this.serie1.data[i1][j1+1]>y;}else{continue;}}bottomBroken=false;crossing=this.computeCrossing(top[top.length-2],top[top.length-1],this.serie1.data[i1][j1],this.serie1.data[i1][j1+1],bottom[bottom.length-2],bottom[bottom.length-1],this.serie2.data[i2][j2],this.serie2.data[i2][j2+1]);if(crossing){top.push(crossing.x);top.push(crossing.y);bottom.push(crossing.x);bottom.push(crossing.y);nextSet();top.push(crossing.x);top.push(crossing.y);bottom.push(crossing.x);bottom.push(crossing.y);order=this.serie1.data[i1][j1+1]>this.serie2.data[i2][j2+1];}while(this.serie2.data[i2][j2]<this.serie1.data[i1][j1]){bottom.push(this.serie2.data[i2][j2]);bottom.push(this.serie2.data[i2][j2+1]);j2+=2;if(j2==this.serie2.data[i2].length){bottomBroken=this.serie2.data[i2][j2-2];i2++;j2=0;break;}crossing=this.computeCrossing(top[top.length-2],top[top.length-1],this.serie1.data[i1][j1],this.serie1.data[i1][j1+1],bottom[bottom.length-2],bottom[bottom.length-1],this.serie2.data[i2][j2],this.serie2.data[i2][j2+1]);if(crossing){top.push(crossing.x);top.push(crossing.y);bottom.push(crossing.x);bottom.push(crossing.y);nextSet();top.push(crossing.x);top.push(crossing.y);bottom.push(crossing.x);bottom.push(crossing.y);order=this.serie1.data[i1][j1+1]>this.serie2.data[i2][j2+1];}}if(bottomBroken===false){top.push(this.serie1.data[i1][j1]);top.push(this.serie1.data[i1][j1+1]);}else{top.push(bottomBroken);top.push(this.interpolate(this.serie1,bottomBroken));s2=false;j1-=2;nextSet();}}if(ended){nextSet();break;}// End of X
y=this.interpolate(this.serie2,top[top.length-2]);if(y){bottom.push(top[top.length-2]);bottom.push(y);}nextSet();j1=0;s2=false;}var d=this.pathsPositive.reduce(makePaths,"");this.positivePolyline.setPointsPx(d).redraw();var d=this.pathsNegative.reduce(makePaths,"");this.negativePolyline.setPointsPx(d).redraw();//pathsBottom.map( function( map ) { makePaths( map, self.options.negativeStyle ); } );
function makePaths(d,path){for(var i=0;i<path[0].length;i+=2){if(i==0){d+="M ";}d+=" "+Math.round(self.serie1.getXAxis().getPx(path[0][i]))+", "+Math.round(self.serie1.getYAxis().getPx(path[0][i+1]));if(i<path[0].length-2){d+=" L ";}}for(var i=path[1].length-2;i>=0;i-=2){d+=" L "+Math.round(self.serie2.getXAxis().getPx(path[1][i]))+", "+Math.round(self.serie2.getYAxis().getPx(path[1][i+1]));if(i==0){d+=" z ";}}return d;}}/**
	     * Finds the interpolated y value at point ```valX``` of the serie ```serie```
	     * @returns {(Number|Boolean)} The interpolated y value is possible, ```false``` otherwise
	     * @param {Serie} serie - The serie for which the y value should be computed
	     * @param {Number} valX - The x value
	     */},{key:'interpolate',value:function interpolate(serie,valX){var value=serie.searchClosestValue(valX);if(!value){return false;}if(value.xMax==undefined){return value.yMin;}if(value.xMin==undefined){return value.yMax;}var ratio=(valX-value.xMin)/(value.xMax-value.xMin);return(1-ratio)*value.yMin+ratio*value.yMax;}/**
	     * Finds the crossing point between two vector and returns it, or ```false``` if it is not within the x boundaries
	     * @returns {(Object|Boolean)} An object containing the crossing point in the following format: ```{ x: xCrossing, y: yCrossing }``` or ```false``` if no crossing point can be found
	     * @param {Number} x11 - First x point of the first vector
	     * @param {Number} y11 - First y point of the first vector
	     * @param {Number} x12 - Second x point of the first vector
	     * @param {Number} y12 - Second y point of the first vector
	     * @param {Number} x21 - First x point of the second vector
	     * @param {Number} y21 - First y point of the second vector
	     * @param {Number} y22 - Second x point of the second vector
	     * @param {Number} y22 - Second y point of the second vector
	     */},{key:'computeCrossing',value:function computeCrossing(x11,y11,x12,y12,x21,y21,x22,y22){var a1=(y12-y11)/(x12-x11);var a2=(y22-y21)/(x22-x21);var b1=y12-a1*x12;var b2=y22-a2*x22;if(x11==x12||x21==x22){return false;}if(a1==a2){return{x:x11,y1:y11,y2:y11};}var x=(b1-b2)/(a2-a1);if(x>x12||x<x11||x<x21||x>x22){return false;}return{x:x,y:a1*x+b1};}/**
	     * @returns The positive polyline
	     */},{key:'getPositivePolyline',value:function getPositivePolyline(){return this.positivePolyline;}/**
	     * @returns The negative polyline
	     */},{key:'getNegativePolyline',value:function getNegativePolyline(){return this.negativePolyline;}}],[{key:'defaults',value:function defaults(){return{positiveStyle:{fillColor:'green',fillOpacity:0.2,strokeWidth:0},negativeStyle:{fillColor:'red',fillOpacity:0.2,strokeWidth:0},from:0,to:0};}}]);return PluginSerieLineDifference;}(_graph2.default);exports.default=PluginSerieLineDifference;});/***/},/* 48 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(1),__webpack_require__(9),__webpack_require__(11),__webpack_require__(3),__webpack_require__(14),__webpack_require__(23),__webpack_require__(40),__webpack_require__(10)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require("../graph.core"),require("../graph.axis.x"),require("../graph.axis.y"),require("../graph.util"),require("../series/graph.serie.line"),require("../series/graph.serie.scatter"),require("./graph.plugin"),require("../graph.axis"));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graphAxis,global.graphAxis,global.graph,global.graphSerie,global.graphSerie,global.graph,global.graph);global.graphPluginAxissplitting=mod.exports;}})(this,function(exports,_graph,_graphAxis,_graphAxis3,_graph3,_graphSerie,_graphSerie3,_graph4,_graph6){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _graph2=_interopRequireDefault(_graph);var _graphAxis2=_interopRequireDefault(_graphAxis);var _graphAxis4=_interopRequireDefault(_graphAxis3);var util=_interopRequireWildcard(_graph3);var _graphSerie2=_interopRequireDefault(_graphSerie);var _graphSerie4=_interopRequireDefault(_graphSerie3);var _graph5=_interopRequireDefault(_graph4);var _graph7=_interopRequireDefault(_graph6);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var SerieLineExtended=function(_graphSerie2$default6){_inherits(SerieLineExtended,_graphSerie2$default6);function SerieLineExtended(){_classCallCheck(this,SerieLineExtended);var _this57=_possibleConstructorReturn(this,(SerieLineExtended.__proto__||Object.getPrototypeOf(SerieLineExtended)).apply(this,arguments));_this57.subSeries=[];return _this57;}_createClass(SerieLineExtended,[{key:'setData',value:function setData(){var _this58=this;_get(SerieLineExtended.prototype.__proto__||Object.getPrototypeOf(SerieLineExtended.prototype),'setData',this).apply(this,arguments);this.subSeries.map(function(sub){sub.data=_this58.data;});return this;}},{key:'draw',value:function draw(){this.eraseMarkers();return this;}},{key:'getSymbolForLegend',value:function getSymbolForLegend(){if(!this.subSeries[0]){return false;}return this.subSeries[0].getSymbolForLegend();}},{key:'getMarkerForLegend',value:function getMarkerForLegend(){if(!this.subSeries[0]){return false;}return this.subSeries[0].getMarkerForLegend();}}]);return SerieLineExtended;}(_graphSerie2.default);var SerieScatterExtended=function(_graphSerie4$default){_inherits(SerieScatterExtended,_graphSerie4$default);function SerieScatterExtended(){_classCallCheck(this,SerieScatterExtended);var _this59=_possibleConstructorReturn(this,(SerieScatterExtended.__proto__||Object.getPrototypeOf(SerieScatterExtended)).apply(this,arguments));_this59.subSeries=[];return _this59;}_createClass(SerieScatterExtended,[{key:'setData',value:function setData(){var _this60=this;_get(SerieScatterExtended.prototype.__proto__||Object.getPrototypeOf(SerieScatterExtended.prototype),'setData',this).apply(this,arguments);this.subSeries.map(function(sub){sub.data=_this60.data;});return this;}},{key:'draw',value:function draw(){return this;}},{key:'getSymbolForLegend',value:function getSymbolForLegend(){if(!this.subSeries[0]){return false;}return this.subSeries[0].getSymbolForLegend();}},{key:'getMarkerForLegend',value:function getMarkerForLegend(){if(!this.subSeries[0]){return false;}return this.subSeries[0].getMarkerForLegend();}}]);return SerieScatterExtended;}(_graphSerie4.default);var excludingMethods=['constructor','init','draw','setLineColor','setLineWidth','setLineStyle','getLineColor','getLineWidth','getLineStyle','setMarkers','showMarkers','hideMarkers','getMarkerDom','getMarkerDomIndependant','getMarkerPath','eraseMarkers','_recalculateMarkerPoints'];var addMethods=[];Object.getOwnPropertyNames(_graphSerie2.default.prototype).concat(addMethods).map(function(i){if(excludingMethods.indexOf(i)>-1){return;}SerieLineExtended.prototype[i]=function(j){return function(){var args=arguments;this.subSeries.map(function(subSerie){subSerie[j].apply(subSerie,_toConsumableArray(args));});};}(i);});/**
	   * Axis splitting plugin
	   * @augments Plugin
	   */var PluginAxisSplitting=function(_graph5$default){_inherits(PluginAxisSplitting,_graph5$default);function PluginAxisSplitting(options){_classCallCheck(this,PluginAxisSplitting);var _this61=_possibleConstructorReturn(this,(PluginAxisSplitting.__proto__||Object.getPrototypeOf(PluginAxisSplitting)).apply(this,arguments));_this61.series=new Map();return _this61;}_createClass(PluginAxisSplitting,[{key:'init',value:function init(graph){this.graph=graph;}/**
	     *  Creates a new bottom split axis
	     *  @param {Object} [ options = {} ] The axis options
	     *  @return {Axis} The newly created split axis
	     */},{key:'newXAxis',value:function newXAxis(options){return newBottomAxis(options);}/**
	     *  Creates a new left split axis
	     *  @param {Object} [ options = {} ] The axis options
	     *  @return {Axis} The newly created split axis
	     */},{key:'newYAxis',value:function newYAxis(options){return newLeftAxis(options);}/**
	     *  Creates a new top split axis
	     *  @param {Object} [ options = {} ] The axis options
	     *  @return {Axis} The newly created split axis
	     */},{key:'newTopAxis',value:function newTopAxis(options){options=this.getOptions(options);return new SplitXAxis(this.graph,"top",options);}/**
	     *  Creates a new bottom split axis
	     *  @param {Object} [ options = {} ] The axis options
	     *  @return {Axis} The newly created split axis
	     */},{key:'newBottomAxis',value:function newBottomAxis(options){options=this.getOptions(options);return new SplitXAxis(this.graph,"bottom",options);}/**
	     *  Creates a new left split axis
	     *  @param {Object} [ options = {} ] The axis options
	     *  @return {Axis} The newly created split axis
	     */},{key:'newLeftAxis',value:function newLeftAxis(options){options=this.getOptions(options);return new SplitYAxis(this.graph,"left",options);}/**
	     *  Creates a new right split axis
	     *  @param {Object} [ options = {} ] The axis options
	     *  @return {Axis} The newly created split axis
	     */},{key:'newRightAxis',value:function newRightAxis(options){options=this.getOptions(options);return new SplitYAxis(this.graph,"right",options);}},{key:'getOptions',value:function getOptions(options){var defaults={marginMin:this.options.axes.margins.low,marginMax:this.options.axes.margins.high};return util.extend(true,defaults,options);}},{key:'preDraw',value:function preDraw(){var _this62=this;var xAxis,yAxis;//    for ( let { serie } of this.series.values() ) {
this.series.forEach(function(_ref){var serie=_ref.serie;xAxis=serie.getXAxis();yAxis=serie.getYAxis();var splits=1;if(xAxis.splitNumber){splits*=xAxis.splitNumber;}if(yAxis.splitNumber){splits*=yAxis.splitNumber;}while(serie.subSeries.length<splits){var name=serie.getName()+"_"+serie.subSeries.length;var s=_this62.graph.newSerie(name,{},serie.getType()||_graph2.default.SERIE_LINE);s.excludedFromLegend=true;s.styles=serie.styles;s.data=serie.data;// Copy data
if(serie.getType()==_graph2.default.SERIE_LINE){s.markerPoints=serie.markerPoints;s.markerFamilies=serie.markerFamilies;}serie.subSeries.push(s);}while(serie.subSeries.length>splits){var subserie=_this62.graph.getSerie(serie.getName()+"_"+(serie.subSeries.length-1));if(subserie&&subserie.kill){subserie.kill();}serie.subSeries.pop();}if(!serie.getXAxis().splitNumber&&serie.getXAxis().splitAxis){serie.getXAxis().splitAxis();}if(!serie.getYAxis().splitNumber&&serie.getYAxis().splitAxis){serie.getYAxis().splitAxis();}// Re-assign axes to the sub series
serie.subSeries.map(function(sserie,index){var xSubAxis,ySubAxis;//sserie.groupMarkers = firstSubSerie.groupMarkers;
if(serie.getXAxis().getSubAxis){var subAxisIndex=index%(xAxis.splitNumber||1);xSubAxis=serie.getXAxis().getSubAxis(subAxisIndex);}else{xSubAxis=serie.getXAxis();}sserie.setXAxis(xSubAxis);if(serie.getYAxis().getSubAxis){var _subAxisIndex=Math.floor(index/(xAxis.splitNumber||1));ySubAxis=serie.getYAxis().getSubAxis(_subAxisIndex);}else{ySubAxis=serie.getYAxis();}sserie.setYAxis(ySubAxis);sserie.draw(true);});//}
});}/**
	     *  Creates a new serie
	     *  @param {(String|Number)} name - The name of the serie
	     *  @param {Object} [ options = {} ] The options of the serie
	     *  @param {String} type - The type of the serie
	     *  @return {Serie} The created serie
	     */},{key:'newSerie',value:function newSerie(name){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var type=arguments[2];switch(type){case'line':return newLineSerie(name,options);break;case'scatter':return newScatterSerie(name,options);break;}throw"Cannot create a split serie of type "+type;}/**
	     *  Creates a new line serie
	     *  @param {(String|Number)} name - The name of the serie
	     *  @param {Object} [ options = {} ] The options of the serie
	     *  @return {Serie} The created serie
	     */},{key:'newLineSerie',value:function newLineSerie(name,options){var serieObj={type:"lineSerie",serie:new SerieLineExtended(name,options,"line")};this.series.set(name,serieObj);serieObj.serie.init(this.graph,name,options);this.graph.series.push(serieObj.serie);return serieObj.serie;}/**
	     *  Creates a new scatter serie
	     *  @param {(String|Number)} name - The name of the serie
	     *  @param {Object} [ options = {} ] The options of the serie
	     *  @return {Serie} The created serie
	     */},{key:'newScatterSerie',value:function newScatterSerie(name,options){var serieObj={type:"scatterSerie",serie:new SerieScatterExtended(name,options,"scatter")};this.series.set(name,serieObj);serieObj.serie.init(this.graph,options);this.graph.series.push(serieObj.serie);return serieObj.serie;}}],[{key:'defaults',value:function defaults(){return{axes:{margins:{high:5,low:5}}};}}]);return PluginAxisSplitting;}(_graph5.default);var defaultAxisConstructorOptions={splitMarks:true};var SplitAxis=function SplitAxis(mixin){var delegateMethods=['turnGridsOff','turnGridsOn','gridsOff','gridsOn','setEngineering','setScientificScaleExponent','setScientific','setLabelColor','setSecondaryGridDasharray','setPrimaryGridDasharray','setSecondaryGridsOpacity','setPrimaryGridOpacity','setSecondaryGridWidth','setPrimaryGridWidth','setSecondaryGridColor','setPrimaryGridColor','setTicksLabelColor','setSecondaryTicksColor','setPrimaryTicksColor','setAxisColor','secondaryGridOn','secondaryGridOff','primaryGridOff','primaryGridOn','setSecondaryGrid','setPrimaryGrid','setGrids','setTickPosition','setExponentialFactor','setExponentialLabelFactor','setGridLinesStyle','forcePrimaryTickUnitMin','forcePrimaryTickUnitMax','forcePrimaryTickUnit','flip','show','hide','setDisplay'];/**
	     * Split axis
	     * @mixes AxisX
	     * @mixes AxisY
	     * @name SplitAxis
	     * @static
	     */var cl=function(_mixin){_inherits(SplitAxis,_mixin);function SplitAxis(graph,position){var options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};_classCallCheck(this,SplitAxis);var _this63=_possibleConstructorReturn(this,(SplitAxis.__proto__||Object.getPrototypeOf(SplitAxis)).call(this,graph,position,options));_this63.axes=[];_this63.position=position;_this63.constructorOptions=util.extend(true,{},defaultAxisConstructorOptions,options);_this63._splitVal=[];return _this63;}/**
	       *  Calls a callback onto each chunk axes. The callback receives two parameters: 1) the ```axis``` itself and 2) the ```index``` of the axis in the stack
	       *  @param {Function} callback - The callback to be applied to each axes
	       *  @return {SplitAxis} The current axis instance
	       */_createClass(SplitAxis,[{key:'all',value:function all(callback){if(!(typeof callback=="function")){return;}this.axes.map(callback);return this;}/**
	       *  Splits the axis into chunks at the positions defined as a list of parameters.
	       *  @param {Function} ...splits - The positions of axis splitting
	       *  @return {SplitAxis} The current axis instance
	       *  @example axis.splitAxis( 0.2, 0.5, 0.8 ); // Creates 4 chunks (0-20%, 20%-50%, 50%-80%, 80%-100%)
	       */},{key:'splitAxis',value:function splitAxis(){for(var _len4=arguments.length,splits=Array(_len4),_key4=0;_key4<_len4;_key4++){splits[_key4]=arguments[_key4];}splits.push(1);var splitNumber=splits.length;while(this.axes.length>splitNumber){this.axes.pop().kill(true,true);}while(this.axes.length<splitNumber){var axis=new(this.getConstructor())(this.graph,this.position,this.constructorOptions);this.axes.push(axis);axis.zoomLock=true;axis.init(this.graph,this.constructorOptions);}var from=0;var i=0;var _iteratorNormalCompletion9=true;var _didIteratorError9=false;var _iteratorError9=undefined;try{for(var _iterator9=this.axes[Symbol.iterator](),_step9;!(_iteratorNormalCompletion9=(_step9=_iterator9.next()).done);_iteratorNormalCompletion9=true){var _axis=_step9.value;_axis.options.marginMin=10;_axis.options.marginMax=10;if(i==0){_axis.options.marginMin=0;}if(i==this.axes.length-1){_axis.options.marginMax=0;}_axis.setSpan(from,from=splits[i]);_axis.setMinMaxFlipped();i++;}}catch(err){_didIteratorError9=true;_iteratorError9=err;}finally{try{if(!_iteratorNormalCompletion9&&_iterator9.return){_iterator9.return();}}finally{if(_didIteratorError9){throw _iteratorError9;}}}this._splits=splits;return this;}/**
	       *  Fixes the major tick interval of all axes based on the one provided as a parameter
	       *  @param {Number} axisIndex - The index of the reference axis (starting at 0)
	       *  @return {SplitAxis} The current axis instance
	       */},{key:'fixGridIntervalBasedOnAxis',value:function fixGridIntervalBasedOnAxis(axisIndex){this.fixGridFor=axisIndex;this.graph._axisHasChanged();return this;}/**
	       *  Spreads the chunks of the axis based on the relative interval of each one of them, so that the unit / px is constant for each chunk
	       *  @param {Boolean} bln - ```true``` to enable the spread, ```false``` otherwise
	       *  @return {SplitAxis} The current axis instance
	       */},{key:'splitSpread',value:function splitSpread(bln){this.autoSpread=!!bln;return this;}},{key:'hasAxis',value:function hasAxis(axis){return this.axes.indexOf(axis)>-1;}},{key:'_splitSpread',value:function _splitSpread(){var splits=[],total=0,currentSplit=0;//console.log( this._splitVal );
var _iteratorNormalCompletion10=true;var _didIteratorError10=false;var _iteratorError10=undefined;try{for(var _iterator10=this._splitVal[Symbol.iterator](),_step10;!(_iteratorNormalCompletion10=(_step10=_iterator10.next()).done);_iteratorNormalCompletion10=true){var split=_step10.value;total+=split[1]-split[0];}}catch(err){_didIteratorError10=true;_iteratorError10=err;}finally{try{if(!_iteratorNormalCompletion10&&_iterator10.return){_iterator10.return();}}finally{if(_didIteratorError10){throw _iteratorError10;}}}var _iteratorNormalCompletion11=true;var _didIteratorError11=false;var _iteratorError11=undefined;try{for(var _iterator11=this._splitVal[Symbol.iterator](),_step11;!(_iteratorNormalCompletion11=(_step11=_iterator11.next()).done);_iteratorNormalCompletion11=true){var _split=_step11.value;splits.push(currentSplit+=(_split[1]-_split[0])/total);}}catch(err){_didIteratorError11=true;_iteratorError11=err;}finally{try{if(!_iteratorNormalCompletion11&&_iterator11.return){_iterator11.return();}}finally{if(_didIteratorError11){throw _iteratorError11;}}}splits.pop();this.splitAxis.apply(this,splits);}/**
	       *  Defines the boundaries of each chunk in axis unit.
	       *  @param {Array<(Array|Number)>} values - An array of either 2-component arrays (from-to) or number (mean)
	       *  @example axis.setChunkBoundaries( [ [ 12, 20 ], [ 100, 200 ] ] ); // First chunk from 12 to 20, second one from 100 to 200
	       *  @example axis.setChunkBoundaries( [ 12, [ 100, 200 ] ] ); // Second chunk from 100 to 200, first chunk with a mean at 12 and min / max determined by the relative widths of the chunks
	       *  @return {SplitAxis} The current axis instance
	       */},{key:'setChunkBoundaries',value:function setChunkBoundaries(values){var index=0,baseWidth=void 0,baseWidthIndex=void 0;var _iteratorNormalCompletion12=true;var _didIteratorError12=false;var _iteratorError12=undefined;try{for(var _iterator12=this.axes[Symbol.iterator](),_step12;!(_iteratorNormalCompletion12=(_step12=_iterator12.next()).done);_iteratorNormalCompletion12=true){var axis=_step12.value;// List all axes
// Two elements in the array => becomes the new reference
if(Array.isArray(values[index])&&values[index].length>1&&!baseWidth){baseWidth=values[index][1]-values[index][0];baseWidthIndex=index;}if(values[index].length==1||!Array.isArray(values[index])){axis._mean=values[index];if(Array.isArray(axis._mean)){axis._mean=axis._mean[0];}}else{axis.forceMin(values[index][0]).forceMax(values[index][1]);}index++;}}catch(err){_didIteratorError12=true;_iteratorError12=err;}finally{try{if(!_iteratorNormalCompletion12&&_iterator12.return){_iterator12.return();}}finally{if(_didIteratorError12){throw _iteratorError12;}}}this._baseWidthVal=baseWidth;this._baseWidthIndex=baseWidthIndex;this._splitVal=values;this.graph._axisHasChanged();return this;}},{key:'setMinMaxToFitSeries',value:function setMinMaxToFitSeries(){if(!this._splitVal||this._splitVal.length<1){_get(SplitAxis.prototype.__proto__||Object.getPrototypeOf(SplitAxis.prototype),'setMinMaxToFitSeries',this).apply(this,arguments);this._splitVal[0]=this._splitVal[0]||[];this._splitVal[this._splitVal.length-1]=this._splitVal[this._splitVal.length-1]||[];this._splitVal[0][0]=this.getCurrentMin();this._splitVal[this._splitVal.length-1][1]=this.getCurrentMax();this.setChunkBoundaries(this._splitVal);}}},{key:'draw',value:function draw(){var _this64=this;if(this.autoSpread){this._splitSpread();}var max=0;var unit=void 0;var subAxis=void 0;var spanReference=void 0;if(this._baseWidthIndex>=0&&(subAxis=this.getSubAxis(this._baseWidthIndex))){spanReference=subAxis.getSpan();}subAxis=undefined;if(this.fixGridFor>=0&&(subAxis=this.getSubAxis(this.fixGridFor))){if(subAxis._mean!==undefined){var width=(subAxis.getSpan()[1]-subAxis.getSpan()[0])/(spanReference[1]-spanReference[0])*this._baseWidthVal;subAxis.forceMin(subAxis._mean-width/2);subAxis.forceMax(subAxis._mean+width/2);}max=subAxis.draw();unit=subAxis.getPrimaryTickUnit();}this.axes.map(function(axis){if(subAxis===axis){return;}if(axis._mean!==undefined){var _width=(axis.getSpan()[1]-axis.getSpan()[0])/(spanReference[1]-spanReference[0])*_this64._baseWidthVal;axis.forceMin(axis._mean-_width/2);axis.forceMax(axis._mean+_width/2);}if(unit){axis.forcePrimaryTickUnit(unit);}max=Math.max(max,axis.draw());});//    this.drawLabel();
this.writeUnit();return max;}},{key:'setMinPx',value:function setMinPx(min){_get(SplitAxis.prototype.__proto__||Object.getPrototypeOf(SplitAxis.prototype),'setMinPx',this).call(this,min);var _iteratorNormalCompletion13=true;var _didIteratorError13=false;var _iteratorError13=undefined;try{for(var _iterator13=this.axes[Symbol.iterator](),_step13;!(_iteratorNormalCompletion13=(_step13=_iterator13.next()).done);_iteratorNormalCompletion13=true){var axis=_step13.value;axis.setMinPx(min);}}catch(err){_didIteratorError13=true;_iteratorError13=err;}finally{try{if(!_iteratorNormalCompletion13&&_iterator13.return){_iterator13.return();}}finally{if(_didIteratorError13){throw _iteratorError13;}}}}},{key:'setMaxPx',value:function setMaxPx(max){_get(SplitAxis.prototype.__proto__||Object.getPrototypeOf(SplitAxis.prototype),'setMaxPx',this).call(this,max);var _iteratorNormalCompletion14=true;var _didIteratorError14=false;var _iteratorError14=undefined;try{for(var _iterator14=this.axes[Symbol.iterator](),_step14;!(_iteratorNormalCompletion14=(_step14=_iterator14.next()).done);_iteratorNormalCompletion14=true){var axis=_step14.value;axis.setMaxPx(max);}}catch(err){_didIteratorError14=true;_iteratorError14=err;}finally{try{if(!_iteratorNormalCompletion14&&_iterator14.return){_iterator14.return();}}finally{if(_didIteratorError14){throw _iteratorError14;}}}}},{key:'setShift',value:function setShift(){_get(SplitAxis.prototype.__proto__||Object.getPrototypeOf(SplitAxis.prototype),'setShift',this).apply(this,arguments);var _iteratorNormalCompletion15=true;var _didIteratorError15=false;var _iteratorError15=undefined;try{for(var _iterator15=this.axes[Symbol.iterator](),_step15;!(_iteratorNormalCompletion15=(_step15=_iterator15.next()).done);_iteratorNormalCompletion15=true){var axis=_step15.value;axis.setShift.apply(axis,arguments);}}catch(err){_didIteratorError15=true;_iteratorError15=err;}finally{try{if(!_iteratorNormalCompletion15&&_iterator15.return){_iterator15.return();}}finally{if(_didIteratorError15){throw _iteratorError15;}}}}},{key:'init',value:function init(){_get(SplitAxis.prototype.__proto__||Object.getPrototypeOf(SplitAxis.prototype),'init',this).apply(this,arguments);this.splitAxis();}},{key:'getAxisPosition',value:function getAxisPosition(){var max=0;this.axes.map(function(axis){max=Math.max(max,axis.getAxisPosition());});return max;}},{key:'getSubAxis',value:function getSubAxis(index){if(this.axes.length<=index){throw"Impossible to reach axis. Index "+index+" is out of range";}return this.axes[index];}},{key:'splitNumber',get:function get(){return this._splits.length;}}]);return SplitAxis;}(mixin);delegateMethods.map(function(methodName){cl.prototype[methodName]=function(method){return function(){var _arguments=arguments;//super[ method ]( ...arguments )
this.axes.map(function(axis){axis[method].apply(axis,_arguments);});return this;};}(methodName);});return cl;};var SplitXAxis=function(_SplitAxis){_inherits(SplitXAxis,_SplitAxis);function SplitXAxis(graph,topbottom,options){_classCallCheck(this,SplitXAxis);var _this65=_possibleConstructorReturn(this,(SplitXAxis.__proto__||Object.getPrototypeOf(SplitXAxis)).apply(this,arguments));_this65.topbottom=topbottom;return _this65;}_createClass(SplitXAxis,[{key:'getConstructor',value:function getConstructor(){return _graphAxis2.default;}},{key:'getAxisPosition',value:function getAxisPosition(){var max=_get(SplitXAxis.prototype.__proto__||Object.getPrototypeOf(SplitXAxis.prototype),'getAxisPosition',this).apply(this,arguments);this.labelPosY=max;if(this.getLabel()){max+=this.graph.options.fontSize;}return max;}},{key:'drawLabel',value:function drawLabel(){_get(SplitXAxis.prototype.__proto__||Object.getPrototypeOf(SplitXAxis.prototype),'drawLabel',this).call(this);this.label.setAttribute('y',(this.top?-1:1)*(this.graph.options.fontSize+this.labelPosY));}},{key:'draw',value:function draw(){var height=_get(SplitXAxis.prototype.__proto__||Object.getPrototypeOf(SplitXAxis.prototype),'draw',this).apply(this,arguments);this.drawLabel();return height;}}]);return SplitXAxis;}(SplitAxis(_graphAxis2.default));var SplitYAxis=function(_SplitAxis2){_inherits(SplitYAxis,_SplitAxis2);function SplitYAxis(graph,leftright,options){_classCallCheck(this,SplitYAxis);return _possibleConstructorReturn(this,(SplitYAxis.__proto__||Object.getPrototypeOf(SplitYAxis)).apply(this,arguments));///this.leftright = leftright;
}_createClass(SplitYAxis,[{key:'getConstructor',value:function getConstructor(){return _graphAxis4.default;}/*
	      draw() {
	         if ( this.getLabel() ) {
	          this.axes.map( ( axis ) => {
	            axis.setAxisPosition( this.graph.options.fontSize );
	          } ); // Extra shift allowed for the label
	          //this.setShift( this.graph.options.fontSize );
	        }
	        return super.draw( ...arguments );
	      }
	    */},{key:'drawLabel',value:function drawLabel(){_get(SplitYAxis.prototype.__proto__||Object.getPrototypeOf(SplitYAxis.prototype),'drawLabel',this).call(this);}},{key:'equalizePosition',value:function equalizePosition(width){var widthAfter=width;if(this.getLabel()){this.axes.map(function(axis){widthAfter=Math.max(axis.equalizePosition(width),widthAfter);});// Extra shift allowed for the label
//this.setShift( this.graph.options.fontSize );
}if(this.getLabel()){this.placeLabel(this.left?-widthAfter:widthAfter);return widthAfter+this.graph.options.fontSize;}}}]);return SplitYAxis;}(SplitAxis(_graphAxis4.default));util.mix(SplitXAxis,new _graphAxis2.default());util.mix(SplitYAxis,new _graphAxis4.default());exports.default=PluginAxisSplitting;});/***/},/* 49 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(3),__webpack_require__(40)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('../graph.util'),require('./graph.plugin'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graph);global.graphPluginMakeTracesDifferent=mod.exports;}})(this,function(exports,_graph,_graph2){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var util=_interopRequireWildcard(_graph);var _graph3=_interopRequireDefault(_graph2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}/**
	   * The intent of this plugin is to provide methods for the user to make the traces on the graph automatically different
	   * Options to provide colorization, markers and line styles should be provided
	   * @extends Plugin
	   */var PluginMakeTracesDifferent=function(_graph3$default4){_inherits(PluginMakeTracesDifferent,_graph3$default4);function PluginMakeTracesDifferent(){_classCallCheck(this,PluginMakeTracesDifferent);return _possibleConstructorReturn(this,(PluginMakeTracesDifferent.__proto__||Object.getPrototypeOf(PluginMakeTracesDifferent)).apply(this,arguments));}_createClass(PluginMakeTracesDifferent,[{key:'init',value:function init(graph,options){_get(PluginMakeTracesDifferent.prototype.__proto__||Object.getPrototypeOf(PluginMakeTracesDifferent.prototype),'init',this).call(this,graph,options);}// Load this with defaults
},{key:'checkHSL',value:function checkHSL(color){var result={},hue=void 0,saturation=void 0,lightness=void 0;if(hue=color.h||color.hue){if(hue<1){hue=Math.round(hue*360);}result.hue=hue;}else{result.h=0;}if(saturation=color.s||color.saturation){if(saturation>1){saturation/=100;}result.saturation=saturation;}else{result.saturation=.75;}if(lightness=color.lightness||color.l){if(lightness>1){lightness/=100;}result.lightness=lightness;}else{result.lightness=0.5;}return result;}},{key:'buildHSLString',value:function buildHSLString(hsl){return"hsl( "+Math.round(hsl.h)+", "+Math.round(hsl.s*100)+"%, "+Math.round(hsl.l*100)+"%)";}},{key:'colorizeAll',value:function colorizeAll(options){var _this68=this;var series=void 0,seriesLength=void 0;if(options.serieTypes){var _graph11;if(!Array.isArray(options.serieTypes)){options.serieTypes=[options.serieTypes];}series=(_graph11=this.graph).allSeries.apply(_graph11,_toConsumableArray(options.serieTypes));}else{series=this.graph.getSeries();}seriesLength=series.length;if(!options.startingColorHSL){if(options.colorHSL){options.startingColorHSL=this.checkHSL(options.colorHSL);}else{throw"No starting color was provided. There must exist either options.colorHSL or options.startingColorHSL";}}if(!options.endingColorHSL){if(!options.affect||!["h","s","l","hue","saturation","lightness"].include(options.affect)){options.affect="h";}switch(options.affect){case'h':case'hue':options.endingColorHSL={h:options.startingColorHSL.h+300,s:options.startingColorHSL.s,l:options.startingColorHSL.l};break;case'saturation':case's':var endS=void 0;if(options.startingColorHSL.s>0.5){endS=0;}else{endS=1;}options.endingColorHSL={h:options.startingColorHSL.h,s:endS,l:options.startingColorHSL.l};break;case'lightness':case'l':var endL=void 0;if(options.startingColorHSL.l>0.5){endL=0;}else{endL=0.75;}options.endingColorHSL={h:options.startingColorHSL.h,s:options.startingColorHSL.s,l:endL};break;}}else{options.endingColorHSL=Object.assign({},options.startingColorHSL,options.endingColorHSL);}series.map(function(serie,index){if(!serie.setLineColor){throw"The serie "+serie.getName()+" does not implement the method `startingColor`";}serie.setLineColor(_this68.buildHSLString({h:options.startingColorHSL.h+index/(seriesLength-1)*(options.endingColorHSL.h-options.startingColorHSL.h),s:options.startingColorHSL.s+index/(seriesLength-1)*(options.endingColorHSL.s-options.startingColorHSL.s),l:options.startingColorHSL.l+index/(seriesLength-1)*(options.endingColorHSL.l-options.startingColorHSL.l)}));});}}],[{key:'defaults',value:function defaults(){return{};}}]);return PluginMakeTracesDifferent;}(_graph3.default);exports.default=PluginMakeTracesDifferent;});/***/},/* 50 *//***/function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_ARRAY__,__WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__=[exports,__webpack_require__(3),__webpack_require__(28)],__WEBPACK_AMD_DEFINE_FACTORY__=factory,__WEBPACK_AMD_DEFINE_RESULT__=typeof __WEBPACK_AMD_DEFINE_FACTORY__==='function'?__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports,__WEBPACK_AMD_DEFINE_ARRAY__):__WEBPACK_AMD_DEFINE_FACTORY__,__WEBPACK_AMD_DEFINE_RESULT__!==undefined&&(module.exports=__WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports!=="undefined"){factory(exports,require('../graph.util'),require('./graph.shape'));}else{var mod={exports:{}};factory(mod.exports,global.graph,global.graph);global.graphShapeEllipse=mod.exports;}})(this,function(exports,_graph,_graph2){'use strict';Object.defineProperty(exports,"__esModule",{value:true});var util=_interopRequireWildcard(_graph);var _graph3=_interopRequireDefault(_graph2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}/**
	   * Displays an ellipse
	   * @extends Shape
	   */var ShapeEllipse=function(_graph3$default5){_inherits(ShapeEllipse,_graph3$default5);function ShapeEllipse(graph,options){_classCallCheck(this,ShapeEllipse);return _possibleConstructorReturn(this,(ShapeEllipse.__proto__||Object.getPrototypeOf(ShapeEllipse)).call(this,graph,options));}_createClass(ShapeEllipse,[{key:'createDom',value:function createDom(){this._dom=document.createElementNS(this.graph.ns,'ellipse');}},{key:'applyPosition',value:function applyPosition(){var pos=this.computePosition(0);this.setDom('cx',pos.x||0);this.setDom('cy',pos.y||0);this.setDom('rx',this.getProp('rx')||0);this.setDom('ry',this.getProp('ry')||0);return true;}},{key:'setR',value:function setR(rx,ry){this.setProp('rx',rx);this.setProp('ry',ry);}},{key:'handleMouseUpImpl',value:function handleMouseUpImpl(){this.triggerChange();}},{key:'handleMouseMoveImpl',value:function handleMouseMoveImpl(e,deltaX,deltaY,deltaXPx,deltaYPx){return;}}]);return ShapeEllipse;}(_graph3.default);exports.default=ShapeEllipse;});/***/}/******/]));});;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(37)(module)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(2);
  var warning = __webpack_require__(1);
  var ReactPropTypesSecret = __webpack_require__(13);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



// React 15.5 references this module, and assumes PropTypes are still callable in production.
// Therefore we re-export development-only version with all the PropTypes checks here.
// However if one is migrating to the `prop-types` npm library, they will go through the
// `index.js` entry point, and it will branch depending on the environment.
var factory = __webpack_require__(22);
module.exports = function(isValidElement) {
  // It is still allowed in 15.5.
  var throwOnDirectAccess = false;
  return factory(isValidElement, throwOnDirectAccess);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(8);
var invariant = __webpack_require__(2);
var warning = __webpack_require__(1);

var ReactPropTypesSecret = __webpack_require__(13);
var checkPropTypes = __webpack_require__(20);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(4);

var invariant = __webpack_require__(2);

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

module.exports = PooledClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(5);

var ReactChildren = __webpack_require__(26);
var ReactComponent = __webpack_require__(10);
var ReactPureComponent = __webpack_require__(31);
var ReactClass = __webpack_require__(27);
var ReactDOMFactories = __webpack_require__(28);
var ReactElement = __webpack_require__(3);
var ReactPropTypes = __webpack_require__(29);
var ReactVersion = __webpack_require__(32);

var onlyChild = __webpack_require__(34);
var warning = __webpack_require__(1);

var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if (process.env.NODE_ENV !== 'production') {
  var canDefineProperty = __webpack_require__(7);
  var ReactElementValidator = __webpack_require__(15);
  var didWarnPropTypesDeprecated = false;
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var __spread = _assign;

if (process.env.NODE_ENV !== 'production') {
  var warned = false;
  __spread = function () {
    process.env.NODE_ENV !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
    warned = true;
    return _assign.apply(null, arguments);
  };
}

var React = {

  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactComponent,
  PureComponent: ReactPureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: createFactory,
  createMixin: function (mixin) {
    // Currently a noop. Will be used to validate and trace mixins.
    return mixin;
  },

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

// TODO: Fix tests so that this deprecation warning doesn't cause failures.
if (process.env.NODE_ENV !== 'production') {
  if (canDefineProperty) {
    Object.defineProperty(React, 'PropTypes', {
      get: function () {
        process.env.NODE_ENV !== 'production' ? warning(didWarnPropTypesDeprecated, 'Accessing PropTypes via the main React package is deprecated. Use ' + 'the prop-types package from npm instead.') : void 0;
        didWarnPropTypesDeprecated = true;
        return ReactPropTypes;
      }
    });
  }
}

module.exports = React;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var PooledClass = __webpack_require__(24);
var ReactElement = __webpack_require__(3);

var emptyFunction = __webpack_require__(8);
var traverseAllChildren = __webpack_require__(35);

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(4),
    _assign = __webpack_require__(5);

var ReactComponent = __webpack_require__(10);
var ReactElement = __webpack_require__(3);
var ReactPropTypeLocationNames = __webpack_require__(16);
var ReactNoopUpdateQueue = __webpack_require__(12);

var emptyObject = __webpack_require__(9);
var invariant = __webpack_require__(2);
var warning = __webpack_require__(1);

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

/**
 * Policies that describe methods in `ReactClassInterface`.
 */


var injectedMixins = [];

/**
 * Composite components are higher-level components that compose other composite
 * or host components.
 *
 * To create a new type of `ReactClass`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactClassInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will be available on the prototype.
 *
 * @interface ReactClassInterface
 * @internal
 */
var ReactClassInterface = {

  /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */
  mixins: 'DEFINE_MANY',

  /**
   * An object containing properties and methods that should be defined on
   * the component's constructor instead of its prototype (static methods).
   *
   * @type {object}
   * @optional
   */
  statics: 'DEFINE_MANY',

  /**
   * Definition of prop types for this component.
   *
   * @type {object}
   * @optional
   */
  propTypes: 'DEFINE_MANY',

  /**
   * Definition of context types for this component.
   *
   * @type {object}
   * @optional
   */
  contextTypes: 'DEFINE_MANY',

  /**
   * Definition of context types this component sets for its children.
   *
   * @type {object}
   * @optional
   */
  childContextTypes: 'DEFINE_MANY',

  // ==== Definition methods ====

  /**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   *
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   *
   * @return {object}
   * @optional
   */
  getDefaultProps: 'DEFINE_MANY_MERGED',

  /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   *
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */
  getInitialState: 'DEFINE_MANY_MERGED',

  /**
   * @return {object}
   * @optional
   */
  getChildContext: 'DEFINE_MANY_MERGED',

  /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @required
   */
  render: 'DEFINE_ONCE',

  // ==== Delegate methods ====

  /**
   * Invoked when the component is initially created and about to be mounted.
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   *
   * @optional
   */
  componentWillMount: 'DEFINE_MANY',

  /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   *
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidMount: 'DEFINE_MANY',

  /**
   * Invoked before the component receives new props.
   *
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   *
   *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   *
   * @param {object} nextProps
   * @optional
   */
  componentWillReceiveProps: 'DEFINE_MANY',

  /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props, state and/or context.
   *
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props/state/context will not require a component
   * update.
   *
   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @return {boolean} True if the component should update.
   * @optional
   */
  shouldComponentUpdate: 'DEFINE_ONCE',

  /**
   * Invoked when the component is about to update due to a transition from
   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
   * and `nextContext`.
   *
   * Use this as an opportunity to perform preparation before an update occurs.
   *
   * NOTE: You **cannot** use `this.setState()` in this method.
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */
  componentWillUpdate: 'DEFINE_MANY',

  /**
   * Invoked when the component's DOM representation has been updated.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   *
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {?object} prevContext
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidUpdate: 'DEFINE_MANY',

  /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   *
   * Use this as an opportunity to deallocate any external resources.
   *
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   *
   * @optional
   */
  componentWillUnmount: 'DEFINE_MANY',

  // ==== Advanced methods ====

  /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */
  updateComponent: 'OVERRIDE_BASE'

};

/**
 * Mapping from class specification keys to special processing functions.
 *
 * Although these are declared like instance properties in the specification
 * when defining classes using `React.createClass`, they are actually static
 * and are accessible on the constructor instead of the prototype. Despite
 * being static, they must be defined outside of the "statics" key under
 * which all other static methods are defined.
 */
var RESERVED_SPEC_KEYS = {
  displayName: function (Constructor, displayName) {
    Constructor.displayName = displayName;
  },
  mixins: function (Constructor, mixins) {
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        mixSpecIntoComponent(Constructor, mixins[i]);
      }
    }
  },
  childContextTypes: function (Constructor, childContextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, childContextTypes, 'childContext');
    }
    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
  },
  contextTypes: function (Constructor, contextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, contextTypes, 'context');
    }
    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
  },
  /**
   * Special case getDefaultProps which should move into statics but requires
   * automatic merging.
   */
  getDefaultProps: function (Constructor, getDefaultProps) {
    if (Constructor.getDefaultProps) {
      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
    } else {
      Constructor.getDefaultProps = getDefaultProps;
    }
  },
  propTypes: function (Constructor, propTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, propTypes, 'prop');
    }
    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
  },
  statics: function (Constructor, statics) {
    mixStaticSpecIntoComponent(Constructor, statics);
  },
  autobind: function () {} };

function validateTypeDef(Constructor, typeDef, location) {
  for (var propName in typeDef) {
    if (typeDef.hasOwnProperty(propName)) {
      // use a warning instead of an invariant so components
      // don't show up in prod but only in __DEV__
      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
    }
  }
}

function validateMethodOverride(isAlreadyDefined, name) {
  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

  // Disallow overriding of base class methods unless explicitly allowed.
  if (ReactClassMixin.hasOwnProperty(name)) {
    !(specPolicy === 'OVERRIDE_BASE') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name) : _prodInvariant('73', name) : void 0;
  }

  // Disallow defining methods more than once unless explicitly allowed.
  if (isAlreadyDefined) {
    !(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('74', name) : void 0;
  }
}

/**
 * Mixin helper which handles policy validation and reserved
 * specification keys when building React classes.
 */
function mixSpecIntoComponent(Constructor, spec) {
  if (!spec) {
    if (process.env.NODE_ENV !== 'production') {
      var typeofSpec = typeof spec;
      var isMixinValid = typeofSpec === 'object' && spec !== null;

      process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
    }

    return;
  }

  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component class or function as a mixin. Instead, just use a regular object.') : _prodInvariant('75') : void 0;
  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component as a mixin. Instead, just use a regular object.') : _prodInvariant('76') : void 0;

  var proto = Constructor.prototype;
  var autoBindPairs = proto.__reactAutoBindPairs;

  // By handling mixins before any other properties, we ensure the same
  // chaining order is applied to methods with DEFINE_MANY policy, whether
  // mixins are listed before or after these methods in the spec.
  if (spec.hasOwnProperty(MIXINS_KEY)) {
    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) {
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === MIXINS_KEY) {
      // We have already handled mixins in a special case above.
      continue;
    }

    var property = spec[name];
    var isAlreadyDefined = proto.hasOwnProperty(name);
    validateMethodOverride(isAlreadyDefined, name);

    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
      RESERVED_SPEC_KEYS[name](Constructor, property);
    } else {
      // Setup methods on prototype:
      // The following member methods should not be automatically bound:
      // 1. Expected ReactClass methods (in the "interface").
      // 2. Overridden methods (that were mixed in).
      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
      var isFunction = typeof property === 'function';
      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

      if (shouldAutoBind) {
        autoBindPairs.push(name, property);
        proto[name] = property;
      } else {
        if (isAlreadyDefined) {
          var specPolicy = ReactClassInterface[name];

          // These cases should already be caught by validateMethodOverride.
          !(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY')) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', specPolicy, name) : _prodInvariant('77', specPolicy, name) : void 0;

          // For methods which are defined more than once, call the existing
          // methods before calling the new property, merging if appropriate.
          if (specPolicy === 'DEFINE_MANY_MERGED') {
            proto[name] = createMergedResultFunction(proto[name], property);
          } else if (specPolicy === 'DEFINE_MANY') {
            proto[name] = createChainedFunction(proto[name], property);
          }
        } else {
          proto[name] = property;
          if (process.env.NODE_ENV !== 'production') {
            // Add verbose displayName to the function, which helps when looking
            // at profiling tools.
            if (typeof property === 'function' && spec.displayName) {
              proto[name].displayName = spec.displayName + '_' + name;
            }
          }
        }
      }
    }
  }
}

function mixStaticSpecIntoComponent(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    var isReserved = name in RESERVED_SPEC_KEYS;
    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', name) : _prodInvariant('78', name) : void 0;

    var isInherited = name in Constructor;
    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('79', name) : void 0;
    Constructor[name] = property;
  }
}

/**
 * Merge two objects, but throw if both contain the same key.
 *
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */
function mergeIntoWithNoDuplicateKeys(one, two) {
  !(one && two && typeof one === 'object' && typeof two === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : _prodInvariant('80') : void 0;

  for (var key in two) {
    if (two.hasOwnProperty(key)) {
      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.', key) : _prodInvariant('81', key) : void 0;
      one[key] = two[key];
    }
  }
  return one;
}

/**
 * Creates a function that invokes two functions and merges their return values.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createMergedResultFunction(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    var c = {};
    mergeIntoWithNoDuplicateKeys(c, a);
    mergeIntoWithNoDuplicateKeys(c, b);
    return c;
  };
}

/**
 * Creates a function that invokes two functions and ignores their return vales.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createChainedFunction(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

/**
 * Binds a method to the component.
 *
 * @param {object} component Component whose method is going to be bound.
 * @param {function} method Method to be bound.
 * @return {function} The bound method.
 */
function bindAutoBindMethod(component, method) {
  var boundMethod = method.bind(component);
  if (process.env.NODE_ENV !== 'production') {
    boundMethod.__reactBoundContext = component;
    boundMethod.__reactBoundMethod = method;
    boundMethod.__reactBoundArguments = null;
    var componentName = component.constructor.displayName;
    var _bind = boundMethod.bind;
    boundMethod.bind = function (newThis) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // User is trying to bind() an autobound method; we effectively will
      // ignore the value of "this" that the user is trying to use, so
      // let's warn.
      if (newThis !== component && newThis !== null) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
      } else if (!args.length) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
        return boundMethod;
      }
      var reboundMethod = _bind.apply(boundMethod, arguments);
      reboundMethod.__reactBoundContext = component;
      reboundMethod.__reactBoundMethod = method;
      reboundMethod.__reactBoundArguments = args;
      return reboundMethod;
    };
  }
  return boundMethod;
}

/**
 * Binds all auto-bound methods in a component.
 *
 * @param {object} component Component whose method is going to be bound.
 */
function bindAutoBindMethods(component) {
  var pairs = component.__reactAutoBindPairs;
  for (var i = 0; i < pairs.length; i += 2) {
    var autoBindKey = pairs[i];
    var method = pairs[i + 1];
    component[autoBindKey] = bindAutoBindMethod(component, method);
  }
}

/**
 * Add more to the ReactClass base class. These are all legacy features and
 * therefore not already part of the modern ReactComponent.
 */
var ReactClassMixin = {

  /**
   * TODO: This will be deprecated because state should always keep a consistent
   * type signature and the only use case for this, is to avoid that.
   */
  replaceState: function (newState, callback) {
    this.updater.enqueueReplaceState(this, newState);
    if (callback) {
      this.updater.enqueueCallback(this, callback, 'replaceState');
    }
  },

  /**
   * Checks whether or not this composite component is mounted.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function () {
    return this.updater.isMounted(this);
  }
};

var ReactClassComponent = function () {};
_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

var didWarnDeprecated = false;

/**
 * Module for creating composite components.
 *
 * @class ReactClass
 */
var ReactClass = {

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  createClass: function (spec) {
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(didWarnDeprecated, '%s: React.createClass is deprecated and will be removed in version 16. ' + 'Use plain JavaScript classes instead. If you\'re not yet ready to ' + 'migrate, create-react-class is available on npm as a ' + 'drop-in replacement.', spec && spec.displayName || 'A Component') : void 0;
      didWarnDeprecated = true;
    }

    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (initialState === undefined && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : _prodInvariant('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : _prodInvariant('83') : void 0;

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  },

  injection: {
    injectMixin: function (mixin) {
      injectedMixins.push(mixin);
    }
  }

};

module.exports = ReactClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var ReactElement = __webpack_require__(3);

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement.createFactory;
if (process.env.NODE_ENV !== 'production') {
  var ReactElementValidator = __webpack_require__(15);
  createDOMFactory = ReactElementValidator.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

module.exports = ReactDOMFactories;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _require = __webpack_require__(3),
    isValidElement = _require.isValidElement;

var factory = __webpack_require__(21);

module.exports = factory(isValidElement);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(5);

var ReactComponent = __webpack_require__(10);
var ReactNoopUpdateQueue = __webpack_require__(12);

var emptyObject = __webpack_require__(9);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
_assign(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

module.exports = ReactPureComponent;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



module.exports = '15.5.4';

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(4);

var ReactPropTypeLocationNames = __webpack_require__(16);
var ReactPropTypesSecret = __webpack_require__(30);

var invariant = __webpack_require__(2);
var warning = __webpack_require__(1);

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = __webpack_require__(11);
}

var loggedTypeFailures = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?object} element The React element that is being type-checked
 * @param {?number} debugID The React component instance that is being type-checked
 * @private
 */
function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
      } catch (ex) {
        error = ex;
      }
      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var componentStackInfo = '';

        if (process.env.NODE_ENV !== 'production') {
          if (!ReactComponentTreeHook) {
            ReactComponentTreeHook = __webpack_require__(11);
          }
          if (debugID !== null) {
            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
          } else if (element !== null) {
            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
          }
        }

        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
      }
    }
  }
}

module.exports = checkReactTypeSpec;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */


var _prodInvariant = __webpack_require__(4);

var ReactElement = __webpack_require__(3);

var invariant = __webpack_require__(2);

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
  return children;
}

module.exports = onlyChild;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(4);

var ReactCurrentOwner = __webpack_require__(6);
var REACT_ELEMENT_TYPE = __webpack_require__(14);

var getIteratorFn = __webpack_require__(17);
var invariant = __webpack_require__(2);
var KeyEscapeUtils = __webpack_require__(23);
var warning = __webpack_require__(1);

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          var mapsAsChildrenAddendum = '';
          if (ReactCurrentOwner.current) {
            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
            if (mapsAsChildrenOwnerName) {
              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
            }
          }
          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if (process.env.NODE_ENV !== 'production') {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(25);


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ })
/******/ ]);
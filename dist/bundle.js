(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":32}],2:[function(require,module,exports){
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

},{}],3:[function(require,module,exports){
var baseTimes = require('./_baseTimes'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isIndex = require('./_isIndex'),
    isTypedArray = require('./isTypedArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;

},{"./_baseTimes":13,"./_isIndex":23,"./isArguments":40,"./isArray":41,"./isBuffer":43,"./isTypedArray":48}],4:[function(require,module,exports){
var baseAssignValue = require('./_baseAssignValue'),
    eq = require('./eq');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;

},{"./_baseAssignValue":5,"./eq":38}],5:[function(require,module,exports){
var defineProperty = require('./_defineProperty');

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

},{"./_defineProperty":18}],6:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  value = Object(value);
  return (symToStringTag && symToStringTag in value)
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":1,"./_getRawTag":21,"./_objectToString":29}],7:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

},{"./_baseGetTag":6,"./isObjectLike":47}],8:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isMasked = require('./_isMasked'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

},{"./_isMasked":25,"./_toSource":35,"./isFunction":44,"./isObject":46}],9:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

},{"./_baseGetTag":6,"./isLength":45,"./isObjectLike":47}],10:[function(require,module,exports){
var isPrototype = require('./_isPrototype'),
    nativeKeys = require('./_nativeKeys');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;

},{"./_isPrototype":26,"./_nativeKeys":27}],11:[function(require,module,exports){
var identity = require('./identity'),
    overRest = require('./_overRest'),
    setToString = require('./_setToString');

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;

},{"./_overRest":31,"./_setToString":33,"./identity":39}],12:[function(require,module,exports){
var constant = require('./constant'),
    defineProperty = require('./_defineProperty'),
    identity = require('./identity');

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;

},{"./_defineProperty":18,"./constant":37,"./identity":39}],13:[function(require,module,exports){
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

},{}],14:[function(require,module,exports){
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;

},{}],15:[function(require,module,exports){
var assignValue = require('./_assignValue'),
    baseAssignValue = require('./_baseAssignValue');

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;

},{"./_assignValue":4,"./_baseAssignValue":5}],16:[function(require,module,exports){
var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

},{"./_root":32}],17:[function(require,module,exports){
var baseRest = require('./_baseRest'),
    isIterateeCall = require('./_isIterateeCall');

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"./_baseRest":11,"./_isIterateeCall":24}],18:[function(require,module,exports){
var getNative = require('./_getNative');

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;

},{"./_getNative":20}],19:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],20:[function(require,module,exports){
var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./_baseIsNative":8,"./_getValue":22}],21:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":1}],22:[function(require,module,exports){
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

},{}],23:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;

},{}],24:[function(require,module,exports){
var eq = require('./eq'),
    isArrayLike = require('./isArrayLike'),
    isIndex = require('./_isIndex'),
    isObject = require('./isObject');

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;

},{"./_isIndex":23,"./eq":38,"./isArrayLike":42,"./isObject":46}],25:[function(require,module,exports){
var coreJsData = require('./_coreJsData');

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;

},{"./_coreJsData":16}],26:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;

},{}],27:[function(require,module,exports){
var overArg = require('./_overArg');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;

},{"./_overArg":30}],28:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

},{"./_freeGlobal":19}],29:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],30:[function(require,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],31:[function(require,module,exports){
var apply = require('./_apply');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

},{"./_apply":2}],32:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":19}],33:[function(require,module,exports){
var baseSetToString = require('./_baseSetToString'),
    shortOut = require('./_shortOut');

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;

},{"./_baseSetToString":12,"./_shortOut":34}],34:[function(require,module,exports){
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

},{}],35:[function(require,module,exports){
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

},{}],36:[function(require,module,exports){
var assignValue = require('./_assignValue'),
    copyObject = require('./_copyObject'),
    createAssigner = require('./_createAssigner'),
    isArrayLike = require('./isArrayLike'),
    isPrototype = require('./_isPrototype'),
    keys = require('./keys');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function(object, source) {
  if (isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

module.exports = assign;

},{"./_assignValue":4,"./_copyObject":15,"./_createAssigner":17,"./_isPrototype":26,"./isArrayLike":42,"./keys":49}],37:[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],38:[function(require,module,exports){
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],39:[function(require,module,exports){
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],40:[function(require,module,exports){
var baseIsArguments = require('./_baseIsArguments'),
    isObjectLike = require('./isObjectLike');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;

},{"./_baseIsArguments":7,"./isObjectLike":47}],41:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],42:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

},{"./isFunction":44,"./isLength":45}],43:[function(require,module,exports){
var root = require('./_root'),
    stubFalse = require('./stubFalse');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

},{"./_root":32,"./stubFalse":50}],44:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObject = require('./isObject');

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

},{"./_baseGetTag":6,"./isObject":46}],45:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],46:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],47:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],48:[function(require,module,exports){
var baseIsTypedArray = require('./_baseIsTypedArray'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;

},{"./_baseIsTypedArray":9,"./_baseUnary":14,"./_nodeUtil":28}],49:[function(require,module,exports){
var arrayLikeKeys = require('./_arrayLikeKeys'),
    baseKeys = require('./_baseKeys'),
    isArrayLike = require('./isArrayLike');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

},{"./_arrayLikeKeys":3,"./_baseKeys":10,"./isArrayLike":42}],50:[function(require,module,exports){
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

},{}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layout = require('../Layout');

var _index = require('./index');

var _assign4 = require('lodash/assign');

var _assign5 = _interopRequireDefault(_assign4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.state = _this.getDefaultState();
		_this.addItem = _this.addItem.bind(_this);
		_this.setVoteValue = _this.setVoteValue.bind(_this);
		_this.setEditing = _this.setEditing.bind(_this);
		_this.updateMessage = _this.updateMessage.bind(_this);
		_this.increment = _this.increment.bind(_this);
		_this.persist = _this.persist.bind(_this);
		_this.clearStorage = _this.clearStorage.bind(_this);
		return _this;
	}

	_createClass(App, [{
		key: 'getDefaultState',
		value: function getDefaultState(reset) {
			var savedState = null;

			if (reset) {
				return (0, _assign5.default)({}, _index.defaultState);
			} else {
				try {
					savedState = JSON.parse(localStorage.getItem(_index.DATAKEY));
				} catch (e) {}

				return (0, _assign5.default)({}, _index.defaultState, savedState);
			}
		}
	}, {
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				actions: {
					addItem: this.addItem,
					setEditing: this.setEditing,
					setVoteValue: this.setVoteValue,
					updateMessage: this.updateMessage,
					increment: this.increment,
					clearStorage: this.clearStorage
				}
			};
		}
	}, {
		key: 'persist',
		value: function persist() {
			var _this2 = this;

			window.requestAnimationFrame(function () {
				localStorage.setItem(_index.DATAKEY, JSON.stringify(_this2.state));
			});
		}
	}, {
		key: 'updateMessage',
		value: function updateMessage(_ref) {
			var value = _ref.value,
			    id = _ref.id,
			    idx = _ref.idx;

			var mergeState = {};
			var nextList = this.state[id].slice(0);

			if (value.length === 0) {
				nextList = nextList.filter(function (item, _idx) {
					return idx !== _idx;
				});
			} else {
				nextList[idx].text = value;
			}

			this.setState(function (prevState, props) {
				return (0, _assign5.default)({}, prevState, _defineProperty({
					editing: null
				}, id, nextList));
			}, this.persist);
		}
	}, {
		key: 'setEditing',
		value: function setEditing(data) {
			if (data === null) {
				this.setState({ editing: null }, this.persist);
			} else {
				this.setState(function (prevState) {
					return (0, _assign5.default)({}, prevState, {
						editing: {
							id: data.id,
							idx: data.idx
						}
					});
				}, this.persist);
			}
		}
	}, {
		key: 'setVoteValue',
		value: function setVoteValue(idx, value) {
			var nextList = this.state[_Layout.BAD].slice(0);

			nextList[idx].value = value;

			this.setState(function (prevState) {
				return (0, _assign5.default)({}, prevState, _defineProperty({}, _Layout.BAD, nextList));
			}, this.persist);
		}
	}, {
		key: 'increment',
		value: function increment(idx) {
			this.setVoteValue(idx, this.state[_Layout.BAD][idx].value + 1);
		}
	}, {
		key: 'addItem',
		value: function addItem(_ref2) {
			var id = _ref2.id,
			    text = _ref2.text,
			    value = _ref2.value;

			var newList = this.state[id].slice(0);
			var newItem = { text: text };

			if (value !== undefined) {
				newItem.value = value;
			}

			newList.unshift(newItem);

			this.setState(function (prevState) {
				return (0, _assign5.default)({}, prevState, _defineProperty({}, id, newList));
			}, this.persist);
		}
	}, {
		key: 'clearStorage',
		value: function clearStorage() {
			this.setState(this.getDefaultState(true), this.persist);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(_Layout.Layout, this.state);
		}
	}]);

	return App;
}(React.Component);

exports.default = App;


App.displayName = 'App';

App.childContextTypes = {
	actions: React.PropTypes.object
};

},{"../Layout":58,"./index":54,"lodash/assign":36}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DATAKEY = exports.DATAKEY = 'react-retro-0';

},{}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.defaultState = undefined;

var _defaultState;

var _Layout = require('../Layout');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultState = exports.defaultState = (_defaultState = {}, _defineProperty(_defaultState, _Layout.GOOD, []), _defineProperty(_defaultState, _Layout.BAD, []), _defineProperty(_defaultState, _Layout.NEXT, []), _defineProperty(_defaultState, 'view', _Layout.DEFAULT_VIEW), _defineProperty(_defaultState, 'editing', null), _defaultState);

},{"../Layout":58}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = require('./App');

Object.defineProperty(exports, 'App', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_App).default;
  }
});

var _defaultState = require('./defaultState');

Object.defineProperty(exports, 'defaultState', {
  enumerable: true,
  get: function get() {
    return _defaultState.defaultState;
  }
});

var _constants = require('./constants');

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constants[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./App":51,"./constants":52,"./defaultState":53}],55:[function(require,module,exports){
(function (global){
'use strict';

/*
enables focus ring on keydown
disables focus ring on mouse/touch
*/

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FocusStyleToggle = function (_React$Component) {
	_inherits(FocusStyleToggle, _React$Component);

	function FocusStyleToggle(props) {
		_classCallCheck(this, FocusStyleToggle);

		var _this = _possibleConstructorReturn(this, (FocusStyleToggle.__proto__ || Object.getPrototypeOf(FocusStyleToggle)).call(this, props));

		_this.style = props.style || 'a,button,.message-content{outline: 0}';
		_this.state = { isOutlineDisabled: true };
		_this.onKey = _this.onKey.bind(_this);
		_this.onMouse = _this.onMouse.bind(_this);
		return _this;
	}

	_createClass(FocusStyleToggle, [{
		key: 'onKey',
		value: function onKey(e) {
			// TODO move 9 into constants somewhere
			if (e.keyCode === 9) {
				this.setState({ isOutlineDisabled: false });
			} else {
				this.setState({ isOutlineDisabled: true });
			}
		}
	}, {
		key: 'onMouse',
		value: function onMouse() {
			this.setState({ isOutlineDisabled: true });
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _global = global,
			    _global$document = _global.document,
			    bd = _global$document === undefined ? null : _global$document;


			if (bd) {
				bd.addEventListener('mousedown', this.onMouse, true);
				bd.addEventListener('touchstart', this.onMouse, true);
				bd.addEventListener('keydown', this.onKey, true);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			var _global2 = global,
			    _global2$document = _global2.document,
			    bd = _global2$document === undefined ? null : _global2$document;


			if (bd) {
				bd.removeEventListener('mousedown', this.onMouse, true);
				bd.removeEventListener('touchstart', this.onMouse, true);
				bd.removeEventListener('keydown', this.onKey, true);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.state.isOutlineDisabled) {
				return React.createElement(
					'style',
					null,
					this.style
				);
			} else {
				return null;
			}
		}
	}]);

	return FocusStyleToggle;
}(React.Component);

exports.default = FocusStyleToggle;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./index');

var _List = require('../List');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Layout = function (_React$Component) {
	_inherits(Layout, _React$Component);

	function Layout(props) {
		_classCallCheck(this, Layout);

		var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this, props));

		var ids = [_index.GOOD, _index.BAD, _index.NEXT];

		_this.listDefinitions = ids.map(function (id) {
			return {
				id: id,
				title: (0, _index.mapIdToTitle)(id),
				key: id + '-list'
			};
		});
		return _this;
	}

	_createClass(Layout, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _context$actions = this.context.actions,
			    setView = _context$actions.setView,
			    clearStorage = _context$actions.clearStorage;
			var editing = this.props.editing;


			return React.createElement(
				'div',
				{ id: 'app' },
				React.createElement(_index.FocusStyleToggle, null),
				React.createElement(
					'div',
					{ className: 'main-col' },
					React.createElement(
						'div',
						{ className: 'header' },
						React.createElement(
							'h1',
							{ className: 'text-center' },
							'Retrospective'
						)
					),
					React.createElement(
						'div',
						{ className: 'bd' },
						this.listDefinitions.map(function (definition) {
							var list = _this2.props[definition.id];
							return React.createElement(_List.List, _extends({}, definition, { list: list, editing: editing }));
						}, this)
					),
					React.createElement(
						'div',
						{ className: 'footer' },
						React.createElement(
							'button',
							{ onClick: function onClick() {
									clearStorage();
								} },
							'clear'
						),
						React.createElement(
							'button',
							{ onClick: function onClick() {} },
							'sort'
						),
						React.createElement(
							'button',
							{ onClick: function onClick() {} },
							'printable'
						)
					)
				)
			);
		}
	}]);

	return Layout;
}(React.Component);

exports.default = Layout;


Layout.contextTypes = {
	actions: React.PropTypes.object.isRequired
};

},{"../List":68,"./index":58}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var GOOD = exports.GOOD = 'GOOD';
var BAD = exports.BAD = 'BAD';
var NEXT = exports.NEXT = 'NEXT';
var ENTRY = exports.ENTRY = 'ENTRY';
var PRINT = exports.PRINT = 'PRINT';

var DEFAULT_VIEW = exports.DEFAULT_VIEW = ENTRY;

},{}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Layout = require('./Layout');

Object.defineProperty(exports, 'Layout', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Layout).default;
  }
});

var _FocusStyleToggle = require('./FocusStyleToggle');

Object.defineProperty(exports, 'FocusStyleToggle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FocusStyleToggle).default;
  }
});

var _mapIdToTitle = require('./lib/mapIdToTitle');

Object.defineProperty(exports, 'mapIdToTitle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mapIdToTitle).default;
  }
});

var _constants = require('./constants');

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constants[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./FocusStyleToggle":55,"./Layout":56,"./constants":57,"./lib/mapIdToTitle":59}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _index = require('../index');

var titleDictionary = {
	GOOD: 'Good',
	BAD: 'Bad',
	NEXT: 'Next'
};

var mapIdToTitle = function mapIdToTitle(id) {
	return titleDictionary[id] || '';
};

exports.default = mapIdToTitle;

},{"../index":58}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IncrementButton = function (_React$Component) {
	_inherits(IncrementButton, _React$Component);

	function IncrementButton(props) {
		_classCallCheck(this, IncrementButton);

		return _possibleConstructorReturn(this, (IncrementButton.__proto__ || Object.getPrototypeOf(IncrementButton)).call(this, props));
	}

	_createClass(IncrementButton, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'button',
				{
					onClick: this.props.onIncrement,
					className: 'increment-vote-button' },
				'+'
			);
		}
	}]);

	return IncrementButton;
}(React.Component);

exports.default = IncrementButton;

},{}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layout = require('../Layout');

var _index = require('./index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // get rid of this cross module dependency


var InnerList = function (_React$Component) {
	_inherits(InnerList, _React$Component);

	function InnerList(props) {
		_classCallCheck(this, InnerList);

		var _this = _possibleConstructorReturn(this, (InnerList.__proto__ || Object.getPrototypeOf(InnerList)).call(this, props));

		_this.setVoteValue = _this.setVoteValue.bind(_this);
		_this.createUpdateMessageHandler = _this.createUpdateMessageHandler.bind(_this);
		_this.isEditing = _this.isEditing.bind(_this);
		_this.createSetEditingHandler = _this.createSetEditingHandler.bind(_this);
		return _this;
	}

	_createClass(InnerList, [{
		key: 'setVoteValue',
		value: function setVoteValue(idx) {
			var _this2 = this;

			return function (value) {
				return _this2.context.actions.setVoteValue(idx, value);
			};
		}
	}, {
		key: 'createUpdateMessageHandler',
		value: function createUpdateMessageHandler(idx) {
			var _this3 = this;

			var id = this.props.id;


			return function (value) {
				_this3.context.actions.updateMessage({ value: value, idx: idx, id: id });
			};
		}
	}, {
		key: 'isEditing',
		value: function isEditing(idx) {
			return !!this.props.editing // !! will convert nulls to false
			&& this.props.editing.id === this.props.id && this.props.editing.idx === idx;
		}
	}, {
		key: 'createSetEditingHandler',
		value: function createSetEditingHandler(idx) {
			var _this4 = this;

			var id = this.props.id;


			return function (clear) {
				_this4.context.actions.setEditing(clear === true ? null : { id: id, idx: idx });
			};
		}
	}, {
		key: 'createIncrementHandler',
		value: function createIncrementHandler(idx) {
			var _this5 = this;

			return function () {
				_this5.context.actions.increment(idx);
			};
		}
	}, {
		key: 'renderIncrementButton',
		value: function renderIncrementButton(idx) {
			if (this.props.id !== _Layout.BAD) {
				return null;
			}

			return React.createElement(_index.IncrementButton, {
				onIncrement: this.createIncrementHandler(idx) });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this6 = this;

			var _props = this.props,
			    list = _props.list,
			    id = _props.id;


			if (list.length === 0) {
				return null;
			} else {
				return React.createElement(
					'ul',
					{ className: 'inner-list' },
					list.map(function (item, idx) {
						return React.createElement(
							'li',
							{ key: _this6.props.id.toLowerCase() + '-' + idx },
							_this6.renderIncrementButton(idx),
							React.createElement(_index.VoteInput, { value: item.value, setVoteValue: _this6.setVoteValue(idx) }),
							React.createElement(_index.MessageWrapper, {
								text: item.text,
								isEditing: _this6.isEditing(idx),
								setEditing: _this6.createSetEditingHandler(idx),
								updateMessage: _this6.createUpdateMessageHandler(idx) })
						);
					})
				);
			}
		}
	}]);

	return InnerList;
}(React.Component);

exports.default = InnerList;


InnerList.contextTypes = {
	actions: React.PropTypes.object
};

},{"../Layout":58,"./index":68}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layout = require('../Layout');

var _index = require('./index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = function (_React$Component) {
	_inherits(List, _React$Component);

	function List(props) {
		_classCallCheck(this, List);

		var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

		_this.onSubmit = _this.onSubmit.bind(_this);
		return _this;
	}

	_createClass(List, [{
		key: 'onSubmit',
		value: function onSubmit(e) {
			var value = this.refs.input.value;
			e.preventDefault();

			if (value.length === 0) {
				return;
			}
			var data = {
				id: this.props.id,
				text: value
			};

			if (this.props.id === _Layout.BAD) {
				data.value = 0;
			}
			this.refs.input.value = '';
			this.context.actions.addItem(data);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'vert' },
				React.createElement(
					'h2',
					{ className: 'list-title' },
					this.props.title
				),
				React.createElement(
					'form',
					{ action: '#', onSubmit: this.onSubmit },
					React.createElement('input', { ref: 'input', className: 'message-content', type: 'text' })
				),
				React.createElement(_index.InnerList, this.props)
			);
		}
	}]);

	return List;
}(React.Component);

exports.default = List;

List.contextTypes = {
	actions: React.PropTypes.object
};

},{"../Layout":58,"./index":68}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageInput = function (_React$Component) {
	_inherits(MessageInput, _React$Component);

	function MessageInput(props) {
		_classCallCheck(this, MessageInput);

		var _this = _possibleConstructorReturn(this, (MessageInput.__proto__ || Object.getPrototypeOf(MessageInput)).call(this, props));

		_this.onKeyDown = _this.onKeyDown.bind(_this);
		_this.onSubmit = _this.onSubmit.bind(_this);
		_this.onBlur = _this.onBlur.bind(_this);
		_this.updateMessage = _this.updateMessage.bind(_this);
		return _this;
	}

	_createClass(MessageInput, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.refs.input) {
				this.refs.input.focus();
			}
		}
	}, {
		key: 'updateMessage',
		value: function updateMessage() {
			if (this.refs.input) {
				this.props.updateMessage(this.refs.input.value);
			}
		}
	}, {
		key: 'onSubmit',
		value: function onSubmit(e) {
			e.preventDefault();
			this.updateMessage();
		}
	}, {
		key: 'onBlur',
		value: function onBlur() {
			this.updateMessage();
		}
	}, {
		key: 'onKeyDown',
		value: function onKeyDown(e) {
			if (e.which === _index.ESC) {
				this.props.setEditing(true);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'form',
				{ action: '#', onSubmit: this.onSubmit },
				React.createElement('input', {
					ref: 'input',
					type: 'text',
					className: 'message-content message-content--inline',
					defaultValue: this.props.defaultValue,
					onBlur: this.onBlur,
					onKeyDown: this.onKeyDown })
			);
		}
	}]);

	return MessageInput;
}(React.Component);

exports.default = MessageInput;


MessageInput.propTypes = {
	updateMessage: React.PropTypes.func.isRequired
};

},{"./index":68}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageView = function (_React$Component) {
	_inherits(MessageView, _React$Component);

	function MessageView(props) {
		_classCallCheck(this, MessageView);

		var _this = _possibleConstructorReturn(this, (MessageView.__proto__ || Object.getPrototypeOf(MessageView)).call(this, props));

		_this.onDoubleClick = _this.onDoubleClick.bind(_this);
		return _this;
	}

	_createClass(MessageView, [{
		key: 'onDoubleClick',
		value: function onDoubleClick() {
			this.props.setEditing();
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'message-content', onDoubleClick: this.onDoubleClick },
				this.props.text
			);
		}
	}]);

	return MessageView;
}(React.Component);

exports.default = MessageView;


MessageView.propTypes = {
	text: React.PropTypes.string
};

},{}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./index');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageWrapper = function (_React$Component) {
	_inherits(MessageWrapper, _React$Component);

	function MessageWrapper(props) {
		_classCallCheck(this, MessageWrapper);

		return _possibleConstructorReturn(this, (MessageWrapper.__proto__ || Object.getPrototypeOf(MessageWrapper)).call(this, props));
	}

	_createClass(MessageWrapper, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    isEditing = _props.isEditing,
			    text = _props.text;


			if (isEditing) {
				return React.createElement(_index.MessageInput, {
					defaultValue: text,
					setEditing: this.props.setEditing,
					updateMessage: this.props.updateMessage });
			} else {
				return React.createElement(_index.MessageView, {
					text: text,
					setEditing: this.props.setEditing });
			}
		}
	}]);

	return MessageWrapper;
}(React.Component);

exports.default = MessageWrapper;

},{"./index":68}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preventNonNumericInput = require('./lib/preventNonNumericInput');

var _preventNonNumericInput2 = _interopRequireDefault(_preventNonNumericInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VoteInput = function (_React$Component) {
	_inherits(VoteInput, _React$Component);

	function VoteInput(props) {
		_classCallCheck(this, VoteInput);

		var _this = _possibleConstructorReturn(this, (VoteInput.__proto__ || Object.getPrototypeOf(VoteInput)).call(this, props));

		_this.onSubmit = _this.onSubmit.bind(_this);
		_this.onChange = _this.onChange.bind(_this);
		_this.onKeyDown = _this.onKeyDown.bind(_this);
		_this.onBlur = _this.onBlur.bind(_this);
		return _this;
	}

	_createClass(VoteInput, [{
		key: 'onSubmit',
		value: function onSubmit(e) {
			e.preventDefault();
			this.props.setVoteValue(this.refs.vote.value);
		}
	}, {
		key: 'onBlur',
		value: function onBlur() {
			this.onChange();
		}
	}, {
		key: 'onChange',
		value: function onChange() {
			var value = this.refs.vote.value.replace(/[^\d]/g, '');
			this.props.setVoteValue(value.length === 0 ? 0 : value);
		}
	}, {
		key: 'onKeyDown',
		value: function onKeyDown(e) {
			var code = e.keyCode;
			var value = parseInt(this.refs.vote.value, 10);
			if (isNaN(value)) {
				value = 0;
			}
			(0, _preventNonNumericInput2.default)(e);

			if (code === _preventNonNumericInput.UP) {
				value = value + 1;
				this.props.setVoteValue(value);
				e.preventDefault();
			} else if (code === _preventNonNumericInput.DOWN) {
				value = value - 1;
				this.props.setVoteValue(value <= 0 ? 0 : value);
				e.preventDefault();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.props.value === undefined) {
				return null;
			} else {
				return React.createElement(
					'form',
					{ action: '#', onSubmit: this.onSubmit },
					React.createElement('input', { ref: 'vote',
						className: 'message-vote text-center',
						value: this.props.value,
						onKeyDown: this.onKeyDown,
						onChange: this.onChange,
						onBlur: this.onBlur
					})
				);
			}
		}
	}]);

	return VoteInput;
}(React.Component);

exports.default = VoteInput;

VoteInput.contextTypes = {
	actions: React.PropTypes.object
};

},{"./lib/preventNonNumericInput":69}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ESC = exports.ESC = 27;

},{}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _List = require('./List');

Object.defineProperty(exports, 'List', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_List).default;
  }
});

var _InnerList = require('./InnerList');

Object.defineProperty(exports, 'InnerList', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_InnerList).default;
  }
});

var _VoteInput = require('./VoteInput');

Object.defineProperty(exports, 'VoteInput', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_VoteInput).default;
  }
});

var _MessageWrapper = require('./MessageWrapper');

Object.defineProperty(exports, 'MessageWrapper', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MessageWrapper).default;
  }
});

var _MessageInput = require('./MessageInput');

Object.defineProperty(exports, 'MessageInput', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MessageInput).default;
  }
});

var _MessageView = require('./MessageView');

Object.defineProperty(exports, 'MessageView', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MessageView).default;
  }
});

var _IncrementButton = require('./IncrementButton');

Object.defineProperty(exports, 'IncrementButton', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_IncrementButton).default;
  }
});

var _constants = require('./constants');

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constants[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./IncrementButton":60,"./InnerList":61,"./List":62,"./MessageInput":63,"./MessageView":64,"./MessageWrapper":65,"./VoteInput":66,"./constants":67}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var DELETE = exports.DELETE = 46;
var BACKSPACE = exports.BACKSPACE = 8;
var TAB = exports.TAB = 9;
var ESCAPE = exports.ESCAPE = 27;
var DECIMAL = exports.DECIMAL = 110;
var PERIOD = exports.PERIOD = 190;
var a = exports.a = 65;
var c = exports.c = 67;
var x = exports.x = 88;
var v = exports.v = 86;
var HOME = exports.HOME = 35;
var UP = exports.UP = 38;
var RIGHT = exports.RIGHT = 39;
var DOWN = exports.DOWN = 40;
var ZERO = exports.ZERO = 48;
var NINE = exports.NINE = 57;
var NUMPAD_ZERO = exports.NUMPAD_ZERO = 96;
var NUMPAD_NINE = exports.NUMPAD_NINE = 105;
var specials = [DELETE, BACKSPACE, TAB, ESCAPE, DECIMAL, PERIOD];

var prevenNonNumericInput = function prevenNonNumericInput(e) {
	var code = e.keyCode;
	// const ctrlKey = e.ctrlKey
	var shiftKey = e.shiftKey;
	var metaKey = e.metaKey || e.ctrlKey;

	if (specials.indexOf(code) !== -1 || code == a && metaKey === true || code == c && metaKey === true || code == x && metaKey === true || code == v && metaKey === true || code >= HOME && code <= RIGHT || shiftKey && code >= ZERO && code <= NINE || code >= NUMPAD_ZERO && code <= NUMPAD_NINE || code >= ZERO && code <= NINE || code >= NUMPAD_ZERO && code <= NUMPAD_NINE) {
		return;
	} else {
		e.preventDefault();
	}
};

exports.default = prevenNonNumericInput;

},{}],70:[function(require,module,exports){
(function (global){
'use strict';

var _App = require('./App');

var ReactDOM = global.ReactDOM;


ReactDOM.render(React.createElement(_App.App, null), document.getElementsByTagName('main')[0]);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./App":54}]},{},[70])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hcHBseS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5TGlrZUtleXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hc3NpZ25WYWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VBc3NpZ25WYWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHZXRUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNBcmd1bWVudHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNOYXRpdmUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNUeXBlZEFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUtleXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlUmVzdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VTZXRUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VUaW1lcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VVbmFyeS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvcHlPYmplY3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19jb3JlSnNEYXRhLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fY3JlYXRlQXNzaWduZXIuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19kZWZpbmVQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXROYXRpdmUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRWYWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzSW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19pc0l0ZXJhdGVlQ2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzTWFza2VkLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNQcm90b3R5cGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19uYXRpdmVLZXlzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbm9kZVV0aWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX292ZXJBcmcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vdmVyUmVzdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19zZXRUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Nob3J0T3V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fdG9Tb3VyY2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvY29uc3RhbnQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2VxLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pZGVudGl0eS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcmd1bWVudHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXlMaWtlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0J1ZmZlci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNMZW5ndGguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzVHlwZWRBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvc3R1YkZhbHNlLmpzIiwic3JjL0FwcC9BcHAuanMiLCJzcmMvQXBwL2NvbnN0YW50cy5qcyIsInNyYy9BcHAvZGVmYXVsdFN0YXRlLmpzIiwic3JjL0FwcC9pbmRleC5qcyIsInNyYy9MYXlvdXQvRm9jdXNTdHlsZVRvZ2dsZS5qcyIsInNyYy9MYXlvdXQvTGF5b3V0LmpzIiwic3JjL0xheW91dC9jb25zdGFudHMuanMiLCJzcmMvTGF5b3V0L2luZGV4LmpzIiwic3JjL0xheW91dC9saWIvbWFwSWRUb1RpdGxlLmpzIiwic3JjL0xpc3QvSW5jcmVtZW50QnV0dG9uLmpzIiwic3JjL0xpc3QvSW5uZXJMaXN0LmpzIiwic3JjL0xpc3QvTGlzdC5qcyIsInNyYy9MaXN0L01lc3NhZ2VJbnB1dC5qcyIsInNyYy9MaXN0L01lc3NhZ2VWaWV3LmpzIiwic3JjL0xpc3QvTWVzc2FnZVdyYXBwZXIuanMiLCJzcmMvTGlzdC9Wb3RlSW5wdXQuanMiLCJzcmMvTGlzdC9jb25zdGFudHMuanMiLCJzcmMvTGlzdC9pbmRleC5qcyIsInNyYy9MaXN0L2xpYi9wcmV2ZW50Tm9uTnVtZXJpY0lucHV0LmpzIiwic3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LE8sR0FBekIscUI7Ozs7QUMzQ1I7O0FBR0E7O0FBREEsSUFBTSxXQUFXLE9BQU8sUUFBeEI7OztBQUdBLFNBQVMsTUFBVCxDQUNDLG1DQURELEVBRUMsU0FBUyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxubW9kdWxlLmV4cG9ydHMgPSBTeW1ib2w7XG4iLCIvKipcbiAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGB0aGlzQXJnYCBhbmQgdGhlIGFyZ3VtZW50cyBvZiBgYXJnc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGZ1bmNgLlxuICovXG5mdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKSB7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZyk7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXBwbHk7XG4iLCJ2YXIgYmFzZVRpbWVzID0gcmVxdWlyZSgnLi9fYmFzZVRpbWVzJyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4vaXNBcnJheScpLFxuICAgIGlzQnVmZmVyID0gcmVxdWlyZSgnLi9pc0J1ZmZlcicpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL19pc0luZGV4JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9pc1R5cGVkQXJyYXknKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpLFxuICAgICAgaXNBcmcgPSAhaXNBcnIgJiYgaXNBcmd1bWVudHModmFsdWUpLFxuICAgICAgaXNCdWZmID0gIWlzQXJyICYmICFpc0FyZyAmJiBpc0J1ZmZlcih2YWx1ZSksXG4gICAgICBpc1R5cGUgPSAhaXNBcnIgJiYgIWlzQXJnICYmICFpc0J1ZmYgJiYgaXNUeXBlZEFycmF5KHZhbHVlKSxcbiAgICAgIHNraXBJbmRleGVzID0gaXNBcnIgfHwgaXNBcmcgfHwgaXNCdWZmIHx8IGlzVHlwZSxcbiAgICAgIHJlc3VsdCA9IHNraXBJbmRleGVzID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKSA6IFtdLFxuICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChcbiAgICAgICAgICAgLy8gU2FmYXJpIDkgaGFzIGVudW1lcmFibGUgYGFyZ3VtZW50cy5sZW5ndGhgIGluIHN0cmljdCBtb2RlLlxuICAgICAgICAgICBrZXkgPT0gJ2xlbmd0aCcgfHxcbiAgICAgICAgICAgLy8gTm9kZS5qcyAwLjEwIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIGJ1ZmZlcnMuXG4gICAgICAgICAgIChpc0J1ZmYgJiYgKGtleSA9PSAnb2Zmc2V0JyB8fCBrZXkgPT0gJ3BhcmVudCcpKSB8fFxuICAgICAgICAgICAvLyBQaGFudG9tSlMgMiBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiB0eXBlZCBhcnJheXMuXG4gICAgICAgICAgIChpc1R5cGUgJiYgKGtleSA9PSAnYnVmZmVyJyB8fCBrZXkgPT0gJ2J5dGVMZW5ndGgnIHx8IGtleSA9PSAnYnl0ZU9mZnNldCcpKSB8fFxuICAgICAgICAgICAvLyBTa2lwIGluZGV4IHByb3BlcnRpZXMuXG4gICAgICAgICAgIGlzSW5kZXgoa2V5LCBsZW5ndGgpXG4gICAgICAgICkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5TGlrZUtleXM7XG4iLCJ2YXIgYmFzZUFzc2lnblZhbHVlID0gcmVxdWlyZSgnLi9fYmFzZUFzc2lnblZhbHVlJyksXG4gICAgZXEgPSByZXF1aXJlKCcuL2VxJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQXNzaWducyBgdmFsdWVgIHRvIGBrZXlgIG9mIGBvYmplY3RgIGlmIHRoZSBleGlzdGluZyB2YWx1ZSBpcyBub3QgZXF1aXZhbGVudFxuICogdXNpbmcgW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV07XG4gIGlmICghKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGVxKG9ialZhbHVlLCB2YWx1ZSkpIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduVmFsdWU7XG4iLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19kZWZpbmVQcm9wZXJ0eScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBhc3NpZ25WYWx1ZWAgYW5kIGBhc3NpZ25NZXJnZVZhbHVlYCB3aXRob3V0XG4gKiB2YWx1ZSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5ID09ICdfX3Byb3RvX18nICYmIGRlZmluZVByb3BlcnR5KSB7XG4gICAgZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcbiAgICAgICdjb25maWd1cmFibGUnOiB0cnVlLFxuICAgICAgJ2VudW1lcmFibGUnOiB0cnVlLFxuICAgICAgJ3ZhbHVlJzogdmFsdWUsXG4gICAgICAnd3JpdGFibGUnOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VBc3NpZ25WYWx1ZTtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgdmFsdWUgPSBPYmplY3QodmFsdWUpO1xuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIHZhbHVlKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzQXJndW1lbnRzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBhcmdzVGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0FyZ3VtZW50cztcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNNYXNrZWQgPSByZXF1aXJlKCcuL19pc01hc2tlZCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSBpc0Z1bmN0aW9uKHZhbHVlKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNOYXRpdmU7XG4iLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tiYXNlR2V0VGFnKHZhbHVlKV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzVHlwZWRBcnJheTtcbiIsInZhciBpc1Byb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2lzUHJvdG90eXBlJyksXG4gICAgbmF0aXZlS2V5cyA9IHJlcXVpcmUoJy4vX25hdGl2ZUtleXMnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VLZXlzO1xuIiwidmFyIGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eScpLFxuICAgIG92ZXJSZXN0ID0gcmVxdWlyZSgnLi9fb3ZlclJlc3QnKSxcbiAgICBzZXRUb1N0cmluZyA9IHJlcXVpcmUoJy4vX3NldFRvU3RyaW5nJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmVzdGAgd2hpY2ggZG9lc24ndCB2YWxpZGF0ZSBvciBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VSZXN0KGZ1bmMsIHN0YXJ0KSB7XG4gIHJldHVybiBzZXRUb1N0cmluZyhvdmVyUmVzdChmdW5jLCBzdGFydCwgaWRlbnRpdHkpLCBmdW5jICsgJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VSZXN0O1xuIiwidmFyIGNvbnN0YW50ID0gcmVxdWlyZSgnLi9jb25zdGFudCcpLFxuICAgIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fZGVmaW5lUHJvcGVydHknKSxcbiAgICBpZGVudGl0eSA9IHJlcXVpcmUoJy4vaWRlbnRpdHknKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgc2V0VG9TdHJpbmdgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaG90IGxvb3Agc2hvcnRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZyBUaGUgYHRvU3RyaW5nYCByZXN1bHQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYGZ1bmNgLlxuICovXG52YXIgYmFzZVNldFRvU3RyaW5nID0gIWRlZmluZVByb3BlcnR5ID8gaWRlbnRpdHkgOiBmdW5jdGlvbihmdW5jLCBzdHJpbmcpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5KGZ1bmMsICd0b1N0cmluZycsIHtcbiAgICAnY29uZmlndXJhYmxlJzogdHJ1ZSxcbiAgICAnZW51bWVyYWJsZSc6IGZhbHNlLFxuICAgICd2YWx1ZSc6IGNvbnN0YW50KHN0cmluZyksXG4gICAgJ3dyaXRhYmxlJzogdHJ1ZVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVNldFRvU3RyaW5nO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVGltZXM7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVVuYXJ5O1xuIiwidmFyIGFzc2lnblZhbHVlID0gcmVxdWlyZSgnLi9fYXNzaWduVmFsdWUnKSxcbiAgICBiYXNlQXNzaWduVmFsdWUgPSByZXF1aXJlKCcuL19iYXNlQXNzaWduVmFsdWUnKTtcblxuLyoqXG4gKiBDb3BpZXMgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIGNvcHkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb3BpZWQgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weU9iamVjdChzb3VyY2UsIHByb3BzLCBvYmplY3QsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGlzTmV3ID0gIW9iamVjdDtcbiAgb2JqZWN0IHx8IChvYmplY3QgPSB7fSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuXG4gICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgPyBjdXN0b21pemVyKG9iamVjdFtrZXldLCBzb3VyY2Vba2V5XSwga2V5LCBvYmplY3QsIHNvdXJjZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5ld1ZhbHVlID0gc291cmNlW2tleV07XG4gICAgfVxuICAgIGlmIChpc05ldykge1xuICAgICAgYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weU9iamVjdDtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcmVKc0RhdGE7XG4iLCJ2YXIgYmFzZVJlc3QgPSByZXF1aXJlKCcuL19iYXNlUmVzdCcpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnLi9faXNJdGVyYXRlZUNhbGwnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gbGlrZSBgXy5hc3NpZ25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhc3NpZ25lciBUaGUgZnVuY3Rpb24gdG8gYXNzaWduIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBc3NpZ25lcihhc3NpZ25lcikge1xuICByZXR1cm4gYmFzZVJlc3QoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2VzKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IHNvdXJjZXMubGVuZ3RoLFxuICAgICAgICBjdXN0b21pemVyID0gbGVuZ3RoID4gMSA/IHNvdXJjZXNbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQsXG4gICAgICAgIGd1YXJkID0gbGVuZ3RoID4gMiA/IHNvdXJjZXNbMl0gOiB1bmRlZmluZWQ7XG5cbiAgICBjdXN0b21pemVyID0gKGFzc2lnbmVyLmxlbmd0aCA+IDMgJiYgdHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJylcbiAgICAgID8gKGxlbmd0aC0tLCBjdXN0b21pemVyKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc291cmNlc1swXSwgc291cmNlc1sxXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAxO1xuICAgIH1cbiAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgaW5kZXgsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVBc3NpZ25lcjtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKTtcblxudmFyIGRlZmluZVByb3BlcnR5ID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHZhciBmdW5jID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2RlZmluZVByb3BlcnR5Jyk7XG4gICAgZnVuYyh7fSwgJycsIHt9KTtcbiAgICByZXR1cm4gZnVuYztcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmaW5lUHJvcGVydHk7XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG4iLCJ2YXIgYmFzZUlzTmF0aXZlID0gcmVxdWlyZSgnLi9fYmFzZUlzTmF0aXZlJyksXG4gICAgZ2V0VmFsdWUgPSByZXF1aXJlKCcuL19nZXRWYWx1ZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hdGl2ZTtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFJhd1RhZztcbiIsIi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFZhbHVlO1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbmRleDtcbiIsInZhciBlcSA9IHJlcXVpcmUoJy4vZXEnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9faXNJbmRleCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICAgID8gKGlzQXJyYXlMaWtlKG9iamVjdCkgJiYgaXNJbmRleChpbmRleCwgb2JqZWN0Lmxlbmd0aCkpXG4gICAgICAgIDogKHR5cGUgPT0gJ3N0cmluZycgJiYgaW5kZXggaW4gb2JqZWN0KVxuICAgICAgKSB7XG4gICAgcmV0dXJuIGVxKG9iamVjdFtpbmRleF0sIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG4iLCJ2YXIgY29yZUpzRGF0YSA9IHJlcXVpcmUoJy4vX2NvcmVKc0RhdGEnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc01hc2tlZDtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1Byb3RvdHlwZTtcbiIsInZhciBvdmVyQXJnID0gcmVxdWlyZSgnLi9fb3ZlckFyZycpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0aXZlS2V5cztcbiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKTtcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbm9kZVV0aWw7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcbiIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG92ZXJBcmc7XG4iLCJ2YXIgYXBwbHkgPSByZXF1aXJlKCcuL19hcHBseScpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlUmVzdGAgd2hpY2ggdHJhbnNmb3JtcyB0aGUgcmVzdCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgcmVzdCBhcnJheSB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlclJlc3QoZnVuYywgc3RhcnQsIHRyYW5zZm9ybSkge1xuICBzdGFydCA9IG5hdGl2ZU1heChzdGFydCA9PT0gdW5kZWZpbmVkID8gKGZ1bmMubGVuZ3RoIC0gMSkgOiBzdGFydCwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICBhcnJheSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgYXJyYXlbaW5kZXhdID0gYXJnc1tzdGFydCArIGluZGV4XTtcbiAgICB9XG4gICAgaW5kZXggPSAtMTtcbiAgICB2YXIgb3RoZXJBcmdzID0gQXJyYXkoc3RhcnQgKyAxKTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSB0cmFuc2Zvcm0oYXJyYXkpO1xuICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG92ZXJSZXN0O1xuIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb290O1xuIiwidmFyIGJhc2VTZXRUb1N0cmluZyA9IHJlcXVpcmUoJy4vX2Jhc2VTZXRUb1N0cmluZycpLFxuICAgIHNob3J0T3V0ID0gcmVxdWlyZSgnLi9fc2hvcnRPdXQnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBgdG9TdHJpbmdgIG1ldGhvZCBvZiBgZnVuY2AgdG8gcmV0dXJuIGBzdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdHJpbmcgVGhlIGB0b1N0cmluZ2AgcmVzdWx0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGBmdW5jYC5cbiAqL1xudmFyIHNldFRvU3RyaW5nID0gc2hvcnRPdXQoYmFzZVNldFRvU3RyaW5nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZXRUb1N0cmluZztcbiIsIi8qKiBVc2VkIHRvIGRldGVjdCBob3QgZnVuY3Rpb25zIGJ5IG51bWJlciBvZiBjYWxscyB3aXRoaW4gYSBzcGFuIG9mIG1pbGxpc2Vjb25kcy4gKi9cbnZhciBIT1RfQ09VTlQgPSA4MDAsXG4gICAgSE9UX1NQQU4gPSAxNjtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU5vdyA9IERhdGUubm93O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0J2xsIHNob3J0IG91dCBhbmQgaW52b2tlIGBpZGVudGl0eWAgaW5zdGVhZFxuICogb2YgYGZ1bmNgIHdoZW4gaXQncyBjYWxsZWQgYEhPVF9DT1VOVGAgb3IgbW9yZSB0aW1lcyBpbiBgSE9UX1NQQU5gXG4gKiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHJlc3RyaWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc2hvcnRhYmxlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBzaG9ydE91dChmdW5jKSB7XG4gIHZhciBjb3VudCA9IDAsXG4gICAgICBsYXN0Q2FsbGVkID0gMDtcblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0YW1wID0gbmF0aXZlTm93KCksXG4gICAgICAgIHJlbWFpbmluZyA9IEhPVF9TUEFOIC0gKHN0YW1wIC0gbGFzdENhbGxlZCk7XG5cbiAgICBsYXN0Q2FsbGVkID0gc3RhbXA7XG4gICAgaWYgKHJlbWFpbmluZyA+IDApIHtcbiAgICAgIGlmICgrK2NvdW50ID49IEhPVF9DT1VOVCkge1xuICAgICAgICByZXR1cm4gYXJndW1lbnRzWzBdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudCA9IDA7XG4gICAgfVxuICAgIHJldHVybiBmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG9ydE91dDtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1NvdXJjZTtcbiIsInZhciBhc3NpZ25WYWx1ZSA9IHJlcXVpcmUoJy4vX2Fzc2lnblZhbHVlJyksXG4gICAgY29weU9iamVjdCA9IHJlcXVpcmUoJy4vX2NvcHlPYmplY3QnKSxcbiAgICBjcmVhdGVBc3NpZ25lciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUFzc2lnbmVyJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyksXG4gICAgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBc3NpZ25zIG93biBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3RzIHRvIHRoZVxuICogZGVzdGluYXRpb24gb2JqZWN0LiBTb3VyY2Ugb2JqZWN0cyBhcmUgYXBwbGllZCBmcm9tIGxlZnQgdG8gcmlnaHQuXG4gKiBTdWJzZXF1ZW50IHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAgYW5kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgT2JqZWN0LmFzc2lnbmBdKGh0dHBzOi8vbWRuLmlvL09iamVjdC9hc3NpZ24pLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAc2VlIF8uYXNzaWduSW5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIGZ1bmN0aW9uIEJhcigpIHtcbiAqICAgdGhpcy5jID0gMztcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmIgPSAyO1xuICogQmFyLnByb3RvdHlwZS5kID0gNDtcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMCB9LCBuZXcgRm9vLCBuZXcgQmFyKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYyc6IDMgfVxuICovXG52YXIgYXNzaWduID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UpIHtcbiAgaWYgKGlzUHJvdG90eXBlKHNvdXJjZSkgfHwgaXNBcnJheUxpa2Uoc291cmNlKSkge1xuICAgIGNvcHlPYmplY3Qoc291cmNlLCBrZXlzKHNvdXJjZSksIG9iamVjdCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgfVxuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ247XG4iLCIvKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYHZhbHVlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcmV0dXJuIGZyb20gdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNvbnN0YW50IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IF8udGltZXMoMiwgXy5jb25zdGFudCh7ICdhJzogMSB9KSk7XG4gKlxuICogY29uc29sZS5sb2cob2JqZWN0cyk7XG4gKiAvLyA9PiBbeyAnYSc6IDEgfSwgeyAnYSc6IDEgfV1cbiAqXG4gKiBjb25zb2xlLmxvZyhvYmplY3RzWzBdID09PSBvYmplY3RzWzFdKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gY29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25zdGFudDtcbiIsIi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqXG4gKiBjb25zb2xlLmxvZyhfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcbiIsInZhciBiYXNlSXNBcmd1bWVudHMgPSByZXF1aXJlKCcuL19iYXNlSXNBcmd1bWVudHMnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcmd1bWVudHMgPSBiYXNlSXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPyBiYXNlSXNBcmd1bWVudHMgOiBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG4iLCJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZTtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpLFxuICAgIHN0dWJGYWxzZSA9IHJlcXVpcmUoJy4vc3R1YkZhbHNlJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNCdWZmZXIgPSBCdWZmZXIgPyBCdWZmZXIuaXNCdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjMuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgQnVmZmVyKDIpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBVaW50OEFycmF5KDIpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0J1ZmZlciA9IG5hdGl2ZUlzQnVmZmVyIHx8IHN0dWJGYWxzZTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0J1ZmZlcjtcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXN5bmNUYWcgPSAnW29iamVjdCBBc3luY0Z1bmN0aW9uXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBwcm94eVRhZyA9ICdbb2JqZWN0IFByb3h5XSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheXMgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGJhc2VHZXRUYWcodmFsdWUpO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZyB8fCB0YWcgPT0gYXN5bmNUYWcgfHwgdGFnID09IHByb3h5VGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNMZW5ndGg7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsInZhciBiYXNlSXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9fYmFzZUlzVHlwZWRBcnJheScpLFxuICAgIGJhc2VVbmFyeSA9IHJlcXVpcmUoJy4vX2Jhc2VVbmFyeScpLFxuICAgIG5vZGVVdGlsID0gcmVxdWlyZSgnLi9fbm9kZVV0aWwnKTtcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNUeXBlZEFycmF5ID0gbm9kZUlzVHlwZWRBcnJheSA/IGJhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IGJhc2VJc1R5cGVkQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUeXBlZEFycmF5O1xuIiwidmFyIGFycmF5TGlrZUtleXMgPSByZXF1aXJlKCcuL19hcnJheUxpa2VLZXlzJyksXG4gICAgYmFzZUtleXMgPSByZXF1aXJlKCcuL19iYXNlS2V5cycpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0dWJGYWxzZTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQge0JBRCwgTGF5b3V0fSBmcm9tICcuLi9MYXlvdXQnXG5pbXBvcnQge2RlZmF1bHRTdGF0ZSwgREFUQUtFWX0gZnJvbSAnLi9pbmRleCdcbmltcG9ydCBhc3NpZ24gZnJvbSAnbG9kYXNoL2Fzc2lnbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcylcblx0XHR0aGlzLnN0YXRlID0gdGhpcy5nZXREZWZhdWx0U3RhdGUoKVxuXHRcdHRoaXMuYWRkSXRlbSA9IHRoaXMuYWRkSXRlbS5iaW5kKHRoaXMpXG5cdFx0dGhpcy5zZXRWb3RlVmFsdWUgPSB0aGlzLnNldFZvdGVWYWx1ZS5iaW5kKHRoaXMpXG5cdFx0dGhpcy5zZXRFZGl0aW5nID0gdGhpcy5zZXRFZGl0aW5nLmJpbmQodGhpcylcblx0XHR0aGlzLnVwZGF0ZU1lc3NhZ2UgPSB0aGlzLnVwZGF0ZU1lc3NhZ2UuYmluZCh0aGlzKVxuXHRcdHRoaXMuaW5jcmVtZW50ID0gdGhpcy5pbmNyZW1lbnQuYmluZCh0aGlzKVxuXHRcdHRoaXMucGVyc2lzdCA9IHRoaXMucGVyc2lzdC5iaW5kKHRoaXMpXG5cdFx0dGhpcy5jbGVhclN0b3JhZ2UgPSB0aGlzLmNsZWFyU3RvcmFnZS5iaW5kKHRoaXMpXG5cdH1cblxuXHRnZXREZWZhdWx0U3RhdGUocmVzZXQpIHtcblx0XHRsZXQgc2F2ZWRTdGF0ZSA9IG51bGw7XG5cblx0XHRpZiAocmVzZXQpIHtcblx0XHRcdHJldHVybiBhc3NpZ24oe30sIGRlZmF1bHRTdGF0ZSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0c2F2ZWRTdGF0ZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oREFUQUtFWSkpXG5cdFx0XHR9IGNhdGNoKGUpIHt9XG5cblx0XHRcdHJldHVybiBhc3NpZ24oe30sIGRlZmF1bHRTdGF0ZSwgc2F2ZWRTdGF0ZSlcblx0XHR9XG5cdH1cblxuXHRnZXRDaGlsZENvbnRleHQoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGFjdGlvbnM6IHtcblx0XHRcdFx0YWRkSXRlbTogdGhpcy5hZGRJdGVtLFxuXHRcdFx0XHRzZXRFZGl0aW5nOiB0aGlzLnNldEVkaXRpbmcsXG5cdFx0XHRcdHNldFZvdGVWYWx1ZTogdGhpcy5zZXRWb3RlVmFsdWUsXG5cdFx0XHRcdHVwZGF0ZU1lc3NhZ2U6IHRoaXMudXBkYXRlTWVzc2FnZSxcblx0XHRcdFx0aW5jcmVtZW50OiB0aGlzLmluY3JlbWVudCxcblx0XHRcdFx0Y2xlYXJTdG9yYWdlOiB0aGlzLmNsZWFyU3RvcmFnZVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHBlcnNpc3QoKSB7XG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShEQVRBS0VZLCBKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSlcblx0XHR9KVxuXHR9XG5cblx0dXBkYXRlTWVzc2FnZSh7dmFsdWUsIGlkLCBpZHh9KSB7XG5cdFx0Y29uc3QgbWVyZ2VTdGF0ZSA9IHt9XG5cdFx0bGV0IG5leHRMaXN0ID0gdGhpcy5zdGF0ZVtpZF0uc2xpY2UoMClcblxuXHRcdGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcblx0XHRcdG5leHRMaXN0ID0gbmV4dExpc3QuZmlsdGVyKChpdGVtLCBfaWR4KSA9PiB7XG5cdFx0XHRcdHJldHVybiBpZHggIT09IF9pZHg7XG5cdFx0XHR9KVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRuZXh0TGlzdFtpZHhdLnRleHQgPSB2YWx1ZVxuXHRcdH1cblxuXHRcdHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSwgcHJvcHMpID0+IHtcblx0XHRcdHJldHVybiBhc3NpZ24oe30sIHByZXZTdGF0ZSwge1xuXHRcdFx0XHRlZGl0aW5nOiBudWxsLFxuXHRcdFx0XHRbaWRdOiBuZXh0TGlzdFxuXHRcdFx0fSlcblx0XHR9LCB0aGlzLnBlcnNpc3QpXG5cdH1cblxuXHRzZXRFZGl0aW5nKGRhdGEpIHtcblx0XHRpZiAoZGF0YSA9PT0gbnVsbCkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogbnVsbH0sIHRoaXMucGVyc2lzdClcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+IHtcblx0XHRcdFx0cmV0dXJuIGFzc2lnbih7fSwgcHJldlN0YXRlXHQsIHtcblx0XHRcdFx0XHRlZGl0aW5nOiB7XG5cdFx0XHRcdFx0XHRpZDogZGF0YS5pZCxcblx0XHRcdFx0XHRcdGlkeDogZGF0YS5pZHhcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9LCB0aGlzLnBlcnNpc3QpO1xuXHRcdH1cblx0fVxuXG5cdHNldFZvdGVWYWx1ZShpZHgsIHZhbHVlKSB7XG5cdFx0Y29uc3QgbmV4dExpc3QgPSB0aGlzLnN0YXRlW0JBRF0uc2xpY2UoMClcblxuXHRcdG5leHRMaXN0W2lkeF0udmFsdWUgPSB2YWx1ZVxuXG5cdFx0dGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiB7XG5cdFx0XHRyZXR1cm4gYXNzaWduKHt9LCBwcmV2U3RhdGUsIHtbQkFEXTogbmV4dExpc3R9KVxuXHRcdH0sIHRoaXMucGVyc2lzdCk7XG5cdH1cblxuXHRpbmNyZW1lbnQoaWR4KSB7XG5cdFx0dGhpcy5zZXRWb3RlVmFsdWUoaWR4LCB0aGlzLnN0YXRlW0JBRF1baWR4XS52YWx1ZSArIDEpXG5cdH1cblxuXHRhZGRJdGVtKHtpZCwgdGV4dCwgdmFsdWV9KSB7XG5cdFx0Y29uc3QgbmV3TGlzdCA9IHRoaXMuc3RhdGVbaWRdLnNsaWNlKDApXG5cdFx0Y29uc3QgbmV3SXRlbSA9IHt0ZXh0OiB0ZXh0fVxuXG5cdFx0aWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdG5ld0l0ZW0udmFsdWUgPSB2YWx1ZVxuXHRcdH1cblxuXHRcdG5ld0xpc3QudW5zaGlmdChuZXdJdGVtKVxuXG5cdFx0dGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiB7XG5cdFx0XHRyZXR1cm4gYXNzaWduKHt9LCBwcmV2U3RhdGUsIHtbaWRdOiBuZXdMaXN0fSlcblx0XHR9LCB0aGlzLnBlcnNpc3QpXG5cdH1cblxuXHRjbGVhclN0b3JhZ2UoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh0aGlzLmdldERlZmF1bHRTdGF0ZSh0cnVlKSwgdGhpcy5wZXJzaXN0KVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiA8TGF5b3V0IHsuLi50aGlzLnN0YXRlfSAvPlxuXHR9XG59XG5cbkFwcC5kaXNwbGF5TmFtZSA9ICdBcHAnXG5cbkFwcC5jaGlsZENvbnRleHRUeXBlcyA9IHtcblx0YWN0aW9uczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBjb25zdCBEQVRBS0VZID0gJ3JlYWN0LXJldHJvLTAnXG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHtHT09ELCBCQUQsIE5FWFQsIERFRkFVTFRfVklFV30gZnJvbSAnLi4vTGF5b3V0J1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdFN0YXRlID0ge1xuXHRbR09PRF06IFtdLFxuXHRbQkFEXTogW10sXG5cdFtORVhUXTogW10sXG5cdHZpZXc6IERFRkFVTFRfVklFVyxcblx0ZWRpdGluZzogbnVsbFxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCB7ZGVmYXVsdCBhcyBBcHB9IGZyb20gJy4vQXBwJ1xuZXhwb3J0IHtkZWZhdWx0U3RhdGUgYXMgZGVmYXVsdFN0YXRlfSBmcm9tICcuL2RlZmF1bHRTdGF0ZSdcbmV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJ1xuIiwiJ3VzZSBzdHJpY3QnXG5cbi8qXG5lbmFibGVzIGZvY3VzIHJpbmcgb24ga2V5ZG93blxuZGlzYWJsZXMgZm9jdXMgcmluZyBvbiBtb3VzZS90b3VjaFxuKi9cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb2N1c1N0eWxlVG9nZ2xlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcylcblx0XHR0aGlzLnN0eWxlID0gcHJvcHMuc3R5bGUgfHwgJ2EsYnV0dG9uLC5tZXNzYWdlLWNvbnRlbnR7b3V0bGluZTogMH0nXG5cdFx0dGhpcy5zdGF0ZSA9IHtpc091dGxpbmVEaXNhYmxlZDogdHJ1ZX1cblx0XHR0aGlzLm9uS2V5ID0gdGhpcy5vbktleS5iaW5kKHRoaXMpXG5cdFx0dGhpcy5vbk1vdXNlID0gdGhpcy5vbk1vdXNlLmJpbmQodGhpcylcblx0fVxuXG5cdG9uS2V5KGUpIHtcblx0XHQvLyBUT0RPIG1vdmUgOSBpbnRvIGNvbnN0YW50cyBzb21ld2hlcmVcblx0XHRpZiAoZS5rZXlDb2RlID09PSA5KSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtpc091dGxpbmVEaXNhYmxlZDogZmFsc2V9KVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtpc091dGxpbmVEaXNhYmxlZDogdHJ1ZX0pXG5cdFx0fVxuXHR9XG5cblx0b25Nb3VzZSgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtpc091dGxpbmVEaXNhYmxlZDogdHJ1ZX0pXG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRjb25zdCB7ZG9jdW1lbnQ6IGJkPW51bGx9ID0gZ2xvYmFsXG5cblx0XHRpZiAoYmQpIHtcblx0XHRcdGJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZSwgdHJ1ZSlcblx0XHRcdGJkLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uTW91c2UsIHRydWUpXG5cdFx0XHRiZC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleSwgdHJ1ZSlcblx0XHR9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRjb25zdCB7ZG9jdW1lbnQ6IGJkPW51bGx9ID0gZ2xvYmFsXG5cblx0XHRpZiAoYmQpIHtcblx0XHRcdGJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZSwgdHJ1ZSlcblx0XHRcdGJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uTW91c2UsIHRydWUpXG5cdFx0XHRiZC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleSwgdHJ1ZSlcblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUuaXNPdXRsaW5lRGlzYWJsZWQpIHtcblx0XHRcdHJldHVybiA8c3R5bGU+e3RoaXMuc3R5bGV9PC9zdHlsZT5cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdH1cblx0fVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7R09PRCwgQkFELCBORVhULCBtYXBJZFRvVGl0bGUsIEZvY3VzU3R5bGVUb2dnbGV9IGZyb20gJy4vaW5kZXgnXG5pbXBvcnQge0xpc3R9IGZyb20gJy4uL0xpc3QnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExheW91dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpXG5cdFx0Y29uc3QgaWRzID0gW0dPT0QsIEJBRCwgTkVYVF1cblxuXHRcdHRoaXMubGlzdERlZmluaXRpb25zID0gaWRzLm1hcChpZCA9PiAoe1xuXHRcdFx0aWQ6IGlkLFxuXHRcdFx0dGl0bGU6IG1hcElkVG9UaXRsZShpZCksXG5cdFx0XHRrZXk6IGAke2lkfS1saXN0YFxuXHRcdH0pKVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHtzZXRWaWV3LCBjbGVhclN0b3JhZ2V9ID0gdGhpcy5jb250ZXh0LmFjdGlvbnNcblx0XHRjb25zdCB7ZWRpdGluZ30gPSB0aGlzLnByb3BzXG5cblx0XHRyZXR1cm4oXG5cdFx0XHQ8ZGl2IGlkPSdhcHAnPlxuXHRcdFx0XHQ8Rm9jdXNTdHlsZVRvZ2dsZSAvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nbWFpbi1jb2wnPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdoZWFkZXInPlxuXHRcdFx0XHRcdFx0PGgxIGNsYXNzTmFtZT0ndGV4dC1jZW50ZXInPlJldHJvc3BlY3RpdmU8L2gxPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdiZCc+XG5cdFx0XHRcdFx0XHR7dGhpcy5saXN0RGVmaW5pdGlvbnMubWFwKChkZWZpbml0aW9uKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGxpc3QgPSB0aGlzLnByb3BzW2RlZmluaXRpb24uaWRdO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiA8TGlzdCB7Li4uZGVmaW5pdGlvbn0gbGlzdD17bGlzdH0gZWRpdGluZz17ZWRpdGluZ30gLz5cblx0XHRcdFx0XHRcdH0sIHRoaXMpfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdmb290ZXInPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB7Y2xlYXJTdG9yYWdlKCl9fT5jbGVhcjwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB7fX0+c29ydDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB7fX0+cHJpbnRhYmxlPC9idXR0b24+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5cbkxheW91dC5jb250ZXh0VHlwZXMgPSB7XG5cdGFjdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBjb25zdCBHT09EID0gJ0dPT0QnXG5leHBvcnQgY29uc3QgQkFEID0gJ0JBRCdcbmV4cG9ydCBjb25zdCBORVhUID0gJ05FWFQnXG5leHBvcnQgY29uc3QgRU5UUlkgPSAnRU5UUlknXG5leHBvcnQgY29uc3QgUFJJTlQgPSAnUFJJTlQnXG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1ZJRVcgPSBFTlRSWVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCB7ZGVmYXVsdCBhcyBMYXlvdXR9IGZyb20gJy4vTGF5b3V0J1xuZXhwb3J0IHtkZWZhdWx0IGFzIEZvY3VzU3R5bGVUb2dnbGV9IGZyb20gJy4vRm9jdXNTdHlsZVRvZ2dsZSdcbmV4cG9ydCB7ZGVmYXVsdCBhcyBtYXBJZFRvVGl0bGV9IGZyb20gJy4vbGliL21hcElkVG9UaXRsZSdcbmV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJ1xuIiwiJ3VzZSBzdHJpY3QnXG5pbXBvcnQge0dPT0QsIEJBRCwgTkVYVH0gZnJvbSAnLi4vaW5kZXgnO1xuXG5jb25zdCB0aXRsZURpY3Rpb25hcnkgPSB7XG5cdEdPT0Q6ICdHb29kJyxcblx0QkFEOiAnQmFkJyxcblx0TkVYVDogJ05leHQnXG59XG5cbmNvbnN0IG1hcElkVG9UaXRsZSA9IChpZCkgPT4gdGl0bGVEaWN0aW9uYXJ5W2lkXSB8fCAnJ1xuXG5leHBvcnQge21hcElkVG9UaXRsZSBhcyBkZWZhdWx0fVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmNyZW1lbnRCdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMucHJvcHMub25JbmNyZW1lbnR9XG5cdFx0XHRcdGNsYXNzTmFtZT0naW5jcmVtZW50LXZvdGUtYnV0dG9uJz4rPC9idXR0b24+XG5cdFx0KVxuXHR9XG59XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHtCQUR9IGZyb20gJy4uL0xheW91dCcgLy8gZ2V0IHJpZCBvZiB0aGlzIGNyb3NzIG1vZHVsZSBkZXBlbmRlbmN5XG5pbXBvcnQge1ZvdGVJbnB1dCwgTWVzc2FnZVdyYXBwZXIsIEluY3JlbWVudEJ1dHRvbn0gZnJvbSAnLi9pbmRleCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5uZXJMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcylcblx0XHR0aGlzLnNldFZvdGVWYWx1ZSA9IHRoaXMuc2V0Vm90ZVZhbHVlLmJpbmQodGhpcylcblx0XHR0aGlzLmNyZWF0ZVVwZGF0ZU1lc3NhZ2VIYW5kbGVyID0gdGhpcy5jcmVhdGVVcGRhdGVNZXNzYWdlSGFuZGxlci5iaW5kKHRoaXMpXG5cdFx0dGhpcy5pc0VkaXRpbmcgPSB0aGlzLmlzRWRpdGluZy5iaW5kKHRoaXMpXG5cdFx0dGhpcy5jcmVhdGVTZXRFZGl0aW5nSGFuZGxlciA9IHRoaXMuY3JlYXRlU2V0RWRpdGluZ0hhbmRsZXIuYmluZCh0aGlzKVxuXHR9XG5cblx0c2V0Vm90ZVZhbHVlKGlkeCkge1xuXHRcdHJldHVybiB2YWx1ZSA9PiB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jb250ZXh0LmFjdGlvbnMuc2V0Vm90ZVZhbHVlKGlkeCwgdmFsdWUpXG5cdFx0fVxuXHR9XG5cblx0Y3JlYXRlVXBkYXRlTWVzc2FnZUhhbmRsZXIoaWR4KSB7XG5cdFx0Y29uc3Qge2lkfSA9IHRoaXMucHJvcHNcblxuXHRcdHJldHVybiAodmFsdWUpID0+IHtcblx0XHRcdHRoaXMuY29udGV4dC5hY3Rpb25zLnVwZGF0ZU1lc3NhZ2Uoe3ZhbHVlLCBpZHgsIGlkfSk7XG5cdFx0fVxuXHR9XG5cblxuXHRpc0VkaXRpbmcoaWR4KSB7XG5cdFx0cmV0dXJuICEhdGhpcy5wcm9wcy5lZGl0aW5nIC8vICEhIHdpbGwgY29udmVydCBudWxscyB0byBmYWxzZVxuXHRcdFx0JiYgdGhpcy5wcm9wcy5lZGl0aW5nLmlkID09PSB0aGlzLnByb3BzLmlkXG5cdFx0XHQmJiB0aGlzLnByb3BzLmVkaXRpbmcuaWR4ID09PSBpZHg7XG5cdH1cblxuXHRjcmVhdGVTZXRFZGl0aW5nSGFuZGxlcihpZHgpIHtcblx0XHRjb25zdCB7aWR9ID0gdGhpcy5wcm9wc1xuXG5cdFx0cmV0dXJuIChjbGVhcikgPT4ge1xuXHRcdFx0dGhpcy5jb250ZXh0LmFjdGlvbnMuc2V0RWRpdGluZyhjbGVhciA9PT0gdHJ1ZSA/IG51bGwgOiB7aWQsIGlkeH0pXG5cdFx0fVxuXHR9XG5cblx0Y3JlYXRlSW5jcmVtZW50SGFuZGxlcihpZHgpIHtcblx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0dGhpcy5jb250ZXh0LmFjdGlvbnMuaW5jcmVtZW50KGlkeClcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJJbmNyZW1lbnRCdXR0b24oaWR4KSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuaWQgIT09IEJBRCkge1xuXHRcdFx0cmV0dXJuIG51bGxcblx0XHR9XG5cblx0XHRyZXR1cm4gPEluY3JlbWVudEJ1dHRvblxuXHRcdFx0b25JbmNyZW1lbnQ9e3RoaXMuY3JlYXRlSW5jcmVtZW50SGFuZGxlcihpZHgpfSAvPlxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHtsaXN0LCBpZH0gPSB0aGlzLnByb3BzXG5cblx0XHRpZiAobGlzdC5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiBudWxsXG5cdFx0fSBlbHNlIHtcblx0XHRyZXR1cm4gPHVsIGNsYXNzTmFtZT0naW5uZXItbGlzdCc+XG5cdFx0XHR7bGlzdC5tYXAoKGl0ZW0sIGlkeCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gPGxpIGtleT17YCR7dGhpcy5wcm9wcy5pZC50b0xvd2VyQ2FzZSgpfS0ke2lkeH1gfT5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJJbmNyZW1lbnRCdXR0b24oaWR4KX1cblx0XHRcdFx0XHQ8Vm90ZUlucHV0IHZhbHVlPXtpdGVtLnZhbHVlfSBzZXRWb3RlVmFsdWU9e3RoaXMuc2V0Vm90ZVZhbHVlKGlkeCl9IC8+XG5cdFx0XHRcdFx0PE1lc3NhZ2VXcmFwcGVyXG5cdFx0XHRcdFx0XHR0ZXh0PXtpdGVtLnRleHR9XG5cdFx0XHRcdFx0XHRpc0VkaXRpbmc9e3RoaXMuaXNFZGl0aW5nKGlkeCl9XG5cdFx0XHRcdFx0XHRzZXRFZGl0aW5nPXt0aGlzLmNyZWF0ZVNldEVkaXRpbmdIYW5kbGVyKGlkeCl9XG5cdFx0XHRcdFx0XHR1cGRhdGVNZXNzYWdlPXt0aGlzLmNyZWF0ZVVwZGF0ZU1lc3NhZ2VIYW5kbGVyKGlkeCl9IC8+XG5cdFx0XHRcdDwvbGk+XG5cdFx0XHR9KX1cblx0XHQ8L3VsPlxuXHRcdH1cblx0fVxufVxuXG5Jbm5lckxpc3QuY29udGV4dFR5cGVzID0ge1xuXHRhY3Rpb25zOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG59XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHtCQUR9IGZyb20gJy4uL0xheW91dCdcbmltcG9ydCB7SW5uZXJMaXN0fSBmcm9tICcuL2luZGV4J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcylcblx0XHR0aGlzLm9uU3VibWl0ID0gdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpXG5cdH1cblxuXHRvblN1Ym1pdChlKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnJlZnMuaW5wdXQudmFsdWU7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cblx0XHRpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdFx0Y29uc3QgZGF0YSA9IHtcblx0XHRcdGlkOiB0aGlzLnByb3BzLmlkLFxuXHRcdFx0dGV4dDogdmFsdWVcblx0XHR9XG5cblx0XHRpZiAodGhpcy5wcm9wcy5pZCA9PT0gQkFEKSB7XG5cdFx0XHRkYXRhLnZhbHVlID0gMFxuXHRcdH1cblx0XHR0aGlzLnJlZnMuaW5wdXQudmFsdWUgPSAnJ1xuXHRcdHRoaXMuY29udGV4dC5hY3Rpb25zLmFkZEl0ZW0oZGF0YSlcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gPGRpdiBjbGFzc05hbWU9J3ZlcnQnPlxuXHRcdFx0PGgyIGNsYXNzTmFtZT0nbGlzdC10aXRsZSc+e3RoaXMucHJvcHMudGl0bGV9PC9oMj5cblx0XHRcdDxmb3JtIGFjdGlvbj0nIycgb25TdWJtaXQ9e3RoaXMub25TdWJtaXR9PlxuXHRcdFx0XHQ8aW5wdXQgcmVmPSdpbnB1dCcgY2xhc3NOYW1lPSdtZXNzYWdlLWNvbnRlbnQnIHR5cGU9J3RleHQnIC8+XG5cdFx0XHQ8L2Zvcm0+XG5cdFx0XHQ8SW5uZXJMaXN0IHsuLi50aGlzLnByb3BzfSAvPlxuXHRcdDwvZGl2PlxuXHR9XG59XG5MaXN0LmNvbnRleHRUeXBlcyA9IHtcblx0YWN0aW9uczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxufVxuXG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7RVNDfSBmcm9tICcuL2luZGV4J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpXG5cdFx0dGhpcy5vbktleURvd24gPSB0aGlzLm9uS2V5RG93bi5iaW5kKHRoaXMpXG5cdFx0dGhpcy5vblN1Ym1pdCA9IHRoaXMub25TdWJtaXQuYmluZCh0aGlzKVxuXHRcdHRoaXMub25CbHVyID0gdGhpcy5vbkJsdXIuYmluZCh0aGlzKVxuXHRcdHRoaXMudXBkYXRlTWVzc2FnZSA9IHRoaXMudXBkYXRlTWVzc2FnZS5iaW5kKHRoaXMpXG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRpZiAodGhpcy5yZWZzLmlucHV0KSB7XG5cdFx0XHR0aGlzLnJlZnMuaW5wdXQuZm9jdXMoKVxuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZU1lc3NhZ2UoKSB7XG5cdFx0aWYgKHRoaXMucmVmcy5pbnB1dCkge1xuXHRcdFx0dGhpcy5wcm9wcy51cGRhdGVNZXNzYWdlKHRoaXMucmVmcy5pbnB1dC52YWx1ZSlcblx0XHR9XG5cdH1cblxuXHRvblN1Ym1pdChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0dGhpcy51cGRhdGVNZXNzYWdlKClcblx0fVxuXG5cdG9uQmx1cigpIHtcblx0XHR0aGlzLnVwZGF0ZU1lc3NhZ2UoKVxuXHR9XG5cblx0b25LZXlEb3duKGUpIHtcblx0XHRpZiAoZS53aGljaCA9PT0gRVNDKSB7XG5cdFx0XHR0aGlzLnByb3BzLnNldEVkaXRpbmcodHJ1ZSlcblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIDxmb3JtIGFjdGlvbj0nIycgb25TdWJtaXQ9e3RoaXMub25TdWJtaXR9PlxuXHRcdFx0PGlucHV0XG5cdFx0XHRcdHJlZj0naW5wdXQnXG5cdFx0XHRcdHR5cGU9J3RleHQnXG5cdFx0XHRcdGNsYXNzTmFtZT0nbWVzc2FnZS1jb250ZW50IG1lc3NhZ2UtY29udGVudC0taW5saW5lJ1xuXHRcdFx0XHRkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlfVxuXHRcdFx0XHRvbkJsdXI9e3RoaXMub25CbHVyfVxuXHRcdFx0XHRvbktleURvd249e3RoaXMub25LZXlEb3dufSAvPlxuXHRcdDwvZm9ybT5cblx0fVxufVxuXG5NZXNzYWdlSW5wdXQucHJvcFR5cGVzID0ge1xuXHR1cGRhdGVNZXNzYWdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcylcblx0XHR0aGlzLm9uRG91YmxlQ2xpY2sgPSB0aGlzLm9uRG91YmxlQ2xpY2suYmluZCh0aGlzKVxuXHR9XG5cblx0b25Eb3VibGVDbGljaygpIHtcblx0XHR0aGlzLnByb3BzLnNldEVkaXRpbmcoKVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT0nbWVzc2FnZS1jb250ZW50JyBvbkRvdWJsZUNsaWNrPXt0aGlzLm9uRG91YmxlQ2xpY2t9PlxuXHRcdFx0e3RoaXMucHJvcHMudGV4dH1cblx0XHQ8L2Rpdj5cblx0fVxufVxuXG5NZXNzYWdlVmlldy5wcm9wVHlwZXMgPSB7XG5cdHRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtNZXNzYWdlVmlldywgTWVzc2FnZUlucHV0fSBmcm9tICcuL2luZGV4J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlV3JhcHBlclx0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHtpc0VkaXRpbmcsIHRleHR9ID0gdGhpcy5wcm9wc1xuXG5cdFx0aWYgKGlzRWRpdGluZykge1xuXHRcdFx0cmV0dXJuIDxNZXNzYWdlSW5wdXRcblx0XHRcdFx0ZGVmYXVsdFZhbHVlPXt0ZXh0fVxuXHRcdFx0XHRzZXRFZGl0aW5nPXt0aGlzLnByb3BzLnNldEVkaXRpbmd9XG5cdFx0XHRcdHVwZGF0ZU1lc3NhZ2U9e3RoaXMucHJvcHMudXBkYXRlTWVzc2FnZX0vPlxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gPE1lc3NhZ2VWaWV3XG5cdFx0XHRcdHRleHQ9e3RleHR9XG5cdFx0XHRcdHNldEVkaXRpbmc9e3RoaXMucHJvcHMuc2V0RWRpdGluZ30gLz5cblx0XHR9XG5cdH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgcHJldmVudE5vbk51bWVyaWNJbnB1dCwge1VQLCBET1dOfSBmcm9tICcuL2xpYi9wcmV2ZW50Tm9uTnVtZXJpY0lucHV0J1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZvdGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpXG5cdFx0dGhpcy5vblN1Ym1pdCA9IHRoaXMub25TdWJtaXQuYmluZCh0aGlzKVxuXHRcdHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcylcblx0XHR0aGlzLm9uS2V5RG93biA9IHRoaXMub25LZXlEb3duLmJpbmQodGhpcylcblx0XHR0aGlzLm9uQmx1ciA9IHRoaXMub25CbHVyLmJpbmQodGhpcylcblx0fVxuXG5cdG9uU3VibWl0KGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHR0aGlzLnByb3BzLnNldFZvdGVWYWx1ZSh0aGlzLnJlZnMudm90ZS52YWx1ZSlcblx0fVxuXG5cdG9uQmx1cigpIHtcblx0XHR0aGlzLm9uQ2hhbmdlKClcblx0fVxuXG5cdG9uQ2hhbmdlKCkge1xuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5yZWZzLnZvdGUudmFsdWUucmVwbGFjZSgvW15cXGRdL2csICcnKVxuXHRcdHRoaXMucHJvcHMuc2V0Vm90ZVZhbHVlKHZhbHVlLmxlbmd0aCA9PT0gMCA/IDAgOiB2YWx1ZSlcblx0fVxuXG5cdG9uS2V5RG93bihlKSB7XG5cdFx0Y29uc3QgY29kZSA9IGUua2V5Q29kZVxuXHRcdGxldCB2YWx1ZSA9IHBhcnNlSW50KHRoaXMucmVmcy52b3RlLnZhbHVlLCAxMClcblx0XHRpZiAoaXNOYU4odmFsdWUpKSB7XG5cdFx0XHR2YWx1ZSA9IDBcblx0XHR9XG5cdFx0cHJldmVudE5vbk51bWVyaWNJbnB1dChlKVxuXG5cdFx0aWYgKGNvZGUgPT09IFVQKSB7XG5cdFx0XHR2YWx1ZSA9IHZhbHVlICsgMVxuXHRcdFx0dGhpcy5wcm9wcy5zZXRWb3RlVmFsdWUodmFsdWUpXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IERPV04pIHtcblx0XHRcdHZhbHVlID0gdmFsdWUgLSAxXG5cdFx0XHR0aGlzLnByb3BzLnNldFZvdGVWYWx1ZSh2YWx1ZSA8PSAwID8gMCA6IHZhbHVlKVxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGlmICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBudWxsXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIDxmb3JtIGFjdGlvbj0nIycgb25TdWJtaXQ9e3RoaXMub25TdWJtaXR9PlxuXHRcdFx0XHQ8aW5wdXQgcmVmPSd2b3RlJ1xuXHRcdFx0XHRcdGNsYXNzTmFtZT0nbWVzc2FnZS12b3RlIHRleHQtY2VudGVyJ1xuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxuXHRcdFx0XHRcdG9uS2V5RG93bj17dGhpcy5vbktleURvd259XG5cdFx0XHRcdFx0b25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG5cdFx0XHRcdFx0b25CbHVyPXt0aGlzLm9uQmx1cn1cblx0XHRcdFx0Lz5cblx0XHRcdDwvZm9ybT5cblx0XHR9XG5cdH1cbn1cblZvdGVJbnB1dC5jb250ZXh0VHlwZXMgPSB7XG5cdGFjdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcbn0iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBjb25zdCBFU0MgPSAyN1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCB7ZGVmYXVsdCBhcyBMaXN0fSBmcm9tICcuL0xpc3QnXG5leHBvcnQge2RlZmF1bHQgYXMgSW5uZXJMaXN0fSBmcm9tICcuL0lubmVyTGlzdCdcbmV4cG9ydCB7ZGVmYXVsdCBhcyBWb3RlSW5wdXR9IGZyb20gJy4vVm90ZUlucHV0J1xuZXhwb3J0IHtkZWZhdWx0IGFzIE1lc3NhZ2VXcmFwcGVyfSBmcm9tICcuL01lc3NhZ2VXcmFwcGVyJ1xuZXhwb3J0IHtkZWZhdWx0IGFzIE1lc3NhZ2VJbnB1dH0gZnJvbSAnLi9NZXNzYWdlSW5wdXQnXG5leHBvcnQge2RlZmF1bHQgYXMgTWVzc2FnZVZpZXd9IGZyb20gJy4vTWVzc2FnZVZpZXcnXG5leHBvcnQge2RlZmF1bHQgYXMgSW5jcmVtZW50QnV0dG9ufSBmcm9tICcuL0luY3JlbWVudEJ1dHRvbidcblxuZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnXG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBjb25zdCBERUxFVEUgPSA0NlxuZXhwb3J0IGNvbnN0IEJBQ0tTUEFDRSA9IDhcbmV4cG9ydCBjb25zdCBUQUIgPSA5XG5leHBvcnQgY29uc3QgRVNDQVBFID0gMjdcbmV4cG9ydCBjb25zdCBERUNJTUFMID0gMTEwXG5leHBvcnQgY29uc3QgUEVSSU9EID0gMTkwXG5leHBvcnQgY29uc3QgYSA9IDY1XG5leHBvcnQgY29uc3QgYyA9IDY3XG5leHBvcnQgY29uc3QgeCA9IDg4XG5leHBvcnQgY29uc3QgdiA9IDg2XG5leHBvcnQgY29uc3QgSE9NRSA9IDM1XG5leHBvcnQgY29uc3QgVVAgPSAzOFxuZXhwb3J0IGNvbnN0IFJJR0hUID0gMzlcbmV4cG9ydCBjb25zdCBET1dOID0gNDBcbmV4cG9ydCBjb25zdCBaRVJPID0gNDhcbmV4cG9ydCBjb25zdCBOSU5FID0gNTdcbmV4cG9ydCBjb25zdCBOVU1QQURfWkVSTyA9IDk2XG5leHBvcnQgY29uc3QgTlVNUEFEX05JTkUgPSAxMDVcbmNvbnN0IHNwZWNpYWxzID0gW0RFTEVURSwgQkFDS1NQQUNFLCBUQUIsIEVTQ0FQRSwgREVDSU1BTCwgUEVSSU9EXVxuXG5jb25zdCBwcmV2ZW5Ob25OdW1lcmljSW5wdXQgPSAoZSkgPT4ge1xuXHRjb25zdCBjb2RlID0gZS5rZXlDb2RlXG5cdC8vIGNvbnN0IGN0cmxLZXkgPSBlLmN0cmxLZXlcblx0Y29uc3Qgc2hpZnRLZXkgPSBlLnNoaWZ0S2V5XG5cdGNvbnN0IG1ldGFLZXkgPSBlLm1ldGFLZXkgfHwgZS5jdHJsS2V5XG5cblx0aWYgKHNwZWNpYWxzLmluZGV4T2YoY29kZSkgIT09IC0xIHx8XG5cdFx0XHQoY29kZSA9PSBhICYmIG1ldGFLZXkgPT09IHRydWUpIHx8XG5cdFx0XHQoY29kZSA9PSBjICYmIG1ldGFLZXkgPT09IHRydWUpIHx8XG5cdFx0XHQoY29kZSA9PSB4ICYmIG1ldGFLZXkgPT09IHRydWUpIHx8XG5cdFx0XHQoY29kZSA9PSB2ICYmIG1ldGFLZXkgPT09IHRydWUpIHx8XG5cdFx0XHQoY29kZSA+PSBIT01FICYmIGNvZGUgPD0gUklHSFQpIHx8XG5cdFx0XHQoKHNoaWZ0S2V5ICYmIChjb2RlID49IFpFUk8gJiYgY29kZSA8PSBOSU5FKSkgfHwgKGNvZGUgPj0gTlVNUEFEX1pFUk8gJiYgY29kZSA8PSBOVU1QQURfTklORSkpIHx8XG5cdFx0XHQoKGNvZGUgPj0gWkVSTyAmJiBjb2RlIDw9IE5JTkUpIHx8IChjb2RlID49IE5VTVBBRF9aRVJPICYmIGNvZGUgPD0gTlVNUEFEX05JTkUpKVxuXHRcdCkge1xuXHRcdHJldHVyblxuXHR9IGVsc2Uge1xuXHRcdGUucHJldmVudERlZmF1bHQoKVxuXHR9XG59XG5cbmV4cG9ydCB7cHJldmVuTm9uTnVtZXJpY0lucHV0IGFzIGRlZmF1bHR9XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgUmVhY3RET00gPSBnbG9iYWwuUmVhY3RET01cbmltcG9ydCB7QXBwfSBmcm9tICcuL0FwcCdcblxuUmVhY3RET00ucmVuZGVyKFxuXHQ8QXBwIC8+LFxuXHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbWFpbicpWzBdXG4pXG4iXX0=
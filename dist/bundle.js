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
			this.setVoteValue(idx, parseInt(this.state[_Layout.BAD][idx].value, 10) + 1);
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
				React.createElement(
					'div',
					null,
					React.createElement(
						'div',
						null,
						'edit mode'
					),
					React.createElement(
						'ul',
						{ className: 'topic' },
						React.createElement(
							'li',
							{ className: 'topic_item' },
							React.createElement(
								'div',
								{ className: 'topic_item-meta' },
								React.createElement(
									'button',
									{ className: 'topic_input topic_input--button' },
									'+'
								)
							),
							React.createElement(
								'form',
								{ action: '#' },
								React.createElement('input', { type: 'text', className: 'topic_input' })
							),
							React.createElement(
								'form',
								{ action: '#', className: 'topic_message-form' },
								React.createElement('input', { type: 'text', className: 'topic_input' })
							)
						)
					),
					React.createElement(
						'div',
						null,
						'view mode'
					),
					React.createElement(
						'ul',
						{ className: 'topic' },
						React.createElement(
							'li',
							{ className: 'topic_item' },
							React.createElement(
								'div',
								{ className: 'tapic_item-meta' },
								React.createElement(
									'div',
									{ className: 'topic_input topic-counter' },
									'A'
								)
							),
							React.createElement(
								'form',
								{ action: '#' },
								React.createElement('input', { className: 'topic_input', type: 'text' })
							),
							React.createElement(
								'div',
								{ className: 'topic_message-form' },
								React.createElement(
									'div',
									{ className: 'topic_input' },
									'message content'
								)
							)
						)
					)
				),
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
							{ className: 'button button-default', onClick: function onClick() {
									clearStorage();
								} },
							'clear'
						),
						React.createElement(
							'button',
							{ className: 'button button-default', onClick: function onClick() {} },
							'sort'
						),
						React.createElement(
							'button',
							{ className: 'button button-default', onClick: function onClick() {} },
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
				{ action: '#', className: 'message-form', onSubmit: this.onSubmit },
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
					{ className: 'vote-form', action: '#', onSubmit: this.onSubmit },
					React.createElement('input', { ref: 'vote',
						className: 'tally-vote text-center',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hcHBseS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5TGlrZUtleXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hc3NpZ25WYWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VBc3NpZ25WYWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHZXRUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNBcmd1bWVudHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNOYXRpdmUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNUeXBlZEFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUtleXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlUmVzdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VTZXRUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VUaW1lcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VVbmFyeS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvcHlPYmplY3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19jb3JlSnNEYXRhLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fY3JlYXRlQXNzaWduZXIuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19kZWZpbmVQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXROYXRpdmUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRWYWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzSW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19pc0l0ZXJhdGVlQ2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzTWFza2VkLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNQcm90b3R5cGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19uYXRpdmVLZXlzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbm9kZVV0aWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX292ZXJBcmcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vdmVyUmVzdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19zZXRUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Nob3J0T3V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fdG9Tb3VyY2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvY29uc3RhbnQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2VxLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pZGVudGl0eS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcmd1bWVudHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXlMaWtlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0J1ZmZlci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNMZW5ndGguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzVHlwZWRBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvc3R1YkZhbHNlLmpzIiwic3JjL0FwcC9BcHAuanMiLCJzcmMvQXBwL2NvbnN0YW50cy5qcyIsInNyYy9BcHAvZGVmYXVsdFN0YXRlLmpzIiwic3JjL0FwcC9pbmRleC5qcyIsInNyYy9MYXlvdXQvRm9jdXNTdHlsZVRvZ2dsZS5qcyIsInNyYy9MYXlvdXQvTGF5b3V0LmpzIiwic3JjL0xheW91dC9jb25zdGFudHMuanMiLCJzcmMvTGF5b3V0L2luZGV4LmpzIiwic3JjL0xheW91dC9saWIvbWFwSWRUb1RpdGxlLmpzIiwic3JjL0xpc3QvSW5jcmVtZW50QnV0dG9uLmpzIiwic3JjL0xpc3QvSW5uZXJMaXN0LmpzIiwic3JjL0xpc3QvTGlzdC5qcyIsInNyYy9MaXN0L01lc3NhZ2VJbnB1dC5qcyIsInNyYy9MaXN0L01lc3NhZ2VWaWV3LmpzIiwic3JjL0xpc3QvTWVzc2FnZVdyYXBwZXIuanMiLCJzcmMvTGlzdC9Wb3RlSW5wdXQuanMiLCJzcmMvTGlzdC9jb25zdGFudHMuanMiLCJzcmMvTGlzdC9pbmRleC5qcyIsInNyYy9MaXN0L2xpYi9wcmV2ZW50Tm9uTnVtZXJpY0lucHV0LmpzIiwic3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFULENBQ0MsbUNBREQsRUFFQyxTQUFTLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsIi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcHBseTtcbiIsInZhciBiYXNlVGltZXMgPSByZXF1aXJlKCcuL19iYXNlVGltZXMnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNCdWZmZXIgPSByZXF1aXJlKCcuL2lzQnVmZmVyJyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vX2lzSW5kZXgnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL2lzVHlwZWRBcnJheScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgdmFyIGlzQXJyID0gaXNBcnJheSh2YWx1ZSksXG4gICAgICBpc0FyZyA9ICFpc0FyciAmJiBpc0FyZ3VtZW50cyh2YWx1ZSksXG4gICAgICBpc0J1ZmYgPSAhaXNBcnIgJiYgIWlzQXJnICYmIGlzQnVmZmVyKHZhbHVlKSxcbiAgICAgIGlzVHlwZSA9ICFpc0FyciAmJiAhaXNBcmcgJiYgIWlzQnVmZiAmJiBpc1R5cGVkQXJyYXkodmFsdWUpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBpc0FyciB8fCBpc0FyZyB8fCBpc0J1ZmYgfHwgaXNUeXBlLFxuICAgICAgcmVzdWx0ID0gc2tpcEluZGV4ZXMgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpIDogW10sXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKFxuICAgICAgICAgICAvLyBTYWZhcmkgOSBoYXMgZW51bWVyYWJsZSBgYXJndW1lbnRzLmxlbmd0aGAgaW4gc3RyaWN0IG1vZGUuXG4gICAgICAgICAgIGtleSA9PSAnbGVuZ3RoJyB8fFxuICAgICAgICAgICAvLyBOb2RlLmpzIDAuMTAgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gYnVmZmVycy5cbiAgICAgICAgICAgKGlzQnVmZiAmJiAoa2V5ID09ICdvZmZzZXQnIHx8IGtleSA9PSAncGFyZW50JykpIHx8XG4gICAgICAgICAgIC8vIFBoYW50b21KUyAyIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIHR5cGVkIGFycmF5cy5cbiAgICAgICAgICAgKGlzVHlwZSAmJiAoa2V5ID09ICdidWZmZXInIHx8IGtleSA9PSAnYnl0ZUxlbmd0aCcgfHwga2V5ID09ICdieXRlT2Zmc2V0JykpIHx8XG4gICAgICAgICAgIC8vIFNraXAgaW5kZXggcHJvcGVydGllcy5cbiAgICAgICAgICAgaXNJbmRleChrZXksIGxlbmd0aClcbiAgICAgICAgKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlMaWtlS2V5cztcbiIsInZhciBiYXNlQXNzaWduVmFsdWUgPSByZXF1aXJlKCcuL19iYXNlQXNzaWduVmFsdWUnKSxcbiAgICBlcSA9IHJlcXVpcmUoJy4vZXEnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBc3NpZ25zIGB2YWx1ZWAgdG8gYGtleWAgb2YgYG9iamVjdGAgaWYgdGhlIGV4aXN0aW5nIHZhbHVlIGlzIG5vdCBlcXVpdmFsZW50XG4gKiB1c2luZyBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgaWYgKCEoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYgZXEob2JqVmFsdWUsIHZhbHVlKSkgfHxcbiAgICAgICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ25WYWx1ZTtcbiIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2RlZmluZVByb3BlcnR5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGFzc2lnblZhbHVlYCBhbmQgYGFzc2lnbk1lcmdlVmFsdWVgIHdpdGhvdXRcbiAqIHZhbHVlIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgPT0gJ19fcHJvdG9fXycgJiYgZGVmaW5lUHJvcGVydHkpIHtcbiAgICBkZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuICAgICAgJ2NvbmZpZ3VyYWJsZSc6IHRydWUsXG4gICAgICAnZW51bWVyYWJsZSc6IHRydWUsXG4gICAgICAndmFsdWUnOiB2YWx1ZSxcbiAgICAgICd3cml0YWJsZSc6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUFzc2lnblZhbHVlO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIGdldFJhd1RhZyA9IHJlcXVpcmUoJy4vX2dldFJhd1RhZycpLFxuICAgIG9iamVjdFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fb2JqZWN0VG9TdHJpbmcnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICB2YWx1ZSA9IE9iamVjdCh2YWx1ZSk7XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gdmFsdWUpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUdldFRhZztcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNBcmd1bWVudHNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqL1xuZnVuY3Rpb24gYmFzZUlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IGFyZ3NUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzQXJndW1lbnRzO1xuIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc01hc2tlZCA9IHJlcXVpcmUoJy4vX2lzTWFza2VkJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgdG9Tb3VyY2UgPSByZXF1aXJlKCcuL190b1NvdXJjZScpO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IGlzRnVuY3Rpb24odmFsdWUpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc05hdGl2ZTtcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzVHlwZWRBcnJheWAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW2Jhc2VHZXRUYWcodmFsdWUpXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNUeXBlZEFycmF5O1xuIiwidmFyIGlzUHJvdG90eXBlID0gcmVxdWlyZSgnLi9faXNQcm90b3R5cGUnKSxcbiAgICBuYXRpdmVLZXlzID0gcmVxdWlyZSgnLi9fbmF0aXZlS2V5cycpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUtleXM7XG4iLCJ2YXIgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5JyksXG4gICAgb3ZlclJlc3QgPSByZXF1aXJlKCcuL19vdmVyUmVzdCcpLFxuICAgIHNldFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fc2V0VG9TdHJpbmcnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgcmV0dXJuIHNldFRvU3RyaW5nKG92ZXJSZXN0KGZ1bmMsIHN0YXJ0LCBpZGVudGl0eSksIGZ1bmMgKyAnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVJlc3Q7XG4iLCJ2YXIgY29uc3RhbnQgPSByZXF1aXJlKCcuL2NvbnN0YW50JyksXG4gICAgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19kZWZpbmVQcm9wZXJ0eScpLFxuICAgIGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBzZXRUb1N0cmluZ2Agd2l0aG91dCBzdXBwb3J0IGZvciBob3QgbG9vcCBzaG9ydGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5nIFRoZSBgdG9TdHJpbmdgIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBgZnVuY2AuXG4gKi9cbnZhciBiYXNlU2V0VG9TdHJpbmcgPSAhZGVmaW5lUHJvcGVydHkgPyBpZGVudGl0eSA6IGZ1bmN0aW9uKGZ1bmMsIHN0cmluZykge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZnVuYywgJ3RvU3RyaW5nJywge1xuICAgICdjb25maWd1cmFibGUnOiB0cnVlLFxuICAgICdlbnVtZXJhYmxlJzogZmFsc2UsXG4gICAgJ3ZhbHVlJzogY29uc3RhbnQoc3RyaW5nKSxcbiAgICAnd3JpdGFibGUnOiB0cnVlXG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlU2V0VG9TdHJpbmc7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VUaW1lcztcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVW5hcnk7XG4iLCJ2YXIgYXNzaWduVmFsdWUgPSByZXF1aXJlKCcuL19hc3NpZ25WYWx1ZScpLFxuICAgIGJhc2VBc3NpZ25WYWx1ZSA9IHJlcXVpcmUoJy4vX2Jhc2VBc3NpZ25WYWx1ZScpO1xuXG4vKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvcGllZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5T2JqZWN0KHNvdXJjZSwgcHJvcHMsIG9iamVjdCwgY3VzdG9taXplcikge1xuICB2YXIgaXNOZXcgPSAhb2JqZWN0O1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG5cbiAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbmV3VmFsdWUgPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgaWYgKGlzTmV3KSB7XG4gICAgICBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3B5T2JqZWN0O1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbm1vZHVsZS5leHBvcnRzID0gY29yZUpzRGF0YTtcbiIsInZhciBiYXNlUmVzdCA9IHJlcXVpcmUoJy4vX2Jhc2VSZXN0JyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuL19pc0l0ZXJhdGVlQ2FsbCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBsaWtlIGBfLmFzc2lnbmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzc2lnbmVyIFRoZSBmdW5jdGlvbiB0byBhc3NpZ24gdmFsdWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYXNzaWduZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFzc2lnbmVyKGFzc2lnbmVyKSB7XG4gIHJldHVybiBiYXNlUmVzdChmdW5jdGlvbihvYmplY3QsIHNvdXJjZXMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gc291cmNlcy5sZW5ndGgsXG4gICAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPiAxID8gc291cmNlc1tsZW5ndGggLSAxXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgZ3VhcmQgPSBsZW5ndGggPiAyID8gc291cmNlc1syXSA6IHVuZGVmaW5lZDtcblxuICAgIGN1c3RvbWl6ZXIgPSAoYXNzaWduZXIubGVuZ3RoID4gMyAmJiB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nKVxuICAgICAgPyAobGVuZ3RoLS0sIGN1c3RvbWl6ZXIpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChndWFyZCAmJiBpc0l0ZXJhdGVlQ2FsbChzb3VyY2VzWzBdLCBzb3VyY2VzWzFdLCBndWFyZCkpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPCAzID8gdW5kZWZpbmVkIDogY3VzdG9taXplcjtcbiAgICAgIGxlbmd0aCA9IDE7XG4gICAgfVxuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgc291cmNlID0gc291cmNlc1tpbmRleF07XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGFzc2lnbmVyKG9iamVjdCwgc291cmNlLCBpbmRleCwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFzc2lnbmVyO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgdmFyIGZ1bmMgPSBnZXROYXRpdmUoT2JqZWN0LCAnZGVmaW5lUHJvcGVydHknKTtcbiAgICBmdW5jKHt9LCAnJywge30pO1xuICAgIHJldHVybiBmdW5jO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVQcm9wZXJ0eTtcbiIsIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnJlZUdsb2JhbDtcbiIsInZhciBiYXNlSXNOYXRpdmUgPSByZXF1aXJlKCcuL19iYXNlSXNOYXRpdmUnKSxcbiAgICBnZXRWYWx1ZSA9IHJlcXVpcmUoJy4vX2dldFZhbHVlJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TmF0aXZlO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmF3VGFnO1xuIiwiLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VmFsdWU7XG4iLCIvKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0luZGV4O1xuIiwidmFyIGVxID0gcmVxdWlyZSgnLi9lcScpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL19pc0luZGV4JyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcidcbiAgICAgICAgPyAoaXNBcnJheUxpa2Uob2JqZWN0KSAmJiBpc0luZGV4KGluZGV4LCBvYmplY3QubGVuZ3RoKSlcbiAgICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpXG4gICAgICApIHtcbiAgICByZXR1cm4gZXEob2JqZWN0W2luZGV4XSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0l0ZXJhdGVlQ2FsbDtcbiIsInZhciBjb3JlSnNEYXRhID0gcmVxdWlyZSgnLi9fY29yZUpzRGF0YScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTWFza2VkO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUHJvdG90eXBlO1xuIiwidmFyIG92ZXJBcmcgPSByZXF1aXJlKCcuL19vdmVyQXJnJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXRpdmVLZXlzO1xuIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZVByb2Nlc3MgPSBtb2R1bGVFeHBvcnRzICYmIGZyZWVHbG9iYWwucHJvY2VzcztcblxuLyoqIFVzZWQgdG8gYWNjZXNzIGZhc3RlciBOb2RlLmpzIGhlbHBlcnMuICovXG52YXIgbm9kZVV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBub2RlVXRpbDtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdFRvU3RyaW5nO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3ZlckFyZztcbiIsInZhciBhcHBseSA9IHJlcXVpcmUoJy4vX2FwcGx5Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VSZXN0YCB3aGljaCB0cmFuc2Zvcm1zIHRoZSByZXN0IGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSByZXN0IGFycmF5IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyUmVzdChmdW5jLCBzdGFydCwgdHJhbnNmb3JtKSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IHRyYW5zZm9ybShhcnJheSk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3ZlclJlc3Q7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCJ2YXIgYmFzZVNldFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fYmFzZVNldFRvU3RyaW5nJyksXG4gICAgc2hvcnRPdXQgPSByZXF1aXJlKCcuL19zaG9ydE91dCcpO1xuXG4vKipcbiAqIFNldHMgdGhlIGB0b1N0cmluZ2AgbWV0aG9kIG9mIGBmdW5jYCB0byByZXR1cm4gYHN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZyBUaGUgYHRvU3RyaW5nYCByZXN1bHQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYGZ1bmNgLlxuICovXG52YXIgc2V0VG9TdHJpbmcgPSBzaG9ydE91dChiYXNlU2V0VG9TdHJpbmcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFRvU3RyaW5nO1xuIiwiLyoqIFVzZWQgdG8gZGV0ZWN0IGhvdCBmdW5jdGlvbnMgYnkgbnVtYmVyIG9mIGNhbGxzIHdpdGhpbiBhIHNwYW4gb2YgbWlsbGlzZWNvbmRzLiAqL1xudmFyIEhPVF9DT1VOVCA9IDgwMCxcbiAgICBIT1RfU1BBTiA9IDE2O1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTm93ID0gRGF0ZS5ub3c7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQnbGwgc2hvcnQgb3V0IGFuZCBpbnZva2UgYGlkZW50aXR5YCBpbnN0ZWFkXG4gKiBvZiBgZnVuY2Agd2hlbiBpdCdzIGNhbGxlZCBgSE9UX0NPVU5UYCBvciBtb3JlIHRpbWVzIGluIGBIT1RfU1BBTmBcbiAqIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzaG9ydGFibGUgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHNob3J0T3V0KGZ1bmMpIHtcbiAgdmFyIGNvdW50ID0gMCxcbiAgICAgIGxhc3RDYWxsZWQgPSAwO1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhbXAgPSBuYXRpdmVOb3coKSxcbiAgICAgICAgcmVtYWluaW5nID0gSE9UX1NQQU4gLSAoc3RhbXAgLSBsYXN0Q2FsbGVkKTtcblxuICAgIGxhc3RDYWxsZWQgPSBzdGFtcDtcbiAgICBpZiAocmVtYWluaW5nID4gMCkge1xuICAgICAgaWYgKCsrY291bnQgPj0gSE9UX0NPVU5UKSB7XG4gICAgICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdW50ID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3J0T3V0O1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU291cmNlO1xuIiwidmFyIGFzc2lnblZhbHVlID0gcmVxdWlyZSgnLi9fYXNzaWduVmFsdWUnKSxcbiAgICBjb3B5T2JqZWN0ID0gcmVxdWlyZSgnLi9fY29weU9iamVjdCcpLFxuICAgIGNyZWF0ZUFzc2lnbmVyID0gcmVxdWlyZSgnLi9fY3JlYXRlQXNzaWduZXInKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc1Byb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2lzUHJvdG90eXBlJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEFzc2lnbnMgb3duIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdHMgdG8gdGhlXG4gKiBkZXN0aW5hdGlvbiBvYmplY3QuIFNvdXJjZSBvYmplY3RzIGFyZSBhcHBsaWVkIGZyb20gbGVmdCB0byByaWdodC5cbiAqIFN1YnNlcXVlbnQgc291cmNlcyBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YCBhbmQgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BPYmplY3QuYXNzaWduYF0oaHR0cHM6Ly9tZG4uaW8vT2JqZWN0L2Fzc2lnbikuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEwLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBzZWUgXy5hc3NpZ25JblxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogZnVuY3Rpb24gQmFyKCkge1xuICogICB0aGlzLmMgPSAzO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYiA9IDI7XG4gKiBCYXIucHJvdG90eXBlLmQgPSA0O1xuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAwIH0sIG5ldyBGb28sIG5ldyBCYXIpO1xuICogLy8gPT4geyAnYSc6IDEsICdjJzogMyB9XG4gKi9cbnZhciBhc3NpZ24gPSBjcmVhdGVBc3NpZ25lcihmdW5jdGlvbihvYmplY3QsIHNvdXJjZSkge1xuICBpZiAoaXNQcm90b3R5cGUoc291cmNlKSB8fCBpc0FycmF5TGlrZShzb3VyY2UpKSB7XG4gICAgY29weU9iamVjdChzb3VyY2UsIGtleXMoc291cmNlKSwgb2JqZWN0KTtcbiAgICByZXR1cm47XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbjtcbiIsIi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBgdmFsdWVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZXR1cm4gZnJvbSB0aGUgbmV3IGZ1bmN0aW9uLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY29uc3RhbnQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gXy50aW1lcygyLCBfLmNvbnN0YW50KHsgJ2EnOiAxIH0pKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhvYmplY3RzKTtcbiAqIC8vID0+IFt7ICdhJzogMSB9LCB7ICdhJzogMSB9XVxuICpcbiAqIGNvbnNvbGUubG9nKG9iamVjdHNbMF0gPT09IG9iamVjdHNbMV0pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBjb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnN0YW50O1xuIiwiLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXE7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuIiwidmFyIGJhc2VJc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vX2Jhc2VJc0FyZ3VtZW50cycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FyZ3VtZW50cyA9IGJhc2VJc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA/IGJhc2VJc0FyZ3VtZW50cyA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJndW1lbnRzO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXlMaWtlO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290JyksXG4gICAgc3R1YkZhbHNlID0gcmVxdWlyZSgnLi9zdHViRmFsc2UnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQnVmZmVyO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhc3luY1RhZyA9ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHByb3h5VGFnID0gJ1tvYmplY3QgUHJveHldJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA5IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5cyBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gYmFzZUdldFRhZyh2YWx1ZSk7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnIHx8IHRhZyA9PSBhc3luY1RhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0xlbmd0aDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwidmFyIGJhc2VJc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL19iYXNlSXNUeXBlZEFycmF5JyksXG4gICAgYmFzZVVuYXJ5ID0gcmVxdWlyZSgnLi9fYmFzZVVuYXJ5JyksXG4gICAgbm9kZVV0aWwgPSByZXF1aXJlKCcuL19ub2RlVXRpbCcpO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gYmFzZVVuYXJ5KG5vZGVJc1R5cGVkQXJyYXkpIDogYmFzZUlzVHlwZWRBcnJheTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG4iLCJ2YXIgYXJyYXlMaWtlS2V5cyA9IHJlcXVpcmUoJy4vX2FycmF5TGlrZUtleXMnKSxcbiAgICBiYXNlS2V5cyA9IHJlcXVpcmUoJy4vX2Jhc2VLZXlzJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5zdHViRmFsc2UpO1xuICogLy8gPT4gW2ZhbHNlLCBmYWxzZV1cbiAqL1xuZnVuY3Rpb24gc3R1YkZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R1YkZhbHNlO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7QkFELCBMYXlvdXR9IGZyb20gJy4uL0xheW91dCdcbmltcG9ydCB7ZGVmYXVsdFN0YXRlLCBEQVRBS0VZfSBmcm9tICcuL2luZGV4J1xuaW1wb3J0IGFzc2lnbiBmcm9tICdsb2Rhc2gvYXNzaWduJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKVxuXHRcdHRoaXMuc3RhdGUgPSB0aGlzLmdldERlZmF1bHRTdGF0ZSgpXG5cdFx0dGhpcy5hZGRJdGVtID0gdGhpcy5hZGRJdGVtLmJpbmQodGhpcylcblx0XHR0aGlzLnNldFZvdGVWYWx1ZSA9IHRoaXMuc2V0Vm90ZVZhbHVlLmJpbmQodGhpcylcblx0XHR0aGlzLnNldEVkaXRpbmcgPSB0aGlzLnNldEVkaXRpbmcuYmluZCh0aGlzKVxuXHRcdHRoaXMudXBkYXRlTWVzc2FnZSA9IHRoaXMudXBkYXRlTWVzc2FnZS5iaW5kKHRoaXMpXG5cdFx0dGhpcy5pbmNyZW1lbnQgPSB0aGlzLmluY3JlbWVudC5iaW5kKHRoaXMpXG5cdFx0dGhpcy5wZXJzaXN0ID0gdGhpcy5wZXJzaXN0LmJpbmQodGhpcylcblx0XHR0aGlzLmNsZWFyU3RvcmFnZSA9IHRoaXMuY2xlYXJTdG9yYWdlLmJpbmQodGhpcylcblx0fVxuXG5cdGdldERlZmF1bHRTdGF0ZShyZXNldCkge1xuXHRcdGxldCBzYXZlZFN0YXRlID0gbnVsbDtcblxuXHRcdGlmIChyZXNldCkge1xuXHRcdFx0cmV0dXJuIGFzc2lnbih7fSwgZGVmYXVsdFN0YXRlKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRzYXZlZFN0YXRlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShEQVRBS0VZKSlcblx0XHRcdH0gY2F0Y2goZSkge31cblxuXHRcdFx0cmV0dXJuIGFzc2lnbih7fSwgZGVmYXVsdFN0YXRlLCBzYXZlZFN0YXRlKVxuXHRcdH1cblx0fVxuXG5cdGdldENoaWxkQ29udGV4dCgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0YWN0aW9uczoge1xuXHRcdFx0XHRhZGRJdGVtOiB0aGlzLmFkZEl0ZW0sXG5cdFx0XHRcdHNldEVkaXRpbmc6IHRoaXMuc2V0RWRpdGluZyxcblx0XHRcdFx0c2V0Vm90ZVZhbHVlOiB0aGlzLnNldFZvdGVWYWx1ZSxcblx0XHRcdFx0dXBkYXRlTWVzc2FnZTogdGhpcy51cGRhdGVNZXNzYWdlLFxuXHRcdFx0XHRpbmNyZW1lbnQ6IHRoaXMuaW5jcmVtZW50LFxuXHRcdFx0XHRjbGVhclN0b3JhZ2U6IHRoaXMuY2xlYXJTdG9yYWdlXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cGVyc2lzdCgpIHtcblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKERBVEFLRVksIEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUpKVxuXHRcdH0pXG5cdH1cblxuXHR1cGRhdGVNZXNzYWdlKHt2YWx1ZSwgaWQsIGlkeH0pIHtcblx0XHRjb25zdCBtZXJnZVN0YXRlID0ge31cblx0XHRsZXQgbmV4dExpc3QgPSB0aGlzLnN0YXRlW2lkXS5zbGljZSgwKVxuXG5cdFx0aWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0bmV4dExpc3QgPSBuZXh0TGlzdC5maWx0ZXIoKGl0ZW0sIF9pZHgpID0+IHtcblx0XHRcdFx0cmV0dXJuIGlkeCAhPT0gX2lkeDtcblx0XHRcdH0pXG5cdFx0fSBlbHNlIHtcblx0XHRcdG5leHRMaXN0W2lkeF0udGV4dCA9IHZhbHVlXG5cdFx0fVxuXG5cdFx0dGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlLCBwcm9wcykgPT4ge1xuXHRcdFx0cmV0dXJuIGFzc2lnbih7fSwgcHJldlN0YXRlLCB7XG5cdFx0XHRcdGVkaXRpbmc6IG51bGwsXG5cdFx0XHRcdFtpZF06IG5leHRMaXN0XG5cdFx0XHR9KVxuXHRcdH0sIHRoaXMucGVyc2lzdClcblx0fVxuXG5cdHNldEVkaXRpbmcoZGF0YSkge1xuXHRcdGlmIChkYXRhID09PSBudWxsKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtlZGl0aW5nOiBudWxsfSwgdGhpcy5wZXJzaXN0KVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gYXNzaWduKHt9LCBwcmV2U3RhdGVcdCwge1xuXHRcdFx0XHRcdGVkaXRpbmc6IHtcblx0XHRcdFx0XHRcdGlkOiBkYXRhLmlkLFxuXHRcdFx0XHRcdFx0aWR4OiBkYXRhLmlkeFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdH0sIHRoaXMucGVyc2lzdCk7XG5cdFx0fVxuXHR9XG5cblx0c2V0Vm90ZVZhbHVlKGlkeCwgdmFsdWUpIHtcblx0XHRjb25zdCBuZXh0TGlzdCA9IHRoaXMuc3RhdGVbQkFEXS5zbGljZSgwKVxuXG5cdFx0bmV4dExpc3RbaWR4XS52YWx1ZSA9IHZhbHVlXG5cblx0XHR0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+IHtcblx0XHRcdHJldHVybiBhc3NpZ24oe30sIHByZXZTdGF0ZSwge1tCQURdOiBuZXh0TGlzdH0pXG5cdFx0fSwgdGhpcy5wZXJzaXN0KTtcblx0fVxuXG5cdGluY3JlbWVudChpZHgpIHtcblx0XHR0aGlzLnNldFZvdGVWYWx1ZShpZHgsIHBhcnNlSW50KHRoaXMuc3RhdGVbQkFEXVtpZHhdLnZhbHVlLCAxMCkgKyAxKVxuXHR9XG5cblx0YWRkSXRlbSh7aWQsIHRleHQsIHZhbHVlfSkge1xuXHRcdGNvbnN0IG5ld0xpc3QgPSB0aGlzLnN0YXRlW2lkXS5zbGljZSgwKVxuXHRcdGNvbnN0IG5ld0l0ZW0gPSB7dGV4dDogdGV4dH1cblxuXHRcdGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRuZXdJdGVtLnZhbHVlID0gdmFsdWVcblx0XHR9XG5cblx0XHRuZXdMaXN0LnVuc2hpZnQobmV3SXRlbSlcblxuXHRcdHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xuXHRcdFx0cmV0dXJuIGFzc2lnbih7fSwgcHJldlN0YXRlLCB7W2lkXTogbmV3TGlzdH0pXG5cdFx0fSwgdGhpcy5wZXJzaXN0KVxuXHR9XG5cblx0Y2xlYXJTdG9yYWdlKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUodGhpcy5nZXREZWZhdWx0U3RhdGUodHJ1ZSksIHRoaXMucGVyc2lzdClcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gPExheW91dCB7Li4udGhpcy5zdGF0ZX0gLz5cblx0fVxufVxuXG5BcHAuZGlzcGxheU5hbWUgPSAnQXBwJ1xuXG5BcHAuY2hpbGRDb250ZXh0VHlwZXMgPSB7XG5cdGFjdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQgY29uc3QgREFUQUtFWSA9ICdyZWFjdC1yZXRyby0wJ1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7R09PRCwgQkFELCBORVhULCBERUZBVUxUX1ZJRVd9IGZyb20gJy4uL0xheW91dCdcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTdGF0ZSA9IHtcblx0W0dPT0RdOiBbXSxcblx0W0JBRF06IFtdLFxuXHRbTkVYVF06IFtdLFxuXHR2aWV3OiBERUZBVUxUX1ZJRVcsXG5cdGVkaXRpbmc6IG51bGxcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnQge2RlZmF1bHQgYXMgQXBwfSBmcm9tICcuL0FwcCdcbmV4cG9ydCB7ZGVmYXVsdFN0YXRlIGFzIGRlZmF1bHRTdGF0ZX0gZnJvbSAnLi9kZWZhdWx0U3RhdGUnXG5leHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cydcbiIsIid1c2Ugc3RyaWN0J1xuXG4vKlxuZW5hYmxlcyBmb2N1cyByaW5nIG9uIGtleWRvd25cbmRpc2FibGVzIGZvY3VzIHJpbmcgb24gbW91c2UvdG91Y2hcbiovXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9jdXNTdHlsZVRvZ2dsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpXG5cdFx0dGhpcy5zdHlsZSA9IHByb3BzLnN0eWxlIHx8ICdhLGJ1dHRvbiwubWVzc2FnZS1jb250ZW50e291dGxpbmU6IDB9J1xuXHRcdHRoaXMuc3RhdGUgPSB7aXNPdXRsaW5lRGlzYWJsZWQ6IHRydWV9XG5cdFx0dGhpcy5vbktleSA9IHRoaXMub25LZXkuYmluZCh0aGlzKVxuXHRcdHRoaXMub25Nb3VzZSA9IHRoaXMub25Nb3VzZS5iaW5kKHRoaXMpXG5cdH1cblxuXHRvbktleShlKSB7XG5cdFx0Ly8gVE9ETyBtb3ZlIDkgaW50byBjb25zdGFudHMgc29tZXdoZXJlXG5cdFx0aWYgKGUua2V5Q29kZSA9PT0gOSkge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7aXNPdXRsaW5lRGlzYWJsZWQ6IGZhbHNlfSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7aXNPdXRsaW5lRGlzYWJsZWQ6IHRydWV9KVxuXHRcdH1cblx0fVxuXG5cdG9uTW91c2UoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7aXNPdXRsaW5lRGlzYWJsZWQ6IHRydWV9KVxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0Y29uc3Qge2RvY3VtZW50OiBiZD1udWxsfSA9IGdsb2JhbFxuXG5cdFx0aWYgKGJkKSB7XG5cdFx0XHRiZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2UsIHRydWUpXG5cdFx0XHRiZC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vbk1vdXNlLCB0cnVlKVxuXHRcdFx0YmQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXksIHRydWUpXG5cdFx0fVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0Y29uc3Qge2RvY3VtZW50OiBiZD1udWxsfSA9IGdsb2JhbFxuXG5cdFx0aWYgKGJkKSB7XG5cdFx0XHRiZC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2UsIHRydWUpXG5cdFx0XHRiZC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vbk1vdXNlLCB0cnVlKVxuXHRcdFx0YmQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXksIHRydWUpXG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGlmICh0aGlzLnN0YXRlLmlzT3V0bGluZURpc2FibGVkKSB7XG5cdFx0XHRyZXR1cm4gPHN0eWxlPnt0aGlzLnN0eWxlfTwvc3R5bGU+XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGxcblx0XHR9XG5cdH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQge0dPT0QsIEJBRCwgTkVYVCwgbWFwSWRUb1RpdGxlLCBGb2N1c1N0eWxlVG9nZ2xlfSBmcm9tICcuL2luZGV4J1xuaW1wb3J0IHtMaXN0fSBmcm9tICcuLi9MaXN0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXlvdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKVxuXHRcdGNvbnN0IGlkcyA9IFtHT09ELCBCQUQsIE5FWFRdXG5cblx0XHR0aGlzLmxpc3REZWZpbml0aW9ucyA9IGlkcy5tYXAoaWQgPT4gKHtcblx0XHRcdGlkOiBpZCxcblx0XHRcdHRpdGxlOiBtYXBJZFRvVGl0bGUoaWQpLFxuXHRcdFx0a2V5OiBgJHtpZH0tbGlzdGBcblx0XHR9KSlcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRjb25zdCB7c2V0VmlldywgY2xlYXJTdG9yYWdlfSA9IHRoaXMuY29udGV4dC5hY3Rpb25zXG5cdFx0Y29uc3Qge2VkaXRpbmd9ID0gdGhpcy5wcm9wc1xuXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdiBpZD0nYXBwJz5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8ZGl2PmVkaXQgbW9kZTwvZGl2PlxuXHRcdFx0XHRcdDx1bCBjbGFzc05hbWU9J3RvcGljJz5cblx0XHRcdFx0XHRcdDxsaSBjbGFzc05hbWU9J3RvcGljX2l0ZW0nPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndG9waWNfaXRlbS1tZXRhJz5cblx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT0ndG9waWNfaW5wdXQgdG9waWNfaW5wdXQtLWJ1dHRvbic+KzwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGZvcm0gYWN0aW9uPScjJz5cblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT0ndGV4dCcgY2xhc3NOYW1lPSd0b3BpY19pbnB1dCcvPlxuXHRcdFx0XHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHRcdFx0XHRcdDxmb3JtIGFjdGlvbj0nIycgY2xhc3NOYW1lPSd0b3BpY19tZXNzYWdlLWZvcm0nPlxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPSd0ZXh0JyBjbGFzc05hbWU9J3RvcGljX2lucHV0JyAvPlxuXHRcdFx0XHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdDwvdWw+XG5cblx0XHRcdFx0XHQ8ZGl2PnZpZXcgbW9kZTwvZGl2PlxuXHRcdFx0XHRcdDx1bCBjbGFzc05hbWU9J3RvcGljJz5cblx0XHRcdFx0XHRcdDxsaSBjbGFzc05hbWU9J3RvcGljX2l0ZW0nPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndGFwaWNfaXRlbS1tZXRhJz5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndG9waWNfaW5wdXQgdG9waWMtY291bnRlcic+QTwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGZvcm0gYWN0aW9uPScjJz5cblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgY2xhc3NOYW1lPSd0b3BpY19pbnB1dCcgdHlwZT0ndGV4dCcgLz5cblx0XHRcdFx0XHRcdFx0PC9mb3JtPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndG9waWNfbWVzc2FnZS1mb3JtJz5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ndG9waWNfaW5wdXQnPm1lc3NhZ2UgY29udGVudDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxGb2N1c1N0eWxlVG9nZ2xlIC8+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdtYWluLWNvbCc+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2hlYWRlcic+XG5cdFx0XHRcdFx0XHQ8aDEgY2xhc3NOYW1lPSd0ZXh0LWNlbnRlcic+UmV0cm9zcGVjdGl2ZTwvaDE+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2JkJz5cblx0XHRcdFx0XHRcdHt0aGlzLmxpc3REZWZpbml0aW9ucy5tYXAoKGRlZmluaXRpb24pID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgbGlzdCA9IHRoaXMucHJvcHNbZGVmaW5pdGlvbi5pZF07XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIDxMaXN0IHsuLi5kZWZpbml0aW9ufSBsaXN0PXtsaXN0fSBlZGl0aW5nPXtlZGl0aW5nfSAvPlxuXHRcdFx0XHRcdFx0fSwgdGhpcyl9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2Zvb3Rlcic+XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT0nYnV0dG9uIGJ1dHRvbi1kZWZhdWx0JyBvbkNsaWNrPXsoKSA9PiB7Y2xlYXJTdG9yYWdlKCl9fT5jbGVhcjwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzc05hbWU9J2J1dHRvbiBidXR0b24tZGVmYXVsdCcgb25DbGljaz17KCkgPT4ge319PnNvcnQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3NOYW1lPSdidXR0b24gYnV0dG9uLWRlZmF1bHQnIG9uQ2xpY2s9eygpID0+IHt9fT5wcmludGFibGU8L2J1dHRvbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuTGF5b3V0LmNvbnRleHRUeXBlcyA9IHtcblx0YWN0aW9uczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG59XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IGNvbnN0IEdPT0QgPSAnR09PRCdcbmV4cG9ydCBjb25zdCBCQUQgPSAnQkFEJ1xuZXhwb3J0IGNvbnN0IE5FWFQgPSAnTkVYVCdcbmV4cG9ydCBjb25zdCBFTlRSWSA9ICdFTlRSWSdcbmV4cG9ydCBjb25zdCBQUklOVCA9ICdQUklOVCdcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfVklFVyA9IEVOVFJZXG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IHtkZWZhdWx0IGFzIExheW91dH0gZnJvbSAnLi9MYXlvdXQnXG5leHBvcnQge2RlZmF1bHQgYXMgRm9jdXNTdHlsZVRvZ2dsZX0gZnJvbSAnLi9Gb2N1c1N0eWxlVG9nZ2xlJ1xuZXhwb3J0IHtkZWZhdWx0IGFzIG1hcElkVG9UaXRsZX0gZnJvbSAnLi9saWIvbWFwSWRUb1RpdGxlJ1xuZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnXG4iLCIndXNlIHN0cmljdCdcbmltcG9ydCB7R09PRCwgQkFELCBORVhUfSBmcm9tICcuLi9pbmRleCc7XG5cbmNvbnN0IHRpdGxlRGljdGlvbmFyeSA9IHtcblx0R09PRDogJ0dvb2QnLFxuXHRCQUQ6ICdCYWQnLFxuXHRORVhUOiAnTmV4dCdcbn1cblxuY29uc3QgbWFwSWRUb1RpdGxlID0gKGlkKSA9PiB0aXRsZURpY3Rpb25hcnlbaWRdIHx8ICcnXG5cbmV4cG9ydCB7bWFwSWRUb1RpdGxlIGFzIGRlZmF1bHR9XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluY3JlbWVudEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpXG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxidXR0b25cblx0XHRcdFx0b25DbGljaz17dGhpcy5wcm9wcy5vbkluY3JlbWVudH1cblx0XHRcdFx0Y2xhc3NOYW1lPSdpbmNyZW1lbnQtdm90ZS1idXR0b24nPis8L2J1dHRvbj5cblx0XHQpXG5cdH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQge0JBRH0gZnJvbSAnLi4vTGF5b3V0JyAvLyBnZXQgcmlkIG9mIHRoaXMgY3Jvc3MgbW9kdWxlIGRlcGVuZGVuY3lcbmltcG9ydCB7Vm90ZUlucHV0LCBNZXNzYWdlV3JhcHBlciwgSW5jcmVtZW50QnV0dG9ufSBmcm9tICcuL2luZGV4J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbm5lckxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKVxuXHRcdHRoaXMuc2V0Vm90ZVZhbHVlID0gdGhpcy5zZXRWb3RlVmFsdWUuYmluZCh0aGlzKVxuXHRcdHRoaXMuY3JlYXRlVXBkYXRlTWVzc2FnZUhhbmRsZXIgPSB0aGlzLmNyZWF0ZVVwZGF0ZU1lc3NhZ2VIYW5kbGVyLmJpbmQodGhpcylcblx0XHR0aGlzLmlzRWRpdGluZyA9IHRoaXMuaXNFZGl0aW5nLmJpbmQodGhpcylcblx0XHR0aGlzLmNyZWF0ZVNldEVkaXRpbmdIYW5kbGVyID0gdGhpcy5jcmVhdGVTZXRFZGl0aW5nSGFuZGxlci5iaW5kKHRoaXMpXG5cdH1cblxuXHRzZXRWb3RlVmFsdWUoaWR4KSB7XG5cdFx0cmV0dXJuIHZhbHVlID0+IHtcblx0XHRcdHJldHVybiB0aGlzLmNvbnRleHQuYWN0aW9ucy5zZXRWb3RlVmFsdWUoaWR4LCB2YWx1ZSlcblx0XHR9XG5cdH1cblxuXHRjcmVhdGVVcGRhdGVNZXNzYWdlSGFuZGxlcihpZHgpIHtcblx0XHRjb25zdCB7aWR9ID0gdGhpcy5wcm9wc1xuXG5cdFx0cmV0dXJuICh2YWx1ZSkgPT4ge1xuXHRcdFx0dGhpcy5jb250ZXh0LmFjdGlvbnMudXBkYXRlTWVzc2FnZSh7dmFsdWUsIGlkeCwgaWR9KTtcblx0XHR9XG5cdH1cblxuXG5cdGlzRWRpdGluZyhpZHgpIHtcblx0XHRyZXR1cm4gISF0aGlzLnByb3BzLmVkaXRpbmcgLy8gISEgd2lsbCBjb252ZXJ0IG51bGxzIHRvIGZhbHNlXG5cdFx0XHQmJiB0aGlzLnByb3BzLmVkaXRpbmcuaWQgPT09IHRoaXMucHJvcHMuaWRcblx0XHRcdCYmIHRoaXMucHJvcHMuZWRpdGluZy5pZHggPT09IGlkeDtcblx0fVxuXG5cdGNyZWF0ZVNldEVkaXRpbmdIYW5kbGVyKGlkeCkge1xuXHRcdGNvbnN0IHtpZH0gPSB0aGlzLnByb3BzXG5cblx0XHRyZXR1cm4gKGNsZWFyKSA9PiB7XG5cdFx0XHR0aGlzLmNvbnRleHQuYWN0aW9ucy5zZXRFZGl0aW5nKGNsZWFyID09PSB0cnVlID8gbnVsbCA6IHtpZCwgaWR4fSlcblx0XHR9XG5cdH1cblxuXHRjcmVhdGVJbmNyZW1lbnRIYW5kbGVyKGlkeCkge1xuXHRcdHJldHVybiAoKSA9PiB7XG5cdFx0XHR0aGlzLmNvbnRleHQuYWN0aW9ucy5pbmNyZW1lbnQoaWR4KVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlckluY3JlbWVudEJ1dHRvbihpZHgpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5pZCAhPT0gQkFEKSB7XG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdH1cblxuXHRcdHJldHVybiA8SW5jcmVtZW50QnV0dG9uXG5cdFx0XHRvbkluY3JlbWVudD17dGhpcy5jcmVhdGVJbmNyZW1lbnRIYW5kbGVyKGlkeCl9IC8+XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0Y29uc3Qge2xpc3QsIGlkfSA9IHRoaXMucHJvcHNcblxuXHRcdGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIG51bGxcblx0XHR9IGVsc2Uge1xuXHRcdHJldHVybiA8dWwgY2xhc3NOYW1lPSdpbm5lci1saXN0Jz5cblx0XHRcdHtsaXN0Lm1hcCgoaXRlbSwgaWR4KSA9PiB7XG5cdFx0XHRcdHJldHVybiA8bGkga2V5PXtgJHt0aGlzLnByb3BzLmlkLnRvTG93ZXJDYXNlKCl9LSR7aWR4fWB9PlxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlckluY3JlbWVudEJ1dHRvbihpZHgpfVxuXHRcdFx0XHRcdDxWb3RlSW5wdXQgdmFsdWU9e2l0ZW0udmFsdWV9IHNldFZvdGVWYWx1ZT17dGhpcy5zZXRWb3RlVmFsdWUoaWR4KX0gLz5cblx0XHRcdFx0XHQ8TWVzc2FnZVdyYXBwZXJcblx0XHRcdFx0XHRcdHRleHQ9e2l0ZW0udGV4dH1cblx0XHRcdFx0XHRcdGlzRWRpdGluZz17dGhpcy5pc0VkaXRpbmcoaWR4KX1cblx0XHRcdFx0XHRcdHNldEVkaXRpbmc9e3RoaXMuY3JlYXRlU2V0RWRpdGluZ0hhbmRsZXIoaWR4KX1cblx0XHRcdFx0XHRcdHVwZGF0ZU1lc3NhZ2U9e3RoaXMuY3JlYXRlVXBkYXRlTWVzc2FnZUhhbmRsZXIoaWR4KX0gLz5cblx0XHRcdFx0PC9saT5cblx0XHRcdH0pfVxuXHRcdDwvdWw+XG5cdFx0fVxuXHR9XG59XG5cbklubmVyTGlzdC5jb250ZXh0VHlwZXMgPSB7XG5cdGFjdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQge0JBRH0gZnJvbSAnLi4vTGF5b3V0J1xuaW1wb3J0IHtJbm5lckxpc3R9IGZyb20gJy4vaW5kZXgnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKVxuXHRcdHRoaXMub25TdWJtaXQgPSB0aGlzLm9uU3VibWl0LmJpbmQodGhpcylcblx0fVxuXG5cdG9uU3VibWl0KGUpIHtcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMucmVmcy5pbnB1dC52YWx1ZTtcblx0XHRlLnByZXZlbnREZWZhdWx0KClcblxuXHRcdGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHRjb25zdCBkYXRhID0ge1xuXHRcdFx0aWQ6IHRoaXMucHJvcHMuaWQsXG5cdFx0XHR0ZXh0OiB2YWx1ZVxuXHRcdH1cblxuXHRcdGlmICh0aGlzLnByb3BzLmlkID09PSBCQUQpIHtcblx0XHRcdGRhdGEudmFsdWUgPSAwXG5cdFx0fVxuXHRcdHRoaXMucmVmcy5pbnB1dC52YWx1ZSA9ICcnXG5cdFx0dGhpcy5jb250ZXh0LmFjdGlvbnMuYWRkSXRlbShkYXRhKVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT0ndmVydCc+XG5cdFx0XHQ8aDIgY2xhc3NOYW1lPSdsaXN0LXRpdGxlJz57dGhpcy5wcm9wcy50aXRsZX08L2gyPlxuXHRcdFx0PGZvcm0gYWN0aW9uPScjJyBvblN1Ym1pdD17dGhpcy5vblN1Ym1pdH0+XG5cdFx0XHRcdDxpbnB1dCByZWY9J2lucHV0JyBjbGFzc05hbWU9J21lc3NhZ2UtY29udGVudCcgdHlwZT0ndGV4dCcgLz5cblx0XHRcdDwvZm9ybT5cblx0XHRcdDxJbm5lckxpc3Qgey4uLnRoaXMucHJvcHN9IC8+XG5cdFx0PC9kaXY+XG5cdH1cbn1cbkxpc3QuY29udGV4dFR5cGVzID0ge1xuXHRhY3Rpb25zOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG59XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtFU0N9IGZyb20gJy4vaW5kZXgnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcylcblx0XHR0aGlzLm9uS2V5RG93biA9IHRoaXMub25LZXlEb3duLmJpbmQodGhpcylcblx0XHR0aGlzLm9uU3VibWl0ID0gdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpXG5cdFx0dGhpcy5vbkJsdXIgPSB0aGlzLm9uQmx1ci5iaW5kKHRoaXMpXG5cdFx0dGhpcy51cGRhdGVNZXNzYWdlID0gdGhpcy51cGRhdGVNZXNzYWdlLmJpbmQodGhpcylcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdGlmICh0aGlzLnJlZnMuaW5wdXQpIHtcblx0XHRcdHRoaXMucmVmcy5pbnB1dC5mb2N1cygpXG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlTWVzc2FnZSgpIHtcblx0XHRpZiAodGhpcy5yZWZzLmlucHV0KSB7XG5cdFx0XHR0aGlzLnByb3BzLnVwZGF0ZU1lc3NhZ2UodGhpcy5yZWZzLmlucHV0LnZhbHVlKVxuXHRcdH1cblx0fVxuXG5cdG9uU3VibWl0KGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHR0aGlzLnVwZGF0ZU1lc3NhZ2UoKVxuXHR9XG5cblx0b25CbHVyKCkge1xuXHRcdHRoaXMudXBkYXRlTWVzc2FnZSgpXG5cdH1cblxuXHRvbktleURvd24oZSkge1xuXHRcdGlmIChlLndoaWNoID09PSBFU0MpIHtcblx0XHRcdHRoaXMucHJvcHMuc2V0RWRpdGluZyh0cnVlKVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gPGZvcm0gYWN0aW9uPScjJyBjbGFzc05hbWU9J21lc3NhZ2UtZm9ybScgb25TdWJtaXQ9e3RoaXMub25TdWJtaXR9PlxuXHRcdFx0PGlucHV0XG5cdFx0XHRcdHJlZj0naW5wdXQnXG5cdFx0XHRcdHR5cGU9J3RleHQnXG5cdFx0XHRcdGNsYXNzTmFtZT0nbWVzc2FnZS1jb250ZW50IG1lc3NhZ2UtY29udGVudC0taW5saW5lJ1xuXHRcdFx0XHRkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlfVxuXHRcdFx0XHRvbkJsdXI9e3RoaXMub25CbHVyfVxuXHRcdFx0XHRvbktleURvd249e3RoaXMub25LZXlEb3dufSAvPlxuXHRcdDwvZm9ybT5cblx0fVxufVxuXG5NZXNzYWdlSW5wdXQucHJvcFR5cGVzID0ge1xuXHR1cGRhdGVNZXNzYWdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VWaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcylcblx0XHR0aGlzLm9uRG91YmxlQ2xpY2sgPSB0aGlzLm9uRG91YmxlQ2xpY2suYmluZCh0aGlzKVxuXHR9XG5cblx0b25Eb3VibGVDbGljaygpIHtcblx0XHR0aGlzLnByb3BzLnNldEVkaXRpbmcoKVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiA8ZGl2IGNsYXNzTmFtZT0nbWVzc2FnZS1jb250ZW50JyBvbkRvdWJsZUNsaWNrPXt0aGlzLm9uRG91YmxlQ2xpY2t9PlxuXHRcdFx0e3RoaXMucHJvcHMudGV4dH1cblx0XHQ8L2Rpdj5cblx0fVxufVxuXG5NZXNzYWdlVmlldy5wcm9wVHlwZXMgPSB7XG5cdHRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHtNZXNzYWdlVmlldywgTWVzc2FnZUlucHV0fSBmcm9tICcuL2luZGV4J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlV3JhcHBlclx0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGNvbnN0IHtpc0VkaXRpbmcsIHRleHR9ID0gdGhpcy5wcm9wc1xuXG5cdFx0aWYgKGlzRWRpdGluZykge1xuXHRcdFx0cmV0dXJuIDxNZXNzYWdlSW5wdXRcblx0XHRcdFx0ZGVmYXVsdFZhbHVlPXt0ZXh0fVxuXHRcdFx0XHRzZXRFZGl0aW5nPXt0aGlzLnByb3BzLnNldEVkaXRpbmd9XG5cdFx0XHRcdHVwZGF0ZU1lc3NhZ2U9e3RoaXMucHJvcHMudXBkYXRlTWVzc2FnZX0vPlxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gPE1lc3NhZ2VWaWV3XG5cdFx0XHRcdHRleHQ9e3RleHR9XG5cdFx0XHRcdHNldEVkaXRpbmc9e3RoaXMucHJvcHMuc2V0RWRpdGluZ30gLz5cblx0XHR9XG5cdH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgcHJldmVudE5vbk51bWVyaWNJbnB1dCwge1VQLCBET1dOfSBmcm9tICcuL2xpYi9wcmV2ZW50Tm9uTnVtZXJpY0lucHV0J1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZvdGVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpXG5cdFx0dGhpcy5vblN1Ym1pdCA9IHRoaXMub25TdWJtaXQuYmluZCh0aGlzKVxuXHRcdHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcylcblx0XHR0aGlzLm9uS2V5RG93biA9IHRoaXMub25LZXlEb3duLmJpbmQodGhpcylcblx0XHR0aGlzLm9uQmx1ciA9IHRoaXMub25CbHVyLmJpbmQodGhpcylcblx0fVxuXG5cdG9uU3VibWl0KGUpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHR0aGlzLnByb3BzLnNldFZvdGVWYWx1ZSh0aGlzLnJlZnMudm90ZS52YWx1ZSlcblx0fVxuXG5cdG9uQmx1cigpIHtcblx0XHR0aGlzLm9uQ2hhbmdlKClcblx0fVxuXG5cdG9uQ2hhbmdlKCkge1xuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5yZWZzLnZvdGUudmFsdWUucmVwbGFjZSgvW15cXGRdL2csICcnKVxuXHRcdHRoaXMucHJvcHMuc2V0Vm90ZVZhbHVlKHZhbHVlLmxlbmd0aCA9PT0gMCA/IDAgOiB2YWx1ZSlcblx0fVxuXG5cdG9uS2V5RG93bihlKSB7XG5cdFx0Y29uc3QgY29kZSA9IGUua2V5Q29kZVxuXHRcdGxldCB2YWx1ZSA9IHBhcnNlSW50KHRoaXMucmVmcy52b3RlLnZhbHVlLCAxMClcblx0XHRpZiAoaXNOYU4odmFsdWUpKSB7XG5cdFx0XHR2YWx1ZSA9IDBcblx0XHR9XG5cdFx0cHJldmVudE5vbk51bWVyaWNJbnB1dChlKVxuXG5cdFx0aWYgKGNvZGUgPT09IFVQKSB7XG5cdFx0XHR2YWx1ZSA9IHZhbHVlICsgMVxuXHRcdFx0dGhpcy5wcm9wcy5zZXRWb3RlVmFsdWUodmFsdWUpXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IERPV04pIHtcblx0XHRcdHZhbHVlID0gdmFsdWUgLSAxXG5cdFx0XHR0aGlzLnByb3BzLnNldFZvdGVWYWx1ZSh2YWx1ZSA8PSAwID8gMCA6IHZhbHVlKVxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGlmICh0aGlzLnByb3BzLnZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBudWxsXG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0dXJuIDxmb3JtIGNsYXNzTmFtZT0ndm90ZS1mb3JtJyBhY3Rpb249JyMnIG9uU3VibWl0PXt0aGlzLm9uU3VibWl0fT5cblx0XHRcdFx0PGlucHV0IHJlZj0ndm90ZSdcblx0XHRcdFx0XHRjbGFzc05hbWU9J3RhbGx5LXZvdGUgdGV4dC1jZW50ZXInXG5cdFx0XHRcdFx0dmFsdWU9e3RoaXMucHJvcHMudmFsdWV9XG5cdFx0XHRcdFx0b25LZXlEb3duPXt0aGlzLm9uS2V5RG93bn1cblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHRcdFx0XHRvbkJsdXI9e3RoaXMub25CbHVyfVxuXHRcdFx0XHQvPlxuXHRcdFx0PC9mb3JtPlxuXHRcdH1cblx0fVxufVxuVm90ZUlucHV0LmNvbnRleHRUeXBlcyA9IHtcblx0YWN0aW9uczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxufSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGNvbnN0IEVTQyA9IDI3XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0IHtkZWZhdWx0IGFzIExpc3R9IGZyb20gJy4vTGlzdCdcbmV4cG9ydCB7ZGVmYXVsdCBhcyBJbm5lckxpc3R9IGZyb20gJy4vSW5uZXJMaXN0J1xuZXhwb3J0IHtkZWZhdWx0IGFzIFZvdGVJbnB1dH0gZnJvbSAnLi9Wb3RlSW5wdXQnXG5leHBvcnQge2RlZmF1bHQgYXMgTWVzc2FnZVdyYXBwZXJ9IGZyb20gJy4vTWVzc2FnZVdyYXBwZXInXG5leHBvcnQge2RlZmF1bHQgYXMgTWVzc2FnZUlucHV0fSBmcm9tICcuL01lc3NhZ2VJbnB1dCdcbmV4cG9ydCB7ZGVmYXVsdCBhcyBNZXNzYWdlVmlld30gZnJvbSAnLi9NZXNzYWdlVmlldydcbmV4cG9ydCB7ZGVmYXVsdCBhcyBJbmNyZW1lbnRCdXR0b259IGZyb20gJy4vSW5jcmVtZW50QnV0dG9uJ1xuXG5leHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cydcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGNvbnN0IERFTEVURSA9IDQ2XG5leHBvcnQgY29uc3QgQkFDS1NQQUNFID0gOFxuZXhwb3J0IGNvbnN0IFRBQiA9IDlcbmV4cG9ydCBjb25zdCBFU0NBUEUgPSAyN1xuZXhwb3J0IGNvbnN0IERFQ0lNQUwgPSAxMTBcbmV4cG9ydCBjb25zdCBQRVJJT0QgPSAxOTBcbmV4cG9ydCBjb25zdCBhID0gNjVcbmV4cG9ydCBjb25zdCBjID0gNjdcbmV4cG9ydCBjb25zdCB4ID0gODhcbmV4cG9ydCBjb25zdCB2ID0gODZcbmV4cG9ydCBjb25zdCBIT01FID0gMzVcbmV4cG9ydCBjb25zdCBVUCA9IDM4XG5leHBvcnQgY29uc3QgUklHSFQgPSAzOVxuZXhwb3J0IGNvbnN0IERPV04gPSA0MFxuZXhwb3J0IGNvbnN0IFpFUk8gPSA0OFxuZXhwb3J0IGNvbnN0IE5JTkUgPSA1N1xuZXhwb3J0IGNvbnN0IE5VTVBBRF9aRVJPID0gOTZcbmV4cG9ydCBjb25zdCBOVU1QQURfTklORSA9IDEwNVxuY29uc3Qgc3BlY2lhbHMgPSBbREVMRVRFLCBCQUNLU1BBQ0UsIFRBQiwgRVNDQVBFLCBERUNJTUFMLCBQRVJJT0RdXG5cbmNvbnN0IHByZXZlbk5vbk51bWVyaWNJbnB1dCA9IChlKSA9PiB7XG5cdGNvbnN0IGNvZGUgPSBlLmtleUNvZGVcblx0Ly8gY29uc3QgY3RybEtleSA9IGUuY3RybEtleVxuXHRjb25zdCBzaGlmdEtleSA9IGUuc2hpZnRLZXlcblx0Y29uc3QgbWV0YUtleSA9IGUubWV0YUtleSB8fCBlLmN0cmxLZXlcblxuXHRpZiAoc3BlY2lhbHMuaW5kZXhPZihjb2RlKSAhPT0gLTEgfHxcblx0XHRcdChjb2RlID09IGEgJiYgbWV0YUtleSA9PT0gdHJ1ZSkgfHxcblx0XHRcdChjb2RlID09IGMgJiYgbWV0YUtleSA9PT0gdHJ1ZSkgfHxcblx0XHRcdChjb2RlID09IHggJiYgbWV0YUtleSA9PT0gdHJ1ZSkgfHxcblx0XHRcdChjb2RlID09IHYgJiYgbWV0YUtleSA9PT0gdHJ1ZSkgfHxcblx0XHRcdChjb2RlID49IEhPTUUgJiYgY29kZSA8PSBSSUdIVCkgfHxcblx0XHRcdCgoc2hpZnRLZXkgJiYgKGNvZGUgPj0gWkVSTyAmJiBjb2RlIDw9IE5JTkUpKSB8fCAoY29kZSA+PSBOVU1QQURfWkVSTyAmJiBjb2RlIDw9IE5VTVBBRF9OSU5FKSkgfHxcblx0XHRcdCgoY29kZSA+PSBaRVJPICYmIGNvZGUgPD0gTklORSkgfHwgKGNvZGUgPj0gTlVNUEFEX1pFUk8gJiYgY29kZSA8PSBOVU1QQURfTklORSkpXG5cdFx0KSB7XG5cdFx0cmV0dXJuXG5cdH0gZWxzZSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdH1cbn1cblxuZXhwb3J0IHtwcmV2ZW5Ob25OdW1lcmljSW5wdXQgYXMgZGVmYXVsdH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBSZWFjdERPTSA9IGdsb2JhbC5SZWFjdERPTVxuaW1wb3J0IHtBcHB9IGZyb20gJy4vQXBwJ1xuXG5SZWFjdERPTS5yZW5kZXIoXG5cdDxBcHAgLz4sXG5cdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdtYWluJylbMF1cbilcbiJdfQ==
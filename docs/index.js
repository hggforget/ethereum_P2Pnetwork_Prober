webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(61);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var settle = __webpack_require__(117);
var cookies = __webpack_require__(120);
var buildURL = __webpack_require__(62);
var buildFullPath = __webpack_require__(114);
var parseHeaders = __webpack_require__(125);
var isURLSameOrigin = __webpack_require__(123);
var createError = __webpack_require__(58);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(116);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(3);
var normalizeHeaderName = __webpack_require__(124);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(55);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(55);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 63 */,
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mapbox_gl__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mapbox_gl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mapbox_gl__);
//
//
//
//
//
//
//
//
//

 // or "const mapboxgl = require('mapbox-gl');"
var DOMAIN = location.href.indexOf('github.io') != -1 ? 'https://fengchuan.pythonanywhere.com' : 'http://127.0.0.1:8000';
/* harmony default export */ __webpack_exports__["a"] = ({
	data() {
		return { map: null, popup: null };
	},
	mounted() {
		__WEBPACK_IMPORTED_MODULE_0_mapbox_gl___default.a.accessToken = 'pk.eyJ1IjoiMTI5OTY5Mzk5OSIsImEiOiJja2UyamwyeW4wOXpuMnRueTVxZ3F0dHljIn0.b0lCIK3qG1RySUodJdAB6Q';
		this.map = new __WEBPACK_IMPORTED_MODULE_0_mapbox_gl___default.a.Map({
			container: 'map', // container id
			style: 'mapbox://styles/mapbox/light-v10', // style URL
			center: [-74.5, 40], // starting position [lng, lat]
			zoom: 2 // starting zoom
		});

		// this.map.addSource('earthquakes', {
		// type: 'geojson',
		// // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
		// // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
		// data:
		// DOMAIN+'/ethereum/api/getdatas/',
		// cluster: true,
		// clusterMaxZoom: 14, // Max zoom to cluster points on
		// clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
		// });


		// this.axios.get(DOMAIN+'/ethereum/api/getdatas/').then(ret=>{

		// 	this.map.addSource('point', {
		// 	'type': 'geojson',
		// 	'data': ret.data
		// 	});

		// 	this.map.addLayer({
		// 	'id': 'point',
		// 	'type': 'circle',
		// 	'source': 'point',
		// 	'paint': {
		// 	'circle-radius': 3,
		// 	'circle-color': '#3887be'
		// 	}
		// 	});

		// });
		this.map.on('load', () => {
			// Add a new source from our GeoJSON data and
			// set the 'cluster' option to true. GL-JS will
			// add the point_count property to your source data.

			this.map.addSource('route', {
				'type': 'geojson',
				'data': {
					'type': 'Feature',
					'properties': {},
					'geometry': {
						'type': 'LineString',
						'coordinates': []
					}
				} });

			this.map.addLayer({
				'id': 'route',
				'type': 'line',
				'source': 'route',
				'layout': {
					'line-join': 'round',
					'line-cap': 'round'
				},
				'paint': {
					'line-color': 'grey',
					'line-width': 1
				}
			});

			this.map.addSource('earthquakes', {
				type: 'geojson',
				// Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
				// from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.

				data: DOMAIN + '/ethereum/api/getdatas/',
				cluster: true,
				clusterMaxZoom: 14, // Max zoom to cluster points on
				clusterRadius: 20 // Radius of each cluster when clustering points (defaults to 50)
			});

			this.map.addLayer({
				id: 'clusters',
				type: 'circle',
				source: 'earthquakes',
				filter: ['has', 'point_count'],
				paint: {
					// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
					// with three steps to implement three types of circles:
					//   * Blue, 20px circles when point count is less than 100
					//   * Yellow, 30px circles when point count is between 100 and 750
					//   * Pink, 40px circles when point count is greater than or equal to 750
					'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
					'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
				}
			});

			this.map.addLayer({
				id: 'cluster-count',
				type: 'symbol',
				source: 'earthquakes',
				filter: ['has', 'point_count'],
				layout: {
					'text-field': '{point_count_abbreviated}',
					'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
					'text-size': 12
				}
			});

			this.map.addLayer({
				id: 'unclustered-point',
				type: 'circle',
				source: 'earthquakes',
				filter: ['!', ['has', 'point_count']],
				paint: {
					'circle-color': 'red',
					'circle-radius': 6,
					'circle-stroke-width': 1,
					'circle-stroke-color': '#fff'
				}
			});

			// inspect a cluster on click
			this.map.on('click', 'clusters', function (e) {
				var features = map.queryRenderedFeatures(e.point, {
					layers: ['clusters']
				});
				var clusterId = features[0].properties.cluster_id;
				this.map.getSource('earthquakes').getClusterExpansionZoom(clusterId, function (err, zoom) {
					if (err) return;

					this.map.easeTo({
						center: features[0].geometry.coordinates,
						zoom: zoom
					});
				});
			});

			// When a click event occurs on a feature in
			// the unclustered-point layer, open a popup at
			// the location of the feature, with
			// description HTML from its properties.
			this.map.on('click', 'unclustered-point', function (e) {});

			this.map.on('mouseenter', 'clusters', () => {
				this.map.getCanvas().style.cursor = 'pointer';
			});
			this.map.on('mouseleave', 'clusters', () => {
				this.map.getCanvas().style.cursor = '';
			});

			this.map.on('mouseenter', 'unclustered-point', e => {

				var coordinates = e.features[0].geometry.coordinates.slice();
				let ip = e.features[0].properties.ip;
				let nodeid = e.features[0].properties.id;
				let pongtime = e.features[0].properties.pongtime;
				//var tsunami;


				// Ensure that if the map is zoomed out such that
				// multiple copies of the feature are visible, the
				// popup appears over the copy being pointed to.
				while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
					coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
				}
				if (this.popup) {
					this.popup.remove();
					this.popup = null;
				}
				this.popup = new __WEBPACK_IMPORTED_MODULE_0_mapbox_gl___default.a.Popup().setLngLat(coordinates).setHTML(`nodeid:${nodeid}<br>ip:${ip}<br>lastpongtime:${pongtime}<br>neighbours:<i id="neighbours">加载中...</i>`).addTo(this.map);
				this.axios.get(DOMAIN + '/ethereum/api/getneighbours/' + nodeid + '/' + ip + '/').then(ret => {
					console.log(1111);
					console.log(ret.data.data);
					document.getElementById('neighbours').innerHTML = ret.data.data;
					this.map.getSource('route').setData(ret.data.json);
				});
			});
			this.map.on('mouseleave', 'unclustered-point', () => {
				if (this.popup) {
					this.popup.remove();
					this.popup = null;
				}
			});
		});
	},
	methods: {
		startHacking() {
			this.$notify({
				title: 'It works!',
				type: 'success',
				message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
				duration: 5000
			});
		}
	}
});

/***/ }),
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(133).Buffer))

/***/ }),
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(110);

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(163);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(194)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!../../../postcss-loader/index.js!./index.css", function() {
			var newContent = require("!!../../../css-loader/index.js!../../../postcss-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),e}function _slicedToArray(e,r){return _arrayWithHoles(e)||_iterableToArrayLimit(e,r)||_unsupportedIterableToArray(e,r)||_nonIterableRest()}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _iterableToArrayLimit(e,r){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var t=[],n=!0,o=!1,a=void 0;try{for(var c,i=e[Symbol.iterator]();!(n=(c=i.next()).done)&&(t.push(c.value),!r||t.length!==r);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==i.return||i.return()}finally{if(o)throw a}}return t}}function _unsupportedIterableToArray(e,r){if(e){if("string"==typeof e)return _arrayLikeToArray(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,r):void 0}}function _arrayLikeToArray(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _createForOfIteratorHelper(e,r){var t;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=_unsupportedIterableToArray(e))||r&&e&&"number"==typeof e.length){t&&(e=t);var n=0;return{s:r=function(){},n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,c=!1;return{s:function(){t=e[Symbol.iterator]()},n:function(){var e=t.next();return a=e.done,e},e:function(e){c=!0,o=e},f:function(){try{a||null==t.return||t.return()}finally{if(c)throw o}}}}function createCommonjsModule(e,r,t){return e(t={path:r,exports:{},require:function(e,r){return commonjsRequire(e,null==r?t.path:r)}},t.exports),t.exports}function commonjsRequire(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}var SEMVER_SPEC_VERSION="2.0.0",MAX_LENGTH=256,MAX_SAFE_INTEGER=Number.MAX_SAFE_INTEGER||9007199254740991,MAX_SAFE_COMPONENT_LENGTH=16,constants={SEMVER_SPEC_VERSION:SEMVER_SPEC_VERSION,MAX_LENGTH:MAX_LENGTH,MAX_SAFE_INTEGER:MAX_SAFE_INTEGER,MAX_SAFE_COMPONENT_LENGTH:MAX_SAFE_COMPONENT_LENGTH},debug="object"===("undefined"==typeof process?"undefined":_typeof(process))&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?function(){for(var e,r=arguments.length,t=new Array(r),n=0;n<r;n++)t[n]=arguments[n];return(e=console).error.apply(e,["SEMVER"].concat(t))}:function(){},debug_1=debug,re_1=createCommonjsModule(function(e,r){var t=constants.MAX_SAFE_COMPONENT_LENGTH,o=(r=e.exports={}).re=[],a=r.src=[],c=r.t={},i=0;(e=function(e,r,t){var n=i++;debug_1(n,r),c[e]=n,a[n]=r,o[n]=new RegExp(r,t?"g":void 0)})("NUMERICIDENTIFIER","0|[1-9]\\d*"),e("NUMERICIDENTIFIERLOOSE","[0-9]+"),e("NONNUMERICIDENTIFIER","\\d*[a-zA-Z-][a-zA-Z0-9-]*"),e("MAINVERSION","(".concat(a[c.NUMERICIDENTIFIER],")\\.")+"(".concat(a[c.NUMERICIDENTIFIER],")\\.")+"(".concat(a[c.NUMERICIDENTIFIER],")")),e("MAINVERSIONLOOSE","(".concat(a[c.NUMERICIDENTIFIERLOOSE],")\\.")+"(".concat(a[c.NUMERICIDENTIFIERLOOSE],")\\.")+"(".concat(a[c.NUMERICIDENTIFIERLOOSE],")")),e("PRERELEASEIDENTIFIER","(?:".concat(a[c.NUMERICIDENTIFIER],"|").concat(a[c.NONNUMERICIDENTIFIER],")")),e("PRERELEASEIDENTIFIERLOOSE","(?:".concat(a[c.NUMERICIDENTIFIERLOOSE],"|").concat(a[c.NONNUMERICIDENTIFIER],")")),e("PRERELEASE","(?:-(".concat(a[c.PRERELEASEIDENTIFIER],"(?:\\.").concat(a[c.PRERELEASEIDENTIFIER],")*))")),e("PRERELEASELOOSE","(?:-?(".concat(a[c.PRERELEASEIDENTIFIERLOOSE],"(?:\\.").concat(a[c.PRERELEASEIDENTIFIERLOOSE],")*))")),e("BUILDIDENTIFIER","[0-9A-Za-z-]+"),e("BUILD","(?:\\+(".concat(a[c.BUILDIDENTIFIER],"(?:\\.").concat(a[c.BUILDIDENTIFIER],")*))")),e("FULLPLAIN","v?".concat(a[c.MAINVERSION]).concat(a[c.PRERELEASE],"?").concat(a[c.BUILD],"?")),e("FULL","^".concat(a[c.FULLPLAIN],"$")),e("LOOSEPLAIN","[v=\\s]*".concat(a[c.MAINVERSIONLOOSE]).concat(a[c.PRERELEASELOOSE],"?").concat(a[c.BUILD],"?")),e("LOOSE","^".concat(a[c.LOOSEPLAIN],"$")),e("GTLT","((?:<|>)?=?)"),e("XRANGEIDENTIFIERLOOSE","".concat(a[c.NUMERICIDENTIFIERLOOSE],"|x|X|\\*")),e("XRANGEIDENTIFIER","".concat(a[c.NUMERICIDENTIFIER],"|x|X|\\*")),e("XRANGEPLAIN","[v=\\s]*(".concat(a[c.XRANGEIDENTIFIER],")")+"(?:\\.(".concat(a[c.XRANGEIDENTIFIER],")")+"(?:\\.(".concat(a[c.XRANGEIDENTIFIER],")")+"(?:".concat(a[c.PRERELEASE],")?").concat(a[c.BUILD],"?")+")?)?"),e("XRANGEPLAINLOOSE","[v=\\s]*(".concat(a[c.XRANGEIDENTIFIERLOOSE],")")+"(?:\\.(".concat(a[c.XRANGEIDENTIFIERLOOSE],")")+"(?:\\.(".concat(a[c.XRANGEIDENTIFIERLOOSE],")")+"(?:".concat(a[c.PRERELEASELOOSE],")?").concat(a[c.BUILD],"?")+")?)?"),e("XRANGE","^".concat(a[c.GTLT],"\\s*").concat(a[c.XRANGEPLAIN],"$")),e("XRANGELOOSE","^".concat(a[c.GTLT],"\\s*").concat(a[c.XRANGEPLAINLOOSE],"$")),e("COERCE","".concat("(^|[^\\d])(\\d{1,").concat(t,"})")+"(?:\\.(\\d{1,".concat(t,"}))?")+"(?:\\.(\\d{1,".concat(t,"}))?")+"(?:$|[^\\d])"),e("COERCERTL",a[c.COERCE],!0),e("LONETILDE","(?:~>?)"),e("TILDETRIM","(\\s*)".concat(a[c.LONETILDE],"\\s+"),!0),r.tildeTrimReplace="$1~",e("TILDE","^".concat(a[c.LONETILDE]).concat(a[c.XRANGEPLAIN],"$")),e("TILDELOOSE","^".concat(a[c.LONETILDE]).concat(a[c.XRANGEPLAINLOOSE],"$")),e("LONECARET","(?:\\^)"),e("CARETTRIM","(\\s*)".concat(a[c.LONECARET],"\\s+"),!0),r.caretTrimReplace="$1^",e("CARET","^".concat(a[c.LONECARET]).concat(a[c.XRANGEPLAIN],"$")),e("CARETLOOSE","^".concat(a[c.LONECARET]).concat(a[c.XRANGEPLAINLOOSE],"$")),e("COMPARATORLOOSE","^".concat(a[c.GTLT],"\\s*(").concat(a[c.LOOSEPLAIN],")$|^$")),e("COMPARATOR","^".concat(a[c.GTLT],"\\s*(").concat(a[c.FULLPLAIN],")$|^$")),e("COMPARATORTRIM","(\\s*)".concat(a[c.GTLT],"\\s*(").concat(a[c.LOOSEPLAIN],"|").concat(a[c.XRANGEPLAIN],")"),!0),r.comparatorTrimReplace="$1$2$3",e("HYPHENRANGE","^\\s*(".concat(a[c.XRANGEPLAIN],")")+"\\s+-\\s+"+"(".concat(a[c.XRANGEPLAIN],")")+"\\s*$"),e("HYPHENRANGELOOSE","^\\s*(".concat(a[c.XRANGEPLAINLOOSE],")")+"\\s+-\\s+"+"(".concat(a[c.XRANGEPLAINLOOSE],")")+"\\s*$"),e("STAR","(<|>)?=?\\s*\\*"),e("GTE0","^\\s*>=\\s*0.0.0\\s*$"),e("GTE0PRE","^\\s*>=\\s*0.0.0-0\\s*$")}),numeric=/^[0-9]+$/,compareIdentifiers=function(e,r){var t=numeric.test(e),n=numeric.test(r);return t&&n&&(e=+e,r=+r),e===r?0:t&&!n||(!n||t)&&e<r?-1:1},rcompareIdentifiers=function(e,r){return compareIdentifiers(r,e)},identifiers={compareIdentifiers:compareIdentifiers,rcompareIdentifiers:rcompareIdentifiers},MAX_LENGTH$1=constants.MAX_LENGTH,MAX_SAFE_INTEGER$1=constants.MAX_SAFE_INTEGER,re=re_1.re,t=re_1.t,compareIdentifiers$1=identifiers.compareIdentifiers,SemVer=function(){function o(e,r){if(_classCallCheck(this,o),r&&"object"===_typeof(r)||(r={loose:!!r,includePrerelease:!1}),e instanceof o){if(e.loose===!!r.loose&&e.includePrerelease===!!r.includePrerelease)return e;e=e.version}else if("string"!=typeof e)throw new TypeError("Invalid Version: ".concat(e));if(e.length>MAX_LENGTH$1)throw new TypeError("version is longer than ".concat(MAX_LENGTH$1," characters"));if(debug_1("SemVer",e,r),this.options=r,this.loose=!!r.loose,this.includePrerelease=!!r.includePrerelease,!(r=e.trim().match(r.loose?re[t.LOOSE]:re[t.FULL])))throw new TypeError("Invalid Version: ".concat(e));if(this.raw=e,this.major=+r[1],this.minor=+r[2],this.patch=+r[3],this.major>MAX_SAFE_INTEGER$1||this.major<0)throw new TypeError("Invalid major version");if(this.minor>MAX_SAFE_INTEGER$1||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>MAX_SAFE_INTEGER$1||this.patch<0)throw new TypeError("Invalid patch version");r[4]?this.prerelease=r[4].split(".").map(function(e){if(/^[0-9]+$/.test(e)){var r=+e;if(0<=r&&r<MAX_SAFE_INTEGER$1)return r}return e}):this.prerelease=[],this.build=r[5]?r[5].split("."):[],this.format()}return _createClass(o,[{key:"format",value:function(){return this.version="".concat(this.major,".").concat(this.minor,".").concat(this.patch),this.prerelease.length&&(this.version+="-".concat(this.prerelease.join("."))),this.version}},{key:"toString",value:function(){return this.version}},{key:"compare",value:function(e){if(debug_1("SemVer.compare",this.version,this.options,e),!(e instanceof o)){if("string"==typeof e&&e===this.version)return 0;e=new o(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}},{key:"compareMain",value:function(e){return e instanceof o||(e=new o(e,this.options)),compareIdentifiers$1(this.major,e.major)||compareIdentifiers$1(this.minor,e.minor)||compareIdentifiers$1(this.patch,e.patch)}},{key:"comparePre",value:function(e){if(e instanceof o||(e=new o(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;var r=0;do{var t=this.prerelease[r],n=e.prerelease[r];if(debug_1("prerelease compare",r,t,n),void 0===t&&void 0===n)return 0;if(void 0===n)return 1;if(void 0===t)return-1;if(t!==n)return compareIdentifiers$1(t,n)}while(++r)}},{key:"compareBuild",value:function(e){e instanceof o||(e=new o(e,this.options));var r=0;do{var t=this.build[r],n=e.build[r];if(debug_1("prerelease compare",r,t,n),void 0===t&&void 0===n)return 0;if(void 0===n)return 1;if(void 0===t)return-1;if(t!==n)return compareIdentifiers$1(t,n)}while(++r)}},{key:"inc",value:function(e,r){switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",r);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",r);break;case"prepatch":this.prerelease.length=0,this.inc("patch",r),this.inc("pre",r);break;case"prerelease":0===this.prerelease.length&&this.inc("patch",r),this.inc("pre",r);break;case"major":0===this.minor&&0===this.patch&&0!==this.prerelease.length||this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":0===this.patch&&0!==this.prerelease.length||this.minor++,this.patch=0,this.prerelease=[];break;case"patch":0===this.prerelease.length&&this.patch++,this.prerelease=[];break;case"pre":if(0===this.prerelease.length)this.prerelease=[0];else{for(var t=this.prerelease.length;0<=--t;)"number"==typeof this.prerelease[t]&&(this.prerelease[t]++,t=-2);-1===t&&this.prerelease.push(0)}r&&(this.prerelease[0]!==r||isNaN(this.prerelease[1]))&&(this.prerelease=[r,0]);break;default:throw new Error("invalid increment argument: ".concat(e))}return this.format(),this.raw=this.version,this}}]),o}(),semver=SemVer,MAX_LENGTH$2=constants.MAX_LENGTH,re$1=re_1.re,t$1=re_1.t,parse=function(e,r){if(r&&"object"===_typeof(r)||(r={loose:!!r,includePrerelease:!1}),e instanceof semver)return e;if("string"!=typeof e)return null;if(e.length>MAX_LENGTH$2)return null;if(!(r.loose?re$1[t$1.LOOSE]:re$1[t$1.FULL]).test(e))return null;try{return new semver(e,r)}catch(e){return null}},parse_1=parse,valid=function(e,r){return(r=parse_1(e,r))?r.version:null},valid_1=valid,clean=function(e,r){return(r=parse_1(e.trim().replace(/^[=v]+/,""),r))?r.version:null},clean_1=clean,inc=function(e,r,t,n){"string"==typeof t&&(n=t,t=void 0);try{return new semver(e,t).inc(r,n).version}catch(e){return null}},inc_1=inc,compare=function(e,r,t){return new semver(e,t).compare(new semver(r,t))},compare_1=compare,eq=function(e,r,t){return 0===compare_1(e,r,t)},eq_1=eq,diff=function(e,r){if(eq_1(e,r))return null;var t,n=parse_1(e),o=parse_1(r),a=(r=n.prerelease.length||o.prerelease.length)?"pre":"",r=r?"prerelease":"";for(t in n)if(("major"===t||"minor"===t||"patch"===t)&&n[t]!==o[t])return a+t;return r},diff_1=diff,major=function(e,r){return new semver(e,r).major},major_1=major,minor=function(e,r){return new semver(e,r).minor},minor_1=minor,patch=function(e,r){return new semver(e,r).patch},patch_1=patch,prerelease=function(e,r){return(r=parse_1(e,r))&&r.prerelease.length?r.prerelease:null},prerelease_1=prerelease,rcompare=function(e,r,t){return compare_1(r,e,t)},rcompare_1=rcompare,compareLoose=function(e,r){return compare_1(e,r,!0)},compareLoose_1=compareLoose,compareBuild=function(e,r,t){return e=new semver(e,t),t=new semver(r,t),e.compare(t)||e.compareBuild(t)},compareBuild_1=compareBuild,sort=function(e,t){return e.sort(function(e,r){return compareBuild_1(e,r,t)})},sort_1=sort,rsort=function(e,t){return e.sort(function(e,r){return compareBuild_1(r,e,t)})},rsort_1=rsort,gt=function(e,r,t){return 0<compare_1(e,r,t)},gt_1=gt,lt=function(e,r,t){return compare_1(e,r,t)<0},lt_1=lt,neq=function(e,r,t){return 0!==compare_1(e,r,t)},neq_1=neq,gte=function(e,r,t){return 0<=compare_1(e,r,t)},gte_1=gte,lte=function(e,r,t){return compare_1(e,r,t)<=0},lte_1=lte,cmp=function(e,r,t,n){switch(r){case"===":return"object"===_typeof(e)&&(e=e.version),"object"===_typeof(t)&&(t=t.version),e===t;case"!==":return"object"===_typeof(e)&&(e=e.version),"object"===_typeof(t)&&(t=t.version),e!==t;case"":case"=":case"==":return eq_1(e,t,n);case"!=":return neq_1(e,t,n);case">":return gt_1(e,t,n);case">=":return gte_1(e,t,n);case"<":return lt_1(e,t,n);case"<=":return lte_1(e,t,n);default:throw new TypeError("Invalid operator: ".concat(r))}},cmp_1=cmp,re$2=re_1.re,t$2=re_1.t,coerce=function(e,r){if(e instanceof semver)return e;if("number"==typeof e&&(e=String(e)),"string"!=typeof e)return null;var t,n=null;if((r=r||{}).rtl){for(;(t=re$2[t$2.COERCERTL].exec(e))&&(!n||n.index+n[0].length!==e.length);)n&&t.index+t[0].length===n.index+n[0].length||(n=t),re$2[t$2.COERCERTL].lastIndex=t.index+t[1].length+t[2].length;re$2[t$2.COERCERTL].lastIndex=-1}else n=e.match(re$2[t$2.COERCE]);return null===n?null:parse_1("".concat(n[2],".").concat(n[3]||"0",".").concat(n[4]||"0"),r)},coerce_1=coerce,Range=function(){function n(e,r){var t=this;if(_classCallCheck(this,n),r&&"object"===_typeof(r)||(r={loose:!!r,includePrerelease:!1}),e instanceof n)return e.loose===!!r.loose&&e.includePrerelease===!!r.includePrerelease?e:new n(e.raw,r);if(e instanceof comparator)return this.raw=e.value,this.set=[[e]],this.format(),this;if(this.options=r,this.loose=!!r.loose,this.includePrerelease=!!r.includePrerelease,this.raw=e,this.set=e.split(/\s*\|\|\s*/).map(function(e){return t.parseRange(e.trim())}).filter(function(e){return e.length}),!this.set.length)throw new TypeError("Invalid SemVer Range: ".concat(e));this.format()}return _createClass(n,[{key:"format",value:function(){return this.range=this.set.map(function(e){return e.join(" ").trim()}).join("||").trim(),this.range}},{key:"toString",value:function(){return this.range}},{key:"parseRange",value:function(e){var r=this,t=this.options.loose;e=e.trim();var n=t?re$3[t$3.HYPHENRANGELOOSE]:re$3[t$3.HYPHENRANGE];e=e.replace(n,hyphenReplace(this.options.includePrerelease)),debug_1("hyphen replace",e),e=e.replace(re$3[t$3.COMPARATORTRIM],comparatorTrimReplace),debug_1("comparator trim",e,re$3[t$3.COMPARATORTRIM]),e=(e=(e=e.replace(re$3[t$3.TILDETRIM],tildeTrimReplace)).replace(re$3[t$3.CARETTRIM],caretTrimReplace)).split(/\s+/).join(" ");var o=t?re$3[t$3.COMPARATORLOOSE]:re$3[t$3.COMPARATOR];return e.split(" ").map(function(e){return parseComparator(e,r.options)}).join(" ").split(/\s+/).map(function(e){return replaceGTE0(e,r.options)}).filter(this.options.loose?function(e){return!!e.match(o)}:function(){return!0}).map(function(e){return new comparator(e,r.options)})}},{key:"intersects",value:function(e,t){if(!(e instanceof n))throw new TypeError("a Range is required");return this.set.some(function(r){return isSatisfiable(r,t)&&e.set.some(function(e){return isSatisfiable(e,t)&&r.every(function(r){return e.every(function(e){return r.intersects(e,t)})})})})}},{key:"test",value:function(e){if(!e)return!1;if("string"==typeof e)try{e=new semver(e,this.options)}catch(e){return!1}for(var r=0;r<this.set.length;r++)if(testSet(this.set[r],e,this.options))return!0;return!1}}]),n}(),range=Range,re$3=re_1.re,t$3=re_1.t,comparatorTrimReplace=re_1.comparatorTrimReplace,tildeTrimReplace=re_1.tildeTrimReplace,caretTrimReplace=re_1.caretTrimReplace,isSatisfiable=function(e,r){for(var t=!0,n=e.slice(),o=n.pop();t&&n.length;)t=n.every(function(e){return o.intersects(e,r)}),o=n.pop();return t},parseComparator=function(e,r){return debug_1("comp",e,r),e=replaceCarets(e,r),debug_1("caret",e),e=replaceTildes(e,r),debug_1("tildes",e),e=replaceXRanges(e,r),debug_1("xrange",e),e=replaceStars(e,r),debug_1("stars",e),e},isX=function(e){return!e||"x"===e.toLowerCase()||"*"===e},replaceTildes=function(e,r){return e.trim().split(/\s+/).map(function(e){return replaceTilde(e,r)}).join(" ")},replaceTilde=function(a,e){return e=e.loose?re$3[t$3.TILDELOOSE]:re$3[t$3.TILDE],a.replace(e,function(e,r,t,n,o){return debug_1("tilde",a,e,r,t,n,o),t=isX(r)?"":isX(t)?">=".concat(r,".0.0 <").concat(+r+1,".0.0-0"):isX(n)?">=".concat(r,".").concat(t,".0 <").concat(r,".").concat(+t+1,".0-0"):o?(debug_1("replaceTilde pr",o),">=".concat(r,".").concat(t,".").concat(n,"-").concat(o," <").concat(r,".").concat(+t+1,".0-0")):">=".concat(r,".").concat(t,".").concat(n," <").concat(r,".").concat(+t+1,".0-0"),debug_1("tilde return",t),t})},replaceCarets=function(e,r){return e.trim().split(/\s+/).map(function(e){return replaceCaret(e,r)}).join(" ")},replaceCaret=function(a,e){debug_1("caret",a,e);var r=e.loose?re$3[t$3.CARETLOOSE]:re$3[t$3.CARET],c=e.includePrerelease?"-0":"";return a.replace(r,function(e,r,t,n,o){return debug_1("caret",a,e,r,t,n,o),r=isX(r)?"":isX(t)?">=".concat(r,".0.0").concat(c," <").concat(+r+1,".0.0-0"):isX(n)?"0"===r?">=".concat(r,".").concat(t,".0").concat(c," <").concat(r,".").concat(+t+1,".0-0"):">=".concat(r,".").concat(t,".0").concat(c," <").concat(+r+1,".0.0-0"):o?(debug_1("replaceCaret pr",o),"0"===r?"0"===t?">=".concat(r,".").concat(t,".").concat(n,"-").concat(o," <").concat(r,".").concat(t,".").concat(+n+1,"-0"):">=".concat(r,".").concat(t,".").concat(n,"-").concat(o," <").concat(r,".").concat(+t+1,".0-0"):">=".concat(r,".").concat(t,".").concat(n,"-").concat(o," <").concat(+r+1,".0.0-0")):(debug_1("no pr"),"0"===r?"0"===t?">=".concat(r,".").concat(t,".").concat(n).concat(c," <").concat(r,".").concat(t,".").concat(+n+1,"-0"):">=".concat(r,".").concat(t,".").concat(n).concat(c," <").concat(r,".").concat(+t+1,".0-0"):">=".concat(r,".").concat(t,".").concat(n," <").concat(+r+1,".0.0-0")),debug_1("caret return",r),r})},replaceXRanges=function(e,r){return debug_1("replaceXRanges",e,r),e.split(/\s+/).map(function(e){return replaceXRange(e,r)}).join(" ")},replaceXRange=function(u,l){u=u.trim();var e=l.loose?re$3[t$3.XRANGELOOSE]:re$3[t$3.XRANGE];return u.replace(e,function(e,r,t,n,o,a){debug_1("xRange",u,e,r,t,n,o,a);var c=isX(t),i=c||isX(n),s=i||isX(o);return"="===r&&s&&(r=""),a=l.includePrerelease?"-0":"",c?e=">"===r||"<"===r?"<0.0.0-0":"*":r&&s?(i&&(n=0),o=0,">"===r?(r=">=",o=i?(t=+t+1,n=0):(n=+n+1,0)):"<="===r&&(r="<",i?t=+t+1:n=+n+1),"<"===r&&(a="-0"),e="".concat(r+t,".").concat(n,".").concat(o).concat(a)):i?e=">=".concat(t,".0.0").concat(a," <").concat(+t+1,".0.0-0"):s&&(e=">=".concat(t,".").concat(n,".0").concat(a," <").concat(t,".").concat(+n+1,".0-0")),debug_1("xRange return",e),e})},replaceStars=function(e,r){return debug_1("replaceStars",e,r),e.trim().replace(re$3[t$3.STAR],"")},replaceGTE0=function(e,r){return debug_1("replaceGTE0",e,r),e.trim().replace(re$3[r.includePrerelease?t$3.GTE0PRE:t$3.GTE0],"")},hyphenReplace=function(E){return function(e,r,t,n,o,a,c,i,s,u,l,p,f){return r=isX(t)?"":isX(n)?">=".concat(t,".0.0").concat(E?"-0":""):isX(o)?">=".concat(t,".").concat(n,".0").concat(E?"-0":""):a?">=".concat(r):">=".concat(r).concat(E?"-0":""),i=isX(s)?"":isX(u)?"<".concat(+s+1,".0.0-0"):isX(l)?"<".concat(s,".").concat(+u+1,".0-0"):p?"<=".concat(s,".").concat(u,".").concat(l,"-").concat(p):E?"<".concat(s,".").concat(u,".").concat(+l+1,"-0"):"<=".concat(i),"".concat(r," ").concat(i).trim()}},testSet=function(e,r,t){for(var n=0;n<e.length;n++)if(!e[n].test(r))return!1;if(!r.prerelease.length||t.includePrerelease)return!0;for(var o=0;o<e.length;o++)if(debug_1(e[o].semver),e[o].semver!==comparator.ANY&&0<e[o].semver.prerelease.length){var a=e[o].semver;if(a.major===r.major&&a.minor===r.minor&&a.patch===r.patch)return!0}return!1},ANY=Symbol("SemVer ANY"),Comparator=function(){function i(e,r){if(_classCallCheck(this,i),r&&"object"===_typeof(r)||(r={loose:!!r,includePrerelease:!1}),e instanceof i){if(e.loose===!!r.loose)return e;e=e.value}debug_1("comparator",e,r),this.options=r,this.loose=!!r.loose,this.parse(e),this.semver===ANY?this.value="":this.value=this.operator+this.semver.version,debug_1("comp",this)}return _createClass(i,null,[{key:"ANY",get:function(){return ANY}}]),_createClass(i,[{key:"parse",value:function(e){var r=this.options.loose?re$4[t$4.COMPARATORLOOSE]:re$4[t$4.COMPARATOR];if(!(r=e.match(r)))throw new TypeError("Invalid comparator: ".concat(e));this.operator=void 0!==r[1]?r[1]:"","="===this.operator&&(this.operator=""),r[2]?this.semver=new semver(r[2],this.options.loose):this.semver=ANY}},{key:"toString",value:function(){return this.value}},{key:"test",value:function(e){if(debug_1("Comparator.test",e,this.options.loose),this.semver===ANY||e===ANY)return!0;if("string"==typeof e)try{e=new semver(e,this.options)}catch(e){return!1}return cmp_1(e,this.operator,this.semver,this.options)}},{key:"intersects",value:function(e,r){if(!(e instanceof i))throw new TypeError("a Comparator is required");if(r&&"object"===_typeof(r)||(r={loose:!!r,includePrerelease:!1}),""===this.operator)return""===this.value||new range(e.value,r).test(this.value);if(""===e.operator)return""===e.value||new range(this.value,r).test(e.semver);var t=!(">="!==this.operator&&">"!==this.operator||">="!==e.operator&&">"!==e.operator),n=!("<="!==this.operator&&"<"!==this.operator||"<="!==e.operator&&"<"!==e.operator),o=this.semver.version===e.semver.version,a=!(">="!==this.operator&&"<="!==this.operator||">="!==e.operator&&"<="!==e.operator),c=cmp_1(this.semver,"<",e.semver,r)&&(">="===this.operator||">"===this.operator)&&("<="===e.operator||"<"===e.operator),e=cmp_1(this.semver,">",e.semver,r)&&("<="===this.operator||"<"===this.operator)&&(">="===e.operator||">"===e.operator);return t||n||o&&a||c||e}}]),i}(),comparator=Comparator,re$4=re_1.re,t$4=re_1.t,satisfies=function(e,r,t){try{r=new range(r,t)}catch(e){return!1}return r.test(e)},satisfies_1=satisfies,toComparators=function(e,r){return new range(e,r).set.map(function(e){return e.map(function(e){return e.value}).join(" ").trim().split(" ")})},toComparators_1=toComparators,maxSatisfying=function(e,r,t){var n=null,o=null,a=null;try{a=new range(r,t)}catch(e){return null}return e.forEach(function(e){a.test(e)&&(n&&-1!==o.compare(e)||(o=new semver(n=e,t)))}),n},maxSatisfying_1=maxSatisfying,minSatisfying=function(e,r,t){var n=null,o=null,a=null;try{a=new range(r,t)}catch(e){return null}return e.forEach(function(e){a.test(e)&&(n&&1!==o.compare(e)||(o=new semver(n=e,t)))}),n},minSatisfying_1=minSatisfying,minVersion=function(e,r){e=new range(e,r);var t=new semver("0.0.0");if(e.test(t))return t;if(t=new semver("0.0.0-0"),e.test(t))return t;t=null;for(var n=0;n<e.set.length;++n)e.set[n].forEach(function(e){var r=new semver(e.semver.version);switch(e.operator){case">":0===r.prerelease.length?r.patch++:r.prerelease.push(0),r.raw=r.format();case"":case">=":t&&!gt_1(t,r)||(t=r);break;case"<":case"<=":break;default:throw new Error("Unexpected operation: ".concat(e.operator))}});return t&&e.test(t)?t:null},minVersion_1=minVersion,validRange=function(e,r){try{return new range(e,r).range||"*"}catch(e){return null}},valid$1=validRange,ANY$1=comparator.ANY,outside=function(n,o,e,a){var c,i,s,u,l;switch(n=new semver(n,a),o=new range(o,a),e){case">":c=gt_1,i=lte_1,s=lt_1,u=">",l=">=";break;case"<":c=lt_1,i=gte_1,s=gt_1,u="<",l="<=";break;default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if(satisfies_1(n,o,a))return!1;for(var r=0;r<o.set.length;++r){var t=function(e){var e=o.set[e],r=null,t=null;return e.forEach(function(e){e.semver===ANY$1&&(e=new comparator(">=0.0.0")),r=r||e,t=t||e,c(e.semver,r.semver,a)?r=e:s(e.semver,t.semver,a)&&(t=e)}),r.operator===u||r.operator===l||(!t.operator||t.operator===u)&&i(n,t.semver)||t.operator===l&&s(n,t.semver)?{v:!1}:void 0}(r);if("object"===_typeof(t))return t.v}return!0},outside_1=outside,gtr=function(e,r,t){return outside_1(e,r,">",t)},gtr_1=gtr,ltr=function(e,r,t){return outside_1(e,r,"<",t)},ltr_1=ltr,intersects=function(e,r,t){return e=new range(e,t),r=new range(r,t),e.intersects(r)},intersects_1=intersects,simplify=function(e,r,t){var n=[],o=null,a=null,c=e.sort(function(e,r){return compare_1(e,r,t)}),i=_createForOfIteratorHelper(c);try{for(i.s();!(s=i.n()).done;)var s=s.value,o=satisfies_1(s,r,t)?(a=s,o||s):(a&&n.push([o,a]),a=null)}catch(e){i.e(e)}finally{i.f()}o&&n.push([o,null]);for(var u=[],l=0,p=n;l<p.length;l++){var f=_slicedToArray(p[l],2),E=f[0];E===(f=f[1])?u.push(E):f||E!==c[0]?f?E===c[0]?u.push("<=".concat(f)):u.push("".concat(E," - ").concat(f)):u.push(">=".concat(E)):u.push("*")}var m=u.join(" || "),e="string"==typeof r.raw?r.raw:String(r);return m.length<e.length?m:r},ANY$2=comparator.ANY,subset=function(e,r,t){e=new range(e,t),r=new range(r,t);var n,o=!1,a=_createForOfIteratorHelper(e.set);try{e:for(a.s();!(n=a.n()).done;){var c=n.value,i=_createForOfIteratorHelper(r.set);try{for(i.s();!(s=i.n()).done;){var s=s.value,s=simpleSubset(c,s,t),o=o||null!==s;if(s)continue e}}catch(e){i.e(e)}finally{i.f()}if(o)return!1}}catch(e){a.e(e)}finally{a.f()}return!0},simpleSubset=function(e,r,t){if(1===e.length&&e[0].semver===ANY$2)return 1===r.length&&r[0].semver===ANY$2;var n,o,a,c=new Set,i=_createForOfIteratorHelper(e);try{for(i.s();!(s=i.n()).done;){var s=s.value;">"===s.operator||">="===s.operator?n=higherGT(n,s,t):"<"===s.operator||"<="===s.operator?o=lowerLT(o,s,t):c.add(s.semver)}}catch(e){i.e(e)}finally{i.f()}if(1<c.size)return null;if(n&&o){if(0<(a=compare_1(n.semver,o.semver,t)))return null;if(0===a&&(">="!==n.operator||"<="!==o.operator))return null}var u,l=_createForOfIteratorHelper(c);try{for(l.s();!(u=l.n()).done;){var p=u.value;if(n&&!satisfies_1(p,String(n),t))return null;if(o&&!satisfies_1(p,String(o),t))return null;var f=_createForOfIteratorHelper(r);try{for(f.s();!(E=f.n()).done;){var E=E.value;if(!satisfies_1(p,String(E),t))return!1}}catch(e){f.e(e)}finally{f.f()}return!0}}catch(e){l.e(e)}finally{l.f()}var m=_createForOfIteratorHelper(r);try{for(m.s();!(h=m.n()).done;){var h=h.value,_=_||">"===h.operator||">="===h.operator,v=v||"<"===h.operator||"<="===h.operator;if(n)if(">"===h.operator||">="===h.operator){if(higherGT(n,h,t)===h)return!1}else if(">="===n.operator&&!satisfies_1(n.semver,String(h),t))return!1;if(o)if("<"===h.operator||"<="===h.operator){if(lowerLT(o,h,t)===h)return!1}else if("<="===o.operator&&!satisfies_1(o.semver,String(h),t))return!1;if(!h.operator&&(o||n)&&0!==a)return!1}}catch(e){m.e(e)}finally{m.f()}return!(n&&v&&!o&&0!==a||o&&_&&!n&&0!==a)},higherGT=function(e,r,t){return e&&(0<(t=compare_1(e.semver,r.semver,t))||!(t<0||">"===r.operator&&">="===e.operator))?e:r},lowerLT=function(e,r,t){return e&&((t=compare_1(e.semver,r.semver,t))<0||!(0<t||"<"===r.operator&&"<="===e.operator))?e:r},subset_1=subset,semver$1={re:re_1.re,src:re_1.src,tokens:re_1.t,SEMVER_SPEC_VERSION:constants.SEMVER_SPEC_VERSION,SemVer:semver,compareIdentifiers:identifiers.compareIdentifiers,rcompareIdentifiers:identifiers.rcompareIdentifiers,parse:parse_1,valid:valid_1,clean:clean_1,inc:inc_1,diff:diff_1,major:major_1,minor:minor_1,patch:patch_1,prerelease:prerelease_1,compare:compare_1,rcompare:rcompare_1,compareLoose:compareLoose_1,compareBuild:compareBuild_1,sort:sort_1,rsort:rsort_1,gt:gt_1,lt:lt_1,eq:eq_1,neq:neq_1,gte:gte_1,lte:lte_1,cmp:cmp_1,coerce:coerce_1,Comparator:comparator,Range:range,satisfies:satisfies_1,toComparators:toComparators,maxSatisfying:maxSatisfying,minSatisfying:minSatisfying,minVersion:minVersion,validRange:validRange,outside:outside_1,gtr:gtr,ltr:ltr,intersects:intersects,simplifyRange:simplify,subset:subset};!function(){function t(e,r){t.installed||(r?null!=semver$1.valid(e.version)?(t.installed=!0,semver$1.lt(e.version,"3.0.0")?Object.defineProperties(e.prototype,{axios:{get:function(){return r}},$http:{get:function(){return r}}}):(e.config.globalProperties.axios=r,e.config.globalProperties.$http=r),e.axios=r,e.$http=r):console.error("Unkown vue version"):console.error("You have to install axios"))}"object"==( false?"undefined":_typeof(exports))?module.exports=t: true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return t}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):window.Vue&&window.axios&&Vue.use(t,window.axios)}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(64);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1fca6742_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(200);
function injectStyle (ssrContext) {
  __webpack_require__(201)
}
var normalizeComponent = __webpack_require__(199)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1fca6742_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var bind = __webpack_require__(61);
var Axios = __webpack_require__(112);
var mergeConfig = __webpack_require__(59);
var defaults = __webpack_require__(60);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(56);
axios.CancelToken = __webpack_require__(111);
axios.isCancel = __webpack_require__(57);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(126);

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(122);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(56);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var buildURL = __webpack_require__(62);
var InterceptorManager = __webpack_require__(113);
var dispatchRequest = __webpack_require__(115);
var mergeConfig = __webpack_require__(59);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(121);
var combineURLs = __webpack_require__(119);

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);
var transformData = __webpack_require__(118);
var isCancel = __webpack_require__(57);
var defaults = __webpack_require__(60);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(58);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(3);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(1);

var _vue2 = _interopRequireDefault(_vue);

var _axios = __webpack_require__(84);

var _axios2 = _interopRequireDefault(_axios);

var _vueAxios = __webpack_require__(86);

var _vueAxios2 = _interopRequireDefault(_vueAxios);

var _elementUi = __webpack_require__(30);

var _elementUi2 = _interopRequireDefault(_elementUi);

__webpack_require__(85);

var _App = __webpack_require__(87);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueAxios2.default, _axios2.default);


_vue2.default.use(_elementUi2.default);

new _vue2.default({
  el: '#app',
  render: function render(h) {
    return h(_App2.default);
  }
});

/***/ }),
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(132)
var ieee754 = __webpack_require__(184)
var isArray = __webpack_require__(185)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(75)(undefined);
// imports


// module
exports.push([module.i, ".el-pagination--small .arrow.disabled,.el-table--hidden,.el-table .hidden-columns,.el-table td.is-hidden>*,.el-table th.is-hidden>*{visibility:hidden}.el-dropdown .el-dropdown-selfdefine:focus:active,.el-dropdown .el-dropdown-selfdefine:focus:not(.focusing),.el-message__closeBtn:focus,.el-message__content:focus,.el-popover:focus,.el-popover:focus:active,.el-popover__reference:focus:hover,.el-popover__reference:focus:not(.focusing),.el-rate:active,.el-rate:focus,.el-tooltip:focus:hover,.el-tooltip:focus:not(.focusing),.el-upload-list__item.is-success:active,.el-upload-list__item.is-success:not(.focusing):focus{outline-width:0}.el-input__suffix,.el-tree.is-dragging .el-tree-node__content *{pointer-events:none}@font-face{font-family:element-icons;src:url(" + __webpack_require__(198) + ") format(\"woff\"),url(" + __webpack_require__(197) + ") format(\"truetype\");font-weight:400;font-display:\"auto\";font-style:normal}[class*=\" el-icon-\"],[class^=el-icon-]{font-family:element-icons!important;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;vertical-align:baseline;display:inline-block;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.el-icon-ice-cream-round:before{content:\"\\E6A0\"}.el-icon-ice-cream-square:before{content:\"\\E6A3\"}.el-icon-lollipop:before{content:\"\\E6A4\"}.el-icon-potato-strips:before{content:\"\\E6A5\"}.el-icon-milk-tea:before{content:\"\\E6A6\"}.el-icon-ice-drink:before{content:\"\\E6A7\"}.el-icon-ice-tea:before{content:\"\\E6A9\"}.el-icon-coffee:before{content:\"\\E6AA\"}.el-icon-orange:before{content:\"\\E6AB\"}.el-icon-pear:before{content:\"\\E6AC\"}.el-icon-apple:before{content:\"\\E6AD\"}.el-icon-cherry:before{content:\"\\E6AE\"}.el-icon-watermelon:before{content:\"\\E6AF\"}.el-icon-grape:before{content:\"\\E6B0\"}.el-icon-refrigerator:before{content:\"\\E6B1\"}.el-icon-goblet-square-full:before{content:\"\\E6B2\"}.el-icon-goblet-square:before{content:\"\\E6B3\"}.el-icon-goblet-full:before{content:\"\\E6B4\"}.el-icon-goblet:before{content:\"\\E6B5\"}.el-icon-cold-drink:before{content:\"\\E6B6\"}.el-icon-coffee-cup:before{content:\"\\E6B8\"}.el-icon-water-cup:before{content:\"\\E6B9\"}.el-icon-hot-water:before{content:\"\\E6BA\"}.el-icon-ice-cream:before{content:\"\\E6BB\"}.el-icon-dessert:before{content:\"\\E6BC\"}.el-icon-sugar:before{content:\"\\E6BD\"}.el-icon-tableware:before{content:\"\\E6BE\"}.el-icon-burger:before{content:\"\\E6BF\"}.el-icon-knife-fork:before{content:\"\\E6C1\"}.el-icon-fork-spoon:before{content:\"\\E6C2\"}.el-icon-chicken:before{content:\"\\E6C3\"}.el-icon-food:before{content:\"\\E6C4\"}.el-icon-dish-1:before{content:\"\\E6C5\"}.el-icon-dish:before{content:\"\\E6C6\"}.el-icon-moon-night:before{content:\"\\E6EE\"}.el-icon-moon:before{content:\"\\E6F0\"}.el-icon-cloudy-and-sunny:before{content:\"\\E6F1\"}.el-icon-partly-cloudy:before{content:\"\\E6F2\"}.el-icon-cloudy:before{content:\"\\E6F3\"}.el-icon-sunny:before{content:\"\\E6F6\"}.el-icon-sunset:before{content:\"\\E6F7\"}.el-icon-sunrise-1:before{content:\"\\E6F8\"}.el-icon-sunrise:before{content:\"\\E6F9\"}.el-icon-heavy-rain:before{content:\"\\E6FA\"}.el-icon-lightning:before{content:\"\\E6FB\"}.el-icon-light-rain:before{content:\"\\E6FC\"}.el-icon-wind-power:before{content:\"\\E6FD\"}.el-icon-baseball:before{content:\"\\E712\"}.el-icon-soccer:before{content:\"\\E713\"}.el-icon-football:before{content:\"\\E715\"}.el-icon-basketball:before{content:\"\\E716\"}.el-icon-ship:before{content:\"\\E73F\"}.el-icon-truck:before{content:\"\\E740\"}.el-icon-bicycle:before{content:\"\\E741\"}.el-icon-mobile-phone:before{content:\"\\E6D3\"}.el-icon-service:before{content:\"\\E6D4\"}.el-icon-key:before{content:\"\\E6E2\"}.el-icon-unlock:before{content:\"\\E6E4\"}.el-icon-lock:before{content:\"\\E6E5\"}.el-icon-watch:before{content:\"\\E6FE\"}.el-icon-watch-1:before{content:\"\\E6FF\"}.el-icon-timer:before{content:\"\\E702\"}.el-icon-alarm-clock:before{content:\"\\E703\"}.el-icon-map-location:before{content:\"\\E704\"}.el-icon-delete-location:before{content:\"\\E705\"}.el-icon-add-location:before{content:\"\\E706\"}.el-icon-location-information:before{content:\"\\E707\"}.el-icon-location-outline:before{content:\"\\E708\"}.el-icon-location:before{content:\"\\E79E\"}.el-icon-place:before{content:\"\\E709\"}.el-icon-discover:before{content:\"\\E70A\"}.el-icon-first-aid-kit:before{content:\"\\E70B\"}.el-icon-trophy-1:before{content:\"\\E70C\"}.el-icon-trophy:before{content:\"\\E70D\"}.el-icon-medal:before{content:\"\\E70E\"}.el-icon-medal-1:before{content:\"\\E70F\"}.el-icon-stopwatch:before{content:\"\\E710\"}.el-icon-mic:before{content:\"\\E711\"}.el-icon-copy-document:before{content:\"\\E718\"}.el-icon-full-screen:before{content:\"\\E719\"}.el-icon-switch-button:before{content:\"\\E71B\"}.el-icon-aim:before{content:\"\\E71C\"}.el-icon-crop:before{content:\"\\E71D\"}.el-icon-odometer:before{content:\"\\E71E\"}.el-icon-time:before{content:\"\\E71F\"}.el-icon-bangzhu:before{content:\"\\E724\"}.el-icon-close-notification:before{content:\"\\E726\"}.el-icon-microphone:before{content:\"\\E727\"}.el-icon-turn-off-microphone:before{content:\"\\E728\"}.el-icon-position:before{content:\"\\E729\"}.el-icon-postcard:before{content:\"\\E72A\"}.el-icon-message:before{content:\"\\E72B\"}.el-icon-chat-line-square:before{content:\"\\E72D\"}.el-icon-chat-dot-square:before{content:\"\\E72E\"}.el-icon-chat-dot-round:before{content:\"\\E72F\"}.el-icon-chat-square:before{content:\"\\E730\"}.el-icon-chat-line-round:before{content:\"\\E731\"}.el-icon-chat-round:before{content:\"\\E732\"}.el-icon-set-up:before{content:\"\\E733\"}.el-icon-turn-off:before{content:\"\\E734\"}.el-icon-open:before{content:\"\\E735\"}.el-icon-connection:before{content:\"\\E736\"}.el-icon-link:before{content:\"\\E737\"}.el-icon-cpu:before{content:\"\\E738\"}.el-icon-thumb:before{content:\"\\E739\"}.el-icon-female:before{content:\"\\E73A\"}.el-icon-male:before{content:\"\\E73B\"}.el-icon-guide:before{content:\"\\E73C\"}.el-icon-news:before{content:\"\\E73E\"}.el-icon-price-tag:before{content:\"\\E744\"}.el-icon-discount:before{content:\"\\E745\"}.el-icon-wallet:before{content:\"\\E747\"}.el-icon-coin:before{content:\"\\E748\"}.el-icon-money:before{content:\"\\E749\"}.el-icon-bank-card:before{content:\"\\E74A\"}.el-icon-box:before{content:\"\\E74B\"}.el-icon-present:before{content:\"\\E74C\"}.el-icon-sell:before{content:\"\\E6D5\"}.el-icon-sold-out:before{content:\"\\E6D6\"}.el-icon-shopping-bag-2:before{content:\"\\E74D\"}.el-icon-shopping-bag-1:before{content:\"\\E74E\"}.el-icon-shopping-cart-2:before{content:\"\\E74F\"}.el-icon-shopping-cart-1:before{content:\"\\E750\"}.el-icon-shopping-cart-full:before{content:\"\\E751\"}.el-icon-smoking:before{content:\"\\E752\"}.el-icon-no-smoking:before{content:\"\\E753\"}.el-icon-house:before{content:\"\\E754\"}.el-icon-table-lamp:before{content:\"\\E755\"}.el-icon-school:before{content:\"\\E756\"}.el-icon-office-building:before{content:\"\\E757\"}.el-icon-toilet-paper:before{content:\"\\E758\"}.el-icon-notebook-2:before{content:\"\\E759\"}.el-icon-notebook-1:before{content:\"\\E75A\"}.el-icon-files:before{content:\"\\E75B\"}.el-icon-collection:before{content:\"\\E75C\"}.el-icon-receiving:before{content:\"\\E75D\"}.el-icon-suitcase-1:before{content:\"\\E760\"}.el-icon-suitcase:before{content:\"\\E761\"}.el-icon-film:before{content:\"\\E763\"}.el-icon-collection-tag:before{content:\"\\E765\"}.el-icon-data-analysis:before{content:\"\\E766\"}.el-icon-pie-chart:before{content:\"\\E767\"}.el-icon-data-board:before{content:\"\\E768\"}.el-icon-data-line:before{content:\"\\E76D\"}.el-icon-reading:before{content:\"\\E769\"}.el-icon-magic-stick:before{content:\"\\E76A\"}.el-icon-coordinate:before{content:\"\\E76B\"}.el-icon-mouse:before{content:\"\\E76C\"}.el-icon-brush:before{content:\"\\E76E\"}.el-icon-headset:before{content:\"\\E76F\"}.el-icon-umbrella:before{content:\"\\E770\"}.el-icon-scissors:before{content:\"\\E771\"}.el-icon-mobile:before{content:\"\\E773\"}.el-icon-attract:before{content:\"\\E774\"}.el-icon-monitor:before{content:\"\\E775\"}.el-icon-search:before{content:\"\\E778\"}.el-icon-takeaway-box:before{content:\"\\E77A\"}.el-icon-paperclip:before{content:\"\\E77D\"}.el-icon-printer:before{content:\"\\E77E\"}.el-icon-document-add:before{content:\"\\E782\"}.el-icon-document:before{content:\"\\E785\"}.el-icon-document-checked:before{content:\"\\E786\"}.el-icon-document-copy:before{content:\"\\E787\"}.el-icon-document-delete:before{content:\"\\E788\"}.el-icon-document-remove:before{content:\"\\E789\"}.el-icon-tickets:before{content:\"\\E78B\"}.el-icon-folder-checked:before{content:\"\\E77F\"}.el-icon-folder-delete:before{content:\"\\E780\"}.el-icon-folder-remove:before{content:\"\\E781\"}.el-icon-folder-add:before{content:\"\\E783\"}.el-icon-folder-opened:before{content:\"\\E784\"}.el-icon-folder:before{content:\"\\E78A\"}.el-icon-edit-outline:before{content:\"\\E764\"}.el-icon-edit:before{content:\"\\E78C\"}.el-icon-date:before{content:\"\\E78E\"}.el-icon-c-scale-to-original:before{content:\"\\E7C6\"}.el-icon-view:before{content:\"\\E6CE\"}.el-icon-loading:before{content:\"\\E6CF\"}.el-icon-rank:before{content:\"\\E6D1\"}.el-icon-sort-down:before{content:\"\\E7C4\"}.el-icon-sort-up:before{content:\"\\E7C5\"}.el-icon-sort:before{content:\"\\E6D2\"}.el-icon-finished:before{content:\"\\E6CD\"}.el-icon-refresh-left:before{content:\"\\E6C7\"}.el-icon-refresh-right:before{content:\"\\E6C8\"}.el-icon-refresh:before{content:\"\\E6D0\"}.el-icon-video-play:before{content:\"\\E7C0\"}.el-icon-video-pause:before{content:\"\\E7C1\"}.el-icon-d-arrow-right:before{content:\"\\E6DC\"}.el-icon-d-arrow-left:before{content:\"\\E6DD\"}.el-icon-arrow-up:before{content:\"\\E6E1\"}.el-icon-arrow-down:before{content:\"\\E6DF\"}.el-icon-arrow-right:before{content:\"\\E6E0\"}.el-icon-arrow-left:before{content:\"\\E6DE\"}.el-icon-top-right:before{content:\"\\E6E7\"}.el-icon-top-left:before{content:\"\\E6E8\"}.el-icon-top:before{content:\"\\E6E6\"}.el-icon-bottom:before{content:\"\\E6EB\"}.el-icon-right:before{content:\"\\E6E9\"}.el-icon-back:before{content:\"\\E6EA\"}.el-icon-bottom-right:before{content:\"\\E6EC\"}.el-icon-bottom-left:before{content:\"\\E6ED\"}.el-icon-caret-top:before{content:\"\\E78F\"}.el-icon-caret-bottom:before{content:\"\\E790\"}.el-icon-caret-right:before{content:\"\\E791\"}.el-icon-caret-left:before{content:\"\\E792\"}.el-icon-d-caret:before{content:\"\\E79A\"}.el-icon-share:before{content:\"\\E793\"}.el-icon-menu:before{content:\"\\E798\"}.el-icon-s-grid:before{content:\"\\E7A6\"}.el-icon-s-check:before{content:\"\\E7A7\"}.el-icon-s-data:before{content:\"\\E7A8\"}.el-icon-s-opportunity:before{content:\"\\E7AA\"}.el-icon-s-custom:before{content:\"\\E7AB\"}.el-icon-s-claim:before{content:\"\\E7AD\"}.el-icon-s-finance:before{content:\"\\E7AE\"}.el-icon-s-comment:before{content:\"\\E7AF\"}.el-icon-s-flag:before{content:\"\\E7B0\"}.el-icon-s-marketing:before{content:\"\\E7B1\"}.el-icon-s-shop:before{content:\"\\E7B4\"}.el-icon-s-open:before{content:\"\\E7B5\"}.el-icon-s-management:before{content:\"\\E7B6\"}.el-icon-s-ticket:before{content:\"\\E7B7\"}.el-icon-s-release:before{content:\"\\E7B8\"}.el-icon-s-home:before{content:\"\\E7B9\"}.el-icon-s-promotion:before{content:\"\\E7BA\"}.el-icon-s-operation:before{content:\"\\E7BB\"}.el-icon-s-unfold:before{content:\"\\E7BC\"}.el-icon-s-fold:before{content:\"\\E7A9\"}.el-icon-s-platform:before{content:\"\\E7BD\"}.el-icon-s-order:before{content:\"\\E7BE\"}.el-icon-s-cooperation:before{content:\"\\E7BF\"}.el-icon-bell:before{content:\"\\E725\"}.el-icon-message-solid:before{content:\"\\E799\"}.el-icon-video-camera:before{content:\"\\E772\"}.el-icon-video-camera-solid:before{content:\"\\E796\"}.el-icon-camera:before{content:\"\\E779\"}.el-icon-camera-solid:before{content:\"\\E79B\"}.el-icon-download:before{content:\"\\E77C\"}.el-icon-upload2:before{content:\"\\E77B\"}.el-icon-upload:before{content:\"\\E7C3\"}.el-icon-picture-outline-round:before{content:\"\\E75F\"}.el-icon-picture-outline:before{content:\"\\E75E\"}.el-icon-picture:before{content:\"\\E79F\"}.el-icon-close:before{content:\"\\E6DB\"}.el-icon-check:before{content:\"\\E6DA\"}.el-icon-plus:before{content:\"\\E6D9\"}.el-icon-minus:before{content:\"\\E6D8\"}.el-icon-help:before{content:\"\\E73D\"}.el-icon-s-help:before{content:\"\\E7B3\"}.el-icon-circle-close:before{content:\"\\E78D\"}.el-icon-circle-check:before{content:\"\\E720\"}.el-icon-circle-plus-outline:before{content:\"\\E723\"}.el-icon-remove-outline:before{content:\"\\E722\"}.el-icon-zoom-out:before{content:\"\\E776\"}.el-icon-zoom-in:before{content:\"\\E777\"}.el-icon-error:before{content:\"\\E79D\"}.el-icon-success:before{content:\"\\E79C\"}.el-icon-circle-plus:before{content:\"\\E7A0\"}.el-icon-remove:before{content:\"\\E7A2\"}.el-icon-info:before{content:\"\\E7A1\"}.el-icon-question:before{content:\"\\E7A4\"}.el-icon-warning-outline:before{content:\"\\E6C9\"}.el-icon-warning:before{content:\"\\E7A3\"}.el-icon-goods:before{content:\"\\E7C2\"}.el-icon-s-goods:before{content:\"\\E7B2\"}.el-icon-star-off:before{content:\"\\E717\"}.el-icon-star-on:before{content:\"\\E797\"}.el-icon-more-outline:before{content:\"\\E6CC\"}.el-icon-more:before{content:\"\\E794\"}.el-icon-phone-outline:before{content:\"\\E6CB\"}.el-icon-phone:before{content:\"\\E795\"}.el-icon-user:before{content:\"\\E6E3\"}.el-icon-user-solid:before{content:\"\\E7A5\"}.el-icon-setting:before{content:\"\\E6CA\"}.el-icon-s-tools:before{content:\"\\E7AC\"}.el-icon-delete:before{content:\"\\E6D7\"}.el-icon-delete-solid:before{content:\"\\E7C9\"}.el-icon-eleme:before{content:\"\\E7C7\"}.el-icon-platform-eleme:before{content:\"\\E7CA\"}.el-icon-loading{animation:rotating 2s linear infinite}.el-icon--right{margin-left:5px}.el-icon--left{margin-right:5px}@keyframes rotating{0%{transform:rotate(0)}to{transform:rotate(1turn)}}.el-pagination{white-space:nowrap;padding:2px 5px;color:#303133;font-weight:700}.el-pagination:after,.el-pagination:before{display:table;content:\"\"}.el-pagination:after{clear:both}.el-pagination button,.el-pagination span:not([class*=suffix]){display:inline-block;font-size:13px;min-width:35.5px;height:28px;line-height:28px;vertical-align:top;box-sizing:border-box}.el-pagination .el-input__inner{text-align:center;-moz-appearance:textfield;line-height:normal}.el-pagination .el-input__suffix{right:0;transform:scale(.8)}.el-pagination .el-select .el-input{width:100px;margin:0 5px}.el-pagination .el-select .el-input .el-input__inner{padding-right:25px;border-radius:3px}.el-pagination button{border:none;padding:0 6px;background:0 0}.el-pagination button:focus{outline:0}.el-pagination button:hover{color:#409eff}.el-pagination button:disabled{color:#c0c4cc;background-color:#fff;cursor:not-allowed}.el-pagination .btn-next,.el-pagination .btn-prev{background:50% no-repeat #fff;background-size:16px;cursor:pointer;margin:0;color:#303133}.el-pagination .btn-next .el-icon,.el-pagination .btn-prev .el-icon{display:block;font-size:12px;font-weight:700}.el-pagination .btn-prev{padding-right:12px}.el-pagination .btn-next{padding-left:12px}.el-pagination .el-pager li.disabled{color:#c0c4cc;cursor:not-allowed}.el-pager li,.el-pager li.btn-quicknext:hover,.el-pager li.btn-quickprev:hover{cursor:pointer}.el-pagination--small .btn-next,.el-pagination--small .btn-prev,.el-pagination--small .el-pager li,.el-pagination--small .el-pager li.btn-quicknext,.el-pagination--small .el-pager li.btn-quickprev,.el-pagination--small .el-pager li:last-child{border-color:transparent;font-size:12px;line-height:22px;height:22px;min-width:22px}.el-pagination--small .more:before,.el-pagination--small li.more:before{line-height:24px}.el-pagination--small button,.el-pagination--small span:not([class*=suffix]){height:22px;line-height:22px}.el-pagination--small .el-pagination__editor,.el-pagination--small .el-pagination__editor.el-input .el-input__inner{height:22px}.el-pagination__sizes{margin:0 10px 0 0;font-weight:400;color:#606266}.el-pagination__sizes .el-input .el-input__inner{font-size:13px;padding-left:8px}.el-pagination__sizes .el-input .el-input__inner:hover{border-color:#409eff}.el-pagination__total{margin-right:10px;font-weight:400;color:#606266}.el-pagination__jump{margin-left:24px;font-weight:400;color:#606266}.el-pagination__jump .el-input__inner{padding:0 3px}.el-pagination__rightwrapper{float:right}.el-pagination__editor{line-height:18px;padding:0 2px;height:28px;text-align:center;margin:0 2px;box-sizing:border-box;border-radius:3px}.el-pager,.el-pagination.is-background .btn-next,.el-pagination.is-background .btn-prev{padding:0}.el-pagination__editor.el-input{width:50px}.el-pagination__editor.el-input .el-input__inner{height:28px}.el-pagination__editor .el-input__inner::-webkit-inner-spin-button,.el-pagination__editor .el-input__inner::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.el-pagination.is-background .btn-next,.el-pagination.is-background .btn-prev,.el-pagination.is-background .el-pager li{margin:0 5px;background-color:#f4f4f5;color:#606266;min-width:30px;border-radius:2px}.el-pagination.is-background .btn-next.disabled,.el-pagination.is-background .btn-next:disabled,.el-pagination.is-background .btn-prev.disabled,.el-pagination.is-background .btn-prev:disabled,.el-pagination.is-background .el-pager li.disabled{color:#c0c4cc}.el-pagination.is-background .el-pager li:not(.disabled):hover{color:#409eff}.el-pagination.is-background .el-pager li:not(.disabled).active{background-color:#409eff;color:#fff}.el-dialog,.el-pager li{background:#fff;-webkit-box-sizing:border-box}.el-pagination.is-background.el-pagination--small .btn-next,.el-pagination.is-background.el-pagination--small .btn-prev,.el-pagination.is-background.el-pagination--small .el-pager li{margin:0 3px;min-width:22px}.el-pager,.el-pager li{vertical-align:top;margin:0;display:inline-block}.el-pager{-moz-user-select:none;user-select:none;list-style:none;font-size:0}.el-date-table,.el-pager,.el-table th{-webkit-user-select:none;-ms-user-select:none}.el-pager .more:before{line-height:30px}.el-pager li{padding:0 4px;font-size:13px;min-width:35.5px;height:28px;line-height:28px;box-sizing:border-box;text-align:center}.el-menu--collapse .el-menu .el-submenu,.el-menu--popup{min-width:200px}.el-pager li.btn-quicknext,.el-pager li.btn-quickprev{line-height:28px;color:#303133}.el-pager li.btn-quicknext.disabled,.el-pager li.btn-quickprev.disabled{color:#c0c4cc}.el-pager li.active+li{border-left:0}.el-pager li:hover{color:#409eff}.el-pager li.active{color:#409eff;cursor:default}.el-dialog{position:relative;margin:0 auto 50px;border-radius:2px;box-shadow:0 1px 3px rgba(0,0,0,.3);box-sizing:border-box;width:50%}.el-dialog.is-fullscreen{width:100%;margin-top:0;margin-bottom:0;height:100%;overflow:auto}.el-dialog__wrapper{position:fixed;top:0;right:0;bottom:0;left:0;overflow:auto;margin:0}.el-dialog__header{padding:20px 20px 10px}.el-dialog__headerbtn{position:absolute;top:20px;right:20px;padding:0;background:0 0;border:none;outline:0;cursor:pointer;font-size:16px}.el-dialog__headerbtn .el-dialog__close{color:#909399}.el-dialog__headerbtn:focus .el-dialog__close,.el-dialog__headerbtn:hover .el-dialog__close{color:#409eff}.el-dialog__title{line-height:24px;font-size:18px;color:#303133}.el-dialog__body{padding:30px 20px;color:#606266;font-size:14px;word-break:break-all}.el-dialog__footer{padding:10px 20px 20px;text-align:right;box-sizing:border-box}.el-dialog--center{text-align:center}.el-dialog--center .el-dialog__body{text-align:initial;padding:25px 25px 30px}.el-dialog--center .el-dialog__footer{text-align:inherit}.dialog-fade-enter-active{animation:dialog-fade-in .3s}.dialog-fade-leave-active{animation:dialog-fade-out .3s}@keyframes dialog-fade-in{0%{transform:translate3d(0,-20px,0);opacity:0}to{transform:translateZ(0);opacity:1}}@keyframes dialog-fade-out{0%{transform:translateZ(0);opacity:1}to{transform:translate3d(0,-20px,0);opacity:0}}.el-autocomplete{position:relative;display:inline-block}.el-autocomplete-suggestion{margin:5px 0;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);border-radius:4px;border:1px solid #e4e7ed;box-sizing:border-box;background-color:#fff}.el-dropdown-menu,.el-menu--collapse .el-submenu .el-menu{z-index:10;-webkit-box-shadow:0 2px 12px 0 rgba(0,0,0,.1)}.el-autocomplete-suggestion__wrap{max-height:280px;padding:10px 0;box-sizing:border-box}.el-autocomplete-suggestion__list{margin:0;padding:0}.el-autocomplete-suggestion li{padding:0 20px;margin:0;line-height:34px;cursor:pointer;color:#606266;font-size:14px;list-style:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.el-autocomplete-suggestion li.highlighted,.el-autocomplete-suggestion li:hover{background-color:#f5f7fa}.el-autocomplete-suggestion li.divider{margin-top:6px;border-top:1px solid #000}.el-autocomplete-suggestion li.divider:last-child{margin-bottom:-6px}.el-autocomplete-suggestion.is-loading li{text-align:center;height:100px;line-height:100px;font-size:20px;color:#999}.el-autocomplete-suggestion.is-loading li:after{display:inline-block;content:\"\";height:100%;vertical-align:middle}.el-autocomplete-suggestion.is-loading li:hover{background-color:#fff}.el-autocomplete-suggestion.is-loading .el-icon-loading{vertical-align:middle}.el-dropdown{display:inline-block;position:relative;color:#606266;font-size:14px}.el-dropdown .el-button-group{display:block}.el-dropdown .el-button-group .el-button{float:none}.el-dropdown .el-dropdown__caret-button{padding-left:5px;padding-right:5px;position:relative;border-left:none}.el-dropdown .el-dropdown__caret-button:before{content:\"\";position:absolute;display:block;width:1px;top:5px;bottom:5px;left:0;background:hsla(0,0%,100%,.5)}.el-dropdown .el-dropdown__caret-button.el-button--default:before{background:rgba(220,223,230,.5)}.el-dropdown .el-dropdown__caret-button:hover:before{top:0;bottom:0}.el-dropdown .el-dropdown__caret-button .el-dropdown__icon{padding-left:0}.el-dropdown__icon{font-size:12px;margin:0 3px}.el-dropdown-menu{position:absolute;top:0;left:0;padding:10px 0;margin:5px 0;background-color:#fff;border:1px solid #ebeef5;border-radius:4px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1)}.el-dropdown-menu__item{list-style:none;line-height:36px;padding:0 20px;margin:0;font-size:14px;color:#606266;cursor:pointer;outline:0}.el-dropdown-menu__item:focus,.el-dropdown-menu__item:not(.is-disabled):hover{background-color:#ecf5ff;color:#66b1ff}.el-dropdown-menu__item i{margin-right:5px}.el-dropdown-menu__item--divided{position:relative;margin-top:6px;border-top:1px solid #ebeef5}.el-dropdown-menu__item--divided:before{content:\"\";height:6px;display:block;margin:0 -20px;background-color:#fff}.el-dropdown-menu__item.is-disabled{cursor:default;color:#bbb;pointer-events:none}.el-dropdown-menu--medium{padding:6px 0}.el-dropdown-menu--medium .el-dropdown-menu__item{line-height:30px;padding:0 17px;font-size:14px}.el-dropdown-menu--medium .el-dropdown-menu__item.el-dropdown-menu__item--divided{margin-top:6px}.el-dropdown-menu--medium .el-dropdown-menu__item.el-dropdown-menu__item--divided:before{height:6px;margin:0 -17px}.el-dropdown-menu--small{padding:6px 0}.el-dropdown-menu--small .el-dropdown-menu__item{line-height:27px;padding:0 15px;font-size:13px}.el-dropdown-menu--small .el-dropdown-menu__item.el-dropdown-menu__item--divided{margin-top:4px}.el-dropdown-menu--small .el-dropdown-menu__item.el-dropdown-menu__item--divided:before{height:4px;margin:0 -15px}.el-dropdown-menu--mini{padding:3px 0}.el-dropdown-menu--mini .el-dropdown-menu__item{line-height:24px;padding:0 10px;font-size:12px}.el-dropdown-menu--mini .el-dropdown-menu__item.el-dropdown-menu__item--divided{margin-top:3px}.el-dropdown-menu--mini .el-dropdown-menu__item.el-dropdown-menu__item--divided:before{height:3px;margin:0 -10px}.el-menu{border-right:1px solid #e6e6e6;list-style:none;position:relative;margin:0;padding-left:0}.el-menu,.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus,.el-menu--horizontal>.el-menu-item:not(.is-disabled):hover,.el-menu--horizontal>.el-submenu .el-submenu__title:hover{background-color:#fff}.el-menu:after,.el-menu:before{display:table;content:\"\"}.el-menu:after{clear:both}.el-menu.el-menu--horizontal{border-bottom:1px solid #e6e6e6}.el-menu--horizontal{border-right:none}.el-menu--horizontal>.el-menu-item{float:left;height:60px;line-height:60px;margin:0;border-bottom:2px solid transparent;color:#909399}.el-menu--horizontal>.el-menu-item a,.el-menu--horizontal>.el-menu-item a:hover{color:inherit}.el-menu--horizontal>.el-submenu{float:left}.el-menu--horizontal>.el-submenu:focus,.el-menu--horizontal>.el-submenu:hover{outline:0}.el-menu--horizontal>.el-submenu:focus .el-submenu__title,.el-menu--horizontal>.el-submenu:hover .el-submenu__title{color:#303133}.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{border-bottom:2px solid #409eff;color:#303133}.el-menu--horizontal>.el-submenu .el-submenu__title{height:60px;line-height:60px;border-bottom:2px solid transparent;color:#909399}.el-menu--horizontal>.el-submenu .el-submenu__icon-arrow{position:static;vertical-align:middle;margin-left:8px;margin-top:-3px}.el-menu--horizontal .el-menu .el-menu-item,.el-menu--horizontal .el-menu .el-submenu__title{background-color:#fff;float:none;height:36px;line-height:36px;padding:0 10px;color:#909399}.el-menu--horizontal .el-menu .el-menu-item.is-active,.el-menu--horizontal .el-menu .el-submenu.is-active>.el-submenu__title{color:#303133}.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,.el-menu--horizontal .el-menu-item:not(.is-disabled):hover{outline:0;color:#303133}.el-menu--horizontal>.el-menu-item.is-active{border-bottom:2px solid #409eff;color:#303133}.el-menu--collapse{width:64px}.el-menu--collapse>.el-menu-item [class^=el-icon-],.el-menu--collapse>.el-submenu>.el-submenu__title [class^=el-icon-]{margin:0;vertical-align:middle;width:24px;text-align:center}.el-menu--collapse>.el-menu-item .el-submenu__icon-arrow,.el-menu--collapse>.el-submenu>.el-submenu__title .el-submenu__icon-arrow{display:none}.el-menu--collapse>.el-menu-item span,.el-menu--collapse>.el-submenu>.el-submenu__title span{height:0;width:0;overflow:hidden;visibility:hidden;display:inline-block}.el-menu--collapse>.el-menu-item.is-active i{color:inherit}.el-menu--collapse .el-submenu{position:relative}.el-menu--collapse .el-submenu .el-menu{position:absolute;margin-left:5px;top:0;left:100%;border:1px solid #e4e7ed;border-radius:2px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1)}.el-menu-item,.el-submenu__title{height:56px;line-height:56px;position:relative;-webkit-box-sizing:border-box;white-space:nowrap;list-style:none}.el-menu--collapse .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{transform:none}.el-menu--popup{z-index:100;border:none;padding:5px 0;border-radius:2px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1)}.el-menu--popup-bottom-start{margin-top:5px}.el-menu--popup-right-start{margin-left:5px;margin-right:5px}.el-menu-item{font-size:14px;color:#303133;padding:0 20px;cursor:pointer;transition:border-color .3s,background-color .3s,color .3s;box-sizing:border-box}.el-menu-item *{vertical-align:middle}.el-menu-item i{color:#909399}.el-menu-item:focus,.el-menu-item:hover{outline:0;background-color:#ecf5ff}.el-menu-item.is-disabled{opacity:.25;cursor:not-allowed;background:0 0!important}.el-menu-item [class^=el-icon-]{margin-right:5px;width:24px;text-align:center;font-size:18px;vertical-align:middle}.el-menu-item.is-active{color:#409eff}.el-menu-item.is-active i{color:inherit}.el-submenu{list-style:none;margin:0;padding-left:0}.el-submenu__title{font-size:14px;color:#303133;padding:0 20px;cursor:pointer;transition:border-color .3s,background-color .3s,color .3s;box-sizing:border-box}.el-submenu__title *{vertical-align:middle}.el-submenu__title i{color:#909399}.el-submenu__title:focus,.el-submenu__title:hover{outline:0;background-color:#ecf5ff}.el-submenu__title.is-disabled{opacity:.25;cursor:not-allowed;background:0 0!important}.el-submenu__title:hover{background-color:#ecf5ff}.el-submenu .el-menu{border:none}.el-submenu .el-menu-item{height:50px;line-height:50px;padding:0 45px;min-width:200px}.el-submenu__icon-arrow{position:absolute;top:50%;right:20px;margin-top:-7px;transition:transform .3s;font-size:12px}.el-submenu.is-active .el-submenu__title{border-bottom-color:#409eff}.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{transform:rotate(180deg)}.el-submenu.is-disabled .el-menu-item,.el-submenu.is-disabled .el-submenu__title{opacity:.25;cursor:not-allowed;background:0 0!important}.el-submenu [class^=el-icon-]{vertical-align:middle;margin-right:5px;width:24px;text-align:center;font-size:18px}.el-menu-item-group>ul{padding:0}.el-menu-item-group__title{padding:7px 0 7px 20px;line-height:normal;font-size:12px;color:#909399}.el-radio-button__inner,.el-radio-group{display:inline-block;line-height:1;vertical-align:middle}.horizontal-collapse-transition .el-submenu__title .el-submenu__icon-arrow{transition:.2s;opacity:0}.el-radio-group{font-size:0}.el-radio-button{position:relative;display:inline-block;outline:0}.el-radio-button__inner{white-space:nowrap;background:#fff;border:1px solid #dcdfe6;font-weight:500;border-left:0;color:#606266;-webkit-appearance:none;text-align:center;box-sizing:border-box;outline:0;margin:0;position:relative;cursor:pointer;transition:all .3s cubic-bezier(.645,.045,.355,1);padding:12px 20px;font-size:14px;border-radius:0}.el-radio-button__inner.is-round{padding:12px 20px}.el-radio-button__inner:hover{color:#409eff}.el-radio-button__inner [class*=el-icon-]{line-height:.9}.el-radio-button__inner [class*=el-icon-]+span{margin-left:5px}.el-radio-button:first-child .el-radio-button__inner{border-left:1px solid #dcdfe6;border-radius:4px 0 0 4px;box-shadow:none!important}.el-radio-button__orig-radio{opacity:0;outline:0;position:absolute;z-index:-1}.el-radio-button__orig-radio:checked+.el-radio-button__inner{color:#fff;background-color:#409eff;border-color:#409eff;box-shadow:-1px 0 0 0 #409eff}.el-radio-button__orig-radio:disabled+.el-radio-button__inner{color:#c0c4cc;cursor:not-allowed;background-image:none;background-color:#fff;border-color:#ebeef5;box-shadow:none}.el-radio-button__orig-radio:disabled:checked+.el-radio-button__inner{background-color:#f2f6fc}.el-radio-button:last-child .el-radio-button__inner{border-radius:0 4px 4px 0}.el-popover,.el-radio-button:first-child:last-child .el-radio-button__inner{border-radius:4px}.el-radio-button--medium .el-radio-button__inner{padding:10px 20px;font-size:14px;border-radius:0}.el-radio-button--medium .el-radio-button__inner.is-round{padding:10px 20px}.el-radio-button--small .el-radio-button__inner{padding:9px 15px;font-size:12px;border-radius:0}.el-radio-button--small .el-radio-button__inner.is-round{padding:9px 15px}.el-radio-button--mini .el-radio-button__inner{padding:7px 15px;font-size:12px;border-radius:0}.el-radio-button--mini .el-radio-button__inner.is-round{padding:7px 15px}.el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled){box-shadow:0 0 2px 2px #409eff}.el-switch{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;position:relative;font-size:14px;line-height:20px;height:20px;vertical-align:middle}.el-switch__core,.el-switch__label{display:inline-block;cursor:pointer}.el-switch.is-disabled .el-switch__core,.el-switch.is-disabled .el-switch__label{cursor:not-allowed}.el-switch__label{transition:.2s;height:20px;font-size:14px;font-weight:500;vertical-align:middle;color:#303133}.el-switch__label.is-active{color:#409eff}.el-switch__label--left{margin-right:10px}.el-switch__label--right{margin-left:10px}.el-switch__label *{line-height:1;font-size:14px;display:inline-block}.el-switch__input{position:absolute;width:0;height:0;opacity:0;margin:0}.el-switch__core{margin:0;position:relative;width:40px;height:20px;border:1px solid #dcdfe6;outline:0;border-radius:10px;box-sizing:border-box;background:#dcdfe6;transition:border-color .3s,background-color .3s;vertical-align:middle}.el-switch__core:after{content:\"\";position:absolute;top:1px;left:1px;border-radius:100%;transition:all .3s;width:16px;height:16px;background-color:#fff}.el-switch.is-checked .el-switch__core{border-color:#409eff;background-color:#409eff}.el-switch.is-checked .el-switch__core:after{left:100%;margin-left:-17px}.el-switch.is-disabled{opacity:.6}.el-switch--wide .el-switch__label.el-switch__label--left span{left:10px}.el-switch--wide .el-switch__label.el-switch__label--right span{right:10px}.el-switch .label-fade-enter,.el-switch .label-fade-leave-active{opacity:0}.el-select-dropdown{position:absolute;z-index:1001;border:1px solid #e4e7ed;border-radius:4px;background-color:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);box-sizing:border-box;margin:5px 0}.el-select-dropdown.is-multiple .el-select-dropdown__item.selected{color:#409eff;background-color:#fff}.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover{background-color:#f5f7fa}.el-select-dropdown.is-multiple .el-select-dropdown__item.selected:after{position:absolute;right:20px;font-family:element-icons;content:\"\\E6DA\";font-size:12px;font-weight:700;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.el-select-dropdown .el-scrollbar.is-empty .el-select-dropdown__list{padding:0}.el-select-dropdown__empty{padding:10px 0;margin:0;text-align:center;color:#999;font-size:14px}.el-select-dropdown__wrap{max-height:274px}.el-select-dropdown__list{list-style:none;padding:6px 0;margin:0;box-sizing:border-box}.el-select-dropdown__item{font-size:14px;padding:0 20px;position:relative;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#606266;height:34px;line-height:34px;box-sizing:border-box;cursor:pointer}.el-select .el-tag,.el-table{-webkit-box-sizing:border-box}.el-select-dropdown__item.is-disabled{color:#c0c4cc;cursor:not-allowed}.el-select-dropdown__item.is-disabled:hover{background-color:#fff}.el-select-dropdown__item.hover,.el-select-dropdown__item:hover{background-color:#f5f7fa}.el-select-dropdown__item.selected{color:#409eff;font-weight:700}.el-select-group{margin:0;padding:0}.el-select-group__wrap{position:relative;list-style:none;margin:0;padding:0}.el-select-group__wrap:not(:last-of-type){padding-bottom:24px}.el-select-group__wrap:not(:last-of-type):after{content:\"\";position:absolute;display:block;left:20px;right:20px;bottom:12px;height:1px;background:#e4e7ed}.el-select-group__title{padding-left:20px;font-size:12px;color:#909399;line-height:30px}.el-select-group .el-select-dropdown__item{padding-left:20px}.el-select{display:inline-block;position:relative}.el-select .el-select__tags>span{display:contents}.el-select:hover .el-input__inner{border-color:#c0c4cc}.el-select .el-input__inner{cursor:pointer;padding-right:35px}.el-select .el-input__inner:focus{border-color:#409eff}.el-select .el-input .el-select__caret{color:#c0c4cc;font-size:14px;transition:transform .3s;transform:rotate(180deg);cursor:pointer}.el-select .el-input .el-select__caret.is-reverse{transform:rotate(0)}.el-select .el-input .el-select__caret.is-show-close{font-size:14px;text-align:center;transform:rotate(180deg);border-radius:100%;color:#c0c4cc;transition:color .2s cubic-bezier(.645,.045,.355,1)}.el-select .el-input .el-select__caret.is-show-close:hover{color:#909399}.el-select .el-input.is-disabled .el-input__inner{cursor:not-allowed}.el-select .el-input.is-disabled .el-input__inner:hover{border-color:#e4e7ed}.el-select .el-input.is-focus .el-input__inner{border-color:#409eff}.el-select>.el-input{display:block}.el-select__input{border:none;outline:0;padding:0;margin-left:15px;color:#666;font-size:14px;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:28px;background-color:transparent}.el-select__input.is-mini{height:14px}.el-select__close{cursor:pointer;position:absolute;top:8px;z-index:1000;right:25px;color:#c0c4cc;line-height:18px;font-size:14px}.el-select__close:hover{color:#909399}.el-select__tags{position:absolute;line-height:normal;white-space:normal;z-index:1;top:50%;transform:translateY(-50%);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-wrap:wrap;flex-wrap:wrap}.el-select .el-tag__close{margin-top:-2px}.el-select .el-tag{box-sizing:border-box;border-color:transparent;margin:2px 0 2px 6px;background-color:#f0f2f5}.el-select .el-tag__close.el-icon-close{background-color:#c0c4cc;right:-7px;top:0;color:#fff}.el-select .el-tag__close.el-icon-close:hover{background-color:#909399}.el-table,.el-table__expanded-cell{background-color:#fff}.el-select .el-tag__close.el-icon-close:before{display:block;transform:translateY(.5px)}.el-table{position:relative;overflow:hidden;box-sizing:border-box;-ms-flex:1;flex:1;width:100%;max-width:100%;font-size:14px;color:#606266}.el-table--mini,.el-table--small,.el-table__expand-icon{font-size:12px}.el-table__empty-block{min-height:60px;text-align:center;width:100%;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.el-table__empty-text{line-height:60px;width:50%;color:#909399}.el-table__expand-column .cell{padding:0;text-align:center}.el-table__expand-icon{position:relative;cursor:pointer;color:#666;transition:transform .2s ease-in-out;height:20px}.el-table__expand-icon--expanded{transform:rotate(90deg)}.el-table__expand-icon>.el-icon{position:absolute;left:50%;top:50%;margin-left:-5px;margin-top:-5px}.el-table__expanded-cell[class*=cell]{padding:20px 50px}.el-table__expanded-cell:hover{background-color:transparent!important}.el-table__placeholder{display:inline-block;width:20px}.el-table__append-wrapper{overflow:hidden}.el-table--fit{border-right:0;border-bottom:0}.el-table--fit td.gutter,.el-table--fit th.gutter{border-right-width:1px}.el-table--scrollable-x .el-table__body-wrapper{overflow-x:auto}.el-table--scrollable-y .el-table__body-wrapper{overflow-y:auto}.el-table thead{color:#909399;font-weight:500}.el-table thead.is-group th{background:#f5f7fa}.el-table th,.el-table tr{background-color:#fff}.el-table td,.el-table th{padding:12px 0;min-width:0;box-sizing:border-box;text-overflow:ellipsis;vertical-align:middle;position:relative;text-align:left}.el-table td.is-center,.el-table th.is-center{text-align:center}.el-table td.is-right,.el-table th.is-right{text-align:right}.el-table td.gutter,.el-table th.gutter{width:15px;border-right-width:0;border-bottom-width:0;padding:0}.el-table--medium td,.el-table--medium th{padding:10px 0}.el-table--small td,.el-table--small th{padding:8px 0}.el-table--mini td,.el-table--mini th{padding:6px 0}.el-table .cell,.el-table th div{padding-right:10px;overflow:hidden;text-overflow:ellipsis}.el-table--border td:first-child .cell,.el-table--border th:first-child .cell,.el-table .cell,.el-table th div{padding-left:10px}.el-table tr input[type=checkbox]{margin:0}.el-table td,.el-table th.is-leaf{border-bottom:1px solid #ebeef5}.el-table th.is-sortable{cursor:pointer}.el-table th{white-space:nowrap;overflow:hidden;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}.el-table th div{line-height:40px;white-space:nowrap}.el-table th>.cell,.el-table th div{display:inline-block;box-sizing:border-box}.el-table th>.cell{position:relative;word-wrap:normal;text-overflow:ellipsis;vertical-align:middle;width:100%}.el-table th>.cell.highlight{color:#409eff}.el-table th.required>div:before{display:inline-block;content:\"\";width:8px;height:8px;border-radius:50%;background:#ff4d51;margin-right:5px;vertical-align:middle}.el-table td div{box-sizing:border-box}.el-table td.gutter{width:0}.el-table .cell{box-sizing:border-box;white-space:normal;word-break:break-all;line-height:23px}.el-table .cell.el-tooltip{white-space:nowrap;min-width:50px}.el-table--border,.el-table--group{border:1px solid #ebeef5}.el-table--border:after,.el-table--group:after,.el-table:before{content:\"\";position:absolute;background-color:#ebeef5;z-index:1}.el-table--border:after,.el-table--group:after{top:0;right:0;width:1px;height:100%}.el-table:before{left:0;bottom:0;width:100%;height:1px}.el-table--border{border-right:none;border-bottom:none}.el-table--border.el-loading-parent--relative{border-color:transparent}.el-table--border td,.el-table--border th,.el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{border-right:1px solid #ebeef5}.el-table--border th.gutter:last-of-type{border-bottom:1px solid #ebeef5;border-bottom-width:1px}.el-table--border th,.el-table__fixed-right-patch{border-bottom:1px solid #ebeef5}.el-table__fixed,.el-table__fixed-right{position:absolute;top:0;left:0;overflow-x:hidden;overflow-y:hidden;box-shadow:0 0 10px rgba(0,0,0,.12)}.el-table__fixed-right:before,.el-table__fixed:before{content:\"\";position:absolute;left:0;bottom:0;width:100%;height:1px;background-color:#ebeef5;z-index:4}.el-table__fixed-right-patch{position:absolute;top:-1px;right:0;background-color:#fff}.el-table__fixed-right{top:0;left:auto;right:0}.el-table__fixed-right .el-table__fixed-body-wrapper,.el-table__fixed-right .el-table__fixed-footer-wrapper,.el-table__fixed-right .el-table__fixed-header-wrapper{left:auto;right:0}.el-table__fixed-header-wrapper{position:absolute;left:0;top:0;z-index:3}.el-table__fixed-footer-wrapper{position:absolute;left:0;bottom:0;z-index:3}.el-table__fixed-footer-wrapper tbody td{border-top:1px solid #ebeef5;background-color:#f5f7fa;color:#606266}.el-table__fixed-body-wrapper{position:absolute;left:0;top:37px;overflow:hidden;z-index:3}.el-table__body-wrapper,.el-table__footer-wrapper,.el-table__header-wrapper{width:100%}.el-table__footer-wrapper{margin-top:-1px}.el-table__footer-wrapper td{border-top:1px solid #ebeef5}.el-table__body,.el-table__footer,.el-table__header{table-layout:fixed;border-collapse:separate}.el-table__footer-wrapper,.el-table__header-wrapper{overflow:hidden}.el-table__footer-wrapper tbody td,.el-table__header-wrapper tbody td{background-color:#f5f7fa;color:#606266}.el-table__body-wrapper{overflow:hidden;position:relative}.el-table__body-wrapper.is-scrolling-left~.el-table__fixed,.el-table__body-wrapper.is-scrolling-none~.el-table__fixed,.el-table__body-wrapper.is-scrolling-none~.el-table__fixed-right,.el-table__body-wrapper.is-scrolling-right~.el-table__fixed-right{box-shadow:none}.el-picker-panel,.el-table-filter{-webkit-box-shadow:0 2px 12px 0 rgba(0,0,0,.1)}.el-table__body-wrapper .el-table--border.is-scrolling-right~.el-table__fixed-right{border-left:1px solid #ebeef5}.el-table .caret-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;height:34px;width:24px;vertical-align:middle;cursor:pointer;overflow:initial;position:relative}.el-table .sort-caret{width:0;height:0;border:5px solid transparent;position:absolute;left:7px}.el-table .sort-caret.ascending{border-bottom-color:#c0c4cc;top:5px}.el-table .sort-caret.descending{border-top-color:#c0c4cc;bottom:7px}.el-table .ascending .sort-caret.ascending{border-bottom-color:#409eff}.el-table .descending .sort-caret.descending{border-top-color:#409eff}.el-table .hidden-columns{position:absolute;z-index:-1}.el-table--striped .el-table__body tr.el-table__row--striped td{background:#fafafa}.el-table--striped .el-table__body tr.el-table__row--striped.current-row td{background-color:#ecf5ff}.el-table__body tr.hover-row.current-row>td,.el-table__body tr.hover-row.el-table__row--striped.current-row>td,.el-table__body tr.hover-row.el-table__row--striped>td,.el-table__body tr.hover-row>td{background-color:#f5f7fa}.el-table__body tr.current-row>td{background-color:#ecf5ff}.el-table__column-resize-proxy{position:absolute;left:200px;top:0;bottom:0;width:0;border-left:1px solid #ebeef5;z-index:10}.el-table__column-filter-trigger{display:inline-block;line-height:34px;cursor:pointer}.el-table__column-filter-trigger i{color:#909399;font-size:12px;transform:scale(.75)}.el-table--enable-row-transition .el-table__body td{transition:background-color .25s ease}.el-table--enable-row-hover .el-table__body tr:hover>td{background-color:#f5f7fa}.el-table--fluid-height .el-table__fixed,.el-table--fluid-height .el-table__fixed-right{bottom:0;overflow:hidden}.el-table [class*=el-table__row--level] .el-table__expand-icon{display:inline-block;width:20px;line-height:20px;height:20px;text-align:center;margin-right:3px}.el-table-column--selection .cell{padding-left:14px;padding-right:14px}.el-table-filter{border:1px solid #ebeef5;border-radius:2px;background-color:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);box-sizing:border-box;margin:2px 0}.el-date-table td,.el-date-table td div{height:30px;-webkit-box-sizing:border-box}.el-table-filter__list{padding:5px 0;margin:0;list-style:none;min-width:100px}.el-table-filter__list-item{line-height:36px;padding:0 10px;cursor:pointer;font-size:14px}.el-table-filter__list-item:hover{background-color:#ecf5ff;color:#66b1ff}.el-table-filter__list-item.is-active{background-color:#409eff;color:#fff}.el-table-filter__content{min-width:100px}.el-table-filter__bottom{border-top:1px solid #ebeef5;padding:8px}.el-table-filter__bottom button{background:0 0;border:none;color:#606266;cursor:pointer;font-size:13px;padding:0 3px}.el-date-table.is-week-mode .el-date-table__row.current div,.el-date-table.is-week-mode .el-date-table__row:hover div,.el-date-table td.in-range div,.el-date-table td.in-range div:hover{background-color:#f2f6fc}.el-table-filter__bottom button:hover{color:#409eff}.el-table-filter__bottom button:focus{outline:0}.el-table-filter__bottom button.is-disabled{color:#c0c4cc;cursor:not-allowed}.el-table-filter__wrap{max-height:280px}.el-table-filter__checkbox-group{padding:10px}.el-table-filter__checkbox-group label.el-checkbox{display:block;margin-right:5px;margin-bottom:8px;margin-left:5px}.el-table-filter__checkbox-group .el-checkbox:last-child{margin-bottom:0}.el-date-table{font-size:12px;-moz-user-select:none;user-select:none}.el-date-table,.el-slider__button-wrapper,.el-time-panel{-webkit-user-select:none;-ms-user-select:none}.el-date-table.is-week-mode .el-date-table__row:hover td.available:hover{color:#606266}.el-date-table.is-week-mode .el-date-table__row:hover td:first-child div{margin-left:5px;border-top-left-radius:15px;border-bottom-left-radius:15px}.el-date-table.is-week-mode .el-date-table__row:hover td:last-child div{margin-right:5px;border-top-right-radius:15px;border-bottom-right-radius:15px}.el-date-table td{width:32px;padding:4px 0;box-sizing:border-box;text-align:center;cursor:pointer;position:relative}.el-date-table td div{padding:3px 0;box-sizing:border-box}.el-date-table td span{width:24px;height:24px;display:block;margin:0 auto;line-height:24px;position:absolute;left:50%;transform:translateX(-50%);border-radius:50%}.el-date-table td.next-month,.el-date-table td.prev-month{color:#c0c4cc}.el-date-table td.today{position:relative}.el-date-table td.today span{color:#409eff;font-weight:700}.el-date-table td.today.end-date span,.el-date-table td.today.start-date span{color:#fff}.el-date-table td.available:hover{color:#409eff}.el-date-table td.current:not(.disabled) span{color:#fff;background-color:#409eff}.el-date-table td.end-date div,.el-date-table td.start-date div{color:#fff}.el-date-table td.end-date span,.el-date-table td.start-date span{background-color:#409eff}.el-date-table td.start-date div{margin-left:5px;border-top-left-radius:15px;border-bottom-left-radius:15px}.el-date-table td.end-date div{margin-right:5px;border-top-right-radius:15px;border-bottom-right-radius:15px}.el-date-table td.disabled div{background-color:#f5f7fa;opacity:1;cursor:not-allowed;color:#c0c4cc}.el-date-table td.selected div{margin-left:5px;margin-right:5px;background-color:#f2f6fc;border-radius:15px}.el-date-table td.selected div:hover{background-color:#f2f6fc}.el-date-table td.selected span{background-color:#409eff;color:#fff;border-radius:15px}.el-date-table td.week{font-size:80%;color:#606266}.el-month-table,.el-year-table{font-size:12px;border-collapse:collapse}.el-date-table th{padding:5px;color:#606266;font-weight:400;border-bottom:1px solid #ebeef5}.el-month-table{margin:-1px}.el-month-table td{text-align:center;padding:8px 0;cursor:pointer}.el-month-table td div{height:48px;padding:6px 0;box-sizing:border-box}.el-month-table td.today .cell{color:#409eff;font-weight:700}.el-month-table td.today.end-date .cell,.el-month-table td.today.start-date .cell{color:#fff}.el-month-table td.disabled .cell{background-color:#f5f7fa;cursor:not-allowed;color:#c0c4cc}.el-month-table td.disabled .cell:hover{color:#c0c4cc}.el-month-table td .cell{width:60px;height:36px;display:block;line-height:36px;color:#606266;margin:0 auto;border-radius:18px}.el-month-table td .cell:hover{color:#409eff}.el-month-table td.in-range div,.el-month-table td.in-range div:hover{background-color:#f2f6fc}.el-month-table td.end-date div,.el-month-table td.start-date div{color:#fff}.el-month-table td.end-date .cell,.el-month-table td.start-date .cell{color:#fff;background-color:#409eff}.el-month-table td.start-date div{border-top-left-radius:24px;border-bottom-left-radius:24px}.el-month-table td.end-date div{border-top-right-radius:24px;border-bottom-right-radius:24px}.el-month-table td.current:not(.disabled) .cell{color:#409eff}.el-year-table{margin:-1px}.el-year-table .el-icon{color:#303133}.el-year-table td{text-align:center;padding:20px 3px;cursor:pointer}.el-year-table td.today .cell{color:#409eff;font-weight:700}.el-year-table td.disabled .cell{background-color:#f5f7fa;cursor:not-allowed;color:#c0c4cc}.el-year-table td.disabled .cell:hover{color:#c0c4cc}.el-year-table td .cell{width:48px;height:32px;display:block;line-height:32px;color:#606266;margin:0 auto}.el-year-table td .cell:hover,.el-year-table td.current:not(.disabled) .cell{color:#409eff}.el-date-range-picker{width:646px}.el-date-range-picker.has-sidebar{width:756px}.el-date-range-picker table{table-layout:fixed;width:100%}.el-date-range-picker .el-picker-panel__body{min-width:513px}.el-date-range-picker .el-picker-panel__content{margin:0}.el-date-range-picker__header{position:relative;text-align:center;height:28px}.el-date-range-picker__header [class*=arrow-left]{float:left}.el-date-range-picker__header [class*=arrow-right]{float:right}.el-date-range-picker__header div{font-size:16px;font-weight:500;margin-right:50px}.el-date-range-picker__content{float:left;width:50%;box-sizing:border-box;margin:0;padding:16px}.el-date-range-picker__content.is-left{border-right:1px solid #e4e4e4}.el-date-range-picker__content .el-date-range-picker__header div{margin-left:50px;margin-right:50px}.el-date-range-picker__editors-wrap{box-sizing:border-box;display:table-cell}.el-date-range-picker__editors-wrap.is-right{text-align:right}.el-date-range-picker__time-header{position:relative;border-bottom:1px solid #e4e4e4;font-size:12px;padding:8px 5px 5px;display:table;width:100%;box-sizing:border-box}.el-date-range-picker__time-header>.el-icon-arrow-right{font-size:20px;vertical-align:middle;display:table-cell;color:#303133}.el-date-range-picker__time-picker-wrap{position:relative;display:table-cell;padding:0 5px}.el-date-range-picker__time-picker-wrap .el-picker-panel{position:absolute;top:13px;right:0;z-index:1;background:#fff}.el-date-picker{width:322px}.el-date-picker.has-sidebar.has-time{width:434px}.el-date-picker.has-sidebar{width:438px}.el-date-picker.has-time .el-picker-panel__body-wrapper{position:relative}.el-date-picker .el-picker-panel__content{width:292px}.el-date-picker table{table-layout:fixed;width:100%}.el-date-picker__editor-wrap{position:relative;display:table-cell;padding:0 5px}.el-date-picker__time-header{position:relative;border-bottom:1px solid #e4e4e4;font-size:12px;padding:8px 5px 5px;display:table;width:100%;box-sizing:border-box}.el-date-picker__header{margin:12px;text-align:center}.el-date-picker__header--bordered{margin-bottom:0;padding-bottom:12px;border-bottom:1px solid #ebeef5}.el-date-picker__header--bordered+.el-picker-panel__content{margin-top:0}.el-date-picker__header-label{font-size:16px;font-weight:500;padding:0 5px;line-height:22px;text-align:center;cursor:pointer;color:#606266}.el-date-picker__header-label.active,.el-date-picker__header-label:hover{color:#409eff}.el-date-picker__prev-btn{float:left}.el-date-picker__next-btn{float:right}.el-date-picker__time-wrap{padding:10px;text-align:center}.el-date-picker__time-label{float:left;cursor:pointer;line-height:30px;margin-left:10px}.time-select{margin:5px 0;min-width:0}.time-select .el-picker-panel__content{max-height:200px;margin:0}.time-select-item{padding:8px 10px;font-size:14px;line-height:20px}.time-select-item.selected:not(.disabled){color:#409eff;font-weight:700}.time-select-item.disabled{color:#e4e7ed;cursor:not-allowed}.time-select-item:hover{background-color:#f5f7fa;font-weight:700;cursor:pointer}.el-date-editor{position:relative;display:inline-block;text-align:left}.el-date-editor.el-input,.el-date-editor.el-input__inner{width:220px}.el-date-editor--monthrange.el-input,.el-date-editor--monthrange.el-input__inner{width:300px}.el-date-editor--daterange.el-input,.el-date-editor--daterange.el-input__inner,.el-date-editor--timerange.el-input,.el-date-editor--timerange.el-input__inner{width:350px}.el-date-editor--datetimerange.el-input,.el-date-editor--datetimerange.el-input__inner{width:400px}.el-date-editor--dates .el-input__inner{text-overflow:ellipsis;white-space:nowrap}.el-date-editor .el-icon-circle-close{cursor:pointer}.el-date-editor .el-range__icon{font-size:14px;margin-left:-5px;color:#c0c4cc;float:left;line-height:32px}.el-date-editor .el-range-input,.el-date-editor .el-range-separator{height:100%;margin:0;text-align:center;display:inline-block;font-size:14px}.el-date-editor .el-range-input{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;outline:0;padding:0;width:39%;color:#606266}.el-date-editor .el-range-input::-webkit-input-placeholder{color:#c0c4cc}.el-date-editor .el-range-input:-ms-input-placeholder,.el-date-editor .el-range-input::-ms-input-placeholder{color:#c0c4cc}.el-date-editor .el-range-input::placeholder{color:#c0c4cc}.el-date-editor .el-range-separator{padding:0 5px;line-height:32px;width:5%;color:#303133}.el-date-editor .el-range__close-icon{font-size:14px;color:#c0c4cc;width:25px;display:inline-block;float:right;line-height:32px}.el-range-editor.el-input__inner{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;padding:3px 10px}.el-range-editor .el-range-input{line-height:1}.el-range-editor.is-active,.el-range-editor.is-active:hover{border-color:#409eff}.el-range-editor--medium.el-input__inner{height:36px}.el-range-editor--medium .el-range-separator{line-height:28px;font-size:14px}.el-range-editor--medium .el-range-input{font-size:14px}.el-range-editor--medium .el-range__close-icon,.el-range-editor--medium .el-range__icon{line-height:28px}.el-range-editor--small.el-input__inner{height:32px}.el-range-editor--small .el-range-separator{line-height:24px;font-size:13px}.el-range-editor--small .el-range-input{font-size:13px}.el-range-editor--small .el-range__close-icon,.el-range-editor--small .el-range__icon{line-height:24px}.el-range-editor--mini.el-input__inner{height:28px}.el-range-editor--mini .el-range-separator{line-height:20px;font-size:12px}.el-range-editor--mini .el-range-input{font-size:12px}.el-range-editor--mini .el-range__close-icon,.el-range-editor--mini .el-range__icon{line-height:20px}.el-range-editor.is-disabled{background-color:#f5f7fa;border-color:#e4e7ed;color:#c0c4cc;cursor:not-allowed}.el-range-editor.is-disabled:focus,.el-range-editor.is-disabled:hover{border-color:#e4e7ed}.el-range-editor.is-disabled input{background-color:#f5f7fa;color:#c0c4cc;cursor:not-allowed}.el-range-editor.is-disabled input::-webkit-input-placeholder{color:#c0c4cc}.el-range-editor.is-disabled input:-ms-input-placeholder,.el-range-editor.is-disabled input::-ms-input-placeholder{color:#c0c4cc}.el-range-editor.is-disabled input::placeholder{color:#c0c4cc}.el-range-editor.is-disabled .el-range-separator{color:#c0c4cc}.el-picker-panel{color:#606266;border:1px solid #e4e7ed;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);background:#fff;border-radius:4px;line-height:30px;margin:5px 0}.el-popover,.el-time-panel{-webkit-box-shadow:0 2px 12px 0 rgba(0,0,0,.1)}.el-picker-panel__body-wrapper:after,.el-picker-panel__body:after{content:\"\";display:table;clear:both}.el-picker-panel__content{position:relative;margin:15px}.el-picker-panel__footer{border-top:1px solid #e4e4e4;padding:4px;text-align:right;background-color:#fff;position:relative;font-size:0}.el-picker-panel__shortcut{display:block;width:100%;border:0;background-color:transparent;line-height:28px;font-size:14px;color:#606266;padding-left:12px;text-align:left;outline:0;cursor:pointer}.el-picker-panel__shortcut:hover{color:#409eff}.el-picker-panel__shortcut.active{background-color:#e6f1fe;color:#409eff}.el-picker-panel__btn{border:1px solid #dcdcdc;color:#333;line-height:24px;border-radius:2px;padding:0 20px;cursor:pointer;background-color:transparent;outline:0;font-size:12px}.el-picker-panel__btn[disabled]{color:#ccc;cursor:not-allowed}.el-picker-panel__icon-btn{font-size:12px;color:#303133;border:0;background:0 0;cursor:pointer;outline:0;margin-top:8px}.el-picker-panel__icon-btn:hover{color:#409eff}.el-picker-panel__icon-btn.is-disabled{color:#bbb}.el-picker-panel__icon-btn.is-disabled:hover{cursor:not-allowed}.el-picker-panel__link-btn{vertical-align:middle}.el-picker-panel [slot=sidebar],.el-picker-panel__sidebar{position:absolute;top:0;bottom:0;width:110px;border-right:1px solid #e4e4e4;box-sizing:border-box;padding-top:6px;background-color:#fff;overflow:auto}.el-picker-panel [slot=sidebar]+.el-picker-panel__body,.el-picker-panel__sidebar+.el-picker-panel__body{margin-left:110px}.el-time-spinner.has-seconds .el-time-spinner__wrapper{width:33.3%}.el-time-spinner__wrapper{max-height:190px;overflow:auto;display:inline-block;width:50%;vertical-align:top;position:relative}.el-time-spinner__wrapper .el-scrollbar__wrap:not(.el-scrollbar__wrap--hidden-default){padding-bottom:15px}.el-time-spinner__input.el-input .el-input__inner,.el-time-spinner__list{padding:0;text-align:center}.el-time-spinner__wrapper.is-arrow{box-sizing:border-box;text-align:center;overflow:hidden}.el-time-spinner__wrapper.is-arrow .el-time-spinner__list{transform:translateY(-32px)}.el-time-spinner__wrapper.is-arrow .el-time-spinner__item:hover:not(.disabled):not(.active){background:#fff;cursor:default}.el-time-spinner__arrow{font-size:12px;color:#909399;position:absolute;left:0;width:100%;z-index:1;text-align:center;height:30px;line-height:30px;cursor:pointer}.el-time-spinner__arrow:hover{color:#409eff}.el-time-spinner__arrow.el-icon-arrow-up{top:10px}.el-time-spinner__arrow.el-icon-arrow-down{bottom:10px}.el-time-spinner__input.el-input{width:70%}.el-time-spinner__list{margin:0;list-style:none}.el-time-spinner__list:after,.el-time-spinner__list:before{content:\"\";display:block;width:100%;height:80px}.el-time-spinner__item{height:32px;line-height:32px;font-size:12px;color:#606266}.el-time-spinner__item:hover:not(.disabled):not(.active){background:#f5f7fa;cursor:pointer}.el-time-spinner__item.active:not(.disabled){color:#303133;font-weight:700}.el-time-spinner__item.disabled{color:#c0c4cc;cursor:not-allowed}.el-time-panel{margin:5px 0;border:1px solid #e4e7ed;background-color:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);border-radius:2px;position:absolute;width:180px;left:0;z-index:1000;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;box-sizing:content-box}.el-time-panel__content{font-size:0;position:relative;overflow:hidden}.el-time-panel__content:after,.el-time-panel__content:before{content:\"\";top:50%;position:absolute;margin-top:-15px;height:32px;z-index:-1;left:0;right:0;box-sizing:border-box;padding-top:6px;text-align:left;border-top:1px solid #e4e7ed;border-bottom:1px solid #e4e7ed}.el-time-panel__content:after{left:50%;margin-left:12%;margin-right:12%}.el-time-panel__content:before{padding-left:50%;margin-right:12%;margin-left:12%}.el-time-panel__content.has-seconds:after{left:66.66667%}.el-time-panel__content.has-seconds:before{padding-left:33.33333%}.el-time-panel__footer{border-top:1px solid #e4e4e4;padding:4px;height:36px;line-height:25px;text-align:right;box-sizing:border-box}.el-time-panel__btn{border:none;line-height:28px;padding:0 5px;margin:0 5px;cursor:pointer;background-color:transparent;outline:0;font-size:12px;color:#303133}.el-time-panel__btn.confirm{font-weight:800;color:#409eff}.el-time-range-picker{width:354px;overflow:visible}.el-time-range-picker__content{position:relative;text-align:center;padding:10px}.el-time-range-picker__cell{box-sizing:border-box;margin:0;padding:4px 7px 7px;width:50%;display:inline-block}.el-time-range-picker__header{margin-bottom:5px;text-align:center;font-size:14px}.el-time-range-picker__body{border-radius:2px;border:1px solid #e4e7ed}.el-popover{position:absolute;background:#fff;min-width:150px;border:1px solid #ebeef5;padding:12px;z-index:2000;color:#606266;line-height:1.4;text-align:justify;font-size:14px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);word-break:break-all}.el-popover--plain{padding:18px 20px}.el-popover__title{color:#303133;font-size:16px;line-height:1;margin-bottom:12px}.v-modal-enter{animation:v-modal-in .2s ease}.v-modal-leave{animation:v-modal-out .2s ease forwards}@keyframes v-modal-in{0%{opacity:0}}@keyframes v-modal-out{to{opacity:0}}.v-modal{position:fixed;left:0;top:0;width:100%;height:100%;opacity:.5;background:#000}.el-popup-parent--hidden{overflow:hidden}.el-message-box{display:inline-block;width:420px;padding-bottom:10px;vertical-align:middle;background-color:#fff;border-radius:4px;border:1px solid #ebeef5;font-size:18px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);text-align:left;overflow:hidden;-webkit-backface-visibility:hidden;backface-visibility:hidden}.el-message-box__wrapper{position:fixed;top:0;bottom:0;left:0;right:0;text-align:center}.el-message-box__wrapper:after{content:\"\";display:inline-block;height:100%;width:0;vertical-align:middle}.el-message-box__header{position:relative;padding:15px 15px 10px}.el-message-box__title{padding-left:0;margin-bottom:0;font-size:18px;line-height:1;color:#303133}.el-message-box__headerbtn{position:absolute;top:15px;right:15px;padding:0;border:none;outline:0;background:0 0;font-size:16px;cursor:pointer}.el-form-item.is-error .el-input__inner,.el-form-item.is-error .el-input__inner:focus,.el-form-item.is-error .el-textarea__inner,.el-form-item.is-error .el-textarea__inner:focus,.el-message-box__input input.invalid,.el-message-box__input input.invalid:focus{border-color:#f56c6c}.el-message-box__headerbtn .el-message-box__close{color:#909399}.el-message-box__headerbtn:focus .el-message-box__close,.el-message-box__headerbtn:hover .el-message-box__close{color:#409eff}.el-message-box__content{position:relative;padding:10px 15px;color:#606266;font-size:14px}.el-message-box__input{padding-top:15px}.el-message-box__status{position:absolute;top:50%;transform:translateY(-50%);font-size:24px!important}.el-message-box__status:before{padding-left:1px}.el-message-box__status+.el-message-box__message{padding-left:36px;padding-right:12px}.el-message-box__status.el-icon-success{color:#67c23a}.el-message-box__status.el-icon-info{color:#909399}.el-message-box__status.el-icon-warning{color:#e6a23c}.el-message-box__status.el-icon-error{color:#f56c6c}.el-message-box__message{margin:0}.el-message-box__message p{margin:0;line-height:24px}.el-message-box__errormsg{color:#f56c6c;font-size:12px;min-height:18px;margin-top:2px}.el-message-box__btns{padding:5px 15px 0;text-align:right}.el-message-box__btns button:nth-child(2){margin-left:10px}.el-message-box__btns-reverse{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.el-message-box--center{padding-bottom:30px}.el-message-box--center .el-message-box__header{padding-top:30px}.el-message-box--center .el-message-box__title{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.el-message-box--center .el-message-box__status{position:relative;top:auto;padding-right:5px;text-align:center;transform:translateY(-1px)}.el-message-box--center .el-message-box__message{margin-left:0}.el-message-box--center .el-message-box__btns,.el-message-box--center .el-message-box__content{text-align:center}.el-message-box--center .el-message-box__content{padding-left:27px;padding-right:27px}.msgbox-fade-enter-active{animation:msgbox-fade-in .3s}.msgbox-fade-leave-active{animation:msgbox-fade-out .3s}@keyframes msgbox-fade-in{0%{transform:translate3d(0,-20px,0);opacity:0}to{transform:translateZ(0);opacity:1}}@keyframes msgbox-fade-out{0%{transform:translateZ(0);opacity:1}to{transform:translate3d(0,-20px,0);opacity:0}}.el-breadcrumb{font-size:14px;line-height:1}.el-breadcrumb:after,.el-breadcrumb:before{display:table;content:\"\"}.el-breadcrumb:after{clear:both}.el-breadcrumb__separator{margin:0 9px;font-weight:700;color:#c0c4cc}.el-breadcrumb__separator[class*=icon]{margin:0 6px;font-weight:400}.el-breadcrumb__item{float:left}.el-breadcrumb__inner{color:#606266}.el-breadcrumb__inner.is-link,.el-breadcrumb__inner a{font-weight:700;text-decoration:none;transition:color .2s cubic-bezier(.645,.045,.355,1);color:#303133}.el-breadcrumb__inner.is-link:hover,.el-breadcrumb__inner a:hover{color:#409eff;cursor:pointer}.el-breadcrumb__item:last-child .el-breadcrumb__inner,.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover,.el-breadcrumb__item:last-child .el-breadcrumb__inner a,.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover{font-weight:400;color:#606266;cursor:text}.el-breadcrumb__item:last-child .el-breadcrumb__separator{display:none}.el-form--label-left .el-form-item__label{text-align:left}.el-form--label-top .el-form-item__label{float:none;display:inline-block;text-align:left;padding:0 0 10px}.el-form--inline .el-form-item{display:inline-block;margin-right:10px;vertical-align:top}.el-form--inline .el-form-item__label{float:none;display:inline-block}.el-form--inline .el-form-item__content{display:inline-block;vertical-align:top}.el-form--inline.el-form--label-top .el-form-item__content{display:block}.el-form-item{margin-bottom:22px}.el-form-item:after,.el-form-item:before{display:table;content:\"\"}.el-form-item:after{clear:both}.el-form-item .el-form-item{margin-bottom:0}.el-form-item--mini.el-form-item,.el-form-item--small.el-form-item{margin-bottom:18px}.el-form-item .el-input__validateIcon{display:none}.el-form-item--medium .el-form-item__content,.el-form-item--medium .el-form-item__label{line-height:36px}.el-form-item--small .el-form-item__content,.el-form-item--small .el-form-item__label{line-height:32px}.el-form-item--small .el-form-item__error{padding-top:2px}.el-form-item--mini .el-form-item__content,.el-form-item--mini .el-form-item__label{line-height:28px}.el-form-item--mini .el-form-item__error{padding-top:1px}.el-form-item__label-wrap{float:left}.el-form-item__label-wrap .el-form-item__label{display:inline-block;float:none}.el-form-item__label{text-align:right;vertical-align:middle;float:left;font-size:14px;color:#606266;line-height:40px;padding:0 12px 0 0;box-sizing:border-box}.el-form-item__content{line-height:40px;position:relative;font-size:14px}.el-form-item__content:after,.el-form-item__content:before{display:table;content:\"\"}.el-form-item__content:after{clear:both}.el-form-item__content .el-input-group{vertical-align:top}.el-form-item__error{color:#f56c6c;font-size:12px;line-height:1;padding-top:4px;position:absolute;top:100%;left:0}.el-form-item__error--inline{position:relative;top:auto;left:auto;display:inline-block;margin-left:10px}.el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before,.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{content:\"*\";color:#f56c6c;margin-right:4px}.el-form-item.is-error .el-input-group__append .el-input__inner,.el-form-item.is-error .el-input-group__prepend .el-input__inner{border-color:transparent}.el-form-item.is-error .el-input__validateIcon{color:#f56c6c}.el-form-item--feedback .el-input__validateIcon{display:inline-block}.el-tabs__header{padding:0;position:relative;margin:0 0 15px}.el-tabs__active-bar{position:absolute;bottom:0;left:0;height:2px;background-color:#409eff;z-index:1;transition:transform .3s cubic-bezier(.645,.045,.355,1);list-style:none}.el-tabs__new-tab{float:right;border:1px solid #d3dce6;height:18px;width:18px;line-height:18px;margin:12px 0 9px 10px;border-radius:3px;text-align:center;font-size:12px;color:#d3dce6;cursor:pointer;transition:all .15s}.el-collapse-item__arrow,.el-tabs__nav{-webkit-transition:-webkit-transform .3s}.el-tabs__new-tab .el-icon-plus{transform:scale(.8)}.el-tabs__new-tab:hover{color:#409eff}.el-tabs__nav-wrap{overflow:hidden;margin-bottom:-1px;position:relative}.el-tabs__nav-wrap:after{content:\"\";position:absolute;left:0;bottom:0;width:100%;height:2px;background-color:#e4e7ed;z-index:1}.el-tabs--border-card>.el-tabs__header .el-tabs__nav-wrap:after,.el-tabs--card>.el-tabs__header .el-tabs__nav-wrap:after{content:none}.el-tabs__nav-wrap.is-scrollable{padding:0 20px;box-sizing:border-box}.el-tabs__nav-scroll{overflow:hidden}.el-tabs__nav-next,.el-tabs__nav-prev{position:absolute;cursor:pointer;line-height:44px;font-size:12px;color:#909399}.el-tabs__nav-next{right:0}.el-tabs__nav-prev{left:0}.el-tabs__nav{white-space:nowrap;position:relative;transition:transform .3s;float:left;z-index:2}.el-tabs__nav.is-stretch{min-width:100%;display:-ms-flexbox;display:flex}.el-tabs__nav.is-stretch>*{-ms-flex:1;flex:1;text-align:center}.el-tabs__item{padding:0 20px;height:40px;box-sizing:border-box;line-height:40px;display:inline-block;list-style:none;font-size:14px;font-weight:500;color:#303133;position:relative}.el-tabs__item:focus,.el-tabs__item:focus:active{outline:0}.el-tabs__item:focus.is-active.is-focus:not(:active){box-shadow:inset 0 0 2px 2px #409eff;border-radius:3px}.el-tabs__item .el-icon-close{border-radius:50%;text-align:center;transition:all .3s cubic-bezier(.645,.045,.355,1);margin-left:5px}.el-tabs__item .el-icon-close:before{transform:scale(.9);display:inline-block}.el-tabs__item .el-icon-close:hover{background-color:#c0c4cc;color:#fff}.el-tabs__item.is-active{color:#409eff}.el-tabs__item:hover{color:#409eff;cursor:pointer}.el-tabs__item.is-disabled{color:#c0c4cc;cursor:default}.el-tabs__content{overflow:hidden;position:relative}.el-tabs--card>.el-tabs__header{border-bottom:1px solid #e4e7ed}.el-tabs--card>.el-tabs__header .el-tabs__nav{border:1px solid #e4e7ed;border-bottom:none;border-radius:4px 4px 0 0;box-sizing:border-box}.el-tabs--card>.el-tabs__header .el-tabs__active-bar{display:none}.el-tabs--card>.el-tabs__header .el-tabs__item .el-icon-close{position:relative;font-size:12px;width:0;height:14px;vertical-align:middle;line-height:15px;overflow:hidden;top:-1px;right:-2px;transform-origin:100% 50%}.el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable .el-icon-close,.el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover .el-icon-close{width:14px}.el-tabs--card>.el-tabs__header .el-tabs__item{border-bottom:1px solid transparent;border-left:1px solid #e4e7ed;transition:color .3s cubic-bezier(.645,.045,.355,1),padding .3s cubic-bezier(.645,.045,.355,1)}.el-tabs--card>.el-tabs__header .el-tabs__item:first-child{border-left:none}.el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover{padding-left:13px;padding-right:13px}.el-tabs--card>.el-tabs__header .el-tabs__item.is-active{border-bottom-color:#fff}.el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable{padding-left:20px;padding-right:20px}.el-tabs--border-card{background:#fff;border:1px solid #dcdfe6;box-shadow:0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04)}.el-tabs--border-card>.el-tabs__content{padding:15px}.el-tabs--border-card>.el-tabs__header{background-color:#f5f7fa;border-bottom:1px solid #e4e7ed;margin:0}.el-tabs--border-card>.el-tabs__header .el-tabs__item{transition:all .3s cubic-bezier(.645,.045,.355,1);border:1px solid transparent;margin-top:-1px;color:#909399}.el-tabs--border-card>.el-tabs__header .el-tabs__item+.el-tabs__item,.el-tabs--border-card>.el-tabs__header .el-tabs__item:first-child{margin-left:-1px}.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{color:#409eff;background-color:#fff;border-right-color:#dcdfe6;border-left-color:#dcdfe6}.el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{color:#409eff}.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-disabled{color:#c0c4cc}.el-tabs--border-card>.el-tabs__header .is-scrollable .el-tabs__item:first-child{margin-left:0}.el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2),.el-tabs--bottom .el-tabs__item.is-top:nth-child(2),.el-tabs--top .el-tabs__item.is-bottom:nth-child(2),.el-tabs--top .el-tabs__item.is-top:nth-child(2){padding-left:0}.el-tabs--bottom .el-tabs__item.is-bottom:last-child,.el-tabs--bottom .el-tabs__item.is-top:last-child,.el-tabs--top .el-tabs__item.is-bottom:last-child,.el-tabs--top .el-tabs__item.is-top:last-child{padding-right:0}.el-tabs--bottom.el-tabs--border-card>.el-tabs__header .el-tabs__item:nth-child(2),.el-tabs--bottom.el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2),.el-tabs--bottom .el-tabs--left>.el-tabs__header .el-tabs__item:nth-child(2),.el-tabs--bottom .el-tabs--right>.el-tabs__header .el-tabs__item:nth-child(2),.el-tabs--top.el-tabs--border-card>.el-tabs__header .el-tabs__item:nth-child(2),.el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2),.el-tabs--top .el-tabs--left>.el-tabs__header .el-tabs__item:nth-child(2),.el-tabs--top .el-tabs--right>.el-tabs__header .el-tabs__item:nth-child(2){padding-left:20px}.el-tabs--bottom.el-tabs--border-card>.el-tabs__header .el-tabs__item:last-child,.el-tabs--bottom.el-tabs--card>.el-tabs__header .el-tabs__item:last-child,.el-tabs--bottom .el-tabs--left>.el-tabs__header .el-tabs__item:last-child,.el-tabs--bottom .el-tabs--right>.el-tabs__header .el-tabs__item:last-child,.el-tabs--top.el-tabs--border-card>.el-tabs__header .el-tabs__item:last-child,.el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:last-child,.el-tabs--top .el-tabs--left>.el-tabs__header .el-tabs__item:last-child,.el-tabs--top .el-tabs--right>.el-tabs__header .el-tabs__item:last-child{padding-right:20px}.el-tabs--bottom .el-tabs__header.is-bottom{margin-bottom:0;margin-top:10px}.el-tabs--bottom.el-tabs--border-card .el-tabs__header.is-bottom{border-bottom:0;border-top:1px solid #dcdfe6}.el-tabs--bottom.el-tabs--border-card .el-tabs__nav-wrap.is-bottom{margin-top:-1px;margin-bottom:0}.el-tabs--bottom.el-tabs--border-card .el-tabs__item.is-bottom:not(.is-active){border:1px solid transparent}.el-tabs--bottom.el-tabs--border-card .el-tabs__item.is-bottom{margin:0 -1px -1px}.el-tabs--left,.el-tabs--right{overflow:hidden}.el-tabs--left .el-tabs__header.is-left,.el-tabs--left .el-tabs__header.is-right,.el-tabs--left .el-tabs__nav-scroll,.el-tabs--left .el-tabs__nav-wrap.is-left,.el-tabs--left .el-tabs__nav-wrap.is-right,.el-tabs--right .el-tabs__header.is-left,.el-tabs--right .el-tabs__header.is-right,.el-tabs--right .el-tabs__nav-scroll,.el-tabs--right .el-tabs__nav-wrap.is-left,.el-tabs--right .el-tabs__nav-wrap.is-right{height:100%}.el-tabs--left .el-tabs__active-bar.is-left,.el-tabs--left .el-tabs__active-bar.is-right,.el-tabs--right .el-tabs__active-bar.is-left,.el-tabs--right .el-tabs__active-bar.is-right{top:0;bottom:auto;width:2px;height:auto}.el-tabs--left .el-tabs__nav-wrap.is-left,.el-tabs--left .el-tabs__nav-wrap.is-right,.el-tabs--right .el-tabs__nav-wrap.is-left,.el-tabs--right .el-tabs__nav-wrap.is-right{margin-bottom:0}.el-tabs--left .el-tabs__nav-wrap.is-left>.el-tabs__nav-next,.el-tabs--left .el-tabs__nav-wrap.is-left>.el-tabs__nav-prev,.el-tabs--left .el-tabs__nav-wrap.is-right>.el-tabs__nav-next,.el-tabs--left .el-tabs__nav-wrap.is-right>.el-tabs__nav-prev,.el-tabs--right .el-tabs__nav-wrap.is-left>.el-tabs__nav-next,.el-tabs--right .el-tabs__nav-wrap.is-left>.el-tabs__nav-prev,.el-tabs--right .el-tabs__nav-wrap.is-right>.el-tabs__nav-next,.el-tabs--right .el-tabs__nav-wrap.is-right>.el-tabs__nav-prev{height:30px;line-height:30px;width:100%;text-align:center;cursor:pointer}.el-tabs--left .el-tabs__nav-wrap.is-left>.el-tabs__nav-next i,.el-tabs--left .el-tabs__nav-wrap.is-left>.el-tabs__nav-prev i,.el-tabs--left .el-tabs__nav-wrap.is-right>.el-tabs__nav-next i,.el-tabs--left .el-tabs__nav-wrap.is-right>.el-tabs__nav-prev i,.el-tabs--right .el-tabs__nav-wrap.is-left>.el-tabs__nav-next i,.el-tabs--right .el-tabs__nav-wrap.is-left>.el-tabs__nav-prev i,.el-tabs--right .el-tabs__nav-wrap.is-right>.el-tabs__nav-next i,.el-tabs--right .el-tabs__nav-wrap.is-right>.el-tabs__nav-prev i{transform:rotate(90deg)}.el-tabs--left .el-tabs__nav-wrap.is-left>.el-tabs__nav-prev,.el-tabs--left .el-tabs__nav-wrap.is-right>.el-tabs__nav-prev,.el-tabs--right .el-tabs__nav-wrap.is-left>.el-tabs__nav-prev,.el-tabs--right .el-tabs__nav-wrap.is-right>.el-tabs__nav-prev{left:auto;top:0}.el-tabs--left .el-tabs__nav-wrap.is-left>.el-tabs__nav-next,.el-tabs--left .el-tabs__nav-wrap.is-right>.el-tabs__nav-next,.el-tabs--right .el-tabs__nav-wrap.is-left>.el-tabs__nav-next,.el-tabs--right .el-tabs__nav-wrap.is-right>.el-tabs__nav-next{right:auto;bottom:0}.el-tabs--left .el-tabs__active-bar.is-left,.el-tabs--left .el-tabs__nav-wrap.is-left:after{right:0;left:auto}.el-tabs--left .el-tabs__nav-wrap.is-left.is-scrollable,.el-tabs--left .el-tabs__nav-wrap.is-right.is-scrollable,.el-tabs--right .el-tabs__nav-wrap.is-left.is-scrollable,.el-tabs--right .el-tabs__nav-wrap.is-right.is-scrollable{padding:30px 0}.el-tabs--left .el-tabs__nav-wrap.is-left:after,.el-tabs--left .el-tabs__nav-wrap.is-right:after,.el-tabs--right .el-tabs__nav-wrap.is-left:after,.el-tabs--right .el-tabs__nav-wrap.is-right:after{height:100%;width:2px;bottom:auto;top:0}.el-tabs--left .el-tabs__nav.is-left,.el-tabs--left .el-tabs__nav.is-right,.el-tabs--right .el-tabs__nav.is-left,.el-tabs--right .el-tabs__nav.is-right{float:none}.el-tabs--left .el-tabs__item.is-left,.el-tabs--left .el-tabs__item.is-right,.el-tabs--right .el-tabs__item.is-left,.el-tabs--right .el-tabs__item.is-right{display:block}.el-tabs--left.el-tabs--card .el-tabs__active-bar.is-left,.el-tabs--right.el-tabs--card .el-tabs__active-bar.is-right{display:none}.el-tabs--left .el-tabs__header.is-left{float:left;margin-bottom:0;margin-right:10px}.el-tabs--left .el-tabs__nav-wrap.is-left{margin-right:-1px}.el-tabs--left .el-tabs__item.is-left{text-align:right}.el-tabs--left.el-tabs--card .el-tabs__item.is-left{border-left:none;border-right:1px solid #e4e7ed;border-bottom:none;border-top:1px solid #e4e7ed;text-align:left}.el-tabs--left.el-tabs--card .el-tabs__item.is-left:first-child{border-right:1px solid #e4e7ed;border-top:none}.el-tabs--left.el-tabs--card .el-tabs__item.is-left.is-active{border:1px solid #e4e7ed;border-right-color:#fff;border-left:none;border-bottom:none}.el-tabs--left.el-tabs--card .el-tabs__item.is-left.is-active:first-child{border-top:none}.el-tabs--left.el-tabs--card .el-tabs__item.is-left.is-active:last-child{border-bottom:none}.el-tabs--left.el-tabs--card .el-tabs__nav{border-radius:4px 0 0 4px;border-bottom:1px solid #e4e7ed;border-right:none}.el-tabs--left.el-tabs--card .el-tabs__new-tab{float:none}.el-tabs--left.el-tabs--border-card .el-tabs__header.is-left{border-right:1px solid #dfe4ed}.el-tabs--left.el-tabs--border-card .el-tabs__item.is-left{border:1px solid transparent;margin:-1px 0 -1px -1px}.el-tabs--left.el-tabs--border-card .el-tabs__item.is-left.is-active{border-color:#d1dbe5 transparent}.el-tabs--right .el-tabs__header.is-right{float:right;margin-bottom:0;margin-left:10px}.el-tabs--right .el-tabs__nav-wrap.is-right{margin-left:-1px}.el-tabs--right .el-tabs__nav-wrap.is-right:after{left:0;right:auto}.el-tabs--right .el-tabs__active-bar.is-right{left:0}.el-tabs--right.el-tabs--card .el-tabs__item.is-right{border-bottom:none;border-top:1px solid #e4e7ed}.el-tabs--right.el-tabs--card .el-tabs__item.is-right:first-child{border-left:1px solid #e4e7ed;border-top:none}.el-tabs--right.el-tabs--card .el-tabs__item.is-right.is-active{border:1px solid #e4e7ed;border-left-color:#fff;border-right:none;border-bottom:none}.el-tabs--right.el-tabs--card .el-tabs__item.is-right.is-active:first-child{border-top:none}.el-tabs--right.el-tabs--card .el-tabs__item.is-right.is-active:last-child{border-bottom:none}.el-tabs--right.el-tabs--card .el-tabs__nav{border-radius:0 4px 4px 0;border-bottom:1px solid #e4e7ed;border-left:none}.el-tabs--right.el-tabs--border-card .el-tabs__header.is-right{border-left:1px solid #dfe4ed}.el-tabs--right.el-tabs--border-card .el-tabs__item.is-right{border:1px solid transparent;margin:-1px -1px -1px 0}.el-tabs--right.el-tabs--border-card .el-tabs__item.is-right.is-active{border-color:#d1dbe5 transparent}.slideInLeft-transition,.slideInRight-transition{display:inline-block}.slideInRight-enter{animation:slideInRight-enter .3s}.slideInRight-leave{position:absolute;left:0;right:0;animation:slideInRight-leave .3s}.slideInLeft-enter{animation:slideInLeft-enter .3s}.slideInLeft-leave{position:absolute;left:0;right:0;animation:slideInLeft-leave .3s}@keyframes slideInRight-enter{0%{opacity:0;transform-origin:0 0;transform:translateX(100%)}to{opacity:1;transform-origin:0 0;transform:translateX(0)}}@keyframes slideInRight-leave{0%{transform-origin:0 0;transform:translateX(0);opacity:1}to{transform-origin:0 0;transform:translateX(100%);opacity:0}}@keyframes slideInLeft-enter{0%{opacity:0;transform-origin:0 0;transform:translateX(-100%)}to{opacity:1;transform-origin:0 0;transform:translateX(0)}}@keyframes slideInLeft-leave{0%{transform-origin:0 0;transform:translateX(0);opacity:1}to{transform-origin:0 0;transform:translateX(-100%);opacity:0}}.el-tree{position:relative;cursor:default;background:#fff;color:#606266}.el-tree__empty-block{position:relative;min-height:60px;text-align:center;width:100%;height:100%}.el-tree__empty-text{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);color:#909399}.el-tree__drop-indicator{position:absolute;left:0;right:0;height:1px;background-color:#409eff}.el-tree-node{white-space:nowrap;outline:0}.el-tree-node:focus>.el-tree-node__content{background-color:#f5f7fa}.el-tree-node.is-drop-inner>.el-tree-node__content .el-tree-node__label{background-color:#409eff;color:#fff}.el-tree-node__content{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;height:26px;cursor:pointer}.el-tree-node__content>.el-tree-node__expand-icon{padding:6px}.el-tree-node__content>label.el-checkbox{margin-right:8px}.el-tree-node__content:hover{background-color:#f5f7fa}.el-tree.is-dragging .el-tree-node__content{cursor:move}.el-tree.is-dragging.is-drop-not-allow .el-tree-node__content{cursor:not-allowed}.el-tree-node__expand-icon{cursor:pointer;color:#c0c4cc;font-size:12px;transform:rotate(0);transition:transform .3s ease-in-out}.el-tree-node__expand-icon.expanded{transform:rotate(90deg)}.el-tree-node__expand-icon.is-leaf{color:transparent;cursor:default}.el-tree-node__label{font-size:14px}.el-tree-node__loading-icon{margin-right:8px;font-size:14px;color:#c0c4cc}.el-tree-node>.el-tree-node__children{overflow:hidden;background-color:transparent}.el-tree-node.is-expanded>.el-tree-node__children{display:block}.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{background-color:#f0f7ff}.el-alert{width:100%;padding:8px 16px;margin:0;box-sizing:border-box;border-radius:4px;position:relative;background-color:#fff;overflow:hidden;opacity:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;transition:opacity .2s}.el-alert.is-light .el-alert__closebtn{color:#c0c4cc}.el-alert.is-dark .el-alert__closebtn,.el-alert.is-dark .el-alert__description{color:#fff}.el-alert.is-center{-ms-flex-pack:center;justify-content:center}.el-alert--success.is-light{background-color:#f0f9eb;color:#67c23a}.el-alert--success.is-light .el-alert__description{color:#67c23a}.el-alert--success.is-dark{background-color:#67c23a;color:#fff}.el-alert--info.is-light{background-color:#f4f4f5;color:#909399}.el-alert--info.is-dark{background-color:#909399;color:#fff}.el-alert--info .el-alert__description{color:#909399}.el-alert--warning.is-light{background-color:#fdf6ec;color:#e6a23c}.el-alert--warning.is-light .el-alert__description{color:#e6a23c}.el-alert--warning.is-dark{background-color:#e6a23c;color:#fff}.el-alert--error.is-light{background-color:#fef0f0;color:#f56c6c}.el-alert--error.is-light .el-alert__description{color:#f56c6c}.el-alert--error.is-dark{background-color:#f56c6c;color:#fff}.el-alert__content{display:table-cell;padding:0 8px}.el-alert__icon{font-size:16px;width:16px}.el-alert__icon.is-big{font-size:28px;width:28px}.el-alert__title{font-size:13px;line-height:18px}.el-alert__title.is-bold{font-weight:700}.el-alert .el-alert__description{font-size:12px;margin:5px 0 0}.el-alert__closebtn{font-size:12px;opacity:1;position:absolute;top:12px;right:15px;cursor:pointer}.el-alert-fade-enter,.el-alert-fade-leave-active,.el-loading-fade-enter,.el-loading-fade-leave-active,.el-notification-fade-leave-active{opacity:0}.el-alert__closebtn.is-customed{font-style:normal;font-size:13px;top:9px}.el-notification{display:-ms-flexbox;display:flex;width:330px;padding:14px 26px 14px 13px;border-radius:8px;box-sizing:border-box;border:1px solid #ebeef5;position:fixed;background-color:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);transition:opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;overflow:hidden}.el-notification.right{right:16px}.el-notification.left{left:16px}.el-notification__group{margin-left:13px;margin-right:8px}.el-notification__title{font-weight:700;font-size:16px;color:#303133;margin:0}.el-notification__content{font-size:14px;line-height:21px;margin:6px 0 0;color:#606266;text-align:justify}.el-notification__content p{margin:0}.el-notification__icon{height:24px;width:24px;font-size:24px}.el-notification__closeBtn{position:absolute;top:18px;right:15px;cursor:pointer;color:#909399;font-size:16px}.el-notification__closeBtn:hover{color:#606266}.el-notification .el-icon-success{color:#67c23a}.el-notification .el-icon-error{color:#f56c6c}.el-notification .el-icon-info{color:#909399}.el-notification .el-icon-warning{color:#e6a23c}.el-notification-fade-enter.right{right:0;transform:translateX(100%)}.el-notification-fade-enter.left{left:0;transform:translateX(-100%)}.el-input-number{position:relative;display:inline-block;width:180px;line-height:38px}.el-input-number .el-input{display:block}.el-input-number .el-input__inner{-webkit-appearance:none;padding-left:50px;padding-right:50px;text-align:center}.el-input-number__decrease,.el-input-number__increase{position:absolute;z-index:1;top:1px;width:40px;height:auto;text-align:center;background:#f5f7fa;color:#606266;cursor:pointer;font-size:13px}.el-input-number__decrease:hover,.el-input-number__increase:hover{color:#409eff}.el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled),.el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled){border-color:#409eff}.el-input-number__decrease.is-disabled,.el-input-number__increase.is-disabled{color:#c0c4cc;cursor:not-allowed}.el-input-number__increase{right:1px;border-radius:0 4px 4px 0;border-left:1px solid #dcdfe6}.el-input-number__decrease{left:1px;border-radius:4px 0 0 4px;border-right:1px solid #dcdfe6}.el-input-number.is-disabled .el-input-number__decrease,.el-input-number.is-disabled .el-input-number__increase{border-color:#e4e7ed;color:#e4e7ed}.el-input-number.is-disabled .el-input-number__decrease:hover,.el-input-number.is-disabled .el-input-number__increase:hover{color:#e4e7ed;cursor:not-allowed}.el-input-number--medium{width:200px;line-height:34px}.el-input-number--medium .el-input-number__decrease,.el-input-number--medium .el-input-number__increase{width:36px;font-size:14px}.el-input-number--medium .el-input__inner{padding-left:43px;padding-right:43px}.el-input-number--small{width:130px;line-height:30px}.el-input-number--small .el-input-number__decrease,.el-input-number--small .el-input-number__increase{width:32px;font-size:13px}.el-input-number--small .el-input-number__decrease [class*=el-icon],.el-input-number--small .el-input-number__increase [class*=el-icon]{transform:scale(.9)}.el-input-number--small .el-input__inner{padding-left:39px;padding-right:39px}.el-input-number--mini{width:130px;line-height:26px}.el-input-number--mini .el-input-number__decrease,.el-input-number--mini .el-input-number__increase{width:28px;font-size:12px}.el-input-number--mini .el-input-number__decrease [class*=el-icon],.el-input-number--mini .el-input-number__increase [class*=el-icon]{transform:scale(.8)}.el-input-number--mini .el-input__inner{padding-left:35px;padding-right:35px}.el-input-number.is-without-controls .el-input__inner{padding-left:15px;padding-right:15px}.el-input-number.is-controls-right .el-input__inner{padding-left:15px;padding-right:50px}.el-input-number.is-controls-right .el-input-number__decrease,.el-input-number.is-controls-right .el-input-number__increase{height:auto;line-height:19px}.el-input-number.is-controls-right .el-input-number__decrease [class*=el-icon],.el-input-number.is-controls-right .el-input-number__increase [class*=el-icon]{transform:scale(.8)}.el-input-number.is-controls-right .el-input-number__increase{border-radius:0 4px 0 0;border-bottom:1px solid #dcdfe6}.el-input-number.is-controls-right .el-input-number__decrease{right:1px;bottom:1px;top:auto;left:auto;border-right:none;border-left:1px solid #dcdfe6;border-radius:0 0 4px}.el-input-number.is-controls-right[class*=medium] [class*=decrease],.el-input-number.is-controls-right[class*=medium] [class*=increase]{line-height:17px}.el-input-number.is-controls-right[class*=small] [class*=decrease],.el-input-number.is-controls-right[class*=small] [class*=increase]{line-height:15px}.el-input-number.is-controls-right[class*=mini] [class*=decrease],.el-input-number.is-controls-right[class*=mini] [class*=increase]{line-height:13px}.el-tooltip__popper{position:absolute;border-radius:4px;padding:10px;z-index:2000;font-size:12px;line-height:1.2;min-width:10px;word-wrap:break-word}.el-tooltip__popper .popper__arrow,.el-tooltip__popper .popper__arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.el-tooltip__popper .popper__arrow{border-width:6px}.el-tooltip__popper .popper__arrow:after{content:\" \";border-width:5px}.el-progress-bar__inner:after,.el-row:after,.el-row:before,.el-slider:after,.el-slider:before,.el-slider__button-wrapper:after,.el-upload-cover:after{content:\"\"}.el-tooltip__popper[x-placement^=top]{margin-bottom:12px}.el-tooltip__popper[x-placement^=top] .popper__arrow{bottom:-6px;border-top-color:#303133;border-bottom-width:0}.el-tooltip__popper[x-placement^=top] .popper__arrow:after{bottom:1px;margin-left:-5px;border-top-color:#303133;border-bottom-width:0}.el-tooltip__popper[x-placement^=bottom]{margin-top:12px}.el-tooltip__popper[x-placement^=bottom] .popper__arrow{top:-6px;border-top-width:0;border-bottom-color:#303133}.el-tooltip__popper[x-placement^=bottom] .popper__arrow:after{top:1px;margin-left:-5px;border-top-width:0;border-bottom-color:#303133}.el-tooltip__popper[x-placement^=right]{margin-left:12px}.el-tooltip__popper[x-placement^=right] .popper__arrow{left:-6px;border-right-color:#303133;border-left-width:0}.el-tooltip__popper[x-placement^=right] .popper__arrow:after{bottom:-5px;left:1px;border-right-color:#303133;border-left-width:0}.el-tooltip__popper[x-placement^=left]{margin-right:12px}.el-tooltip__popper[x-placement^=left] .popper__arrow{right:-6px;border-right-width:0;border-left-color:#303133}.el-tooltip__popper[x-placement^=left] .popper__arrow:after{right:1px;bottom:-5px;margin-left:-5px;border-right-width:0;border-left-color:#303133}.el-tooltip__popper.is-dark{background:#303133;color:#fff}.el-tooltip__popper.is-light{background:#fff;border:1px solid #303133}.el-tooltip__popper.is-light[x-placement^=top] .popper__arrow{border-top-color:#303133}.el-tooltip__popper.is-light[x-placement^=top] .popper__arrow:after{border-top-color:#fff}.el-tooltip__popper.is-light[x-placement^=bottom] .popper__arrow{border-bottom-color:#303133}.el-tooltip__popper.is-light[x-placement^=bottom] .popper__arrow:after{border-bottom-color:#fff}.el-tooltip__popper.is-light[x-placement^=left] .popper__arrow{border-left-color:#303133}.el-tooltip__popper.is-light[x-placement^=left] .popper__arrow:after{border-left-color:#fff}.el-tooltip__popper.is-light[x-placement^=right] .popper__arrow{border-right-color:#303133}.el-tooltip__popper.is-light[x-placement^=right] .popper__arrow:after{border-right-color:#fff}.el-slider:after,.el-slider:before{display:table}.el-slider__button-wrapper .el-tooltip,.el-slider__button-wrapper:after{vertical-align:middle;display:inline-block}.el-slider:after{clear:both}.el-slider__runway{width:100%;height:6px;margin:16px 0;background-color:#e4e7ed;border-radius:3px;position:relative;cursor:pointer;vertical-align:middle}.el-slider__runway.show-input{margin-right:160px;width:auto}.el-slider__runway.disabled{cursor:default}.el-slider__runway.disabled .el-slider__bar{background-color:#c0c4cc}.el-slider__runway.disabled .el-slider__button{border-color:#c0c4cc}.el-slider__runway.disabled .el-slider__button-wrapper.dragging,.el-slider__runway.disabled .el-slider__button-wrapper.hover,.el-slider__runway.disabled .el-slider__button-wrapper:hover{cursor:not-allowed}.el-slider__runway.disabled .el-slider__button.dragging,.el-slider__runway.disabled .el-slider__button.hover,.el-slider__runway.disabled .el-slider__button:hover{transform:scale(1);cursor:not-allowed}.el-slider__button-wrapper,.el-slider__stop{-webkit-transform:translateX(-50%);position:absolute}.el-slider__input{float:right;margin-top:3px;width:130px}.el-slider__input.el-input-number--mini{margin-top:5px}.el-slider__input.el-input-number--medium{margin-top:0}.el-slider__input.el-input-number--large{margin-top:-2px}.el-slider__bar{height:6px;background-color:#409eff;border-top-left-radius:3px;border-bottom-left-radius:3px;position:absolute}.el-slider__button-wrapper{height:36px;width:36px;z-index:1001;top:-15px;transform:translateX(-50%);background-color:transparent;text-align:center;user-select:none;line-height:normal}.el-slider__button,.el-slider__button-wrapper,.el-step__icon-inner{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}.el-slider__button-wrapper:after{height:100%}.el-slider__button-wrapper.hover,.el-slider__button-wrapper:hover{cursor:grab}.el-slider__button-wrapper.dragging{cursor:grabbing}.el-slider__button{width:16px;height:16px;border:2px solid #409eff;background-color:#fff;border-radius:50%;transition:.2s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.el-slider__button.dragging,.el-slider__button.hover,.el-slider__button:hover{transform:scale(1.2)}.el-slider__button.hover,.el-slider__button:hover{cursor:grab}.el-slider__button.dragging{cursor:grabbing}.el-slider__stop{height:6px;width:6px;border-radius:100%;background-color:#fff;transform:translateX(-50%)}.el-slider__marks{top:0;left:12px;width:18px;height:100%}.el-slider__marks-text{position:absolute;transform:translateX(-50%);font-size:14px;color:#909399;margin-top:15px}.el-slider.is-vertical{position:relative}.el-slider.is-vertical .el-slider__runway{width:6px;height:100%;margin:0 16px}.el-slider.is-vertical .el-slider__bar{width:6px;height:auto;border-radius:0 0 3px 3px}.el-slider.is-vertical .el-slider__button-wrapper{top:auto;left:-15px;transform:translateY(50%)}.el-slider.is-vertical .el-slider__stop{transform:translateY(50%)}.el-slider.is-vertical.el-slider--with-input{padding-bottom:58px}.el-slider.is-vertical.el-slider--with-input .el-slider__input{overflow:visible;float:none;position:absolute;bottom:22px;width:36px;margin-top:15px}.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input__inner{text-align:center;padding-left:5px;padding-right:5px}.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input-number__decrease,.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input-number__increase{top:32px;margin-top:-1px;border:1px solid #dcdfe6;line-height:20px;box-sizing:border-box;transition:border-color .2s cubic-bezier(.645,.045,.355,1)}.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input-number__decrease{width:18px;right:18px;border-bottom-left-radius:4px}.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input-number__increase{width:19px;border-bottom-right-radius:4px}.el-slider.is-vertical.el-slider--with-input .el-slider__input .el-input-number__increase~.el-input .el-input__inner{border-bottom-left-radius:0;border-bottom-right-radius:0}.el-slider.is-vertical.el-slider--with-input .el-slider__input:hover .el-input-number__decrease,.el-slider.is-vertical.el-slider--with-input .el-slider__input:hover .el-input-number__increase{border-color:#c0c4cc}.el-slider.is-vertical.el-slider--with-input .el-slider__input:active .el-input-number__decrease,.el-slider.is-vertical.el-slider--with-input .el-slider__input:active .el-input-number__increase{border-color:#409eff}.el-slider.is-vertical .el-slider__marks-text{margin-top:0;left:15px;transform:translateY(50%)}.el-loading-parent--relative{position:relative!important}.el-loading-parent--hidden{overflow:hidden!important}.el-loading-mask{position:absolute;z-index:2000;background-color:hsla(0,0%,100%,.9);margin:0;top:0;right:0;bottom:0;left:0;transition:opacity .3s}.el-loading-mask.is-fullscreen{position:fixed}.el-loading-mask.is-fullscreen .el-loading-spinner{margin-top:-25px}.el-loading-mask.is-fullscreen .el-loading-spinner .circular{height:50px;width:50px}.el-loading-spinner{top:50%;margin-top:-21px;width:100%;text-align:center;position:absolute}.el-col-pull-0,.el-col-pull-1,.el-col-pull-2,.el-col-pull-3,.el-col-pull-4,.el-col-pull-5,.el-col-pull-6,.el-col-pull-7,.el-col-pull-8,.el-col-pull-9,.el-col-pull-10,.el-col-pull-11,.el-col-pull-13,.el-col-pull-14,.el-col-pull-15,.el-col-pull-16,.el-col-pull-17,.el-col-pull-18,.el-col-pull-19,.el-col-pull-20,.el-col-pull-21,.el-col-pull-22,.el-col-pull-23,.el-col-pull-24,.el-col-push-0,.el-col-push-1,.el-col-push-2,.el-col-push-3,.el-col-push-4,.el-col-push-5,.el-col-push-6,.el-col-push-7,.el-col-push-8,.el-col-push-9,.el-col-push-10,.el-col-push-11,.el-col-push-12,.el-col-push-13,.el-col-push-14,.el-col-push-15,.el-col-push-16,.el-col-push-17,.el-col-push-18,.el-col-push-19,.el-col-push-20,.el-col-push-21,.el-col-push-22,.el-col-push-23,.el-col-push-24,.el-row{position:relative}.el-loading-spinner .el-loading-text{color:#409eff;margin:3px 0;font-size:14px}.el-loading-spinner .circular{height:42px;width:42px;animation:loading-rotate 2s linear infinite}.el-loading-spinner .path{animation:loading-dash 1.5s ease-in-out infinite;stroke-dasharray:90,150;stroke-dashoffset:0;stroke-width:2;stroke:#409eff;stroke-linecap:round}.el-loading-spinner i{color:#409eff}@keyframes loading-rotate{to{transform:rotate(1turn)}}@keyframes loading-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-40px}to{stroke-dasharray:90,150;stroke-dashoffset:-120px}}.el-row{box-sizing:border-box}.el-row:after,.el-row:before{display:table}.el-row:after{clear:both}.el-row--flex{display:-ms-flexbox;display:flex}.el-col-0,.el-row--flex:after,.el-row--flex:before{display:none}.el-row--flex.is-justify-center{-ms-flex-pack:center;justify-content:center}.el-row--flex.is-justify-end{-ms-flex-pack:end;justify-content:flex-end}.el-row--flex.is-justify-space-between{-ms-flex-pack:justify;justify-content:space-between}.el-row--flex.is-justify-space-around{-ms-flex-pack:distribute;justify-content:space-around}.el-row--flex.is-align-middle{-ms-flex-align:center;align-items:center}.el-row--flex.is-align-bottom{-ms-flex-align:end;align-items:flex-end}[class*=el-col-]{float:left;box-sizing:border-box}.el-upload--picture-card,.el-upload-dragger{-webkit-box-sizing:border-box;cursor:pointer}.el-col-0{width:0}.el-col-offset-0{margin-left:0}.el-col-pull-0{right:0}.el-col-push-0{left:0}.el-col-1{width:4.16667%}.el-col-offset-1{margin-left:4.16667%}.el-col-pull-1{right:4.16667%}.el-col-push-1{left:4.16667%}.el-col-2{width:8.33333%}.el-col-offset-2{margin-left:8.33333%}.el-col-pull-2{right:8.33333%}.el-col-push-2{left:8.33333%}.el-col-3{width:12.5%}.el-col-offset-3{margin-left:12.5%}.el-col-pull-3{right:12.5%}.el-col-push-3{left:12.5%}.el-col-4{width:16.66667%}.el-col-offset-4{margin-left:16.66667%}.el-col-pull-4{right:16.66667%}.el-col-push-4{left:16.66667%}.el-col-5{width:20.83333%}.el-col-offset-5{margin-left:20.83333%}.el-col-pull-5{right:20.83333%}.el-col-push-5{left:20.83333%}.el-col-6{width:25%}.el-col-offset-6{margin-left:25%}.el-col-pull-6{right:25%}.el-col-push-6{left:25%}.el-col-7{width:29.16667%}.el-col-offset-7{margin-left:29.16667%}.el-col-pull-7{right:29.16667%}.el-col-push-7{left:29.16667%}.el-col-8{width:33.33333%}.el-col-offset-8{margin-left:33.33333%}.el-col-pull-8{right:33.33333%}.el-col-push-8{left:33.33333%}.el-col-9{width:37.5%}.el-col-offset-9{margin-left:37.5%}.el-col-pull-9{right:37.5%}.el-col-push-9{left:37.5%}.el-col-10{width:41.66667%}.el-col-offset-10{margin-left:41.66667%}.el-col-pull-10{right:41.66667%}.el-col-push-10{left:41.66667%}.el-col-11{width:45.83333%}.el-col-offset-11{margin-left:45.83333%}.el-col-pull-11{right:45.83333%}.el-col-push-11{left:45.83333%}.el-col-12{width:50%}.el-col-offset-12{margin-left:50%}.el-col-pull-12{position:relative;right:50%}.el-col-push-12{left:50%}.el-col-13{width:54.16667%}.el-col-offset-13{margin-left:54.16667%}.el-col-pull-13{right:54.16667%}.el-col-push-13{left:54.16667%}.el-col-14{width:58.33333%}.el-col-offset-14{margin-left:58.33333%}.el-col-pull-14{right:58.33333%}.el-col-push-14{left:58.33333%}.el-col-15{width:62.5%}.el-col-offset-15{margin-left:62.5%}.el-col-pull-15{right:62.5%}.el-col-push-15{left:62.5%}.el-col-16{width:66.66667%}.el-col-offset-16{margin-left:66.66667%}.el-col-pull-16{right:66.66667%}.el-col-push-16{left:66.66667%}.el-col-17{width:70.83333%}.el-col-offset-17{margin-left:70.83333%}.el-col-pull-17{right:70.83333%}.el-col-push-17{left:70.83333%}.el-col-18{width:75%}.el-col-offset-18{margin-left:75%}.el-col-pull-18{right:75%}.el-col-push-18{left:75%}.el-col-19{width:79.16667%}.el-col-offset-19{margin-left:79.16667%}.el-col-pull-19{right:79.16667%}.el-col-push-19{left:79.16667%}.el-col-20{width:83.33333%}.el-col-offset-20{margin-left:83.33333%}.el-col-pull-20{right:83.33333%}.el-col-push-20{left:83.33333%}.el-col-21{width:87.5%}.el-col-offset-21{margin-left:87.5%}.el-col-pull-21{right:87.5%}.el-col-push-21{left:87.5%}.el-col-22{width:91.66667%}.el-col-offset-22{margin-left:91.66667%}.el-col-pull-22{right:91.66667%}.el-col-push-22{left:91.66667%}.el-col-23{width:95.83333%}.el-col-offset-23{margin-left:95.83333%}.el-col-pull-23{right:95.83333%}.el-col-push-23{left:95.83333%}.el-col-24{width:100%}.el-col-offset-24{margin-left:100%}.el-col-pull-24{right:100%}.el-col-push-24{left:100%}@media only screen and (max-width:767px){.el-col-xs-0{display:none;width:0}.el-col-xs-offset-0{margin-left:0}.el-col-xs-pull-0{position:relative;right:0}.el-col-xs-push-0{position:relative;left:0}.el-col-xs-1{width:4.16667%}.el-col-xs-offset-1{margin-left:4.16667%}.el-col-xs-pull-1{position:relative;right:4.16667%}.el-col-xs-push-1{position:relative;left:4.16667%}.el-col-xs-2{width:8.33333%}.el-col-xs-offset-2{margin-left:8.33333%}.el-col-xs-pull-2{position:relative;right:8.33333%}.el-col-xs-push-2{position:relative;left:8.33333%}.el-col-xs-3{width:12.5%}.el-col-xs-offset-3{margin-left:12.5%}.el-col-xs-pull-3{position:relative;right:12.5%}.el-col-xs-push-3{position:relative;left:12.5%}.el-col-xs-4{width:16.66667%}.el-col-xs-offset-4{margin-left:16.66667%}.el-col-xs-pull-4{position:relative;right:16.66667%}.el-col-xs-push-4{position:relative;left:16.66667%}.el-col-xs-5{width:20.83333%}.el-col-xs-offset-5{margin-left:20.83333%}.el-col-xs-pull-5{position:relative;right:20.83333%}.el-col-xs-push-5{position:relative;left:20.83333%}.el-col-xs-6{width:25%}.el-col-xs-offset-6{margin-left:25%}.el-col-xs-pull-6{position:relative;right:25%}.el-col-xs-push-6{position:relative;left:25%}.el-col-xs-7{width:29.16667%}.el-col-xs-offset-7{margin-left:29.16667%}.el-col-xs-pull-7{position:relative;right:29.16667%}.el-col-xs-push-7{position:relative;left:29.16667%}.el-col-xs-8{width:33.33333%}.el-col-xs-offset-8{margin-left:33.33333%}.el-col-xs-pull-8{position:relative;right:33.33333%}.el-col-xs-push-8{position:relative;left:33.33333%}.el-col-xs-9{width:37.5%}.el-col-xs-offset-9{margin-left:37.5%}.el-col-xs-pull-9{position:relative;right:37.5%}.el-col-xs-push-9{position:relative;left:37.5%}.el-col-xs-10{width:41.66667%}.el-col-xs-offset-10{margin-left:41.66667%}.el-col-xs-pull-10{position:relative;right:41.66667%}.el-col-xs-push-10{position:relative;left:41.66667%}.el-col-xs-11{width:45.83333%}.el-col-xs-offset-11{margin-left:45.83333%}.el-col-xs-pull-11{position:relative;right:45.83333%}.el-col-xs-push-11{position:relative;left:45.83333%}.el-col-xs-12{width:50%}.el-col-xs-offset-12{margin-left:50%}.el-col-xs-pull-12{position:relative;right:50%}.el-col-xs-push-12{position:relative;left:50%}.el-col-xs-13{width:54.16667%}.el-col-xs-offset-13{margin-left:54.16667%}.el-col-xs-pull-13{position:relative;right:54.16667%}.el-col-xs-push-13{position:relative;left:54.16667%}.el-col-xs-14{width:58.33333%}.el-col-xs-offset-14{margin-left:58.33333%}.el-col-xs-pull-14{position:relative;right:58.33333%}.el-col-xs-push-14{position:relative;left:58.33333%}.el-col-xs-15{width:62.5%}.el-col-xs-offset-15{margin-left:62.5%}.el-col-xs-pull-15{position:relative;right:62.5%}.el-col-xs-push-15{position:relative;left:62.5%}.el-col-xs-16{width:66.66667%}.el-col-xs-offset-16{margin-left:66.66667%}.el-col-xs-pull-16{position:relative;right:66.66667%}.el-col-xs-push-16{position:relative;left:66.66667%}.el-col-xs-17{width:70.83333%}.el-col-xs-offset-17{margin-left:70.83333%}.el-col-xs-pull-17{position:relative;right:70.83333%}.el-col-xs-push-17{position:relative;left:70.83333%}.el-col-xs-18{width:75%}.el-col-xs-offset-18{margin-left:75%}.el-col-xs-pull-18{position:relative;right:75%}.el-col-xs-push-18{position:relative;left:75%}.el-col-xs-19{width:79.16667%}.el-col-xs-offset-19{margin-left:79.16667%}.el-col-xs-pull-19{position:relative;right:79.16667%}.el-col-xs-push-19{position:relative;left:79.16667%}.el-col-xs-20{width:83.33333%}.el-col-xs-offset-20{margin-left:83.33333%}.el-col-xs-pull-20{position:relative;right:83.33333%}.el-col-xs-push-20{position:relative;left:83.33333%}.el-col-xs-21{width:87.5%}.el-col-xs-offset-21{margin-left:87.5%}.el-col-xs-pull-21{position:relative;right:87.5%}.el-col-xs-push-21{position:relative;left:87.5%}.el-col-xs-22{width:91.66667%}.el-col-xs-offset-22{margin-left:91.66667%}.el-col-xs-pull-22{position:relative;right:91.66667%}.el-col-xs-push-22{position:relative;left:91.66667%}.el-col-xs-23{width:95.83333%}.el-col-xs-offset-23{margin-left:95.83333%}.el-col-xs-pull-23{position:relative;right:95.83333%}.el-col-xs-push-23{position:relative;left:95.83333%}.el-col-xs-24{width:100%}.el-col-xs-offset-24{margin-left:100%}.el-col-xs-pull-24{position:relative;right:100%}.el-col-xs-push-24{position:relative;left:100%}}@media only screen and (min-width:768px){.el-col-sm-0{display:none;width:0}.el-col-sm-offset-0{margin-left:0}.el-col-sm-pull-0{position:relative;right:0}.el-col-sm-push-0{position:relative;left:0}.el-col-sm-1{width:4.16667%}.el-col-sm-offset-1{margin-left:4.16667%}.el-col-sm-pull-1{position:relative;right:4.16667%}.el-col-sm-push-1{position:relative;left:4.16667%}.el-col-sm-2{width:8.33333%}.el-col-sm-offset-2{margin-left:8.33333%}.el-col-sm-pull-2{position:relative;right:8.33333%}.el-col-sm-push-2{position:relative;left:8.33333%}.el-col-sm-3{width:12.5%}.el-col-sm-offset-3{margin-left:12.5%}.el-col-sm-pull-3{position:relative;right:12.5%}.el-col-sm-push-3{position:relative;left:12.5%}.el-col-sm-4{width:16.66667%}.el-col-sm-offset-4{margin-left:16.66667%}.el-col-sm-pull-4{position:relative;right:16.66667%}.el-col-sm-push-4{position:relative;left:16.66667%}.el-col-sm-5{width:20.83333%}.el-col-sm-offset-5{margin-left:20.83333%}.el-col-sm-pull-5{position:relative;right:20.83333%}.el-col-sm-push-5{position:relative;left:20.83333%}.el-col-sm-6{width:25%}.el-col-sm-offset-6{margin-left:25%}.el-col-sm-pull-6{position:relative;right:25%}.el-col-sm-push-6{position:relative;left:25%}.el-col-sm-7{width:29.16667%}.el-col-sm-offset-7{margin-left:29.16667%}.el-col-sm-pull-7{position:relative;right:29.16667%}.el-col-sm-push-7{position:relative;left:29.16667%}.el-col-sm-8{width:33.33333%}.el-col-sm-offset-8{margin-left:33.33333%}.el-col-sm-pull-8{position:relative;right:33.33333%}.el-col-sm-push-8{position:relative;left:33.33333%}.el-col-sm-9{width:37.5%}.el-col-sm-offset-9{margin-left:37.5%}.el-col-sm-pull-9{position:relative;right:37.5%}.el-col-sm-push-9{position:relative;left:37.5%}.el-col-sm-10{width:41.66667%}.el-col-sm-offset-10{margin-left:41.66667%}.el-col-sm-pull-10{position:relative;right:41.66667%}.el-col-sm-push-10{position:relative;left:41.66667%}.el-col-sm-11{width:45.83333%}.el-col-sm-offset-11{margin-left:45.83333%}.el-col-sm-pull-11{position:relative;right:45.83333%}.el-col-sm-push-11{position:relative;left:45.83333%}.el-col-sm-12{width:50%}.el-col-sm-offset-12{margin-left:50%}.el-col-sm-pull-12{position:relative;right:50%}.el-col-sm-push-12{position:relative;left:50%}.el-col-sm-13{width:54.16667%}.el-col-sm-offset-13{margin-left:54.16667%}.el-col-sm-pull-13{position:relative;right:54.16667%}.el-col-sm-push-13{position:relative;left:54.16667%}.el-col-sm-14{width:58.33333%}.el-col-sm-offset-14{margin-left:58.33333%}.el-col-sm-pull-14{position:relative;right:58.33333%}.el-col-sm-push-14{position:relative;left:58.33333%}.el-col-sm-15{width:62.5%}.el-col-sm-offset-15{margin-left:62.5%}.el-col-sm-pull-15{position:relative;right:62.5%}.el-col-sm-push-15{position:relative;left:62.5%}.el-col-sm-16{width:66.66667%}.el-col-sm-offset-16{margin-left:66.66667%}.el-col-sm-pull-16{position:relative;right:66.66667%}.el-col-sm-push-16{position:relative;left:66.66667%}.el-col-sm-17{width:70.83333%}.el-col-sm-offset-17{margin-left:70.83333%}.el-col-sm-pull-17{position:relative;right:70.83333%}.el-col-sm-push-17{position:relative;left:70.83333%}.el-col-sm-18{width:75%}.el-col-sm-offset-18{margin-left:75%}.el-col-sm-pull-18{position:relative;right:75%}.el-col-sm-push-18{position:relative;left:75%}.el-col-sm-19{width:79.16667%}.el-col-sm-offset-19{margin-left:79.16667%}.el-col-sm-pull-19{position:relative;right:79.16667%}.el-col-sm-push-19{position:relative;left:79.16667%}.el-col-sm-20{width:83.33333%}.el-col-sm-offset-20{margin-left:83.33333%}.el-col-sm-pull-20{position:relative;right:83.33333%}.el-col-sm-push-20{position:relative;left:83.33333%}.el-col-sm-21{width:87.5%}.el-col-sm-offset-21{margin-left:87.5%}.el-col-sm-pull-21{position:relative;right:87.5%}.el-col-sm-push-21{position:relative;left:87.5%}.el-col-sm-22{width:91.66667%}.el-col-sm-offset-22{margin-left:91.66667%}.el-col-sm-pull-22{position:relative;right:91.66667%}.el-col-sm-push-22{position:relative;left:91.66667%}.el-col-sm-23{width:95.83333%}.el-col-sm-offset-23{margin-left:95.83333%}.el-col-sm-pull-23{position:relative;right:95.83333%}.el-col-sm-push-23{position:relative;left:95.83333%}.el-col-sm-24{width:100%}.el-col-sm-offset-24{margin-left:100%}.el-col-sm-pull-24{position:relative;right:100%}.el-col-sm-push-24{position:relative;left:100%}}@media only screen and (min-width:992px){.el-col-md-0{display:none;width:0}.el-col-md-offset-0{margin-left:0}.el-col-md-pull-0{position:relative;right:0}.el-col-md-push-0{position:relative;left:0}.el-col-md-1{width:4.16667%}.el-col-md-offset-1{margin-left:4.16667%}.el-col-md-pull-1{position:relative;right:4.16667%}.el-col-md-push-1{position:relative;left:4.16667%}.el-col-md-2{width:8.33333%}.el-col-md-offset-2{margin-left:8.33333%}.el-col-md-pull-2{position:relative;right:8.33333%}.el-col-md-push-2{position:relative;left:8.33333%}.el-col-md-3{width:12.5%}.el-col-md-offset-3{margin-left:12.5%}.el-col-md-pull-3{position:relative;right:12.5%}.el-col-md-push-3{position:relative;left:12.5%}.el-col-md-4{width:16.66667%}.el-col-md-offset-4{margin-left:16.66667%}.el-col-md-pull-4{position:relative;right:16.66667%}.el-col-md-push-4{position:relative;left:16.66667%}.el-col-md-5{width:20.83333%}.el-col-md-offset-5{margin-left:20.83333%}.el-col-md-pull-5{position:relative;right:20.83333%}.el-col-md-push-5{position:relative;left:20.83333%}.el-col-md-6{width:25%}.el-col-md-offset-6{margin-left:25%}.el-col-md-pull-6{position:relative;right:25%}.el-col-md-push-6{position:relative;left:25%}.el-col-md-7{width:29.16667%}.el-col-md-offset-7{margin-left:29.16667%}.el-col-md-pull-7{position:relative;right:29.16667%}.el-col-md-push-7{position:relative;left:29.16667%}.el-col-md-8{width:33.33333%}.el-col-md-offset-8{margin-left:33.33333%}.el-col-md-pull-8{position:relative;right:33.33333%}.el-col-md-push-8{position:relative;left:33.33333%}.el-col-md-9{width:37.5%}.el-col-md-offset-9{margin-left:37.5%}.el-col-md-pull-9{position:relative;right:37.5%}.el-col-md-push-9{position:relative;left:37.5%}.el-col-md-10{width:41.66667%}.el-col-md-offset-10{margin-left:41.66667%}.el-col-md-pull-10{position:relative;right:41.66667%}.el-col-md-push-10{position:relative;left:41.66667%}.el-col-md-11{width:45.83333%}.el-col-md-offset-11{margin-left:45.83333%}.el-col-md-pull-11{position:relative;right:45.83333%}.el-col-md-push-11{position:relative;left:45.83333%}.el-col-md-12{width:50%}.el-col-md-offset-12{margin-left:50%}.el-col-md-pull-12{position:relative;right:50%}.el-col-md-push-12{position:relative;left:50%}.el-col-md-13{width:54.16667%}.el-col-md-offset-13{margin-left:54.16667%}.el-col-md-pull-13{position:relative;right:54.16667%}.el-col-md-push-13{position:relative;left:54.16667%}.el-col-md-14{width:58.33333%}.el-col-md-offset-14{margin-left:58.33333%}.el-col-md-pull-14{position:relative;right:58.33333%}.el-col-md-push-14{position:relative;left:58.33333%}.el-col-md-15{width:62.5%}.el-col-md-offset-15{margin-left:62.5%}.el-col-md-pull-15{position:relative;right:62.5%}.el-col-md-push-15{position:relative;left:62.5%}.el-col-md-16{width:66.66667%}.el-col-md-offset-16{margin-left:66.66667%}.el-col-md-pull-16{position:relative;right:66.66667%}.el-col-md-push-16{position:relative;left:66.66667%}.el-col-md-17{width:70.83333%}.el-col-md-offset-17{margin-left:70.83333%}.el-col-md-pull-17{position:relative;right:70.83333%}.el-col-md-push-17{position:relative;left:70.83333%}.el-col-md-18{width:75%}.el-col-md-offset-18{margin-left:75%}.el-col-md-pull-18{position:relative;right:75%}.el-col-md-push-18{position:relative;left:75%}.el-col-md-19{width:79.16667%}.el-col-md-offset-19{margin-left:79.16667%}.el-col-md-pull-19{position:relative;right:79.16667%}.el-col-md-push-19{position:relative;left:79.16667%}.el-col-md-20{width:83.33333%}.el-col-md-offset-20{margin-left:83.33333%}.el-col-md-pull-20{position:relative;right:83.33333%}.el-col-md-push-20{position:relative;left:83.33333%}.el-col-md-21{width:87.5%}.el-col-md-offset-21{margin-left:87.5%}.el-col-md-pull-21{position:relative;right:87.5%}.el-col-md-push-21{position:relative;left:87.5%}.el-col-md-22{width:91.66667%}.el-col-md-offset-22{margin-left:91.66667%}.el-col-md-pull-22{position:relative;right:91.66667%}.el-col-md-push-22{position:relative;left:91.66667%}.el-col-md-23{width:95.83333%}.el-col-md-offset-23{margin-left:95.83333%}.el-col-md-pull-23{position:relative;right:95.83333%}.el-col-md-push-23{position:relative;left:95.83333%}.el-col-md-24{width:100%}.el-col-md-offset-24{margin-left:100%}.el-col-md-pull-24{position:relative;right:100%}.el-col-md-push-24{position:relative;left:100%}}@media only screen and (min-width:1200px){.el-col-lg-0{display:none;width:0}.el-col-lg-offset-0{margin-left:0}.el-col-lg-pull-0{position:relative;right:0}.el-col-lg-push-0{position:relative;left:0}.el-col-lg-1{width:4.16667%}.el-col-lg-offset-1{margin-left:4.16667%}.el-col-lg-pull-1{position:relative;right:4.16667%}.el-col-lg-push-1{position:relative;left:4.16667%}.el-col-lg-2{width:8.33333%}.el-col-lg-offset-2{margin-left:8.33333%}.el-col-lg-pull-2{position:relative;right:8.33333%}.el-col-lg-push-2{position:relative;left:8.33333%}.el-col-lg-3{width:12.5%}.el-col-lg-offset-3{margin-left:12.5%}.el-col-lg-pull-3{position:relative;right:12.5%}.el-col-lg-push-3{position:relative;left:12.5%}.el-col-lg-4{width:16.66667%}.el-col-lg-offset-4{margin-left:16.66667%}.el-col-lg-pull-4{position:relative;right:16.66667%}.el-col-lg-push-4{position:relative;left:16.66667%}.el-col-lg-5{width:20.83333%}.el-col-lg-offset-5{margin-left:20.83333%}.el-col-lg-pull-5{position:relative;right:20.83333%}.el-col-lg-push-5{position:relative;left:20.83333%}.el-col-lg-6{width:25%}.el-col-lg-offset-6{margin-left:25%}.el-col-lg-pull-6{position:relative;right:25%}.el-col-lg-push-6{position:relative;left:25%}.el-col-lg-7{width:29.16667%}.el-col-lg-offset-7{margin-left:29.16667%}.el-col-lg-pull-7{position:relative;right:29.16667%}.el-col-lg-push-7{position:relative;left:29.16667%}.el-col-lg-8{width:33.33333%}.el-col-lg-offset-8{margin-left:33.33333%}.el-col-lg-pull-8{position:relative;right:33.33333%}.el-col-lg-push-8{position:relative;left:33.33333%}.el-col-lg-9{width:37.5%}.el-col-lg-offset-9{margin-left:37.5%}.el-col-lg-pull-9{position:relative;right:37.5%}.el-col-lg-push-9{position:relative;left:37.5%}.el-col-lg-10{width:41.66667%}.el-col-lg-offset-10{margin-left:41.66667%}.el-col-lg-pull-10{position:relative;right:41.66667%}.el-col-lg-push-10{position:relative;left:41.66667%}.el-col-lg-11{width:45.83333%}.el-col-lg-offset-11{margin-left:45.83333%}.el-col-lg-pull-11{position:relative;right:45.83333%}.el-col-lg-push-11{position:relative;left:45.83333%}.el-col-lg-12{width:50%}.el-col-lg-offset-12{margin-left:50%}.el-col-lg-pull-12{position:relative;right:50%}.el-col-lg-push-12{position:relative;left:50%}.el-col-lg-13{width:54.16667%}.el-col-lg-offset-13{margin-left:54.16667%}.el-col-lg-pull-13{position:relative;right:54.16667%}.el-col-lg-push-13{position:relative;left:54.16667%}.el-col-lg-14{width:58.33333%}.el-col-lg-offset-14{margin-left:58.33333%}.el-col-lg-pull-14{position:relative;right:58.33333%}.el-col-lg-push-14{position:relative;left:58.33333%}.el-col-lg-15{width:62.5%}.el-col-lg-offset-15{margin-left:62.5%}.el-col-lg-pull-15{position:relative;right:62.5%}.el-col-lg-push-15{position:relative;left:62.5%}.el-col-lg-16{width:66.66667%}.el-col-lg-offset-16{margin-left:66.66667%}.el-col-lg-pull-16{position:relative;right:66.66667%}.el-col-lg-push-16{position:relative;left:66.66667%}.el-col-lg-17{width:70.83333%}.el-col-lg-offset-17{margin-left:70.83333%}.el-col-lg-pull-17{position:relative;right:70.83333%}.el-col-lg-push-17{position:relative;left:70.83333%}.el-col-lg-18{width:75%}.el-col-lg-offset-18{margin-left:75%}.el-col-lg-pull-18{position:relative;right:75%}.el-col-lg-push-18{position:relative;left:75%}.el-col-lg-19{width:79.16667%}.el-col-lg-offset-19{margin-left:79.16667%}.el-col-lg-pull-19{position:relative;right:79.16667%}.el-col-lg-push-19{position:relative;left:79.16667%}.el-col-lg-20{width:83.33333%}.el-col-lg-offset-20{margin-left:83.33333%}.el-col-lg-pull-20{position:relative;right:83.33333%}.el-col-lg-push-20{position:relative;left:83.33333%}.el-col-lg-21{width:87.5%}.el-col-lg-offset-21{margin-left:87.5%}.el-col-lg-pull-21{position:relative;right:87.5%}.el-col-lg-push-21{position:relative;left:87.5%}.el-col-lg-22{width:91.66667%}.el-col-lg-offset-22{margin-left:91.66667%}.el-col-lg-pull-22{position:relative;right:91.66667%}.el-col-lg-push-22{position:relative;left:91.66667%}.el-col-lg-23{width:95.83333%}.el-col-lg-offset-23{margin-left:95.83333%}.el-col-lg-pull-23{position:relative;right:95.83333%}.el-col-lg-push-23{position:relative;left:95.83333%}.el-col-lg-24{width:100%}.el-col-lg-offset-24{margin-left:100%}.el-col-lg-pull-24{position:relative;right:100%}.el-col-lg-push-24{position:relative;left:100%}}@media only screen and (min-width:1920px){.el-col-xl-0{display:none;width:0}.el-col-xl-offset-0{margin-left:0}.el-col-xl-pull-0{position:relative;right:0}.el-col-xl-push-0{position:relative;left:0}.el-col-xl-1{width:4.16667%}.el-col-xl-offset-1{margin-left:4.16667%}.el-col-xl-pull-1{position:relative;right:4.16667%}.el-col-xl-push-1{position:relative;left:4.16667%}.el-col-xl-2{width:8.33333%}.el-col-xl-offset-2{margin-left:8.33333%}.el-col-xl-pull-2{position:relative;right:8.33333%}.el-col-xl-push-2{position:relative;left:8.33333%}.el-col-xl-3{width:12.5%}.el-col-xl-offset-3{margin-left:12.5%}.el-col-xl-pull-3{position:relative;right:12.5%}.el-col-xl-push-3{position:relative;left:12.5%}.el-col-xl-4{width:16.66667%}.el-col-xl-offset-4{margin-left:16.66667%}.el-col-xl-pull-4{position:relative;right:16.66667%}.el-col-xl-push-4{position:relative;left:16.66667%}.el-col-xl-5{width:20.83333%}.el-col-xl-offset-5{margin-left:20.83333%}.el-col-xl-pull-5{position:relative;right:20.83333%}.el-col-xl-push-5{position:relative;left:20.83333%}.el-col-xl-6{width:25%}.el-col-xl-offset-6{margin-left:25%}.el-col-xl-pull-6{position:relative;right:25%}.el-col-xl-push-6{position:relative;left:25%}.el-col-xl-7{width:29.16667%}.el-col-xl-offset-7{margin-left:29.16667%}.el-col-xl-pull-7{position:relative;right:29.16667%}.el-col-xl-push-7{position:relative;left:29.16667%}.el-col-xl-8{width:33.33333%}.el-col-xl-offset-8{margin-left:33.33333%}.el-col-xl-pull-8{position:relative;right:33.33333%}.el-col-xl-push-8{position:relative;left:33.33333%}.el-col-xl-9{width:37.5%}.el-col-xl-offset-9{margin-left:37.5%}.el-col-xl-pull-9{position:relative;right:37.5%}.el-col-xl-push-9{position:relative;left:37.5%}.el-col-xl-10{width:41.66667%}.el-col-xl-offset-10{margin-left:41.66667%}.el-col-xl-pull-10{position:relative;right:41.66667%}.el-col-xl-push-10{position:relative;left:41.66667%}.el-col-xl-11{width:45.83333%}.el-col-xl-offset-11{margin-left:45.83333%}.el-col-xl-pull-11{position:relative;right:45.83333%}.el-col-xl-push-11{position:relative;left:45.83333%}.el-col-xl-12{width:50%}.el-col-xl-offset-12{margin-left:50%}.el-col-xl-pull-12{position:relative;right:50%}.el-col-xl-push-12{position:relative;left:50%}.el-col-xl-13{width:54.16667%}.el-col-xl-offset-13{margin-left:54.16667%}.el-col-xl-pull-13{position:relative;right:54.16667%}.el-col-xl-push-13{position:relative;left:54.16667%}.el-col-xl-14{width:58.33333%}.el-col-xl-offset-14{margin-left:58.33333%}.el-col-xl-pull-14{position:relative;right:58.33333%}.el-col-xl-push-14{position:relative;left:58.33333%}.el-col-xl-15{width:62.5%}.el-col-xl-offset-15{margin-left:62.5%}.el-col-xl-pull-15{position:relative;right:62.5%}.el-col-xl-push-15{position:relative;left:62.5%}.el-col-xl-16{width:66.66667%}.el-col-xl-offset-16{margin-left:66.66667%}.el-col-xl-pull-16{position:relative;right:66.66667%}.el-col-xl-push-16{position:relative;left:66.66667%}.el-col-xl-17{width:70.83333%}.el-col-xl-offset-17{margin-left:70.83333%}.el-col-xl-pull-17{position:relative;right:70.83333%}.el-col-xl-push-17{position:relative;left:70.83333%}.el-col-xl-18{width:75%}.el-col-xl-offset-18{margin-left:75%}.el-col-xl-pull-18{position:relative;right:75%}.el-col-xl-push-18{position:relative;left:75%}.el-col-xl-19{width:79.16667%}.el-col-xl-offset-19{margin-left:79.16667%}.el-col-xl-pull-19{position:relative;right:79.16667%}.el-col-xl-push-19{position:relative;left:79.16667%}.el-col-xl-20{width:83.33333%}.el-col-xl-offset-20{margin-left:83.33333%}.el-col-xl-pull-20{position:relative;right:83.33333%}.el-col-xl-push-20{position:relative;left:83.33333%}.el-col-xl-21{width:87.5%}.el-col-xl-offset-21{margin-left:87.5%}.el-col-xl-pull-21{position:relative;right:87.5%}.el-col-xl-push-21{position:relative;left:87.5%}.el-col-xl-22{width:91.66667%}.el-col-xl-offset-22{margin-left:91.66667%}.el-col-xl-pull-22{position:relative;right:91.66667%}.el-col-xl-push-22{position:relative;left:91.66667%}.el-col-xl-23{width:95.83333%}.el-col-xl-offset-23{margin-left:95.83333%}.el-col-xl-pull-23{position:relative;right:95.83333%}.el-col-xl-push-23{position:relative;left:95.83333%}.el-col-xl-24{width:100%}.el-col-xl-offset-24{margin-left:100%}.el-col-xl-pull-24{position:relative;right:100%}.el-col-xl-push-24{position:relative;left:100%}}.el-upload{display:inline-block;text-align:center;cursor:pointer;outline:0}.el-upload__input{display:none}.el-upload__tip{font-size:12px;color:#606266;margin-top:7px}.el-upload iframe{position:absolute;z-index:-1;top:0;left:0;opacity:0;filter:alpha(opacity=0)}.el-upload--picture-card{background-color:#fbfdff;border:1px dashed #c0ccda;border-radius:6px;box-sizing:border-box;width:148px;height:148px;line-height:146px;vertical-align:top}.el-upload--picture-card i{font-size:28px;color:#8c939d}.el-upload--picture-card:hover,.el-upload:focus{border-color:#409eff;color:#409eff}.el-upload:focus .el-upload-dragger{border-color:#409eff}.el-upload-dragger{background-color:#fff;border:1px dashed #d9d9d9;border-radius:6px;box-sizing:border-box;width:360px;height:180px;text-align:center;position:relative;overflow:hidden}.el-upload-dragger .el-icon-upload{font-size:67px;color:#c0c4cc;margin:40px 0 16px;line-height:50px}.el-upload-dragger+.el-upload__tip{text-align:center}.el-upload-dragger~.el-upload__files{border-top:1px solid #dcdfe6;margin-top:7px;padding-top:5px}.el-upload-dragger .el-upload__text{color:#606266;font-size:14px;text-align:center}.el-upload-dragger .el-upload__text em{color:#409eff;font-style:normal}.el-upload-dragger:hover{border-color:#409eff}.el-upload-dragger.is-dragover{background-color:rgba(32,159,255,.06);border:2px dashed #409eff}.el-upload-list{margin:0;padding:0;list-style:none}.el-upload-list__item{transition:all .5s cubic-bezier(.55,0,.1,1);font-size:14px;color:#606266;line-height:1.8;margin-top:5px;position:relative;box-sizing:border-box;border-radius:4px;width:100%}.el-upload-list__item .el-progress{position:absolute;top:20px;width:100%}.el-upload-list__item .el-progress__text{position:absolute;right:0;top:-13px}.el-upload-list__item .el-progress-bar{margin-right:0;padding-right:0}.el-upload-list__item:first-child{margin-top:10px}.el-upload-list__item .el-icon-upload-success{color:#67c23a}.el-upload-list__item .el-icon-close{display:none;position:absolute;top:5px;right:5px;cursor:pointer;opacity:.75;color:#606266}.el-upload-list__item .el-icon-close:hover{opacity:1}.el-upload-list__item .el-icon-close-tip{display:none;position:absolute;top:5px;right:5px;font-size:12px;cursor:pointer;opacity:1;color:#409eff}.el-upload-list__item:hover{background-color:#f5f7fa}.el-upload-list__item:hover .el-icon-close{display:inline-block}.el-upload-list__item:hover .el-progress__text{display:none}.el-upload-list__item.is-success .el-upload-list__item-status-label{display:block}.el-upload-list__item.is-success .el-upload-list__item-name:focus,.el-upload-list__item.is-success .el-upload-list__item-name:hover{color:#409eff;cursor:pointer}.el-upload-list__item.is-success:focus:not(:hover) .el-icon-close-tip{display:inline-block}.el-upload-list__item.is-success:active .el-icon-close-tip,.el-upload-list__item.is-success:focus .el-upload-list__item-status-label,.el-upload-list__item.is-success:hover .el-upload-list__item-status-label,.el-upload-list__item.is-success:not(.focusing):focus .el-icon-close-tip{display:none}.el-upload-list.is-disabled .el-upload-list__item:hover .el-upload-list__item-status-label{display:block}.el-upload-list__item-name{color:#606266;display:block;margin-right:40px;overflow:hidden;padding-left:4px;text-overflow:ellipsis;transition:color .3s;white-space:nowrap}.el-upload-list__item-name [class^=el-icon]{height:100%;margin-right:7px;color:#909399;line-height:inherit}.el-upload-list__item-status-label{position:absolute;right:5px;top:0;line-height:inherit;display:none}.el-upload-list__item-delete{position:absolute;right:10px;top:0;font-size:12px;color:#606266;display:none}.el-upload-list__item-delete:hover{color:#409eff}.el-upload-list--picture-card{margin:0;display:inline;vertical-align:top}.el-upload-list--picture-card .el-upload-list__item{overflow:hidden;background-color:#fff;border:1px solid #c0ccda;border-radius:6px;box-sizing:border-box;width:148px;height:148px;margin:0 8px 8px 0;display:inline-block}.el-upload-list--picture-card .el-upload-list__item .el-icon-check,.el-upload-list--picture-card .el-upload-list__item .el-icon-circle-check{color:#fff}.el-upload-list--picture-card .el-upload-list__item .el-icon-close,.el-upload-list--picture-card .el-upload-list__item:hover .el-upload-list__item-status-label{display:none}.el-upload-list--picture-card .el-upload-list__item:hover .el-progress__text{display:block}.el-upload-list--picture-card .el-upload-list__item-name{display:none}.el-upload-list--picture-card .el-upload-list__item-thumbnail{width:100%;height:100%}.el-upload-list--picture-card .el-upload-list__item-status-label{position:absolute;right:-15px;top:-6px;width:40px;height:24px;background:#13ce66;text-align:center;transform:rotate(45deg);box-shadow:0 0 1pc 1px rgba(0,0,0,.2)}.el-upload-list--picture-card .el-upload-list__item-status-label i{font-size:12px;margin-top:11px;transform:rotate(-45deg)}.el-upload-list--picture-card .el-upload-list__item-actions{position:absolute;width:100%;height:100%;left:0;top:0;cursor:default;text-align:center;color:#fff;opacity:0;font-size:20px;background-color:rgba(0,0,0,.5);transition:opacity .3s}.el-upload-list--picture-card .el-upload-list__item-actions:after{display:inline-block;content:\"\";height:100%;vertical-align:middle}.el-upload-list--picture-card .el-upload-list__item-actions span{display:none;cursor:pointer}.el-upload-list--picture-card .el-upload-list__item-actions span+span{margin-left:15px}.el-upload-list--picture-card .el-upload-list__item-actions .el-upload-list__item-delete{position:static;font-size:inherit;color:inherit}.el-upload-list--picture-card .el-upload-list__item-actions:hover{opacity:1}.el-upload-list--picture-card .el-upload-list__item-actions:hover span{display:inline-block}.el-upload-list--picture-card .el-progress{top:50%;left:50%;transform:translate(-50%,-50%);bottom:auto;width:126px}.el-upload-list--picture-card .el-progress .el-progress__text{top:50%}.el-upload-list--picture .el-upload-list__item{overflow:hidden;z-index:0;background-color:#fff;border:1px solid #c0ccda;border-radius:6px;box-sizing:border-box;margin-top:10px;padding:10px 10px 10px 90px;height:92px}.el-upload-list--picture .el-upload-list__item .el-icon-check,.el-upload-list--picture .el-upload-list__item .el-icon-circle-check{color:#fff}.el-upload-list--picture .el-upload-list__item:hover .el-upload-list__item-status-label{background:0 0;box-shadow:none;top:-2px;right:-12px}.el-upload-list--picture .el-upload-list__item:hover .el-progress__text{display:block}.el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name{line-height:70px;margin-top:0}.el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name i{display:none}.el-upload-list--picture .el-upload-list__item-thumbnail{vertical-align:middle;display:inline-block;width:70px;height:70px;float:left;position:relative;z-index:1;margin-left:-80px;background-color:#fff}.el-upload-list--picture .el-upload-list__item-name{display:block;margin-top:20px}.el-upload-list--picture .el-upload-list__item-name i{font-size:70px;line-height:1;position:absolute;left:9px;top:10px}.el-upload-list--picture .el-upload-list__item-status-label{position:absolute;right:-17px;top:-7px;width:46px;height:26px;background:#13ce66;text-align:center;transform:rotate(45deg);box-shadow:0 1px 1px #ccc}.el-upload-list--picture .el-upload-list__item-status-label i{font-size:12px;margin-top:12px;transform:rotate(-45deg)}.el-upload-list--picture .el-progress{position:relative;top:-7px}.el-upload-cover{position:absolute;left:0;top:0;width:100%;height:100%;overflow:hidden;z-index:10;cursor:default}.el-upload-cover:after{display:inline-block;height:100%;vertical-align:middle}.el-upload-cover img{display:block;width:100%;height:100%}.el-upload-cover__label{position:absolute;right:-15px;top:-6px;width:40px;height:24px;background:#13ce66;text-align:center;transform:rotate(45deg);box-shadow:0 0 1pc 1px rgba(0,0,0,.2)}.el-upload-cover__label i{font-size:12px;margin-top:11px;transform:rotate(-45deg);color:#fff}.el-upload-cover__progress{display:inline-block;vertical-align:middle;position:static;width:243px}.el-upload-cover__progress+.el-upload__inner{opacity:0}.el-upload-cover__content{position:absolute;top:0;left:0;width:100%;height:100%}.el-upload-cover__interact{position:absolute;bottom:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.72);text-align:center}.el-upload-cover__interact .btn{display:inline-block;color:#fff;font-size:14px;cursor:pointer;vertical-align:middle;transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);margin-top:60px}.el-upload-cover__interact .btn span{opacity:0;transition:opacity .15s linear}.el-upload-cover__interact .btn:not(:first-child){margin-left:35px}.el-upload-cover__interact .btn:hover{transform:translateY(-13px)}.el-upload-cover__interact .btn:hover span{opacity:1}.el-upload-cover__interact .btn i{color:#fff;display:block;font-size:24px;line-height:inherit;margin:0 auto 5px}.el-upload-cover__title{position:absolute;bottom:0;left:0;background-color:#fff;height:36px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:400;text-align:left;padding:0 10px;margin:0;line-height:36px;font-size:14px;color:#303133}.el-upload-cover+.el-upload__inner{opacity:0;position:relative;z-index:1}.el-progress{position:relative;line-height:1}.el-progress__text{font-size:14px;color:#606266;display:inline-block;vertical-align:middle;margin-left:10px;line-height:1}.el-progress__text i{vertical-align:middle;display:block}.el-progress--circle,.el-progress--dashboard{display:inline-block}.el-progress--circle .el-progress__text,.el-progress--dashboard .el-progress__text{position:absolute;top:50%;left:0;width:100%;text-align:center;margin:0;transform:translateY(-50%)}.el-progress--circle .el-progress__text i,.el-progress--dashboard .el-progress__text i{vertical-align:middle;display:inline-block}.el-progress--without-text .el-progress__text{display:none}.el-progress--without-text .el-progress-bar{padding-right:0;margin-right:0;display:block}.el-progress-bar,.el-progress-bar__inner:after,.el-progress-bar__innerText,.el-spinner{display:inline-block;vertical-align:middle}.el-progress--text-inside .el-progress-bar{padding-right:0;margin-right:0}.el-progress.is-success .el-progress-bar__inner{background-color:#67c23a}.el-progress.is-success .el-progress__text{color:#67c23a}.el-progress.is-warning .el-progress-bar__inner{background-color:#e6a23c}.el-progress.is-warning .el-progress__text{color:#e6a23c}.el-progress.is-exception .el-progress-bar__inner{background-color:#f56c6c}.el-progress.is-exception .el-progress__text{color:#f56c6c}.el-progress-bar{padding-right:50px;width:100%;margin-right:-55px;box-sizing:border-box}.el-progress-bar__outer{height:6px;border-radius:100px;background-color:#ebeef5;overflow:hidden;position:relative;vertical-align:middle}.el-progress-bar__inner{position:absolute;left:0;top:0;height:100%;background-color:#409eff;text-align:right;border-radius:100px;line-height:1;white-space:nowrap;transition:width .6s ease}.el-card,.el-message{border-radius:4px;overflow:hidden}.el-progress-bar__inner:after{height:100%}.el-progress-bar__innerText{color:#fff;font-size:12px;margin:0 5px}@keyframes progress{0%{background-position:0 0}to{background-position:32px 0}}.el-time-spinner{width:100%;white-space:nowrap}.el-spinner-inner{animation:rotate 2s linear infinite;width:50px;height:50px}.el-spinner-inner .path{stroke:#ececec;stroke-linecap:round;animation:dash 1.5s ease-in-out infinite}@keyframes rotate{to{transform:rotate(1turn)}}@keyframes dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}.el-message{min-width:380px;box-sizing:border-box;border:1px solid #ebeef5;position:fixed;left:50%;top:20px;transform:translateX(-50%);background-color:#edf2fc;transition:opacity .3s,transform .4s,top .4s;padding:15px 15px 15px 20px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.el-message.is-center{-ms-flex-pack:center;justify-content:center}.el-message.is-closable .el-message__content{padding-right:16px}.el-message p{margin:0}.el-message--info .el-message__content{color:#909399}.el-message--success{background-color:#f0f9eb;border-color:#e1f3d8}.el-message--success .el-message__content{color:#67c23a}.el-message--warning{background-color:#fdf6ec;border-color:#faecd8}.el-message--warning .el-message__content{color:#e6a23c}.el-message--error{background-color:#fef0f0;border-color:#fde2e2}.el-message--error .el-message__content{color:#f56c6c}.el-message__icon{margin-right:10px}.el-message__content{padding:0;font-size:14px;line-height:1}.el-message__closeBtn{position:absolute;top:50%;right:15px;transform:translateY(-50%);cursor:pointer;color:#c0c4cc;font-size:16px}.el-message__closeBtn:hover{color:#909399}.el-message .el-icon-success{color:#67c23a}.el-message .el-icon-error{color:#f56c6c}.el-message .el-icon-info{color:#909399}.el-message .el-icon-warning{color:#e6a23c}.el-message-fade-enter,.el-message-fade-leave-active{opacity:0;transform:translate(-50%,-100%)}.el-badge{position:relative;vertical-align:middle;display:inline-block}.el-badge__content{background-color:#f56c6c;border-radius:10px;color:#fff;display:inline-block;font-size:12px;height:18px;line-height:18px;padding:0 6px;text-align:center;white-space:nowrap;border:1px solid #fff}.el-badge__content.is-fixed{position:absolute;top:0;right:10px;transform:translateY(-50%) translateX(100%)}.el-rate__icon,.el-rate__item{position:relative;display:inline-block}.el-badge__content.is-fixed.is-dot{right:5px}.el-badge__content.is-dot{height:8px;width:8px;padding:0;right:0;border-radius:50%}.el-badge__content--primary{background-color:#409eff}.el-badge__content--success{background-color:#67c23a}.el-badge__content--warning{background-color:#e6a23c}.el-badge__content--info{background-color:#909399}.el-badge__content--danger{background-color:#f56c6c}.el-card{border:1px solid #ebeef5;background-color:#fff;color:#303133;transition:.3s}.el-card.is-always-shadow,.el-card.is-hover-shadow:focus,.el-card.is-hover-shadow:hover{box-shadow:0 2px 12px 0 rgba(0,0,0,.1)}.el-card__header{padding:18px 20px;border-bottom:1px solid #ebeef5;box-sizing:border-box}.el-card__body{padding:20px}.el-rate{height:20px;line-height:1}.el-rate__item{font-size:0;vertical-align:middle}.el-rate__icon{font-size:18px;margin-right:6px;color:#c0c4cc;transition:.3s}.el-rate__decimal,.el-rate__icon .path2{position:absolute;top:0;left:0}.el-rate__icon.hover{transform:scale(1.15)}.el-rate__decimal{display:inline-block;overflow:hidden}.el-step.is-vertical,.el-steps{display:-ms-flexbox}.el-rate__text{font-size:14px;vertical-align:middle}.el-steps{display:-ms-flexbox;display:flex}.el-steps--simple{padding:13px 8%;border-radius:4px;background:#f5f7fa}.el-steps--horizontal{white-space:nowrap}.el-steps--vertical{height:100%;-ms-flex-flow:column;flex-flow:column}.el-step{position:relative;-ms-flex-negative:1;flex-shrink:1}.el-step:last-of-type .el-step__line{display:none}.el-step:last-of-type.is-flex{-ms-flex-preferred-size:auto!important;flex-basis:auto!important;-ms-flex-negative:0;flex-shrink:0;-ms-flex-positive:0;flex-grow:0}.el-step:last-of-type .el-step__description,.el-step:last-of-type .el-step__main{padding-right:0}.el-step__head{position:relative;width:100%}.el-step__head.is-process{color:#303133;border-color:#303133}.el-step__head.is-wait{color:#c0c4cc;border-color:#c0c4cc}.el-step__head.is-success{color:#67c23a;border-color:#67c23a}.el-step__head.is-error{color:#f56c6c;border-color:#f56c6c}.el-step__head.is-finish{color:#409eff;border-color:#409eff}.el-step__icon{position:relative;z-index:1;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;width:24px;height:24px;font-size:14px;box-sizing:border-box;background:#fff;transition:.15s ease-out}.el-step__icon.is-text{border-radius:50%;border:2px solid;border-color:inherit}.el-step__icon.is-icon{width:40px}.el-step__icon-inner{display:inline-block;user-select:none;text-align:center;font-weight:700;line-height:1;color:inherit}.el-button,.el-checkbox,.el-image-viewer__btn,.el-step__icon-inner{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.el-step__icon-inner[class*=el-icon]:not(.is-status){font-size:25px;font-weight:400}.el-step__icon-inner.is-status{transform:translateY(1px)}.el-step__line{position:absolute;border-color:inherit;background-color:#c0c4cc}.el-step__line-inner{display:block;border-width:1px;border-style:solid;border-color:inherit;transition:.15s ease-out;box-sizing:border-box;width:0;height:0}.el-step__main{white-space:normal;text-align:left}.el-step__title{font-size:16px;line-height:38px}.el-step__title.is-process{font-weight:700;color:#303133}.el-step__title.is-wait{color:#c0c4cc}.el-step__title.is-success{color:#67c23a}.el-step__title.is-error{color:#f56c6c}.el-step__title.is-finish{color:#409eff}.el-step__description{padding-right:10%;margin-top:-5px;font-size:12px;line-height:20px;font-weight:400}.el-step__description.is-process{color:#303133}.el-step__description.is-wait{color:#c0c4cc}.el-step__description.is-success{color:#67c23a}.el-step__description.is-error{color:#f56c6c}.el-step__description.is-finish{color:#409eff}.el-step.is-horizontal{display:inline-block}.el-step.is-horizontal .el-step__line{height:2px;top:11px;left:0;right:0}.el-step.is-vertical{display:-ms-flexbox;display:flex}.el-step.is-vertical .el-step__head{-ms-flex-positive:0;flex-grow:0;width:24px}.el-step.is-vertical .el-step__main{padding-left:10px;-ms-flex-positive:1;flex-grow:1}.el-step.is-vertical .el-step__title{line-height:24px;padding-bottom:8px}.el-step.is-vertical .el-step__line{width:2px;top:0;bottom:0;left:11px}.el-step.is-vertical .el-step__icon.is-icon{width:24px}.el-step.is-center .el-step__head,.el-step.is-center .el-step__main{text-align:center}.el-step.is-center .el-step__description{padding-left:20%;padding-right:20%}.el-step.is-center .el-step__line{left:50%;right:-50%}.el-step.is-simple{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.el-step.is-simple .el-step__head{width:auto;font-size:0;padding-right:10px}.el-step.is-simple .el-step__icon{background:0 0;width:16px;height:16px;font-size:12px}.el-step.is-simple .el-step__icon-inner[class*=el-icon]:not(.is-status){font-size:18px}.el-step.is-simple .el-step__icon-inner.is-status{transform:scale(.8) translateY(1px)}.el-step.is-simple .el-step__main{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:stretch;align-items:stretch;-ms-flex-positive:1;flex-grow:1}.el-step.is-simple .el-step__title{font-size:16px;line-height:20px}.el-step.is-simple:not(:last-of-type) .el-step__title{max-width:50%;word-break:break-all}.el-step.is-simple .el-step__arrow{-ms-flex-positive:1;flex-grow:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.el-step.is-simple .el-step__arrow:after,.el-step.is-simple .el-step__arrow:before{content:\"\";display:inline-block;position:absolute;height:15px;width:1px;background:#c0c4cc}.el-step.is-simple .el-step__arrow:before{transform:rotate(-45deg) translateY(-4px);transform-origin:0 0}.el-step.is-simple .el-step__arrow:after{transform:rotate(45deg) translateY(4px);transform-origin:100% 100%}.el-step.is-simple:last-of-type .el-step__arrow{display:none}.el-carousel{position:relative}.el-carousel--horizontal{overflow-x:hidden}.el-carousel--vertical{overflow-y:hidden}.el-carousel__container{position:relative;height:300px}.el-carousel__arrow{border:none;outline:0;padding:0;margin:0;height:36px;width:36px;cursor:pointer;transition:.3s;border-radius:50%;background-color:rgba(31,45,61,.11);color:#fff;position:absolute;top:50%;z-index:10;transform:translateY(-50%);text-align:center;font-size:12px}.el-carousel__arrow--left{left:16px}.el-carousel__arrow--right{right:16px}.el-carousel__arrow:hover{background-color:rgba(31,45,61,.23)}.el-carousel__arrow i{cursor:pointer}.el-carousel__indicators{position:absolute;list-style:none;margin:0;padding:0;z-index:2}.el-carousel__indicators--horizontal{bottom:0;left:50%;transform:translateX(-50%)}.el-carousel__indicators--vertical{right:0;top:50%;transform:translateY(-50%)}.el-carousel__indicators--outside{bottom:26px;text-align:center;position:static;transform:none}.el-carousel__indicators--outside .el-carousel__indicator:hover button{opacity:.64}.el-carousel__indicators--outside button{background-color:#c0c4cc;opacity:.24}.el-carousel__indicators--labels{left:0;right:0;transform:none;text-align:center}.el-carousel__indicators--labels .el-carousel__button{height:auto;width:auto;padding:2px 18px;font-size:12px}.el-carousel__indicators--labels .el-carousel__indicator{padding:6px 4px}.el-carousel__indicator{background-color:transparent;cursor:pointer}.el-carousel__indicator:hover button{opacity:.72}.el-carousel__indicator--horizontal{display:inline-block;padding:12px 4px}.el-carousel__indicator--vertical{padding:4px 12px}.el-carousel__indicator--vertical .el-carousel__button{width:2px;height:15px}.el-carousel__indicator.is-active button{opacity:1}.el-carousel__button{display:block;opacity:.48;width:30px;height:2px;background-color:#fff;border:none;outline:0;padding:0;margin:0;cursor:pointer;transition:.3s}.el-carousel__item,.el-carousel__mask{height:100%;top:0;left:0;position:absolute}.carousel-arrow-left-enter,.carousel-arrow-left-leave-active{transform:translateY(-50%) translateX(-10px);opacity:0}.carousel-arrow-right-enter,.carousel-arrow-right-leave-active{transform:translateY(-50%) translateX(10px);opacity:0}.el-carousel__item{width:100%;display:inline-block;overflow:hidden;z-index:0}.el-carousel__item.is-active{z-index:2}.el-carousel__item--card,.el-carousel__item.is-animating{transition:transform .4s ease-in-out}.el-carousel__item--card{width:50%}.el-carousel__item--card.is-in-stage{cursor:pointer;z-index:1}.el-carousel__item--card.is-in-stage.is-hover .el-carousel__mask,.el-carousel__item--card.is-in-stage:hover .el-carousel__mask{opacity:.12}.el-carousel__item--card.is-active{z-index:2}.el-carousel__mask{width:100%;background-color:#fff;opacity:.24;transition:.2s}.el-fade-in-enter,.el-fade-in-leave-active,.el-fade-in-linear-enter,.el-fade-in-linear-leave,.el-fade-in-linear-leave-active,.fade-in-linear-enter,.fade-in-linear-leave,.fade-in-linear-leave-active{opacity:0}.el-fade-in-linear-enter-active,.el-fade-in-linear-leave-active,.fade-in-linear-enter-active,.fade-in-linear-leave-active{transition:opacity .2s linear}.el-fade-in-enter-active,.el-fade-in-leave-active,.el-zoom-in-center-enter-active,.el-zoom-in-center-leave-active{transition:all .3s cubic-bezier(.55,0,.1,1)}.el-zoom-in-center-enter,.el-zoom-in-center-leave-active{opacity:0;transform:scaleX(0)}.el-zoom-in-top-enter-active,.el-zoom-in-top-leave-active{opacity:1;transform:scaleY(1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);transform-origin:center top}.el-zoom-in-top-enter,.el-zoom-in-top-leave-active{opacity:0;transform:scaleY(0)}.el-zoom-in-bottom-enter-active,.el-zoom-in-bottom-leave-active{opacity:1;transform:scaleY(1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);transform-origin:center bottom}.el-zoom-in-bottom-enter,.el-zoom-in-bottom-leave-active{opacity:0;transform:scaleY(0)}.el-zoom-in-left-enter-active,.el-zoom-in-left-leave-active{opacity:1;transform:scale(1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);transform-origin:top left}.el-zoom-in-left-enter,.el-zoom-in-left-leave-active{opacity:0;transform:scale(.45)}.collapse-transition{transition:height .3s ease-in-out,padding-top .3s ease-in-out,padding-bottom .3s ease-in-out}.horizontal-collapse-transition{transition:width .3s ease-in-out,padding-left .3s ease-in-out,padding-right .3s ease-in-out}.el-list-enter-active,.el-list-leave-active{transition:all 1s}.el-list-enter,.el-list-leave-active{opacity:0;transform:translateY(-30px)}.el-opacity-transition{transition:opacity .3s cubic-bezier(.55,0,.1,1)}.el-collapse{border-top:1px solid #ebeef5;border-bottom:1px solid #ebeef5}.el-collapse-item.is-disabled .el-collapse-item__header{color:#bbb;cursor:not-allowed}.el-collapse-item__header{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;height:48px;line-height:48px;background-color:#fff;color:#303133;cursor:pointer;border-bottom:1px solid #ebeef5;font-size:13px;font-weight:500;transition:border-bottom-color .3s;outline:0}.el-collapse-item__arrow{margin:0 8px 0 auto;transition:transform .3s;font-weight:300}.el-collapse-item__arrow.is-active{transform:rotate(90deg)}.el-collapse-item__header.focusing:focus:not(:hover){color:#409eff}.el-collapse-item__header.is-active{border-bottom-color:transparent}.el-collapse-item__wrap{will-change:height;background-color:#fff;overflow:hidden;box-sizing:border-box;border-bottom:1px solid #ebeef5}.el-cascader__tags,.el-tag{-webkit-box-sizing:border-box}.el-collapse-item__content{padding-bottom:25px;font-size:13px;color:#303133;line-height:1.769230769230769}.el-collapse-item:last-child{margin-bottom:-1px}.el-popper .popper__arrow,.el-popper .popper__arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.el-popper .popper__arrow{border-width:6px;filter:drop-shadow(0 2px 12px rgba(0,0,0,.03))}.el-popper .popper__arrow:after{content:\" \";border-width:6px}.el-popper[x-placement^=top]{margin-bottom:12px}.el-popper[x-placement^=top] .popper__arrow{bottom:-6px;left:50%;margin-right:3px;border-top-color:#ebeef5;border-bottom-width:0}.el-popper[x-placement^=top] .popper__arrow:after{bottom:1px;margin-left:-6px;border-top-color:#fff;border-bottom-width:0}.el-popper[x-placement^=bottom]{margin-top:12px}.el-popper[x-placement^=bottom] .popper__arrow{top:-6px;left:50%;margin-right:3px;border-top-width:0;border-bottom-color:#ebeef5}.el-popper[x-placement^=bottom] .popper__arrow:after{top:1px;margin-left:-6px;border-top-width:0;border-bottom-color:#fff}.el-popper[x-placement^=right]{margin-left:12px}.el-popper[x-placement^=right] .popper__arrow{top:50%;left:-6px;margin-bottom:3px;border-right-color:#ebeef5;border-left-width:0}.el-popper[x-placement^=right] .popper__arrow:after{bottom:-6px;left:1px;border-right-color:#fff;border-left-width:0}.el-popper[x-placement^=left]{margin-right:12px}.el-popper[x-placement^=left] .popper__arrow{top:50%;right:-6px;margin-bottom:3px;border-right-width:0;border-left-color:#ebeef5}.el-popper[x-placement^=left] .popper__arrow:after{right:1px;bottom:-6px;margin-left:-6px;border-right-width:0;border-left-color:#fff}.el-tag{background-color:#ecf5ff;border:1px solid #d9ecff;display:inline-block;height:32px;padding:0 10px;line-height:30px;font-size:12px;color:#409eff;border-radius:4px;box-sizing:border-box;white-space:nowrap}.el-tag.is-hit{border-color:#409eff}.el-tag .el-tag__close{color:#409eff}.el-tag .el-tag__close:hover{color:#fff;background-color:#409eff}.el-tag.el-tag--info{background-color:#f4f4f5;border-color:#e9e9eb;color:#909399}.el-tag.el-tag--info.is-hit{border-color:#909399}.el-tag.el-tag--info .el-tag__close{color:#909399}.el-tag.el-tag--info .el-tag__close:hover{color:#fff;background-color:#909399}.el-tag.el-tag--success{background-color:#f0f9eb;border-color:#e1f3d8;color:#67c23a}.el-tag.el-tag--success.is-hit{border-color:#67c23a}.el-tag.el-tag--success .el-tag__close{color:#67c23a}.el-tag.el-tag--success .el-tag__close:hover{color:#fff;background-color:#67c23a}.el-tag.el-tag--warning{background-color:#fdf6ec;border-color:#faecd8;color:#e6a23c}.el-tag.el-tag--warning.is-hit{border-color:#e6a23c}.el-tag.el-tag--warning .el-tag__close{color:#e6a23c}.el-tag.el-tag--warning .el-tag__close:hover{color:#fff;background-color:#e6a23c}.el-tag.el-tag--danger{background-color:#fef0f0;border-color:#fde2e2;color:#f56c6c}.el-tag.el-tag--danger.is-hit{border-color:#f56c6c}.el-tag.el-tag--danger .el-tag__close{color:#f56c6c}.el-tag.el-tag--danger .el-tag__close:hover{color:#fff;background-color:#f56c6c}.el-tag .el-icon-close{border-radius:50%;text-align:center;position:relative;cursor:pointer;font-size:12px;height:16px;width:16px;line-height:16px;vertical-align:middle;top:-1px;right:-5px}.el-tag .el-icon-close:before{display:block}.el-tag--dark{background-color:#409eff;color:#fff}.el-tag--dark,.el-tag--dark.is-hit{border-color:#409eff}.el-tag--dark .el-tag__close{color:#fff}.el-tag--dark .el-tag__close:hover{color:#fff;background-color:#66b1ff}.el-tag--dark.el-tag--info{background-color:#909399;border-color:#909399;color:#fff}.el-tag--dark.el-tag--info.is-hit{border-color:#909399}.el-tag--dark.el-tag--info .el-tag__close{color:#fff}.el-tag--dark.el-tag--info .el-tag__close:hover{color:#fff;background-color:#a6a9ad}.el-tag--dark.el-tag--success{background-color:#67c23a;border-color:#67c23a;color:#fff}.el-tag--dark.el-tag--success.is-hit{border-color:#67c23a}.el-tag--dark.el-tag--success .el-tag__close{color:#fff}.el-tag--dark.el-tag--success .el-tag__close:hover{color:#fff;background-color:#85ce61}.el-tag--dark.el-tag--warning{background-color:#e6a23c;border-color:#e6a23c;color:#fff}.el-tag--dark.el-tag--warning.is-hit{border-color:#e6a23c}.el-tag--dark.el-tag--warning .el-tag__close{color:#fff}.el-tag--dark.el-tag--warning .el-tag__close:hover{color:#fff;background-color:#ebb563}.el-tag--dark.el-tag--danger{background-color:#f56c6c;border-color:#f56c6c;color:#fff}.el-tag--dark.el-tag--danger.is-hit{border-color:#f56c6c}.el-tag--dark.el-tag--danger .el-tag__close{color:#fff}.el-tag--dark.el-tag--danger .el-tag__close:hover{color:#fff;background-color:#f78989}.el-tag--plain{background-color:#fff;border-color:#b3d8ff;color:#409eff}.el-tag--plain.is-hit{border-color:#409eff}.el-tag--plain .el-tag__close{color:#409eff}.el-tag--plain .el-tag__close:hover{color:#fff;background-color:#409eff}.el-tag--plain.el-tag--info{background-color:#fff;border-color:#d3d4d6;color:#909399}.el-tag--plain.el-tag--info.is-hit{border-color:#909399}.el-tag--plain.el-tag--info .el-tag__close{color:#909399}.el-tag--plain.el-tag--info .el-tag__close:hover{color:#fff;background-color:#909399}.el-tag--plain.el-tag--success{background-color:#fff;border-color:#c2e7b0;color:#67c23a}.el-tag--plain.el-tag--success.is-hit{border-color:#67c23a}.el-tag--plain.el-tag--success .el-tag__close{color:#67c23a}.el-tag--plain.el-tag--success .el-tag__close:hover{color:#fff;background-color:#67c23a}.el-tag--plain.el-tag--warning{background-color:#fff;border-color:#f5dab1;color:#e6a23c}.el-tag--plain.el-tag--warning.is-hit{border-color:#e6a23c}.el-tag--plain.el-tag--warning .el-tag__close{color:#e6a23c}.el-tag--plain.el-tag--warning .el-tag__close:hover{color:#fff;background-color:#e6a23c}.el-tag--plain.el-tag--danger{background-color:#fff;border-color:#fbc4c4;color:#f56c6c}.el-tag--plain.el-tag--danger.is-hit{border-color:#f56c6c}.el-tag--plain.el-tag--danger .el-tag__close{color:#f56c6c}.el-tag--plain.el-tag--danger .el-tag__close:hover{color:#fff;background-color:#f56c6c}.el-tag--medium{height:28px;line-height:26px}.el-tag--medium .el-icon-close{transform:scale(.8)}.el-tag--small{height:24px;padding:0 8px;line-height:22px}.el-tag--small .el-icon-close{transform:scale(.8)}.el-tag--mini{height:20px;padding:0 5px;line-height:19px}.el-tag--mini .el-icon-close{margin-left:-3px;transform:scale(.7)}.el-cascader{display:inline-block;position:relative;font-size:14px;line-height:40px}.el-cascader:not(.is-disabled):hover .el-input__inner{cursor:pointer;border-color:#c0c4cc}.el-cascader .el-input .el-input__inner:focus,.el-cascader .el-input.is-focus .el-input__inner{border-color:#409eff}.el-cascader .el-input{cursor:pointer}.el-cascader .el-input .el-input__inner{text-overflow:ellipsis}.el-cascader .el-input .el-icon-arrow-down{transition:transform .3s;font-size:14px}.el-cascader .el-input .el-icon-arrow-down.is-reverse{transform:rotate(180deg)}.el-cascader .el-input .el-icon-circle-close:hover{color:#909399}.el-cascader--medium{font-size:14px;line-height:36px}.el-cascader--small{font-size:13px;line-height:32px}.el-cascader--mini{font-size:12px;line-height:28px}.el-cascader.is-disabled .el-cascader__label{z-index:2;color:#c0c4cc}.el-cascader__dropdown{margin:5px 0;font-size:14px;background:#fff;border:1px solid #e4e7ed;border-radius:4px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1)}.el-cascader__tags{position:absolute;left:0;right:30px;top:50%;transform:translateY(-50%);display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;line-height:normal;text-align:left;box-sizing:border-box}.el-cascader__tags .el-tag{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;max-width:100%;margin:2px 0 2px 6px;text-overflow:ellipsis;background:#f0f2f5}.el-cascader__tags .el-tag:not(.is-hit){border-color:transparent}.el-cascader__tags .el-tag>span{-ms-flex:1;flex:1;overflow:hidden;text-overflow:ellipsis}.el-cascader__tags .el-tag .el-icon-close{-ms-flex:none;flex:none;background-color:#c0c4cc;color:#fff}.el-cascader__tags .el-tag .el-icon-close:hover{background-color:#909399}.el-cascader__suggestion-panel{border-radius:4px}.el-cascader__suggestion-list{max-height:204px;margin:0;padding:6px 0;font-size:14px;color:#606266;text-align:center}.el-cascader__suggestion-item{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;height:34px;padding:0 15px;text-align:left;outline:0;cursor:pointer}.el-cascader__suggestion-item:focus,.el-cascader__suggestion-item:hover{background:#f5f7fa}.el-cascader__suggestion-item.is-checked{color:#409eff;font-weight:700}.el-cascader__suggestion-item>span{margin-right:10px}.el-cascader__empty-text{margin:10px 0;color:#c0c4cc}.el-cascader__search-input{-ms-flex:1;flex:1;height:24px;min-width:60px;margin:2px 0 2px 15px;padding:0;color:#606266;border:none;outline:0;box-sizing:border-box}.el-cascader__search-input::-webkit-input-placeholder{color:#c0c4cc}.el-cascader__search-input:-ms-input-placeholder,.el-cascader__search-input::-ms-input-placeholder{color:#c0c4cc}.el-cascader__search-input::placeholder{color:#c0c4cc}.el-color-predefine{display:-ms-flexbox;display:flex;font-size:12px;margin-top:8px;width:280px}.el-color-predefine__colors{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-wrap:wrap;flex-wrap:wrap}.el-color-predefine__color-selector{margin:0 0 8px 8px;width:20px;height:20px;border-radius:4px;cursor:pointer}.el-color-predefine__color-selector:nth-child(10n+1){margin-left:0}.el-color-predefine__color-selector.selected{box-shadow:0 0 3px 2px #409eff}.el-color-predefine__color-selector>div{display:-ms-flexbox;display:flex;height:100%;border-radius:3px}.el-color-predefine__color-selector.is-alpha{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)}.el-color-hue-slider{position:relative;box-sizing:border-box;width:280px;height:12px;background-color:red;padding:0 2px}.el-color-hue-slider__bar{position:relative;background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red);height:100%}.el-color-hue-slider__thumb{position:absolute;cursor:pointer;box-sizing:border-box;left:0;top:0;width:4px;height:100%;border-radius:1px;background:#fff;border:1px solid #f0f0f0;box-shadow:0 0 2px rgba(0,0,0,.6);z-index:1}.el-color-hue-slider.is-vertical{width:12px;height:180px;padding:2px 0}.el-color-hue-slider.is-vertical .el-color-hue-slider__bar{background:linear-gradient(180deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.el-color-hue-slider.is-vertical .el-color-hue-slider__thumb{left:0;top:0;width:100%;height:4px}.el-color-svpanel{position:relative;width:280px;height:180px}.el-color-svpanel__black,.el-color-svpanel__white{position:absolute;top:0;left:0;right:0;bottom:0}.el-color-svpanel__white{background:linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.el-color-svpanel__black{background:linear-gradient(0deg,#000,transparent)}.el-color-svpanel__cursor{position:absolute}.el-color-svpanel__cursor>div{cursor:head;width:4px;height:4px;box-shadow:0 0 0 1.5px #fff,inset 0 0 1px 1px rgba(0,0,0,.3),0 0 1px 2px rgba(0,0,0,.4);border-radius:50%;transform:translate(-2px,-2px)}.el-color-alpha-slider{position:relative;box-sizing:border-box;width:280px;height:12px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)}.el-color-alpha-slider__bar{position:relative;background:linear-gradient(90deg,hsla(0,0%,100%,0) 0,#fff);height:100%}.el-color-alpha-slider__thumb{position:absolute;cursor:pointer;box-sizing:border-box;left:0;top:0;width:4px;height:100%;border-radius:1px;background:#fff;border:1px solid #f0f0f0;box-shadow:0 0 2px rgba(0,0,0,.6);z-index:1}.el-color-alpha-slider.is-vertical{width:20px;height:180px}.el-color-alpha-slider.is-vertical .el-color-alpha-slider__bar{background:linear-gradient(180deg,hsla(0,0%,100%,0) 0,#fff)}.el-color-alpha-slider.is-vertical .el-color-alpha-slider__thumb{left:0;top:0;width:100%;height:4px}.el-color-dropdown{width:300px}.el-color-dropdown__main-wrapper{margin-bottom:6px}.el-color-dropdown__main-wrapper:after{content:\"\";display:table;clear:both}.el-color-dropdown__btns{margin-top:6px;text-align:right}.el-color-dropdown__value{float:left;line-height:26px;font-size:12px;color:#000;width:160px}.el-color-dropdown__btn{border:1px solid #dcdcdc;color:#333;line-height:24px;border-radius:2px;padding:0 20px;cursor:pointer;background-color:transparent;outline:0;font-size:12px}.el-color-dropdown__btn[disabled]{color:#ccc;cursor:not-allowed}.el-color-dropdown__btn:hover{color:#409eff;border-color:#409eff}.el-color-dropdown__link-btn{cursor:pointer;color:#409eff;text-decoration:none;padding:15px;font-size:12px}.el-color-dropdown__link-btn:hover{color:tint(#409eff,20%)}.el-color-picker{display:inline-block;position:relative;line-height:normal;height:40px}.el-color-picker.is-disabled .el-color-picker__trigger{cursor:not-allowed}.el-color-picker--medium{height:36px}.el-color-picker--medium .el-color-picker__trigger{height:36px;width:36px}.el-color-picker--medium .el-color-picker__mask{height:34px;width:34px}.el-color-picker--small{height:32px}.el-color-picker--small .el-color-picker__trigger{height:32px;width:32px}.el-color-picker--small .el-color-picker__mask{height:30px;width:30px}.el-color-picker--small .el-color-picker__empty,.el-color-picker--small .el-color-picker__icon{transform:translate3d(-50%,-50%,0) scale(.8)}.el-color-picker--mini{height:28px}.el-color-picker--mini .el-color-picker__trigger{height:28px;width:28px}.el-color-picker--mini .el-color-picker__mask{height:26px;width:26px}.el-color-picker--mini .el-color-picker__empty,.el-color-picker--mini .el-color-picker__icon{transform:translate3d(-50%,-50%,0) scale(.8)}.el-color-picker__mask{height:38px;width:38px;border-radius:4px;position:absolute;top:1px;left:1px;z-index:1;cursor:not-allowed;background-color:hsla(0,0%,100%,.7)}.el-color-picker__trigger{display:inline-block;box-sizing:border-box;height:40px;width:40px;padding:4px;border:1px solid #e6e6e6;border-radius:4px;font-size:0;position:relative;cursor:pointer}.el-color-picker__color{position:relative;display:block;box-sizing:border-box;border:1px solid #999;border-radius:2px;width:100%;height:100%;text-align:center}.el-color-picker__color.is-alpha{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)}.el-color-picker__color-inner{position:absolute;left:0;top:0;right:0;bottom:0}.el-color-picker__empty,.el-color-picker__icon{top:50%;left:50%;font-size:12px;position:absolute}.el-color-picker__empty{color:#999;transform:translate3d(-50%,-50%,0)}.el-color-picker__icon{display:inline-block;width:100%;transform:translate3d(-50%,-50%,0);color:#fff;text-align:center}.el-color-picker__panel{position:absolute;z-index:10;padding:6px;box-sizing:content-box;background-color:#fff;border:1px solid #ebeef5;border-radius:4px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1)}.el-textarea{position:relative;display:inline-block;width:100%;vertical-align:bottom;font-size:14px}.el-textarea__inner{display:block;resize:vertical;padding:5px 15px;line-height:1.5;box-sizing:border-box;width:100%;font-size:inherit;color:#606266;background-color:#fff;background-image:none;border:1px solid #dcdfe6;border-radius:4px;transition:border-color .2s cubic-bezier(.645,.045,.355,1)}.el-textarea__inner::-webkit-input-placeholder{color:#c0c4cc}.el-textarea__inner:-ms-input-placeholder,.el-textarea__inner::-ms-input-placeholder{color:#c0c4cc}.el-textarea__inner::placeholder{color:#c0c4cc}.el-textarea__inner:hover{border-color:#c0c4cc}.el-textarea__inner:focus{outline:0;border-color:#409eff}.el-textarea .el-input__count{color:#909399;background:#fff;position:absolute;font-size:12px;bottom:5px;right:10px}.el-textarea.is-disabled .el-textarea__inner{background-color:#f5f7fa;border-color:#e4e7ed;color:#c0c4cc;cursor:not-allowed}.el-textarea.is-disabled .el-textarea__inner::-webkit-input-placeholder{color:#c0c4cc}.el-textarea.is-disabled .el-textarea__inner:-ms-input-placeholder,.el-textarea.is-disabled .el-textarea__inner::-ms-input-placeholder{color:#c0c4cc}.el-textarea.is-disabled .el-textarea__inner::placeholder{color:#c0c4cc}.el-textarea.is-exceed .el-textarea__inner{border-color:#f56c6c}.el-textarea.is-exceed .el-input__count{color:#f56c6c}.el-input{position:relative;font-size:14px;display:inline-block;width:100%}.el-input::-webkit-scrollbar{z-index:11;width:6px}.el-input::-webkit-scrollbar:horizontal{height:6px}.el-input::-webkit-scrollbar-thumb{border-radius:5px;width:6px;background:#b4bccc}.el-input::-webkit-scrollbar-corner,.el-input::-webkit-scrollbar-track{background:#fff}.el-input::-webkit-scrollbar-track-piece{background:#fff;width:6px}.el-input .el-input__clear{color:#c0c4cc;font-size:14px;cursor:pointer;transition:color .2s cubic-bezier(.645,.045,.355,1)}.el-input .el-input__clear:hover{color:#909399}.el-input .el-input__count{height:100%;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;color:#909399;font-size:12px}.el-input .el-input__count .el-input__count-inner{background:#fff;line-height:normal;display:inline-block;padding:0 5px}.el-input__inner{-webkit-appearance:none;background-color:#fff;background-image:none;border-radius:4px;border:1px solid #dcdfe6;box-sizing:border-box;color:#606266;display:inline-block;font-size:inherit;height:40px;line-height:40px;outline:0;padding:0 15px;transition:border-color .2s cubic-bezier(.645,.045,.355,1);width:100%}.el-button,.el-transfer-panel{-webkit-box-sizing:border-box}.el-input__prefix,.el-input__suffix{position:absolute;top:0;-webkit-transition:all .3s;height:100%;color:#c0c4cc;text-align:center}.el-input__inner::-webkit-input-placeholder{color:#c0c4cc}.el-input__inner:-ms-input-placeholder,.el-input__inner::-ms-input-placeholder{color:#c0c4cc}.el-input__inner::placeholder{color:#c0c4cc}.el-input__inner:hover{border-color:#c0c4cc}.el-input.is-active .el-input__inner,.el-input__inner:focus{border-color:#409eff;outline:0}.el-input__suffix{right:5px;transition:all .3s}.el-input__suffix-inner{pointer-events:all}.el-input__prefix{left:5px;transition:all .3s}.el-input__icon{height:100%;width:25px;text-align:center;transition:all .3s;line-height:40px}.el-input__icon:after{content:\"\";height:100%;width:0;display:inline-block;vertical-align:middle}.el-input__validateIcon{pointer-events:none}.el-input.is-disabled .el-input__inner{background-color:#f5f7fa;border-color:#e4e7ed;color:#c0c4cc;cursor:not-allowed}.el-input.is-disabled .el-input__inner::-webkit-input-placeholder{color:#c0c4cc}.el-input.is-disabled .el-input__inner:-ms-input-placeholder,.el-input.is-disabled .el-input__inner::-ms-input-placeholder{color:#c0c4cc}.el-input.is-disabled .el-input__inner::placeholder{color:#c0c4cc}.el-input.is-disabled .el-input__icon{cursor:not-allowed}.el-input.is-exceed .el-input__inner{border-color:#f56c6c}.el-input.is-exceed .el-input__suffix .el-input__count{color:#f56c6c}.el-input--suffix .el-input__inner{padding-right:30px}.el-input--prefix .el-input__inner{padding-left:30px}.el-input--medium{font-size:14px}.el-input--medium .el-input__inner{height:36px;line-height:36px}.el-input--medium .el-input__icon{line-height:36px}.el-input--small{font-size:13px}.el-input--small .el-input__inner{height:32px;line-height:32px}.el-input--small .el-input__icon{line-height:32px}.el-input--mini{font-size:12px}.el-input--mini .el-input__inner{height:28px;line-height:28px}.el-input--mini .el-input__icon{line-height:28px}.el-input-group{line-height:normal;display:inline-table;width:100%;border-collapse:separate;border-spacing:0}.el-input-group>.el-input__inner{vertical-align:middle;display:table-cell}.el-input-group__append,.el-input-group__prepend{background-color:#f5f7fa;color:#909399;vertical-align:middle;display:table-cell;position:relative;border:1px solid #dcdfe6;border-radius:4px;padding:0 20px;width:1px;white-space:nowrap}.el-input-group--prepend .el-input__inner,.el-input-group__append{border-top-left-radius:0;border-bottom-left-radius:0}.el-input-group--append .el-input__inner,.el-input-group__prepend{border-top-right-radius:0;border-bottom-right-radius:0}.el-input-group__append:focus,.el-input-group__prepend:focus{outline:0}.el-input-group__append .el-button,.el-input-group__append .el-select,.el-input-group__prepend .el-button,.el-input-group__prepend .el-select{display:inline-block;margin:-10px -20px}.el-input-group__append button.el-button,.el-input-group__append div.el-select .el-input__inner,.el-input-group__append div.el-select:hover .el-input__inner,.el-input-group__prepend button.el-button,.el-input-group__prepend div.el-select .el-input__inner,.el-input-group__prepend div.el-select:hover .el-input__inner{border-color:transparent;background-color:transparent;color:inherit;border-top:0;border-bottom:0}.el-input-group__append .el-button,.el-input-group__append .el-input,.el-input-group__prepend .el-button,.el-input-group__prepend .el-input{font-size:inherit}.el-input-group__prepend{border-right:0}.el-input-group__append{border-left:0}.el-input-group--append .el-select .el-input.is-focus .el-input__inner,.el-input-group--prepend .el-select .el-input.is-focus .el-input__inner{border-color:transparent}.el-input__inner::-ms-clear{display:none;width:0;height:0}.el-button{display:inline-block;line-height:1;white-space:nowrap;cursor:pointer;background:#fff;border:1px solid #dcdfe6;color:#606266;-webkit-appearance:none;text-align:center;box-sizing:border-box;outline:0;margin:0;transition:.1s;font-weight:500;padding:12px 20px;font-size:14px;border-radius:4px}.el-button+.el-button{margin-left:10px}.el-button:focus,.el-button:hover{color:#409eff;border-color:#c6e2ff;background-color:#ecf5ff}.el-button:active{color:#3a8ee6;border-color:#3a8ee6;outline:0}.el-button::-moz-focus-inner{border:0}.el-button [class*=el-icon-]+span{margin-left:5px}.el-button.is-plain:focus,.el-button.is-plain:hover{background:#fff;border-color:#409eff;color:#409eff}.el-button.is-active,.el-button.is-plain:active{color:#3a8ee6;border-color:#3a8ee6}.el-button.is-plain:active{background:#fff;outline:0}.el-button.is-disabled,.el-button.is-disabled:focus,.el-button.is-disabled:hover{color:#c0c4cc;cursor:not-allowed;background-image:none;background-color:#fff;border-color:#ebeef5}.el-link,.el-transfer-panel__filter .el-icon-circle-close{cursor:pointer}.el-button.is-disabled.el-button--text{background-color:transparent}.el-button.is-disabled.is-plain,.el-button.is-disabled.is-plain:focus,.el-button.is-disabled.is-plain:hover{background-color:#fff;border-color:#ebeef5;color:#c0c4cc}.el-button.is-loading{position:relative;pointer-events:none}.el-button.is-loading:before{pointer-events:none;content:\"\";position:absolute;left:-1px;top:-1px;right:-1px;bottom:-1px;border-radius:inherit;background-color:hsla(0,0%,100%,.35)}.el-button.is-round{border-radius:20px;padding:12px 23px}.el-button.is-circle{border-radius:50%;padding:12px}.el-button--primary{color:#fff;background-color:#409eff;border-color:#409eff}.el-button--primary:focus,.el-button--primary:hover{background:#66b1ff;border-color:#66b1ff;color:#fff}.el-button--primary.is-active,.el-button--primary:active{background:#3a8ee6;border-color:#3a8ee6;color:#fff}.el-button--primary:active{outline:0}.el-button--primary.is-disabled,.el-button--primary.is-disabled:active,.el-button--primary.is-disabled:focus,.el-button--primary.is-disabled:hover{color:#fff;background-color:#a0cfff;border-color:#a0cfff}.el-button--primary.is-plain{color:#409eff;background:#ecf5ff;border-color:#b3d8ff}.el-button--primary.is-plain:focus,.el-button--primary.is-plain:hover{background:#409eff;border-color:#409eff;color:#fff}.el-button--primary.is-plain:active{background:#3a8ee6;border-color:#3a8ee6;color:#fff;outline:0}.el-button--primary.is-plain.is-disabled,.el-button--primary.is-plain.is-disabled:active,.el-button--primary.is-plain.is-disabled:focus,.el-button--primary.is-plain.is-disabled:hover{color:#8cc5ff;background-color:#ecf5ff;border-color:#d9ecff}.el-button--success{color:#fff;background-color:#67c23a;border-color:#67c23a}.el-button--success:focus,.el-button--success:hover{background:#85ce61;border-color:#85ce61;color:#fff}.el-button--success.is-active,.el-button--success:active{background:#5daf34;border-color:#5daf34;color:#fff}.el-button--success:active{outline:0}.el-button--success.is-disabled,.el-button--success.is-disabled:active,.el-button--success.is-disabled:focus,.el-button--success.is-disabled:hover{color:#fff;background-color:#b3e19d;border-color:#b3e19d}.el-button--success.is-plain{color:#67c23a;background:#f0f9eb;border-color:#c2e7b0}.el-button--success.is-plain:focus,.el-button--success.is-plain:hover{background:#67c23a;border-color:#67c23a;color:#fff}.el-button--success.is-plain:active{background:#5daf34;border-color:#5daf34;color:#fff;outline:0}.el-button--success.is-plain.is-disabled,.el-button--success.is-plain.is-disabled:active,.el-button--success.is-plain.is-disabled:focus,.el-button--success.is-plain.is-disabled:hover{color:#a4da89;background-color:#f0f9eb;border-color:#e1f3d8}.el-button--warning{color:#fff;background-color:#e6a23c;border-color:#e6a23c}.el-button--warning:focus,.el-button--warning:hover{background:#ebb563;border-color:#ebb563;color:#fff}.el-button--warning.is-active,.el-button--warning:active{background:#cf9236;border-color:#cf9236;color:#fff}.el-button--warning:active{outline:0}.el-button--warning.is-disabled,.el-button--warning.is-disabled:active,.el-button--warning.is-disabled:focus,.el-button--warning.is-disabled:hover{color:#fff;background-color:#f3d19e;border-color:#f3d19e}.el-button--warning.is-plain{color:#e6a23c;background:#fdf6ec;border-color:#f5dab1}.el-button--warning.is-plain:focus,.el-button--warning.is-plain:hover{background:#e6a23c;border-color:#e6a23c;color:#fff}.el-button--warning.is-plain:active{background:#cf9236;border-color:#cf9236;color:#fff;outline:0}.el-button--warning.is-plain.is-disabled,.el-button--warning.is-plain.is-disabled:active,.el-button--warning.is-plain.is-disabled:focus,.el-button--warning.is-plain.is-disabled:hover{color:#f0c78a;background-color:#fdf6ec;border-color:#faecd8}.el-button--danger{color:#fff;background-color:#f56c6c;border-color:#f56c6c}.el-button--danger:focus,.el-button--danger:hover{background:#f78989;border-color:#f78989;color:#fff}.el-button--danger.is-active,.el-button--danger:active{background:#dd6161;border-color:#dd6161;color:#fff}.el-button--danger:active{outline:0}.el-button--danger.is-disabled,.el-button--danger.is-disabled:active,.el-button--danger.is-disabled:focus,.el-button--danger.is-disabled:hover{color:#fff;background-color:#fab6b6;border-color:#fab6b6}.el-button--danger.is-plain{color:#f56c6c;background:#fef0f0;border-color:#fbc4c4}.el-button--danger.is-plain:focus,.el-button--danger.is-plain:hover{background:#f56c6c;border-color:#f56c6c;color:#fff}.el-button--danger.is-plain:active{background:#dd6161;border-color:#dd6161;color:#fff;outline:0}.el-button--danger.is-plain.is-disabled,.el-button--danger.is-plain.is-disabled:active,.el-button--danger.is-plain.is-disabled:focus,.el-button--danger.is-plain.is-disabled:hover{color:#f9a7a7;background-color:#fef0f0;border-color:#fde2e2}.el-button--info{color:#fff;background-color:#909399;border-color:#909399}.el-button--info:focus,.el-button--info:hover{background:#a6a9ad;border-color:#a6a9ad;color:#fff}.el-button--info.is-active,.el-button--info:active{background:#82848a;border-color:#82848a;color:#fff}.el-button--info:active{outline:0}.el-button--info.is-disabled,.el-button--info.is-disabled:active,.el-button--info.is-disabled:focus,.el-button--info.is-disabled:hover{color:#fff;background-color:#c8c9cc;border-color:#c8c9cc}.el-button--info.is-plain{color:#909399;background:#f4f4f5;border-color:#d3d4d6}.el-button--info.is-plain:focus,.el-button--info.is-plain:hover{background:#909399;border-color:#909399;color:#fff}.el-button--info.is-plain:active{background:#82848a;border-color:#82848a;color:#fff;outline:0}.el-button--info.is-plain.is-disabled,.el-button--info.is-plain.is-disabled:active,.el-button--info.is-plain.is-disabled:focus,.el-button--info.is-plain.is-disabled:hover{color:#bcbec2;background-color:#f4f4f5;border-color:#e9e9eb}.el-button--text,.el-button--text.is-disabled,.el-button--text.is-disabled:focus,.el-button--text.is-disabled:hover,.el-button--text:active{border-color:transparent}.el-button--medium{padding:10px 20px;font-size:14px;border-radius:4px}.el-button--mini,.el-button--small{font-size:12px;border-radius:3px}.el-button--medium.is-round{padding:10px 20px}.el-button--medium.is-circle{padding:10px}.el-button--small,.el-button--small.is-round{padding:9px 15px}.el-button--small.is-circle{padding:9px}.el-button--mini,.el-button--mini.is-round{padding:7px 15px}.el-button--mini.is-circle{padding:7px}.el-button--text{color:#409eff;background:0 0;padding-left:0;padding-right:0}.el-button--text:focus,.el-button--text:hover{color:#66b1ff;border-color:transparent;background-color:transparent}.el-button--text:active{color:#3a8ee6;background-color:transparent}.el-button-group{display:inline-block;vertical-align:middle}.el-button-group:after,.el-button-group:before{display:table;content:\"\"}.el-button-group:after{clear:both}.el-button-group>.el-button{float:left;position:relative}.el-button-group>.el-button+.el-button{margin-left:0}.el-button-group>.el-button.is-disabled{z-index:1}.el-button-group>.el-button:first-child{border-top-right-radius:0;border-bottom-right-radius:0}.el-button-group>.el-button:last-child{border-top-left-radius:0;border-bottom-left-radius:0}.el-button-group>.el-button:first-child:last-child{border-radius:4px}.el-button-group>.el-button:first-child:last-child.is-round{border-radius:20px}.el-button-group>.el-button:first-child:last-child.is-circle{border-radius:50%}.el-button-group>.el-button:not(:first-child):not(:last-child){border-radius:0}.el-button-group>.el-button:not(:last-child){margin-right:-1px}.el-button-group>.el-button.is-active,.el-button-group>.el-button:active,.el-button-group>.el-button:focus,.el-button-group>.el-button:hover{z-index:1}.el-button-group>.el-dropdown>.el-button{border-top-left-radius:0;border-bottom-left-radius:0;border-left-color:hsla(0,0%,100%,.5)}.el-button-group .el-button--primary:first-child{border-right-color:hsla(0,0%,100%,.5)}.el-button-group .el-button--primary:last-child{border-left-color:hsla(0,0%,100%,.5)}.el-button-group .el-button--primary:not(:first-child):not(:last-child){border-left-color:hsla(0,0%,100%,.5);border-right-color:hsla(0,0%,100%,.5)}.el-button-group .el-button--success:first-child{border-right-color:hsla(0,0%,100%,.5)}.el-button-group .el-button--success:last-child{border-left-color:hsla(0,0%,100%,.5)}.el-button-group .el-button--success:not(:first-child):not(:last-child){border-left-color:hsla(0,0%,100%,.5);border-right-color:hsla(0,0%,100%,.5)}.el-button-group .el-button--warning:first-child{border-right-color:hsla(0,0%,100%,.5)}.el-button-group .el-button--warning:last-child{border-left-color:hsla(0,0%,100%,.5)}.el-button-group .el-button--warning:not(:first-child):not(:last-child){border-left-color:hsla(0,0%,100%,.5);border-right-color:hsla(0,0%,100%,.5)}.el-button-group .el-button--danger:first-child{border-right-color:hsla(0,0%,100%,.5)}.el-button-group .el-button--danger:last-child{border-left-color:hsla(0,0%,100%,.5)}.el-button-group .el-button--danger:not(:first-child):not(:last-child){border-left-color:hsla(0,0%,100%,.5);border-right-color:hsla(0,0%,100%,.5)}.el-button-group .el-button--info:first-child{border-right-color:hsla(0,0%,100%,.5)}.el-button-group .el-button--info:last-child{border-left-color:hsla(0,0%,100%,.5)}.el-button-group .el-button--info:not(:first-child):not(:last-child){border-left-color:hsla(0,0%,100%,.5);border-right-color:hsla(0,0%,100%,.5)}.el-transfer{font-size:14px}.el-transfer__buttons{display:inline-block;vertical-align:middle;padding:0 30px}.el-transfer__button{display:block;margin:0 auto;padding:10px;border-radius:50%;color:#fff;background-color:#409eff;font-size:0}.el-transfer__button.is-with-texts{border-radius:4px}.el-transfer__button.is-disabled,.el-transfer__button.is-disabled:hover{border:1px solid #dcdfe6;background-color:#f5f7fa;color:#c0c4cc}.el-transfer__button:first-child{margin-bottom:10px}.el-transfer__button:nth-child(2){margin:0}.el-transfer__button i,.el-transfer__button span{font-size:14px}.el-transfer__button [class*=el-icon-]+span{margin-left:0}.el-transfer-panel{border:1px solid #ebeef5;border-radius:4px;overflow:hidden;background:#fff;display:inline-block;vertical-align:middle;width:200px;max-height:100%;box-sizing:border-box;position:relative}.el-transfer-panel__body{height:246px}.el-transfer-panel__body.is-with-footer{padding-bottom:40px}.el-transfer-panel__list{margin:0;padding:6px 0;list-style:none;height:246px;overflow:auto;box-sizing:border-box}.el-transfer-panel__list.is-filterable{height:194px;padding-top:0}.el-transfer-panel__item{height:30px;line-height:30px;padding-left:15px;display:block}.el-transfer-panel__item+.el-transfer-panel__item{margin-left:0;display:block!important}.el-transfer-panel__item.el-checkbox{color:#606266}.el-transfer-panel__item:hover{color:#409eff}.el-transfer-panel__item.el-checkbox .el-checkbox__label{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;box-sizing:border-box;padding-left:24px;line-height:30px}.el-transfer-panel__item .el-checkbox__input{position:absolute;top:8px}.el-transfer-panel__filter{text-align:center;margin:15px;box-sizing:border-box;display:block;width:auto}.el-transfer-panel__filter .el-input__inner{height:32px;width:100%;font-size:12px;display:inline-block;box-sizing:border-box;border-radius:16px;padding-right:10px;padding-left:30px}.el-transfer-panel__filter .el-input__icon{margin-left:5px}.el-transfer-panel .el-transfer-panel__header{height:40px;line-height:40px;background:#f5f7fa;margin:0;padding-left:15px;border-bottom:1px solid #ebeef5;box-sizing:border-box;color:#000}.el-transfer-panel .el-transfer-panel__header .el-checkbox{display:block;line-height:40px}.el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label{font-size:16px;color:#303133;font-weight:400}.el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label span{position:absolute;right:15px;color:#909399;font-size:12px;font-weight:400}.el-divider__text,.el-link{font-weight:500;font-size:14px}.el-transfer-panel .el-transfer-panel__footer{height:40px;background:#fff;margin:0;padding:0;border-top:1px solid #ebeef5;position:absolute;bottom:0;left:0;width:100%;z-index:1}.el-transfer-panel .el-transfer-panel__footer:after{display:inline-block;content:\"\";height:100%;vertical-align:middle}.el-container,.el-timeline-item__node{display:-ms-flexbox}.el-transfer-panel .el-transfer-panel__footer .el-checkbox{padding-left:20px;color:#606266}.el-transfer-panel .el-transfer-panel__empty{margin:0;height:30px;line-height:30px;padding:6px 15px 0;color:#909399;text-align:center}.el-transfer-panel .el-checkbox__label{padding-left:8px}.el-transfer-panel .el-checkbox__inner{height:14px;width:14px;border-radius:3px}.el-transfer-panel .el-checkbox__inner:after{height:6px;width:3px;left:4px}.el-container{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex:1;flex:1;-ms-flex-preferred-size:auto;flex-basis:auto;box-sizing:border-box;min-width:0}.el-aside,.el-header{-webkit-box-sizing:border-box}.el-container.is-vertical{-ms-flex-direction:column;flex-direction:column}.el-header{padding:0 20px}.el-aside,.el-header{box-sizing:border-box;-ms-flex-negative:0;flex-shrink:0}.el-aside{overflow:auto}.el-footer,.el-main{-webkit-box-sizing:border-box}.el-main{display:block;-ms-flex:1;flex:1;-ms-flex-preferred-size:auto;flex-basis:auto;overflow:auto;padding:20px}.el-footer,.el-main{box-sizing:border-box}.el-footer{padding:0 20px;-ms-flex-negative:0;flex-shrink:0}.el-timeline{margin:0;font-size:14px;list-style:none}.el-timeline .el-timeline-item:last-child .el-timeline-item__tail{display:none}.el-timeline-item{position:relative;padding-bottom:20px}.el-timeline-item__wrapper{position:relative;padding-left:28px;top:-3px}.el-timeline-item__tail{position:absolute;left:4px;height:100%;border-left:2px solid #e4e7ed}.el-timeline-item__icon{color:#fff;font-size:13px}.el-timeline-item__node{position:absolute;background-color:#e4e7ed;border-radius:50%;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.el-image__error,.el-timeline-item__dot{display:-ms-flexbox}.el-timeline-item__node--normal{left:-1px;width:12px;height:12px}.el-timeline-item__node--large{left:-2px;width:14px;height:14px}.el-timeline-item__node--primary{background-color:#409eff}.el-timeline-item__node--success{background-color:#67c23a}.el-timeline-item__node--warning{background-color:#e6a23c}.el-timeline-item__node--danger{background-color:#f56c6c}.el-timeline-item__node--info{background-color:#909399}.el-timeline-item__dot{position:absolute;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.el-timeline-item__content{color:#303133}.el-timeline-item__timestamp{color:#909399;line-height:1;font-size:13px}.el-timeline-item__timestamp.is-top{margin-bottom:8px;padding-top:4px}.el-timeline-item__timestamp.is-bottom{margin-top:8px}.el-link{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;vertical-align:middle;position:relative;text-decoration:none;outline:0;padding:0}.el-link.is-underline:hover:after{content:\"\";position:absolute;left:0;right:0;height:0;bottom:0;border-bottom:1px solid #409eff}.el-link.el-link--default:after,.el-link.el-link--primary.is-underline:hover:after,.el-link.el-link--primary:after{border-color:#409eff}.el-link.is-disabled{cursor:not-allowed}.el-link [class*=el-icon-]+span{margin-left:5px}.el-link.el-link--default{color:#606266}.el-link.el-link--default:hover{color:#409eff}.el-link.el-link--default.is-disabled{color:#c0c4cc}.el-link.el-link--primary{color:#409eff}.el-link.el-link--primary:hover{color:#66b1ff}.el-link.el-link--primary.is-disabled{color:#a0cfff}.el-link.el-link--danger.is-underline:hover:after,.el-link.el-link--danger:after{border-color:#f56c6c}.el-link.el-link--danger{color:#f56c6c}.el-link.el-link--danger:hover{color:#f78989}.el-link.el-link--danger.is-disabled{color:#fab6b6}.el-link.el-link--success.is-underline:hover:after,.el-link.el-link--success:after{border-color:#67c23a}.el-link.el-link--success{color:#67c23a}.el-link.el-link--success:hover{color:#85ce61}.el-link.el-link--success.is-disabled{color:#b3e19d}.el-link.el-link--warning.is-underline:hover:after,.el-link.el-link--warning:after{border-color:#e6a23c}.el-link.el-link--warning{color:#e6a23c}.el-link.el-link--warning:hover{color:#ebb563}.el-link.el-link--warning.is-disabled{color:#f3d19e}.el-link.el-link--info.is-underline:hover:after,.el-link.el-link--info:after{border-color:#909399}.el-link.el-link--info{color:#909399}.el-link.el-link--info:hover{color:#a6a9ad}.el-link.el-link--info.is-disabled{color:#c8c9cc}.el-divider{background-color:#dcdfe6;position:relative}.el-divider--horizontal{display:block;height:1px;width:100%;margin:24px 0}.el-divider--vertical{display:inline-block;width:1px;height:1em;margin:0 8px;vertical-align:middle;position:relative}.el-divider__text{position:absolute;background-color:#fff;padding:0 20px;color:#303133}.el-image__error,.el-image__placeholder{background:#f5f7fa}.el-divider__text.is-left{left:20px;transform:translateY(-50%)}.el-divider__text.is-center{left:50%;transform:translateX(-50%) translateY(-50%)}.el-divider__text.is-right{right:20px;transform:translateY(-50%)}.el-image__error,.el-image__inner,.el-image__placeholder{width:100%;height:100%}.el-image{position:relative;display:inline-block;overflow:hidden}.el-image__inner{vertical-align:top}.el-image__inner--center{position:relative;top:50%;left:50%;transform:translate(-50%,-50%);display:block}.el-image__error{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;font-size:14px;color:#c0c4cc;vertical-align:middle}.el-image__preview{cursor:pointer}.el-image-viewer__wrapper{position:fixed;top:0;right:0;bottom:0;left:0}.el-image-viewer__btn{position:absolute;z-index:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;border-radius:50%;opacity:.8;cursor:pointer;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.el-image-viewer__close{top:40px;right:40px;width:40px;height:40px;font-size:40px}.el-image-viewer__canvas{width:100%;height:100%;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.el-image-viewer__actions{left:50%;bottom:30px;transform:translateX(-50%);width:282px;height:44px;padding:0 23px;background-color:#606266;border-color:#fff;border-radius:22px}.el-image-viewer__actions__inner{width:100%;height:100%;text-align:justify;cursor:default;font-size:23px;color:#fff;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around}.el-image-viewer__next,.el-image-viewer__prev{top:50%;width:44px;height:44px;font-size:24px;color:#fff;background-color:#606266;border-color:#fff}.el-image-viewer__prev{transform:translateY(-50%);left:40px}.el-image-viewer__next{transform:translateY(-50%);right:40px;text-indent:2px}.el-image-viewer__mask{position:absolute;width:100%;height:100%;top:0;left:0;opacity:.5;background:#000}.viewer-fade-enter-active{animation:viewer-fade-in .3s}.viewer-fade-leave-active{animation:viewer-fade-out .3s}@keyframes viewer-fade-in{0%{transform:translate3d(0,-20px,0);opacity:0}to{transform:translateZ(0);opacity:1}}@keyframes viewer-fade-out{0%{transform:translateZ(0);opacity:1}to{transform:translate3d(0,-20px,0);opacity:0}}.el-calendar{background-color:#fff}.el-calendar__header{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;padding:12px 20px;border-bottom:1px solid #ebeef5}.el-backtop,.el-page-header{display:-ms-flexbox}.el-calendar__title{color:#000;-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center}.el-calendar__body{padding:12px 20px 35px}.el-calendar-table{table-layout:fixed;width:100%}.el-calendar-table thead th{padding:12px 0;color:#606266;font-weight:400}.el-calendar-table:not(.is-range) td.next,.el-calendar-table:not(.is-range) td.prev{color:#c0c4cc}.el-backtop,.el-calendar-table td.is-today{color:#409eff}.el-calendar-table td{border-bottom:1px solid #ebeef5;border-right:1px solid #ebeef5;vertical-align:top;transition:background-color .2s ease}.el-calendar-table td.is-selected{background-color:#f2f8fe}.el-calendar-table tr:first-child td{border-top:1px solid #ebeef5}.el-calendar-table tr td:first-child{border-left:1px solid #ebeef5}.el-calendar-table tr.el-calendar-table__row--hide-border td{border-top:none}.el-calendar-table .el-calendar-day{box-sizing:border-box;padding:8px;height:85px}.el-calendar-table .el-calendar-day:hover{cursor:pointer;background-color:#f2f8fe}.el-backtop{position:fixed;background-color:#fff;width:40px;height:40px;border-radius:50%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;font-size:20px;box-shadow:0 0 6px rgba(0,0,0,.12);cursor:pointer;z-index:5}.el-backtop:hover{background-color:#f2f6fc}.el-page-header{display:-ms-flexbox;display:flex;line-height:24px}.el-page-header__left{display:-ms-flexbox;display:flex;cursor:pointer;margin-right:40px;position:relative}.el-page-header__left:after{content:\"\";position:absolute;width:1px;height:16px;right:-20px;top:50%;transform:translateY(-50%);background-color:#dcdfe6}.el-checkbox,.el-checkbox__input{display:inline-block;position:relative;white-space:nowrap}.el-page-header__left .el-icon-back{font-size:18px;margin-right:6px;-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center}.el-page-header__title{font-size:14px;font-weight:500}.el-page-header__content{font-size:18px;color:#303133}.el-checkbox{color:#606266;font-size:14px;cursor:pointer;user-select:none;margin-right:30px}.el-checkbox,.el-checkbox-button__inner,.el-radio{font-weight:500;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.el-checkbox.is-bordered{padding:9px 20px 9px 10px;border-radius:4px;border:1px solid #dcdfe6;box-sizing:border-box;line-height:normal;height:40px}.el-checkbox.is-bordered.is-checked{border-color:#409eff}.el-checkbox.is-bordered.is-disabled{border-color:#ebeef5;cursor:not-allowed}.el-checkbox.is-bordered+.el-checkbox.is-bordered{margin-left:10px}.el-checkbox.is-bordered.el-checkbox--medium{padding:7px 20px 7px 10px;border-radius:4px;height:36px}.el-checkbox.is-bordered.el-checkbox--medium .el-checkbox__label{line-height:17px;font-size:14px}.el-checkbox.is-bordered.el-checkbox--medium .el-checkbox__inner{height:14px;width:14px}.el-checkbox.is-bordered.el-checkbox--small{padding:5px 15px 5px 10px;border-radius:3px;height:32px}.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__label{line-height:15px;font-size:12px}.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner{height:12px;width:12px}.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner:after{height:6px;width:2px}.el-checkbox.is-bordered.el-checkbox--mini{padding:3px 15px 3px 10px;border-radius:3px;height:28px}.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__label{line-height:12px;font-size:12px}.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__inner{height:12px;width:12px}.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__inner:after{height:6px;width:2px}.el-checkbox__input{cursor:pointer;outline:0;line-height:1;vertical-align:middle}.el-checkbox__input.is-disabled .el-checkbox__inner{background-color:#edf2fc;border-color:#dcdfe6;cursor:not-allowed}.el-checkbox__input.is-disabled .el-checkbox__inner:after{cursor:not-allowed;border-color:#c0c4cc}.el-checkbox__input.is-disabled .el-checkbox__inner+.el-checkbox__label{cursor:not-allowed}.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{background-color:#f2f6fc;border-color:#dcdfe6}.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner:after{border-color:#c0c4cc}.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner{background-color:#f2f6fc;border-color:#dcdfe6}.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner:before{background-color:#c0c4cc;border-color:#c0c4cc}.el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner{background-color:#409eff;border-color:#409eff}.el-checkbox__input.is-disabled+span.el-checkbox__label{color:#c0c4cc;cursor:not-allowed}.el-checkbox__input.is-checked .el-checkbox__inner:after{transform:rotate(45deg) scaleY(1)}.el-checkbox__input.is-checked+.el-checkbox__label{color:#409eff}.el-checkbox__input.is-focus .el-checkbox__inner{border-color:#409eff}.el-checkbox__input.is-indeterminate .el-checkbox__inner:before{content:\"\";position:absolute;display:block;background-color:#fff;height:2px;transform:scale(.5);left:0;right:0;top:5px}.el-checkbox__input.is-indeterminate .el-checkbox__inner:after{display:none}.el-checkbox__inner{display:inline-block;position:relative;border:1px solid #dcdfe6;border-radius:2px;box-sizing:border-box;width:14px;height:14px;background-color:#fff;z-index:1;transition:border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46)}.el-checkbox__inner:hover{border-color:#409eff}.el-checkbox__inner:after{box-sizing:content-box;content:\"\";border:1px solid #fff;border-left:0;border-top:0;height:7px;left:4px;position:absolute;top:1px;transform:rotate(45deg) scaleY(0);width:3px;transition:transform .15s ease-in .05s;transform-origin:center}.el-checkbox__original{opacity:0;outline:0;position:absolute;margin:0;width:0;height:0;z-index:-1}.el-checkbox-button,.el-checkbox-button__inner{display:inline-block;position:relative}.el-checkbox__label{display:inline-block;padding-left:10px;line-height:19px;font-size:14px}.el-checkbox:last-of-type{margin-right:0}.el-checkbox-button__inner{line-height:1;white-space:nowrap;vertical-align:middle;cursor:pointer;background:#fff;border:1px solid #dcdfe6;border-left:0;color:#606266;-webkit-appearance:none;text-align:center;box-sizing:border-box;outline:0;margin:0;transition:all .3s cubic-bezier(.645,.045,.355,1);padding:12px 20px;font-size:14px;border-radius:0}.el-checkbox-button__inner.is-round{padding:12px 20px}.el-checkbox-button__inner:hover{color:#409eff}.el-checkbox-button__inner [class*=el-icon-]{line-height:.9}.el-radio,.el-radio__input{line-height:1;outline:0;white-space:nowrap}.el-checkbox-button__inner [class*=el-icon-]+span{margin-left:5px}.el-checkbox-button__original{opacity:0;outline:0;position:absolute;margin:0;z-index:-1}.el-radio,.el-radio__inner,.el-radio__input{position:relative;display:inline-block}.el-checkbox-button.is-checked .el-checkbox-button__inner{color:#fff;background-color:#409eff;border-color:#409eff;box-shadow:-1px 0 0 0 #8cc5ff}.el-checkbox-button.is-checked:first-child .el-checkbox-button__inner{border-left-color:#409eff}.el-checkbox-button.is-disabled .el-checkbox-button__inner{color:#c0c4cc;cursor:not-allowed;background-image:none;background-color:#fff;border-color:#ebeef5;box-shadow:none}.el-checkbox-button.is-disabled:first-child .el-checkbox-button__inner{border-left-color:#ebeef5}.el-checkbox-button:first-child .el-checkbox-button__inner{border-left:1px solid #dcdfe6;border-radius:4px 0 0 4px;box-shadow:none!important}.el-checkbox-button.is-focus .el-checkbox-button__inner{border-color:#409eff}.el-checkbox-button:last-child .el-checkbox-button__inner{border-radius:0 4px 4px 0}.el-checkbox-button--medium .el-checkbox-button__inner{padding:10px 20px;font-size:14px;border-radius:0}.el-checkbox-button--medium .el-checkbox-button__inner.is-round{padding:10px 20px}.el-checkbox-button--small .el-checkbox-button__inner{padding:9px 15px;font-size:12px;border-radius:0}.el-checkbox-button--small .el-checkbox-button__inner.is-round{padding:9px 15px}.el-checkbox-button--mini .el-checkbox-button__inner{padding:7px 15px;font-size:12px;border-radius:0}.el-checkbox-button--mini .el-checkbox-button__inner.is-round{padding:7px 15px}.el-checkbox-group{font-size:0}.el-radio,.el-radio--medium.is-bordered .el-radio__label{font-size:14px}.el-radio{color:#606266;cursor:pointer;margin-right:30px}.el-cascader-node>.el-radio,.el-radio:last-child{margin-right:0}.el-radio.is-bordered{padding:12px 20px 0 10px;border-radius:4px;border:1px solid #dcdfe6;box-sizing:border-box;height:40px}.el-radio.is-bordered.is-checked{border-color:#409eff}.el-radio.is-bordered.is-disabled{cursor:not-allowed;border-color:#ebeef5}.el-radio__input.is-disabled .el-radio__inner,.el-radio__input.is-disabled.is-checked .el-radio__inner{background-color:#f5f7fa;border-color:#e4e7ed}.el-radio.is-bordered+.el-radio.is-bordered{margin-left:10px}.el-radio--medium.is-bordered{padding:10px 20px 0 10px;border-radius:4px;height:36px}.el-radio--mini.is-bordered .el-radio__label,.el-radio--small.is-bordered .el-radio__label{font-size:12px}.el-radio--medium.is-bordered .el-radio__inner{height:14px;width:14px}.el-radio--small.is-bordered{padding:8px 15px 0 10px;border-radius:3px;height:32px}.el-radio--small.is-bordered .el-radio__inner{height:12px;width:12px}.el-radio--mini.is-bordered{padding:6px 15px 0 10px;border-radius:3px;height:28px}.el-radio--mini.is-bordered .el-radio__inner{height:12px;width:12px}.el-radio__input{cursor:pointer;vertical-align:middle}.el-radio__input.is-disabled .el-radio__inner{cursor:not-allowed}.el-radio__input.is-disabled .el-radio__inner:after{cursor:not-allowed;background-color:#f5f7fa}.el-radio__input.is-disabled .el-radio__inner+.el-radio__label{cursor:not-allowed}.el-radio__input.is-disabled.is-checked .el-radio__inner:after{background-color:#c0c4cc}.el-radio__input.is-disabled+span.el-radio__label{color:#c0c4cc;cursor:not-allowed}.el-radio__input.is-checked .el-radio__inner{border-color:#409eff;background:#409eff}.el-radio__input.is-checked .el-radio__inner:after{transform:translate(-50%,-50%) scale(1)}.el-radio__input.is-checked+.el-radio__label{color:#409eff}.el-radio__input.is-focus .el-radio__inner{border-color:#409eff}.el-radio__inner{border:1px solid #dcdfe6;border-radius:100%;width:14px;height:14px;background-color:#fff;cursor:pointer;box-sizing:border-box}.el-radio__inner:hover{border-color:#409eff}.el-radio__inner:after{width:4px;height:4px;border-radius:100%;background-color:#fff;content:\"\";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(0);transition:transform .15s ease-in}.el-radio__original{opacity:0;outline:0;position:absolute;z-index:-1;top:0;left:0;right:0;bottom:0;margin:0}.el-radio:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner{box-shadow:0 0 2px 2px #409eff}.el-radio__label{font-size:14px;padding-left:10px}.el-scrollbar{overflow:hidden;position:relative}.el-scrollbar:active>.el-scrollbar__bar,.el-scrollbar:focus>.el-scrollbar__bar,.el-scrollbar:hover>.el-scrollbar__bar{opacity:1;transition:opacity .34s ease-out}.el-scrollbar__wrap{overflow:scroll;height:100%}.el-scrollbar__wrap--hidden-default::-webkit-scrollbar{width:0;height:0}.el-scrollbar__thumb{position:relative;display:block;width:0;height:0;cursor:pointer;border-radius:inherit;background-color:hsla(220,4%,58%,.3);transition:background-color .3s}.el-scrollbar__thumb:hover{background-color:hsla(220,4%,58%,.5)}.el-scrollbar__bar{position:absolute;right:2px;bottom:2px;z-index:1;border-radius:4px;opacity:0;transition:opacity .12s ease-out}.el-scrollbar__bar.is-vertical{width:6px;top:2px}.el-scrollbar__bar.is-vertical>div{width:100%}.el-scrollbar__bar.is-horizontal{height:6px;left:2px}.el-scrollbar__bar.is-horizontal>div{height:100%}.el-cascader-panel{display:-ms-flexbox;display:flex;border-radius:4px;font-size:14px}.el-cascader-node,.el-drawer{display:-ms-flexbox}.el-cascader-panel.is-bordered{border:1px solid #e4e7ed;border-radius:4px}.el-cascader-menu{min-width:180px;box-sizing:border-box;color:#606266;border-right:1px solid #e4e7ed}.el-cascader-menu:last-child{border-right:none}.el-cascader-menu:last-child .el-cascader-node{padding-right:20px}.el-cascader-menu__wrap{height:204px}.el-cascader-menu__list{position:relative;min-height:100%;margin:0;padding:6px 0;list-style:none;box-sizing:border-box}.el-avatar,.el-drawer{-webkit-box-sizing:border-box;overflow:hidden}.el-cascader-menu__hover-zone{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.el-cascader-menu__empty-text{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;color:#c0c4cc}.el-cascader-node{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:0 30px 0 20px;height:34px;line-height:34px;outline:0}.el-cascader-node.is-selectable.in-active-path{color:#606266}.el-cascader-node.in-active-path,.el-cascader-node.is-active,.el-cascader-node.is-selectable.in-checked-path{color:#409eff;font-weight:700}.el-cascader-node:not(.is-disabled){cursor:pointer}.el-cascader-node:not(.is-disabled):focus,.el-cascader-node:not(.is-disabled):hover{background:#f5f7fa}.el-cascader-node.is-disabled{color:#c0c4cc;cursor:not-allowed}.el-cascader-node__prefix{position:absolute;left:10px}.el-cascader-node__postfix{position:absolute;right:10px}.el-cascader-node__label{-ms-flex:1;flex:1;padding:0 10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.el-cascader-node>.el-radio .el-radio__label{padding-left:0}.el-avatar{display:inline-block;box-sizing:border-box;text-align:center;color:#fff;background:#c0c4cc;width:40px;height:40px;line-height:40px;font-size:14px}.el-avatar>img{display:block;height:100%;vertical-align:middle}.el-avatar--circle{border-radius:50%}.el-avatar--square{border-radius:4px}.el-avatar--icon{font-size:18px}.el-avatar--large{width:40px;height:40px;line-height:40px}.el-avatar--medium{width:36px;height:36px;line-height:36px}.el-avatar--small{width:28px;height:28px;line-height:28px}.el-drawer.btt,.el-drawer.ttb,.el-drawer__container{left:0;right:0;width:100%}.el-drawer.ltr,.el-drawer.rtl,.el-drawer__container{top:0;bottom:0;height:100%}@keyframes el-drawer-fade-in{0%{opacity:0}to{opacity:1}}@keyframes rtl-drawer-in{0%{transform:translate(100%)}to{transform:translate(0)}}@keyframes rtl-drawer-out{0%{transform:translate(0)}to{transform:translate(100%)}}@keyframes ltr-drawer-in{0%{transform:translate(-100%)}to{transform:translate(0)}}@keyframes ltr-drawer-out{0%{transform:translate(0)}to{transform:translate(-100%)}}@keyframes ttb-drawer-in{0%{transform:translateY(-100%)}to{transform:translate(0)}}@keyframes ttb-drawer-out{0%{transform:translate(0)}to{transform:translateY(-100%)}}@keyframes btt-drawer-in{0%{transform:translateY(100%)}to{transform:translate(0)}}@keyframes btt-drawer-out{0%{transform:translate(0)}to{transform:translateY(100%)}}.el-drawer{position:absolute;box-sizing:border-box;background-color:#fff;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)}.el-drawer.rtl{animation:rtl-drawer-out 225ms cubic-bezier(0,0,.2,1) 0s;right:0}.el-drawer__open .el-drawer.rtl{animation:rtl-drawer-in 225ms cubic-bezier(0,0,.2,1) 0s}.el-drawer.ltr{animation:ltr-drawer-out 225ms cubic-bezier(0,0,.2,1) 0s;left:0}.el-drawer__open .el-drawer.ltr{animation:ltr-drawer-in 225ms cubic-bezier(0,0,.2,1) 0s}.el-drawer.ttb{animation:ttb-drawer-out 225ms cubic-bezier(0,0,.2,1) 0s;top:0}.el-drawer__open .el-drawer.ttb{animation:ttb-drawer-in 225ms cubic-bezier(0,0,.2,1) 0s}.el-drawer.btt{animation:btt-drawer-out 225ms cubic-bezier(0,0,.2,1) 0s;bottom:0}.el-drawer__open .el-drawer.btt{animation:btt-drawer-in 225ms cubic-bezier(0,0,.2,1) 0s}.el-drawer__header{-ms-flex-align:center;align-items:center;color:#72767b;display:-ms-flexbox;display:flex;margin-bottom:32px;padding:20px 20px 0}.el-drawer__header>:first-child{-ms-flex:1;flex:1}.el-drawer__title{margin:0;-ms-flex:1;flex:1;line-height:inherit;font-size:1rem}.el-drawer__close-btn{border:none;cursor:pointer;font-size:20px;color:inherit;background-color:transparent}.el-drawer__body{-ms-flex:1;flex:1}.el-drawer__body>*{box-sizing:border-box}.el-drawer__container{position:relative}.el-drawer-fade-enter-active{animation:el-drawer-fade-in 225ms cubic-bezier(0,0,.2,1) 0s}.el-drawer-fade-leave-active{animation:el-drawer-fade-in 225ms cubic-bezier(0,0,.2,1) 0s reverse}", ""]);

// exports


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(75)(undefined);
// imports


// module
exports.push([module.i, "#app,#map,body,html{width:100%;height:100%}#app{font-family:Helvetica,sans-serif;text-align:center}", ""]);

// exports


/***/ }),
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 185 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* Mapbox GL JS is Copyright © 2020 Mapbox and subject to the Mapbox Terms of Service ((https://www.mapbox.com/legal/tos/). */
(function (global, factory) {
 true ? module.exports = factory() :
typeof define === 'function' && define.amd ? define(factory) :
(global = global || self, global.mapboxgl = factory());
}(this, (function () { 'use strict';

/* eslint-disable */

var shared, worker, mapboxgl;
// define gets called three times: one for each chunk. we rely on the order
// they're imported to know which is which
function define(_, chunk) {
if (!shared) {
    shared = chunk;
} else if (!worker) {
    worker = chunk;
} else {
    var workerBundleString = 'var sharedChunk = {}; (' + shared + ')(sharedChunk); (' + worker + ')(sharedChunk);'

    var sharedChunk = {};
    shared(sharedChunk);
    mapboxgl = chunk(sharedChunk);
    if (typeof window !== 'undefined') {
        mapboxgl.workerUrl = window.URL.createObjectURL(new Blob([workerBundleString], { type: 'text/javascript' }));
    }
}
}


define(["exports"],(function(t){"use strict";var e=r;function r(t,e,r,i){this.cx=3*t,this.bx=3*(r-t)-this.cx,this.ax=1-this.cx-this.bx,this.cy=3*e,this.by=3*(i-e)-this.cy,this.ay=1-this.cy-this.by,this.p1x=t,this.p1y=i,this.p2x=r,this.p2y=i;}r.prototype.sampleCurveX=function(t){return ((this.ax*t+this.bx)*t+this.cx)*t},r.prototype.sampleCurveY=function(t){return ((this.ay*t+this.by)*t+this.cy)*t},r.prototype.sampleCurveDerivativeX=function(t){return (3*this.ax*t+2*this.bx)*t+this.cx},r.prototype.solveCurveX=function(t,e){var r,i,n,s,a;for(void 0===e&&(e=1e-6),n=t,a=0;a<8;a++){if(s=this.sampleCurveX(n)-t,Math.abs(s)<e)return n;var o=this.sampleCurveDerivativeX(n);if(Math.abs(o)<1e-6)break;n-=s/o;}if((n=t)<(r=0))return r;if(n>(i=1))return i;for(;r<i;){if(s=this.sampleCurveX(n),Math.abs(s-t)<e)return n;t>s?r=n:i=n,n=.5*(i-r)+r;}return n},r.prototype.solve=function(t,e){return this.sampleCurveY(this.solveCurveX(t,e))};var i=n;function n(t,e){this.x=t,this.y=e;}n.prototype={clone:function(){return new n(this.x,this.y)},add:function(t){return this.clone()._add(t)},sub:function(t){return this.clone()._sub(t)},multByPoint:function(t){return this.clone()._multByPoint(t)},divByPoint:function(t){return this.clone()._divByPoint(t)},mult:function(t){return this.clone()._mult(t)},div:function(t){return this.clone()._div(t)},rotate:function(t){return this.clone()._rotate(t)},rotateAround:function(t,e){return this.clone()._rotateAround(t,e)},matMult:function(t){return this.clone()._matMult(t)},unit:function(){return this.clone()._unit()},perp:function(){return this.clone()._perp()},round:function(){return this.clone()._round()},mag:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},equals:function(t){return this.x===t.x&&this.y===t.y},dist:function(t){return Math.sqrt(this.distSqr(t))},distSqr:function(t){var e=t.x-this.x,r=t.y-this.y;return e*e+r*r},angle:function(){return Math.atan2(this.y,this.x)},angleTo:function(t){return Math.atan2(this.y-t.y,this.x-t.x)},angleWith:function(t){return this.angleWithSep(t.x,t.y)},angleWithSep:function(t,e){return Math.atan2(this.x*e-this.y*t,this.x*t+this.y*e)},_matMult:function(t){var e=t[2]*this.x+t[3]*this.y;return this.x=t[0]*this.x+t[1]*this.y,this.y=e,this},_add:function(t){return this.x+=t.x,this.y+=t.y,this},_sub:function(t){return this.x-=t.x,this.y-=t.y,this},_mult:function(t){return this.x*=t,this.y*=t,this},_div:function(t){return this.x/=t,this.y/=t,this},_multByPoint:function(t){return this.x*=t.x,this.y*=t.y,this},_divByPoint:function(t){return this.x/=t.x,this.y/=t.y,this},_unit:function(){return this._div(this.mag()),this},_perp:function(){var t=this.y;return this.y=this.x,this.x=-t,this},_rotate:function(t){var e=Math.cos(t),r=Math.sin(t),i=r*this.x+e*this.y;return this.x=e*this.x-r*this.y,this.y=i,this},_rotateAround:function(t,e){var r=Math.cos(t),i=Math.sin(t),n=e.y+i*(this.x-e.x)+r*(this.y-e.y);return this.x=e.x+r*(this.x-e.x)-i*(this.y-e.y),this.y=n,this},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}},n.convert=function(t){return t instanceof n?t:Array.isArray(t)?new n(t[0],t[1]):t};var s="undefined"!=typeof self?self:{};function a(t,e){if(Array.isArray(t)){if(!Array.isArray(e)||t.length!==e.length)return !1;for(let r=0;r<t.length;r++)if(!a(t[r],e[r]))return !1;return !0}if("object"==typeof t&&null!==t&&null!==e){if("object"!=typeof e)return !1;if(Object.keys(t).length!==Object.keys(e).length)return !1;for(const r in t)if(!a(t[r],e[r]))return !1;return !0}return t===e}const o=Math.pow(2,53)-1,l=Math.PI/180,u=180/Math.PI;function c(t){return t*l}function h(t){if(t<=0)return 0;if(t>=1)return 1;const e=t*t,r=e*t;return 4*(t<.5?r:3*(t-e)+r-.75)}function p(t,r,i,n){const s=new e(t,r,i,n);return function(t){return s.solve(t)}}const d=p(.25,.1,.25,1);function f(t,e,r){return Math.min(r,Math.max(e,t))}function y(t,e,r){const i=r-e,n=((t-e)%i+i)%i+e;return n===e?r:n}function m(t,e,r){if(!t.length)return r(null,[]);let i=t.length;const n=new Array(t.length);let s=null;t.forEach((t,a)=>{e(t,(t,e)=>{t&&(s=t),n[a]=e,0==--i&&r(s,n);});});}function g(t){const e=[];for(const r in t)e.push(t[r]);return e}function x(t,...e){for(const r of e)for(const e in r)t[e]=r[e];return t}let v=1;function b(){return v++}function w(){return function t(e){return e?(e^16*Math.random()>>e/4).toString(16):([1e7]+-[1e3]+-4e3+-8e3+-1e11).replace(/[018]/g,t)}()}function _(t){return !!t&&/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(t)}function k(t,e){t.forEach(t=>{e[t]&&(e[t]=e[t].bind(e));});}function A(t,e){return -1!==t.indexOf(e,t.length-e.length)}function S(t,e,r){const i={};for(const n in t)i[n]=e.call(r||this,t[n],n,t);return i}function I(t,e,r){const i={};for(const n in t)e.call(r||this,t[n],n,t)&&(i[n]=t[n]);return i}function T(t){return Array.isArray(t)?t.map(T):"object"==typeof t&&t?S(t,T):t}const z={};function E(t){z[t]||("undefined"!=typeof console&&console.warn(t),z[t]=!0);}function M(t,e,r){return (r.y-t.y)*(e.x-t.x)>(e.y-t.y)*(r.x-t.x)}function B(t){let e=0;for(let r,i,n=0,s=t.length,a=s-1;n<s;a=n++)r=t[n],i=t[a],e+=(i.x-r.x)*(r.y+i.y);return e}function D(){return "undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof self&&self instanceof WorkerGlobalScope}function C(t){const e={};if(t.replace(/(?:^|(?:\s*\,\s*))([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)(?:\=(?:([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)|(?:\"((?:[^"\\]|\\.)*)\")))?/g,(t,r,i,n)=>{const s=i||n;return e[r]=!s||s.toLowerCase(),""}),e["max-age"]){const t=parseInt(e["max-age"],10);isNaN(t)?delete e["max-age"]:e["max-age"]=t;}return e}let P,V,F=null;function R(t){if(null==F){const e=t.navigator?t.navigator.userAgent:null;F=!!t.safari||!(!e||!(/\b(iPad|iPhone|iPod)\b/.test(e)||e.match("Safari")&&!e.match("Chrome")));}return F}function L(t){try{const e=s[t];return e.setItem("_mapbox_test_",1),e.removeItem("_mapbox_test_"),!0}catch(t){return !1}}let U,O=!1;const $={now:()=>void 0!==U?U:s.performance.now(),setErrorState(){O=!0;},setNow(t){U=t;},restoreNow(){U=void 0;},frame(t){if(O)return {cancel:()=>{}};const e=s.requestAnimationFrame(t);return {cancel:()=>s.cancelAnimationFrame(e)}},getImageData(t,e=0){const r=s.document.createElement("canvas"),i=r.getContext("2d");if(!i)throw new Error("failed to create canvas 2d context");return r.width=t.width,r.height=t.height,i.drawImage(t,0,0,t.width,t.height),i.getImageData(-e,-e,t.width+2*e,t.height+2*e)},resolveURL:t=>(P||(P=s.document.createElement("a")),P.href=t,P.href),get devicePixelRatio(){return s.devicePixelRatio},get prefersReducedMotion(){return !!s.matchMedia&&(null==V&&(V=s.matchMedia("(prefers-reduced-motion: reduce)")),V.matches)}};let q;const N={API_URL:"https://api.mapbox.com",get API_URL_REGEX(){if(null==q){const t=/^((https?:)?\/\/)?([^\/]+\.)?mapbox\.c(n|om)(\/|\?|$)/i;try{q=null!=process.env.API_URL_REGEX?new RegExp(process.env.API_URL_REGEX):t;}catch(e){q=t;}}return q},get EVENTS_URL(){return this.API_URL?0===this.API_URL.indexOf("https://api.mapbox.cn")?"https://events.mapbox.cn/events/v2":0===this.API_URL.indexOf("https://api.mapbox.com")?"https://events.mapbox.com/events/v2":null:null},SESSION_PATH:"/map-sessions/v1",FEEDBACK_URL:"https://apps.mapbox.com/feedback",TILE_URL_VERSION:"v4",RASTER_URL_PREFIX:"raster/v1",REQUIRE_ACCESS_TOKEN:!0,ACCESS_TOKEN:null,MAX_PARALLEL_IMAGE_REQUESTS:16},j={supported:!1,testSupport:function(t){!X&&Z&&(K?H(t):G=t);}};let G,Z,X=!1,K=!1;function H(t){const e=t.createTexture();t.bindTexture(t.TEXTURE_2D,e);try{if(t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,Z),t.isContextLost())return;j.supported=!0;}catch(t){}t.deleteTexture(e),X=!0;}s.document&&(Z=s.document.createElement("img"),Z.onload=function(){G&&H(G),G=null,K=!0;},Z.onerror=function(){X=!0,G=null;},Z.src="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA=");const Y="01";function W(t){return 0===t.indexOf("mapbox:")}function J(t){return N.API_URL_REGEX.test(t)}const Q=/^(\w+):\/\/([^/?]*)(\/[^?]+)?\??(.+)?/;function tt(t){const e=t.match(Q);if(!e)throw new Error("Unable to parse URL object");return {protocol:e[1],authority:e[2],path:e[3]||"/",params:e[4]?e[4].split("&"):[]}}function et(t){const e=t.params.length?`?${t.params.join("&")}`:"";return `${t.protocol}://${t.authority}${t.path}${e}`}function rt(t){if(!t)return null;const e=t.split(".");if(!e||3!==e.length)return null;try{return JSON.parse(decodeURIComponent(s.atob(e[1]).split("").map(t=>"%"+("00"+t.charCodeAt(0).toString(16)).slice(-2)).join("")))}catch(t){return null}}class it{constructor(t){this.type=t,this.anonId=null,this.eventData={},this.queue=[],this.pendingRequest=null;}getStorageKey(t){const e=rt(N.ACCESS_TOKEN);let r="";return r=e&&e.u?s.btoa(encodeURIComponent(e.u).replace(/%([0-9A-F]{2})/g,(t,e)=>String.fromCharCode(Number("0x"+e)))):N.ACCESS_TOKEN||"",t?`mapbox.eventData.${t}:${r}`:`mapbox.eventData:${r}`}fetchEventData(){const t=L("localStorage"),e=this.getStorageKey(),r=this.getStorageKey("uuid");if(t)try{const t=s.localStorage.getItem(e);t&&(this.eventData=JSON.parse(t));const i=s.localStorage.getItem(r);i&&(this.anonId=i);}catch(t){E("Unable to read from LocalStorage");}}saveEventData(){const t=L("localStorage"),e=this.getStorageKey(),r=this.getStorageKey("uuid");if(t)try{s.localStorage.setItem(r,this.anonId),Object.keys(this.eventData).length>=1&&s.localStorage.setItem(e,JSON.stringify(this.eventData));}catch(t){E("Unable to write to LocalStorage");}}processRequests(t){}postEvent(t,e,r,i){if(!N.EVENTS_URL)return;const n=tt(N.EVENTS_URL);n.params.push(`access_token=${i||N.ACCESS_TOKEN||""}`);const s={event:this.type,created:new Date(t).toISOString(),sdkIdentifier:"mapbox-gl-js",sdkVersion:"2.1.1",skuId:Y,userId:this.anonId},a=e?x(s,e):s,o={url:et(n),headers:{"Content-Type":"text/plain"},body:JSON.stringify([a])};this.pendingRequest=At(o,t=>{this.pendingRequest=null,r(t),this.saveEventData(),this.processRequests(i);});}queueRequest(t,e){this.queue.push(t),this.processRequests(e);}}const nt=new class extends it{constructor(t){super("appUserTurnstile"),this._customAccessToken=t;}postTurnstileEvent(t,e){N.EVENTS_URL&&N.ACCESS_TOKEN&&Array.isArray(t)&&t.some(t=>W(t)||J(t))&&this.queueRequest(Date.now(),e);}processRequests(t){if(this.pendingRequest||0===this.queue.length)return;this.anonId&&this.eventData.lastSuccess&&this.eventData.tokenU||this.fetchEventData();const e=rt(N.ACCESS_TOKEN),r=e?e.u:N.ACCESS_TOKEN;let i=r!==this.eventData.tokenU;_(this.anonId)||(this.anonId=w(),i=!0);const n=this.queue.shift();if(this.eventData.lastSuccess){const t=new Date(this.eventData.lastSuccess),e=new Date(n),r=(n-this.eventData.lastSuccess)/864e5;i=i||r>=1||r<-1||t.getDate()!==e.getDate();}else i=!0;if(!i)return this.processRequests();this.postEvent(n,{"enabled.telemetry":!1},t=>{t||(this.eventData.lastSuccess=n,this.eventData.tokenU=r);},t);}},st=nt.postTurnstileEvent.bind(nt),at=new class extends it{constructor(){super("map.load"),this.success={},this.skuToken="";}postMapLoadEvent(t,e,r,i){this.skuToken=e,this.errorCb=i,N.EVENTS_URL&&(r||N.ACCESS_TOKEN?this.queueRequest({id:t,timestamp:Date.now()},r):this.errorCb(new Error("A valid Mapbox access token is required to use Mapbox GL JS. To create an account or a new access token, visit https://account.mapbox.com/")));}processRequests(t){if(this.pendingRequest||0===this.queue.length)return;const{id:e,timestamp:r}=this.queue.shift();e&&this.success[e]||(this.anonId||this.fetchEventData(),_(this.anonId)||(this.anonId=w()),this.postEvent(r,{skuToken:this.skuToken},t=>{t?this.errorCb(t):e&&(this.success[e]=!0);},t));}},ot=at.postMapLoadEvent.bind(at),lt=new class extends it{constructor(){super("map.auth"),this.success={},this.skuToken="";}getSession(t,e,r,i){if(!N.API_URL||!N.SESSION_PATH)return;const n=tt(N.API_URL+N.SESSION_PATH);n.params.push(`sku=${e||""}`),n.params.push(`access_token=${i||N.ACCESS_TOKEN||""}`);const s={url:et(n),headers:{"Content-Type":"text/plain"}};this.pendingRequest=St(s,t=>{this.pendingRequest=null,r(t),this.saveEventData(),this.processRequests(i);});}getSessionAPI(t,e,r,i){this.skuToken=e,this.errorCb=i,N.SESSION_PATH&&N.API_URL&&(r||N.ACCESS_TOKEN?this.queueRequest({id:t,timestamp:Date.now()},r):this.errorCb(new Error("NO_ACCESS_TOKEN")));}processRequests(t){if(this.pendingRequest||0===this.queue.length)return;const{id:e,timestamp:r}=this.queue.shift();e&&this.success[e]||this.getSession(r,this.skuToken,t=>{t?this.errorCb(t):e&&(this.success[e]=!0);},t);}},ut=lt.getSessionAPI.bind(lt);let ct,ht,pt=500,dt=50;function ft(){s.caches&&!ct&&(ct=s.caches.open("mapbox-tiles"));}function yt(t){const e=t.indexOf("?");return e<0?t:t.slice(0,e)}let mt,gt=1/0;function xt(){return null==mt&&(mt=s.OffscreenCanvas&&new s.OffscreenCanvas(1,1).getContext("2d")&&"function"==typeof s.createImageBitmap),mt}const vt={Unknown:"Unknown",Style:"Style",Source:"Source",Tile:"Tile",Glyphs:"Glyphs",SpriteImage:"SpriteImage",SpriteJSON:"SpriteJSON",Image:"Image"};"function"==typeof Object.freeze&&Object.freeze(vt);class bt extends Error{constructor(t,e,r){401===e&&J(r)&&(t+=": you may have provided an invalid Mapbox access token. See https://www.mapbox.com/api-documentation/#access-tokens-and-token-scopes"),super(t),this.status=e,this.url=r;}toString(){return `${this.name}: ${this.message} (${this.status}): ${this.url}`}}const wt=D()?()=>self.worker&&self.worker.referrer:()=>("blob:"===s.location.protocol?s.parent:s).location.href;const _t=function(t,e){if(!(/^file:/.test(r=t.url)||/^file:/.test(wt())&&!/^\w+:/.test(r))){if(s.fetch&&s.Request&&s.AbortController&&s.Request.prototype.hasOwnProperty("signal"))return function(t,e){const r=new s.AbortController,i=new s.Request(t.url,{method:t.method||"GET",body:t.body,credentials:t.credentials,headers:t.headers,referrer:wt(),signal:r.signal});let n=!1,a=!1;const o=(l=i.url).indexOf("sku=")>0&&J(l);var l;"json"===t.type&&i.headers.set("Accept","application/json");const u=(r,n,l)=>{if(a)return;if(r&&"SecurityError"!==r.message&&E(r),n&&l)return c(n);const u=Date.now();s.fetch(i).then(r=>{if(r.ok){const t=o?r.clone():null;return c(r,t,u)}return e(new bt(r.statusText,r.status,t.url))}).catch(t=>{20!==t.code&&e(new Error(t.message));});},c=(r,o,l)=>{("arrayBuffer"===t.type?r.arrayBuffer():"json"===t.type?r.json():r.text()).then(t=>{a||(o&&l&&function(t,e,r){if(ft(),!ct)return;const i={status:e.status,statusText:e.statusText,headers:new s.Headers};e.headers.forEach((t,e)=>i.headers.set(e,t));const n=C(e.headers.get("Cache-Control")||"");n["no-store"]||(n["max-age"]&&i.headers.set("Expires",new Date(r+1e3*n["max-age"]).toUTCString()),new Date(i.headers.get("Expires")).getTime()-r<42e4||function(t,e){if(void 0===ht)try{new Response(new ReadableStream),ht=!0;}catch(t){ht=!1;}ht?e(t.body):t.blob().then(e);}(e,e=>{const r=new s.Response(e,i);ft(),ct&&ct.then(e=>e.put(yt(t.url),r)).catch(t=>E(t.message));}));}(i,o,l),n=!0,e(null,t,r.headers.get("Cache-Control"),r.headers.get("Expires")));}).catch(t=>{a||e(new Error(t.message));});};return o?function(t,e){if(ft(),!ct)return e(null);const r=yt(t.url);ct.then(t=>{t.match(r).then(i=>{const n=function(t){if(!t)return !1;const e=new Date(t.headers.get("Expires")||0),r=C(t.headers.get("Cache-Control")||"");return e>Date.now()&&!r["no-cache"]}(i);t.delete(r),n&&t.put(r,i.clone()),e(null,i,n);}).catch(e);}).catch(e);}(i,u):u(null,null),{cancel:()=>{a=!0,n||r.abort();}}}(t,e);if(D()&&self.worker&&self.worker.actor)return self.worker.actor.send("getResource",t,e,void 0,!0)}var r;return function(t,e){const r=new s.XMLHttpRequest;r.open(t.method||"GET",t.url,!0),"arrayBuffer"===t.type&&(r.responseType="arraybuffer");for(const e in t.headers)r.setRequestHeader(e,t.headers[e]);return "json"===t.type&&(r.responseType="text",r.setRequestHeader("Accept","application/json")),r.withCredentials="include"===t.credentials,r.onerror=()=>{e(new Error(r.statusText));},r.onload=()=>{if((r.status>=200&&r.status<300||0===r.status)&&null!==r.response){let i=r.response;if("json"===t.type)try{i=JSON.parse(r.response);}catch(t){return e(t)}e(null,i,r.getResponseHeader("Cache-Control"),r.getResponseHeader("Expires"));}else e(new bt(r.statusText,r.status,t.url));},r.send(t.body),{cancel:()=>r.abort()}}(t,e)},kt=function(t,e){return _t(x(t,{type:"arrayBuffer"}),e)},At=function(t,e){return _t(x(t,{method:"POST"}),e)},St=function(t,e){return _t(x(t,{method:"GET"}),e)};function It(t){const e=s.document.createElement("a");return e.href=t,e.protocol===s.document.location.protocol&&e.host===s.document.location.host}const Tt="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=";let zt,Et;zt=[],Et=0;const Mt=function(t,e){if(j.supported&&(t.headers||(t.headers={}),t.headers.accept="image/webp,*/*"),Et>=N.MAX_PARALLEL_IMAGE_REQUESTS){const r={requestParameters:t,callback:e,cancelled:!1,cancel(){this.cancelled=!0;}};return zt.push(r),r}Et++;let r=!1;const i=()=>{if(!r)for(r=!0,Et--;zt.length&&Et<N.MAX_PARALLEL_IMAGE_REQUESTS;){const t=zt.shift(),{requestParameters:e,callback:r,cancelled:i}=t;i||(t.cancel=Mt(e,r).cancel);}},n=kt(t,(t,r,n,a)=>{i(),t?e(t):r&&(xt()?function(t,e){const r=new s.Blob([new Uint8Array(t)],{type:"image/png"});s.createImageBitmap(r).then(t=>{e(null,t);}).catch(t=>{e(new Error(`Could not load image because of ${t.message}. Please make sure to use a supported image type such as PNG or JPEG. Note that SVGs are not supported.`));});}(r,e):function(t,e,r,i){const n=new s.Image,a=s.URL;n.onload=()=>{e(null,n),a.revokeObjectURL(n.src),n.onload=null,s.requestAnimationFrame(()=>{n.src=Tt;});},n.onerror=()=>e(new Error("Could not load image. Please make sure to use a supported image type such as PNG or JPEG. Note that SVGs are not supported."));const o=new s.Blob([new Uint8Array(t)],{type:"image/png"});n.cacheControl=r,n.expires=i,n.src=t.byteLength?a.createObjectURL(o):Tt;}(r,e,n,a));});return {cancel:()=>{n.cancel(),i();}}};function Bt(t,e,r){r[t]&&-1!==r[t].indexOf(e)||(r[t]=r[t]||[],r[t].push(e));}function Dt(t,e,r){if(r&&r[t]){const i=r[t].indexOf(e);-1!==i&&r[t].splice(i,1);}}class Ct{constructor(t,e={}){x(this,e),this.type=t;}}class Pt extends Ct{constructor(t,e={}){super("error",x({error:t},e));}}class Vt{on(t,e){return this._listeners=this._listeners||{},Bt(t,e,this._listeners),this}off(t,e){return Dt(t,e,this._listeners),Dt(t,e,this._oneTimeListeners),this}once(t,e){return e?(this._oneTimeListeners=this._oneTimeListeners||{},Bt(t,e,this._oneTimeListeners),this):new Promise(e=>this.once(t,e))}fire(t,e){"string"==typeof t&&(t=new Ct(t,e||{}));const r=t.type;if(this.listens(r)){t.target=this;const e=this._listeners&&this._listeners[r]?this._listeners[r].slice():[];for(const r of e)r.call(this,t);const i=this._oneTimeListeners&&this._oneTimeListeners[r]?this._oneTimeListeners[r].slice():[];for(const e of i)Dt(r,e,this._oneTimeListeners),e.call(this,t);const n=this._eventedParent;n&&(x(t,"function"==typeof this._eventedParentData?this._eventedParentData():this._eventedParentData),n.fire(t));}else t instanceof Pt&&console.error(t.error);return this}listens(t){return !!(this._listeners&&this._listeners[t]&&this._listeners[t].length>0||this._oneTimeListeners&&this._oneTimeListeners[t]&&this._oneTimeListeners[t].length>0||this._eventedParent&&this._eventedParent.listens(t))}setEventedParent(t,e){return this._eventedParent=t,this._eventedParentData=e,this}}var Ft={$version:8,$root:{version:{required:!0,type:"enum",values:[8]},name:{type:"string"},metadata:{type:"*"},center:{type:"array",value:"number"},zoom:{type:"number"},bearing:{type:"number",default:0,period:360,units:"degrees"},pitch:{type:"number",default:0,units:"degrees"},light:{type:"light"},terrain:{type:"terrain"},sources:{required:!0,type:"sources"},sprite:{type:"string"},glyphs:{type:"string"},transition:{type:"transition"},layers:{required:!0,type:"array",value:"layer"}},sources:{"*":{type:"source"}},source:["source_vector","source_raster","source_raster_dem","source_geojson","source_video","source_image"],source_vector:{type:{required:!0,type:"enum",values:{vector:{}}},url:{type:"string"},tiles:{type:"array",value:"string"},bounds:{type:"array",value:"number",length:4,default:[-180,-85.051129,180,85.051129]},scheme:{type:"enum",values:{xyz:{},tms:{}},default:"xyz"},minzoom:{type:"number",default:0},maxzoom:{type:"number",default:22},attribution:{type:"string"},promoteId:{type:"promoteId"},volatile:{type:"boolean",default:!1},"*":{type:"*"}},source_raster:{type:{required:!0,type:"enum",values:{raster:{}}},url:{type:"string"},tiles:{type:"array",value:"string"},bounds:{type:"array",value:"number",length:4,default:[-180,-85.051129,180,85.051129]},minzoom:{type:"number",default:0},maxzoom:{type:"number",default:22},tileSize:{type:"number",default:512,units:"pixels"},scheme:{type:"enum",values:{xyz:{},tms:{}},default:"xyz"},attribution:{type:"string"},volatile:{type:"boolean",default:!1},"*":{type:"*"}},source_raster_dem:{type:{required:!0,type:"enum",values:{"raster-dem":{}}},url:{type:"string"},tiles:{type:"array",value:"string"},bounds:{type:"array",value:"number",length:4,default:[-180,-85.051129,180,85.051129]},minzoom:{type:"number",default:0},maxzoom:{type:"number",default:22},tileSize:{type:"number",default:512,units:"pixels"},attribution:{type:"string"},encoding:{type:"enum",values:{terrarium:{},mapbox:{}},default:"mapbox"},volatile:{type:"boolean",default:!1},"*":{type:"*"}},source_geojson:{type:{required:!0,type:"enum",values:{geojson:{}}},data:{type:"*"},maxzoom:{type:"number",default:18},attribution:{type:"string"},buffer:{type:"number",default:128,maximum:512,minimum:0},filter:{type:"*"},tolerance:{type:"number",default:.375},cluster:{type:"boolean",default:!1},clusterRadius:{type:"number",default:50,minimum:0},clusterMaxZoom:{type:"number"},clusterMinPoints:{type:"number"},clusterProperties:{type:"*"},lineMetrics:{type:"boolean",default:!1},generateId:{type:"boolean",default:!1},promoteId:{type:"promoteId"}},source_video:{type:{required:!0,type:"enum",values:{video:{}}},urls:{required:!0,type:"array",value:"string"},coordinates:{required:!0,type:"array",length:4,value:{type:"array",length:2,value:"number"}}},source_image:{type:{required:!0,type:"enum",values:{image:{}}},url:{required:!0,type:"string"},coordinates:{required:!0,type:"array",length:4,value:{type:"array",length:2,value:"number"}}},layer:{id:{type:"string",required:!0},type:{type:"enum",values:{fill:{},line:{},symbol:{},circle:{},heatmap:{},"fill-extrusion":{},raster:{},hillshade:{},background:{},sky:{}},required:!0},metadata:{type:"*"},source:{type:"string"},"source-layer":{type:"string"},minzoom:{type:"number",minimum:0,maximum:24},maxzoom:{type:"number",minimum:0,maximum:24},filter:{type:"filter"},layout:{type:"layout"},paint:{type:"paint"}},layout:["layout_fill","layout_line","layout_circle","layout_heatmap","layout_fill-extrusion","layout_symbol","layout_raster","layout_hillshade","layout_background","layout_sky"],layout_background:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_sky:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_fill:{"fill-sort-key":{type:"number",expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_circle:{"circle-sort-key":{type:"number",expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_heatmap:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},"layout_fill-extrusion":{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_line:{"line-cap":{type:"enum",values:{butt:{},round:{},square:{}},default:"butt",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"line-join":{type:"enum",values:{bevel:{},round:{},miter:{}},default:"miter",expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"line-miter-limit":{type:"number",default:2,requires:[{"line-join":"miter"}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"line-round-limit":{type:"number",default:1.05,requires:[{"line-join":"round"}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"line-sort-key":{type:"number",expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_symbol:{"symbol-placement":{type:"enum",values:{point:{},line:{},"line-center":{}},default:"point",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"symbol-spacing":{type:"number",default:250,minimum:1,units:"pixels",requires:[{"symbol-placement":"line"}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"symbol-avoid-edges":{type:"boolean",default:!1,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"symbol-sort-key":{type:"number",expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"symbol-z-order":{type:"enum",values:{auto:{},"viewport-y":{},source:{}},default:"auto",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-allow-overlap":{type:"boolean",default:!1,requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-ignore-placement":{type:"boolean",default:!1,requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-optional":{type:"boolean",default:!1,requires:["icon-image","text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-rotation-alignment":{type:"enum",values:{map:{},viewport:{},auto:{}},default:"auto",requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-size":{type:"number",default:1,minimum:0,units:"factor of the original icon size",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-text-fit":{type:"enum",values:{none:{},width:{},height:{},both:{}},default:"none",requires:["icon-image","text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-text-fit-padding":{type:"array",value:"number",length:4,default:[0,0,0,0],units:"pixels",requires:["icon-image","text-field",{"icon-text-fit":["both","width","height"]}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"icon-image":{type:"resolvedImage",tokens:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-rotate":{type:"number",default:0,period:360,units:"degrees",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-padding":{type:"number",default:2,minimum:0,units:"pixels",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"icon-keep-upright":{type:"boolean",default:!1,requires:["icon-image",{"icon-rotation-alignment":"map"},{"symbol-placement":["line","line-center"]}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-offset":{type:"array",value:"number",length:2,default:[0,0],requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-anchor":{type:"enum",values:{center:{},left:{},right:{},top:{},bottom:{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},default:"center",requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-pitch-alignment":{type:"enum",values:{map:{},viewport:{},auto:{}},default:"auto",requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-pitch-alignment":{type:"enum",values:{map:{},viewport:{},auto:{}},default:"auto",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-rotation-alignment":{type:"enum",values:{map:{},viewport:{},auto:{}},default:"auto",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-field":{type:"formatted",default:"",tokens:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-font":{type:"array",value:"string",default:["Open Sans Regular","Arial Unicode MS Regular"],requires:["text-field"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-size":{type:"number",default:16,minimum:0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-max-width":{type:"number",default:10,minimum:0,units:"ems",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-line-height":{type:"number",default:1.2,units:"ems",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"text-letter-spacing":{type:"number",default:0,units:"ems",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-justify":{type:"enum",values:{auto:{},left:{},center:{},right:{}},default:"center",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-radial-offset":{type:"number",units:"ems",default:0,requires:["text-field"],"property-type":"data-driven",expression:{interpolated:!0,parameters:["zoom","feature"]}},"text-variable-anchor":{type:"array",value:"enum",values:{center:{},left:{},right:{},top:{},bottom:{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},requires:["text-field",{"symbol-placement":["point"]}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-anchor":{type:"enum",values:{center:{},left:{},right:{},top:{},bottom:{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},default:"center",requires:["text-field",{"!":"text-variable-anchor"}],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-max-angle":{type:"number",default:45,units:"degrees",requires:["text-field",{"symbol-placement":["line","line-center"]}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"text-writing-mode":{type:"array",value:"enum",values:{horizontal:{},vertical:{}},requires:["text-field",{"symbol-placement":["point"]}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-rotate":{type:"number",default:0,period:360,units:"degrees",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-padding":{type:"number",default:2,minimum:0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"text-keep-upright":{type:"boolean",default:!0,requires:["text-field",{"text-rotation-alignment":"map"},{"symbol-placement":["line","line-center"]}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-transform":{type:"enum",values:{none:{},uppercase:{},lowercase:{}},default:"none",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-offset":{type:"array",value:"number",units:"ems",length:2,default:[0,0],requires:["text-field",{"!":"text-radial-offset"}],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-allow-overlap":{type:"boolean",default:!1,requires:["text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-ignore-placement":{type:"boolean",default:!1,requires:["text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-optional":{type:"boolean",default:!1,requires:["text-field","icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_raster:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_hillshade:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},filter:{type:"array",value:"*"},filter_operator:{type:"enum",values:{"==":{},"!=":{},">":{},">=":{},"<":{},"<=":{},in:{},"!in":{},all:{},any:{},none:{},has:{},"!has":{},within:{}}},geometry_type:{type:"enum",values:{Point:{},LineString:{},Polygon:{}}},function:{expression:{type:"expression"},stops:{type:"array",value:"function_stop"},base:{type:"number",default:1,minimum:0},property:{type:"string",default:"$zoom"},type:{type:"enum",values:{identity:{},exponential:{},interval:{},categorical:{}},default:"exponential"},colorSpace:{type:"enum",values:{rgb:{},lab:{},hcl:{}},default:"rgb"},default:{type:"*",required:!1}},function_stop:{type:"array",minimum:0,maximum:24,value:["number","color"],length:2},expression:{type:"array",value:"*",minimum:1},light:{anchor:{type:"enum",default:"viewport",values:{map:{},viewport:{}},"property-type":"data-constant",transition:!1,expression:{interpolated:!1,parameters:["zoom"]}},position:{type:"array",default:[1.15,210,30],length:3,value:"number","property-type":"data-constant",transition:!0,expression:{interpolated:!0,parameters:["zoom"]}},color:{type:"color","property-type":"data-constant",default:"#ffffff",expression:{interpolated:!0,parameters:["zoom"]},transition:!0},intensity:{type:"number","property-type":"data-constant",default:.5,minimum:0,maximum:1,expression:{interpolated:!0,parameters:["zoom"]},transition:!0}},terrain:{source:{type:"string",required:!0},exaggeration:{type:"number","property-type":"data-constant",default:1,minimum:0,maximum:1e3,expression:{interpolated:!0,parameters:["zoom"]},transition:!0}},paint:["paint_fill","paint_line","paint_circle","paint_heatmap","paint_fill-extrusion","paint_symbol","paint_raster","paint_hillshade","paint_background","paint_sky"],paint_fill:{"fill-antialias":{type:"boolean",default:!0,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"fill-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-color":{type:"color",default:"#000000",transition:!0,requires:[{"!":"fill-pattern"}],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-outline-color":{type:"color",transition:!0,requires:[{"!":"fill-pattern"},{"fill-antialias":!0}],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"fill-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["fill-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"fill-pattern":{type:"resolvedImage",transition:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"cross-faded-data-driven"}},"paint_fill-extrusion":{"fill-extrusion-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"fill-extrusion-color":{type:"color",default:"#000000",transition:!0,requires:[{"!":"fill-extrusion-pattern"}],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"fill-extrusion-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["fill-extrusion-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"fill-extrusion-pattern":{type:"resolvedImage",transition:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"cross-faded-data-driven"},"fill-extrusion-height":{type:"number",default:0,minimum:0,units:"meters",transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-base":{type:"number",default:0,minimum:0,units:"meters",transition:!0,requires:["fill-extrusion-height"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-vertical-gradient":{type:"boolean",default:!0,transition:!1,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"}},paint_line:{"line-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-color":{type:"color",default:"#000000",transition:!0,requires:[{"!":"line-pattern"}],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"line-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["line-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"line-width":{type:"number",default:1,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-gap-width":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-offset":{type:"number",default:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-blur":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-dasharray":{type:"array",value:"number",minimum:0,transition:!0,units:"line widths",requires:[{"!":"line-pattern"}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"cross-faded"},"line-pattern":{type:"resolvedImage",transition:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"cross-faded-data-driven"},"line-gradient":{type:"color",transition:!1,requires:[{"!":"line-dasharray"},{"!":"line-pattern"},{source:"geojson",has:{lineMetrics:!0}}],expression:{interpolated:!0,parameters:["line-progress"]},"property-type":"color-ramp"}},paint_circle:{"circle-radius":{type:"number",default:5,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-color":{type:"color",default:"#000000",transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-blur":{type:"number",default:0,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"circle-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["circle-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"circle-pitch-scale":{type:"enum",values:{map:{},viewport:{}},default:"map",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"circle-pitch-alignment":{type:"enum",values:{map:{},viewport:{}},default:"viewport",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"circle-stroke-width":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-stroke-color":{type:"color",default:"#000000",transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-stroke-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"}},paint_heatmap:{"heatmap-radius":{type:"number",default:30,minimum:1,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"heatmap-weight":{type:"number",default:1,minimum:0,transition:!1,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"heatmap-intensity":{type:"number",default:1,minimum:0,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"heatmap-color":{type:"color",default:["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",.1,"royalblue",.3,"cyan",.5,"lime",.7,"yellow",1,"red"],transition:!1,expression:{interpolated:!0,parameters:["heatmap-density"]},"property-type":"color-ramp"},"heatmap-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},paint_symbol:{"icon-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-color":{type:"color",default:"#000000",transition:!0,requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-color":{type:"color",default:"rgba(0, 0, 0, 0)",transition:!0,requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-width":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-blur":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"icon-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["icon-image","icon-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-color":{type:"color",default:"#000000",transition:!0,overridable:!0,requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-color":{type:"color",default:"rgba(0, 0, 0, 0)",transition:!0,requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-width":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-blur":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"text-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["text-field","text-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"}},paint_raster:{"raster-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-hue-rotate":{type:"number",default:0,period:360,transition:!0,units:"degrees",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-brightness-min":{type:"number",default:0,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-brightness-max":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-saturation":{type:"number",default:0,minimum:-1,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-contrast":{type:"number",default:0,minimum:-1,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-resampling":{type:"enum",values:{linear:{},nearest:{}},default:"linear",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"raster-fade-duration":{type:"number",default:300,minimum:0,transition:!1,units:"milliseconds",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},paint_hillshade:{"hillshade-illumination-direction":{type:"number",default:335,minimum:0,maximum:359,transition:!1,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-illumination-anchor":{type:"enum",values:{map:{},viewport:{}},default:"viewport",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-exaggeration":{type:"number",default:.5,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-shadow-color":{type:"color",default:"#000000",transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-highlight-color":{type:"color",default:"#FFFFFF",transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-accent-color":{type:"color",default:"#000000",transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},paint_background:{"background-color":{type:"color",default:"#000000",transition:!0,requires:[{"!":"background-pattern"}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"background-pattern":{type:"resolvedImage",transition:!0,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"cross-faded"},"background-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},paint_sky:{"sky-type":{type:"enum",values:{gradient:{},atmosphere:{}},default:"atmosphere",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"sky-atmosphere-sun":{type:"array",value:"number",length:2,units:"degrees",minimum:[0,0],maximum:[360,180],transition:!1,requires:[{"sky-type":"atmosphere"}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"sky-atmosphere-sun-intensity":{type:"number",requires:[{"sky-type":"atmosphere"}],default:10,minimum:0,maximum:100,transition:!1,"property-type":"data-constant"},"sky-gradient-center":{type:"array",requires:[{"sky-type":"gradient"}],value:"number",default:[0,0],length:2,units:"degrees",minimum:[0,0],maximum:[360,180],transition:!1,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"sky-gradient-radius":{type:"number",requires:[{"sky-type":"gradient"}],default:90,minimum:0,maximum:180,transition:!1,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"sky-gradient":{type:"color",default:["interpolate",["linear"],["sky-radial-progress"],.8,"#87ceeb",1,"white"],transition:!1,requires:[{"sky-type":"gradient"}],expression:{interpolated:!0,parameters:["sky-radial-progress"]},"property-type":"color-ramp"},"sky-atmosphere-halo-color":{type:"color",default:"white",transition:!1,requires:[{"sky-type":"atmosphere"}],"property-type":"data-constant"},"sky-atmosphere-color":{type:"color",default:"white",transition:!1,requires:[{"sky-type":"atmosphere"}],"property-type":"data-constant"},"sky-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},transition:{duration:{type:"number",default:300,minimum:0,units:"milliseconds"},delay:{type:"number",default:0,minimum:0,units:"milliseconds"}},"property-type":{"data-driven":{type:"property-type"},"cross-faded":{type:"property-type"},"cross-faded-data-driven":{type:"property-type"},"color-ramp":{type:"property-type"},"data-constant":{type:"property-type"},constant:{type:"property-type"}},promoteId:{"*":{type:"string"}}};class Rt{constructor(t,e,r,i){this.message=(t?`${t}: `:"")+r,i&&(this.identifier=i),null!=e&&e.__line__&&(this.line=e.__line__);}}function Lt(t){const e=t.value;return e?[new Rt(t.key,e,"constants have been deprecated as of v8")]:[]}function Ut(t,...e){for(const r of e)for(const e in r)t[e]=r[e];return t}function Ot(t){return t instanceof Number||t instanceof String||t instanceof Boolean?t.valueOf():t}function $t(t){if(Array.isArray(t))return t.map($t);if(t instanceof Object&&!(t instanceof Number||t instanceof String||t instanceof Boolean)){const e={};for(const r in t)e[r]=$t(t[r]);return e}return Ot(t)}class qt extends Error{constructor(t,e){super(e),this.message=e,this.key=t;}}class Nt{constructor(t,e=[]){this.parent=t,this.bindings={};for(const[t,r]of e)this.bindings[t]=r;}concat(t){return new Nt(this,t)}get(t){if(this.bindings[t])return this.bindings[t];if(this.parent)return this.parent.get(t);throw new Error(`${t} not found in scope.`)}has(t){return !!this.bindings[t]||!!this.parent&&this.parent.has(t)}}const jt={kind:"null"},Gt={kind:"number"},Zt={kind:"string"},Xt={kind:"boolean"},Kt={kind:"color"},Ht={kind:"object"},Yt={kind:"value"},Wt={kind:"collator"},Jt={kind:"formatted"},Qt={kind:"resolvedImage"};function te(t,e){return {kind:"array",itemType:t,N:e}}function ee(t){if("array"===t.kind){const e=ee(t.itemType);return "number"==typeof t.N?`array<${e}, ${t.N}>`:"value"===t.itemType.kind?"array":`array<${e}>`}return t.kind}const re=[jt,Gt,Zt,Xt,Kt,Jt,Ht,te(Yt),Qt];function ie(t,e){if("error"===e.kind)return null;if("array"===t.kind){if("array"===e.kind&&(0===e.N&&"value"===e.itemType.kind||!ie(t.itemType,e.itemType))&&("number"!=typeof t.N||t.N===e.N))return null}else {if(t.kind===e.kind)return null;if("value"===t.kind)for(const t of re)if(!ie(t,e))return null}return `Expected ${ee(t)} but found ${ee(e)} instead.`}function ne(t,e){return e.some(e=>e.kind===t.kind)}function se(t,e){return e.some(e=>"null"===e?null===t:"array"===e?Array.isArray(t):"object"===e?t&&!Array.isArray(t)&&"object"==typeof t:e===typeof t)}function ae(t,e){return t(e={exports:{}},e.exports),e.exports}var oe=ae((function(t,e){var r={transparent:[0,0,0,0],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aqua:[0,255,255,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],black:[0,0,0,1],blanchedalmond:[255,235,205,1],blue:[0,0,255,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],fuchsia:[255,0,255,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],gray:[128,128,128,1],green:[0,128,0,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],maroon:[128,0,0,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],navy:[0,0,128,1],oldlace:[253,245,230,1],olive:[128,128,0,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],purple:[128,0,128,1],rebeccapurple:[102,51,153,1],red:[255,0,0,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],silver:[192,192,192,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],teal:[0,128,128,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],white:[255,255,255,1],whitesmoke:[245,245,245,1],yellow:[255,255,0,1],yellowgreen:[154,205,50,1]};function i(t){return (t=Math.round(t))<0?0:t>255?255:t}function n(t){return i("%"===t[t.length-1]?parseFloat(t)/100*255:parseInt(t))}function s(t){return (e="%"===t[t.length-1]?parseFloat(t)/100:parseFloat(t))<0?0:e>1?1:e;var e;}function a(t,e,r){return r<0?r+=1:r>1&&(r-=1),6*r<1?t+(e-t)*r*6:2*r<1?e:3*r<2?t+(e-t)*(2/3-r)*6:t}try{e.parseCSSColor=function(t){var e,o=t.replace(/ /g,"").toLowerCase();if(o in r)return r[o].slice();if("#"===o[0])return 4===o.length?(e=parseInt(o.substr(1),16))>=0&&e<=4095?[(3840&e)>>4|(3840&e)>>8,240&e|(240&e)>>4,15&e|(15&e)<<4,1]:null:7===o.length&&(e=parseInt(o.substr(1),16))>=0&&e<=16777215?[(16711680&e)>>16,(65280&e)>>8,255&e,1]:null;var l=o.indexOf("("),u=o.indexOf(")");if(-1!==l&&u+1===o.length){var c=o.substr(0,l),h=o.substr(l+1,u-(l+1)).split(","),p=1;switch(c){case"rgba":if(4!==h.length)return null;p=s(h.pop());case"rgb":return 3!==h.length?null:[n(h[0]),n(h[1]),n(h[2]),p];case"hsla":if(4!==h.length)return null;p=s(h.pop());case"hsl":if(3!==h.length)return null;var d=(parseFloat(h[0])%360+360)%360/360,f=s(h[1]),y=s(h[2]),m=y<=.5?y*(f+1):y+f-y*f,g=2*y-m;return [i(255*a(g,m,d+1/3)),i(255*a(g,m,d)),i(255*a(g,m,d-1/3)),p];default:return null}}return null};}catch(t){}})).parseCSSColor;class le{constructor(t,e,r,i=1){this.r=t,this.g=e,this.b=r,this.a=i;}static parse(t){if(!t)return;if(t instanceof le)return t;if("string"!=typeof t)return;const e=oe(t);return e?new le(e[0]/255*e[3],e[1]/255*e[3],e[2]/255*e[3],e[3]):void 0}toString(){const[t,e,r,i]=this.toArray();return `rgba(${Math.round(t)},${Math.round(e)},${Math.round(r)},${i})`}toArray(){const{r:t,g:e,b:r,a:i}=this;return 0===i?[0,0,0,0]:[255*t/i,255*e/i,255*r/i,i]}}le.black=new le(0,0,0,1),le.white=new le(1,1,1,1),le.transparent=new le(0,0,0,0),le.red=new le(1,0,0,1),le.blue=new le(0,0,1,1);class ue{constructor(t,e,r){this.sensitivity=t?e?"variant":"case":e?"accent":"base",this.locale=r,this.collator=new Intl.Collator(this.locale?this.locale:[],{sensitivity:this.sensitivity,usage:"search"});}compare(t,e){return this.collator.compare(t,e)}resolvedLocale(){return new Intl.Collator(this.locale?this.locale:[]).resolvedOptions().locale}}class ce{constructor(t,e,r,i,n){this.text=t,this.image=e,this.scale=r,this.fontStack=i,this.textColor=n;}}class he{constructor(t){this.sections=t;}static fromString(t){return new he([new ce(t,null,null,null,null)])}isEmpty(){return 0===this.sections.length||!this.sections.some(t=>0!==t.text.length||t.image&&0!==t.image.name.length)}static factory(t){return t instanceof he?t:he.fromString(t)}toString(){return 0===this.sections.length?"":this.sections.map(t=>t.text).join("")}serialize(){const t=["format"];for(const e of this.sections){if(e.image){t.push(["image",e.image.name]);continue}t.push(e.text);const r={};e.fontStack&&(r["text-font"]=["literal",e.fontStack.split(",")]),e.scale&&(r["font-scale"]=e.scale),e.textColor&&(r["text-color"]=["rgba"].concat(e.textColor.toArray())),t.push(r);}return t}}class pe{constructor(t){this.name=t.name,this.available=t.available;}toString(){return this.name}static fromString(t){return t?new pe({name:t,available:!1}):null}serialize(){return ["image",this.name]}}function de(t,e,r,i){return "number"==typeof t&&t>=0&&t<=255&&"number"==typeof e&&e>=0&&e<=255&&"number"==typeof r&&r>=0&&r<=255?void 0===i||"number"==typeof i&&i>=0&&i<=1?null:`Invalid rgba value [${[t,e,r,i].join(", ")}]: 'a' must be between 0 and 1.`:`Invalid rgba value [${("number"==typeof i?[t,e,r,i]:[t,e,r]).join(", ")}]: 'r', 'g', and 'b' must be between 0 and 255.`}function fe(t){if(null===t)return !0;if("string"==typeof t)return !0;if("boolean"==typeof t)return !0;if("number"==typeof t)return !0;if(t instanceof le)return !0;if(t instanceof ue)return !0;if(t instanceof he)return !0;if(t instanceof pe)return !0;if(Array.isArray(t)){for(const e of t)if(!fe(e))return !1;return !0}if("object"==typeof t){for(const e in t)if(!fe(t[e]))return !1;return !0}return !1}function ye(t){if(null===t)return jt;if("string"==typeof t)return Zt;if("boolean"==typeof t)return Xt;if("number"==typeof t)return Gt;if(t instanceof le)return Kt;if(t instanceof ue)return Wt;if(t instanceof he)return Jt;if(t instanceof pe)return Qt;if(Array.isArray(t)){const e=t.length;let r;for(const e of t){const t=ye(e);if(r){if(r===t)continue;r=Yt;break}r=t;}return te(r||Yt,e)}return Ht}function me(t){const e=typeof t;return null===t?"":"string"===e||"number"===e||"boolean"===e?String(t):t instanceof le||t instanceof he||t instanceof pe?t.toString():JSON.stringify(t)}class ge{constructor(t,e){this.type=t,this.value=e;}static parse(t,e){if(2!==t.length)return e.error(`'literal' expression requires exactly one argument, but found ${t.length-1} instead.`);if(!fe(t[1]))return e.error("invalid value");const r=t[1];let i=ye(r);const n=e.expectedType;return "array"!==i.kind||0!==i.N||!n||"array"!==n.kind||"number"==typeof n.N&&0!==n.N||(i=n),new ge(i,r)}evaluate(){return this.value}eachChild(){}outputDefined(){return !0}serialize(){return "array"===this.type.kind||"object"===this.type.kind?["literal",this.value]:this.value instanceof le?["rgba"].concat(this.value.toArray()):this.value instanceof he?this.value.serialize():this.value}}class xe{constructor(t){this.name="ExpressionEvaluationError",this.message=t;}toJSON(){return this.message}}const ve={string:Zt,number:Gt,boolean:Xt,object:Ht};class be{constructor(t,e){this.type=t,this.args=e;}static parse(t,e){if(t.length<2)return e.error("Expected at least one argument.");let r,i=1;const n=t[0];if("array"===n){let n,s;if(t.length>2){const r=t[1];if("string"!=typeof r||!(r in ve)||"object"===r)return e.error('The item type argument of "array" must be one of string, number, boolean',1);n=ve[r],i++;}else n=Yt;if(t.length>3){if(null!==t[2]&&("number"!=typeof t[2]||t[2]<0||t[2]!==Math.floor(t[2])))return e.error('The length argument to "array" must be a positive integer literal',2);s=t[2],i++;}r=te(n,s);}else r=ve[n];const s=[];for(;i<t.length;i++){const r=e.parse(t[i],i,Yt);if(!r)return null;s.push(r);}return new be(r,s)}evaluate(t){for(let e=0;e<this.args.length;e++){const r=this.args[e].evaluate(t);if(!ie(this.type,ye(r)))return r;if(e===this.args.length-1)throw new xe(`Expected value to be of type ${ee(this.type)}, but found ${ee(ye(r))} instead.`)}return null}eachChild(t){this.args.forEach(t);}outputDefined(){return this.args.every(t=>t.outputDefined())}serialize(){const t=this.type,e=[t.kind];if("array"===t.kind){const r=t.itemType;if("string"===r.kind||"number"===r.kind||"boolean"===r.kind){e.push(r.kind);const i=t.N;("number"==typeof i||this.args.length>1)&&e.push(i);}}return e.concat(this.args.map(t=>t.serialize()))}}class we{constructor(t){this.type=Jt,this.sections=t;}static parse(t,e){if(t.length<2)return e.error("Expected at least one argument.");const r=t[1];if(!Array.isArray(r)&&"object"==typeof r)return e.error("First argument must be an image or text section.");const i=[];let n=!1;for(let r=1;r<=t.length-1;++r){const s=t[r];if(n&&"object"==typeof s&&!Array.isArray(s)){n=!1;let t=null;if(s["font-scale"]&&(t=e.parse(s["font-scale"],1,Gt),!t))return null;let r=null;if(s["text-font"]&&(r=e.parse(s["text-font"],1,te(Zt)),!r))return null;let a=null;if(s["text-color"]&&(a=e.parse(s["text-color"],1,Kt),!a))return null;const o=i[i.length-1];o.scale=t,o.font=r,o.textColor=a;}else {const s=e.parse(t[r],1,Yt);if(!s)return null;const a=s.type.kind;if("string"!==a&&"value"!==a&&"null"!==a&&"resolvedImage"!==a)return e.error("Formatted text type must be 'string', 'value', 'image' or 'null'.");n=!0,i.push({content:s,scale:null,font:null,textColor:null});}}return new we(i)}evaluate(t){return new he(this.sections.map(e=>{const r=e.content.evaluate(t);return ye(r)===Qt?new ce("",r,null,null,null):new ce(me(r),null,e.scale?e.scale.evaluate(t):null,e.font?e.font.evaluate(t).join(","):null,e.textColor?e.textColor.evaluate(t):null)}))}eachChild(t){for(const e of this.sections)t(e.content),e.scale&&t(e.scale),e.font&&t(e.font),e.textColor&&t(e.textColor);}outputDefined(){return !1}serialize(){const t=["format"];for(const e of this.sections){t.push(e.content.serialize());const r={};e.scale&&(r["font-scale"]=e.scale.serialize()),e.font&&(r["text-font"]=e.font.serialize()),e.textColor&&(r["text-color"]=e.textColor.serialize()),t.push(r);}return t}}class _e{constructor(t){this.type=Qt,this.input=t;}static parse(t,e){if(2!==t.length)return e.error("Expected two arguments.");const r=e.parse(t[1],1,Zt);return r?new _e(r):e.error("No image name provided.")}evaluate(t){const e=this.input.evaluate(t),r=pe.fromString(e);return r&&t.availableImages&&(r.available=t.availableImages.indexOf(e)>-1),r}eachChild(t){t(this.input);}outputDefined(){return !1}serialize(){return ["image",this.input.serialize()]}}const ke={"to-boolean":Xt,"to-color":Kt,"to-number":Gt,"to-string":Zt};class Ae{constructor(t,e){this.type=t,this.args=e;}static parse(t,e){if(t.length<2)return e.error("Expected at least one argument.");const r=t[0];if(("to-boolean"===r||"to-string"===r)&&2!==t.length)return e.error("Expected one argument.");const i=ke[r],n=[];for(let r=1;r<t.length;r++){const i=e.parse(t[r],r,Yt);if(!i)return null;n.push(i);}return new Ae(i,n)}evaluate(t){if("boolean"===this.type.kind)return Boolean(this.args[0].evaluate(t));if("color"===this.type.kind){let e,r;for(const i of this.args){if(e=i.evaluate(t),r=null,e instanceof le)return e;if("string"==typeof e){const r=t.parseColor(e);if(r)return r}else if(Array.isArray(e)&&(r=e.length<3||e.length>4?`Invalid rbga value ${JSON.stringify(e)}: expected an array containing either three or four numeric values.`:de(e[0],e[1],e[2],e[3]),!r))return new le(e[0]/255,e[1]/255,e[2]/255,e[3])}throw new xe(r||`Could not parse color from value '${"string"==typeof e?e:String(JSON.stringify(e))}'`)}if("number"===this.type.kind){let e=null;for(const r of this.args){if(e=r.evaluate(t),null===e)return 0;const i=Number(e);if(!isNaN(i))return i}throw new xe(`Could not convert ${JSON.stringify(e)} to number.`)}return "formatted"===this.type.kind?he.fromString(me(this.args[0].evaluate(t))):"resolvedImage"===this.type.kind?pe.fromString(me(this.args[0].evaluate(t))):me(this.args[0].evaluate(t))}eachChild(t){this.args.forEach(t);}outputDefined(){return this.args.every(t=>t.outputDefined())}serialize(){if("formatted"===this.type.kind)return new we([{content:this.args[0],scale:null,font:null,textColor:null}]).serialize();if("resolvedImage"===this.type.kind)return new _e(this.args[0]).serialize();const t=[`to-${this.type.kind}`];return this.eachChild(e=>{t.push(e.serialize());}),t}}const Se=["Unknown","Point","LineString","Polygon"];class Ie{constructor(){this.globals=null,this.feature=null,this.featureState=null,this.formattedSection=null,this._parseColorCache={},this.availableImages=null,this.canonical=null;}id(){return this.feature&&"id"in this.feature?this.feature.id:null}geometryType(){return this.feature?"number"==typeof this.feature.type?Se[this.feature.type]:this.feature.type:null}geometry(){return this.feature&&"geometry"in this.feature?this.feature.geometry:null}canonicalID(){return this.canonical}properties(){return this.feature&&this.feature.properties||{}}parseColor(t){let e=this._parseColorCache[t];return e||(e=this._parseColorCache[t]=le.parse(t)),e}}class Te{constructor(t,e,r,i){this.name=t,this.type=e,this._evaluate=r,this.args=i;}evaluate(t){return this._evaluate(t,this.args)}eachChild(t){this.args.forEach(t);}outputDefined(){return !1}serialize(){return [this.name].concat(this.args.map(t=>t.serialize()))}static parse(t,e){const r=t[0],i=Te.definitions[r];if(!i)return e.error(`Unknown expression "${r}". If you wanted a literal array, use ["literal", [...]].`,0);const n=Array.isArray(i)?i[0]:i.type,s=Array.isArray(i)?[[i[1],i[2]]]:i.overloads,a=s.filter(([e])=>!Array.isArray(e)||e.length===t.length-1);let o=null;for(const[i,s]of a){o=new He(e.registry,e.path,null,e.scope);const a=[];let l=!1;for(let e=1;e<t.length;e++){const r=t[e],n=Array.isArray(i)?i[e-1]:i.type,s=o.parse(r,1+a.length,n);if(!s){l=!0;break}a.push(s);}if(!l)if(Array.isArray(i)&&i.length!==a.length)o.error(`Expected ${i.length} arguments, but found ${a.length} instead.`);else {for(let t=0;t<a.length;t++){const e=Array.isArray(i)?i[t]:i.type,r=a[t];o.concat(t+1).checkSubtype(e,r.type);}if(0===o.errors.length)return new Te(r,n,s,a)}}if(1===a.length)e.errors.push(...o.errors);else {const r=(a.length?a:s).map(([t])=>{return e=t,Array.isArray(e)?`(${e.map(ee).join(", ")})`:`(${ee(e.type)}...)`;var e;}).join(" | "),i=[];for(let r=1;r<t.length;r++){const n=e.parse(t[r],1+i.length);if(!n)return null;i.push(ee(n.type));}e.error(`Expected arguments of type ${r}, but found (${i.join(", ")}) instead.`);}return null}static register(t,e){Te.definitions=e;for(const r in e)t[r]=Te;}}class ze{constructor(t,e,r){this.type=Wt,this.locale=r,this.caseSensitive=t,this.diacriticSensitive=e;}static parse(t,e){if(2!==t.length)return e.error("Expected one argument.");const r=t[1];if("object"!=typeof r||Array.isArray(r))return e.error("Collator options argument must be an object.");const i=e.parse(void 0!==r["case-sensitive"]&&r["case-sensitive"],1,Xt);if(!i)return null;const n=e.parse(void 0!==r["diacritic-sensitive"]&&r["diacritic-sensitive"],1,Xt);if(!n)return null;let s=null;return r.locale&&(s=e.parse(r.locale,1,Zt),!s)?null:new ze(i,n,s)}evaluate(t){return new ue(this.caseSensitive.evaluate(t),this.diacriticSensitive.evaluate(t),this.locale?this.locale.evaluate(t):null)}eachChild(t){t(this.caseSensitive),t(this.diacriticSensitive),this.locale&&t(this.locale);}outputDefined(){return !1}serialize(){const t={};return t["case-sensitive"]=this.caseSensitive.serialize(),t["diacritic-sensitive"]=this.diacriticSensitive.serialize(),this.locale&&(t.locale=this.locale.serialize()),["collator",t]}}function Ee(t,e){t[0]=Math.min(t[0],e[0]),t[1]=Math.min(t[1],e[1]),t[2]=Math.max(t[2],e[0]),t[3]=Math.max(t[3],e[1]);}function Me(t,e){return !(t[0]<=e[0]||t[2]>=e[2]||t[1]<=e[1]||t[3]>=e[3])}function Be(t,e){const r=(180+t[0])/360,i=(180-180/Math.PI*Math.log(Math.tan(Math.PI/4+t[1]*Math.PI/360)))/360,n=Math.pow(2,e.z);return [Math.round(r*n*8192),Math.round(i*n*8192)]}function De(t,e,r){const i=t[0]-e[0],n=t[1]-e[1],s=t[0]-r[0],a=t[1]-r[1];return i*a-s*n==0&&i*s<=0&&n*a<=0}function Ce(t,e){let r=!1;for(let a=0,o=e.length;a<o;a++){const o=e[a];for(let e=0,a=o.length;e<a-1;e++){if(De(t,o[e],o[e+1]))return !1;(n=o[e])[1]>(i=t)[1]!=(s=o[e+1])[1]>i[1]&&i[0]<(s[0]-n[0])*(i[1]-n[1])/(s[1]-n[1])+n[0]&&(r=!r);}}var i,n,s;return r}function Pe(t,e){for(let r=0;r<e.length;r++)if(Ce(t,e[r]))return !0;return !1}function Ve(t,e,r,i){const n=i[0]-r[0],s=i[1]-r[1],a=(t[0]-r[0])*s-n*(t[1]-r[1]),o=(e[0]-r[0])*s-n*(e[1]-r[1]);return a>0&&o<0||a<0&&o>0}function Fe(t,e,r){for(const u of r)for(let r=0;r<u.length-1;++r)if(0!=(o=[(a=u[r+1])[0]-(s=u[r])[0],a[1]-s[1]])[0]*(l=[(n=e)[0]-(i=t)[0],n[1]-i[1]])[1]-o[1]*l[0]&&Ve(i,n,s,a)&&Ve(s,a,i,n))return !0;var i,n,s,a,o,l;return !1}function Re(t,e){for(let r=0;r<t.length;++r)if(!Ce(t[r],e))return !1;for(let r=0;r<t.length-1;++r)if(Fe(t[r],t[r+1],e))return !1;return !0}function Le(t,e){for(let r=0;r<e.length;r++)if(Re(t,e[r]))return !0;return !1}function Ue(t,e,r){const i=[];for(let n=0;n<t.length;n++){const s=[];for(let i=0;i<t[n].length;i++){const a=Be(t[n][i],r);Ee(e,a),s.push(a);}i.push(s);}return i}function Oe(t,e,r){const i=[];for(let n=0;n<t.length;n++){const s=Ue(t[n],e,r);i.push(s);}return i}function $e(t,e,r,i){if(t[0]<r[0]||t[0]>r[2]){const e=.5*i;let n=t[0]-r[0]>e?-i:r[0]-t[0]>e?i:0;0===n&&(n=t[0]-r[2]>e?-i:r[2]-t[0]>e?i:0),t[0]+=n;}Ee(e,t);}function qe(t,e,r,i){const n=8192*Math.pow(2,i.z),s=[8192*i.x,8192*i.y],a=[];for(const i of t)for(const t of i){const i=[t.x+s[0],t.y+s[1]];$e(i,e,r,n),a.push(i);}return a}function Ne(t,e,r,i){const n=8192*Math.pow(2,i.z),s=[8192*i.x,8192*i.y],a=[];for(const r of t){const t=[];for(const i of r){const r=[i.x+s[0],i.y+s[1]];Ee(e,r),t.push(r);}a.push(t);}if(e[2]-e[0]<=n/2){(o=e)[0]=o[1]=1/0,o[2]=o[3]=-1/0;for(const t of a)for(const i of t)$e(i,e,r,n);}var o;return a}class je{constructor(t,e){this.type=Xt,this.geojson=t,this.geometries=e;}static parse(t,e){if(2!==t.length)return e.error(`'within' expression requires exactly one argument, but found ${t.length-1} instead.`);if(fe(t[1])){const e=t[1];if("FeatureCollection"===e.type)for(let t=0;t<e.features.length;++t){const r=e.features[t].geometry.type;if("Polygon"===r||"MultiPolygon"===r)return new je(e,e.features[t].geometry)}else if("Feature"===e.type){const t=e.geometry.type;if("Polygon"===t||"MultiPolygon"===t)return new je(e,e.geometry)}else if("Polygon"===e.type||"MultiPolygon"===e.type)return new je(e,e)}return e.error("'within' expression requires valid geojson object that contains polygon geometry type.")}evaluate(t){if(null!=t.geometry()&&null!=t.canonicalID()){if("Point"===t.geometryType())return function(t,e){const r=[1/0,1/0,-1/0,-1/0],i=[1/0,1/0,-1/0,-1/0],n=t.canonicalID();if("Polygon"===e.type){const s=Ue(e.coordinates,i,n),a=qe(t.geometry(),r,i,n);if(!Me(r,i))return !1;for(const t of a)if(!Ce(t,s))return !1}if("MultiPolygon"===e.type){const s=Oe(e.coordinates,i,n),a=qe(t.geometry(),r,i,n);if(!Me(r,i))return !1;for(const t of a)if(!Pe(t,s))return !1}return !0}(t,this.geometries);if("LineString"===t.geometryType())return function(t,e){const r=[1/0,1/0,-1/0,-1/0],i=[1/0,1/0,-1/0,-1/0],n=t.canonicalID();if("Polygon"===e.type){const s=Ue(e.coordinates,i,n),a=Ne(t.geometry(),r,i,n);if(!Me(r,i))return !1;for(const t of a)if(!Re(t,s))return !1}if("MultiPolygon"===e.type){const s=Oe(e.coordinates,i,n),a=Ne(t.geometry(),r,i,n);if(!Me(r,i))return !1;for(const t of a)if(!Le(t,s))return !1}return !0}(t,this.geometries)}return !1}eachChild(){}outputDefined(){return !0}serialize(){return ["within",this.geojson]}}function Ge(t){if(t instanceof Te){if("get"===t.name&&1===t.args.length)return !1;if("feature-state"===t.name)return !1;if("has"===t.name&&1===t.args.length)return !1;if("properties"===t.name||"geometry-type"===t.name||"id"===t.name)return !1;if(/^filter-/.test(t.name))return !1}if(t instanceof je)return !1;let e=!0;return t.eachChild(t=>{e&&!Ge(t)&&(e=!1);}),e}function Ze(t){if(t instanceof Te&&"feature-state"===t.name)return !1;let e=!0;return t.eachChild(t=>{e&&!Ze(t)&&(e=!1);}),e}function Xe(t,e){if(t instanceof Te&&e.indexOf(t.name)>=0)return !1;let r=!0;return t.eachChild(t=>{r&&!Xe(t,e)&&(r=!1);}),r}class Ke{constructor(t,e){this.type=e.type,this.name=t,this.boundExpression=e;}static parse(t,e){if(2!==t.length||"string"!=typeof t[1])return e.error("'var' expression requires exactly one string literal argument.");const r=t[1];return e.scope.has(r)?new Ke(r,e.scope.get(r)):e.error(`Unknown variable "${r}". Make sure "${r}" has been bound in an enclosing "let" expression before using it.`,1)}evaluate(t){return this.boundExpression.evaluate(t)}eachChild(){}outputDefined(){return !1}serialize(){return ["var",this.name]}}class He{constructor(t,e=[],r,i=new Nt,n=[]){this.registry=t,this.path=e,this.key=e.map(t=>`[${t}]`).join(""),this.scope=i,this.errors=n,this.expectedType=r;}parse(t,e,r,i,n={}){return e?this.concat(e,r,i)._parse(t,n):this._parse(t,n)}_parse(t,e){function r(t,e,r){return "assert"===r?new be(e,[t]):"coerce"===r?new Ae(e,[t]):t}if(null!==t&&"string"!=typeof t&&"boolean"!=typeof t&&"number"!=typeof t||(t=["literal",t]),Array.isArray(t)){if(0===t.length)return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');const i=t[0];if("string"!=typeof i)return this.error(`Expression name must be a string, but found ${typeof i} instead. If you wanted a literal array, use ["literal", [...]].`,0),null;const n=this.registry[i];if(n){let i=n.parse(t,this);if(!i)return null;if(this.expectedType){const t=this.expectedType,n=i.type;if("string"!==t.kind&&"number"!==t.kind&&"boolean"!==t.kind&&"object"!==t.kind&&"array"!==t.kind||"value"!==n.kind)if("color"!==t.kind&&"formatted"!==t.kind&&"resolvedImage"!==t.kind||"value"!==n.kind&&"string"!==n.kind){if(this.checkSubtype(t,n))return null}else i=r(i,t,e.typeAnnotation||"coerce");else i=r(i,t,e.typeAnnotation||"assert");}if(!(i instanceof ge)&&"resolvedImage"!==i.type.kind&&function t(e){if(e instanceof Ke)return t(e.boundExpression);if(e instanceof Te&&"error"===e.name)return !1;if(e instanceof ze)return !1;if(e instanceof je)return !1;const r=e instanceof Ae||e instanceof be;let i=!0;return e.eachChild(e=>{i=r?i&&t(e):i&&e instanceof ge;}),!!i&&Ge(e)&&Xe(e,["zoom","heatmap-density","line-progress","sky-radial-progress","accumulated","is-supported-script"])}(i)){const t=new Ie;try{i=new ge(i.type,i.evaluate(t));}catch(t){return this.error(t.message),null}}return i}return this.error(`Unknown expression "${i}". If you wanted a literal array, use ["literal", [...]].`,0)}return this.error(void 0===t?"'undefined' value invalid. Use null instead.":"object"==typeof t?'Bare objects invalid. Use ["literal", {...}] instead.':`Expected an array, but found ${typeof t} instead.`)}concat(t,e,r){const i="number"==typeof t?this.path.concat(t):this.path,n=r?this.scope.concat(r):this.scope;return new He(this.registry,i,e||null,n,this.errors)}error(t,...e){const r=`${this.key}${e.map(t=>`[${t}]`).join("")}`;this.errors.push(new qt(r,t));}checkSubtype(t,e){const r=ie(t,e);return r&&this.error(r),r}}function Ye(t,e){const r=t.length-1;let i,n,s=0,a=r,o=0;for(;s<=a;)if(o=Math.floor((s+a)/2),i=t[o],n=t[o+1],i<=e){if(o===r||e<n)return o;s=o+1;}else {if(!(i>e))throw new xe("Input is not a number.");a=o-1;}return 0}class We{constructor(t,e,r){this.type=t,this.input=e,this.labels=[],this.outputs=[];for(const[t,e]of r)this.labels.push(t),this.outputs.push(e);}static parse(t,e){if(t.length-1<4)return e.error(`Expected at least 4 arguments, but found only ${t.length-1}.`);if((t.length-1)%2!=0)return e.error("Expected an even number of arguments.");const r=e.parse(t[1],1,Gt);if(!r)return null;const i=[];let n=null;e.expectedType&&"value"!==e.expectedType.kind&&(n=e.expectedType);for(let r=1;r<t.length;r+=2){const s=1===r?-1/0:t[r],a=t[r+1],o=r,l=r+1;if("number"!=typeof s)return e.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.',o);if(i.length&&i[i.length-1][0]>=s)return e.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.',o);const u=e.parse(a,l,n);if(!u)return null;n=n||u.type,i.push([s,u]);}return new We(n,r,i)}evaluate(t){const e=this.labels,r=this.outputs;if(1===e.length)return r[0].evaluate(t);const i=this.input.evaluate(t);if(i<=e[0])return r[0].evaluate(t);const n=e.length;return i>=e[n-1]?r[n-1].evaluate(t):r[Ye(e,i)].evaluate(t)}eachChild(t){t(this.input);for(const e of this.outputs)t(e);}outputDefined(){return this.outputs.every(t=>t.outputDefined())}serialize(){const t=["step",this.input.serialize()];for(let e=0;e<this.labels.length;e++)e>0&&t.push(this.labels[e]),t.push(this.outputs[e].serialize());return t}}function Je(t,e,r){return t*(1-r)+e*r}var Qe=Object.freeze({__proto__:null,number:Je,color:function(t,e,r){return new le(Je(t.r,e.r,r),Je(t.g,e.g,r),Je(t.b,e.b,r),Je(t.a,e.a,r))},array:function(t,e,r){return t.map((t,i)=>Je(t,e[i],r))}});const tr=6/29*3*(6/29),er=Math.PI/180,rr=180/Math.PI;function ir(t){return t>.008856451679035631?Math.pow(t,1/3):t/tr+4/29}function nr(t){return t>6/29?t*t*t:tr*(t-4/29)}function sr(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function ar(t){return (t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function or(t){const e=ar(t.r),r=ar(t.g),i=ar(t.b),n=ir((.4124564*e+.3575761*r+.1804375*i)/.95047),s=ir((.2126729*e+.7151522*r+.072175*i)/1);return {l:116*s-16,a:500*(n-s),b:200*(s-ir((.0193339*e+.119192*r+.9503041*i)/1.08883)),alpha:t.a}}function lr(t){let e=(t.l+16)/116,r=isNaN(t.a)?e:e+t.a/500,i=isNaN(t.b)?e:e-t.b/200;return e=1*nr(e),r=.95047*nr(r),i=1.08883*nr(i),new le(sr(3.2404542*r-1.5371385*e-.4985314*i),sr(-.969266*r+1.8760108*e+.041556*i),sr(.0556434*r-.2040259*e+1.0572252*i),t.alpha)}function ur(t,e,r){const i=e-t;return t+r*(i>180||i<-180?i-360*Math.round(i/360):i)}const cr={forward:or,reverse:lr,interpolate:function(t,e,r){return {l:Je(t.l,e.l,r),a:Je(t.a,e.a,r),b:Je(t.b,e.b,r),alpha:Je(t.alpha,e.alpha,r)}}},hr={forward:function(t){const{l:e,a:r,b:i}=or(t),n=Math.atan2(i,r)*rr;return {h:n<0?n+360:n,c:Math.sqrt(r*r+i*i),l:e,alpha:t.a}},reverse:function(t){const e=t.h*er,r=t.c;return lr({l:t.l,a:Math.cos(e)*r,b:Math.sin(e)*r,alpha:t.alpha})},interpolate:function(t,e,r){return {h:ur(t.h,e.h,r),c:Je(t.c,e.c,r),l:Je(t.l,e.l,r),alpha:Je(t.alpha,e.alpha,r)}}};var pr=Object.freeze({__proto__:null,lab:cr,hcl:hr});class dr{constructor(t,e,r,i,n){this.type=t,this.operator=e,this.interpolation=r,this.input=i,this.labels=[],this.outputs=[];for(const[t,e]of n)this.labels.push(t),this.outputs.push(e);}static interpolationFactor(t,r,i,n){let s=0;if("exponential"===t.name)s=fr(r,t.base,i,n);else if("linear"===t.name)s=fr(r,1,i,n);else if("cubic-bezier"===t.name){const a=t.controlPoints;s=new e(a[0],a[1],a[2],a[3]).solve(fr(r,1,i,n));}return s}static parse(t,e){let[r,i,n,...s]=t;if(!Array.isArray(i)||0===i.length)return e.error("Expected an interpolation type expression.",1);if("linear"===i[0])i={name:"linear"};else if("exponential"===i[0]){const t=i[1];if("number"!=typeof t)return e.error("Exponential interpolation requires a numeric base.",1,1);i={name:"exponential",base:t};}else {if("cubic-bezier"!==i[0])return e.error(`Unknown interpolation type ${String(i[0])}`,1,0);{const t=i.slice(1);if(4!==t.length||t.some(t=>"number"!=typeof t||t<0||t>1))return e.error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.",1);i={name:"cubic-bezier",controlPoints:t};}}if(t.length-1<4)return e.error(`Expected at least 4 arguments, but found only ${t.length-1}.`);if((t.length-1)%2!=0)return e.error("Expected an even number of arguments.");if(n=e.parse(n,2,Gt),!n)return null;const a=[];let o=null;"interpolate-hcl"===r||"interpolate-lab"===r?o=Kt:e.expectedType&&"value"!==e.expectedType.kind&&(o=e.expectedType);for(let t=0;t<s.length;t+=2){const r=s[t],i=s[t+1],n=t+3,l=t+4;if("number"!=typeof r)return e.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.',n);if(a.length&&a[a.length-1][0]>=r)return e.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.',n);const u=e.parse(i,l,o);if(!u)return null;o=o||u.type,a.push([r,u]);}return "number"===o.kind||"color"===o.kind||"array"===o.kind&&"number"===o.itemType.kind&&"number"==typeof o.N?new dr(o,r,i,n,a):e.error(`Type ${ee(o)} is not interpolatable.`)}evaluate(t){const e=this.labels,r=this.outputs;if(1===e.length)return r[0].evaluate(t);const i=this.input.evaluate(t);if(i<=e[0])return r[0].evaluate(t);const n=e.length;if(i>=e[n-1])return r[n-1].evaluate(t);const s=Ye(e,i),a=dr.interpolationFactor(this.interpolation,i,e[s],e[s+1]),o=r[s].evaluate(t),l=r[s+1].evaluate(t);return "interpolate"===this.operator?Qe[this.type.kind.toLowerCase()](o,l,a):"interpolate-hcl"===this.operator?hr.reverse(hr.interpolate(hr.forward(o),hr.forward(l),a)):cr.reverse(cr.interpolate(cr.forward(o),cr.forward(l),a))}eachChild(t){t(this.input);for(const e of this.outputs)t(e);}outputDefined(){return this.outputs.every(t=>t.outputDefined())}serialize(){let t;t="linear"===this.interpolation.name?["linear"]:"exponential"===this.interpolation.name?1===this.interpolation.base?["linear"]:["exponential",this.interpolation.base]:["cubic-bezier"].concat(this.interpolation.controlPoints);const e=[this.operator,t,this.input.serialize()];for(let t=0;t<this.labels.length;t++)e.push(this.labels[t],this.outputs[t].serialize());return e}}function fr(t,e,r,i){const n=i-r,s=t-r;return 0===n?0:1===e?s/n:(Math.pow(e,s)-1)/(Math.pow(e,n)-1)}class yr{constructor(t,e){this.type=t,this.args=e;}static parse(t,e){if(t.length<2)return e.error("Expectected at least one argument.");let r=null;const i=e.expectedType;i&&"value"!==i.kind&&(r=i);const n=[];for(const i of t.slice(1)){const t=e.parse(i,1+n.length,r,void 0,{typeAnnotation:"omit"});if(!t)return null;r=r||t.type,n.push(t);}const s=i&&n.some(t=>ie(i,t.type));return new yr(s?Yt:r,n)}evaluate(t){let e,r=null,i=0;for(const n of this.args)if(i++,r=n.evaluate(t),r&&r instanceof pe&&!r.available&&(e||(e=r.name),r=null,i===this.args.length&&(r=e)),null!==r)break;return r}eachChild(t){this.args.forEach(t);}outputDefined(){return this.args.every(t=>t.outputDefined())}serialize(){const t=["coalesce"];return this.eachChild(e=>{t.push(e.serialize());}),t}}class mr{constructor(t,e){this.type=e.type,this.bindings=[].concat(t),this.result=e;}evaluate(t){return this.result.evaluate(t)}eachChild(t){for(const e of this.bindings)t(e[1]);t(this.result);}static parse(t,e){if(t.length<4)return e.error(`Expected at least 3 arguments, but found ${t.length-1} instead.`);const r=[];for(let i=1;i<t.length-1;i+=2){const n=t[i];if("string"!=typeof n)return e.error(`Expected string, but found ${typeof n} instead.`,i);if(/[^a-zA-Z0-9_]/.test(n))return e.error("Variable names must contain only alphanumeric characters or '_'.",i);const s=e.parse(t[i+1],i+1);if(!s)return null;r.push([n,s]);}const i=e.parse(t[t.length-1],t.length-1,e.expectedType,r);return i?new mr(r,i):null}outputDefined(){return this.result.outputDefined()}serialize(){const t=["let"];for(const[e,r]of this.bindings)t.push(e,r.serialize());return t.push(this.result.serialize()),t}}class gr{constructor(t,e,r){this.type=t,this.index=e,this.input=r;}static parse(t,e){if(3!==t.length)return e.error(`Expected 2 arguments, but found ${t.length-1} instead.`);const r=e.parse(t[1],1,Gt),i=e.parse(t[2],2,te(e.expectedType||Yt));return r&&i?new gr(i.type.itemType,r,i):null}evaluate(t){const e=this.index.evaluate(t),r=this.input.evaluate(t);if(e<0)throw new xe(`Array index out of bounds: ${e} < 0.`);if(e>=r.length)throw new xe(`Array index out of bounds: ${e} > ${r.length-1}.`);if(e!==Math.floor(e))throw new xe(`Array index must be an integer, but found ${e} instead.`);return r[e]}eachChild(t){t(this.index),t(this.input);}outputDefined(){return !1}serialize(){return ["at",this.index.serialize(),this.input.serialize()]}}class xr{constructor(t,e){this.type=Xt,this.needle=t,this.haystack=e;}static parse(t,e){if(3!==t.length)return e.error(`Expected 2 arguments, but found ${t.length-1} instead.`);const r=e.parse(t[1],1,Yt),i=e.parse(t[2],2,Yt);return r&&i?ne(r.type,[Xt,Zt,Gt,jt,Yt])?new xr(r,i):e.error(`Expected first argument to be of type boolean, string, number or null, but found ${ee(r.type)} instead`):null}evaluate(t){const e=this.needle.evaluate(t),r=this.haystack.evaluate(t);if(!r)return !1;if(!se(e,["boolean","string","number","null"]))throw new xe(`Expected first argument to be of type boolean, string, number or null, but found ${ee(ye(e))} instead.`);if(!se(r,["string","array"]))throw new xe(`Expected second argument to be of type array or string, but found ${ee(ye(r))} instead.`);return r.indexOf(e)>=0}eachChild(t){t(this.needle),t(this.haystack);}outputDefined(){return !0}serialize(){return ["in",this.needle.serialize(),this.haystack.serialize()]}}class vr{constructor(t,e,r){this.type=Gt,this.needle=t,this.haystack=e,this.fromIndex=r;}static parse(t,e){if(t.length<=2||t.length>=5)return e.error(`Expected 3 or 4 arguments, but found ${t.length-1} instead.`);const r=e.parse(t[1],1,Yt),i=e.parse(t[2],2,Yt);if(!r||!i)return null;if(!ne(r.type,[Xt,Zt,Gt,jt,Yt]))return e.error(`Expected first argument to be of type boolean, string, number or null, but found ${ee(r.type)} instead`);if(4===t.length){const n=e.parse(t[3],3,Gt);return n?new vr(r,i,n):null}return new vr(r,i)}evaluate(t){const e=this.needle.evaluate(t),r=this.haystack.evaluate(t);if(!se(e,["boolean","string","number","null"]))throw new xe(`Expected first argument to be of type boolean, string, number or null, but found ${ee(ye(e))} instead.`);if(!se(r,["string","array"]))throw new xe(`Expected second argument to be of type array or string, but found ${ee(ye(r))} instead.`);if(this.fromIndex){const i=this.fromIndex.evaluate(t);return r.indexOf(e,i)}return r.indexOf(e)}eachChild(t){t(this.needle),t(this.haystack),this.fromIndex&&t(this.fromIndex);}outputDefined(){return !1}serialize(){if(null!=this.fromIndex&&void 0!==this.fromIndex){const t=this.fromIndex.serialize();return ["index-of",this.needle.serialize(),this.haystack.serialize(),t]}return ["index-of",this.needle.serialize(),this.haystack.serialize()]}}class br{constructor(t,e,r,i,n,s){this.inputType=t,this.type=e,this.input=r,this.cases=i,this.outputs=n,this.otherwise=s;}static parse(t,e){if(t.length<5)return e.error(`Expected at least 4 arguments, but found only ${t.length-1}.`);if(t.length%2!=1)return e.error("Expected an even number of arguments.");let r,i;e.expectedType&&"value"!==e.expectedType.kind&&(i=e.expectedType);const n={},s=[];for(let a=2;a<t.length-1;a+=2){let o=t[a];const l=t[a+1];Array.isArray(o)||(o=[o]);const u=e.concat(a);if(0===o.length)return u.error("Expected at least one branch label.");for(const t of o){if("number"!=typeof t&&"string"!=typeof t)return u.error("Branch labels must be numbers or strings.");if("number"==typeof t&&Math.abs(t)>Number.MAX_SAFE_INTEGER)return u.error(`Branch labels must be integers no larger than ${Number.MAX_SAFE_INTEGER}.`);if("number"==typeof t&&Math.floor(t)!==t)return u.error("Numeric branch labels must be integer values.");if(r){if(u.checkSubtype(r,ye(t)))return null}else r=ye(t);if(void 0!==n[String(t)])return u.error("Branch labels must be unique.");n[String(t)]=s.length;}const c=e.parse(l,a,i);if(!c)return null;i=i||c.type,s.push(c);}const a=e.parse(t[1],1,Yt);if(!a)return null;const o=e.parse(t[t.length-1],t.length-1,i);return o?"value"!==a.type.kind&&e.concat(1).checkSubtype(r,a.type)?null:new br(r,i,a,n,s,o):null}evaluate(t){const e=this.input.evaluate(t);return (ye(e)===this.inputType&&this.outputs[this.cases[e]]||this.otherwise).evaluate(t)}eachChild(t){t(this.input),this.outputs.forEach(t),t(this.otherwise);}outputDefined(){return this.outputs.every(t=>t.outputDefined())&&this.otherwise.outputDefined()}serialize(){const t=["match",this.input.serialize()],e=Object.keys(this.cases).sort(),r=[],i={};for(const t of e){const e=i[this.cases[t]];void 0===e?(i[this.cases[t]]=r.length,r.push([this.cases[t],[t]])):r[e][1].push(t);}const n=t=>"number"===this.inputType.kind?Number(t):t;for(const[e,i]of r)t.push(1===i.length?n(i[0]):i.map(n)),t.push(this.outputs[e].serialize());return t.push(this.otherwise.serialize()),t}}class wr{constructor(t,e,r){this.type=t,this.branches=e,this.otherwise=r;}static parse(t,e){if(t.length<4)return e.error(`Expected at least 3 arguments, but found only ${t.length-1}.`);if(t.length%2!=0)return e.error("Expected an odd number of arguments.");let r;e.expectedType&&"value"!==e.expectedType.kind&&(r=e.expectedType);const i=[];for(let n=1;n<t.length-1;n+=2){const s=e.parse(t[n],n,Xt);if(!s)return null;const a=e.parse(t[n+1],n+1,r);if(!a)return null;i.push([s,a]),r=r||a.type;}const n=e.parse(t[t.length-1],t.length-1,r);return n?new wr(r,i,n):null}evaluate(t){for(const[e,r]of this.branches)if(e.evaluate(t))return r.evaluate(t);return this.otherwise.evaluate(t)}eachChild(t){for(const[e,r]of this.branches)t(e),t(r);t(this.otherwise);}outputDefined(){return this.branches.every(([t,e])=>e.outputDefined())&&this.otherwise.outputDefined()}serialize(){const t=["case"];return this.eachChild(e=>{t.push(e.serialize());}),t}}class _r{constructor(t,e,r,i){this.type=t,this.input=e,this.beginIndex=r,this.endIndex=i;}static parse(t,e){if(t.length<=2||t.length>=5)return e.error(`Expected 3 or 4 arguments, but found ${t.length-1} instead.`);const r=e.parse(t[1],1,Yt),i=e.parse(t[2],2,Gt);if(!r||!i)return null;if(!ne(r.type,[te(Yt),Zt,Yt]))return e.error(`Expected first argument to be of type array or string, but found ${ee(r.type)} instead`);if(4===t.length){const n=e.parse(t[3],3,Gt);return n?new _r(r.type,r,i,n):null}return new _r(r.type,r,i)}evaluate(t){const e=this.input.evaluate(t),r=this.beginIndex.evaluate(t);if(!se(e,["string","array"]))throw new xe(`Expected first argument to be of type array or string, but found ${ee(ye(e))} instead.`);if(this.endIndex){const i=this.endIndex.evaluate(t);return e.slice(r,i)}return e.slice(r)}eachChild(t){t(this.input),t(this.beginIndex),this.endIndex&&t(this.endIndex);}outputDefined(){return !1}serialize(){if(null!=this.endIndex&&void 0!==this.endIndex){const t=this.endIndex.serialize();return ["slice",this.input.serialize(),this.beginIndex.serialize(),t]}return ["slice",this.input.serialize(),this.beginIndex.serialize()]}}function kr(t,e){return "=="===t||"!="===t?"boolean"===e.kind||"string"===e.kind||"number"===e.kind||"null"===e.kind||"value"===e.kind:"string"===e.kind||"number"===e.kind||"value"===e.kind}function Ar(t,e,r,i){return 0===i.compare(e,r)}function Sr(t,e,r){const i="=="!==t&&"!="!==t;return class n{constructor(t,e,r){this.type=Xt,this.lhs=t,this.rhs=e,this.collator=r,this.hasUntypedArgument="value"===t.type.kind||"value"===e.type.kind;}static parse(t,e){if(3!==t.length&&4!==t.length)return e.error("Expected two or three arguments.");const r=t[0];let s=e.parse(t[1],1,Yt);if(!s)return null;if(!kr(r,s.type))return e.concat(1).error(`"${r}" comparisons are not supported for type '${ee(s.type)}'.`);let a=e.parse(t[2],2,Yt);if(!a)return null;if(!kr(r,a.type))return e.concat(2).error(`"${r}" comparisons are not supported for type '${ee(a.type)}'.`);if(s.type.kind!==a.type.kind&&"value"!==s.type.kind&&"value"!==a.type.kind)return e.error(`Cannot compare types '${ee(s.type)}' and '${ee(a.type)}'.`);i&&("value"===s.type.kind&&"value"!==a.type.kind?s=new be(a.type,[s]):"value"!==s.type.kind&&"value"===a.type.kind&&(a=new be(s.type,[a])));let o=null;if(4===t.length){if("string"!==s.type.kind&&"string"!==a.type.kind&&"value"!==s.type.kind&&"value"!==a.type.kind)return e.error("Cannot use collator to compare non-string types.");if(o=e.parse(t[3],3,Wt),!o)return null}return new n(s,a,o)}evaluate(n){const s=this.lhs.evaluate(n),a=this.rhs.evaluate(n);if(i&&this.hasUntypedArgument){const e=ye(s),r=ye(a);if(e.kind!==r.kind||"string"!==e.kind&&"number"!==e.kind)throw new xe(`Expected arguments for "${t}" to be (string, string) or (number, number), but found (${e.kind}, ${r.kind}) instead.`)}if(this.collator&&!i&&this.hasUntypedArgument){const t=ye(s),r=ye(a);if("string"!==t.kind||"string"!==r.kind)return e(n,s,a)}return this.collator?r(n,s,a,this.collator.evaluate(n)):e(n,s,a)}eachChild(t){t(this.lhs),t(this.rhs),this.collator&&t(this.collator);}outputDefined(){return !0}serialize(){const e=[t];return this.eachChild(t=>{e.push(t.serialize());}),e}}}const Ir=Sr("==",(function(t,e,r){return e===r}),Ar),Tr=Sr("!=",(function(t,e,r){return e!==r}),(function(t,e,r,i){return !Ar(0,e,r,i)})),zr=Sr("<",(function(t,e,r){return e<r}),(function(t,e,r,i){return i.compare(e,r)<0})),Er=Sr(">",(function(t,e,r){return e>r}),(function(t,e,r,i){return i.compare(e,r)>0})),Mr=Sr("<=",(function(t,e,r){return e<=r}),(function(t,e,r,i){return i.compare(e,r)<=0}));class Br{constructor(t,e,r,i,n){this.type=Zt,this.number=t,this.locale=e,this.currency=r,this.minFractionDigits=i,this.maxFractionDigits=n;}static parse(t,e){if(3!==t.length)return e.error("Expected two arguments.");const r=e.parse(t[1],1,Gt);if(!r)return null;const i=t[2];if("object"!=typeof i||Array.isArray(i))return e.error("NumberFormat options argument must be an object.");let n=null;if(i.locale&&(n=e.parse(i.locale,1,Zt),!n))return null;let s=null;if(i.currency&&(s=e.parse(i.currency,1,Zt),!s))return null;let a=null;if(i["min-fraction-digits"]&&(a=e.parse(i["min-fraction-digits"],1,Gt),!a))return null;let o=null;return i["max-fraction-digits"]&&(o=e.parse(i["max-fraction-digits"],1,Gt),!o)?null:new Br(r,n,s,a,o)}evaluate(t){return new Intl.NumberFormat(this.locale?this.locale.evaluate(t):[],{style:this.currency?"currency":"decimal",currency:this.currency?this.currency.evaluate(t):void 0,minimumFractionDigits:this.minFractionDigits?this.minFractionDigits.evaluate(t):void 0,maximumFractionDigits:this.maxFractionDigits?this.maxFractionDigits.evaluate(t):void 0}).format(this.number.evaluate(t))}eachChild(t){t(this.number),this.locale&&t(this.locale),this.currency&&t(this.currency),this.minFractionDigits&&t(this.minFractionDigits),this.maxFractionDigits&&t(this.maxFractionDigits);}outputDefined(){return !1}serialize(){const t={};return this.locale&&(t.locale=this.locale.serialize()),this.currency&&(t.currency=this.currency.serialize()),this.minFractionDigits&&(t["min-fraction-digits"]=this.minFractionDigits.serialize()),this.maxFractionDigits&&(t["max-fraction-digits"]=this.maxFractionDigits.serialize()),["number-format",this.number.serialize(),t]}}class Dr{constructor(t){this.type=Gt,this.input=t;}static parse(t,e){if(2!==t.length)return e.error(`Expected 1 argument, but found ${t.length-1} instead.`);const r=e.parse(t[1],1);return r?"array"!==r.type.kind&&"string"!==r.type.kind&&"value"!==r.type.kind?e.error(`Expected argument of type string or array, but found ${ee(r.type)} instead.`):new Dr(r):null}evaluate(t){const e=this.input.evaluate(t);if("string"==typeof e)return e.length;if(Array.isArray(e))return e.length;throw new xe(`Expected value to be of type string or array, but found ${ee(ye(e))} instead.`)}eachChild(t){t(this.input);}outputDefined(){return !1}serialize(){const t=["length"];return this.eachChild(e=>{t.push(e.serialize());}),t}}const Cr={"==":Ir,"!=":Tr,">":Er,"<":zr,">=":Sr(">=",(function(t,e,r){return e>=r}),(function(t,e,r,i){return i.compare(e,r)>=0})),"<=":Mr,array:be,at:gr,boolean:be,case:wr,coalesce:yr,collator:ze,format:we,image:_e,in:xr,"index-of":vr,interpolate:dr,"interpolate-hcl":dr,"interpolate-lab":dr,length:Dr,let:mr,literal:ge,match:br,number:be,"number-format":Br,object:be,slice:_r,step:We,string:be,"to-boolean":Ae,"to-color":Ae,"to-number":Ae,"to-string":Ae,var:Ke,within:je};function Pr(t,[e,r,i,n]){e=e.evaluate(t),r=r.evaluate(t),i=i.evaluate(t);const s=n?n.evaluate(t):1,a=de(e,r,i,s);if(a)throw new xe(a);return new le(e/255*s,r/255*s,i/255*s,s)}function Vr(t,e){return t in e}function Fr(t,e){const r=e[t];return void 0===r?null:r}function Rr(t){return {type:t}}function Lr(t){return {result:"success",value:t}}function Ur(t){return {result:"error",value:t}}function Or(t){return "data-driven"===t["property-type"]||"cross-faded-data-driven"===t["property-type"]}function $r(t){return !!t.expression&&t.expression.parameters.indexOf("zoom")>-1}function qr(t){return !!t.expression&&t.expression.interpolated}function Nr(t){return t instanceof Number?"number":t instanceof String?"string":t instanceof Boolean?"boolean":Array.isArray(t)?"array":null===t?"null":typeof t}function jr(t){return "object"==typeof t&&null!==t&&!Array.isArray(t)}function Gr(t){return t}function Zr(t,e,r){return void 0!==t?t:void 0!==e?e:void 0!==r?r:void 0}function Xr(t,e,r,i,n){return Zr(typeof r===n?i[r]:void 0,t.default,e.default)}function Kr(t,e,r){if("number"!==Nr(r))return Zr(t.default,e.default);const i=t.stops.length;if(1===i)return t.stops[0][1];if(r<=t.stops[0][0])return t.stops[0][1];if(r>=t.stops[i-1][0])return t.stops[i-1][1];const n=Ye(t.stops.map(t=>t[0]),r);return t.stops[n][1]}function Hr(t,e,r){const i=void 0!==t.base?t.base:1;if("number"!==Nr(r))return Zr(t.default,e.default);const n=t.stops.length;if(1===n)return t.stops[0][1];if(r<=t.stops[0][0])return t.stops[0][1];if(r>=t.stops[n-1][0])return t.stops[n-1][1];const s=Ye(t.stops.map(t=>t[0]),r),a=function(t,e,r,i){const n=i-r,s=t-r;return 0===n?0:1===e?s/n:(Math.pow(e,s)-1)/(Math.pow(e,n)-1)}(r,i,t.stops[s][0],t.stops[s+1][0]),o=t.stops[s][1],l=t.stops[s+1][1];let u=Qe[e.type]||Gr;if(t.colorSpace&&"rgb"!==t.colorSpace){const e=pr[t.colorSpace];u=(t,r)=>e.reverse(e.interpolate(e.forward(t),e.forward(r),a));}return "function"==typeof o.evaluate?{evaluate(...t){const e=o.evaluate.apply(void 0,t),r=l.evaluate.apply(void 0,t);if(void 0!==e&&void 0!==r)return u(e,r,a)}}:u(o,l,a)}function Yr(t,e,r){return "color"===e.type?r=le.parse(r):"formatted"===e.type?r=he.fromString(r.toString()):"resolvedImage"===e.type?r=pe.fromString(r.toString()):Nr(r)===e.type||"enum"===e.type&&e.values[r]||(r=void 0),Zr(r,t.default,e.default)}Te.register(Cr,{error:[{kind:"error"},[Zt],(t,[e])=>{throw new xe(e.evaluate(t))}],typeof:[Zt,[Yt],(t,[e])=>ee(ye(e.evaluate(t)))],"to-rgba":[te(Gt,4),[Kt],(t,[e])=>e.evaluate(t).toArray()],rgb:[Kt,[Gt,Gt,Gt],Pr],rgba:[Kt,[Gt,Gt,Gt,Gt],Pr],has:{type:Xt,overloads:[[[Zt],(t,[e])=>Vr(e.evaluate(t),t.properties())],[[Zt,Ht],(t,[e,r])=>Vr(e.evaluate(t),r.evaluate(t))]]},get:{type:Yt,overloads:[[[Zt],(t,[e])=>Fr(e.evaluate(t),t.properties())],[[Zt,Ht],(t,[e,r])=>Fr(e.evaluate(t),r.evaluate(t))]]},"feature-state":[Yt,[Zt],(t,[e])=>Fr(e.evaluate(t),t.featureState||{})],properties:[Ht,[],t=>t.properties()],"geometry-type":[Zt,[],t=>t.geometryType()],id:[Yt,[],t=>t.id()],zoom:[Gt,[],t=>t.globals.zoom],"heatmap-density":[Gt,[],t=>t.globals.heatmapDensity||0],"line-progress":[Gt,[],t=>t.globals.lineProgress||0],"sky-radial-progress":[Gt,[],t=>t.globals.skyRadialProgress||0],accumulated:[Yt,[],t=>void 0===t.globals.accumulated?null:t.globals.accumulated],"+":[Gt,Rr(Gt),(t,e)=>{let r=0;for(const i of e)r+=i.evaluate(t);return r}],"*":[Gt,Rr(Gt),(t,e)=>{let r=1;for(const i of e)r*=i.evaluate(t);return r}],"-":{type:Gt,overloads:[[[Gt,Gt],(t,[e,r])=>e.evaluate(t)-r.evaluate(t)],[[Gt],(t,[e])=>-e.evaluate(t)]]},"/":[Gt,[Gt,Gt],(t,[e,r])=>e.evaluate(t)/r.evaluate(t)],"%":[Gt,[Gt,Gt],(t,[e,r])=>e.evaluate(t)%r.evaluate(t)],ln2:[Gt,[],()=>Math.LN2],pi:[Gt,[],()=>Math.PI],e:[Gt,[],()=>Math.E],"^":[Gt,[Gt,Gt],(t,[e,r])=>Math.pow(e.evaluate(t),r.evaluate(t))],sqrt:[Gt,[Gt],(t,[e])=>Math.sqrt(e.evaluate(t))],log10:[Gt,[Gt],(t,[e])=>Math.log(e.evaluate(t))/Math.LN10],ln:[Gt,[Gt],(t,[e])=>Math.log(e.evaluate(t))],log2:[Gt,[Gt],(t,[e])=>Math.log(e.evaluate(t))/Math.LN2],sin:[Gt,[Gt],(t,[e])=>Math.sin(e.evaluate(t))],cos:[Gt,[Gt],(t,[e])=>Math.cos(e.evaluate(t))],tan:[Gt,[Gt],(t,[e])=>Math.tan(e.evaluate(t))],asin:[Gt,[Gt],(t,[e])=>Math.asin(e.evaluate(t))],acos:[Gt,[Gt],(t,[e])=>Math.acos(e.evaluate(t))],atan:[Gt,[Gt],(t,[e])=>Math.atan(e.evaluate(t))],min:[Gt,Rr(Gt),(t,e)=>Math.min(...e.map(e=>e.evaluate(t)))],max:[Gt,Rr(Gt),(t,e)=>Math.max(...e.map(e=>e.evaluate(t)))],abs:[Gt,[Gt],(t,[e])=>Math.abs(e.evaluate(t))],round:[Gt,[Gt],(t,[e])=>{const r=e.evaluate(t);return r<0?-Math.round(-r):Math.round(r)}],floor:[Gt,[Gt],(t,[e])=>Math.floor(e.evaluate(t))],ceil:[Gt,[Gt],(t,[e])=>Math.ceil(e.evaluate(t))],"filter-==":[Xt,[Zt,Yt],(t,[e,r])=>t.properties()[e.value]===r.value],"filter-id-==":[Xt,[Yt],(t,[e])=>t.id()===e.value],"filter-type-==":[Xt,[Zt],(t,[e])=>t.geometryType()===e.value],"filter-<":[Xt,[Zt,Yt],(t,[e,r])=>{const i=t.properties()[e.value],n=r.value;return typeof i==typeof n&&i<n}],"filter-id-<":[Xt,[Yt],(t,[e])=>{const r=t.id(),i=e.value;return typeof r==typeof i&&r<i}],"filter->":[Xt,[Zt,Yt],(t,[e,r])=>{const i=t.properties()[e.value],n=r.value;return typeof i==typeof n&&i>n}],"filter-id->":[Xt,[Yt],(t,[e])=>{const r=t.id(),i=e.value;return typeof r==typeof i&&r>i}],"filter-<=":[Xt,[Zt,Yt],(t,[e,r])=>{const i=t.properties()[e.value],n=r.value;return typeof i==typeof n&&i<=n}],"filter-id-<=":[Xt,[Yt],(t,[e])=>{const r=t.id(),i=e.value;return typeof r==typeof i&&r<=i}],"filter->=":[Xt,[Zt,Yt],(t,[e,r])=>{const i=t.properties()[e.value],n=r.value;return typeof i==typeof n&&i>=n}],"filter-id->=":[Xt,[Yt],(t,[e])=>{const r=t.id(),i=e.value;return typeof r==typeof i&&r>=i}],"filter-has":[Xt,[Yt],(t,[e])=>e.value in t.properties()],"filter-has-id":[Xt,[],t=>null!==t.id()&&void 0!==t.id()],"filter-type-in":[Xt,[te(Zt)],(t,[e])=>e.value.indexOf(t.geometryType())>=0],"filter-id-in":[Xt,[te(Yt)],(t,[e])=>e.value.indexOf(t.id())>=0],"filter-in-small":[Xt,[Zt,te(Yt)],(t,[e,r])=>r.value.indexOf(t.properties()[e.value])>=0],"filter-in-large":[Xt,[Zt,te(Yt)],(t,[e,r])=>function(t,e,r,i){for(;r<=i;){const n=r+i>>1;if(e[n]===t)return !0;e[n]>t?i=n-1:r=n+1;}return !1}(t.properties()[e.value],r.value,0,r.value.length-1)],all:{type:Xt,overloads:[[[Xt,Xt],(t,[e,r])=>e.evaluate(t)&&r.evaluate(t)],[Rr(Xt),(t,e)=>{for(const r of e)if(!r.evaluate(t))return !1;return !0}]]},any:{type:Xt,overloads:[[[Xt,Xt],(t,[e,r])=>e.evaluate(t)||r.evaluate(t)],[Rr(Xt),(t,e)=>{for(const r of e)if(r.evaluate(t))return !0;return !1}]]},"!":[Xt,[Xt],(t,[e])=>!e.evaluate(t)],"is-supported-script":[Xt,[Zt],(t,[e])=>{const r=t.globals&&t.globals.isSupportedScript;return !r||r(e.evaluate(t))}],upcase:[Zt,[Zt],(t,[e])=>e.evaluate(t).toUpperCase()],downcase:[Zt,[Zt],(t,[e])=>e.evaluate(t).toLowerCase()],concat:[Zt,Rr(Yt),(t,e)=>e.map(e=>me(e.evaluate(t))).join("")],"resolved-locale":[Zt,[Wt],(t,[e])=>e.evaluate(t).resolvedLocale()]});class Wr{constructor(t,e){this.expression=t,this._warningHistory={},this._evaluator=new Ie,this._defaultValue=e?function(t){return "color"===t.type&&jr(t.default)?new le(0,0,0,0):"color"===t.type?le.parse(t.default)||null:void 0===t.default?null:t.default}(e):null,this._enumValues=e&&"enum"===e.type?e.values:null;}evaluateWithoutErrorHandling(t,e,r,i,n,s){return this._evaluator.globals=t,this._evaluator.feature=e,this._evaluator.featureState=r,this._evaluator.canonical=i,this._evaluator.availableImages=n||null,this._evaluator.formattedSection=s,this.expression.evaluate(this._evaluator)}evaluate(t,e,r,i,n,s){this._evaluator.globals=t,this._evaluator.feature=e||null,this._evaluator.featureState=r||null,this._evaluator.canonical=i,this._evaluator.availableImages=n||null,this._evaluator.formattedSection=s||null;try{const t=this.expression.evaluate(this._evaluator);if(null==t||"number"==typeof t&&t!=t)return this._defaultValue;if(this._enumValues&&!(t in this._enumValues))throw new xe(`Expected value to be one of ${Object.keys(this._enumValues).map(t=>JSON.stringify(t)).join(", ")}, but found ${JSON.stringify(t)} instead.`);return t}catch(t){return this._warningHistory[t.message]||(this._warningHistory[t.message]=!0,"undefined"!=typeof console&&console.warn(t.message)),this._defaultValue}}}function Jr(t){return Array.isArray(t)&&t.length>0&&"string"==typeof t[0]&&t[0]in Cr}function Qr(t,e){const r=new He(Cr,[],e?function(t){const e={color:Kt,string:Zt,number:Gt,enum:Zt,boolean:Xt,formatted:Jt,resolvedImage:Qt};return "array"===t.type?te(e[t.value]||Yt,t.length):e[t.type]}(e):void 0),i=r.parse(t,void 0,void 0,void 0,e&&"string"===e.type?{typeAnnotation:"coerce"}:void 0);return i?Lr(new Wr(i,e)):Ur(r.errors)}class ti{constructor(t,e){this.kind=t,this._styleExpression=e,this.isStateDependent="constant"!==t&&!Ze(e.expression);}evaluateWithoutErrorHandling(t,e,r,i,n,s){return this._styleExpression.evaluateWithoutErrorHandling(t,e,r,i,n,s)}evaluate(t,e,r,i,n,s){return this._styleExpression.evaluate(t,e,r,i,n,s)}}class ei{constructor(t,e,r,i){this.kind=t,this.zoomStops=r,this._styleExpression=e,this.isStateDependent="camera"!==t&&!Ze(e.expression),this.interpolationType=i;}evaluateWithoutErrorHandling(t,e,r,i,n,s){return this._styleExpression.evaluateWithoutErrorHandling(t,e,r,i,n,s)}evaluate(t,e,r,i,n,s){return this._styleExpression.evaluate(t,e,r,i,n,s)}interpolationFactor(t,e,r){return this.interpolationType?dr.interpolationFactor(this.interpolationType,t,e,r):0}}function ri(t,e){if("error"===(t=Qr(t,e)).result)return t;const r=t.value.expression,i=Ge(r);if(!i&&!Or(e))return Ur([new qt("","data expressions not supported")]);const n=Xe(r,["zoom"]);if(!n&&!$r(e))return Ur([new qt("","zoom expressions not supported")]);const s=function t(e){let r=null;if(e instanceof mr)r=t(e.result);else if(e instanceof yr){for(const i of e.args)if(r=t(i),r)break}else (e instanceof We||e instanceof dr)&&e.input instanceof Te&&"zoom"===e.input.name&&(r=e);return r instanceof qt||e.eachChild(e=>{const i=t(e);i instanceof qt?r=i:!r&&i?r=new qt("",'"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.'):r&&i&&r!==i&&(r=new qt("",'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.'));}),r}(r);return s||n?s instanceof qt?Ur([s]):s instanceof dr&&!qr(e)?Ur([new qt("",'"interpolate" expressions cannot be used with this property')]):Lr(s?new ei(i?"camera":"composite",t.value,s.labels,s instanceof dr?s.interpolation:void 0):new ti(i?"constant":"source",t.value)):Ur([new qt("",'"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')])}class ii{constructor(t,e){this._parameters=t,this._specification=e,Ut(this,function t(e,r){const i="color"===r.type,n=e.stops&&"object"==typeof e.stops[0][0],s=n||!(n||void 0!==e.property),a=e.type||(qr(r)?"exponential":"interval");if(i&&((e=Ut({},e)).stops&&(e.stops=e.stops.map(t=>[t[0],le.parse(t[1])])),e.default=le.parse(e.default?e.default:r.default)),e.colorSpace&&"rgb"!==e.colorSpace&&!pr[e.colorSpace])throw new Error(`Unknown color space: ${e.colorSpace}`);let o,l,u;if("exponential"===a)o=Hr;else if("interval"===a)o=Kr;else if("categorical"===a){o=Xr,l=Object.create(null);for(const t of e.stops)l[t[0]]=t[1];u=typeof e.stops[0][0];}else {if("identity"!==a)throw new Error(`Unknown function type "${a}"`);o=Yr;}if(n){const i={},n=[];for(let t=0;t<e.stops.length;t++){const r=e.stops[t],s=r[0].zoom;void 0===i[s]&&(i[s]={zoom:s,type:e.type,property:e.property,default:e.default,stops:[]},n.push(s)),i[s].stops.push([r[0].value,r[1]]);}const s=[];for(const e of n)s.push([i[e].zoom,t(i[e],r)]);const a={name:"linear"};return {kind:"composite",interpolationType:a,interpolationFactor:dr.interpolationFactor.bind(void 0,a),zoomStops:s.map(t=>t[0]),evaluate:({zoom:t},i)=>Hr({stops:s,base:e.base},r,t).evaluate(t,i)}}if(s){const t="exponential"===a?{name:"exponential",base:void 0!==e.base?e.base:1}:null;return {kind:"camera",interpolationType:t,interpolationFactor:dr.interpolationFactor.bind(void 0,t),zoomStops:e.stops.map(t=>t[0]),evaluate:({zoom:t})=>o(e,r,t,l,u)}}return {kind:"source",evaluate(t,i){const n=i&&i.properties?i.properties[e.property]:void 0;return void 0===n?Zr(e.default,r.default):o(e,r,n,l,u)}}}(this._parameters,this._specification));}static deserialize(t){return new ii(t._parameters,t._specification)}static serialize(t){return {_parameters:t._parameters,_specification:t._specification}}}function ni(t){const e=t.key,r=t.value,i=t.valueSpec||{},n=t.objectElementValidators||{},s=t.style,a=t.styleSpec;let o=[];const l=Nr(r);if("object"!==l)return [new Rt(e,r,`object expected, ${l} found`)];for(const t in r){const l=t.split(".")[0],u=i[l]||i["*"];let c;if(n[l])c=n[l];else if(i[l])c=Mi;else if(n["*"])c=n["*"];else {if(!i["*"]){o.push(new Rt(e,r[t],`unknown property "${t}"`));continue}c=Mi;}o=o.concat(c({key:(e?`${e}.`:e)+t,value:r[t],valueSpec:u,style:s,styleSpec:a,object:r,objectKey:t},r));}for(const t in i)n[t]||i[t].required&&void 0===i[t].default&&void 0===r[t]&&o.push(new Rt(e,r,`missing required property "${t}"`));return o}function si(t){const e=t.value,r=t.valueSpec,i=t.style,n=t.styleSpec,s=t.key,a=t.arrayElementValidator||Mi;if("array"!==Nr(e))return [new Rt(s,e,`array expected, ${Nr(e)} found`)];if(r.length&&e.length!==r.length)return [new Rt(s,e,`array length ${r.length} expected, length ${e.length} found`)];if(r["min-length"]&&e.length<r["min-length"])return [new Rt(s,e,`array length at least ${r["min-length"]} expected, length ${e.length} found`)];let o={type:r.value,values:r.values,minimum:r.minimum,maximum:r.maximum};n.$version<7&&(o.function=r.function),"object"===Nr(r.value)&&(o=r.value);let l=[];for(let t=0;t<e.length;t++)l=l.concat(a({array:e,arrayIndex:t,value:e[t],valueSpec:o,style:i,styleSpec:n,key:`${s}[${t}]`}));return l}function ai(t){const e=t.key,r=t.value,i=t.valueSpec;let n=Nr(r);if("number"===n&&r!=r&&(n="NaN"),"number"!==n)return [new Rt(e,r,`number expected, ${n} found`)];if("minimum"in i){let n=i.minimum;if("array"===Nr(i.minimum)&&(n=i.minimum[t.arrayIndex]),r<n)return [new Rt(e,r,`${r} is less than the minimum value ${n}`)]}if("maximum"in i){let n=i.maximum;if("array"===Nr(i.maximum)&&(n=i.maximum[t.arrayIndex]),r>n)return [new Rt(e,r,`${r} is greater than the maximum value ${n}`)]}return []}function oi(t){const e=t.valueSpec,r=Ot(t.value.type);let i,n,s,a={};const o="categorical"!==r&&void 0===t.value.property,l=!o,u="array"===Nr(t.value.stops)&&"array"===Nr(t.value.stops[0])&&"object"===Nr(t.value.stops[0][0]),c=ni({key:t.key,value:t.value,valueSpec:t.styleSpec.function,style:t.style,styleSpec:t.styleSpec,objectElementValidators:{stops:function(t){if("identity"===r)return [new Rt(t.key,t.value,'identity function may not have a "stops" property')];let e=[];const i=t.value;return e=e.concat(si({key:t.key,value:i,valueSpec:t.valueSpec,style:t.style,styleSpec:t.styleSpec,arrayElementValidator:h})),"array"===Nr(i)&&0===i.length&&e.push(new Rt(t.key,i,"array must have at least one stop")),e},default:function(t){return Mi({key:t.key,value:t.value,valueSpec:e,style:t.style,styleSpec:t.styleSpec})}}});return "identity"===r&&o&&c.push(new Rt(t.key,t.value,'missing required property "property"')),"identity"===r||t.value.stops||c.push(new Rt(t.key,t.value,'missing required property "stops"')),"exponential"===r&&t.valueSpec.expression&&!qr(t.valueSpec)&&c.push(new Rt(t.key,t.value,"exponential functions not supported")),t.styleSpec.$version>=8&&(l&&!Or(t.valueSpec)?c.push(new Rt(t.key,t.value,"property functions not supported")):o&&!$r(t.valueSpec)&&c.push(new Rt(t.key,t.value,"zoom functions not supported"))),"categorical"!==r&&!u||void 0!==t.value.property||c.push(new Rt(t.key,t.value,'"property" property is required')),c;function h(t){let r=[];const i=t.value,o=t.key;if("array"!==Nr(i))return [new Rt(o,i,`array expected, ${Nr(i)} found`)];if(2!==i.length)return [new Rt(o,i,`array length 2 expected, length ${i.length} found`)];if(u){if("object"!==Nr(i[0]))return [new Rt(o,i,`object expected, ${Nr(i[0])} found`)];if(void 0===i[0].zoom)return [new Rt(o,i,"object stop key must have zoom")];if(void 0===i[0].value)return [new Rt(o,i,"object stop key must have value")];if(s&&s>Ot(i[0].zoom))return [new Rt(o,i[0].zoom,"stop zoom values must appear in ascending order")];Ot(i[0].zoom)!==s&&(s=Ot(i[0].zoom),n=void 0,a={}),r=r.concat(ni({key:`${o}[0]`,value:i[0],valueSpec:{zoom:{}},style:t.style,styleSpec:t.styleSpec,objectElementValidators:{zoom:ai,value:p}}));}else r=r.concat(p({key:`${o}[0]`,value:i[0],valueSpec:{},style:t.style,styleSpec:t.styleSpec},i));return Jr($t(i[1]))?r.concat([new Rt(`${o}[1]`,i[1],"expressions are not allowed in function stops.")]):r.concat(Mi({key:`${o}[1]`,value:i[1],valueSpec:e,style:t.style,styleSpec:t.styleSpec}))}function p(t,s){const o=Nr(t.value),l=Ot(t.value),u=null!==t.value?t.value:s;if(i){if(o!==i)return [new Rt(t.key,u,`${o} stop domain type must match previous stop domain type ${i}`)]}else i=o;if("number"!==o&&"string"!==o&&"boolean"!==o)return [new Rt(t.key,u,"stop domain value must be a number, string, or boolean")];if("number"!==o&&"categorical"!==r){let i=`number expected, ${o} found`;return Or(e)&&void 0===r&&(i+='\nIf you intended to use a categorical function, specify `"type": "categorical"`.'),[new Rt(t.key,u,i)]}return "categorical"!==r||"number"!==o||isFinite(l)&&Math.floor(l)===l?"categorical"!==r&&"number"===o&&void 0!==n&&l<n?[new Rt(t.key,u,"stop domain values must appear in ascending order")]:(n=l,"categorical"===r&&l in a?[new Rt(t.key,u,"stop domain values must be unique")]:(a[l]=!0,[])):[new Rt(t.key,u,`integer expected, found ${l}`)]}}function li(t){const e=("property"===t.expressionContext?ri:Qr)($t(t.value),t.valueSpec);if("error"===e.result)return e.value.map(e=>new Rt(`${t.key}${e.key}`,t.value,e.message));const r=e.value.expression||e.value._styleExpression.expression;if("property"===t.expressionContext&&"text-font"===t.propertyKey&&!r.outputDefined())return [new Rt(t.key,t.value,`Invalid data expression for "${t.propertyKey}". Output values must be contained as literals within the expression.`)];if("property"===t.expressionContext&&"layout"===t.propertyType&&!Ze(r))return [new Rt(t.key,t.value,'"feature-state" data expressions are not supported with layout properties.')];if("filter"===t.expressionContext&&!Ze(r))return [new Rt(t.key,t.value,'"feature-state" data expressions are not supported with filters.')];if(t.expressionContext&&0===t.expressionContext.indexOf("cluster")){if(!Xe(r,["zoom","feature-state"]))return [new Rt(t.key,t.value,'"zoom" and "feature-state" expressions are not supported with cluster properties.')];if("cluster-initial"===t.expressionContext&&!Ge(r))return [new Rt(t.key,t.value,"Feature data expressions are not supported with initial expression part of cluster properties.")]}return []}function ui(t){const e=t.key,r=t.value,i=t.valueSpec,n=[];return Array.isArray(i.values)?-1===i.values.indexOf(Ot(r))&&n.push(new Rt(e,r,`expected one of [${i.values.join(", ")}], ${JSON.stringify(r)} found`)):-1===Object.keys(i.values).indexOf(Ot(r))&&n.push(new Rt(e,r,`expected one of [${Object.keys(i.values).join(", ")}], ${JSON.stringify(r)} found`)),n}function ci(t){if(!0===t||!1===t)return !0;if(!Array.isArray(t)||0===t.length)return !1;switch(t[0]){case"has":return t.length>=2&&"$id"!==t[1]&&"$type"!==t[1];case"in":return t.length>=3&&("string"!=typeof t[1]||Array.isArray(t[2]));case"!in":case"!has":case"none":return !1;case"==":case"!=":case">":case">=":case"<":case"<=":return 3!==t.length||Array.isArray(t[1])||Array.isArray(t[2]);case"any":case"all":for(const e of t.slice(1))if(!ci(e)&&"boolean"!=typeof e)return !1;return !0;default:return !0}}const hi={type:"boolean",default:!1,transition:!1,"property-type":"data-driven",expression:{interpolated:!1,parameters:["zoom","feature"]}};function pi(t){if(null==t)return {filter:()=>!0,needGeometry:!1};ci(t)||(t=fi(t));const e=Qr(t,hi);if("error"===e.result)throw new Error(e.value.map(t=>`${t.key}: ${t.message}`).join(", "));return {filter:(t,r,i)=>e.value.evaluate(t,r,{},i),needGeometry:function t(e){if(!Array.isArray(e))return !1;if("within"===e[0])return !0;for(let r=1;r<e.length;r++)if(t(e[r]))return !0;return !1}(t)}}function di(t,e){return t<e?-1:t>e?1:0}function fi(t){if(!t)return !0;const e=t[0];return t.length<=1?"any"!==e:"=="===e?yi(t[1],t[2],"=="):"!="===e?xi(yi(t[1],t[2],"==")):"<"===e||">"===e||"<="===e||">="===e?yi(t[1],t[2],e):"any"===e?(r=t.slice(1),["any"].concat(r.map(fi))):"all"===e?["all"].concat(t.slice(1).map(fi)):"none"===e?["all"].concat(t.slice(1).map(fi).map(xi)):"in"===e?mi(t[1],t.slice(2)):"!in"===e?xi(mi(t[1],t.slice(2))):"has"===e?gi(t[1]):"!has"===e?xi(gi(t[1])):"within"!==e||t;var r;}function yi(t,e,r){switch(t){case"$type":return [`filter-type-${r}`,e];case"$id":return [`filter-id-${r}`,e];default:return [`filter-${r}`,t,e]}}function mi(t,e){if(0===e.length)return !1;switch(t){case"$type":return ["filter-type-in",["literal",e]];case"$id":return ["filter-id-in",["literal",e]];default:return e.length>200&&!e.some(t=>typeof t!=typeof e[0])?["filter-in-large",t,["literal",e.sort(di)]]:["filter-in-small",t,["literal",e]]}}function gi(t){switch(t){case"$type":return !0;case"$id":return ["filter-has-id"];default:return ["filter-has",t]}}function xi(t){return ["!",t]}function vi(t){return ci($t(t.value))?li(Ut({},t,{expressionContext:"filter",valueSpec:{value:"boolean"}})):function t(e){const r=e.value,i=e.key;if("array"!==Nr(r))return [new Rt(i,r,`array expected, ${Nr(r)} found`)];const n=e.styleSpec;let s,a=[];if(r.length<1)return [new Rt(i,r,"filter array must have at least 1 element")];switch(a=a.concat(ui({key:`${i}[0]`,value:r[0],valueSpec:n.filter_operator,style:e.style,styleSpec:e.styleSpec})),Ot(r[0])){case"<":case"<=":case">":case">=":r.length>=2&&"$type"===Ot(r[1])&&a.push(new Rt(i,r,`"$type" cannot be use with operator "${r[0]}"`));case"==":case"!=":3!==r.length&&a.push(new Rt(i,r,`filter array for operator "${r[0]}" must have 3 elements`));case"in":case"!in":r.length>=2&&(s=Nr(r[1]),"string"!==s&&a.push(new Rt(`${i}[1]`,r[1],`string expected, ${s} found`)));for(let t=2;t<r.length;t++)s=Nr(r[t]),"$type"===Ot(r[1])?a=a.concat(ui({key:`${i}[${t}]`,value:r[t],valueSpec:n.geometry_type,style:e.style,styleSpec:e.styleSpec})):"string"!==s&&"number"!==s&&"boolean"!==s&&a.push(new Rt(`${i}[${t}]`,r[t],`string, number, or boolean expected, ${s} found`));break;case"any":case"all":case"none":for(let n=1;n<r.length;n++)a=a.concat(t({key:`${i}[${n}]`,value:r[n],style:e.style,styleSpec:e.styleSpec}));break;case"has":case"!has":s=Nr(r[1]),2!==r.length?a.push(new Rt(i,r,`filter array for "${r[0]}" operator must have 2 elements`)):"string"!==s&&a.push(new Rt(`${i}[1]`,r[1],`string expected, ${s} found`));break;case"within":s=Nr(r[1]),2!==r.length?a.push(new Rt(i,r,`filter array for "${r[0]}" operator must have 2 elements`)):"object"!==s&&a.push(new Rt(`${i}[1]`,r[1],`object expected, ${s} found`));}return a}(t)}function bi(t,e){const r=t.key,i=t.style,n=t.styleSpec,s=t.value,a=t.objectKey,o=n[`${e}_${t.layerType}`];if(!o)return [];const l=a.match(/^(.*)-transition$/);if("paint"===e&&l&&o[l[1]]&&o[l[1]].transition)return Mi({key:r,value:s,valueSpec:n.transition,style:i,styleSpec:n});const u=t.valueSpec||o[a];if(!u)return [new Rt(r,s,`unknown property "${a}"`)];let c;if("string"===Nr(s)&&Or(u)&&!u.tokens&&(c=/^{([^}]+)}$/.exec(s)))return [new Rt(r,s,`"${a}" does not support interpolation syntax\n`+`Use an identity property function instead: \`{ "type": "identity", "property": ${JSON.stringify(c[1])} }\`.`)];const h=[];return "symbol"===t.layerType&&("text-field"===a&&i&&!i.glyphs&&h.push(new Rt(r,s,'use of "text-field" requires a style "glyphs" property')),"text-font"===a&&jr($t(s))&&"identity"===Ot(s.type)&&h.push(new Rt(r,s,'"text-font" does not support identity functions'))),h.concat(Mi({key:t.key,value:s,valueSpec:u,style:i,styleSpec:n,expressionContext:"property",propertyType:e,propertyKey:a}))}function wi(t){return bi(t,"paint")}function _i(t){return bi(t,"layout")}function ki(t){let e=[];const r=t.value,i=t.key,n=t.style,s=t.styleSpec;r.type||r.ref||e.push(new Rt(i,r,'either "type" or "ref" is required'));let a=Ot(r.type);const o=Ot(r.ref);if(r.id){const s=Ot(r.id);for(let a=0;a<t.arrayIndex;a++){const t=n.layers[a];Ot(t.id)===s&&e.push(new Rt(i,r.id,`duplicate layer id "${r.id}", previously used at line ${t.id.__line__}`));}}if("ref"in r){let t;["type","source","source-layer","filter","layout"].forEach(t=>{t in r&&e.push(new Rt(i,r[t],`"${t}" is prohibited for ref layers`));}),n.layers.forEach(e=>{Ot(e.id)===o&&(t=e);}),t?t.ref?e.push(new Rt(i,r.ref,"ref cannot reference another ref layer")):a=Ot(t.type):e.push(new Rt(i,r.ref,`ref layer "${o}" not found`));}else if("background"!==a&&"sky"!==a)if(r.source){const t=n.sources&&n.sources[r.source],s=t&&Ot(t.type);t?"vector"===s&&"raster"===a?e.push(new Rt(i,r.source,`layer "${r.id}" requires a raster source`)):"raster"===s&&"raster"!==a?e.push(new Rt(i,r.source,`layer "${r.id}" requires a vector source`)):"vector"!==s||r["source-layer"]?"raster-dem"===s&&"hillshade"!==a?e.push(new Rt(i,r.source,"raster-dem source can only be used with layer type 'hillshade'.")):"line"!==a||!r.paint||!r.paint["line-gradient"]||"geojson"===s&&t.lineMetrics||e.push(new Rt(i,r,`layer "${r.id}" specifies a line-gradient, which requires a GeoJSON source with \`lineMetrics\` enabled.`)):e.push(new Rt(i,r,`layer "${r.id}" must specify a "source-layer"`)):e.push(new Rt(i,r.source,`source "${r.source}" not found`));}else e.push(new Rt(i,r,'missing required property "source"'));return e=e.concat(ni({key:i,value:r,valueSpec:s.layer,style:t.style,styleSpec:t.styleSpec,objectElementValidators:{"*":()=>[],type:()=>Mi({key:`${i}.type`,value:r.type,valueSpec:s.layer.type,style:t.style,styleSpec:t.styleSpec,object:r,objectKey:"type"}),filter:vi,layout:t=>ni({layer:r,key:t.key,value:t.value,style:t.style,styleSpec:t.styleSpec,objectElementValidators:{"*":t=>_i(Ut({layerType:a},t))}}),paint:t=>ni({layer:r,key:t.key,value:t.value,style:t.style,styleSpec:t.styleSpec,objectElementValidators:{"*":t=>wi(Ut({layerType:a},t))}})}})),e}function Ai(t){const e=t.value,r=t.key,i=Nr(e);return "string"!==i?[new Rt(r,e,`string expected, ${i} found`)]:[]}const Si={promoteId:function({key:t,value:e}){if("string"===Nr(e))return Ai({key:t,value:e});{const r=[];for(const i in e)r.push(...Ai({key:`${t}.${i}`,value:e[i]}));return r}}};function Ii(t){const e=t.value,r=t.key,i=t.styleSpec,n=t.style;if(!e.type)return [new Rt(r,e,'"type" is required')];const s=Ot(e.type);let a;switch(s){case"vector":case"raster":case"raster-dem":return a=ni({key:r,value:e,valueSpec:i[`source_${s.replace("-","_")}`],style:t.style,styleSpec:i,objectElementValidators:Si}),a;case"geojson":if(a=ni({key:r,value:e,valueSpec:i.source_geojson,style:n,styleSpec:i,objectElementValidators:Si}),e.cluster)for(const t in e.clusterProperties){const[i,n]=e.clusterProperties[t],s="string"==typeof i?[i,["accumulated"],["get",t]]:i;a.push(...li({key:`${r}.${t}.map`,value:n,expressionContext:"cluster-map"})),a.push(...li({key:`${r}.${t}.reduce`,value:s,expressionContext:"cluster-reduce"}));}return a;case"video":return ni({key:r,value:e,valueSpec:i.source_video,style:n,styleSpec:i});case"image":return ni({key:r,value:e,valueSpec:i.source_image,style:n,styleSpec:i});case"canvas":return [new Rt(r,null,"Please use runtime APIs to add canvas sources, rather than including them in stylesheets.","source.canvas")];default:return ui({key:`${r}.type`,value:e.type,valueSpec:{values:["vector","raster","raster-dem","geojson","video","image"]},style:n,styleSpec:i})}}function Ti(t){const e=t.value,r=t.styleSpec,i=r.light,n=t.style;let s=[];const a=Nr(e);if(void 0===e)return s;if("object"!==a)return s=s.concat([new Rt("light",e,`object expected, ${a} found`)]),s;for(const t in e){const a=t.match(/^(.*)-transition$/);s=s.concat(a&&i[a[1]]&&i[a[1]].transition?Mi({key:t,value:e[t],valueSpec:r.transition,style:n,styleSpec:r}):i[t]?Mi({key:t,value:e[t],valueSpec:i[t],style:n,styleSpec:r}):[new Rt(t,e[t],`unknown property "${t}"`)]);}return s}function zi(t){const e=t.value,r=t.key,i=t.style,n=t.styleSpec,s=n.terrain;let a=[];const o=Nr(e);if(void 0===e)return a;if("object"!==o)return a=a.concat([new Rt("terrain",e,`object expected, ${o} found`)]),a;for(const t in e){const r=t.match(/^(.*)-transition$/);a=a.concat(r&&s[r[1]]&&s[r[1]].transition?Mi({key:t,value:e[t],valueSpec:n.transition,style:i,styleSpec:n}):s[t]?Mi({key:t,value:e[t],valueSpec:s[t],style:i,styleSpec:n}):[new Rt(t,e[t],`unknown property "${t}"`)]);}if(e.source){const t=i.sources&&i.sources[e.source],n=t&&Ot(t.type);t?"raster-dem"!==n&&a.push(new Rt(r,e.source,`terrain cannot be used with a source of type ${n}, it only be used with a "raster-dem" source type`)):a.push(new Rt(r,e.source,`source "${e.source}" not found`));}else a.push(new Rt(r,e,'terrain is missing required property "source"'));return a}const Ei={"*":()=>[],array:si,boolean:function(t){const e=t.value,r=t.key,i=Nr(e);return "boolean"!==i?[new Rt(r,e,`boolean expected, ${i} found`)]:[]},number:ai,color:function(t){const e=t.key,r=t.value,i=Nr(r);return "string"!==i?[new Rt(e,r,`color expected, ${i} found`)]:null===oe(r)?[new Rt(e,r,`color expected, "${r}" found`)]:[]},constants:Lt,enum:ui,filter:vi,function:oi,layer:ki,object:ni,source:Ii,light:Ti,terrain:zi,string:Ai,formatted:function(t){return 0===Ai(t).length?[]:li(t)},resolvedImage:function(t){return 0===Ai(t).length?[]:li(t)}};function Mi(t){const e=t.value,r=t.valueSpec,i=t.styleSpec;return r.expression&&jr(Ot(e))?oi(t):r.expression&&Jr($t(e))?li(t):r.type&&Ei[r.type]?Ei[r.type](t):ni(Ut({},t,{valueSpec:r.type?i[r.type]:r}))}function Bi(t){const e=t.value,r=t.key,i=Ai(t);return i.length||(-1===e.indexOf("{fontstack}")&&i.push(new Rt(r,e,'"glyphs" url must include a "{fontstack}" token')),-1===e.indexOf("{range}")&&i.push(new Rt(r,e,'"glyphs" url must include a "{range}" token'))),i}function Di(t,e=Ft){let r=[];return r=r.concat(Mi({key:"",value:t,valueSpec:e.$root,styleSpec:e,style:t,objectElementValidators:{glyphs:Bi,"*":()=>[]}})),t.constants&&(r=r.concat(Lt({key:"constants",value:t.constants,style:t,styleSpec:e}))),Ci(r)}function Ci(t){return [].concat(t).sort((t,e)=>t.line-e.line)}function Pi(t){return function(...e){return Ci(t.apply(this,e))}}Di.source=Pi(Ii),Di.light=Pi(Ti),Di.terrain=Pi(zi),Di.layer=Pi(ki),Di.filter=Pi(vi),Di.paintProperty=Pi(wi),Di.layoutProperty=Pi(_i);const Vi=Di,Fi=Vi.light,Ri=Vi.paintProperty,Li=Vi.layoutProperty;function Ui(t,e){let r=!1;if(e&&e.length)for(const i of e)t.fire(new Pt(new Error(i.message))),r=!0;return r}var Oi=$i;function $i(t,e,r){var i=this.cells=[];if(t instanceof ArrayBuffer){this.arrayBuffer=t;var n=new Int32Array(this.arrayBuffer);t=n[0],this.d=(e=n[1])+2*(r=n[2]);for(var s=0;s<this.d*this.d;s++){var a=n[3+s],o=n[3+s+1];i.push(a===o?null:n.subarray(a,o));}var l=n[3+i.length+1];this.keys=n.subarray(n[3+i.length],l),this.bboxes=n.subarray(l),this.insert=this._insertReadonly;}else {this.d=e+2*r;for(var u=0;u<this.d*this.d;u++)i.push([]);this.keys=[],this.bboxes=[];}this.n=e,this.extent=t,this.padding=r,this.scale=e/t,this.uid=0;var c=r/e*t;this.min=-c,this.max=t+c;}$i.prototype.insert=function(t,e,r,i,n){this._forEachCell(e,r,i,n,this._insertCell,this.uid++),this.keys.push(t),this.bboxes.push(e),this.bboxes.push(r),this.bboxes.push(i),this.bboxes.push(n);},$i.prototype._insertReadonly=function(){throw "Cannot insert into a GridIndex created from an ArrayBuffer."},$i.prototype._insertCell=function(t,e,r,i,n,s){this.cells[n].push(s);},$i.prototype.query=function(t,e,r,i,n){var s=this.min,a=this.max;if(t<=s&&e<=s&&a<=r&&a<=i&&!n)return Array.prototype.slice.call(this.keys);var o=[];return this._forEachCell(t,e,r,i,this._queryCell,o,{},n),o},$i.prototype._queryCell=function(t,e,r,i,n,s,a,o){var l=this.cells[n];if(null!==l)for(var u=this.keys,c=this.bboxes,h=0;h<l.length;h++){var p=l[h];if(void 0===a[p]){var d=4*p;(o?o(c[d+0],c[d+1],c[d+2],c[d+3]):t<=c[d+2]&&e<=c[d+3]&&r>=c[d+0]&&i>=c[d+1])?(a[p]=!0,s.push(u[p])):a[p]=!1;}}},$i.prototype._forEachCell=function(t,e,r,i,n,s,a,o){for(var l=this._convertToCellCoord(t),u=this._convertToCellCoord(e),c=this._convertToCellCoord(r),h=this._convertToCellCoord(i),p=l;p<=c;p++)for(var d=u;d<=h;d++){var f=this.d*d+p;if((!o||o(this._convertFromCellCoord(p),this._convertFromCellCoord(d),this._convertFromCellCoord(p+1),this._convertFromCellCoord(d+1)))&&n.call(this,t,e,r,i,f,s,a,o))return}},$i.prototype._convertFromCellCoord=function(t){return (t-this.padding)/this.scale},$i.prototype._convertToCellCoord=function(t){return Math.max(0,Math.min(this.d-1,Math.floor(t*this.scale)+this.padding))},$i.prototype.toArrayBuffer=function(){if(this.arrayBuffer)return this.arrayBuffer;for(var t=this.cells,e=3+this.cells.length+1+1,r=0,i=0;i<this.cells.length;i++)r+=this.cells[i].length;var n=new Int32Array(e+r+this.keys.length+this.bboxes.length);n[0]=this.extent,n[1]=this.n,n[2]=this.padding;for(var s=e,a=0;a<t.length;a++){var o=t[a];n[3+a]=s,n.set(o,s),s+=o.length;}return n[3+t.length]=s,n.set(this.keys,s),n[3+t.length+1]=s+=this.keys.length,n.set(this.bboxes,s),s+=this.bboxes.length,n.buffer};const{ImageData:qi,ImageBitmap:Ni}=s,ji={};function Gi(t,e,r={}){Object.defineProperty(e,"_classRegistryKey",{value:t,writeable:!1}),ji[t]={klass:e,omit:r.omit||[],shallow:r.shallow||[]};}Gi("Object",Object),Oi.serialize=function(t,e){const r=t.toArrayBuffer();return e&&e.push(r),{buffer:r}},Oi.deserialize=function(t){return new Oi(t.buffer)},Gi("Grid",Oi),Gi("Color",le),Gi("Error",Error),Gi("ResolvedImage",pe),Gi("StylePropertyFunction",ii),Gi("StyleExpression",Wr,{omit:["_evaluator"]}),Gi("ZoomDependentExpression",ei),Gi("ZoomConstantExpression",ti),Gi("CompoundExpression",Te,{omit:["_evaluate"]});for(const t in Cr)Cr[t]._classRegistryKey||Gi(`Expression_${t}`,Cr[t]);function Zi(t){return t&&"undefined"!=typeof ArrayBuffer&&(t instanceof ArrayBuffer||t.constructor&&"ArrayBuffer"===t.constructor.name)}function Xi(t){return Ni&&t instanceof Ni}function Ki(t,e){if(null==t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||t instanceof Boolean||t instanceof Number||t instanceof String||t instanceof Date||t instanceof RegExp)return t;if(Zi(t)||Xi(t))return e&&e.push(t),t;if(ArrayBuffer.isView(t)){const r=t;return e&&e.push(r.buffer),r}if(t instanceof qi)return e&&e.push(t.data.buffer),t;if(Array.isArray(t)){const r=[];for(const i of t)r.push(Ki(i,e));return r}if("object"==typeof t){const r=t.constructor,i=r._classRegistryKey;if(!i)throw new Error("can't serialize object of unregistered class");const n=r.serialize?r.serialize(t,e):{};if(!r.serialize){for(const r in t){if(!t.hasOwnProperty(r))continue;if(ji[i].omit.indexOf(r)>=0)continue;const s=t[r];n[r]=ji[i].shallow.indexOf(r)>=0?s:Ki(s,e);}t instanceof Error&&(n.message=t.message);}if(n.$name)throw new Error("$name property is reserved for worker serialization logic.");return "Object"!==i&&(n.$name=i),n}throw new Error(`can't serialize object of type ${typeof t}`)}function Hi(t){if(null==t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||t instanceof Boolean||t instanceof Number||t instanceof String||t instanceof Date||t instanceof RegExp||Zi(t)||Xi(t)||ArrayBuffer.isView(t)||t instanceof qi)return t;if(Array.isArray(t))return t.map(Hi);if("object"==typeof t){const e=t.$name||"Object",{klass:r}=ji[e];if(!r)throw new Error(`can't deserialize unregistered class ${e}`);if(r.deserialize)return r.deserialize(t);const i=Object.create(r.prototype);for(const r of Object.keys(t)){if("$name"===r)continue;const n=t[r];i[r]=ji[e].shallow.indexOf(r)>=0?n:Hi(n);}return i}throw new Error(`can't deserialize object of type ${typeof t}`)}class Yi{constructor(){this.first=!0;}update(t,e){const r=Math.floor(t);return this.first?(this.first=!1,this.lastIntegerZoom=r,this.lastIntegerZoomTime=0,this.lastZoom=t,this.lastFloorZoom=r,!0):(this.lastFloorZoom>r?(this.lastIntegerZoom=r+1,this.lastIntegerZoomTime=e):this.lastFloorZoom<r&&(this.lastIntegerZoom=r,this.lastIntegerZoomTime=e),t!==this.lastZoom&&(this.lastZoom=t,this.lastFloorZoom=r,!0))}}const Wi=t=>t>=1536&&t<=1791,Ji=t=>t>=1872&&t<=1919,Qi=t=>t>=2208&&t<=2303,tn=t=>t>=11904&&t<=12031,en=t=>t>=12032&&t<=12255,rn=t=>t>=12272&&t<=12287,nn=t=>t>=12288&&t<=12351,sn=t=>t>=12352&&t<=12447,an=t=>t>=12448&&t<=12543,on=t=>t>=12544&&t<=12591,ln=t=>t>=12704&&t<=12735,un=t=>t>=12736&&t<=12783,cn=t=>t>=12784&&t<=12799,hn=t=>t>=12800&&t<=13055,pn=t=>t>=13056&&t<=13311,dn=t=>t>=13312&&t<=19903,fn=t=>t>=19968&&t<=40959,yn=t=>t>=40960&&t<=42127,mn=t=>t>=42128&&t<=42191,gn=t=>t>=44032&&t<=55215,xn=t=>t>=63744&&t<=64255,vn=t=>t>=64336&&t<=65023,bn=t=>t>=65040&&t<=65055,wn=t=>t>=65072&&t<=65103,_n=t=>t>=65104&&t<=65135,kn=t=>t>=65136&&t<=65279,An=t=>t>=65280&&t<=65519;function Sn(t){for(const e of t)if(zn(e.charCodeAt(0)))return !0;return !1}function In(t){for(const e of t)if(!Tn(e.charCodeAt(0)))return !1;return !0}function Tn(t){return !(Wi(t)||Ji(t)||Qi(t)||vn(t)||kn(t))}function zn(t){return !(746!==t&&747!==t&&(t<4352||!(ln(t)||on(t)||wn(t)&&!(t>=65097&&t<=65103)||xn(t)||pn(t)||tn(t)||un(t)||!(!nn(t)||t>=12296&&t<=12305||t>=12308&&t<=12319||12336===t)||dn(t)||fn(t)||hn(t)||(t=>t>=12592&&t<=12687)(t)||(t=>t>=43360&&t<=43391)(t)||(t=>t>=55216&&t<=55295)(t)||(t=>t>=4352&&t<=4607)(t)||gn(t)||sn(t)||rn(t)||(t=>t>=12688&&t<=12703)(t)||en(t)||cn(t)||an(t)&&12540!==t||!(!An(t)||65288===t||65289===t||65293===t||t>=65306&&t<=65310||65339===t||65341===t||65343===t||t>=65371&&t<=65503||65507===t||t>=65512&&t<=65519)||!(!_n(t)||t>=65112&&t<=65118||t>=65123&&t<=65126)||(t=>t>=5120&&t<=5759)(t)||(t=>t>=6320&&t<=6399)(t)||bn(t)||(t=>t>=19904&&t<=19967)(t)||yn(t)||mn(t))))}function En(t){return !(zn(t)||function(t){return !!((t=>t>=128&&t<=255)(t)&&(167===t||169===t||174===t||177===t||188===t||189===t||190===t||215===t||247===t)||(t=>t>=8192&&t<=8303)(t)&&(8214===t||8224===t||8225===t||8240===t||8241===t||8251===t||8252===t||8258===t||8263===t||8264===t||8265===t||8273===t)||(t=>t>=8448&&t<=8527)(t)||(t=>t>=8528&&t<=8591)(t)||(t=>t>=8960&&t<=9215)(t)&&(t>=8960&&t<=8967||t>=8972&&t<=8991||t>=8996&&t<=9e3||9003===t||t>=9085&&t<=9114||t>=9150&&t<=9165||9167===t||t>=9169&&t<=9179||t>=9186&&t<=9215)||(t=>t>=9216&&t<=9279)(t)&&9251!==t||(t=>t>=9280&&t<=9311)(t)||(t=>t>=9312&&t<=9471)(t)||(t=>t>=9632&&t<=9727)(t)||(t=>t>=9728&&t<=9983)(t)&&!(t>=9754&&t<=9759)||(t=>t>=11008&&t<=11263)(t)&&(t>=11026&&t<=11055||t>=11088&&t<=11097||t>=11192&&t<=11243)||nn(t)||an(t)||(t=>t>=57344&&t<=63743)(t)||wn(t)||_n(t)||An(t)||8734===t||8756===t||8757===t||t>=9984&&t<=10087||t>=10102&&t<=10131||65532===t||65533===t)}(t))}function Mn(t){return t>=1424&&t<=2303||vn(t)||kn(t)}function Bn(t,e){return !(!e&&Mn(t)||t>=2304&&t<=3583||t>=3840&&t<=4255||(t=>t>=6016&&t<=6143)(t))}function Dn(t){for(const e of t)if(Mn(e.charCodeAt(0)))return !0;return !1}let Cn=null,Pn="unavailable",Vn=null;const Fn=function(t){t&&"string"==typeof t&&t.indexOf("NetworkError")>-1&&(Pn="error"),Cn&&Cn(t);};function Rn(){Ln.fire(new Ct("pluginStateChange",{pluginStatus:Pn,pluginURL:Vn}));}const Ln=new Vt,Un=function(){return Pn},On=function(){if("deferred"!==Pn||!Vn)throw new Error("rtl-text-plugin cannot be downloaded unless a pluginURL is specified");Pn="loading",Rn(),Vn&&kt({url:Vn},t=>{t?Fn(t):(Pn="loaded",Rn());});},$n={applyArabicShaping:null,processBidirectionalText:null,processStyledBidirectionalText:null,isLoaded:()=>"loaded"===Pn||null!=$n.applyArabicShaping,isLoading:()=>"loading"===Pn,setState(t){Pn=t.pluginStatus,Vn=t.pluginURL;},isParsed:()=>null!=$n.applyArabicShaping&&null!=$n.processBidirectionalText&&null!=$n.processStyledBidirectionalText,getPluginURL:()=>Vn};class qn{constructor(t,e){this.zoom=t,e?(this.now=e.now,this.fadeDuration=e.fadeDuration,this.zoomHistory=e.zoomHistory,this.transition=e.transition):(this.now=0,this.fadeDuration=0,this.zoomHistory=new Yi,this.transition={});}isSupportedScript(t){return function(t,e){for(const r of t)if(!Bn(r.charCodeAt(0),e))return !1;return !0}(t,$n.isLoaded())}crossFadingFactor(){return 0===this.fadeDuration?1:Math.min((this.now-this.zoomHistory.lastIntegerZoomTime)/this.fadeDuration,1)}getCrossfadeParameters(){const t=this.zoom,e=t-Math.floor(t),r=this.crossFadingFactor();return t>this.zoomHistory.lastIntegerZoom?{fromScale:2,toScale:1,t:e+(1-e)*r}:{fromScale:.5,toScale:1,t:1-(1-r)*e}}}class Nn{constructor(t,e){this.property=t,this.value=e,this.expression=function(t,e){if(jr(t))return new ii(t,e);if(Jr(t)){const r=ri(t,e);if("error"===r.result)throw new Error(r.value.map(t=>`${t.key}: ${t.message}`).join(", "));return r.value}{let r=t;return "string"==typeof t&&"color"===e.type&&(r=le.parse(t)),{kind:"constant",evaluate:()=>r}}}(void 0===e?t.specification.default:e,t.specification);}isDataDriven(){return "source"===this.expression.kind||"composite"===this.expression.kind}possiblyEvaluate(t,e,r){return this.property.possiblyEvaluate(this,t,e,r)}}class jn{constructor(t){this.property=t,this.value=new Nn(t,void 0);}transitioned(t,e){return new Zn(this.property,this.value,e,x({},t.transition,this.transition),t.now)}untransitioned(){return new Zn(this.property,this.value,null,{},0)}}class Gn{constructor(t){this._properties=t,this._values=Object.create(t.defaultTransitionablePropertyValues);}getValue(t){return T(this._values[t].value.value)}setValue(t,e){this._values.hasOwnProperty(t)||(this._values[t]=new jn(this._values[t].property)),this._values[t].value=new Nn(this._values[t].property,null===e?void 0:T(e));}getTransition(t){return T(this._values[t].transition)}setTransition(t,e){this._values.hasOwnProperty(t)||(this._values[t]=new jn(this._values[t].property)),this._values[t].transition=T(e)||void 0;}serialize(){const t={};for(const e of Object.keys(this._values)){const r=this.getValue(e);void 0!==r&&(t[e]=r);const i=this.getTransition(e);void 0!==i&&(t[`${e}-transition`]=i);}return t}transitioned(t,e){const r=new Xn(this._properties);for(const i of Object.keys(this._values))r._values[i]=this._values[i].transitioned(t,e._values[i]);return r}untransitioned(){const t=new Xn(this._properties);for(const e of Object.keys(this._values))t._values[e]=this._values[e].untransitioned();return t}}class Zn{constructor(t,e,r,i,n){this.property=t,this.value=e,this.begin=n+i.delay||0,this.end=this.begin+i.duration||0,t.specification.transition&&(i.delay||i.duration)&&(this.prior=r);}possiblyEvaluate(t,e,r){const i=t.now||0,n=this.value.possiblyEvaluate(t,e,r),s=this.prior;if(s){if(i>this.end)return this.prior=null,n;if(this.value.isDataDriven())return this.prior=null,n;if(i<this.begin)return s.possiblyEvaluate(t,e,r);{const a=(i-this.begin)/(this.end-this.begin);return this.property.interpolate(s.possiblyEvaluate(t,e,r),n,h(a))}}return n}}class Xn{constructor(t){this._properties=t,this._values=Object.create(t.defaultTransitioningPropertyValues);}possiblyEvaluate(t,e,r){const i=new Yn(this._properties);for(const n of Object.keys(this._values))i._values[n]=this._values[n].possiblyEvaluate(t,e,r);return i}hasTransition(){for(const t of Object.keys(this._values))if(this._values[t].prior)return !0;return !1}}class Kn{constructor(t){this._properties=t,this._values=Object.create(t.defaultPropertyValues);}getValue(t){return T(this._values[t].value)}setValue(t,e){this._values[t]=new Nn(this._values[t].property,null===e?void 0:T(e));}serialize(){const t={};for(const e of Object.keys(this._values)){const r=this.getValue(e);void 0!==r&&(t[e]=r);}return t}possiblyEvaluate(t,e,r){const i=new Yn(this._properties);for(const n of Object.keys(this._values))i._values[n]=this._values[n].possiblyEvaluate(t,e,r);return i}}class Hn{constructor(t,e,r){this.property=t,this.value=e,this.parameters=r;}isConstant(){return "constant"===this.value.kind}constantOr(t){return "constant"===this.value.kind?this.value.value:t}evaluate(t,e,r,i){return this.property.evaluate(this.value,this.parameters,t,e,r,i)}}class Yn{constructor(t){this._properties=t,this._values=Object.create(t.defaultPossiblyEvaluatedValues);}get(t){return this._values[t]}}class Wn{constructor(t){this.specification=t;}possiblyEvaluate(t,e){return t.expression.evaluate(e)}interpolate(t,e,r){const i=Qe[this.specification.type];return i?i(t,e,r):t}}class Jn{constructor(t,e){this.specification=t,this.overrides=e;}possiblyEvaluate(t,e,r,i){return new Hn(this,"constant"===t.expression.kind||"camera"===t.expression.kind?{kind:"constant",value:t.expression.evaluate(e,null,{},r,i)}:t.expression,e)}interpolate(t,e,r){if("constant"!==t.value.kind||"constant"!==e.value.kind)return t;if(void 0===t.value.value||void 0===e.value.value)return new Hn(this,{kind:"constant",value:void 0},t.parameters);const i=Qe[this.specification.type];return i?new Hn(this,{kind:"constant",value:i(t.value.value,e.value.value,r)},t.parameters):t}evaluate(t,e,r,i,n,s){return "constant"===t.kind?t.value:t.evaluate(e,r,i,n,s)}}class Qn extends Jn{possiblyEvaluate(t,e,r,i){if(void 0===t.value)return new Hn(this,{kind:"constant",value:void 0},e);if("constant"===t.expression.kind){const n=t.expression.evaluate(e,null,{},r,i),s="resolvedImage"===t.property.specification.type&&"string"!=typeof n?n.name:n,a=this._calculate(s,s,s,e);return new Hn(this,{kind:"constant",value:a},e)}if("camera"===t.expression.kind){const r=this._calculate(t.expression.evaluate({zoom:e.zoom-1}),t.expression.evaluate({zoom:e.zoom}),t.expression.evaluate({zoom:e.zoom+1}),e);return new Hn(this,{kind:"constant",value:r},e)}return new Hn(this,t.expression,e)}evaluate(t,e,r,i,n,s){if("source"===t.kind){const a=t.evaluate(e,r,i,n,s);return this._calculate(a,a,a,e)}return "composite"===t.kind?this._calculate(t.evaluate({zoom:Math.floor(e.zoom)-1},r,i),t.evaluate({zoom:Math.floor(e.zoom)},r,i),t.evaluate({zoom:Math.floor(e.zoom)+1},r,i),e):t.value}_calculate(t,e,r,i){return i.zoom>i.zoomHistory.lastIntegerZoom?{from:t,to:e}:{from:r,to:e}}interpolate(t){return t}}class ts{constructor(t){this.specification=t;}possiblyEvaluate(t,e,r,i){if(void 0!==t.value){if("constant"===t.expression.kind){const n=t.expression.evaluate(e,null,{},r,i);return this._calculate(n,n,n,e)}return this._calculate(t.expression.evaluate(new qn(Math.floor(e.zoom-1),e)),t.expression.evaluate(new qn(Math.floor(e.zoom),e)),t.expression.evaluate(new qn(Math.floor(e.zoom+1),e)),e)}}_calculate(t,e,r,i){return i.zoom>i.zoomHistory.lastIntegerZoom?{from:t,to:e}:{from:r,to:e}}interpolate(t){return t}}class es{constructor(t){this.specification=t;}possiblyEvaluate(t,e,r,i){return !!t.expression.evaluate(e,null,{},r,i)}interpolate(){return !1}}class rs{constructor(t){this.properties=t,this.defaultPropertyValues={},this.defaultTransitionablePropertyValues={},this.defaultTransitioningPropertyValues={},this.defaultPossiblyEvaluatedValues={},this.overridableProperties=[];for(const e in t){const r=t[e];r.specification.overridable&&this.overridableProperties.push(e);const i=this.defaultPropertyValues[e]=new Nn(r,void 0),n=this.defaultTransitionablePropertyValues[e]=new jn(r);this.defaultTransitioningPropertyValues[e]=n.untransitioned(),this.defaultPossiblyEvaluatedValues[e]=i.possiblyEvaluate({});}}}function is(t,e){return 256*(t=f(Math.floor(t),0,255))+f(Math.floor(e),0,255)}Gi("DataDrivenProperty",Jn),Gi("DataConstantProperty",Wn),Gi("CrossFadedDataDrivenProperty",Qn),Gi("CrossFadedProperty",ts),Gi("ColorRampProperty",es);const ns={Int8:Int8Array,Uint8:Uint8Array,Int16:Int16Array,Uint16:Uint16Array,Int32:Int32Array,Uint32:Uint32Array,Float32:Float32Array};class ss{constructor(t,e){this._structArray=t,this._pos1=e*this.size,this._pos2=this._pos1/2,this._pos4=this._pos1/4,this._pos8=this._pos1/8;}}class as{constructor(){this.isTransferred=!1,this.capacity=-1,this.resize(0);}static serialize(t,e){return t._trim(),e&&(t.isTransferred=!0,e.push(t.arrayBuffer)),{length:t.length,arrayBuffer:t.arrayBuffer}}static deserialize(t){const e=Object.create(this.prototype);return e.arrayBuffer=t.arrayBuffer,e.length=t.length,e.capacity=t.arrayBuffer.byteLength/e.bytesPerElement,e._refreshViews(),e}_trim(){this.length!==this.capacity&&(this.capacity=this.length,this.arrayBuffer=this.arrayBuffer.slice(0,this.length*this.bytesPerElement),this._refreshViews());}clear(){this.length=0;}resize(t){this.reserve(t),this.length=t;}reserve(t){if(t>this.capacity){this.capacity=Math.max(t,Math.floor(5*this.capacity),128),this.arrayBuffer=new ArrayBuffer(this.capacity*this.bytesPerElement);const e=this.uint8;this._refreshViews(),e&&this.uint8.set(e);}}_refreshViews(){throw new Error("_refreshViews() must be implemented by each concrete StructArray layout")}}function os(t,e=1){let r=0,i=0;return {members:t.map(t=>{const n=ns[t.type].BYTES_PER_ELEMENT,s=r=ls(r,Math.max(e,n)),a=t.components||1;return i=Math.max(i,n),r+=n*a,{name:t.name,type:t.type,components:a,offset:s}}),size:ls(r,Math.max(i,e)),alignment:e}}function ls(t,e){return Math.ceil(t/e)*e}class us extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(t,e){const r=this.length;return this.resize(r+1),this.emplace(r,t,e)}emplace(t,e,r){const i=2*t;return this.int16[i+0]=e,this.int16[i+1]=r,t}}us.prototype.bytesPerElement=4,Gi("StructArrayLayout2i4",us);class cs extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(t,e,r,i){const n=this.length;return this.resize(n+1),this.emplace(n,t,e,r,i)}emplace(t,e,r,i,n){const s=4*t;return this.int16[s+0]=e,this.int16[s+1]=r,this.int16[s+2]=i,this.int16[s+3]=n,t}}cs.prototype.bytesPerElement=8,Gi("StructArrayLayout4i8",cs);class hs extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(t,e,r,i,n,s,a){const o=this.length;return this.resize(o+1),this.emplace(o,t,e,r,i,n,s,a)}emplace(t,e,r,i,n,s,a,o){const l=6*t,u=12*t,c=3*t;return this.int16[l+0]=e,this.int16[l+1]=r,this.uint8[u+4]=i,this.uint8[u+5]=n,this.uint8[u+6]=s,this.uint8[u+7]=a,this.float32[c+2]=o,t}}hs.prototype.bytesPerElement=12,Gi("StructArrayLayout2i4ub1f12",hs);class ps extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(t,e){const r=this.length;return this.resize(r+1),this.emplace(r,t,e)}emplace(t,e,r){const i=2*t;return this.float32[i+0]=e,this.float32[i+1]=r,t}}ps.prototype.bytesPerElement=8,Gi("StructArrayLayout2f8",ps);class ds extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(t,e,r,i,n,s,a,o,l,u){const c=this.length;return this.resize(c+1),this.emplace(c,t,e,r,i,n,s,a,o,l,u)}emplace(t,e,r,i,n,s,a,o,l,u,c){const h=10*t;return this.uint16[h+0]=e,this.uint16[h+1]=r,this.uint16[h+2]=i,this.uint16[h+3]=n,this.uint16[h+4]=s,this.uint16[h+5]=a,this.uint16[h+6]=o,this.uint16[h+7]=l,this.uint16[h+8]=u,this.uint16[h+9]=c,t}}ds.prototype.bytesPerElement=20,Gi("StructArrayLayout10ui20",ds);class fs extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(t,e,r,i,n,s,a,o,l,u,c,h){const p=this.length;return this.resize(p+1),this.emplace(p,t,e,r,i,n,s,a,o,l,u,c,h)}emplace(t,e,r,i,n,s,a,o,l,u,c,h,p){const d=12*t;return this.int16[d+0]=e,this.int16[d+1]=r,this.int16[d+2]=i,this.int16[d+3]=n,this.uint16[d+4]=s,this.uint16[d+5]=a,this.uint16[d+6]=o,this.uint16[d+7]=l,this.int16[d+8]=u,this.int16[d+9]=c,this.int16[d+10]=h,this.int16[d+11]=p,t}}fs.prototype.bytesPerElement=24,Gi("StructArrayLayout4i4ui4i24",fs);class ys extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(t,e,r){const i=this.length;return this.resize(i+1),this.emplace(i,t,e,r)}emplace(t,e,r,i){const n=3*t;return this.float32[n+0]=e,this.float32[n+1]=r,this.float32[n+2]=i,t}}ys.prototype.bytesPerElement=12,Gi("StructArrayLayout3f12",ys);class ms extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer);}emplaceBack(t){const e=this.length;return this.resize(e+1),this.emplace(e,t)}emplace(t,e){return this.uint32[1*t+0]=e,t}}ms.prototype.bytesPerElement=4,Gi("StructArrayLayout1ul4",ms);class gs extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(t,e,r,i,n,s,a,o,l,u){const c=this.length;return this.resize(c+1),this.emplace(c,t,e,r,i,n,s,a,o,l,u)}emplace(t,e,r,i,n,s,a,o,l,u,c){const h=16*t,p=8*t;return this.int16[h+0]=e,this.int16[h+1]=r,this.float32[p+1]=i,this.float32[p+2]=n,this.float32[p+3]=s,this.float32[p+4]=a,this.int16[h+10]=o,this.uint32[p+6]=l,this.uint16[h+14]=u,this.uint16[h+15]=c,t}}gs.prototype.bytesPerElement=32,Gi("StructArrayLayout2i4f1i1ul2ui32",gs);class xs extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(t,e,r,i,n,s){const a=this.length;return this.resize(a+1),this.emplace(a,t,e,r,i,n,s)}emplace(t,e,r,i,n,s,a){const o=6*t;return this.int16[o+0]=e,this.int16[o+1]=r,this.int16[o+2]=i,this.int16[o+3]=n,this.int16[o+4]=s,this.int16[o+5]=a,t}}xs.prototype.bytesPerElement=12,Gi("StructArrayLayout2i2i2i12",xs);class vs extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(t,e,r,i,n){const s=this.length;return this.resize(s+1),this.emplace(s,t,e,r,i,n)}emplace(t,e,r,i,n,s){const a=4*t,o=8*t;return this.float32[a+0]=e,this.float32[a+1]=r,this.float32[a+2]=i,this.int16[o+6]=n,this.int16[o+7]=s,t}}vs.prototype.bytesPerElement=16,Gi("StructArrayLayout2f1f2i16",vs);class bs extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(t,e,r,i){const n=this.length;return this.resize(n+1),this.emplace(n,t,e,r,i)}emplace(t,e,r,i,n){const s=12*t,a=3*t;return this.uint8[s+0]=e,this.uint8[s+1]=r,this.float32[a+1]=i,this.float32[a+2]=n,t}}bs.prototype.bytesPerElement=12,Gi("StructArrayLayout2ub2f12",bs);class ws extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(t,e,r){const i=this.length;return this.resize(i+1),this.emplace(i,t,e,r)}emplace(t,e,r,i){const n=3*t;return this.uint16[n+0]=e,this.uint16[n+1]=r,this.uint16[n+2]=i,t}}ws.prototype.bytesPerElement=6,Gi("StructArrayLayout3ui6",ws);class _s extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(t,e,r,i,n,s,a,o,l,u,c,h,p,d,f,y,m){const g=this.length;return this.resize(g+1),this.emplace(g,t,e,r,i,n,s,a,o,l,u,c,h,p,d,f,y,m)}emplace(t,e,r,i,n,s,a,o,l,u,c,h,p,d,f,y,m,g){const x=24*t,v=12*t,b=48*t;return this.int16[x+0]=e,this.int16[x+1]=r,this.uint16[x+2]=i,this.uint16[x+3]=n,this.uint32[v+2]=s,this.uint32[v+3]=a,this.uint32[v+4]=o,this.uint16[x+10]=l,this.uint16[x+11]=u,this.uint16[x+12]=c,this.float32[v+7]=h,this.float32[v+8]=p,this.uint8[b+36]=d,this.uint8[b+37]=f,this.uint8[b+38]=y,this.uint32[v+10]=m,this.int16[x+22]=g,t}}_s.prototype.bytesPerElement=48,Gi("StructArrayLayout2i2ui3ul3ui2f3ub1ul1i48",_s);class ks extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(t,e,r,i,n,s,a,o,l,u,c,h,p,d,f,y,m,g,x,v,b,w,_,k,A,S,I,T){const z=this.length;return this.resize(z+1),this.emplace(z,t,e,r,i,n,s,a,o,l,u,c,h,p,d,f,y,m,g,x,v,b,w,_,k,A,S,I,T)}emplace(t,e,r,i,n,s,a,o,l,u,c,h,p,d,f,y,m,g,x,v,b,w,_,k,A,S,I,T,z){const E=34*t,M=17*t;return this.int16[E+0]=e,this.int16[E+1]=r,this.int16[E+2]=i,this.int16[E+3]=n,this.int16[E+4]=s,this.int16[E+5]=a,this.int16[E+6]=o,this.int16[E+7]=l,this.uint16[E+8]=u,this.uint16[E+9]=c,this.uint16[E+10]=h,this.uint16[E+11]=p,this.uint16[E+12]=d,this.uint16[E+13]=f,this.uint16[E+14]=y,this.uint16[E+15]=m,this.uint16[E+16]=g,this.uint16[E+17]=x,this.uint16[E+18]=v,this.uint16[E+19]=b,this.uint16[E+20]=w,this.uint16[E+21]=_,this.uint16[E+22]=k,this.uint32[M+12]=A,this.float32[M+13]=S,this.float32[M+14]=I,this.float32[M+15]=T,this.float32[M+16]=z,t}}ks.prototype.bytesPerElement=68,Gi("StructArrayLayout8i15ui1ul4f68",ks);class As extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(t){const e=this.length;return this.resize(e+1),this.emplace(e,t)}emplace(t,e){return this.float32[1*t+0]=e,t}}As.prototype.bytesPerElement=4,Gi("StructArrayLayout1f4",As);class Ss extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);}emplaceBack(t,e,r){const i=this.length;return this.resize(i+1),this.emplace(i,t,e,r)}emplace(t,e,r,i){const n=3*t;return this.int16[n+0]=e,this.int16[n+1]=r,this.int16[n+2]=i,t}}Ss.prototype.bytesPerElement=6,Gi("StructArrayLayout3i6",Ss);class Is extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(t,e,r,i){const n=this.length;return this.resize(n+1),this.emplace(n,t,e,r,i)}emplace(t,e,r,i,n){const s=6*t;return this.uint32[3*t+0]=e,this.uint16[s+2]=r,this.uint16[s+3]=i,this.uint16[s+4]=n,t}}Is.prototype.bytesPerElement=12,Gi("StructArrayLayout1ul3ui12",Is);class Ts extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(t,e){const r=this.length;return this.resize(r+1),this.emplace(r,t,e)}emplace(t,e,r){const i=2*t;return this.uint16[i+0]=e,this.uint16[i+1]=r,t}}Ts.prototype.bytesPerElement=4,Gi("StructArrayLayout2ui4",Ts);class zs extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);}emplaceBack(t){const e=this.length;return this.resize(e+1),this.emplace(e,t)}emplace(t,e){return this.uint16[1*t+0]=e,t}}zs.prototype.bytesPerElement=2,Gi("StructArrayLayout1ui2",zs);class Es extends as{_refreshViews(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);}emplaceBack(t,e,r,i){const n=this.length;return this.resize(n+1),this.emplace(n,t,e,r,i)}emplace(t,e,r,i,n){const s=4*t;return this.float32[s+0]=e,this.float32[s+1]=r,this.float32[s+2]=i,this.float32[s+3]=n,t}}Es.prototype.bytesPerElement=16,Gi("StructArrayLayout4f16",Es);class Ms extends ss{get anchorPointX(){return this._structArray.int16[this._pos2+0]}get anchorPointY(){return this._structArray.int16[this._pos2+1]}get x1(){return this._structArray.float32[this._pos4+1]}get y1(){return this._structArray.float32[this._pos4+2]}get x2(){return this._structArray.float32[this._pos4+3]}get y2(){return this._structArray.float32[this._pos4+4]}get padding(){return this._structArray.int16[this._pos2+10]}get featureIndex(){return this._structArray.uint32[this._pos4+6]}get sourceLayerIndex(){return this._structArray.uint16[this._pos2+14]}get bucketIndex(){return this._structArray.uint16[this._pos2+15]}get anchorPoint(){return new i(this.anchorPointX,this.anchorPointY)}}Ms.prototype.size=32;class Bs extends gs{get(t){return new Ms(this,t)}}Gi("CollisionBoxArray",Bs);class Ds extends ss{get anchorX(){return this._structArray.int16[this._pos2+0]}get anchorY(){return this._structArray.int16[this._pos2+1]}get glyphStartIndex(){return this._structArray.uint16[this._pos2+2]}get numGlyphs(){return this._structArray.uint16[this._pos2+3]}get vertexStartIndex(){return this._structArray.uint32[this._pos4+2]}get lineStartIndex(){return this._structArray.uint32[this._pos4+3]}get lineLength(){return this._structArray.uint32[this._pos4+4]}get segment(){return this._structArray.uint16[this._pos2+10]}get lowerSize(){return this._structArray.uint16[this._pos2+11]}get upperSize(){return this._structArray.uint16[this._pos2+12]}get lineOffsetX(){return this._structArray.float32[this._pos4+7]}get lineOffsetY(){return this._structArray.float32[this._pos4+8]}get writingMode(){return this._structArray.uint8[this._pos1+36]}get placedOrientation(){return this._structArray.uint8[this._pos1+37]}set placedOrientation(t){this._structArray.uint8[this._pos1+37]=t;}get hidden(){return this._structArray.uint8[this._pos1+38]}set hidden(t){this._structArray.uint8[this._pos1+38]=t;}get crossTileID(){return this._structArray.uint32[this._pos4+10]}set crossTileID(t){this._structArray.uint32[this._pos4+10]=t;}get associatedIconIndex(){return this._structArray.int16[this._pos2+22]}}Ds.prototype.size=48;class Cs extends _s{get(t){return new Ds(this,t)}}Gi("PlacedSymbolArray",Cs);class Ps extends ss{get anchorX(){return this._structArray.int16[this._pos2+0]}get anchorY(){return this._structArray.int16[this._pos2+1]}get rightJustifiedTextSymbolIndex(){return this._structArray.int16[this._pos2+2]}get centerJustifiedTextSymbolIndex(){return this._structArray.int16[this._pos2+3]}get leftJustifiedTextSymbolIndex(){return this._structArray.int16[this._pos2+4]}get verticalPlacedTextSymbolIndex(){return this._structArray.int16[this._pos2+5]}get placedIconSymbolIndex(){return this._structArray.int16[this._pos2+6]}get verticalPlacedIconSymbolIndex(){return this._structArray.int16[this._pos2+7]}get key(){return this._structArray.uint16[this._pos2+8]}get textBoxStartIndex(){return this._structArray.uint16[this._pos2+9]}get textBoxEndIndex(){return this._structArray.uint16[this._pos2+10]}get verticalTextBoxStartIndex(){return this._structArray.uint16[this._pos2+11]}get verticalTextBoxEndIndex(){return this._structArray.uint16[this._pos2+12]}get iconBoxStartIndex(){return this._structArray.uint16[this._pos2+13]}get iconBoxEndIndex(){return this._structArray.uint16[this._pos2+14]}get verticalIconBoxStartIndex(){return this._structArray.uint16[this._pos2+15]}get verticalIconBoxEndIndex(){return this._structArray.uint16[this._pos2+16]}get featureIndex(){return this._structArray.uint16[this._pos2+17]}get numHorizontalGlyphVertices(){return this._structArray.uint16[this._pos2+18]}get numVerticalGlyphVertices(){return this._structArray.uint16[this._pos2+19]}get numIconVertices(){return this._structArray.uint16[this._pos2+20]}get numVerticalIconVertices(){return this._structArray.uint16[this._pos2+21]}get useRuntimeCollisionCircles(){return this._structArray.uint16[this._pos2+22]}get crossTileID(){return this._structArray.uint32[this._pos4+12]}set crossTileID(t){this._structArray.uint32[this._pos4+12]=t;}get textBoxScale(){return this._structArray.float32[this._pos4+13]}get textOffset0(){return this._structArray.float32[this._pos4+14]}get textOffset1(){return this._structArray.float32[this._pos4+15]}get collisionCircleDiameter(){return this._structArray.float32[this._pos4+16]}}Ps.prototype.size=68;class Vs extends ks{get(t){return new Ps(this,t)}}Gi("SymbolInstanceArray",Vs);class Fs extends As{getoffsetX(t){return this.float32[1*t+0]}}Gi("GlyphOffsetArray",Fs);class Rs extends Ss{getx(t){return this.int16[3*t+0]}gety(t){return this.int16[3*t+1]}gettileUnitDistanceFromAnchor(t){return this.int16[3*t+2]}}Gi("SymbolLineVertexArray",Rs);class Ls extends ss{get featureIndex(){return this._structArray.uint32[this._pos4+0]}get sourceLayerIndex(){return this._structArray.uint16[this._pos2+2]}get bucketIndex(){return this._structArray.uint16[this._pos2+3]}get layoutVertexArrayOffset(){return this._structArray.uint16[this._pos2+4]}}Ls.prototype.size=12;class Us extends Is{get(t){return new Ls(this,t)}}Gi("FeatureIndexArray",Us);class Os extends ss{get a_centroid_pos0(){return this._structArray.uint16[this._pos2+0]}get a_centroid_pos1(){return this._structArray.uint16[this._pos2+1]}}Os.prototype.size=4;class $s extends Ts{get(t){return new Os(this,t)}}Gi("FillExtrusionCentroidArray",$s);const qs=os([{name:"a_pattern_to",components:4,type:"Uint16"},{name:"a_pattern_from",components:4,type:"Uint16"},{name:"a_pixel_ratio_to",components:1,type:"Uint16"},{name:"a_pixel_ratio_from",components:1,type:"Uint16"}]);var Ns=ae((function(t){t.exports=function(t,e){var r,i,n,s,a,o,l,u;for(i=t.length-(r=3&t.length),n=e,a=3432918353,o=461845907,u=0;u<i;)l=255&t.charCodeAt(u)|(255&t.charCodeAt(++u))<<8|(255&t.charCodeAt(++u))<<16|(255&t.charCodeAt(++u))<<24,++u,n=27492+(65535&(s=5*(65535&(n=(n^=l=(65535&(l=(l=(65535&l)*a+(((l>>>16)*a&65535)<<16)&4294967295)<<15|l>>>17))*o+(((l>>>16)*o&65535)<<16)&4294967295)<<13|n>>>19))+((5*(n>>>16)&65535)<<16)&4294967295))+((58964+(s>>>16)&65535)<<16);switch(l=0,r){case 3:l^=(255&t.charCodeAt(u+2))<<16;case 2:l^=(255&t.charCodeAt(u+1))<<8;case 1:n^=l=(65535&(l=(l=(65535&(l^=255&t.charCodeAt(u)))*a+(((l>>>16)*a&65535)<<16)&4294967295)<<15|l>>>17))*o+(((l>>>16)*o&65535)<<16)&4294967295;}return n^=t.length,n=2246822507*(65535&(n^=n>>>16))+((2246822507*(n>>>16)&65535)<<16)&4294967295,n=3266489909*(65535&(n^=n>>>13))+((3266489909*(n>>>16)&65535)<<16)&4294967295,(n^=n>>>16)>>>0};})),js=ae((function(t){t.exports=function(t,e){for(var r,i=t.length,n=e^i,s=0;i>=4;)r=1540483477*(65535&(r=255&t.charCodeAt(s)|(255&t.charCodeAt(++s))<<8|(255&t.charCodeAt(++s))<<16|(255&t.charCodeAt(++s))<<24))+((1540483477*(r>>>16)&65535)<<16),n=1540483477*(65535&n)+((1540483477*(n>>>16)&65535)<<16)^(r=1540483477*(65535&(r^=r>>>24))+((1540483477*(r>>>16)&65535)<<16)),i-=4,++s;switch(i){case 3:n^=(255&t.charCodeAt(s+2))<<16;case 2:n^=(255&t.charCodeAt(s+1))<<8;case 1:n=1540483477*(65535&(n^=255&t.charCodeAt(s)))+((1540483477*(n>>>16)&65535)<<16);}return n=1540483477*(65535&(n^=n>>>13))+((1540483477*(n>>>16)&65535)<<16),(n^=n>>>15)>>>0};})),Gs=Ns,Zs=js;Gs.murmur3=Ns,Gs.murmur2=Zs;class Xs{constructor(){this.ids=[],this.positions=[],this.indexed=!1;}add(t,e,r,i){this.ids.push(Ks(t)),this.positions.push(e,r,i);}getPositions(t){const e=Ks(t);let r=0,i=this.ids.length-1;for(;r<i;){const t=r+i>>1;this.ids[t]>=e?i=t:r=t+1;}const n=[];for(;this.ids[r]===e;)n.push({index:this.positions[3*r],start:this.positions[3*r+1],end:this.positions[3*r+2]}),r++;return n}static serialize(t,e){const r=new Float64Array(t.ids),i=new Uint32Array(t.positions);return function t(e,r,i,n){for(;i<n;){const s=e[i+n>>1];let a=i-1,o=n+1;for(;;){do{a++;}while(e[a]<s);do{o--;}while(e[o]>s);if(a>=o)break;Hs(e,a,o),Hs(r,3*a,3*o),Hs(r,3*a+1,3*o+1),Hs(r,3*a+2,3*o+2);}o-i<n-o?(t(e,r,i,o),i=o+1):(t(e,r,o+1,n),n=o);}}(r,i,0,r.length-1),e&&e.push(r.buffer,i.buffer),{ids:r,positions:i}}static deserialize(t){const e=new Xs;return e.ids=t.ids,e.positions=t.positions,e.indexed=!0,e}}function Ks(t){const e=+t;return !isNaN(e)&&e<=o?e:Gs(String(t))}function Hs(t,e,r){const i=t[e];t[e]=t[r],t[r]=i;}Gi("FeaturePositionMap",Xs);class Ys{constructor(t,e){this.gl=t.gl,this.location=e;}}class Ws extends Ys{constructor(t,e){super(t,e),this.current=0;}set(t){this.current!==t&&(this.current=t,this.gl.uniform1f(this.location,t));}}class Js extends Ys{constructor(t,e){super(t,e),this.current=[0,0,0,0];}set(t){t[0]===this.current[0]&&t[1]===this.current[1]&&t[2]===this.current[2]&&t[3]===this.current[3]||(this.current=t,this.gl.uniform4f(this.location,t[0],t[1],t[2],t[3]));}}class Qs extends Ys{constructor(t,e){super(t,e),this.current=le.transparent;}set(t){t.r===this.current.r&&t.g===this.current.g&&t.b===this.current.b&&t.a===this.current.a||(this.current=t,this.gl.uniform4f(this.location,t.r,t.g,t.b,t.a));}}const ta=new Float32Array(16),ea=new Float32Array(9);function ra(t){return [is(255*t.r,255*t.g),is(255*t.b,255*t.a)]}class ia{constructor(t,e,r){this.value=t,this.uniformNames=e.map(t=>`u_${t}`),this.type=r;}setUniform(t,e,r){t.set(r.constantOr(this.value));}getBinding(t,e,r){return "color"===this.type?new Qs(t,e):new Ws(t,e)}}class na{constructor(t,e){this.uniformNames=e.map(t=>`u_${t}`),this.patternFrom=null,this.patternTo=null,this.pixelRatioFrom=1,this.pixelRatioTo=1;}setConstantPatternPositions(t,e){this.pixelRatioFrom=e.pixelRatio,this.pixelRatioTo=t.pixelRatio,this.patternFrom=e.tlbr,this.patternTo=t.tlbr;}setUniform(t,e,r,i){const n="u_pattern_to"===i?this.patternTo:"u_pattern_from"===i?this.patternFrom:"u_pixel_ratio_to"===i?this.pixelRatioTo:"u_pixel_ratio_from"===i?this.pixelRatioFrom:null;n&&t.set(n);}getBinding(t,e,r){return "u_pattern"===r.substr(0,9)?new Js(t,e):new Ws(t,e)}}class sa{constructor(t,e,r,i){this.expression=t,this.type=r,this.maxValue=0,this.paintVertexAttributes=e.map(t=>({name:`a_${t}`,type:"Float32",components:"color"===r?2:1,offset:0})),this.paintVertexArray=new i;}populatePaintArray(t,e,r,i,n){const s=this.paintVertexArray.length,a=this.expression.evaluate(new qn(0),e,{},i,[],n);this.paintVertexArray.resize(t),this._setPaintValue(s,t,a);}updatePaintArray(t,e,r,i){const n=this.expression.evaluate({zoom:0},r,i);this._setPaintValue(t,e,n);}_setPaintValue(t,e,r){if("color"===this.type){const i=ra(r);for(let r=t;r<e;r++)this.paintVertexArray.emplace(r,i[0],i[1]);}else {for(let i=t;i<e;i++)this.paintVertexArray.emplace(i,r);this.maxValue=Math.max(this.maxValue,Math.abs(r));}}upload(t){this.paintVertexArray&&this.paintVertexArray.arrayBuffer&&(this.paintVertexBuffer&&this.paintVertexBuffer.buffer?this.paintVertexBuffer.updateData(this.paintVertexArray):this.paintVertexBuffer=t.createVertexBuffer(this.paintVertexArray,this.paintVertexAttributes,this.expression.isStateDependent));}destroy(){this.paintVertexBuffer&&this.paintVertexBuffer.destroy();}}class aa{constructor(t,e,r,i,n,s){this.expression=t,this.uniformNames=e.map(t=>`u_${t}_t`),this.type=r,this.useIntegerZoom=i,this.zoom=n,this.maxValue=0,this.paintVertexAttributes=e.map(t=>({name:`a_${t}`,type:"Float32",components:"color"===r?4:2,offset:0})),this.paintVertexArray=new s;}populatePaintArray(t,e,r,i,n){const s=this.expression.evaluate(new qn(this.zoom),e,{},i,[],n),a=this.expression.evaluate(new qn(this.zoom+1),e,{},i,[],n),o=this.paintVertexArray.length;this.paintVertexArray.resize(t),this._setPaintValue(o,t,s,a);}updatePaintArray(t,e,r,i){const n=this.expression.evaluate({zoom:this.zoom},r,i),s=this.expression.evaluate({zoom:this.zoom+1},r,i);this._setPaintValue(t,e,n,s);}_setPaintValue(t,e,r,i){if("color"===this.type){const n=ra(r),s=ra(i);for(let r=t;r<e;r++)this.paintVertexArray.emplace(r,n[0],n[1],s[0],s[1]);}else {for(let n=t;n<e;n++)this.paintVertexArray.emplace(n,r,i);this.maxValue=Math.max(this.maxValue,Math.abs(r),Math.abs(i));}}upload(t){this.paintVertexArray&&this.paintVertexArray.arrayBuffer&&(this.paintVertexBuffer&&this.paintVertexBuffer.buffer?this.paintVertexBuffer.updateData(this.paintVertexArray):this.paintVertexBuffer=t.createVertexBuffer(this.paintVertexArray,this.paintVertexAttributes,this.expression.isStateDependent));}destroy(){this.paintVertexBuffer&&this.paintVertexBuffer.destroy();}setUniform(t,e){const r=this.useIntegerZoom?Math.floor(e.zoom):e.zoom,i=f(this.expression.interpolationFactor(r,this.zoom,this.zoom+1),0,1);t.set(i);}getBinding(t,e,r){return new Ws(t,e)}}class oa{constructor(t,e,r,i,n,s,a){this.expression=t,this.type=r,this.useIntegerZoom=i,this.zoom=n,this.layerId=a;for(let t=0;t<e.length;++t);this.zoomInPaintVertexArray=new s,this.zoomOutPaintVertexArray=new s;}populatePaintArray(t,e,r){const i=this.zoomInPaintVertexArray.length;this.zoomInPaintVertexArray.resize(t),this.zoomOutPaintVertexArray.resize(t),this._setPaintValues(i,t,e.patterns&&e.patterns[this.layerId],r);}updatePaintArray(t,e,r,i,n){this._setPaintValues(t,e,r.patterns&&r.patterns[this.layerId],n);}_setPaintValues(t,e,r,i){if(!i||!r)return;const{min:n,mid:s,max:a}=r,o=i[n],l=i[s],u=i[a];if(o&&l&&u)for(let r=t;r<e;r++)this.zoomInPaintVertexArray.emplace(r,l.tl[0],l.tl[1],l.br[0],l.br[1],o.tl[0],o.tl[1],o.br[0],o.br[1],l.pixelRatio,o.pixelRatio),this.zoomOutPaintVertexArray.emplace(r,l.tl[0],l.tl[1],l.br[0],l.br[1],u.tl[0],u.tl[1],u.br[0],u.br[1],l.pixelRatio,u.pixelRatio);}upload(t){this.zoomInPaintVertexArray&&this.zoomInPaintVertexArray.arrayBuffer&&this.zoomOutPaintVertexArray&&this.zoomOutPaintVertexArray.arrayBuffer&&(this.zoomInPaintVertexBuffer=t.createVertexBuffer(this.zoomInPaintVertexArray,qs.members,this.expression.isStateDependent),this.zoomOutPaintVertexBuffer=t.createVertexBuffer(this.zoomOutPaintVertexArray,qs.members,this.expression.isStateDependent));}destroy(){this.zoomOutPaintVertexBuffer&&this.zoomOutPaintVertexBuffer.destroy(),this.zoomInPaintVertexBuffer&&this.zoomInPaintVertexBuffer.destroy();}}class la{constructor(t,e,r=(()=>!0)){this.binders={},this._buffers=[];const i=[];for(const n in t.paint._values){if(!r(n))continue;const s=t.paint.get(n);if(!(s instanceof Hn&&Or(s.property.specification)))continue;const a=ca(n,t.type),o=s.value,l=s.property.specification.type,u=s.property.useIntegerZoom,c=s.property.specification["property-type"],h="cross-faded"===c||"cross-faded-data-driven"===c;if("constant"===o.kind)this.binders[n]=h?new na(o.value,a):new ia(o.value,a,l),i.push(`/u_${n}`);else if("source"===o.kind||h){const r=ha(n,l,"source");this.binders[n]=h?new oa(o,a,l,u,e,r,t.id):new sa(o,a,l,r),i.push(`/a_${n}`);}else {const t=ha(n,l,"composite");this.binders[n]=new aa(o,a,l,u,e,t),i.push(`/z_${n}`);}}this.cacheKey=i.sort().join("");}getMaxValue(t){const e=this.binders[t];return e instanceof sa||e instanceof aa?e.maxValue:0}populatePaintArrays(t,e,r,i,n){for(const s in this.binders){const a=this.binders[s];(a instanceof sa||a instanceof aa||a instanceof oa)&&a.populatePaintArray(t,e,r,i,n);}}setConstantPatternPositions(t,e){for(const r in this.binders){const i=this.binders[r];i instanceof na&&i.setConstantPatternPositions(t,e);}}updatePaintArrays(t,e,r,i,n){let s=!1;for(const a in t){const o=e.getPositions(a);for(const e of o){const o=r.feature(e.index);for(const r in this.binders){const l=this.binders[r];if((l instanceof sa||l instanceof aa||l instanceof oa)&&!0===l.expression.isStateDependent){const u=i.paint.get(r);l.expression=u.value,l.updatePaintArray(e.start,e.end,o,t[a],n),s=!0;}}}}return s}defines(){const t=[];for(const e in this.binders){const r=this.binders[e];(r instanceof ia||r instanceof na)&&t.push(...r.uniformNames.map(t=>`#define HAS_UNIFORM_${t}`));}return t}getBinderAttributes(){const t=[];for(const e in this.binders){const r=this.binders[e];if(r instanceof sa||r instanceof aa)for(let e=0;e<r.paintVertexAttributes.length;e++)t.push(r.paintVertexAttributes[e].name);else if(r instanceof oa)for(let e=0;e<qs.members.length;e++)t.push(qs.members[e].name);}return t}getBinderUniforms(){const t=[];for(const e in this.binders){const r=this.binders[e];if(r instanceof ia||r instanceof na||r instanceof aa)for(const e of r.uniformNames)t.push(e);}return t}getPaintVertexBuffers(){return this._buffers}getUniforms(t,e){const r=[];for(const i in this.binders){const n=this.binders[i];if(n instanceof ia||n instanceof na||n instanceof aa)for(const s of n.uniformNames)if(e[s]){const a=n.getBinding(t,e[s],s);r.push({name:s,property:i,binding:a});}}return r}setUniforms(t,e,r,i){for(const{name:t,property:n,binding:s}of e)this.binders[n].setUniform(s,i,r.get(n),t);}updatePaintBuffers(t){this._buffers=[];for(const e in this.binders){const r=this.binders[e];if(t&&r instanceof oa){const e=2===t.fromScale?r.zoomInPaintVertexBuffer:r.zoomOutPaintVertexBuffer;e&&this._buffers.push(e);}else (r instanceof sa||r instanceof aa)&&r.paintVertexBuffer&&this._buffers.push(r.paintVertexBuffer);}}upload(t){for(const e in this.binders){const r=this.binders[e];(r instanceof sa||r instanceof aa||r instanceof oa)&&r.upload(t);}this.updatePaintBuffers();}destroy(){for(const t in this.binders){const e=this.binders[t];(e instanceof sa||e instanceof aa||e instanceof oa)&&e.destroy();}}}class ua{constructor(t,e,r=(()=>!0)){this.programConfigurations={};for(const i of t)this.programConfigurations[i.id]=new la(i,e,r);this.needsUpload=!1,this._featureMap=new Xs,this._bufferOffset=0;}populatePaintArrays(t,e,r,i,n,s){for(const r in this.programConfigurations)this.programConfigurations[r].populatePaintArrays(t,e,i,n,s);void 0!==e.id&&this._featureMap.add(e.id,r,this._bufferOffset,t),this._bufferOffset=t,this.needsUpload=!0;}updatePaintArrays(t,e,r,i){for(const n of r)this.needsUpload=this.programConfigurations[n.id].updatePaintArrays(t,this._featureMap,e,n,i)||this.needsUpload;}get(t){return this.programConfigurations[t]}upload(t){if(this.needsUpload){for(const e in this.programConfigurations)this.programConfigurations[e].upload(t);this.needsUpload=!1;}}destroy(){for(const t in this.programConfigurations)this.programConfigurations[t].destroy();}}function ca(t,e){return {"text-opacity":["opacity"],"icon-opacity":["opacity"],"text-color":["fill_color"],"icon-color":["fill_color"],"text-halo-color":["halo_color"],"icon-halo-color":["halo_color"],"text-halo-blur":["halo_blur"],"icon-halo-blur":["halo_blur"],"text-halo-width":["halo_width"],"icon-halo-width":["halo_width"],"line-gap-width":["gapwidth"],"line-pattern":["pattern_to","pattern_from","pixel_ratio_to","pixel_ratio_from"],"fill-pattern":["pattern_to","pattern_from","pixel_ratio_to","pixel_ratio_from"],"fill-extrusion-pattern":["pattern_to","pattern_from","pixel_ratio_to","pixel_ratio_from"]}[t]||[t.replace(`${e}-`,"").replace(/-/g,"_")]}function ha(t,e,r){const i={color:{source:ps,composite:Es},number:{source:As,composite:ps}},n=function(t){return {"line-pattern":{source:ds,composite:ds},"fill-pattern":{source:ds,composite:ds},"fill-extrusion-pattern":{source:ds,composite:ds}}[t]}(t);return n&&n[r]||i[e][r]}Gi("ConstantBinder",ia),Gi("CrossFadedConstantBinder",na),Gi("SourceExpressionBinder",sa),Gi("CrossFadedCompositeBinder",oa),Gi("CompositeExpressionBinder",aa),Gi("ProgramConfiguration",la,{omit:["_buffers"]}),Gi("ProgramConfigurationSet",ua);class pa extends Vt{constructor(t,e){if(super(),this.id=t.id,this.type=t.type,this._featureFilter={filter:()=>!0,needGeometry:!1},"custom"!==t.type&&(this.metadata=(t=t).metadata,this.minzoom=t.minzoom,this.maxzoom=t.maxzoom,"background"!==t.type&&"sky"!==t.type&&(this.source=t.source,this.sourceLayer=t["source-layer"],this.filter=t.filter),e.layout&&(this._unevaluatedLayout=new Kn(e.layout)),e.paint)){this._transitionablePaint=new Gn(e.paint);for(const e in t.paint)this.setPaintProperty(e,t.paint[e],{validate:!1});for(const e in t.layout)this.setLayoutProperty(e,t.layout[e],{validate:!1});this._transitioningPaint=this._transitionablePaint.untransitioned(),this.paint=new Yn(e.paint);}}getCrossfadeParameters(){return this._crossfadeParameters}getLayoutProperty(t){return "visibility"===t?this.visibility:this._unevaluatedLayout.getValue(t)}setLayoutProperty(t,e,r={}){null!=e&&this._validate(Li,`layers.${this.id}.layout.${t}`,t,e,r)||("visibility"!==t?this._unevaluatedLayout.setValue(t,e):this.visibility=e);}getPaintProperty(t){return A(t,"-transition")?this._transitionablePaint.getTransition(t.slice(0,-"-transition".length)):this._transitionablePaint.getValue(t)}setPaintProperty(t,e,r={}){if(null!=e&&this._validate(Ri,`layers.${this.id}.paint.${t}`,t,e,r))return !1;if(A(t,"-transition"))return this._transitionablePaint.setTransition(t.slice(0,-"-transition".length),e||void 0),!1;{const r=this._transitionablePaint._values[t],i="cross-faded-data-driven"===r.property.specification["property-type"],n=r.value.isDataDriven(),s=r.value;this._transitionablePaint.setValue(t,e),this._handleSpecialPaintPropertyUpdate(t);const a=this._transitionablePaint._values[t].value;return a.isDataDriven()||n||i||this._handleOverridablePaintPropertyUpdate(t,s,a)}}_handleSpecialPaintPropertyUpdate(t){}getProgramIds(){return null}getProgramConfiguration(t){return null}_handleOverridablePaintPropertyUpdate(t,e,r){return !1}isHidden(t){return !!(this.minzoom&&t<this.minzoom)||!!(this.maxzoom&&t>=this.maxzoom)||"none"===this.visibility}updateTransitions(t){this._transitioningPaint=this._transitionablePaint.transitioned(t,this._transitioningPaint);}hasTransition(){return this._transitioningPaint.hasTransition()}recalculate(t,e){t.getCrossfadeParameters&&(this._crossfadeParameters=t.getCrossfadeParameters()),this._unevaluatedLayout&&(this.layout=this._unevaluatedLayout.possiblyEvaluate(t,void 0,e)),this.paint=this._transitioningPaint.possiblyEvaluate(t,void 0,e);}serialize(){const t={id:this.id,type:this.type,source:this.source,"source-layer":this.sourceLayer,metadata:this.metadata,minzoom:this.minzoom,maxzoom:this.maxzoom,filter:this.filter,layout:this._unevaluatedLayout&&this._unevaluatedLayout.serialize(),paint:this._transitionablePaint&&this._transitionablePaint.serialize()};return this.visibility&&(t.layout=t.layout||{},t.layout.visibility=this.visibility),I(t,(t,e)=>!(void 0===t||"layout"===e&&!Object.keys(t).length||"paint"===e&&!Object.keys(t).length))}_validate(t,e,r,i,n={}){return (!n||!1!==n.validate)&&Ui(this,t.call(Vi,{key:e,layerType:this.type,objectKey:r,value:i,styleSpec:Ft,style:{glyphs:!0,sprite:!0}}))}is3D(){return !1}isSky(){return !1}isTileClipped(){return !1}hasOffscreenPass(){return !1}resize(){}isStateDependent(){for(const t in this.paint._values){const e=this.paint.get(t);if(e instanceof Hn&&Or(e.property.specification)&&("source"===e.value.kind||"composite"===e.value.kind)&&e.value.isStateDependent)return !0}return !1}}const da=os([{name:"a_pos",components:2,type:"Int16"}],4),{members:fa}=da;class ya{constructor(t=[]){this.segments=t;}prepareSegment(t,e,r,i){let n=this.segments[this.segments.length-1];return t>ya.MAX_VERTEX_ARRAY_LENGTH&&E(`Max vertices per segment is ${ya.MAX_VERTEX_ARRAY_LENGTH}: bucket requested ${t}`),(!n||n.vertexLength+t>ya.MAX_VERTEX_ARRAY_LENGTH||n.sortKey!==i)&&(n={vertexOffset:e.length,primitiveOffset:r.length,vertexLength:0,primitiveLength:0},void 0!==i&&(n.sortKey=i),this.segments.push(n)),n}get(){return this.segments}destroy(){for(const t of this.segments)for(const e in t.vaos)t.vaos[e].destroy();}static simpleSegment(t,e,r,i){return new ya([{vertexOffset:t,primitiveOffset:e,vertexLength:r,primitiveLength:i,vaos:{},sortKey:0}])}}ya.MAX_VERTEX_ARRAY_LENGTH=Math.pow(2,16)-1,Gi("SegmentVector",ya);const ma=Math.pow(2,14)-1,ga=-ma-1;function xa(t){const e=8192/t.extent,r=t.loadGeometry();for(let t=0;t<r.length;t++){const i=r[t];for(let t=0;t<i.length;t++){const r=i[t],n=Math.round(r.x*e),s=Math.round(r.y*e);r.x=f(n,ga,ma),r.y=f(s,ga,ma),(n<r.x||n>r.x+1||s<r.y||s>r.y+1)&&E("Geometry exceeds allowed extent, reduce your vector tile buffer size");}}return r}function va(t,e){return {type:t.type,id:t.id,properties:t.properties,geometry:e?xa(t):[]}}function ba(t,e,r,i,n){t.emplaceBack(2*e+(i+1)/2,2*r+(n+1)/2);}class wa{constructor(t){this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map(t=>t.id),this.index=t.index,this.hasPattern=!1,this.layoutVertexArray=new us,this.indexArray=new ws,this.segments=new ya,this.programConfigurations=new ua(t.layers,t.zoom),this.stateDependentLayerIds=this.layers.filter(t=>t.isStateDependent()).map(t=>t.id);}populate(t,e,r){const i=this.layers[0],n=[];let s=null;"circle"===i.type&&(s=i.layout.get("circle-sort-key"));for(const{feature:e,id:i,index:a,sourceLayerIndex:o}of t){const t=this.layers[0]._featureFilter.needGeometry,l=va(e,t);if(!this.layers[0]._featureFilter.filter(new qn(this.zoom),l,r))continue;const u=s?s.evaluate(l,{},r):void 0,c={id:i,properties:e.properties,type:e.type,sourceLayerIndex:o,index:a,geometry:t?l.geometry:xa(e),patterns:{},sortKey:u};n.push(c);}s&&n.sort((t,e)=>t.sortKey-e.sortKey);for(const i of n){const{geometry:n,index:s,sourceLayerIndex:a}=i,o=t[s].feature;this.addFeature(i,n,s,r),e.featureIndex.insert(o,n,s,a,this.index);}}update(t,e,r){this.stateDependentLayers.length&&this.programConfigurations.updatePaintArrays(t,e,this.stateDependentLayers,r);}isEmpty(){return 0===this.layoutVertexArray.length}uploadPending(){return !this.uploaded||this.programConfigurations.needsUpload}upload(t){this.uploaded||(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,fa),this.indexBuffer=t.createIndexBuffer(this.indexArray)),this.programConfigurations.upload(t),this.uploaded=!0;}destroy(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy());}addFeature(t,e,r,i){for(const r of e)for(const e of r){const r=e.x,i=e.y;if(r<0||r>=8192||i<0||i>=8192)continue;const n=this.segments.prepareSegment(4,this.layoutVertexArray,this.indexArray,t.sortKey),s=n.vertexLength;ba(this.layoutVertexArray,r,i,-1,-1),ba(this.layoutVertexArray,r,i,1,-1),ba(this.layoutVertexArray,r,i,1,1),ba(this.layoutVertexArray,r,i,-1,1),this.indexArray.emplaceBack(s,s+1,s+2),this.indexArray.emplaceBack(s,s+3,s+2),n.vertexLength+=4,n.primitiveLength+=2;}this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,t,r,{},i);}}function _a(t,e){for(let r=0;r<t.length;r++)if(Ba(e,t[r]))return !0;for(let r=0;r<e.length;r++)if(Ba(t,e[r]))return !0;return !!Ia(t,e)}function ka(t,e,r){return !!Ba(t,e)||!!za(e,t,r)}function Aa(t,e){if(1===t.length)return Ma(e,t[0]);for(let r=0;r<e.length;r++){const i=e[r];for(let e=0;e<i.length;e++)if(Ba(t,i[e]))return !0}for(let r=0;r<t.length;r++)if(Ma(e,t[r]))return !0;for(let r=0;r<e.length;r++)if(Ia(t,e[r]))return !0;return !1}function Sa(t,e,r){if(t.length>1){if(Ia(t,e))return !0;for(let i=0;i<e.length;i++)if(za(e[i],t,r))return !0}for(let i=0;i<t.length;i++)if(za(t[i],e,r))return !0;return !1}function Ia(t,e){if(0===t.length||0===e.length)return !1;for(let r=0;r<t.length-1;r++){const i=t[r],n=t[r+1];for(let t=0;t<e.length-1;t++)if(Ta(i,n,e[t],e[t+1]))return !0}return !1}function Ta(t,e,r,i){return M(t,r,i)!==M(e,r,i)&&M(t,e,r)!==M(t,e,i)}function za(t,e,r){const i=r*r;if(1===e.length)return t.distSqr(e[0])<i;for(let r=1;r<e.length;r++)if(Ea(t,e[r-1],e[r])<i)return !0;return !1}function Ea(t,e,r){const i=e.distSqr(r);if(0===i)return t.distSqr(e);const n=((t.x-e.x)*(r.x-e.x)+(t.y-e.y)*(r.y-e.y))/i;return t.distSqr(n<0?e:n>1?r:r.sub(e)._mult(n)._add(e))}function Ma(t,e){let r,i,n,s=!1;for(let a=0;a<t.length;a++){r=t[a];for(let t=0,a=r.length-1;t<r.length;a=t++)i=r[t],n=r[a],i.y>e.y!=n.y>e.y&&e.x<(n.x-i.x)*(e.y-i.y)/(n.y-i.y)+i.x&&(s=!s);}return s}function Ba(t,e){let r=!1;for(let i=0,n=t.length-1;i<t.length;n=i++){const s=t[i],a=t[n];s.y>e.y!=a.y>e.y&&e.x<(a.x-s.x)*(e.y-s.y)/(a.y-s.y)+s.x&&(r=!r);}return r}function Da(t,e,r,n,s){for(const i of t)if(e<=i.x&&r<=i.y&&n>=i.x&&s>=i.y)return !0;const a=[new i(e,r),new i(e,s),new i(n,s),new i(n,r)];if(t.length>2)for(const e of a)if(Ba(t,e))return !0;for(let e=0;e<t.length-1;e++)if(Ca(t[e],t[e+1],a))return !0;return !1}function Ca(t,e,r){const i=r[0],n=r[2];if(t.x<i.x&&e.x<i.x||t.x>n.x&&e.x>n.x||t.y<i.y&&e.y<i.y||t.y>n.y&&e.y>n.y)return !1;const s=M(t,e,r[0]);return s!==M(t,e,r[1])||s!==M(t,e,r[2])||s!==M(t,e,r[3])}function Pa(t,e,r){const i=e.paint.get(t).value;return "constant"===i.kind?i.value:r.programConfigurations.get(e.id).getMaxValue(t)}function Va(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1])}function Fa(t,e,r,n,s){if(!e[0]&&!e[1])return t;const a=i.convert(e)._mult(s);"viewport"===r&&a._rotate(-n);const o=[];for(let e=0;e<t.length;e++)o.push(t[e].sub(a));return o}function Ra(t,e,r,n){const s=i.convert(t)._mult(n);return "viewport"===e&&s._rotate(-r),s}Gi("CircleBucket",wa,{omit:["layers"]});const La=new rs({"circle-sort-key":new Jn(Ft.layout_circle["circle-sort-key"])});var Ua={paint:new rs({"circle-radius":new Jn(Ft.paint_circle["circle-radius"]),"circle-color":new Jn(Ft.paint_circle["circle-color"]),"circle-blur":new Jn(Ft.paint_circle["circle-blur"]),"circle-opacity":new Jn(Ft.paint_circle["circle-opacity"]),"circle-translate":new Wn(Ft.paint_circle["circle-translate"]),"circle-translate-anchor":new Wn(Ft.paint_circle["circle-translate-anchor"]),"circle-pitch-scale":new Wn(Ft.paint_circle["circle-pitch-scale"]),"circle-pitch-alignment":new Wn(Ft.paint_circle["circle-pitch-alignment"]),"circle-stroke-width":new Jn(Ft.paint_circle["circle-stroke-width"]),"circle-stroke-color":new Jn(Ft.paint_circle["circle-stroke-color"]),"circle-stroke-opacity":new Jn(Ft.paint_circle["circle-stroke-opacity"])}),layout:La},Oa="undefined"!=typeof Float32Array?Float32Array:Array;function $a(){var t=new Oa(9);return Oa!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[5]=0,t[6]=0,t[7]=0),t[0]=1,t[4]=1,t[8]=1,t}function qa(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function Na(t,e,r){var i=e[0],n=e[1],s=e[2],a=e[3],o=e[4],l=e[5],u=e[6],c=e[7],h=e[8],p=e[9],d=e[10],f=e[11],y=e[12],m=e[13],g=e[14],x=e[15],v=r[0],b=r[1],w=r[2],_=r[3];return t[0]=v*i+b*o+w*h+_*y,t[1]=v*n+b*l+w*p+_*m,t[2]=v*s+b*u+w*d+_*g,t[3]=v*a+b*c+w*f+_*x,t[4]=(v=r[4])*i+(b=r[5])*o+(w=r[6])*h+(_=r[7])*y,t[5]=v*n+b*l+w*p+_*m,t[6]=v*s+b*u+w*d+_*g,t[7]=v*a+b*c+w*f+_*x,t[8]=(v=r[8])*i+(b=r[9])*o+(w=r[10])*h+(_=r[11])*y,t[9]=v*n+b*l+w*p+_*m,t[10]=v*s+b*u+w*d+_*g,t[11]=v*a+b*c+w*f+_*x,t[12]=(v=r[12])*i+(b=r[13])*o+(w=r[14])*h+(_=r[15])*y,t[13]=v*n+b*l+w*p+_*m,t[14]=v*s+b*u+w*d+_*g,t[15]=v*a+b*c+w*f+_*x,t}Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});var ja=Na;function Ga(){var t=new Oa(3);return Oa!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function Za(t){var e=new Oa(3);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e}function Xa(t){return Math.hypot(t[0],t[1],t[2])}function Ka(t,e,r){var i=new Oa(3);return i[0]=t,i[1]=e,i[2]=r,i}function Ha(t,e,r){return t[0]=e[0]+r[0],t[1]=e[1]+r[1],t[2]=e[2]+r[2],t}function Ya(t,e,r){return t[0]=e[0]-r[0],t[1]=e[1]-r[1],t[2]=e[2]-r[2],t}function Wa(t,e,r){return t[0]=e[0]*r,t[1]=e[1]*r,t[2]=e[2]*r,t}function Ja(t,e,r,i){return t[0]=e[0]+r[0]*i,t[1]=e[1]+r[1]*i,t[2]=e[2]+r[2]*i,t}function Qa(t,e){var r=e[0],i=e[1],n=e[2],s=r*r+i*i+n*n;return s>0&&(s=1/Math.sqrt(s)),t[0]=e[0]*s,t[1]=e[1]*s,t[2]=e[2]*s,t}function to(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function eo(t,e,r){var i=e[0],n=e[1],s=e[2],a=r[0],o=r[1],l=r[2];return t[0]=n*l-s*o,t[1]=s*a-i*l,t[2]=i*o-n*a,t}function ro(t,e,r){var i=e[0],n=e[1],s=e[2],a=r[3]*i+r[7]*n+r[11]*s+r[15];return t[0]=(r[0]*i+r[4]*n+r[8]*s+r[12])/(a=a||1),t[1]=(r[1]*i+r[5]*n+r[9]*s+r[13])/a,t[2]=(r[2]*i+r[6]*n+r[10]*s+r[14])/a,t}function io(t,e,r){var i=r[0],n=r[1],s=r[2],a=e[0],o=e[1],l=e[2],u=n*l-s*o,c=s*a-i*l,h=i*o-n*a,p=n*h-s*c,d=s*u-i*h,f=i*c-n*u,y=2*r[3];return c*=y,h*=y,d*=2,f*=2,t[0]=a+(u*=y)+(p*=2),t[1]=o+c+d,t[2]=l+h+f,t}var no,so=Ya,ao=Xa;function oo(t,e,r){var i=e[0],n=e[1],s=e[2],a=e[3];return t[0]=r[0]*i+r[4]*n+r[8]*s+r[12]*a,t[1]=r[1]*i+r[5]*n+r[9]*s+r[13]*a,t[2]=r[2]*i+r[6]*n+r[10]*s+r[14]*a,t[3]=r[3]*i+r[7]*n+r[11]*s+r[15]*a,t}function lo(){var t=new Oa(4);return Oa!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t[3]=1,t}function uo(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t}function co(t,e,r){r*=.5;var i=e[0],n=e[1],s=e[2],a=e[3],o=Math.sin(r),l=Math.cos(r);return t[0]=i*l+a*o,t[1]=n*l+s*o,t[2]=s*l-n*o,t[3]=a*l-i*o,t}Ga(),no=new Oa(4),Oa!=Float32Array&&(no[0]=0,no[1]=0,no[2]=0,no[3]=0),Ga(),Ka(1,0,0),Ka(0,1,0),lo(),lo(),$a();class ho{constructor(t,e){this.points=t,this.planes=e;}static fromInvProjectionMatrix(t,e,r){const i=Math.pow(2,r),n=[[-1,1,-1,1],[1,1,-1,1],[1,-1,-1,1],[-1,-1,-1,1],[-1,1,1,1],[1,1,1,1],[1,-1,1,1],[-1,-1,1,1]].map(r=>{const n=oo([],r,t),s=1/n[3]/e*i;return function(t,e,r){return t[0]=e[0]*r[0],t[1]=e[1]*r[1],t[2]=e[2]*r[2],t[3]=e[3]*r[3],t}(n,n,[s,s,1/n[3],s])}),s=[[0,1,2],[6,5,4],[0,3,7],[2,1,5],[3,2,6],[0,4,5]].map(t=>{const e=Qa([],eo([],so([],n[t[0]],n[t[1]]),so([],n[t[2]],n[t[1]]))),r=-to(e,n[t[1]]);return e.concat(r)});return new ho(n,s)}}class po{constructor(t,e){this.min=t,this.max=e,this.center=Wa([],Ha([],this.min,this.max),.5);}quadrant(t){const e=[t%2==0,t<2],r=Za(this.min),i=Za(this.max);for(let t=0;t<e.length;t++)r[t]=e[t]?this.min[t]:this.center[t],i[t]=e[t]?this.center[t]:this.max[t];return i[2]=this.max[2],new po(r,i)}distanceX(t){return Math.max(Math.min(this.max[0],t[0]),this.min[0])-t[0]}distanceY(t){return Math.max(Math.min(this.max[1],t[1]),this.min[1])-t[1]}distanceZ(t){return Math.max(Math.min(this.max[2],t[2]),this.min[2])-t[2]}intersects(t){const e=[[this.min[0],this.min[1],this.min[2],1],[this.max[0],this.min[1],this.min[2],1],[this.max[0],this.max[1],this.min[2],1],[this.min[0],this.max[1],this.min[2],1],[this.min[0],this.min[1],this.max[2],1],[this.max[0],this.min[1],this.max[2],1],[this.max[0],this.max[1],this.max[2],1],[this.min[0],this.max[1],this.max[2],1]];let r=!0;for(let s=0;s<t.planes.length;s++){const a=t.planes[s];let o=0;for(let t=0;t<e.length;t++)o+=(i=a)[0]*(n=e[t])[0]+i[1]*n[1]+i[2]*n[2]+i[3]*n[3]>=0;if(0===o)return 0;o!==e.length&&(r=!1);}var i,n;if(r)return 2;for(let e=0;e<3;e++){let r=Number.MAX_VALUE,i=-Number.MAX_VALUE;for(let n=0;n<t.points.length;n++){const s=t.points[n][e]-this.min[e];r=Math.min(r,s),i=Math.max(i,s);}if(i<0||r>this.max[e]-this.min[e])return 0}return 1}}function fo(t,e,r){const n=oo([],[t.x,t.y,e,1],r);return new i(n[0]/n[3],n[1]/n[3])}const yo=Ka(0,0,0),mo=Ka(0,0,1);function go(t,e){const r=Ga();return yo[2]=e,t.intersectsPlane(yo,mo,r),new i(r[0],r[1])}class xo extends wa{}function vo(t,{width:e,height:r},i,n){if(n){if(n instanceof Uint8ClampedArray)n=new Uint8Array(n.buffer);else if(n.length!==e*r*i)throw new RangeError("mismatched image size")}else n=new Uint8Array(e*r*i);return t.width=e,t.height=r,t.data=n,t}function bo(t,{width:e,height:r},i){if(e===t.width&&r===t.height)return;const n=vo({},{width:e,height:r},i);wo(t,n,{x:0,y:0},{x:0,y:0},{width:Math.min(t.width,e),height:Math.min(t.height,r)},i),t.width=e,t.height=r,t.data=n.data;}function wo(t,e,r,i,n,s){if(0===n.width||0===n.height)return e;if(n.width>t.width||n.height>t.height||r.x>t.width-n.width||r.y>t.height-n.height)throw new RangeError("out of range source coordinates for image copy");if(n.width>e.width||n.height>e.height||i.x>e.width-n.width||i.y>e.height-n.height)throw new RangeError("out of range destination coordinates for image copy");const a=t.data,o=e.data;for(let l=0;l<n.height;l++){const u=((r.y+l)*t.width+r.x)*s,c=((i.y+l)*e.width+i.x)*s;for(let t=0;t<n.width*s;t++)o[c+t]=a[u+t];}return e}Gi("HeatmapBucket",xo,{omit:["layers"]});class _o{constructor(t,e){vo(this,t,1,e);}resize(t){bo(this,t,1);}clone(){return new _o({width:this.width,height:this.height},new Uint8Array(this.data))}static copy(t,e,r,i,n){wo(t,e,r,i,n,1);}}class ko{constructor(t,e){vo(this,t,4,e);}resize(t){bo(this,t,4);}replace(t,e){e?this.data.set(t):this.data=t instanceof Uint8ClampedArray?new Uint8Array(t.buffer):t;}clone(){return new ko({width:this.width,height:this.height},new Uint8Array(this.data))}static copy(t,e,r,i,n){wo(t,e,r,i,n,4);}}Gi("AlphaImage",_o),Gi("RGBAImage",ko);var Ao={paint:new rs({"heatmap-radius":new Jn(Ft.paint_heatmap["heatmap-radius"]),"heatmap-weight":new Jn(Ft.paint_heatmap["heatmap-weight"]),"heatmap-intensity":new Wn(Ft.paint_heatmap["heatmap-intensity"]),"heatmap-color":new es(Ft.paint_heatmap["heatmap-color"]),"heatmap-opacity":new Wn(Ft.paint_heatmap["heatmap-opacity"])})};function So(t){const e={},r=t.resolution||256,i=t.clips?t.clips.length:1,n=t.image||new ko({width:r,height:i}),s=(r,i,s)=>{e[t.evaluationKey]=s;const a=t.expression.evaluate(e);n.data[r+i+0]=Math.floor(255*a.r/a.a),n.data[r+i+1]=Math.floor(255*a.g/a.a),n.data[r+i+2]=Math.floor(255*a.b/a.a),n.data[r+i+3]=Math.floor(255*a.a);};if(t.clips)for(let e=0,n=0;e<i;++e,n+=4*r)for(let i=0,a=0;i<r;i++,a+=4){const o=i/(r-1),{start:l,end:u}=t.clips[e];s(n,a,l*(1-o)+u*o);}else for(let t=0,e=0;t<r;t++,e+=4)s(0,e,t/(r-1));return n}var Io={paint:new rs({"hillshade-illumination-direction":new Wn(Ft.paint_hillshade["hillshade-illumination-direction"]),"hillshade-illumination-anchor":new Wn(Ft.paint_hillshade["hillshade-illumination-anchor"]),"hillshade-exaggeration":new Wn(Ft.paint_hillshade["hillshade-exaggeration"]),"hillshade-shadow-color":new Wn(Ft.paint_hillshade["hillshade-shadow-color"]),"hillshade-highlight-color":new Wn(Ft.paint_hillshade["hillshade-highlight-color"]),"hillshade-accent-color":new Wn(Ft.paint_hillshade["hillshade-accent-color"])})};const To=os([{name:"a_pos",components:2,type:"Int16"}],4),{members:zo}=To;var Eo=Bo,Mo=Bo;function Bo(t,e,r){r=r||2;var i,n,s,a,o,l,u,c=e&&e.length,h=c?e[0]*r:t.length,p=Do(t,0,h,r,!0),d=[];if(!p||p.next===p.prev)return d;if(c&&(p=function(t,e,r,i){var n,s,a,o=[];for(n=0,s=e.length;n<s;n++)(a=Do(t,e[n]*i,n<s-1?e[n+1]*i:t.length,i,!1))===a.next&&(a.steiner=!0),o.push(No(a));for(o.sort(Uo),n=0;n<o.length;n++)Oo(o[n],r),r=Co(r,r.next);return r}(t,e,p,r)),t.length>80*r){i=s=t[0],n=a=t[1];for(var f=r;f<h;f+=r)(o=t[f])<i&&(i=o),(l=t[f+1])<n&&(n=l),o>s&&(s=o),l>a&&(a=l);u=0!==(u=Math.max(s-i,a-n))?1/u:0;}return Po(p,d,r,i,n,u),d}function Do(t,e,r,i,n){var s,a;if(n===rl(t,e,r,i)>0)for(s=e;s<r;s+=i)a=Qo(s,t[s],t[s+1],a);else for(s=r-i;s>=e;s-=i)a=Qo(s,t[s],t[s+1],a);return a&&Xo(a,a.next)&&(tl(a),a=a.next),a}function Co(t,e){if(!t)return t;e||(e=t);var r,i=t;do{if(r=!1,i.steiner||!Xo(i,i.next)&&0!==Zo(i.prev,i,i.next))i=i.next;else {if(tl(i),(i=e=i.prev)===i.next)break;r=!0;}}while(r||i!==e);return e}function Po(t,e,r,i,n,s,a){if(t){!a&&s&&function(t,e,r,i){var n=t;do{null===n.z&&(n.z=qo(n.x,n.y,e,r,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;}while(n!==t);n.prevZ.nextZ=null,n.prevZ=null,function(t){var e,r,i,n,s,a,o,l,u=1;do{for(r=t,t=null,s=null,a=0;r;){for(a++,i=r,o=0,e=0;e<u&&(o++,i=i.nextZ);e++);for(l=u;o>0||l>0&&i;)0!==o&&(0===l||!i||r.z<=i.z)?(n=r,r=r.nextZ,o--):(n=i,i=i.nextZ,l--),s?s.nextZ=n:t=n,n.prevZ=s,s=n;r=i;}s.nextZ=null,u*=2;}while(a>1)}(n);}(t,i,n,s);for(var o,l,u=t;t.prev!==t.next;)if(o=t.prev,l=t.next,s?Fo(t,i,n,s):Vo(t))e.push(o.i/r),e.push(t.i/r),e.push(l.i/r),tl(t),t=l.next,u=l.next;else if((t=l)===u){a?1===a?Po(t=Ro(Co(t),e,r),e,r,i,n,s,2):2===a&&Lo(t,e,r,i,n,s):Po(Co(t),e,r,i,n,s,1);break}}}function Vo(t){var e=t.prev,r=t,i=t.next;if(Zo(e,r,i)>=0)return !1;for(var n=t.next.next;n!==t.prev;){if(jo(e.x,e.y,r.x,r.y,i.x,i.y,n.x,n.y)&&Zo(n.prev,n,n.next)>=0)return !1;n=n.next;}return !0}function Fo(t,e,r,i){var n=t.prev,s=t,a=t.next;if(Zo(n,s,a)>=0)return !1;for(var o=n.x>s.x?n.x>a.x?n.x:a.x:s.x>a.x?s.x:a.x,l=n.y>s.y?n.y>a.y?n.y:a.y:s.y>a.y?s.y:a.y,u=qo(n.x<s.x?n.x<a.x?n.x:a.x:s.x<a.x?s.x:a.x,n.y<s.y?n.y<a.y?n.y:a.y:s.y<a.y?s.y:a.y,e,r,i),c=qo(o,l,e,r,i),h=t.prevZ,p=t.nextZ;h&&h.z>=u&&p&&p.z<=c;){if(h!==t.prev&&h!==t.next&&jo(n.x,n.y,s.x,s.y,a.x,a.y,h.x,h.y)&&Zo(h.prev,h,h.next)>=0)return !1;if(h=h.prevZ,p!==t.prev&&p!==t.next&&jo(n.x,n.y,s.x,s.y,a.x,a.y,p.x,p.y)&&Zo(p.prev,p,p.next)>=0)return !1;p=p.nextZ;}for(;h&&h.z>=u;){if(h!==t.prev&&h!==t.next&&jo(n.x,n.y,s.x,s.y,a.x,a.y,h.x,h.y)&&Zo(h.prev,h,h.next)>=0)return !1;h=h.prevZ;}for(;p&&p.z<=c;){if(p!==t.prev&&p!==t.next&&jo(n.x,n.y,s.x,s.y,a.x,a.y,p.x,p.y)&&Zo(p.prev,p,p.next)>=0)return !1;p=p.nextZ;}return !0}function Ro(t,e,r){var i=t;do{var n=i.prev,s=i.next.next;!Xo(n,s)&&Ko(n,i,i.next,s)&&Wo(n,s)&&Wo(s,n)&&(e.push(n.i/r),e.push(i.i/r),e.push(s.i/r),tl(i),tl(i.next),i=t=s),i=i.next;}while(i!==t);return Co(i)}function Lo(t,e,r,i,n,s){var a=t;do{for(var o=a.next.next;o!==a.prev;){if(a.i!==o.i&&Go(a,o)){var l=Jo(a,o);return a=Co(a,a.next),l=Co(l,l.next),Po(a,e,r,i,n,s),void Po(l,e,r,i,n,s)}o=o.next;}a=a.next;}while(a!==t)}function Uo(t,e){return t.x-e.x}function Oo(t,e){if(e=function(t,e){var r,i=e,n=t.x,s=t.y,a=-1/0;do{if(s<=i.y&&s>=i.next.y&&i.next.y!==i.y){var o=i.x+(s-i.y)*(i.next.x-i.x)/(i.next.y-i.y);if(o<=n&&o>a){if(a=o,o===n){if(s===i.y)return i;if(s===i.next.y)return i.next}r=i.x<i.next.x?i:i.next;}}i=i.next;}while(i!==e);if(!r)return null;if(n===a)return r;var l,u=r,c=r.x,h=r.y,p=1/0;i=r;do{n>=i.x&&i.x>=c&&n!==i.x&&jo(s<h?n:a,s,c,h,s<h?a:n,s,i.x,i.y)&&(l=Math.abs(s-i.y)/(n-i.x),Wo(i,t)&&(l<p||l===p&&(i.x>r.x||i.x===r.x&&$o(r,i)))&&(r=i,p=l)),i=i.next;}while(i!==u);return r}(t,e)){var r=Jo(e,t);Co(e,e.next),Co(r,r.next);}}function $o(t,e){return Zo(t.prev,t,e.prev)<0&&Zo(e.next,t,t.next)<0}function qo(t,e,r,i,n){return (t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=32767*(t-r)*n)|t<<8))|t<<4))|t<<2))|t<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=32767*(e-i)*n)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function No(t){var e=t,r=t;do{(e.x<r.x||e.x===r.x&&e.y<r.y)&&(r=e),e=e.next;}while(e!==t);return r}function jo(t,e,r,i,n,s,a,o){return (n-a)*(e-o)-(t-a)*(s-o)>=0&&(t-a)*(i-o)-(r-a)*(e-o)>=0&&(r-a)*(s-o)-(n-a)*(i-o)>=0}function Go(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!function(t,e){var r=t;do{if(r.i!==t.i&&r.next.i!==t.i&&r.i!==e.i&&r.next.i!==e.i&&Ko(r,r.next,t,e))return !0;r=r.next;}while(r!==t);return !1}(t,e)&&(Wo(t,e)&&Wo(e,t)&&function(t,e){var r=t,i=!1,n=(t.x+e.x)/2,s=(t.y+e.y)/2;do{r.y>s!=r.next.y>s&&r.next.y!==r.y&&n<(r.next.x-r.x)*(s-r.y)/(r.next.y-r.y)+r.x&&(i=!i),r=r.next;}while(r!==t);return i}(t,e)&&(Zo(t.prev,t,e.prev)||Zo(t,e.prev,e))||Xo(t,e)&&Zo(t.prev,t,t.next)>0&&Zo(e.prev,e,e.next)>0)}function Zo(t,e,r){return (e.y-t.y)*(r.x-e.x)-(e.x-t.x)*(r.y-e.y)}function Xo(t,e){return t.x===e.x&&t.y===e.y}function Ko(t,e,r,i){var n=Yo(Zo(t,e,r)),s=Yo(Zo(t,e,i)),a=Yo(Zo(r,i,t)),o=Yo(Zo(r,i,e));return n!==s&&a!==o||!(0!==n||!Ho(t,r,e))||!(0!==s||!Ho(t,i,e))||!(0!==a||!Ho(r,t,i))||!(0!==o||!Ho(r,e,i))}function Ho(t,e,r){return e.x<=Math.max(t.x,r.x)&&e.x>=Math.min(t.x,r.x)&&e.y<=Math.max(t.y,r.y)&&e.y>=Math.min(t.y,r.y)}function Yo(t){return t>0?1:t<0?-1:0}function Wo(t,e){return Zo(t.prev,t,t.next)<0?Zo(t,e,t.next)>=0&&Zo(t,t.prev,e)>=0:Zo(t,e,t.prev)<0||Zo(t,t.next,e)<0}function Jo(t,e){var r=new el(t.i,t.x,t.y),i=new el(e.i,e.x,e.y),n=t.next,s=e.prev;return t.next=e,e.prev=t,r.next=n,n.prev=r,i.next=r,r.prev=i,s.next=i,i.prev=s,i}function Qo(t,e,r,i){var n=new el(t,e,r);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function tl(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ);}function el(t,e,r){this.i=t,this.x=e,this.y=r,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1;}function rl(t,e,r,i){for(var n=0,s=e,a=r-i;s<r;s+=i)n+=(t[a]-t[s])*(t[s+1]+t[a+1]),a=s;return n}function il(t,e,r,i,n){!function t(e,r,i,n,s){for(;n>i;){if(n-i>600){var a=n-i+1,o=r-i+1,l=Math.log(a),u=.5*Math.exp(2*l/3),c=.5*Math.sqrt(l*u*(a-u)/a)*(o-a/2<0?-1:1);t(e,r,Math.max(i,Math.floor(r-o*u/a+c)),Math.min(n,Math.floor(r+(a-o)*u/a+c)),s);}var h=e[r],p=i,d=n;for(nl(e,i,r),s(e[n],h)>0&&nl(e,i,n);p<d;){for(nl(e,p,d),p++,d--;s(e[p],h)<0;)p++;for(;s(e[d],h)>0;)d--;}0===s(e[i],h)?nl(e,i,d):nl(e,++d,n),d<=r&&(i=d+1),r<=d&&(n=d-1);}}(t,e,r||0,i||t.length-1,n||sl);}function nl(t,e,r){var i=t[e];t[e]=t[r],t[r]=i;}function sl(t,e){return t<e?-1:t>e?1:0}function al(t,e){const r=t.length;if(r<=1)return [t];const i=[];let n,s;for(let e=0;e<r;e++){const r=B(t[e]);0!==r&&(t[e].area=Math.abs(r),void 0===s&&(s=r<0),s===r<0?(n&&i.push(n),n=[t[e]]):n.push(t[e]));}if(n&&i.push(n),e>1)for(let t=0;t<i.length;t++)i[t].length<=e||(il(i[t],e,1,i[t].length-1,ol),i[t]=i[t].slice(0,e));return i}function ol(t,e){return e.area-t.area}function ll(t,e,r){const i=r.patternDependencies;let n=!1;for(const r of e){const e=r.paint.get(`${t}-pattern`);e.isConstant()||(n=!0);const s=e.constantOr(null);s&&(n=!0,i[s.to]=!0,i[s.from]=!0);}return n}function ul(t,e,r,i,n){const s=n.patternDependencies;for(const a of e){const e=a.paint.get(`${t}-pattern`).value;if("constant"!==e.kind){let t=e.evaluate({zoom:i-1},r,{},n.availableImages),o=e.evaluate({zoom:i},r,{},n.availableImages),l=e.evaluate({zoom:i+1},r,{},n.availableImages);t=t&&t.name?t.name:t,o=o&&o.name?o.name:o,l=l&&l.name?l.name:l,s[t]=!0,s[o]=!0,s[l]=!0,r.patterns[a.id]={min:t,mid:o,max:l};}}return r}Bo.deviation=function(t,e,r,i){var n=e&&e.length,s=Math.abs(rl(t,0,n?e[0]*r:t.length,r));if(n)for(var a=0,o=e.length;a<o;a++)s-=Math.abs(rl(t,e[a]*r,a<o-1?e[a+1]*r:t.length,r));var l=0;for(a=0;a<i.length;a+=3){var u=i[a]*r,c=i[a+1]*r,h=i[a+2]*r;l+=Math.abs((t[u]-t[h])*(t[c+1]-t[u+1])-(t[u]-t[c])*(t[h+1]-t[u+1]));}return 0===s&&0===l?0:Math.abs((l-s)/s)},Bo.flatten=function(t){for(var e=t[0][0].length,r={vertices:[],holes:[],dimensions:e},i=0,n=0;n<t.length;n++){for(var s=0;s<t[n].length;s++)for(var a=0;a<e;a++)r.vertices.push(t[n][s][a]);n>0&&r.holes.push(i+=t[n-1].length);}return r},Eo.default=Mo;class cl{constructor(t){this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map(t=>t.id),this.index=t.index,this.hasPattern=!1,this.patternFeatures=[],this.layoutVertexArray=new us,this.indexArray=new ws,this.indexArray2=new Ts,this.programConfigurations=new ua(t.layers,t.zoom),this.segments=new ya,this.segments2=new ya,this.stateDependentLayerIds=this.layers.filter(t=>t.isStateDependent()).map(t=>t.id);}populate(t,e,r){this.hasPattern=ll("fill",this.layers,e);const i=this.layers[0].layout.get("fill-sort-key"),n=[];for(const{feature:s,id:a,index:o,sourceLayerIndex:l}of t){const t=this.layers[0]._featureFilter.needGeometry,u=va(s,t);if(!this.layers[0]._featureFilter.filter(new qn(this.zoom),u,r))continue;const c=i?i.evaluate(u,{},r,e.availableImages):void 0,h={id:a,properties:s.properties,type:s.type,sourceLayerIndex:l,index:o,geometry:t?u.geometry:xa(s),patterns:{},sortKey:c};n.push(h);}i&&n.sort((t,e)=>t.sortKey-e.sortKey);for(const i of n){const{geometry:n,index:s,sourceLayerIndex:a}=i;if(this.hasPattern){const t=ul("fill",this.layers,i,this.zoom,e);this.patternFeatures.push(t);}else this.addFeature(i,n,s,r,{});e.featureIndex.insert(t[s].feature,n,s,a,this.index);}}update(t,e,r){this.stateDependentLayers.length&&this.programConfigurations.updatePaintArrays(t,e,this.stateDependentLayers,r);}addFeatures(t,e,r){for(const t of this.patternFeatures)this.addFeature(t,t.geometry,t.index,e,r);}isEmpty(){return 0===this.layoutVertexArray.length}uploadPending(){return !this.uploaded||this.programConfigurations.needsUpload}upload(t){this.uploaded||(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,zo),this.indexBuffer=t.createIndexBuffer(this.indexArray),this.indexBuffer2=t.createIndexBuffer(this.indexArray2)),this.programConfigurations.upload(t),this.uploaded=!0;}destroy(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.indexBuffer2.destroy(),this.programConfigurations.destroy(),this.segments.destroy(),this.segments2.destroy());}addFeature(t,e,r,i,n){for(const t of al(e,500)){let e=0;for(const r of t)e+=r.length;const r=this.segments.prepareSegment(e,this.layoutVertexArray,this.indexArray),i=r.vertexLength,n=[],s=[];for(const e of t){if(0===e.length)continue;e!==t[0]&&s.push(n.length/2);const r=this.segments2.prepareSegment(e.length,this.layoutVertexArray,this.indexArray2),i=r.vertexLength;this.layoutVertexArray.emplaceBack(e[0].x,e[0].y),this.indexArray2.emplaceBack(i+e.length-1,i),n.push(e[0].x),n.push(e[0].y);for(let t=1;t<e.length;t++)this.layoutVertexArray.emplaceBack(e[t].x,e[t].y),this.indexArray2.emplaceBack(i+t-1,i+t),n.push(e[t].x),n.push(e[t].y);r.vertexLength+=e.length,r.primitiveLength+=e.length;}const a=Eo(n,s);for(let t=0;t<a.length;t+=3)this.indexArray.emplaceBack(i+a[t],i+a[t+1],i+a[t+2]);r.vertexLength+=e,r.primitiveLength+=a.length/3;}this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,t,r,n,i);}}Gi("FillBucket",cl,{omit:["layers","patternFeatures"]});const hl=new rs({"fill-sort-key":new Jn(Ft.layout_fill["fill-sort-key"])});var pl={paint:new rs({"fill-antialias":new Wn(Ft.paint_fill["fill-antialias"]),"fill-opacity":new Jn(Ft.paint_fill["fill-opacity"]),"fill-color":new Jn(Ft.paint_fill["fill-color"]),"fill-outline-color":new Jn(Ft.paint_fill["fill-outline-color"]),"fill-translate":new Wn(Ft.paint_fill["fill-translate"]),"fill-translate-anchor":new Wn(Ft.paint_fill["fill-translate-anchor"]),"fill-pattern":new Qn(Ft.paint_fill["fill-pattern"])}),layout:hl};const dl=os([{name:"a_pos_normal_ed",components:4,type:"Int16"}]),fl=os([{name:"a_centroid_pos",components:2,type:"Uint16"}]),{members:yl}=dl;var ml=gl;function gl(t,e,r,i,n){this.properties={},this.extent=r,this.type=0,this._pbf=t,this._geometry=-1,this._keys=i,this._values=n,t.readFields(xl,this,e);}function xl(t,e,r){1==t?e.id=r.readVarint():2==t?function(t,e){for(var r=t.readVarint()+t.pos;t.pos<r;){var i=e._keys[t.readVarint()],n=e._values[t.readVarint()];e.properties[i]=n;}}(r,e):3==t?e.type=r.readVarint():4==t&&(e._geometry=r.pos);}function vl(t){for(var e,r,i=0,n=0,s=t.length,a=s-1;n<s;a=n++)i+=((r=t[a]).x-(e=t[n]).x)*(e.y+r.y);return i}gl.types=["Unknown","Point","LineString","Polygon"],gl.prototype.loadGeometry=function(){var t=this._pbf;t.pos=this._geometry;for(var e,r=t.readVarint()+t.pos,n=1,s=0,a=0,o=0,l=[];t.pos<r;){if(s<=0){var u=t.readVarint();n=7&u,s=u>>3;}if(s--,1===n||2===n)a+=t.readSVarint(),o+=t.readSVarint(),1===n&&(e&&l.push(e),e=[]),e.push(new i(a,o));else {if(7!==n)throw new Error("unknown command "+n);e&&e.push(e[0].clone());}}return e&&l.push(e),l},gl.prototype.bbox=function(){var t=this._pbf;t.pos=this._geometry;for(var e=t.readVarint()+t.pos,r=1,i=0,n=0,s=0,a=1/0,o=-1/0,l=1/0,u=-1/0;t.pos<e;){if(i<=0){var c=t.readVarint();r=7&c,i=c>>3;}if(i--,1===r||2===r)(n+=t.readSVarint())<a&&(a=n),n>o&&(o=n),(s+=t.readSVarint())<l&&(l=s),s>u&&(u=s);else if(7!==r)throw new Error("unknown command "+r)}return [a,l,o,u]},gl.prototype.toGeoJSON=function(t,e,r){var i,n,s=this.extent*Math.pow(2,r),a=this.extent*t,o=this.extent*e,l=this.loadGeometry(),u=gl.types[this.type];function c(t){for(var e=0;e<t.length;e++){var r=t[e];t[e]=[360*(r.x+a)/s-180,360/Math.PI*Math.atan(Math.exp((180-360*(r.y+o)/s)*Math.PI/180))-90];}}switch(this.type){case 1:var h=[];for(i=0;i<l.length;i++)h[i]=l[i][0];c(l=h);break;case 2:for(i=0;i<l.length;i++)c(l[i]);break;case 3:for(l=function(t){var e=t.length;if(e<=1)return [t];for(var r,i,n=[],s=0;s<e;s++){var a=vl(t[s]);0!==a&&(void 0===i&&(i=a<0),i===a<0?(r&&n.push(r),r=[t[s]]):r.push(t[s]));}return r&&n.push(r),n}(l),i=0;i<l.length;i++)for(n=0;n<l[i].length;n++)c(l[i][n]);}1===l.length?l=l[0]:u="Multi"+u;var p={type:"Feature",geometry:{type:u,coordinates:l},properties:this.properties};return "id"in this&&(p.id=this.id),p};var bl=wl;function wl(t,e){this.version=1,this.name=null,this.extent=4096,this.length=0,this._pbf=t,this._keys=[],this._values=[],this._features=[],t.readFields(_l,this,e),this.length=this._features.length;}function _l(t,e,r){15===t?e.version=r.readVarint():1===t?e.name=r.readString():5===t?e.extent=r.readVarint():2===t?e._features.push(r.pos):3===t?e._keys.push(r.readString()):4===t&&e._values.push(function(t){for(var e=null,r=t.readVarint()+t.pos;t.pos<r;){var i=t.readVarint()>>3;e=1===i?t.readString():2===i?t.readFloat():3===i?t.readDouble():4===i?t.readVarint64():5===i?t.readVarint():6===i?t.readSVarint():7===i?t.readBoolean():null;}return e}(r));}function kl(t,e,r){if(3===t){var i=new bl(r,r.readVarint()+r.pos);i.length&&(e[i.name]=i);}}wl.prototype.feature=function(t){if(t<0||t>=this._features.length)throw new Error("feature index out of bounds");this._pbf.pos=this._features[t];var e=this._pbf.readVarint()+this._pbf.pos;return new ml(this._pbf,e,this.extent,this._keys,this._values)};var Al={VectorTile:function(t,e){this.layers=t.readFields(kl,{},e);},VectorTileFeature:ml,VectorTileLayer:bl};const Sl=Al.VectorTileFeature.types,Il=Math.pow(2,13);function Tl(t,e,r,i,n,s,a,o){t.emplaceBack((e<<1)+a,(r<<1)+s,(Math.floor(i*Il)<<1)+n,Math.round(o));}class zl{constructor(){this.acc=new i(0,0),this.polyCount=[];}startRing(t){this.currentPolyCount={edges:0,top:0},this.polyCount.push(this.currentPolyCount),this.min||(this.min=new i(t.x,t.y),this.max=new i(t.x,t.y));}append(t,e){this.currentPolyCount.edges++,this.acc._add(t);let r=!!this.borders;const i=this.min,n=this.max;t.x<i.x?(i.x=t.x,r=!0):t.x>n.x&&(n.x=t.x,r=!0),t.y<i.y?(i.y=t.y,r=!0):t.y>n.y&&(n.y=t.y,r=!0),((0===t.x||8192===t.x)&&t.x===e.x)!=((0===t.y||8192===t.y)&&t.y===e.y)&&this.processBorderOverlap(t,e),r&&this.checkBorderIntersection(t,e);}checkBorderIntersection(t,e){e.x<0!=t.x<0&&this.addBorderIntersection(0,Je(e.y,t.y,(0-e.x)/(t.x-e.x))),e.x>8192!=t.x>8192&&this.addBorderIntersection(1,Je(e.y,t.y,(8192-e.x)/(t.x-e.x))),e.y<0!=t.y<0&&this.addBorderIntersection(2,Je(e.x,t.x,(0-e.y)/(t.y-e.y))),e.y>8192!=t.y>8192&&this.addBorderIntersection(3,Je(e.x,t.x,(8192-e.y)/(t.y-e.y)));}addBorderIntersection(t,e){this.borders||(this.borders=[[Number.MAX_VALUE,-Number.MAX_VALUE],[Number.MAX_VALUE,-Number.MAX_VALUE],[Number.MAX_VALUE,-Number.MAX_VALUE],[Number.MAX_VALUE,-Number.MAX_VALUE]]);const r=this.borders[t];e<r[0]&&(r[0]=e),e>r[1]&&(r[1]=e);}processBorderOverlap(t,e){if(t.x===e.x){if(t.y===e.y)return;const r=0===t.x?0:1;this.addBorderIntersection(r,e.y),this.addBorderIntersection(r,t.y);}else {const r=0===t.y?2:3;this.addBorderIntersection(r,e.x),this.addBorderIntersection(r,t.x);}}centroid(){const t=this.polyCount.reduce((t,e)=>t+e.edges,0);return 0!==t?this.acc.div(t)._round():new i(0,0)}span(){return new i(this.max.x-this.min.x,this.max.y-this.min.y)}intersectsCount(){return this.borders.reduce((t,e)=>t+ +(e[0]!==Number.MAX_VALUE),0)}}class El{constructor(t){this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map(t=>t.id),this.index=t.index,this.hasPattern=!1,this.layoutVertexArray=new cs,this.centroidVertexArray=new $s,this.indexArray=new ws,this.programConfigurations=new ua(t.layers,t.zoom),this.segments=new ya,this.stateDependentLayerIds=this.layers.filter(t=>t.isStateDependent()).map(t=>t.id),this.enableTerrain=t.enableTerrain;}populate(t,e,r){this.features=[],this.hasPattern=ll("fill-extrusion",this.layers,e),this.featuresOnBorder=[],this.borders=[[],[],[],[]],this.borderDone=[!1,!1,!1,!1],this.tileToMeter=function(t){const e=Math.exp(Math.PI*(1-t.y/(1<<t.z)*2));return 80150034*e/(e*e+1)/8192/(1<<t.z)}(r);for(const{feature:i,id:n,index:s,sourceLayerIndex:a}of t){const t=this.layers[0]._featureFilter.needGeometry,o=va(i,t);if(!this.layers[0]._featureFilter.filter(new qn(this.zoom),o,r))continue;const l={id:n,sourceLayerIndex:a,index:s,geometry:t?o.geometry:xa(i),properties:i.properties,type:i.type,patterns:{}},u=this.layoutVertexArray.length;this.hasPattern?this.features.push(ul("fill-extrusion",this.layers,l,this.zoom,e)):this.addFeature(l,l.geometry,s,r,{}),e.featureIndex.insert(i,l.geometry,s,a,this.index,u);}this.sortBorders();}addFeatures(t,e,r){for(const t of this.features){const{geometry:i}=t;this.addFeature(t,i,t.index,e,r);}this.sortBorders();}update(t,e,r){this.stateDependentLayers.length&&this.programConfigurations.updatePaintArrays(t,e,this.stateDependentLayers,r);}isEmpty(){return 0===this.layoutVertexArray.length}uploadPending(){return !this.uploaded||this.programConfigurations.needsUpload}upload(t){this.uploaded||(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,yl),this.indexBuffer=t.createIndexBuffer(this.indexArray)),this.programConfigurations.upload(t),this.uploaded=!0;}uploadCentroid(t){0!==this.centroidVertexArray.length&&(this.centroidVertexBuffer?this.needsCentroidUpdate&&this.centroidVertexBuffer.updateData(this.centroidVertexArray):this.centroidVertexBuffer=t.createVertexBuffer(this.centroidVertexArray,fl.members,!0),this.needsCentroidUpdate=!1);}destroy(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.centroidVertexBuffer&&this.centroidVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy());}addFeature(t,e,r,i,n){const s=this.enableTerrain&&t.properties&&t.properties.hasOwnProperty("type")&&t.properties.hasOwnProperty("height")&&"Polygon"===Sl[t.type]?new zl:null;for(const r of al(e,500)){let e=0,i=this.segments.prepareSegment(4,this.layoutVertexArray,this.indexArray);if(0===r.length||(a=r[0]).every(t=>t.x<=0)||a.every(t=>t.x>=8192)||a.every(t=>t.y<=0)||a.every(t=>t.y>=8192))continue;for(let t=0;t<r.length;t++){const n=r[t];if(0===n.length)continue;e+=n.length;let a=0;s&&s.startRing(n[0]);for(let t=0;t<n.length;t++){const e=n[t];if(t>=1){const r=n[t-1];if(!Ml(e,r)){s&&s.append(e,r),i.vertexLength+4>ya.MAX_VERTEX_ARRAY_LENGTH&&(i=this.segments.prepareSegment(4,this.layoutVertexArray,this.indexArray));const t=e.sub(r)._perp(),n=t.x/(Math.abs(t.x)+Math.abs(t.y)),o=t.y>0?1:0,l=r.dist(e);a+l>32768&&(a=0),Tl(this.layoutVertexArray,e.x,e.y,n,o,0,0,a),Tl(this.layoutVertexArray,e.x,e.y,n,o,0,1,a),a+=l,Tl(this.layoutVertexArray,r.x,r.y,n,o,0,0,a),Tl(this.layoutVertexArray,r.x,r.y,n,o,0,1,a);const u=i.vertexLength;this.indexArray.emplaceBack(u,u+2,u+1),this.indexArray.emplaceBack(u+1,u+2,u+3),i.vertexLength+=4,i.primitiveLength+=2;}}}}if(i.vertexLength+e>ya.MAX_VERTEX_ARRAY_LENGTH&&(i=this.segments.prepareSegment(e,this.layoutVertexArray,this.indexArray)),"Polygon"!==Sl[t.type])continue;const n=[],o=[],l=i.vertexLength;for(let t=0;t<r.length;t++){const e=r[t];if(0!==e.length){e!==r[0]&&o.push(n.length/2);for(let t=0;t<e.length;t++){const r=e[t];Tl(this.layoutVertexArray,r.x,r.y,0,0,1,1,0),n.push(r.x),n.push(r.y),s&&s.currentPolyCount.top++;}}}const u=Eo(n,o);for(let t=0;t<u.length;t+=3)this.indexArray.emplaceBack(l+u[t],l+u[t+2],l+u[t+1]);i.primitiveLength+=u.length/3,i.vertexLength+=e;}var a;if(s&&s.polyCount.length>0){if(s.borders){s.vertexArrayOffset=this.centroidVertexArray.length;const t=s.borders,e=this.featuresOnBorder.push(s)-1;for(let r=0;r<4;r++)t[r][0]!==Number.MAX_VALUE&&this.borders[r].push(e);}this.encodeCentroid(s.borders?void 0:s.centroid(),s);}this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,t,r,n,i);}sortBorders(){for(let t=0;t<4;t++)this.borders[t].sort((e,r)=>this.featuresOnBorder[e].borders[t][0]-this.featuresOnBorder[r].borders[t][0]);}encodeCentroid(t,e,r=!0){let i,n;if(t)if(0!==t.y){const r=e.span()._mult(this.tileToMeter);i=(Math.max(t.x,1)<<3)+Math.min(7,Math.round(r.x/10)),n=(Math.max(t.y,1)<<3)+Math.min(7,Math.round(r.y/10));}else i=Math.ceil(7.3*t.x),n=0;else i=0,n=+r;let s=r?this.centroidVertexArray.length:e.vertexArrayOffset;for(const t of e.polyCount){r&&this.centroidVertexArray.resize(this.centroidVertexArray.length+4*t.edges+t.top);for(let e=0;e<2*t.edges;e++)this.centroidVertexArray.emplace(s++,0,n),this.centroidVertexArray.emplace(s++,i,n);for(let e=0;e<t.top;e++)this.centroidVertexArray.emplace(s++,i,n);}}}function Ml(t,e){return t.x===e.x&&(t.x<0||t.x>8192)||t.y===e.y&&(t.y<0||t.y>8192)}Gi("FillExtrusionBucket",El,{omit:["layers","features"]}),Gi("PartMetadata",zl);var Bl={paint:new rs({"fill-extrusion-opacity":new Wn(Ft["paint_fill-extrusion"]["fill-extrusion-opacity"]),"fill-extrusion-color":new Jn(Ft["paint_fill-extrusion"]["fill-extrusion-color"]),"fill-extrusion-translate":new Wn(Ft["paint_fill-extrusion"]["fill-extrusion-translate"]),"fill-extrusion-translate-anchor":new Wn(Ft["paint_fill-extrusion"]["fill-extrusion-translate-anchor"]),"fill-extrusion-pattern":new Qn(Ft["paint_fill-extrusion"]["fill-extrusion-pattern"]),"fill-extrusion-height":new Jn(Ft["paint_fill-extrusion"]["fill-extrusion-height"]),"fill-extrusion-base":new Jn(Ft["paint_fill-extrusion"]["fill-extrusion-base"]),"fill-extrusion-vertical-gradient":new Wn(Ft["paint_fill-extrusion"]["fill-extrusion-vertical-gradient"])})};function Dl(t,e){return t.x*e.x+t.y*e.y}function Cl(t,e){if(1===t.length){let r=0;const i=e[r++];let n;for(;!n||i.equals(n);)if(n=e[r++],!n)return 1/0;for(;r<e.length;r++){const s=e[r],a=t[0],o=n.sub(i),l=s.sub(i),u=a.sub(i),c=Dl(o,o),h=Dl(o,l),p=Dl(l,l),d=Dl(u,o),f=Dl(u,l),y=c*p-h*h,m=(p*d-h*f)/y,g=(c*f-h*d)/y,x=i.z*(1-m-g)+n.z*m+s.z*g;if(isFinite(x))return x}return 1/0}{let t=1/0;for(const r of e)t=Math.min(t,r.z);return t}}function Pl(t){const e=new i(t[0],t[1]);return e.z=t[2],e}function Vl(t,e,r,i,n,s,a,o){const l=a*n.getElevationAt(t,e,!0,!0),u=0!==s[0],c=u?0===s[1]?a*(s[0]/7.3):a*function(t,e,r){const i=Math.floor(e[0]/8),n=Math.floor(e[1]/8),s=10*(e[0]-8*i),a=10*(e[1]-8*n),o=t.getElevationAt(i,n,!0,!0),l=t.getMeterToDEM(r),u=Math.floor(.5*(s*l-1)),c=Math.floor(.5*(a*l-1)),h=t.tileCoordToPixel(i,n),p=2*u+1,d=2*c+1,f=function(t,e,r,i,n){return [t.getElevationAtPixel(e,r,!0),t.getElevationAtPixel(e+n,r,!0),t.getElevationAtPixel(e,r+n,!0),t.getElevationAtPixel(e+i,r+n,!0)]}(t,h.x-u,h.y-c,p,d),y=Math.abs(f[0]-f[1]),m=Math.abs(f[2]-f[3]),g=Math.abs(f[0]-f[2])+Math.abs(f[1]-f[3]),x=Math.min(.25,.5*l*(y+m)/p),v=Math.min(.25,.5*l*g/d);return o+Math.max(x*s,v*a)}(n,s,o):l;return {base:l+(0===r)?-1:r,top:u?Math.max(c+i,l+r+2):l+i}}const Fl=os([{name:"a_pos_normal",components:2,type:"Int16"},{name:"a_data",components:4,type:"Uint8"},{name:"a_linesofar",components:1,type:"Float32"}],4),{members:Rl}=Fl,Ll=os([{name:"a_uv_x",components:1,type:"Float32"},{name:"a_split_index",components:1,type:"Float32"}]),{members:Ul}=Ll,Ol=Al.VectorTileFeature.types,$l=Math.cos(Math.PI/180*37.5);class ql{constructor(t){this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map(t=>t.id),this.index=t.index,this.hasPattern=!1,this.patternFeatures=[],this.lineClipsArray=[],this.gradients={},this.layers.forEach(t=>{this.gradients[t.id]={};}),this.layoutVertexArray=new hs,this.layoutVertexArray2=new ps,this.indexArray=new ws,this.programConfigurations=new ua(t.layers,t.zoom),this.segments=new ya,this.maxLineLength=0,this.stateDependentLayerIds=this.layers.filter(t=>t.isStateDependent()).map(t=>t.id);}populate(t,e,r){this.hasPattern=ll("line",this.layers,e);const i=this.layers[0].layout.get("line-sort-key"),n=[];for(const{feature:e,id:s,index:a,sourceLayerIndex:o}of t){const t=this.layers[0]._featureFilter.needGeometry,l=va(e,t);if(!this.layers[0]._featureFilter.filter(new qn(this.zoom),l,r))continue;const u=i?i.evaluate(l,{},r):void 0,c={id:s,properties:e.properties,type:e.type,sourceLayerIndex:o,index:a,geometry:t?l.geometry:xa(e),patterns:{},sortKey:u};n.push(c);}i&&n.sort((t,e)=>t.sortKey-e.sortKey);for(const i of n){const{geometry:n,index:s,sourceLayerIndex:a}=i;if(this.hasPattern){const t=ul("line",this.layers,i,this.zoom,e);this.patternFeatures.push(t);}else this.addFeature(i,n,s,r,{});e.featureIndex.insert(t[s].feature,n,s,a,this.index);}}update(t,e,r){this.stateDependentLayers.length&&this.programConfigurations.updatePaintArrays(t,e,this.stateDependentLayers,r);}addFeatures(t,e,r){for(const t of this.patternFeatures)this.addFeature(t,t.geometry,t.index,e,r);}isEmpty(){return 0===this.layoutVertexArray.length}uploadPending(){return !this.uploaded||this.programConfigurations.needsUpload}upload(t){this.uploaded||(0!==this.layoutVertexArray2.length&&(this.layoutVertexBuffer2=t.createVertexBuffer(this.layoutVertexArray2,Ul)),this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,Rl),this.indexBuffer=t.createIndexBuffer(this.indexArray)),this.programConfigurations.upload(t),this.uploaded=!0;}destroy(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy());}lineFeatureClips(t){if(t.properties&&t.properties.hasOwnProperty("mapbox_clip_start")&&t.properties.hasOwnProperty("mapbox_clip_end"))return {start:+t.properties.mapbox_clip_start,end:+t.properties.mapbox_clip_end}}addFeature(t,e,r,i,n){const s=this.layers[0].layout,a=s.get("line-join").evaluate(t,{}),o=s.get("line-cap"),l=s.get("line-miter-limit"),u=s.get("line-round-limit");this.lineClips=this.lineFeatureClips(t);for(const r of e)this.addLine(r,t,a,o,l,u);this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,t,r,n,i);}addLine(t,e,r,i,n,s){if(this.distance=0,this.scaledDistance=0,this.totalDistance=0,this.lineSoFar=0,this.lineClips){this.lineClipsArray.push(this.lineClips);for(let e=0;e<t.length-1;e++)this.totalDistance+=t[e].dist(t[e+1]);this.updateScaledDistance(),this.maxLineLength=Math.max(this.maxLineLength,this.totalDistance);}const a="Polygon"===Ol[e.type];let o=t.length;for(;o>=2&&t[o-1].equals(t[o-2]);)o--;let l=0;for(;l<o-1&&t[l].equals(t[l+1]);)l++;if(o<(a?3:2))return;"bevel"===r&&(n=1.05);const u=this.overscaling<=16?122880/(512*this.overscaling):0,c=this.segments.prepareSegment(10*o,this.layoutVertexArray,this.indexArray);let h,p=void 0,d=void 0,f=void 0,y=void 0;this.e1=this.e2=-1,a&&(h=t[o-2],y=t[l].sub(h)._unit()._perp());for(let e=l;e<o;e++){if(d=e===o-1?a?t[l+1]:void 0:t[e+1],d&&t[e].equals(d))continue;y&&(f=y),h&&(p=h),h=t[e],y=d?d.sub(h)._unit()._perp():f,f=f||y;let m=f.add(y);0===m.x&&0===m.y||m._unit();const g=f.x*y.x+f.y*y.y,x=m.x*y.x+m.y*y.y,v=0!==x?1/x:1/0,b=2*Math.sqrt(2-2*x),w=x<$l&&p&&d,_=f.x*y.y-f.y*y.x>0;if(w&&e>l){const t=h.dist(p);if(t>2*u){const e=h.sub(h.sub(p)._mult(u/t)._round());this.updateDistance(p,e),this.addCurrentVertex(e,f,0,0,c),p=e;}}const k=p&&d;let A=k?r:a?"butt":i;if(k&&"round"===A&&(v<s?A="miter":v<=2&&(A="fakeround")),"miter"===A&&v>n&&(A="bevel"),"bevel"===A&&(v>2&&(A="flipbevel"),v<n&&(A="miter")),p&&this.updateDistance(p,h),"miter"===A)m._mult(v),this.addCurrentVertex(h,m,0,0,c);else if("flipbevel"===A){if(v>100)m=y.mult(-1);else {const t=v*f.add(y).mag()/f.sub(y).mag();m._perp()._mult(t*(_?-1:1));}this.addCurrentVertex(h,m,0,0,c),this.addCurrentVertex(h,m.mult(-1),0,0,c);}else if("bevel"===A||"fakeround"===A){const t=-Math.sqrt(v*v-1),e=_?t:0,r=_?0:t;if(p&&this.addCurrentVertex(h,f,e,r,c),"fakeround"===A){const t=Math.round(180*b/Math.PI/20);for(let e=1;e<t;e++){let r=e/t;if(.5!==r){const t=r-.5;r+=r*t*(r-1)*((1.0904+g*(g*(3.55645-1.43519*g)-3.2452))*t*t+(.848013+g*(.215638*g-1.06021)));}const i=y.sub(f)._mult(r)._add(f)._unit()._mult(_?-1:1);this.addHalfVertex(h,i.x,i.y,!1,_,0,c);}}d&&this.addCurrentVertex(h,y,-e,-r,c);}else if("butt"===A)this.addCurrentVertex(h,m,0,0,c);else if("square"===A){const t=p?1:-1;this.addCurrentVertex(h,m,t,t,c);}else "round"===A&&(p&&(this.addCurrentVertex(h,f,0,0,c),this.addCurrentVertex(h,f,1,1,c,!0)),d&&(this.addCurrentVertex(h,y,-1,-1,c,!0),this.addCurrentVertex(h,y,0,0,c)));if(w&&e<o-1){const t=h.dist(d);if(t>2*u){const e=h.add(d.sub(h)._mult(u/t)._round());this.updateDistance(h,e),this.addCurrentVertex(e,y,0,0,c),h=e;}}}}addCurrentVertex(t,e,r,i,n,s=!1){const a=e.y*i-e.x,o=-e.y-e.x*i;this.addHalfVertex(t,e.x+e.y*r,e.y-e.x*r,s,!1,r,n),this.addHalfVertex(t,a,o,s,!0,-i,n);}addHalfVertex({x:t,y:e},r,i,n,s,a,o){this.layoutVertexArray.emplaceBack((t<<1)+(n?1:0),(e<<1)+(s?1:0),Math.round(63*r)+128,Math.round(63*i)+128,1+(0===a?0:a<0?-1:1),0,this.lineSoFar),this.lineClips&&this.layoutVertexArray2.emplaceBack(this.scaledDistance,this.lineClipsArray.length);const l=o.vertexLength++;this.e1>=0&&this.e2>=0&&(this.indexArray.emplaceBack(this.e1,this.e2,l),o.primitiveLength++),s?this.e2=l:this.e1=l;}updateScaledDistance(){if(this.lineClips){const t=this.totalDistance/(this.lineClips.end-this.lineClips.start);this.scaledDistance=this.distance/this.totalDistance,this.lineSoFar=t*this.lineClips.start+this.distance;}else this.lineSoFar=this.distance;}updateDistance(t,e){this.distance+=t.dist(e),this.updateScaledDistance();}}Gi("LineBucket",ql,{omit:["layers","patternFeatures"]});const Nl=new rs({"line-cap":new Wn(Ft.layout_line["line-cap"]),"line-join":new Jn(Ft.layout_line["line-join"]),"line-miter-limit":new Wn(Ft.layout_line["line-miter-limit"]),"line-round-limit":new Wn(Ft.layout_line["line-round-limit"]),"line-sort-key":new Jn(Ft.layout_line["line-sort-key"])});var jl={paint:new rs({"line-opacity":new Jn(Ft.paint_line["line-opacity"]),"line-color":new Jn(Ft.paint_line["line-color"]),"line-translate":new Wn(Ft.paint_line["line-translate"]),"line-translate-anchor":new Wn(Ft.paint_line["line-translate-anchor"]),"line-width":new Jn(Ft.paint_line["line-width"]),"line-gap-width":new Jn(Ft.paint_line["line-gap-width"]),"line-offset":new Jn(Ft.paint_line["line-offset"]),"line-blur":new Jn(Ft.paint_line["line-blur"]),"line-dasharray":new ts(Ft.paint_line["line-dasharray"]),"line-pattern":new Qn(Ft.paint_line["line-pattern"]),"line-gradient":new es(Ft.paint_line["line-gradient"])}),layout:Nl};const Gl=new class extends Jn{possiblyEvaluate(t,e){return e=new qn(Math.floor(e.zoom),{now:e.now,fadeDuration:e.fadeDuration,zoomHistory:e.zoomHistory,transition:e.transition}),super.possiblyEvaluate(t,e)}evaluate(t,e,r,i){return e=x({},e,{zoom:Math.floor(e.zoom)}),super.evaluate(t,e,r,i)}}(jl.paint.properties["line-width"].specification);function Zl(t,e){return e>0?e+2*t:t}Gl.useIntegerZoom=!0;const Xl=os([{name:"a_pos_offset",components:4,type:"Int16"},{name:"a_data",components:4,type:"Uint16"},{name:"a_pixeloffset",components:4,type:"Int16"}],4),Kl=os([{name:"a_projected_pos",components:3,type:"Float32"}],4),Hl=(os([{name:"a_fade_opacity",components:1,type:"Uint32"}],4),os([{name:"a_placed",components:2,type:"Uint8"},{name:"a_shift",components:2,type:"Float32"}])),Yl=os([{name:"a_size_scale",components:1,type:"Float32"},{name:"a_padding",components:2,type:"Float32"}]),Wl=(os([{type:"Int16",name:"anchorPointX"},{type:"Int16",name:"anchorPointY"},{type:"Float32",name:"x1"},{type:"Float32",name:"y1"},{type:"Float32",name:"x2"},{type:"Float32",name:"y2"},{type:"Int16",name:"padding"},{type:"Uint32",name:"featureIndex"},{type:"Uint16",name:"sourceLayerIndex"},{type:"Uint16",name:"bucketIndex"}]),os([{name:"a_pos",components:2,type:"Int16"},{name:"a_anchor_pos",components:2,type:"Int16"},{name:"a_extrude",components:2,type:"Int16"}],4)),Jl=os([{name:"a_pos_2f",components:2,type:"Float32"},{name:"a_radius",components:1,type:"Float32"},{name:"a_flags",components:2,type:"Int16"}],4);function Ql(t,e){const{expression:r}=e;if("constant"===r.kind)return {kind:"constant",layoutSize:r.evaluate(new qn(t+1))};if("source"===r.kind)return {kind:"source"};{const{zoomStops:e,interpolationType:i}=r;let n=0;for(;n<e.length&&e[n]<=t;)n++;n=Math.max(0,n-1);let s=n;for(;s<e.length&&e[s]<t+1;)s++;s=Math.min(e.length-1,s);const a=e[n],o=e[s];return "composite"===r.kind?{kind:"composite",minZoom:a,maxZoom:o,interpolationType:i}:{kind:"camera",minZoom:a,maxZoom:o,minSize:r.evaluate(new qn(a)),maxSize:r.evaluate(new qn(o)),interpolationType:i}}}function tu(t,{uSize:e,uSizeT:r},{lowerSize:i,upperSize:n}){return "source"===t.kind?i/128:"composite"===t.kind?Je(i/128,n/128,r):e}function eu(t,e){let r=0,i=0;if("constant"===t.kind)i=t.layoutSize;else if("source"!==t.kind){const{interpolationType:n,minZoom:s,maxZoom:a}=t,o=n?f(dr.interpolationFactor(n,e,s,a),0,1):0;"camera"===t.kind?i=Je(t.minSize,t.maxSize,o):r=o;}return {uSizeT:r,uSize:i}}os([{name:"triangle",components:3,type:"Uint16"}]),os([{type:"Int16",name:"anchorX"},{type:"Int16",name:"anchorY"},{type:"Uint16",name:"glyphStartIndex"},{type:"Uint16",name:"numGlyphs"},{type:"Uint32",name:"vertexStartIndex"},{type:"Uint32",name:"lineStartIndex"},{type:"Uint32",name:"lineLength"},{type:"Uint16",name:"segment"},{type:"Uint16",name:"lowerSize"},{type:"Uint16",name:"upperSize"},{type:"Float32",name:"lineOffsetX"},{type:"Float32",name:"lineOffsetY"},{type:"Uint8",name:"writingMode"},{type:"Uint8",name:"placedOrientation"},{type:"Uint8",name:"hidden"},{type:"Uint32",name:"crossTileID"},{type:"Int16",name:"associatedIconIndex"}]),os([{type:"Int16",name:"anchorX"},{type:"Int16",name:"anchorY"},{type:"Int16",name:"rightJustifiedTextSymbolIndex"},{type:"Int16",name:"centerJustifiedTextSymbolIndex"},{type:"Int16",name:"leftJustifiedTextSymbolIndex"},{type:"Int16",name:"verticalPlacedTextSymbolIndex"},{type:"Int16",name:"placedIconSymbolIndex"},{type:"Int16",name:"verticalPlacedIconSymbolIndex"},{type:"Uint16",name:"key"},{type:"Uint16",name:"textBoxStartIndex"},{type:"Uint16",name:"textBoxEndIndex"},{type:"Uint16",name:"verticalTextBoxStartIndex"},{type:"Uint16",name:"verticalTextBoxEndIndex"},{type:"Uint16",name:"iconBoxStartIndex"},{type:"Uint16",name:"iconBoxEndIndex"},{type:"Uint16",name:"verticalIconBoxStartIndex"},{type:"Uint16",name:"verticalIconBoxEndIndex"},{type:"Uint16",name:"featureIndex"},{type:"Uint16",name:"numHorizontalGlyphVertices"},{type:"Uint16",name:"numVerticalGlyphVertices"},{type:"Uint16",name:"numIconVertices"},{type:"Uint16",name:"numVerticalIconVertices"},{type:"Uint16",name:"useRuntimeCollisionCircles"},{type:"Uint32",name:"crossTileID"},{type:"Float32",name:"textBoxScale"},{type:"Float32",components:2,name:"textOffset"},{type:"Float32",name:"collisionCircleDiameter"}]),os([{type:"Float32",name:"offsetX"}]),os([{type:"Int16",name:"x"},{type:"Int16",name:"y"},{type:"Int16",name:"tileUnitDistanceFromAnchor"}]);var ru=Object.freeze({__proto__:null,getSizeData:Ql,evaluateSizeForFeature:tu,evaluateSizeForZoom:eu,SIZE_PACK_FACTOR:128});function iu(t,e,r){return t.sections.forEach(t=>{t.text=function(t,e,r){const i=e.layout.get("text-transform").evaluate(r,{});return "uppercase"===i?t=t.toLocaleUpperCase():"lowercase"===i&&(t=t.toLocaleLowerCase()),$n.applyArabicShaping&&(t=$n.applyArabicShaping(t)),t}(t.text,e,r);}),t}const nu={"!":"︕","#":"＃",$:"＄","%":"％","&":"＆","(":"︵",")":"︶","*":"＊","+":"＋",",":"︐","-":"︲",".":"・","/":"／",":":"︓",";":"︔","<":"︿","=":"＝",">":"﹀","?":"︖","@":"＠","[":"﹇","\\":"＼","]":"﹈","^":"＾",_:"︳","`":"｀","{":"︷","|":"―","}":"︸","~":"～","¢":"￠","£":"￡","¥":"￥","¦":"￤","¬":"￢","¯":"￣","–":"︲","—":"︱","‘":"﹃","’":"﹄","“":"﹁","”":"﹂","…":"︙","‧":"・","₩":"￦","、":"︑","。":"︒","〈":"︿","〉":"﹀","《":"︽","》":"︾","「":"﹁","」":"﹂","『":"﹃","』":"﹄","【":"︻","】":"︼","〔":"︹","〕":"︺","〖":"︗","〗":"︘","！":"︕","（":"︵","）":"︶","，":"︐","－":"︲","．":"・","：":"︓","；":"︔","＜":"︿","＞":"﹀","？":"︖","［":"﹇","］":"﹈","＿":"︳","｛":"︷","｜":"―","｝":"︸","｟":"︵","｠":"︶","｡":"︒","｢":"﹁","｣":"﹂"};var su=function(t,e,r,i,n){var s,a,o=8*n-i-1,l=(1<<o)-1,u=l>>1,c=-7,h=r?n-1:0,p=r?-1:1,d=t[e+h];for(h+=p,s=d&(1<<-c)-1,d>>=-c,c+=o;c>0;s=256*s+t[e+h],h+=p,c-=8);for(a=s&(1<<-c)-1,s>>=-c,c+=i;c>0;a=256*a+t[e+h],h+=p,c-=8);if(0===s)s=1-u;else {if(s===l)return a?NaN:1/0*(d?-1:1);a+=Math.pow(2,i),s-=u;}return (d?-1:1)*a*Math.pow(2,s-i)},au=function(t,e,r,i,n,s){var a,o,l,u=8*s-n-1,c=(1<<u)-1,h=c>>1,p=23===n?Math.pow(2,-24)-Math.pow(2,-77):0,d=i?0:s-1,f=i?1:-1,y=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(o=isNaN(e)?1:0,a=c):(a=Math.floor(Math.log(e)/Math.LN2),e*(l=Math.pow(2,-a))<1&&(a--,l*=2),(e+=a+h>=1?p/l:p*Math.pow(2,1-h))*l>=2&&(a++,l/=2),a+h>=c?(o=0,a=c):a+h>=1?(o=(e*l-1)*Math.pow(2,n),a+=h):(o=e*Math.pow(2,h-1)*Math.pow(2,n),a=0));n>=8;t[r+d]=255&o,d+=f,o/=256,n-=8);for(a=a<<n|o,u+=n;u>0;t[r+d]=255&a,d+=f,a/=256,u-=8);t[r+d-f]|=128*y;},ou=lu;function lu(t){this.buf=ArrayBuffer.isView&&ArrayBuffer.isView(t)?t:new Uint8Array(t||0),this.pos=0,this.type=0,this.length=this.buf.length;}lu.Varint=0,lu.Fixed64=1,lu.Bytes=2,lu.Fixed32=5;var uu="undefined"==typeof TextDecoder?null:new TextDecoder("utf8");function cu(t){return t.type===lu.Bytes?t.readVarint()+t.pos:t.pos+1}function hu(t,e,r){return r?4294967296*e+(t>>>0):4294967296*(e>>>0)+(t>>>0)}function pu(t,e,r){var i=e<=16383?1:e<=2097151?2:e<=268435455?3:Math.floor(Math.log(e)/(7*Math.LN2));r.realloc(i);for(var n=r.pos-1;n>=t;n--)r.buf[n+i]=r.buf[n];}function du(t,e){for(var r=0;r<t.length;r++)e.writeVarint(t[r]);}function fu(t,e){for(var r=0;r<t.length;r++)e.writeSVarint(t[r]);}function yu(t,e){for(var r=0;r<t.length;r++)e.writeFloat(t[r]);}function mu(t,e){for(var r=0;r<t.length;r++)e.writeDouble(t[r]);}function gu(t,e){for(var r=0;r<t.length;r++)e.writeBoolean(t[r]);}function xu(t,e){for(var r=0;r<t.length;r++)e.writeFixed32(t[r]);}function vu(t,e){for(var r=0;r<t.length;r++)e.writeSFixed32(t[r]);}function bu(t,e){for(var r=0;r<t.length;r++)e.writeFixed64(t[r]);}function wu(t,e){for(var r=0;r<t.length;r++)e.writeSFixed64(t[r]);}function _u(t,e){return (t[e]|t[e+1]<<8|t[e+2]<<16)+16777216*t[e+3]}function ku(t,e,r){t[r]=e,t[r+1]=e>>>8,t[r+2]=e>>>16,t[r+3]=e>>>24;}function Au(t,e){return (t[e]|t[e+1]<<8|t[e+2]<<16)+(t[e+3]<<24)}function Su(t,e,r){1===t&&r.readMessage(Iu,e);}function Iu(t,e,r){if(3===t){const{id:t,bitmap:i,width:n,height:s,left:a,top:o,advance:l}=r.readMessage(Tu,{});e.push({id:t,bitmap:new _o({width:n+6,height:s+6},i),metrics:{width:n,height:s,left:a,top:o,advance:l}});}}function Tu(t,e,r){1===t?e.id=r.readVarint():2===t?e.bitmap=r.readBytes():3===t?e.width=r.readVarint():4===t?e.height=r.readVarint():5===t?e.left=r.readSVarint():6===t?e.top=r.readSVarint():7===t&&(e.advance=r.readVarint());}function zu(t){let e=0,r=0;for(const i of t)e+=i.w*i.h,r=Math.max(r,i.w);t.sort((t,e)=>e.h-t.h);const i=[{x:0,y:0,w:Math.max(Math.ceil(Math.sqrt(e/.95)),r),h:1/0}];let n=0,s=0;for(const e of t)for(let t=i.length-1;t>=0;t--){const r=i[t];if(!(e.w>r.w||e.h>r.h)){if(e.x=r.x,e.y=r.y,s=Math.max(s,e.y+e.h),n=Math.max(n,e.x+e.w),e.w===r.w&&e.h===r.h){const e=i.pop();t<i.length&&(i[t]=e);}else e.h===r.h?(r.x+=e.w,r.w-=e.w):e.w===r.w?(r.y+=e.h,r.h-=e.h):(i.push({x:r.x+e.w,y:r.y,w:r.w-e.w,h:e.h}),r.y+=e.h,r.h-=e.h);break}}return {w:n,h:s,fill:e/(n*s)||0}}lu.prototype={destroy:function(){this.buf=null;},readFields:function(t,e,r){for(r=r||this.length;this.pos<r;){var i=this.readVarint(),n=i>>3,s=this.pos;this.type=7&i,t(n,e,this),this.pos===s&&this.skip(i);}return e},readMessage:function(t,e){return this.readFields(t,e,this.readVarint()+this.pos)},readFixed32:function(){var t=_u(this.buf,this.pos);return this.pos+=4,t},readSFixed32:function(){var t=Au(this.buf,this.pos);return this.pos+=4,t},readFixed64:function(){var t=_u(this.buf,this.pos)+4294967296*_u(this.buf,this.pos+4);return this.pos+=8,t},readSFixed64:function(){var t=_u(this.buf,this.pos)+4294967296*Au(this.buf,this.pos+4);return this.pos+=8,t},readFloat:function(){var t=su(this.buf,this.pos,!0,23,4);return this.pos+=4,t},readDouble:function(){var t=su(this.buf,this.pos,!0,52,8);return this.pos+=8,t},readVarint:function(t){var e,r,i=this.buf;return e=127&(r=i[this.pos++]),r<128?e:(e|=(127&(r=i[this.pos++]))<<7,r<128?e:(e|=(127&(r=i[this.pos++]))<<14,r<128?e:(e|=(127&(r=i[this.pos++]))<<21,r<128?e:function(t,e,r){var i,n,s=r.buf;if(i=(112&(n=s[r.pos++]))>>4,n<128)return hu(t,i,e);if(i|=(127&(n=s[r.pos++]))<<3,n<128)return hu(t,i,e);if(i|=(127&(n=s[r.pos++]))<<10,n<128)return hu(t,i,e);if(i|=(127&(n=s[r.pos++]))<<17,n<128)return hu(t,i,e);if(i|=(127&(n=s[r.pos++]))<<24,n<128)return hu(t,i,e);if(i|=(1&(n=s[r.pos++]))<<31,n<128)return hu(t,i,e);throw new Error("Expected varint not more than 10 bytes")}(e|=(15&(r=i[this.pos]))<<28,t,this))))},readVarint64:function(){return this.readVarint(!0)},readSVarint:function(){var t=this.readVarint();return t%2==1?(t+1)/-2:t/2},readBoolean:function(){return Boolean(this.readVarint())},readString:function(){var t=this.readVarint()+this.pos,e=this.pos;return this.pos=t,t-e>=12&&uu?function(t,e,r){return uu.decode(t.subarray(e,r))}(this.buf,e,t):function(t,e,r){for(var i="",n=e;n<r;){var s,a,o,l=t[n],u=null,c=l>239?4:l>223?3:l>191?2:1;if(n+c>r)break;1===c?l<128&&(u=l):2===c?128==(192&(s=t[n+1]))&&(u=(31&l)<<6|63&s)<=127&&(u=null):3===c?(a=t[n+2],128==(192&(s=t[n+1]))&&128==(192&a)&&((u=(15&l)<<12|(63&s)<<6|63&a)<=2047||u>=55296&&u<=57343)&&(u=null)):4===c&&(a=t[n+2],o=t[n+3],128==(192&(s=t[n+1]))&&128==(192&a)&&128==(192&o)&&((u=(15&l)<<18|(63&s)<<12|(63&a)<<6|63&o)<=65535||u>=1114112)&&(u=null)),null===u?(u=65533,c=1):u>65535&&(u-=65536,i+=String.fromCharCode(u>>>10&1023|55296),u=56320|1023&u),i+=String.fromCharCode(u),n+=c;}return i}(this.buf,e,t)},readBytes:function(){var t=this.readVarint()+this.pos,e=this.buf.subarray(this.pos,t);return this.pos=t,e},readPackedVarint:function(t,e){if(this.type!==lu.Bytes)return t.push(this.readVarint(e));var r=cu(this);for(t=t||[];this.pos<r;)t.push(this.readVarint(e));return t},readPackedSVarint:function(t){if(this.type!==lu.Bytes)return t.push(this.readSVarint());var e=cu(this);for(t=t||[];this.pos<e;)t.push(this.readSVarint());return t},readPackedBoolean:function(t){if(this.type!==lu.Bytes)return t.push(this.readBoolean());var e=cu(this);for(t=t||[];this.pos<e;)t.push(this.readBoolean());return t},readPackedFloat:function(t){if(this.type!==lu.Bytes)return t.push(this.readFloat());var e=cu(this);for(t=t||[];this.pos<e;)t.push(this.readFloat());return t},readPackedDouble:function(t){if(this.type!==lu.Bytes)return t.push(this.readDouble());var e=cu(this);for(t=t||[];this.pos<e;)t.push(this.readDouble());return t},readPackedFixed32:function(t){if(this.type!==lu.Bytes)return t.push(this.readFixed32());var e=cu(this);for(t=t||[];this.pos<e;)t.push(this.readFixed32());return t},readPackedSFixed32:function(t){if(this.type!==lu.Bytes)return t.push(this.readSFixed32());var e=cu(this);for(t=t||[];this.pos<e;)t.push(this.readSFixed32());return t},readPackedFixed64:function(t){if(this.type!==lu.Bytes)return t.push(this.readFixed64());var e=cu(this);for(t=t||[];this.pos<e;)t.push(this.readFixed64());return t},readPackedSFixed64:function(t){if(this.type!==lu.Bytes)return t.push(this.readSFixed64());var e=cu(this);for(t=t||[];this.pos<e;)t.push(this.readSFixed64());return t},skip:function(t){var e=7&t;if(e===lu.Varint)for(;this.buf[this.pos++]>127;);else if(e===lu.Bytes)this.pos=this.readVarint()+this.pos;else if(e===lu.Fixed32)this.pos+=4;else {if(e!==lu.Fixed64)throw new Error("Unimplemented type: "+e);this.pos+=8;}},writeTag:function(t,e){this.writeVarint(t<<3|e);},realloc:function(t){for(var e=this.length||16;e<this.pos+t;)e*=2;if(e!==this.length){var r=new Uint8Array(e);r.set(this.buf),this.buf=r,this.length=e;}},finish:function(){return this.length=this.pos,this.pos=0,this.buf.subarray(0,this.length)},writeFixed32:function(t){this.realloc(4),ku(this.buf,t,this.pos),this.pos+=4;},writeSFixed32:function(t){this.realloc(4),ku(this.buf,t,this.pos),this.pos+=4;},writeFixed64:function(t){this.realloc(8),ku(this.buf,-1&t,this.pos),ku(this.buf,Math.floor(t*(1/4294967296)),this.pos+4),this.pos+=8;},writeSFixed64:function(t){this.realloc(8),ku(this.buf,-1&t,this.pos),ku(this.buf,Math.floor(t*(1/4294967296)),this.pos+4),this.pos+=8;},writeVarint:function(t){(t=+t||0)>268435455||t<0?function(t,e){var r,i;if(t>=0?(r=t%4294967296|0,i=t/4294967296|0):(i=~(-t/4294967296),4294967295^(r=~(-t%4294967296))?r=r+1|0:(r=0,i=i+1|0)),t>=0x10000000000000000||t<-0x10000000000000000)throw new Error("Given varint doesn't fit into 10 bytes");e.realloc(10),function(t,e,r){r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos++]=127&t|128,r.buf[r.pos]=127&(t>>>=7);}(r,0,e),function(t,e){var r=(7&t)<<4;e.buf[e.pos++]|=r|((t>>>=3)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),t&&(e.buf[e.pos++]=127&t)))));}(i,e);}(t,this):(this.realloc(4),this.buf[this.pos++]=127&t|(t>127?128:0),t<=127||(this.buf[this.pos++]=127&(t>>>=7)|(t>127?128:0),t<=127||(this.buf[this.pos++]=127&(t>>>=7)|(t>127?128:0),t<=127||(this.buf[this.pos++]=t>>>7&127))));},writeSVarint:function(t){this.writeVarint(t<0?2*-t-1:2*t);},writeBoolean:function(t){this.writeVarint(Boolean(t));},writeString:function(t){t=String(t),this.realloc(4*t.length),this.pos++;var e=this.pos;this.pos=function(t,e,r){for(var i,n,s=0;s<e.length;s++){if((i=e.charCodeAt(s))>55295&&i<57344){if(!n){i>56319||s+1===e.length?(t[r++]=239,t[r++]=191,t[r++]=189):n=i;continue}if(i<56320){t[r++]=239,t[r++]=191,t[r++]=189,n=i;continue}i=n-55296<<10|i-56320|65536,n=null;}else n&&(t[r++]=239,t[r++]=191,t[r++]=189,n=null);i<128?t[r++]=i:(i<2048?t[r++]=i>>6|192:(i<65536?t[r++]=i>>12|224:(t[r++]=i>>18|240,t[r++]=i>>12&63|128),t[r++]=i>>6&63|128),t[r++]=63&i|128);}return r}(this.buf,t,this.pos);var r=this.pos-e;r>=128&&pu(e,r,this),this.pos=e-1,this.writeVarint(r),this.pos+=r;},writeFloat:function(t){this.realloc(4),au(this.buf,t,this.pos,!0,23,4),this.pos+=4;},writeDouble:function(t){this.realloc(8),au(this.buf,t,this.pos,!0,52,8),this.pos+=8;},writeBytes:function(t){var e=t.length;this.writeVarint(e),this.realloc(e);for(var r=0;r<e;r++)this.buf[this.pos++]=t[r];},writeRawMessage:function(t,e){this.pos++;var r=this.pos;t(e,this);var i=this.pos-r;i>=128&&pu(r,i,this),this.pos=r-1,this.writeVarint(i),this.pos+=i;},writeMessage:function(t,e,r){this.writeTag(t,lu.Bytes),this.writeRawMessage(e,r);},writePackedVarint:function(t,e){e.length&&this.writeMessage(t,du,e);},writePackedSVarint:function(t,e){e.length&&this.writeMessage(t,fu,e);},writePackedBoolean:function(t,e){e.length&&this.writeMessage(t,gu,e);},writePackedFloat:function(t,e){e.length&&this.writeMessage(t,yu,e);},writePackedDouble:function(t,e){e.length&&this.writeMessage(t,mu,e);},writePackedFixed32:function(t,e){e.length&&this.writeMessage(t,xu,e);},writePackedSFixed32:function(t,e){e.length&&this.writeMessage(t,vu,e);},writePackedFixed64:function(t,e){e.length&&this.writeMessage(t,bu,e);},writePackedSFixed64:function(t,e){e.length&&this.writeMessage(t,wu,e);},writeBytesField:function(t,e){this.writeTag(t,lu.Bytes),this.writeBytes(e);},writeFixed32Field:function(t,e){this.writeTag(t,lu.Fixed32),this.writeFixed32(e);},writeSFixed32Field:function(t,e){this.writeTag(t,lu.Fixed32),this.writeSFixed32(e);},writeFixed64Field:function(t,e){this.writeTag(t,lu.Fixed64),this.writeFixed64(e);},writeSFixed64Field:function(t,e){this.writeTag(t,lu.Fixed64),this.writeSFixed64(e);},writeVarintField:function(t,e){this.writeTag(t,lu.Varint),this.writeVarint(e);},writeSVarintField:function(t,e){this.writeTag(t,lu.Varint),this.writeSVarint(e);},writeStringField:function(t,e){this.writeTag(t,lu.Bytes),this.writeString(e);},writeFloatField:function(t,e){this.writeTag(t,lu.Fixed32),this.writeFloat(e);},writeDoubleField:function(t,e){this.writeTag(t,lu.Fixed64),this.writeDouble(e);},writeBooleanField:function(t,e){this.writeVarintField(t,Boolean(e));}};class Eu{constructor(t,{pixelRatio:e,version:r,stretchX:i,stretchY:n,content:s}){this.paddedRect=t,this.pixelRatio=e,this.stretchX=i,this.stretchY=n,this.content=s,this.version=r;}get tl(){return [this.paddedRect.x+1,this.paddedRect.y+1]}get br(){return [this.paddedRect.x+this.paddedRect.w-1,this.paddedRect.y+this.paddedRect.h-1]}get tlbr(){return this.tl.concat(this.br)}get displaySize(){return [(this.paddedRect.w-2)/this.pixelRatio,(this.paddedRect.h-2)/this.pixelRatio]}}class Mu{constructor(t,e){const r={},i={};this.haveRenderCallbacks=[];const n=[];this.addImages(t,r,n),this.addImages(e,i,n);const{w:s,h:a}=zu(n),o=new ko({width:s||1,height:a||1});for(const e in t){const i=t[e],n=r[e].paddedRect;ko.copy(i.data,o,{x:0,y:0},{x:n.x+1,y:n.y+1},i.data);}for(const t in e){const r=e[t],n=i[t].paddedRect,s=n.x+1,a=n.y+1,l=r.data.width,u=r.data.height;ko.copy(r.data,o,{x:0,y:0},{x:s,y:a},r.data),ko.copy(r.data,o,{x:0,y:u-1},{x:s,y:a-1},{width:l,height:1}),ko.copy(r.data,o,{x:0,y:0},{x:s,y:a+u},{width:l,height:1}),ko.copy(r.data,o,{x:l-1,y:0},{x:s-1,y:a},{width:1,height:u}),ko.copy(r.data,o,{x:0,y:0},{x:s+l,y:a},{width:1,height:u});}this.image=o,this.iconPositions=r,this.patternPositions=i;}addImages(t,e,r){for(const i in t){const n=t[i],s={x:0,y:0,w:n.data.width+2,h:n.data.height+2};r.push(s),e[i]=new Eu(s,n),n.hasRenderCallback&&this.haveRenderCallbacks.push(i);}}patchUpdatedImages(t,e){t.dispatchRenderCallbacks(this.haveRenderCallbacks);for(const r in t.updatedImages)this.patchUpdatedImage(this.iconPositions[r],t.getImage(r),e),this.patchUpdatedImage(this.patternPositions[r],t.getImage(r),e);}patchUpdatedImage(t,e,r){if(!t||!e)return;if(t.version===e.version)return;t.version=e.version;const[i,n]=t.tl;r.update(e.data,void 0,{x:i,y:n});}}Gi("ImagePosition",Eu),Gi("ImageAtlas",Mu);const Bu={horizontal:1,vertical:2,horizontalOnly:3};class Du{constructor(){this.scale=1,this.fontStack="",this.imageName=null;}static forText(t,e){const r=new Du;return r.scale=t||1,r.fontStack=e,r}static forImage(t){const e=new Du;return e.imageName=t,e}}class Cu{constructor(){this.text="",this.sectionIndex=[],this.sections=[],this.imageSectionID=null;}static fromFeature(t,e){const r=new Cu;for(let i=0;i<t.sections.length;i++){const n=t.sections[i];n.image?r.addImageSection(n):r.addTextSection(n,e);}return r}length(){return this.text.length}getSection(t){return this.sections[this.sectionIndex[t]]}getSectionIndex(t){return this.sectionIndex[t]}getCharCode(t){return this.text.charCodeAt(t)}verticalizePunctuation(){this.text=function(t){let e="";for(let r=0;r<t.length;r++){const i=t.charCodeAt(r+1)||null,n=t.charCodeAt(r-1)||null;e+=i&&En(i)&&!nu[t[r+1]]||n&&En(n)&&!nu[t[r-1]]||!nu[t[r]]?t[r]:nu[t[r]];}return e}(this.text);}trim(){let t=0;for(let e=0;e<this.text.length&&Vu[this.text.charCodeAt(e)];e++)t++;let e=this.text.length;for(let r=this.text.length-1;r>=0&&r>=t&&Vu[this.text.charCodeAt(r)];r--)e--;this.text=this.text.substring(t,e),this.sectionIndex=this.sectionIndex.slice(t,e);}substring(t,e){const r=new Cu;return r.text=this.text.substring(t,e),r.sectionIndex=this.sectionIndex.slice(t,e),r.sections=this.sections,r}toString(){return this.text}getMaxScale(){return this.sectionIndex.reduce((t,e)=>Math.max(t,this.sections[e].scale),0)}addTextSection(t,e){this.text+=t.text,this.sections.push(Du.forText(t.scale,t.fontStack||e));const r=this.sections.length-1;for(let e=0;e<t.text.length;++e)this.sectionIndex.push(r);}addImageSection(t){const e=t.image?t.image.name:"";if(0===e.length)return void E("Can't add FormattedSection with an empty image.");const r=this.getNextImageSectionCharCode();r?(this.text+=String.fromCharCode(r),this.sections.push(Du.forImage(e)),this.sectionIndex.push(this.sections.length-1)):E("Reached maximum number of images 6401");}getNextImageSectionCharCode(){return this.imageSectionID?this.imageSectionID>=63743?null:++this.imageSectionID:(this.imageSectionID=57344,this.imageSectionID)}}function Pu(t,e,r,i,n,s,a,o,l,u,c,h,p,d,f,y){const m=Cu.fromFeature(t,n);let g;h===Bu.vertical&&m.verticalizePunctuation();const{processBidirectionalText:x,processStyledBidirectionalText:v}=$n;if(x&&1===m.sections.length){g=[];const t=x(m.toString(),$u(m,u,s,e,i,d,f));for(const e of t){const t=new Cu;t.text=e,t.sections=m.sections;for(let r=0;r<e.length;r++)t.sectionIndex.push(0);g.push(t);}}else if(v){g=[];const t=v(m.text,m.sectionIndex,$u(m,u,s,e,i,d,f));for(const e of t){const t=new Cu;t.text=e[0],t.sectionIndex=e[1],t.sections=m.sections,g.push(t);}}else g=function(t,e){const r=[],i=t.text;let n=0;for(const i of e)r.push(t.substring(n,i)),n=i;return n<i.length&&r.push(t.substring(n,i.length)),r}(m,$u(m,u,s,e,i,d,f));const b=[],w={positionedLines:b,text:m.toString(),top:c[1],bottom:c[1],left:c[0],right:c[0],writingMode:h,iconsInText:!1,verticalizable:!1};return function(t,e,r,i,n,s,a,o,l,u,c,h){let p=0,d=-17,f=0,y=0;const m="right"===o?1:"left"===o?0:.5;let g=0;for(const a of n){a.trim();const n=a.getMaxScale(),o=24*(n-1),v={positionedGlyphs:[],lineOffset:0};t.positionedLines[g]=v;const b=v.positionedGlyphs;let w=0;if(!a.length()){d+=s,++g;continue}for(let s=0;s<a.length();s++){const f=a.getSection(s),y=a.getSectionIndex(s),m=a.getCharCode(s);let g=0,v=null,_=null,k=null,A=24;const S=!(l===Bu.horizontal||!c&&!zn(m)||c&&(Vu[m]||(x=m,Wi(x)||Ji(x)||Qi(x)||vn(x)||kn(x))));if(f.imageName){const e=i[f.imageName];if(!e)continue;k=f.imageName,t.iconsInText=t.iconsInText||!0,_=e.paddedRect;const r=e.displaySize;f.scale=24*f.scale/h,v={width:r[0],height:r[1],left:1,top:-3,advance:S?r[1]:r[0],localGlyph:!1},g=o+(24-r[1]*f.scale),A=v.advance;const s=S?r[0]*f.scale-24*n:r[1]*f.scale-24*n;s>0&&s>w&&(w=s);}else {const t=r[f.fontStack],i=t&&t[m];if(i&&i.rect)_=i.rect,v=i.metrics;else {const t=e[f.fontStack],r=t&&t[m];if(!r)continue;v=r.metrics;}g=24*(n-f.scale);}S?(t.verticalizable=!0,b.push({glyph:m,imageName:k,x:p,y:d+g,vertical:S,scale:f.scale,localGlyph:v.localGlyph,fontStack:f.fontStack,sectionIndex:y,metrics:v,rect:_}),p+=A*f.scale+u):(b.push({glyph:m,imageName:k,x:p,y:d+g,vertical:S,scale:f.scale,localGlyph:v.localGlyph,fontStack:f.fontStack,sectionIndex:y,metrics:v,rect:_}),p+=v.advance*f.scale+u);}0!==b.length&&(f=Math.max(p-u,f),Nu(b,0,b.length-1,m,w)),p=0;const _=s*n+w;v.lineOffset=Math.max(w,o),d+=_,y=Math.max(_,y),++g;}var x;const v=d- -17,{horizontalAlign:b,verticalAlign:w}=qu(a);(function(t,e,r,i,n,s,a,o,l){const u=(e-r)*n;let c=0;c=s!==a?-o*i- -17:(-i*l+.5)*a;for(const e of t)for(const t of e.positionedGlyphs)t.x+=u,t.y+=c;})(t.positionedLines,m,b,w,f,y,s,v,n.length),t.top+=-w*v,t.bottom=t.top+v,t.left+=-b*f,t.right=t.left+f;}(w,e,r,i,g,a,o,l,h,u,p,y),!function(t){for(const e of t)if(0!==e.positionedGlyphs.length)return !1;return !0}(b)&&w}const Vu={9:!0,10:!0,11:!0,12:!0,13:!0,32:!0},Fu={10:!0,32:!0,38:!0,40:!0,41:!0,43:!0,45:!0,47:!0,173:!0,183:!0,8203:!0,8208:!0,8211:!0,8231:!0};function Ru(t,e,r,i,n,s){if(e.imageName){const t=i[e.imageName];return t?t.displaySize[0]*e.scale*24/s+n:0}{const i=r[e.fontStack],s=i&&i[t];return s?s.metrics.advance*e.scale+n:0}}function Lu(t,e,r,i){const n=Math.pow(t-e,2);return i?t<e?n/2:2*n:n+Math.abs(r)*r}function Uu(t,e,r){let i=0;return 10===t&&(i-=1e4),r&&(i+=150),40!==t&&65288!==t||(i+=50),41!==e&&65289!==e||(i+=50),i}function Ou(t,e,r,i,n,s){let a=null,o=Lu(e,r,n,s);for(const t of i){const i=Lu(e-t.x,r,n,s)+t.badness;i<=o&&(a=t,o=i);}return {index:t,x:e,priorBreak:a,badness:o}}function $u(t,e,r,i,n,s,a){if("point"!==s)return [];if(!t)return [];const o=[],l=function(t,e,r,i,n,s){let a=0;for(let r=0;r<t.length();r++){const o=t.getSection(r);a+=Ru(t.getCharCode(r),o,i,n,e,s);}return a/Math.max(1,Math.ceil(a/r))}(t,e,r,i,n,a),u=t.text.indexOf("​")>=0;let c=0;for(let r=0;r<t.length();r++){const s=t.getSection(r),p=t.getCharCode(r);if(Vu[p]||(c+=Ru(p,s,i,n,e,a)),r<t.length()-1){const e=!((h=p)<11904||!(ln(h)||on(h)||wn(h)||xn(h)||pn(h)||tn(h)||un(h)||nn(h)||dn(h)||fn(h)||hn(h)||An(h)||sn(h)||rn(h)||en(h)||cn(h)||an(h)||bn(h)||mn(h)||yn(h)));(Fu[p]||e||s.imageName)&&o.push(Ou(r+1,c,l,o,Uu(p,t.getCharCode(r+1),e&&u),!1));}}var h;return function t(e){return e?t(e.priorBreak).concat(e.index):[]}(Ou(t.length(),c,l,o,0,!0))}function qu(t){let e=.5,r=.5;switch(t){case"right":case"top-right":case"bottom-right":e=1;break;case"left":case"top-left":case"bottom-left":e=0;}switch(t){case"bottom":case"bottom-right":case"bottom-left":r=1;break;case"top":case"top-right":case"top-left":r=0;}return {horizontalAlign:e,verticalAlign:r}}function Nu(t,e,r,i,n){if(!i&&!n)return;const s=t[r],a=(t[r].x+s.metrics.advance*s.scale)*i;for(let i=e;i<=r;i++)t[i].x-=a,t[i].y+=n;}function ju(t,e,r){const{horizontalAlign:i,verticalAlign:n}=qu(r),s=e[0]-t.displaySize[0]*i,a=e[1]-t.displaySize[1]*n;return {image:t,top:a,bottom:a+t.displaySize[1],left:s,right:s+t.displaySize[0]}}function Gu(t,e,r,i,n,s){const a=t.image;let o;if(a.content){const t=a.content,e=a.pixelRatio||1;o=[t[0]/e,t[1]/e,a.displaySize[0]-t[2]/e,a.displaySize[1]-t[3]/e];}const l=e.left*s,u=e.right*s;let c,h,p,d;"width"===r||"both"===r?(d=n[0]+l-i[3],h=n[0]+u+i[1]):(d=n[0]+(l+u-a.displaySize[0])/2,h=d+a.displaySize[0]);const f=e.top*s,y=e.bottom*s;return "height"===r||"both"===r?(c=n[1]+f-i[0],p=n[1]+y+i[2]):(c=n[1]+(f+y-a.displaySize[1])/2,p=c+a.displaySize[1]),{image:a,top:c,right:h,bottom:p,left:d,collisionPadding:o}}class Zu extends i{constructor(t,e,r,i){super(t,e),this.angle=r,void 0!==i&&(this.segment=i);}clone(){return new Zu(this.x,this.y,this.angle,this.segment)}}function Xu(t,e,r,i,n){if(void 0===e.segment)return !0;let s=e,a=e.segment+1,o=0;for(;o>-r/2;){if(a--,a<0)return !1;o-=t[a].dist(s),s=t[a];}o+=t[a].dist(t[a+1]),a++;const l=[];let u=0;for(;o<r/2;){const e=t[a],r=t[a+1];if(!r)return !1;let s=t[a-1].angleTo(e)-e.angleTo(r);for(s=Math.abs((s+3*Math.PI)%(2*Math.PI)-Math.PI),l.push({distance:o,angleDelta:s}),u+=s;o-l[0].distance>i;)u-=l.shift().angleDelta;if(u>n)return !1;a++,o+=e.dist(r);}return !0}function Ku(t){let e=0;for(let r=0;r<t.length-1;r++)e+=t[r].dist(t[r+1]);return e}function Hu(t,e,r){return t?.6*e*r:0}function Yu(t,e){return Math.max(t?t.right-t.left:0,e?e.right-e.left:0)}function Wu(t,e,r,i,n,s){const a=Hu(r,n,s),o=Yu(r,i)*s;let l=0;const u=Ku(t)/2;for(let r=0;r<t.length-1;r++){const i=t[r],n=t[r+1],s=i.dist(n);if(l+s>u){const c=(u-l)/s,h=Je(i.x,n.x,c),p=Je(i.y,n.y,c),d=new Zu(h,p,n.angleTo(i),r);return d._round(),!a||Xu(t,d,o,a,e)?d:void 0}l+=s;}}function Ju(t,e,r,i,n,s,a,o,l){const u=Hu(i,s,a),c=Yu(i,n),h=c*a,p=0===t[0].x||t[0].x===l||0===t[0].y||t[0].y===l;return e-h<e/4&&(e=h+e/4),function t(e,r,i,n,s,a,o,l,u){const c=a/2,h=Ku(e);let p=0,d=r-i,f=[];for(let t=0;t<e.length-1;t++){const r=e[t],o=e[t+1],l=r.dist(o),y=o.angleTo(r);for(;d+i<p+l;){d+=i;const m=(d-p)/l,g=Je(r.x,o.x,m),x=Je(r.y,o.y,m);if(g>=0&&g<u&&x>=0&&x<u&&d-c>=0&&d+c<=h){const r=new Zu(g,x,y,t);r._round(),n&&!Xu(e,r,a,n,s)||f.push(r);}}p+=l;}return l||f.length||o||(f=t(e,p/2,i,n,s,a,o,!0,u)),f}(t,p?e/2*o%e:(c/2+2*s)*a*o%e,e,u,r,h,p,!1,l)}function Qu(t,e,r,n,s){const a=[];for(let o=0;o<t.length;o++){const l=t[o];let u;for(let t=0;t<l.length-1;t++){let o=l[t],c=l[t+1];o.x<e&&c.x<e||(o.x<e?o=new i(e,o.y+(e-o.x)/(c.x-o.x)*(c.y-o.y))._round():c.x<e&&(c=new i(e,o.y+(e-o.x)/(c.x-o.x)*(c.y-o.y))._round()),o.y<r&&c.y<r||(o.y<r?o=new i(o.x+(r-o.y)/(c.y-o.y)*(c.x-o.x),r)._round():c.y<r&&(c=new i(o.x+(r-o.y)/(c.y-o.y)*(c.x-o.x),r)._round()),o.x>=n&&c.x>=n||(o.x>=n?o=new i(n,o.y+(n-o.x)/(c.x-o.x)*(c.y-o.y))._round():c.x>=n&&(c=new i(n,o.y+(n-o.x)/(c.x-o.x)*(c.y-o.y))._round()),o.y>=s&&c.y>=s||(o.y>=s?o=new i(o.x+(s-o.y)/(c.y-o.y)*(c.x-o.x),s)._round():c.y>=s&&(c=new i(o.x+(s-o.y)/(c.y-o.y)*(c.x-o.x),s)._round()),u&&o.equals(u[u.length-1])||(u=[o],a.push(u)),u.push(c)))));}}return a}Gi("Anchor",Zu);var tc=ic,ec=ic,rc=1e20;function ic(t,e,r,i,n,s){this.fontSize=t||24,this.buffer=void 0===e?3:e,this.cutoff=i||.25,this.fontFamily=n||"sans-serif",this.fontWeight=s||"normal",this.radius=r||8;var a=this.size=this.fontSize+2*this.buffer,o=a+2*this.buffer;this.canvas=document.createElement("canvas"),this.canvas.width=this.canvas.height=a,this.ctx=this.canvas.getContext("2d"),this.ctx.font=this.fontWeight+" "+this.fontSize+"px "+this.fontFamily,this.ctx.textBaseline="middle",this.ctx.textAlign="left",this.ctx.fillStyle="black",this.gridOuter=new Float64Array(o*o),this.gridInner=new Float64Array(o*o),this.f=new Float64Array(o),this.z=new Float64Array(o+1),this.v=new Uint16Array(o),this.middle=Math.round(a/2*(navigator.userAgent.indexOf("Gecko/")>=0?1.2:1));}function nc(t,e,r,i,n,s){for(var a=0;a<e;a++)sc(t,a,e,r,i,n,s);for(var o=0;o<r;o++)sc(t,o*e,1,e,i,n,s);}function sc(t,e,r,i,n,s,a){var o,l,u,c;for(s[0]=0,a[0]=-rc,a[1]=rc,o=0;o<i;o++)n[o]=t[e+o*r];for(o=1,l=0,u=0;o<i;o++){do{u=(n[o]-n[c=s[l]]+o*o-c*c)/(o-c)/2;}while(u<=a[l]&&--l>-1);s[++l]=o,a[l]=u,a[l+1]=rc;}for(o=0,l=0;o<i;o++){for(;a[l+1]<o;)l++;t[e+o*r]=n[c=s[l]]+(o-c)*(o-c);}}ic.prototype._draw=function(t,e){var r,i,n,s,a,o,l,u,c=this.ctx.measureText(t),h=c.width,p=2*this.buffer;e&&void 0!==c.actualBoundingBoxLeft?(a=Math.floor(c.actualBoundingBoxAscent)-this.middle,o=Math.max(0,this.middle-Math.ceil(c.actualBoundingBoxAscent)),l=this.buffer,r=(i=Math.min(this.size,Math.ceil(c.actualBoundingBoxRight-c.actualBoundingBoxLeft)))+p,n=(s=Math.min(this.size-o,Math.ceil(c.actualBoundingBoxAscent+c.actualBoundingBoxDescent)))+p):(r=i=this.size,n=s=this.size,a=0,o=l=0),i&&s&&(this.ctx.clearRect(l,o,i,s),this.ctx.fillText(t,this.buffer,this.middle),u=this.ctx.getImageData(l,o,i,s));var d=new Uint8ClampedArray(r*n);return function(t,e,r,i,n,s,a){s.fill(rc,0,e*r),a.fill(0,0,e*r);for(var o=(e-i)/2,l=0;l<n;l++)for(var u=0;u<i;u++){var c=(l+o)*e+u+o,h=t.data[4*(l*i+u)+3]/255;if(1===h)s[c]=0,a[c]=rc;else if(0===h)s[c]=rc,a[c]=0;else {var p=Math.max(0,.5-h),d=Math.max(0,h-.5);s[c]=p*p,a[c]=d*d;}}}(u,r,n,i,s,this.gridOuter,this.gridInner),nc(this.gridOuter,r,n,this.f,this.v,this.z),nc(this.gridInner,r,n,this.f,this.v,this.z),function(t,e,r,i,n,s,a){for(var o=0;o<e*r;o++){var l=Math.sqrt(i[o])-Math.sqrt(n[o]);t[o]=Math.round(255-255*(l/s+a));}}(d,r,n,this.gridOuter,this.gridInner,this.radius,this.cutoff),{data:d,metrics:{width:i,height:s,sdfWidth:r,sdfHeight:n,top:a,left:0,advance:h,fontAscent:c.fontBoundingBoxAscent}}},ic.prototype.draw=function(t){return this._draw(t,!1).data},ic.prototype.drawWithMetrics=function(t){return this._draw(t,!0)},tc.default=ec;const ac={none:0,ideographs:1,all:2};class oc{constructor(t,e,r){this.requestManager=t,this.localGlyphMode=e,this.localFontFamily=r,this.entries={},this.localGlyphs={200:{},400:{},500:{},900:{}};}setURL(t){this.url=t;}getGlyphs(t,e){const r=[];for(const e in t)for(const i of t[e])r.push({stack:e,id:i});m(r,({stack:t,id:e},r)=>{let i=this.entries[t];i||(i=this.entries[t]={glyphs:{},requests:{},ranges:{}});let n=i.glyphs[e];if(void 0!==n)return void r(null,{stack:t,id:e,glyph:n});if(n=this._tinySDF(i,t,e),n)return i.glyphs[e]=n,void r(null,{stack:t,id:e,glyph:n});const s=Math.floor(e/256);if(256*s>65535)return void r(new Error("glyphs > 65535 not supported"));if(i.ranges[s])return void r(null,{stack:t,id:e,glyph:n});let a=i.requests[s];a||(a=i.requests[s]=[],oc.loadGlyphRange(t,s,this.url,this.requestManager,(t,e)=>{if(e){for(const t in e)this._doesCharSupportLocalGlyph(+t)||(i.glyphs[+t]=e[+t]);i.ranges[s]=!0;}for(const r of a)r(t,e);delete i.requests[s];})),a.push((i,n)=>{i?r(i):n&&r(null,{stack:t,id:e,glyph:n[e]||null});});},(t,r)=>{if(t)e(t);else if(r){const t={};for(const{stack:e,id:i,glyph:n}of r)(t[e]||(t[e]={}))[i]=n&&{id:n.id,bitmap:n.bitmap.clone(),metrics:n.metrics};e(null,t);}});}_doesCharSupportLocalGlyph(t){return this.localGlyphMode!==ac.none&&(this.localGlyphMode===ac.all?!!this.localFontFamily:!!this.localFontFamily&&(fn(t)||gn(t)||sn(t)||an(t)))}_tinySDF(t,e,r){const i=this.localFontFamily;if(!i)return;if(!this._doesCharSupportLocalGlyph(r))return;let n=t.tinySDF;if(!n){let r="400";/bold/i.test(e)?r="900":/medium/i.test(e)?r="500":/light/i.test(e)&&(r="200"),n=t.tinySDF=new oc.TinySDF(48,6,16,.25,i,r);}if(this.localGlyphs[n.fontWeight][r])return this.localGlyphs[n.fontWeight][r];const{data:s,metrics:a}=n.drawWithMetrics(String.fromCharCode(r)),{fontAscent:o,sdfWidth:l,sdfHeight:u,width:c,height:h,left:p,top:d,advance:f}=a,y=(o?o/2:17)-9;return this.localGlyphs[n.fontWeight][r]={id:r,bitmap:new _o({width:l,height:u},s),metrics:{width:c/2,height:h/2,left:p/2,top:d/2-y,advance:f/2,localGlyph:!0}}}}function lc(t,e,r,n){const s=[],a=t.image,o=a.pixelRatio,l=a.paddedRect.w-2,u=a.paddedRect.h-2,c=t.right-t.left,h=t.bottom-t.top,p=a.stretchX||[[0,l]],d=a.stretchY||[[0,u]],f=(t,e)=>t+e[1]-e[0],y=p.reduce(f,0),m=d.reduce(f,0),g=l-y,x=u-m;let v=0,b=y,w=0,_=m,k=0,A=g,S=0,I=x;if(a.content&&n){const t=a.content;v=uc(p,0,t[0]),w=uc(d,0,t[1]),b=uc(p,t[0],t[2]),_=uc(d,t[1],t[3]),k=t[0]-v,S=t[1]-w,A=t[2]-t[0]-b,I=t[3]-t[1]-_;}const T=(n,s,l,u)=>{const p=hc(n.stretch-v,b,c,t.left),d=pc(n.fixed-k,A,n.stretch,y),f=hc(s.stretch-w,_,h,t.top),g=pc(s.fixed-S,I,s.stretch,m),x=hc(l.stretch-v,b,c,t.left),T=pc(l.fixed-k,A,l.stretch,y),z=hc(u.stretch-w,_,h,t.top),E=pc(u.fixed-S,I,u.stretch,m),M=new i(p,f),B=new i(x,f),D=new i(x,z),C=new i(p,z),P=new i(d/o,g/o),V=new i(T/o,E/o),F=e*Math.PI/180;if(F){const t=Math.sin(F),e=Math.cos(F),r=[e,-t,t,e];M._matMult(r),B._matMult(r),C._matMult(r),D._matMult(r);}const R=n.stretch+n.fixed,L=s.stretch+s.fixed;return {tl:M,tr:B,bl:C,br:D,tex:{x:a.paddedRect.x+1+R,y:a.paddedRect.y+1+L,w:l.stretch+l.fixed-R,h:u.stretch+u.fixed-L},writingMode:void 0,glyphOffset:[0,0],sectionIndex:0,pixelOffsetTL:P,pixelOffsetBR:V,minFontScaleX:A/o/c,minFontScaleY:I/o/h,isSDF:r}};if(n&&(a.stretchX||a.stretchY)){const t=cc(p,g,y),e=cc(d,x,m);for(let r=0;r<t.length-1;r++){const i=t[r],n=t[r+1];for(let t=0;t<e.length-1;t++)s.push(T(i,e[t],n,e[t+1]));}}else s.push(T({fixed:0,stretch:-1},{fixed:0,stretch:-1},{fixed:0,stretch:l+1},{fixed:0,stretch:u+1}));return s}function uc(t,e,r){let i=0;for(const n of t)i+=Math.max(e,Math.min(r,n[1]))-Math.max(e,Math.min(r,n[0]));return i}function cc(t,e,r){const i=[{fixed:-1,stretch:0}];for(const[e,r]of t){const t=i[i.length-1];i.push({fixed:e-t.stretch,stretch:t.stretch}),i.push({fixed:e-t.stretch,stretch:t.stretch+(r-e)});}return i.push({fixed:e+1,stretch:r}),i}function hc(t,e,r,i){return t/e*r+i}function pc(t,e,r,i){return t-e*r/i}oc.loadGlyphRange=function(t,e,r,i,n){const s=256*e,a=s+255,o=i.transformRequest(i.normalizeGlyphsURL(r).replace("{fontstack}",t).replace("{range}",`${s}-${a}`),vt.Glyphs);kt(o,(t,e)=>{if(t)n(t);else if(e){const t={};for(const r of function(t){return new ou(t).readFields(Su,[])}(e))t[r.id]=r;n(null,t);}});},oc.TinySDF=tc;class dc{constructor(t=[],e=fc){if(this.data=t,this.length=this.data.length,this.compare=e,this.length>0)for(let t=(this.length>>1)-1;t>=0;t--)this._down(t);}push(t){this.data.push(t),this.length++,this._up(this.length-1);}pop(){if(0===this.length)return;const t=this.data[0],e=this.data.pop();return this.length--,this.length>0&&(this.data[0]=e,this._down(0)),t}peek(){return this.data[0]}_up(t){const{data:e,compare:r}=this,i=e[t];for(;t>0;){const n=t-1>>1,s=e[n];if(r(i,s)>=0)break;e[t]=s,t=n;}e[t]=i;}_down(t){const{data:e,compare:r}=this,i=this.length>>1,n=e[t];for(;t<i;){let i=1+(t<<1),s=e[i];const a=i+1;if(a<this.length&&r(e[a],s)<0&&(i=a,s=e[a]),r(s,n)>=0)break;e[t]=s,t=i;}e[t]=n;}}function fc(t,e){return t<e?-1:t>e?1:0}function yc(t,e=1,r=!1){let n=1/0,s=1/0,a=-1/0,o=-1/0;const l=t[0];for(let t=0;t<l.length;t++){const e=l[t];(!t||e.x<n)&&(n=e.x),(!t||e.y<s)&&(s=e.y),(!t||e.x>a)&&(a=e.x),(!t||e.y>o)&&(o=e.y);}const u=Math.min(a-n,o-s);let c=u/2;const h=new dc([],mc);if(0===u)return new i(n,s);for(let e=n;e<a;e+=u)for(let r=s;r<o;r+=u)h.push(new gc(e+c,r+c,c,t));let p=function(t){let e=0,r=0,i=0;const n=t[0];for(let t=0,s=n.length,a=s-1;t<s;a=t++){const s=n[t],o=n[a],l=s.x*o.y-o.x*s.y;r+=(s.x+o.x)*l,i+=(s.y+o.y)*l,e+=3*l;}return new gc(r/e,i/e,0,t)}(t),d=h.length;for(;h.length;){const i=h.pop();(i.d>p.d||!p.d)&&(p=i,r&&console.log("found best %d after %d probes",Math.round(1e4*i.d)/1e4,d)),i.max-p.d<=e||(c=i.h/2,h.push(new gc(i.p.x-c,i.p.y-c,c,t)),h.push(new gc(i.p.x+c,i.p.y-c,c,t)),h.push(new gc(i.p.x-c,i.p.y+c,c,t)),h.push(new gc(i.p.x+c,i.p.y+c,c,t)),d+=4);}return r&&(console.log(`num probes: ${d}`),console.log(`best distance: ${p.d}`)),p.p}function mc(t,e){return e.max-t.max}function gc(t,e,r,n){this.p=new i(t,e),this.h=r,this.d=function(t,e){let r=!1,i=1/0;for(let n=0;n<e.length;n++){const s=e[n];for(let e=0,n=s.length,a=n-1;e<n;a=e++){const n=s[e],o=s[a];n.y>t.y!=o.y>t.y&&t.x<(o.x-n.x)*(t.y-n.y)/(o.y-n.y)+n.x&&(r=!r),i=Math.min(i,Ea(t,n,o));}}return (r?1:-1)*Math.sqrt(i)}(this.p,n),this.max=this.d+this.h*Math.SQRT2;}const xc=Number.POSITIVE_INFINITY;function vc(t,e){return e[1]!==xc?function(t,e,r){let i=0,n=0;switch(e=Math.abs(e),r=Math.abs(r),t){case"top-right":case"top-left":case"top":n=r-7;break;case"bottom-right":case"bottom-left":case"bottom":n=7-r;}switch(t){case"top-right":case"bottom-right":case"right":i=-e;break;case"top-left":case"bottom-left":case"left":i=e;}return [i,n]}(t,e[0],e[1]):function(t,e){let r=0,i=0;e<0&&(e=0);const n=e/Math.sqrt(2);switch(t){case"top-right":case"top-left":i=n-7;break;case"bottom-right":case"bottom-left":i=7-n;break;case"bottom":i=7-e;break;case"top":i=e-7;}switch(t){case"top-right":case"bottom-right":r=-n;break;case"top-left":case"bottom-left":r=n;break;case"left":r=e;break;case"right":r=-e;}return [r,i]}(t,e[0])}function bc(t,e,r,i,n,s,a,o){t.createArrays(),t.tilePixelRatio=8192/(512*t.overscaling),t.compareText={},t.iconsNeedLinear=!1;const l=t.layers[0].layout,u=t.layers[0]._unevaluatedLayout._values,c={};if("composite"===t.textSizeData.kind){const{minZoom:e,maxZoom:r}=t.textSizeData;c.compositeTextSizes=[u["text-size"].possiblyEvaluate(new qn(e),a),u["text-size"].possiblyEvaluate(new qn(r),a)];}if("composite"===t.iconSizeData.kind){const{minZoom:e,maxZoom:r}=t.iconSizeData;c.compositeIconSizes=[u["icon-size"].possiblyEvaluate(new qn(e),a),u["icon-size"].possiblyEvaluate(new qn(r),a)];}c.layoutTextSize=u["text-size"].possiblyEvaluate(new qn(o+1),a),c.layoutIconSize=u["icon-size"].possiblyEvaluate(new qn(o+1),a),c.textMaxSize=u["text-size"].possiblyEvaluate(new qn(18),a);const h=24*l.get("text-line-height"),p="map"===l.get("text-rotation-alignment")&&"point"!==l.get("symbol-placement"),d=l.get("text-keep-upright"),f=l.get("text-size");for(const s of t.features){const o=l.get("text-font").evaluate(s,{},a).join(","),u=f.evaluate(s,{},a),y=c.layoutTextSize.evaluate(s,{},a),m=(c.layoutIconSize.evaluate(s,{},a),{horizontal:{},vertical:void 0}),g=s.text;let x,v=[0,0];if(g){const i=g.toString(),c=24*l.get("text-letter-spacing").evaluate(s,{},a),f=In(i)?c:0,x=l.get("text-anchor").evaluate(s,{},a),b=l.get("text-variable-anchor");if(!b){const t=l.get("text-radial-offset").evaluate(s,{},a);v=t?vc(x,[24*t,xc]):l.get("text-offset").evaluate(s,{},a).map(t=>24*t);}let w=p?"center":l.get("text-justify").evaluate(s,{},a);const _=l.get("symbol-placement"),k="point"===_?24*l.get("text-max-width").evaluate(s,{},a):0,A=()=>{t.allowVerticalPlacement&&Sn(i)&&(m.vertical=Pu(g,e,r,n,o,k,h,x,"left",f,v,Bu.vertical,!0,_,y,u));};if(!p&&b){const t="auto"===w?b.map(t=>wc(t)):[w];let i=!1;for(let s=0;s<t.length;s++){const a=t[s];if(!m.horizontal[a])if(i)m.horizontal[a]=m.horizontal[0];else {const t=Pu(g,e,r,n,o,k,h,"center",a,f,v,Bu.horizontal,!1,_,y,u);t&&(m.horizontal[a]=t,i=1===t.positionedLines.length);}}A();}else {"auto"===w&&(w=wc(x));const t=Pu(g,e,r,n,o,k,h,x,w,f,v,Bu.horizontal,!1,_,y,u);t&&(m.horizontal[w]=t),A(),Sn(i)&&p&&d&&(m.vertical=Pu(g,e,r,n,o,k,h,x,w,f,v,Bu.vertical,!1,_,y,u));}}let b=!1;if(s.icon&&s.icon.name){const e=i[s.icon.name];e&&(x=ju(n[s.icon.name],l.get("icon-offset").evaluate(s,{},a),l.get("icon-anchor").evaluate(s,{},a)),b=e.sdf,void 0===t.sdfIcons?t.sdfIcons=e.sdf:t.sdfIcons!==e.sdf&&E("Style sheet warning: Cannot mix SDF and non-SDF icons in one buffer"),(e.pixelRatio!==t.pixelRatio||0!==l.get("icon-rotate").constantOr(1))&&(t.iconsNeedLinear=!0));}const w=Ac(m.horizontal)||m.vertical;t.iconsInText=!!w&&w.iconsInText,(w||x)&&_c(t,s,m,x,i,c,y,0,v,b,a);}s&&t.generateCollisionDebugBuffers(o,t.collisionBoxArray);}function wc(t){switch(t){case"right":case"top-right":case"bottom-right":return "right";case"left":case"top-left":case"bottom-left":return "left"}return "center"}function _c(t,e,r,i,n,s,a,o,l,u,h){let p=s.textMaxSize.evaluate(e,{},h);void 0===p&&(p=a);const d=t.layers[0].layout,f=d.get("icon-offset").evaluate(e,{},h),y=Ac(r.horizontal),m=a/24,g=t.tilePixelRatio*m,x=t.tilePixelRatio*p/24,v=t.tilePixelRatio*d.get("symbol-spacing"),b=d.get("text-padding")*t.tilePixelRatio,w=d.get("icon-padding")*t.tilePixelRatio,_=c(d.get("text-max-angle")),k="map"===d.get("text-rotation-alignment")&&"point"!==d.get("symbol-placement"),A="map"===d.get("icon-rotation-alignment")&&"point"!==d.get("symbol-placement"),S=d.get("symbol-placement"),I=v/2,T=d.get("icon-text-fit");let z;i&&"none"!==T&&(t.allowVerticalPlacement&&r.vertical&&(z=Gu(i,r.vertical,T,d.get("icon-text-fit-padding"),f,m)),y&&(i=Gu(i,y,T,d.get("icon-text-fit-padding"),f,m)));const M=(o,c)=>{c.x<0||c.x>=8192||c.y<0||c.y>=8192||function(t,e,r,i,n,s,a,o,l,u,c,h,p,d,f,y,m,g,x,v,b,w,_,k,A){const S=t.addToLineVertexArray(e,r);let I,T,z,M,B,D,C,P=0,V=0,F=0,R=0,L=-1,U=-1;const O={};let $=Gs(""),q=0,N=0;if(void 0===o._unevaluatedLayout.getValue("text-radial-offset")?[q,N]=o.layout.get("text-offset").evaluate(b,{},k).map(t=>24*t):(q=24*o.layout.get("text-radial-offset").evaluate(b,{},k),N=xc),t.allowVerticalPlacement&&i.vertical){const t=i.vertical;if(f)D=Ic(t),a&&(C=Ic(a));else {const r=o.layout.get("text-rotate").evaluate(b,{},k)+90;z=Sc(l,e,u,c,h,t,0,d,r),a&&(M=Sc(l,e,u,c,h,a,0,g,r));}}if(n){const r=o.layout.get("icon-rotate").evaluate(b,{},k),i="none"!==o.layout.get("icon-text-fit"),s=lc(n,r,_,i),p=a?lc(a,r,_,i):void 0;T=Sc(l,e,u,c,h,n,0,g,r),P=4*s.length;const d=t.iconSizeData;let f=null;"source"===d.kind?(f=[128*o.layout.get("icon-size").evaluate(b,{},k)],f[0]>32640&&E(`${t.layerIds[0]}: Value for "icon-size" is >= 255. Reduce your "icon-size".`)):"composite"===d.kind&&(f=[128*w.compositeIconSizes[0].evaluate(b,{},k),128*w.compositeIconSizes[1].evaluate(b,{},k)],(f[0]>32640||f[1]>32640)&&E(`${t.layerIds[0]}: Value for "icon-size" is >= 255. Reduce your "icon-size".`)),t.addSymbols(t.icon,s,f,v,x,b,!1,e,S.lineStartIndex,S.lineLength,-1,k),L=t.icon.placedSymbolArray.length-1,p&&(V=4*p.length,t.addSymbols(t.icon,p,f,v,x,b,Bu.vertical,e,S.lineStartIndex,S.lineLength,-1,k),U=t.icon.placedSymbolArray.length-1);}for(const r in i.horizontal){const n=i.horizontal[r];I||($=Gs(n.text),f?B=Ic(n):I=Sc(l,e,u,c,h,n,0,d,o.layout.get("text-rotate").evaluate(b,{},k)));const a=1===n.positionedLines.length;if(F+=kc(t,e,n,s,o,f,b,y,S,i.vertical?Bu.horizontal:Bu.horizontalOnly,a?Object.keys(i.horizontal):[r],O,L,w,k),a)break}i.vertical&&(R+=kc(t,e,i.vertical,s,o,f,b,y,S,Bu.vertical,["vertical"],O,U,w,k));let j=-1;const G=(t,e)=>t?Math.max(t,e):e;j=G(B,j),j=G(D,j),j=G(C,j);const Z=j>-1?1:0;Z&&(j*=A/24),t.glyphOffsetArray.length>=Vc.MAX_GLYPHS&&E("Too many glyphs being rendered in a tile. See https://github.com/mapbox/mapbox-gl-js/issues/2907"),void 0!==b.sortKey&&t.addToSortKeyRanges(t.symbolInstances.length,b.sortKey),t.symbolInstances.emplaceBack(e.x,e.y,O.right>=0?O.right:-1,O.center>=0?O.center:-1,O.left>=0?O.left:-1,O.vertical||-1,L,U,$,void 0!==I?I:t.collisionBoxArray.length,void 0!==I?I+1:t.collisionBoxArray.length,void 0!==z?z:t.collisionBoxArray.length,void 0!==z?z+1:t.collisionBoxArray.length,void 0!==T?T:t.collisionBoxArray.length,void 0!==T?T+1:t.collisionBoxArray.length,M||t.collisionBoxArray.length,M?M+1:t.collisionBoxArray.length,u,F,R,P,V,Z,0,p,q,N,j);}(t,c,o,r,i,n,z,t.layers[0],t.collisionBoxArray,e.index,e.sourceLayerIndex,t.index,g,b,k,l,0,w,A,f,e,s,u,h,a);};if("line"===S)for(const n of Qu(e.geometry,0,0,8192,8192)){const e=Ju(n,v,_,r.vertical||y,i,24,x,t.overscaling,8192);for(const r of e){const e=y;e&&Tc(t,e.text,I,r)||M(n,r);}}else if("line-center"===S){for(const t of e.geometry)if(t.length>1){const e=Wu(t,_,r.vertical||y,i,24,x);e&&M(t,e);}}else if("Polygon"===e.type)for(const t of al(e.geometry,0)){const e=yc(t,16);M(t[0],new Zu(e.x,e.y,0));}else if("LineString"===e.type)for(const t of e.geometry)M(t,new Zu(t[0].x,t[0].y,0));else if("Point"===e.type)for(const t of e.geometry)for(const e of t)M([e],new Zu(e.x,e.y,0));}function kc(t,e,r,n,s,a,o,l,u,c,h,p,d,f,y){const m=function(t,e,r,n,s,a,o,l){const u=n.layout.get("text-rotate").evaluate(a,{})*Math.PI/180,c=[];for(const t of e.positionedLines)for(const n of t.positionedGlyphs){if(!n.rect)continue;const a=n.rect||{};let h=4,p=!0,d=1,f=0;const y=(s||l)&&n.vertical,m=n.metrics.advance*n.scale/2;if(l&&e.verticalizable){const e=24*(n.scale-1),r=(24-n.metrics.width*n.scale)/2;f=t.lineOffset/2-(n.imageName?-r:e);}if(n.imageName){const t=o[n.imageName];p=t.sdf,d=t.pixelRatio,h=1/d;}const g=s?[n.x+m,n.y]:[0,0];let x=s?[0,0]:[n.x+m+r[0],n.y+r[1]-f],v=[0,0];y&&(v=x,x=[0,0]);const b=(n.metrics.left-h)*n.scale-m+x[0],w=(-n.metrics.top-h)*n.scale+x[1],_=b+a.w*n.scale/(d*(n.localGlyph?2:1)),k=w+a.h*n.scale/(d*(n.localGlyph?2:1)),A=new i(b,w),S=new i(_,w),I=new i(b,k),T=new i(_,k);if(y){const t=new i(-m,m- -17),e=-Math.PI/2,r=12-m,s=new i(22-r,-(n.imageName?r:0)),a=new i(...v);A._rotateAround(e,t)._add(s)._add(a),S._rotateAround(e,t)._add(s)._add(a),I._rotateAround(e,t)._add(s)._add(a),T._rotateAround(e,t)._add(s)._add(a);}if(u){const t=Math.sin(u),e=Math.cos(u),r=[e,-t,t,e];A._matMult(r),S._matMult(r),I._matMult(r),T._matMult(r);}const z=new i(0,0),E=new i(0,0);c.push({tl:A,tr:S,bl:I,br:T,tex:a,writingMode:e.writingMode,glyphOffset:g,sectionIndex:n.sectionIndex,isSDF:p,pixelOffsetTL:z,pixelOffsetBR:E,minFontScaleX:0,minFontScaleY:0});}return c}(0,r,l,s,a,o,n,t.allowVerticalPlacement),g=t.textSizeData;let x=null;"source"===g.kind?(x=[128*s.layout.get("text-size").evaluate(o,{},y)],x[0]>32640&&E(`${t.layerIds[0]}: Value for "text-size" is >= 255. Reduce your "text-size".`)):"composite"===g.kind&&(x=[128*f.compositeTextSizes[0].evaluate(o,{},y),128*f.compositeTextSizes[1].evaluate(o,{},y)],(x[0]>32640||x[1]>32640)&&E(`${t.layerIds[0]}: Value for "text-size" is >= 255. Reduce your "text-size".`)),t.addSymbols(t.text,m,x,l,a,o,c,e,u.lineStartIndex,u.lineLength,d,y);for(const e of h)p[e]=t.text.placedSymbolArray.length-1;return 4*m.length}function Ac(t){for(const e in t)return t[e];return null}function Sc(t,e,r,n,s,a,o,l,u){let h=a.top,p=a.bottom,d=a.left,f=a.right;const y=a.collisionPadding;if(y&&(d-=y[0],h-=y[1],f+=y[2],p+=y[3]),u){const t=new i(d,h),e=new i(f,h),r=new i(d,p),n=new i(f,p),s=c(u);t._rotate(s),e._rotate(s),r._rotate(s),n._rotate(s),d=Math.min(t.x,e.x,r.x,n.x),f=Math.max(t.x,e.x,r.x,n.x),h=Math.min(t.y,e.y,r.y,n.y),p=Math.max(t.y,e.y,r.y,n.y);}return t.emplaceBack(e.x,e.y,d,h,f,p,l,r,n,s),t.length-1}function Ic(t){t.collisionPadding&&(t.top-=t.collisionPadding[1],t.bottom+=t.collisionPadding[3]);const e=t.bottom-t.top;return e>0?Math.max(10,e):null}function Tc(t,e,r,i){const n=t.compareText;if(e in n){const t=n[e];for(let e=t.length-1;e>=0;e--)if(i.dist(t[e])<r)return !0}else n[e]=[];return n[e].push(i),!1}const zc=Al.VectorTileFeature.types,Ec=[{name:"a_fade_opacity",components:1,type:"Uint8",offset:0}];function Mc(t,e,r,i,n,s,a,o,l,u,c,h,p){const d=o?Math.min(32640,Math.round(o[0])):0,f=o?Math.min(32640,Math.round(o[1])):0;t.emplaceBack(e,r,Math.round(32*i),Math.round(32*n),s,a,(d<<1)+(l?1:0),f,16*u,16*c,256*h,256*p);}function Bc(t,e,r){t.emplaceBack(e.x,e.y,r),t.emplaceBack(e.x,e.y,r),t.emplaceBack(e.x,e.y,r),t.emplaceBack(e.x,e.y,r);}function Dc(t){for(const e of t.sections)if(Dn(e.text))return !0;return !1}class Cc{constructor(t){this.layoutVertexArray=new fs,this.indexArray=new ws,this.programConfigurations=t,this.segments=new ya,this.dynamicLayoutVertexArray=new ys,this.opacityVertexArray=new ms,this.placedSymbolArray=new Cs;}isEmpty(){return 0===this.layoutVertexArray.length&&0===this.indexArray.length&&0===this.dynamicLayoutVertexArray.length&&0===this.opacityVertexArray.length}upload(t,e,r,i){this.isEmpty()||(r&&(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,Xl.members),this.indexBuffer=t.createIndexBuffer(this.indexArray,e),this.dynamicLayoutVertexBuffer=t.createVertexBuffer(this.dynamicLayoutVertexArray,Kl.members,!0),this.opacityVertexBuffer=t.createVertexBuffer(this.opacityVertexArray,Ec,!0),this.opacityVertexBuffer.itemSize=1),(r||i)&&this.programConfigurations.upload(t));}destroy(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy(),this.dynamicLayoutVertexBuffer.destroy(),this.opacityVertexBuffer.destroy());}}Gi("SymbolBuffers",Cc);class Pc{constructor(t,e,r){this.layoutVertexArray=new t,this.layoutAttributes=e,this.indexArray=new r,this.segments=new ya,this.collisionVertexArray=new bs,this.collisionVertexArrayExt=new ys;}upload(t){this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,this.layoutAttributes),this.indexBuffer=t.createIndexBuffer(this.indexArray),this.collisionVertexBuffer=t.createVertexBuffer(this.collisionVertexArray,Hl.members,!0),this.collisionVertexBufferExt=t.createVertexBuffer(this.collisionVertexArrayExt,Yl.members,!0);}destroy(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.segments.destroy(),this.collisionVertexBuffer.destroy(),this.collisionVertexBufferExt.destroy());}}Gi("CollisionBuffers",Pc);class Vc{constructor(t){this.collisionBoxArray=t.collisionBoxArray,this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map(t=>t.id),this.index=t.index,this.pixelRatio=t.pixelRatio,this.sourceLayerIndex=t.sourceLayerIndex,this.hasPattern=!1,this.hasRTLText=!1,this.sortKeyRanges=[],this.collisionCircleArray=[],this.placementInvProjMatrix=qa([]),this.placementViewportMatrix=qa([]);const e=this.layers[0]._unevaluatedLayout._values;this.textSizeData=Ql(this.zoom,e["text-size"]),this.iconSizeData=Ql(this.zoom,e["icon-size"]);const r=this.layers[0].layout,i=r.get("symbol-sort-key"),n=r.get("symbol-z-order");this.canOverlap=r.get("text-allow-overlap")||r.get("icon-allow-overlap")||r.get("text-ignore-placement")||r.get("icon-ignore-placement"),this.sortFeaturesByKey="viewport-y"!==n&&void 0!==i.constantOr(1),this.sortFeaturesByY=("viewport-y"===n||"auto"===n&&!this.sortFeaturesByKey)&&this.canOverlap,"point"===r.get("symbol-placement")&&(this.writingModes=r.get("text-writing-mode").map(t=>Bu[t])),this.stateDependentLayerIds=this.layers.filter(t=>t.isStateDependent()).map(t=>t.id),this.sourceID=t.sourceID;}createArrays(){this.text=new Cc(new ua(this.layers,this.zoom,t=>/^text/.test(t))),this.icon=new Cc(new ua(this.layers,this.zoom,t=>/^icon/.test(t))),this.glyphOffsetArray=new Fs,this.lineVertexArray=new Rs,this.symbolInstances=new Vs;}calculateGlyphDependencies(t,e,r,i,n){for(let s=0;s<t.length;s++)if(e[t.charCodeAt(s)]=!0,(r||i)&&n){const r=nu[t.charAt(s)];r&&(e[r.charCodeAt(0)]=!0);}}populate(t,e,r){const i=this.layers[0],n=i.layout,s=n.get("text-font"),a=n.get("text-field"),o=n.get("icon-image"),l=("constant"!==a.value.kind||a.value.value instanceof he&&!a.value.value.isEmpty()||a.value.value.toString().length>0)&&("constant"!==s.value.kind||s.value.value.length>0),u="constant"!==o.value.kind||!!o.value.value||Object.keys(o.parameters).length>0,c=n.get("symbol-sort-key");if(this.features=[],!l&&!u)return;const h=e.iconDependencies,p=e.glyphDependencies,d=e.availableImages,f=new qn(this.zoom);for(const{feature:e,id:a,index:o,sourceLayerIndex:y}of t){const t=i._featureFilter.needGeometry,m=va(e,t);if(!i._featureFilter.filter(f,m,r))continue;let g,x;if(t||(m.geometry=xa(e)),l){const t=i.getValueAndResolveTokens("text-field",m,r,d),e=he.factory(t);Dc(e)&&(this.hasRTLText=!0),(!this.hasRTLText||"unavailable"===Un()||this.hasRTLText&&$n.isParsed())&&(g=iu(e,i,m));}if(u){const t=i.getValueAndResolveTokens("icon-image",m,r,d);x=t instanceof pe?t:pe.fromString(t);}if(!g&&!x)continue;const v=this.sortFeaturesByKey?c.evaluate(m,{},r):void 0;if(this.features.push({id:a,text:g,icon:x,index:o,sourceLayerIndex:y,geometry:m.geometry,properties:e.properties,type:zc[e.type],sortKey:v}),x&&(h[x.name]=!0),g){const t=s.evaluate(m,{},r).join(","),e="map"===n.get("text-rotation-alignment")&&"point"!==n.get("symbol-placement");this.allowVerticalPlacement=this.writingModes&&this.writingModes.indexOf(Bu.vertical)>=0;for(const r of g.sections)if(r.image)h[r.image.name]=!0;else {const i=Sn(g.toString()),n=r.fontStack||t,s=p[n]=p[n]||{};this.calculateGlyphDependencies(r.text,s,e,this.allowVerticalPlacement,i);}}}"line"===n.get("symbol-placement")&&(this.features=function(t){const e={},r={},i=[];let n=0;function s(e){i.push(t[e]),n++;}function a(t,e,n){const s=r[t];return delete r[t],r[e]=s,i[s].geometry[0].pop(),i[s].geometry[0]=i[s].geometry[0].concat(n[0]),s}function o(t,r,n){const s=e[r];return delete e[r],e[t]=s,i[s].geometry[0].shift(),i[s].geometry[0]=n[0].concat(i[s].geometry[0]),s}function l(t,e,r){const i=r?e[0][e[0].length-1]:e[0][0];return `${t}:${i.x}:${i.y}`}for(let u=0;u<t.length;u++){const c=t[u],h=c.geometry,p=c.text?c.text.toString():null;if(!p){s(u);continue}const d=l(p,h),f=l(p,h,!0);if(d in r&&f in e&&r[d]!==e[f]){const t=o(d,f,h),n=a(d,f,i[t].geometry);delete e[d],delete r[f],r[l(p,i[n].geometry,!0)]=n,i[t].geometry=null;}else d in r?a(d,f,h):f in e?o(d,f,h):(s(u),e[d]=n-1,r[f]=n-1);}return i.filter(t=>t.geometry)}(this.features)),this.sortFeaturesByKey&&this.features.sort((t,e)=>t.sortKey-e.sortKey);}update(t,e,r){this.stateDependentLayers.length&&(this.text.programConfigurations.updatePaintArrays(t,e,this.layers,r),this.icon.programConfigurations.updatePaintArrays(t,e,this.layers,r));}isEmpty(){return 0===this.symbolInstances.length&&!this.hasRTLText}uploadPending(){return !this.uploaded||this.text.programConfigurations.needsUpload||this.icon.programConfigurations.needsUpload}upload(t){!this.uploaded&&this.hasDebugData()&&(this.textCollisionBox.upload(t),this.iconCollisionBox.upload(t)),this.text.upload(t,this.sortFeaturesByY,!this.uploaded,this.text.programConfigurations.needsUpload),this.icon.upload(t,this.sortFeaturesByY,!this.uploaded,this.icon.programConfigurations.needsUpload),this.uploaded=!0;}destroyDebugData(){this.textCollisionBox.destroy(),this.iconCollisionBox.destroy();}destroy(){this.text.destroy(),this.icon.destroy(),this.hasDebugData()&&this.destroyDebugData();}addToLineVertexArray(t,e){const r=this.lineVertexArray.length;if(void 0!==t.segment){let r=t.dist(e[t.segment+1]),i=t.dist(e[t.segment]);const n={};for(let i=t.segment+1;i<e.length;i++)n[i]={x:e[i].x,y:e[i].y,tileUnitDistanceFromAnchor:r},i<e.length-1&&(r+=e[i+1].dist(e[i]));for(let r=t.segment||0;r>=0;r--)n[r]={x:e[r].x,y:e[r].y,tileUnitDistanceFromAnchor:i},r>0&&(i+=e[r-1].dist(e[r]));for(let t=0;t<e.length;t++){const e=n[t];this.lineVertexArray.emplaceBack(e.x,e.y,e.tileUnitDistanceFromAnchor);}}return {lineStartIndex:r,lineLength:this.lineVertexArray.length-r}}addSymbols(t,e,r,i,n,s,a,o,l,u,c,h){const p=t.indexArray,d=t.layoutVertexArray,f=t.segments.prepareSegment(4*e.length,d,p,this.canOverlap?s.sortKey:void 0),y=this.glyphOffsetArray.length,m=f.vertexLength,g=this.allowVerticalPlacement&&a===Bu.vertical?Math.PI/2:0,x=s.text&&s.text.sections;for(let i=0;i<e.length;i++){const{tl:n,tr:a,bl:l,br:u,tex:c,pixelOffsetTL:y,pixelOffsetBR:m,minFontScaleX:v,minFontScaleY:b,glyphOffset:w,isSDF:_,sectionIndex:k}=e[i],A=f.vertexLength,S=w[1];Mc(d,o.x,o.y,n.x,S+n.y,c.x,c.y,r,_,y.x,y.y,v,b),Mc(d,o.x,o.y,a.x,S+a.y,c.x+c.w,c.y,r,_,m.x,y.y,v,b),Mc(d,o.x,o.y,l.x,S+l.y,c.x,c.y+c.h,r,_,y.x,m.y,v,b),Mc(d,o.x,o.y,u.x,S+u.y,c.x+c.w,c.y+c.h,r,_,m.x,m.y,v,b),Bc(t.dynamicLayoutVertexArray,o,g),p.emplaceBack(A,A+1,A+2),p.emplaceBack(A+1,A+2,A+3),f.vertexLength+=4,f.primitiveLength+=2,this.glyphOffsetArray.emplaceBack(w[0]),i!==e.length-1&&k===e[i+1].sectionIndex||t.programConfigurations.populatePaintArrays(d.length,s,s.index,{},h,x&&x[k]);}t.placedSymbolArray.emplaceBack(o.x,o.y,y,this.glyphOffsetArray.length-y,m,l,u,o.segment,r?r[0]:0,r?r[1]:0,i[0],i[1],a,0,!1,0,c);}_commitLayoutVertex(t,e,r,i,n){t.emplaceBack(e.x,e.y,r,i,Math.round(n.x),Math.round(n.y));}_addCollisionDebugVertices(t,e,r,n,s){const a=r.segments.prepareSegment(4,r.layoutVertexArray,r.indexArray),o=a.vertexLength,l=s.anchorX,u=s.anchorY;for(let t=0;t<4;t++)r.collisionVertexArray.emplaceBack(0,0,0,0);r.collisionVertexArrayExt.emplaceBack(e,-t.padding,-t.padding),r.collisionVertexArrayExt.emplaceBack(e,t.padding,-t.padding),r.collisionVertexArrayExt.emplaceBack(e,t.padding,t.padding),r.collisionVertexArrayExt.emplaceBack(e,-t.padding,t.padding),this._commitLayoutVertex(r.layoutVertexArray,n,l,u,new i(t.x1,t.y1)),this._commitLayoutVertex(r.layoutVertexArray,n,l,u,new i(t.x2,t.y1)),this._commitLayoutVertex(r.layoutVertexArray,n,l,u,new i(t.x2,t.y2)),this._commitLayoutVertex(r.layoutVertexArray,n,l,u,new i(t.x1,t.y2)),a.vertexLength+=4;const c=r.indexArray;c.emplaceBack(o,o+1),c.emplaceBack(o+1,o+2),c.emplaceBack(o+2,o+3),c.emplaceBack(o+3,o),a.primitiveLength+=4;}_addTextDebugCollisionBoxes(t,e,r,i,n,s){for(let a=i;a<n;a++){const i=r.get(a),n=this.getSymbolInstanceTextSize(t,s,e,a);this._addCollisionDebugVertices(i,n,this.textCollisionBox,i.anchorPoint,s);}}_addIconDebugCollisionBoxes(t,e,r,i,n,s){for(let a=i;a<n;a++){const i=r.get(a),n=this.getSymbolInstanceIconSize(t,e,a);this._addCollisionDebugVertices(i,n,this.iconCollisionBox,i.anchorPoint,s);}}generateCollisionDebugBuffers(t,e){this.hasDebugData()&&this.destroyDebugData(),this.textCollisionBox=new Pc(xs,Wl.members,Ts),this.iconCollisionBox=new Pc(xs,Wl.members,Ts);const r=eu(this.iconSizeData,t),i=eu(this.textSizeData,t);for(let n=0;n<this.symbolInstances.length;n++){const s=this.symbolInstances.get(n);this._addTextDebugCollisionBoxes(i,t,e,s.textBoxStartIndex,s.textBoxEndIndex,s),this._addTextDebugCollisionBoxes(i,t,e,s.verticalTextBoxStartIndex,s.verticalTextBoxEndIndex,s),this._addIconDebugCollisionBoxes(r,t,e,s.iconBoxStartIndex,s.iconBoxEndIndex,s),this._addIconDebugCollisionBoxes(r,t,e,s.verticalIconBoxStartIndex,s.verticalIconBoxEndIndex,s);}}getSymbolInstanceTextSize(t,e,r,i){const n=this.text.placedSymbolArray.get(e.rightJustifiedTextSymbolIndex>=0?e.rightJustifiedTextSymbolIndex:e.centerJustifiedTextSymbolIndex>=0?e.centerJustifiedTextSymbolIndex:e.leftJustifiedTextSymbolIndex>=0?e.leftJustifiedTextSymbolIndex:e.verticalPlacedTextSymbolIndex>=0?e.verticalPlacedTextSymbolIndex:i),s=tu(this.textSizeData,t,n)/24;return this.tilePixelRatio*s}getSymbolInstanceIconSize(t,e,r){const i=this.icon.placedSymbolArray.get(r),n=tu(this.iconSizeData,t,i);return this.tilePixelRatio*n}_commitDebugCollisionVertexUpdate(t,e,r){t.emplaceBack(e,-r,-r),t.emplaceBack(e,r,-r),t.emplaceBack(e,r,r),t.emplaceBack(e,-r,r);}_updateTextDebugCollisionBoxes(t,e,r,i,n,s){for(let a=i;a<n;a++){const i=r.get(a),n=this.getSymbolInstanceTextSize(t,s,e,a);this._commitDebugCollisionVertexUpdate(this.textCollisionBox.collisionVertexArrayExt,n,i.padding);}}_updateIconDebugCollisionBoxes(t,e,r,i,n){for(let s=i;s<n;s++){const i=r.get(s),n=this.getSymbolInstanceIconSize(t,e,s);this._commitDebugCollisionVertexUpdate(this.iconCollisionBox.collisionVertexArrayExt,n,i.padding);}}updateCollisionDebugBuffers(t,e){if(!this.hasDebugData())return;this.hasTextCollisionBoxData()&&this.textCollisionBox.collisionVertexArrayExt.clear(),this.hasIconCollisionBoxData()&&this.iconCollisionBox.collisionVertexArrayExt.clear();const r=eu(this.iconSizeData,t),i=eu(this.textSizeData,t);for(let n=0;n<this.symbolInstances.length;n++){const s=this.symbolInstances.get(n);this._updateTextDebugCollisionBoxes(i,t,e,s.textBoxStartIndex,s.textBoxEndIndex,s),this._updateTextDebugCollisionBoxes(i,t,e,s.verticalTextBoxStartIndex,s.verticalTextBoxEndIndex,s),this._updateIconDebugCollisionBoxes(r,t,e,s.iconBoxStartIndex,s.iconBoxEndIndex),this._updateIconDebugCollisionBoxes(r,t,e,s.verticalIconBoxStartIndex,s.verticalIconBoxEndIndex);}this.hasTextCollisionBoxData()&&this.textCollisionBox.collisionVertexBufferExt&&this.textCollisionBox.collisionVertexBufferExt.updateData(this.textCollisionBox.collisionVertexArrayExt),this.hasIconCollisionBoxData()&&this.iconCollisionBox.collisionVertexBufferExt&&this.iconCollisionBox.collisionVertexBufferExt.updateData(this.iconCollisionBox.collisionVertexArrayExt);}_deserializeCollisionBoxesForSymbol(t,e,r,i,n,s,a,o,l){const u={};for(let i=e;i<r;i++){const e=t.get(i);u.textBox={x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2,padding:e.padding,anchorPointX:e.anchorPointX,anchorPointY:e.anchorPointY},u.textFeatureIndex=e.featureIndex;break}for(let e=i;e<n;e++){const r=t.get(e);u.verticalTextBox={x1:r.x1,y1:r.y1,x2:r.x2,y2:r.y2,padding:r.padding,anchorPointX:r.anchorPointX,anchorPointY:r.anchorPointY},u.verticalTextFeatureIndex=r.featureIndex;break}for(let e=s;e<a;e++){const r=t.get(e);u.iconBox={x1:r.x1,y1:r.y1,x2:r.x2,y2:r.y2,padding:r.padding,anchorPointX:r.anchorPointX,anchorPointY:r.anchorPointY},u.iconFeatureIndex=r.featureIndex;break}for(let e=o;e<l;e++){const r=t.get(e);u.verticalIconBox={x1:r.x1,y1:r.y1,x2:r.x2,y2:r.y2,padding:r.padding,anchorPointX:r.anchorPointX,anchorPointY:r.anchorPointY},u.verticalIconFeatureIndex=r.featureIndex;break}return u}deserializeCollisionBoxes(t){this.collisionArrays=[];for(let e=0;e<this.symbolInstances.length;e++){const r=this.symbolInstances.get(e);this.collisionArrays.push(this._deserializeCollisionBoxesForSymbol(t,r.textBoxStartIndex,r.textBoxEndIndex,r.verticalTextBoxStartIndex,r.verticalTextBoxEndIndex,r.iconBoxStartIndex,r.iconBoxEndIndex,r.verticalIconBoxStartIndex,r.verticalIconBoxEndIndex));}}hasTextData(){return this.text.segments.get().length>0}hasIconData(){return this.icon.segments.get().length>0}hasDebugData(){return this.textCollisionBox&&this.iconCollisionBox}hasTextCollisionBoxData(){return this.hasDebugData()&&this.textCollisionBox.segments.get().length>0}hasIconCollisionBoxData(){return this.hasDebugData()&&this.iconCollisionBox.segments.get().length>0}addIndicesForPlacedSymbol(t,e){const r=t.placedSymbolArray.get(e),i=r.vertexStartIndex+4*r.numGlyphs;for(let e=r.vertexStartIndex;e<i;e+=4)t.indexArray.emplaceBack(e,e+1,e+2),t.indexArray.emplaceBack(e+1,e+2,e+3);}getSortedSymbolIndexes(t){if(this.sortedAngle===t&&void 0!==this.symbolInstanceIndexes)return this.symbolInstanceIndexes;const e=Math.sin(t),r=Math.cos(t),i=[],n=[],s=[];for(let t=0;t<this.symbolInstances.length;++t){s.push(t);const a=this.symbolInstances.get(t);i.push(0|Math.round(e*a.anchorX+r*a.anchorY)),n.push(a.featureIndex);}return s.sort((t,e)=>i[t]-i[e]||n[e]-n[t]),s}addToSortKeyRanges(t,e){const r=this.sortKeyRanges[this.sortKeyRanges.length-1];r&&r.sortKey===e?r.symbolInstanceEnd=t+1:this.sortKeyRanges.push({sortKey:e,symbolInstanceStart:t,symbolInstanceEnd:t+1});}sortFeatures(t){if(this.sortFeaturesByY&&this.sortedAngle!==t&&!(this.text.segments.get().length>1||this.icon.segments.get().length>1)){this.symbolInstanceIndexes=this.getSortedSymbolIndexes(t),this.sortedAngle=t,this.text.indexArray.clear(),this.icon.indexArray.clear(),this.featureSortOrder=[];for(const t of this.symbolInstanceIndexes){const e=this.symbolInstances.get(t);this.featureSortOrder.push(e.featureIndex),[e.rightJustifiedTextSymbolIndex,e.centerJustifiedTextSymbolIndex,e.leftJustifiedTextSymbolIndex].forEach((t,e,r)=>{t>=0&&r.indexOf(t)===e&&this.addIndicesForPlacedSymbol(this.text,t);}),e.verticalPlacedTextSymbolIndex>=0&&this.addIndicesForPlacedSymbol(this.text,e.verticalPlacedTextSymbolIndex),e.placedIconSymbolIndex>=0&&this.addIndicesForPlacedSymbol(this.icon,e.placedIconSymbolIndex),e.verticalPlacedIconSymbolIndex>=0&&this.addIndicesForPlacedSymbol(this.icon,e.verticalPlacedIconSymbolIndex);}this.text.indexBuffer&&this.text.indexBuffer.updateData(this.text.indexArray),this.icon.indexBuffer&&this.icon.indexBuffer.updateData(this.icon.indexArray);}}}Gi("SymbolBucket",Vc,{omit:["layers","collisionBoxArray","features","compareText"]}),Vc.MAX_GLYPHS=65535,Vc.addDynamicAttributes=Bc;const Fc=new rs({"symbol-placement":new Wn(Ft.layout_symbol["symbol-placement"]),"symbol-spacing":new Wn(Ft.layout_symbol["symbol-spacing"]),"symbol-avoid-edges":new Wn(Ft.layout_symbol["symbol-avoid-edges"]),"symbol-sort-key":new Jn(Ft.layout_symbol["symbol-sort-key"]),"symbol-z-order":new Wn(Ft.layout_symbol["symbol-z-order"]),"icon-allow-overlap":new Wn(Ft.layout_symbol["icon-allow-overlap"]),"icon-ignore-placement":new Wn(Ft.layout_symbol["icon-ignore-placement"]),"icon-optional":new Wn(Ft.layout_symbol["icon-optional"]),"icon-rotation-alignment":new Wn(Ft.layout_symbol["icon-rotation-alignment"]),"icon-size":new Jn(Ft.layout_symbol["icon-size"]),"icon-text-fit":new Wn(Ft.layout_symbol["icon-text-fit"]),"icon-text-fit-padding":new Wn(Ft.layout_symbol["icon-text-fit-padding"]),"icon-image":new Jn(Ft.layout_symbol["icon-image"]),"icon-rotate":new Jn(Ft.layout_symbol["icon-rotate"]),"icon-padding":new Wn(Ft.layout_symbol["icon-padding"]),"icon-keep-upright":new Wn(Ft.layout_symbol["icon-keep-upright"]),"icon-offset":new Jn(Ft.layout_symbol["icon-offset"]),"icon-anchor":new Jn(Ft.layout_symbol["icon-anchor"]),"icon-pitch-alignment":new Wn(Ft.layout_symbol["icon-pitch-alignment"]),"text-pitch-alignment":new Wn(Ft.layout_symbol["text-pitch-alignment"]),"text-rotation-alignment":new Wn(Ft.layout_symbol["text-rotation-alignment"]),"text-field":new Jn(Ft.layout_symbol["text-field"]),"text-font":new Jn(Ft.layout_symbol["text-font"]),"text-size":new Jn(Ft.layout_symbol["text-size"]),"text-max-width":new Jn(Ft.layout_symbol["text-max-width"]),"text-line-height":new Wn(Ft.layout_symbol["text-line-height"]),"text-letter-spacing":new Jn(Ft.layout_symbol["text-letter-spacing"]),"text-justify":new Jn(Ft.layout_symbol["text-justify"]),"text-radial-offset":new Jn(Ft.layout_symbol["text-radial-offset"]),"text-variable-anchor":new Wn(Ft.layout_symbol["text-variable-anchor"]),"text-anchor":new Jn(Ft.layout_symbol["text-anchor"]),"text-max-angle":new Wn(Ft.layout_symbol["text-max-angle"]),"text-writing-mode":new Wn(Ft.layout_symbol["text-writing-mode"]),"text-rotate":new Jn(Ft.layout_symbol["text-rotate"]),"text-padding":new Wn(Ft.layout_symbol["text-padding"]),"text-keep-upright":new Wn(Ft.layout_symbol["text-keep-upright"]),"text-transform":new Jn(Ft.layout_symbol["text-transform"]),"text-offset":new Jn(Ft.layout_symbol["text-offset"]),"text-allow-overlap":new Wn(Ft.layout_symbol["text-allow-overlap"]),"text-ignore-placement":new Wn(Ft.layout_symbol["text-ignore-placement"]),"text-optional":new Wn(Ft.layout_symbol["text-optional"])});var Rc={paint:new rs({"icon-opacity":new Jn(Ft.paint_symbol["icon-opacity"]),"icon-color":new Jn(Ft.paint_symbol["icon-color"]),"icon-halo-color":new Jn(Ft.paint_symbol["icon-halo-color"]),"icon-halo-width":new Jn(Ft.paint_symbol["icon-halo-width"]),"icon-halo-blur":new Jn(Ft.paint_symbol["icon-halo-blur"]),"icon-translate":new Wn(Ft.paint_symbol["icon-translate"]),"icon-translate-anchor":new Wn(Ft.paint_symbol["icon-translate-anchor"]),"text-opacity":new Jn(Ft.paint_symbol["text-opacity"]),"text-color":new Jn(Ft.paint_symbol["text-color"],{runtimeType:Kt,getOverride:t=>t.textColor,hasOverride:t=>!!t.textColor}),"text-halo-color":new Jn(Ft.paint_symbol["text-halo-color"]),"text-halo-width":new Jn(Ft.paint_symbol["text-halo-width"]),"text-halo-blur":new Jn(Ft.paint_symbol["text-halo-blur"]),"text-translate":new Wn(Ft.paint_symbol["text-translate"]),"text-translate-anchor":new Wn(Ft.paint_symbol["text-translate-anchor"])}),layout:Fc};class Lc{constructor(t){this.type=t.property.overrides?t.property.overrides.runtimeType:jt,this.defaultValue=t;}evaluate(t){if(t.formattedSection){const e=this.defaultValue.property.overrides;if(e&&e.hasOverride(t.formattedSection))return e.getOverride(t.formattedSection)}return t.feature&&t.featureState?this.defaultValue.evaluate(t.feature,t.featureState):this.defaultValue.property.specification.default}eachChild(t){this.defaultValue.isConstant()||t(this.defaultValue.value._styleExpression.expression);}outputDefined(){return !1}serialize(){return null}}Gi("FormatSectionOverride",Lc,{omit:["defaultValue"]});class Uc extends pa{constructor(t){super(t,Rc);}recalculate(t,e){if(super.recalculate(t,e),"auto"===this.layout.get("icon-rotation-alignment")&&(this.layout._values["icon-rotation-alignment"]="point"!==this.layout.get("symbol-placement")?"map":"viewport"),"auto"===this.layout.get("text-rotation-alignment")&&(this.layout._values["text-rotation-alignment"]="point"!==this.layout.get("symbol-placement")?"map":"viewport"),"auto"===this.layout.get("text-pitch-alignment")&&(this.layout._values["text-pitch-alignment"]=this.layout.get("text-rotation-alignment")),"auto"===this.layout.get("icon-pitch-alignment")&&(this.layout._values["icon-pitch-alignment"]=this.layout.get("icon-rotation-alignment")),"point"===this.layout.get("symbol-placement")){const t=this.layout.get("text-writing-mode");if(t){const e=[];for(const r of t)e.indexOf(r)<0&&e.push(r);this.layout._values["text-writing-mode"]=e;}else this.layout._values["text-writing-mode"]=["horizontal"];}this._setPaintOverrides();}getValueAndResolveTokens(t,e,r,i){const n=this.layout.get(t).evaluate(e,{},r,i),s=this._unevaluatedLayout._values[t];return s.isDataDriven()||Jr(s.value)||!n?n:function(t,e){return e.replace(/{([^{}]+)}/g,(e,r)=>r in t?String(t[r]):"")}(e.properties,n)}createBucket(t){return new Vc(t)}queryRadius(){return 0}queryIntersectsFeature(){return !1}_setPaintOverrides(){for(const t of Rc.paint.overridableProperties){if(!Uc.hasPaintOverride(this.layout,t))continue;const e=this.paint.get(t),r=new Lc(e),i=new Wr(r,e.property.specification);let n=null;n="constant"===e.value.kind||"source"===e.value.kind?new ti("source",i):new ei("composite",i,e.value.zoomStops,e.value._interpolationType),this.paint._values[t]=new Hn(e.property,n,e.parameters);}}_handleOverridablePaintPropertyUpdate(t,e,r){return !(!this.layout||e.isDataDriven()||r.isDataDriven())&&Uc.hasPaintOverride(this.layout,t)}static hasPaintOverride(t,e){const r=t.get("text-field"),i=Rc.paint.properties[e];let n=!1;const s=t=>{for(const e of t)if(i.overrides&&i.overrides.hasOverride(e))return void(n=!0)};if("constant"===r.value.kind&&r.value.value instanceof he)s(r.value.value.sections);else if("source"===r.value.kind){const t=e=>{n||(e instanceof ge&&ye(e.value)===Jt?s(e.value.sections):e instanceof we?s(e.sections):e.eachChild(t));},e=r.value;e._styleExpression&&t(e._styleExpression.expression);}return n}getProgramConfiguration(t){return new la(this,t)}}var Oc={paint:new rs({"background-color":new Wn(Ft.paint_background["background-color"]),"background-pattern":new ts(Ft.paint_background["background-pattern"]),"background-opacity":new Wn(Ft.paint_background["background-opacity"])})},$c={paint:new rs({"raster-opacity":new Wn(Ft.paint_raster["raster-opacity"]),"raster-hue-rotate":new Wn(Ft.paint_raster["raster-hue-rotate"]),"raster-brightness-min":new Wn(Ft.paint_raster["raster-brightness-min"]),"raster-brightness-max":new Wn(Ft.paint_raster["raster-brightness-max"]),"raster-saturation":new Wn(Ft.paint_raster["raster-saturation"]),"raster-contrast":new Wn(Ft.paint_raster["raster-contrast"]),"raster-resampling":new Wn(Ft.paint_raster["raster-resampling"]),"raster-fade-duration":new Wn(Ft.paint_raster["raster-fade-duration"])})};class qc extends pa{constructor(t){super(t,{}),this.implementation=t;}is3D(){return "3d"===this.implementation.renderingMode}hasOffscreenPass(){return void 0!==this.implementation.prerender}recalculate(){}updateTransitions(){}hasTransition(){}serialize(){}onAdd(t){this.implementation.onAdd&&this.implementation.onAdd(t,t.painter.context.gl);}onRemove(t){this.implementation.onRemove&&this.implementation.onRemove(t,t.painter.context.gl);}}var Nc={paint:new rs({"sky-type":new Wn(Ft.paint_sky["sky-type"]),"sky-atmosphere-sun":new Wn(Ft.paint_sky["sky-atmosphere-sun"]),"sky-atmosphere-sun-intensity":new Wn(Ft.paint_sky["sky-atmosphere-sun-intensity"]),"sky-gradient-center":new Wn(Ft.paint_sky["sky-gradient-center"]),"sky-gradient-radius":new Wn(Ft.paint_sky["sky-gradient-radius"]),"sky-gradient":new es(Ft.paint_sky["sky-gradient"]),"sky-atmosphere-halo-color":new Wn(Ft.paint_sky["sky-atmosphere-halo-color"]),"sky-atmosphere-color":new Wn(Ft.paint_sky["sky-atmosphere-color"]),"sky-opacity":new Wn(Ft.paint_sky["sky-opacity"])})};function jc(t,e,r){const i=Ka(0,0,1),n=uo(lo());return function(t,e,r){r*=.5;var i=e[0],n=e[1],s=e[2],a=e[3],o=Math.sin(r),l=Math.cos(r);t[0]=i*l-s*o,t[1]=n*l+a*o,t[2]=s*l+i*o,t[3]=a*l-n*o;}(n,n,r?-c(t)+Math.PI:c(t)),co(n,n,-c(e)),io(i,i,n),Qa(i,i)}const Gc={circle:class extends pa{constructor(t){super(t,Ua);}createBucket(t){return new wa(t)}queryRadius(t){const e=t;return Pa("circle-radius",this,e)+Pa("circle-stroke-width",this,e)+Va(this.paint.get("circle-translate"))}queryIntersectsFeature(t,e,r,i,n,s,a,o){const l="map"===this.paint.get("circle-pitch-alignment");if(l&&t.queryGeometry.isAboveHorizon)return !1;const u=Ra(this.paint.get("circle-translate"),this.paint.get("circle-translate-anchor"),s.angle,t.pixelToTileUnitsFactor),c=this.paint.get("circle-radius").evaluate(e,r)+this.paint.get("circle-stroke-width").evaluate(e,r),h=l?c*t.pixelToTileUnitsFactor:c;for(const e of i)for(const r of e){const e=r.add(u),i=o&&s.elevation?s.elevation.exaggeration()*o.getElevationAt(e.x,e.y,!0):0,n=l?e:fo(e,i,a),c=l?t.tilespaceRays.map(t=>go(t,i)):t.queryGeometry.screenGeometry;let p=h;const d=oo([],[r.x,r.y,i,1],a);if("viewport"===this.paint.get("circle-pitch-scale")&&"map"===this.paint.get("circle-pitch-alignment")?p*=d[3]/s.cameraToCenterDistance:"map"===this.paint.get("circle-pitch-scale")&&"viewport"===this.paint.get("circle-pitch-alignment")&&(p*=s.cameraToCenterDistance/d[3]),ka(c,n,p))return !0}return !1}getProgramIds(){return ["circle"]}getProgramConfiguration(t){return new la(this,t)}},heatmap:class extends pa{createBucket(t){return new xo(t)}constructor(t){super(t,Ao),this._updateColorRamp();}_handleSpecialPaintPropertyUpdate(t){"heatmap-color"===t&&this._updateColorRamp();}_updateColorRamp(){this.colorRamp=So({expression:this._transitionablePaint._values["heatmap-color"].value.expression,evaluationKey:"heatmapDensity",image:this.colorRamp}),this.colorRampTexture=null;}resize(){this.heatmapFbo&&(this.heatmapFbo.destroy(),this.heatmapFbo=null);}queryRadius(){return 0}queryIntersectsFeature(){return !1}hasOffscreenPass(){return 0!==this.paint.get("heatmap-opacity")&&"none"!==this.visibility}getProgramIds(){return ["heatmap","heatmapTexture"]}getProgramConfiguration(t){return new la(this,t)}},hillshade:class extends pa{constructor(t){super(t,Io);}hasOffscreenPass(){return 0!==this.paint.get("hillshade-exaggeration")&&"none"!==this.visibility}getProgramIds(){return ["hillshade","hillshadePrepare"]}getProgramConfiguration(t){return new la(this,t)}},fill:class extends pa{constructor(t){super(t,pl);}getProgramIds(){const t=this.paint.get("fill-pattern"),e=t&&t.constantOr(1),r=[e?"fillPattern":"fill"];return this.paint.get("fill-antialias")&&r.push(e&&!this.getPaintProperty("fill-outline-color")?"fillOutlinePattern":"fillOutline"),r}getProgramConfiguration(t){return new la(this,t)}recalculate(t,e){super.recalculate(t,e);const r=this.paint._values["fill-outline-color"];"constant"===r.value.kind&&void 0===r.value.value&&(this.paint._values["fill-outline-color"]=this.paint._values["fill-color"]);}createBucket(t){return new cl(t)}queryRadius(){return Va(this.paint.get("fill-translate"))}queryIntersectsFeature(t,e,r,i,n,s){return !t.queryGeometry.isAboveHorizon&&Aa(Fa(t.tilespaceGeometry,this.paint.get("fill-translate"),this.paint.get("fill-translate-anchor"),s.angle,t.pixelToTileUnitsFactor),i)}isTileClipped(){return !0}},"fill-extrusion":class extends pa{constructor(t){super(t,Bl);}createBucket(t){return new El(t)}queryRadius(){return Va(this.paint.get("fill-extrusion-translate"))}is3D(){return !0}getProgramIds(){return [this.paint.get("fill-extrusion-pattern").constantOr(1)?"fillExtrusionPattern":"fillExtrusion"]}getProgramConfiguration(t){return new la(this,t)}queryIntersectsFeature(t,e,r,n,s,a,o,l,u){const c=Ra(this.paint.get("fill-extrusion-translate"),this.paint.get("fill-extrusion-translate-anchor"),a.angle,t.pixelToTileUnitsFactor),h=this.paint.get("fill-extrusion-height").evaluate(e,r),p=this.paint.get("fill-extrusion-base").evaluate(e,r),d=[0,0],f=l&&a.elevation,y=a.elevation?a.elevation.exaggeration():1;if(f){const e=t.tile.getBucket(this).centroidVertexArray,r=u+1;if(r<e.length){const t=e.get(r);d[0]=t.a_centroid_pos0,d[1]=t.a_centroid_pos1;}}if(0===d[0]&&1===d[1])return !1;const m=function(t,e,r,n,s,a,o,l,u){return a?function(t,e,r,i,n,s,a,o,l){const u=[],c=[],h=[0,0,0];for(const p of t){const t=[],d=[];for(const u of p){const c=u.x+i.x,p=u.y+i.y,f=Vl(c,p,e,r,s,a,o,l);h[0]=c,h[1]=p,h[2]=f.base;const y=Pl(ro(h,h,n));h[0]=c,h[1]=p,h[2]=f.top;const m=Pl(ro(h,h,n));t.push(y),d.push(m);}u.push(t),c.push(d);}return [u,c]}(t,e,r,n,s,a,o,l,u):function(t,e,r,n,s){const a=[],o=[],l=s[8]*e,u=s[9]*e,c=s[10]*e,h=s[11]*e,p=s[8]*r,d=s[9]*r,f=s[10]*r,y=s[11]*r;for(const e of t){const t=[],r=[];for(const a of e){const e=a.x+n.x,o=a.y+n.y,m=s[0]*e+s[4]*o+s[12],g=s[1]*e+s[5]*o+s[13],x=s[2]*e+s[6]*o+s[14],v=s[3]*e+s[7]*o+s[15],b=x+c,w=v+h,_=m+p,k=g+d,A=x+f,S=v+y,I=new i((m+l)/w,(g+u)/w);I.z=b/w,t.push(I);const T=new i(_/S,k/S);T.z=A/S,r.push(T);}a.push(t),o.push(r);}return [a,o]}(t,e,r,n,s)}(n,p,h,c,o,f?l:null,d,y,a.center.lat),g=t.queryGeometry;return function(t,e,r){let i=1/0;Aa(r,e)&&(i=Cl(r,e[0]));for(let n=0;n<e.length;n++){const s=e[n],a=t[n];for(let t=0;t<s.length-1;t++){const e=s[t],n=[e,s[t+1],a[t+1],a[t],e];_a(r,n)&&(i=Math.min(i,Cl(r,n)));}}return i!==1/0&&i}(m[0],m[1],g.isPointQuery()?g.screenBounds:g.screenGeometry)}},line:class extends pa{constructor(t){super(t,jl),this.gradientVersion=0;}_handleSpecialPaintPropertyUpdate(t){"line-gradient"===t&&(this.stepInterpolant=this._transitionablePaint._values["line-gradient"].value.expression._styleExpression.expression instanceof We,this.gradientVersion=(this.gradientVersion+1)%o);}gradientExpression(){return this._transitionablePaint._values["line-gradient"].value.expression}recalculate(t,e){super.recalculate(t,e),this.paint._values["line-floorwidth"]=Gl.possiblyEvaluate(this._transitioningPaint._values["line-width"].value,t);}createBucket(t){return new ql(t)}getProgramIds(){const t=this.paint.get("line-dasharray"),e=this.paint.get("line-pattern").constantOr(1),r=this.paint.get("line-gradient");return [e?"linePattern":t?"lineSDF":r?"lineGradient":"line"]}getProgramConfiguration(t){return new la(this,t)}queryRadius(t){const e=t,r=Zl(Pa("line-width",this,e),Pa("line-gap-width",this,e)),i=Pa("line-offset",this,e);return r/2+Math.abs(i)+Va(this.paint.get("line-translate"))}queryIntersectsFeature(t,e,r,n,s,a){if(t.queryGeometry.isAboveHorizon)return !1;const o=Fa(t.tilespaceGeometry,this.paint.get("line-translate"),this.paint.get("line-translate-anchor"),a.angle,t.pixelToTileUnitsFactor),l=t.pixelToTileUnitsFactor/2*Zl(this.paint.get("line-width").evaluate(e,r),this.paint.get("line-gap-width").evaluate(e,r)),u=this.paint.get("line-offset").evaluate(e,r);return u&&(n=function(t,e){const r=[],n=new i(0,0);for(let i=0;i<t.length;i++){const s=t[i],a=[];for(let t=0;t<s.length;t++){const r=s[t-1],i=s[t],o=s[t+1],l=0===t?n:i.sub(r)._unit()._perp(),u=t===s.length-1?n:o.sub(i)._unit()._perp(),c=l._add(u)._unit();c._mult(1/(c.x*u.x+c.y*u.y)),a.push(c._mult(e)._add(i));}r.push(a);}return r}(n,u*t.pixelToTileUnitsFactor)),function(t,e,r){for(let i=0;i<e.length;i++){const n=e[i];if(t.length>=3)for(let e=0;e<n.length;e++)if(Ba(t,n[e]))return !0;if(Sa(t,n,r))return !0}return !1}(o,n,l)}isTileClipped(){return !0}},symbol:Uc,background:class extends pa{constructor(t){super(t,Oc);}getProgramIds(){return [this.paint.get("background-pattern")?"backgroundPattern":"background"]}},raster:class extends pa{constructor(t){super(t,$c);}getProgramIds(){return ["raster"]}},sky:class extends pa{constructor(t){super(t,Nc),this._updateColorRamp();}_handleSpecialPaintPropertyUpdate(t){"sky-gradient"===t?this._updateColorRamp():"sky-atmosphere-sun"!==t&&"sky-atmosphere-halo-color"!==t&&"sky-atmosphere-color"!==t&&"sky-atmosphere-sun-intensity"!==t||(this._skyboxInvalidated=!0);}_updateColorRamp(){this.colorRamp=So({expression:this._transitionablePaint._values["sky-gradient"].value.expression,evaluationKey:"skyRadialProgress"}),this.colorRampTexture&&(this.colorRampTexture.destroy(),this.colorRampTexture=null);}needsSkyboxCapture(t){if(this._skyboxInvalidated||!this.skyboxTexture||!this.skyboxGeometry)return !0;if(!this.paint.get("sky-atmosphere-sun")){const e=t.style.light.properties.get("position");return this._lightPosition.azimuthal!==e.azimuthal||this._lightPosition.polar!==e.polar}}getCenter(t,e){const r=this.paint.get("sky-type");if("atmosphere"===r){const r=this.paint.get("sky-atmosphere-sun"),i=!r,n=t.style.light,s=n.properties.get("position");return i&&"viewport"===n.properties.get("anchor")&&E("The sun direction is attached to a light with viewport anchor, lighting may behave unexpectedly."),i?jc(s.azimuthal,90-s.polar,e):jc(r[0],90-r[1],e)}if("gradient"===r){const t=this.paint.get("sky-gradient-center");return jc(t[0],90-t[1],e)}}is3D(){return !1}isSky(){return !0}markSkyboxValid(t){this._skyboxInvalidated=!1,this._lightPosition=t.style.light.properties.get("position");}hasOffscreenPass(){return !0}getProgramIds(){const t=this.paint.get("sky-type");return "atmosphere"===t?["skyboxCapture","skybox"]:"gradient"===t?["skyboxGradient"]:null}}},{HTMLImageElement:Zc,HTMLCanvasElement:Xc,HTMLVideoElement:Kc,ImageData:Hc,ImageBitmap:Yc}=s;class Wc{constructor(t,e,r,i){this.context=t,this.format=r,this.texture=t.gl.createTexture(),this.update(e,i);}update(t,e,r){const{width:i,height:n}=t,s=!(this.size&&this.size[0]===i&&this.size[1]===n||r),{context:a}=this,{gl:o}=a;if(this.useMipmap=Boolean(e&&e.useMipmap),o.bindTexture(o.TEXTURE_2D,this.texture),a.pixelStoreUnpackFlipY.set(!1),a.pixelStoreUnpack.set(1),a.pixelStoreUnpackPremultiplyAlpha.set(this.format===o.RGBA&&(!e||!1!==e.premultiply)),s)this.size=[i,n],t instanceof Zc||t instanceof Xc||t instanceof Kc||t instanceof Hc||Yc&&t instanceof Yc?o.texImage2D(o.TEXTURE_2D,0,this.format,this.format,o.UNSIGNED_BYTE,t):o.texImage2D(o.TEXTURE_2D,0,this.format,i,n,0,this.format,o.UNSIGNED_BYTE,t.data);else {const{x:e,y:s}=r||{x:0,y:0};t instanceof Zc||t instanceof Xc||t instanceof Kc||t instanceof Hc||Yc&&t instanceof Yc?o.texSubImage2D(o.TEXTURE_2D,0,e,s,o.RGBA,o.UNSIGNED_BYTE,t):o.texSubImage2D(o.TEXTURE_2D,0,e,s,i,n,o.RGBA,o.UNSIGNED_BYTE,t.data);}this.useMipmap&&this.isSizePowerOfTwo()&&o.generateMipmap(o.TEXTURE_2D);}bind(t,e,r){const{context:i}=this,{gl:n}=i;n.bindTexture(n.TEXTURE_2D,this.texture),r!==n.LINEAR_MIPMAP_NEAREST||this.isSizePowerOfTwo()||(r=n.LINEAR),t!==this.filter&&(n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,t),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,r||t),this.filter=t),e!==this.wrap&&(n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,e),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,e),this.wrap=e);}isSizePowerOfTwo(){return this.size[0]===this.size[1]&&Math.log(this.size[0])/Math.LN2%1==0}destroy(){const{gl:t}=this.context;t.deleteTexture(this.texture),this.texture=null;}}class Jc{constructor(t){this._callback=t,this._triggered=!1,"undefined"!=typeof MessageChannel&&(this._channel=new MessageChannel,this._channel.port2.onmessage=()=>{this._triggered=!1,this._callback();});}trigger(){this._triggered||(this._triggered=!0,this._channel?this._channel.port1.postMessage(!0):setTimeout(()=>{this._triggered=!1,this._callback();},0));}remove(){delete this._channel,this._callback=()=>{};}}const Qc=s.performance;class th{constructor(t){this._marks={start:[t.url,"start"].join("#"),end:[t.url,"end"].join("#"),measure:t.url.toString()},Qc.mark(this._marks.start);}finish(){Qc.mark(this._marks.end);let t=Qc.getEntriesByName(this._marks.measure);return 0===t.length&&(Qc.measure(this._marks.measure,this._marks.start,this._marks.end),t=Qc.getEntriesByName(this._marks.measure),Qc.clearMarks(this._marks.start),Qc.clearMarks(this._marks.end),Qc.clearMeasures(this._marks.measure)),t}}class eh{constructor(){this.tasks={},this.taskQueue=[],k(["process"],this),this.invoker=new Jc(this.process),this.nextId=0;}add(t,e){const r=this.nextId++;return this.tasks[r]={fn:t,metadata:e,priority:rh(e),id:r},this.taskQueue.push(r),this.invoker.trigger(),{cancel:()=>{delete this.tasks[r];}}}process(){D();try{if(this.taskQueue=this.taskQueue.filter(t=>!!this.tasks[t]),!this.taskQueue.length)return;const t=this.pick();if(null===t)return;const e=this.tasks[t];if(delete this.tasks[t],this.taskQueue.length&&this.invoker.trigger(),!e)return;e.fn();}finally{}}pick(){let t=null,e=1/0;for(let r=0;r<this.taskQueue.length;r++){const i=this.tasks[this.taskQueue[r]];i.priority<e&&(e=i.priority,t=r);}if(null===t)return null;const r=this.taskQueue[t];return this.taskQueue.splice(t,1),r}remove(){this.invoker.remove();}}function rh({type:t,isSymbolTile:e,zoom:r}){return r=r||0,"message"===t?0:"maybePrepare"!==t||e?"parseTile"!==t||e?"parseTile"===t&&e?300-r:"maybePrepare"===t&&e?400-r:500:200-r:100-r}class ih{constructor(t,e){t&&(e?this.setSouthWest(t).setNorthEast(e):4===t.length?this.setSouthWest([t[0],t[1]]).setNorthEast([t[2],t[3]]):this.setSouthWest(t[0]).setNorthEast(t[1]));}setNorthEast(t){return this._ne=t instanceof nh?new nh(t.lng,t.lat):nh.convert(t),this}setSouthWest(t){return this._sw=t instanceof nh?new nh(t.lng,t.lat):nh.convert(t),this}extend(t){const e=this._sw,r=this._ne;let i,n;if(t instanceof nh)i=t,n=t;else {if(!(t instanceof ih))return Array.isArray(t)?4===t.length||t.every(Array.isArray)?this.extend(ih.convert(t)):this.extend(nh.convert(t)):this;if(i=t._sw,n=t._ne,!i||!n)return this}return e||r?(e.lng=Math.min(i.lng,e.lng),e.lat=Math.min(i.lat,e.lat),r.lng=Math.max(n.lng,r.lng),r.lat=Math.max(n.lat,r.lat)):(this._sw=new nh(i.lng,i.lat),this._ne=new nh(n.lng,n.lat)),this}getCenter(){return new nh((this._sw.lng+this._ne.lng)/2,(this._sw.lat+this._ne.lat)/2)}getSouthWest(){return this._sw}getNorthEast(){return this._ne}getNorthWest(){return new nh(this.getWest(),this.getNorth())}getSouthEast(){return new nh(this.getEast(),this.getSouth())}getWest(){return this._sw.lng}getSouth(){return this._sw.lat}getEast(){return this._ne.lng}getNorth(){return this._ne.lat}toArray(){return [this._sw.toArray(),this._ne.toArray()]}toString(){return `LngLatBounds(${this._sw.toString()}, ${this._ne.toString()})`}isEmpty(){return !(this._sw&&this._ne)}contains(t){const{lng:e,lat:r}=nh.convert(t);let i=this._sw.lng<=e&&e<=this._ne.lng;return this._sw.lng>this._ne.lng&&(i=this._sw.lng>=e&&e>=this._ne.lng),this._sw.lat<=r&&r<=this._ne.lat&&i}static convert(t){return !t||t instanceof ih?t:new ih(t)}}class nh{constructor(t,e){if(isNaN(t)||isNaN(e))throw new Error(`Invalid LngLat object: (${t}, ${e})`);if(this.lng=+t,this.lat=+e,this.lat>90||this.lat<-90)throw new Error("Invalid LngLat latitude value: must be between -90 and 90")}wrap(){return new nh(y(this.lng,-180,180),this.lat)}toArray(){return [this.lng,this.lat]}toString(){return `LngLat(${this.lng}, ${this.lat})`}distanceTo(t){const e=Math.PI/180,r=this.lat*e,i=t.lat*e,n=Math.sin(r)*Math.sin(i)+Math.cos(r)*Math.cos(i)*Math.cos((t.lng-this.lng)*e);return 6371008.8*Math.acos(Math.min(n,1))}toBounds(t=0){const e=360*t/40075017,r=e/Math.cos(Math.PI/180*this.lat);return new ih(new nh(this.lng-r,this.lat-e),new nh(this.lng+r,this.lat+e))}static convert(t){if(t instanceof nh)return t;if(Array.isArray(t)&&(2===t.length||3===t.length))return new nh(Number(t[0]),Number(t[1]));if(!Array.isArray(t)&&"object"==typeof t&&null!==t)return new nh(Number("lng"in t?t.lng:t.lon),Number(t.lat));throw new Error("`LngLatLike` argument must be specified as a LngLat instance, an object {lng: <lng>, lat: <lat>}, an object {lon: <lng>, lat: <lat>}, or an array of [<lng>, <lat>]")}}const sh=2*Math.PI*6371008.8;function ah(t){return sh*Math.cos(t*Math.PI/180)}function oh(t){return (180+t)/360}function lh(t){return (180-180/Math.PI*Math.log(Math.tan(Math.PI/4+t*Math.PI/360)))/360}function uh(t,e){return t/ah(e)}function ch(t){return 360/Math.PI*Math.atan(Math.exp((180-360*t)*Math.PI/180))-90}function hh(t,e){return t*ah(ch(e))}class ph{constructor(t,e,r=0){this.x=+t,this.y=+e,this.z=+r;}static fromLngLat(t,e=0){const r=nh.convert(t);return new ph(oh(r.lng),lh(r.lat),uh(e,r.lat))}toLngLat(){return new nh(360*this.x-180,ch(this.y))}toAltitude(){return hh(this.z,this.y)}meterInMercatorCoordinateUnits(){return 1/sh*(t=ch(this.y),1/Math.cos(t*Math.PI/180));var t;}}function dh(t,e,r){var i=2*Math.PI*6378137/256/Math.pow(2,r);return [t*i-2*Math.PI*6378137/2,e*i-2*Math.PI*6378137/2]}class fh{constructor(t,e,r){this.z=t,this.x=e,this.y=r,this.key=gh(0,t,t,e,r);}equals(t){return this.z===t.z&&this.x===t.x&&this.y===t.y}url(t,e){const r=(n=this.y,s=this.z,a=dh(256*(i=this.x),256*(n=Math.pow(2,s)-n-1),s),o=dh(256*(i+1),256*(n+1),s),a[0]+","+a[1]+","+o[0]+","+o[1]);var i,n,s,a,o;const l=function(t,e,r){let i,n="";for(let s=t;s>0;s--)i=1<<s-1,n+=(e&i?1:0)+(r&i?2:0);return n}(this.z,this.x,this.y);return t[(this.x+this.y)%t.length].replace("{prefix}",(this.x%16).toString(16)+(this.y%16).toString(16)).replace("{z}",String(this.z)).replace("{x}",String(this.x)).replace("{y}",String("tms"===e?Math.pow(2,this.z)-this.y-1:this.y)).replace("{quadkey}",l).replace("{bbox-epsg-3857}",r)}getTilePoint(t){const e=Math.pow(2,this.z);return new i(8192*(t.x*e-this.x),8192*(t.y*e-this.y))}getTileVec3(t){const e=Math.pow(2,this.z);return Ka(8192*(t.x*e-this.x),8192*(t.y*e-this.y),hh(t.z,t.y))}toString(){return `${this.z}/${this.x}/${this.y}`}}class yh{constructor(t,e){this.wrap=t,this.canonical=e,this.key=gh(t,e.z,e.z,e.x,e.y);}}class mh{constructor(t,e,r,i,n){this.overscaledZ=t,this.wrap=e,this.canonical=new fh(r,+i,+n),this.key=0===e&&t===r?this.canonical.key:gh(e,t,r,i,n);}equals(t){return this.overscaledZ===t.overscaledZ&&this.wrap===t.wrap&&this.canonical.equals(t.canonical)}scaledTo(t){const e=this.canonical.z-t;return t>this.canonical.z?new mh(t,this.wrap,this.canonical.z,this.canonical.x,this.canonical.y):new mh(t,this.wrap,t,this.canonical.x>>e,this.canonical.y>>e)}calculateScaledKey(t,e=!0){if(this.overscaledZ===t&&e)return this.key;if(t>this.canonical.z)return gh(this.wrap*+e,t,this.canonical.z,this.canonical.x,this.canonical.y);{const r=this.canonical.z-t;return gh(this.wrap*+e,t,t,this.canonical.x>>r,this.canonical.y>>r)}}isChildOf(t){if(t.wrap!==this.wrap)return !1;const e=this.canonical.z-t.canonical.z;return 0===t.overscaledZ||t.overscaledZ<this.overscaledZ&&t.canonical.x===this.canonical.x>>e&&t.canonical.y===this.canonical.y>>e}children(t){if(this.overscaledZ>=t)return [new mh(this.overscaledZ+1,this.wrap,this.canonical.z,this.canonical.x,this.canonical.y)];const e=this.canonical.z+1,r=2*this.canonical.x,i=2*this.canonical.y;return [new mh(e,this.wrap,e,r,i),new mh(e,this.wrap,e,r+1,i),new mh(e,this.wrap,e,r,i+1),new mh(e,this.wrap,e,r+1,i+1)]}isLessThan(t){return this.wrap<t.wrap||!(this.wrap>t.wrap)&&(this.overscaledZ<t.overscaledZ||!(this.overscaledZ>t.overscaledZ)&&(this.canonical.x<t.canonical.x||!(this.canonical.x>t.canonical.x)&&this.canonical.y<t.canonical.y))}wrapped(){return new mh(this.overscaledZ,0,this.canonical.z,this.canonical.x,this.canonical.y)}unwrapTo(t){return new mh(this.overscaledZ,t,this.canonical.z,this.canonical.x,this.canonical.y)}overscaleFactor(){return Math.pow(2,this.overscaledZ-this.canonical.z)}toUnwrapped(){return new yh(this.wrap,this.canonical)}toString(){return `${this.overscaledZ}/${this.canonical.x}/${this.canonical.y}`}getTilePoint(t){return this.canonical.getTilePoint(new ph(t.x-this.wrap,t.y))}getTileVec3(t){return this.canonical.getTileVec3(new ph(t.x-this.wrap,t.y,t.z))}}function gh(t,e,r,i,n){const s=1<<Math.min(r,22);let a=s*(n%s)+i%s;return t&&r<22&&(a+=s*s*((t<0?-2*t-1:2*t)%(1<<2*(22-r)))),16*(32*a+r)+(e-r)}Gi("CanonicalTileID",fh),Gi("OverscaledTileID",mh,{omit:["posMatrix"]});class xh{constructor(t){this._stringToNumber={},this._numberToString=[];for(let e=0;e<t.length;e++){const r=t[e];this._stringToNumber[r]=e,this._numberToString[e]=r;}}encode(t){return this._stringToNumber[t]}decode(t){return this._numberToString[t]}}class vh{constructor(t,e,r,i,n){this.type="Feature",this._vectorTileFeature=t,t._z=e,t._x=r,t._y=i,this.properties=t.properties,this.id=n;}get geometry(){return void 0===this._geometry&&(this._geometry=this._vectorTileFeature.toGeoJSON(this._vectorTileFeature._x,this._vectorTileFeature._y,this._vectorTileFeature._z).geometry),this._geometry}set geometry(t){this._geometry=t;}toJSON(){const t={geometry:this.geometry};for(const e in this)"_geometry"!==e&&"_vectorTileFeature"!==e&&(t[e]=this[e]);return t}}var bh=os([{name:"a_pos",type:"Int16",components:2}]);class wh{constructor(t,e,r){this.tileID=t,this.uid=b(),this.uses=0,this.tileSize=e,this.tileZoom=r,this.buckets={},this.expirationTime=null,this.queryPadding=0,this.hasSymbolBuckets=!1,this.hasRTLText=!1,this.dependencies={},this.expiredRequestCount=0,this.state="loading";}registerFadeDuration(t){const e=t+this.timeAdded;e<$.now()||this.fadeEndTime&&e<this.fadeEndTime||(this.fadeEndTime=e);}wasRequested(){return "errored"===this.state||"loaded"===this.state||"reloading"===this.state}loadVectorData(t,e,r){if(this.hasData()&&this.unloadVectorData(),this.state="loaded",t){t.featureIndex&&(this.latestFeatureIndex=t.featureIndex,t.rawTileData?(this.latestRawTileData=t.rawTileData,this.latestFeatureIndex.rawTileData=t.rawTileData):this.latestRawTileData&&(this.latestFeatureIndex.rawTileData=this.latestRawTileData)),this.collisionBoxArray=t.collisionBoxArray,this.buckets=function(t,e){const r={};if(!e)return r;for(const i of t){const t=i.layerIds.map(t=>e.getLayer(t)).filter(Boolean);if(0!==t.length){i.layers=t,i.stateDependentLayerIds&&(i.stateDependentLayers=i.stateDependentLayerIds.map(e=>t.filter(t=>t.id===e)[0]));for(const e of t)r[e.id]=i;}}return r}(t.buckets,e.style),this.hasSymbolBuckets=!1;for(const t in this.buckets){const e=this.buckets[t];if(e instanceof Vc){if(this.hasSymbolBuckets=!0,!r)break;e.justReloaded=!0;}}if(this.hasRTLText=!1,this.hasSymbolBuckets)for(const t in this.buckets){const e=this.buckets[t];if(e instanceof Vc&&e.hasRTLText){this.hasRTLText=!0,$n.isLoading()||$n.isLoaded()||"deferred"!==Un()||On();break}}this.queryPadding=0;for(const t in this.buckets){const r=this.buckets[t];this.queryPadding=Math.max(this.queryPadding,e.style.getLayer(t).queryRadius(r));}t.imageAtlas&&(this.imageAtlas=t.imageAtlas),t.glyphAtlasImage&&(this.glyphAtlasImage=t.glyphAtlasImage);}else this.collisionBoxArray=new Bs;}unloadVectorData(){for(const t in this.buckets)this.buckets[t].destroy();this.buckets={},this.imageAtlasTexture&&this.imageAtlasTexture.destroy(),this.imageAtlas&&(this.imageAtlas=null),this.glyphAtlasTexture&&this.glyphAtlasTexture.destroy(),this.latestFeatureIndex=null,this.state="unloaded";}getBucket(t){return this.buckets[t.id]}upload(t){for(const e in this.buckets){const r=this.buckets[e];r.uploadPending()&&r.upload(t);}const e=t.gl;this.imageAtlas&&!this.imageAtlas.uploaded&&(this.imageAtlasTexture=new Wc(t,this.imageAtlas.image,e.RGBA),this.imageAtlas.uploaded=!0),this.glyphAtlasImage&&(this.glyphAtlasTexture=new Wc(t,this.glyphAtlasImage,e.ALPHA),this.glyphAtlasImage=null);}prepare(t){this.imageAtlas&&this.imageAtlas.patchUpdatedImages(t,this.imageAtlasTexture);}queryRenderedFeatures(t,e,r,i,n,s,a,o){return this.latestFeatureIndex&&this.latestFeatureIndex.rawTileData?this.latestFeatureIndex.query({tileResult:i,pixelPosMatrix:a,transform:s,params:n},t,e,r):{}}querySourceFeatures(t,e){const r=this.latestFeatureIndex;if(!r||!r.rawTileData)return;const i=r.loadVTLayers(),n=e?e.sourceLayer:"",s=i._geojsonTileLayer||i[n];if(!s)return;const a=pi(e&&e.filter),{z:o,x:l,y:u}=this.tileID.canonical,c={z:o,x:l,y:u};for(let e=0;e<s.length;e++){const i=s.feature(e);if(a.needGeometry){const t=va(i,!0);if(!a.filter(new qn(this.tileID.overscaledZ),t,this.tileID.canonical))continue}else if(!a.filter(new qn(this.tileID.overscaledZ),i))continue;const h=r.getId(i,n),p=new vh(i,o,l,u,h);p.tile=c,t.push(p);}}hasData(){return "loaded"===this.state||"reloading"===this.state||"expired"===this.state}patternsLoaded(){return this.imageAtlas&&!!Object.keys(this.imageAtlas.patternPositions).length}setExpiryData(t){const e=this.expirationTime;if(t.cacheControl){const e=C(t.cacheControl);e["max-age"]&&(this.expirationTime=Date.now()+1e3*e["max-age"]);}else t.expires&&(this.expirationTime=new Date(t.expires).getTime());if(this.expirationTime){const t=Date.now();let r=!1;if(this.expirationTime>t)r=!1;else if(e)if(this.expirationTime<e)r=!0;else {const i=this.expirationTime-e;i?this.expirationTime=t+Math.max(i,3e4):r=!0;}else r=!0;r?(this.expiredRequestCount++,this.state="expired"):this.expiredRequestCount=0;}}getExpiryTimeout(){if(this.expirationTime)return this.expiredRequestCount?1e3*(1<<Math.min(this.expiredRequestCount-1,31)):Math.min(this.expirationTime-(new Date).getTime(),Math.pow(2,31)-1)}setFeatureState(t,e){if(!this.latestFeatureIndex||!this.latestFeatureIndex.rawTileData||0===Object.keys(t).length)return;const r=this.latestFeatureIndex.loadVTLayers();for(const i in this.buckets){if(!e.style.hasLayer(i))continue;const n=this.buckets[i],s=n.layers[0].sourceLayer||"_geojsonTileLayer",a=r[s],o=t[s];if(!a||!o||0===Object.keys(o).length)continue;n.update(o,a,this.imageAtlas&&this.imageAtlas.patternPositions||{});const l=e&&e.style&&e.style.getLayer(i);l&&(this.queryPadding=Math.max(this.queryPadding,l.queryRadius(n)));}}holdingForFade(){return void 0!==this.symbolFadeHoldUntil}symbolFadeFinished(){return !this.symbolFadeHoldUntil||this.symbolFadeHoldUntil<$.now()}clearFadeHold(){this.symbolFadeHoldUntil=void 0;}setHoldDuration(t){this.symbolFadeHoldUntil=$.now()+t;}setDependencies(t,e){const r={};for(const t of e)r[t]=!0;this.dependencies[t]=r;}hasDependency(t,e){for(const r of t){const t=this.dependencies[r];if(t)for(const r of e)if(t[r])return !0}return !1}clearQueryDebugViz(){}}class _h{constructor(){this.state={},this.stateChanges={},this.deletedStates={};}updateState(t,e,r){const i=String(e);if(this.stateChanges[t]=this.stateChanges[t]||{},this.stateChanges[t][i]=this.stateChanges[t][i]||{},x(this.stateChanges[t][i],r),null===this.deletedStates[t]){this.deletedStates[t]={};for(const e in this.state[t])e!==i&&(this.deletedStates[t][e]=null);}else if(this.deletedStates[t]&&null===this.deletedStates[t][i]){this.deletedStates[t][i]={};for(const e in this.state[t][i])r[e]||(this.deletedStates[t][i][e]=null);}else for(const e in r)this.deletedStates[t]&&this.deletedStates[t][i]&&null===this.deletedStates[t][i][e]&&delete this.deletedStates[t][i][e];}removeFeatureState(t,e,r){if(null===this.deletedStates[t])return;const i=String(e);if(this.deletedStates[t]=this.deletedStates[t]||{},r&&void 0!==e)null!==this.deletedStates[t][i]&&(this.deletedStates[t][i]=this.deletedStates[t][i]||{},this.deletedStates[t][i][r]=null);else if(void 0!==e)if(this.stateChanges[t]&&this.stateChanges[t][i])for(r in this.deletedStates[t][i]={},this.stateChanges[t][i])this.deletedStates[t][i][r]=null;else this.deletedStates[t][i]=null;else this.deletedStates[t]=null;}getState(t,e){const r=String(e),i=x({},(this.state[t]||{})[r],(this.stateChanges[t]||{})[r]);if(null===this.deletedStates[t])return {};if(this.deletedStates[t]){const r=this.deletedStates[t][e];if(null===r)return {};for(const t in r)delete i[t];}return i}initializeTileState(t,e){t.setFeatureState(this.state,e);}coalesceChanges(t,e){const r={};for(const t in this.stateChanges){this.state[t]=this.state[t]||{};const e={};for(const r in this.stateChanges[t])this.state[t][r]||(this.state[t][r]={}),x(this.state[t][r],this.stateChanges[t][r]),e[r]=this.state[t][r];r[t]=e;}for(const t in this.deletedStates){this.state[t]=this.state[t]||{};const e={};if(null===this.deletedStates[t])for(const r in this.state[t])e[r]={},this.state[t][r]={};else for(const r in this.deletedStates[t]){if(null===this.deletedStates[t][r])this.state[t][r]={};else for(const e of Object.keys(this.deletedStates[t][r]))delete this.state[t][r][e];e[r]=this.state[t][r];}r[t]=r[t]||{},x(r[t],e);}if(this.stateChanges={},this.deletedStates={},0!==Object.keys(r).length)for(const i in t)t[i].setFeatureState(r,e);}}class kh{constructor(t){this.size=t,this.minimums=[],this.maximums=[],this.leaves=[];}getElevation(t,e){const r=this.toIdx(t,e);return {min:this.minimums[r],max:this.maximums[r]}}isLeaf(t,e){return this.leaves[this.toIdx(t,e)]}toIdx(t,e){return e*this.size+t}}function Ah(t,e,r,i){let n=0,s=Number.MAX_VALUE;for(let a=0;a<3;a++)if(Math.abs(i[a])<1e-15){if(r[a]<t[a]||r[a]>e[a])return null}else {const o=1/i[a];let l=(t[a]-r[a])*o,u=(e[a]-r[a])*o;if(l>u){const t=l;l=u,u=t;}if(l>n&&(n=l),u<s&&(s=u),n>s)return null}return n}function Sh(t,e,r,i,n,s,a,o,l,u,c){const h=i-t,p=n-e,d=s-r,f=a-t,y=o-e,m=l-r,g=c[1]*m-c[2]*y,x=c[2]*f-c[0]*m,v=c[0]*y-c[1]*f,b=h*g+p*x+d*v;if(Math.abs(b)<1e-15)return null;const w=1/b,_=u[0]-t,k=u[1]-e,A=u[2]-r,S=(_*g+k*x+A*v)*w;if(S<0||S>1)return null;const I=k*d-A*p,T=A*h-_*d,z=_*p-k*h,E=(c[0]*I+c[1]*T+c[2]*z)*w;return E<0||S+E>1?null:(f*I+y*T+m*z)*w}function Ih(t,e,r){return (t-e)/(r-e)}function Th(t,e,r,i,n,s,a,o,l){const u=1<<r,c=s-i,h=a-n,p=(t+1)/u*c+i,d=(e+0)/u*h+n,f=(e+1)/u*h+n;o[0]=(t+0)/u*c+i,o[1]=d,l[0]=p,l[1]=f;}class zh{constructor(t){if(this.maximums=[],this.minimums=[],this.leaves=[],this.childOffsets=[],this.nodeCount=0,this.dem=t,this._siblingOffset=[[0,0],[1,0],[0,1],[1,1]],!this.dem)return;const e=function(t){const e=Math.ceil(Math.log2(t.dim/8)),r=[];let i=Math.ceil(Math.pow(2,e));const n=1/i,s=(t,e,r,i,n)=>{const s=i?1:0,a=(t+1)*r-s,o=e*r,l=(e+1)*r-s;n[0]=t*r,n[1]=o,n[2]=a,n[3]=l;};let a=new kh(i);const o=[];for(let e=0;e<i*i;e++){s(e%i,Math.floor(e/i),n,!1,o);const r=Mh(o[0],o[1],t),l=Mh(o[2],o[1],t),u=Mh(o[2],o[3],t),c=Mh(o[0],o[3],t);a.minimums.push(Math.min(r,l,u,c)),a.maximums.push(Math.max(r,l,u,c)),a.leaves.push(1);}for(r.push(a),i/=2;i>=1;i/=2){const t=r[r.length-1];a=new kh(i);for(let e=0;e<i*i;e++){s(e%i,Math.floor(e/i),2,!0,o);const r=t.getElevation(o[0],o[1]),n=t.getElevation(o[2],o[1]),l=t.getElevation(o[2],o[3]),u=t.getElevation(o[0],o[3]),c=t.isLeaf(o[0],o[1]),h=t.isLeaf(o[2],o[1]),p=t.isLeaf(o[2],o[3]),d=t.isLeaf(o[0],o[3]),f=Math.min(r.min,n.min,l.min,u.min),y=Math.max(r.max,n.max,l.max,u.max),m=c&&h&&p&&d;a.maximums.push(y),a.minimums.push(f),a.leaves.push(y-f<=5&&m?1:0);}r.push(a);}return r}(this.dem),r=e.length-1,i=e[r];this._addNode(i.minimums[0],i.maximums[0],i.leaves[0]),this._construct(e,0,0,r,0);}raycastRoot(t,e,r,i,n,s,a=1){return Ah([t,e,-100],[r,i,this.maximums[0]*a],n,s)}raycast(t,e,r,i,n,s,a=1){if(!this.nodeCount)return null;const o=this.raycastRoot(t,e,r,i,n,s,a);if(null==o)return null;const l=[],u=[],c=[],h=[],p=[{idx:0,t:o,nodex:0,nodey:0,depth:0}];for(;p.length>0;){const{idx:o,t:d,nodex:f,nodey:y,depth:m}=p.pop();if(this.leaves[o]){Th(f,y,m,t,e,r,i,c,h);const o=1<<m,l=(f+0)/o,u=(f+1)/o,p=(y+0)/o,g=(y+1)/o,x=Mh(l,p,this.dem)*a,v=Mh(u,p,this.dem)*a,b=Mh(u,g,this.dem)*a,w=Mh(l,g,this.dem)*a,_=Sh(c[0],c[1],x,h[0],c[1],v,h[0],h[1],b,n,s),k=Sh(h[0],h[1],b,c[0],h[1],w,c[0],c[1],x,n,s),A=Math.min(null!==_?_:Number.MAX_VALUE,null!==k?k:Number.MAX_VALUE);if(A!==Number.MAX_VALUE)return A;{const t=Ja([],n,s,d);if(Eh(x,v,w,b,Ih(t[0],c[0],h[0]),Ih(t[1],c[1],h[1]))>=t[2])return d}continue}let g=0;for(let p=0;p<this._siblingOffset.length;p++){Th((f<<1)+this._siblingOffset[p][0],(y<<1)+this._siblingOffset[p][1],m+1,t,e,r,i,c,h),c[2]=-100,h[2]=this.maximums[this.childOffsets[o]+p]*a;const d=Ah(c,h,n,s);if(null!=d){const t=d;l[p]=t;let e=!1;for(let r=0;r<g&&!e;r++)t>=l[u[r]]&&(u.splice(r,0,p),e=!0);e||(u[g]=p),g++;}}for(let t=0;t<g;t++){const e=u[t];p.push({idx:this.childOffsets[o]+e,t:l[e],nodex:(f<<1)+this._siblingOffset[e][0],nodey:(y<<1)+this._siblingOffset[e][1],depth:m+1});}}return null}_addNode(t,e,r){return this.minimums.push(t),this.maximums.push(e),this.leaves.push(r),this.childOffsets.push(0),this.nodeCount++}_construct(t,e,r,i,n){if(1===t[i].isLeaf(e,r))return;this.childOffsets[n]||(this.childOffsets[n]=this.nodeCount);const s=i-1,a=t[s];let o,l=0;for(let t=0;t<this._siblingOffset.length;t++){const i=2*e+this._siblingOffset[t][0],n=2*r+this._siblingOffset[t][1],s=a.getElevation(i,n),u=a.isLeaf(i,n),c=this._addNode(s.min,s.max,u);u&&(l|=1<<t),o||(o=c);}for(let i=0;i<this._siblingOffset.length;i++)l&1<<i||this._construct(t,2*e+this._siblingOffset[i][0],2*r+this._siblingOffset[i][1],s,o+i);}}function Eh(t,e,r,i,n,s){return Je(Je(t,r,s),Je(e,i,s),n)}function Mh(t,e,r){const i=r.dim,n=f(t*i-.5,0,i-1),s=f(e*i-.5,0,i-1),a=Math.floor(n),o=Math.floor(s),l=Math.min(a+1,i-1),u=Math.min(o+1,i-1);return Eh(r.get(a,o),r.get(l,o),r.get(a,u),r.get(l,u),n-a,s-o)}const Bh={mapbox:[6553.6,25.6,.1,1e4],terrarium:[256,1,1/256,32768]};class Dh{get tree(){return this._tree||this._buildQuadTree(),this._tree}constructor(t,e,r,i=!1,n=!1){if(this.uid=t,e.height!==e.width)throw new RangeError("DEM tiles must be square");if(r&&"mapbox"!==r&&"terrarium"!==r)return E(`"${r}" is not a valid encoding type. Valid types include "mapbox" and "terrarium".`);this.stride=e.height;const s=this.dim=e.height-2;if(this.data=new Uint32Array(e.data.buffer),this.encoding=r||"mapbox",this.borderReady=i,!i){for(let t=0;t<s;t++)this.data[this._idx(-1,t)]=this.data[this._idx(0,t)],this.data[this._idx(s,t)]=this.data[this._idx(s-1,t)],this.data[this._idx(t,-1)]=this.data[this._idx(t,0)],this.data[this._idx(t,s)]=this.data[this._idx(t,s-1)];this.data[this._idx(-1,-1)]=this.data[this._idx(0,0)],this.data[this._idx(s,-1)]=this.data[this._idx(s-1,0)],this.data[this._idx(-1,s)]=this.data[this._idx(0,s-1)],this.data[this._idx(s,s)]=this.data[this._idx(s-1,s-1)],n&&this._buildQuadTree();}}_buildQuadTree(){this._tree=new zh(this);}get(t,e,r=!1){const i=new Uint8Array(this.data.buffer);r&&(t=f(t,-1,this.dim),e=f(e,-1,this.dim));const n=4*this._idx(t,e);return ("terrarium"===this.encoding?this._unpackTerrarium:this._unpackMapbox)(i[n],i[n+1],i[n+2])}static getUnpackVector(t){return Bh[t]}get unpackVector(){return Bh[this.encoding]}_idx(t,e){if(t<-1||t>=this.dim+1||e<-1||e>=this.dim+1)throw new RangeError("out of range source coordinates for DEM data");return (e+1)*this.stride+(t+1)}_unpackMapbox(t,e,r){return (256*t*256+256*e+r)/10-1e4}_unpackTerrarium(t,e,r){return 256*t+e+r/256-32768}static pack(t,e){const r=[0,0,0,0],i=Dh.getUnpackVector(e);let n=Math.floor((t+i[3])/i[2]);return r[2]=n%256,n=Math.floor(n/256),r[1]=n%256,n=Math.floor(n/256),r[0]=n,r}getPixels(){return new ko({width:this.stride,height:this.stride},new Uint8Array(this.data.buffer))}backfillBorder(t,e,r){if(this.dim!==t.dim)throw new Error("dem dimension mismatch");let i=e*this.dim,n=e*this.dim+this.dim,s=r*this.dim,a=r*this.dim+this.dim;switch(e){case-1:i=n-1;break;case 1:n=i+1;}switch(r){case-1:s=a-1;break;case 1:a=s+1;}const o=-e*this.dim,l=-r*this.dim;for(let e=s;e<a;e++)for(let r=i;r<n;r++)this.data[this._idx(r,e)]=t.data[this._idx(r+o,e+l)];}onDeserialize(){this._tree&&(this._tree.dem=this);}}Gi("DEMData",Dh),Gi("DemMinMaxQuadTree",zh,{omit:["dem"]});class Ch{constructor(t,e){this.max=t,this.onRemove=e,this.reset();}reset(){for(const t in this.data)for(const e of this.data[t])e.timeout&&clearTimeout(e.timeout),this.onRemove(e.value);return this.data={},this.order=[],this}add(t,e,r){const i=t.wrapped().key;void 0===this.data[i]&&(this.data[i]=[]);const n={value:e,timeout:void 0};if(void 0!==r&&(n.timeout=setTimeout(()=>{this.remove(t,n);},r)),this.data[i].push(n),this.order.push(i),this.order.length>this.max){const t=this._getAndRemoveByKey(this.order[0]);t&&this.onRemove(t);}return this}has(t){return t.wrapped().key in this.data}getAndRemove(t){return this.has(t)?this._getAndRemoveByKey(t.wrapped().key):null}_getAndRemoveByKey(t){const e=this.data[t].shift();return e.timeout&&clearTimeout(e.timeout),0===this.data[t].length&&delete this.data[t],this.order.splice(this.order.indexOf(t),1),e.value}getByKey(t){const e=this.data[t];return e?e[0].value:null}get(t){return this.has(t)?this.data[t.wrapped().key][0].value:null}remove(t,e){if(!this.has(t))return this;const r=t.wrapped().key,i=void 0===e?0:this.data[r].indexOf(e),n=this.data[r][i];return this.data[r].splice(i,1),n.timeout&&clearTimeout(n.timeout),0===this.data[r].length&&delete this.data[r],this.onRemove(n.value),this.order.splice(this.order.indexOf(r),1),this}setMaxSize(t){for(this.max=t;this.order.length>this.max;){const t=this._getAndRemoveByKey(this.order[0]);t&&this.onRemove(t);}return this}filter(t){const e=[];for(const r in this.data)for(const i of this.data[r])t(i.value)||e.push(i);for(const t of e)this.remove(t.value.tileID,t);}}class Ph{constructor(t,e,r){this.context=t;const i=t.gl;this.buffer=i.createBuffer(),this.dynamicDraw=Boolean(r),this.context.unbindVAO(),t.bindElementBuffer.set(this.buffer),i.bufferData(i.ELEMENT_ARRAY_BUFFER,e.arrayBuffer,this.dynamicDraw?i.DYNAMIC_DRAW:i.STATIC_DRAW),this.dynamicDraw||delete e.arrayBuffer;}bind(){this.context.bindElementBuffer.set(this.buffer);}updateData(t){const e=this.context.gl;this.context.unbindVAO(),this.bind(),e.bufferSubData(e.ELEMENT_ARRAY_BUFFER,0,t.arrayBuffer);}destroy(){this.buffer&&(this.context.gl.deleteBuffer(this.buffer),delete this.buffer);}}const Vh={Int8:"BYTE",Uint8:"UNSIGNED_BYTE",Int16:"SHORT",Uint16:"UNSIGNED_SHORT",Int32:"INT",Uint32:"UNSIGNED_INT",Float32:"FLOAT"};class Fh{constructor(t,e,r,i){this.length=e.length,this.attributes=r,this.itemSize=e.bytesPerElement,this.dynamicDraw=i,this.context=t;const n=t.gl;this.buffer=n.createBuffer(),t.bindVertexBuffer.set(this.buffer),n.bufferData(n.ARRAY_BUFFER,e.arrayBuffer,this.dynamicDraw?n.DYNAMIC_DRAW:n.STATIC_DRAW),this.dynamicDraw||delete e.arrayBuffer;}bind(){this.context.bindVertexBuffer.set(this.buffer);}updateData(t){const e=this.context.gl;this.bind(),e.bufferSubData(e.ARRAY_BUFFER,0,t.arrayBuffer);}enableAttributes(t,e){for(let r=0;r<this.attributes.length;r++){const i=e.attributes[this.attributes[r].name];void 0!==i&&t.enableVertexAttribArray(i);}}setVertexAttribPointers(t,e,r){for(let i=0;i<this.attributes.length;i++){const n=this.attributes[i],s=e.attributes[n.name];void 0!==s&&t.vertexAttribPointer(s,n.components,t[Vh[n.type]],!1,this.itemSize,n.offset+this.itemSize*(r||0));}}destroy(){this.buffer&&(this.context.gl.deleteBuffer(this.buffer),delete this.buffer);}}class Rh{constructor(t){this.gl=t.gl,this.default=this.getDefault(),this.current=this.default,this.dirty=!1;}get(){return this.current}set(t){}getDefault(){return this.default}setDefault(){this.set(this.default);}}class Lh extends Rh{getDefault(){return le.transparent}set(t){const e=this.current;(t.r!==e.r||t.g!==e.g||t.b!==e.b||t.a!==e.a||this.dirty)&&(this.gl.clearColor(t.r,t.g,t.b,t.a),this.current=t,this.dirty=!1);}}class Uh extends Rh{getDefault(){return 1}set(t){(t!==this.current||this.dirty)&&(this.gl.clearDepth(t),this.current=t,this.dirty=!1);}}class Oh extends Rh{getDefault(){return 0}set(t){(t!==this.current||this.dirty)&&(this.gl.clearStencil(t),this.current=t,this.dirty=!1);}}class $h extends Rh{getDefault(){return [!0,!0,!0,!0]}set(t){const e=this.current;(t[0]!==e[0]||t[1]!==e[1]||t[2]!==e[2]||t[3]!==e[3]||this.dirty)&&(this.gl.colorMask(t[0],t[1],t[2],t[3]),this.current=t,this.dirty=!1);}}class qh extends Rh{getDefault(){return !0}set(t){(t!==this.current||this.dirty)&&(this.gl.depthMask(t),this.current=t,this.dirty=!1);}}class Nh extends Rh{getDefault(){return 255}set(t){(t!==this.current||this.dirty)&&(this.gl.stencilMask(t),this.current=t,this.dirty=!1);}}class jh extends Rh{getDefault(){return {func:this.gl.ALWAYS,ref:0,mask:255}}set(t){const e=this.current;(t.func!==e.func||t.ref!==e.ref||t.mask!==e.mask||this.dirty)&&(this.gl.stencilFunc(t.func,t.ref,t.mask),this.current=t,this.dirty=!1);}}class Gh extends Rh{getDefault(){const t=this.gl;return [t.KEEP,t.KEEP,t.KEEP]}set(t){const e=this.current;(t[0]!==e[0]||t[1]!==e[1]||t[2]!==e[2]||this.dirty)&&(this.gl.stencilOp(t[0],t[1],t[2]),this.current=t,this.dirty=!1);}}class Zh extends Rh{getDefault(){return !1}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;t?e.enable(e.STENCIL_TEST):e.disable(e.STENCIL_TEST),this.current=t,this.dirty=!1;}}class Xh extends Rh{getDefault(){return [0,1]}set(t){const e=this.current;(t[0]!==e[0]||t[1]!==e[1]||this.dirty)&&(this.gl.depthRange(t[0],t[1]),this.current=t,this.dirty=!1);}}class Kh extends Rh{getDefault(){return !1}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;t?e.enable(e.DEPTH_TEST):e.disable(e.DEPTH_TEST),this.current=t,this.dirty=!1;}}class Hh extends Rh{getDefault(){return this.gl.LESS}set(t){(t!==this.current||this.dirty)&&(this.gl.depthFunc(t),this.current=t,this.dirty=!1);}}class Yh extends Rh{getDefault(){return !1}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;t?e.enable(e.BLEND):e.disable(e.BLEND),this.current=t,this.dirty=!1;}}class Wh extends Rh{getDefault(){const t=this.gl;return [t.ONE,t.ZERO]}set(t){const e=this.current;(t[0]!==e[0]||t[1]!==e[1]||this.dirty)&&(this.gl.blendFunc(t[0],t[1]),this.current=t,this.dirty=!1);}}class Jh extends Rh{getDefault(){return le.transparent}set(t){const e=this.current;(t.r!==e.r||t.g!==e.g||t.b!==e.b||t.a!==e.a||this.dirty)&&(this.gl.blendColor(t.r,t.g,t.b,t.a),this.current=t,this.dirty=!1);}}class Qh extends Rh{getDefault(){return this.gl.FUNC_ADD}set(t){(t!==this.current||this.dirty)&&(this.gl.blendEquation(t),this.current=t,this.dirty=!1);}}class tp extends Rh{getDefault(){return !1}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;t?e.enable(e.CULL_FACE):e.disable(e.CULL_FACE),this.current=t,this.dirty=!1;}}class ep extends Rh{getDefault(){return this.gl.BACK}set(t){(t!==this.current||this.dirty)&&(this.gl.cullFace(t),this.current=t,this.dirty=!1);}}class rp extends Rh{getDefault(){return this.gl.CCW}set(t){(t!==this.current||this.dirty)&&(this.gl.frontFace(t),this.current=t,this.dirty=!1);}}class ip extends Rh{getDefault(){return null}set(t){(t!==this.current||this.dirty)&&(this.gl.useProgram(t),this.current=t,this.dirty=!1);}}class np extends Rh{getDefault(){return this.gl.TEXTURE0}set(t){(t!==this.current||this.dirty)&&(this.gl.activeTexture(t),this.current=t,this.dirty=!1);}}class sp extends Rh{getDefault(){const t=this.gl;return [0,0,t.drawingBufferWidth,t.drawingBufferHeight]}set(t){const e=this.current;(t[0]!==e[0]||t[1]!==e[1]||t[2]!==e[2]||t[3]!==e[3]||this.dirty)&&(this.gl.viewport(t[0],t[1],t[2],t[3]),this.current=t,this.dirty=!1);}}class ap extends Rh{getDefault(){return null}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,t),this.current=t,this.dirty=!1;}}class op extends Rh{getDefault(){return null}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;e.bindRenderbuffer(e.RENDERBUFFER,t),this.current=t,this.dirty=!1;}}class lp extends Rh{getDefault(){return null}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;e.bindTexture(e.TEXTURE_2D,t),this.current=t,this.dirty=!1;}}class up extends Rh{getDefault(){return null}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;e.bindBuffer(e.ARRAY_BUFFER,t),this.current=t,this.dirty=!1;}}class cp extends Rh{getDefault(){return null}set(t){const e=this.gl;e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t),this.current=t,this.dirty=!1;}}class hp extends Rh{constructor(t){super(t),this.vao=t.extVertexArrayObject;}getDefault(){return null}set(t){this.vao&&(t!==this.current||this.dirty)&&(this.vao.bindVertexArrayOES(t),this.current=t,this.dirty=!1);}}class pp extends Rh{getDefault(){return 4}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;e.pixelStorei(e.UNPACK_ALIGNMENT,t),this.current=t,this.dirty=!1;}}class dp extends Rh{getDefault(){return !1}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t),this.current=t,this.dirty=!1;}}class fp extends Rh{getDefault(){return !1}set(t){if(t===this.current&&!this.dirty)return;const e=this.gl;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,t),this.current=t,this.dirty=!1;}}class yp extends Rh{constructor(t,e){super(t),this.context=t,this.parent=e;}getDefault(){return null}}class mp extends yp{setDirty(){this.dirty=!0;}set(t){if(t===this.current&&!this.dirty)return;this.context.bindFramebuffer.set(this.parent);const e=this.gl;e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),this.current=t,this.dirty=!1;}}class gp extends yp{attachment(){return this.gl.DEPTH_ATTACHMENT}set(t){if(t===this.current&&!this.dirty)return;this.context.bindFramebuffer.set(this.parent);const e=this.gl;e.framebufferRenderbuffer(e.FRAMEBUFFER,this.attachment(),e.RENDERBUFFER,t),this.current=t,this.dirty=!1;}}class xp{constructor(t,e,r,i){this.context=t,this.width=e,this.height=r;const n=this.framebuffer=t.gl.createFramebuffer();this.colorAttachment=new mp(t,n),i&&(this.depthAttachment=new gp(t,n));}destroy(){const t=this.context.gl,e=this.colorAttachment.get();if(e&&t.deleteTexture(e),this.depthAttachment){const e=this.depthAttachment.get();e&&t.deleteRenderbuffer(e);}t.deleteFramebuffer(this.framebuffer);}}class vp{constructor(t,e,r){this.func=t,this.mask=e,this.range=r;}}vp.ReadOnly=!1,vp.ReadWrite=!0,vp.disabled=new vp(519,vp.ReadOnly,[0,1]);class bp{constructor(t,e,r,i,n,s){this.test=t,this.ref=e,this.mask=r,this.fail=i,this.depthFail=n,this.pass=s;}}bp.disabled=new bp({func:519,mask:0},0,0,7680,7680,7680);class wp{constructor(t,e,r){this.blendFunction=t,this.blendColor=e,this.mask=r;}}wp.Replace=[1,0],wp.disabled=new wp(wp.Replace,le.transparent,[!1,!1,!1,!1]),wp.unblended=new wp(wp.Replace,le.transparent,[!0,!0,!0,!0]),wp.alphaBlended=new wp([1,771],le.transparent,[!0,!0,!0,!0]);class _p{constructor(t,e,r){this.enable=t,this.mode=e,this.frontFace=r;}}_p.disabled=new _p(!1,1029,2305),_p.backCCW=new _p(!0,1029,2305),_p.backCW=new _p(!0,1029,2304),_p.frontCW=new _p(!0,1028,2304),_p.frontCCW=new _p(!0,1028,2305);class kp extends Vt{constructor(t,e,r){super(),this.id=t,this._onlySymbols=r,e.on("data",t=>{"source"===t.dataType&&"metadata"===t.sourceDataType&&(this._sourceLoaded=!0),this._sourceLoaded&&!this._paused&&"source"===t.dataType&&"content"===t.sourceDataType&&(this.reload(),this.transform&&this.update(this.transform));}),e.on("error",()=>{this._sourceErrored=!0;}),this._source=e,this._tiles={},this._cache=new Ch(0,this._unloadTile.bind(this)),this._timers={},this._cacheTimers={},this._maxTileCacheSize=null,this._loadedParentTiles={},this._coveredTiles={},this._state=new _h;}onAdd(t){this.map=t,this._maxTileCacheSize=t?t._maxTileCacheSize:null;}loaded(){if(this._sourceErrored)return !0;if(!this._sourceLoaded)return !1;if(!this._source.loaded())return !1;for(const t in this._tiles){const e=this._tiles[t];if("loaded"!==e.state&&"errored"!==e.state)return !1}return !0}getSource(){return this._source}pause(){this._paused=!0;}resume(){if(!this._paused)return;const t=this._shouldReloadOnResume;this._paused=!1,this._shouldReloadOnResume=!1,t&&this.reload(),this.transform&&this.update(this.transform);}_loadTile(t,e){return t.isSymbolTile=this._onlySymbols,this._source.loadTile(t,e)}_unloadTile(t){if(this._source.unloadTile)return this._source.unloadTile(t,()=>{})}_abortTile(t){if(this._source.abortTile)return this._source.abortTile(t,()=>{})}serialize(){return this._source.serialize()}prepare(t){this._source.prepare&&this._source.prepare(),this._state.coalesceChanges(this._tiles,this.map?this.map.painter:null);for(const e in this._tiles){const r=this._tiles[e];r.upload(t),r.prepare(this.map.style.imageManager);}}getIds(){return g(this._tiles).map(t=>t.tileID).sort(Ap).map(t=>t.key)}getRenderableIds(t){const e=[];for(const r in this._tiles)this._isIdRenderable(+r,t)&&e.push(this._tiles[r]);return t?e.sort((t,e)=>{const r=t.tileID,n=e.tileID,s=new i(r.canonical.x,r.canonical.y)._rotate(this.transform.angle),a=new i(n.canonical.x,n.canonical.y)._rotate(this.transform.angle);return r.overscaledZ-n.overscaledZ||a.y-s.y||a.x-s.x}).map(t=>t.tileID.key):e.map(t=>t.tileID).sort(Ap).map(t=>t.key)}hasRenderableParent(t){const e=this.findLoadedParent(t,0);return !!e&&this._isIdRenderable(e.tileID.key)}_isIdRenderable(t,e){return this._tiles[t]&&this._tiles[t].hasData()&&!this._coveredTiles[t]&&(e||!this._tiles[t].holdingForFade())}reload(){if(this._paused)this._shouldReloadOnResume=!0;else {this._cache.reset();for(const t in this._tiles)"errored"!==this._tiles[t].state&&this._reloadTile(+t,"reloading");}}_reloadTile(t,e){const r=this._tiles[t];r&&("loading"!==r.state&&(r.state=e),this._loadTile(r,this._tileLoaded.bind(this,r,t,e)));}_tileLoaded(t,e,r,i){if(i)return t.state="errored",void(404!==i.status?this._source.fire(new Pt(i,{tile:t})):this.update(this.transform));t.timeAdded=$.now(),"expired"===r&&(t.refreshedUponExpiration=!0),this._setTileReloadTimer(e,t),"raster-dem"===this.getSource().type&&t.dem&&this._backfillDEM(t),this._state.initializeTileState(t,this.map?this.map.painter:null),this._source.fire(new Ct("data",{dataType:"source",tile:t,coord:t.tileID,sourceCacheId:this.id}));}_backfillDEM(t){const e=this.getRenderableIds();for(let i=0;i<e.length;i++){const n=e[i];if(t.neighboringTiles&&t.neighboringTiles[n]){const e=this.getTileByID(n);r(t,e),r(e,t);}}function r(t,e){if(!t.dem||t.dem.borderReady)return;t.needsHillshadePrepare=!0,t.needsDEMTextureUpload=!0;let r=e.tileID.canonical.x-t.tileID.canonical.x;const i=e.tileID.canonical.y-t.tileID.canonical.y,n=Math.pow(2,t.tileID.canonical.z),s=e.tileID.key;0===r&&0===i||Math.abs(i)>1||(Math.abs(r)>1&&(1===Math.abs(r+n)?r+=n:1===Math.abs(r-n)&&(r-=n)),e.dem&&t.dem&&(t.dem.backfillBorder(e.dem,r,i),t.neighboringTiles&&t.neighboringTiles[s]&&(t.neighboringTiles[s].backfilled=!0)));}}getTile(t){return this.getTileByID(t.key)}getTileByID(t){return this._tiles[t]}_retainLoadedChildren(t,e,r,i){for(const n in this._tiles){let s=this._tiles[n];if(i[n]||!s.hasData()||s.tileID.overscaledZ<=e||s.tileID.overscaledZ>r)continue;let a=s.tileID;for(;s&&s.tileID.overscaledZ>e+1;){const t=s.tileID.scaledTo(s.tileID.overscaledZ-1);s=this._tiles[t.key],s&&s.hasData()&&(a=t);}let o=a;for(;o.overscaledZ>e;)if(o=o.scaledTo(o.overscaledZ-1),t[o.key]){i[a.key]=a;break}}}findLoadedParent(t,e){if(t.key in this._loadedParentTiles){const r=this._loadedParentTiles[t.key];return r&&r.tileID.overscaledZ>=e?r:null}for(let r=t.overscaledZ-1;r>=e;r--){const e=t.scaledTo(r),i=this._getLoadedTile(e);if(i)return i}}_getLoadedTile(t){const e=this._tiles[t.key];return e&&e.hasData()?e:this._cache.getByKey(this._source.reparseOverscaled?t.wrapped().key:t.canonical.key)}updateCacheSize(t,e){e=e||this._source.tileSize;const r=Math.ceil(t.width/e)+1,i=Math.ceil(t.height/e)+1,n=Math.floor(r*i*5),s="number"==typeof this._maxTileCacheSize?Math.min(this._maxTileCacheSize,n):n;this._cache.setMaxSize(s);}handleWrapJump(t){const e=Math.round((t-(void 0===this._prevLng?t:this._prevLng))/360);if(this._prevLng=t,e){const t={};for(const r in this._tiles){const i=this._tiles[r];i.tileID=i.tileID.unwrapTo(i.tileID.wrap+e),t[i.tileID.key]=i;}this._tiles=t;for(const t in this._timers)clearTimeout(this._timers[t]),delete this._timers[t];for(const t in this._tiles)this._setTileReloadTimer(+t,this._tiles[t]);}}update(t,e,r){if(this.transform=t,!this._sourceLoaded||this._paused||this.transform.freezeTileCoverage)return;if(this.usedForTerrain&&!r)return;let i;this.updateCacheSize(t,e),this.handleWrapJump(this.transform.center.lng),this._coveredTiles={},this.used||this.usedForTerrain?this._source.tileID?i=t.getVisibleUnwrappedCoordinates(this._source.tileID).map(t=>new mh(t.canonical.z,t.wrap,t.canonical.z,t.canonical.x,t.canonical.y)):(i=t.coveringTiles({tileSize:e||this._source.tileSize,minzoom:this._source.minzoom,maxzoom:this._source.maxzoom,roundZoom:this._source.roundZoom&&!r,reparseOverscaled:this._source.reparseOverscaled,useElevationData:!!this.transform.elevation&&!this.usedForTerrain}),this._source.hasTile&&(i=i.filter(t=>this._source.hasTile(t)))):i=[];const n=this._updateRetainedTiles(i);if(Sp(this._source.type)&&0!==i.length){const t={},e={},r=Object.keys(n);for(const i of r){const r=n[i],s=this._tiles[i];if(!s||s.fadeEndTime&&s.fadeEndTime<=$.now())continue;const a=this.findLoadedParent(r,Math.max(r.overscaledZ-kp.maxOverzooming,this._source.minzoom));a&&(this._addTile(a.tileID),t[a.tileID.key]=a.tileID),e[i]=r;}const s=i[i.length-1].overscaledZ;for(const t in this._tiles){const r=this._tiles[t];if(n[t]||!r.hasData())continue;let i=r.tileID;for(;i.overscaledZ>s;){i=i.scaledTo(i.overscaledZ-1);const s=this._tiles[i.key];if(s&&s.hasData()&&e[i.key]){n[t]=r.tileID;break}}}for(const e in t)n[e]||(this._coveredTiles[e]=!0,n[e]=t[e]);}for(const t in n)this._tiles[t].clearFadeHold();const s=function(t,e){const r=[];for(const i in t)i in e||r.push(i);return r}(this._tiles,n);for(const t of s){const e=this._tiles[t];e.hasSymbolBuckets&&!e.holdingForFade()?e.setHoldDuration(this.map._fadeDuration):e.hasSymbolBuckets&&!e.symbolFadeFinished()||this._removeTile(+t);}this._updateLoadedParentTileCache(),this._onlySymbols&&this._source.afterUpdate&&this._source.afterUpdate();}releaseSymbolFadeTiles(){for(const t in this._tiles)this._tiles[t].holdingForFade()&&this._removeTile(+t);}_updateRetainedTiles(t){const e={};if(0===t.length)return e;const r={},i=t[t.length-1].overscaledZ,n=t[0].overscaledZ,s=Math.max(n-kp.maxOverzooming,this._source.minzoom),a=Math.max(n+kp.maxUnderzooming,this._source.minzoom),o={};for(const r of t){const t=this._addTile(r);e[r.key]=r,t.hasData()||i<this._source.maxzoom&&(o[r.key]=r);}this._retainLoadedChildren(o,i,a,e);for(const i of t){let t=this._tiles[i.key];if(t.hasData())continue;if(i.canonical.z>=this._source.maxzoom){const t=i.children(this._source.maxzoom)[0],r=this.getTile(t);if(r&&r.hasData()){e[t.key]=t;continue}}else {const t=i.children(this._source.maxzoom);if(e[t[0].key]&&e[t[1].key]&&e[t[2].key]&&e[t[3].key])continue}let n=t.wasRequested();for(let a=i.overscaledZ-1;a>=s;--a){const s=i.scaledTo(a);if(r[s.key])break;if(r[s.key]=!0,t=this.getTile(s),!t&&n&&(t=this._addTile(s)),t&&(e[s.key]=s,n=t.wasRequested(),t.hasData()))break}}return e}_updateLoadedParentTileCache(){this._loadedParentTiles={};for(const t in this._tiles){const e=[];let r,i=this._tiles[t].tileID;for(;i.overscaledZ>0;){if(i.key in this._loadedParentTiles){r=this._loadedParentTiles[i.key];break}e.push(i.key);const t=i.scaledTo(i.overscaledZ-1);if(r=this._getLoadedTile(t),r)break;i=t;}for(const t of e)this._loadedParentTiles[t]=r;}}_addTile(t){let e=this._tiles[t.key];if(e)return e;e=this._cache.getAndRemove(t),e&&(this._setTileReloadTimer(t.key,e),e.tileID=t,this._state.initializeTileState(e,this.map?this.map.painter:null),this._cacheTimers[t.key]&&(clearTimeout(this._cacheTimers[t.key]),delete this._cacheTimers[t.key],this._setTileReloadTimer(t.key,e)));const r=Boolean(e);return r||(e=new wh(t,this._source.tileSize*t.overscaleFactor(),this.transform.tileZoom),this._loadTile(e,this._tileLoaded.bind(this,e,t.key,e.state))),e?(e.uses++,this._tiles[t.key]=e,r||this._source.fire(new Ct("dataloading",{tile:e,coord:e.tileID,dataType:"source"})),e):null}_setTileReloadTimer(t,e){t in this._timers&&(clearTimeout(this._timers[t]),delete this._timers[t]);const r=e.getExpiryTimeout();r&&(this._timers[t]=setTimeout(()=>{this._reloadTile(t,"expired"),delete this._timers[t];},r));}_removeTile(t){const e=this._tiles[t];e&&(e.uses--,delete this._tiles[t],this._timers[t]&&(clearTimeout(this._timers[t]),delete this._timers[t]),e.uses>0||(e.hasData()&&"reloading"!==e.state?this._cache.add(e.tileID,e,e.getExpiryTimeout()):(e.aborted=!0,this._abortTile(e),this._unloadTile(e))));}clearTiles(){this._shouldReloadOnResume=!1,this._paused=!1;for(const t in this._tiles)this._removeTile(+t);this._cache.reset();}tilesIn(t,e,r){const i=[],n=this.transform;if(!n)return i;for(const s in this._tiles){const a=this._tiles[s];if(r&&a.clearQueryDebugViz(),a.holdingForFade())continue;const o=t.containsTile(a,n,e);o&&i.push(o);}return i}getVisibleCoordinates(t){const e=this.getRenderableIds(t).map(t=>this._tiles[t].tileID);for(const t of e)t.posMatrix=this.transform.calculatePosMatrix(t.toUnwrapped());return e}hasTransition(){if(this._source.hasTransition())return !0;if(Sp(this._source.type))for(const t in this._tiles){const e=this._tiles[t];if(void 0!==e.fadeEndTime&&e.fadeEndTime>=$.now())return !0}return !1}setFeatureState(t,e,r){this._state.updateState(t=t||"_geojsonTileLayer",e,r);}removeFeatureState(t,e,r){this._state.removeFeatureState(t=t||"_geojsonTileLayer",e,r);}getFeatureState(t,e){return this._state.getState(t=t||"_geojsonTileLayer",e)}setDependencies(t,e,r){const i=this._tiles[t];i&&i.setDependencies(e,r);}reloadTilesForDependencies(t,e){for(const r in this._tiles)this._tiles[r].hasDependency(t,e)&&this._reloadTile(+r,"reloading");this._cache.filter(r=>!r.hasDependency(t,e));}}function Ap(t,e){const r=Math.abs(2*t.wrap)-+(t.wrap<0),i=Math.abs(2*e.wrap)-+(e.wrap<0);return t.overscaledZ-e.overscaledZ||i-r||e.canonical.y-t.canonical.y||e.canonical.x-t.canonical.x}function Sp(t){return "raster"===t||"image"===t||"video"===t}kp.maxOverzooming=10,kp.maxUnderzooming=3;class Ip{constructor(t,e,r){this._demTile=t,this._dem=this._demTile.dem,this._scale=e,this._offset=r;}static create(t,e,r){const i=r||t.findDEMTileFor(e);if(!i||!i.dem)return;const n=i.dem,s=i.tileID,a=1<<e.canonical.z-s.canonical.z;return new Ip(i,i.tileSize/8192/a,[(e.canonical.x/a-s.canonical.x)*n.dim,(e.canonical.y/a-s.canonical.y)*n.dim])}tileCoordToPixel(t,e){const r=e*this._scale+this._offset[1],n=Math.floor(t*this._scale+this._offset[0]),s=Math.floor(r);return new i(n,s)}getElevationAt(t,e,r,i){const n=t*this._scale+this._offset[0],s=e*this._scale+this._offset[1],a=Math.floor(n),o=Math.floor(s),l=this._dem;return i=!!i,r?Je(Je(l.get(a,o,i),l.get(a,o+1,i),s-o),Je(l.get(a+1,o,i),l.get(a+1,o+1,i),s-o),n-a):l.get(a,o,i)}getElevationAtPixel(t,e,r){return this._dem.get(t,e,!!r)}getMeterToDEM(t){return (1<<this._demTile.tileID.canonical.z)*uh(1,t)*this._dem.stride}}class Tp{constructor(t,e){this.tileID=t,this.x=t.canonical.x,this.y=t.canonical.y,this.z=t.canonical.z,this.grid=new Oi(8192,16,0),this.featureIndexArray=new Us,this.promoteId=e;}insert(t,e,r,i,n,s=0){const a=this.featureIndexArray.length;this.featureIndexArray.emplaceBack(r,i,n,s);const o=this.grid;for(let t=0;t<e.length;t++){const r=e[t],i=[1/0,1/0,-1/0,-1/0];for(let t=0;t<r.length;t++){const e=r[t];i[0]=Math.min(i[0],e.x),i[1]=Math.min(i[1],e.y),i[2]=Math.max(i[2],e.x),i[3]=Math.max(i[3],e.y);}i[0]<8192&&i[1]<8192&&i[2]>=0&&i[3]>=0&&o.insert(a,i[0],i[1],i[2],i[3]);}}loadVTLayers(){return this.vtLayers||(this.vtLayers=new Al.VectorTile(new ou(this.rawTileData)).layers,this.sourceLayerCoder=new xh(this.vtLayers?Object.keys(this.vtLayers).sort():["_geojsonTileLayer"])),this.vtLayers}query(t,e,r,i){this.loadVTLayers();const n=t.params||{},s=pi(n.filter),a=t.tileResult,o=t.transform,l=a.bufferedTilespaceBounds,u=this.grid.query(l.min.x,l.min.y,l.max.x,l.max.y,(t,e,r,i)=>Da(a.bufferedTilespaceGeometry,t,e,r,i));u.sort(Ep);let c=null;o.elevation&&u.length>0&&(c=Ip.create(o.elevation,this.tileID));const h={};let p;for(let o=0;o<u.length;o++){const l=u[o];if(l===p)continue;p=l;const d=this.featureIndexArray.get(l);let f=null;this.loadMatchingFeature(h,d,s,n.layers,n.availableImages,e,r,i,(e,r,i,n=0)=>(f||(f=xa(e)),r.queryIntersectsFeature(a,e,i,f,this.z,t.transform,t.pixelPosMatrix,c,n)));}return h}loadMatchingFeature(t,e,r,i,n,s,a,o,l){const{featureIndex:u,bucketIndex:c,sourceLayerIndex:h,layoutVertexArrayOffset:p}=e,d=this.bucketLayerIDs[c];if(i&&!function(t,e){for(let r=0;r<t.length;r++)if(e.indexOf(t[r])>=0)return !0;return !1}(i,d))return;const f=this.sourceLayerCoder.decode(h),y=this.vtLayers[f].feature(u);if(r.needGeometry){const t=va(y,!0);if(!r.filter(new qn(this.tileID.overscaledZ),t,this.tileID.canonical))return}else if(!r.filter(new qn(this.tileID.overscaledZ),y))return;const m=this.getId(y,f);for(let e=0;e<d.length;e++){const r=d[e];if(i&&i.indexOf(r)<0)continue;const c=s[r];if(!c)continue;let h={};void 0!==m&&o&&(h=o.getState(c.sourceLayer||"_geojsonTileLayer",m));const f=x({},a[r]);f.paint=zp(f.paint,c.paint,y,h,n),f.layout=zp(f.layout,c.layout,y,h,n);const g=!l||l(y,c,h,p);if(!g)continue;const v=new vh(y,this.z,this.x,this.y,m);v.layer=f;let b=t[r];void 0===b&&(b=t[r]=[]),b.push({featureIndex:u,feature:v,intersectionZ:g});}}lookupSymbolFeatures(t,e,r,i,n,s,a,o){const l={};this.loadVTLayers();const u=pi(n);for(const n of t)this.loadMatchingFeature(l,{bucketIndex:r,sourceLayerIndex:i,featureIndex:n,layoutVertexArrayOffset:0},u,s,a,o,e);return l}hasLayer(t){for(const e of this.bucketLayerIDs)for(const r of e)if(t===r)return !0;return !1}getId(t,e){let r=t.id;return this.promoteId&&(r=t.properties["string"==typeof this.promoteId?this.promoteId:this.promoteId[e]],"boolean"==typeof r&&(r=Number(r))),r}}function zp(t,e,r,i,n){return S(t,(t,s)=>{const a=e instanceof Yn?e.get(s):null;return a&&a.evaluate?a.evaluate(r,i,n):a})}function Ep(t,e){return e-t}Gi("FeatureIndex",Tp,{omit:["rawTileData","sourceLayerCoder"]});class Mp{constructor(t){const e={},r=[];for(const i in t){const n=t[i],s=e[i]={};for(const t in n){const e=n[+t];if(!e||0===e.bitmap.width||0===e.bitmap.height)continue;const i=e.metrics.localGlyph?2:1,a={x:0,y:0,w:e.bitmap.width+2*i,h:e.bitmap.height+2*i};r.push(a),s[t]={rect:a,metrics:e.metrics};}}const{w:i,h:n}=zu(r),s=new _o({width:i||1,height:n||1});for(const r in t){const i=t[r];for(const t in i){const n=i[+t];if(!n||0===n.bitmap.width||0===n.bitmap.height)continue;const a=e[r][t].rect,o=n.metrics.localGlyph?2:1;_o.copy(n.bitmap,s,{x:0,y:0},{x:a.x+o,y:a.y+o},n.bitmap);}}this.image=s,this.positions=e;}}Gi("GlyphAtlas",Mp);class Bp{constructor(t){this.tileID=new mh(t.tileID.overscaledZ,t.tileID.wrap,t.tileID.canonical.z,t.tileID.canonical.x,t.tileID.canonical.y),this.tileZoom=t.tileZoom,this.uid=t.uid,this.zoom=t.zoom,this.pixelRatio=t.pixelRatio,this.tileSize=t.tileSize,this.source=t.source,this.overscaling=this.tileID.overscaleFactor(),this.showCollisionBoxes=t.showCollisionBoxes,this.collectResourceTiming=!!t.collectResourceTiming,this.returnDependencies=!!t.returnDependencies,this.promoteId=t.promoteId,this.enableTerrain=!!t.enableTerrain,this.isSymbolTile=t.isSymbolTile;}parse(t,e,r,i,n){this.status="parsing",this.data=t,this.collisionBoxArray=new Bs;const s=new xh(Object.keys(t.layers).sort()),a=new Tp(this.tileID,this.promoteId);a.bucketLayerIDs=[];const o={},l={featureIndex:a,iconDependencies:{},patternDependencies:{},glyphDependencies:{},availableImages:r},u=e.familiesBySource[this.source];for(const e in u){const i=t.layers[e];if(!i)continue;let n=!1,c=!1;for(const t of u[e])"symbol"===t[0].type?n=!0:c=!0;if(!0===this.isSymbolTile&&!n)continue;if(!1===this.isSymbolTile&&!c)continue;1===i.version&&E(`Vector tile source "${this.source}" layer "${e}" `+"does not use vector tile spec v2 and therefore may have some rendering errors.");const h=s.encode(e),p=[];for(let t=0;t<i.length;t++){const r=i.feature(t),n=a.getId(r,e);p.push({feature:r,id:n,index:t,sourceLayerIndex:h});}for(const t of u[e]){const e=t[0];void 0!==this.isSymbolTile&&"symbol"===e.type!==this.isSymbolTile||e.minzoom&&this.zoom<Math.floor(e.minzoom)||e.maxzoom&&this.zoom>=e.maxzoom||"none"!==e.visibility&&(Dp(t,this.zoom,r),(o[e.id]=e.createBucket({index:a.bucketLayerIDs.length,layers:t,zoom:this.zoom,pixelRatio:this.pixelRatio,overscaling:this.overscaling,collisionBoxArray:this.collisionBoxArray,sourceLayerIndex:h,sourceID:this.source,enableTerrain:this.enableTerrain})).populate(p,l,this.tileID.canonical),a.bucketLayerIDs.push(t.map(t=>t.id)));}}let c,h,p,d;const f={type:"maybePrepare",isSymbolTile:this.isSymbolTile,zoom:this.zoom},y=S(l.glyphDependencies,t=>Object.keys(t).map(Number));Object.keys(y).length?i.send("getGlyphs",{uid:this.uid,stacks:y},(t,e)=>{c||(c=t,h=e,v.call(this));},void 0,void 0,f):h={};const m=Object.keys(l.iconDependencies);m.length?i.send("getImages",{icons:m,source:this.source,tileID:this.tileID,type:"icons"},(t,e)=>{c||(c=t,p=e,v.call(this));},void 0,void 0,f):p={};const x=Object.keys(l.patternDependencies);function v(){if(c)return n(c);if(h&&p&&d){const t=new Mp(h),e=new Mu(p,d);for(const i in o){const n=o[i];n instanceof Vc?(Dp(n.layers,this.zoom,r),bc(n,h,t.positions,p,e.iconPositions,this.showCollisionBoxes,this.tileID.canonical,this.tileZoom)):n.hasPattern&&(n instanceof ql||n instanceof cl||n instanceof El)&&(Dp(n.layers,this.zoom,r),n.addFeatures(l,this.tileID.canonical,e.patternPositions));}this.status="done",n(null,{buckets:g(o).filter(t=>!t.isEmpty()),featureIndex:a,collisionBoxArray:this.collisionBoxArray,glyphAtlasImage:t.image,imageAtlas:e,glyphMap:this.returnDependencies?h:null,iconMap:this.returnDependencies?p:null,glyphPositions:this.returnDependencies?t.positions:null});}}x.length?i.send("getImages",{icons:x,source:this.source,tileID:this.tileID,type:"patterns"},(t,e)=>{c||(c=t,d=e,v.call(this));},void 0,void 0,f):d={},v.call(this);}}function Dp(t,e,r){const i=new qn(e);for(const e of t)e.recalculate(i,r);}class Cp{constructor(t){this.entries={},this.scheduler=t;}request(t,e,r,i){const n=this.entries[t]=this.entries[t]||{callbacks:[]};if(n.result){const[t,r]=n.result;return this.scheduler?this.scheduler.add(()=>{i(t,r);},e):i(t,r),()=>{}}return n.callbacks.push(i),n.cancel||(n.cancel=r((r,i)=>{n.result=[r,i];for(const t of n.callbacks)this.scheduler?this.scheduler.add(()=>{t(r,i);},e):t(r,i);setTimeout(()=>delete this.entries[t],3e3);})),()=>{n.result||(n.callbacks=n.callbacks.filter(t=>t!==i),n.callbacks.length||(n.cancel(),delete this.entries[t]));}}}function Pp(t,e,r){const i=JSON.stringify(t.request);return t.data&&(this.deduped.entries[i]={result:[null,t.data]}),this.deduped.request(i,{type:"parseTile",isSymbolTile:t.isSymbolTile,zoom:t.tileZoom},e=>{const i=kt(t.request,(t,i,n,s)=>{t?e(t):i&&e(null,{vectorTile:r?void 0:new Al.VectorTile(new ou(i)),rawData:i,cacheControl:n,expires:s});});return ()=>{i.cancel(),e();}},e)}t.AUTH_ERR_MSG="NO_ACCESS_TOKEN",t.Aabb=po,t.Actor=class{constructor(t,e,r){this.target=t,this.parent=e,this.mapId=r,this.callbacks={},this.cancelCallbacks={},k(["receive"],this),this.target.addEventListener("message",this.receive,!1),this.globalScope=D()?t:s,this.scheduler=new eh;}send(t,e,r,i,n=!1,s){const a=Math.round(1e18*Math.random()).toString(36).substring(0,10);r&&(r.metadata=s,this.callbacks[a]=r);const o=R(this.globalScope)?void 0:[];return this.target.postMessage({id:a,type:t,hasCallback:!!r,targetMapId:i,mustQueue:n,sourceMapId:this.mapId,data:Ki(e,o)},o),{cancel:()=>{r&&delete this.callbacks[a],this.target.postMessage({id:a,type:"<cancel>",targetMapId:i,sourceMapId:this.mapId});}}}receive(t){const e=t.data,r=e.id;if(r&&(!e.targetMapId||this.mapId===e.targetMapId))if("<cancel>"===e.type){const t=this.cancelCallbacks[r];delete this.cancelCallbacks[r],t&&t.cancel();}else if(D()||e.mustQueue){const t=this.callbacks[r];this.cancelCallbacks[r]=this.scheduler.add(()=>this.processTask(r,e),t&&t.metadata||{type:"message"});}else this.processTask(r,e);}processTask(t,e){if("<response>"===e.type){const r=this.callbacks[t];delete this.callbacks[t],r&&(e.error?r(Hi(e.error)):r(null,Hi(e.data)));}else {const r=R(this.globalScope)?void 0:[],i=e.hasCallback?(e,i)=>{delete this.cancelCallbacks[t],this.target.postMessage({id:t,type:"<response>",sourceMapId:this.mapId,error:e?Ki(e):null,data:Ki(i,r)},r);}:t=>{},n=Hi(e.data);if(this.parent[e.type])this.parent[e.type](e.sourceMapId,n,i);else if(this.parent.getWorkerSource){const t=e.type.split(".");this.parent.getWorkerSource(e.sourceMapId,t[0],n.source)[t[1]](n,i);}else i(new Error(`Could not find function ${e.type}`));}}remove(){this.scheduler.remove(),this.target.removeEventListener("message",this.receive,!1);}},t.CanonicalTileID=fh,t.Color=le,t.ColorMode=wp,t.Context=class{constructor(t){this.gl=t,this.extVertexArrayObject=this.gl.getExtension("OES_vertex_array_object"),this.clearColor=new Lh(this),this.clearDepth=new Uh(this),this.clearStencil=new Oh(this),this.colorMask=new $h(this),this.depthMask=new qh(this),this.stencilMask=new Nh(this),this.stencilFunc=new jh(this),this.stencilOp=new Gh(this),this.stencilTest=new Zh(this),this.depthRange=new Xh(this),this.depthTest=new Kh(this),this.depthFunc=new Hh(this),this.blend=new Yh(this),this.blendFunc=new Wh(this),this.blendColor=new Jh(this),this.blendEquation=new Qh(this),this.cullFace=new tp(this),this.cullFaceSide=new ep(this),this.frontFace=new rp(this),this.program=new ip(this),this.activeTexture=new np(this),this.viewport=new sp(this),this.bindFramebuffer=new ap(this),this.bindRenderbuffer=new op(this),this.bindTexture=new lp(this),this.bindVertexBuffer=new up(this),this.bindElementBuffer=new cp(this),this.bindVertexArrayOES=this.extVertexArrayObject&&new hp(this),this.pixelStoreUnpack=new pp(this),this.pixelStoreUnpackPremultiplyAlpha=new dp(this),this.pixelStoreUnpackFlipY=new fp(this),this.extTextureFilterAnisotropic=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic"),this.extTextureFilterAnisotropic&&(this.extTextureFilterAnisotropicMax=t.getParameter(this.extTextureFilterAnisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT)),this.extTextureFilterAnisotropicForceOff=!1,this.extTextureHalfFloat=t.getExtension("OES_texture_half_float"),this.extTextureHalfFloat&&(t.getExtension("OES_texture_half_float_linear"),this.extRenderToTextureHalfFloat=t.getExtension("EXT_color_buffer_half_float")),this.extTimerQuery=t.getExtension("EXT_disjoint_timer_query"),this.maxTextureSize=t.getParameter(t.MAX_TEXTURE_SIZE);}setDefault(){this.unbindVAO(),this.clearColor.setDefault(),this.clearDepth.setDefault(),this.clearStencil.setDefault(),this.colorMask.setDefault(),this.depthMask.setDefault(),this.stencilMask.setDefault(),this.stencilFunc.setDefault(),this.stencilOp.setDefault(),this.stencilTest.setDefault(),this.depthRange.setDefault(),this.depthTest.setDefault(),this.depthFunc.setDefault(),this.blend.setDefault(),this.blendFunc.setDefault(),this.blendColor.setDefault(),this.blendEquation.setDefault(),this.cullFace.setDefault(),this.cullFaceSide.setDefault(),this.frontFace.setDefault(),this.program.setDefault(),this.activeTexture.setDefault(),this.bindFramebuffer.setDefault(),this.pixelStoreUnpack.setDefault(),this.pixelStoreUnpackPremultiplyAlpha.setDefault(),this.pixelStoreUnpackFlipY.setDefault();}setDirty(){this.clearColor.dirty=!0,this.clearDepth.dirty=!0,this.clearStencil.dirty=!0,this.colorMask.dirty=!0,this.depthMask.dirty=!0,this.stencilMask.dirty=!0,this.stencilFunc.dirty=!0,this.stencilOp.dirty=!0,this.stencilTest.dirty=!0,this.depthRange.dirty=!0,this.depthTest.dirty=!0,this.depthFunc.dirty=!0,this.blend.dirty=!0,this.blendFunc.dirty=!0,this.blendColor.dirty=!0,this.blendEquation.dirty=!0,this.cullFace.dirty=!0,this.cullFaceSide.dirty=!0,this.frontFace.dirty=!0,this.program.dirty=!0,this.activeTexture.dirty=!0,this.viewport.dirty=!0,this.bindFramebuffer.dirty=!0,this.bindRenderbuffer.dirty=!0,this.bindTexture.dirty=!0,this.bindVertexBuffer.dirty=!0,this.bindElementBuffer.dirty=!0,this.extVertexArrayObject&&(this.bindVertexArrayOES.dirty=!0),this.pixelStoreUnpack.dirty=!0,this.pixelStoreUnpackPremultiplyAlpha.dirty=!0,this.pixelStoreUnpackFlipY.dirty=!0;}createIndexBuffer(t,e){return new Ph(this,t,e)}createVertexBuffer(t,e,r){return new Fh(this,t,e,r)}createRenderbuffer(t,e,r){const i=this.gl,n=i.createRenderbuffer();return this.bindRenderbuffer.set(n),i.renderbufferStorage(i.RENDERBUFFER,t,e,r),this.bindRenderbuffer.set(null),n}createFramebuffer(t,e,r){return new xp(this,t,e,r)}clear({color:t,depth:e,stencil:r}){const i=this.gl;let n=0;t&&(n|=i.COLOR_BUFFER_BIT,this.clearColor.set(t),this.colorMask.set([!0,!0,!0,!0])),void 0!==e&&(n|=i.DEPTH_BUFFER_BIT,this.depthRange.set([0,1]),this.clearDepth.set(e),this.depthMask.set(!0)),void 0!==r&&(n|=i.STENCIL_BUFFER_BIT,this.clearStencil.set(r),this.stencilMask.set(255)),i.clear(n);}setCullFace(t){!1===t.enable?this.cullFace.set(!1):(this.cullFace.set(!0),this.cullFaceSide.set(t.mode),this.frontFace.set(t.frontFace));}setDepthMode(t){t.func!==this.gl.ALWAYS||t.mask?(this.depthTest.set(!0),this.depthFunc.set(t.func),this.depthMask.set(t.mask),this.depthRange.set(t.range)):this.depthTest.set(!1);}setStencilMode(t){t.test.func!==this.gl.ALWAYS||t.mask?(this.stencilTest.set(!0),this.stencilMask.set(t.mask),this.stencilOp.set([t.fail,t.depthFail,t.pass]),this.stencilFunc.set({func:t.test.func,ref:t.ref,mask:t.test.mask})):this.stencilTest.set(!1);}setColorMode(t){a(t.blendFunction,wp.Replace)?this.blend.set(!1):(this.blend.set(!0),this.blendFunc.set(t.blendFunction),this.blendColor.set(t.blendColor)),this.colorMask.set(t.mask);}unbindVAO(){this.extVertexArrayObject&&this.bindVertexArrayOES.set(null);}},t.CullFaceMode=_p,t.DEMData=Dh,t.DataConstantProperty=Wn,t.DedupedRequest=Cp,t.DepthMode=vp,t.DepthStencilAttachment=class extends gp{attachment(){return this.gl.DEPTH_STENCIL_ATTACHMENT}},t.EXTENT=8192,t.Elevation=class{getAtPoint(t,e=0){const r=this._source();if(!r)return e;if(t.y<0||t.y>1)return e;const i=r.getSource().maxzoom,n=1<<i,s=Math.floor(t.x),a=t.x-s,o=new mh(i,s,i,Math.floor(a*n),Math.floor(t.y*n)),l=this.findDEMTileFor(o);if(!l||!l.dem)return e;const u=l.dem,c=1<<l.tileID.canonical.z,h=(a*c-l.tileID.canonical.x)*u.dim,p=(t.y*c-l.tileID.canonical.y)*u.dim,d=Math.floor(h),f=Math.floor(p);return this.exaggeration()*Je(Je(u.get(d,f),u.get(d,f+1),p-f),Je(u.get(d+1,f),u.get(d+1,f+1),p-f),h-d)}getAtTileOffset(t,e,r){const i=1<<t.canonical.z;return this.getAtPoint(new ph(t.wrap+(t.canonical.x+e/8192)/i,(t.canonical.y+r/8192)/i))}getForTilePoints(t,e,r,i){const n=Ip.create(this,t,i);return !!n&&(e.forEach(t=>{t[2]=this.exaggeration()*n.getElevationAt(t[0],t[1],r);}),!0)}getMinMaxForTile(t){const e=this.findDEMTileFor(t);if(!e||!e.dem)return null;const r=e.dem.tree,i=e.tileID,n=1<<t.canonical.z-i.canonical.z;let s=t.canonical.x/n-i.canonical.x,a=t.canonical.y/n-i.canonical.y,o=0;for(let e=0;e<t.canonical.z-i.canonical.z&&!r.leaves[o];e++){s*=2,a*=2;const t=2*Math.floor(a)+Math.floor(s);o=r.childOffsets[o]+t,s%=1,a%=1;}return {min:this.exaggeration()*r.minimums[o],max:this.exaggeration()*r.maximums[o]}}raycast(t,e,r){throw new Error("Pure virtual method called.")}pointCoordinate(t){throw new Error("Pure virtual method called.")}_source(){throw new Error("Pure virtual method called.")}exaggeration(){throw new Error("Pure virtual method called.")}findDEMTileFor(t){throw new Error("Pure virtual method called.")}get visibleDemTiles(){throw new Error("Getter must be implemented in subclass.")}},t.ErrorEvent=Pt,t.EvaluationParameters=qn,t.Event=Ct,t.Evented=Vt,t.Frustum=ho,t.GlyphManager=oc,t.ImagePosition=Eu,t.LngLat=nh,t.LngLatBounds=ih,t.LocalGlyphMode=ac,t.MAX_SAFE_INTEGER=o,t.MercatorCoordinate=ph,t.ONE_EM=24,t.OverscaledTileID=mh,t.Point=i,t.Point$1=i,t.Properties=rs,t.RGBAImage=ko,t.Ray=class{constructor(t,e){this.pos=t,this.dir=e;}intersectsPlane(t,e,r){const i=to(e,this.dir);if(Math.abs(i)<1e-6)return !1;const n=to(so(Ga(),t,this.pos),e)/i;return function(t,e){t[0]=e[0],t[1]=e[1],t[2]=e[2];}(r,Ja(Ga(),this.pos,this.dir,n)),!0}},t.RequestManager=class{constructor(t,e){this._transformRequestFn=t,this._customAccessToken=e,this._createSkuToken();}_createSkuToken(){const t=function(){let t="";for(let e=0;e<10;e++)t+="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(62*Math.random())];return {token:["1",Y,t].join(""),tokenExpiresAt:Date.now()+432e5}}();this._skuToken=t.token,this._skuTokenExpiresAt=t.tokenExpiresAt;}_isSkuTokenExpired(){return Date.now()>this._skuTokenExpiresAt}transformRequest(t,e){return this._transformRequestFn&&this._transformRequestFn(t,e)||{url:t}}normalizeStyleURL(t,e){if(!W(t))return t;const r=tt(t);return r.path=`/styles/v1${r.path}`,this._makeAPIURL(r,this._customAccessToken||e)}normalizeGlyphsURL(t,e){if(!W(t))return t;const r=tt(t);return r.path=`/fonts/v1${r.path}`,this._makeAPIURL(r,this._customAccessToken||e)}normalizeSourceURL(t,e){if(!W(t))return t;const r=tt(t);return r.path=`/v4/${r.authority}.json`,r.params.push("secure"),this._makeAPIURL(r,this._customAccessToken||e)}normalizeSpriteURL(t,e,r,i){const n=tt(t);return W(t)?(n.path=`/styles/v1${n.path}/sprite${e}${r}`,this._makeAPIURL(n,this._customAccessToken||i)):(n.path+=`${e}${r}`,et(n))}normalizeTileURL(t,e,r){if(this._isSkuTokenExpired()&&this._createSkuToken(),t&&!W(t))return t;const i=tt(t);i.path=i.path.replace(/(\.(png|jpg)\d*)(?=$)/,`${e||r&&"raster"!==i.authority&&512===r?"@2x":""}${j.supported?".webp":"$1"}`),"raster"===i.authority?i.path=`/${N.RASTER_URL_PREFIX}${i.path}`:(i.path=i.path.replace(/^.+\/v4\//,"/"),i.path=`/${N.TILE_URL_VERSION}${i.path}`);const n=this._customAccessToken||function(t){for(const e of t){const t=e.match(/^access_token=(.*)$/);if(t)return t[1]}return null}(i.params)||N.ACCESS_TOKEN;return N.REQUIRE_ACCESS_TOKEN&&n&&this._skuToken&&i.params.push(`sku=${this._skuToken}`),this._makeAPIURL(i,n)}canonicalizeTileURL(t,e){const r=tt(t);if(!r.path.match(/^(\/v4\/|\/raster\/v1\/)/)||!r.path.match(/\.[\w]+$/))return t;let i="mapbox://";r.path.match(/^\/raster\/v1\//)?i+=`raster/${r.path.replace(`/${N.RASTER_URL_PREFIX}/`,"")}`:i+=`tiles/${r.path.replace(`/${N.TILE_URL_VERSION}/`,"")}`;let n=r.params;return e&&(n=n.filter(t=>!t.match(/^access_token=/))),n.length&&(i+=`?${n.join("&")}`),i}canonicalizeTileset(t,e){const r=!!e&&W(e),i=[];for(const e of t.tiles||[])J(e)?i.push(this.canonicalizeTileURL(e,r)):i.push(e);return i}_makeAPIURL(t,e){const r="See https://www.mapbox.com/api-documentation/#access-tokens-and-token-scopes",i=tt(N.API_URL);if(t.protocol=i.protocol,t.authority=i.authority,"http"===t.protocol){const e=t.params.indexOf("secure");e>=0&&t.params.splice(e,1);}if("/"!==i.path&&(t.path=`${i.path}${t.path}`),!N.REQUIRE_ACCESS_TOKEN)return et(t);if(!(e=e||N.ACCESS_TOKEN))throw new Error(`An API access token is required to use Mapbox GL. ${r}`);if("s"===e[0])throw new Error(`Use a public access token (pk.*) with Mapbox GL, not a secret access token (sk.*). ${r}`);return t.params=t.params.filter(t=>-1===t.indexOf("access_token")),t.params.push(`access_token=${e}`),et(t)}},t.RequestPerformance=th,t.ResourceType=vt,t.SegmentVector=ya,t.SourceCache=kp,t.StencilMode=bp,t.StructArrayLayout1ui2=zs,t.StructArrayLayout2f1f2i16=vs,t.StructArrayLayout2i4=us,t.StructArrayLayout3f12=ys,t.StructArrayLayout3ui6=ws,t.StructArrayLayout4i8=cs,t.Texture=Wc,t.Tile=wh,t.Transitionable=Gn,t.Uniform1f=Ws,t.Uniform1i=class extends Ys{constructor(t,e){super(t,e),this.current=0;}set(t){this.current!==t&&(this.current=t,this.gl.uniform1i(this.location,t));}},t.Uniform2f=class extends Ys{constructor(t,e){super(t,e),this.current=[0,0];}set(t){t[0]===this.current[0]&&t[1]===this.current[1]||(this.current=t,this.gl.uniform2f(this.location,t[0],t[1]));}},t.Uniform3f=class extends Ys{constructor(t,e){super(t,e),this.current=[0,0,0];}set(t){t[0]===this.current[0]&&t[1]===this.current[1]&&t[2]===this.current[2]||(this.current=t,this.gl.uniform3f(this.location,t[0],t[1],t[2]));}},t.Uniform4f=Js,t.UniformColor=Qs,t.UniformMatrix3f=class extends Ys{constructor(t,e){super(t,e),this.current=ea;}set(t){for(let e=0;e<9;e++)if(t[e]!==this.current[e]){this.current=t,this.gl.uniformMatrix3fv(this.location,!1,t);break}}},t.UniformMatrix4f=class extends Ys{constructor(t,e){super(t,e),this.current=ta;}set(t){if(t[12]!==this.current[12]||t[0]!==this.current[0])return this.current=t,void this.gl.uniformMatrix4fv(this.location,!1,t);for(let e=1;e<16;e++)if(t[e]!==this.current[e]){this.current=t,this.gl.uniformMatrix4fv(this.location,!1,t);break}}},t.UnwrappedTileID=yh,t.ValidationError=Rt,t.VectorTileWorkerSource=class extends Vt{constructor(t,e,r,i,n){super(),this.actor=t,this.layerIndex=e,this.availableImages=r,this.loadVectorData=n||Pp,this.loading={},this.loaded={},this.deduped=new Cp(t.scheduler),this.isSpriteLoaded=i,this.scheduler=t.scheduler;}loadTile(t,e){const r=t.uid,i=!!(t&&t.request&&t.request.collectResourceTiming)&&new th(t.request),n=this.loading[r]=new Bp(t);n.abort=this.loadVectorData(t,(s,a)=>{const o=!this.loading[r];if(delete this.loading[r],o||s||!a)return n.status="done",o||(this.loaded[r]=n),e(s);const l=a.rawData,u={};a.expires&&(u.expires=a.expires),a.cacheControl&&(u.cacheControl=a.cacheControl);const c={};if(i){const t=i.finish();t&&(c.resourceTiming=JSON.parse(JSON.stringify(t)));}n.vectorTile=a.vectorTile||new Al.VectorTile(new ou(l));const h=()=>{n.parse(n.vectorTile,this.layerIndex,this.availableImages,this.actor,(t,r)=>{if(t||!r)return e(t);e(null,x({rawTileData:l.slice(0)},r,u,c));});};this.isSpriteLoaded?h():this.once("isSpriteLoaded",()=>{this.scheduler?this.scheduler.add(h,{type:"parseTile",isSymbolTile:t.isSymbolTile,zoom:t.tileZoom}):h();}),this.loaded=this.loaded||{},this.loaded[r]=n;});}reloadTile(t,e){const r=this.loaded,i=t.uid,n=this;if(r&&r[i]){const s=r[i];s.showCollisionBoxes=t.showCollisionBoxes,s.enableTerrain=!!t.enableTerrain;const a=(t,r)=>{const i=s.reloadCallback;i&&(delete s.reloadCallback,s.parse(s.vectorTile,n.layerIndex,this.availableImages,n.actor,i)),e(t,r);};"parsing"===s.status?s.reloadCallback=a:"done"===s.status&&(s.vectorTile?s.parse(s.vectorTile,this.layerIndex,this.availableImages,this.actor,a):a());}}abortTile(t,e){const r=t.uid,i=this.loading[r];i&&(i.abort&&i.abort(),delete this.loading[r]),e();}removeTile(t,e){const r=this.loaded,i=t.uid;r&&r[i]&&delete r[i],e();}},t.WritingMode=Bu,t.ZoomHistory=Yi,t.add=Ha,t.addDynamicAttributes=Bc,t.altitudeFromMercatorZ=hh,t.asyncAll=m,t.bezier=p,t.bindAll=k,t.browser=$,t.bufferConvexPolygon=function(t,e){const r=[];for(let i=0;i<t.length;i++){const n=y(i-1,-1,t.length-1),s=y(i+1,-1,t.length-1),a=t[i],o=t[s],l=t[n].sub(a).unit(),u=o.sub(a).unit(),c=u.angleWithSep(l.x,l.y),h=l.add(u).unit().mult(-1*e/Math.sin(c/2));r.push(a.add(h));}return r},t.cacheEntryPossiblyAdded=function(t){gt++,gt>dt&&(t.getActor().send("enforceCacheSizeLimit",pt),gt=0);},t.clamp=f,t.clearTileCache=function(t){const e=s.caches.delete("mapbox-tiles");t&&e.catch(t).then(()=>t());},t.clipLine=Qu,t.clone=function(t){var e=new Oa(16);return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e},t.clone$1=T,t.collisionCircleLayout=Jl,t.config=N,t.conjugate=function(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t[3]=e[3],t},t.create=function(){var t=new Oa(16);return Oa!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t},t.create$1=$a,t.create$2=function(){var t=new Oa(4);return Oa!=Float32Array&&(t[1]=0,t[2]=0),t[0]=1,t[3]=1,t},t.createExpression=Qr,t.createLayout=os,t.createStyleLayer=function(t){return "custom"===t.type?new qc(t):new Gc[t.type](t)},t.cross=eo,t.deepEqual=a,t.degToRad=c,t.div=function(t,e,r){return t[0]=e[0]/r[0],t[1]=e[1]/r[1],t[2]=e[2]/r[2],t},t.dot=to,t.ease=d,t.easeCubicInOut=h,t.emitValidationErrors=Ui,t.endsWith=A,t.enforceCacheSizeLimit=function(t){ft(),ct&&ct.then(e=>{e.keys().then(r=>{for(let i=0;i<r.length-t;i++)e.delete(r[i]);});});},t.evaluateSizeForFeature=tu,t.evaluateSizeForZoom=eu,t.evaluateVariableOffset=vc,t.evented=Ln,t.exactEquals=function(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]&&t[3]===e[3]},t.exactEquals$1=function(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]},t.extend=x,t.featureFilter=pi,t.filterObject=I,t.fromMat4=function(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[4],t[4]=e[5],t[5]=e[6],t[6]=e[8],t[7]=e[9],t[8]=e[10],t},t.fromQuat=function(t,e){var r=e[0],i=e[1],n=e[2],s=e[3],a=r+r,o=i+i,l=n+n,u=r*a,c=i*a,h=i*o,p=n*a,d=n*o,f=n*l,y=s*a,m=s*o,g=s*l;return t[0]=1-h-f,t[1]=c+g,t[2]=p-m,t[3]=0,t[4]=c-g,t[5]=1-u-f,t[6]=d+y,t[7]=0,t[8]=p+m,t[9]=d-y,t[10]=1-u-h,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},t.fromRotation=function(t,e){var r=Math.sin(e),i=Math.cos(e);return t[0]=i,t[1]=r,t[2]=0,t[3]=-r,t[4]=i,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},t.getAnchorAlignment=qu,t.getAnchorJustification=wc,t.getBounds=function(t){let e=1/0,r=1/0,n=-1/0,s=-1/0;for(const i of t)e=Math.min(e,i.x),r=Math.min(r,i.y),n=Math.max(n,i.x),s=Math.max(s,i.y);return {min:new i(e,r),max:new i(n,s)}},t.getImage=Mt,t.getJSON=function(t,e){return _t(x(t,{type:"json"}),e)},t.getMapSessionAPI=ut,t.getRTLTextPluginStatus=Un,t.getReferrer=wt,t.getVideo=function(t,e){const r=s.document.createElement("video");r.muted=!0,r.onloadstart=function(){e(null,r);};for(let e=0;e<t.length;e++){const i=s.document.createElement("source");It(t[e])||(r.crossOrigin="Anonymous"),i.src=t[e],r.appendChild(i);}return {cancel:()=>{}}},t.identity=qa,t.identity$1=uo,t.invert=function(t,e){var r=e[0],i=e[1],n=e[2],s=e[3],a=e[4],o=e[5],l=e[6],u=e[7],c=e[8],h=e[9],p=e[10],d=e[11],f=e[12],y=e[13],m=e[14],g=e[15],x=r*o-i*a,v=r*l-n*a,b=r*u-s*a,w=i*l-n*o,_=i*u-s*o,k=n*u-s*l,A=c*y-h*f,S=c*m-p*f,I=c*g-d*f,T=h*m-p*y,z=h*g-d*y,E=p*g-d*m,M=x*E-v*z+b*T+w*I-_*S+k*A;return M?(t[0]=(o*E-l*z+u*T)*(M=1/M),t[1]=(n*z-i*E-s*T)*M,t[2]=(y*k-m*_+g*w)*M,t[3]=(p*_-h*k-d*w)*M,t[4]=(l*I-a*E-u*S)*M,t[5]=(r*E-n*I+s*S)*M,t[6]=(m*b-f*k-g*v)*M,t[7]=(c*k-p*b+d*v)*M,t[8]=(a*z-o*I+u*A)*M,t[9]=(i*I-r*z-s*A)*M,t[10]=(f*_-y*b+g*x)*M,t[11]=(h*b-c*_-d*x)*M,t[12]=(o*S-a*T-l*A)*M,t[13]=(r*T-i*S+n*A)*M,t[14]=(y*v-f*w-m*x)*M,t[15]=(c*w-h*v+p*x)*M,t):null},t.isMapboxURL=W,t.latFromMercatorY=ch,t.len=ao,t.length=Xa,t.length$1=function(t){return Math.hypot(t[0],t[1],t[2],t[3])},t.loadVectorTile=Pp,t.makeRequest=_t,t.mercatorXfromLng=oh,t.mercatorYfromLat=lh,t.mercatorZfromAltitude=uh,t.mul=ja,t.mul$1=function(t,e,r){return t[0]=e[0]*r[0],t[1]=e[1]*r[1],t[2]=e[2]*r[2],t},t.multiply=Na,t.mvt=Al,t.nextPowerOfTwo=function(t){return t<=1?1:Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))},t.normalize=Qa,t.normalize$1=function(t,e){var r=e[0],i=e[1],n=e[2],s=e[3],a=r*r+i*i+n*n+s*s;return a>0&&(a=1/Math.sqrt(a)),t[0]=r*a,t[1]=i*a,t[2]=n*a,t[3]=s*a,t},t.number=Je,t.offscreenCanvasSupported=xt,t.ortho=function(t,e,r,i,n,s,a){var o=1/(e-r),l=1/(i-n),u=1/(s-a);return t[0]=-2*o,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*l,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*u,t[11]=0,t[12]=(e+r)*o,t[13]=(n+i)*l,t[14]=(a+s)*u,t[15]=1,t},t.pbf=ou,t.perspective=function(t,e,r,i,n){var s,a=1/Math.tan(e/2);return t[0]=a/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=n&&n!==1/0?(t[10]=(n+i)*(s=1/(i-n)),t[14]=2*n*i*s):(t[10]=-1,t[14]=-2*i),t},t.pick=function(t,e){const r={};for(let i=0;i<e.length;i++){const n=e[i];n in t&&(r[n]=t[n]);}return r},t.plugin=$n,t.polygonIntersectsBox=Da,t.polygonIntersectsPolygon=_a,t.polygonizeBounds=function(t,e,r=0,n=!0){const s=new i(r,r),a=t.sub(s),o=e.add(s),l=[a,new i(o.x,a.y),o,new i(a.x,o.y)];return n&&l.push(a),l},t.posAttributes=bh,t.postMapLoadEvent=ot,t.postTurnstileEvent=st,t.potpack=zu,t.prevPowerOfTwo=function(t){return t<=1?1:Math.pow(2,Math.floor(Math.log(t)/Math.LN2))},t.radToDeg=function(t){return t*u},t.refProperties=["type","source","source-layer","minzoom","maxzoom","filter","layout"],t.registerForPluginStateChange=function(t){return t({pluginStatus:Pn,pluginURL:Vn}),Ln.on("pluginStateChange",t),t},t.renderColorRamp=So,t.rotate=function(t,e,r){var i=e[0],n=e[1],s=e[2],a=e[3],o=Math.sin(r),l=Math.cos(r);return t[0]=i*l+s*o,t[1]=n*l+a*o,t[2]=i*-o+s*l,t[3]=n*-o+a*l,t},t.rotateX=function(t,e,r){var i=Math.sin(r),n=Math.cos(r),s=e[4],a=e[5],o=e[6],l=e[7],u=e[8],c=e[9],h=e[10],p=e[11];return e!==t&&(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[4]=s*n+u*i,t[5]=a*n+c*i,t[6]=o*n+h*i,t[7]=l*n+p*i,t[8]=u*n-s*i,t[9]=c*n-a*i,t[10]=h*n-o*i,t[11]=p*n-l*i,t},t.rotateX$1=co,t.rotateY=function(t,e,r){var i=Math.sin(r),n=Math.cos(r),s=e[0],a=e[1],o=e[2],l=e[3],u=e[8],c=e[9],h=e[10],p=e[11];return e!==t&&(t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=s*n-u*i,t[1]=a*n-c*i,t[2]=o*n-h*i,t[3]=l*n-p*i,t[8]=s*i+u*n,t[9]=a*i+c*n,t[10]=o*i+h*n,t[11]=l*i+p*n,t},t.rotateZ=function(t,e,r){var i=Math.sin(r),n=Math.cos(r),s=e[0],a=e[1],o=e[2],l=e[3],u=e[4],c=e[5],h=e[6],p=e[7];return e!==t&&(t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=s*n+u*i,t[1]=a*n+c*i,t[2]=o*n+h*i,t[3]=l*n+p*i,t[4]=u*n-s*i,t[5]=c*n-a*i,t[6]=h*n-o*i,t[7]=p*n-l*i,t},t.rotateZ$1=function(t,e,r){r*=.5;var i=e[0],n=e[1],s=e[2],a=e[3],o=Math.sin(r),l=Math.cos(r);return t[0]=i*l+n*o,t[1]=n*l-i*o,t[2]=s*l+a*o,t[3]=a*l-s*o,t},t.scale=function(t,e,r){var i=r[0],n=r[1],s=r[2];return t[0]=e[0]*i,t[1]=e[1]*i,t[2]=e[2]*i,t[3]=e[3]*i,t[4]=e[4]*n,t[5]=e[5]*n,t[6]=e[6]*n,t[7]=e[7]*n,t[8]=e[8]*s,t[9]=e[9]*s,t[10]=e[10]*s,t[11]=e[11]*s,t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t},t.scale$1=function(t,e,r){return t[0]=e[0]*r,t[1]=e[1]*r,t[2]=e[2]*r,t[3]=e[3]*r,t},t.scale$2=Wa,t.scaleAndAdd=Ja,t.setCacheLimits=function(t,e){pt=t,dt=e;},t.setRTLTextPlugin=function(t,e,r=!1){if("deferred"===Pn||"loading"===Pn||"loaded"===Pn)throw new Error("setRTLTextPlugin cannot be called multiple times.");Vn=$.resolveURL(t),Pn="deferred",Cn=e,Rn(),r||On();},t.styleSpec=Ft,t.sub=so,t.subtract=Ya,t.symbolSize=ru,t.transformMat3=function(t,e,r){var i=e[0],n=e[1],s=e[2];return t[0]=i*r[0]+n*r[3]+s*r[6],t[1]=i*r[1]+n*r[4]+s*r[7],t[2]=i*r[2]+n*r[5]+s*r[8],t},t.transformMat4=oo,t.transformQuat=io,t.translate=function(t,e,r){var i,n,s,a,o,l,u,c,h,p,d,f,y=r[0],m=r[1],g=r[2];return e===t?(t[12]=e[0]*y+e[4]*m+e[8]*g+e[12],t[13]=e[1]*y+e[5]*m+e[9]*g+e[13],t[14]=e[2]*y+e[6]*m+e[10]*g+e[14],t[15]=e[3]*y+e[7]*m+e[11]*g+e[15]):(n=e[1],s=e[2],a=e[3],o=e[4],l=e[5],u=e[6],c=e[7],h=e[8],p=e[9],d=e[10],f=e[11],t[0]=i=e[0],t[1]=n,t[2]=s,t[3]=a,t[4]=o,t[5]=l,t[6]=u,t[7]=c,t[8]=h,t[9]=p,t[10]=d,t[11]=f,t[12]=i*y+o*m+h*g+e[12],t[13]=n*y+l*m+p*g+e[13],t[14]=s*y+u*m+d*g+e[14],t[15]=a*y+c*m+f*g+e[15]),t},t.triggerPluginCompletionEvent=Fn,t.uniqueId=b,t.validateCustomStyleLayer=function(t){const e=[],r=t.id;return void 0===r&&e.push({message:`layers.${r}: missing required property "id"`}),void 0===t.render&&e.push({message:`layers.${r}: missing required method "render"`}),t.renderingMode&&"2d"!==t.renderingMode&&"3d"!==t.renderingMode&&e.push({message:`layers.${r}: property "renderingMode" must be either "2d" or "3d"`}),e},t.validateLight=Fi,t.validateStyle=Vi,t.values=g,t.vectorTile=Al,t.version="2.1.1",t.warnOnce=E,t.webpSupported=j,t.window=s,t.wrap=y;}));

define(["./shared"],(function(e){"use strict";function t(e){const r=typeof e;if("number"===r||"boolean"===r||"string"===r||null==e)return JSON.stringify(e);if(Array.isArray(e)){let r="[";for(const n of e)r+=`${t(n)},`;return `${r}]`}const n=Object.keys(e).sort();let o="{";for(let r=0;r<n.length;r++)o+=`${JSON.stringify(n[r])}:${t(e[n[r]])},`;return `${o}}`}function r(r){let n="";for(const o of e.refProperties)n+=`/${t(r[o])}`;return n}class n{constructor(e){this.keyCache={},e&&this.replace(e);}replace(e){this._layerConfigs={},this._layers={},this.update(e,[]);}update(t,n){for(const r of t){this._layerConfigs[r.id]=r;const t=this._layers[r.id]=e.createStyleLayer(r);t._featureFilter=e.featureFilter(t.filter),this.keyCache[r.id]&&delete this.keyCache[r.id];}for(const e of n)delete this.keyCache[e],delete this._layerConfigs[e],delete this._layers[e];this.familiesBySource={};const o=function(e,t){const n={};for(let o=0;o<e.length;o++){const i=t&&t[e[o].id]||r(e[o]);t&&(t[e[o].id]=i);let s=n[i];s||(s=n[i]=[]),s.push(e[o]);}const o=[];for(const e in n)o.push(n[e]);return o}(e.values(this._layerConfigs),this.keyCache);for(const e of o){const t=e.map(e=>this._layers[e.id]),r=t[0];if("none"===r.visibility)continue;const n=r.source||"";let o=this.familiesBySource[n];o||(o=this.familiesBySource[n]={});const i=r.sourceLayer||"_geojsonTileLayer";let s=o[i];s||(s=o[i]=[]),s.push(t);}}}const{ImageBitmap:o}=e.window;class i{loadTile(t,r){const{uid:n,encoding:i,rawImageData:s,padding:a,buildQuadTree:l}=t,u=o&&s instanceof o?this.getImageData(s,a):s;r(null,new e.DEMData(n,u,i,a<1,l));}getImageData(t,r){this.offscreenCanvas&&this.offscreenCanvasContext||(this.offscreenCanvas=new OffscreenCanvas(t.width,t.height),this.offscreenCanvasContext=this.offscreenCanvas.getContext("2d")),this.offscreenCanvas.width=t.width,this.offscreenCanvas.height=t.height,this.offscreenCanvasContext.drawImage(t,0,0,t.width,t.height);const n=this.offscreenCanvasContext.getImageData(-r,-r,t.width+2*r,t.height+2*r);return this.offscreenCanvasContext.clearRect(0,0,this.offscreenCanvas.width,this.offscreenCanvas.height),new e.RGBAImage({width:n.width,height:n.height},n.data)}}function s(e,t){if(0!==e.length){a(e[0],t);for(var r=1;r<e.length;r++)a(e[r],!t);}}function a(e,t){for(var r=0,n=0,o=e.length,i=o-1;n<o;i=n++)r+=(e[n][0]-e[i][0])*(e[i][1]+e[n][1]);r>=0!=!!t&&e.reverse();}const l=e.vectorTile.VectorTileFeature.prototype.toGeoJSON;class u{constructor(t){this._feature=t,this.extent=e.EXTENT,this.type=t.type,this.properties=t.tags,"id"in t&&!isNaN(t.id)&&(this.id=parseInt(t.id,10));}loadGeometry(){if(1===this._feature.type){const t=[];for(const r of this._feature.geometry)t.push([new e.Point$1(r[0],r[1])]);return t}{const t=[];for(const r of this._feature.geometry){const n=[];for(const t of r)n.push(new e.Point$1(t[0],t[1]));t.push(n);}return t}}toGeoJSON(e,t,r){return l.call(this,e,t,r)}}class h{constructor(t){this.layers={_geojsonTileLayer:this},this.name="_geojsonTileLayer",this.extent=e.EXTENT,this.length=t.length,this._features=t;}feature(e){return new u(this._features[e])}}var c=e.vectorTile.VectorTileFeature,f=p;function p(e,t){this.options=t||{},this.features=e,this.length=e.length;}function d(e,t){this.id="number"==typeof e.id?e.id:void 0,this.type=e.type,this.rawGeometry=1===e.type?[e.geometry]:e.geometry,this.properties=e.tags,this.extent=t||4096;}p.prototype.feature=function(e){return new d(this.features[e],this.options.extent)},d.prototype.loadGeometry=function(){var t=this.rawGeometry;this.geometry=[];for(var r=0;r<t.length;r++){for(var n=t[r],o=[],i=0;i<n.length;i++)o.push(new e.Point$1(n[i][0],n[i][1]));this.geometry.push(o);}return this.geometry},d.prototype.bbox=function(){this.geometry||this.loadGeometry();for(var e=this.geometry,t=1/0,r=-1/0,n=1/0,o=-1/0,i=0;i<e.length;i++)for(var s=e[i],a=0;a<s.length;a++){var l=s[a];t=Math.min(t,l.x),r=Math.max(r,l.x),n=Math.min(n,l.y),o=Math.max(o,l.y);}return [t,n,r,o]},d.prototype.toGeoJSON=c.prototype.toGeoJSON;var g=y,m=f;function y(t){var r=new e.pbf;return function(e,t){for(var r in e.layers)t.writeMessage(3,v,e.layers[r]);}(t,r),r.finish()}function v(e,t){var r;t.writeVarintField(15,e.version||1),t.writeStringField(1,e.name||""),t.writeVarintField(5,e.extent||4096);var n={keys:[],values:[],keycache:{},valuecache:{}};for(r=0;r<e.length;r++)n.feature=e.feature(r),t.writeMessage(2,x,n);var o=n.keys;for(r=0;r<o.length;r++)t.writeStringField(3,o[r]);var i=n.values;for(r=0;r<i.length;r++)t.writeMessage(4,P,i[r]);}function x(e,t){var r=e.feature;void 0!==r.id&&t.writeVarintField(1,r.id),t.writeMessage(2,w,e),t.writeVarintField(3,r.type),t.writeMessage(4,_,r);}function w(e,t){var r=e.feature,n=e.keys,o=e.values,i=e.keycache,s=e.valuecache;for(var a in r.properties){var l=i[a];void 0===l&&(n.push(a),i[a]=l=n.length-1),t.writeVarint(l);var u=r.properties[a],h=typeof u;"string"!==h&&"boolean"!==h&&"number"!==h&&(u=JSON.stringify(u));var c=h+":"+u,f=s[c];void 0===f&&(o.push(u),s[c]=f=o.length-1),t.writeVarint(f);}}function S(e,t){return (t<<3)+(7&e)}function M(e){return e<<1^e>>31}function _(e,t){for(var r=e.loadGeometry(),n=e.type,o=0,i=0,s=r.length,a=0;a<s;a++){var l=r[a],u=1;1===n&&(u=l.length),t.writeVarint(S(1,u));for(var h=3===n?l.length-1:l.length,c=0;c<h;c++){1===c&&1!==n&&t.writeVarint(S(2,h-1));var f=l[c].x-o,p=l[c].y-i;t.writeVarint(M(f)),t.writeVarint(M(p)),o+=f,i+=p;}3===n&&t.writeVarint(S(7,1));}}function P(e,t){var r=typeof e;"string"===r?t.writeStringField(1,e):"boolean"===r?t.writeBooleanField(7,e):"number"===r&&(e%1!=0?t.writeDoubleField(3,e):e<0?t.writeSVarintField(6,e):t.writeVarintField(5,e));}function b(e,t,r,n){k(e,r,n),k(t,2*r,2*n),k(t,2*r+1,2*n+1);}function k(e,t,r){const n=e[t];e[t]=e[r],e[r]=n;}function T(e,t,r,n){const o=e-r,i=t-n;return o*o+i*i}g.fromVectorTileJs=y,g.fromGeojsonVt=function(e,t){t=t||{};var r={};for(var n in e)r[n]=new f(e[n].features,t),r[n].name=n,r[n].version=t.version,r[n].extent=t.extent;return y({layers:r})},g.GeoJSONWrapper=m;const I=e=>e[0],C=e=>e[1];class L{constructor(e,t=I,r=C,n=64,o=Float64Array){this.nodeSize=n,this.points=e;const i=e.length<65536?Uint16Array:Uint32Array,s=this.ids=new i(e.length),a=this.coords=new o(2*e.length);for(let n=0;n<e.length;n++)s[n]=n,a[2*n]=t(e[n]),a[2*n+1]=r(e[n]);!function e(t,r,n,o,i,s){if(i-o<=n)return;const a=o+i>>1;!function e(t,r,n,o,i,s){for(;i>o;){if(i-o>600){const a=i-o+1,l=n-o+1,u=Math.log(a),h=.5*Math.exp(2*u/3),c=.5*Math.sqrt(u*h*(a-h)/a)*(l-a/2<0?-1:1);e(t,r,n,Math.max(o,Math.floor(n-l*h/a+c)),Math.min(i,Math.floor(n+(a-l)*h/a+c)),s);}const a=r[2*n+s];let l=o,u=i;for(b(t,r,o,n),r[2*i+s]>a&&b(t,r,o,i);l<u;){for(b(t,r,l,u),l++,u--;r[2*l+s]<a;)l++;for(;r[2*u+s]>a;)u--;}r[2*o+s]===a?b(t,r,o,u):(u++,b(t,r,u,i)),u<=n&&(o=u+1),n<=u&&(i=u-1);}}(t,r,a,o,i,s%2),e(t,r,n,o,a-1,s+1),e(t,r,n,a+1,i,s+1);}(s,a,n,0,s.length-1,0);}range(e,t,r,n){return function(e,t,r,n,o,i,s){const a=[0,e.length-1,0],l=[];let u,h;for(;a.length;){const c=a.pop(),f=a.pop(),p=a.pop();if(f-p<=s){for(let s=p;s<=f;s++)u=t[2*s],h=t[2*s+1],u>=r&&u<=o&&h>=n&&h<=i&&l.push(e[s]);continue}const d=Math.floor((p+f)/2);u=t[2*d],h=t[2*d+1],u>=r&&u<=o&&h>=n&&h<=i&&l.push(e[d]);const g=(c+1)%2;(0===c?r<=u:n<=h)&&(a.push(p),a.push(d-1),a.push(g)),(0===c?o>=u:i>=h)&&(a.push(d+1),a.push(f),a.push(g));}return l}(this.ids,this.coords,e,t,r,n,this.nodeSize)}within(e,t,r){return function(e,t,r,n,o,i){const s=[0,e.length-1,0],a=[],l=o*o;for(;s.length;){const u=s.pop(),h=s.pop(),c=s.pop();if(h-c<=i){for(let o=c;o<=h;o++)T(t[2*o],t[2*o+1],r,n)<=l&&a.push(e[o]);continue}const f=Math.floor((c+h)/2),p=t[2*f],d=t[2*f+1];T(p,d,r,n)<=l&&a.push(e[f]);const g=(u+1)%2;(0===u?r-o<=p:n-o<=d)&&(s.push(c),s.push(f-1),s.push(g)),(0===u?r+o>=p:n+o>=d)&&(s.push(f+1),s.push(h),s.push(g));}return a}(this.ids,this.coords,e,t,r,this.nodeSize)}}const O={minZoom:0,maxZoom:16,minPoints:2,radius:40,extent:512,nodeSize:64,log:!1,generateId:!1,reduce:null,map:e=>e},z=Math.fround||(E=new Float32Array(1),e=>(E[0]=+e,E[0]));var E;class F{constructor(e){this.options=X(Object.create(O),e),this.trees=new Array(this.options.maxZoom+1);}load(e){const{log:t,minZoom:r,maxZoom:n,nodeSize:o}=this.options;t&&console.time("total time");const i=`prepare ${e.length} points`;t&&console.time(i),this.points=e;let s=[];for(let t=0;t<e.length;t++)e[t].geometry&&s.push(Z(e[t],t));this.trees[n+1]=new L(s,V,$,o,Float32Array),t&&console.timeEnd(i);for(let e=n;e>=r;e--){const r=+Date.now();s=this._cluster(s,e),this.trees[e]=new L(s,V,$,o,Float32Array),t&&console.log("z%d: %d clusters in %dms",e,s.length,+Date.now()-r);}return t&&console.timeEnd("total time"),this}getClusters(e,t){let r=((e[0]+180)%360+360)%360-180;const n=Math.max(-90,Math.min(90,e[1]));let o=180===e[2]?180:((e[2]+180)%360+360)%360-180;const i=Math.max(-90,Math.min(90,e[3]));if(e[2]-e[0]>=360)r=-180,o=180;else if(r>o){const e=this.getClusters([r,n,180,i],t),s=this.getClusters([-180,n,o,i],t);return e.concat(s)}const s=this.trees[this._limitZoom(t)],a=s.range(G(r),Y(i),G(o),Y(n)),l=[];for(const e of a){const t=s.points[e];l.push(t.numPoints?J(t):this.points[t.index]);}return l}getChildren(e){const t=this._getOriginId(e),r=this._getOriginZoom(e),n="No cluster with the specified id.",o=this.trees[r];if(!o)throw new Error(n);const i=o.points[t];if(!i)throw new Error(n);const s=this.options.radius/(this.options.extent*Math.pow(2,r-1)),a=o.within(i.x,i.y,s),l=[];for(const t of a){const r=o.points[t];r.parentId===e&&l.push(r.numPoints?J(r):this.points[r.index]);}if(0===l.length)throw new Error(n);return l}getLeaves(e,t,r){const n=[];return this._appendLeaves(n,e,t=t||10,r=r||0,0),n}getTile(e,t,r){const n=this.trees[this._limitZoom(e)],o=Math.pow(2,e),{extent:i,radius:s}=this.options,a=s/i,l=(r-a)/o,u=(r+1+a)/o,h={features:[]};return this._addTileFeatures(n.range((t-a)/o,l,(t+1+a)/o,u),n.points,t,r,o,h),0===t&&this._addTileFeatures(n.range(1-a/o,l,1,u),n.points,o,r,o,h),t===o-1&&this._addTileFeatures(n.range(0,l,a/o,u),n.points,-1,r,o,h),h.features.length?h:null}getClusterExpansionZoom(e){let t=this._getOriginZoom(e)-1;for(;t<=this.options.maxZoom;){const r=this.getChildren(e);if(t++,1!==r.length)break;e=r[0].properties.cluster_id;}return t}_appendLeaves(e,t,r,n,o){const i=this.getChildren(t);for(const t of i){const i=t.properties;if(i&&i.cluster?o+i.point_count<=n?o+=i.point_count:o=this._appendLeaves(e,i.cluster_id,r,n,o):o<n?o++:e.push(t),e.length===r)break}return o}_addTileFeatures(e,t,r,n,o,i){for(const s of e){const e=t[s],a=e.numPoints,l={type:1,geometry:[[Math.round(this.options.extent*(e.x*o-r)),Math.round(this.options.extent*(e.y*o-n))]],tags:a?D(e):this.points[e.index].properties};let u;a?u=e.id:this.options.generateId?u=e.index:this.points[e.index].id&&(u=this.points[e.index].id),void 0!==u&&(l.id=u),i.features.push(l);}}_limitZoom(e){return Math.max(this.options.minZoom,Math.min(+e,this.options.maxZoom+1))}_cluster(e,t){const r=[],{radius:n,extent:o,reduce:i,minPoints:s}=this.options,a=n/(o*Math.pow(2,t));for(let n=0;n<e.length;n++){const o=e[n];if(o.zoom<=t)continue;o.zoom=t;const l=this.trees[t+1],u=l.within(o.x,o.y,a),h=o.numPoints||1;let c=h;for(const e of u){const r=l.points[e];r.zoom>t&&(c+=r.numPoints||1);}if(c>=s){let e=o.x*h,s=o.y*h,a=i&&h>1?this._map(o,!0):null;const f=(n<<5)+(t+1)+this.points.length;for(const r of u){const n=l.points[r];if(n.zoom<=t)continue;n.zoom=t;const u=n.numPoints||1;e+=n.x*u,s+=n.y*u,n.parentId=f,i&&(a||(a=this._map(o,!0)),i(a,this._map(n)));}o.parentId=f,r.push(N(e/c,s/c,f,c,a));}else if(r.push(o),c>1)for(const e of u){const n=l.points[e];n.zoom<=t||(n.zoom=t,r.push(n));}}return r}_getOriginId(e){return e-this.points.length>>5}_getOriginZoom(e){return (e-this.points.length)%32}_map(e,t){if(e.numPoints)return t?X({},e.properties):e.properties;const r=this.points[e.index].properties,n=this.options.map(r);return t&&n===r?X({},n):n}}function N(e,t,r,n,o){return {x:z(e),y:z(t),zoom:1/0,id:r,parentId:-1,numPoints:n,properties:o}}function Z(e,t){const[r,n]=e.geometry.coordinates;return {x:z(G(r)),y:z(Y(n)),zoom:1/0,index:t,parentId:-1}}function J(e){return {type:"Feature",id:e.id,properties:D(e),geometry:{type:"Point",coordinates:[(t=e.x,360*(t-.5)),W(e.y)]}};var t;}function D(e){const t=e.numPoints,r=t>=1e4?`${Math.round(t/1e3)}k`:t>=1e3?`${Math.round(t/100)/10}k`:t;return X(X({},e.properties),{cluster:!0,cluster_id:e.id,point_count:t,point_count_abbreviated:r})}function G(e){return e/360+.5}function Y(e){const t=Math.sin(e*Math.PI/180),r=.5-.25*Math.log((1+t)/(1-t))/Math.PI;return r<0?0:r>1?1:r}function W(e){const t=(180-360*e)*Math.PI/180;return 360*Math.atan(Math.exp(t))/Math.PI-90}function X(e,t){for(const r in t)e[r]=t[r];return e}function V(e){return e.x}function $(e){return e.y}function j(e,t,r,n,o,i){var s=o-r,a=i-n;if(0!==s||0!==a){var l=((e-r)*s+(t-n)*a)/(s*s+a*a);l>1?(r=o,n=i):l>0&&(r+=s*l,n+=a*l);}return (s=e-r)*s+(a=t-n)*a}function A(e,t,r,n){var o={id:void 0===e?null:e,type:t,geometry:r,tags:n,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0};return function(e){var t=e.geometry,r=e.type;if("Point"===r||"MultiPoint"===r||"LineString"===r)R(e,t);else if("Polygon"===r||"MultiLineString"===r)for(var n=0;n<t.length;n++)R(e,t[n]);else if("MultiPolygon"===r)for(n=0;n<t.length;n++)for(var o=0;o<t[n].length;o++)R(e,t[n][o]);}(o),o}function R(e,t){for(var r=0;r<t.length;r+=3)e.minX=Math.min(e.minX,t[r]),e.minY=Math.min(e.minY,t[r+1]),e.maxX=Math.max(e.maxX,t[r]),e.maxY=Math.max(e.maxY,t[r+1]);}function B(e,t,r,n){if(t.geometry){var o=t.geometry.coordinates,i=t.geometry.type,s=Math.pow(r.tolerance/((1<<r.maxZoom)*r.extent),2),a=[],l=t.id;if(r.promoteId?l=t.properties[r.promoteId]:r.generateId&&(l=n||0),"Point"===i)q(o,a);else if("MultiPoint"===i)for(var u=0;u<o.length;u++)q(o[u],a);else if("LineString"===i)U(o,a,s,!1);else if("MultiLineString"===i){if(r.lineMetrics){for(u=0;u<o.length;u++)U(o[u],a=[],s,!1),e.push(A(l,"LineString",a,t.properties));return}Q(o,a,s,!1);}else if("Polygon"===i)Q(o,a,s,!0);else {if("MultiPolygon"!==i){if("GeometryCollection"===i){for(u=0;u<t.geometry.geometries.length;u++)B(e,{id:l,geometry:t.geometry.geometries[u],properties:t.properties},r,n);return}throw new Error("Input data is not a valid GeoJSON object.")}for(u=0;u<o.length;u++){var h=[];Q(o[u],h,s,!0),a.push(h);}}e.push(A(l,i,a,t.properties));}}function q(e,t){t.push(H(e[0])),t.push(K(e[1])),t.push(0);}function U(e,t,r,n){for(var o,i,s=0,a=0;a<e.length;a++){var l=H(e[a][0]),u=K(e[a][1]);t.push(l),t.push(u),t.push(0),a>0&&(s+=n?(o*u-l*i)/2:Math.sqrt(Math.pow(l-o,2)+Math.pow(u-i,2))),o=l,i=u;}var h=t.length-3;t[2]=1,function e(t,r,n,o){for(var i,s=o,a=n-r>>1,l=n-r,u=t[r],h=t[r+1],c=t[n],f=t[n+1],p=r+3;p<n;p+=3){var d=j(t[p],t[p+1],u,h,c,f);if(d>s)i=p,s=d;else if(d===s){var g=Math.abs(p-a);g<l&&(i=p,l=g);}}s>o&&(i-r>3&&e(t,r,i,o),t[i+2]=s,n-i>3&&e(t,i,n,o));}(t,0,h,r),t[h+2]=1,t.size=Math.abs(s),t.start=0,t.end=t.size;}function Q(e,t,r,n){for(var o=0;o<e.length;o++){var i=[];U(e[o],i,r,n),t.push(i);}}function H(e){return e/360+.5}function K(e){var t=Math.sin(e*Math.PI/180),r=.5-.25*Math.log((1+t)/(1-t))/Math.PI;return r<0?0:r>1?1:r}function ee(e,t,r,n,o,i,s,a){if(n/=t,i>=(r/=t)&&s<n)return e;if(s<r||i>=n)return null;for(var l=[],u=0;u<e.length;u++){var h=e[u],c=h.geometry,f=h.type,p=0===o?h.minX:h.minY,d=0===o?h.maxX:h.maxY;if(p>=r&&d<n)l.push(h);else if(!(d<r||p>=n)){var g=[];if("Point"===f||"MultiPoint"===f)te(c,g,r,n,o);else if("LineString"===f)re(c,g,r,n,o,!1,a.lineMetrics);else if("MultiLineString"===f)oe(c,g,r,n,o,!1);else if("Polygon"===f)oe(c,g,r,n,o,!0);else if("MultiPolygon"===f)for(var m=0;m<c.length;m++){var y=[];oe(c[m],y,r,n,o,!0),y.length&&g.push(y);}if(g.length){if(a.lineMetrics&&"LineString"===f){for(m=0;m<g.length;m++)l.push(A(h.id,f,g[m],h.tags));continue}"LineString"!==f&&"MultiLineString"!==f||(1===g.length?(f="LineString",g=g[0]):f="MultiLineString"),"Point"!==f&&"MultiPoint"!==f||(f=3===g.length?"Point":"MultiPoint"),l.push(A(h.id,f,g,h.tags));}}}return l.length?l:null}function te(e,t,r,n,o){for(var i=0;i<e.length;i+=3){var s=e[i+o];s>=r&&s<=n&&(t.push(e[i]),t.push(e[i+1]),t.push(e[i+2]));}}function re(e,t,r,n,o,i,s){for(var a,l,u=ne(e),h=0===o?se:ae,c=e.start,f=0;f<e.length-3;f+=3){var p=e[f],d=e[f+1],g=e[f+2],m=e[f+3],y=e[f+4],v=0===o?p:d,x=0===o?m:y,w=!1;s&&(a=Math.sqrt(Math.pow(p-m,2)+Math.pow(d-y,2))),v<r?x>r&&(l=h(u,p,d,m,y,r),s&&(u.start=c+a*l)):v>n?x<n&&(l=h(u,p,d,m,y,n),s&&(u.start=c+a*l)):ie(u,p,d,g),x<r&&v>=r&&(l=h(u,p,d,m,y,r),w=!0),x>n&&v<=n&&(l=h(u,p,d,m,y,n),w=!0),!i&&w&&(s&&(u.end=c+a*l),t.push(u),u=ne(e)),s&&(c+=a);}var S=e.length-3;p=e[S],d=e[S+1],g=e[S+2],(v=0===o?p:d)>=r&&v<=n&&ie(u,p,d,g),S=u.length-3,i&&S>=3&&(u[S]!==u[0]||u[S+1]!==u[1])&&ie(u,u[0],u[1],u[2]),u.length&&t.push(u);}function ne(e){var t=[];return t.size=e.size,t.start=e.start,t.end=e.end,t}function oe(e,t,r,n,o,i){for(var s=0;s<e.length;s++)re(e[s],t,r,n,o,i,!1);}function ie(e,t,r,n){e.push(t),e.push(r),e.push(n);}function se(e,t,r,n,o,i){var s=(i-t)/(n-t);return e.push(i),e.push(r+(o-r)*s),e.push(1),s}function ae(e,t,r,n,o,i){var s=(i-r)/(o-r);return e.push(t+(n-t)*s),e.push(i),e.push(1),s}function le(e,t){for(var r=[],n=0;n<e.length;n++){var o,i=e[n],s=i.type;if("Point"===s||"MultiPoint"===s||"LineString"===s)o=ue(i.geometry,t);else if("MultiLineString"===s||"Polygon"===s){o=[];for(var a=0;a<i.geometry.length;a++)o.push(ue(i.geometry[a],t));}else if("MultiPolygon"===s)for(o=[],a=0;a<i.geometry.length;a++){for(var l=[],u=0;u<i.geometry[a].length;u++)l.push(ue(i.geometry[a][u],t));o.push(l);}r.push(A(i.id,s,o,i.tags));}return r}function ue(e,t){var r=[];r.size=e.size,void 0!==e.start&&(r.start=e.start,r.end=e.end);for(var n=0;n<e.length;n+=3)r.push(e[n]+t,e[n+1],e[n+2]);return r}function he(e,t){if(e.transformed)return e;var r,n,o,i=1<<e.z,s=e.x,a=e.y;for(r=0;r<e.features.length;r++){var l=e.features[r],u=l.geometry,h=l.type;if(l.geometry=[],1===h)for(n=0;n<u.length;n+=2)l.geometry.push(ce(u[n],u[n+1],t,i,s,a));else for(n=0;n<u.length;n++){var c=[];for(o=0;o<u[n].length;o+=2)c.push(ce(u[n][o],u[n][o+1],t,i,s,a));l.geometry.push(c);}}return e.transformed=!0,e}function ce(e,t,r,n,o,i){return [Math.round(r*(e*n-o)),Math.round(r*(t*n-i))]}function fe(e,t,r,n,o){for(var i=t===o.maxZoom?0:o.tolerance/((1<<t)*o.extent),s={features:[],numPoints:0,numSimplified:0,numFeatures:0,source:null,x:r,y:n,z:t,transformed:!1,minX:2,minY:1,maxX:-1,maxY:0},a=0;a<e.length;a++){s.numFeatures++,pe(s,e[a],i,o);var l=e[a].minX,u=e[a].minY,h=e[a].maxX,c=e[a].maxY;l<s.minX&&(s.minX=l),u<s.minY&&(s.minY=u),h>s.maxX&&(s.maxX=h),c>s.maxY&&(s.maxY=c);}return s}function pe(e,t,r,n){var o=t.geometry,i=t.type,s=[];if("Point"===i||"MultiPoint"===i)for(var a=0;a<o.length;a+=3)s.push(o[a]),s.push(o[a+1]),e.numPoints++,e.numSimplified++;else if("LineString"===i)de(s,o,e,r,!1,!1);else if("MultiLineString"===i||"Polygon"===i)for(a=0;a<o.length;a++)de(s,o[a],e,r,"Polygon"===i,0===a);else if("MultiPolygon"===i)for(var l=0;l<o.length;l++){var u=o[l];for(a=0;a<u.length;a++)de(s,u[a],e,r,!0,0===a);}if(s.length){var h=t.tags||null;if("LineString"===i&&n.lineMetrics){for(var c in h={},t.tags)h[c]=t.tags[c];h.mapbox_clip_start=o.start/o.size,h.mapbox_clip_end=o.end/o.size;}var f={geometry:s,type:"Polygon"===i||"MultiPolygon"===i?3:"LineString"===i||"MultiLineString"===i?2:1,tags:h};null!==t.id&&(f.id=t.id),e.features.push(f);}}function de(e,t,r,n,o,i){var s=n*n;if(n>0&&t.size<(o?s:n))r.numPoints+=t.length/3;else {for(var a=[],l=0;l<t.length;l+=3)(0===n||t[l+2]>s)&&(r.numSimplified++,a.push(t[l]),a.push(t[l+1])),r.numPoints++;o&&function(e,t){for(var r=0,n=0,o=e.length,i=o-2;n<o;i=n,n+=2)r+=(e[n]-e[i])*(e[n+1]+e[i+1]);if(r>0===t)for(n=0,o=e.length;n<o/2;n+=2){var s=e[n],a=e[n+1];e[n]=e[o-2-n],e[n+1]=e[o-1-n],e[o-2-n]=s,e[o-1-n]=a;}}(a,i),e.push(a);}}function ge(e,t){var r=(t=this.options=function(e,t){for(var r in t)e[r]=t[r];return e}(Object.create(this.options),t)).debug;if(r&&console.time("preprocess data"),t.maxZoom<0||t.maxZoom>24)throw new Error("maxZoom should be in the 0-24 range");if(t.promoteId&&t.generateId)throw new Error("promoteId and generateId cannot be used together.");var n=function(e,t){var r=[];if("FeatureCollection"===e.type)for(var n=0;n<e.features.length;n++)B(r,e.features[n],t,n);else B(r,"Feature"===e.type?e:{geometry:e},t);return r}(e,t);this.tiles={},this.tileCoords=[],r&&(console.timeEnd("preprocess data"),console.log("index: maxZoom: %d, maxPoints: %d",t.indexMaxZoom,t.indexMaxPoints),console.time("generate tiles"),this.stats={},this.total=0),(n=function(e,t){var r=t.buffer/t.extent,n=e,o=ee(e,1,-1-r,r,0,-1,2,t),i=ee(e,1,1-r,2+r,0,-1,2,t);return (o||i)&&(n=ee(e,1,-r,1+r,0,-1,2,t)||[],o&&(n=le(o,1).concat(n)),i&&(n=n.concat(le(i,-1)))),n}(n,t)).length&&this.splitTile(n,0,0,0),r&&(n.length&&console.log("features: %d, points: %d",this.tiles[0].numFeatures,this.tiles[0].numPoints),console.timeEnd("generate tiles"),console.log("tiles generated:",this.total,JSON.stringify(this.stats)));}function me(e,t,r){return 32*((1<<e)*r+t)+e}function ye(e,t){const r=e.tileID.canonical;if(!this._geoJSONIndex)return t(null,null);const n=this._geoJSONIndex.getTile(r.z,r.x,r.y);if(!n)return t(null,null);const o=new h(n.features);let i=g(o);0===i.byteOffset&&i.byteLength===i.buffer.byteLength||(i=new Uint8Array(i)),t(null,{vectorTile:o,rawData:i.buffer});}ge.prototype.options={maxZoom:14,indexMaxZoom:5,indexMaxPoints:1e5,tolerance:3,extent:4096,buffer:64,lineMetrics:!1,promoteId:null,generateId:!1,debug:0},ge.prototype.splitTile=function(e,t,r,n,o,i,s){for(var a=[e,t,r,n],l=this.options,u=l.debug;a.length;){n=a.pop(),r=a.pop(),t=a.pop(),e=a.pop();var h=1<<t,c=me(t,r,n),f=this.tiles[c];if(!f&&(u>1&&console.time("creation"),f=this.tiles[c]=fe(e,t,r,n,l),this.tileCoords.push({z:t,x:r,y:n}),u)){u>1&&(console.log("tile z%d-%d-%d (features: %d, points: %d, simplified: %d)",t,r,n,f.numFeatures,f.numPoints,f.numSimplified),console.timeEnd("creation"));var p="z"+t;this.stats[p]=(this.stats[p]||0)+1,this.total++;}if(f.source=e,o){if(t===l.maxZoom||t===o)continue;var d=1<<o-t;if(r!==Math.floor(i/d)||n!==Math.floor(s/d))continue}else if(t===l.indexMaxZoom||f.numPoints<=l.indexMaxPoints)continue;if(f.source=null,0!==e.length){u>1&&console.time("clipping");var g,m,y,v,x,w,S=.5*l.buffer/l.extent,M=.5-S,_=.5+S,P=1+S;g=m=y=v=null,x=ee(e,h,r-S,r+_,0,f.minX,f.maxX,l),w=ee(e,h,r+M,r+P,0,f.minX,f.maxX,l),e=null,x&&(g=ee(x,h,n-S,n+_,1,f.minY,f.maxY,l),m=ee(x,h,n+M,n+P,1,f.minY,f.maxY,l),x=null),w&&(y=ee(w,h,n-S,n+_,1,f.minY,f.maxY,l),v=ee(w,h,n+M,n+P,1,f.minY,f.maxY,l),w=null),u>1&&console.timeEnd("clipping"),a.push(g||[],t+1,2*r,2*n),a.push(m||[],t+1,2*r,2*n+1),a.push(y||[],t+1,2*r+1,2*n),a.push(v||[],t+1,2*r+1,2*n+1);}}},ge.prototype.getTile=function(e,t,r){var n=this.options,o=n.extent,i=n.debug;if(e<0||e>24)return null;var s=1<<e,a=me(e,t=(t%s+s)%s,r);if(this.tiles[a])return he(this.tiles[a],o);i>1&&console.log("drilling down to z%d-%d-%d",e,t,r);for(var l,u=e,h=t,c=r;!l&&u>0;)u--,h=Math.floor(h/2),c=Math.floor(c/2),l=this.tiles[me(u,h,c)];return l&&l.source?(i>1&&console.log("found parent tile z%d-%d-%d",u,h,c),i>1&&console.time("drilling down"),this.splitTile(l.source,u,h,c,e,t,r),i>1&&console.timeEnd("drilling down"),this.tiles[a]?he(this.tiles[a],o):null):null};class ve extends e.VectorTileWorkerSource{constructor(e,t,r,n,o){super(e,t,r,n,ye),o&&(this.loadGeoJSON=o);}loadData(e,t){this._pendingCallback&&this._pendingCallback(null,{abandoned:!0}),this._pendingCallback=t,this._pendingLoadDataParams=e,this._state&&"Idle"!==this._state?this._state="NeedsLoadData":(this._state="Coalescing",this._loadData());}_loadData(){if(!this._pendingCallback||!this._pendingLoadDataParams)return;const t=this._pendingCallback,r=this._pendingLoadDataParams;delete this._pendingCallback,delete this._pendingLoadDataParams;const n=!!(r&&r.request&&r.request.collectResourceTiming)&&new e.RequestPerformance(r.request);this.loadGeoJSON(r,(o,i)=>{if(o||!i)return t(o);if("object"!=typeof i)return t(new Error(`Input data given to '${r.source}' is not a valid GeoJSON object.`));{!function e(t,r){var n,o=t&&t.type;if("FeatureCollection"===o)for(n=0;n<t.features.length;n++)e(t.features[n],r);else if("GeometryCollection"===o)for(n=0;n<t.geometries.length;n++)e(t.geometries[n],r);else if("Feature"===o)e(t.geometry,r);else if("Polygon"===o)s(t.coordinates,r);else if("MultiPolygon"===o)for(n=0;n<t.coordinates.length;n++)s(t.coordinates[n],r);return t}(i,!0);try{if(r.filter){const t=e.createExpression(r.filter,{type:"boolean","property-type":"data-driven",overridable:!1,transition:!1});if("error"===t.result)throw new Error(t.value.map(e=>`${e.key}: ${e.message}`).join(", "));const n=i.features.filter(e=>t.value.evaluate({zoom:0},e));i={type:"FeatureCollection",features:n};}this._geoJSONIndex=r.cluster?new F(function({superclusterOptions:t,clusterProperties:r}){if(!r||!t)return t;const n={},o={},i={accumulated:null,zoom:0},s={properties:null},a=Object.keys(r);for(const t of a){const[i,s]=r[t],a=e.createExpression(s),l=e.createExpression("string"==typeof i?[i,["accumulated"],["get",t]]:i);n[t]=a.value,o[t]=l.value;}return t.map=e=>{s.properties=e;const t={};for(const e of a)t[e]=n[e].evaluate(i,s);return t},t.reduce=(e,t)=>{s.properties=t;for(const t of a)i.accumulated=e[t],e[t]=o[t].evaluate(i,s);},t}(r)).load(i.features):function(e,t){return new ge(e,t)}(i,r.geojsonVtOptions);}catch(o){return t(o)}this.loaded={};const a={};if(n){const e=n.finish();e&&(a.resourceTiming={},a.resourceTiming[r.source]=JSON.parse(JSON.stringify(e)));}t(null,a);}});}coalesce(){"Coalescing"===this._state?this._state="Idle":"NeedsLoadData"===this._state&&(this._state="Coalescing",this._loadData());}reloadTile(e,t){const r=this.loaded;return r&&r[e.uid]?super.reloadTile(e,t):this.loadTile(e,t)}loadGeoJSON(t,r){if(t.request)e.getJSON(t.request,r);else {if("string"!=typeof t.data)return r(new Error(`Input data given to '${t.source}' is not a valid GeoJSON object.`));try{return r(null,JSON.parse(t.data))}catch(e){return r(new Error(`Input data given to '${t.source}' is not a valid GeoJSON object.`))}}}removeSource(e,t){this._pendingCallback&&this._pendingCallback(null,{abandoned:!0}),t();}getClusterExpansionZoom(e,t){try{t(null,this._geoJSONIndex.getClusterExpansionZoom(e.clusterId));}catch(e){t(e);}}getClusterChildren(e,t){try{t(null,this._geoJSONIndex.getChildren(e.clusterId));}catch(e){t(e);}}getClusterLeaves(e,t){try{t(null,this._geoJSONIndex.getLeaves(e.clusterId,e.limit,e.offset));}catch(e){t(e);}}}class xe{constructor(t){this.self=t,this.actor=new e.Actor(t,this),this.layerIndexes={},this.availableImages={},this.isSpriteLoaded=!1,this.workerSourceTypes={vector:e.VectorTileWorkerSource,geojson:ve},this.workerSources={},this.demWorkerSources={},this.self.registerWorkerSource=(e,t)=>{if(this.workerSourceTypes[e])throw new Error(`Worker source with name "${e}" already registered.`);this.workerSourceTypes[e]=t;},this.self.registerRTLTextPlugin=t=>{if(e.plugin.isParsed())throw new Error("RTL text plugin already registered.");e.plugin.applyArabicShaping=t.applyArabicShaping,e.plugin.processBidirectionalText=t.processBidirectionalText,e.plugin.processStyledBidirectionalText=t.processStyledBidirectionalText;};}checkIfReady(e,t,r){r();}setReferrer(e,t){this.referrer=t;}spriteLoaded(t,r){this.isSpriteLoaded=r;for(const n in this.workerSources[t]){const o=this.workerSources[t][n];for(const t in o)o[t]instanceof e.VectorTileWorkerSource&&(o[t].isSpriteLoaded=r,o[t].fire(new e.Event("isSpriteLoaded")));}}setImages(e,t,r){this.availableImages[e]=t;for(const r in this.workerSources[e]){const n=this.workerSources[e][r];for(const e in n)n[e].availableImages=t;}r();}enableTerrain(e,t,r){this.terrain=t,r();}setLayers(e,t,r){this.getLayerIndex(e).replace(t),r();}updateLayers(e,t,r){this.getLayerIndex(e).update(t.layers,t.removedIds),r();}loadTile(t,r,n){const o=this.enableTerrain?e.extend({enableTerrain:this.terrain},r):r;this.getWorkerSource(t,r.type,r.source).loadTile(o,n);}loadDEMTile(t,r,n){const o=this.enableTerrain?e.extend({buildQuadTree:this.terrain},r):r;this.getDEMWorkerSource(t,r.source).loadTile(o,n);}reloadTile(t,r,n){const o=this.enableTerrain?e.extend({enableTerrain:this.terrain},r):r;this.getWorkerSource(t,r.type,r.source).reloadTile(o,n);}abortTile(e,t,r){this.getWorkerSource(e,t.type,t.source).abortTile(t,r);}removeTile(e,t,r){this.getWorkerSource(e,t.type,t.source).removeTile(t,r);}removeSource(e,t,r){if(!this.workerSources[e]||!this.workerSources[e][t.type]||!this.workerSources[e][t.type][t.source])return;const n=this.workerSources[e][t.type][t.source];delete this.workerSources[e][t.type][t.source],void 0!==n.removeSource?n.removeSource(t,r):r();}loadWorkerSource(e,t,r){try{this.self.importScripts(t.url),r();}catch(e){r(e.toString());}}syncRTLPluginState(t,r,n){try{e.plugin.setState(r);const t=e.plugin.getPluginURL();if(e.plugin.isLoaded()&&!e.plugin.isParsed()&&null!=t){this.self.importScripts(t);const r=e.plugin.isParsed();n(r?void 0:new Error(`RTL Text Plugin failed to import scripts from ${t}`),r);}}catch(e){n(e.toString());}}getAvailableImages(e){let t=this.availableImages[e];return t||(t=[]),t}getLayerIndex(e){let t=this.layerIndexes[e];return t||(t=this.layerIndexes[e]=new n),t}getWorkerSource(e,t,r){return this.workerSources[e]||(this.workerSources[e]={}),this.workerSources[e][t]||(this.workerSources[e][t]={}),this.workerSources[e][t][r]||(this.workerSources[e][t][r]=new this.workerSourceTypes[t]({send:(t,r,n,o,i,s)=>{this.actor.send(t,r,n,e,o,s);},scheduler:this.actor.scheduler},this.getLayerIndex(e),this.getAvailableImages(e),this.isSpriteLoaded)),this.workerSources[e][t][r]}getDEMWorkerSource(e,t){return this.demWorkerSources[e]||(this.demWorkerSources[e]={}),this.demWorkerSources[e][t]||(this.demWorkerSources[e][t]=new i),this.demWorkerSources[e][t]}enforceCacheSizeLimit(t,r){e.enforceCacheSizeLimit(r);}getWorkerPerformanceMetrics(e,t,r){r(void 0,void 0);}}return "undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof self&&self instanceof WorkerGlobalScope&&(self.worker=new xe(self)),xe}));


//

return mapboxgl;

})));
//# sourceMappingURL=mapbox-gl.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ }),
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 195 */,
/* 196 */,
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "732389ded34cb9c52dd88271f1345af9.ttf";

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "535877f50039c0cb49a6196a5b7517cd.woff";

/***/ }),
/* 199 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('div',{attrs:{"id":"map"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(164);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(202)("10af9193", content, true, {});

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(203)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 203 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
],[127]);
//# sourceMappingURL=index.js.map?4c0c574392d74f2f35e3
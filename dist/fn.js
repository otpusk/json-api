"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCall = makeCall;
exports.createQueryStringFromObject = createQueryStringFromObject;
exports.mergeDefinedObjectValues = mergeDefinedObjectValues;
exports.HttpResponseError = void 0;

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _fetchJsonp = _interopRequireDefault(require("fetch-jsonp"));

var _moment = _interopRequireDefault(require("moment"));

var _cache = require("./cache");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Convert object to ulr query string
 *
 * @param {Object} params query object
 *
 * @returns {string} query stirng
 */
function createQueryStringFromObject(params) {
  return Object.entries(params).map(function (param) {
    return param.join('=');
  }).join('&');
}
/**
 * Hash string
 *
 * @param {string} str
 *
 * @returns {string} hash
 */


function hash(str) {
  var hash = 5381;
  var i = str.length;

  while (i) {
    hash = hash * 33 ^ str.charCodeAt(--i);
  }

  return String(hash >>> 0);
}
/**
 * Parse api response
 *
 * @param {Object} response api response
 * @returns {Object} data
 */


function parseResponse(_x) {
  return _parseResponse.apply(this, arguments);
}

function _parseResponse() {
  _parseResponse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(response) {
    var body, error, message, errorInstance;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return response.json();

          case 2:
            body = _context.sent;
            error = body.error, message = body.message;

            if (!(!response.ok || error)) {
              _context.next = 10;
              break;
            }

            errorInstance = new Error(message);
            errorInstance.response = _objectSpread(_objectSpread({}, body), {}, {
              statusCode: response.status
            });
            throw errorInstance;

          case 10:
            return _context.abrupt("return", body);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseResponse.apply(this, arguments);
}

function fetchWithTimeout(request, body, method, timeout) {
  return Promise.race([(0, _isomorphicFetch.default)(request, {
    body: body,
    method: method
  }), new Promise(function (_, reject) {
    setTimeout(function () {
      return reject(new Error("request to ".concat(request, " timed out")));
    }, timeout);
  })]);
}
/**
 * Make api call
 *
 * @param {string} endpoint Request endpoint
 * @param {Object} query Request query
 * @param {Object} ttl Moment duration
 * @param {number} timeout Request timeout
 *
 * @returns {Promise} Response
 */


function makeCall(_x2) {
  return _makeCall.apply(this, arguments);
}
/**
 * Copy defined source object fields to target object
 * @param {*} target
 * @param {*} source
 *
 * @returns {*} result
 */


function _makeCall() {
  _makeCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
    var body, endpoint, _ref$method, method, _ref$query, query, _ref$ttl, ttl, _ref$timeout, timeout, _ref$jsonp, jsonp, request, cache, cachedValue, response, result;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = _ref.body, endpoint = _ref.endpoint, _ref$method = _ref.method, method = _ref$method === void 0 ? 'GET' : _ref$method, _ref$query = _ref.query, query = _ref$query === void 0 ? {} : _ref$query, _ref$ttl = _ref.ttl, ttl = _ref$ttl === void 0 ? null : _ref$ttl, _ref$timeout = _ref.timeout, timeout = _ref$timeout === void 0 ? 10000 : _ref$timeout, _ref$jsonp = _ref.jsonp, jsonp = _ref$jsonp === void 0 ? false : _ref$jsonp;
            request = "".concat(endpoint, "?").concat(createQueryStringFromObject(query));
            cache = new _cache.CacheItem(hash(request));
            _context2.next = 5;
            return cache.isHit(ttl);

          case 5:
            if (!_context2.sent) {
              _context2.next = 10;
              break;
            }

            _context2.next = 8;
            return cache.get();

          case 8:
            cachedValue = _context2.sent;
            return _context2.abrupt("return", cachedValue);

          case 10:
            response = null;

            if (!jsonp) {
              _context2.next = 15;
              break;
            }

            _context2.next = 14;
            return (0, _fetchJsonp.default)(request, {
              timeout: timeout
            });

          case 14:
            response = _context2.sent;

          case 15:
            if (jsonp) {
              _context2.next = 19;
              break;
            }

            _context2.next = 18;
            return fetchWithTimeout(request, body, method, timeout);

          case 18:
            response = _context2.sent;

          case 19:
            _context2.next = 21;
            return parseResponse(response);

          case 21:
            result = _context2.sent;

            if (!ttl) {
              _context2.next = 27;
              break;
            }

            cache.set(result);
            cache.expiresAfter(_moment.default.duration.apply(_moment.default, _toConsumableArray(ttl)));
            _context2.next = 27;
            return cache.save();

          case 27:
            return _context2.abrupt("return", result);

          case 28:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _makeCall.apply(this, arguments);
}

function mergeDefinedObjectValues(target, source) {
  var result = Object.assign({}, target);

  for (var _i = 0, _Object$entries = Object.entries(source); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        f = _Object$entries$_i[0],
        v = _Object$entries$_i[1];

    if (typeof v !== 'undefined') {
      result[f] = v;
    }
  }

  return result;
}

var HttpResponseError = function HttpResponseError(code, message) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  _classCallCheck(this, HttpResponseError);

  this.code = code;
  this.message = message;
  this.data = data;
};

exports.HttpResponseError = HttpResponseError;
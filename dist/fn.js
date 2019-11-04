"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCall = makeCall;
exports.createQueryStringFromObject = createQueryStringFromObject;
exports.mergeDefinedObjectValues = mergeDefinedObjectValues;
exports.HttpResponseError = void 0;

var _fetchJsonp = _interopRequireDefault(require("fetch-jsonp"));

var _moment = _interopRequireDefault(require("moment"));

var _cache = require("./cache");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
/**
 * Make api call
 *
 * @param {string} endpoint Request endpoint
 * @param {Object} query Request query
 * @param {Object} ttl Moment duration
 *
 * @returns {Promise} Response
 */


function _parseResponse() {
  _parseResponse = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(response) {
    var body, error, message;
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
              _context.next = 8;
              break;
            }

            throw new Error(message);

          case 8:
            return _context.abrupt("return", body);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _parseResponse.apply(this, arguments);
}

function makeCall(_x2, _x3, _x4) {
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
  _makeCall = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(endpoint, query, ttl) {
    var request, cache, _body, response, body;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            request = "".concat(endpoint, "?").concat(createQueryStringFromObject(query));
            cache = new _cache.CacheItem(hash(request));
            _context2.next = 4;
            return cache.isHit(ttl);

          case 4:
            if (!_context2.sent) {
              _context2.next = 9;
              break;
            }

            _context2.next = 7;
            return cache.get();

          case 7:
            _body = _context2.sent;
            return _context2.abrupt("return", _body);

          case 9:
            _context2.next = 11;
            return (0, _fetchJsonp.default)(request, {
              timeout: 10000
            });

          case 11:
            response = _context2.sent;
            _context2.next = 14;
            return parseResponse(response);

          case 14:
            body = _context2.sent;

            if (!ttl) {
              _context2.next = 20;
              break;
            }

            cache.set(body);
            cache.expiresAfter(_moment.default.duration.apply(_moment.default, _toConsumableArray(ttl)));
            _context2.next = 20;
            return cache.save();

          case 20:
            return _context2.abrupt("return", body);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _makeCall.apply(this, arguments);
}

function mergeDefinedObjectValues(target, source) {
  var result = Object.assign({}, target);

  var _arr = Object.entries(source);

  for (var _i = 0; _i < _arr.length; _i++) {
    var _arr$_i = _slicedToArray(_arr[_i], 2),
        f = _arr$_i[0],
        v = _arr$_i[1];

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
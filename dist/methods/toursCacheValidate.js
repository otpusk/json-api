"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheValidate = cacheValidate;

var _moment = _interopRequireDefault(require("moment"));

var _fn = require("../fn");

var _config = require("../config");

var _cache = require("./../cache");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function cacheValidate(_x) {
  return _cacheValidate.apply(this, arguments);
}

function _cacheValidate() {
  _cacheValidate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
    var _yield$makeCall, lastTimeUpdated, hash, cache, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fn.makeCall)({
              endpoint: _config.ENDPOINTS.cacheValidate,
              query: token
            });

          case 2:
            _yield$makeCall = _context.sent;
            lastTimeUpdated = _yield$makeCall.timestamp;
            hash = btoa("".concat(lastTimeUpdated));
            cache = new _cache.CacheItem(_config.ENDPOINTS.cacheValidate);
            _context.next = 8;
            return cache.read();

          case 8:
            cache.isHit = function () {
              return Promise.resolve(true);
            };

            _context.next = 11;
            return cache.get();

          case 11:
            result = _context.sent;

            if (!(result !== hash)) {
              _context.next = 18;
              break;
            }

            _context.next = 15;
            return _cache.cacheStorage.clear();

          case 15:
            cache.set(hash);
            _context.next = 18;
            return cache.save();

          case 18:
            return _context.abrupt("return", {
              hash: hash,
              lastTimeUpdated: (0, _moment.default)(lastTimeUpdated, 'X').utc(true)
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _cacheValidate.apply(this, arguments);
}
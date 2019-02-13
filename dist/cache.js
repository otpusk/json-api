"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheItem = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _storage = require("./storage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cacheStorage = (0, _storage.createStorage)('otpusk_api_cache');

var CacheItem = function CacheItem(key) {
  var _this = this;

  _classCallCheck(this, CacheItem);

  this.getKey = function () {
    return _this.key;
  };

  this.get =
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _this.isHit();

          case 2:
            if (!_context.sent) {
              _context.next = 6;
              break;
            }

            _context.t0 = _this.record.value;
            _context.next = 7;
            break;

          case 6:
            _context.t0 = null;

          case 7:
            return _context.abrupt("return", _context.t0);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  this.isHit =
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _this.read();

          case 2:
            return _context2.abrupt("return", (0, _moment.default)().format('X') < _this.record.expires);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  this.read =
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!_this.record) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", _this.record);

          case 2:
            _context3.next = 4;
            return cacheStorage.get(_this.key, {
              value: null,
              expires: -1
            });

          case 4:
            _this.record = _context3.sent;

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  this.save =
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return cacheStorage.set(_this.key, _this.record);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  this.set = function (value) {
    return Object.assign(_this.record, {
      value: value
    });
  };

  this.expiresAt = function (time) {
    return Object.assign(_this.record, {
      expires: (0, _moment.default)(time).format('X')
    });
  };

  this.expiresAfter = function (duration) {
    return _this.expiresAt((0, _moment.default)().add(duration));
  };

  this.key = key;
  this.record = null;
};

exports.CacheItem = CacheItem;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheItem = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _storage = require("./storage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var cacheStorage = (0, _storage.createStorage)('otpusk_api_cache');
cacheStorage.findAll().then(function (all) {
  var _arr = Object.entries(all);

  for (var _i = 0; _i < _arr.length; _i++) {
    var _arr$_i = _slicedToArray(_arr[_i], 2),
        key = _arr$_i[0],
        expires = _arr$_i[1].expires;

    if (expires <= (0, _moment.default)().format('X')) {
      cacheStorage.remove(key);
    }
  }
});

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
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(ttl) {
      var timealive;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.read();

            case 2:
              timealive = _this.record.expires - (0, _moment.default)().format('X');
              return _context2.abrupt("return", timealive > 0 && (!ttl || _moment.default.duration.apply(_moment.default, _toConsumableArray(ttl)).asSeconds() > timealive));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }();

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

  this.save = function () {
    return cacheStorage.set(_this.key, _this.record);
  };

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
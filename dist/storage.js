"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStorage = void 0;

var _localforage = _interopRequireDefault(require("localforage"));

var _immutable = require("immutable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Storage = /*#__PURE__*/function () {
  function Storage(storeName) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Storage);

    this.memory = (0, _immutable.Map)();
    this.instance = _localforage.default.createInstance(_objectSpread({
      name: 'web.otpusk.com',
      storeName: storeName,
      driver: [_localforage.default.LOCALSTORAGE]
    }, config));
  }

  _createClass(Storage, [{
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key, defaults) {
        var _this = this;

        var value;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.instance.getItem(key);

              case 3:
                value = _context.sent;
                return _context.abrupt("return", value ? value : defaults);

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                this.warn();
                return _context.abrupt("return", new Promise(function (resolve) {
                  return resolve(_this.memory.get(key, defaults));
                }));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function get(_x, _x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "findAll",
    value: function () {
      var _findAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var found;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                found = {};
                _context2.next = 4;
                return this.instance.iterate(function (value, key) {
                  Object.assign(found, _defineProperty({}, key, value));
                });

              case 4:
                return _context2.abrupt("return", found);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                this.warn();
                return _context2.abrupt("return", new Promise(function (resolve) {
                  return resolve(_this2.memory.toJS());
                }));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function findAll() {
        return _findAll.apply(this, arguments);
      }

      return findAll;
    }()
  }, {
    key: "keys",
    value: function () {
      var _keys = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(callback) {
        var _keys2;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.instance.keys();

              case 3:
                _keys2 = _context3.sent;
                callback(_keys2);
                _context3.next = 11;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                this.warn();
                callback(this.memory.keys().toArray());

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function keys(_x3) {
        return _keys.apply(this, arguments);
      }

      return keys;
    }()
  }, {
    key: "set",
    value: function () {
      var _set = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(key, value) {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.instance.setItem(key, value);

              case 3:
                _context4.next = 9;
                break;

              case 5:
                _context4.prev = 5;
                _context4.t0 = _context4["catch"](0);
                this.warn();
                return _context4.abrupt("return", new Promise(function (resolve) {
                  return resolve(_this3.memory.set(key, value));
                }));

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 5]]);
      }));

      function set(_x4, _x5) {
        return _set.apply(this, arguments);
      }

      return set;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(key) {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.instance.removeItem(key);

              case 3:
                _context5.next = 9;
                break;

              case 5:
                _context5.prev = 5;
                _context5.t0 = _context5["catch"](0);
                this.warn();
                return _context5.abrupt("return", new Promise(function (resolve) {
                  return resolve(_this4.memory.remove(key));
                }));

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 5]]);
      }));

      function remove(_x6) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: "clear",
    value: function () {
      var _clear = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this5 = this;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this.instance.clear();

              case 3:
                _context6.next = 9;
                break;

              case 5:
                _context6.prev = 5;
                _context6.t0 = _context6["catch"](0);
                this.warn();
                return _context6.abrupt("return", new Promise(function (resolve) {
                  return resolve(_this5.memory.clear());
                }));

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 5]]);
      }));

      function clear() {
        return _clear.apply(this, arguments);
      }

      return clear;
    }()
  }, {
    key: "merge",
    value: function () {
      var _merge = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(content) {
        var _this6 = this;

        var _i, _Object$entries, _Object$entries$_i, key, value;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _i = 0, _Object$entries = Object.entries(content);

              case 2:
                if (!(_i < _Object$entries.length)) {
                  _context7.next = 9;
                  break;
                }

                _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                _context7.next = 6;
                return this.set(key, value);

              case 6:
                _i++;
                _context7.next = 2;
                break;

              case 9:
                _context7.next = 15;
                break;

              case 11:
                _context7.prev = 11;
                _context7.t0 = _context7["catch"](0);
                this.warn();
                return _context7.abrupt("return", new Promise(function (resolve) {
                  return resolve(_this6.memory.merge(content));
                }));

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 11]]);
      }));

      function merge(_x7) {
        return _merge.apply(this, arguments);
      }

      return merge;
    }()
  }, {
    key: "warn",
    value: function warn() {
      console.warn('Включите локальное хранилище в вашем браузере для полноценной работы приложения');
    }
  }]);

  return Storage;
}();

var createStorage = function createStorage(name) {
  return Object.freeze(new Storage(name));
};

exports.createStorage = createStorage;
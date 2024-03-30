"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursDates = getToursDates;

var _ramda = require("ramda");

var _fn = require("../fn");

var _config = require("../config");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursDates(_x, _x2) {
  return _getToursDates.apply(this, arguments);
}

function _getToursDates() {
  _getToursDates = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, options) {
    var _yield$makeCall, _yield$makeCall$dates, denormalizedDates;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fn.makeCall)({
              endpoint: _config.ENDPOINTS.dates,
              query: _objectSpread(_objectSpread({}, token), options),
              ttl: [2, 'hour']
            });

          case 2:
            _yield$makeCall = _context.sent;
            _yield$makeCall$dates = _yield$makeCall.dates;
            denormalizedDates = _yield$makeCall$dates === void 0 ? {} : _yield$makeCall$dates;
            return _context.abrupt("return", (0, _ramda.map)(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  date = _ref2[0],
                  rangeAsString = _ref2[1];

              var rangeAsSortedArray = (0, _ramda.call)((0, _ramda.pipe)((0, _ramda.split)(','), (0, _ramda.map)(Number), (0, _ramda.sort)((0, _ramda.ascend)(function (range) {
                return range;
              }))), rangeAsString);
              return {
                date: date,
                range: rangeAsSortedArray
              };
            }, (0, _ramda.toPairs)(denormalizedDates)));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursDates.apply(this, arguments);
}
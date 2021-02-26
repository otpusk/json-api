"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursDepartureCities = getToursDepartureCities;

var _fn = require("../fn");

var _config = require("../config");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursDepartureCities(_x) {
  return _getToursDepartureCities.apply(this, arguments);
}

function _getToursDepartureCities() {
  _getToursDepartureCities = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
    var options,
        _yield$makeCall,
        fromCities,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            _context.next = 3;
            return (0, _fn.makeCall)({
              endpoint: _config.ENDPOINTS.departureCities,
              query: _objectSpread(_objectSpread({}, token), options),
              ttl: [7, 'days']
            });

          case 3:
            _yield$makeCall = _context.sent;
            fromCities = _yield$makeCall.fromCities;
            return _context.abrupt("return", fromCities.map(function (_ref) {
              var rel = _ref.rel,
                  rest = _objectWithoutProperties(_ref, ["rel"]);

              return _objectSpread(_objectSpread({}, rest), {}, {
                names: {
                  rd: rel
                }
              });
            }));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursDepartureCities.apply(this, arguments);
}

;
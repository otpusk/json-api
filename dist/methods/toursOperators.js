"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursOperators = getToursOperators;

var _fn = require("../fn");

var _config = require("../config");

var _dictionary = require("../dictionary");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursOperators(_x, _x2) {
  return _getToursOperators.apply(this, arguments);
}

function _getToursOperators() {
  _getToursOperators = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, countryId) {
    var options,
        _yield$makeCall,
        _yield$makeCall$opera,
        raw,
        operators,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            _context.next = 3;
            return (0, _fn.makeCall)(_config.ENDPOINTS.operators, _objectSpread(_objectSpread({
              countryId: countryId
            }, options), token));

          case 3:
            _yield$makeCall = _context.sent;
            _yield$makeCall$opera = _yield$makeCall.operators;
            raw = _yield$makeCall$opera === void 0 ? {} : _yield$makeCall$opera;
            operators = Object.values(raw).map(function (_ref) {
              var id = _ref.id,
                  name = _ref.name,
                  url = _ref.url,
                  currencies = _ref.currencies;
              return {
                id: id,
                name: name,
                url: url,
                currencyRates: currencies,
                logo: (0, _dictionary.getOperatorLogoById)(id)
              };
            });
            return _context.abrupt("return", operators);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursOperators.apply(this, arguments);
}
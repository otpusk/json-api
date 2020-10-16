"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursCurrencyRates = getToursCurrencyRates;

var _immutable = require("immutable");

var _fn = require("../fn");

var _config = require("../config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursCurrencyRates(_x, _x2) {
  return _getToursCurrencyRates.apply(this, arguments);
}

function _getToursCurrencyRates() {
  _getToursCurrencyRates = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, date) {
    var options,
        from,
        to,
        _ref,
        _ref$rates,
        rates,
        results,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            from = date.from, to = date.to;
            _context.next = 4;
            return (0, _fn.makeCall)(_config.ENDPOINTS.currencyRates, _objectSpread({
              'datebegin': from,
              'dateend': to
            }, options, {}, token));

          case 4:
            _ref = _context.sent;
            _ref$rates = _ref.rates;
            rates = _ref$rates === void 0 ? {} : _ref$rates;
            results = (0, _immutable.Map)(rates).map(function (rate) {
              return (0, _immutable.Map)(rate).map(function (operators) {
                return (0, _immutable.Map)(operators).map(function (operator) {
                  return (0, _immutable.Map)(operator).update('history', function (history) {
                    return (0, _immutable.Map)(history).map(function (value, dateKey) {
                      return {
                        rate: value,
                        date: dateKey
                      };
                    }).toList().toArray();
                  }).toObject();
                }).toObject();
              }).toObject();
            }).toObject();
            return _context.abrupt("return", results);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursCurrencyRates.apply(this, arguments);
}
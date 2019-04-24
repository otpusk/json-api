"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursOperators = getToursOperators;

var _fn = require("../fn");

var _config = require("../config");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursOperators(_x, _x2) {
  return _getToursOperators.apply(this, arguments);
}

function _getToursOperators() {
  _getToursOperators = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(token, countryId) {
    var options,
        _ref,
        _ref$operators,
        raw,
        operators,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            _context.next = 3;
            return (0, _fn.makeCall)(_config.ENDPOINTS.operators, _objectSpread({
              countryId: countryId
            }, options, token), [7, 'days']);

          case 3:
            _ref = _context.sent;
            _ref$operators = _ref.operators;
            raw = _ref$operators === void 0 ? {} : _ref$operators;
            operators = Object.values(raw).map(function (_ref2) {
              var id = _ref2.id,
                  name = _ref2.name,
                  url = _ref2.url,
                  currencies = _ref2.currencies;
              return {
                id: id,
                name: name,
                url: url,
                currencyRates: currencies,
                logo: "https://export.otpusk.com/images/onsite/logo/logo-".concat(id, ".png")
              };
            });
            return _context.abrupt("return", operators);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getToursOperators.apply(this, arguments);
}
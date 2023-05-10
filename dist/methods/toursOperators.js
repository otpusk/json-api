"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursOperators = getToursOperators;

var R = _interopRequireWildcard(require("ramda"));

var _fn = require("../fn");

var _config = require("../config");

var _dictionary = require("../dictionary");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
        methodVersion,
        _yield$makeCall,
        _yield$makeCall$opera,
        raw,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            methodVersion = _args.length > 3 ? _args[3] : undefined;
            _context.next = 4;
            return (0, _fn.makeCall)({
              endpoint: methodVersion ? R.replace(_config.API_VERSION, methodVersion, _config.ENDPOINTS.operators) : _config.ENDPOINTS.operators,
              query: _objectSpread(_objectSpread({
                countryId: countryId
              }, options), token),
              ttl: [2, 'hour']
            });

          case 4:
            _yield$makeCall = _context.sent;
            _yield$makeCall$opera = _yield$makeCall.operators;
            raw = _yield$makeCall$opera === void 0 ? {} : _yield$makeCall$opera;
            return _context.abrupt("return", R.call(R.pipe(R.values, R.map(function (operator) {
              var _operator$offer_ttl;

              return R.mergeAll([R.pick(['active', 'id', 'name', 'url', 'transports'], operator), {
                currencyRates: operator.currencies,
                logo: (0, _dictionary.getOperatorLogoById)(operator.id),
                offerTTLAsMinutes: (_operator$offer_ttl = operator.offer_ttl) !== null && _operator$offer_ttl !== void 0 ? _operator$offer_ttl : undefined
              }]);
            })), raw));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursOperators.apply(this, arguments);
}
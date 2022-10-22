"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursCountries = getToursCountries;

var _normalizr = require("normalizr");

var R = _interopRequireWildcard(require("ramda"));

var _schemas = require("../normalize/schemas");

var _fn = require("../fn");

var _config = require("../config");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var withPrice = function withPrice(options) {
  return options && options.with === 'price';
};

function getToursCountries(_x) {
  return _getToursCountries.apply(this, arguments);
}

function _getToursCountries() {
  _getToursCountries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
    var options,
        methodVersion,
        _yield$makeCall,
        denormalizedCountries,
        _normalize,
        countries,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {
              'with': 'price'
            };
            methodVersion = _args.length > 2 ? _args[2] : undefined;
            _context.next = 4;
            return (0, _fn.makeCall)({
              endpoint: methodVersion ? R.replace(_config.API_VERSION, methodVersion, _config.ENDPOINTS.countries) : _config.ENDPOINTS.countries,
              query: _objectSpread(_objectSpread({}, token), options),
              ttl: withPrice(options) ? void 0 : [7, 'days']
            });

          case 4:
            _yield$makeCall = _context.sent;
            denormalizedCountries = _yield$makeCall.countries;
            _normalize = (0, _normalizr.normalize)(denormalizedCountries, [_schemas.countrySchema]), countries = _normalize.entities.country;
            return _context.abrupt("return", Object.values(countries));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursCountries.apply(this, arguments);
}
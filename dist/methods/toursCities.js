"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursCities = getToursCities;

var _normalizr = require("normalizr");

var _fn = require("../fn");

var _config = require("../config");

var _schemas = require("../normalize/schemas");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursCities(_x, _x2) {
  return _getToursCities.apply(this, arguments);
}

function _getToursCities() {
  _getToursCities = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, countryId) {
    var options,
        _yield$makeCall,
        denormalizedCities,
        _normalize,
        cities,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {
              'with': 'price'
            };
            _context.next = 3;
            return (0, _fn.makeCall)({
              endpoint: _config.ENDPOINTS.cities,
              query: _objectSpread(_objectSpread({
                countryId: countryId
              }, token), options),
              ttl: [7, 'days']
            });

          case 3:
            _yield$makeCall = _context.sent;
            denormalizedCities = _yield$makeCall.cities;
            _normalize = (0, _normalizr.normalize)(denormalizedCities.map(function (city) {
              return Object.assign(city, {
                countryId: countryId
              });
            }), [_schemas.citySchema]), cities = _normalize.entities.city;
            return _context.abrupt("return", Object.values(cities));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursCities.apply(this, arguments);
}
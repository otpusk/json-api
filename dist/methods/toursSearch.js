"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursSearch = getToursSearch;

var _normalizr = require("normalizr");

var _fn = require("../fn");

var _schemas = require("../normalize/schemas");

var _config = require("../config");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursSearch(_x, _x2) {
  return _getToursSearch.apply(this, arguments);
}

function _getToursSearch() {
  _getToursSearch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(token, query) {
    var _ref, denormalizedHotels, denormalizedCountry, other, _normalize, _normalize$entities, hotels, offers, _normalize2, countries, countryId;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fn.makeCall)(_config.ENDPOINTS.search, _objectSpread({}, query, token));

          case 2:
            _ref = _context.sent;
            denormalizedHotels = _ref.hotels;
            denormalizedCountry = _ref.cnt;
            other = _objectWithoutProperties(_ref, ["hotels", "cnt"]);
            _normalize = (0, _normalizr.normalize)(denormalizedHotels || {}, new _normalizr.schema.Values(new _normalizr.schema.Values(_schemas.hotelSchema))), _normalize$entities = _normalize.entities, hotels = _normalize$entities.hotel, offers = _normalize$entities.offer;
            _normalize2 = (0, _normalizr.normalize)(denormalizedCountry || {}, _schemas.countrySchema), countries = _normalize2.entities.country, countryId = _normalize2.result;
            return _context.abrupt("return", _objectSpread({
              result: hotels && offers ? {
                hotels: hotels,
                offers: offers
              } : {},
              country: denormalizedCountry && countryId ? countries[countryId] : null
            }, other));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getToursSearch.apply(this, arguments);
}
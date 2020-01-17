"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursSearch = getToursSearch;

var _normalizr = require("normalizr");

var _immutable = require("immutable");

var _moment = _interopRequireDefault(require("moment"));

var _fn = require("../fn");

var _schemas = require("../normalize/schemas");

var _parsers = require("../normalize/parsers");

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function normalizePricesChart(denormalized) {
  var start = denormalized.ds,
      end = denormalized.dt,
      d = denormalized.d;
  var points = (0, _immutable.Range)(0, (0, _moment.default)(end).diff((0, _moment.default)(start), 'days') + 1);
  var peak = {};
  return points.toArray().map(function (day) {
    return (0, _moment.default)(start).add(day, 'days').format('X');
  }).map(function (day) {
    var price = day in d ? (0, _parsers.parsePrice)(d[day]) : null;

    if (price && (!peak.uah || peak.uah < price.uah)) {
      Object.assign(peak, price);
    }

    return {
      day: day,
      price: price
    };
  }).map(function (_ref) {
    var day = _ref.day,
        price = _ref.price;
    var delta = price && peak ? Number((price.uah / peak.uah * 100).toFixed(2)) : null;
    return {
      day: day,
      price: price,
      delta: delta
    };
  });
}

function getToursSearch(_x, _x2) {
  return _getToursSearch.apply(this, arguments);
}

function _getToursSearch() {
  _getToursSearch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(token, query) {
    var _ref2, denormalizedHotels, _ref2$pg, denormalizedChart, _ref2$cnt, denormalizedCountry, other, _normalize, _normalize$entities, hotels, offers, exactChildrenAges, injectUahCurrency, id, _normalize2, countries, countryId, meta;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fn.makeCall)(_config.ENDPOINTS.search, _objectSpread({}, query, {}, token));

          case 2:
            _ref2 = _context.sent;
            denormalizedHotels = _ref2.hotels;
            _ref2$pg = _ref2.pg;
            denormalizedChart = _ref2$pg === void 0 ? null : _ref2$pg;
            _ref2$cnt = _ref2.cnt;
            denormalizedCountry = _ref2$cnt === void 0 ? null : _ref2$cnt;
            other = _objectWithoutProperties(_ref2, ["hotels", "pg", "cnt"]);
            _normalize = (0, _normalizr.normalize)(Object.values(denormalizedHotels || {}).reduce(function (all, h) {
              return _objectSpread({}, all, {}, h);
            }, {}), new _normalizr.schema.Values(_schemas.hotelSchema)), _normalize$entities = _normalize.entities, hotels = _normalize$entities.hotel, offers = _normalize$entities.offer;

            if (offers) {
              exactChildrenAges = String(query.people).slice(1).split(/(\d{2})/).map(Number).filter(Boolean).sort(function (a, b) {
                return a - b;
              });
              injectUahCurrency = !query.currency;

              for (id in offers) {
                offers[id].exactChildrenAges = exactChildrenAges.slice(0, offers[id].children);
                offers[id].currency = injectUahCurrency ? 'uah' : offers[id].currency;
              }
            }

            _normalize2 = (0, _normalizr.normalize)(denormalizedCountry || {}, _schemas.countrySchema), countries = _normalize2.entities.country, countryId = _normalize2.result;
            meta = (0, _parsers.parseSearchMeta)(other, query);
            return _context.abrupt("return", _objectSpread({
              result: hotels && offers ? {
                hotels: hotels,
                offers: offers
              } : {},
              chart: denormalizedChart ? normalizePricesChart(denormalizedChart) : null,
              country: countryId && denormalizedCountry ? countries[countryId] : null,
              meta: meta
            }, other));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursSearch.apply(this, arguments);
}
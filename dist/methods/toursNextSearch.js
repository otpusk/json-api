"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursNextSearch = getToursNextSearch;

var _normalizr = require("normalizr");

var _immutable = require("immutable");

var _fn = require("../fn");

var _schemas = require("../normalize/schemas");

var _parsers = require("../normalize/parsers");

var _config = require("../config");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursNextSearch(_x, _x2) {
  return _getToursNextSearch.apply(this, arguments);
}

function _getToursNextSearch() {
  _getToursNextSearch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, query) {
    var _yield$makeCall, denormalizedCountry, denormalizedHotels, results, progressMeta, other, result, _normalize, countries, countryId, _normalize2, hotels, exactChildrenAges, pricesMap;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fn.makeCall)({
              endpoint: _config.ENDPOINTS.nextSearch,
              query: _objectSpread(_objectSpread({}, query), token),
              timeout: 15000
            });

          case 2:
            _yield$makeCall = _context.sent;
            denormalizedCountry = _yield$makeCall.cnt;
            denormalizedHotels = _yield$makeCall.hotels;
            results = _yield$makeCall.results;
            progressMeta = _yield$makeCall.workProgress;
            other = _objectWithoutProperties(_yield$makeCall, ["cnt", "hotels", "results", "workProgress"]);
            result = {};

            if (denormalizedCountry) {
              _normalize = (0, _normalizr.normalize)(denormalizedCountry, _schemas.countrySchema), countries = _normalize.entities.country, countryId = _normalize.result;
              result.country = countries[countryId];
            }

            if (denormalizedHotels) {
              _normalize2 = (0, _normalizr.normalize)(denormalizedHotels, new _normalizr.schema.Values(_schemas.hotelNextSchema)), hotels = _normalize2.entities.hotel;
              result.hotels = hotels;
            }

            if (results) {
              exactChildrenAges = String(query.people).slice(1).split(/(\d{2})/).map(Number).filter(Boolean).sort(function (a, b) {
                return a - b;
              });
              result.offers = Object.values(results).map(function (hotelsMap) {
                return Object.values(hotelsMap).map(function (_ref) {
                  var offers = _ref.offers;
                  return offers;
                });
              }).flat(1).map(function (offers) {
                return Object.values(offers);
              }).flat(1).reduce(function (acc, denormalizedOffer) {
                var _normalize3 = (0, _normalizr.normalize)(denormalizedOffer, _schemas.offerSchema),
                    offer = _normalize3.entities.offer,
                    id = _normalize3.result;

                offer[id].exactChildrenAges = exactChildrenAges.slice(0, offer[id].children);
                return _objectSpread(_objectSpread({}, acc), offer);
              }, {});
              pricesMap = Object.values(results).map(function (hotelsMap) {
                return Object.values(hotelsMap).map(function (_ref2) {
                  var id = _ref2.i,
                      offersShape = _ref2.offers;
                  return {
                    hotelID: id,
                    offers: Object.keys(offersShape).map(function (offerID) {
                      return result.offers[offerID];
                    }).sort(function (a, b) {
                      return a.price[query.currencyLocal] - b.price[query.currencyLocal];
                    })
                  };
                });
              }).filter(function (group) {
                return group.length;
              }).flat(1).reduce(function (acc, _ref3) {
                var hotelID = _ref3.hotelID,
                    offers = _ref3.offers;

                if (acc[hotelID]) {
                  var nextOffers = [].concat(_toConsumableArray(acc[hotelID].offers), _toConsumableArray(offers)).sort(function (a, b) {
                    return a.price[query.currencyLocal] - b.price[query.currencyLocal];
                  });
                  acc[hotelID].offers = nextOffers;
                } else {
                  acc[hotelID] = {
                    hotelID: hotelID,
                    offers: offers
                  };
                }

                return acc;
              }, {});
              result.prices = Object.values(pricesMap).sort(function (hotelA, hotelB) {
                return hotelA.offers[0].price[query.currencyLocal] - hotelB.offers[0].price[query.currencyLocal];
              }).map(function (_ref4) {
                var offers = _ref4.offers,
                    rest = _objectWithoutProperties(_ref4, ["offers"]);

                return _objectSpread(_objectSpread({}, rest), {}, {
                  offers: offers.map(function (_ref5) {
                    var id = _ref5.id;
                    return id;
                  })
                });
              });
            }

            return _context.abrupt("return", (0, _immutable.Map)(_objectSpread(_objectSpread(_objectSpread({}, result), other), {}, {
              progressMeta: progressMeta,
              meta: (0, _parsers.parseSearchMeta)(other, query)
            })).filter(function (_, key) {
              return !['cities', 'cty', 'dept', 'excursion'].includes(key);
            }).toObject());

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursNextSearch.apply(this, arguments);
}
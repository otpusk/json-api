"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursHotels = getToursHotels;
exports.getToursHotelsMarkers = getToursHotelsMarkers;
exports.getToursHotel = getToursHotel;

var _normalizr = require("normalizr");

var R = _interopRequireWildcard(require("ramda"));

var _fn = require("../fn");

var _config = require("../config");

var _schemas = require("../normalize/schemas");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursHotels(_x, _x2) {
  return _getToursHotels.apply(this, arguments);
}

function _getToursHotels() {
  _getToursHotels = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, countryId) {
    var options,
        methodVersion,
        _options$services,
        services,
        _options$rating,
        rating,
        _options$withPrice,
        withPrice,
        lang,
        _yield$makeCall,
        denormalizedHotels,
        _normalize,
        hotels,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            methodVersion = _args.length > 3 ? _args[3] : undefined;
            _options$services = options.services, services = _options$services === void 0 ? [] : _options$services, _options$rating = options.rating, rating = _options$rating === void 0 ? {} : _options$rating, _options$withPrice = options.withPrice, withPrice = _options$withPrice === void 0 ? true : _options$withPrice, lang = options.lang;
            _context.next = 5;
            return (0, _fn.makeCall)({
              endpoint: methodVersion ? R.replace(_config.API_VERSION, methodVersion, _config.ENDPOINTS.hotels) : _config.ENDPOINTS.hotels,
              query: _objectSpread(_objectSpread(_objectSpread({
                countryId: countryId,
                with: withPrice ? 'price' : null,
                lang: lang
              }, token), !R.isEmpty(rating) ? {
                rating: "".concat(rating.from, "-").concat(rating.to)
              } : {}), !R.isEmpty(services) ? {
                services: services
              } : {}),
              ttl: [1, 'day']
            });

          case 5:
            _yield$makeCall = _context.sent;
            denormalizedHotels = _yield$makeCall.hotels;
            _normalize = (0, _normalizr.normalize)(denormalizedHotels, [_schemas.hotelShortSchema]), hotels = _normalize.entities.hotel;
            return _context.abrupt("return", Object.values(hotels));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursHotels.apply(this, arguments);
}

function getToursHotelsMarkers(_x3, _x4, _x5, _x6) {
  return _getToursHotelsMarkers.apply(this, arguments);
}

function _getToursHotelsMarkers() {
  _getToursHotelsMarkers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(token, countryId, cityId, options) {
    var center, radius, _yield$makeCall2, denormalizedHotels, _normalize2, markers;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            center = options.center, radius = options.radius;
            _context2.next = 3;
            return (0, _fn.makeCall)({
              endpoint: _config.ENDPOINTS.hotels,
              query: _objectSpread({
                countryId: countryId,
                cityId: cityId,
                data: 'minOffer',
                geo: "".concat(center.lat, ",").concat(center.lng),
                rad: radius || 1,
                with: 'price'
              }, token)
            });

          case 3:
            _yield$makeCall2 = _context2.sent;
            denormalizedHotels = _yield$makeCall2.hotels;
            _normalize2 = (0, _normalizr.normalize)(denormalizedHotels.map(function (h) {
              return _objectSpread(_objectSpread({}, h), {}, {
                countryId: countryId
              });
            }), [_schemas.hotelShortSchema]), markers = _normalize2.entities.hotel;
            return _context2.abrupt("return", markers);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getToursHotelsMarkers.apply(this, arguments);
}

function getToursHotel(_x7, _x8) {
  return _getToursHotel.apply(this, arguments);
}

function _getToursHotel() {
  _getToursHotel = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(token, hotelId) {
    var lang,
        _yield$makeCall3,
        denormalizedHotel,
        _normalize3,
        _normalize3$entities,
        hotels,
        offers,
        id,
        hotel,
        _args3 = arguments;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            lang = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 'ru';
            _context3.next = 3;
            return (0, _fn.makeCall)({
              endpoint: _config.ENDPOINTS.hotel,
              query: _objectSpread({
                hotelId: hotelId,
                lang: lang
              }, token),
              ttl: [1, 'hour']
            });

          case 3:
            _yield$makeCall3 = _context3.sent;
            denormalizedHotel = _yield$makeCall3.hotel;
            _normalize3 = (0, _normalizr.normalize)(denormalizedHotel, _schemas.hotelSchema), _normalize3$entities = _normalize3.entities, hotels = _normalize3$entities.hotel, offers = _normalize3$entities.offer, id = _normalize3.result;
            hotel = hotels[id];
            return _context3.abrupt("return", {
              hotel: hotel,
              offers: offers
            });

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getToursHotel.apply(this, arguments);
}
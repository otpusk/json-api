"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursHotels = getToursHotels;
exports.getToursHotelsMarkers = getToursHotelsMarkers;
exports.getToursHotel = getToursHotel;

var _normalizr = require("normalizr");

var _fn = require("../fn");

var _config = require("../config");

var _schemas = require("../normalize/schemas");

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
        _options$cities,
        cities,
        _options$categories,
        categories,
        _options$services,
        services,
        _options$withPrice,
        withPrice,
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
            _options$cities = options.cities, cities = _options$cities === void 0 ? [] : _options$cities, _options$categories = options.categories, categories = _options$categories === void 0 ? [] : _options$categories, _options$services = options.services, services = _options$services === void 0 ? [] : _options$services, _options$withPrice = options.withPrice, withPrice = _options$withPrice === void 0 ? true : _options$withPrice;
            _context.next = 4;
            return (0, _fn.makeCall)(_config.ENDPOINTS.hotels, _objectSpread({
              countryId: countryId,
              with: withPrice ? 'price' : null
            }, token), [1, 'day']);

          case 4:
            _yield$makeCall = _context.sent;
            denormalizedHotels = _yield$makeCall.hotels;
            _normalize = (0, _normalizr.normalize)(denormalizedHotels.filter(function (hotel) {
              var inCities = !cities.length || cities.includes(Number(hotel.cityId));
              var inCategory = !categories.length || categories.includes(hotel.stars);
              var inServices = !services.length || services.every(function (s) {
                return hotel.services.split(',').includes(s);
              });
              return inCities && inCategory && inServices;
            }), [_schemas.hotelShortSchema]), hotels = _normalize.entities.hotel;
            return _context.abrupt("return", Object.values(hotels));

          case 8:
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
            return (0, _fn.makeCall)(_config.ENDPOINTS.hotels, _objectSpread({
              countryId: countryId,
              cityId: cityId,
              geo: "".concat(center.lat, ",").concat(center.lng),
              rad: radius || 1,
              with: 'price'
            }, token));

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
            return (0, _fn.makeCall)(_config.ENDPOINTS.hotel, _objectSpread({
              hotelId: hotelId,
              lang: lang
            }, token), [1, 'hour']);

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
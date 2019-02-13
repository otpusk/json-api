"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursHotels = getToursHotels;
exports.getToursHotel = getToursHotel;

var _normalizr = require("normalizr");

var _fn = require("../fn");

var _config = require("../config");

var _schemas = require("../normalize/schemas");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursHotels(_x, _x2, _x3) {
  return _getToursHotels.apply(this, arguments);
}

function _getToursHotels() {
  _getToursHotels = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(token, countryId, options) {
    var _options$cities, cities, _options$categories, categories, _options$services, services, _ref, denormalizedHotels, _normalize, hotels;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _options$cities = options.cities, cities = _options$cities === void 0 ? [] : _options$cities, _options$categories = options.categories, categories = _options$categories === void 0 ? [] : _options$categories, _options$services = options.services, services = _options$services === void 0 ? [] : _options$services;
            _context.next = 3;
            return (0, _fn.makeCall)(_config.ENDPOINTS.hotels, _objectSpread({
              countryId: countryId,
              with: 'price'
            }, token), [1, 'day']);

          case 3:
            _ref = _context.sent;
            denormalizedHotels = _ref.hotels;
            _normalize = (0, _normalizr.normalize)(denormalizedHotels.filter(function (hotel) {
              var inCities = !cities.length || cities.includes(Number(hotel.cityId));
              var inCategory = !categories.length || categories.includes(hotel.stars);
              var inServices = !services.length || services.every(function (s) {
                return hotel.services.split(',').includes(s);
              });
              return inCities && inCategory && inServices;
            }), [_schemas.hotelShortSchema]), hotels = _normalize.entities.hotel;
            return _context.abrupt("return", Object.values(hotels));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getToursHotels.apply(this, arguments);
}

function getToursHotel(_x4, _x5) {
  return _getToursHotel.apply(this, arguments);
}

function _getToursHotel() {
  _getToursHotel = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(token, hotelId) {
    var _ref2, denormalizedHotel, _normalize2, _normalize2$entities, hotels, offers, id, hotel;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _fn.makeCall)(_config.ENDPOINTS.hotel, _objectSpread({
              hotelId: hotelId
            }, token), [1, 'day']);

          case 2:
            _ref2 = _context2.sent;
            denormalizedHotel = _ref2.hotel;
            _normalize2 = (0, _normalizr.normalize)(denormalizedHotel, _schemas.hotelSchema), _normalize2$entities = _normalize2.entities, hotels = _normalize2$entities.hotel, offers = _normalize2$entities.offer, id = _normalize2.result;
            hotel = hotels[id];
            return _context2.abrupt("return", {
              hotel: hotel,
              offers: offers
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _getToursHotel.apply(this, arguments);
}
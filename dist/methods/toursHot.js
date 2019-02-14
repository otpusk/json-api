"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursHotBlock = getToursHotBlock;
exports.getToursHotTour = getToursHotTour;

var _fn = require("../fn");

var _parsers = require("../normalize/parsers");

var _config = require("../config");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursHotBlock(_x, _x2) {
  return _getToursHotBlock.apply(this, arguments);
}

function _getToursHotBlock() {
  _getToursHotBlock = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(token, blockId) {
    var _ref, block, tours;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fn.makeCall)(_config.ENDPOINTS.hotBlock, _objectSpread({
              blockId: blockId
            }, token));

          case 2:
            _ref = _context.sent;
            block = _ref.block;
            tours = _ref.tours;
            return _context.abrupt("return", {
              block: block,
              tours: tours
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getToursHotBlock.apply(this, arguments);
}

function getToursHotTour(_x3, _x4, _x5) {
  return _getToursHotTour.apply(this, arguments);
}

function _getToursHotTour() {
  _getToursHotTour = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(token, blockId, tourId) {
    var _ref2, _ref2$searchedTour, offers;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _fn.makeCall)(_config.ENDPOINTS.hotTour, _objectSpread({
              blockId: blockId,
              id: tourId
            }, token));

          case 2:
            _ref2 = _context2.sent;
            _ref2$searchedTour = _ref2.searchedTour;
            _ref2$searchedTour = _ref2$searchedTour === void 0 ? {} : _ref2$searchedTour;
            offers = _ref2$searchedTour.offers;
            return _context2.abrupt("return", offers.map(function (tour) {
              var hotelId = tour.hotelId,
                  dateString = tour.dateString,
                  food = tour.food,
                  length = tour.length,
                  promo = tour.promo,
                  transport = tour.transport,
                  cityFromId = tour.cityFromId,
                  operatorId = tour.operatorId,
                  tourLink = tour.tourLink,
                  hotelName = tour.hotelName,
                  hotelStars = tour.hotelStars,
                  imgSrc = tour.imgSrc;

              var _ref3 = tourLink.match(/oid=(\d+)/) || [],
                  _ref4 = _slicedToArray(_ref3, 2),
                  offerId = _ref4[1];

              return {
                hotel: {
                  id: hotelId,
                  name: hotelName,
                  stars: Number(String(hotelStars).replace(/\D/gi, '')),
                  country: (0, _parsers.parseCountry)(tour),
                  city: (0, _parsers.parseCity)(tour),
                  photos: [imgSrc.replace(/^.*\/\d+x\d+\//, '')]
                },
                offer: {
                  id: Number(offerId),
                  date: dateString,
                  departure: cityFromId,
                  food: food,
                  days: length,
                  nights: length - 1,
                  promo: promo,
                  price: (0, _parsers.parsePrice)(tour),
                  operator: operatorId,
                  transport: transport
                }
              };
            }));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _getToursHotTour.apply(this, arguments);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursHotBlock = getToursHotBlock;
exports.getToursHotTour = getToursHotTour;

var _fn = require("../fn");

var _parsers = require("../normalize/parsers");

var _config = require("../config");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursHotBlock(_x, _x2) {
  return _getToursHotBlock.apply(this, arguments);
}

function _getToursHotBlock() {
  _getToursHotBlock = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, blockId) {
    var _yield$makeCall, block, tours;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fn.makeCall)(_config.ENDPOINTS.hotBlock, _objectSpread({
              blockId: blockId
            }, token));

          case 2:
            _yield$makeCall = _context.sent;
            block = _yield$makeCall.block;
            tours = _yield$makeCall.tours;
            return _context.abrupt("return", {
              block: block,
              tours: tours
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursHotBlock.apply(this, arguments);
}

function getToursHotTour(_x3, _x4, _x5) {
  return _getToursHotTour.apply(this, arguments);
}

function _getToursHotTour() {
  _getToursHotTour = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(token, blockId, tourId) {
    var _yield$makeCall2, _yield$makeCall2$sear, offers;

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
            _yield$makeCall2 = _context2.sent;
            _yield$makeCall2$sear = _yield$makeCall2.searchedTour;
            _yield$makeCall2$sear = _yield$makeCall2$sear === void 0 ? {} : _yield$makeCall2$sear;
            offers = _yield$makeCall2$sear.offers;

            if (offers) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", null);

          case 8:
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

              var _ref = tourLink.match(/oid=(\d+)/) || [],
                  _ref2 = _slicedToArray(_ref, 2),
                  offerId = _ref2[1];

              return {
                id: String(hotelId),
                name: hotelName,
                stars: Number(String(hotelStars).replace(/\D/gi, '')),
                country: (0, _parsers.parseCountry)(tour),
                city: (0, _parsers.parseCity)(tour),
                photos: [imgSrc.replace(/^.*\/\d+x\d+\//, '')],
                offer: {
                  id: String(offerId),
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

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getToursHotTour.apply(this, arguments);
}
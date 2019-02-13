"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPriceExtraFares = exports.compileOSQueryString = exports.getFirstAvailableFlightsFromOffer = exports.getHotelSchemaType = exports.explainPrice = exports.getPeopleCountableWord = exports.getImageUrl = exports.getDepartureCityById = exports.getTransportByCode = exports.getCurrencyByCode = exports.getFoodByCode = void 0;

var _fn = require("helpers/fn");

var _static = require("./static");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var getFoodByCode = function getFoodByCode(code) {
  return (0, _fn.findInArrayByProp)(_static.FOODS, 'code', code);
};

exports.getFoodByCode = getFoodByCode;

var getCurrencyByCode = function getCurrencyByCode(code) {
  return (0, _fn.findInArrayByProp)(_static.CURRENCIES, 'code', code);
};

exports.getCurrencyByCode = getCurrencyByCode;

var getTransportByCode = function getTransportByCode(code) {
  return (0, _fn.findInArrayByProp)(_static.TRANSPORTS, 'code', code);
};

exports.getTransportByCode = getTransportByCode;

var getDepartureCityById = function getDepartureCityById(id) {
  return (0, _fn.findInArrayByProp)(_static.DEPARTURE_CITIES, 'id', id);
};

exports.getDepartureCityById = getDepartureCityById;

var getImageUrl = function getImageUrl(part) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'medium';
  var sizes = {
    small: '2/240x160',
    medium: '2/320x240',
    large: '3/730x0'
  };
  return "https://newimg.otpusk.com/".concat(sizes[size], "/").concat(part);
};

exports.getImageUrl = getImageUrl;

var getPeopleCountableWord = function getPeopleCountableWord(people) {
  return ['', 'за одного', 'за двоих', 'за троих', 'за четверых', 'за пятерых', 'за шестерых', 'за семерых'][people];
};

exports.getPeopleCountableWord = getPeopleCountableWord;

var explainPrice = function explainPrice(price) {
  var _ref = price || {},
      _ref$uah = _ref.uah,
      uah = _ref$uah === void 0 ? null : _ref$uah,
      _ref$usd = _ref.usd,
      usd = _ref$usd === void 0 ? null : _ref$usd,
      _ref$eur = _ref.eur,
      eur = _ref$eur === void 0 ? null : _ref$eur;

  return {
    converted: {
      value: uah,
      currency: getCurrencyByCode('uah')
    },
    original: {
      value: eur || usd,
      currency: getCurrencyByCode(eur ? 'eur' : 'usd')
    }
  };
};

exports.explainPrice = explainPrice;

var getHotelSchemaType = function getHotelSchemaType(hotel) {
  return _typeof(hotel.info) === 'object' ? 'full' : 'preview';
};

exports.getHotelSchemaType = getHotelSchemaType;

var getFirstAvailableFlightsFromOffer = function getFirstAvailableFlightsFromOffer(offer) {
  var _offer$flights = offer.flights,
      _offer$flights$outbou = _offer$flights.outbound;
  _offer$flights$outbou = _offer$flights$outbou === void 0 ? [] : _offer$flights$outbou;

  var _offer$flights$outbou2 = _slicedToArray(_offer$flights$outbou, 1),
      outbound = _offer$flights$outbou2[0],
      _offer$flights$inboun = _offer$flights.inbound;

  _offer$flights$inboun = _offer$flights$inboun === void 0 ? [] : _offer$flights$inboun;

  var _offer$flights$inboun2 = _slicedToArray(_offer$flights$inboun, 1),
      inbound = _offer$flights$inboun2[0];

  return [outbound, inbound];
};

exports.getFirstAvailableFlightsFromOffer = getFirstAvailableFlightsFromOffer;

var compileOSQueryString = function compileOSQueryString(query) {
  var dictionary = {
    to: 'i',
    departure: 'd',
    days: 'l',
    people: 'p',
    food: 'o',
    transport: 'r',
    dateFrom: 'c',
    dateTo: 'v',
    page: 'page'
  };
  return Object.entries(query).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        param = _ref3[0],
        value = _ref3[1];

    return "".concat(dictionary[param], "=").concat(value);
  }).join('&');
};

exports.compileOSQueryString = compileOSQueryString;

var getPriceExtraFares = function getPriceExtraFares(hotel, offer) {
  var traits = {
    isOperator: function isOperator(offer, operator) {
      return offer.operator === operator;
    },
    isCountry: function isCountry(hotel, country) {
      return Number(hotel.country.id) === Number(country);
    },
    isAnyOutboundFlightTimeBeforeHours: function isAnyOutboundFlightTimeBeforeHours(offer, hours) {
      var outbound = offer.flights.outbound;

      if (outbound) {
        return outbound.reduce(function (result, flight) {
          var begin = new Date(flight.begin);
          return result || begin.getHours() <= hours;
        }, false);
      }

      return false;
    },
    isAnyReturnFlightTimeAfterHours: function isAnyReturnFlightTimeAfterHours(offer, hours) {
      var inbound = offer.flights.inbound;

      if (inbound) {
        return inbound.reduce(function (result, flight) {
          var begin = new Date(flight.begin);
          return result || begin.getHours() >= hours;
        }, false);
      }

      return false;
    },
    isFlightsByRequest: function isFlightsByRequest(_ref4) {
      var stopsale = _ref4.stopsale;
      return stopsale.avia === 0 || stopsale.aviaBack === 0;
    }
  };
  var rules = [{
    name: 'extra-fee',
    text: (0, _fn.__)('Возможна доплата за вечерний обратный рейс $20 за каждого туриста.'),
    conditions: [traits.isCountry(hotel, 115), traits.isOperator(offer, 717), traits.isAnyReturnFlightTimeAfterHours(offer, 17)]
  }, {
    name: 'request-flight',
    text: (0, _fn.__)('Наличие мест на рейсе и окончательную стоимость тура запрашивайте у турагента.'),
    conditions: [traits.isFlightsByRequest(offer)]
  }, {
    name: 'travel-insurance',
    text: 'страховка от невыезда',
    conditions: [traits.isOperator(offer, 2700)]
  }];
  return rules.filter(function (_ref5) {
    var conditions = _ref5.conditions;
    return conditions.every(function (value) {
      return value === true;
    });
  });
};

exports.getPriceExtraFares = getPriceExtraFares;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNounForNumeral = getNounForNumeral;
exports.__ = __;
exports.findInArrayByProp = findInArrayByProp;
exports.convertObjectToUrlFormData = convertObjectToUrlFormData;
exports.getPriceExtraFares = exports.getNounForCommonNumerals = exports.createOtpuskClickUrl = exports.parseOSQueryString = exports.compileOSQueryString = exports.getFirstAvailableFlightsFromOffer = exports.getHotelSchemaType = exports.explainPrice = exports.getPeopleCountableWord = exports.getOperatorLogoById = exports.getImageUrl = exports.getOperatorById = exports.getDepartureCityById = exports.getTransportByCode = exports.getCurrencyByCode = exports.getFoodByCode = void 0;

var _static = require("./static");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Get noun for numeral
 *
 * @param {number} number number
 * @param {Array} titles nouns
 * @param {boolean} withNumber concat with number
 *
 * @returns {string} noun
 */
function getNounForNumeral(number, titles, withNumber) {
  var cases = [2, 0, 1, 1, 1, 2];
  return (withNumber ? "".concat(number, " ") : '') + titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}
/**
 * Translate string
 *
 * @param {string} string literal
 *
 * @returns {string} tranlation
 */


function __(string) {
  return string;
}
/**
 * Find array element by prop value
 * @param {*} array array
 * @param {*} prop prop
 * @param {*} value value
 *
 * @returns {*} value
 */


function findInArrayByProp(array, prop, value) {
  var index = array.findIndex(function (_ref) {
    var p = _ref[prop];
    return p === value;
  });
  return index !== -1 ? array[index] : null;
}

function convertObjectToUrlFormData(object) {
  return Object.entries(object).reduce(function (params, _ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        field = _ref3[0],
        value = _ref3[1];

    (value || typeof value === 'string') && params.push("".concat(field, "=").concat(encodeURIComponent(value)));
    return params;
  }, []).join('&');
}

var getFoodByCode = function getFoodByCode(code) {
  return findInArrayByProp(_static.FOODS, 'code', code);
};

exports.getFoodByCode = getFoodByCode;

var getCurrencyByCode = function getCurrencyByCode(code) {
  return findInArrayByProp(_static.CURRENCIES, 'code', code);
};

exports.getCurrencyByCode = getCurrencyByCode;

var getTransportByCode = function getTransportByCode(code) {
  return findInArrayByProp(_static.TRANSPORTS, 'code', code);
};

exports.getTransportByCode = getTransportByCode;

var getDepartureCityById = function getDepartureCityById(id) {
  return findInArrayByProp(_static.DEPARTURE_CITIES, 'id', id);
};

exports.getDepartureCityById = getDepartureCityById;

var getOperatorById = function getOperatorById(id) {
  return findInArrayByProp(_static.OPERATORS, 'id', id);
};

exports.getOperatorById = getOperatorById;

var getImageUrl = function getImageUrl(part) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'medium';
  var watermark = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var watermarkPart = watermark ? "_".concat(watermark) : '';
  var sizes = {
    verySmall: "2".concat(watermarkPart, "/160x120"),
    small: "2".concat(watermarkPart, "/240x160"),
    medium: "2".concat(watermarkPart, "/320x240"),
    large: "3".concat(watermarkPart, "/800x600"),
    veryLarge: "3".concat(watermarkPart, "/1200x900")
  };
  return "https://newimg.otpusk.com/".concat(sizes[size], "/").concat(part);
};

exports.getImageUrl = getImageUrl;

var getOperatorLogoById = function getOperatorLogoById(id) {
  return "https://export.otpusk.com/images/onsite/logo/logo-".concat(id, ".png");
};

exports.getOperatorLogoById = getOperatorLogoById;

var getPeopleCountableWord = function getPeopleCountableWord(people) {
  return ['', 'за одного', 'за двоих', 'за троих', 'за четверых', 'за пятерых', 'за шестерых', 'за семерых'][people];
};

exports.getPeopleCountableWord = getPeopleCountableWord;

var explainPrice = function explainPrice(price) {
  var _ref4 = price || {},
      _ref4$uah = _ref4.uah,
      uah = _ref4$uah === void 0 ? null : _ref4$uah,
      _ref4$usd = _ref4.usd,
      usd = _ref4$usd === void 0 ? null : _ref4$usd,
      _ref4$eur = _ref4.eur,
      eur = _ref4$eur === void 0 ? null : _ref4$eur;

  return {
    converted: {
      value: Number(uah).toLocaleString('ru', {
        style: 'decimal',
        maximumFractionDigits: 0
      }),
      currency: getCurrencyByCode('uah')
    },
    original: eur || usd ? {
      value: Number(eur || usd).toLocaleString('ru', {
        style: 'decimal',
        maximumFractionDigits: 0
      }),
      currency: getCurrencyByCode(eur ? 'eur' : 'usd')
    } : null
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

  return [outbound, inbound] // to prevent undefined flights
  .filter(function (flight) {
    return Boolean(flight);
  });
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
  return Object.entries(query).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        param = _ref6[0],
        value = _ref6[1];

    return "".concat(dictionary[param], "=").concat(value);
  }).join('&');
};

exports.compileOSQueryString = compileOSQueryString;

var parseOSQueryString = function parseOSQueryString(hash) {
  return hash.replace(/^#/, '').split('&').reduce(function (query, keyvalue) {
    var _keyvalue$split = keyvalue.split('='),
        _keyvalue$split2 = _slicedToArray(_keyvalue$split, 2),
        key = _keyvalue$split2[0],
        value = _keyvalue$split2[1];

    return value ? Object.assign(query, _defineProperty({}, key, value)) : query;
  }, {});
};
/**
 * Create otpusk click ad url
 *
 * @param {String} regionId region id
 * @param {Object} agency advertisement
 * @param {Object} hotel hotel
 * @param {Object} offer offer
 * @param {Object} tourists tourists
 *
 * @return {string} url
 */


exports.parseOSQueryString = parseOSQueryString;

var createOtpuskClickUrl = function createOtpuskClickUrl(regionId, agency, hotel, offer, tourists) {
  var currency = 'usd' in offer.price ? 'usd' : 'eur';
  var query = {
    a: offer.room.name,
    c: hotel.country.name,
    ci: hotel.country.id,
    d: offer.room.type,
    f: "".concat(hotel.stars, "*"),
    g: offer.departure,
    gi: offer.departure,
    l: offer.days,
    n: hotel.name,
    ni: hotel.id,
    oi: offer.operator,
    p: offer.food,
    pv: offer.price[currency],
    q: offer.date,
    r: tourists,
    ti: hotel.city.id,
    w: currency,
    y: offer.transport
  };
  var params = {
    c: hotel.country.id,
    d: JSON.stringify(query),
    i: agency.adGroupId,
    n: agency.clickId,
    o: offer.operator,
    r: regionId,
    t: offer.id,
    tr: offer.tourId
  };
  return "/api/go/".concat(hotel.id, "_").concat(agency.adId, "?").concat(convertObjectToUrlFormData(params));
};

exports.createOtpuskClickUrl = createOtpuskClickUrl;

var getNounForCommonNumerals = function getNounForCommonNumerals(number, noun) {
  var nouns = [];

  switch (noun) {
    case 'день':
      nouns = [__('день'), __('дня'), __('дней')];
      break;

    case 'ночь':
      nouns = [__('ночь'), __('ночи'), __('ночей')];
      break;

    case 'год':
      nouns = [__('год'), __('года'), __('лет')];
      break;

    case 'отзыв':
      nouns = [__('отзыв'), __('отзыва'), __('отзывов')];
      break;

    case 'взрослый':
      nouns = [__('взрослый'), __('взрослых'), __('взрослых')];
      break;

    case 'ребенок':
      nouns = [__('ребенок'), __('детей'), __('детей')];
      break;

    default:
      nouns = [__(noun), __(noun), __(noun)];
  }

  return getNounForNumeral(number, nouns);
};

exports.getNounForCommonNumerals = getNounForCommonNumerals;

var getPriceExtraFares = function getPriceExtraFares(hotel, offer) {
  var traits = {
    isOperator: function isOperator(offer, operator) {
      return offer.operator === operator;
    },
    isCountry: function isCountry(hotel, country) {
      return Number(hotel.country.id) === Number(country);
    },
    isCity: function isCity(hotel, city) {
      return Number(hotel.city.id) === Number(city);
    },
    isFirstOutboundFlightTimeBeforeHours: function isFirstOutboundFlightTimeBeforeHours(_ref7, hours) {
      var flights = _ref7.flights;
      var _flights$outbound = flights.outbound;
      _flights$outbound = _flights$outbound === void 0 ? [] : _flights$outbound;

      var _flights$outbound2 = _slicedToArray(_flights$outbound, 1),
          flight = _flights$outbound2[0];

      if (flight) {
        var begin = new Date(flight.begin);
        return begin.getHours() <= hours;
      }

      return false;
    },
    isFirstReturnFlightTimeAfterHours: function isFirstReturnFlightTimeAfterHours(_ref8, hours) {
      var flights = _ref8.flights;
      var _flights$inbound = flights.inbound;
      _flights$inbound = _flights$inbound === void 0 ? [] : _flights$inbound;

      var _flights$inbound2 = _slicedToArray(_flights$inbound, 1),
          flight = _flights$inbound2[0];

      if (flight) {
        var begin = new Date(flight.begin);
        return begin.getHours() >= hours;
      }

      return false;
    },
    isFlightsByRequest: function isFlightsByRequest(_ref9) {
      var stopsale = _ref9.stopsale;
      return stopsale.avia === 0 || stopsale.aviaBack === 0;
    },
    isOutboundAeroport: function isOutboundAeroport(_ref10, aeroportCode) {
      var flights = _ref10.flights;

      var _flights$outbound3 = _slicedToArray(flights.outbound, 1),
          flight = _flights$outbound3[0];

      if (flight) {
        return flight.portTo.includes(aeroportCode);
      }

      return false;
    },
    isInboundAeroport: function isInboundAeroport(_ref11, aeroportCode) {
      var flights = _ref11.flights;

      var _flights$inbound3 = _slicedToArray(flights.inbound, 1),
          flight = _flights$inbound3[0];

      if (flight) {
        return flight.portFr.includes(aeroportCode);
      }

      return false;
    }
  };
  var rules = [{
    name: 'extra-fee',
    text: __('Возможна доплата за вечерний обратный рейс $25 за каждого туриста.'),
    conditions: [traits.isCountry(hotel, 43), traits.isOperator(offer, 717), traits.isFirstReturnFlightTimeAfterHours(offer, 12)]
  }, {
    name: 'extra-fee',
    text: __('Возможна доплата за утренний рейс туда $25 за каждого туриста.'),
    conditions: [traits.isCountry(hotel, 43), traits.isOperator(offer, 717), traits.isFirstOutboundFlightTimeBeforeHours(offer, 12)]
  }, {
    name: 'extra-fee',
    text: __('Возможна доплата за утренний рейс туда 25 евро за каждого туриста.'),
    conditions: [traits.isOutboundAeroport(offer, 'AYT'), traits.isCountry(hotel, 115), traits.isOperator(offer, 717), traits.isFirstOutboundFlightTimeBeforeHours(offer, 12)]
  }, {
    name: 'extra-fee',
    text: __('Возможна доплата за вечерний обратный рейс 25 евро за каждого туриста.'),
    conditions: [traits.isInboundAeroport(offer, 'AYT'), traits.isCountry(hotel, 115), traits.isOperator(offer, 717), traits.isFirstReturnFlightTimeAfterHours(offer, 12)]
  }, {
    name: 'request-flight',
    text: __('Наличие мест на рейсе и окончательную стоимость тура запрашивайте у турагента.'),
    conditions: [traits.isFlightsByRequest(offer)]
  }];
  var additionalPayments = offer.additionalPayments.map(function (text) {
    return {
      name: 'additional',
      text: text
    };
  });
  var calculatedPayments = rules.filter(function (_ref12) {
    var conditions = _ref12.conditions;
    return conditions.every(function (value) {
      return value === true;
    });
  });
  return additionalPayments;
};

exports.getPriceExtraFares = getPriceExtraFares;
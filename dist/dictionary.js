"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__ = __;
exports.compileOSQueryString = void 0;
exports.convertObjectToUrlFormData = convertObjectToUrlFormData;
exports.explainPrice = exports.createOtpuskClickUrl = void 0;
exports.findInArrayByProp = findInArrayByProp;
exports.getNounForCommonNumerals = exports.getImageUrl = exports.getHotelSchemaType = exports.getFoodByCode = exports.getFirstAvailableFlightsFromOffer = exports.getDepartureCityById = exports.getCurrencyByCode = void 0;
exports.getNounForNumeral = getNounForNumeral;
exports.parseOSQueryString = exports.getTransportByCode = exports.getPriceExtraFares = exports.getPeopleCountableWord = exports.getOperatorLogoById = exports.getOperatorById = void 0;
var _static = require("./static");
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // Instruments
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
var getFoodByCode = exports.getFoodByCode = function getFoodByCode(code) {
  return findInArrayByProp(_static.FOODS, 'code', code);
};
var getCurrencyByCode = exports.getCurrencyByCode = function getCurrencyByCode(code) {
  return findInArrayByProp(_static.CURRENCIES, 'code', code);
};
var getTransportByCode = exports.getTransportByCode = function getTransportByCode(code) {
  return findInArrayByProp(_static.TRANSPORTS, 'code', code);
};
var getDepartureCityById = exports.getDepartureCityById = function getDepartureCityById(id) {
  return findInArrayByProp(_static.DEPARTURE_CITIES, 'id', id);
};
var getOperatorById = exports.getOperatorById = function getOperatorById(id) {
  return findInArrayByProp(_static.OPERATORS, 'id', id);
};
var getImageUrl = exports.getImageUrl = function getImageUrl(part) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'medium';
  var watermark = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var watermarkPart = watermark ? "_".concat(watermark) : '';
  var sizes = {
    verySmall: "2".concat(watermarkPart, "/160x120"),
    small: "2".concat(watermarkPart, "/240x160"),
    medium: "2".concat(watermarkPart, "/320x240"),
    xMedium: "2".concat(watermarkPart, "/400x300"),
    large: "3".concat(watermarkPart, "/800x600"),
    veryLarge: "3".concat(watermarkPart, "/1200x900")
  };
  return "https://newimg.otpusk.com/".concat(sizes[size], "/").concat(part);
};
var getOperatorLogoById = exports.getOperatorLogoById = function getOperatorLogoById(id) {
  return "https://export.otpusk.com/images/onsite/logo/logo-".concat(id, ".png");
};
var getPeopleCountableWord = exports.getPeopleCountableWord = function getPeopleCountableWord(people) {
  return ['', 'за одного', 'за двоих', 'за троих', 'за четверых', 'за пятерых', 'за шестерых', 'за семерых'][people];
};
var explainPrice = exports.explainPrice = function explainPrice(price) {
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
var getHotelSchemaType = exports.getHotelSchemaType = function getHotelSchemaType(hotel) {
  return _typeof(hotel.info) === 'object' ? 'full' : 'preview';
};
var getFirstAvailableFlightsFromOffer = exports.getFirstAvailableFlightsFromOffer = function getFirstAvailableFlightsFromOffer(offer) {
  var _offer$flights = offer.flights,
    _offer$flights$outbou = _offer$flights.outbound,
    _offer$flights$outbou2 = _offer$flights$outbou === void 0 ? [] : _offer$flights$outbou,
    _offer$flights$outbou3 = _slicedToArray(_offer$flights$outbou2, 1),
    outbound = _offer$flights$outbou3[0],
    _offer$flights$inboun = _offer$flights.inbound,
    _offer$flights$inboun2 = _offer$flights$inboun === void 0 ? [] : _offer$flights$inboun,
    _offer$flights$inboun3 = _slicedToArray(_offer$flights$inboun2, 1),
    inbound = _offer$flights$inboun3[0];
  return [outbound, inbound]
  // to prevent undefined flights
  .filter(function (flight) {
    return Boolean(flight);
  });
};
var compileOSQueryString = exports.compileOSQueryString = function compileOSQueryString(query) {
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
var parseOSQueryString = exports.parseOSQueryString = function parseOSQueryString(hash) {
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
var createOtpuskClickUrl = exports.createOtpuskClickUrl = function createOtpuskClickUrl(regionId, agency, hotel, offer, tourists) {
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
  return "/go/".concat(hotel.id, "_").concat(agency.adId, "?").concat(convertObjectToUrlFormData(params));
};
var getNounForCommonNumerals = exports.getNounForCommonNumerals = function getNounForCommonNumerals(number, noun) {
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
var getPriceExtraFares = exports.getPriceExtraFares = function getPriceExtraFares(hotel, offer) {
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
      var _flights$outbound = flights.outbound,
        _flights$outbound2 = _flights$outbound === void 0 ? [] : _flights$outbound,
        _flights$outbound3 = _slicedToArray(_flights$outbound2, 1),
        flight = _flights$outbound3[0];
      if (flight) {
        var begin = new Date(flight.begin);
        return begin.getHours() <= hours;
      }
      return false;
    },
    isFirstReturnFlightTimeAfterHours: function isFirstReturnFlightTimeAfterHours(_ref8, hours) {
      var flights = _ref8.flights;
      var _flights$inbound = flights.inbound,
        _flights$inbound2 = _flights$inbound === void 0 ? [] : _flights$inbound,
        _flights$inbound3 = _slicedToArray(_flights$inbound2, 1),
        flight = _flights$inbound3[0];
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
      var _flights$outbound4 = _slicedToArray(flights.outbound, 1),
        flight = _flights$outbound4[0];
      if (flight !== null && flight !== void 0 && flight.portTo) {
        return flight.portTo.includes(aeroportCode);
      }
      return false;
    },
    isInboundAeroport: function isInboundAeroport(_ref11, aeroportCode) {
      var flights = _ref11.flights;
      var _flights$inbound4 = _slicedToArray(flights.inbound, 1),
        flight = _flights$inbound4[0];
      if (flight !== null && flight !== void 0 && flight.portFr) {
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
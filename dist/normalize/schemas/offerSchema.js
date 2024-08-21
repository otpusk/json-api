"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offerSchema = void 0;
var _normalizr = require("normalizr");
var _normalizers = require("../normalizers");
var _parsers = require("../parsers");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var applyTimeZoneToOfferUpdateTime = function applyTimeZoneToOfferUpdateTime(updateTime) {
  return (0, _normalizers.applyTimeZoneToDate)(updateTime, 'YYYY-MM-DD HH:mm:ss');
};
var offerSchema = exports.offerSchema = new _normalizr.schema.Entity('offer', {}, {
  idAttribute: function idAttribute(_ref) {
    var i = _ref.i;
    return String(i);
  },
  processStrategy: function processStrategy(input) {
    var _input$ad = input.ad,
      additionalPayments = _input$ad === void 0 ? [] : _input$ad,
      id = input.i,
      hotelId = input.hi,
      date = input.d,
      oldPriceUah = input.dpl,
      oldPriceCurrency = input.dp,
      length = input.l,
      nights = input.n,
      nightsInHotel = input.nh,
      adults = input.a,
      people = input.ah,
      children = input.h,
      childAgesArray = input.hr,
      childrenAge = input.ha,
      food = input.f,
      foodFullName = input.fn,
      departure = input.c,
      tourOptions = input.o,
      operator = input.oi,
      roomName = input.r,
      roomId = input.ri,
      tourId = input.ti,
      roomType = input.y,
      promoValue = input.s,
      stopsale = input.ss,
      transport = input.t,
      flights = input.to,
      informationOfCrossTour = input.tn,
      code = input.vi,
      _input$u = input.u,
      currency = _input$u === void 0 ? null : _input$u,
      _input$ul = input.ul,
      currencyLocal = _input$ul === void 0 ? null : _input$ul,
      currencyRate = input.ur,
      currencyOperatorRate = input.uo,
      updateTime = input.last,
      priceOperator = input.pto,
      subOperator = input.os,
      _input$gds = input.gds,
      isTransportGDS = _input$gds === void 0 ? false : _input$gds,
      bookingUrl = input.b,
      _input$bh = input.bh,
      bronURL = _input$bh === void 0 ? '' : _input$bh,
      hotelNameByOperator = input.ohn,
      bookingInfo = input.bo,
      bookingQuota = input.bq;

    /* travel insurance for TPG */
    if (operator === 2700) {
      tourOptions.push('travelinsurance');
    }
    var promo = (0, _parsers.parsePromo)(promoValue);
    var _ref2 = bronURL ? bronURL.split('|') : [null],
      _ref3 = _slicedToArray(_ref2, 1),
      hash = _ref3[0];
    var entity = _objectSpread(_objectSpread({
      id: String(id),
      code: code,
      date: date,
      days: length,
      nights: nights,
      nightsInHotel: nightsInHotel,
      adults: Number(adults),
      children: children,
      childrenAge: childrenAge ? childrenAge.replace(/^\((\d+-\d+)\).*/g, '$1').replace('0-', '1-') : '1-16',
      childrenAges: (0, _parsers.parseChildrenAges)(childAgesArray),
      food: food,
      foodFullName: foodFullName,
      departure: departure,
      includes: (0, _normalizers.excludeRequirementTourOptions)(tourOptions),
      requirements: (0, _normalizers.normalizeRequiremenets)(tourOptions),
      operator: operator,
      room: {
        id: roomId,
        name: roomName,
        type: roomType
      },
      price: (0, _parsers.parseOfferPrice)(input),
      oldPrice: oldPriceCurrency && oldPriceUah ? _defineProperty({
        uah: oldPriceUah
      }, currency, oldPriceCurrency) : undefined,
      priceByOperator: _defineProperty({}, currency, priceOperator),
      currency: currency,
      currencyLocal: currencyLocal,
      discountPrice: (0, _parsers.parseDiscountPrice)(input),
      stopsale: stopsale,
      transport: transport,
      flights: (0, _parsers.parseFlights)(flights || {}),
      tourId: tourId,
      hotelId: hotelId,
      additionalPayments: additionalPayments,
      currencyRate: currencyRate,
      currencyOperatorRate: currencyOperatorRate,
      updateTime: applyTimeZoneToOfferUpdateTime(updateTime),
      people: (0, _parsers.parsePeople)(people, childAgesArray),
      isCrossTour: tourOptions.includes('crosstour'),
      informationOfCrossTour: informationOfCrossTour
    }, promo && promo), {}, {
      subOperator: (0, _parsers.parseSubOperator)(subOperator),
      isTransportGDS: isTransportGDS,
      bookingUrl: bookingUrl,
      hash: hash,
      hotelNameByOperator: hotelNameByOperator,
      bookingInfo: bookingInfo ? (0, _parsers.extractBookingData)(bookingInfo) : null,
      bookingQuota: bookingQuota ? (0, _parsers.extractBookingData)(bookingQuota) : null
    });
    return entity;
  }
});
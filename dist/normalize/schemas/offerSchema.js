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
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
      bookingQuota = input.bq,
      scheduleOfBookingPayments = input.pm;

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
      bookingQuota: bookingQuota ? (0, _parsers.extractBookingData)(bookingQuota) : null,
      scheduleOfBookingPayments: scheduleOfBookingPayments ? (0, _parsers.scheduleOfBookingPaymentsMapper)(scheduleOfBookingPayments) : null
    });
    return entity;
  }
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offerSchema = void 0;

var _normalizr = require("normalizr");

var _normalizers = require("../normalizers");

var _parsers = require("../parsers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var applyTimeZoneToOfferUpdateTime = function applyTimeZoneToOfferUpdateTime(updateTime) {
  return (0, _normalizers.applyTimeZoneToDate)(updateTime, 'YYYY-MM-DD HH:mm:ss');
};

var offerSchema = new _normalizr.schema.Entity('offer', {}, {
  idAttribute: function idAttribute(_ref) {
    var i = _ref.i;
    return String(i);
  },
  processStrategy: function processStrategy(input) {
    var id = input.i,
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
        code = input.vid,
        _input$u = input.u,
        currency = _input$u === void 0 ? null : _input$u,
        _input$ul = input.ul,
        currencyLocal = _input$ul === void 0 ? null : _input$ul,
        currencyRate = input.ur,
        updateTime = input.last,
        priceOperator = input.pto,
        subOperator = input.os,
        _input$gds = input.gds,
        isTransportGDS = _input$gds === void 0 ? false : _input$gds;
    /* travel insurance for TPG */

    if (operator === 2700) {
      tourOptions.push('travelinsurance');
    }

    var promo = (0, _parsers.parsePromo)(promoValue);

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
      additionalPayments: [],
      currencyRate: currencyRate,
      updateTime: applyTimeZoneToOfferUpdateTime(updateTime),
      people: (0, _parsers.parsePeople)(people, childAgesArray),
      isCrossTour: tourOptions.includes('crosstour'),
      informationOfCrossTour: informationOfCrossTour
    }, promo && promo), {}, {
      subOperator: (0, _parsers.parseSubOperator)(subOperator),
      isTransportGDS: isTransportGDS
    });

    return entity;
  }
});
exports.offerSchema = offerSchema;
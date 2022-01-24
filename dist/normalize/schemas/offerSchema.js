"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fullOfferSchema = exports.offerSchema = void 0;

var _normalizr = require("normalizr");

var _parsers = require("../parsers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var offerSchema = new _normalizr.schema.Entity('offer', {}, {
  idAttribute: function idAttribute(_ref) {
    var i = _ref.i;
    return String(i);
  },
  processStrategy: function processStrategy(input) {
    var id = input.i,
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
        departure = input.c,
        includes = input.o,
        operator = input.oi,
        roomName = input.r,
        roomId = input.ri,
        tourId = input.ti,
        roomType = input.y,
        promoValue = input.s,
        stopsale = input.ss,
        transport = input.t,
        flights = input.to,
        code = input.vid,
        _input$u = input.u,
        currency = _input$u === void 0 ? null : _input$u,
        currencyRate = input.ur,
        updateTime = input.last;
    /* travel insurance for TPG */

    if (operator === 2700) {
      includes.push('travelinsurance');
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
      departure: departure,
      includes: includes,
      requirements: ['visa', 'insurance', 'transfer'].filter(function (s) {
        return !(includes.includes('notNeedVisa') && s === 'visa');
      }).filter(function (s) {
        return includes.indexOf(s) === -1;
      }),
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
      currency: currency,
      discountPrice: (0, _parsers.parseDiscountPrice)(input),
      stopsale: stopsale,
      transport: transport,
      flights: (0, _parsers.parseFlights)(flights || {}),
      tourId: tourId,
      additionalPayments: [],
      currencyRate: currencyRate,
      updateTime: updateTime,
      people: (0, _parsers.parsePeople)(people)
    }, promo && promo), (0, _parsers.getPriceEntity)(input));

    return entity;
  }
});
exports.offerSchema = offerSchema;
var fullOfferSchema = new _normalizr.schema.Entity('offer', {}, {
  idAttribute: function idAttribute(_ref3) {
    var id = _ref3.id;
    return String(id);
  },
  processStrategy: function processStrategy(input) {
    var id = input.id,
        date = input.checkIn,
        length = input.length,
        adults = input.adult,
        children = input.child,
        childrenAge = input.childAges,
        childAgesArray = input.childAgesArray,
        oldPriceUah = input.oldPriceUah,
        oldPriceCurrency = input.oldPrice,
        food = input.food,
        departure = input.fromCity,
        includes = input.tourOptions,
        operator = input.operatorId,
        roomName = input.room,
        roomId = input.roomId,
        roomType = input.type,
        promoValue = input.tourStatus,
        stopsale = input.stopSale,
        transport = input.transport,
        flights = input.transportOptions,
        code = input.variantId,
        tourId = input.tourId,
        bron = input.bron,
        _input$currency = input.currency,
        currency = _input$currency === void 0 ? null : _input$currency,
        rateByNBU = input.currencyRate,
        rateByOperator = input.currencyOperatorRate,
        _input$hotelId = input.hotelId,
        hotelId = _input$hotelId === void 0 ? null : _input$hotelId,
        _input$additional = input.additional,
        additional = _input$additional === void 0 ? [] : _input$additional,
        updateTime = input.updateTime,
        people = input.people,
        nightsInHotel = input.duration;
    var currencyRate = rateByOperator || rateByNBU;
    /* travel insurance for TPG */

    if (operator === 2700) {
      includes.push('travelinsurance');
    }

    var promo = (0, _parsers.parsePromo)(promoValue);

    var entity = _objectSpread(_objectSpread({
      id: String(id),
      code: code,
      date: date,
      days: length,
      nights: length - 1,
      nightsInHotel: nightsInHotel,
      adults: Number(adults),
      children: children,
      childrenAge: childrenAge ? childrenAge.replace(/^\((\d+-\d+)\).*/g, '$1').replace('0-', '1-') : '1-16',
      childrenAges: (0, _parsers.parseChildrenAges)(childAgesArray),
      food: food,
      departure: departure,
      includes: includes,
      requirements: ['visa', 'insurance', 'transfer'].filter(function (s) {
        return !(includes.includes('notNeedVisa') && s === 'visa');
      }).filter(function (s) {
        return includes.indexOf(s) === -1;
      }),
      operator: operator,
      room: {
        id: roomId,
        name: roomName,
        type: roomType
      },
      price: (0, _parsers.parsePrice)(input),
      oldPrice: oldPriceUah && oldPriceCurrency ? _defineProperty({
        uah: oldPriceUah
      }, currency, oldPriceCurrency) : undefined,
      currency: currency,
      stopsale: stopsale,
      transport: transport,
      flights: (0, _parsers.parseFlights)(flights || {}),
      tourId: tourId,
      bookingUrl: bron,
      hotelId: hotelId,
      additionalPayments: additional,
      currencyRate: currencyRate,
      updateTime: updateTime,
      people: (0, _parsers.parsePeople)(people)
    }, promo && promo), (0, _parsers.getOfferPriceEntity)(input));

    return entity;
  }
});
exports.fullOfferSchema = fullOfferSchema;
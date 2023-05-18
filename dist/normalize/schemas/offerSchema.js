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
        _input$ul = input.ul,
        currencyLocal = _input$ul === void 0 ? null : _input$ul,
        currencyRate = input.ur,
        updateTime = input.last,
        priceOperator = input.pto;
    /* travel insurance for TPG */

    if (operator === 2700) {
      includes.push('travelinsurance');
    }

    var promo = (0, _parsers.parsePromo)(promoValue);

    var entity = _objectSpread({
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
      updateTime: updateTime,
      people: (0, _parsers.parsePeople)(people, childAgesArray)
    }, promo && promo);

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
        foodFullName = input.foodName,
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
        currencyLocal = input.currencyLocal,
        rateByNBU = input.currencyRate,
        rateByOperator = input.currencyOperatorRate,
        _input$hotelId = input.hotelId,
        hotelId = _input$hotelId === void 0 ? null : _input$hotelId,
        _input$additional = input.additional,
        additional = _input$additional === void 0 ? [] : _input$additional,
        updateTime = input.updateTime,
        people = input.people,
        nightsInHotel = input.duration,
        hash = input.objectId,
        priceOperator = input.priceOperator;
    var currencyRate = rateByOperator || rateByNBU;
    /* travel insurance for TPG */

    if (operator === 2700) {
      includes.push('travelinsurance');
    }

    var promo = (0, _parsers.parsePromo)(promoValue);

    var entity = _objectSpread({
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
      foodFullName: foodFullName,
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
      price: (0, _parsers.parseFullOfferPrice)(input),
      priceByOperator: _defineProperty({}, currency, priceOperator),
      oldPrice: oldPriceUah && oldPriceCurrency ? _defineProperty({
        uah: oldPriceUah
      }, currency, oldPriceCurrency) : undefined,
      currency: currency,
      currencyLocal: currencyLocal,
      stopsale: stopsale,
      transport: transport,
      flights: (0, _parsers.parseFlights)(flights || {}),
      tourId: tourId,
      bookingUrl: bron,
      hotelId: hotelId,
      additionalPayments: additional,
      currencyRate: currencyRate,
      updateTime: updateTime,
      people: (0, _parsers.parsePeople)(people, childAgesArray),
      hash: hash
    }, promo && promo);

    return entity;
  }
});
exports.fullOfferSchema = fullOfferSchema;
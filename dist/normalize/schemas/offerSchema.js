"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fullOfferSchema = exports.offerSchema = void 0;

var _normalizr = require("normalizr");

var _parsers = require("../parsers");

// Core
// Instruments
var offerSchema = new _normalizr.schema.Entity('offer', {}, {
  idAttribute: function idAttribute(_ref) {
    var i = _ref.i;
    return String(i);
  },
  processStrategy: function processStrategy(input) {
    var id = input.i,
        date = input.d,
        length = input.l,
        adults = input.a,
        children = input.h,
        childrenAge = input.ha,
        food = input.f,
        departure = input.c,
        includes = input.o,
        operator = input.oi,
        roomName = input.r,
        roomId = input.ri,
        tourId = input.ti,
        roomType = input.y,
        promo = input.s,
        stopsale = input.ss,
        transport = input.t,
        flights = input.to,
        code = input.vid,
        _input$u = input.u,
        currency = _input$u === void 0 ? null : _input$u;
    /* travel insurance for TPG */

    if (operator === 2700) {
      includes.push('travelinsurance');
    }

    var entity = {
      id: String(id),
      code: code,
      date: date,
      days: length,
      nights: length - 1,
      adults: Number(adults),
      children: children,
      childrenAge: childrenAge ? childrenAge.replace(/^\((\d+-\d+)\).*/g, '$1').replace('0-', '1-') : '1-16',
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
      currency: currency,
      discountPrice: (0, _parsers.parseDiscountPrice)(input),
      stopsale: stopsale,
      transport: transport,
      flights: (0, _parsers.parseFlights)(flights || {}),
      promo: promo ? promo.trim() : promo,
      tourId: tourId
    };
    return entity;
  }
});
exports.offerSchema = offerSchema;
var fullOfferSchema = new _normalizr.schema.Entity('offer', {}, {
  idAttribute: function idAttribute(_ref2) {
    var id = _ref2.id;
    return String(id);
  },
  processStrategy: function processStrategy(input) {
    var id = input.id,
        date = input.checkIn,
        length = input.length,
        adults = input.adult,
        children = input.child,
        childrenAge = input.childAges,
        food = input.food,
        departure = input.fromCity,
        includes = input.tourOptions,
        operator = input.operatorId,
        roomName = input.room,
        roomId = input.roomId,
        roomType = input.type,
        promo = input.tourStatus,
        stopsale = input.stopSale,
        transport = input.transport,
        flights = input.transportOptions,
        code = input.variantId,
        tourId = input.tourId,
        bron = input.bron,
        _input$currency = input.currency,
        currency = _input$currency === void 0 ? null : _input$currency,
        _input$hotelId = input.hotelId,
        hotelId = _input$hotelId === void 0 ? null : _input$hotelId;
    /* travel insurance for TPG */

    if (operator === 2700) {
      includes.push('travelinsurance');
    }

    var entity = {
      id: String(id),
      code: code,
      date: date,
      days: length,
      nights: length - 1,
      adults: Number(adults),
      children: children,
      childrenAge: childrenAge ? childrenAge.replace(/^\((\d+-\d+)\).*/g, '$1').replace('0-', '1-') : '1-16',
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
      currency: currency,
      stopsale: stopsale,
      transport: transport,
      flights: (0, _parsers.parseFlights)(flights || {}),
      promo: promo ? promo.trim() : promo,
      tourId: tourId,
      bookingUrl: bron,
      hotelId: hotelId
    };
    return entity;
  }
});
exports.fullOfferSchema = fullOfferSchema;
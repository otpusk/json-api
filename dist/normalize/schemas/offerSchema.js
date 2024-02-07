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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var applyTimeZoneToOfferUpdateTime = function applyTimeZoneToOfferUpdateTime(updateTime) {
  return (0, _normalizers.applyTimeZoneToDate)(updateTime, 'YYYY-MM-DD HH:mm:ss');
};

var offerSchema = new _normalizr.schema.Entity('offer', {}, {
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
        bronURL = _input$bh === void 0 ? '' : _input$bh;
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
      hash: hash
    });

    return entity;
  }
});
exports.offerSchema = offerSchema;
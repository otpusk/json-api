"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoSchema = exports.countrySchema = exports.citySchema = void 0;
var _normalizr = require("normalizr");
var _parsers = require("../parsers");
var _hotelSchema = require("./hotelSchema");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Core
// Instruments
var countrySchema = exports.countrySchema = new _normalizr.schema.Entity('country', {}, {
  idAttribute: function idAttribute(_ref) {
    var countryId = _ref.countryId,
      id = _ref.id;
    return String(countryId ? countryId : id);
  },
  processStrategy: function processStrategy(input) {
    var id = input.id,
      _input$bold = input.bold,
      primary = _input$bold === void 0 ? false : _input$bold,
      _input$code = input.code,
      code = _input$code === void 0 ? '' : _input$code,
      _input$currency = input.currency,
      currency = _input$currency === void 0 ? null : _input$currency,
      _input$transport = input.transport,
      transport = _input$transport === void 0 ? null : _input$transport,
      _input$cities = input.cities,
      cities = _input$cities === void 0 ? [] : _input$cities,
      _input$weight = input.weight,
      weight = _input$weight === void 0 ? '0' : _input$weight;
    var entity = _objectSpread(_objectSpread({}, input), {}, {
      id: String(id),
      name: input.name,
      type: 'country',
      code: code,
      names: (0, _parsers.parseNames)(input),
      price: (0, _parsers.parsePrice)(input),
      location: (0, _parsers.parseLocation)(input),
      primary: primary,
      currency: currency,
      transport: transport,
      cities: cities,
      weight: weight
    });
    return entity;
  }
});
var citySchema = exports.citySchema = new _normalizr.schema.Entity('city', {}, {
  idAttribute: function idAttribute(_ref2) {
    var cityId = _ref2.cityId,
      id = _ref2.id;
    return String(cityId ? cityId : id);
  },
  processStrategy: function processStrategy(input) {
    var id = input.id,
      _input$bold2 = input.bold,
      primary = _input$bold2 === void 0 ? false : _input$bold2,
      countryId = input.countryId,
      _input$code2 = input.code,
      code = _input$code2 === void 0 ? '' : _input$code2,
      value = input.value,
      name = input.name;
    var entity = _objectSpread(_objectSpread({}, input), {}, {
      id: String(id),
      name: value ? value : name,
      country: String(countryId),
      type: 'city',
      code: code,
      names: (0, _parsers.parseNames)(input),
      price: (0, _parsers.parsePrice)(input),
      location: (0, _parsers.parseLocation)(input),
      primary: primary
    });
    return entity;
  }
});
var geoSchema = exports.geoSchema = new _normalizr.schema.Union({
  country: countrySchema,
  city: citySchema,
  hotel: _hotelSchema.hotelShortSchema
}, 'type');
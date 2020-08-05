"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoSchema = exports.citySchema = exports.countrySchema = void 0;

var _normalizr = require("normalizr");

var _parsers = require("../parsers");

var _hotelSchema = require("./hotelSchema");

// Core
// Instruments
var countrySchema = new _normalizr.schema.Entity('country', {}, {
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
        cities = _input$cities === void 0 ? [] : _input$cities;
    var entity = {
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
      cities: cities
    };
    return entity;
  }
});
exports.countrySchema = countrySchema;
var citySchema = new _normalizr.schema.Entity('city', {}, {
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
        name = input.name,
        countryName = input.countryName;
    var entity = {
      id: String(id),
      name: value ? value : name,
      country: String(countryId),
      type: 'city',
      code: code,
      names: (0, _parsers.parseNames)(input),
      price: (0, _parsers.parsePrice)(input),
      location: (0, _parsers.parseLocation)(input),
      primary: primary,
      countryName: countryName
    };
    return entity;
  }
});
exports.citySchema = citySchema;
var geoSchema = new _normalizr.schema.Union({
  country: countrySchema,
  city: citySchema,
  hotel: _hotelSchema.hotelShortSchema
}, 'type');
exports.geoSchema = geoSchema;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoSchema = exports.countrySchema = exports.citySchema = void 0;
var _normalizr = require("normalizr");
var _parsers = require("../parsers");
var _hotelSchema = require("./hotelSchema");
// Core

// Instruments

const countrySchema = exports.countrySchema = new _normalizr.schema.Entity('country', {}, {
  idAttribute: _ref => {
    let {
      countryId,
      id
    } = _ref;
    return String(countryId ? countryId : id);
  },
  processStrategy: input => {
    const {
      id,
      bold: primary = false,
      code = '',
      currency = null,
      transport = null,
      cities = [],
      weight = '0'
    } = input;
    const entity = {
      ...input,
      id: String(id),
      name: input.name,
      type: 'country',
      code,
      names: (0, _parsers.parseNames)(input),
      price: (0, _parsers.parsePrice)(input),
      location: (0, _parsers.parseLocation)(input),
      primary,
      currency,
      transport,
      cities,
      weight
    };
    return entity;
  }
});
const citySchema = exports.citySchema = new _normalizr.schema.Entity('city', {}, {
  idAttribute: _ref2 => {
    let {
      cityId,
      id
    } = _ref2;
    return String(cityId ? cityId : id);
  },
  processStrategy: input => {
    const {
      id,
      bold: primary = false,
      countryId,
      code = '',
      value,
      name
    } = input;
    const entity = {
      ...input,
      id: String(id),
      name: value ? value : name,
      country: String(countryId),
      type: 'city',
      code,
      names: (0, _parsers.parseNames)(input),
      price: (0, _parsers.parsePrice)(input),
      location: (0, _parsers.parseLocation)(input),
      primary
    };
    return entity;
  }
});
const geoSchema = exports.geoSchema = new _normalizr.schema.Union({
  country: countrySchema,
  city: citySchema,
  hotel: _hotelSchema.hotelShortSchema
}, 'type');
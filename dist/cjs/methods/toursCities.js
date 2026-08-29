"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursCities = getToursCities;
var _normalizr = require("normalizr");
var _fn = require("../fn");
var _config = require("../config");
var _schemas = require("../normalize/schemas");
// Core

// Instruments

async function getToursCities(token, countryId) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    'with': 'price'
  };
  const {
    cities: denormalizedCities
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.cities,
    query: {
      countryId,
      ...token,
      ...options
    },
    ttl: [7, 'days']
  });
  const {
    entities: {
      city: cities
    }
  } = (0, _normalizr.normalize)(denormalizedCities.map(city => Object.assign(city, {
    countryId
  })), [_schemas.citySchema]);
  return Object.values(cities);
}
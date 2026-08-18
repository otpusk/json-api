"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursRegions = getToursRegions;
var _normalizr = require("normalizr");
var _fn = require("../fn");
var _config = require("../config");
var _schemas = require("../normalize/schemas");
// Core

// Instruments

async function getToursRegions(token) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    'with': 'price'
  };
  const {
    regions: denormalizedRegions
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.regions,
    query: {
      ...token,
      ...options
    },
    ttl: [7, 'days']
  });
  const {
    entities: {
      region: regions
    }
  } = (0, _normalizr.normalize)(denormalizedRegions, [_schemas.regionSchema]);
  return regions;
}
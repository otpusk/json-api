"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursSimilar = getToursSimilar;
var _normalizr = require("normalizr");
var _fn = require("../fn");
var _config = require("../config");
var _schemas = require("../normalize/schemas");
// Core

// Instruments

async function getToursSimilar(token, hotelId) {
  let limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
  let withPrice = arguments.length > 3 ? arguments[3] : undefined;
  let currency = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'uah';
  const {
    hotels
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.similar,
    query: {
      hotelId,
      limit,
      ...(withPrice ? {
        with: 'price'
      } : {}),
      ...token,
      ...(currency ? {
        currencyLocal: currency
      } : {})
    }
  });
  const {
    entities: {
      hotel: similar
    }
  } = (0, _normalizr.normalize)(hotels, [_schemas.hotelSimilarSchema]);
  return similar;
}
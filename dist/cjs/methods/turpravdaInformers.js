"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTurpravdaHotelInformer = getTurpravdaHotelInformer;
exports.getTurpravdaHotelReviews = getTurpravdaHotelReviews;
var _ramda = require("ramda");
var _fn = require("../fn");
var _config = require("../config");
// Instruments

async function getTurpravdaHotelInformer(hotelId) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    count: 10
  };
  const query = {
    htl: hotelId,
    tp: 9,
    skin: 1,
    ...options
  };
  const response = await fetch(`${_config.ENDPOINTS.turpravdaInformers}?${(0, _fn.createQueryStringFromObject)(query)}`);
  const html = await response.text();
  return html;
}
async function getTurpravdaHotelReviews(hotelId, lang) {
  const {
    hotel,
    reviews
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.turpravdaInformers,
    query: {
      htl: hotelId,
      tp: 99,
      skin: 1,
      count: 999,
      length: 99999,
      lang
    }
  });
  return {
    hotel,
    reviews: (0, _ramda.map)((0, _ramda.evolve)({
      vote: Number
    }), reviews)
  };
}
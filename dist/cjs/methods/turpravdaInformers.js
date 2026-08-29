"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTurpravdaHotelInformer = getTurpravdaHotelInformer;
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
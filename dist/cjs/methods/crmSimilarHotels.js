"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCrmSimilarHotels = getCrmSimilarHotels;
var _fn = require("../fn");
const CRM_METHODS = {
  similarHotels: "/api/similar_hotels"
};
async function getCrmSimilarHotels(token, _ref) {
  let {
    hotelId,
    limit
  } = _ref;
  const {
    results
  } = await (0, _fn.makeCrmCall)(token, CRM_METHODS.similarHotels, {
    hotel_id: hotelId,
    limit
  });
  return results.map(_ref2 => {
    let {
      hotel_id_b: similarHotelId
    } = _ref2;
    return String(similarHotelId);
  });
}
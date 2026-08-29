"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursOffer = getToursOffer;
var _normalizr = require("normalizr");
var _ramda = require("ramda");
var _fn = require("../fn");
var _config = require("../config");
var _schemas = require("../normalize/schemas");
const addCurrency = currencyLocal => (0, _ramda.when)((0, _ramda.always)(currencyLocal), (0, _ramda.mergeLeft)({
  currencyLocal
}));
const addLang = lang => (0, _ramda.when)((0, _ramda.always)(lang), (0, _ramda.mergeLeft)({
  lang
}));
const addShortCode = withShortCode => (0, _ramda.when)((0, _ramda.always)(withShortCode), (0, _ramda.assoc)('getShortOfferId', true));
async function getToursOffer(token, offerId, fresh, currency, lang) {
  let withShortCode = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  const {
    offer: denormalizedOffer,
    originalHotelName
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.offer,
    query: (0, _ramda.call)((0, _ramda.pipe)((0, _ramda.mergeLeft)(token), addCurrency(currency), addLang(lang), addShortCode(withShortCode)), {
      offerId
    }),
    ttl: fresh ? null : [30, 'minutes']
  });
  const {
    entities: {
      offer: offers
    },
    result
  } = (0, _normalizr.normalize)(denormalizedOffer, _schemas.offerSchema);
  return result ? (0, _ramda.mergeAll)([offers[result], {
    hotelNameByOperator: originalHotelName
  }]) : null;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursActual = getToursActual;
var _normalizr = require("normalizr");
var _ramda = require("ramda");
var _fn = require("../fn");
var _schemas = require("../normalize/schemas");
var _config = require("../config");
const buildChildrenQuery = children => children.reduce((acc, child, index) => ({
  ...acc,
  [`child${index + 1}`]: child
}), {});
async function getToursActual(token, offerId, people) {
  let currency = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'uah';
  let withShortCode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  let childrenBirthdays = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  const {
    code,
    offer: denormalizedOffer,
    originalHotelName,
    message
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.actual,
    timeout: 60000,
    query: {
      ...token,
      offerId,
      people,
      currencyLocal: currency,
      ...(withShortCode && {
        getShortOfferId: true
      }),
      ...(childrenBirthdays.length ? buildChildrenQuery(childrenBirthdays) : {})
    }
  });
  const {
    entities: {
      offer: offers = null
    } = {},
    result: id
  } = denormalizedOffer ? (0, _normalizr.normalize)(denormalizedOffer, _schemas.offerSchema) : {};
  return {
    code,
    offer: id ? (0, _ramda.mergeAll)([offers[id], {
      hotelNameByOperator: originalHotelName
    }]) : null,
    message
  };
}
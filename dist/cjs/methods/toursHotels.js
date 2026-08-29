"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursHotel = getToursHotel;
exports.getToursHotels = getToursHotels;
exports.getToursHotelsMarkers = getToursHotelsMarkers;
var _normalizr = require("normalizr");
var R = _interopRequireWildcard(require("ramda"));
var _fn = require("../fn");
var _config = require("../config");
var _schemas = require("../normalize/schemas");
async function getToursHotels(token, countryId) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let methodVersion = arguments.length > 3 ? arguments[3] : undefined;
  const {
    services = [],
    rating = {},
    withPrice = true,
    lang,
    withServices
  } = options;
  const {
    hotels: denormalizedHotels
  } = await (0, _fn.makeCall)({
    endpoint: methodVersion ? R.replace(_config.API_VERSION, methodVersion, _config.ENDPOINTS.hotels) : _config.ENDPOINTS.hotels,
    query: {
      countryId,
      with: withPrice ? 'price' : null,
      lang,
      ...token,
      ...(!R.isEmpty(rating) ? {
        rating: `${rating.from}-${rating.to}`
      } : {}),
      ...(!R.isEmpty(services) ? {
        services
      } : {}),
      ...(withServices ? {
        withServices: true
      } : {})
    },
    ttl: [1, 'day']
  });
  const {
    entities: {
      hotel: hotels
    }
  } = (0, _normalizr.normalize)(denormalizedHotels, [_schemas.hotelShortSchema]);
  return Object.values(hotels);
}
async function getToursHotelsMarkers(token, countryId, cityId, options) {
  const {
    center,
    radius
  } = options;
  const {
    hotels: denormalizedHotels
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.hotels,
    query: {
      countryId,
      cityId,
      data: 'minOffer',
      geo: `${center.lat},${center.lng}`,
      rad: radius || 1,
      with: 'price',
      ...token
    }
  });
  const {
    entities: {
      hotel: markers
    }
  } = (0, _normalizr.normalize)(denormalizedHotels.map(h => ({
    ...h,
    countryId
  })), [_schemas.hotelShortSchema]);
  return markers;
}
async function getToursHotel(token, hotelId) {
  let lang = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ru';
  const {
    hotel: denormalizedHotel
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.hotel,
    query: {
      hotelId,
      lang,
      ...token
    },
    ttl: [1, 'hour']
  });
  const {
    entities: {
      hotel: hotels,
      offer: offers
    },
    result: id
  } = (0, _normalizr.normalize)(denormalizedHotel, _schemas.hotelSchema);
  const hotel = hotels[id];
  return {
    hotel,
    offers
  };
}
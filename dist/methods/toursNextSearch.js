"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursNextSearch = getToursNextSearch;
var _normalizr = require("normalizr");
var _immutable = require("immutable");
var _fn = require("../fn");
var _schemas = require("../normalize/schemas");
var _parsers = require("../normalize/parsers");
var _config = require("../config");
async function getToursNextSearch(token, query) {
  const {
    cnt: denormalizedCountry,
    hotels: denormalizedHotels,
    results,
    workProgress: progressMeta,
    ...other
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.nextSearch,
    query: {
      ...query,
      ...token
    },
    timeout: 15000
  });
  const result = {};
  if (denormalizedCountry) {
    const {
      entities: {
        country: countries
      },
      result: countryId
    } = (0, _normalizr.normalize)(denormalizedCountry, _schemas.countrySchema);
    result.country = countries[countryId];
  }
  if (denormalizedHotels) {
    const {
      entities: {
        hotel: hotels
      }
    } = (0, _normalizr.normalize)(denormalizedHotels, new _normalizr.schema.Values(_schemas.hotelNextSchema));
    result.hotels = hotels;
  }
  if (results) {
    const exactChildrenAges = String(query.people).slice(1).split(/(\d{2})/).map(Number).filter(Boolean).sort((a, b) => a - b);
    result.offers = Object.values(results).map(hotelsMap => Object.values(hotelsMap).map(_ref => {
      let {
        offers
      } = _ref;
      return offers;
    })).flat(1).map(offers => Object.values(offers)).flat(1).reduce((acc, denormalizedOffer) => {
      const {
        entities: {
          offer
        },
        result: id
      } = (0, _normalizr.normalize)(denormalizedOffer, _schemas.offerSchema);
      offer[id].exactChildrenAges = exactChildrenAges.slice(0, offer[id].children);
      return {
        ...acc,
        ...offer
      };
    }, {});
    const pricesMap = Object.values(results).map(hotelsMap => Object.values(hotelsMap).map(_ref2 => {
      let {
        i: id,
        offers: offersShape
      } = _ref2;
      return {
        hotelID: id,
        offers: Object.keys(offersShape).map(offerID => result.offers[offerID]).sort((a, b) => a.price[query.currencyLocal] - b.price[query.currencyLocal])
      };
    })).filter(group => group.length).flat(1).reduce((acc, _ref3) => {
      let {
        hotelID,
        offers
      } = _ref3;
      if (acc[hotelID]) {
        const nextOffers = [...acc[hotelID].offers, ...offers].sort((a, b) => a.price[query.currencyLocal] - b.price[query.currencyLocal]);
        acc[hotelID].offers = nextOffers;
      } else {
        acc[hotelID] = {
          hotelID,
          offers
        };
      }
      return acc;
    }, {});
    result.prices = Object.values(pricesMap).sort((hotelA, hotelB) => hotelA.offers[0].price[query.currencyLocal] - hotelB.offers[0].price[query.currencyLocal]).map(_ref4 => {
      let {
        offers,
        ...rest
      } = _ref4;
      return {
        ...rest,
        offers: offers.map(_ref5 => {
          let {
            id
          } = _ref5;
          return id;
        })
      };
    });
  }
  return (0, _immutable.Map)({
    ...result,
    ...other,
    progressMeta,
    meta: (0, _parsers.parseSearchMeta)(other, query)
  }).filter((_, key) => !['cities', 'cty', 'dept', 'excursion'].includes(key)).toObject();
}
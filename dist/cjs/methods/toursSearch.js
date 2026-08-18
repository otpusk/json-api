"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursSearch = getToursSearch;
var _normalizr = require("normalizr");
var _immutable = require("immutable");
var _moment = _interopRequireDefault(require("moment"));
var _fn = require("../fn");
var _schemas = require("../normalize/schemas");
var _parsers = require("../normalize/parsers");
var _config = require("../config");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Core

// Instruments

function normalizePricesChart(denormalized) {
  const {
    ds: start,
    dt: end,
    d
  } = denormalized;
  const points = (0, _immutable.Range)(0, (0, _moment.default)(end).diff((0, _moment.default)(start), 'days') + 1);
  const peak = {};
  return points.toArray().map(day => (0, _moment.default)(start).add(day, 'days').format('X')).map(day => {
    const price = day in d ? (0, _parsers.parsePrice)(d[day]) : null;
    if (price && (!peak.uah || peak.uah < price.uah)) {
      Object.assign(peak, price);
    }
    return {
      day,
      price
    };
  }).map(_ref => {
    let {
      day,
      price
    } = _ref;
    const delta = price && peak ? Number((price.uah / peak.uah * 100).toFixed(2)) : null;
    return {
      day,
      price,
      delta
    };
  });
}
async function getToursSearch(token, query) {
  const {
    hotels: denormalizedHotels,
    pg: denormalizedChart = null,
    cnt: denormalizedCountry = null,
    ...other
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.search,
    query: {
      ...query,
      ...token
    }
  });
  const {
    entities: {
      hotel: hotels,
      offer: offers
    }
  } = (0, _normalizr.normalize)(Object.values(denormalizedHotels || {}).reduce((all, h) => ({
    ...all,
    ...h
  }), {}), new _normalizr.schema.Values(_schemas.hotelSchema));
  if (offers) {
    const exactChildrenAges = String(query.people).slice(1).split(/(\d{2})/).map(Number).filter(Boolean).sort((a, b) => a - b);
    for (const id in offers) {
      if (offers.hasOwnProperty(id)) {
        offers[id].exactChildrenAges = exactChildrenAges.slice(0, offers[id].children);
      }
    }
  }
  if (hotels) {
    const responseHotels = denormalizedHotels[query.page];
    for (const id in hotels) {
      if (hotels.hasOwnProperty(id)) {
        const {
          p,
          po,
          pu
        } = responseHotels[id];
        hotels[id].bestPrice = {
          price: p,
          originalPrice: po,
          currency: pu
        };
      }
    }
  }
  const {
    entities: {
      country: countries
    },
    result: countryId
  } = (0, _normalizr.normalize)(denormalizedCountry || {}, _schemas.countrySchema);
  const meta = (0, _parsers.parseSearchMeta)(other, query);
  return {
    result: hotels && offers ? {
      hotels,
      offers
    } : {},
    chart: denormalizedChart ? normalizePricesChart(denormalizedChart) : null,
    country: countryId && denormalizedCountry ? countries[countryId] : null,
    meta,
    ...other
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursValidate = getToursValidate;
var _normalizr = require("normalizr");
var _immutable = require("immutable");
var _fn = require("../fn");
var _schemas = require("../normalize/schemas");
var _dictionary = require("../dictionary");
// Core

// Instruments

// import { ENDPOINTS } from '../config';

const NEW_YEAR_PAY = 'N.Y. Holidays';
const normalizePrice = price => Math.ceil(parseInt(price));
async function getToursValidate(token, offerId) {
  // const prodEndpoint = ENDPOINTS.validate;
  const tempEndpoint = 'https://api.otpusk.com/api/3.0/tours/validate';
  if (token && token.city) {
    const {
      name = ''
    } = (0, _dictionary.getDepartureCityById)(token.city);
    token.city = name;
  }
  const {
    status,
    ...denormalizedOffer
  } = await (0, _fn.makeCall)({
    endpoint: `${tempEndpoint}/${offerId}`,
    query: {
      ...token
    },
    timeout: 60000
  });
  const {
    entities: {
      outbound,
      inbound
    },
    result: {
      info,
      usd = 0,
      uah = 0,
      eur = 0,
      currency = 'usd',
      ...validatedTour
    }
  } = (0, _normalizr.normalize)(denormalizedOffer, {
    info: _schemas.infoSchema
  });
  const converter = {
    usd: Number(uah) / Number(usd),
    eur: Number(uah) / Number(eur),
    uah: 1
  };
  const newYears = (0, _immutable.Map)(info && info.services || {}).filter(_ref => {
    let {
      type
    } = _ref;
    return type === NEW_YEAR_PAY;
  }).map(item => (0, _immutable.Map)(item).update('price', normalizePrice).update('price', price => price * converter[currency]).update('price', uah => (0, _immutable.Map)({
    usd: null,
    eur: null,
    uah: null
  }).map((_, key) => normalizePrice(uah / converter[key])))).toList().toJS();
  const flights = {
    ...outbound,
    ...inbound
  };
  const recalculatedFlights = Object.entries(flights).reduce((prev, _ref2) => {
    let [key, value] = _ref2;
    return {
      ...prev,
      [key]: {
        ...value,
        priceChange: {
          usd: currency === 'usd' ? Math.ceil(value.priceChange) : Math.ceil(value.priceChange * converter[currency] / converter.usd),
          eur: currency === 'eur' ? Math.ceil(value.priceChange) : Math.ceil(value.priceChange * converter[currency] / converter.eur),
          uah: currency === 'uah' ? Math.ceil(value.priceChange) : Math.ceil(value.priceChange * converter[currency] / converter.uah)
        }
      }
    };
  }, {});
  return {
    status,
    currency,
    flights: recalculatedFlights,
    newYears,
    ...validatedTour,
    price: {
      usd: Number(usd),
      eur: Number(eur),
      uah: Number(uah)
    }
  };
}
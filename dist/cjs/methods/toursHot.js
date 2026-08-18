"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursHotBlock = getToursHotBlock;
exports.getToursHotTour = getToursHotTour;
var _fn = require("../fn");
var _parsers = require("../normalize/parsers");
var _config = require("../config");
// Instruments

async function getToursHotBlock(token, blockId) {
  const {
    block,
    tours
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.hotBlock,
    query: {
      blockId,
      ...token
    }
  });
  return {
    block,
    tours
  };
}
async function getToursHotTour(token, blockId, tourId) {
  const {
    searchedTour: {
      offers
    } = {}
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.hotTour,
    query: {
      blockId,
      id: tourId,
      ...token
    }
  });
  if (!offers) {
    return null;
  }
  return offers.map(tour => {
    const {
      hotelId,
      dateString,
      food,
      length,
      promo,
      transport,
      cityFromId,
      operatorId,
      tourLink,
      hotelName,
      hotelStars,
      imgSrc
    } = tour;
    const [, offerId] = tourLink.match(/oid=(\d+)/) || [];
    return {
      id: String(hotelId),
      name: hotelName,
      stars: Number(String(hotelStars).replace(/\D/gi, '')),
      country: (0, _parsers.parseCountry)(tour),
      city: (0, _parsers.parseCity)(tour),
      photos: [imgSrc.replace(/^.*\/\d+x\d+\//, '')],
      offer: {
        id: String(offerId),
        date: dateString,
        departure: cityFromId,
        food,
        days: length,
        nights: length - 1,
        promo,
        price: (0, _parsers.parsePrice)(tour),
        operator: operatorId,
        transport
      }
    };
  });
}
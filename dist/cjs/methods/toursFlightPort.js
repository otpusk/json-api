"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursFlightPort = getToursFlightPort;
var _fn = require("../fn");
var _config = require("../config");
// Instruments

async function getToursFlightPort(token, iata) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const {
    port
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.flightPort,
    query: {
      iata,
      ...token,
      ...options
    },
    ttl: [7, 'days']
  });
  const {
    id,
    countryId,
    countryIata,
    countryName,
    lat,
    lng,
    rel,
    ...rest
  } = port;
  return {
    ...rest,
    country: {
      id: Number(countryId),
      name: countryName,
      iata: countryIata
    },
    id: Number(id),
    location: {
      lat,
      lng
    },
    names: {
      rd: rel
    }
  };
}
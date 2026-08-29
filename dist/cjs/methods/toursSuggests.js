"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursGeoById = getToursGeoById;
exports.getToursSuggests = getToursSuggests;
var _normalizr = require("normalizr");
var _fn = require("../fn");
var _schemas = require("../normalize/schemas");
var _config = require("../config");
// Core

// Instruments

const getIndexFromResult = (id, result) => result.findIndex(_ref => {
  let {
    id: own
  } = _ref;
  return id === own;
});
async function getToursSuggests(token, query) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    'with': 'price'
  };
  const {
    response: denormalizedLocations
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.suggests,
    query: {
      text: query,
      ...token,
      ...options
    },
    ttl: [1, 'hour']
  });
  const {
    result,
    entities: locations
  } = (0, _normalizr.normalize)(denormalizedLocations, [_schemas.geoSchema]);
  const resultLocations = Object.fromEntries(Object.entries(locations).map(_ref2 => {
    let [key, group] = _ref2;
    return [key, Object.values(group).sort((_ref3, _ref4) => {
      let {
        id: a
      } = _ref3;
      let {
        id: b
      } = _ref4;
      return getIndexFromResult(a, result) - getIndexFromResult(b, result);
    })];
  }));
  return resultLocations;
}
async function getToursGeoById(token, id) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    'with': 'price'
  };
  const {
    response: denormalizedLocations
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.suggests,
    query: {
      text: id,
      ...token,
      ...options
    },
    ttl: [1, 'hour']
  });
  const {
    result: [{
      id: locationId,
      schema: type
    }],
    entities: locations
  } = (0, _normalizr.normalize)(denormalizedLocations, [_schemas.geoSchema]);
  return locationId ? locations[type][locationId] : null;
}
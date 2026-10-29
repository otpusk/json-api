"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regionSchema = void 0;
var _normalizr = require("normalizr");
var _parsers = require("../parsers");
// Core

// Instruments

const getRegionKey = _ref => {
  let {
    cityId,
    regionId
  } = _ref;
  return cityId ?? regionId;
};
const regionSchema = exports.regionSchema = new _normalizr.schema.Entity('region', {}, {
  idAttribute: getRegionKey,
  processStrategy: input => {
    const {
      deptCities,
      IPselected = false,
      name,
      priority
    } = input;
    const entity = {
      id: getRegionKey(input),
      name,
      departures: deptCities && deptCities.split(','),
      default: IPselected,
      location: (0, _parsers.parseLocation)(input),
      names: (0, _parsers.parseNames)(input),
      priority
    };
    return entity;
  }
});
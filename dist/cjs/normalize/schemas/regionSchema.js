"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regionSchema = void 0;
var _normalizr = require("normalizr");
var _parsers = require("../parsers");
// Core

// Instruments

const regionSchema = exports.regionSchema = new _normalizr.schema.Entity('region', {}, {
  idAttribute: _ref => {
    let {
      regionId,
      id
    } = _ref;
    return String(id || regionId);
  },
  processStrategy: input => {
    const {
      id,
      regionId,
      deptCities,
      IPselected = false,
      name,
      priority
    } = input;
    const entity = {
      id: String(id || regionId),
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
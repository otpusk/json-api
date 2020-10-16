"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.regionSchema = void 0;

var _normalizr = require("normalizr");

var _parsers = require("../parsers");

// Core
// Instruments
var regionSchema = new _normalizr.schema.Entity('region', {}, {
  idAttribute: function idAttribute(_ref) {
    var regionId = _ref.regionId,
        id = _ref.id;
    return String(id || regionId);
  },
  processStrategy: function processStrategy(input) {
    var id = input.id,
        regionId = input.regionId,
        deptCities = input.deptCities,
        _input$IPselected = input.IPselected,
        IPselected = _input$IPselected === void 0 ? false : _input$IPselected,
        name = input.name;
    var entity = {
      id: String(id || regionId),
      name: name,
      departures: deptCities && deptCities.split(','),
      default: IPselected,
      location: (0, _parsers.parseLocation)(input),
      names: (0, _parsers.parseNames)(input)
    };
    return entity;
  }
});
exports.regionSchema = regionSchema;
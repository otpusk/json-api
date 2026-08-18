"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursAgencies = getToursAgencies;
var _normalizr = require("normalizr");
var _immutable = require("immutable");
var _fn = require("../fn");
var _config = require("../config");
var _schemas = require("../normalize/schemas");
// Core

// Instruments

async function getToursAgencies(token, _ref) {
  let {
    regionId,
    hotelId,
    offerId,
    noStats = false,
    adMarketId
  } = _ref;
  const params = {
    ...token,
    regionId,
    hotelId,
    offers: offerId,
    ...(adMarketId ? {
      adMarketId
    } : {})
  };
  noStats && Object.assign(params, {
    nst: 1
  });
  const {
    operators,
    regions: denormalizedRegions
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.agencies,
    query: params
  });
  const {
    entities: {
      agency: agencies,
      office: offices
    },
    result: {
      1: {
        viewAgencies: viewAgenciesOrder
      } = {}
    }
  } = (0, _normalizr.normalize)(operators, new _normalizr.schema.Values({
    viewAgencies: [_schemas.agencySchema]
  }));
  const {
    entities: {
      region: regions
    }
  } = (0, _normalizr.normalize)(denormalizedRegions, [_schemas.regionSchema]);
  return {
    agencies: (0, _immutable.Map)(agencies).sortBy(_ref2 => {
      let {
        adId
      } = _ref2;
      return viewAgenciesOrder.indexOf(adId) + 100;
    }),
    offices,
    regions
  };
}
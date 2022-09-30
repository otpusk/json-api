"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeOffer = void 0;

var _normalizr = require("normalizr");

var _schemas = require("./schemas");

var normalizeOffer = function normalizeOffer(denormalizedOffer) {
  var _normalize = (0, _normalizr.normalize)(denormalizedOffer, _schemas.offerSchema),
      offer = _normalize.entities.offer,
      result = _normalize.result;

  return offer[result];
};

exports.normalizeOffer = normalizeOffer;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeOffer = void 0;

var _normalizr = require("normalizr");

var _schemas = require("./schemas");

var normalizeOffer = function normalizeOffer(offer) {
  return (0, _normalizr.normalize)(offer, _schemas.offerSchema);
};

exports.normalizeOffer = normalizeOffer;
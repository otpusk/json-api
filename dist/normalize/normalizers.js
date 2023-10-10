"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.excludeRequirementTourOptions = exports.normalizeRequiremenets = exports.normalizeOffer = void 0;

var _normalizr = require("normalizr");

var _ramda = require("ramda");

var _schemas = require("./schemas");

var _static = require("../static");

var normalizeOffer = function normalizeOffer(denormalizedOffer) {
  var _normalize = (0, _normalizr.normalize)(denormalizedOffer, _schemas.offerSchema),
      offer = _normalize.entities.offer,
      result = _normalize.result;

  return offer[result];
};

exports.normalizeOffer = normalizeOffer;
var applyRequirement = (0, _ramda.curryN)(3, function (tourOption, tourOptions, requirements) {
  return (0, _ramda.includes)(tourOption, tourOptions) ? requirements : (0, _ramda.append)(tourOption, requirements);
});
var applyVisaRequirement = (0, _ramda.curryN)(2, function (tourOptions, requirements) {
  return (0, _ramda.includes)(_static.TOUR_OPTIONS.NOT_NEED_VISA, tourOptions) ? requirements : (0, _ramda.append)(_static.TOUR_OPTIONS.VISA, requirements);
});
var applyGalaRequirement = (0, _ramda.curryN)(2, function (tourOptions, requirements) {
  return (0, _ramda.includes)(_static.TOUR_OPTIONS.REQUIREMENT_GALA_DINNER, tourOptions) ? (0, _ramda.append)(_static.TOUR_OPTIONS.GALA_DINNER, requirements) : requirements;
});

var normalizeRequiremenets = function normalizeRequiremenets(tourOptions) {
  return (0, _ramda.call)((0, _ramda.pipe)(applyVisaRequirement(tourOptions), applyRequirement(_static.TOUR_OPTIONS.INSURANCE, tourOptions), applyRequirement(_static.TOUR_OPTIONS.TRANSFER, tourOptions), applyGalaRequirement(tourOptions)), []);
};

exports.normalizeRequiremenets = normalizeRequiremenets;

var excludeRequirementTourOptions = function excludeRequirementTourOptions(tourOptions) {
  var requirementOptions = new Set([_static.TOUR_OPTIONS.NOT_NEED_VISA, _static.TOUR_OPTIONS.REQUIREMENT_GALA_DINNER]);
  return (0, _ramda.filter)(function (option) {
    return !requirementOptions.has(option);
  }, tourOptions);
};

exports.excludeRequirementTourOptions = excludeRequirementTourOptions;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeRequiremenets = exports.normalizeOffer = exports.excludeRequirementTourOptions = exports.applyTimeZoneToDate = void 0;
var _normalizr = require("normalizr");
var _ramda = require("ramda");
var _moment = _interopRequireDefault(require("moment"));
var _schemas = require("./schemas");
var _static = require("../static");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const normalizeOffer = denormalizedOffer => {
  const {
    entities: {
      offer
    },
    result
  } = (0, _normalizr.normalize)(denormalizedOffer, _schemas.offerSchema);
  return offer[result];
};
exports.normalizeOffer = normalizeOffer;
const applyRequirement = (0, _ramda.curryN)(3, (tourOption, tourOptions, requirements) => {
  return (0, _ramda.includes)(tourOption, tourOptions) ? requirements : (0, _ramda.append)(tourOption, requirements);
});
const applyVisaRequirement = (0, _ramda.curryN)(2, (tourOptions, requirements) => {
  return (0, _ramda.includes)(_static.TOUR_OPTIONS.NOT_NEED_VISA, tourOptions) ? requirements : (0, _ramda.append)(_static.TOUR_OPTIONS.VISA, requirements);
});
const applyGalaRequirement = (0, _ramda.curryN)(2, (tourOptions, requirements) => {
  return (0, _ramda.includes)(_static.TOUR_OPTIONS.REQUIREMENT_GALA_DINNER, tourOptions) ? (0, _ramda.append)(_static.TOUR_OPTIONS.GALA_DINNER, requirements) : requirements;
});
const normalizeRequiremenets = tourOptions => {
  return (0, _ramda.call)((0, _ramda.pipe)(applyVisaRequirement(tourOptions), applyRequirement(_static.TOUR_OPTIONS.INSURANCE, tourOptions), applyRequirement(_static.TOUR_OPTIONS.TRANSFER, tourOptions), applyGalaRequirement(tourOptions)), []);
};
exports.normalizeRequiremenets = normalizeRequiremenets;
const excludeRequirementTourOptions = tourOptions => {
  const requirementOptions = new Set([_static.TOUR_OPTIONS.NOT_NEED_VISA, _static.TOUR_OPTIONS.REQUIREMENT_GALA_DINNER]);
  return (0, _ramda.filter)(option => !requirementOptions.has(option), tourOptions);
};
exports.excludeRequirementTourOptions = excludeRequirementTourOptions;
const applyTimeZoneToDate = (date, outerFormat) => {
  return (0, _moment.default)(date).format(outerFormat);
};
exports.applyTimeZoneToDate = applyTimeZoneToDate;
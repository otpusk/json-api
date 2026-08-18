"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursHotelDescriptionsByOperator = void 0;
var _ramda = require("ramda");
var _fn = require("../fn");
var _config = require("../config");
var _contentUtils = require("../contentUtils");
const getToursHotelDescriptionsByOperator = async (token, _ref) => {
  let {
    lang,
    subHotelID,
    subOperatorName,
    operatorId
  } = _ref;
  const {
    data
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.hotelDescriptionsByOperator,
    query: {
      operatorId,
      lang,
      sourceHotelId: subHotelID,
      subOperator: subOperatorName,
      ...token
    }
  });
  return (0, _ramda.pipe)((0, _ramda.path)(['data', 'descriptions']), (0, _ramda.defaultTo)([]), (0, _ramda.filter)((0, _ramda.prop)('subject')), (0, _ramda.map)((0, _ramda.applySpec)({
    title: (0, _ramda.prop)('subject'),
    content: (0, _ramda.pipe)((0, _ramda.prop)('content'), _contentUtils.prepareContent2Render),
    titleOriginal: (0, _ramda.prop)('subject_original'),
    contentOriginal: (0, _ramda.pipe)((0, _ramda.prop)('content_original'), _contentUtils.prepareContent2Render),
    type: (0, _ramda.prop)('type')
  })))(data);
};
exports.getToursHotelDescriptionsByOperator = getToursHotelDescriptionsByOperator;
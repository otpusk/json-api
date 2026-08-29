"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStaticData = getStaticData;
var _fn = require("../fn");
var _config = require("../config");
async function getStaticData(query) {
  const {
    imageCategory
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.static,
    query,
    ttl: [7, 'days']
  });
  return {
    photoCategories: imageCategory ? Object.entries(imageCategory).map(_ref => {
      let [id, name] = _ref;
      return {
        id: Number(id),
        name
      };
    }) : []
  };
}
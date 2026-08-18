"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursGeoTree = getToursGeoTree;
var _ramda = require("ramda");
var _fn = require("../fn");
var _config = require("../config");
function normalizeGeoTree(geoTree) {
  return (0, _ramda.map)((0, _ramda.pipe)(_ref => {
    let {
      parent_id: parentID,
      id,
      ...leaf
    } = _ref;
    return (0, _ramda.mergeAll)([leaf, {
      id: (0, _ramda.unless)(_ramda.isNil, String, id),
      parentID: (0, _ramda.unless)(_ramda.isNil, String, parentID)
    }]);
  }, (0, _ramda.over)((0, _ramda.lensProp)('children'), (0, _ramda.when)(Boolean, normalizeGeoTree))), geoTree);
}
async function getToursGeoTree(options) {
  const {
    geo
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.geoTree,
    query: options,
    ttl: [1, 'days']
  });
  return normalizeGeoTree(geo);
}
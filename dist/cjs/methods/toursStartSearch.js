"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursStartSearch = getToursStartSearch;
var _fn = require("../fn");
var _config = require("../config");
// Instruments

async function getToursStartSearch(token) {
  let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const response = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.startSearch,
    method: 'HEAD',
    query: {
      ...query,
      ...token
    }
  });
  return response;
}
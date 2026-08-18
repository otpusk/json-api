"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursOrder = getToursOrder;
var _fn = require("../fn");
var _config = require("../config");
// Instruments

async function getToursOrder(token, claim) {
  const response = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.order,
    query: {
      widget: 'order',
      ...claim,
      ...token
    }
  });
  return response;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursBookCalculate = getToursBookCalculate;
var _ramda = require("ramda");
var _fn = require("../fn");
var _config = require("../config");
async function getToursBookCalculate(tokenAsQuery, query, body) {
  const {
    currency_original,
    currency,
    price,
    price_original,
    rate
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.bookCalculate,
    query: (0, _ramda.mergeAll)([tokenAsQuery, query]),
    method: 'POST',
    body
  });
  return {
    price: {
      [currency]: price,
      [currency_original]: price_original
    },
    rate
  };
}
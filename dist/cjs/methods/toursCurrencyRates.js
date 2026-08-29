"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursCurrencyRates = getToursCurrencyRates;
var _immutable = require("immutable");
var _fn = require("../fn");
var _config = require("../config");
// Core

// Instruments

async function getToursCurrencyRates(token, date) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const {
    from,
    to
  } = date;
  const {
    rates = {}
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.currencyRates,
    query: {
      'datebegin': from,
      'dateend': to,
      ...options,
      ...token
    }
  });
  const results = (0, _immutable.Map)(rates).map(rate => {
    return (0, _immutable.Map)(rate).map(operators => {
      return (0, _immutable.Map)(operators).map(operator => {
        return (0, _immutable.Map)(operator).update('history', history => {
          return (0, _immutable.Map)(history).map((value, dateKey) => ({
            rate: value,
            date: dateKey
          })).toList().toArray();
        }).toObject();
      }).toObject();
    }).toObject();
  }).toObject();
  return results;
}
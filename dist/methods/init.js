"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInit = getInit;
var _fn = require("../fn");
var _config = require("../config");
const MAX_ATTEMPTS = 3;
async function getInit(token) {
  let attempt = 0;
  let lastError;
  while (attempt < MAX_ATTEMPTS) {
    try {
      const response = await (0, _fn.makeCall)({
        endpoint: _config.ENDPOINTS.init,
        query: token
      });
      const {
        api_settings: settings,
        currencies: availableCurrencies
      } = response;
      return {
        availableCurrencies,
        defaultDepartureID: settings.osDeptCity
      };
    } catch (err) {
      lastError = err;
      attempt++;
      if (attempt < MAX_ATTEMPTS) {
        await new Promise(resolve => setTimeout(resolve, 300 * 2 ** (attempt - 1)));
      }
    }
  }
  throw lastError;
}
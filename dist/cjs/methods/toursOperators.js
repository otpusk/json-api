"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursOperators = getToursOperators;
var R = _interopRequireWildcard(require("ramda"));
var _fn = require("../fn");
var _config = require("../config");
var _dictionary = require("../dictionary");
async function getToursOperators(token, countryId) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let methodVersion = arguments.length > 3 ? arguments[3] : undefined;
  const {
    operators: raw = {}
  } = await (0, _fn.makeCall)({
    endpoint: methodVersion ? R.replace(_config.API_VERSION, methodVersion, _config.ENDPOINTS.operators) : _config.ENDPOINTS.operators,
    query: {
      countryId,
      ...options,
      ...token
    },
    ttl: [2, 'hour']
  });
  return R.call(R.pipe(R.values, R.map(operator => R.mergeAll([R.pick(['active', 'id', 'name', 'url', 'transports', 'priority', 'rFilterComment', 'origin'], operator), {
    currencyRates: operator.currencies,
    logo: operator.logo ?? (0, _dictionary.getOperatorLogoById)(operator.id),
    offerTTLAsMinutes: operator.offer_ttl ?? undefined
  }]))), raw);
}
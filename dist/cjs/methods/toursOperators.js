"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursOperators = getToursOperators;
var R = _interopRequireWildcard(require("ramda"));
var _fn = require("../fn");
var _config = require("../config");
var _dictionary = require("../dictionary");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
  return R.call(R.pipe(R.values, R.map(operator => R.mergeAll([R.pick(['active', 'id', 'name', 'url', 'transports', 'priority', 'rFilterComment'], operator), {
    currencyRates: operator.currencies,
    logo: operator.logo ?? (0, _dictionary.getOperatorLogoById)(operator.id),
    offerTTLAsMinutes: operator.offer_ttl ?? undefined
  }]))), raw);
}
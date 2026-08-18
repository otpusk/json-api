"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursCountries = getToursCountries;
var _normalizr = require("normalizr");
var R = _interopRequireWildcard(require("ramda"));
var _schemas = require("../normalize/schemas");
var _fn = require("../fn");
var _config = require("../config");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const withPrice = options => options && options.with === 'price';
async function getToursCountries(token) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    'with': 'price'
  };
  let methodVersion = arguments.length > 2 ? arguments[2] : undefined;
  const {
    countries: denormalizedCountries
  } = await (0, _fn.makeCall)({
    endpoint: methodVersion ? R.replace(_config.API_VERSION, methodVersion, _config.ENDPOINTS.countries) : _config.ENDPOINTS.countries,
    query: {
      ...token,
      ...options
    },
    ttl: withPrice(options) ? void 0 : [7, 'days']
  });
  const {
    entities: {
      country: countries
    }
  } = (0, _normalizr.normalize)(denormalizedCountries, [_schemas.countrySchema]);
  return Object.values(countries);
}
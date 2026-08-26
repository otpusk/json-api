"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursCountries = getToursCountries;
var _normalizr = require("normalizr");
var R = _interopRequireWildcard(require("ramda"));
var _schemas = require("../normalize/schemas");
var _fn = require("../fn");
var _config = require("../config");
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
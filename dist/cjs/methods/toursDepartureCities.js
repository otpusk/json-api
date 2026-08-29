"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursDepartureCities = getToursDepartureCities;
var R = _interopRequireWildcard(require("ramda"));
var _fn = require("../fn");
var _config = require("../config");
async function getToursDepartureCities(token) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let methodVersion = arguments.length > 2 ? arguments[2] : undefined;
  const {
    fromCities
  } = await (0, _fn.makeCall)({
    endpoint: methodVersion ? R.replace(_config.API_VERSION, methodVersion, _config.ENDPOINTS.departureCities) : _config.ENDPOINTS.departureCities,
    query: {
      ...token,
      ...options
    },
    ttl: [7, 'days']
  });
  return fromCities.map(_ref => {
    let {
      country,
      countryId,
      rel,
      transport,
      ...rest
    } = _ref;
    return {
      ...rest,
      ...(country && {
        country: {
          id: String(countryId),
          name: country
        }
      }),
      names: {
        rd: rel
      },
      transports: transport || []
    };
  });
}
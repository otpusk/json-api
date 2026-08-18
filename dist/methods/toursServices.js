"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursServices = getToursServices;
var R = _interopRequireWildcard(require("ramda"));
var _fn = require("../fn");
var _config = require("../config");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const renameGroupKeys = group => R.call(R.pipe(R.toPairs, R.map(_ref => {
  let [key, services] = _ref;
  return [R.replace('Service', '', key), services];
}), R.fromPairs), group);
const objectToArray = object => R.call(R.pipe(R.toPairs, R.map(_ref2 => {
  let [key, value] = _ref2;
  return {
    [key]: value
  };
})), object);
const chainsToArray = chains => R.call(R.pipe(R.toPairs, R.map(_ref3 => {
  let [id, name] = _ref3;
  return {
    id,
    name
  };
}), R.filter(_ref4 => {
  let {
    id,
    name
  } = _ref4;
  return Boolean(id) && Boolean(name);
})), chains);
const extractServicesFromResponse = response => R.call(R.pipe(R.toPairs, R.filter(_ref5 => {
  let [, value] = _ref5;
  return value !== null && typeof value === 'object';
}), R.map(_ref6 => {
  let [key, value] = _ref6;
  return [key, objectToArray(value)];
}), R.fromPairs), response);
async function getToursServices(token) {
  let country = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  let lang = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ru';
  let withIcons = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  let fresh = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  const {
    icons = [],
    tabs = [],
    nameServices = {},
    chains = {},
    search,
    ...response
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.services,
    query: {
      ...token,
      countryId: country,
      lang,
      ...(withIcons && {
        with_icons: true
      })
    },
    ttl: fresh ? null : [7, 'days']
  });
  const isSetCountry = Boolean(Number(country));
  const countryService = isSetCountry ? search.countryService : response.countryService;
  const searchGroup = isSetCountry ? R.omit(['countryService'], search) : extractServicesFromResponse(R.omit(['countryService'], response));
  return R.mergeAll([{
    icons,
    tabs,
    chains: chainsToArray(chains)
  }, {
    rootGroups: objectToArray(renameGroupKeys(nameServices))
  }, renameGroupKeys(searchGroup), {
    country: isSetCountry && countryService ? countryService : [],
    byCountries: !isSetCountry && countryService ? countryService : {}
  }]);
}
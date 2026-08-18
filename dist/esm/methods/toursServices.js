import * as R from 'ramda';
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
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
export async function getToursServices(token) {
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
  } = await makeCall({
    endpoint: ENDPOINTS.services,
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
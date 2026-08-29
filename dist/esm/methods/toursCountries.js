import { normalize } from 'normalizr';
import * as R from 'ramda';
import { countrySchema } from '../normalize/schemas';
import { makeCall } from '../fn';
import { API_VERSION, ENDPOINTS } from '../config';
const withPrice = options => options && options.with === 'price';
export async function getToursCountries(token) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    'with': 'price'
  };
  let methodVersion = arguments.length > 2 ? arguments[2] : undefined;
  const {
    countries: denormalizedCountries
  } = await makeCall({
    endpoint: methodVersion ? R.replace(API_VERSION, methodVersion, ENDPOINTS.countries) : ENDPOINTS.countries,
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
  } = normalize(denormalizedCountries, [countrySchema]);
  return Object.values(countries);
}
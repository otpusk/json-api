import * as R from 'ramda';
import { makeCall } from '../fn';
import { API_VERSION, ENDPOINTS } from '../config';
export async function getToursDepartureCities(token) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let methodVersion = arguments.length > 2 ? arguments[2] : undefined;
  const {
    fromCities
  } = await makeCall({
    endpoint: methodVersion ? R.replace(API_VERSION, methodVersion, ENDPOINTS.departureCities) : ENDPOINTS.departureCities,
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
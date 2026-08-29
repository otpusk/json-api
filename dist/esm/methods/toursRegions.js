// Core
import { normalize } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { regionSchema } from '../normalize/schemas';
export async function getToursRegions(token) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    'with': 'price'
  };
  const {
    regions: denormalizedRegions
  } = await makeCall({
    endpoint: ENDPOINTS.regions,
    query: {
      ...token,
      ...options
    },
    ttl: [7, 'days']
  });
  const {
    entities: {
      region: regions
    }
  } = normalize(denormalizedRegions, [regionSchema]);
  return regions;
}
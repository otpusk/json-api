// Core
import { normalize } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { geoSchema } from '../normalize/schemas';
import { ENDPOINTS } from '../config';
const getIndexFromResult = (id, result) => result.findIndex(_ref => {
  let {
    id: own
  } = _ref;
  return id === own;
});
export async function getToursSuggests(token, query) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    'with': 'price'
  };
  const {
    response: denormalizedLocations
  } = await makeCall({
    endpoint: ENDPOINTS.suggests,
    query: {
      text: query,
      ...token,
      ...options
    },
    ttl: [1, 'hour']
  });
  const {
    result,
    entities: locations
  } = normalize(denormalizedLocations, [geoSchema]);
  const resultLocations = Object.fromEntries(Object.entries(locations).map(_ref2 => {
    let [key, group] = _ref2;
    return [key, Object.values(group).sort((_ref3, _ref4) => {
      let {
        id: a
      } = _ref3;
      let {
        id: b
      } = _ref4;
      return getIndexFromResult(a, result) - getIndexFromResult(b, result);
    })];
  }));
  return resultLocations;
}
export async function getToursGeoById(token, id) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    'with': 'price'
  };
  const {
    response: denormalizedLocations
  } = await makeCall({
    endpoint: ENDPOINTS.suggests,
    query: {
      text: id,
      ...token,
      ...options
    },
    ttl: [1, 'hour']
  });
  const {
    result: [{
      id: locationId,
      schema: type
    }],
    entities: locations
  } = normalize(denormalizedLocations, [geoSchema]);
  return locationId ? locations[type][locationId] : null;
}
// Core
import { schema } from 'normalizr';

// Instruments
import { parseNames, parseLocation } from '../parsers';
const getRegionKey = _ref => {
  let {
    cityId,
    regionId
  } = _ref;
  return cityId ?? regionId;
};
export const regionSchema = new schema.Entity('region', {}, {
  idAttribute: getRegionKey,
  processStrategy: input => {
    const {
      deptCities,
      IPselected = false,
      name,
      priority
    } = input;
    const entity = {
      id: getRegionKey(input),
      name,
      departures: deptCities && deptCities.split(','),
      default: IPselected,
      location: parseLocation(input),
      names: parseNames(input),
      priority
    };
    return entity;
  }
});
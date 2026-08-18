// Core
import { schema } from 'normalizr';

// Instruments
import { parseNames, parsePrice, parseLocation } from '../parsers';
import { hotelShortSchema } from './hotelSchema';
export const countrySchema = new schema.Entity('country', {}, {
  idAttribute: _ref => {
    let {
      countryId,
      id
    } = _ref;
    return String(countryId ? countryId : id);
  },
  processStrategy: input => {
    const {
      id,
      bold: primary = false,
      code = '',
      currency = null,
      transport = null,
      cities = [],
      weight = '0'
    } = input;
    const entity = {
      ...input,
      id: String(id),
      name: input.name,
      type: 'country',
      code,
      names: parseNames(input),
      price: parsePrice(input),
      location: parseLocation(input),
      primary,
      currency,
      transport,
      cities,
      weight
    };
    return entity;
  }
});
export const citySchema = new schema.Entity('city', {}, {
  idAttribute: _ref2 => {
    let {
      cityId,
      id
    } = _ref2;
    return String(cityId ? cityId : id);
  },
  processStrategy: input => {
    const {
      id,
      bold: primary = false,
      countryId,
      code = '',
      value,
      name
    } = input;
    const entity = {
      ...input,
      id: String(id),
      name: value ? value : name,
      country: String(countryId),
      type: 'city',
      code,
      names: parseNames(input),
      price: parsePrice(input),
      location: parseLocation(input),
      primary
    };
    return entity;
  }
});
export const geoSchema = new schema.Union({
  country: countrySchema,
  city: citySchema,
  hotel: hotelShortSchema
}, 'type');
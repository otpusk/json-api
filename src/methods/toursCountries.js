import { normalize } from 'normalizr';
import * as R from 'ramda';

import { countrySchema } from '../normalize/schemas';

import { makeCall } from '../fn';
import { API_VERSION, ENDPOINTS } from '../config';

const withPrice = (options) => options && options.with === 'price';

export async function getToursCountries (token, options = { 'with': 'price' }, methodVersion) {
    const { countries: denormalizedCountries } = await makeCall({
        endpoint: methodVersion
            ? R.replace(API_VERSION, methodVersion, ENDPOINTS.countries)
            : ENDPOINTS.countries,
        query: {
            ...token,
            ...options,
        },
        ttl: withPrice(options) ? void 0 : [7, 'days'],
    });

    const { entities: { country: countries }}  = normalize(denormalizedCountries, [countrySchema]);

    return Object.values(countries);
}

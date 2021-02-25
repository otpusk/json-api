// Core
import { normalize } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { countrySchema } from '../normalize/schemas';

const withPrice = (options) => options && options.with === 'price';

export async function getToursCountries (token, options = { 'with': 'price' }) {
    const { countries: denormalizedCountries } = await makeCall({ endpoint: ENDPOINTS.countries,
        query: {
            ...token,
            ...options,
        },
        ttl: withPrice(options) ? void 0 : [7, 'days']});

    const { entities: { country: countries }}  = normalize(denormalizedCountries, [countrySchema]);

    return Object.values(countries);
}

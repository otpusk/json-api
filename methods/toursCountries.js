// Core
import { normalize } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { countrySchema } from '../normalize/schemas';

export async function getToursCountries (token, options = { 'with': 'price' }) {

    const { countries: denormalizedCountries } = await makeCall(ENDPOINTS.countries, {
        ...token,
        ...options,
    }, [7, 'days']);

    const { entities: { country: countries }}  = normalize(denormalizedCountries, [countrySchema]);

    return Object.values(countries);
}

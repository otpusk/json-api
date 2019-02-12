// Core
import { normalize } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { citySchema } from '../normalize/schemas';

export async function getToursCities (token, countryId, options = { 'with': 'price' }) {

    const { cities: denormalizedCities } = await makeCall(ENDPOINTS.cities, {
        countryId,
        ...token,
        ...options,
    }, [7, 'days']);

    const { entities: { city: cities }} = normalize(
        denormalizedCities.map((city) => Object.assign(city, { countryId })),
        [citySchema]
    );

    return Object.values(cities);
}

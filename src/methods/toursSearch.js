// Core
import { normalize, schema } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { hotelSchema, countrySchema } from '../normalize/schemas';
import { ENDPOINTS } from '../config';

export async function getToursSearch (token, query) {
    const {
        hotels: denormalizedHotels,
        cnt: denormalizedCountry,
        ...other
    } = await makeCall(ENDPOINTS.search, { ...query, ...token });

    const { entities: { hotel: hotels, offer: offers }} = normalize(
        denormalizedHotels || {},
        new schema.Values(
            new schema.Values(
                hotelSchema
            )
        )
    );

    const { entities: { country: countries }, result: countryId } = normalize(denormalizedCountry || {}, countrySchema);

    return {
        result:  hotels && offers ? { hotels, offers } : {},
        country: denormalizedCountry && countryId ? countries[countryId] : null,
        ...other,
    };
}

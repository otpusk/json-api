// Core
import { normalize } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { hotelSimilarSchema } from '../normalize/schemas';

export async function getToursSimilar (token, hotelId, limit = 3, withPrice) {
    const { hotels } = await makeCall({
        endpoint: ENDPOINTS.similar,
        query:    {
            hotelId,
            limit,
            ...withPrice ? { with: 'price' } : {},
            ...token,
        },
    });
    const { entities: { hotel: similar }} = normalize(hotels, [hotelSimilarSchema]);

    return similar;
}

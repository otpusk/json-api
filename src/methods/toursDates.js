// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getToursDates (token, options) {
    const { dates : denormalizedDates = {}} = await makeCall({ endpoint: ENDPOINTS.dates,
        query:    {
            ...token,
            ...options,
        },
        ttl: [2, 'hour']});

    return Object.keys(denormalizedDates);
}

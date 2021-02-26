// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getToursDepartureCities (token, options = {}) {
    const { fromCities } = await makeCall({ endpoint: ENDPOINTS.departureCities,
        query: {
            ...token,
            ...options,
        },
        ttl: [7, 'days']});

    return fromCities.map(
        ({ rel, ...rest }) => ({ ...rest, names: { rd: rel }})
    );
};
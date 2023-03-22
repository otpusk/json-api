import * as R from 'ramda';

import { makeCall } from '../fn';
import { API_VERSION, ENDPOINTS } from '../config';

export async function getToursDepartureCities (token, options = {}, methodVersion) {
    const { fromCities } = await makeCall({
        endpoint: methodVersion
            ? R.replace(API_VERSION, methodVersion, ENDPOINTS.departureCities)
            : ENDPOINTS.departureCities,
        query: {
            ...token,
            ...options,
        },
        ttl: [7, 'days'],
    });

    return fromCities.map(({ country, countryId, rel, transport, ...rest }) => ({
        ...rest,
        country: {
            id:   countryId,
            name: country,
        },
        names:      { rd: rel },
        transports: transport || [],
    }));
}

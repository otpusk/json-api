// Core
import { Map } from 'immutable';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getToursServices (token, country = null, lang = 'ru') {

    const { api_version, time, checked, result, ...groups } = await makeCall({ endpoint: ENDPOINTS.services,
        query: {
            ...token, countryId: country, lang,
        },
        ttl: [7, 'days']});

    return Map(groups)
        .mapKeys((k) => k.replace('Service', ''))
        .toJS();
}

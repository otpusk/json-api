// Core
import { Map } from 'immutable';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getToursServices (token, country = null, lang = 'ru') {

    const { api_version, time, checked, result, ...groups } = await makeCall(ENDPOINTS.services, {
        ...token, countryId: country, lang
    }, [7, 'days']);

    return Map(groups)
        .mapKeys((k) => k.replace('Service', ''))
        .toJS();
}

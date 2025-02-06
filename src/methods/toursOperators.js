import * as R from 'ramda';

import { makeCall } from '../fn';
import { API_VERSION, ENDPOINTS } from '../config';
import { getOperatorLogoById } from '../dictionary';


export async function getToursOperators (token, countryId, options = {}, methodVersion) {
    const { operators: raw = {}} = await makeCall({
        endpoint: methodVersion
            ? R.replace(API_VERSION, methodVersion, ENDPOINTS.operators)
            : ENDPOINTS.operators,
        query: {
            countryId,
            ...options,
            ...token,
        },
        ttl: [2, 'hour'],
    });


    return R.call(
        R.pipe(
            R.values,
            R.map((operator) => R.mergeAll([
                R.pick(['active', 'id', 'name', 'url', 'transports', 'priority'], operator),
                {
                    currencyRates:     operator.currencies,
                    logo:              getOperatorLogoById(operator.id),
                    offerTTLAsMinutes: operator.offer_ttl ?? undefined,
                }
            ]))
        ),
        raw
    );
}

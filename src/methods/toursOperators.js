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
    });
    const operators = Object
        .values(raw)
        .map(({ active, currencies, id, name, url, transports }) => ({
            active,
            id,
            name,
            url,
            currencyRates: currencies,
            logo:          getOperatorLogoById(id),
            transports,
        }));

    return operators;
}

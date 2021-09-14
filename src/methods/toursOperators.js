// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { getOperatorLogoById } from '../dictionary';

export async function getToursOperators (token, countryId, options = {}) {
    const { operators: raw = {}} = await makeCall({ endpoint: ENDPOINTS.operators,
        query:    {
            countryId,
            ...options,
            ...token,
        }});
    const operators = Object.values(raw).map(({ active, id, name, url, currencies }) => ({
        active,
        id,
        name,
        url,
        currencyRates: currencies,
        logo:          getOperatorLogoById(id),
    }));

    return operators;
}

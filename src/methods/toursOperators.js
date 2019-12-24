// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { getOperatorLogoById } from '../dictionary';

export async function getToursOperators(token, countryId, options = {}) {
    const { operators: raw = {} } = await makeCall(ENDPOINTS.operators, {
        countryId,
        ...options,
        ...token,
    });
    const operators = Object.values(raw).map(({ id, name, url, currencies }) => ({
        id,
        name,
        url,
        currencyRates: currencies,
        logo: getOperatorLogoById(id)
    }))

    return operators;
}
// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getToursOperators(token, countryId, options = {}) {
    const { operators: raw = {} } = await makeCall(ENDPOINTS.operators, {
        countryId,
        ...options,
        ...token,
    }, [7, 'days']);
    const operators = Object.values(raw).map(({ id, name, url, currencies }) => ({
        id,
        name,
        url,
        currencyRates: currencies,
        logo: `https://export.otpusk.com/images/onsite/logo/logo-${id}.png`
    }))

    return operators;
}
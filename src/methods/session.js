import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getSession (tokenAsQuery) {
    const session = await makeCall({
        endpoint: ENDPOINTS.session,
        query:    tokenAsQuery,
    });

    const { api_settings: settings, currencies: availableCurrencies } = session;

    return {
        availableCurrencies,
        defaultDepartureID: settings.osDeptCity,
    };
}

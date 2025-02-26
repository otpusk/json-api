import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getInit (token) {
    const response = await makeCall({ endpoint: ENDPOINTS.init, query: token });

    const { api_settings: settings, currencies: availableCurrencies } = response;

    return {
        availableCurrencies,
        defaultDepartureID: settings.osDeptCity,
    };
}

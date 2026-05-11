import { makeCall, TimeoutError } from '../fn';
import { ENDPOINTS } from '../config';

const MAX_ATTEMPTS = 2;

export async function getInit (token) {
    let attempt = 0;
    let lastError;

    while (attempt < MAX_ATTEMPTS) {
        try {
            const response = await makeCall({
                endpoint: ENDPOINTS.init,
                query:    token
            });

            const { api_settings: settings, currencies: availableCurrencies } = response;

            return {
                availableCurrencies,
                defaultDepartureID: settings.osDeptCity,
            };
        } catch (err) {
            lastError = err;

            if (!(err instanceof TimeoutError)) {
                throw err;
            }

            attempt++;
        }
    }

    throw lastError;
}

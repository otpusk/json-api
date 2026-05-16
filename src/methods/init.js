import { makeCall, TimeoutError } from '../fn';
import { ENDPOINTS } from '../config';

const MAX_ATTEMPTS = 3;

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

            attempt++;

            if (attempt < MAX_ATTEMPTS) {
                await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** (attempt - 1)));
            }
        }
    }

    throw lastError;
}

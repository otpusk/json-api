// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getToursDates (token, options) {
    const { dates : denormalizedDates = {} } = await makeCall(ENDPOINTS.dates, {
        ...token,
        ...options
    }, [7, 'days']);

    return Object.keys(denormalizedDates);
}

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getToursStartSearch (token, query = {}) {
    const response = await makeCall({
        endpoint: ENDPOINTS.startSearch,
        method:   'HEAD',
        query:    {
            ...query,
            ...token,
        },
    });

    return response;
}

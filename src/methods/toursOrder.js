// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getToursOrder (token, claim) {
    const response = await makeCall(ENDPOINTS.order, {
        widget: 'order',
        ...claim,
        ...token,
    });

    return response;
}

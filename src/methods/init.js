// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getInit (token) {
    const { gmapkey } = await makeCall({ endpoint: ENDPOINTS.init, token });

    return { apis: {
        googleMap: gmapkey || null
    }};
};
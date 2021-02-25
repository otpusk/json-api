// Core
import { normalize } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { regionSchema } from '../normalize/schemas';

export async function getToursRegions (token, options = { 'with': 'price' }) {

    const { regions: denormalizedRegions } = await makeCall({ endpoint: ENDPOINTS.regions,
        query: {
            ...token,
            ...options,
        },
        ttl: [7, 'days']});
    const { entities: { region: regions }} = normalize(denormalizedRegions, [regionSchema]);

    return regions;
}

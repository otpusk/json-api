// Core
import { normalize } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { fullOfferSchema } from '../normalize/schemas';

export async function getToursOffer (token, offerId, fresh) {
    const { offer: denormalizedOffer } = await makeCall({ endpoint: ENDPOINTS.offer,
        query: {
            offerId,
            ...token,
        },
        ttl: fresh ? null : [30, 'minutes']});

    const { entities: { offer: offers }, result } = normalize(denormalizedOffer, fullOfferSchema);

    return result ? offers[result] : null;
}

// Core
import { normalize } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { fullOfferSchema } from '../normalize/schemas';

export async function getToursOffer (token, offerId) {
    const { offer: denormalizedOffer } = await makeCall(ENDPOINTS.offer, {
        offerId,
        ...token,
    }, [30, 'minutes']);

    const { entities: { offer: offers }, result } = normalize(denormalizedOffer, fullOfferSchema);

    return result ? offers[result] : null;
}

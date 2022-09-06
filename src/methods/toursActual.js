// Core
import { normalize } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { offerSchema } from '../normalize/schemas';
import { ENDPOINTS } from '../config';

export async function getToursActual (token, offerId, people, currency = 'uah') {
    const { code, offer: denormalizedOffer, message } = await makeCall({ endpoint: ENDPOINTS.actual,
        query:    {
            ...token,
            offerId,
            people,
            currencyLocal: currency,
        }});

    const { entities: { offer: offers = null } = {}, result: id } = denormalizedOffer ? normalize(denormalizedOffer, offerSchema) : {};

    return {
        code,
        offer: id ? offers[id] : null,
        message,
    };
}

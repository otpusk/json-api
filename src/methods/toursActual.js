import { normalize } from 'normalizr';
import { mergeAll } from 'ramda';

import { makeCall } from '../fn';
import { offerSchema } from '../normalize/schemas';
import { ENDPOINTS } from '../config';

export async function getToursActual (token, offerId, people, currency = 'uah') {
    const { code, offer: denormalizedOffer, originalHotelName, message } = await makeCall({
        endpoint: ENDPOINTS.actual,
        timeout:  40000,
        query:    {
            ...token,
            offerId,
            people,
            currencyLocal: currency,
        }});

    const { entities: { offer: offers = null } = {}, result: id } = denormalizedOffer ? normalize(denormalizedOffer, offerSchema) : {};

    return {
        code,
        offer: id
            ? mergeAll([offers[id], { hotelNameByOperator: originalHotelName }])
            : null,
        message,
    };
}

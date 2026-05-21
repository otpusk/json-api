import { normalize } from 'normalizr';
import { mergeAll } from 'ramda';

import { makeCall } from '../fn';
import { offerSchema } from '../normalize/schemas';
import { ENDPOINTS } from '../config';


const buildChildrenQuery = (children) => children.reduce(
    (acc, child, index) => ({ ...acc, [`child${ index + 1 }`]: child }),
    {}
);

export async function getToursActual (token, offerId, people, currency = 'uah', withShortCode = false, childrenBirthdays = []) {

    const { code, offer: denormalizedOffer, originalHotelName, message } = await makeCall({
        endpoint: ENDPOINTS.actual,
        timeout:  40000,
        query:    {
            ...token,
            offerId,
            people,
            currencyLocal: currency,
            ...(withShortCode && { getShortOfferId: true }),
            ...(childrenBirthdays.length ? buildChildrenQuery(childrenBirthdays) : {}),
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

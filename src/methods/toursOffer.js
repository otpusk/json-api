import { normalize } from 'normalizr';
import { always, call, mergeAll, mergeLeft, pipe, when } from 'ramda';

import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { offerSchema } from '../normalize/schemas';

const addCurrency = (currencyLocal) => when(
    always(currencyLocal),
    mergeLeft({ currencyLocal })
);

const addLang = (lang) => when(
    always(lang),
    mergeLeft({ lang })
);

export async function getToursOffer (token, offerId, fresh, currency, lang) {
    const { offer: denormalizedOffer, originalHotelName } = await makeCall({
        endpoint: ENDPOINTS.offer,
        query:    call(
            pipe(
                mergeLeft(token),
                addCurrency(currency),
                addLang(lang)
            ),
            { offerId }
        ),
        ttl: fresh
            ? null
            : [30, 'minutes'],
    });

    const { entities: { offer: offers }, result } = normalize(denormalizedOffer, offerSchema);

    return result ? mergeAll([offers[result], { hotelNameByOperator: originalHotelName }]) : null;
}

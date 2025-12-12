import { normalize } from 'normalizr';
import {always, assoc, call, mergeAll, mergeLeft, pipe, when} from 'ramda';

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

const addShortCode = (withShortCode) => when(
    always(withShortCode),
    assoc('getShortOfferId', true)
);

export async function getToursOffer (token, offerId, fresh, currency, lang, withShortCode = false) {
    const { offer: denormalizedOffer, originalHotelName } = await makeCall({
        endpoint: ENDPOINTS.offer,
        query:    call(
            pipe(
                mergeLeft(token),
                addCurrency(currency),
                addLang(lang),
                addShortCode(withShortCode)
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

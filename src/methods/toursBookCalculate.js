import { mergeAll } from 'ramda';

import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getToursBookCalculate (tokenAsQuery, query, body) {
    const { currency_original, currency, price, price_original, rate } = await makeCall({
        endpoint: ENDPOINTS.bookCalculate,
        query:    mergeAll([tokenAsQuery, query]),
        method:   'POST',
        body,
    });


    return {
        price: {
            [currency]:          price,
            [currency_original]: price_original,
        },
        rate,
    };
}

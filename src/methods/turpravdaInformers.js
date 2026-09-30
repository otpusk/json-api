// Instruments
import * as R from 'ramda';

import { createQueryStringFromObject, makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getTurpravdaHotelInformer (hotelId, options = { count: 10 }) {
    const query = {
        htl:  hotelId,
        tp:   9,
        skin: 1,
        ...options,
    };
    const response = await fetch(`${ENDPOINTS.turpravdaInformers}?${createQueryStringFromObject(query)}`);
    const html = await response.text();

    return html;
}

export async function getTurpravdaHotelReviews (hotelId, lang) {
    const { reviews } = await makeCall({
        endpoint: ENDPOINTS.turpravdaInformers,
        query:    {
            htl:    hotelId,
            tp:     99,
            skin:   1,
            count:  999,
            length: 99999,
            lang,
        },
    });

    return R.map(R.evolve({ vote: Number }), reviews);
}

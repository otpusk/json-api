import { ascend, call, head, last, map, pipe, sort, split, toPairs } from 'ramda';

import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getToursDates (token, options) {
    const { dates : denormalizedDates = {}} = await makeCall({
        endpoint: ENDPOINTS.dates,
        query:    {
            ...token,
            ...options,
        },
        ttl: [2, 'hour'],
    });

    return map(
        ([date, rangeAsString]) => {
            const rangeAsSortedArray = call(
                pipe(
                    split(','),
                    map(Number),
                    sort(ascend((range) => range))
                ),
                rangeAsString
            );

            return {
                date,
                range: {
                    from: head(rangeAsSortedArray),
                    to:   last(rangeAsSortedArray),
                },
            };
        },
        toPairs(denormalizedDates)
    );
}

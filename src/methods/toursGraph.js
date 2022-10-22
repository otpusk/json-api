import moment from 'moment';
import { Range, List } from 'immutable';
import * as R from 'ramda';

import { makeCall } from '../fn';
import { API_VERSION, ENDPOINTS } from '../config';

const parsePrice = ({ c: currency, p: priceByCurrency, pu: uahPrice }) => ({
    [currency]: priceByCurrency,
    ...uahPrice ? { uah: uahPrice } : {},
});

export async function getToursGraph (token, options = {}, methodVersion) {

    const { graph: denormalizedDays } = await makeCall({
        endpoint: methodVersion
            ? R.replace(API_VERSION, methodVersion, ENDPOINTS.graph)
            : ENDPOINTS.graph,
        query: {
            ...token,
            ...options,
        },
    });

    const { checkIn: start, checkTo: end, currency = 'uah' } = options;
    const points = Range(0, moment(end).diff(moment(start), 'days') + 1);
    const daysWithPrice = List(denormalizedDays)
        .toMap()
        .mapKeys((key, { dt }) => moment(dt).format('X'));
    const peak = {};

    return points
        .toArray()
        .map((day) => moment(start).add(day, 'days').format('X'))
        .map((day) => {
            const dayObject = daysWithPrice.get(day) || {};
            const price = daysWithPrice.has(day)
                ? parsePrice(dayObject)
                : null;

            if (price && (!peak[currency] || peak[currency] < price[currency])) {
                Object.assign(peak, price);
            }

            return { day, price, transport: dayObject.t };
        })
        .map(({ day, price, transport }) => {
            const delta = price && peak
                ? Number((price[currency] / peak[currency] * 100).toFixed(2))
                : null;

            return { day, price, delta, transport };
        });
}

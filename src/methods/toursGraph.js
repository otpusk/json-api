// Core
import { normalize } from 'normalizr';
import moment from 'moment';
import { Range, List } from 'immutable';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { parsePrice } from '../normalize/parsers';

export async function getToursGraph (token, options = { }) {

    const { graph: denormalizedDays } = await makeCall(ENDPOINTS.graph, {
        ...token,
        ...options,
    });

    const { checkIn: start, checkTo: end } = options;
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
            const price = daysWithPrice.has(day) ? parsePrice(dayObject) : null;

            if (price && (!peak.uah || peak.uah < price.uah)) {
                Object.assign(peak, price);
            }

            return { day, price, transport: dayObject.t };
        })
        .map(({ day, price, transport }) => {
            const delta = price && peak
                ? Number((price.uah / peak.uah * 100).toFixed(2))
                : null;

            return { day, price, delta, transport };
        });
}

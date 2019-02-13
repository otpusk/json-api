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
    }, [7, 'days']);

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
            const price = daysWithPrice.has(day) ? parsePrice(daysWithPrice.get(day)) : null;

            if (price && (!peak.uah || peak.uah < price.uah)) {
                Object.assign(peak, price);
            }

            return { day, price };
        })
        .map(({ day, price }) => {
            const delta = price && peak
                ? Number((price.uah / peak.uah * 100).toFixed(2))
                : null;

            return { day, price, delta };
        });
}

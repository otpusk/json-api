// Core
import { normalize, schema } from 'normalizr';
import { Range } from 'immutable';
import moment from 'moment';

// Instruments
import { makeCall } from '../fn';
import { hotelSchema, countrySchema } from '../normalize/schemas';
import { parsePrice, parseSearchMeta } from '../normalize/parsers';
import { ENDPOINTS } from '../config';

function normalizePricesChart (denormalized) {
    const { ds: start, dt: end, d } = denormalized;
    const points = Range(0, moment(end).diff(moment(start), 'days') + 1);
    const peak = {};

    return points
        .toArray()
        .map((day) => moment(start).add(day, 'days').format('X'))
        .map((day) => {
            const price = day in d ? parsePrice(d[day]) : null;

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

export async function getToursSearch (token, query) {
    const {
        hotels: denormalizedHotels,
        pg: denormalizedChart = null,
        cnt: denormalizedCountry = null,
        ...other
    } = await makeCall(ENDPOINTS.search, { ...query, ...token });

    const { entities: { hotel: hotels, offer: offers }} = normalize(
        Object.values(denormalizedHotels || {}).reduce((all, h) => ({ ...all, ...h }), {}),
        new schema.Values(hotelSchema)
    );

    if (offers) {
        const exactChildrenAges = String(query.people)
            .slice(1)
            .split(/(\d{2})/)
            .map(Number)
            .filter(Boolean)
            .sort((a, b) => a - b);
        const injectUahCurrency = !query.currency;

        for (const id in offers) {
            offers[id].exactChildrenAges = exactChildrenAges.slice(0, offers[id].children);
            offers[id].currency = injectUahCurrency ? 'uah' : offers[id].currency;
        }
    }
    
    const { entities: { country: countries }, result: countryId } = normalize(denormalizedCountry || {}, countrySchema);
    const meta = parseSearchMeta(other, query);

    return {
        result:  hotels && offers ? { hotels, offers } : {},
        chart:   denormalizedChart ? normalizePricesChart(denormalizedChart) : null,
        country: countryId && denormalizedCountry ? countries[countryId] : null,
        meta,
        ...other,
    };
}
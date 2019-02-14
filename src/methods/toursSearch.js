// Core
import { normalize, schema } from 'normalizr';
import { Range } from 'immutable';
import moment from 'moment';

// Instruments
import { makeCall } from '../fn';
import { hotelSchema, countrySchema } from '../normalize/schemas';
import { parsePrice } from '../normalize/parsers';
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
        cnt: denormalizedCountry,
        ...other
    } = await makeCall(ENDPOINTS.search, { ...query, ...token });

    const { entities: { hotel: hotels, offer: offers }} = normalize(
        Object.values(denormalizedHotels || {}).reduce((all, h) => ({ ...all, ...h }), {}),
        new schema.Values(hotelSchema)
    );
    const { entities: { country: countries }, result: countryId } = normalize(denormalizedCountry, countrySchema);

    return {
        result:  hotels && offers ? { hotels, offers } : {},
        chart:   denormalizedChart ? normalizePricesChart(denormalizedChart) : null,
        country: denormalizedCountry && countryId ? countries[countryId] : null,
        ...other,
    };
}

// Core
import { compile } from 'path-to-regexp';
import moment from 'moment';
import { Map } from 'immutable';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

const transformDateToMoment = (string, format = 'DD.MM.YYYY') => {
    if (string) {
        const date = moment(string, format);

        return date.isValid() ? date : null;
    }

    return null;
};

const normalizeFlights = (flights) => Map(flights)
    .map(({ datebeg, dateend, name: flight, price }) => ({
        date: { 
            from: transformDateToMoment(datebeg, 'DD.MM.YYYY HH:mm'), 
            to: transformDateToMoment(dateend, 'DD.MM.YYYY HH:mm')
        },
        flight,
        price: parseInt(price)
    }))
    .toObject();

export async function getToursValidate (token, offerID, params = {}) {
    const { validate: createEndpoint } = ENDPOINTS;
    const query = { ...params, ...token };

    const {
        uah,
        eur,
        usd,
        currency,
        info: { hotels: [hotel], transports },
        message,
        status,
    } = await makeCall(createEndpoint(compile)({ offerID }), query, null, 60000);

    return {
        hotel: Map(hotel)
            .update('datebeg', transformDateToMoment)
            .update('dateend', transformDateToMoment)
            .update((value) => 
                value.set('date', { from: value.get('datebeg'), to: value.get('dateend') }))
            .remove('price')
            .remove('datebeg')
            .remove('dateend')
            .toObject(),
        status: { code: status, message },
        transports: Map(transports)
            .mapKeys((key) => {
                switch (key) {
                    case 'departure': return 'outbound';
                    case 'return': return 'inbound';
                    default: return key;
                }
            })
            .update('outbound', normalizeFlights)
            .update('inbound', normalizeFlights)
            .toObject(),
        offer: {
            currency,
            price: Map({ uah, eur, usd })
                .filter(Boolean)
                .toObject()
        }
    };
}

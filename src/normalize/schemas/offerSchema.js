
// Core
import { schema } from 'normalizr';

// Instruments
import {
    parsePrice,
    parseFlights,
    parseDiscountPrice
} from '../parsers';

export const offerSchema = new schema.Entity(
    'offer',
    {},
    {
        idAttribute:     ({ i }) => String(i),
        processStrategy: (input) => {
            const {
                i: id,
                d: date,
                l: length,
                a: adults,
                h: children,
                ha: childrenAge,
                f: food,
                c: departure,
                o: includes,
                oi: operator,
                r: roomName,
                ri: roomId,
                ti: tourId,
                y: roomType,
                s: promo,
                ss: stopsale,
                t: transport,
                to: flights,
                vid: code,
                u: currency = null,
            } = input;

            /* travel insurance for TPG */
            if (operator === 2700) {
                includes.push('travelinsurance');
            }

            console.log('input', input);

            const entity = {
                id:           String(id),
                code,
                date,
                days:         length,
                nights:       length - 1,
                adults:       Number(adults),
                children,
                childrenAge:  childrenAge ? childrenAge.replace(/^\((\d+-\d+)\).*/g, '$1').replace('0-', '1-') : '1-16',
                food,
                departure,
                includes,
                requirements: ['visa', 'insurance', 'transfer']
                    .filter((s) => !(includes.includes('notNeedVisa') && s === 'visa'))
                    .filter((s) => includes.indexOf(s) === -1),
                operator,
                room:    { id: roomId, name: roomName, type: roomType },
                price: parsePrice(input),
                currency,
                discountPrice: parseDiscountPrice(input),
                stopsale,
                transport,
                flights: parseFlights(flights || {}),
                promo,
                tourId,
            };

            return entity;
        },
    }
);

export const fullOfferSchema = new schema.Entity(
    'offer',
    {},
    {
        idAttribute:     ({ id }) => String(id),
        processStrategy: (input) => {
            const {
                id,
                checkIn: date,
                length,
                adult: adults,
                child: children,
                childAges: childrenAge,
                food,
                fromCity: departure,
                tourOptions: includes,
                operatorId: operator,
                room: roomName,
                roomId,
                type: roomType,
                tourStatus: promo,
                stopSale: stopsale,
                transport,
                transportOptions: flights,
                variantId: code,
                tourId,
                bron,
                currency = null,
            } = input;

            /* travel insurance for TPG */
            if (operator === 2700) {
                includes.push('travelinsurance');
            }

            console.log('input', input);

            const entity = {
                id:           String(id),
                code,
                date,
                days:         length,
                nights:       length - 1,
                adults:       Number(adults),
                children,
                childrenAge:  childrenAge ? childrenAge.replace(/^\((\d+-\d+)\).*/g, '$1').replace('0-', '1-') : '1-16',
                food,
                departure,
                includes,
                requirements: ['visa', 'insurance', 'transfer']
                    .filter((s) => !(includes.includes('notNeedVisa') && s === 'visa'))
                    .filter((s) => includes.indexOf(s) === -1),
                operator,
                room:    { id: roomId, name: roomName, type: roomType },
                price: parsePrice(input),
                currency,
                stopsale,
                transport,
                flights: parseFlights(flights || {}),
                promo,
                tourId,
                bookingUrl: bron,
            };

            return entity;
        },
    }
);

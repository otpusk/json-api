
// Core
import { schema } from 'normalizr';

// Instruments
import {
    parseFullOfferPrice,
    parseOfferPrice,
    parseFlights,
    parseDiscountPrice,
    parsePromo,
    parseChildrenAges,
    parsePeople
} from '../parsers';

export const offerSchema = new schema.Entity(
    'offer',
    {},
    {
        idAttribute:     ({ i }) => String(i),
        processStrategy: (input) => {
            const {
                i: id,
                hi: hotelId,
                d: date,
                dpl: oldPriceUah,
                dp: oldPriceCurrency,
                l: length,
                n: nights,
                nh: nightsInHotel,
                a: adults,
                ah: people,
                h: children,
                hr: childAgesArray,
                ha: childrenAge,
                f: food,
                fn: foodFullName,
                c: departure,
                o: includes,
                oi: operator,
                r: roomName,
                ri: roomId,
                ti: tourId,
                y: roomType,
                s: promoValue,
                ss: stopsale,
                t: transport,
                to: flights,
                vid: code,
                u: currency = null,
                ul: currencyLocal = null,
                ur: currencyRate,
                last: updateTime,
                pto: priceOperator
            } = input;

            /* travel insurance for TPG */
            if (operator === 2700) {
                includes.push('travelinsurance');
            }

            const promo = parsePromo(promoValue);

            const entity = {
                id:           String(id),
                code,
                date,
                days:         length,
                nights,
                nightsInHotel,
                adults:       Number(adults),
                children,
                childrenAge:  childrenAge ? childrenAge.replace(/^\((\d+-\d+)\).*/g, '$1').replace('0-', '1-') : '1-16',
                childrenAges: parseChildrenAges(childAgesArray),
                food,
                foodFullName,
                departure,
                includes,
                requirements: ['visa', 'insurance', 'transfer']
                    .filter((s) => !(includes.includes('notNeedVisa') && s === 'visa'))
                    .filter((s) => includes.indexOf(s) === -1),
                operator,
                room:     { id: roomId, name: roomName, type: roomType },
                price:    parseOfferPrice(input),
                oldPrice: oldPriceCurrency && oldPriceUah
                    ? { uah: oldPriceUah, [currency]: oldPriceCurrency }
                    : undefined,
                priceOperator: {
                    [currency]: priceOperator,
                },
                currency,
                currencyLocal,
                discountPrice:      parseDiscountPrice(input),
                stopsale,
                transport,
                flights:            parseFlights(flights || {}),
                tourId,
                hotelId,
                additionalPayments: [],
                currencyRate,
                updateTime,
                people:             parsePeople(people, childAgesArray),
                ...promo && promo,
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
                childAgesArray,
                oldPriceUah,
                oldPrice: oldPriceCurrency,
                food,
                foodName: foodFullName,
                fromCity: departure,
                tourOptions: includes,
                operatorId: operator,
                room: roomName,
                roomId,
                type: roomType,
                tourStatus: promoValue,
                stopSale: stopsale,
                transport,
                transportOptions: flights,
                variantId: code,
                tourId,
                bron,
                currency = null,
                currencyLocal,
                currencyRate: rateByNBU,
                currencyOperatorRate: rateByOperator,
                hotelId = null,
                additional = [],
                updateTime,
                people,
                duration: nightsInHotel,
                priceOperator,
            } = input;

            const currencyRate = rateByOperator || rateByNBU;

            /* travel insurance for TPG */
            if (operator === 2700) {
                includes.push('travelinsurance');
            }

            const promo = parsePromo(promoValue);

            const entity = {
                id:           String(id),
                code,
                date,
                days:         length,
                nights:       length - 1,
                nightsInHotel,
                adults:       Number(adults),
                children,
                childrenAge:  childrenAge ? childrenAge.replace(/^\((\d+-\d+)\).*/g, '$1').replace('0-', '1-') : '1-16',
                childrenAges: parseChildrenAges(childAgesArray),
                food,
                foodFullName,
                departure,
                includes,
                requirements: ['visa', 'insurance', 'transfer']
                    .filter((s) => !(includes.includes('notNeedVisa') && s === 'visa'))
                    .filter((s) => includes.indexOf(s) === -1),
                operator,
                room:     { id: roomId, name: roomName, type: roomType },
                price:    parseFullOfferPrice(input),
                priceOperator: {
                    [currency]: priceOperator,
                },
                oldPrice: oldPriceUah && oldPriceCurrency
                    ? { uah: oldPriceUah, [currency]: oldPriceCurrency }
                    : undefined,
                currency,
                currencyLocal,
                stopsale,
                transport,
                flights:            parseFlights(flights || {}),
                tourId,
                bookingUrl:         bron,
                hotelId,
                additionalPayments: additional,
                currencyRate,
                updateTime,
                people:             parsePeople(people, childAgesArray),
                ...promo && promo,
            };

            return entity;
        },
    }
);

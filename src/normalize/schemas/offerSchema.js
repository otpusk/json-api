
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
                dt: dateOut,
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
                tn: informationOfCrossTour,
                vid: code,
                u: currency = null,
                ul: currencyLocal = null,
                ur: currencyRate,
                last: updateTime,
                pto: priceOperator,
                os: subOperator = null,
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
                dateOut,
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
                priceByOperator: {
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
                isCrossTour:        includes.includes('crosstour'),
                informationOfCrossTour,
                ...promo && promo,
                subOperator,
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
                checkOut: dateOut,
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
                bron_url: bronURL = '',
                priceOperator,
                tour: informationOfCrossTour,
                subOperator = null,
            } = input;

            const currencyRate = rateByOperator || rateByNBU;
            const [hash] = bronURL.split('|');

            /* travel insurance for TPG */
            if (operator === 2700) {
                includes.push('travelinsurance');
            }

            const promo = parsePromo(promoValue);

            const entity = {
                id:           String(id),
                code,
                date,
                dateOut,
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
                room:            { id: roomId, name: roomName, type: roomType },
                price:           parseFullOfferPrice(input),
                priceByOperator: {
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
                hash,
                isCrossTour:        includes.includes('crosstour'),
                informationOfCrossTour,
                ...promo && promo,
                subOperator,
            };

            return entity;
        },
    }
);

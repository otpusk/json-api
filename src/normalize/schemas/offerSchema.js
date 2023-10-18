import { schema } from 'normalizr';

import { excludeRequirementTourOptions, normalizeRequiremenets } from '../normalizers';
import {
    parseFullOfferPrice,
    parseOfferPrice,
    parseFlights,
    parseDiscountPrice,
    parsePromo,
    parseChildrenAges,
    parsePeople,
    parseSubOperator
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
                o: tourOptions,
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
                os: subOperator,
                gds: isTransportGDS = false,
            } = input;

            /* travel insurance for TPG */
            if (operator === 2700) {
                tourOptions.push('travelinsurance');
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
                includes:     excludeRequirementTourOptions(tourOptions),
                requirements: normalizeRequiremenets(tourOptions),
                operator,
                room:         { id: roomId, name: roomName, type: roomType },
                price:        parseOfferPrice(input),
                oldPrice:     oldPriceCurrency && oldPriceUah
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
                isCrossTour:        tourOptions.includes('crosstour'),
                informationOfCrossTour,
                ...promo && promo,
                subOperator:        parseSubOperator(subOperator),
                isTransportGDS,
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
                tourOptions,
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
                subOperator,
                transportGDS: isTransportGDS = false,
            } = input;

            const currencyRate = rateByOperator || rateByNBU;
            const [hash] = bronURL.split('|');

            /* travel insurance for TPG */
            if (operator === 2700) {
                tourOptions.push('travelinsurance');
            }

            const promo = parsePromo(promoValue);

            const entity = {
                id:              String(id),
                code,
                date,
                days:            length,
                nights:          length - 1,
                nightsInHotel,
                adults:          Number(adults),
                children,
                childrenAge:     childrenAge ? childrenAge.replace(/^\((\d+-\d+)\).*/g, '$1').replace('0-', '1-') : '1-16',
                childrenAges:    parseChildrenAges(childAgesArray),
                food,
                foodFullName,
                departure,
                includes:        excludeRequirementTourOptions(tourOptions),
                requirements:    normalizeRequiremenets(tourOptions),
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
                isCrossTour:        tourOptions.includes('crosstour'),
                informationOfCrossTour,
                ...promo && promo,
                subOperator:        parseSubOperator(subOperator),
                isTransportGDS,
            };

            return entity;
        },
    }
);

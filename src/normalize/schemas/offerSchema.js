import { schema } from 'normalizr';

import { applyTimeZoneToDate, excludeRequirementTourOptions, normalizeRequiremenets } from '../normalizers';
import {
    parseOfferPrice,
    parseFlights,
    parseDiscountPrice,
    parsePromo,
    parseChildrenAges,
    parsePeople,
    parseSubOperator
} from '../parsers';

const applyTimeZoneToOfferUpdateTime = (updateTime) => applyTimeZoneToDate(
    updateTime,
    'YYYY-MM-DD HH:mm:ss'
);

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
                b: bookingUrl,
                bh: bronURL = '',
            } = input;

            /* travel insurance for TPG */
            if (operator === 2700) {
                tourOptions.push('travelinsurance');
            }

            const promo = parsePromo(promoValue);
            const [hash] = bronURL.split('|');

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
                updateTime:         applyTimeZoneToOfferUpdateTime(updateTime),
                people:             parsePeople(people, childAgesArray),
                isCrossTour:        tourOptions.includes('crosstour'),
                informationOfCrossTour,
                ...promo && promo,
                subOperator:        parseSubOperator(subOperator),
                isTransportGDS,
                bookingUrl,
                hash,
            };

            return entity;
        },
    }
);

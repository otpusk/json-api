// Instruments
import { findInArrayByProp, __ } from 'helpers/fn';
import { FOODS, CURRENCIES, TRANSPORTS, DEPARTURE_CITIES } from './static';

export const getFoodByCode = (code) => findInArrayByProp(FOODS, 'code', code);

export const getCurrencyByCode = (code) => findInArrayByProp(CURRENCIES, 'code', code);

export const getTransportByCode = (code) => findInArrayByProp(TRANSPORTS, 'code', code);

export const getDepartureCityById = (id) => findInArrayByProp(DEPARTURE_CITIES, 'id', id);

export const getImageUrl = (part, size = 'medium') => {
    const sizes = {
        small:  '2/240x160',
        medium: '2/320x240',
        large:  '3/730x0',
    };

    return `https://newimg.otpusk.com/${sizes[size]}/${part}`;
};

export const getPeopleCountableWord = (people) => {
    return [
        '',
        'за одного',
        'за двоих',
        'за троих',
        'за четверых',
        'за пятерых',
        'за шестерых',
        'за семерых'
    ][people];
};

export const explainPrice = (price) => {
    const { uah = null, usd = null, eur = null } = price || {};

    return {
        converted: {
            value:    uah,
            currency: getCurrencyByCode('uah'),
        },
        original: {
            value:    eur || usd,
            currency: getCurrencyByCode(eur ? 'eur' : 'usd'),
        },
    };
};

export const getHotelSchemaType = (hotel) => {
    return typeof hotel.info === 'object' ? 'full' : 'preview';
};

export const getFirstAvailableFlightsFromOffer = (offer) => {
    const { outbound: [outbound] = [], inbound: [inbound] = []} = offer.flights;

    return [outbound, inbound];
};

export const compileOSQueryString = (query) => {
    const dictionary = {
        to:        'i',
        departure: 'd',
        days:      'l',
        people:    'p',
        food:      'o',
        transport: 'r',
        dateFrom:  'c',
        dateTo:    'v',
        page:      'page',
    };

    return Object.entries(query)
        .map(([param, value]) => `${dictionary[param]}=${value}`)
        .join('&');
};

export const getPriceExtraFares = (hotel, offer) => {
    const traits = {
        isOperator (offer, operator) {
            return offer.operator === operator;
        },
        isCountry (hotel, country) {
            return Number(hotel.country.id) === Number(country);
        },
        isAnyOutboundFlightTimeBeforeHours (offer, hours) {
            const { outbound } = offer.flights;

            if (outbound) {
                return outbound.reduce((result, flight) => {
                    const begin = new Date(flight.begin);

                    return result || begin.getHours() <= hours;
                }, false);
            }

            return false;
        },
        isAnyReturnFlightTimeAfterHours (offer, hours) {
            const { inbound } = offer.flights;

            if (inbound) {
                return inbound.reduce((result, flight) => {
                    const begin = new Date(flight.begin);

                    return result || begin.getHours() >= hours;
                }, false);
            }

            return false;
        },
        isFlightsByRequest ({ stopsale }) {
            return stopsale.avia === 0 || stopsale.aviaBack === 0;
        },
    };


    const rules = [
        {
            name:       'extra-fee',
            text:       __('Возможна доплата за вечерний обратный рейс $20 за каждого туриста.'),
            conditions: [
                traits.isCountry(hotel, 115),
                traits.isOperator(offer, 717),
                traits.isAnyReturnFlightTimeAfterHours(offer, 17)
            ],
        },
        {
            name:       'request-flight',
            text:       __('Наличие мест на рейсе и окончательную стоимость тура запрашивайте у турагента.'),
            conditions: [
                traits.isFlightsByRequest(offer)
            ],
        },
        {
            name:       'travel-insurance',
            text:       'страховка от невыезда',
            conditions: [
                traits.isOperator(offer, 2700)
            ],
        }
    ];

    return rules.filter(({ conditions }) => conditions.every((value) => value === true));
};

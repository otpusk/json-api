// Instruments
import { FOODS, CURRENCIES, TRANSPORTS, DEPARTURE_CITIES, OPERATORS } from './static';

/**
 * Get noun for numeral
 *
 * @param {number} number number
 * @param {Array} titles nouns
 * @param {boolean} withNumber concat with number
 *
 * @returns {string} noun
 */
export function getNounForNumeral (number, titles, withNumber) {
    const cases = [2, 0, 1, 1, 1, 2];

    return (withNumber? `${number} `:'') + titles[number%100>4 && number%100<20? 2 : cases[number%10<5?number%10:5]];
}

/**
 * Translate string
 *
 * @param {string} string literal
 *
 * @returns {string} tranlation
 */
export function __ (string) {
    return string;
}

/**
 * Find array element by prop value
 * @param {*} array array
 * @param {*} prop prop
 * @param {*} value value
 *
 * @returns {*} value
 */
export function findInArrayByProp (array, prop, value) {
    const index = array.findIndex(({ [prop]: p }) => p === value);

    return index !== -1 ? array[index] : null;
}


export function convertObjectToUrlFormData (object) {
    return Object.entries(object).reduce(
        (params, [field, value]) => {
            (value || typeof value === 'string') && params.push(`${field}=${encodeURIComponent(value)}`);

            return params;
        }, []
    ).join('&');
}

export const getFoodByCode = (code) => findInArrayByProp(FOODS, 'code', code);

export const getCurrencyByCode = (code) => findInArrayByProp(CURRENCIES, 'code', code);

export const getTransportByCode = (code) => findInArrayByProp(TRANSPORTS, 'code', code);

export const getDepartureCityById = (id) => findInArrayByProp(DEPARTURE_CITIES, 'id', id);

export const getOperatorById = (id) => findInArrayByProp(OPERATORS, 'id', id);

export const getImageUrl = (part, size = 'medium', watermark = null) => {
    const watermarkPart = watermark ? `_${watermark}` : '';
    const sizes = {
        verySmall: `2${watermarkPart}/160x120`,
        small:     `2${watermarkPart}/240x160`,
        medium:    `2${watermarkPart}/320x240`,
        large:     `3${watermarkPart}/800x600`,
        veryLarge: `3${watermarkPart}/1200x900`,
    };

    return `https://newimg.otpusk.com/${sizes[size]}/${part}`;
};

export const getOperatorLogoById = (id) => `https://export.otpusk.com/images/onsite/logo/logo-${id}.png`;

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
            value:    Number(uah).toLocaleString('ru', { style: 'decimal', maximumFractionDigits: 0 }),
            currency: getCurrencyByCode('uah'),
        },
        original: eur || usd ? {
            value:    Number(eur || usd).toLocaleString('ru', { style: 'decimal', maximumFractionDigits: 0 }),
            currency: getCurrencyByCode(eur ? 'eur' : 'usd'),
        } : null,
    };
};

export const getHotelSchemaType = (hotel) => {
    return typeof hotel.info === 'object' ? 'full' : 'preview';
};

export const getFirstAvailableFlightsFromOffer = (offer) => {
    const { outbound: [outbound] = [], inbound: [inbound] = []} = offer.flights;

    return [outbound, inbound]
        // to prevent undefined flights
        .filter((flight) => Boolean(flight));
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

export const parseOSQueryString = (hash) => {
    return hash
        .replace(/^#/, '')
        .split('&')
        .reduce(
            (query, keyvalue) => {
                const [key, value] = keyvalue.split('=');

                return value ? Object.assign(query, { [key]: value }) : query;
            },
            {}
        );
};

/**
 * Create otpusk click ad url
 *
 * @param {String} regionId region id
 * @param {Object} agency advertisement
 * @param {Object} hotel hotel
 * @param {Object} offer offer
 * @param {Object} tourists tourists
 *
 * @return {string} url
 */
export const createOtpuskClickUrl = (regionId, agency, hotel, offer, tourists) => {
    const currency = 'usd' in offer.price ? 'usd' : 'eur';
    const query = {
        a:  offer.room.name,
        c:  hotel.country.name,
        ci: hotel.country.id,
        d:  offer.room.type,
        f:  `${hotel.stars}*`,
        g:  offer.departure,
        gi: offer.departure,
        l:  offer.days,
        n:  hotel.name,
        ni: hotel.id,
        oi: offer.operator,
        p:  offer.food,
        pv: offer.price[currency],
        q:  offer.date,
        r:  tourists,
        ti: hotel.city.id,
        w:  currency,
        y:  offer.transport,
    };

    const params = {
        c:  hotel.country.id,
        d:  JSON.stringify(query),
        i:  agency.adGroupId,
        n:  agency.clickId,
        o:  offer.operator,
        r:  regionId,
        t:  offer.id,
        tr: offer.tourId,
    };

    return `/api/go/${hotel.id}_${agency.adId}?${convertObjectToUrlFormData(params)}`;
};

export const getNounForCommonNumerals = (number, noun) => {
    let nouns = [];

    switch (noun) {
        case 'день':
            nouns = [__('день'), __('дня'), __('дней')];
            break;
        case 'ночь':
            nouns = [__('ночь'), __('ночи'), __('ночей')];
            break;
        case 'год':
            nouns = [__('год'), __('года'), __('лет')];
            break;
        case 'отзыв':
            nouns = [__('отзыв'), __('отзыва'), __('отзывов')];
            break;
        case 'взрослый':
            nouns = [__('взрослый'), __('взрослых'), __('взрослых')];
            break;
        case 'ребенок':
            nouns = [__('ребенок'), __('детей'), __('детей')];
            break;
        default:
            nouns = [__(noun), __(noun), __(noun)];
    }

    return getNounForNumeral(number, nouns);
};

export const getPriceExtraFares = (hotel, offer) => {
    const traits = {
        isOperator (offer, operator) {
            return offer.operator === operator;
        },
        isCountry (hotel, country) {
            return Number(hotel.country.id) === Number(country);
        },
        isCity (hotel, city) {
            return Number(hotel.city.id) === Number(city);
        },
        isFirstOutboundFlightTimeBeforeHours ({ flights }, hours) {
            const { outbound: [flight] = []} = flights;

            if (flight) {
                const begin = new Date(flight.begin);

                return begin.getHours() <= hours;
            }

            return false;
        },
        isFirstReturnFlightTimeAfterHours ({ flights }, hours) {
            const { inbound: [flight] = []} = flights;

            if (flight) {
                const begin = new Date(flight.begin);

                return begin.getHours() >= hours;
            }

            return false;
        },
        isFlightsByRequest ({ stopsale }) {
            return stopsale.avia === 0 || stopsale.aviaBack === 0;
        },
        isOutboundAeroport ({ flights }, aeroportCode) {
            const { outbound: [flight] } = flights;

            if (flight) {
                return flight.portTo.includes(aeroportCode);
            }

            return false;
        },
        isInboundAeroport ({ flights }, aeroportCode) {
            const { inbound: [flight] } = flights;

            if (flight) {
                return flight.portFr.includes(aeroportCode);
            }

            return false;
        },
    };


    const rules = [
        {
            name:       'extra-fee',
            text:       __('Возможна доплата за вечерний обратный рейс $25 за каждого туриста.'),
            conditions: [
                traits.isCountry(hotel, 43),
                traits.isOperator(offer, 717),
                traits.isFirstReturnFlightTimeAfterHours(offer, 12)
            ],
        },
        {
            name:       'extra-fee',
            text:       __('Возможна доплата за утренний рейс туда $25 за каждого туриста.'),
            conditions: [
                traits.isCountry(hotel, 43),
                traits.isOperator(offer, 717),
                traits.isFirstOutboundFlightTimeBeforeHours(offer, 12)
            ],
        },
        {
            name:       'extra-fee',
            text:       __('Возможна доплата за утренний рейс туда 25 евро за каждого туриста.'),
            conditions: [
                traits.isOutboundAeroport(offer, 'AYT'),
                traits.isCountry(hotel, 115),
                traits.isOperator(offer, 717),
                traits.isFirstOutboundFlightTimeBeforeHours(offer, 12)
            ],
        },
        {
            name:       'extra-fee',
            text:       __('Возможна доплата за вечерний обратный рейс 25 евро за каждого туриста.'),
            conditions: [
                traits.isInboundAeroport(offer, 'AYT'),
                traits.isCountry(hotel, 115),
                traits.isOperator(offer, 717),
                traits.isFirstReturnFlightTimeAfterHours(offer, 12)
            ],
        },
        {
            name:       'request-flight',
            text:       __('Наличие мест на рейсе и окончательную стоимость тура запрашивайте у турагента.'),
            conditions: [
                traits.isFlightsByRequest(offer)
            ],
        }
    ];
    const additionalPayments = offer.additionalPayments.map((text) => ({
        name: 'additional',
        text,
    }));
    const calculatedPayments = rules.filter(({ conditions }) => conditions.every((value) => value === true));


    return additionalPayments;
};

// Core
import { Map, List, mergeWith, get } from 'immutable';

//Instruments
import { mergeDefinedObjectValues } from '../fn';


export const parsePrice = (input) => {
    const {
        uah, p, pl, priceUah,
        price, po, minPrice,
        currency, pu, u, c, ur: rateByNBU, uto: rateByOperator
    } = input;

    const currencyRate = rateByOperator || rateByNBU;
    const convertPriceWithoutDiscount = po ? po * currencyRate : pl;
    const original = po || p || price || minPrice || null;
    const converted = convertPriceWithoutDiscount || uah || typeof c !== 'object' && pu || p || priceUah || null;
    const originalCurrency = u || typeof c !== 'object' && c || pu || currency || null;

    const entity = {};
    const prepareNumber = (value) => Number(String(value).replace(/[^0-9\.\,]/gi, ''));

    if (original) {
        entity[originalCurrency] = prepareNumber(original);
    }
    if (converted) {
        entity.uah = prepareNumber(converted);
    }

    return entity;
};

export const parseOfferPrice = (input) => {
    const { p, pl, u } = input;

    return { uah: pl, [u]: p };
};

export const parseDiscountPrice = (input) => {
    const { po, pl, p, u, c, pu, currency } = input;
    const originalCurrency = u || typeof c !== 'object' && c || pu || currency || null;

    if (!po) {
        return null;
    }

    return {
        [originalCurrency]: p,
        uah:                pl,
    };
};

const createPriceEntity = {
    byOperator: ({ pl, plo, u, uo }) => ({
        uah: plo || pl,
        [u]: (plo || pl) / uo
    }),
    byNBU: ({ pl, plo, u, ur }) => ({
        uah: plo || pl,
        [u]: (plo || pl) / ur
    })
};

const createDiscountPriceEntity = {
    byOperator: ({ plo, pl, u, uo }) => plo ? ({
        uah: pl, [u]: pl / uo
    }) : null,
    byNBU: ({ plo, pl, u, ur }) => plo ? ({
        uah: pl, [u]: pl / ur
    }) : null
};

export const getPriceEntity = (offer) => ({
    '@price': createPriceEntity.byOperator(offer),
    '@priceNBU': createPriceEntity.byNBU(offer),
    '@discountPrice': createDiscountPriceEntity.byOperator(offer),
    '@discountPriceNBU': createDiscountPriceEntity.byNBU(offer)
});

const createOfferPriceEntity = {
    byOperator: ({ currency, currencyOperatorRate, priceUahOriginal, priceUah }) => ({
        uah: priceUahOriginal || priceUah,
        [currency]: (priceUahOriginal || priceUah) / currencyOperatorRate
    }),
    byNBU: ({ currency, currencyRate, priceUahOriginal, priceUah }) => ({
        uah: priceUahOriginal || priceUah,
        [currency]: (priceUahOriginal || priceUah) / currencyRate
    })
};

const createOfferDiscountPriceEntity = {
    byOperator: ({ currency, currencyOperatorRate, priceUahOriginal, priceUah }) => priceUahOriginal ? ({
        uah: priceUah, [currency]: priceUah / currencyOperatorRate
    }) : null,
    byNBU: ({ currency, currencyRate, priceUahOriginal, priceUah }) => priceUahOriginal ? ({
        uah: priceUah, [currency]: priceUah / currencyRate
    }) : null
};

export const getOfferPriceEntity = (offer) => ({
    '@price': createOfferPriceEntity.byOperator(offer),
    '@priceNBU': createOfferPriceEntity.byNBU(offer),
    '@discountPrice': createOfferDiscountPriceEntity.byOperator(offer),
    '@discountPriceNBU': createOfferDiscountPriceEntity.byNBU(offer)
})

const parseSeats = (seats) => {
    switch (seats) {
        case !isNaN(Number(seats)): return seats;
        case 'yes': return 'Есть';
        case 'many': return 'Много';
        case 'few': return 'Мало';
        case 'request': return 'По запросу';
        case 'no': return 'Нет мест';
        default: return null;
    }
}

export const parseFlights = (input) => {
    const { from: outbound = [], to: inbound = []} = input;

    return Map({ outbound, inbound })
        .map((flights) => Array.isArray(flights) ? flights : Object.values(flights))
        .map((flights) => List(flights)
            .map((flight) => Map(flight).update('seats', (seats) =>
                ({ label: parseSeats(seats), value: seats })))
            .filter(({ seats }) => seats !== null)
            .sort(({ additional: a }, { additional: b }) => {
                const [indexA, indexB] = [a, b].map((value) => value ? 1 : 0);

                return indexA - indexB;
            })
        )
        .toJS();
};

export const parseLocation = (input) => {
    const { lat, a, lng, long, o, zoom, z } = input;
    const latitude = parseFloat(a || lat);
    const longitude = parseFloat(o || lng || long);

    if (!(latitude && longitude)) {
        return null;
    }

    return {
        lat:  latitude,
        lng:  longitude,
        zoom: parseInt(zoom || z, 10),
    };
};

export const parseNames = (input, prefix) => {
    const cases = Map({ long: 'name', nm: 'value', vm: 'namevn', rd: 'namerd', pr: 'namepr' });
    const props = Map(input).mapKeys((k) => k.toLowerCase());

    return cases.map((prop) => {
        return props.get(
            `${prefix}${prop}`,
            props.get(
                prop,
                props.get(prop.replace('name', ''), '')
            )
        );
    })
        .filter((value) => Boolean(value))
        .toJS();
};

export const parseHotelGeo = (input) => {
    const { i: id, n: name, c: code } = input;
    const geo = { id, name, code, names: parseNames(input) };
    const optional = {
        isoCode: input.cd || input.cid,
    };

    return mergeDefinedObjectValues(geo, optional);
};

export const parseCountry = (input) => {
    const { countryId: id, countryName: name } = input;

    return { id: Number(id), name, names: parseNames(input, 'country') };
};

export const parseCity = (input) => {
    const { cityId: id, cityName, resortName, cityCode: code = null } = input;

    return {
        id: Number(id) || null, name: cityName || resortName, code, names: parseNames(input, 'city'),
    };
};

export const parseStars = (input) => {
    switch (input.toLowerCase()) {
        case 'hv1':
            return 'HV1';
        case 'hv2':
            return 'HV2';
        default:
            return parseInt(String(input).replace(/\D/, ''), 10);
    }
};

/**
 *
 * @param {object} input
 */
export const parseSearchMeta = (input, query) => {
    const {
        searchOperators = {},
        originalOperators = {},
        operators = {},
        stars = {},
        originalStars = {},
    } = input;

    const currency = 'currency' in query ? query.currency : 'original';
    const pricesMerger = (converted, original) => ({
        uah:        converted,
        [currency]: original,
    });

    const categoriesPrices = mergeWith(pricesMerger, stars, originalStars);
    const operatorsPrices = mergeWith(pricesMerger, operators, originalOperators);

    return {
        prices: {
            operators:  operatorsPrices,
            categories: categoriesPrices,
        },
        links: {
            operators: searchOperators,
        },
    };
};

export const parseHotelVideos = (raw) => {
    return raw && Array.isArray(raw)
        ? raw.map(({ thumbnail, videoId: id, code }) => {
            const getProvider = (iframe) => {
                if (iframe.match(new RegExp('(youtu.|youtube.)'))) {
                    return 'youtube';
                }

                if (iframe.includes('vimeo.')) {
                    return 'vimeo';
                }

                return null;
            };


            return {
                id,
                provider: getProvider(code),
                thumbnail,
            };
        })
        : [];
};

export const parseBadges = (raw) => {
    return Object.entries(raw)
        .filter(([, badge]) => Boolean(badge))
        .map(([area, badge]) => ({ area, ...badge }));
};

export const parsePromo = (promo) => {
    if (promo) {
        const isHeightPromo = promo.startsWith('!');

        return {
            promo: !isHeightPromo ? promo.trim() : null,
            heightPromo: isHeightPromo ? promo.slice(1) : null
        };
    }

    return { promo, heightPromo: null };
}

export const parseChildrenAges = (ages = []) => ages.map((age) => Math.max(...age));

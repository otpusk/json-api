import { Map, mergeWith } from 'immutable';
import {
    always,
    call,
    fromPairs,
    ifElse,
    lensProp,
    over,
    map,
    pipe,
    toPairs,
    when,
    isEmpty,
    applySpec,
    prop
} from 'ramda';

import { mergeDefinedObjectValues } from '../fn';

export const parsePrice = (input) => {
    const {
        uah, p, pl, priceUah,
        price, po, minPrice,
        currency, pu, u, c, ur: rateByNBU, uto: rateByOperator,
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
    const { p: price, pl: priceLocal, u: currency, ul: currencyLocal } = input;

    return { [currencyLocal]: priceLocal, [currency]: price };
};

export const parseFullOfferPrice = (offer) => ({
    [offer.currency]:      offer.price,
    [offer.currencyLocal]: offer.priceLocal,
});

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
};

const parsePortDetails = (details) => ({
    city: {
        id:   details.cityId,
        name: details.cityName,
    },
    country: {
        id:   details.countryId,
        name: details.countryName,
    },
    name:     details.name,
    timezone: details.timezone,
});

export const parseFlights = (input) => {
    const { from: outbound = [], to: inbound = []} = input;

    return call(
        pipe(
            toPairs,
            map(([type, flights]) => [
                type,
                map(
                    pipe(
                        over(
                            lensProp('seats'),
                            (seats) => ({ label: parseSeats(seats), value: seats })
                        ),
                        over(
                            lensProp('portFrDetails'),
                            ifElse(Boolean, parsePortDetails, always(null))
                        ),
                        over(
                            lensProp('portToDetails'),
                            ifElse(Boolean, parsePortDetails, always(null))
                        )
                    ),
                    flights
                )
            ]),
            fromPairs

        ),
        { outbound, inbound }
    );
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

export const parseSecondaryStars = (stars, secondaryStars) => {
    const parsedSecondaryStars = secondaryStars
        ? parseStars(secondaryStars)
        : undefined;

    if (parsedSecondaryStars) {
        return parseStars(stars) !== parsedSecondaryStars
            ? parsedSecondaryStars
            : undefined;
    }

    return undefined;
};

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
            promo:       !isHeightPromo ? promo.trim() : null,
            heightPromo: isHeightPromo ? promo.slice(1) : null,
        };
    }

    return { promo, heightPromo: null };
};

export const parseChildrenAges = (ages = []) => ages.map((age) => Math.max(...age));

const convertStringifyChildren2Array = (children, result = []) => children
    ? convertStringifyChildren2Array(
        children.slice(2),
        [...result, children.slice(0, 2)]
    )
    : result;

export const parsePeople = (people, childAgesArray = []) => ({
    adults:   Number(people.toString()[0]),
    children: convertStringifyChildren2Array(
        people
            .toString()
            .slice(1)
    )
        .map((age) => age.startsWith('0') ? age.slice(1) : age)
        .map(Number),
    childrenAgesRange: childAgesArray.map((range) => ({ from: range[0], to: range[1] })),
});

export const parseSubOperator = (subOperator) => call(
    when(
        (data) => !data || isEmpty(data),
        () => ({ code: null, name: null })
    ),
    subOperator
);

export const createBookingInfoEntity = (bookingInfo, bookingQuota) => {
    if (!bookingInfo && !bookingQuota) {
        return null;
    }

    return {
        ...bookingInfo ? {
            endDateOfBooking: bookingInfo.date,
            allow:            Boolean(bookingInfo.possible),
        } : {},
        ...bookingQuota ? {
            endDateOfBookingQuota: bookingQuota.date,
            allowQuota:            Boolean(bookingQuota.possible),
        } : {},
    };
};

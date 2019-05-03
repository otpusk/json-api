// Core
import { Map } from 'immutable';


export const parsePrice = (input) => {
    const {
        uah, p, pl, priceUah,
        price, po, minPrice,
        currency, pu, u, c,
    } = input;

    const original = po || p || price || minPrice || null;
    const converted = pl || uah || typeof c !== 'object' && pu || p || priceUah || null;
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

export const parseFlights = (input) => {
    const { from: outbound = [], to: inbound = [] } = input;

    return Map({ outbound, inbound })
        .map((flights) => Array.isArray(flights) ? flights : Object.values(flights))
        .map((flights) => flights.filter(({ place = 0 }) => place > 0))
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
        lat: latitude,
        lng: longitude,
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

    return { id, name, code, names: parseNames(input) };
};

export const parseCountry = (input) => {
    const { countryId: id, countryName: name } = input;

    return { id: Number(id), name, names: parseNames(input, 'country') };
};

export const parseCity = (input) => {
    const { cityId: id, cityName, resortName, cityCode: code = null } = input;

    return {
        id: Number(id) || null, name: cityName || resortName, code, names: parseNames(input, 'city')
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
}
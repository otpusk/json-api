// Core
import { Map } from 'immutable';


export const parsePrice =  (input) => {
    const {
        uah, p, pl, priceUah,
        price, po, minPrice,
        currency, pu, u, c,
    } = input;

    const original = po || p || price || minPrice || null;
    const converted = pl || uah || typeof c !== 'object' && pu || p || priceUah || null;
    const originalCurrency =  u || typeof c !== 'object' && c || pu || currency || null;

    const entity = {};

    if (original) {
        entity[originalCurrency] = Number(original);
    }
    if (converted) {
        entity.uah = Number(converted);
    }

    return entity;
};

export const parseFlights = (input) => {
    const { from: outbound = [], to: inbound = []} = input;

    return {
        outbound: Array.isArray(outbound) ? outbound : Object.values(outbound),
        inbound:  Array.isArray(inbound) ? inbound : Object.values(inbound),
    };
};

export const parseLocation =  (input) => {
    const { lat, a, lng, o, zoom, z } = input;
    const latitude = a ? a : lat;
    const longitude = o ? o : lng;

    if (!(latitude && longitude)) {
        return null;
    }

    return {
        lat:  parseFloat(latitude),
        lng:  parseFloat(longitude),
        zoom: parseInt(zoom || z, 10),
    };
};

export const parseNames =  (input, prefix) => {
    const cases = Map({ long: 'name', nm: 'value', vm: 'namevn', rd: 'namerd', pr: 'namepr' });
    const props = Map(input).mapKeys((k) => k.toLowerCase());

    return cases.map((prop) => {
        return props.get(`${prefix}${prop}`, props.get(prop, ''));
    }).toJS();
};

export const parseHotelGeo = (input) => {
    const { i: id, n: name, c: code } = input;

    return { id, name, code };
};

export const parseCountry = (input) => {
    const { countryId: id, countryName: name } = input;

    return { id: Number(id), name, names: parseNames(input, 'country') };
};

export const parseCity = (input) => {
    const { cityId: id, cityName: name, cityCode: code } = input;

    return { id: Number(id), name, code, names: parseNames(input, 'city') };
};

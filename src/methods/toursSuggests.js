// Core
import { normalize } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { geoSchema } from '../normalize/schemas';
import { ENDPOINTS } from '../config';

const getIndexFromResult = (id, result) => result.findIndex(({ id: own }) => id === own);

export async function getToursSuggests (token, query, options = { 'with': 'price' }) {

    const { response: denormalizedLocations } = await makeCall({ endpoint: ENDPOINTS.suggests,
        query:    {
            text: query,
            ...token,
            ...options,
        },
        ttl: [1, 'hour']});

    const { result, entities: locations } = normalize(denormalizedLocations, [geoSchema]);

    const resultLocations = Object.fromEntries(
        Object.entries(locations).map(([key, group]) => [
            key,
            Object.values(group).sort(({ id: a }, { id: b }) => getIndexFromResult(a, result) - getIndexFromResult(b, result))
        ])
    );

    return resultLocations;
}

export async function getToursGeoById (token, id, options = { 'with': 'price' }) {
    const { response: denormalizedLocations } = await makeCall({ endpoint: ENDPOINTS.suggests,
        query:    {
            text: id,
            ...token,
            ...options,
        },
        ttl: [1, 'hour']});

    const { result: [{ id: locationId, schema: type }], entities: locations } = normalize(denormalizedLocations, [geoSchema]);

    return locationId ? locations[type][locationId] : null;
}

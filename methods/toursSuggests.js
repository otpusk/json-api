// Core
import { normalize } from 'normalizr';
import { Map } from 'immutable';

// Instruments
import { makeCall } from '../fn';
import { geoSchema } from '../normalize/schemas';
import { ENDPOINTS } from '../config';

export async function getToursSuggests (token, query, options = { 'with': 'price' }) {

    const { response: denormalizedLocations } = await makeCall(ENDPOINTS.suggests, {
        text: query,
        ...token,
        ...options,
    }, [1, 'hour']);

    const { entities: locations } = normalize(denormalizedLocations, [geoSchema]);

    return Map(locations).map(
        (group) => Object.values(group)
    ).toJS();
}

export async function getToursGeoById (token, id, options = { 'with': 'price' }) {
    const { response: denormalizedLocations } = await makeCall(ENDPOINTS.suggests, {
        text: id,
        ...token,
        ...options,
    }, [1, 'hour']);

    const { result: [{ id: locationId, schema: type }], entities: locations } = normalize(denormalizedLocations, [geoSchema]);

    return locationId ? locations[type][locationId] : null;
}

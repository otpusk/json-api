import {
    map,
    pipe,
    over,
    mergeAll,
    lensProp,
    when,
    unless,
    isNil
} from 'ramda';

import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

function normalizeGeoTree (geoTree) {
    return map(
        pipe(
            ({ parent_id: parentID, id, ...leaf }) => mergeAll([leaf, {
                id:       unless(isNil, String, id),
                parentID: unless(isNil, String, parentID),
            }]),
            over(
                lensProp('children'),
                when(Boolean, normalizeGeoTree)
            )
        ),
        geoTree
    );
}

export async function getToursGeoTree (options) {
    const { geo } = await makeCall({ endpoint: ENDPOINTS.geoTree, query: options, ttl: [1, 'days']});

    return normalizeGeoTree(geo);
}

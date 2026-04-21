import {
    map,
    pipe,
    over,
    mergeAll,
    lensProp,
    when
} from 'ramda';

import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

function normalizeGeoTree (geoTree) {
    return map(
        pipe(
            ({ parent_id: parentID, ...leaf }) => mergeAll([ leaf, { parentID } ]),
            over(
                lensProp('children'),
                when(Boolean, normalizeGeoTree)
            )
        ),
        geoTree
    );
}

export async function getToursGeoTree (token, options = {}) {
    const query = {
        ...token,
        ...options,
    };

    const { geo } = await makeCall({ endpoint: ENDPOINTS.geoTree, query, ttl: [ 1, 'days' ] });

    return normalizeGeoTree(geo);
}

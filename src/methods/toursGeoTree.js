// Instruments
import * as R from 'ramda';

import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

function normalizeGeoTree (geoTree) {
    return R.map(
        R.pipe(
            ({ parent_id: parentID, ...leaf }) => R.mergeAll([ leaf, { parentID } ]),
            R.over(
                R.lensProp('children'),
                R.when(Boolean, normalizeGeoTree)
            )
        ),
        geoTree
    );
}

export async function getToursGeoTree (token, { countryId, withPrice = false } = {}) {
    const query = {
        ...token,
        depth: 'city',
        id:    countryId,
        ...(withPrice ? { with: 'price' } : {}),
    };

    const { geo } = await makeCall({ endpoint: ENDPOINTS.geoTree, query, ttl: [ 1, 'days' ] });

    return normalizeGeoTree(geo);
}

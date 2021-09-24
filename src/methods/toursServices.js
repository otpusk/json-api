import * as R from 'ramda';

import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

const renameGroupKeys = (group) => R.call(
    R.pipe(
        R.toPairs,
        R.map(([key, services]) => [
            R.replace('Service', '', key),
            services
        ]),
        R.fromPairs
    ),
    group
);

export async function getToursServices (token, country = null, lang = 'ru') {
    const response = await makeCall({
        endpoint: ENDPOINTS.services,
        query:    {
            ...token, countryId: country, lang,
        },
        ttl: [7, 'days'],
    });

    return R.call(
        R.pipe(
            R.omit(['api_version', 'time', 'checked', 'result']),
            ({ icons, tabs, ...rest }) => R.mergeAll([
                rest,
                { country: { icons, tabs }}
            ]),
            R.toPairs,
            R.map(([rootServiceKey, group]) => [
                rootServiceKey,
                renameGroupKeys(group)
            ]),
            R.fromPairs
        ),
        response
    );
}

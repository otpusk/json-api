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

const mapCountriesByIDs = (countryService) => R.reduce(
    (acc, byCountriesMap) => R.mergeAll([
        acc,
        byCountriesMap
    ]),
    {},
    countryService
);

export async function getToursServices (token, country = null, lang = 'ru') {
    const { search: { countryService, ...searchGroup }, icons = [], tabs = [], nameServices = {}} = await makeCall({
        endpoint: ENDPOINTS.services,
        query:    {
            ...token, countryId: country, lang,
        },
        ttl: [7, 'days'],
    });

    return R.mergeAll([
        {
            icons,
            tabs,
        },
        { rootGroups: renameGroupKeys(nameServices) },
        renameGroupKeys(searchGroup),
        {
            country: Number(country) && countryService
                ? countryService
                : [],
            byCountries: !Number(country) && countryService
                ? mapCountriesByIDs(countryService)
                : {},
        }
    ]);
}

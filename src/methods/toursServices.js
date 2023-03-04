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

const objectToArray = (object) => R.call(
    R.pipe(
        R.toPairs,
        R.map(([key, value]) => ({ [key]: value }))
    ),
    object
);

const extractServicesFromResponse = (response) => R.call(
    R.pipe(
        R.toPairs,
        R.filter(([, value]) => value !== null && typeof value === 'object'),
        R.map(([key, value]) => [
            key,
            objectToArray(value)
        ]),
        R.fromPairs
    ),
    response
);

export async function getToursServices (token, country = null, lang = 'ru') {
    const {
        icons = [],
        tabs = [],
        nameServices = {},
        search,
        ...response
    } = await makeCall({
        endpoint: ENDPOINTS.services,
        query:    {
            ...token,
            countryId: country,
            lang,
        },
        ttl: [7, 'days'],
    });

    const isSetCountry = Boolean(Number(country));

    const countryService = isSetCountry
        ? search.countryService
        : response.countryService;
    const searchGroup = isSetCountry
        ? R.omit(['countryService'], search)
        : extractServicesFromResponse(R.omit(['countryService'], response));

    return R.mergeAll([
        {
            icons,
            tabs,
        },
        { rootGroups: objectToArray(renameGroupKeys(nameServices)) },
        renameGroupKeys(searchGroup),
        {
            country: isSetCountry && countryService
                ? countryService
                : [],
            byCountries: !isSetCountry && countryService
                ? countryService
                : {},
        }
    ]);
}

import { call, curryN, pipe, map, mergeAll } from 'ramda';

import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

const injectPriceByCurrency = curryN(3, (currency, price, object) => {
    if (currency && typeof price === 'number') {
        object[currency] = price;
    }

    return object;
});

const normalizeBookServices = (services) => map(
    ({
        currency,
        currency_original,
        price,
        price_original,
        ...service
    }) => {
        injectPriceByCurrency(currency, price, {});
        injectPriceByCurrency(currency_original, price_original, {});

        return mergeAll([
            service,
            {
                price: call(
                    pipe(
                        injectPriceByCurrency(currency, price),
                        injectPriceByCurrency(currency_original, price_original)
                    ),
                    {}
                ),
            }
        ]);
    },
    services
);

export async function getToursBookServices (tokenAsQuery, query) {
    const { services } = await makeCall({
        endpoint: ENDPOINTS.bookServices,
        query:    mergeAll([tokenAsQuery, query]),
    });


    return normalizeBookServices(services);
}

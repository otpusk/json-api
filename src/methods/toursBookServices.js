import { always, call, cond, curryN, isEmpty, map, mergeAll, pipe, propEq, sort, sum, T } from 'ramda';

import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { TOUR_OPTIONS } from '../static';

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
                // TODO create constant
                source: "operator",
            }
        ]);
    },
    services
);

const getWeightOfBookingService = (service) => {
    const BASE_WEIGHT = 100;
    const WEIGHT_STEP = 10;

    const weightOfType = call(
        cond([
            [propEq(TOUR_OPTIONS.LUGGAGE, 'type'), always(BASE_WEIGHT)],
            [propEq(TOUR_OPTIONS.INSURANCE, 'type'), always(BASE_WEIGHT - WEIGHT_STEP)],
            [propEq(TOUR_OPTIONS.TRANSFER, 'type'), always(BASE_WEIGHT - WEIGHT_STEP * 2)],
            [propEq(TOUR_OPTIONS.PRESTIGE, 'type'), always(BASE_WEIGHT - WEIGHT_STEP * 3)],
            [propEq(TOUR_OPTIONS.EXCURSION, 'type'), always(BASE_WEIGHT - WEIGHT_STEP * 4)],
            [propEq(TOUR_OPTIONS.ELSE, 'type'), always(BASE_WEIGHT - WEIGHT_STEP * 5)],
            [T, always(BASE_WEIGHT - WEIGHT_STEP * 2)]
        ]),
        service
    );
    const weightOfPrice = isEmpty(service.price)
        ? 0
        : 1;

    return sum([
        weightOfType,
        weightOfPrice
    ]);
};

const sortBookingServices = sort((a, b) => {
    return getWeightOfBookingService(b) - getWeightOfBookingService(a);
});

export const prepareBookingServices = (services) => call(
    pipe(normalizeBookServices, sortBookingServices),
    services
);

export async function getToursBookServices (tokenAsQuery, query) {
    const { services } = await makeCall({
        endpoint: ENDPOINTS.bookServices,
        query:    mergeAll([tokenAsQuery, query]),
    });


    return prepareBookingServices(services);
}

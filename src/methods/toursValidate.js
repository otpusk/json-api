// Core
import { normalize } from 'normalizr';
import { Map } from 'immutable';

// Instruments
import { makeCall } from '../fn';
import { infoSchema } from '../normalize/schemas';
// import { ENDPOINTS } from '../config';
import { getDepartureCityById } from '../dictionary';

const NEW_YEAR_PAY = 'N.Y. Holidays';

const normalizePrice = price => Math.ceil(parseInt(price));

export async function getToursValidate (token, offerId) {
    // const prodEndpoint = ENDPOINTS.validate;
    const tempEndpoint = 'https://api.otpusk.com/api/3.0/tours/validate';

    if (token && token.city) {
        const { name = '' } = getDepartureCityById(token.city);

        token.city = name;
    }

    const { status, ...denormalizedOffer } = await makeCall(`${tempEndpoint}/${offerId}`, {
        ...token,
    }, null, 60000);

    const { entities: { outbound, inbound },
        result: { info, usd = 0, uah = 0, eur = 0, currency = 'usd', ...validatedTour }} = normalize(denormalizedOffer, { info: infoSchema });

    const converter = {
        usd: Number(uah) / Number(usd),
        eur: Number(uah) / Number(eur),
        uah: 1,
    };

    const newYears = Map(info && info.services || {})
        .filter(({ type }) => type === NEW_YEAR_PAY)
        .map(
            (item) => Map(item)
                .update('price', normalizePrice)
                .update('price', price  => price * converter[currency])
                .update(
                    'price', 
                    uah => Map({ usd: null, eur: null, uah: null })
                        .map((_, key) => normalizePrice(uah / converter[key]))
                )
        )
        .toList()
        .toJS();
        
    const flights = { ...outbound, ...inbound };
    const recalculatedFlights = Object.entries(flights).reduce((prev, [key, value]) => ({
        ...prev,
        [key]: {
            ...value,
            priceChange: {
                usd: currency === 'usd' ? Math.ceil(value.priceChange) : Math.ceil(value.priceChange * converter[currency] / converter.usd),
                eur: currency === 'eur' ? Math.ceil(value.priceChange) : Math.ceil(value.priceChange * converter[currency] / converter.eur),
                uah: currency === 'uah' ? Math.ceil(value.priceChange) : Math.ceil(value.priceChange * converter[currency] / converter.uah),
            },
        },
    }), {});

    return {
        status,
        currency,
        flights: recalculatedFlights,
        newYears,
        ...validatedTour,
        price:   {
            usd: Number(usd),
            eur: Number(eur),
            uah: Number(uah),
        },
    };
}

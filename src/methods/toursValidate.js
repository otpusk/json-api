// Core
import { normalize } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { infoSchema } from '../normalize/schemas';
import { ENDPOINTS } from '../config';

export async function getToursValidate (token, offerId) {
    // const prodEndpoint = ENDPOINTS.validate;
    const tempEndpoint = 'https://api.otpusk.com/api/3.0/tours/validate';

    const { status, ...denormalizedOffer } = await makeCall(`${tempEndpoint}/${offerId}`, {
        ...token,
    });

    const { entities: { outbound, inbound },
        result: { info, usd = 0, uah = 0, eur = 0, ...validatedTour }} = normalize(denormalizedOffer, { info: infoSchema });

    console.log('[NORMALIZATION]', {
        token,
        denormalizedOffer,
        normalization: normalize(denormalizedOffer, { info: infoSchema }),
        result:        {
            status,
            flights: { ...outbound, ...inbound },
            ...validatedTour,
            price:   {
                usd: Number(usd),
                eur: Number(eur),
                uah: Number(uah),
            },
        },
    });

    return {
        status,
        flights: { ...outbound, ...inbound },
        ...validatedTour,
        price:   {
            usd: Number(usd),
            eur: Number(eur),
            uah: Number(uah),
        },
    };
}

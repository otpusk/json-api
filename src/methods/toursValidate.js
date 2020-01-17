// Core
import { normalize } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { infoSchema } from '../normalize/schemas';
import { ENDPOINTS } from '../config';

const tempCallResponse = {
    // 3410164920762405 Royal Paradise Resort 4*
    "status":   5,
    "message":  "Price was changed",
    "price":    337.29,
    "currency": "USD",
    "uah":      8499.71,
    "info":     {
        "hotels": [
            {
                "name":    "Royal Paradise Resort",
                "datebeg": "17.01.2020",
                "dateend": "23.01.2020",
            }
        ],
        "services": [
            {
                "name":    "15 000 $ (UFI) (4)  30$",
                "datebeg": "17.01.2020",
                "dateend": "23.01.2020",
            },
            {
                "name":    "     (UFI)",
                "datebeg": "15.01.2020",
                "dateend": "23.01.2020",
            },
            {
                "name":    "EGY: -25% discount for SOHO Square . (Royal Paradise Resort, Pool View or Sea Side View, AI)",
                "datebeg": "17.01.2020",
                "dateend": "23.01.2020",
            },
            {
                "name":    "EGY: reDISCOver Egypt (Royal Paradise Resort, Pool View or Sea Side View, AI, Hadaba\u003EHadaba)",
                "datebeg": "17.01.2020",
                "dateend": "23.01.2020",
            },
            {
                "name":    "EGY:   SPA SSH (Royal Paradise Resort, Pool View or Sea Side View, AI, Hadaba)",
                "datebeg": "17.01.2020",
                "dateend": "23.01.2020",
            },
            {
                "name":    "EGY: FREE CITY TOUR (Royal Paradise Resort, Pool View or Sea Side View, AI, Hadaba\u003EHadaba)",
                "datebeg": "17.01.2020",
                "dateend": "23.01.2020",
            },
            {
                "name":    "EGY: Airport - Hotel - Airport (Sun Int) - SSH (Royal Paradise Resort, Pool View or Sea Side View, AI, Hadaba)",
                "datebeg": "17.01.2020",
                "dateend": "23.01.2020",
            }
        ],
        "transports": {
            "departure": {
                "PQ 7117": {
                    "name":     "PQ 7117",
                    "datebeg":  "17.01.2020",
                    "dateend":  "17.01.2020",
                    "price":    337.29,
                    "currency": "USD",
                    "uah":      8499.71,
                    "add":      "0 USD",
                },
                "PQ 7101": {
                    "name":     "PQ 7101",
                    "datebeg":  "17.01.2020",
                    "dateend":  "17.01.2020",
                    "price":    337.29,
                    "currency": "USD",
                    "uah":      8499.71,
                    "add":      "10 USD",
                },
            },
            "return": {
                "": {
                    "name":     null,
                    "datebeg":  null,
                    "dateend":  null,
                    "price":    337.29,
                    "currency": "USD",
                    "uah":      8499.71,
                    "add":      "0 USD",
                },
            },
        },
    },
};

const tempApiCall = () => new Promise((resolve) => setTimeout(() => resolve(tempCallResponse), 1000));

export async function getToursValidate (token, offerId) {
    // https://api.otpusk.com/api/3.0/tours/validate/2560153450987412?access_token=2bf9c-83b4a-0dac2-e0893-8cf29
    // const { status, ...denormalizedOffer } = await tempApiCall();

    // const prodEndpoint = ENDPOINTS.validate;
    const tempEndpoint = 'https://api.otpusk.com/api/3.0/tours/validate';
    const { status, ...denormalizedOffer } = await makeCall(`${tempEndpoint}/${offerId}`, {
        ...token,
    });

    const { entities: { outbound, inbound }, result: { info, ...validatedTour }} = normalize(denormalizedOffer, { info: infoSchema });

    console.log('[NORMALIZATION]', {
        token,
        denormalizedOffer,
        normalization: normalize(denormalizedOffer, { info: infoSchema }),
        result:        {
            status,
            flights: { ...outbound, ...inbound },
            ...validatedTour,
        },
    });

    return {
        status,
        flights: { ...outbound, ...inbound },
        ...validatedTour,
    };
}

// Core
import { normalize } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { offerSchema, infoSchema } from '../normalize/schemas';
import { ENDPOINTS } from '../config';

const tempCallResponse = {
  "status": 5,
  "message": "Price was changed",
  "price": "414",
  "currency": "USD",
  "uah": 10441.08,
  "info": {
    "hotels": [
      {
        "name": "Aqua Hotel Resort \u0026 Spa",
        "datebeg": "16.01.2020",
        "dateend": "24.01.2020"
      }
    ],
    "transports": [
      {
        "name": "QU 4481",
        "datebeg": "16.01.2020",
        "dateend": "16.01.2020"
      },
      {
        "name": "QU 4436",
        "datebeg": "24.01.2020",
        "dateend": "24.01.2020"
      }
    ],
    "services": [
      {
        "name": "VUSO \u041c\u0435\u0434\u0438\u0446\u0438\u043d\u0441\u043a\u0430\u044f \u0441\u0442\u0440\u0430\u0445\u043e\u0432\u043a\u0430 20000 USD 30 Francise sport b new",
        "datebeg": "16.01.2020",
        "dateend": "24.01.2020"
      },
      {
        "name": "VUSO Medical PREMIUM 40000",
        "datebeg": "16.01.2020",
        "dateend": "24.01.2020"
      },
      {
        "name": "Group transfer Egypt Airport-Hotel-Airport (SSH) (Sharm el Sheikh\u2014\u003ESharm el Sheikh)",
        "datebeg": "16.01.2020",
        "dateend": "24.01.2020"
      },
      {
        "name": "\u0414\u043e\u043f\u043b\u0430\u0442\u0430 \u0437\u0430 \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u044b\u0439 \u0440\u0435\u0439\u0441 (\u0415\u0433\u0438\u043f\u0435\u0442 \u041a\u0438\u0435\u0432) ANEXTOUR (AZURAIR UKRAINE)",
        "datebeg": "24.01.2020",
        "dateend": "24.01.2020"
      }
    ]
  }
}

const tempApiCall = () => new Promise(resolve => setTimeout(() => resolve(tempCallResponse), 2000))

export async function getToursValidate (token, offerId) {
    // https://api.otpusk.com/api/3.0/tours/validate/2560153450987412?access_token=2bf9c-83b4a-0dac2-e0893-8cf29
    // https://api.otpusk.com/api/3.0/tours/validate/31601110750490?access_token=2bf9c-83b4a-0dac2-e0893-8cf29
    const tempEndpoint = 'https://api.otpusk.com/api/3.0/tours/validate'
    const prodEndpoint = ENDPOINTS.validate
    // const { status, ...denormalizedOffer } = await makeCall(`${tempEndpoint}/${offerId}`, {
    //     ...token
    // });

    // const { entities: { offer: offers }, result } = normalize(denormalizedOffer, offerSchema);

    const { status, ...denormalizedOffer } = await tempApiCall();
    const { entities: { flights }, result: { info, ...validatedTour } } = normalize(denormalizedOffer, { info: infoSchema })
    console.log('getToursValidate JSON_API', {status, validatedTour: { ...validatedTour, flights }})
    return {
        status,
        validatedTour: { ...validatedTour, flights }
    };
}

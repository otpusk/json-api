// Core
import { normalize } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { hotelSimilarSchema } from '../normalize/schemas';
export async function getToursSimilar(token, hotelId) {
  let limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
  let withPrice = arguments.length > 3 ? arguments[3] : undefined;
  let currency = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'uah';
  const {
    hotels
  } = await makeCall({
    endpoint: ENDPOINTS.similar,
    query: {
      hotelId,
      limit,
      ...(withPrice ? {
        with: 'price'
      } : {}),
      ...token,
      ...(currency ? {
        currencyLocal: currency
      } : {})
    }
  });
  const {
    entities: {
      hotel: similar
    }
  } = normalize(hotels, [hotelSimilarSchema]);
  return similar;
}
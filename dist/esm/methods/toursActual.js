import { normalize } from 'normalizr';
import { mergeAll } from 'ramda';
import { makeCall } from '../fn';
import { offerSchema } from '../normalize/schemas';
import { ENDPOINTS } from '../config';
const buildChildrenQuery = children => children.reduce((acc, child, index) => ({
  ...acc,
  [`child${index + 1}`]: child
}), {});
export async function getToursActual(token, offerId, people) {
  let currency = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'uah';
  let withShortCode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  let childrenBirthdays = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  const {
    code,
    offer: denormalizedOffer,
    originalHotelName,
    message
  } = await makeCall({
    endpoint: ENDPOINTS.actual,
    timeout: 40000,
    query: {
      ...token,
      offerId,
      people,
      currencyLocal: currency,
      ...(withShortCode && {
        getShortOfferId: true
      }),
      ...(childrenBirthdays.length ? buildChildrenQuery(childrenBirthdays) : {})
    }
  });
  const {
    entities: {
      offer: offers = null
    } = {},
    result: id
  } = denormalizedOffer ? normalize(denormalizedOffer, offerSchema) : {};
  return {
    code,
    offer: id ? mergeAll([offers[id], {
      hotelNameByOperator: originalHotelName
    }]) : null,
    message
  };
}
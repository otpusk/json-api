// Instruments
import { createQueryStringFromObject } from '../fn';
import { ENDPOINTS } from '../config';
export async function getTurpravdaHotelInformer(hotelId) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    count: 10
  };
  const query = {
    htl: hotelId,
    tp: 9,
    skin: 1,
    ...options
  };
  const response = await fetch(`${ENDPOINTS.turpravdaInformers}?${createQueryStringFromObject(query)}`);
  const html = await response.text();
  return html;
}
// Instruments
import { createQueryStringFromObject } from '../fn';
import { ENDPOINTS } from '../config';

export async function getTurpravdaHotelInformer (hotelId, options = { count: 10 }) {
    const query = {
        htl:  hotelId,
        tp:   9,
        skin: 1,
        ...options,
    };
    const response = await fetch(`${ENDPOINTS.turpravdaInformers}?${createQueryStringFromObject(query)}`);
    const html = await response.text();

    return html;
}

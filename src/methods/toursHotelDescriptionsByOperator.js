import {filter, pipe, prop, path, map, applySpec} from "ramda";

import {makeCall} from '../fn';
import {ENDPOINTS} from '../config';

export const getToursHotelDescriptionsByOperator = async (token, {lang, subHotelID, subOperatorName, operatorId}) => {
    const {data} = await makeCall({
        endpoint: ENDPOINTS.hotelDescriptionsByOperator,
        query: {
            operatorId,
            lang,
            operatorHotelId: subHotelID,
            subOperator: subOperatorName,
            ...token,
        },
    });

    return pipe(
        path(['hotelData', 'texts', 'text']),
        filter(prop('subject')),
        map(applySpec({
            title: prop('subject'),
            content: prop('content'),
        }))
    )(data);
}



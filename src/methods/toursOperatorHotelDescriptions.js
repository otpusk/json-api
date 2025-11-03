import {addIndex, filter, pipe, prop, path, map} from "ramda";

import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';


export const getToursOperatorHotelDescriptions = async (token, {lang, subHotelID, subOperatorName, operatorId}) => {
    const { data } = await makeCall({
        endpoint: ENDPOINTS.operatorHotelDescriptions,
        query:    {
            operatorId,
            lang,
            operatorHotelId: subHotelID,
            subOperator: subOperatorName,
            ...token,
        },
    });
    const withIndex = addIndex(map);

    return pipe(
        path(['hotelData', 'texts', 'text']),
        filter(prop('subject')),
        withIndex(({ subject, content }, index) => ({
            title: subject,
            label: content,
            id: index,
        }))
    )(data);
}



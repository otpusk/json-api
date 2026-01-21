import {filter, pipe, prop, map, applySpec, path, defaultTo} from "ramda";

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
        path(['data', 'descriptions']),
        defaultTo([]),
        filter(prop('subject')),
        map(applySpec({
            title: prop('subject'),
            content: prop('content'),
            titleOriginal: prop('subject_original'),
            contentOriginal: prop('content_original'),
            type: prop('type'),
        }))
    )(data);
}

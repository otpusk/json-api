import {filter, pipe, prop, map, applySpec} from "ramda";

import {makeCall} from '../fn';
import {ENDPOINTS} from '../config';
import { prepareContent2Render } from '../contentUtils';

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
        prop('descriptions'),
        filter(prop('subject')),
        map(applySpec({
            title: prop('subject'),
            content: pipe(prop('content'), prepareContent2Render),
            titleOriginal: prop('subject_original'),
            contentOriginal: pipe(prop('content_original'), prepareContent2Render),
            type: prop('type'),
        }))
    )(data);
};

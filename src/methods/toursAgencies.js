// Core
import { normalize, schema } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { agencySchema } from '../normalize/schemas';

export async function getToursAgencies (token, regionId, hotelId, offerId) {

    const {operators, _gaq: analytics} = await makeCall(ENDPOINTS.agencies, {
        ...token,
        regionId,
        hotelId,
        offers: offerId,
    });

    const { entities: { agency: agencies, office: offices }} = normalize(operators, new schema.Values({
        clickAgencies: [agencySchema],
        viewAgencies: [agencySchema]
    }));

    return { agencies, offices, analytics };
}
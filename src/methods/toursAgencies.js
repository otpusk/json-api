// Core
import { normalize, schema } from 'normalizr';
import { Map } from 'immutable';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { agencySchema, regionSchema } from '../normalize/schemas';

export async function getToursAgencies (token, { regionId, hotelId, offerId, noStats = false, adMarketId }) {

    const params = {
        ...token,
        regionId,
        hotelId,
        offers: offerId,
        ...adMarketId ? { adMarketId } : {},
    };

    noStats && Object.assign(params, { nst: 1 });
    const { operators, regions: denormalizedRegions } = await makeCall({ endpoint: ENDPOINTS.agencies, query: params });

    const { entities: { agency: agencies, office: offices }, result: { 1: { viewAgencies: viewAgenciesOrder } = {}}} = normalize(operators, new schema.Values({
        viewAgencies: [agencySchema],
    }));

    const { entities: { region: regions }} = normalize(denormalizedRegions, [regionSchema]);

    return {
        agencies: Map(agencies).sortBy(({ adId }) => viewAgenciesOrder.indexOf(adId) + 100),
        offices,
        regions,
    };
}

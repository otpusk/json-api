// Core
import { normalize, schema } from 'normalizr';
import { Map } from 'immutable';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { agencySchema, regionSchema } from '../normalize/schemas';

export async function getToursAgencies (token, { regionId, hotelId, offerId, noStats = false }) {

    const params = {
        ...token,
        regionId,
        hotelId,
        offers: offerId,
    };

    noStats && Object.assign(params, { nst: 1 });
    const { operators, _gaq: analytics = null, regions: denormalizedRegions } = await makeCall(ENDPOINTS.agencies, params);

    const { entities: { agency: agencies, office: offices }, result: { 1: { viewAgencies: viewAgenciesOrder, clickAgencies: clickAgenciesOrder } = {}}} = normalize(operators, new schema.Values({
        clickAgencies: [agencySchema],
        viewAgencies:  [agencySchema],
    }));

    const { entities: { region: regions }} = normalize(denormalizedRegions, [regionSchema]);

    return {
        agencies: Map(agencies).map((agency) => ({
            ...agency,
            transaction: analytics ? agency.clickId && {
                transactionId:          analytics._dataLayer.transactionId,
                transactionAffiliation: 'Clicks',
                transactionTotal:       parseInt(agency.clickId, 8) / 100,
                currencyCode:           analytics._dataLayer.currencyCode,
                transactionShipping:    0,
                transactionTax:         0,
                transactionProducts:    [{
                    sku:      agency.adId,
                    name:     agency.id,
                    category: 'Clicks',
                    price:    parseInt(agency.clickId, 8) / 100,
                    quantity: 1,
                }],
                event: analytics._dataLayer.event,
            } : null,
        })).sortBy(({ adId }) => clickAgenciesOrder.includes(adId)
            ? clickAgenciesOrder.indexOf(adId)
            : viewAgenciesOrder.indexOf(adId) + 100
        ),
        offices,
        analytics,
        regions,
    };
}

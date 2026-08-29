import { normalize, schema } from 'normalizr';
import { Map } from 'immutable';
import { makeCall } from '../fn';
import { hotelNextSchema, countrySchema, offerSchema } from '../normalize/schemas';
import { parseSearchMeta } from '../normalize/parsers';
import { ENDPOINTS } from '../config';
export async function getToursNextSearch(token, query) {
  const {
    cnt: denormalizedCountry,
    hotels: denormalizedHotels,
    results,
    workProgress: progressMeta,
    ...other
  } = await makeCall({
    endpoint: ENDPOINTS.nextSearch,
    query: {
      ...query,
      ...token
    },
    timeout: 15000
  });
  const result = {};
  if (denormalizedCountry) {
    const {
      entities: {
        country: countries
      },
      result: countryId
    } = normalize(denormalizedCountry, countrySchema);
    result.country = countries[countryId];
  }
  if (denormalizedHotels) {
    const {
      entities: {
        hotel: hotels
      }
    } = normalize(denormalizedHotels, new schema.Values(hotelNextSchema));
    result.hotels = hotels;
  }
  if (results) {
    const exactChildrenAges = String(query.people).slice(1).split(/(\d{2})/).map(Number).filter(Boolean).sort((a, b) => a - b);
    result.offers = Object.values(results).map(hotelsMap => Object.values(hotelsMap).map(_ref => {
      let {
        offers
      } = _ref;
      return offers;
    })).flat(1).map(offers => Object.values(offers)).flat(1).reduce((acc, denormalizedOffer) => {
      const {
        entities: {
          offer
        },
        result: id
      } = normalize(denormalizedOffer, offerSchema);
      offer[id].exactChildrenAges = exactChildrenAges.slice(0, offer[id].children);
      return {
        ...acc,
        ...offer
      };
    }, {});
    const pricesMap = Object.values(results).map(hotelsMap => Object.values(hotelsMap).map(_ref2 => {
      let {
        i: id,
        offers: offersShape
      } = _ref2;
      return {
        hotelID: id,
        offers: Object.keys(offersShape).map(offerID => result.offers[offerID]).sort((a, b) => a.price[query.currencyLocal] - b.price[query.currencyLocal])
      };
    })).filter(group => group.length).flat(1).reduce((acc, _ref3) => {
      let {
        hotelID,
        offers
      } = _ref3;
      if (acc[hotelID]) {
        const nextOffers = [...acc[hotelID].offers, ...offers].sort((a, b) => a.price[query.currencyLocal] - b.price[query.currencyLocal]);
        acc[hotelID].offers = nextOffers;
      } else {
        acc[hotelID] = {
          hotelID,
          offers
        };
      }
      return acc;
    }, {});
    result.prices = Object.values(pricesMap).sort((hotelA, hotelB) => hotelA.offers[0].price[query.currencyLocal] - hotelB.offers[0].price[query.currencyLocal]).map(_ref4 => {
      let {
        offers,
        ...rest
      } = _ref4;
      return {
        ...rest,
        offers: offers.map(_ref5 => {
          let {
            id
          } = _ref5;
          return id;
        })
      };
    });
  }
  return Map({
    ...result,
    ...other,
    progressMeta,
    meta: parseSearchMeta(other, query)
  }).filter((_, key) => !['cities', 'cty', 'dept', 'excursion'].includes(key)).toObject();
}
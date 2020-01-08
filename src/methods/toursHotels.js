// Core
import { normalize } from 'normalizr';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { hotelSchema, hotelShortSchema } from '../normalize/schemas';

export async function getToursHotels(token, countryId, options = {}) {
    const { cities = [], categories = [], services = [], withPrice = true} = options;
    const { hotels: denormalizedHotels } = await makeCall(ENDPOINTS.hotels, {
        countryId,
        with: withPrice ? 'price' : null,
        ...token,
    }, [1, 'day']);

    const { entities: { hotel: hotels }} = normalize(
        denormalizedHotels.filter(
            (hotel) => {
                const inCities = !cities.length || cities.includes(Number(hotel.cityId));
                const inCategory = !categories.length || categories.includes(hotel.stars);
                const inServices = !services.length || services.every((s) => hotel.services.split(',').includes(s));

                return inCities && inCategory && inServices;
            }
        ),
        [hotelShortSchema]
    );

    return Object.values(hotels);
}

export async function getToursHotelsMarkers (token, countryId, cityId, options) {
    const { center, radius } = options;
    const { hotels: denormalizedHotels } = await makeCall(ENDPOINTS.hotels, {
        countryId,
        cityId,
        geo:  `${center.lat},${center.lng}`,
        rad:  radius || 1,
        with: 'price',
        ...token,
    });

    const { entities: { hotel: markers }} = normalize(
        denormalizedHotels.map((h) => ({ ...h, countryId })),
        [hotelShortSchema]
    );

    return markers;
}

export async function getToursHotel (token, hotelId, lang = 'ru') {
    const { hotel: denormalizedHotel } = await makeCall(ENDPOINTS.hotel, {
        hotelId,
        lang,
        ...token,
    }, [1, 'hour']);

    const { entities: { hotel: hotels, offer: offers }, result: id } = normalize(denormalizedHotel, hotelSchema);
    const hotel = hotels[id];

    return { hotel, offers };
}

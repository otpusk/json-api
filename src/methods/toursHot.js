// Instruments
import { makeCall } from '../fn';
import { parsePrice, parseCountry, parseCity } from '../normalize/parsers';
import { ENDPOINTS } from '../config';

export async function getToursHotBlock(token, blockId) {
    const { block, tours } = await makeCall(ENDPOINTS.hotBlock, { blockId, ...token });

    return { block, tours };
}

export async function getToursHotTour(token, blockId, tourId) {
    const { searchedTour: { offers } = {} } = await makeCall(ENDPOINTS.hotTour, { blockId, id: tourId, ...token });

    if (!offers) {
        return null;
    }

    return offers.map((tour) => {
        const { hotelId, dateString, food, length, promo,
            transport, cityFromId, operatorId, tourLink,
            hotelName, hotelStars, imgSrc } = tour;
        const [, offerId] = tourLink.match(/oid=(\d+)/) || [];

        return {
            id: String(hotelId),
            name: hotelName,
            stars: Number(String(hotelStars).replace(/\D/gi, '')),
            country: parseCountry(tour),
            city: parseCity(tour),
            photos: [imgSrc.replace(/^.*\/\d+x\d+\//, '')],
            offer: {
                id: String(offerId),
                date: dateString,
                departure: cityFromId,
                food,
                days: length,
                nights: length - 1,
                promo,
                price: parsePrice(tour),
                operator: operatorId,
                transport
            },
        };
    });
}
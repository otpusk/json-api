
// Core
import { schema } from 'normalizr';

// Instruments
import {
    parsePrice, parseLocation, parseHotelGeo,
    parseCountry, parseCity, parseStars, parseHotelVideos, parseBadges
} from '../parsers';
import { offerSchema } from './offerSchema';
import { mergeDefinedObjectValues } from '../../fn';

export const hotelShortSchema = new schema.Entity(
    'hotel',
    {},
    {
        idAttribute: ({ id }) => String(id),
        processStrategy: (input) => {
            const {
                id,
                stars,
                rating,
                countryId,
                cityId,
                name, value,
                image,
                reviews,
                services,
            } = input;

            const entity = {
                id: String(id),
                name: value ? value : name,
                price: parsePrice(input),
                stars: parseStars(stars),
                rating: Number(rating),
                reviews: Number(reviews),
                photos: image ? [image] : [],
                location: parseLocation(input),
                country: countryId ? String(countryId) : null,
                city: cityId ? String(cityId) : null,
                services: services ? services.split(',') : null,
                type: 'hotel',
            };

            return entity;
        },
    }
);

export const hotelSimilarSchema = new schema.Entity(
    'hotel',
    {},
    {
        idAttribute: ({ id }) => String(id),
        processStrategy: (input) => {
            const {
                id,
                stars,
                code,
                rating,
                offer,
                name, value,
                image,
                reviewsCount,
                similar,
            } = input;

            const { offerId, date, length, food, transport, link } = offer;

            const entity = {
                id: String(id),
                name: value ? value : name,
                code,
                stars: parseStars(stars),
                rating: Number(rating),
                reviews: Number(reviewsCount),
                photos: image ? [image] : [],
                location: parseLocation(input),
                country: parseCountry(input),
                city: parseCity(input),
                weight: similar,
                offer: {
                    id: offerId,
                    price: parsePrice(offer),
                    date,
                    days: Number(length),
                    nights: Number(length) - 1,
                    food,
                    transport,
                    link,
                },
            };

            return entity;
        },
    }
);

export const hotelSchema = new schema.Entity(
    'hotel',
    {
        offers: [offerSchema],
    },
    {
        idAttribute: ({ i }) => String(i),
        processStrategy: (input) => {
            const {
                area,
                i,
                a,
                s: stars,
                ss: secondaryStars,
                p: price,
                r,
                v,
                h: code,
                n,
                c,
                t,
                g = {},
                e = {},
                rb = {},
                tp = {},
                f: photos,
                fc: photosCount,
                m = {},
                vh: videos,
                offers = [],
                watermark = null
            } = input;

            const defaultPhoto = '00/03/85/49/3854941.jpg';
            let entity = {
                id: String(i),
                name: n,
                code,
                city: parseHotelGeo(c),
                country: parseHotelGeo(t),
                stars: Boolean(stars) ?
                    typeof stars === 'object' ? parseStars(stars.n) : parseStars(stars)
                    : null,
                rating: !Number.isNaN(Number(r)) ? Number(r) : null,
                reviews: !Number.isNaN(Number(v)) ? Number(v) : null,
                services: Array.isArray(e) ? e : Object.values(e).reduce((services, group) => [...services, ...Object.keys(group)], []),
                photos: photos
                    ? Array.isArray(photos)
                        ? Boolean(photos.length) ? photos : [defaultPhoto]
                        : [photos]
                    : [defaultPhoto],
                photosCount,
                videos: parseHotelVideos(videos),
                sourceRatings: Object.values(rb),
                hotelTypes: Object.keys(tp),
                price: parsePrice(price),
                location: parseLocation(g),
                updated: typeof price === 'object' && 'up' in price ? price.up : null,
                badges: parseBadges(m),
                offers,
                area: area ? Number(area) : null,
                description: a,
                watermark,
            };

            const optional = {
                secondaryStars: secondaryStars ? Number(secondaryStars) : undefined
            }
            entity = mergeDefinedObjectValues(entity, optional);

            if ('o' in input) {
                const {
                    nm,
                    o: {
                        r: rooms = [],
                        dc: description,
                        b: beachDescription,
                        bs: beachServices,
                        s: sportDescription,
                        ss: sportServices,
                        fh: hotelDescription,
                        hs: hotelServices,
                        c: childDescription,
                        cs: childServices,
                        ds: roomDescription,
                        di: locationDescription,
                    },
                    vs: turpravdaRating,
                    ad: {
                        a: address,
                        ml: email,
                        u: website,
                        ph: phone,
                    } = {},
                } = input;

                const roomServices = 'r' in e
                    ? Object.entries(e.r)
                        .reduce((services, [service, { id: status, all = false }]) => ({
                            ...services,
                            [service]: status
                                ? status
                                : all ? 'all' : 'not-for-all',
                        }), {})
                    : {};

                Object.assign(entity, {
                    name: nm,
                    description,
                    info: {
                        beach: { description: beachDescription, services: typeof beachServices === 'object' ? beachServices : {} },
                        sport: { description: sportDescription, services: typeof sportServices === 'object' ? sportServices : {} },
                        hotel: { description: hotelDescription, services: typeof hotelServices === 'object' ? hotelServices : {} },
                        child: { description: childDescription, services: typeof childServices === 'object' ? childServices : {} },
                        room: { description: roomDescription, services: typeof roomServices === 'object' ? roomServices : {} },
                        location: { description: locationDescription },
                    },
                    rooms,
                    contacts: { address, email, website, phone },
                    turpravdaRating: Object.values(turpravdaRating),
                });
            }

            return entity;
        },
    }
);

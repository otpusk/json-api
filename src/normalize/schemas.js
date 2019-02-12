// Core
import { schema } from 'normalizr';

// Instruments
import {
    parseNames,
    parsePrice,
    parseLocation,
    parseHotelGeo,
    parseFlights
} from './parsers';

const currencySchema = new schema.Entity(
    'currencies',
    {},
    {
        idAttribute: ({ code }) => code.toLowerCase(),
    }
);

const countrySchema = new schema.Entity(
    'country',
    {},
    {
        idAttribute:     ({ countryId, id }) => String(countryId ? countryId : id),
        processStrategy: (input) => {
            const { id, bold: primary = false, code = '' } = input;
            const entity = {
                id:       String(id),
                name:     input.name,
                type:     'country',
                code,
                names:    parseNames(input),
                price:    parsePrice(input),
                location: parseLocation(input),
                primary,
            };

            return entity;
        },
    }
);

const citySchema = new schema.Entity(
    'city',
    {},
    {
        idAttribute:     ({ cityId, id }) => String(cityId ? cityId : id),
        processStrategy: (input) => {
            const {
                id,
                bold: primary = false,
                countryId,
                code = '',
                value,
                name,
            } = input;
            const entity = {
                id:       String(id),
                name:     value ? value : name,
                country:  String(countryId),
                type:     'city',
                code,
                names:    parseNames(input),
                price:    parsePrice(input),
                location: parseLocation(input),
                primary,
            };

            return entity;
        },
    }
);

const regionSchema = new schema.Entity(
    'region',
    {},
    {
        processStrategy: (input) => {
            const { id, deptCities, IPSelected = false, rel, name } = input;
            const entity = {
                id:         String(id),
                name,
                rel,
                departures: deptCities.split(','),
                default:    IPSelected,
            };

            return entity;
        },
    }
);

const agencyOfficeSchema = new schema.Entity(
    'office',
    {},
    {
        idAttribute:     ({ officeId }) => String(officeId),
        processStrategy: (input) => {
            const {
                officeId: id,
                address,
                city: region,
                agencyId: agency,
                fPhone1 = false,
                fPhone2 = false,
                fPhone3 = false,
                phoneViber1 = false,
                phoneViber2 = false,
                phoneViber3 = false,
                district,
                rn: area,
            } = input;

            return {
                id,
                location: parseLocation(input),
                address,
                region,
                agency,
                district,
                area,
                phones:   [{
                    number: fPhone1,
                    viber:  phoneViber1,
                }, {
                    number: fPhone2,
                    viber:  phoneViber2,
                }, {
                    number: fPhone3,
                    viber:  phoneViber3,
                }].filter(({ number }) => Boolean(number)),
            };
        },
    }
);

const agencySchema = new schema.Entity(
    'agency',
    {
        offices: new schema.Array(agencyOfficeSchema),
    },
    {
        idAttribute:     ({ agencyId }) => String(agencyId),
        processStrategy: (input) => {
            const {
                advertId: adId,
                agencyId: id,
                gift,
                logoBigFile: logo,
                operatorId: opearator,
                title,
                url: website,
                type,
                offices,
            } = input;

            return { id, adId, title, logo, opearator, website, gift, type, offices };
        },
    }
);

const hotelShortSchema = new schema.Entity(
    'hotel',
    {},
    {
        idAttribute:     ({ id }) => String(id),
        processStrategy: (input) => {
            const {
                id,
                stars,
                rating,
                countryId,
                cityId,
                name, value,
            } = input;

            const entity = {
                id:      String(id),
                name:    value ? value : name,
                price:   parsePrice(input),
                stars:   Number(stars),
                rating:  Number(rating),
                country: countryId ? String(countryId) : null,
                city:    cityId ? String(cityId) : null,
            };

            return entity;
        },
    }
);

const offerSchema = new schema.Entity(
    'offer',
    {},
    {
        idAttribute:     ({ i }) => String(i),
        processStrategy: (input) => {
            const {
                i: id,
                d: date,
                l: length,
                a: adults,
                h: children,
                f: food,
                c: departure,
                o: includes,
                oi: operator,
                r: roomName,
                ri: roomId,
                y: roomType,
                s: promo,
                ss: stopsale,
                t: transport,
                to: flights,
                vid: code,
            } = input;

            const entity = {
                id:           String(id),
                code,
                date,
                days:         length,
                nights:       length - 1,
                adults,
                children,
                food,
                departure,
                includes,
                requirements: ['visa', 'insurance', 'transfer'].filter((s) => includes.indexOf(s) === -1),
                operator,
                room:         { id: roomId, name: roomName, type: roomType },
                price:        parsePrice(input),
                stopsale,
                transport,
                flights:      flights ? parseFlights(flights) : {},
                promo,
            };

            return entity;
        },
    }
);

const fullOfferSchema = new schema.Entity(
    'offer',
    {},
    {
        idAttribute:     ({ id }) => String(id),
        processStrategy: (input) => {
            const {
                id,
                checkIn: date,
                length,
                adult: adults,
                child: children,
                food,
                fromCity: departure,
                tourOptions: includes,
                operatorId: operator,
                room: roomName,
                roomId,
                type: roomType,
                tourStatus: promo,
                stopSale: stopsale,
                transport,
                transportOptions: flights,
                variantId: code,
            } = input;

            const entity = {
                id:           String(id),
                code,
                date,
                days:         length,
                nights:       length - 1,
                adults,
                children,
                food,
                departure,
                includes,
                requirements: ['visa', 'insurance', 'transfer'].filter((s) => includes.indexOf(s) === -1),
                operator,
                room:         { id: roomId, name: roomName, type: roomType },
                price:        parsePrice(input),
                stopsale,
                transport,
                flights:      flights ? parseFlights(flights) : {},
                promo,
            };

            return entity;
        },
    }
);

const hotelSchema = new schema.Entity(
    'hotel',
    {
        offers: [offerSchema],
    },
    {
        idAttribute:     ({ i }) => String(i),
        processStrategy: (input) => {
            const {
                i,
                a,
                s: stars,
                p: price,
                r,
                v,
                h: code,
                n,
                c,
                t,
                g = {},
                e = {},
                f: photos,
                offers,
            } = input;

            const entity = {
                id:          String(i),
                name:        n,
                code,
                city:        parseHotelGeo(c),
                country:     parseHotelGeo(t),
                stars:       Number(typeof stars === 'object' ? stars.n.replace(/\D/, '') : stars),
                rating:      !Number.isNaN(Number(r)) ? Number(r) : null,
                reviews:     !Number.isNaN(Number(v)) ? Number(v) : null,
                services:    Array.isArray(e) ? e : Object.values(e).reduce((services, group) => [...services, ...Object.keys(group)], []),
                photos:      photos ? Array.isArray(photos) ? photos : [photos] : [],
                price:       parsePrice(price),
                location:    parseLocation(g),
                updated:     typeof price === 'object' && 'up' in price ? price.up : null,
                offers,
                description: a,
            };

            if ('o' in input) {
                const {
                    nm,
                    o: {
                        r: rooms,
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
                        .reduce((services, [service, { id: status }]) => ({
                            ...services,
                            [service]: status,
                        }), {})
                    : {};

                Object.assign(entity, {
                    name: nm,
                    description,
                    info: {
                        beach:    { description: beachDescription, services: typeof beachServices === 'object' ? beachServices : {}},
                        sport:    { description: sportDescription, services: typeof sportServices === 'object' ? sportServices : {}},
                        hotel:    { description: hotelDescription, services: typeof hotelServices === 'object' ? hotelServices : {}},
                        child:    { description: childDescription, services: typeof childServices === 'object' ? childServices : {}},
                        room:     { description: roomDescription, services: typeof roomServices === 'object' ? roomServices : {}},
                        location: { description: locationDescription },
                    },
                    rooms,
                    contacts:        { address, email, website, phone },
                    turpravdaRating: Object.values(turpravdaRating),
                });
            }

            return entity;
        },
    }
);

const geoSchema = new schema.Union({
    country: countrySchema,
    city:    citySchema,
    hotel:   hotelShortSchema,
}, 'type');

export {
    countrySchema,
    citySchema,
    regionSchema,
    agencySchema,
    currencySchema,
    hotelShortSchema,
    hotelSchema,
    fullOfferSchema,
    geoSchema
};

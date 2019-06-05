
// Core
import { schema } from 'normalizr';

// Instruments
import { parseLocation } from '../parsers';

export const agencyOfficeSchema = new schema.Entity(
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
                callback,
            } = input;

            return {
                id,
                location: parseLocation(input),
                address,
                region,
                agency,
                district,
                area,
                options: {
                    callback: !!callback
                },
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

export const agencySchema = new schema.Entity(
    'agency',
    {
        offices: new schema.Array(agencyOfficeSchema),
    },
    {
        idAttribute:     ({ advertId }) => String(advertId),
        processStrategy: (input, parent) => {
            const {
                advertId: adId,
                agencyId: id,
                clickId = null,
                clickText: text = null,
                logoBigFile: logo,
                operatorId: opearator,
                title,
                url: website,
                type,
                offices,
                present: giftText = null,
                gift: giftType,
            } = input;

            const isOnline = !(offices && offices.length) && text;

            return {
                id:   String(id),
                adId: String(adId),
                clickId,
                text,
                title,
                logo: `https://www.otpusk.com/logos/${logo}`,
                opearator,
                website,
                gift: giftText && {
                    text: giftText,
                    type: giftType,
                },
                type,
                offices,
                adGroupId: parent.id,
                isOnline,
            };
        },
    }
);

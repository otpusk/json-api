
// Core
import { schema } from 'normalizr';

// Instruments
import { parseLocation } from '../parsers';

const buildPhone = (number, viber, whatsapp) => ({
    number,
    viber:    viber && number.replace(/\D/g, ''),
    whatsapp: whatsapp && number.replace(/\D/g, ''),
});

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
                phoneWhatsapp1 = false,
                phoneWhatsapp2 = false,
                phoneWhatsapp3 = false,
                district,
                rn: area,
                callback,
                messenger,
                skype,
                telegram,
                image
            } = input;

            return {
                image,
                id,
                location: parseLocation(input),
                address,
                region,
                agency,
                district,
                area,
                messenger,
                skype,
                telegram,
                options: {
                    callback: !!callback
                },
                phones:   [
                    buildPhone(fPhone1, phoneViber1, phoneWhatsapp1),
                    buildPhone(fPhone2, phoneViber2, phoneWhatsapp2),
                    buildPhone(fPhone3, phoneViber3, phoneWhatsapp3),
                ].filter(({ number }) => Boolean(number)),
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

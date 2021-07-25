
// Core
import { schema } from 'normalizr';

// Instruments
import { parseLocation } from '../parsers';

export const mapAgencyOffice = (office) => {
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
        messenger,
        skype,
        telegram,
        image
    } = office;

    return {
        image,
        id,
        location: parseLocation(office),
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
}

export const agencySchema = new schema.Entity(
    'agency',
    {},
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
                office,
                present: giftText = null,
                gift: giftType,
            } = input;

            const isOnline = !office && text;

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
                office: mapAgencyOffice(office),
                adGroupId: parent.id,
                isOnline,
            };
        },
    }
);

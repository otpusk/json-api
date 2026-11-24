
// Core
import { schema } from 'normalizr';

// Instruments
import { parseLocation } from '../parsers';

const TELEGRAM_URL = 'https://t.me/';
const WHATSAPP_URL = 'https://wa.me/';
const VIBER_URL = 'viber://chat?number=%2B';
const PHONE_URL = 'tel:+';

const getPhoneDigits = (number) => number.replace(/\D/g, '');

const buildTelegramUrl = (telegram) => {
    const username = telegram && telegram.trim().replace(/^@/, '');

    return username ? `${TELEGRAM_URL}${username}` : null;
};

const buildWhatsAppUrl = (number, whatsapp) => whatsapp && number ? `${WHATSAPP_URL}${getPhoneDigits(number)}` : null;

const buildViberUrl = (number, viber) => viber && number ? `${VIBER_URL}${getPhoneDigits(number)}` : null;

const buildPhoneUrl = (number) => number ? `${PHONE_URL}${getPhoneDigits(number)}` : null;

const buildPhone = (number, viber, whatsapp) => ({
    number,
    phoneUrl:    buildPhoneUrl(number),
    /** @deprecated use viberUrl */
    viber:       viber && number && getPhoneDigits(number),
    viberUrl:    buildViberUrl(number, viber),
    whatsapp:    whatsapp && number && getPhoneDigits(number),
    whatsappUrl: buildWhatsAppUrl(number, whatsapp),
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
                image,
                workingTime = [],
            } = input;

            return {
                image,
                id,
                location:    parseLocation(input),
                address,
                region:      region && Number(region),
                agency,
                district,
                area,
                messenger,
                skype,
                telegram,
                telegramUrl: buildTelegramUrl(telegram),
                options:     {
                    callback: Boolean(callback),
                },
                phones: [
                    buildPhone(fPhone1, phoneViber1, phoneWhatsapp1),
                    buildPhone(fPhone2, phoneViber2, phoneWhatsapp2),
                    buildPhone(fPhone3, phoneViber3, phoneWhatsapp3)
                ].filter(({ number }) => Boolean(number)),
                workingTime,
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

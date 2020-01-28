import { schema } from "normalizr";
import moment from "moment";

const inputFormat = 'DD.MM.YYYY HH:mm';
const outputFormat = 'YYYY-MM-DD HH:mm:ss';
const formatDate = (date, input, output) => {
    const formatted = moment(date, input).format(output);

    return formatted.toLowerCase().includes('invalid') ? date : formatted;
};

const flightCode = (name = '') => {
    console.log('[FLGIHT_CODE]', { name });
    const codeRegex = /[A-Z]{2}[\s-]{1}[\d]{4}/;

    const codeMatch = name.match(codeRegex);

    if (codeMatch.length) {
        return codeMatch[0].replace('-', ' ');
    }

    return name;
};

const getIdAttribute = ({ datebeg, dateend }) => `${formatDate(datebeg, inputFormat, outputFormat)}_${formatDate(dateend, inputFormat, outputFormat)}`;

const processTransports = (entity) => {
    const { name, datebeg, dateend, price, ...rest } = entity;

    const res = {
        code:        name && flightCode(name),
        begin:       formatDate(datebeg, inputFormat, outputFormat),
        end:         formatDate(dateend, inputFormat, outputFormat),
        priceChange: Number(price) || Number(price.split(/\s/)[0]),
        ...rest,
    };

    return res;
};
const outboundSchema = new schema.Entity(
    "outbound",
    {},
    {
        idAttribute:     getIdAttribute,
        processStrategy: processTransports,
    }
);

const inboundSchema = new schema.Entity(
    "inbound",
    {},
    {
        idAttribute: getIdAttribute,

        processStrategy: processTransports,
    }
);

export const flightSchema = new schema.Entity("flights", {
    departure: [outboundSchema],
    return:    [inboundSchema],
});

export const infoSchema = { transports: flightSchema };

import { schema } from "normalizr";

const flightCode = (name) => {
    const noWhitespaceName = name.replace(/\s/g, "");

    if ((/^[A-Z0-9]*$/g).test(noWhitespaceName)) {
        return name;
    }

    return name
        .split(",")[1]
        .split(".")[0]
        .trim();
};

const processTransports = (entity) => {
    const { name, datebeg, dateend, add, ...rest } = entity;
    const res = {
        code:        name && flightCode(name),
        begin:       datebeg,
        end:         dateend,
        priceChange: add ? Number(add.split(" ")[0]) : 0,
        ...rest,
    };

    return res;
};
const outboundSchema = new schema.Entity(
    "outbound",
    {},
    {
        idAttribute:     ({ name }) => name,
        processStrategy: processTransports,
    }
);

const inboundSchema = new schema.Entity(
    "inbound",
    {},
    {
        idAttribute: ({ name }) => name,

        processStrategy: processTransports,
    }
);

const flightSchema = new schema.Entity("flights", {
    departure: [outboundSchema],
    return:    [inboundSchema],
});

export const infoSchema = { transports: flightSchema };

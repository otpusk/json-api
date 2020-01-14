import { schema } from "normalizr";

const flightCode = name => {
  const noWhitespaceName = name.replace(/\s/g, '');
  if (/^[A-Z0-9]*$/g.test(noWhitespaceName)) {
    return name
  }
  return name
    .split(',')[1]
    .split('.')[0]
    .trim();
}

const generatePriceChange = () => Math.round(Math.random()) * (Math.floor(Math.random() * 150) - 75)

const flightSchema = new schema.Entity(
  "flights",
  {},
  {
    idAttribute: ({ name }) => flightCode(name),
    processStrategy: entity => {
      const { name, datebeg, dateend, ...rest } = entity;
      return { 
        code: flightCode(name), 
        begin: datebeg, 
        end: dateend,
        priceChange: generatePriceChange(),
        ...rest };
    }
  }
);

export const infoSchema = {transports: [flightSchema]};
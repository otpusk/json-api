import { schema } from "normalizr";

const flightSchema = new schema.Entity(
  "flights",
  {},
  {
    idAttribute: "name",
    processStrategy: entity => {
      const { name, ...rest } = entity;
      return { code: name, ...rest };
    }
  }
);

export const infoSchema = {transports: [flightSchema]};
// Core
import { schema } from 'normalizr';

export const currencySchema = new schema.Entity(
    'currencies',
    {},
    {
        idAttribute: ({ code }) => code.toLowerCase(),
    }
);

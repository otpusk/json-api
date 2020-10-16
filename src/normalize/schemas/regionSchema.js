// Core
import { schema } from 'normalizr';

// Instruments
import {
    parseNames,
    parseLocation
} from '../parsers';

export const regionSchema = new schema.Entity(
    'region',
    {},
    {
        idAttribute:     ({ regionId, id }) => String(id || regionId),
        processStrategy: (input) => {
            const { id, regionId, deptCities, IPselected = false, name } = input;
            const entity = {
                id:         String(id || regionId),
                name,
                departures: deptCities && deptCities.split(','),
                default:    IPselected,
                location:   parseLocation(input),
                names:      parseNames(input),
            };

            return entity;
        },
    }
);

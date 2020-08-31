// Core
import { compile } from 'path-to-regexp';
import moment from 'moment';
import { Map } from 'immutable';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import CustomError from './../error';

const transformDateToMoment = (string, format = 'DD.MM.YYYY') => {
    if (string) {
        const date = moment(string, format);

        return date.isValid() ? date : null;
    }

    return null;
};

const normalizeFlights = (flights) =>
    Map(flights)
        .map(({ datebeg, dateend, name: flight, price }) => ({
            date: { 
                from: transformDateToMoment(datebeg, 'DD.MM.YYYY HH:mm'), 
                to: transformDateToMoment(dateend, 'DD.MM.YYYY HH:mm')
            },
            flight,
            price: parseInt(price)
        }))
        .toObject();

const createQueryForToursValidateMethod = (params, token) => ({ ...params, ...token });

export async function getToursValidate (token, offerID, params = {}) {
    const { validate: createEndpoint } = ENDPOINTS;

    try {
        const { message, status, ...response } = await makeCall(
            createEndpoint(compile)({ offerID }), 
            createQueryForToursValidateMethod(params, token), 
            null, 
            6e4
        );
    
        debugger;
    
        if (status > 0) {
            throw new CustomError({ message, status }, message)
        }
    
        const {
            uah,
            eur,
            usd,
            currency,
            info: { hotels: [hotel], transports },
        } = response;
    
        return {
            hotel: Map(hotel)
                .update('datebeg', transformDateToMoment)
                .update('dateend', transformDateToMoment)
                .update((value) => 
                    value.set('date', { from: value.get('datebeg'), to: value.get('dateend') }))
                .remove('price')
                .remove('datebeg')
                .remove('dateend')
                .toObject(),
            status: { code: status, message },
            transports: Map(transports)
                .mapKeys((key) => {
                    switch (key) {
                        case 'departure': return 'outbound';
                        case 'return': return 'inbound';
                        default: return key;
                    }
                })
                .update('outbound', normalizeFlights)
                .update('inbound', normalizeFlights)
                .toObject(),
            offer: {
                currency,
                price: Map({ uah, eur, usd })
                    .filter(Boolean)
                    .toObject()
            }
        };
    } catch (error) {
        throw new Error(error);
    }

    
}

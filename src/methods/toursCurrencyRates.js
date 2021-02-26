// Core
import { Map } from 'immutable';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getToursCurrencyRates(token, date, options = {}) {
    const { from, to } = date;
    const { rates = {}} = await makeCall({ endpoint: ENDPOINTS.currencyRates,
        query: {
            'datebegin': from,
            'dateend': to,
            ...options,
            ...token,
        }});
    const results = Map(rates)
        .map((rate) => {
            return Map(rate)
                .map((operators) => {
                    return Map(operators)
                        .map((operator) => {
                            return Map(operator).update('history', (history) => {
                                return Map(history)
                                    .map((value, dateKey) => ({ rate: value, date: dateKey }))
                                    .toList()
                                    .toArray()
                            }).toObject();
                        }).toObject()
                }).toObject();
        }).toObject();

    return results;
}
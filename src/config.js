import Cookies from 'js-cookie';

const API = Cookies.get('api-host') || 'https://api.otpusk.com/api/2.5';
const TURPRAVDA = 'https://www.turpravda.com';

export const ENDPOINTS = Object.freeze({
    static:             `${API}/tours/static`,
    countries:          `${API}/tours/countries`,
    currencyRates:      `${API}/tours/currencyRates`,
    cities:             `${API}/tours/cities`,
    hotel:              `${API}/tours/hotel`,
    hotels:             `${API}/tours/hotels`,
    services:           `${API}/tours/services`,
    agencies:           `${API}/tours/agency`,
    regions:            `${API}/tours/regions`,
    suggests:           `${API}/tours/suggests`,
    dates:              `${API}/tours/dates`,
    search:             `${API}/tours/search`,
    offer:              `${API}/tours/offer`,
    actual:             `${API}/tours/actual`,
    similar:            `${API}/tours/similars`,
    order:              `${API}/tours/order`,
    departureCities:    `${API}/tours/fromCities`,
    graph:              `${API}/tours/graph`,
    turpravdaInformers: `${TURPRAVDA}/informers/hotel/`,
    hotBlock:           `${API}/tours/hotBlock`,
    hotTour:            `${API}/tours/hotTour`,
    operators:          `${API}/tours/operators`,
    validate:           `${API}/tours/validate`,
    init:               `${API}/init`,
    cacheValidate:      `${API}/tours/cacheControl`,
    flightPort:         `${API}/tours/port`,
    nextSearch:         `${API}/tours/getResults`,
});

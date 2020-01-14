import Cookies from 'js-cookie';

const API = Cookies.get('api-host') || 'https://export.otpusk.com/api';
const TURPRAVDA = 'https://www.turpravda.com';

export const ENDPOINTS = Object.freeze({
    static:             `${API}/tours/static`,
    countries:          `${API}/tours/countries`,
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
    departureCities:    `${API}/tours/deptCities`,
    graph:              `${API}/tours/graph`,
    turpravdaInformers: `${TURPRAVDA}/informers/hotel/`,
    hotBlock:           `${API}/tours/hotBlock`,
    hotTour:            `${API}/tours/hotTour`,
    operators:          `${API}/tours/operators`,
    validate:           `${API}/tours/validate`,
    init:               `${API}/init`
});
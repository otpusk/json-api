import Cookies from 'js-cookie';

export const API_VERSION = '2.5';
const API_VERSION_2_6 = '2.6';

const apiHostFromCookie = Cookies.get('api-host');

const API_HOST = 'https://api.otpusk.com/api/';
const API = apiHostFromCookie || `${API_HOST}${API_VERSION}`;
const TURPRAVDA = 'https://www.turpravda.com';

export const ENDPOINTS = {
    static:        `${API}/tours/static`,
    countries:     `${API}/tours/countries`,
    currencyRates: `${API}/tours/currencyRates`,
    cities:        `${API}/tours/cities`,
    hotel:         `${API}/tours/hotel`,
    hotels:        `${API}/tours/hotels`,
    services:      `${API}/tours/services`,
    agencies:      `${API}/tours/agency`,
    regions:       `${API}/tours/regions`,
    suggests:      `${API}/tours/suggests`,
    dates:         `${API}/tours/dates`,
    search:        `${API}/tours/search`,
    get offer () {
        const path = '/tours/offer';

        return apiHostFromCookie
            ? `${apiHostFromCookie}${path}`
            : `${API_HOST}${API_VERSION_2_6}${path}`;
    },
    get actual () {
        const path = '/tours/actual';

        return apiHostFromCookie
            ? `${apiHostFromCookie}${path}`
            : `${API_HOST}${API_VERSION_2_6}${path}`;
    },
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
    get nextSearch () {
        const path = '/tours/getResults';

        return apiHostFromCookie
            ? `${apiHostFromCookie}${path}`
            : `${API_HOST}${API_VERSION_2_6}${path}`;

    },
    session:      `${API}/session/json`,
    bookServices: `${API_HOST}${API_VERSION_2_6}/tours/book/services`,
};

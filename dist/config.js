"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENDPOINTS = exports.API_VERSION = void 0;
var _jsCookie = _interopRequireDefault(require("js-cookie"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var API_VERSION = exports.API_VERSION = '2.5';
var API_VERSION_2_6 = '2.6';
var apiHostFromCookie = _jsCookie.default.get('api-host');
var API_HOST = 'https://api.otpusk.com/api/';
var API = apiHostFromCookie || "".concat(API_HOST).concat(API_VERSION);
var TURPRAVDA = 'https://www.turpravda.com';
var ENDPOINTS = exports.ENDPOINTS = {
  static: "".concat(API, "/tours/static"),
  countries: "".concat(API, "/tours/countries"),
  currencyRates: "".concat(API, "/tours/currencyRates"),
  cities: "".concat(API, "/tours/cities"),
  hotel: "".concat(API, "/tours/hotel"),
  hotels: "".concat(API, "/tours/hotels"),
  services: "".concat(API, "/tours/services"),
  agencies: "".concat(API, "/tours/agency"),
  regions: "".concat(API, "/tours/regions"),
  suggests: "".concat(API, "/tours/suggests"),
  dates: "".concat(API, "/tours/dates"),
  search: "".concat(API, "/tours/search"),
  get offer() {
    var path = '/tours/offer';
    return apiHostFromCookie ? "".concat(apiHostFromCookie).concat(path) : "".concat(API_HOST).concat(API_VERSION_2_6).concat(path);
  },
  get actual() {
    var path = '/tours/actual';
    return apiHostFromCookie ? "".concat(apiHostFromCookie).concat(path) : "".concat(API_HOST).concat(API_VERSION_2_6).concat(path);
  },
  similar: "".concat(API, "/tours/similars"),
  order: "".concat(API, "/tours/order"),
  departureCities: "".concat(API, "/tours/fromCities"),
  graph: "".concat(API, "/tours/graph"),
  turpravdaInformers: "".concat(TURPRAVDA, "/informers/hotel/"),
  hotBlock: "".concat(API, "/tours/hotBlock"),
  hotTour: "".concat(API, "/tours/hotTour"),
  operators: "".concat(API, "/tours/operators"),
  hotelDescriptionsByOperator: "".concat(API, "/tours/operatorHotelDescription"),
  validate: "".concat(API, "/tours/validate"),
  init: "".concat(API, "/init/json"),
  cacheValidate: "".concat(API, "/tours/cacheControl"),
  flightPort: "".concat(API, "/tours/port"),
  get nextSearch() {
    var path = '/tours/getResults';
    return apiHostFromCookie ? "".concat(apiHostFromCookie).concat(path) : "".concat(API_HOST).concat(API_VERSION_2_6).concat(path);
  },
  bookServices: "".concat(API_HOST).concat(API_VERSION_2_6, "/tours/book/services"),
  bookCalculate: "".concat(API_HOST).concat(API_VERSION_2_6, "/tours/book/calculate")
};
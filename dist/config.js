"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENDPOINTS = void 0;

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API = _jsCookie.default.get('api-host') || 'https://api.otpusk.com/api/2.5';
var TURPRAVDA = 'https://www.turpravda.com';
var ENDPOINTS = Object.freeze({
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
  offer: "".concat(API, "/tours/offer"),
  actual: "".concat(API, "/tours/actual"),
  similar: "".concat(API, "/tours/similars"),
  order: "".concat(API, "/tours/order"),
  departureCities: "".concat(API, "/tours/fromCities"),
  graph: "".concat(API, "/tours/graph"),
  turpravdaInformers: "".concat(TURPRAVDA, "/informers/hotel/"),
  hotBlock: "".concat(API, "/tours/hotBlock"),
  hotTour: "".concat(API, "/tours/hotTour"),
  operators: "".concat(API, "/tours/operators"),
  validate: "".concat(API, "/tours/validate"),
  init: "".concat(API, "/init"),
  cache_validate: "".concat(API, "/tours/cacheControl"),
  flightPort: "".concat(API, "/tours/port")
});
exports.ENDPOINTS = ENDPOINTS;
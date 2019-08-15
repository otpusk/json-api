"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENDPOINTS = void 0;

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API = _jsCookie.default.get('api-host') || 'https://export.otpusk.com/api';
var TURPRAVDA = 'https://www.turpravda.com';
var ENDPOINTS = Object.freeze({
  static: "".concat(API, "/tours/static"),
  countries: "".concat(API, "/tours/countries"),
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
  departureCities: "".concat(API, "/tours/deptCities"),
  graph: "".concat(API, "/tours/graph"),
  turpravdaInformers: "".concat(TURPRAVDA, "/informers/hotel/"),
  hotBlock: "".concat(API, "/tours/hotBlock"),
  hotTour: "".concat(API, "/tours/hotTour"),
  operators: "".concat(API, "/tours/operators"),
  init: "".concat(API, "/init")
});
exports.ENDPOINTS = ENDPOINTS;
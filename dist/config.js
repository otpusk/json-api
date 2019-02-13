"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENDPOINTS = void 0;
var API = 'https://export.otpusk.com/api';
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
  order: "".concat(API, "/tours/order"),
  departureCities: "".concat(API, "/tours/deptCities"),
  graph: "".concat(API, "/tours/graph"),
  turpravdaInformers: "".concat(TURPRAVDA, "/informers/hotel/")
});
exports.ENDPOINTS = ENDPOINTS;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCity = exports.parseCountry = exports.parseHotelGeo = exports.parseNames = exports.parseLocation = exports.parseFlights = exports.parsePrice = void 0;

var _immutable = require("immutable");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var parsePrice = function parsePrice(input) {
  var uah = input.uah,
      p = input.p,
      pl = input.pl,
      priceUah = input.priceUah,
      price = input.price,
      po = input.po,
      minPrice = input.minPrice,
      currency = input.currency,
      pu = input.pu,
      u = input.u,
      c = input.c;
  var original = po || p || price || minPrice || null;
  var converted = pl || uah || _typeof(c) !== 'object' && pu || p || priceUah || null;
  var originalCurrency = u || _typeof(c) !== 'object' && c || pu || currency || null;
  var entity = {};

  if (original) {
    entity[originalCurrency] = Number(original);
  }

  if (converted) {
    entity.uah = Number(converted);
  }

  return entity;
};

exports.parsePrice = parsePrice;

var parseFlights = function parseFlights(input) {
  var _input$from = input.from,
      outbound = _input$from === void 0 ? [] : _input$from,
      _input$to = input.to,
      inbound = _input$to === void 0 ? [] : _input$to;
  return {
    outbound: Array.isArray(outbound) ? outbound : Object.values(outbound),
    inbound: Array.isArray(inbound) ? inbound : Object.values(inbound)
  };
};

exports.parseFlights = parseFlights;

var parseLocation = function parseLocation(input) {
  var lat = input.lat,
      a = input.a,
      lng = input.lng,
      o = input.o,
      zoom = input.zoom,
      z = input.z;
  var latitude = a ? a : lat;
  var longitude = o ? o : lng;

  if (!(latitude && longitude)) {
    return null;
  }

  return {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
    zoom: parseInt(zoom || z, 10)
  };
};

exports.parseLocation = parseLocation;

var parseNames = function parseNames(input, prefix) {
  var cases = (0, _immutable.Map)({
    long: 'name',
    nm: 'value',
    vm: 'namevn',
    rd: 'namerd',
    pr: 'namepr'
  });
  var props = (0, _immutable.Map)(input).mapKeys(function (k) {
    return k.toLowerCase();
  });
  return cases.map(function (prop) {
    return props.get("".concat(prefix).concat(prop), props.get(prop, ''));
  }).toJS();
};

exports.parseNames = parseNames;

var parseHotelGeo = function parseHotelGeo(input) {
  var id = input.i,
      name = input.n,
      code = input.c;
  return {
    id: id,
    name: name,
    code: code
  };
};

exports.parseHotelGeo = parseHotelGeo;

var parseCountry = function parseCountry(input) {
  var id = input.countryId,
      name = input.countryName;
  return {
    id: Number(id),
    name: name,
    names: parseNames(input, 'country')
  };
};

exports.parseCountry = parseCountry;

var parseCity = function parseCity(input) {
  var id = input.cityId,
      name = input.cityName,
      code = input.cityCode;
  return {
    id: Number(id),
    name: name,
    code: code,
    names: parseNames(input, 'city')
  };
};

exports.parseCity = parseCity;
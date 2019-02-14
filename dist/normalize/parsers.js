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

  var prepareNumber = function prepareNumber(value) {
    return Number(String(value).replace(/\D/gi, ''));
  };

  if (original) {
    entity[originalCurrency] = prepareNumber(original);
  }

  if (converted) {
    entity.uah = prepareNumber(converted);
  }

  return entity;
};

exports.parsePrice = parsePrice;

var parseFlights = function parseFlights(input) {
  var _input$from = input.from,
      outbound = _input$from === void 0 ? [] : _input$from,
      _input$to = input.to,
      inbound = _input$to === void 0 ? [] : _input$to;
  return (0, _immutable.Map)({
    outbound: outbound,
    inbound: inbound
  }).map(function (flights) {
    return Array.isArray(flights) ? flights : Object.values(flights);
  }).map(function (flights) {
    return flights.filter(function (_ref) {
      var _ref$place = _ref.place,
          place = _ref$place === void 0 ? 0 : _ref$place;
      return place > 0;
    });
  }).toJS();
};

exports.parseFlights = parseFlights;

var parseLocation = function parseLocation(input) {
  var lat = input.lat,
      a = input.a,
      lng = input.lng,
      long = input.long,
      o = input.o,
      zoom = input.zoom,
      z = input.z;
  var latitude = parseFloat(a || lat);
  var longitude = parseFloat(o || lng || long);

  if (!(latitude && longitude)) {
    return null;
  }

  return {
    lat: latitude,
    lng: longitude,
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
    return props.get("".concat(prefix).concat(prop), props.get(prop, props.get(prop.replace('name', ''), '')));
  }).filter(function (value) {
    return Boolean(value);
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
    code: code,
    names: parseNames(input)
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
      cityName = input.cityName,
      resortName = input.resortName,
      _input$cityCode = input.cityCode,
      code = _input$cityCode === void 0 ? null : _input$cityCode;
  return {
    id: Number(id) || null,
    name: cityName || resortName,
    code: code,
    names: parseNames(input, 'city')
  };
};

exports.parseCity = parseCity;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseHotelVideos = exports.parseSearchMeta = exports.parseStars = exports.parseCity = exports.parseCountry = exports.parseHotelGeo = exports.parseNames = exports.parseLocation = exports.parseFlights = exports.parseDiscountPrice = exports.parsePrice = void 0;

var _immutable = require("immutable");

var _fn = require("../fn");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      c = input.c,
      ur = input.ur;
  var convertPriceWithoutDiscount = po ? po * ur : pl;
  var original = po || p || price || minPrice || null;
  var converted = convertPriceWithoutDiscount || uah || _typeof(c) !== 'object' && pu || p || priceUah || null;
  var originalCurrency = u || _typeof(c) !== 'object' && c || pu || currency || null;
  var entity = {};

  var prepareNumber = function prepareNumber(value) {
    return Number(String(value).replace(/[^0-9\.\,]/gi, ''));
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

var parseDiscountPrice = function parseDiscountPrice(input) {
  var _ref;

  var po = input.po,
      pl = input.pl,
      p = input.p,
      u = input.u,
      c = input.c,
      pu = input.pu,
      currency = input.currency;
  var originalCurrency = u || _typeof(c) !== 'object' && c || pu || currency || null;

  if (!po) {
    return null;
  }

  return _ref = {}, _defineProperty(_ref, originalCurrency, p), _defineProperty(_ref, "uah", pl), _ref;
};

exports.parseDiscountPrice = parseDiscountPrice;

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
    return flights.filter(function (_ref2) {
      var _ref2$place = _ref2.place,
          place = _ref2$place === void 0 ? 0 : _ref2$place;
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
  var geo = {
    id: id,
    name: name,
    code: code,
    names: parseNames(input)
  };
  var optional = {
    isoCode: input.cd || input.cid
  };
  return (0, _fn.mergeDefinedObjectValues)(geo, optional);
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

var parseStars = function parseStars(input) {
  switch (input.toLowerCase()) {
    case 'hv1':
      return 'HV1';

    case 'hv2':
      return 'HV2';

    default:
      return parseInt(String(input).replace(/\D/, ''), 10);
  }
};
/**
 * 
 * @param {object} input 
 */


exports.parseStars = parseStars;

var parseSearchMeta = function parseSearchMeta(input, query) {
  var _input$searchOperator = input.searchOperators,
      searchOperators = _input$searchOperator === void 0 ? {} : _input$searchOperator,
      _input$originalOperat = input.originalOperators,
      originalOperators = _input$originalOperat === void 0 ? {} : _input$originalOperat,
      _input$operators = input.operators,
      operators = _input$operators === void 0 ? {} : _input$operators,
      _input$stars = input.stars,
      stars = _input$stars === void 0 ? {} : _input$stars,
      _input$originalStars = input.originalStars,
      originalStars = _input$originalStars === void 0 ? {} : _input$originalStars;
  var currency = 'currency' in query ? query.currency : 'original';

  var pricesMerger = function pricesMerger(converted, original) {
    return _defineProperty({
      uah: converted
    }, currency, original);
  };

  var categoriesPrices = (0, _immutable.mergeWith)(pricesMerger, stars, originalStars);
  var operatorsPrices = (0, _immutable.mergeWith)(pricesMerger, operators, originalOperators);
  return {
    prices: {
      operators: operatorsPrices,
      categories: categoriesPrices
    },
    links: {
      operators: searchOperators
    }
  };
};

exports.parseSearchMeta = parseSearchMeta;

var parseHotelVideos = function parseHotelVideos(raw) {
  return raw && Array.isArray(raw) ? raw.map(function (_ref4) {
    var thumbnail = _ref4.thumbnail,
        id = _ref4.videoId,
        code = _ref4.code;

    var getProvider = function getProvider(iframe) {
      if (iframe.match(new RegExp('(youtu.|youtube.)'))) {
        return 'youtube';
      }

      if (iframe.includes('vimeo.')) {
        return 'vimeo';
      }

      return null;
    };

    return {
      id: id,
      provider: getProvider(code),
      thumbnail: thumbnail
    };
  }) : [];
};

exports.parseHotelVideos = parseHotelVideos;
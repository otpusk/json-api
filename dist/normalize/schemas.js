"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoSchema = exports.fullOfferSchema = exports.hotelSchema = exports.hotelShortSchema = exports.currencySchema = exports.agencySchema = exports.regionSchema = exports.citySchema = exports.countrySchema = void 0;

var _normalizr = require("normalizr");

var _parsers = require("./parsers");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var currencySchema = new _normalizr.schema.Entity('currencies', {}, {
  idAttribute: function idAttribute(_ref) {
    var code = _ref.code;
    return code.toLowerCase();
  }
});
exports.currencySchema = currencySchema;
var countrySchema = new _normalizr.schema.Entity('country', {}, {
  idAttribute: function idAttribute(_ref2) {
    var countryId = _ref2.countryId,
        id = _ref2.id;
    return String(countryId ? countryId : id);
  },
  processStrategy: function processStrategy(input) {
    var id = input.id,
        _input$bold = input.bold,
        primary = _input$bold === void 0 ? false : _input$bold,
        _input$code = input.code,
        code = _input$code === void 0 ? '' : _input$code;
    var entity = {
      id: String(id),
      name: input.name,
      type: 'country',
      code: code,
      names: (0, _parsers.parseNames)(input),
      price: (0, _parsers.parsePrice)(input),
      location: (0, _parsers.parseLocation)(input),
      primary: primary
    };
    return entity;
  }
});
exports.countrySchema = countrySchema;
var citySchema = new _normalizr.schema.Entity('city', {}, {
  idAttribute: function idAttribute(_ref3) {
    var cityId = _ref3.cityId,
        id = _ref3.id;
    return String(cityId ? cityId : id);
  },
  processStrategy: function processStrategy(input) {
    var id = input.id,
        _input$bold2 = input.bold,
        primary = _input$bold2 === void 0 ? false : _input$bold2,
        countryId = input.countryId,
        _input$code2 = input.code,
        code = _input$code2 === void 0 ? '' : _input$code2,
        value = input.value,
        name = input.name;
    var entity = {
      id: String(id),
      name: value ? value : name,
      country: String(countryId),
      type: 'city',
      code: code,
      names: (0, _parsers.parseNames)(input),
      price: (0, _parsers.parsePrice)(input),
      location: (0, _parsers.parseLocation)(input),
      primary: primary
    };
    return entity;
  }
});
exports.citySchema = citySchema;
var regionSchema = new _normalizr.schema.Entity('region', {}, {
  processStrategy: function processStrategy(input) {
    var id = input.id,
        deptCities = input.deptCities,
        _input$IPSelected = input.IPSelected,
        IPSelected = _input$IPSelected === void 0 ? false : _input$IPSelected,
        rel = input.rel,
        name = input.name;
    var entity = {
      id: String(id),
      name: name,
      rel: rel,
      departures: deptCities.split(','),
      default: IPSelected
    };
    return entity;
  }
});
exports.regionSchema = regionSchema;
var agencyOfficeSchema = new _normalizr.schema.Entity('office', {}, {
  idAttribute: function idAttribute(_ref4) {
    var officeId = _ref4.officeId;
    return String(officeId);
  },
  processStrategy: function processStrategy(input) {
    var id = input.officeId,
        address = input.address,
        region = input.city,
        agency = input.agencyId,
        _input$fPhone = input.fPhone1,
        fPhone1 = _input$fPhone === void 0 ? false : _input$fPhone,
        _input$fPhone2 = input.fPhone2,
        fPhone2 = _input$fPhone2 === void 0 ? false : _input$fPhone2,
        _input$fPhone3 = input.fPhone3,
        fPhone3 = _input$fPhone3 === void 0 ? false : _input$fPhone3,
        _input$phoneViber = input.phoneViber1,
        phoneViber1 = _input$phoneViber === void 0 ? false : _input$phoneViber,
        _input$phoneViber2 = input.phoneViber2,
        phoneViber2 = _input$phoneViber2 === void 0 ? false : _input$phoneViber2,
        _input$phoneViber3 = input.phoneViber3,
        phoneViber3 = _input$phoneViber3 === void 0 ? false : _input$phoneViber3,
        district = input.district,
        area = input.rn;
    return {
      id: id,
      location: (0, _parsers.parseLocation)(input),
      address: address,
      region: region,
      agency: agency,
      district: district,
      area: area,
      phones: [{
        number: fPhone1,
        viber: phoneViber1
      }, {
        number: fPhone2,
        viber: phoneViber2
      }, {
        number: fPhone3,
        viber: phoneViber3
      }].filter(function (_ref5) {
        var number = _ref5.number;
        return Boolean(number);
      })
    };
  }
});
var agencySchema = new _normalizr.schema.Entity('agency', {
  offices: new _normalizr.schema.Array(agencyOfficeSchema)
}, {
  idAttribute: function idAttribute(_ref6) {
    var agencyId = _ref6.agencyId;
    return String(agencyId);
  },
  processStrategy: function processStrategy(input) {
    var adId = input.advertId,
        id = input.agencyId,
        gift = input.gift,
        logo = input.logoBigFile,
        opearator = input.operatorId,
        title = input.title,
        website = input.url,
        type = input.type,
        offices = input.offices;
    return {
      id: id,
      adId: adId,
      title: title,
      logo: logo,
      opearator: opearator,
      website: website,
      gift: gift,
      type: type,
      offices: offices
    };
  }
});
exports.agencySchema = agencySchema;
var hotelShortSchema = new _normalizr.schema.Entity('hotel', {}, {
  idAttribute: function idAttribute(_ref7) {
    var id = _ref7.id;
    return String(id);
  },
  processStrategy: function processStrategy(input) {
    var id = input.id,
        stars = input.stars,
        rating = input.rating,
        countryId = input.countryId,
        cityId = input.cityId,
        name = input.name,
        value = input.value;
    var entity = {
      id: String(id),
      name: value ? value : name,
      price: (0, _parsers.parsePrice)(input),
      stars: Number(stars),
      rating: Number(rating),
      country: countryId ? String(countryId) : null,
      city: cityId ? String(cityId) : null
    };
    return entity;
  }
});
exports.hotelShortSchema = hotelShortSchema;
var offerSchema = new _normalizr.schema.Entity('offer', {}, {
  idAttribute: function idAttribute(_ref8) {
    var i = _ref8.i;
    return String(i);
  },
  processStrategy: function processStrategy(input) {
    var id = input.i,
        date = input.d,
        length = input.l,
        adults = input.a,
        children = input.h,
        food = input.f,
        departure = input.c,
        includes = input.o,
        operator = input.oi,
        roomName = input.r,
        roomId = input.ri,
        roomType = input.y,
        promo = input.s,
        stopsale = input.ss,
        transport = input.t,
        flights = input.to,
        code = input.vid;
    var entity = {
      id: String(id),
      code: code,
      date: date,
      days: length,
      nights: length - 1,
      adults: adults,
      children: children,
      food: food,
      departure: departure,
      includes: includes,
      requirements: ['visa', 'insurance', 'transfer'].filter(function (s) {
        return includes.indexOf(s) === -1;
      }),
      operator: operator,
      room: {
        id: roomId,
        name: roomName,
        type: roomType
      },
      price: (0, _parsers.parsePrice)(input),
      stopsale: stopsale,
      transport: transport,
      flights: flights ? (0, _parsers.parseFlights)(flights) : {},
      promo: promo
    };
    return entity;
  }
});
var fullOfferSchema = new _normalizr.schema.Entity('offer', {}, {
  idAttribute: function idAttribute(_ref9) {
    var id = _ref9.id;
    return String(id);
  },
  processStrategy: function processStrategy(input) {
    var id = input.id,
        date = input.checkIn,
        length = input.length,
        adults = input.adult,
        children = input.child,
        food = input.food,
        departure = input.fromCity,
        includes = input.tourOptions,
        operator = input.operatorId,
        roomName = input.room,
        roomId = input.roomId,
        roomType = input.type,
        promo = input.tourStatus,
        stopsale = input.stopSale,
        transport = input.transport,
        flights = input.transportOptions,
        code = input.variantId;
    var entity = {
      id: String(id),
      code: code,
      date: date,
      days: length,
      nights: length - 1,
      adults: adults,
      children: children,
      food: food,
      departure: departure,
      includes: includes,
      requirements: ['visa', 'insurance', 'transfer'].filter(function (s) {
        return includes.indexOf(s) === -1;
      }),
      operator: operator,
      room: {
        id: roomId,
        name: roomName,
        type: roomType
      },
      price: (0, _parsers.parsePrice)(input),
      stopsale: stopsale,
      transport: transport,
      flights: flights ? (0, _parsers.parseFlights)(flights) : {},
      promo: promo
    };
    return entity;
  }
});
exports.fullOfferSchema = fullOfferSchema;
var hotelSchema = new _normalizr.schema.Entity('hotel', {
  offers: [offerSchema]
}, {
  idAttribute: function idAttribute(_ref10) {
    var i = _ref10.i;
    return String(i);
  },
  processStrategy: function processStrategy(input) {
    var i = input.i,
        a = input.a,
        stars = input.s,
        price = input.p,
        r = input.r,
        v = input.v,
        code = input.h,
        n = input.n,
        c = input.c,
        t = input.t,
        _input$g = input.g,
        g = _input$g === void 0 ? {} : _input$g,
        _input$e = input.e,
        e = _input$e === void 0 ? {} : _input$e,
        photos = input.f,
        offers = input.offers;
    var entity = {
      id: String(i),
      name: n,
      code: code,
      city: (0, _parsers.parseHotelGeo)(c),
      country: (0, _parsers.parseHotelGeo)(t),
      stars: Number(_typeof(stars) === 'object' ? stars.n.replace(/\D/, '') : stars),
      rating: !Number.isNaN(Number(r)) ? Number(r) : null,
      reviews: !Number.isNaN(Number(v)) ? Number(v) : null,
      services: Array.isArray(e) ? e : Object.values(e).reduce(function (services, group) {
        return [].concat(_toConsumableArray(services), _toConsumableArray(Object.keys(group)));
      }, []),
      photos: photos ? Array.isArray(photos) ? photos : [photos] : [],
      price: (0, _parsers.parsePrice)(price),
      location: (0, _parsers.parseLocation)(g),
      updated: _typeof(price) === 'object' && 'up' in price ? price.up : null,
      offers: offers,
      description: a
    };

    if ('o' in input) {
      var nm = input.nm,
          _input$o = input.o,
          rooms = _input$o.r,
          description = _input$o.dc,
          beachDescription = _input$o.b,
          beachServices = _input$o.bs,
          sportDescription = _input$o.s,
          sportServices = _input$o.ss,
          hotelDescription = _input$o.fh,
          hotelServices = _input$o.hs,
          childDescription = _input$o.c,
          childServices = _input$o.cs,
          roomDescription = _input$o.ds,
          locationDescription = _input$o.di,
          turpravdaRating = input.vs,
          _input$ad = input.ad;
      _input$ad = _input$ad === void 0 ? {} : _input$ad;
      var address = _input$ad.a,
          email = _input$ad.ml,
          website = _input$ad.u,
          phone = _input$ad.ph;
      var roomServices = 'r' in e ? Object.entries(e.r).reduce(function (services, _ref11) {
        var _ref12 = _slicedToArray(_ref11, 2),
            service = _ref12[0],
            status = _ref12[1].id;

        return _objectSpread({}, services, _defineProperty({}, service, status));
      }, {}) : {};
      Object.assign(entity, {
        name: nm,
        description: description,
        info: {
          beach: {
            description: beachDescription,
            services: _typeof(beachServices) === 'object' ? beachServices : {}
          },
          sport: {
            description: sportDescription,
            services: _typeof(sportServices) === 'object' ? sportServices : {}
          },
          hotel: {
            description: hotelDescription,
            services: _typeof(hotelServices) === 'object' ? hotelServices : {}
          },
          child: {
            description: childDescription,
            services: _typeof(childServices) === 'object' ? childServices : {}
          },
          room: {
            description: roomDescription,
            services: _typeof(roomServices) === 'object' ? roomServices : {}
          },
          location: {
            description: locationDescription
          }
        },
        rooms: rooms,
        contacts: {
          address: address,
          email: email,
          website: website,
          phone: phone
        },
        turpravdaRating: Object.values(turpravdaRating)
      });
    }

    return entity;
  }
});
exports.hotelSchema = hotelSchema;
var geoSchema = new _normalizr.schema.Union({
  country: countrySchema,
  city: citySchema,
  hotel: hotelShortSchema
}, 'type');
exports.geoSchema = geoSchema;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotelSchema = exports.hotelSimilarSchema = exports.hotelShortSchema = void 0;

var _normalizr = require("normalizr");

var _parsers = require("../parsers");

var _offerSchema = require("./offerSchema");

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

var hotelShortSchema = new _normalizr.schema.Entity('hotel', {}, {
  idAttribute: function idAttribute(_ref) {
    var id = _ref.id;
    return String(id);
  },
  processStrategy: function processStrategy(input) {
    var id = input.id,
        stars = input.stars,
        rating = input.rating,
        countryId = input.countryId,
        cityId = input.cityId,
        name = input.name,
        value = input.value,
        image = input.image,
        reviews = input.reviews,
        services = input.services;
    var entity = {
      id: String(id),
      name: value ? value : name,
      price: (0, _parsers.parsePrice)(input),
      stars: (0, _parsers.parseStars)(stars),
      rating: Number(rating),
      reviews: Number(reviews),
      photos: image ? [image] : [],
      location: (0, _parsers.parseLocation)(input),
      country: countryId ? String(countryId) : null,
      city: cityId ? String(cityId) : null,
      services: services ? services.split(',') : null
    };
    return entity;
  }
});
exports.hotelShortSchema = hotelShortSchema;
var hotelSimilarSchema = new _normalizr.schema.Entity('hotel', {}, {
  idAttribute: function idAttribute(_ref2) {
    var id = _ref2.id;
    return String(id);
  },
  processStrategy: function processStrategy(input) {
    var id = input.id,
        stars = input.stars,
        code = input.code,
        rating = input.rating,
        offer = input.offer,
        name = input.name,
        value = input.value,
        image = input.image,
        reviewsCount = input.reviewsCount,
        similar = input.similar;
    var offerId = offer.offerId,
        date = offer.date,
        length = offer.length,
        food = offer.food,
        transport = offer.transport,
        link = offer.link;
    var entity = {
      id: String(id),
      name: value ? value : name,
      code: code,
      stars: (0, _parsers.parseStars)(stars),
      rating: Number(rating),
      reviews: Number(reviewsCount),
      photos: image ? [image] : [],
      location: (0, _parsers.parseLocation)(input),
      country: (0, _parsers.parseCountry)(input),
      city: (0, _parsers.parseCity)(input),
      weight: similar,
      offer: {
        id: offerId,
        price: (0, _parsers.parsePrice)(offer),
        date: date,
        days: Number(length),
        nights: Number(length) - 1,
        food: food,
        transport: transport,
        link: link
      }
    };
    return entity;
  }
});
exports.hotelSimilarSchema = hotelSimilarSchema;
var hotelSchema = new _normalizr.schema.Entity('hotel', {
  offers: [_offerSchema.offerSchema]
}, {
  idAttribute: function idAttribute(_ref3) {
    var i = _ref3.i;
    return String(i);
  },
  processStrategy: function processStrategy(input) {
    var area = input.area,
        i = input.i,
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
        videos = input.vh,
        _input$offers = input.offers,
        offers = _input$offers === void 0 ? [] : _input$offers;
    var entity = {
      id: String(i),
      name: n,
      code: code,
      city: (0, _parsers.parseHotelGeo)(c),
      country: (0, _parsers.parseHotelGeo)(t),
      stars: Boolean(stars) ? _typeof(stars) === 'object' ? (0, _parsers.parseStars)(stars.n) : (0, _parsers.parseStars)(stars) : null,
      rating: !Number.isNaN(Number(r)) ? Number(r) : null,
      reviews: !Number.isNaN(Number(v)) ? Number(v) : null,
      services: Array.isArray(e) ? e : Object.values(e).reduce(function (services, group) {
        return [].concat(_toConsumableArray(services), _toConsumableArray(Object.keys(group)));
      }, []),
      photos: photos ? Array.isArray(photos) ? photos : [photos] : [],
      videos: (0, _parsers.parseHotelVideos)(videos),
      price: (0, _parsers.parsePrice)(price),
      location: (0, _parsers.parseLocation)(g),
      updated: _typeof(price) === 'object' && 'up' in price ? price.up : null,
      offers: offers,
      area: area ? Number(area) : null,
      description: a
    };

    if ('o' in input) {
      var nm = input.nm,
          _input$o = input.o,
          _input$o$r = _input$o.r,
          rooms = _input$o$r === void 0 ? [] : _input$o$r,
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
      var roomServices = 'r' in e ? Object.entries(e.r).reduce(function (services, _ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            service = _ref5[0],
            _ref5$ = _ref5[1],
            status = _ref5$.id,
            _ref5$$all = _ref5$.all,
            all = _ref5$$all === void 0 ? false : _ref5$$all;

        return _objectSpread({}, services, _defineProperty({}, service, status ? status : all ? 'all' : 'not-for-all'));
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
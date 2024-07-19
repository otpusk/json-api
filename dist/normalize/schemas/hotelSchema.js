"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotelSimilarSchema = exports.hotelShortSchema = exports.hotelSchema = exports.hotelNextSchema = void 0;
var _normalizr = require("normalizr");
var _parsers = require("../parsers");
var _offerSchema = require("./offerSchema");
var _fn = require("../../fn");
<<<<<<< HEAD
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
=======
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
>>>>>>> task-45137
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable complexity */ // Core
// Instruments
var hotelShortSchema = exports.hotelShortSchema = new _normalizr.schema.Entity('hotel', {}, {
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
      code = input.code,
      name = input.name,
      value = input.value,
      image = input.image,
      reviews = input.reviews,
      services = input.services,
      secondaryStars = input.starsAdd;
    var entity = _objectSpread(_objectSpread({}, input), {}, {
      id: String(id),
      name: value ? value : name,
      price: (0, _parsers.parsePrice)(input),
      stars: (0, _parsers.parseStars)(stars),
      rating: Number(rating),
      reviews: Number(reviews),
      photos: image ? [image] : [],
      location: (0, _parsers.parseLocation)(input),
      country: countryId ? String(countryId) : null,
      city: cityId,
      services: services ? services.split(',') : null,
      type: 'hotel',
      hotelCode: code,
      secondaryStars: (0, _parsers.parseSecondaryStars)(stars, secondaryStars)
    });
    return entity;
  }
});
var hotelSimilarSchema = exports.hotelSimilarSchema = new _normalizr.schema.Entity('hotel', {}, {
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
        price: (0, _parsers.parseFullOfferPrice)(offer),
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
var hotelSchema = exports.hotelSchema = new _normalizr.schema.Entity('hotel', {
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
      secondaryStars = input.ss,
      _input$p = input.p,
      price = _input$p === void 0 ? {} : _input$p,
      r = input.r,
      v = input.v,
      code = input.h,
      alternativeNames = input.hru,
      n = input.n,
      _input$c = input.c,
      c = _input$c === void 0 ? {} : _input$c,
      t = input.t,
      _input$g = input.g,
      g = _input$g === void 0 ? {} : _input$g,
      _input$e = input.e,
      e = _input$e === void 0 ? {} : _input$e,
      _input$rb = input.rb,
      rb = _input$rb === void 0 ? {} : _input$rb,
      _input$tp = input.tp,
      tp = _input$tp === void 0 ? {} : _input$tp,
      photos = input.f,
      photosCount = input.fc,
      photosByCategory = input.fh,
      _input$m = input.m,
      m = _input$m === void 0 ? {} : _input$m,
      videos = input.vh,
      _input$offers = input.offers,
      offers = _input$offers === void 0 ? [] : _input$offers,
      _input$watermark = input.watermark,
      watermark = _input$watermark === void 0 ? null : _input$watermark,
      x = input.x,
      _input$rt = input.rt,
      rt = _input$rt === void 0 ? {} : _input$rt,
      searchCurrency = input.sc,
      ds = input.ds;
    var defaultPhoto = '00/03/85/49/3854941.jpg';
    var entity = {
      id: String(i),
      name: n,
      code: code,
      alternativeNames: alternativeNames ? alternativeNames.split(',') : [],
      city: c.p ? _objectSpread(_objectSpread({}, (0, _parsers.parseHotelGeo)(c)), {}, {
        namePr: c.p
      }) : (0, _parsers.parseHotelGeo)(c),
      district: ds ? (0, _parsers.parseHotelGeo)(ds) : undefined,
      country: (0, _parsers.parseHotelGeo)(t),
      stars: stars ? _typeof(stars) === 'object' ? (0, _parsers.parseStars)(stars.n) : (0, _parsers.parseStars)(stars) : null,
      rating: !Number.isNaN(Number(r)) ? Number(r) : null,
      reviews: !Number.isNaN(Number(v)) ? Number(v) : null,
      services: Array.isArray(e) ? e : Object.values(e).reduce(function (services, group) {
        return [].concat(_toConsumableArray(services), _toConsumableArray(Object.keys(group)));
      }, []),
      photos: photos ? Array.isArray(photos) ? photos.length ? photos : [defaultPhoto] : [photos] : [defaultPhoto],
      photosByCategory: Array.isArray(photosByCategory) ? photosByCategory.map(function (_ref4) {
        var category = _ref4.category,
          catId = _ref4.catId,
          src = _ref4.src;
        return {
          photo: src,
          category: catId ? {
            id: catId,
            name: category
          } : undefined
        };
      }) : [],
      photosCount: photosCount,
      videos: (0, _parsers.parseHotelVideos)(videos),
      sourceRatings: Object.values(rb),
      hotelTypes: Object.keys(tp),
      price: (0, _parsers.parseOfferPrice)(price),
      location: (0, _parsers.parseLocation)(g),
      updated: _typeof(price) === 'object' && 'up' in price ? price.up : null,
      badges: (0, _parsers.parseBadges)(m),
      offers: offers,
      area: area ? Number(area) : null,
      description: a,
      watermark: watermark,
      averageRating: x,
      restType: rt,
      searchCurrency: searchCurrency
    };
    var optional = {
      secondaryStars: (0, _parsers.parseSecondaryStars)(_typeof(stars) === 'object' ? stars.n : stars, _typeof(secondaryStars) === 'object' ? secondaryStars.n : secondaryStars)
    };
    entity = (0, _fn.mergeDefinedObjectValues)(entity, optional);
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
        featuresServices = _input$o.ts,
        turpravdaRating = input.vs,
        _input$ad = input.ad,
        _input$ad2 = _input$ad === void 0 ? {} : _input$ad,
        address = _input$ad2.a,
        email = _input$ad2.ml,
        website = _input$ad2.u,
        phone = _input$ad2.ph;
      var roomServices = 'r' in e ? Object.entries(e.r).reduce(function (services, _ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          service = _ref6[0],
          _ref6$ = _ref6[1],
          status = _ref6$.id,
          _ref6$$all = _ref6$.all,
          all = _ref6$$all === void 0 ? false : _ref6$$all;
        return _objectSpread(_objectSpread({}, services), {}, _defineProperty({}, service, status ? status : all ? 'all' : 'not-for-all'));
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
          },
          feature: {
            services: _typeof(featuresServices) === 'object' ? featuresServices : {}
          }
        },
        rooms: rooms,
        contacts: {
          address: address,
          email: email,
          website: website,
          phone: phone
        },
        turpravdaRating: turpravdaRating ? Object.values(turpravdaRating) : []
      });
    }
    return entity;
  }
});
var hotelNextSchema = exports.hotelNextSchema = new _normalizr.schema.Entity('hotel', {}, {
  idAttribute: function idAttribute(_ref7) {
    var i = _ref7.i;
    return String(i);
  },
  processStrategy: function processStrategy(input) {
    var area = input.area,
      i = input.i,
      a = input.a,
      stars = input.s,
      secondaryStars = input.ss,
      price = input.p,
      r = input.r,
      v = input.v,
      code = input.h,
      alternativeNames = input.hru,
      n = input.n,
      _input$c2 = input.c,
      c = _input$c2 === void 0 ? {} : _input$c2,
      t = input.t,
      _input$g2 = input.g,
      g = _input$g2 === void 0 ? {} : _input$g2,
      _input$e2 = input.e,
      e = _input$e2 === void 0 ? {} : _input$e2,
      _input$rb2 = input.rb,
      rb = _input$rb2 === void 0 ? {} : _input$rb2,
      _input$tp2 = input.tp,
      tp = _input$tp2 === void 0 ? {} : _input$tp2,
      photos = input.f,
      photosCount = input.fc,
      _input$m2 = input.m,
      m = _input$m2 === void 0 ? {} : _input$m2,
      videos = input.vh,
      _input$offers2 = input.offers,
      offers = _input$offers2 === void 0 ? [] : _input$offers2,
      _input$watermark2 = input.watermark,
      watermark = _input$watermark2 === void 0 ? null : _input$watermark2,
      x = input.x,
      _input$rt2 = input.rt,
      rt = _input$rt2 === void 0 ? {} : _input$rt2,
      ds = input.ds;
    var defaultPhoto = '00/03/85/49/3854941.jpg';
    var entity = {
      id: String(i),
      name: n,
      code: code,
      alternativeNames: alternativeNames ? alternativeNames.split(',') : [],
      city: c.p ? _objectSpread(_objectSpread({}, (0, _parsers.parseHotelGeo)(c)), {}, {
        namePr: c.p
      }) : (0, _parsers.parseHotelGeo)(c),
      district: ds ? (0, _parsers.parseHotelGeo)(ds) : undefined,
      country: (0, _parsers.parseHotelGeo)(t),
      stars: stars ? _typeof(stars) === 'object' ? (0, _parsers.parseStars)(stars.n) : (0, _parsers.parseStars)(stars) : null,
      rating: !Number.isNaN(Number(r)) ? Number(r) : null,
      reviews: !Number.isNaN(Number(v)) ? Number(v) : null,
      services: Array.isArray(e) ? e : Object.values(e).reduce(function (services, group) {
        return [].concat(_toConsumableArray(services), _toConsumableArray(Object.keys(group)));
      }, []),
      photos: photos ? Array.isArray(photos) ? photos.length ? photos : [defaultPhoto] : [photos] : [defaultPhoto],
      photosCount: photosCount,
      videos: (0, _parsers.parseHotelVideos)(videos),
      sourceRatings: Object.values(rb),
      hotelTypes: Object.keys(tp),
      location: (0, _parsers.parseLocation)(g),
      updated: _typeof(price) === 'object' && 'up' in price ? price.up : null,
      badges: (0, _parsers.parseBadges)(m),
      offers: offers,
      area: area ? Number(area) : null,
      description: a,
      watermark: watermark,
      averageRating: x,
      restType: rt
    };
    var optional = {
      secondaryStars: secondaryStars ? Number(secondaryStars) : undefined
    };
    entity = (0, _fn.mergeDefinedObjectValues)(entity, optional);
    if ('o' in input) {
      var nm = input.nm,
        _input$o2 = input.o,
        _input$o2$r = _input$o2.r,
        rooms = _input$o2$r === void 0 ? [] : _input$o2$r,
        description = _input$o2.dc,
        beachDescription = _input$o2.b,
        beachServices = _input$o2.bs,
        sportDescription = _input$o2.s,
        sportServices = _input$o2.ss,
        hotelDescription = _input$o2.fh,
        hotelServices = _input$o2.hs,
        childDescription = _input$o2.c,
        childServices = _input$o2.cs,
        roomDescription = _input$o2.ds,
        locationDescription = _input$o2.di,
        featuresServices = _input$o2.ts,
        turpravdaRating = input.vs,
        _input$ad3 = input.ad,
        _input$ad4 = _input$ad3 === void 0 ? {} : _input$ad3,
        address = _input$ad4.a,
        email = _input$ad4.ml,
        website = _input$ad4.u,
        phone = _input$ad4.ph;
      var roomServices = 'r' in e ? Object.entries(e.r).reduce(function (services, _ref8) {
        var _ref9 = _slicedToArray(_ref8, 2),
          service = _ref9[0],
          _ref9$ = _ref9[1],
          status = _ref9$.id,
          _ref9$$all = _ref9$.all,
          all = _ref9$$all === void 0 ? false : _ref9$$all;
        return _objectSpread(_objectSpread({}, services), {}, _defineProperty({}, service, status ? status : all ? 'all' : 'not-for-all'));
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
          },
          feature: {
            services: _typeof(featuresServices) === 'object' ? featuresServices : {}
          }
        },
        rooms: rooms,
        contacts: {
          address: address,
          email: email,
          website: website,
          phone: phone
        },
        turpravdaRating: turpravdaRating ? Object.values(turpravdaRating) : []
      });
    }
    return entity;
  }
});
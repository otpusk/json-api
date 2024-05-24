"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSubOperator = exports.parseStars = exports.parseSecondaryStars = exports.parseSearchMeta = exports.parsePromo = exports.parsePrice = exports.parsePeople = exports.parseOfferPrice = exports.parseNames = exports.parseLocation = exports.parseHotelVideos = exports.parseHotelGeo = exports.parseFullOfferPrice = exports.parseFlights = exports.parseDiscountPrice = exports.parseCountry = exports.parseCity = exports.parseChildrenAges = exports.parseBadges = void 0;
var _immutable = require("immutable");
var _ramda = require("ramda");
var _fn = require("../fn");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var parsePrice = exports.parsePrice = function parsePrice(input) {
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
    rateByNBU = input.ur,
    rateByOperator = input.uto;
  var currencyRate = rateByOperator || rateByNBU;
  var convertPriceWithoutDiscount = po ? po * currencyRate : pl;
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
var parseOfferPrice = exports.parseOfferPrice = function parseOfferPrice(input) {
  var price = input.p,
    priceLocal = input.pl,
    currency = input.u,
    currencyLocal = input.ul;
  return _defineProperty(_defineProperty({}, currencyLocal, priceLocal), currency, price);
};
var parseFullOfferPrice = exports.parseFullOfferPrice = function parseFullOfferPrice(offer) {
  return _defineProperty(_defineProperty({}, offer.currency, offer.price), offer.currencyLocal, offer.priceLocal);
};
var parseDiscountPrice = exports.parseDiscountPrice = function parseDiscountPrice(input) {
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
  return _defineProperty(_defineProperty({}, originalCurrency, p), "uah", pl);
};
var parseSeats = function parseSeats(seats) {
  switch (seats) {
    case !isNaN(Number(seats)):
      return seats;
    case 'yes':
      return 'Есть';
    case 'many':
      return 'Много';
    case 'few':
      return 'Мало';
    case 'request':
      return 'По запросу';
    case 'no':
      return 'Нет мест';
    default:
      return null;
  }
};
var parsePortDetails = function parsePortDetails(details) {
  return {
    city: {
      id: details.cityId,
      name: details.cityName
    },
    country: {
      id: details.countryId,
      name: details.countryName
    },
    name: details.name,
    timezone: details.timezone
  };
};
var parseFlights = exports.parseFlights = function parseFlights(input) {
  var _input$from = input.from,
    outbound = _input$from === void 0 ? [] : _input$from,
    _input$to = input.to,
    inbound = _input$to === void 0 ? [] : _input$to;
  return (0, _ramda.call)((0, _ramda.pipe)(_ramda.toPairs, (0, _ramda.map)(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
      type = _ref5[0],
      flights = _ref5[1];
    return [type, (0, _ramda.map)((0, _ramda.pipe)((0, _ramda.over)((0, _ramda.lensProp)('seats'), function (seats) {
      return {
        label: parseSeats(seats),
        value: seats
      };
    }), (0, _ramda.over)((0, _ramda.lensProp)('portFrDetails'), (0, _ramda.ifElse)(Boolean, parsePortDetails, (0, _ramda.always)(null))), (0, _ramda.over)((0, _ramda.lensProp)('portToDetails'), (0, _ramda.ifElse)(Boolean, parsePortDetails, (0, _ramda.always)(null)))), flights)];
  }), _ramda.fromPairs), {
    outbound: outbound,
    inbound: inbound
  });
};
var parseLocation = exports.parseLocation = function parseLocation(input) {
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
var parseNames = exports.parseNames = function parseNames(input, prefix) {
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
var parseHotelGeo = exports.parseHotelGeo = function parseHotelGeo(input) {
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
var parseCountry = exports.parseCountry = function parseCountry(input) {
  var id = input.countryId,
    name = input.countryName;
  return {
    id: Number(id),
    name: name,
    names: parseNames(input, 'country')
  };
};
var parseCity = exports.parseCity = function parseCity(input) {
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
var parseStars = exports.parseStars = function parseStars(input) {
  switch (input.toLowerCase()) {
    case 'hv1':
      return 'HV1';
    case 'hv2':
      return 'HV2';
    default:
      return parseInt(String(input).replace(/\D/, ''), 10);
  }
};
var parseSecondaryStars = exports.parseSecondaryStars = function parseSecondaryStars(stars, secondaryStars) {
  var parsedSecondaryStars = secondaryStars ? parseStars(secondaryStars) : undefined;
  if (parsedSecondaryStars) {
    return parseStars(stars) !== parsedSecondaryStars ? parsedSecondaryStars : undefined;
  }
  return undefined;
};
var parseSearchMeta = exports.parseSearchMeta = function parseSearchMeta(input, query) {
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
var parseHotelVideos = exports.parseHotelVideos = function parseHotelVideos(raw) {
  return raw && Array.isArray(raw) ? raw.map(function (_ref7) {
    var thumbnail = _ref7.thumbnail,
      id = _ref7.videoId,
      code = _ref7.code;
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
var parseBadges = exports.parseBadges = function parseBadges(raw) {
  return Object.entries(raw).filter(function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
      badge = _ref9[1];
    return Boolean(badge);
  }).map(function (_ref10) {
    var _ref11 = _slicedToArray(_ref10, 2),
      area = _ref11[0],
      badge = _ref11[1];
    return _objectSpread({
      area: area
    }, badge);
  });
};
var parsePromo = exports.parsePromo = function parsePromo(promo) {
  if (promo) {
    var isHeightPromo = promo.startsWith('!');
    return {
      promo: !isHeightPromo ? promo.trim() : null,
      heightPromo: isHeightPromo ? promo.slice(1) : null
    };
  }
  return {
    promo: promo,
    heightPromo: null
  };
};
var parseChildrenAges = exports.parseChildrenAges = function parseChildrenAges() {
  var ages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return ages.map(function (age) {
    return Math.max.apply(Math, _toConsumableArray(age));
  });
};
var convertStringifyChildren2Array = function convertStringifyChildren2Array(children) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return children ? convertStringifyChildren2Array(children.slice(2), [].concat(_toConsumableArray(result), [children.slice(0, 2)])) : result;
};
var parsePeople = exports.parsePeople = function parsePeople(people) {
  var childAgesArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return {
    adults: Number(people.toString()[0]),
    children: convertStringifyChildren2Array(people.toString().slice(1)).map(function (age) {
      return age.startsWith('0') ? age.slice(1) : age;
    }).map(Number),
    childrenAgesRange: childAgesArray.map(function (range) {
      return {
        from: range[0],
        to: range[1]
      };
    })
  };
};
var parseSubOperator = exports.parseSubOperator = function parseSubOperator(subOperator) {
  return (0, _ramda.call)((0, _ramda.when)(function (data) {
    return !data || (0, _ramda.isEmpty)(data);
  }, function () {
    return {
      code: null,
      name: null
    };
  }), subOperator);
};
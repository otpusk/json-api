"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSubOperator = exports.parsePeople = exports.parseChildrenAges = exports.parsePromo = exports.parseBadges = exports.parseHotelVideos = exports.parseSearchMeta = exports.parseSecondaryStars = exports.parseStars = exports.parseCity = exports.parseCountry = exports.parseHotelGeo = exports.parseNames = exports.parseLocation = exports.parseFlights = exports.parseDiscountPrice = exports.parseFullOfferPrice = exports.parseOfferPrice = exports.parsePrice = void 0;

var _immutable = require("immutable");

var _ramda = require("ramda");

var _fn = require("../fn");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

exports.parsePrice = parsePrice;

var parseOfferPrice = function parseOfferPrice(input) {
  var _ref;

  var price = input.p,
      priceLocal = input.pl,
      currency = input.u,
      currencyLocal = input.ul;
  return _ref = {}, _defineProperty(_ref, currencyLocal, priceLocal), _defineProperty(_ref, currency, price), _ref;
};

exports.parseOfferPrice = parseOfferPrice;

var parseFullOfferPrice = function parseFullOfferPrice(offer) {
  var _ref2;

  return _ref2 = {}, _defineProperty(_ref2, offer.currency, offer.price), _defineProperty(_ref2, offer.currencyLocal, offer.priceLocal), _ref2;
};

exports.parseFullOfferPrice = parseFullOfferPrice;

var parseDiscountPrice = function parseDiscountPrice(input) {
  var _ref3;

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

  return _ref3 = {}, _defineProperty(_ref3, originalCurrency, p), _defineProperty(_ref3, "uah", pl), _ref3;
};

exports.parseDiscountPrice = parseDiscountPrice;

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

var parseFlights = function parseFlights(input) {
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

exports.parseStars = parseStars;

var parseSecondaryStars = function parseSecondaryStars(stars, secondaryStars) {
  var parsedSecondaryStars = secondaryStars ? parseStars(secondaryStars) : undefined;

  if (parsedSecondaryStars) {
    return parseStars(stars) !== parsedSecondaryStars ? parsedSecondaryStars : undefined;
  }

  return undefined;
};

exports.parseSecondaryStars = parseSecondaryStars;

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

exports.parseHotelVideos = parseHotelVideos;

var parseBadges = function parseBadges(raw) {
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

exports.parseBadges = parseBadges;

var parsePromo = function parsePromo(promo) {
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

exports.parsePromo = parsePromo;

var parseChildrenAges = function parseChildrenAges() {
  var ages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return ages.map(function (age) {
    return Math.max.apply(Math, _toConsumableArray(age));
  });
};

exports.parseChildrenAges = parseChildrenAges;

var convertStringifyChildren2Array = function convertStringifyChildren2Array(children) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return children ? convertStringifyChildren2Array(children.slice(2), [].concat(_toConsumableArray(result), [children.slice(0, 2)])) : result;
};

var parsePeople = function parsePeople(people) {
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

exports.parsePeople = parsePeople;

var parseSubOperator = function parseSubOperator(subOperator) {
  return (0, _ramda.call)((0, _ramda.when)(function (data) {
    return !data || (0, _ramda.isEmpty)(data);
  }, function () {
    return {
      code: null,
      name: null
    };
  }), subOperator);
};

exports.parseSubOperator = parseSubOperator;
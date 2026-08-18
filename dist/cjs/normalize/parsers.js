"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleOfBookingPaymentsMapper = exports.parseSubOperator = exports.parseStars = exports.parseSecondaryStars = exports.parseSearchMeta = exports.parsePromo = exports.parsePrice = exports.parsePeople = exports.parseOfferPrice = exports.parseNames = exports.parseLocation = exports.parseHotelVideos = exports.parseHotelGeo = exports.parseFullOfferPrice = exports.parseFlights = exports.parseDiscountPrice = exports.parseCountry = exports.parseCity = exports.parseChildrenAges = exports.parseBadges = exports.extractExternalOperatorData = exports.extractBookingData = exports.descriptionByAIMapper = void 0;
var _immutable = require("immutable");
var _ramda = require("ramda");
var _fn = require("../fn");
const parsePrice = input => {
  const {
    uah,
    p,
    pl,
    priceUah,
    price,
    po,
    minPrice,
    currency,
    pu,
    u,
    c,
    ur: rateByNBU,
    uto: rateByOperator
  } = input;
  const currencyRate = rateByOperator || rateByNBU;
  const convertPriceWithoutDiscount = po ? po * currencyRate : pl;
  const original = po || p || price || minPrice || null;
  const converted = convertPriceWithoutDiscount || uah || typeof c !== 'object' && pu || p || priceUah || null;
  const originalCurrency = u || typeof c !== 'object' && c || pu || currency || null;
  const entity = {};
  const prepareNumber = value => Number(String(value).replace(/[^0-9\.\,]/gi, ''));
  if (original) {
    entity[originalCurrency] = prepareNumber(original);
  }
  if (converted) {
    entity.uah = prepareNumber(converted);
  }
  return entity;
};
exports.parsePrice = parsePrice;
const parseOfferPrice = input => {
  const {
    p: price,
    pl: priceLocal,
    u: currency,
    ul: currencyLocal
  } = input;
  return {
    [currencyLocal]: priceLocal,
    [currency]: price
  };
};
exports.parseOfferPrice = parseOfferPrice;
const parseFullOfferPrice = offer => ({
  [offer.currency]: offer.price,
  [offer.currencyLocal]: offer.priceLocal
});
exports.parseFullOfferPrice = parseFullOfferPrice;
const parseDiscountPrice = input => {
  const {
    po,
    pl,
    p,
    u,
    c,
    pu,
    currency
  } = input;
  const originalCurrency = u || typeof c !== 'object' && c || pu || currency || null;
  if (!po) {
    return null;
  }
  return {
    [originalCurrency]: p,
    uah: pl
  };
};
exports.parseDiscountPrice = parseDiscountPrice;
const parseSeats = seats => {
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
const parsePortDetails = details => ({
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
});
const parseFlights = input => {
  const {
    from: outbound = [],
    to: inbound = []
  } = input;
  return (0, _ramda.call)((0, _ramda.pipe)(_ramda.toPairs, (0, _ramda.map)(_ref => {
    let [type, flights] = _ref;
    return [type, (0, _ramda.map)((0, _ramda.pipe)((0, _ramda.over)((0, _ramda.lensProp)('seats'), seats => ({
      label: parseSeats(seats),
      value: seats
    })), (0, _ramda.over)((0, _ramda.lensProp)('portFrDetails'), (0, _ramda.ifElse)(Boolean, parsePortDetails, (0, _ramda.always)(null))), (0, _ramda.over)((0, _ramda.lensProp)('portToDetails'), (0, _ramda.ifElse)(Boolean, parsePortDetails, (0, _ramda.always)(null))), (0, _ramda.over)((0, _ramda.lensProp)('luggage'), (0, _ramda.ifElse)(_ramda.isNil, (0, _ramda.always)({}), _ramda.identity))), flights)];
  }), _ramda.fromPairs), {
    outbound,
    inbound
  });
};
exports.parseFlights = parseFlights;
const parseLocation = input => {
  const {
    lat,
    a,
    lng,
    long,
    o,
    zoom,
    z
  } = input;
  const latitude = parseFloat(a || lat);
  const longitude = parseFloat(o || lng || long);
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
const parseNames = (input, prefix) => {
  const cases = (0, _immutable.Map)({
    long: 'name',
    nm: 'value',
    vm: 'namevn',
    rd: 'namerd',
    pr: 'namepr'
  });
  const props = (0, _immutable.Map)(input).mapKeys(k => k.toLowerCase());
  return cases.map(prop => {
    return props.get(`${prefix}${prop}`, props.get(prop, props.get(prop.replace('name', ''), '')));
  }).filter(value => Boolean(value)).toJS();
};
exports.parseNames = parseNames;
const parseHotelGeo = input => {
  const {
    i: id,
    n: name,
    c: code
  } = input;
  const geo = {
    id,
    name,
    code,
    names: parseNames(input)
  };
  const optional = {
    isoCode: input.cd || input.cid
  };
  return (0, _fn.mergeDefinedObjectValues)(geo, optional);
};
exports.parseHotelGeo = parseHotelGeo;
const parseCountry = input => {
  const {
    countryId: id,
    countryName: name
  } = input;
  return {
    id: Number(id),
    name,
    names: parseNames(input, 'country')
  };
};
exports.parseCountry = parseCountry;
const parseCity = input => {
  const {
    cityId: id,
    cityName,
    resortName,
    cityCode: code = null
  } = input;
  return {
    id: Number(id) || null,
    name: cityName || resortName,
    code,
    names: parseNames(input, 'city')
  };
};
exports.parseCity = parseCity;
const parseStars = input => {
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
const parseSecondaryStars = (stars, secondaryStars) => {
  const parsedSecondaryStars = secondaryStars ? parseStars(secondaryStars) : undefined;
  if (parsedSecondaryStars) {
    return parseStars(stars) !== parsedSecondaryStars ? parsedSecondaryStars : undefined;
  }
  return undefined;
};
exports.parseSecondaryStars = parseSecondaryStars;
const parseSearchMeta = (input, query) => {
  const {
    searchOperators = {},
    originalOperators = {},
    operators = {},
    stars = {},
    originalStars = {}
  } = input;
  const currency = 'currency' in query ? query.currency : 'original';
  const pricesMerger = (converted, original) => ({
    uah: converted,
    [currency]: original
  });
  const categoriesPrices = (0, _immutable.mergeWith)(pricesMerger, stars, originalStars);
  const operatorsPrices = (0, _immutable.mergeWith)(pricesMerger, operators, originalOperators);
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
const parseHotelVideos = raw => {
  return raw && Array.isArray(raw) ? raw.map(_ref2 => {
    let {
      thumbnail,
      videoId: id,
      code
    } = _ref2;
    const getProvider = iframe => {
      if (iframe.match(new RegExp('(youtu.|youtube.)'))) {
        return 'youtube';
      }
      if (iframe.includes('vimeo.')) {
        return 'vimeo';
      }
      return null;
    };
    return {
      id,
      provider: getProvider(code),
      thumbnail
    };
  }) : [];
};
exports.parseHotelVideos = parseHotelVideos;
const parseBadges = raw => {
  return Object.entries(raw).filter(_ref3 => {
    let [, badge] = _ref3;
    return Boolean(badge);
  }).map(_ref4 => {
    let [area, badge] = _ref4;
    return {
      area,
      ...badge
    };
  });
};
exports.parseBadges = parseBadges;
const parsePromo = promo => {
  if (promo) {
    const isHeightPromo = promo.startsWith('!');
    return {
      promo: !isHeightPromo ? promo.trim() : null,
      heightPromo: isHeightPromo ? promo.slice(1) : null
    };
  }
  return {
    promo,
    heightPromo: null
  };
};
exports.parsePromo = parsePromo;
const parseChildrenAges = function () {
  let ages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return ages.map(age => Math.max(...age));
};
exports.parseChildrenAges = parseChildrenAges;
const convertStringifyChildren2Array = function (children) {
  let result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return children ? convertStringifyChildren2Array(children.slice(2), [...result, children.slice(0, 2)]) : result;
};
const parsePeople = function (people) {
  let childAgesArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return {
    adults: Number(people.toString()[0]),
    children: convertStringifyChildren2Array(people.toString().slice(1)).map(age => age.startsWith('0') ? age.slice(1) : age).map(Number),
    childrenAgesRange: childAgesArray.map(range => ({
      from: range[0],
      to: range[1]
    }))
  };
};
exports.parsePeople = parsePeople;
const parseSubOperator = subOperator => (0, _ramda.call)((0, _ramda.when)(data => !data || (0, _ramda.isEmpty)(data), () => ({
  code: null,
  name: null
})), subOperator);
exports.parseSubOperator = parseSubOperator;
const extractBookingData = exports.extractBookingData = (0, _ramda.applySpec)({
  endDate: (0, _ramda.prop)('date'),
  allow: (0, _ramda.pipe)((0, _ramda.prop)('possible'), Boolean)
});
const extractExternalOperatorData = exports.extractExternalOperatorData = (0, _ramda.ifElse)(Boolean, (0, _ramda.applySpec)({
  subOperatorName: (0, _ramda.propOr)('', 'subOperator'),
  subHotelID: (0, _ramda.prop)('sourceHotelId')
}), (0, _ramda.always)({}));
const scheduleOfBookingPaymentsMapper = exports.scheduleOfBookingPaymentsMapper = (0, _ramda.map)((0, _ramda.applySpec)({
  currency: (0, _ramda.prop)('currency'),
  currencyOriginal: (0, _ramda.prop)('currency_original'),
  price: _ref5 => {
    let {
      currency,
      price,
      currency_original: currencyOriginal,
      price_original: priceOriginal
    } = _ref5;
    return {
      [currency]: price,
      [currencyOriginal]: priceOriginal
    };
  },
  dueDate: (0, _ramda.prop)('required_till'),
  type: (0, _ramda.prop)('type'),
  percent: (0, _ramda.prop)('percent'),
  strictPayment: (0, _ramda.propOr)(false, 'strictPayment')
}));
const CATEGORIES_SEPARATOR = '###';
const CONTENT_ITEM_SEPARATOR = /\r?\n/;
const LIST_ITEM_PREFIX = '- ';
const prepareTitle = (0, _ramda.pipe)(_ramda.head, _ramda.trim);
const prepareContent = (0, _ramda.pipe)(_ramda.tail, (0, _ramda.ifElse)((0, _ramda.all)((0, _ramda.startsWith)(LIST_ITEM_PREFIX)), (0, _ramda.map)((0, _ramda.slice)(2, Infinity)), (0, _ramda.join)(' ')));
const descriptionByAIMapper = exports.descriptionByAIMapper = (0, _ramda.pipe)((0, _ramda.split)(CATEGORIES_SEPARATOR), (0, _ramda.filter)(Boolean), (0, _ramda.map)((0, _ramda.pipe)((0, _ramda.split)(CONTENT_ITEM_SEPARATOR), (0, _ramda.filter)(Boolean), (0, _ramda.applySpec)({
  title: prepareTitle,
  content: prepareContent
}))));
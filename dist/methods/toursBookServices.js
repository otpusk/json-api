"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursBookServices = getToursBookServices;
exports.prepareBookingServices = void 0;
var _ramda = require("ramda");
var _fn = require("../fn");
var _config = require("../config");
var _static = require("../static");
const injectPriceByCurrency = (0, _ramda.curryN)(3, (currency, price, object) => {
  if (currency && typeof price === 'number') {
    object[currency] = price;
  }
  return object;
});
const normalizeBookServices = services => (0, _ramda.map)(_ref => {
  let {
    currency,
    currency_original,
    price,
    price_original,
    perBooking,
    number,
    ...service
  } = _ref;
  return (0, _ramda.mergeAll)([service, {
    price: (0, _ramda.call)((0, _ramda.pipe)(injectPriceByCurrency(currency, price), injectPriceByCurrency(currency_original, price_original)), {}),
    isGlobalService: Boolean(perBooking),
    enabledTourists: number
  }]);
}, services);
const getWeightOfBookingService = service => {
  const BASE_WEIGHT = 100;
  const WEIGHT_STEP = 10;
  const weightOfType = (0, _ramda.call)((0, _ramda.cond)([[(0, _ramda.propEq)(_static.TOUR_OPTIONS.LUGGAGE, 'type'), (0, _ramda.always)(BASE_WEIGHT)], [(0, _ramda.propEq)(_static.TOUR_OPTIONS.INSURANCE, 'type'), (0, _ramda.always)(BASE_WEIGHT - WEIGHT_STEP)], [(0, _ramda.propEq)(_static.TOUR_OPTIONS.TRANSFER, 'type'), (0, _ramda.always)(BASE_WEIGHT - WEIGHT_STEP * 2)], [(0, _ramda.propEq)(_static.TOUR_OPTIONS.PRESTIGE, 'type'), (0, _ramda.always)(BASE_WEIGHT - WEIGHT_STEP * 3)], [(0, _ramda.propEq)(_static.TOUR_OPTIONS.EXCURSION, 'type'), (0, _ramda.always)(BASE_WEIGHT - WEIGHT_STEP * 4)], [(0, _ramda.propEq)(_static.TOUR_OPTIONS.ELSE, 'type'), (0, _ramda.always)(BASE_WEIGHT - WEIGHT_STEP * 5)], [_ramda.T, (0, _ramda.always)(BASE_WEIGHT - WEIGHT_STEP * 2)]]), service);
  const weightOfPrice = (0, _ramda.isEmpty)(service.price) ? 0 : 1;
  return (0, _ramda.sum)([weightOfType, weightOfPrice]);
};
const sortBookingServices = (0, _ramda.sort)((a, b) => {
  return getWeightOfBookingService(b) - getWeightOfBookingService(a);
});
const prepareBookingServices = services => (0, _ramda.call)((0, _ramda.pipe)(normalizeBookServices, sortBookingServices), services);
exports.prepareBookingServices = prepareBookingServices;
async function getToursBookServices(tokenAsQuery, query) {
  const {
    services
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.bookServices,
    query: (0, _ramda.mergeAll)([tokenAsQuery, query])
  });
  return prepareBookingServices(services);
}
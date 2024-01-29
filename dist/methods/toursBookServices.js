"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursBookServices = getToursBookServices;

var _ramda = require("ramda");

var _fn = require("../fn");

var _config = require("../config");

var _static = require("../static");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var injectPriceByCurrency = (0, _ramda.curryN)(3, function (currency, price, object) {
  if (currency && typeof price === 'number') {
    object[currency] = price;
  }

  return object;
});

var normalizeBookServices = function normalizeBookServices(services) {
  return (0, _ramda.map)(function (_ref) {
    var currency = _ref.currency,
        currency_original = _ref.currency_original,
        price = _ref.price,
        price_original = _ref.price_original,
        service = _objectWithoutProperties(_ref, ["currency", "currency_original", "price", "price_original"]);

    return (0, _ramda.mergeAll)([service, {
      price: (0, _ramda.call)((0, _ramda.pipe)(injectPriceByCurrency(currency, price), injectPriceByCurrency(currency_original, price_original)), {})
    }]);
  }, services);
};

var getWeightOfBookingService = function getWeightOfBookingService(service) {
  var BASE_WEIGHT = 100;
  var WEIGHT_STEP = 10;
  var weightOfType = (0, _ramda.call)((0, _ramda.cond)([[(0, _ramda.propEq)(_static.TOUR_OPTIONS.LUGGAGE, 'type'), (0, _ramda.always)(BASE_WEIGHT)], [(0, _ramda.propEq)(_static.TOUR_OPTIONS.INSURANCE, 'type'), (0, _ramda.always)(BASE_WEIGHT - WEIGHT_STEP)], [_ramda.T, (0, _ramda.always)(BASE_WEIGHT - WEIGHT_STEP * 2)]]), service);
  var weightOfPrice = (0, _ramda.isEmpty)(service.price) ? 0 : 1;
  return (0, _ramda.sum)([weightOfType, weightOfPrice]);
};

var sortBookingServices = (0, _ramda.sort)(function (a, b) {
  return getWeightOfBookingService(b) - getWeightOfBookingService(a);
});

function getToursBookServices(_x, _x2) {
  return _getToursBookServices.apply(this, arguments);
}

function _getToursBookServices() {
  _getToursBookServices = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(tokenAsQuery, query) {
    var _yield$makeCall, services;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fn.makeCall)({
              endpoint: _config.ENDPOINTS.bookServices,
              query: (0, _ramda.mergeAll)([tokenAsQuery, query])
            });

          case 2:
            _yield$makeCall = _context.sent;
            services = _yield$makeCall.services;
            return _context.abrupt("return", (0, _ramda.call)((0, _ramda.pipe)(normalizeBookServices, sortBookingServices), services));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursBookServices.apply(this, arguments);
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursGraph = getToursGraph;

var _moment = _interopRequireDefault(require("moment"));

var _immutable = require("immutable");

var R = _interopRequireWildcard(require("ramda"));

var _fn = require("../fn");

var _config = require("../config");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var parsePrice = function parsePrice(_ref) {
  var currency = _ref.c,
      priceByCurrency = _ref.p,
      uahPrice = _ref.pu;
  return _objectSpread(_defineProperty({}, currency, priceByCurrency), uahPrice ? {
    uah: uahPrice
  } : {});
};

function getToursGraph(_x) {
  return _getToursGraph.apply(this, arguments);
}

function _getToursGraph() {
  _getToursGraph = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
    var options,
        methodVersion,
        _yield$makeCall,
        denormalizedDays,
        start,
        end,
        _options$currency,
        currency,
        points,
        daysWithPrice,
        peak,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            methodVersion = _args.length > 2 ? _args[2] : undefined;
            _context.next = 4;
            return (0, _fn.makeCall)({
              endpoint: methodVersion ? R.replace(_config.API_VERSION, methodVersion, _config.ENDPOINTS.graph) : _config.ENDPOINTS.graph,
              query: _objectSpread(_objectSpread({}, token), options)
            });

          case 4:
            _yield$makeCall = _context.sent;
            denormalizedDays = _yield$makeCall.graph;
            start = options.checkIn, end = options.checkTo, _options$currency = options.currency, currency = _options$currency === void 0 ? 'uah' : _options$currency;
            points = (0, _immutable.Range)(0, (0, _moment.default)(end).diff((0, _moment.default)(start), 'days') + 1);
            daysWithPrice = (0, _immutable.List)(denormalizedDays).toMap().mapKeys(function (key, _ref2) {
              var dt = _ref2.dt;
              return (0, _moment.default)(dt).format('X');
            });
            peak = {};
            return _context.abrupt("return", points.toArray().map(function (day) {
              return (0, _moment.default)(start).add(day, 'days').format('X');
            }).map(function (day) {
              var dayObject = daysWithPrice.get(day) || {};
              var price = daysWithPrice.has(day) ? parsePrice(dayObject) : null;

              if (price && (!peak[currency] || peak[currency] < price[currency])) {
                Object.assign(peak, price);
              }

              return {
                day: day,
                price: price,
                transport: dayObject.t
              };
            }).map(function (_ref3) {
              var day = _ref3.day,
                  price = _ref3.price,
                  transport = _ref3.transport;
              var delta = price && peak ? Number((price[currency] / peak[currency] * 100).toFixed(2)) : null;
              return {
                day: day,
                price: price,
                delta: delta,
                transport: transport
              };
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursGraph.apply(this, arguments);
}
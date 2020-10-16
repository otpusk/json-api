"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursGraph = getToursGraph;

var _normalizr = require("normalizr");

var _moment = _interopRequireDefault(require("moment"));

var _immutable = require("immutable");

var _fn = require("../fn");

var _config = require("../config");

var _parsers = require("../normalize/parsers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursGraph(_x) {
  return _getToursGraph.apply(this, arguments);
}

function _getToursGraph() {
  _getToursGraph = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
    var options,
        _ref,
        denormalizedDays,
        start,
        end,
        points,
        daysWithPrice,
        peak,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            _context.next = 3;
            return (0, _fn.makeCall)(_config.ENDPOINTS.graph, _objectSpread({}, token, {}, options));

          case 3:
            _ref = _context.sent;
            denormalizedDays = _ref.graph;
            start = options.checkIn, end = options.checkTo;
            points = (0, _immutable.Range)(0, (0, _moment.default)(end).diff((0, _moment.default)(start), 'days') + 1);
            daysWithPrice = (0, _immutable.List)(denormalizedDays).toMap().mapKeys(function (key, _ref2) {
              var dt = _ref2.dt;
              return (0, _moment.default)(dt).format('X');
            });
            peak = {};
            return _context.abrupt("return", points.toArray().map(function (day) {
              return (0, _moment.default)(start).add(day, 'days').format('X');
            }).map(function (day) {
              var price = daysWithPrice.has(day) ? (0, _parsers.parsePrice)(daysWithPrice.get(day)) : null;

              if (price && (!peak.uah || peak.uah < price.uah)) {
                Object.assign(peak, price);
              }

              return {
                day: day,
                price: price
              };
            }).map(function (_ref3) {
              var day = _ref3.day,
                  price = _ref3.price;
              var delta = price && peak ? Number((price.uah / peak.uah * 100).toFixed(2)) : null;
              return {
                day: day,
                price: price,
                delta: delta
              };
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursGraph.apply(this, arguments);
}
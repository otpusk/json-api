"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursAgencies = getToursAgencies;

var _normalizr = require("normalizr");

var _immutable = require("immutable");

var _fn = require("../fn");

var _config = require("../config");

var _schemas = require("../normalize/schemas");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursAgencies(_x, _x2) {
  return _getToursAgencies.apply(this, arguments);
}

function _getToursAgencies() {
  _getToursAgencies = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, _ref) {
    var regionId, hotelId, offerId, _ref$noStats, noStats, adMarketId, params, _yield$makeCall, operators, denormalizedRegions, _normalize, _normalize$entities, agencies, offices, _normalize$result$, viewAgenciesOrder, clickAgenciesOrder, _normalize2, regions;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            regionId = _ref.regionId, hotelId = _ref.hotelId, offerId = _ref.offerId, _ref$noStats = _ref.noStats, noStats = _ref$noStats === void 0 ? false : _ref$noStats, adMarketId = _ref.adMarketId;
            params = _objectSpread(_objectSpread({}, token), {}, {
              regionId: regionId,
              hotelId: hotelId,
              offers: offerId
            }, adMarketId ? {
              adMarketId: adMarketId
            } : {});
            noStats && Object.assign(params, {
              nst: 1
            });
            _context.next = 5;
            return (0, _fn.makeCall)({
              endpoint: _config.ENDPOINTS.agencies,
              query: params
            });

          case 5:
            _yield$makeCall = _context.sent;
            operators = _yield$makeCall.operators;
            denormalizedRegions = _yield$makeCall.regions;
            _normalize = (0, _normalizr.normalize)(operators, new _normalizr.schema.Values({
              clickAgencies: [_schemas.agencySchema],
              viewAgencies: [_schemas.agencySchema]
            })), _normalize$entities = _normalize.entities, agencies = _normalize$entities.agency, offices = _normalize$entities.office, _normalize$result$ = _normalize.result[1];
            _normalize$result$ = _normalize$result$ === void 0 ? {} : _normalize$result$;
            viewAgenciesOrder = _normalize$result$.viewAgencies, clickAgenciesOrder = _normalize$result$.clickAgencies;
            _normalize2 = (0, _normalizr.normalize)(denormalizedRegions, [_schemas.regionSchema]), regions = _normalize2.entities.region;
            return _context.abrupt("return", {
              agencies: (0, _immutable.Map)(agencies).sortBy(function (_ref2) {
                var adId = _ref2.adId;
                return clickAgenciesOrder.includes(adId) ? clickAgenciesOrder.indexOf(adId) : viewAgenciesOrder.indexOf(adId) + 100;
              }),
              offices: offices,
              regions: regions
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursAgencies.apply(this, arguments);
}
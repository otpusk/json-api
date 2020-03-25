"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursValidate = getToursValidate;

var _normalizr = require("normalizr");

var _fn = require("../fn");

var _schemas = require("../normalize/schemas");

var _config = require("../config");

var _dictionary = require("../dictionary");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursValidate(_x, _x2) {
  return _getToursValidate.apply(this, arguments);
}

function _getToursValidate() {
  _getToursValidate = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(token, offerId) {
    var tempEndpoint, _getDepartureCityById, _getDepartureCityById2, name, _ref, status, denormalizedOffer, _normalize, _normalize$entities, outbound, inbound, _normalize$result, info, _normalize$result$usd, usd, _normalize$result$uah, uah, _normalize$result$eur, eur, _normalize$result$cur, currency, validatedTour, converter, flights, recalculatedFlights;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // const prodEndpoint = ENDPOINTS.validate;
            tempEndpoint = 'https://api.otpusk.com/api/3.0/tours/validate';

            if (token && token.city) {
              _getDepartureCityById = (0, _dictionary.getDepartureCityById)(token.city), _getDepartureCityById2 = _getDepartureCityById.name, name = _getDepartureCityById2 === void 0 ? '' : _getDepartureCityById2;
              token.city = name;
            }

            _context.next = 4;
            return (0, _fn.makeCall)("".concat(tempEndpoint, "/").concat(offerId), _objectSpread({}, token), null, 60000);

          case 4:
            _ref = _context.sent;
            status = _ref.status;
            denormalizedOffer = _objectWithoutProperties(_ref, ["status"]);
            _normalize = (0, _normalizr.normalize)(denormalizedOffer, {
              info: _schemas.infoSchema
            }), _normalize$entities = _normalize.entities, outbound = _normalize$entities.outbound, inbound = _normalize$entities.inbound, _normalize$result = _normalize.result, info = _normalize$result.info, _normalize$result$usd = _normalize$result.usd, usd = _normalize$result$usd === void 0 ? 0 : _normalize$result$usd, _normalize$result$uah = _normalize$result.uah, uah = _normalize$result$uah === void 0 ? 0 : _normalize$result$uah, _normalize$result$eur = _normalize$result.eur, eur = _normalize$result$eur === void 0 ? 0 : _normalize$result$eur, _normalize$result$cur = _normalize$result.currency, currency = _normalize$result$cur === void 0 ? 'usd' : _normalize$result$cur, validatedTour = _objectWithoutProperties(_normalize$result, ["info", "usd", "uah", "eur", "currency"]);
            converter = {
              usd: Number(uah) / Number(usd),
              eur: Number(uah) / Number(eur),
              uah: 1
            };
            flights = _objectSpread({}, outbound, inbound);
            recalculatedFlights = Object.entries(flights).reduce(function (prev, _ref2) {
              var _ref3 = _slicedToArray(_ref2, 2),
                  key = _ref3[0],
                  value = _ref3[1];

              return _objectSpread({}, prev, _defineProperty({}, key, _objectSpread({}, value, {
                priceChange: {
                  usd: currency === 'usd' ? Math.ceil(value.priceChange) : Math.ceil(value.priceChange * converter[currency] / converter.usd),
                  eur: currency === 'eur' ? Math.ceil(value.priceChange) : Math.ceil(value.priceChange * converter[currency] / converter.eur),
                  uah: currency === 'uah' ? Math.ceil(value.priceChange) : Math.ceil(value.priceChange * converter[currency] / converter.uah)
                }
              })));
            }, {});
            return _context.abrupt("return", _objectSpread({
              status: status,
              currency: currency,
              flights: recalculatedFlights
            }, validatedTour, {
              price: {
                usd: Number(usd),
                eur: Number(eur),
                uah: Number(uah)
              }
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getToursValidate.apply(this, arguments);
}
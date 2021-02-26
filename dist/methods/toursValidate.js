"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursValidate = getToursValidate;

var _normalizr = require("normalizr");

var _immutable = require("immutable");

var _fn = require("../fn");

var _schemas = require("../normalize/schemas");

var _dictionary = require("../dictionary");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var NEW_YEAR_PAY = 'N.Y. Holidays';

var normalizePrice = function normalizePrice(price) {
  return Math.ceil(parseInt(price));
};

function getToursValidate(_x, _x2) {
  return _getToursValidate.apply(this, arguments);
}

function _getToursValidate() {
  _getToursValidate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, offerId) {
    var tempEndpoint, _getDepartureCityById, _getDepartureCityById2, name, _yield$makeCall, status, denormalizedOffer, _normalize, _normalize$entities, outbound, inbound, _normalize$result, info, _normalize$result$usd, usd, _normalize$result$uah, uah, _normalize$result$eur, eur, _normalize$result$cur, currency, validatedTour, converter, newYears, flights, recalculatedFlights;

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
            return (0, _fn.makeCall)({
              endpoint: "".concat(tempEndpoint, "/").concat(offerId),
              query: _objectSpread({}, token),
              timeout: 60000
            });

          case 4:
            _yield$makeCall = _context.sent;
            status = _yield$makeCall.status;
            denormalizedOffer = _objectWithoutProperties(_yield$makeCall, ["status"]);
            _normalize = (0, _normalizr.normalize)(denormalizedOffer, {
              info: _schemas.infoSchema
            }), _normalize$entities = _normalize.entities, outbound = _normalize$entities.outbound, inbound = _normalize$entities.inbound, _normalize$result = _normalize.result, info = _normalize$result.info, _normalize$result$usd = _normalize$result.usd, usd = _normalize$result$usd === void 0 ? 0 : _normalize$result$usd, _normalize$result$uah = _normalize$result.uah, uah = _normalize$result$uah === void 0 ? 0 : _normalize$result$uah, _normalize$result$eur = _normalize$result.eur, eur = _normalize$result$eur === void 0 ? 0 : _normalize$result$eur, _normalize$result$cur = _normalize$result.currency, currency = _normalize$result$cur === void 0 ? 'usd' : _normalize$result$cur, validatedTour = _objectWithoutProperties(_normalize$result, ["info", "usd", "uah", "eur", "currency"]);
            converter = {
              usd: Number(uah) / Number(usd),
              eur: Number(uah) / Number(eur),
              uah: 1
            };
            newYears = (0, _immutable.Map)(info && info.services || {}).filter(function (_ref) {
              var type = _ref.type;
              return type === NEW_YEAR_PAY;
            }).map(function (item) {
              return (0, _immutable.Map)(item).update('price', normalizePrice).update('price', function (price) {
                return price * converter[currency];
              }).update('price', function (uah) {
                return (0, _immutable.Map)({
                  usd: null,
                  eur: null,
                  uah: null
                }).map(function (_, key) {
                  return normalizePrice(uah / converter[key]);
                });
              });
            }).toList().toJS();
            flights = _objectSpread(_objectSpread({}, outbound), inbound);
            recalculatedFlights = Object.entries(flights).reduce(function (prev, _ref2) {
              var _ref3 = _slicedToArray(_ref2, 2),
                  key = _ref3[0],
                  value = _ref3[1];

              return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, key, _objectSpread(_objectSpread({}, value), {}, {
                priceChange: {
                  usd: currency === 'usd' ? Math.ceil(value.priceChange) : Math.ceil(value.priceChange * converter[currency] / converter.usd),
                  eur: currency === 'eur' ? Math.ceil(value.priceChange) : Math.ceil(value.priceChange * converter[currency] / converter.eur),
                  uah: currency === 'uah' ? Math.ceil(value.priceChange) : Math.ceil(value.priceChange * converter[currency] / converter.uah)
                }
              })));
            }, {});
            return _context.abrupt("return", _objectSpread(_objectSpread({
              status: status,
              currency: currency,
              flights: recalculatedFlights,
              newYears: newYears
            }, validatedTour), {}, {
              price: {
                usd: Number(usd),
                eur: Number(eur),
                uah: Number(uah)
              }
            }));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursValidate.apply(this, arguments);
}
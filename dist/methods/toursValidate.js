"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursValidate = getToursValidate;

var _pathToRegexp = require("path-to-regexp");

var _moment = _interopRequireDefault(require("moment"));

var _immutable = require("immutable");

var _fn = require("../fn");

var _config = require("../config");

var _error = _interopRequireDefault(require("./../error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var transformDateToMoment = function transformDateToMoment(string) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'DD.MM.YYYY';

  if (string) {
    var date = (0, _moment.default)(string, format);
    return date.isValid() ? date : null;
  }

  return null;
};

var normalizeFlights = function normalizeFlights(flights) {
  return (0, _immutable.Map)(flights).map(function (_ref) {
    var datebeg = _ref.datebeg,
        dateend = _ref.dateend,
        flight = _ref.name,
        price = _ref.price;
    return {
      date: {
        from: transformDateToMoment(datebeg, 'DD.MM.YYYY HH:mm'),
        to: transformDateToMoment(dateend, 'DD.MM.YYYY HH:mm')
      },
      flight: flight,
      price: parseInt(price)
    };
  }).toObject();
};

var createQueryForToursValidateMethod = function createQueryForToursValidateMethod(params, token) {
  return _objectSpread(_objectSpread({}, params), token);
};

function getToursValidate(_x, _x2) {
  return _getToursValidate.apply(this, arguments);
}

function _getToursValidate() {
  _getToursValidate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, offerID) {
    var params,
        createEndpoint,
        _yield$makeCall,
        message,
        status,
        response,
        uah,
        eur,
        usd,
        currency,
        _response$info,
        _response$info$hotels,
        hotel,
        transports,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            createEndpoint = _config.ENDPOINTS.validate;
            _context.prev = 2;
            _context.next = 5;
            return (0, _fn.makeCall)(createEndpoint(_pathToRegexp.compile)({
              offerID: offerID
            }), createQueryForToursValidateMethod(params, token), null, 6e4);

          case 5:
            _yield$makeCall = _context.sent;
            message = _yield$makeCall.message;
            status = _yield$makeCall.status;
            response = _objectWithoutProperties(_yield$makeCall, ["message", "status"]);
            debugger;

            if (!(status > 0)) {
              _context.next = 12;
              break;
            }

            throw new _error.default({
              message: message,
              status: status
            }, message);

          case 12:
            uah = response.uah, eur = response.eur, usd = response.usd, currency = response.currency, _response$info = response.info, _response$info$hotels = _slicedToArray(_response$info.hotels, 1), hotel = _response$info$hotels[0], transports = _response$info.transports;
            return _context.abrupt("return", {
              hotel: (0, _immutable.Map)(hotel).update('datebeg', transformDateToMoment).update('dateend', transformDateToMoment).update(function (value) {
                return value.set('date', {
                  from: value.get('datebeg'),
                  to: value.get('dateend')
                });
              }).remove('price').remove('datebeg').remove('dateend').toObject(),
              status: {
                code: status,
                message: message
              },
              transports: (0, _immutable.Map)(transports).mapKeys(function (key) {
                switch (key) {
                  case 'departure':
                    return 'outbound';

                  case 'return':
                    return 'inbound';

                  default:
                    return key;
                }
              }).update('outbound', normalizeFlights).update('inbound', normalizeFlights).toObject(),
              offer: {
                currency: currency,
                price: (0, _immutable.Map)({
                  uah: uah,
                  eur: eur,
                  usd: usd
                }).filter(Boolean).toObject()
              }
            });

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](2);
            throw new Error(_context.t0);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 16]]);
  }));
  return _getToursValidate.apply(this, arguments);
}
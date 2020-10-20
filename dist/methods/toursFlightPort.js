"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursFlightPort = getToursFlightPort;

var _fn = require("../fn");

var _config = require("../config");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursFlightPort(_x, _x2) {
  return _getToursFlightPort.apply(this, arguments);
}

function _getToursFlightPort() {
  _getToursFlightPort = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, iata) {
    var options,
        _yield$makeCall,
        port,
        id,
        countryId,
        countryIata,
        countryName,
        lat,
        lng,
        rel,
        rest,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            _context.next = 3;
            return (0, _fn.makeCall)(_config.ENDPOINTS.flightPort, _objectSpread(_objectSpread({
              iata: iata
            }, token), options), [7, 'days']);

          case 3:
            _yield$makeCall = _context.sent;
            port = _yield$makeCall.port;
            id = port.id, countryId = port.countryId, countryIata = port.countryIata, countryName = port.countryName, lat = port.lat, lng = port.lng, rel = port.rel, rest = _objectWithoutProperties(port, ["id", "countryId", "countryIata", "countryName", "lat", "lng", "rel"]);
            return _context.abrupt("return", _objectSpread(_objectSpread({}, rest), {}, {
              country: {
                id: Number(countryId),
                name: countryName,
                iata: countryIata
              },
              id: Number(id),
              location: {
                lat: lat,
                lng: lng
              },
              names: {
                rd: rel
              }
            }));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursFlightPort.apply(this, arguments);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursServices = getToursServices;

var _immutable = require("immutable");

var _fn = require("../fn");

var _config = require("../config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursServices(_x) {
  return _getToursServices.apply(this, arguments);
}

function _getToursServices() {
  _getToursServices = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
    var country,
        lang,
        _yield$makeCall,
        api_version,
        time,
        checked,
        result,
        groups,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            country = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
            lang = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'ru';
            _context.next = 4;
            return (0, _fn.makeCall)({
              endpoint: _config.ENDPOINTS.services,
              query: _objectSpread(_objectSpread({}, token), {}, {
                countryId: country,
                lang: lang
              }),
              ttl: [7, 'days']
            });

          case 4:
            _yield$makeCall = _context.sent;
            api_version = _yield$makeCall.api_version;
            time = _yield$makeCall.time;
            checked = _yield$makeCall.checked;
            result = _yield$makeCall.result;
            groups = _objectWithoutProperties(_yield$makeCall, ["api_version", "time", "checked", "result"]);
            return _context.abrupt("return", (0, _immutable.Map)(groups).mapKeys(function (k) {
              return k.replace('Service', '');
            }).toJS());

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursServices.apply(this, arguments);
}
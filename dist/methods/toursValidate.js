"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursValidate = getToursValidate;

var _normalizr = require("normalizr");

var _fn = require("../fn");

var _schemas = require("../normalize/schemas");

var _config = require("../config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var tempCallResponse = {
  "status": 5,
  "message": "Price was changed",
  "price": "414",
  "currency": "USD",
  "uah": 10441.08,
  "info": {
    "hotels": [{
      "name": "Aqua Hotel Resort & Spa",
      "datebeg": "16.01.2020",
      "dateend": "24.01.2020"
    }],
    "transports": [{
      "name": "QU 4481",
      "datebeg": "16.01.2020",
      "dateend": "16.01.2020"
    }, {
      "name": "QU 4436",
      "datebeg": "24.01.2020",
      "dateend": "24.01.2020"
    }],
    "services": [{
      "name": "VUSO \u041C\u0435\u0434\u0438\u0446\u0438\u043D\u0441\u043A\u0430\u044F \u0441\u0442\u0440\u0430\u0445\u043E\u0432\u043A\u0430 20000 USD 30 Francise sport b new",
      "datebeg": "16.01.2020",
      "dateend": "24.01.2020"
    }, {
      "name": "VUSO Medical PREMIUM 40000",
      "datebeg": "16.01.2020",
      "dateend": "24.01.2020"
    }, {
      "name": "Group transfer Egypt Airport-Hotel-Airport (SSH) (Sharm el Sheikh\u2014>Sharm el Sheikh)",
      "datebeg": "16.01.2020",
      "dateend": "24.01.2020"
    }, {
      "name": "\u0414\u043E\u043F\u043B\u0430\u0442\u0430 \u0437\u0430 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u0440\u0435\u0439\u0441 (\u0415\u0433\u0438\u043F\u0435\u0442 \u041A\u0438\u0435\u0432) ANEXTOUR (AZURAIR UKRAINE)",
      "datebeg": "24.01.2020",
      "dateend": "24.01.2020"
    }]
  }
};

var tempApiCall = function tempApiCall() {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(tempCallResponse);
    }, 2000);
  });
};

function getToursValidate(_x, _x2) {
  return _getToursValidate.apply(this, arguments);
}

function _getToursValidate() {
  _getToursValidate = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(token, offerId) {
    var tempEndpoint, prodEndpoint, _ref, status, denormalizedOffer, _normalize, flights, _normalize$result, info, validatedTour;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // https://api.otpusk.com/api/3.0/tours/validate/2560153450987412?access_token=2bf9c-83b4a-0dac2-e0893-8cf29
            // https://api.otpusk.com/api/3.0/tours/validate/31601110750490?access_token=2bf9c-83b4a-0dac2-e0893-8cf29
            tempEndpoint = 'https://api.otpusk.com/api/3.0/tours/validate';
            prodEndpoint = _config.ENDPOINTS.validate; // const { status, ...denormalizedOffer } = await makeCall(`${tempEndpoint}/${offerId}`, {
            //     ...token
            // });
            // const { entities: { offer: offers }, result } = normalize(denormalizedOffer, offerSchema);

            _context.next = 4;
            return tempApiCall();

          case 4:
            _ref = _context.sent;
            status = _ref.status;
            denormalizedOffer = _objectWithoutProperties(_ref, ["status"]);
            _normalize = (0, _normalizr.normalize)(denormalizedOffer, {
              info: _schemas.infoSchema
            }), flights = _normalize.entities.flights, _normalize$result = _normalize.result, info = _normalize$result.info, validatedTour = _objectWithoutProperties(_normalize$result, ["info"]);
            console.log('getToursValidate JSON_API', {
              status: status,
              validatedTour: _objectSpread({}, validatedTour, {
                flights: flights
              })
            });
            return _context.abrupt("return", {
              status: status,
              validatedTour: _objectSpread({}, validatedTour, {
                flights: flights
              })
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursValidate.apply(this, arguments);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursValidate = getToursValidate;

var _normalizr = require("normalizr");

var _fn = require("../fn");

var _schemas = require("../normalize/schemas");

var _config = require("../config");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var tempCallResponse = {
  // 3410164920762405 Royal Paradise Resort 4*
  "status": 5,
  "message": "Price was changed",
  "price": 337.29,
  "currency": "USD",
  "uah": 8499.71,
  "info": {
    "hotels": [{
      "name": "Royal Paradise Resort",
      "datebeg": "17.01.2020",
      "dateend": "23.01.2020"
    }],
    "services": [{
      "name": "15 000 $ (UFI) (4)  30$",
      "datebeg": "17.01.2020",
      "dateend": "23.01.2020"
    }, {
      "name": "     (UFI)",
      "datebeg": "15.01.2020",
      "dateend": "23.01.2020"
    }, {
      "name": "EGY: -25% discount for SOHO Square . (Royal Paradise Resort, Pool View or Sea Side View, AI)",
      "datebeg": "17.01.2020",
      "dateend": "23.01.2020"
    }, {
      "name": "EGY: reDISCOver Egypt (Royal Paradise Resort, Pool View or Sea Side View, AI, Hadaba>Hadaba)",
      "datebeg": "17.01.2020",
      "dateend": "23.01.2020"
    }, {
      "name": "EGY:   SPA SSH (Royal Paradise Resort, Pool View or Sea Side View, AI, Hadaba)",
      "datebeg": "17.01.2020",
      "dateend": "23.01.2020"
    }, {
      "name": "EGY: FREE CITY TOUR (Royal Paradise Resort, Pool View or Sea Side View, AI, Hadaba>Hadaba)",
      "datebeg": "17.01.2020",
      "dateend": "23.01.2020"
    }, {
      "name": "EGY: Airport - Hotel - Airport (Sun Int) - SSH (Royal Paradise Resort, Pool View or Sea Side View, AI, Hadaba)",
      "datebeg": "17.01.2020",
      "dateend": "23.01.2020"
    }],
    "transports": {
      "departure": {
        "PQ 7117": {
          "name": "PQ 7117",
          "datebeg": "17.01.2020",
          "dateend": "17.01.2020",
          "price": 337.29,
          "currency": "USD",
          "uah": 8499.71,
          "add": "0 USD"
        },
        "PQ 7101": {
          "name": "PQ 7101",
          "datebeg": "17.01.2020",
          "dateend": "17.01.2020",
          "price": 337.29,
          "currency": "USD",
          "uah": 8499.71,
          "add": "10 USD"
        }
      },
      "return": {
        "": {
          "name": null,
          "datebeg": null,
          "dateend": null,
          "price": 337.29,
          "currency": "USD",
          "uah": 8499.71,
          "add": "0 USD"
        }
      }
    }
  }
};

var tempApiCall = function tempApiCall() {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(tempCallResponse);
    }, 1000);
  });
};

function getToursValidate(_x, _x2) {
  return _getToursValidate.apply(this, arguments);
}

function _getToursValidate() {
  _getToursValidate = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(token, offerId) {
    var tempEndpoint, _ref, status, denormalizedOffer, _normalize, _normalize$entities, outbound, inbound, _normalize$result, info, validatedTour;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // https://api.otpusk.com/api/3.0/tours/validate/2560153450987412?access_token=2bf9c-83b4a-0dac2-e0893-8cf29
            // const { status, ...denormalizedOffer } = await tempApiCall();
            // const prodEndpoint = ENDPOINTS.validate;
            tempEndpoint = 'https://api.otpusk.com/api/3.0/tours/validate';
            _context.next = 3;
            return (0, _fn.makeCall)("".concat(tempEndpoint, "/").concat(offerId), _objectSpread({}, token));

          case 3:
            _ref = _context.sent;
            status = _ref.status;
            denormalizedOffer = _objectWithoutProperties(_ref, ["status"]);
            _normalize = (0, _normalizr.normalize)(denormalizedOffer, {
              info: _schemas.infoSchema
            }), _normalize$entities = _normalize.entities, outbound = _normalize$entities.outbound, inbound = _normalize$entities.inbound, _normalize$result = _normalize.result, info = _normalize$result.info, validatedTour = _objectWithoutProperties(_normalize$result, ["info"]);
            console.log('[NORMALIZATION]', {
              token: token,
              denormalizedOffer: denormalizedOffer,
              normalization: (0, _normalizr.normalize)(denormalizedOffer, {
                info: _schemas.infoSchema
              }),
              result: _objectSpread({
                status: status,
                flights: _objectSpread({}, outbound, inbound)
              }, validatedTour)
            });
            return _context.abrupt("return", _objectSpread({
              status: status,
              flights: _objectSpread({}, outbound, inbound)
            }, validatedTour));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getToursValidate.apply(this, arguments);
}
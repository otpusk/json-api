"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursActual = getToursActual;

var _normalizr = require("normalizr");

var _fn = require("../fn");

var _schemas = require("../normalize/schemas");

var _config = require("../config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursActual(_x, _x2, _x3) {
  return _getToursActual.apply(this, arguments);
}

function _getToursActual() {
  _getToursActual = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(token, offerId, people) {
    var _ref, code, denormalizedOffer, _ref2, _ref2$entities, _ref2$entities$offer, offers, id;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fn.makeCall)(_config.ENDPOINTS.actual, _objectSpread({}, token, {
              offerId: offerId,
              people: people
            }));

          case 2:
            _ref = _context.sent;
            code = _ref.code;
            denormalizedOffer = _ref.offer;
            _ref2 = denormalizedOffer ? (0, _normalizr.normalize)(denormalizedOffer, _schemas.offerSchema) : {}, _ref2$entities = _ref2.entities;
            _ref2$entities = _ref2$entities === void 0 ? {} : _ref2$entities;
            _ref2$entities$offer = _ref2$entities.offer, offers = _ref2$entities$offer === void 0 ? null : _ref2$entities$offer, id = _ref2.result;
            return _context.abrupt("return", {
              code: code,
              offer: id ? offers[id] : null
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursActual.apply(this, arguments);
}
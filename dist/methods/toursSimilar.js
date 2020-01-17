"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursSimilar = getToursSimilar;

var _normalizr = require("normalizr");

var _fn = require("../fn");

var _config = require("../config");

var _schemas = require("../normalize/schemas");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursSimilar(_x, _x2) {
  return _getToursSimilar.apply(this, arguments);
}

function _getToursSimilar() {
  _getToursSimilar = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(token, hotelId) {
    var limit,
        _ref,
        hotels,
        _normalize,
        similar,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            limit = _args.length > 2 && _args[2] !== undefined ? _args[2] : 3;
            _context.next = 3;
            return (0, _fn.makeCall)(_config.ENDPOINTS.similar, _objectSpread({
              hotelId: hotelId,
              limit: limit
            }, token));

          case 3:
            _ref = _context.sent;
            hotels = _ref.hotels;
            _normalize = (0, _normalizr.normalize)(hotels, [_schemas.hotelSimilarSchema]), similar = _normalize.entities.hotel;
            return _context.abrupt("return", similar);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getToursSimilar.apply(this, arguments);
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTurpravdaHotelInformer = getTurpravdaHotelInformer;

var _fn = require("../fn");

var _config = require("../config");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getTurpravdaHotelInformer(_x) {
  return _getTurpravdaHotelInformer.apply(this, arguments);
}

function _getTurpravdaHotelInformer() {
  _getTurpravdaHotelInformer = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(hotelId) {
    var options,
        query,
        response,
        html,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {
              count: 10
            };
            query = _objectSpread({
              htl: hotelId,
              tp: 9,
              skin: 1
            }, options);
            _context.next = 4;
            return fetch("".concat(_config.ENDPOINTS.turpravdaInformers, "?").concat((0, _fn.createQueryStringFromObject)(query)));

          case 4:
            response = _context.sent;
            _context.next = 7;
            return response.text();

          case 7:
            html = _context.sent;
            return _context.abrupt("return", html);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getTurpravdaHotelInformer.apply(this, arguments);
}
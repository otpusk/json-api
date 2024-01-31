"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursBookCalculate = getToursBookCalculate;

var _ramda = require("ramda");

var _fn = require("../fn");

var _config = require("../config");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursBookCalculate(_x, _x2, _x3) {
  return _getToursBookCalculate.apply(this, arguments);
}

function _getToursBookCalculate() {
  _getToursBookCalculate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(tokenAsQuery, query, body) {
    var _price;

    var _yield$makeCall, currency_original, currency, price, price_original, rate;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fn.makeCall)({
              endpoint: _config.ENDPOINTS.bookCalculate,
              query: (0, _ramda.mergeAll)([tokenAsQuery, query]),
              method: 'POST',
              body: body
            });

          case 2:
            _yield$makeCall = _context.sent;
            currency_original = _yield$makeCall.currency_original;
            currency = _yield$makeCall.currency;
            price = _yield$makeCall.price;
            price_original = _yield$makeCall.price_original;
            rate = _yield$makeCall.rate;
            return _context.abrupt("return", {
              price: (_price = {}, _defineProperty(_price, currency, price), _defineProperty(_price, currency_original, price_original), _price),
              rate: rate
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursBookCalculate.apply(this, arguments);
}
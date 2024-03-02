"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSession = getSession;

var _fn = require("../fn");

var _config = require("../config");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getSession(_x) {
  return _getSession.apply(this, arguments);
}

function _getSession() {
  _getSession = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(tokenAsQuery) {
    var session, settings, availableCurrencies;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fn.makeCall)({
              endpoint: _config.ENDPOINTS.session,
              query: tokenAsQuery
            });

          case 2:
            session = _context.sent;
            settings = session.api_settings, availableCurrencies = session.currencies;
            return _context.abrupt("return", {
              availableCurrencies: availableCurrencies,
              defaultDepartureID: settings.osDeptCity
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getSession.apply(this, arguments);
}
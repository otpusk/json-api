"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInit = getInit;

var _fn = require("../fn");

var _config = require("../config");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getInit(_x) {
  return _getInit.apply(this, arguments);
}

function _getInit() {
  _getInit = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(token) {
    var _ref, gmapkey;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fn.makeCall)(_config.ENDPOINTS.init, token);

          case 2:
            _ref = _context.sent;
            gmapkey = _ref.gmapkey;
            return _context.abrupt("return", {
              apis: {
                googleMap: gmapkey || null
              }
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getInit.apply(this, arguments);
}

;
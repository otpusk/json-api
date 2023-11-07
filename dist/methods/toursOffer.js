"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursOffer = getToursOffer;

var _normalizr = require("normalizr");

var _ramda = require("ramda");

var _fn = require("../fn");

var _config = require("../config");

var _schemas = require("../normalize/schemas");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addCurrency = function addCurrency(currencyLocal) {
  return (0, _ramda.when)((0, _ramda.always)(currencyLocal), (0, _ramda.mergeLeft)({
    currencyLocal: currencyLocal
  }));
};

var addLang = function addLang(lang) {
  return (0, _ramda.when)((0, _ramda.always)(lang), (0, _ramda.mergeLeft)({
    lang: lang
  }));
};

function getToursOffer(_x, _x2, _x3, _x4, _x5) {
  return _getToursOffer.apply(this, arguments);
}

function _getToursOffer() {
  _getToursOffer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, offerId, fresh, currency, lang) {
    var _yield$makeCall, denormalizedOffer, _normalize, offers, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _fn.makeCall)({
              endpoint: _config.ENDPOINTS.offer,
              query: (0, _ramda.call)((0, _ramda.pipe)((0, _ramda.mergeLeft)(token), addCurrency(currency), addLang(lang)), {
                offerId: offerId
              }),
              ttl: fresh ? null : [30, 'minutes']
            });

          case 2:
            _yield$makeCall = _context.sent;
            denormalizedOffer = _yield$makeCall.offer;
            _normalize = (0, _normalizr.normalize)(denormalizedOffer, _schemas.offerSchema), offers = _normalize.entities.offer, result = _normalize.result;
            return _context.abrupt("return", result ? offers[result] : null);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursOffer.apply(this, arguments);
}
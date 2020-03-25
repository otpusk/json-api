"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursSuggests = getToursSuggests;
exports.getToursGeoById = getToursGeoById;

var _normalizr = require("normalizr");

var _immutable = require("immutable");

var _fn = require("../fn");

var _schemas = require("../normalize/schemas");

var _config = require("../config");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursSuggests(_x, _x2) {
  return _getToursSuggests.apply(this, arguments);
}

function _getToursSuggests() {
  _getToursSuggests = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(token, query) {
    var options,
        _ref,
        denormalizedLocations,
        _normalize,
        locations,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {
              'with': 'price'
            };
            _context.next = 3;
            return (0, _fn.makeCall)(_config.ENDPOINTS.suggests, _objectSpread({
              text: query
            }, token, options), [1, 'hour']);

          case 3:
            _ref = _context.sent;
            denormalizedLocations = _ref.response;
            _normalize = (0, _normalizr.normalize)(denormalizedLocations, [_schemas.geoSchema]), locations = _normalize.entities;
            return _context.abrupt("return", (0, _immutable.Map)(locations).map(function (group) {
              return Object.values(group);
            }).toJS());

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getToursSuggests.apply(this, arguments);
}

function getToursGeoById(_x3, _x4) {
  return _getToursGeoById.apply(this, arguments);
}

function _getToursGeoById() {
  _getToursGeoById = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(token, id) {
    var options,
        _ref2,
        denormalizedLocations,
        _normalize2,
        _normalize2$result,
        _normalize2$result$,
        locationId,
        type,
        locations,
        _args2 = arguments;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {
              'with': 'price'
            };
            _context2.next = 3;
            return (0, _fn.makeCall)(_config.ENDPOINTS.suggests, _objectSpread({
              text: id
            }, token, options), [1, 'hour']);

          case 3:
            _ref2 = _context2.sent;
            denormalizedLocations = _ref2.response;
            _normalize2 = (0, _normalizr.normalize)(denormalizedLocations, [_schemas.geoSchema]), _normalize2$result = _slicedToArray(_normalize2.result, 1), _normalize2$result$ = _normalize2$result[0], locationId = _normalize2$result$.id, type = _normalize2$result$.schema, locations = _normalize2.entities;
            return _context2.abrupt("return", locationId ? locations[type][locationId] : null);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _getToursGeoById.apply(this, arguments);
}
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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getToursSuggests(_x, _x2) {
  return _getToursSuggests.apply(this, arguments);
}

function _getToursSuggests() {
  _getToursSuggests = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, query) {
    var options,
        _yield$makeCall,
        denormalizedLocations,
        _normalize,
        result,
        locations,
        resultLocations,
        key,
        items,
        _iterator,
        _step,
        _loop,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {
              'with': 'price'
            };
            _context.next = 3;
            return (0, _fn.makeCall)(_config.ENDPOINTS.suggests, _objectSpread(_objectSpread({
              text: query
            }, token), options), [1, 'hour']);

          case 3:
            _yield$makeCall = _context.sent;
            denormalizedLocations = _yield$makeCall.response;
            _normalize = (0, _normalizr.normalize)(denormalizedLocations, [_schemas.geoSchema]), result = _normalize.result, locations = _normalize.entities;
            resultLocations = (0, _immutable.Map)(locations).map(function (group) {
              return Object.values(group);
            }).toJS();

            for (key in resultLocations) {
              if (resultLocations.hasOwnProperty(key)) {
                items = resultLocations[key];
                _iterator = _createForOfIteratorHelper(items);

                try {
                  _loop = function _loop() {
                    var item = _step.value;
                    item.sortIndex = result.findIndex(function (i) {
                      return i.id === item.id;
                    });
                  };

                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _loop();
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              }
            }

            return _context.abrupt("return", resultLocations);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursSuggests.apply(this, arguments);
}

function getToursGeoById(_x3, _x4) {
  return _getToursGeoById.apply(this, arguments);
}

function _getToursGeoById() {
  _getToursGeoById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(token, id) {
    var options,
        _yield$makeCall2,
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
            return (0, _fn.makeCall)(_config.ENDPOINTS.suggests, _objectSpread(_objectSpread({
              text: id
            }, token), options), [1, 'hour']);

          case 3:
            _yield$makeCall2 = _context2.sent;
            denormalizedLocations = _yield$makeCall2.response;
            _normalize2 = (0, _normalizr.normalize)(denormalizedLocations, [_schemas.geoSchema]), _normalize2$result = _slicedToArray(_normalize2.result, 1), _normalize2$result$ = _normalize2$result[0], locationId = _normalize2$result$.id, type = _normalize2$result$.schema, locations = _normalize2.entities;
            return _context2.abrupt("return", locationId ? locations[type][locationId] : null);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getToursGeoById.apply(this, arguments);
}
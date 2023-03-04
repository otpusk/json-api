"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursServices = getToursServices;

var R = _interopRequireWildcard(require("ramda"));

var _fn = require("../fn");

var _config = require("../config");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var renameGroupKeys = function renameGroupKeys(group) {
  return R.call(R.pipe(R.toPairs, R.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        services = _ref2[1];

    return [R.replace('Service', '', key), services];
  }), R.fromPairs), group);
};

var objectToArray = function objectToArray(object) {
  return R.call(R.pipe(R.toPairs, R.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    return _defineProperty({}, key, value);
  })), object);
};

var extractServicesFromResponse = function extractServicesFromResponse(response) {
  return R.call(R.pipe(R.toPairs, R.filter(function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
        value = _ref7[1];

    return value !== null && _typeof(value) === 'object';
  }), R.map(function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
        key = _ref9[0],
        value = _ref9[1];

    return [key, objectToArray(value)];
  }), R.fromPairs), response);
};

function getToursServices(_x) {
  return _getToursServices.apply(this, arguments);
}

function _getToursServices() {
  _getToursServices = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
    var country,
        lang,
        _yield$makeCall,
        _yield$makeCall$icons,
        icons,
        _yield$makeCall$tabs,
        tabs,
        _yield$makeCall$nameS,
        nameServices,
        search,
        response,
        isSetCountry,
        countryService,
        searchGroup,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            country = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
            lang = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'ru';
            _context.next = 4;
            return (0, _fn.makeCall)({
              endpoint: _config.ENDPOINTS.services,
              query: _objectSpread(_objectSpread({}, token), {}, {
                countryId: country,
                lang: lang
              }),
              ttl: [7, 'days']
            });

          case 4:
            _yield$makeCall = _context.sent;
            _yield$makeCall$icons = _yield$makeCall.icons;
            icons = _yield$makeCall$icons === void 0 ? [] : _yield$makeCall$icons;
            _yield$makeCall$tabs = _yield$makeCall.tabs;
            tabs = _yield$makeCall$tabs === void 0 ? [] : _yield$makeCall$tabs;
            _yield$makeCall$nameS = _yield$makeCall.nameServices;
            nameServices = _yield$makeCall$nameS === void 0 ? {} : _yield$makeCall$nameS;
            search = _yield$makeCall.search;
            response = _objectWithoutProperties(_yield$makeCall, ["icons", "tabs", "nameServices", "search"]);
            isSetCountry = Boolean(Number(country));
            countryService = isSetCountry ? search.countryService : response.countryService;
            searchGroup = isSetCountry ? R.omit(['countryService'], search) : extractServicesFromResponse(R.omit(['countryService'], response));
            return _context.abrupt("return", R.mergeAll([{
              icons: icons,
              tabs: tabs
            }, {
              rootGroups: objectToArray(renameGroupKeys(nameServices))
            }, renameGroupKeys(searchGroup), {
              country: isSetCountry && countryService ? countryService : [],
              byCountries: !isSetCountry && countryService ? countryService : {}
            }]));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getToursServices.apply(this, arguments);
}
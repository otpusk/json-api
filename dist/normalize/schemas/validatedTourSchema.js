"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infoSchema = exports.flightSchema = void 0;
var _normalizr = require("normalizr");
var _moment = _interopRequireDefault(require("moment"));
var _excluded = ["name", "datebeg", "dateend", "price"];
<<<<<<< HEAD
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
=======
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], t.indexOf(o) >= 0 || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
>>>>>>> task-45137
var inputFormat = 'DD.MM.YYYY HH:mm';
var outputFormat = 'YYYY-MM-DD HH:mm:ss';
var formatDate = function formatDate(date, input, output) {
  var formatted = (0, _moment.default)(date, input).format(output);
  return formatted.toLowerCase().includes('invalid') ? date : formatted;
};
var flightCode = function flightCode() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var codeRegex = /[A-Z0-9]+[\D]{1}[\d]+/;
  var codeMatch = name.match(codeRegex);
  if (codeMatch && codeMatch.length) {
    return codeMatch[0].replace('-', ' ');
  }
  return name;
};
var getIdAttribute = function getIdAttribute(_ref) {
  var name = _ref.name,
    datebeg = _ref.datebeg,
    dateend = _ref.dateend;
  return "".concat(flightCode(name), "_").concat(formatDate(datebeg, inputFormat, outputFormat), "_").concat(formatDate(dateend, inputFormat, outputFormat));
};
var processTransports = function processTransports(entity) {
  var name = entity.name,
    datebeg = entity.datebeg,
    dateend = entity.dateend,
    price = entity.price,
    rest = _objectWithoutProperties(entity, _excluded);
  var res = _objectSpread({
    code: name && flightCode(name),
    begin: formatDate(datebeg, inputFormat, outputFormat),
    end: formatDate(dateend, inputFormat, outputFormat),
    priceChange: Number(price) || Number(price.split(/\s/)[0])
  }, rest);
  return res;
};
var outboundSchema = new _normalizr.schema.Entity("outbound", {}, {
  idAttribute: getIdAttribute,
  processStrategy: processTransports
});
var inboundSchema = new _normalizr.schema.Entity("inbound", {}, {
  idAttribute: getIdAttribute,
  processStrategy: processTransports
});
var flightSchema = exports.flightSchema = new _normalizr.schema.Entity("flights", {
  departure: [outboundSchema],
  return: [inboundSchema]
});
var infoSchema = exports.infoSchema = {
  transports: flightSchema
};
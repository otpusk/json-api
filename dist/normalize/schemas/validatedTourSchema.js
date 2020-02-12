"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infoSchema = exports.flightSchema = void 0;

var _normalizr = require("normalizr");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var inputFormat = 'DD.MM.YYYY HH:mm';
var outputFormat = 'YYYY-MM-DD HH:mm:ss';

var formatDate = function formatDate(date, input, output) {
  var formatted = (0, _moment.default)(date, input).format(output);
  return formatted.toLowerCase().includes('invalid') ? date : formatted;
};

var flightCode = function flightCode() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var codeRegex = /[A-Z0-9]+[\s-]{1}[\d]+/;
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
      rest = _objectWithoutProperties(entity, ["name", "datebeg", "dateend", "price"]);

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
var flightSchema = new _normalizr.schema.Entity("flights", {
  departure: [outboundSchema],
  return: [inboundSchema]
});
exports.flightSchema = flightSchema;
var infoSchema = {
  transports: flightSchema
};
exports.infoSchema = infoSchema;
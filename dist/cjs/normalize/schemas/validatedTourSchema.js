"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infoSchema = exports.flightSchema = void 0;
var _normalizr = require("normalizr");
var _moment = _interopRequireDefault(require("moment"));
const inputFormat = 'DD.MM.YYYY HH:mm';
const outputFormat = 'YYYY-MM-DD HH:mm:ss';
const formatDate = (date, input, output) => {
  const formatted = (0, _moment.default)(date, input).format(output);
  return formatted.toLowerCase().includes('invalid') ? date : formatted;
};
const flightCode = function () {
  let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  const codeRegex = /[A-Z0-9]+[\D]{1}[\d]+/;
  const codeMatch = name.match(codeRegex);
  if (codeMatch && codeMatch.length) {
    return codeMatch[0].replace('-', ' ');
  }
  return name;
};
const getIdAttribute = _ref => {
  let {
    name,
    datebeg,
    dateend
  } = _ref;
  return `${flightCode(name)}_${formatDate(datebeg, inputFormat, outputFormat)}_${formatDate(dateend, inputFormat, outputFormat)}`;
};
const processTransports = entity => {
  const {
    name,
    datebeg,
    dateend,
    price,
    ...rest
  } = entity;
  const res = {
    code: name && flightCode(name),
    begin: formatDate(datebeg, inputFormat, outputFormat),
    end: formatDate(dateend, inputFormat, outputFormat),
    priceChange: Number(price) || Number(price.split(/\s/)[0]),
    ...rest
  };
  return res;
};
const outboundSchema = new _normalizr.schema.Entity("outbound", {}, {
  idAttribute: getIdAttribute,
  processStrategy: processTransports
});
const inboundSchema = new _normalizr.schema.Entity("inbound", {}, {
  idAttribute: getIdAttribute,
  processStrategy: processTransports
});
const flightSchema = exports.flightSchema = new _normalizr.schema.Entity("flights", {
  departure: [outboundSchema],
  return: [inboundSchema]
});
const infoSchema = exports.infoSchema = {
  transports: flightSchema
};
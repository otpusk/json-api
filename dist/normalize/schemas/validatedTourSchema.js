"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infoSchema = void 0;

var _normalizr = require("normalizr");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var flightCode = function flightCode(name) {
  var noWhitespaceName = name.replace(/\s/g, "");

  if (/^[A-Z0-9]*$/g.test(noWhitespaceName)) {
    return name;
  }

  return name.split(",")[1].split(".")[0].trim();
};

var processTransports = function processTransports(entity) {
  var name = entity.name,
      datebeg = entity.datebeg,
      dateend = entity.dateend,
      add = entity.add,
      rest = _objectWithoutProperties(entity, ["name", "datebeg", "dateend", "add"]);

  var res = _objectSpread({
    code: name && flightCode(name),
    begin: datebeg,
    end: dateend,
    priceChange: add ? Number(add.split(" ")[0]) : 0
  }, rest);

  return res;
};

var outboundSchema = new _normalizr.schema.Entity("outbound", {}, {
  idAttribute: function idAttribute(_ref) {
    var name = _ref.name;
    return name;
  },
  processStrategy: processTransports
});
var inboundSchema = new _normalizr.schema.Entity("inbound", {}, {
  idAttribute: function idAttribute(_ref2) {
    var name = _ref2.name;
    return name;
  },
  processStrategy: processTransports
});
var flightSchema = new _normalizr.schema.Entity("flights", {
  departure: [outboundSchema],
  return: [inboundSchema]
});
var infoSchema = {
  transports: flightSchema
};
exports.infoSchema = infoSchema;
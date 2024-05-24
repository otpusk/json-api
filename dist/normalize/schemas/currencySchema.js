"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currencySchema = void 0;
var _normalizr = require("normalizr");
// Core

var currencySchema = exports.currencySchema = new _normalizr.schema.Entity('currencies', {}, {
  idAttribute: function idAttribute(_ref) {
    var code = _ref.code;
    return code.toLowerCase();
  }
});
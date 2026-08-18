"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currencySchema = void 0;
var _normalizr = require("normalizr");
// Core

const currencySchema = exports.currencySchema = new _normalizr.schema.Entity('currencies', {}, {
  idAttribute: _ref => {
    let {
      code
    } = _ref;
    return code.toLowerCase();
  }
});
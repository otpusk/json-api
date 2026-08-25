"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheValidate = cacheValidate;
var _moment = _interopRequireDefault(require("moment"));
var _fn = require("../fn");
var _config = require("../config");
var _cache = require("./../cache");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Core

// Instruments

async function cacheValidate() {
  const {
    timestamp: lastTimeUpdated
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.cacheValidate
  });
  const hash = btoa(`${lastTimeUpdated}`);
  const cache = new _cache.CacheItem(_config.ENDPOINTS.cacheValidate);
  await cache.read();
  cache.isHit = () => Promise.resolve(true);
  const result = await cache.get();
  if (result !== hash) {
    await _cache.cacheStorage.clear();
    cache.set(hash);
    await cache.save();
  }
  return {
    hash,
    lastTimeUpdated: (0, _moment.default)(lastTimeUpdated, 'X').utc(true)
  };
}
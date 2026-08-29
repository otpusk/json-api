"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheStorage = exports.CacheItem = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _moment = _interopRequireDefault(require("moment"));
var _storage = require("./storage");
// Core

// Instruments

const cacheStorage = exports.cacheStorage = (0, _storage.createStorage)('otpusk_api_cache');
class CacheItem {
  constructor(key) {
    (0, _defineProperty2.default)(this, "getKey", () => this.key);
    (0, _defineProperty2.default)(this, "get", async () => (await this.isHit()) ? this.record.value : null);
    (0, _defineProperty2.default)(this, "isHit", async ttl => {
      if (ttl === null) {
        return false;
      }
      await this.read();
      const timeLeft = this.record.expires - (0, _moment.default)().format('X');
      const maxTime = ttl ? _moment.default.duration(...ttl).asSeconds() : null;
      const isAlive = maxTime ? 0 < timeLeft && timeLeft < maxTime : 0 < timeLeft;
      return isAlive;
    });
    (0, _defineProperty2.default)(this, "read", async () => {
      if (this.record) {
        return this.record;
      }
      this.record = await cacheStorage.get(this.key, {
        value: null,
        expires: -1
      });
    });
    (0, _defineProperty2.default)(this, "save", () => cacheStorage.set(this.key, this.record));
    (0, _defineProperty2.default)(this, "set", value => Object.assign(this.record, {
      value
    }));
    (0, _defineProperty2.default)(this, "expiresAt", time => Object.assign(this.record, {
      expires: (0, _moment.default)(time).format('X')
    }));
    (0, _defineProperty2.default)(this, "expiresAfter", duration => this.expiresAt((0, _moment.default)().add(duration)));
    this.key = key;
    this.record = null;
  }
}
exports.CacheItem = CacheItem;
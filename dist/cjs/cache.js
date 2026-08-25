"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheStorage = exports.CacheItem = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _storage = require("./storage");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Core
// Instruments
const cacheStorage = exports.cacheStorage = (0, _storage.createStorage)('otpusk_api_cache');
class CacheItem {
  constructor(key) {
    _defineProperty(this, "getKey", () => this.key);
    _defineProperty(this, "get", async () => (await this.isHit()) ? this.record.value : null);
    _defineProperty(this, "isHit", async ttl => {
      if (ttl === null) {
        return false;
      }
      await this.read();
      const timeLeft = this.record.expires - (0, _moment.default)().format('X');
      const maxTime = ttl ? _moment.default.duration(...ttl).asSeconds() : null;
      const isAlive = maxTime ? 0 < timeLeft && timeLeft < maxTime : 0 < timeLeft;
      return isAlive;
    });
    _defineProperty(this, "read", async () => {
      if (this.record) {
        return this.record;
      }
      this.record = await cacheStorage.get(this.key, {
        value: null,
        expires: -1
      });
    });
    _defineProperty(this, "save", () => cacheStorage.set(this.key, this.record));
    _defineProperty(this, "set", value => Object.assign(this.record, {
      value
    }));
    _defineProperty(this, "expiresAt", time => Object.assign(this.record, {
      expires: (0, _moment.default)(time).format('X')
    }));
    _defineProperty(this, "expiresAfter", duration => this.expiresAt((0, _moment.default)().add(duration)));
    this.key = key;
    this.record = null;
  }
}
exports.CacheItem = CacheItem;
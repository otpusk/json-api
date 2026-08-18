function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Core
import moment from 'moment';

// Instruments
import { createStorage } from './storage';
const cacheStorage = createStorage('otpusk_api_cache');
class CacheItem {
  constructor(key) {
    _defineProperty(this, "getKey", () => this.key);
    _defineProperty(this, "get", async () => (await this.isHit()) ? this.record.value : null);
    _defineProperty(this, "isHit", async ttl => {
      if (ttl === null) {
        return false;
      }
      await this.read();
      const timeLeft = this.record.expires - moment().format('X');
      const maxTime = ttl ? moment.duration(...ttl).asSeconds() : null;
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
      expires: moment(time).format('X')
    }));
    _defineProperty(this, "expiresAfter", duration => this.expiresAt(moment().add(duration)));
    this.key = key;
    this.record = null;
  }
}
export { CacheItem, cacheStorage };
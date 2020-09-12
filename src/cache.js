// Core
import moment from 'moment';

// Instruments
import { createStorage } from './storage';

const cacheStorage = createStorage('otpusk_api_cache');

class CacheItem {
    constructor (key) {
        this.key = key;
        this.record = null;
    }

    getKey = () => this.key;

    get = async () => await this.isHit() ? this.record.value : null;

    isHit = async (ttl) => {
        if(ttl === null) {
            return false;
        }
        
        await this.read();

        const timeLeft = this.record.expires - moment().format('X');
        const maxTime = ttl ? moment.duration(...ttl).asSeconds() : null;
        const isAlive = maxTime
            ? 0 < timeLeft && timeLeft < maxTime
            : 0 < timeLeft;

        return isAlive;
    }

    read = async () => {
        if (this.record) {
            return this.record;
        }
        this.record = await cacheStorage.get(this.key, { value: null, expires: -1 });
    }

    save = () => cacheStorage.set(this.key, this.record);

    set = (value) => Object.assign(this.record, { value });

    expiresAt = (time) => Object.assign(this.record, { expires: moment(time).format('X') });

    expiresAfter = (duration) => this.expiresAt(moment().add(duration));
}

export {
    CacheItem,
    cacheStorage
};

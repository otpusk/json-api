// Core
import moment from 'moment';

// Instruments
import { createStorage } from './storage';

const cacheStorage = createStorage('otpusk_api_cache');

cacheStorage.findAll()
    .then((all) => {
        for (const [key, { expires }] of Object.entries(all)) {
            if (expires <= moment().format('X')) {
                cacheStorage.remove(key);
            }
        }
    });

class CacheItem {
    constructor (key) {
        this.key = key;
        this.record = null;
    }

    getKey = () => this.key;

    get = async () => await this.isHit() ? this.record.value : null;

    isHit = async (ttl) => {
        await this.read();

        const timealive = this.record.expires - moment().format('X');
        const isAlive = ttl
            ? moment.duration(...ttl).asSeconds() > timealive
            : typeof ttl === 'undefined'
                ? timealive > 0
                : false;

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
    CacheItem
};

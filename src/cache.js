// Core
import moment from 'moment';

// Instruments
import { createStorage } from './storage';

const cacheStorage = createStorage('otpusk_api_cache');
const LAST_FORCE_UPDATE_CLIENT_STORAGE = moment('14:42', 'HH:mm');

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
        if(ttl === null) {
            return false;
        }
        
        await this.read();

        if (ttl) {
            const dateLoadedResource = moment(this.record.expires, 'X').subtract(moment.duration(...ttl));
            const isResourceLoadedBeforeForceUpdate = LAST_FORCE_UPDATE_CLIENT_STORAGE.isBefore(dateLoadedResource);

            if (!isResourceLoadedBeforeForceUpdate) {
                return false;
            }
        }

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
    CacheItem
};

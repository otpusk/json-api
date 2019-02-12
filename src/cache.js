// Core
import moment from 'moment';

// Instruments
import { createStorage } from 'helpers/storage/createStorage';

const cacheStorage = createStorage('otpusk_api_cache');

class CacheItem {
    constructor (key) {
        this.key = key;
        this.record = null;
    }

    getKey = () => this.key;

    get = async () => await this.isHit() ? this.record.value : null;

    isHit = async () => {
        await this.read();

        return moment().format('X') < this.record.expires;
    }

    read = async () => {
        if (this.record) {
            return this.record;
        }
        this.record = await cacheStorage.get(this.key, { value: null, expires: -1 });
    }

    save = async () => await cacheStorage.set(this.key, this.record);

    set = (value) => Object.assign(this.record, { value });

    expiresAt = (time) => Object.assign(this.record, { expires: moment(time).format('X') });

    expiresAfter = (duration) => this.expiresAt(moment().add(duration));
}

export {
    CacheItem
};

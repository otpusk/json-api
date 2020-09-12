// Core
import moment from 'moment';

// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
import { CacheItem, cacheStorage } from './../cache';

export async function cacheValidate (token) {
    const { timestamp: lastTimeUpdated } = await makeCall(ENDPOINTS.cache_validate, token);
    const hash = btoa(`${lastTimeUpdated}`);
    const cache = new CacheItem(ENDPOINTS.cache_validate);

    await cache.read();

    cache.isHit = () => Promise.resolve(true);

    const result = await cache.get();

    if (result !== hash) {
        await cacheStorage.clear();

        cache.set(hash);
        await cache.save();
    }

    return {
        hash,
        lastTimeUpdated: moment(lastTimeUpdated, 'X').utc(true)
    };
}

// Core
import fetch from 'fetch-jsonp';
import moment from 'moment';

// Instruments
import { CacheItem } from './cache';

/**
 * Convert object to ulr query string
 *
 * @param {Object} params query object
 *
 * @returns {string} query stirng
 */
function createQueryStringFromObject (params) {
    return Object.entries(params)
        .map((param) => param.join('='))
        .join('&');
}

/**
 * Hash string
 *
 * @param {string} str
 *
 * @returns {string} hash
 */
function hash (str) {
    let hash = 5381;
    let i    = str.length;

    while (i) {
        hash = hash * 33 ^ str.charCodeAt(--i);
    }

    return String(hash >>> 0);
}

/**
 * Parse api response
 *
 * @param {Object} response api response
 * @returns {Object} data
 */
async function parseResponse (response) {
    const body = await response.json();
    const { error, message } = body;

    if (!response.ok || error) {
        throw new Error(message);
    } else {
        return body;
    }
}

/**
 * Make api call
 *
 * @param {string} endpoint Request endpoint
 * @param {Object} query Request query
 * @param {Object} ttl Moment duration
 *
 * @returns {Promise} Response
 */
async function makeCall (endpoint, query, ttl) {
    const request = `${endpoint}?${createQueryStringFromObject(query)}`;
    const cache = new CacheItem(hash(request));

    if (await cache.isHit()) {
        const body = await cache.get();

        return body;
    }

    const response = await fetch(request, { timeout: 10000 });
    const body = await parseResponse(response);

    if (ttl) {
        cache.set(body);
        cache.expiresAfter(moment.duration(...ttl));
        await cache.save();
    }

    return body;
}

export {
    makeCall,
    createQueryStringFromObject
};

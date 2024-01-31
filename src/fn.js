import fetch from 'isomorphic-fetch';
import fetchJsonp from 'fetch-jsonp';
import moment from 'moment';

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

    let i = str.length;

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
        const errorInstance = new Error(message);

        errorInstance.response = {
            ...body,
            statusCode: response.status,
        };

        throw errorInstance;
    } else {
        return body;
    }
}

function fetchWithTimeout (request, body, method, timeout) {
    return Promise.race([
        fetch(request, {
            body,
            method,
        }),
        new Promise((_, reject) => {
            setTimeout(() => reject(new Error(`request to ${request} timed out`)), timeout);
        })
    ]);
}

/**
 * Make api call
 *
 * @param {string} endpoint Request endpoint
 * @param {Object} query Request query
 * @param {Object} ttl Moment duration
 * @param {number} timeout Request timeout
 *
 * @returns {Promise} Response
 */
async function makeCall ({ body, endpoint, method = 'GET', query = {}, ttl = null, timeout = 10000, jsonp = false }) {
    const request = `${endpoint}?${createQueryStringFromObject(query)}`;
    const cache = new CacheItem(hash(request));

    if (await cache.isHit(ttl)) {
        const cachedValue = await cache.get();

        return cachedValue;
    }

    let response = null;

    if (jsonp) {
        response = await fetchJsonp(request, { timeout });
    }

    if (!jsonp) {
        response = await fetchWithTimeout(request, body, method, timeout);
    }

    const result = await parseResponse(response);

    if (ttl) {
        cache.set(result);
        cache.expiresAfter(moment.duration(...ttl));
        await cache.save();
    }

    return result;
}

/**
 * Copy defined source object fields to target object
 * @param {*} target
 * @param {*} source
 *
 * @returns {*} result
 */
function mergeDefinedObjectValues (target, source) {
    const result = Object.assign({}, target);

    for (const [f, v] of Object.entries(source)) {
        if (typeof v !== 'undefined') {
            result[f] = v;
        }
    }

    return result;
}

class HttpResponseError {
    constructor (code, message, data = null) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

export {
    makeCall,
    createQueryStringFromObject,
    mergeDefinedObjectValues,
    HttpResponseError
};

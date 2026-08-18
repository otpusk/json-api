"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeoutError = exports.HttpResponseError = void 0;
exports.createQueryStringFromObject = createQueryStringFromObject;
exports.makeCall = makeCall;
exports.mergeDefinedObjectValues = mergeDefinedObjectValues;
var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));
var _fetchJsonp = _interopRequireDefault(require("fetch-jsonp"));
var _moment = _interopRequireDefault(require("moment"));
var _cache = require("./cache");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Convert object to ulr query string
 *
 * @param {Object} params query object
 *
 * @returns {string} query stirng
 */
function createQueryStringFromObject(params) {
  return Object.entries(params).map(param => param.join('=')).join('&');
}

/**
 * Hash string
 *
 * @param {string} str
 *
 * @returns {string} hash
 */
function hash(str) {
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
async function parseResponse(response) {
  const body = await response.json();
  const {
    error,
    message
  } = body;
  if (!response.ok || error) {
    const errorInstance = new Error(message);
    errorInstance.response = {
      ...body,
      statusCode: response.status
    };
    throw errorInstance;
  } else {
    return body;
  }
}

/**
 * Parse api HEAD response (has no body)
 *
 * @param {Object} response api response
 * @returns {Object} status code
 */
function parseHeadResponse(response) {
  if (!response.ok) {
    const errorInstance = new Error(response.statusText);
    errorInstance.response = {
      statusCode: response.status
    };
    throw errorInstance;
  }
  return {
    statusCode: response.status
  };
}
class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TimeoutError';
  }
}
exports.TimeoutError = TimeoutError;
function fetchWithTimeout(request, body, method, timeout) {
  const options = {
    method
  };
  if (method !== 'GET' && body != null) {
    options.body = body;
  }
  return Promise.race([(0, _isomorphicFetch.default)(request, options), new Promise((_, reject) => {
    setTimeout(() => reject(new TimeoutError(`request to ${request} timed out`)), timeout);
  })]);
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
async function makeCall(_ref) {
  let {
    body,
    endpoint,
    method = 'GET',
    query = {},
    ttl = null,
    timeout = 10000,
    jsonp = false
  } = _ref;
  const request = `${endpoint}?${createQueryStringFromObject(query)}`;
  const cache = new _cache.CacheItem(hash(request));
  if (await cache.isHit(ttl)) {
    const cachedValue = await cache.get();
    return cachedValue;
  }
  let response = null;
  if (jsonp) {
    response = await (0, _fetchJsonp.default)(request, {
      timeout
    });
  }
  if (!jsonp) {
    response = await fetchWithTimeout(request, body, method, timeout);
  }
  const result = method === 'HEAD' ? parseHeadResponse(response) : await parseResponse(response);
  if (ttl) {
    cache.set(result);
    cache.expiresAfter(_moment.default.duration(...ttl));
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
function mergeDefinedObjectValues(target, source) {
  const result = Object.assign({}, target);
  for (const [f, v] of Object.entries(source)) {
    if (typeof v !== 'undefined') {
      result[f] = v;
    }
  }
  return result;
}
class HttpResponseError {
  constructor(code, message) {
    let data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
exports.HttpResponseError = HttpResponseError;
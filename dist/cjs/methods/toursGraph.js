"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursGraph = getToursGraph;
var _moment = _interopRequireDefault(require("moment"));
var _immutable = require("immutable");
var R = _interopRequireWildcard(require("ramda"));
var _fn = require("../fn");
var _config = require("../config");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const parsePrice = _ref => {
  let {
    c: currency,
    p: priceByCurrency,
    pu: uahPrice
  } = _ref;
  return {
    [currency]: priceByCurrency,
    ...(uahPrice ? {
      uah: uahPrice
    } : {})
  };
};
async function getToursGraph(token) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let methodVersion = arguments.length > 2 ? arguments[2] : undefined;
  const {
    graph: denormalizedDays
  } = await (0, _fn.makeCall)({
    endpoint: methodVersion ? R.replace(_config.API_VERSION, methodVersion, _config.ENDPOINTS.graph) : _config.ENDPOINTS.graph,
    query: {
      ...token,
      ...options
    }
  });
  const {
    checkIn: start,
    checkTo: end,
    currency = 'uah'
  } = options;
  const points = (0, _immutable.Range)(0, (0, _moment.default)(end).diff((0, _moment.default)(start), 'days') + 1);
  const daysWithPrice = (0, _immutable.List)(denormalizedDays).toMap().mapKeys((key, _ref2) => {
    let {
      dt
    } = _ref2;
    return (0, _moment.default)(dt).format('X');
  });
  const peak = {};
  return points.toArray().map(day => (0, _moment.default)(start).add(day, 'days').format('X')).map(day => {
    const dayObject = daysWithPrice.get(day) || {};
    const price = daysWithPrice.has(day) ? parsePrice(dayObject) : null;
    if (price && (!peak[currency] || peak[currency] < price[currency])) {
      Object.assign(peak, price);
    }
    return {
      day,
      price,
      transport: dayObject.t
    };
  }).map(_ref3 => {
    let {
      day,
      price,
      transport
    } = _ref3;
    const delta = price && peak ? Number((price[currency] / peak[currency] * 100).toFixed(2)) : null;
    return {
      day,
      price,
      delta,
      transport
    };
  });
}
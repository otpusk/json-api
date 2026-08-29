"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToursDates = getToursDates;
var _ramda = require("ramda");
var _fn = require("../fn");
var _config = require("../config");
async function getToursDates(token, options) {
  const {
    dates: denormalizedDates = {}
  } = await (0, _fn.makeCall)({
    endpoint: _config.ENDPOINTS.dates,
    query: {
      ...token,
      ...options
    },
    ttl: [2, 'hour']
  });
  return (0, _ramda.map)(_ref => {
    let [date, rangeAsString] = _ref;
    const rangeAsSortedArray = (0, _ramda.call)((0, _ramda.pipe)((0, _ramda.split)(','), (0, _ramda.map)(Number), (0, _ramda.sort)((0, _ramda.ascend)(range => range))), rangeAsString);
    return {
      date,
      range: rangeAsSortedArray
    };
  }, (0, _ramda.toPairs)(denormalizedDates));
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareContent2Render = void 0;
var _ramda = require("ramda");
var getIsUrl = function getIsUrl(label) {
  return label.startsWith('http') || label.startsWith('www.');
};
var checkValidHttpUrl = function checkValidHttpUrl(url) {
  return url.startsWith('http');
};
var addWebProtocol = function addWebProtocol(url) {
  return "https://".concat(url);
};
var getShortUrl = function getShortUrl(url) {
  return url.length > 20 ? "".concat(url.slice(0, 17), "...") : url;
};
var clearHtmlTags = function clearHtmlTags(html) {
  if (!html) return '';
  return new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
};
var convertText2Links = (0, _ramda.pipe)((0, _ramda.split)(/(https?:\/\/[^\s]+|www\.[^\s]+)/g), (0, _ramda.map)((0, _ramda.when)(getIsUrl, function (url) {
  var href = checkValidHttpUrl(url) ? url : addWebProtocol(url);
  return "<a href=\"".concat(href, "\" target=\"_blank\" rel=\"noopener noreferrer\" title=\"").concat(href, "\">").concat(getShortUrl(href), "</a>");
})), (0, _ramda.filter)(function (text) {
  return text && text.trim();
}), function (arr) {
  return arr.join('');
});
var prepareContent2Render = exports.prepareContent2Render = (0, _ramda.pipe)(clearHtmlTags, convertText2Links);
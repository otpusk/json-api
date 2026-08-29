"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareContent2Render = void 0;
var _ramda = require("ramda");
const getIsUrl = label => label.startsWith('http') || label.startsWith('www.');
const checkValidHttpUrl = url => url.startsWith('http');
const addWebProtocol = url => `https://${url}`;
const getShortUrl = url => url.length > 20 ? `${url.slice(0, 17)}...` : url;
const clearHtmlTags = html => {
  if (!html) return '';
  return new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
};
const convertText2Links = (0, _ramda.pipe)((0, _ramda.split)(/(https?:\/\/[^\s]+|www\.[^\s]+)/g), (0, _ramda.map)((0, _ramda.when)(getIsUrl, url => {
  const href = checkValidHttpUrl(url) ? url : addWebProtocol(url);
  return `<a href="${href}" target="_blank" rel="noopener noreferrer" title="${href}">${getShortUrl(href)}</a>`;
})), (0, _ramda.filter)(text => text && text.trim()), arr => arr.join(''));
const prepareContent2Render = exports.prepareContent2Render = (0, _ramda.pipe)(clearHtmlTags, convertText2Links);
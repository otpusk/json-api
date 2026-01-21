import { when, map, pipe, split, filter } from 'ramda';

const getIsUrl = label => label.startsWith('http') || label.startsWith('www.');
const checkValidHttpUrl = url => url.startsWith('http');
const addWebProtocol = url => `https://${url}`;
const getShortUrl = url => (url.length > 20 ? `${url.slice(0, 17)}...` : url);

const clearHtmlTags = html => {
  if (!html) return '';

  return new DOMParser()
    .parseFromString(html, 'text/html')
    .body.textContent || '';
};

const convertText2Links = pipe(
  split(/(https?:\/\/[^\s]+|www\.[^\s]+)/g),
  map(when(
    getIsUrl,
    url => {
      const href = checkValidHttpUrl(url) ? url : addWebProtocol(url);

      return `<a href="${href}" target="_blank" rel="noopener noreferrer" title="${href}">${getShortUrl(href)}</a>`;
    }
  )),
  filter(text => text && text.trim()),
  arr => arr.join('')
);

export const prepareContent2Render = pipe(
  clearHtmlTags,
  convertText2Links
);

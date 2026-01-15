import { ifElse, map, pipe, split, filter } from 'ramda';

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
  map(ifElse(
    getIsUrl,
    url => {
      const href = checkValidHttpUrl(url) ? url : addWebProtocol(url);
      return {
        type: 'link',
        url: href,
        text: getShortUrl(href),
      };
    },
    text => ({
      type: 'text',
      text,
    })
  )),
  filter(item => item.type === 'link' || (item.text && item.text.trim()))
);


export const prepareContent2Render = pipe(
  clearHtmlTags,
  convertText2Links
);

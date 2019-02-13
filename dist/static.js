"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CURRENCIES = exports.TRANSPORTS = exports.FOODS = exports.DEPARTURE_CITIES = void 0;
var DEPARTURE_CITIES = [{
  "id": 1934,
  "name": "Винница",
  "rel": "Винницы"
}, {
  "id": 1874,
  "name": "Днепр",
  "rel": "Днепра"
}, {
  "id": 2056,
  "name": "Житомир",
  "rel": "Житомира"
}, {
  "id": 1875,
  "name": "Запорожье",
  "rel": "Запорожья"
}, {
  "id": 1760,
  "name": "Ивано-Франковск",
  "rel": "Ивано-Франковска"
}, {
  "id": 1395,
  "name": "Каменец-Подольский",
  "rel": "Каменец-Подольского"
}, {
  "id": 1544,
  "name": "Киев",
  "rel": "Киева",
  "selected": true
}, {
  "id": 1666,
  "name": "Коломыя",
  "rel": "Коломыи"
}, {
  "id": 1883,
  "name": "Кривой Рог",
  "rel": "Кривого Рога"
}, {
  "id": 2024,
  "name": "Луцк",
  "rel": "Луцка"
}, {
  "id": 1397,
  "name": "Львов",
  "rel": "Львова"
}, {
  "id": 2166,
  "name": "Мелитополь",
  "rel": "Мелитополя"
}, {
  "id": 1963,
  "name": "Николаев",
  "rel": "Николаева"
}, {
  "id": 1358,
  "name": "Одесса",
  "rel": "Одессы"
}, {
  "id": 1952,
  "name": "Полтава",
  "rel": "Полтавы"
}, {
  "id": 1981,
  "name": "Ровно",
  "rel": "Ровно"
}, {
  "id": 1398,
  "name": "Ужгород",
  "rel": "Ужгорода"
}, {
  "id": 1880,
  "name": "Харьков",
  "rel": "Харькова"
}, {
  "id": 2012,
  "name": "Херсон",
  "rel": "Херсона"
}, {
  "id": 2025,
  "name": "Хмельницкий",
  "rel": "Хмельницкого"
}, {
  "id": 1708,
  "name": "Черновцы",
  "rel": "Черновцов"
}];
exports.DEPARTURE_CITIES = DEPARTURE_CITIES;
var FOODS = [{
  code: 'uai',
  label: 'Ультра все включено'
}, {
  code: 'ai',
  label: 'Все включено'
}, {
  code: 'fb',
  label: 'Полный пансион'
}, {
  code: 'hb',
  label: 'Завтрак и ужин'
}, {
  code: 'bb',
  label: 'Завтрак'
}, {
  code: 'ob',
  label: 'Без питания'
}];
exports.FOODS = FOODS;
var TRANSPORTS = [{
  code: 'air',
  label: 'Авиаперелет'
}, {
  code: 'bus',
  label: 'Автобус'
}, {
  code: 'train',
  label: 'Поезд'
}, {
  code: 'ship',
  label: 'Паром'
}, {
  code: 'no',
  label: 'Без транспорта'
}];
exports.TRANSPORTS = TRANSPORTS;
var CURRENCIES = [{
  code: 'uah',
  label: 'грн',
  symbol: '₴'
}, {
  code: 'usd',
  label: 'доллар',
  symbol: '$'
}, {
  code: 'eur',
  label: 'евро',
  symbol: '€'
}];
exports.CURRENCIES = CURRENCIES;
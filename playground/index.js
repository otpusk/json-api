import * as API from '../src';

const token = { 'access_token': '2e7cc-6e0df-c7f77-fbf2b-7f359' };

const query = {
    checkIn: "2019-07-25",
    checkTo: "2019-08-02",
    deptCity: 1544,
    food: "uai,ai,fb,hb,bb,ob",
    length: 7,
    lengthTo: 9,
    number: 0,
    people: 2,
    price: 56000,
    priceTo: 100000,
    services: "tz",
    stars: "1,2,3,4,5",
    to: "115",
    toCities: "711,712,714,715,1035,1037,1038,1247,1262,1901",
    transport: "air,bus,train,ship",
};

API.getToursSearch(token, query)
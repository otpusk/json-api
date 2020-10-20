import * as API from '../src';
import { getPriceExtraFares } from './../src/dictionary';

const token = { 'access_token': '1b204-25f04-4b78c-0b089-e27ea' };

const query = {
    // from: 1,
    // to: 11210,
    // checkIn: "2020-05-05",
    // checkTo: "2020-05-19",
    // length: 7,
    // people: 2,
    // transport: 'air',
    // rate: '0-10',
    // price: 500,
    // priceTo: 48100,
    // number: 2,
    // page: 1,
    // deptCity: 1544,
    // group: 1,
    deptCity: 1397,
to: 115,
stars: 3,
checkIn: '2020-09-05',
checkTo: '2020-09-14',
length: 3,
lengthTo: 11,
people: 2,
food: 'ai',
transport: 'air',
toCities: 965,
toHotels: 54621,
page: 1,
};
// https://export.otpusk.com/api/tours/hotels?countryId=34&cityId=899&geo=35.31631,25.38968&rad=1&with=price&access_token=1b204-25f04-4b78c-0b089-e27ea&callback=jsonp_1588787262425_4762
// API.getToursSearch(token, query).then(console.log);
// API.cacheValidate(token)
//     .then(() => API.getToursHotel(token, 7976))
// API.getToursHotels(token, 34, 899, { center: {lat: 35.31631, lng: 25.38968}, radius: 1}).then(console.log);
// API.getToursCurrencyRates(token, { from: '', to: '' }).then(console.log);
//
API.getToursFlightPort(token, 'SSH').then(console.log)

// API.getToursDates(token, { regionId: 1544 }).then(console.log);

// .then(console.log);

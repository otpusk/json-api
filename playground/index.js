import * as API from '../src';
import { getPriceExtraFares } from './../src/dictionary';

const token = { 'access_token': '53264-35d37-d10fa-0cf36-67c32' };

const query = {
    from: 1544,
    to: 115,
    stars: '4, 5',
    checkIn: "2021-03-15",
    checkTo: "2021-03-29",
    length: 7,
    lengthTo: 15,
    people: 2,
    transport: 'air',
    // rate: '0-10',
    // price: 500,
    // priceTo: 48100,
    // number: 2,
    // page: 1,
    // deptCity: 1544,
    // group: 1,
page: 1,
number: 2,
};
// https://export.otpusk.com/api/tours/hotels?countryId=34&cityId=899&geo=35.31631,25.38968&rad=1&with=price&access_token=1b204-25f04-4b78c-0b089-e27ea&callback=jsonp_1588787262425_4762
// API.getToursSearch(token, query).then(console.log);
// API.getToursOffer(token, '3310692830814499').then(console.log);
// API.getToursActual(token, '1800663620869018', 2).then(console.log);
API.getToursAgencies(token, { regionId:1, hotelId:'7908', offerId:'1681612960838494' }).then(console.log);
// API.cacheValidate(token)
//     .then(() => API.getToursHotel(token, 7976))
// API.getToursHotels(token, 34, 899, { center: {lat: 35.31631, lng: 25.38968}, radius: 1}).then(console.log);
// API.getToursCurrencyRates(token, { from: '', to: '' }).then(console.log);
//
// API.getToursFlightPort(token, 'SSH').then(console.log)

// API.getToursValidate(token, '2263694910748412').then(console.log)
// API.getToursDepartureCities(token).then(console.log)

// API.getToursDates(token, { regionId: 1544 }).then(console.log);
// API.getToursCities(token, '115').then(console.log);
// API.getToursCountries(token).then(console.log);
// API.getToursCountries(token).then(console.log);
// API.getToursGraph(token).then(console.log);
// API.getToursOperators(token, '115').then(console.log);
// API.getToursOrder(token).then(console.log);
// API.getToursRegions(token).then(console.log);
// API.getToursSimilar(token, '9749').then(console.log);
// API.getToursSuggests(token, 'Green Life Hotel').then(console.log).catch(console.log);

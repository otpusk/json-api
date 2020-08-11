import * as API from '../src';
import { getPriceExtraFares } from './../src/dictionary';

const token = { 'access_token': '1b204-25f04-4b78c-0b089-e27ea' };

const query = {
    from: 1,
    to: 11210,
    checkIn: "2020-05-05",
    checkTo: "2020-05-19",
    length: 7,
    people: 2,
    transport: 'air',
    rate: '0-10',
    price: 500,
    priceTo: 48100,
    number: 2,
    page: 1,
    deptCity: 1544,
    group: 1,
};
// https://export.otpusk.com/api/tours/hotels?countryId=34&cityId=899&geo=35.31631,25.38968&rad=1&with=price&access_token=1b204-25f04-4b78c-0b089-e27ea&callback=jsonp_1588787262425_4762
// API.getToursSearch(token, query).then(console.log);
// API.getToursHotels(token, 34, 899, { center: {lat: 35.31631, lng: 25.38968}, radius: 1}).then(console.log);
// API.getToursCurrencyRates(token, { from: '', to: '' }).then(console.log);
API.getToursOffer(token, 3242294540711413).then((offer) => {
    console.log(offer);
    console.log(getPriceExtraFares({ country: {} }, offer))
});
//
// API.getToursOffer(token, 2393529320809282).then(console.log)

// API.getToursDates(token, { regionId: 1544 }).then(console.log);

// API.getToursHotel(token, 7976).then(console.log);

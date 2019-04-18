import * as API from '../src';

const token = { 'access_token': '2716a-a6aa2-8ce60-439c2-641a5' };

// API.getToursHotBlock(token, 2189).then(({block, tours}) => {
//     console.log(block);

//     for (const tour of tours) {
//         API.getToursHotTour(token, block.block_id, tour).then((tour) => {
//             console.log(tour[0]);
//         })
//     }
// })

const query = {
    checkIn: "2019-04-25",
    checkTo: "2019-05-02",
    deptCity: 1544,
    food: "uai,ai,fb,hb,bb,ob",
    length: 7,
    lengthTo: 9,
    number: 0,
    page: 2,
    people: 2,
    price: 56000,
    priceTo: 100000,
    services: "tz",
    stars: "1,2,3,4,5",
    to: "115",
    toCities: "953,955,956,957,958,959,960,961,962,963,965,975,1567,2458,2464,2696,2755,3949",
    transport: "air,bus,train,ship"
};

API.getToursSearch(token, query).then(console.log)
// API.getToursCities(token, 1, {}).then(console.log)
import * as API from '../src';

const token = { 'access_token': '2e7cc-6e0df-c7f77-fbf2b-7f359' };

// API.getToursHotBlock(token, 2189).then(({block, tours}) => {
//     console.log(block);

//     for (const tour of tours) {
//         API.getToursHotTour(token, block.block_id, tour).then((tour) => {
//             console.log(tour[0]);
//         })
//     }
// })

API.getInit(token).then(console.log);
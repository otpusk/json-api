import * as API from '../src';

const token = { 'access_token': '2716a-a6aa2-8ce60-439c2-641a5' };

API.getToursHotBlock(token, 2189).then(({block, tours}) => {
    console.log(block);

    for (const tour of tours) {
        API.getToursHotTour(token, block.block_id, tour).then((tour) => {
            console.log(tour);
        })
    }
})
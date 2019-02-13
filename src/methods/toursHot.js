// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getToursHotBlock(token, blockId) {
    const {block, tours} = await makeCall(ENDPOINTS.hotBlock, { blockId, ...token });

    return {block, tours};
}

export async function getToursHotTour(token, blockId, tourId) {
    const { searchedTour: { offers } = {} } = await makeCall(ENDPOINTS.hotTour, { blockId, id: tourId, ...token });

    return offers;
}
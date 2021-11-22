import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getStaticData (query) {
    const { imageCategory } = await makeCall({
        endpoint: ENDPOINTS.static,
        query,
        ttl:      [7, 'days'],
    });

    return {
        photoCategories: imageCategory
            ? Object
                .entries(imageCategory)
                .map(([id, name]) => ({ id: Number(id), name }))
            : [],
    };
}

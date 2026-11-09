import { createQueryStringFromObject, makeCall } from "../fn";
import { ENDPOINTS } from "../config";

const CRM_METHODS = {
	similarHotels: "/api/similar_hotels",
};

function makeCrmCall(token, crmMethod, crmQuery) {
	return makeCall({
		endpoint: ENDPOINTS.mtapi,
		query: {
			...token,
			method: encodeURIComponent(`${crmMethod}?${createQueryStringFromObject(crmQuery)}`),
		},
	});
}

export async function getCrmSimilarHotels(token, hotelId, limit) {
	const { results } = await makeCrmCall(token, CRM_METHODS.similarHotels, {
		hotel_id: hotelId,
		limit,
	});

	return results.map(({ hotel_id_b: similarHotelId }) => String(similarHotelId));
}

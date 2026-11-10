import { makeCrmCall } from "../fn";

const CRM_METHODS = {
	similarHotels: "/api/similar_hotels",
};

export async function getCrmSimilarHotels(token, { hotelId, limit }) {
	const { results } = await makeCrmCall(token, CRM_METHODS.similarHotels, {
		hotel_id: hotelId,
		limit,
	});

	return results.map(({ hotel_id_b: similarHotelId }) => String(similarHotelId));
}

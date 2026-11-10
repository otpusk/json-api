import { makeCrmCall } from "../fn";
const CRM_METHODS = {
  similarHotels: "/api/similar_hotels"
};
export async function getCrmSimilarHotels(token, _ref) {
  let {
    hotelId,
    limit
  } = _ref;
  const {
    results
  } = await makeCrmCall(token, CRM_METHODS.similarHotels, {
    hotel_id: hotelId,
    limit
  });
  return results.map(_ref2 => {
    let {
      hotel_id_b: similarHotelId
    } = _ref2;
    return String(similarHotelId);
  });
}
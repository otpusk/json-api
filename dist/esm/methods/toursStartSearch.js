// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';
export async function getToursStartSearch(token) {
  let query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const response = await makeCall({
    endpoint: ENDPOINTS.startSearch,
    method: 'HEAD',
    query: {
      ...query,
      ...token
    }
  });
  return response;
}
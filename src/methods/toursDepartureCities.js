// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getToursDepartureCities (token, options = {}) {

    const { deptCities } = await makeCall(ENDPOINTS.departureCities, {
        ...token,
        ...options,
    }, [7, 'days']);

    return deptCities.map(
        ({ rel, ...rest }) => ({ ...rest, names: { rd: rel } })
    );

};
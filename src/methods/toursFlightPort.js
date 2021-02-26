// Instruments
import { makeCall } from '../fn';
import { ENDPOINTS } from '../config';

export async function getToursFlightPort (token, iata, options = {}) {

    const { port } = await makeCall({ endpoint: ENDPOINTS.flightPort,
        query: {
            iata,
            ...token,
            ...options,
        },
        ttl: [7, 'days']});

    const {
      id,
      countryId,
      countryIata,
      countryName,
      lat,
      lng,
      rel,
      ...rest 
    } = port;

    return {
      ...rest,
      country: {
        id: Number(countryId),
        name: countryName,
        iata: countryIata
      },
      id: Number(id),
      location: { lat, lng },
      names: { rd: rel }
    }
}

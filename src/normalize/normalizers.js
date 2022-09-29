import { normalize } from "normalizr";

import { offerSchema } from "./schemas";

export const normalizeOffer = (offer) => normalize(offer, offerSchema);

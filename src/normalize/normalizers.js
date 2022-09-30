import { normalize } from "normalizr";

import { offerSchema } from "./schemas";

export const normalizeOffer = (denormalizedOffer) => {
    const { entities: { offer }, result } = normalize(denormalizedOffer, offerSchema);

    return offer[result];
};

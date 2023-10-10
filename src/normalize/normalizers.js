import { normalize } from "normalizr";
import { append, call, curryN, filter, includes, pipe } from 'ramda';

import { offerSchema } from "./schemas";
import { TOUR_OPTIONS } from '../static';

export const normalizeOffer = (denormalizedOffer) => {
    const { entities: { offer }, result } = normalize(denormalizedOffer, offerSchema);

    return offer[result];
};

const applyRequirement = curryN(3, (tourOption, tourOptions, requirements) => {
    return includes(tourOption, tourOptions)
        ? requirements
        : append(tourOption, requirements);
});

const applyVisaRequirement = curryN(2, (tourOptions, requirements) => {
    return includes(TOUR_OPTIONS.NOT_NEED_VISA, tourOptions)
        ? requirements
        : append(TOUR_OPTIONS.VISA, requirements);
});

const applyGalaRequirement = curryN(2, (tourOptions, requirements) => {
    return includes(TOUR_OPTIONS.REQUIREMENT_GALA_DINNER, tourOptions)
        ? append(TOUR_OPTIONS.GALA_DINNER, requirements)
        : requirements;
});

export const normalizeRequiremenets = (tourOptions) => {
    return call(
        pipe(
            applyVisaRequirement(tourOptions),
            applyRequirement(TOUR_OPTIONS.INSURANCE, tourOptions),
            applyRequirement(TOUR_OPTIONS.TRANSFER, tourOptions),
            applyGalaRequirement(tourOptions)
        ),
        []
    );
};

export const excludeRequirementTourOptions = (tourOptions) => {
    const requirementOptions = new Set([
        TOUR_OPTIONS.NOT_NEED_VISA,
        TOUR_OPTIONS.REQUIREMENT_GALA_DINNER
    ]);

    return filter(
        (option) => !requirementOptions.has(option),
        tourOptions
    );
};

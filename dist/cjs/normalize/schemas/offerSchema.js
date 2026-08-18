"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offerSchema = void 0;
var _normalizr = require("normalizr");
var _normalizers = require("../normalizers");
var _parsers = require("../parsers");
const applyTimeZoneToOfferUpdateTime = updateTime => (0, _normalizers.applyTimeZoneToDate)(updateTime, 'YYYY-MM-DD HH:mm:ss');
const offerSchema = exports.offerSchema = new _normalizr.schema.Entity('offer', {}, {
  idAttribute: _ref => {
    let {
      i
    } = _ref;
    return String(i);
  },
  processStrategy: input => {
    const {
      ad: additionalPayments = [],
      i: id,
      hi: hotelId,
      d: date,
      dpl: oldPriceUah,
      dp: oldPriceCurrency,
      l: length,
      n: nights,
      nh: nightsInHotel,
      a: adults,
      ah: people,
      h: children,
      hr: childAgesArray,
      ha: childrenAge,
      f: food,
      fn: foodFullName,
      c: departure,
      o: tourOptions,
      oi: operator,
      r: roomName,
      ri: roomId,
      ti: tourId,
      y: roomType,
      s: promoValue,
      ss: stopsale,
      sd: sourceOperatorData,
      t: transport,
      to: flights,
      tn: informationOfCrossTour,
      vi: code,
      u: currency = null,
      ul: currencyLocal = null,
      ur: currencyRate,
      uo: currencyOperatorRate,
      last: updateTime,
      pto: priceOperator,
      plo: priceOperatorLocal,
      os: subOperator,
      gds: isTransportGDS = false,
      b: bookingUrl,
      bh: bronURL = '',
      ohn: hotelNameByOperator,
      bo: bookingInfo,
      bq: bookingQuota,
      pm: scheduleOfBookingPayments,
      ohd: isOperatorHotelDescriptionConfigured = false
    } = input;

    /* travel insurance for TPG */
    if (operator === 2700) {
      tourOptions.push('travelinsurance');
    }
    const promo = (0, _parsers.parsePromo)(promoValue);
    const [hash] = bronURL ? bronURL.split('|') : [null];
    const entity = {
      id: String(id),
      code,
      date,
      days: length,
      nights,
      nightsInHotel,
      adults: Number(adults),
      children,
      childrenAge: childrenAge ? childrenAge.replace(/^\((\d+-\d+)\).*/g, '$1').replace('0-', '1-') : '1-16',
      childrenAges: (0, _parsers.parseChildrenAges)(childAgesArray),
      food,
      foodFullName,
      departure,
      includes: (0, _normalizers.excludeRequirementTourOptions)(tourOptions),
      requirements: (0, _normalizers.normalizeRequiremenets)(tourOptions),
      operator,
      room: {
        id: roomId,
        name: roomName,
        type: roomType
      },
      price: (0, _parsers.parseOfferPrice)(input),
      oldPrice: oldPriceCurrency && oldPriceUah ? {
        uah: oldPriceUah,
        [currency]: oldPriceCurrency
      } : undefined,
      priceByOperator: {
        [currency]: priceOperator,
        [currencyLocal]: priceOperatorLocal
      },
      currency,
      currencyLocal,
      discountPrice: (0, _parsers.parseDiscountPrice)(input),
      stopsale,
      transport,
      flights: (0, _parsers.parseFlights)(flights || {}),
      tourId,
      hotelId,
      additionalPayments,
      currencyRate,
      currencyOperatorRate,
      updateTime: applyTimeZoneToOfferUpdateTime(updateTime),
      people: (0, _parsers.parsePeople)(people, childAgesArray),
      isCrossTour: tourOptions.includes('crosstour'),
      informationOfCrossTour,
      ...(promo && promo),
      subOperator: (0, _parsers.parseSubOperator)(subOperator),
      isTransportGDS,
      bookingUrl,
      hash,
      hotelNameByOperator,
      bookingInfo: bookingInfo ? (0, _parsers.extractBookingData)(bookingInfo) : null,
      bookingQuota: bookingQuota ? (0, _parsers.extractBookingData)(bookingQuota) : null,
      scheduleOfBookingPayments: scheduleOfBookingPayments ? (0, _parsers.scheduleOfBookingPaymentsMapper)(scheduleOfBookingPayments) : null,
      externalOperatorData: (0, _parsers.extractExternalOperatorData)(sourceOperatorData),
      hasOperatorHotelDescription: isOperatorHotelDescriptionConfigured
    };
    return entity;
  }
});
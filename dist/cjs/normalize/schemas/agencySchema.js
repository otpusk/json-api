"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.agencySchema = exports.agencyOfficeSchema = void 0;
var _normalizr = require("normalizr");
var _parsers = require("../parsers");
// Core

// Instruments

const buildPhone = (number, viber, whatsapp) => ({
  number,
  viber: viber && number && number.replace(/\D/g, ''),
  whatsapp: whatsapp && number && number.replace(/\D/g, '')
});
const agencyOfficeSchema = exports.agencyOfficeSchema = new _normalizr.schema.Entity('office', {}, {
  idAttribute: _ref => {
    let {
      officeId
    } = _ref;
    return String(officeId);
  },
  processStrategy: input => {
    const {
      officeId: id,
      address,
      city: region,
      agencyId: agency,
      fPhone1 = false,
      fPhone2 = false,
      fPhone3 = false,
      phoneViber1 = false,
      phoneViber2 = false,
      phoneViber3 = false,
      phoneWhatsapp1 = false,
      phoneWhatsapp2 = false,
      phoneWhatsapp3 = false,
      district,
      rn: area,
      callback,
      messenger,
      skype,
      telegram,
      image
    } = input;
    return {
      image,
      id,
      location: (0, _parsers.parseLocation)(input),
      address,
      region,
      agency,
      district,
      area,
      messenger,
      skype,
      telegram,
      options: {
        callback: Boolean(callback)
      },
      phones: [buildPhone(fPhone1, phoneViber1, phoneWhatsapp1), buildPhone(fPhone2, phoneViber2, phoneWhatsapp2), buildPhone(fPhone3, phoneViber3, phoneWhatsapp3)].filter(_ref2 => {
        let {
          number
        } = _ref2;
        return Boolean(number);
      })
    };
  }
});
const agencySchema = exports.agencySchema = new _normalizr.schema.Entity('agency', {
  offices: new _normalizr.schema.Array(agencyOfficeSchema)
}, {
  idAttribute: _ref3 => {
    let {
      advertId
    } = _ref3;
    return String(advertId);
  },
  processStrategy: (input, parent) => {
    const {
      advertId: adId,
      agencyId: id,
      clickId = null,
      clickText: text = null,
      logoBigFile: logo,
      operatorId: opearator,
      title,
      url: website,
      type,
      offices,
      present: giftText = null,
      gift: giftType
    } = input;
    const isOnline = !(offices && offices.length) && text;
    return {
      id: String(id),
      adId: String(adId),
      clickId,
      text,
      title,
      logo: `https://www.otpusk.com/logos/${logo}`,
      opearator,
      website,
      gift: giftText && {
        text: giftText,
        type: giftType
      },
      type,
      offices,
      adGroupId: parent.id,
      isOnline
    };
  }
});
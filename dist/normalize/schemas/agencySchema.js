"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.agencySchema = exports.agencyOfficeSchema = void 0;
var _normalizr = require("normalizr");
var _parsers = require("../parsers");
// Core

// Instruments

var buildPhone = function buildPhone(number, viber, whatsapp) {
  return {
    number: number,
<<<<<<< HEAD
    viber: viber && number.replace(/\D/g, ''),
    whatsapp: whatsapp && number.replace(/\D/g, '')
=======
    viber: viber && number && number.replace(/\D/g, ''),
    whatsapp: whatsapp && number && number.replace(/\D/g, '')
>>>>>>> 0f66276eb51f40fcd2fa3b0bf92b68c40127275b
  };
};
var agencyOfficeSchema = exports.agencyOfficeSchema = new _normalizr.schema.Entity('office', {}, {
  idAttribute: function idAttribute(_ref) {
    var officeId = _ref.officeId;
    return String(officeId);
  },
  processStrategy: function processStrategy(input) {
    var id = input.officeId,
      address = input.address,
      region = input.city,
      agency = input.agencyId,
      _input$fPhone = input.fPhone1,
      fPhone1 = _input$fPhone === void 0 ? false : _input$fPhone,
      _input$fPhone2 = input.fPhone2,
      fPhone2 = _input$fPhone2 === void 0 ? false : _input$fPhone2,
      _input$fPhone3 = input.fPhone3,
      fPhone3 = _input$fPhone3 === void 0 ? false : _input$fPhone3,
      _input$phoneViber = input.phoneViber1,
      phoneViber1 = _input$phoneViber === void 0 ? false : _input$phoneViber,
      _input$phoneViber2 = input.phoneViber2,
      phoneViber2 = _input$phoneViber2 === void 0 ? false : _input$phoneViber2,
      _input$phoneViber3 = input.phoneViber3,
      phoneViber3 = _input$phoneViber3 === void 0 ? false : _input$phoneViber3,
      _input$phoneWhatsapp = input.phoneWhatsapp1,
      phoneWhatsapp1 = _input$phoneWhatsapp === void 0 ? false : _input$phoneWhatsapp,
      _input$phoneWhatsapp2 = input.phoneWhatsapp2,
      phoneWhatsapp2 = _input$phoneWhatsapp2 === void 0 ? false : _input$phoneWhatsapp2,
      _input$phoneWhatsapp3 = input.phoneWhatsapp3,
      phoneWhatsapp3 = _input$phoneWhatsapp3 === void 0 ? false : _input$phoneWhatsapp3,
      district = input.district,
      area = input.rn,
      callback = input.callback,
      messenger = input.messenger,
      skype = input.skype,
      telegram = input.telegram,
      image = input.image;
    return {
      image: image,
      id: id,
      location: (0, _parsers.parseLocation)(input),
      address: address,
      region: region,
      agency: agency,
      district: district,
      area: area,
      messenger: messenger,
      skype: skype,
      telegram: telegram,
      options: {
        callback: Boolean(callback)
      },
      phones: [buildPhone(fPhone1, phoneViber1, phoneWhatsapp1), buildPhone(fPhone2, phoneViber2, phoneWhatsapp2), buildPhone(fPhone3, phoneViber3, phoneWhatsapp3)].filter(function (_ref2) {
        var number = _ref2.number;
        return Boolean(number);
      })
    };
  }
});
var agencySchema = exports.agencySchema = new _normalizr.schema.Entity('agency', {
  offices: new _normalizr.schema.Array(agencyOfficeSchema)
}, {
  idAttribute: function idAttribute(_ref3) {
    var advertId = _ref3.advertId;
    return String(advertId);
  },
  processStrategy: function processStrategy(input, parent) {
    var adId = input.advertId,
      id = input.agencyId,
      _input$clickId = input.clickId,
      clickId = _input$clickId === void 0 ? null : _input$clickId,
      _input$clickText = input.clickText,
      text = _input$clickText === void 0 ? null : _input$clickText,
      logo = input.logoBigFile,
      opearator = input.operatorId,
      title = input.title,
      website = input.url,
      type = input.type,
      offices = input.offices,
      _input$present = input.present,
      giftText = _input$present === void 0 ? null : _input$present,
      giftType = input.gift;
    var isOnline = !(offices && offices.length) && text;
    return {
      id: String(id),
      adId: String(adId),
      clickId: clickId,
      text: text,
      title: title,
      logo: "https://www.otpusk.com/logos/".concat(logo),
      opearator: opearator,
      website: website,
      gift: giftText && {
        text: giftText,
        type: giftType
      },
      type: type,
      offices: offices,
      adGroupId: parent.id,
      isOnline: isOnline
    };
  }
});
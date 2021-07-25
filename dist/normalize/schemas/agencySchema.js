"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.agencySchema = exports.mapAgencyOffice = void 0;

var _normalizr = require("normalizr");

var _parsers = require("../parsers");

// Core
// Instruments
var mapAgencyOffice = function mapAgencyOffice(office) {
  var id = office.officeId,
      address = office.address,
      region = office.city,
      agency = office.agencyId,
      _office$fPhone = office.fPhone1,
      fPhone1 = _office$fPhone === void 0 ? false : _office$fPhone,
      _office$fPhone2 = office.fPhone2,
      fPhone2 = _office$fPhone2 === void 0 ? false : _office$fPhone2,
      _office$fPhone3 = office.fPhone3,
      fPhone3 = _office$fPhone3 === void 0 ? false : _office$fPhone3,
      _office$phoneViber = office.phoneViber1,
      phoneViber1 = _office$phoneViber === void 0 ? false : _office$phoneViber,
      _office$phoneViber2 = office.phoneViber2,
      phoneViber2 = _office$phoneViber2 === void 0 ? false : _office$phoneViber2,
      _office$phoneViber3 = office.phoneViber3,
      phoneViber3 = _office$phoneViber3 === void 0 ? false : _office$phoneViber3,
      district = office.district,
      area = office.rn,
      callback = office.callback,
      messenger = office.messenger,
      skype = office.skype,
      telegram = office.telegram,
      image = office.image;
  return {
    image: image,
    id: id,
    location: (0, _parsers.parseLocation)(office),
    address: address,
    region: region,
    agency: agency,
    district: district,
    area: area,
    messenger: messenger,
    skype: skype,
    telegram: telegram,
    options: {
      callback: !!callback
    },
    phones: [{
      number: fPhone1,
      viber: phoneViber1
    }, {
      number: fPhone2,
      viber: phoneViber2
    }, {
      number: fPhone3,
      viber: phoneViber3
    }].filter(function (_ref) {
      var number = _ref.number;
      return Boolean(number);
    })
  };
};

exports.mapAgencyOffice = mapAgencyOffice;
var agencySchema = new _normalizr.schema.Entity('agency', {}, {
  idAttribute: function idAttribute(_ref2) {
    var advertId = _ref2.advertId;
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
        office = input.office,
        _input$present = input.present,
        giftText = _input$present === void 0 ? null : _input$present,
        giftType = input.gift;
    var isOnline = !office && text;
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
      office: mapAgencyOffice(office),
      adGroupId: parent.id,
      isOnline: isOnline
    };
  }
});
exports.agencySchema = agencySchema;
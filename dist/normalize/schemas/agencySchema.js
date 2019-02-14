"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.agencySchema = exports.agencyOfficeSchema = void 0;

var _normalizr = require("normalizr");

var _parsers = require("../parsers");

// Core
// Instruments
var agencyOfficeSchema = new _normalizr.schema.Entity('office', {}, {
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
        district = input.district,
        area = input.rn;
    return {
      id: id,
      location: (0, _parsers.parseLocation)(input),
      address: address,
      region: region,
      agency: agency,
      district: district,
      area: area,
      phones: [{
        number: fPhone1,
        viber: phoneViber1
      }, {
        number: fPhone2,
        viber: phoneViber2
      }, {
        number: fPhone3,
        viber: phoneViber3
      }].filter(function (_ref2) {
        var number = _ref2.number;
        return Boolean(number);
      })
    };
  }
});
exports.agencyOfficeSchema = agencyOfficeSchema;
var agencySchema = new _normalizr.schema.Entity('agency', {
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
exports.agencySchema = agencySchema;
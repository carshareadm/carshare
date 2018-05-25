/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
const config = require('../config');
const smsClient = require('twilio')(config.twilio.accountSid, config.twilio.authToken);

/**
 * send an sms via twilio
 * @param {*} to - a valid AU mobile number
 * @param {*} msg  - the sms body
 */
export const sendSMS = (to, msg) => {
  let sendTo = to;
  if (to.indexOf('04') === 0) {
    sendTo = '+61' + to.slice(1);
  }
  if (sendTo.indexOf('+') !== 0) {
    throw 'sendSMS: invalid mobile number';
  }
  return smsClient.messages.create({
    body: msg,
    to: sendTo,
    from: config.twilio.sendSmsFrom,
  });
};
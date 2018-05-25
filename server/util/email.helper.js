/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 *               - Inga Pflaumer
 *               - Jason Koh
 */
const config = require('../config');
import moment from 'moment';

import Booking from "../models/booking";
import Coordinate from "../models/coordinate"

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/*
  Sends confirmation code by email
*/
export const sendConfirmAccountUpdateEmail = (sendEmailTo, confirmationCode) => {
  const subject = 'ShaCar - Account update confirmation code';
  const body = `<p>
                  Here is your confirmation code:
                </p>
                <h1>${confirmationCode}</h1>
                <p>This code will expire in 10 minutes</p>
                <br />
                <br />
                <br />
                * this is an automated email sent from the ShaCar system
                `;
  const sendFrom = config.sendGrid.sendEmailsFrom;
  const msg = {
    to: sendEmailTo,
    from: sendFrom,
    subject: subject,
    html: body,
  };

  sgMail.send(msg);
};

/*
  Sends email to enquirer when enquiry received and
  sends enquiry to admin.
*/
export const sendEnquiryCopyEmails = (newEnquiry) => {
  const enquiryId = newEnquiry._id;
  const enquiryEmail = newEnquiry.emailFrom;
  const enquiryName = newEnquiry.name;
  const sendFrom = config.sendGrid.sendEmailsFrom;

  // email to enquirer
  const subject1 = `ShaCar - Enquiry received, id: ${enquiryId}`;
  const messageHtml = textToHtml(newEnquiry.message);
  const body1 = `
    <p>This is an automated email to confirm we have received your enquiry:</p>
    <blockquote>
    ${messageHtml}
    </blockquote>
    <p>
    We will respond to your enquiry as soon as possible. If your enquiry is
    urgent, please call us on 1300 000 123. For emergency rescue, medical,
    or police services, please ring 000.
    </p>
  `;
  const msg1 = {
    to: enquiryEmail,
    from: sendFrom,
    subject: subject1,
    html: body1,
  };

  sgMail.send(msg1);

  // email to admin
  const subject2 = `ShaCar - Enquiry from ${enquiryName} id: ${enquiryId}`;
  const body2 = `
    <p>Enquiry received from: ${enquiryName + ' <' + enquiryEmail + '>'}</p>
    <blockquote>
    ${messageHtml}
    </blockquote>
  `;
  const msg2 = {
    to: sendFrom,
    from: sendFrom,
    reply_to: enquiryEmail,
    subject: subject2,
    html: body2,
  };

  sgMail.send(msg2);
};

/*
  Sends email to enquirer and copy to admin when a response
  is entered for an enquiry.
 */
export const sendEnquiryResponseEmail = (respondedEnquiry) => {
  const enquiryId = respondedEnquiry._id;
  const enquiryEmail = respondedEnquiry.emailFrom;
  const sendFrom = config.sendGrid.sendEmailsFrom;
  const subject = `ShaCar - Response to enquiry id: ${enquiryId}`;
  const messageHtml = textToHtml(respondedEnquiry.message);
  const responseHtml = textToHtml(respondedEnquiry.response);
  const body = `
    <p>Thank you for your enquiry:</p>
    <blockquote>
    ${messageHtml}
    </blockquote>
    <hr />
    <p>Below is our response:</p>
    <p>
    ${responseHtml}
    </p>
    <p>
    Please do not hesitate to contact us again if you have further questions.
    <br /><br />
    Shacar Administration
    </p>
  `;
  const msg = {
    to: enquiryEmail,
    from: sendFrom,
    bcc: sendFrom,
    subject: subject,
    html: body,
  };

  sgMail.send(msg);
};

export const sendLicImageUpdateEmails = (user) => {
  const userEmail = user.email;
  const userMobile = user.mobile;
  const sendFrom = config.sendGrid.sendEmailsFrom;
  const subject1 = `New License image for ${userEmail} awaiting approval`
  const body1 = `
    <p>
    User ${userEmail}, mobile number ${userMobile} <br />
    has uploaded a new license image, which is awaiting approval.
    </p>
   `;
  const msg1 = {
    to: sendFrom,
    from: sendFrom,
    subject: subject1,
    html: body1,
  };

  sgMail.send(msg1);

  // email user
  const subject2 = `ShaCar - New license image uploaded`;
  const body2 = `
    <p>
    We have received an upload of your new license image. Please bear with us
    while we check and approve the new license image.
    </p>
    <p>
    If you did not upload a new license image, please call us immediately
    on 1300 000 123.
    <br /><br />
    Shacar Administration
    </p>
  `
  const msg2 = {
    to: userEmail,
    from: sendFrom,
    subject: subject2,
    html: body2,
  };

  sgMail.send(msg2);
};

/*
  Sends email when license image approved
*/
export const sendLicImageApprovedEmail = (user) => {
  const userEmail = user.email;
  const sendFrom = config.sendGrid.sendEmailsFrom;
  const subject = `ShaCar - User ${userEmail} new license image approved`
  const body = `
    <p>
    Your uploaded license image has been approved.
    You can now book cars with ShaCar.
    </p>
   `;
  const msg = {
    to: userEmail,
    bcc: sendFrom,
    from: sendFrom,
    subject: subject,
    html: body,
  };

  sgMail.send(msg);
};


// converts multiline text to html text with breaks
function textToHtml(text)
{
  const reducer = (html, line) => html + line + '<br />'
  return text.split(/\r\n|\n|\r/).reduce(reducer, '');
}


function sendBookingIssueEmail(booking){
  const sendTo = config.sendGrid.sendAdminEmailsTo;
  const subject = `ShaCar - Car wasn't returned on time for booking: ${booking._id}`;
  const body = `
    <p>There was an issue with booking</p>
    <hr />
    <p>The car ${booking.car.make} ${booking.car.model} wasn't at its location
    at the end of booking id: ${booking._id}.</p>
    <br /><br />
    <p>
    Shacar Administration
    </p>
  `;
  const msg = {
    to: sendTo,
    from: sendTo,
    bcc: sendTo,
    subject: subject,
    html: body,
  };

  sgMail.send(msg);
}

export const checkLocationBookingEnd = async function(move){
  const booking = await 
    Booking.findOne({
        endsAt:{$gt:moment().subtract(1, "h"), $lt:moment()}, 
        car:move.car,
    }).populate({
        path: 'car',
        populate: {
          path: 'location',
          populate: {path: 'coordinates'},
        },
    });
    if(!booking){
      console.log("No unreturned cars");
      return;
    }
    const carCoord = booking.car.location.coordinates;
    const currentCoord = await Coordinate.findOne(move.coordinates);
  
    if(carCoord.latitude!=currentCoord.latitude || carCoord.longitude!=currentCoord.longitude){
      console.log("Car is in the wrong place");
      sendBookingIssueEmail(booking);
    } else {
      console.log("Car is in the right place");
    }
}

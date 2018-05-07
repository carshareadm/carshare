const config = require('../config');

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
}

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
}

function textToHtml(text)
{
  const reducer = (html, line) => html + line + '<br />'
  return text.split(/\r\n|\n|\r/).reduce(reducer, '');
}

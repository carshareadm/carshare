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
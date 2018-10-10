const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice'); //inlines the styles for email
const htmlToText = require('html-to-text');
const {promisify} = require('es6-promisify');

const transport = nodemailer.createTransport({
  port: process.env.MAIL_PORT,
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }
});

const generateHtml = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
  const inlinedHtml = juice(html);
  return inlinedHtml;
}; 

exports.send = async options => {
  const html = generateHtml(options.filename, options);
  const text = htmlToText.fromString(html);

  const mailOptions = {
    from: 'The Grind <noreply@thegrind.com>',
    to: options.user.email,
    subject: options.subject,
    html,
    text
  };
  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions);
};

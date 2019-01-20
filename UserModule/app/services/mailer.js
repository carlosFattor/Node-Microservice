const sgMail = require('@sendgrid/mail');
const mustache = require('mustache');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const api = {};
const root = path.resolve(__dirname);
const URI = 'http://localhost:8080';

function _sendEmail2RecoverPassword(paramsEmail) {
  const templateContact = fs.readFileSync(root + '/template/recoverPassword.html', 'utf8');
  mustache.parse(templateContact);
  const contactHtml = mustache.render(templateContact, paramsEmail);
  const msg = {
    to: paramsEmail.to,
    from: paramsEmail.from,
    subject: 'Email de recuperação de senha',
    html: contactHtml,
  };
  sgMail.send(msg);
}

api.sendEmail2RecoverPassword = (paramsEmail) => {
  paramsEmail.link = URI + '/recover-password/validate/' + paramsEmail.token;
  _sendEmail2RecoverPassword(paramsEmail);
};

module.exports = Object.assign({}, api);
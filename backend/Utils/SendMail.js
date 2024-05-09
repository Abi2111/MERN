const mailer = require('nodemailer');

const sendMail = async options => {
  const transport = mailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
      user: '3423c26ff51f23',
      pass: process.env.MAILPASSWORD,
    },
  });

  const message = {
    from: process.env.MAIL,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transport.sendMail(message);
};

module.exports = sendMail;

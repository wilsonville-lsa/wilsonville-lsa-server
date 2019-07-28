const { createHttpError } = require('../../error');
const nodemailer = require('nodemailer');

const configureMail = (req, res, next) => {
  const { name, email, text } = req.body.message;

  if(!name || !email || !text) return next(createHttpError(401, 'Incomplete form'));

  req.body.mailOptions = {
    from: `${name} <${email}>`,
    to: 'ethereal@email.com',
    subject: 'Inquiry',
    html: `
    <p><strong>Name: ${name}</strong></p>
    <p><strong>Email: ${email}</strong></p>
    <p><strong>Message:</strong><br />${text}</p>`
  };

  req.body.mailOptionsConfirm = {
    from: 'Wilsonville Baha\'i',
    to: email,
    subject: 'Email Confirmation',
    html: `
    <p>Thank you for your message. We will respond to your inquiry within 3-5 business days.</p>
    <p><strong>Your Message:</strong><br />${text}</p>
    <p>Warmly,<br />The Wilsonville Baha'i Community</p>`
  };

  return nodemailer.createTestAccount()
    .then(testAccount => {
      const { user, pass } = testAccount;
  
      const mailConfig = {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user,
          pass
        }
      };

      req.body.transporter = nodemailer.createTransport(mailConfig);
    
      return next();
    })
    .catch(next);
};

module.exports = { configureMail };

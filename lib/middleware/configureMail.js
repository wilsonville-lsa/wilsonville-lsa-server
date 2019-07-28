const { createHttpError } = require('./error');
const nodemailer = require('nodemailer');

const configureMail = (req, res, next) => {
  let mailConfig = {};
  const { name, email, text } = req.body.message;

  if(!name || !email || !text) return next(createHttpError(401, 'Incomplete form'));

  req.body.mailOptions = {
    from: `${name} <${email}>`,
    to: process.env.EMAIL_USER,
    subject: 'Inquiry',
    html: `
    <p><strong>Name: ${name}</strong></p>
    <p><strong>Email: ${email}</strong></p>
    <p><strong>Message:</strong><br />${text}</p>`
  };

  return nodemailer.createTestAccount()
    .then(testAccount => {
      if(process.env.NODE_ENV !== 'production') {
        const { user, pass } = testAccount;
  
        mailConfig = {
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user,
            pass
          }
        };
      } else {
        mailConfig = {
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        };
      }

      req.body.transporter = nodemailer.createTransport(mailConfig);
    
      return next();
    })
    .catch(next);
};

module.exports = { configureMail };

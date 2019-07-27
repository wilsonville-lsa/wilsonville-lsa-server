require('dotenv').config();
const { Router } = require('express');
const nodemailer = require('nodemailer');

module.exports = Router()
  .post('/', (req, res, next) => {
    let mailConfig = {};

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

        const transporter = nodemailer.createTransport(mailConfig);
    
        return transporter.sendMail(req.body)
          .then(info => {
            res.send({
              info,
              previewUrl: nodemailer.getTestMessageUrl(info)
            });
          })
          .catch(next);
      })
      .catch(next);
  });

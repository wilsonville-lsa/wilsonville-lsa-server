require('dotenv').config();
const { Router } = require('express');
const nodemailer = require('nodemailer');
const { configureMail } = require('../middleware/mail/configureMail');

module.exports = Router()
  .post('/', configureMail, (req, res, next) => {
    const { mailOptions, transporter, mailOptionsConfirm } = req.body;

    Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(mailOptionsConfirm)
    ])
      .then(([info, confirmInfo]) => {
        res.send({
          previewUrl: nodemailer.getTestMessageUrl(info),
          previewUrlConfirm: nodemailer.getTestMessageUrl(confirmInfo)
        });
      })
      .catch(next);
  });

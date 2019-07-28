require('dotenv').config();
const { Router } = require('express');
const { configureMail } = require('../middleware/configureMail');
const nodemailer = require('nodemailer');

module.exports = Router()
  .post('/', configureMail, (req, res, next) => {
    const { mailOptions, transporter } = req.body;

    return transporter.sendMail(mailOptions)
      .then(info => {
        res.send({
          info,
          previewUrl: nodemailer.getTestMessageUrl(info)
        });
      })
      .catch(next);
  });

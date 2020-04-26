const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

//@route    POST api/email
//@desc     Sends Email
//@access   Public

router.post(
  '/',
  [
    check('email', 'Enter valid email').isEmail(),
    check('password', 'Password is require').not().isEmpty(),
    check('subject', 'Email subject is require').not().isEmpty(),
    check('body', 'Email body is require').not().isEmpty(),
    check('emailTo', 'Enter receivers name').isEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, subject, body, emailTo } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
    });

    const mailOptions = {
      from: email,
      to: emailTo,
      subject: subject,
      text: body,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(400).json({ error: error });
      } else {
        res.send('Email sent: ' + info.response);
      }
    });

    res.send('Email Route');
  }
);

module.exports = router;

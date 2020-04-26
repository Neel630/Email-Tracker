const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const Email = require('../../model/Email');

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
  async (req, res) => {
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
      html: `<p>${body}</p><p><img src ="localhost:5000/api/email/"></p>`,
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        return res.status(400).json({ error: error });
      } else {
        const emailFields = {};
        emailFields.email = email;
        emailFields.emailTo = emailTo;
        emailFields.count = 0;
        emailFields.date = Date.now();
        const emailObj = new Email(emailFields);
        try {
          await emailObj.save();
        } catch (error) {
          console.error(error);
          return res.status(500).send('Server Error');
        }

        return res.send('Email sent: ' + info.response);
      }
    });
  }
);

module.exports = router;

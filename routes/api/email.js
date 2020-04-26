const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
  console.log(req.body);
  res.send('Email Route');
});

module.exports = router;

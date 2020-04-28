const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const Email = require("../../model/Email");
const Image = require("../../model/Image");
var fs = require("fs");
const mongoose = require("mongoose");
//return Id of Image and save if image doesnt exist

// Use this function to save Image

//  const saveImage = () => {
//   let ImageModel = new Image();
//   ImageModel.contentType = "image/jpg";
//   ImageModel.name = "sample_image1";
//   try{
//     ImageModel.img.data = fs.readFileSync(__dirname +'/sample_image1.jpg')
//   }
//   catch(err){
//     console.log(err)
//   }
//   ImageModel.save((error, data) => {
//     if (error) {
//       console.log(error);
//     }
//   });
// };

// saveImage()

//@route    POST api/email
//@desc     Sends Email
//@access   Public

router.post(
  "/",
  [
    check("email", "Enter valid email").isEmail(),
    check("password", "Password is require").not().isEmpty(),
    check("subject", "Email subject is require").not().isEmpty(),
    check("body", "Email body is require").not().isEmpty(),
    check("emailTo", "Enter receivers name").isEmail(),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, subject, body, emailTo } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });

    const mailOptions = {
      from: email,
      to: emailTo,
      subject: subject,
      html: `<p>${body}</p><img src="http://localhost:5000/api/email/track/548" height="100px" width="1" />`,
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
          return res.status(500).send("Server Error");
        }

        return res.send("Email sent: " + info.response);
      }
    });
  }
);

//@route    GET api/email/track/:id
//@desc     Sends Email
//@access   Public

router.get("/track/:id", (req, res) => {
  Image.findOne({ name: "sample_image1" }, (err, image) => {
    if (err) {
      console.log(err);
      //return res.send(err)
    }
    if (image.img.data) {
      console.log(image)
      res.set("Content-Type", image.img.contentType);
      return res.send(image.img.data);
    }
  });
});

module.exports = router;

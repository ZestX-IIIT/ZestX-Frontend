const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../configs/database");
require("dotenv").config();
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "verify.zestx@gmail.com",
    pass: "7s`swkX9wz`xHr9U",
  },
});

exports.signUp = (req, res) => {
  const { user_name, email, password, mobile } = req.body;

  client
    .query(`SELECT *FROM users where email = '${email}'`)
    .then((data) => {
      let isValid = data.rows;

      if (isValid.length != 0) {
        res.status(400).json({
          error: "User already exists",
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: "Internal server error",
            });
          } else {
            const user = {
              username: user_name,
              email,
              password: hash,
              mobile,
            };

            var mailOptions = {
              from: "verify.zestx@gmail.com",
              to: `${user.email}`,
              subject: "Sending Email using Node.js",
              text: "That was easy!",
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });

            client
              .query(
                `INSERT INTO users (user_name, email, password, mobile, is_verified) VALUES ('${user.username}', '${user.email}', '${user.password}', '${user.mobile}', false);`
              )
              .then((data1) => {
                const token = jwt.sign(
                  {
                    email: email,
                  },
                  "" + process.env.SECRET_KEY
                );

                res.status(200).json({
                  message: "User added successfully",
                  token: token,
                });
              })
              .catch((err1) => {
                res.status(500).json({
                  error: `${err1}`,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "database error occured !",
      });
    });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  client
    .query(`SELECT *FROM users where email = '${email}'`)
    .then((data) => {
      let userData = data.rows;

      if (userData.length == 0) {
        res.status(400).json({
          error: "User does not exists, Please sign up!",
        });
      } else {
        bcrypt.compare(password, userData[0].password, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({
              error: "server error occured!",
            });
          } else if (result) {
            const token = jwt.sign(
              {
                email: email,
              },
              "" + process.env.SECRET_KEY
            );

            res.status(200).json({
              message: "User signed in successfully",
              token: token,
            });
          } else {
            res.status(400).json({
              error: "Enter correct password!",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "database error occured!",
      });
    });
};

import SellerUsers from "../../models/sellersInfoModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config.js";
import nodemailer from "nodemailer";
import sendgridtransport from "nodemailer-sendgrid-transport";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport(
  sendgridtransport({
    auth: {
      api_key: process.env.Send_Grid,
    },
  })
);

export const register = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;
  var hashpassword = bcrypt.hashSync(password, 8);
  SellerUsers.findOne({ email: email }, async (err, data) => {
    try {
      if (data) {
        res
          .status(200)
          .send({ message: "Mail already taken,try another one" });
      } else {
        SellerUsers.create(
          {
            givenName: firstname,
            familyName: lastname,
            email: email,
            password: hashpassword,
            role: role ? role : "user",
          },
          (err, user) => {
            try {
              transporter.sendMail({
                to: email,
                from: "singhdhobe@gmail.com",
                subject: "signup success mail",
                html:
                  "<h1>Welcome to Shop-Mate</h1><br></br><p>Shop Mate is one of the leading ecommerce store</p><br></br><br></br><strong>Thanks for choosing Shop Mate</strong><p>Shop-Mate Team</p>",
              });
              console.log(user);
              res
                .status(200)
                .send({ data: user, message: "Registered Successfully" });
            } catch {
              res.status(404);
            }
          }
        );
      }
    } catch {
      res.status(404).send();
    }
  });
};

export const users = async (req, res) => {
  try {
    const usersList = await SellerUsers.find();
    res.status(200).send(usersList);
  } catch (err) {
    res.status(404);
  }
};
export const login = async (req, res) => {
  SellerUsers.findOne({ email: req.body.email }, (err, data) => {
    try {
      if (!data) {
        res.status(200).send({ message: "Email is not registered" });
      } else if (!bcrypt.compareSync(req.body.password, data.password)) {
        res
          .status(200)
          .send({  messagep: "Incorrect Password"  });
      } else {
        var token = jwt.sign({ id: data._id }, config.secrete, {
          expiresIn: 3600,
        });
        res.status(200).send({
          auth: true,
          token: token,
          data: data,
          message: "Login Successfully",
        });
      }
    } catch {
      res.status(404);
    }
  });
};

export const userinfo = async (req, res) => {
  var token = req.headers["x-access-token"];
  if (!token || token === "null") {
    res.send({ auth: false, message: "" });
  } else {
    jwt.verify(token, config.secrete, (err, data) => {
      if (err) {
        res.status(200).send({ auth: false, message: "" });
      } else {
        SellerUsers.findOne(
          { _id: data.id },
          { password: 0 },
          (err, result) => {
            try {
              res.status(200).send({ auth: true, token: token, data: result });
            } catch {
              res.status(400);
            }
          }
        );
      }
    });
  }
};



export const forgotpsw = (req, res) => {
  var hashpassword = bcrypt.hashSync(req.body.password, 8);
  SellerUsers.findOne({ email: req.body.email }, (err, data) => {
    try {
      if (err || !data) {
        res.status(200).send({ message: "Email is not registered" });
      } else {
        SellerUsers.findByIdAndUpdate(
          data._id,
          { password: hashpassword },
          { new: true },
          (err, data) => {
            var token = jwt.sign({ id: data._id }, config.secrete, {
              expiresIn: 86400,
            });
            res.status(200).send({
              auth: true,
              token: token,
              data: data,
              message: "Login Successfully",
            });
          }
        );
      }
    } catch {
      res.status(404);
    }
  });
};

export const profileedit = async (req, res) => {
  const {
    givenName,
    familyName,
    gender,
    email,
    phoneNumber,
    oldemail,
    password,
  } = req.body;
  var hashpassword = bcrypt.hashSync(password, 8);
  SellerUsers.findOne({ email: oldemail }, async (err, data) => {
    try {
      const { valid, reason, validators } = await isEmailValid(email);
      if (valid) {
        console.log(valid);
        SellerUsers.findByIdAndUpdate(
          data._id,
          {
            givenName: givenName,
            familyName: familyName,
            email: email,
            gender: gender,
            phoneNumber: phoneNumber,
            password: hashpassword,
          },
          { new: true },
          (err, user) => {
            try {
              console.log(user);
              res
                .status(200)
                .send({ data: user, message: "Update Successfully" });
            } catch (err) {
              res.status(404).send(err);
            }
          }
        );
      } else {
        console.log(err);
        res.status(200).send({
          message: `Please provide a valid email address.`,
          reason: validators[reason].reason,
        });
      }
    } catch {
      res.status(404).send(err);
    }
  });
};

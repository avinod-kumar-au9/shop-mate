import Users from "../../models//registerinfoModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import sendgridtransport from "nodemailer-sendgrid-transport";
import config from "../../config.js";

dotenv.config();

const transporter = nodemailer.createTransport(
  sendgridtransport({
    auth: {
      api_key: process.env.Send_Grid,
    },
  })
);

export const register = async (req, res) => {
  const { firstname, lastname, email, password, role,image } = req.body;
  var hashpassword = bcrypt.hashSync(password, 8);
  Users.findOne({ email: email }, async (err, data) => {
    try {
      if (data) {
        res
          .status(200)
          .send({ message: "Mail already taken,try another one" });
      } else {
        Users.create(
          {
            givenName: firstname,
            familyName: lastname,
            email: email,
            password: hashpassword,
            role: role ? role : "user",
            image:image
          },
          (err, user) => {
            try {
              transporter.sendMail({
                to: email,
                from: "singhdhobe@gmail.com",
                subject: "Shop-Mate's Welcome Email",
                html:
                  "<h1>Welcome to Shop-Mate</h1><br></br><p>Shop Mate is one of the leading ecommerce store</p><br></br><br></br><strong>Thanks for choosing Shop Mate</strong><p>Shop-Mate Team</p>",
              });
              console.log(err);
              console.log(user);
              res
                .status(200)
                .send({ data: user, message: "Registered Successfully" });
            } catch (err) {
              console.log(err);
              res.status(404);
            }
          }
        );
      }
    } catch (err) {
      console.log(err);
      res.status(404).send();
    }
  });
};



export const users = async (req, res) => {
  try {
    const usersList = await Users.find();
    res.status(200).send(usersList);
  } catch (err) {
    res.status(404);
  }
};

export const login = async (req, res) => {
  Users.findOne({ email: req.body.email }, (err, data) => {
    try {
      if (!data) {
        res.status(200).send({ message: "Email is not registered" });
      } else if (!bcrypt.compareSync(req.body.password, data.password)) {
        res
          .status(200)
          .send({ messagep: "Incorrect Password" });
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
      }
      else{
        Users.findOne({ _id: data.id }, { password: 0 }, (err, result) => {
            res.status(200).send({ auth: true, token: token, data: result });
          
        });
      }
    });
  }
};

export const googlelogin = async (req, res) => {
  const { firstname, lastname, email, role } = req.body;
  Users.findOne({ email: email }, (err, data) => {
    try {
      if (data) {
        var token = jwt.sign({ id: data._id }, config.secrete, {
          expiresIn: 3600,
        });
        res
          .status(200)
          .send({ data: data, token: token, message: "Login Successfully" });
      } else {
        Users.create(
          {
            givenName: firstname,
            familyName: lastname,
            email: email,
            role: role ? role : "user",
          },
          (err, user) => {
            try {
              var token = jwt.sign({ id: user._id }, config.secrete, {
                expiresIn: 3600,
              });
              res.status(200).send({
                data: user,
                token: token,
                message: "Login Successfully",
              });
            } catch {
              res.status(404);
            }
          }
        );
      }
    } catch {
      res.status(404);
    }
  });
};

export const forgotpsw = (req, res) => {
  var hashpassword = bcrypt.hashSync(req.body.password, 8);
  Users.findOne({ email: req.body.email }, (err, data) => {
    try {
      if (err || !data) {
        res.status(200).send({ message: "Email is not registered" });
      } else {
        Users.findByIdAndUpdate(
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
  Users.findOne({ email: oldemail }, async (err, data) => {
    try {
      Users.findByIdAndUpdate(
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
            res
              .status(200)
              .send({ data: user, message: "Update Successfully" });
          } catch (err) {
            res.status(404).send(err);
          }
        }
      );
    } catch {
      res.status(404).send(err);
    }
  });
};

export const uploadprofileimg = async (req, res) => {
  try {
    const List = await Users.find({ _id: req.body.id });
    if (List.length > 0) {
      const {
        givenName,
        familyName,
        email,
        gender,
        phoneNumber,
        password,
        isActive,
        role,
      } = List[0];

      try {
        const result = await Users.findByIdAndUpdate(
          req.body.id,
          {
            givenName: givenName,
            familyName: familyName,
            email: email,
            gender: gender,
            phoneNumber: phoneNumber,
            password: password,
            image: req.body.Url,
            isActive: isActive,
            role: role,
          },
          { new: true }
        );

        res.status(200).send({ data: result });
      } catch (err) {
        res.status(404).send(err);
      }
    }
  } catch (err) {
    res.status(404).send({ error: "something went wrong, comeback later" });
  }
};


export const addcart = async(req,res)=>{
  const id=req.params.id
    try {
      Users.findByIdAndUpdate(id,
        {$push: {"cart": req.body}},
        {new: true,upsert:true},(err,data)=>{
            res.status(200).send({data:data}) 
      })
      } catch {
        res.status(404).send(err)
      }
}

export const cartQuantityUpdate = async(req,res)=>{
    try {
        Users.findOneAndUpdate({'cart._id':req.params.id},
         {$set: {'cart.$.quantity': req.body.quantity}},
        {new: true},(err,result)=>{
            res.status(200).send({data:result}) 
      })
    }
       catch {
        res.status(404).send(err)
      }
}

export const cartItemDelete = async(req,res)=>{
    try {
        Users.findOneAndUpdate({'cart._id':req.params.id},
        {$pull:{cart:{_id:req.params.id}}},{ safe: true },
       (err,result)=>{
            res.status(200).send({data:result})  
      })
    }
       catch {
        res.status(404).send(err)
      }
}

export const addDeliveryAdress = async(req,res)=>{
  const id=req.params.id
    try {
      Users.findByIdAndUpdate(id,
        {$push: {"deliveryAdress": req.body}},
        {new: true,upsert:true},(err,data)=>{
            res.status(200).send({data:data}) 
      })
      } catch {
        res.status(404).send(err)
      }
}

export const discountamtAdded = async(req,res)=>{
     try {
         Users.findOneAndUpdate({'cart._id':req.params.id}, {$set: {'cart.$.discount': req.body.discount}},
         {new: true,upsert:true},(err,result)=>{
             res.status(200).send({data:result}) 
           
       })
     }
        catch {
         res.status(404).send(err)
       }
 }

 export const cartAlldataRemove = async(req,res)=>{
  try {
    Users.findOneAndUpdate({_id:req.params.id}, {$set: {'cart': []}},
       (err,result)=>{
        res.status(200).send({data:result})
    })}
     catch {
      res.status(404).send(err)
    }
}

import mongoose from "mongoose";

const UsersSchema = mongoose.Schema({
  givenName: {
    type: String,
    required:true
  },
  familyName: {
    type: String 
  },
  email: {
    type: String,
    required:true
  },
  password: {
    type: String
    
  },
  gender:{
    type: String,
    default:''
  },
  phoneNumber:{
    type: String,
    default:''
  },
  isActive: {
    type: String,
    default: true
  },
  role: {
    type: String,
    required:true
  },
  image: {
    type: String,
    
  },
  deliveryAdress:[
    {
      phoneNumber:{
        type: String,
        default:''
      },
      pincode:{
        type: String,
      },
      adress:{
        type: String,  
      },
    }
  ],
  cart:[
    {
      productId:{
        type:String
      },
      name:{
        type:String
      },
      color:{
        type:String
      },
      size:{
        type:String
      },
      img:{
        type:String
      },
      quantity:{
        type:String,
        default:'1'
      },
      price:{
        type:String
      },
      delivered:{
        type:String
      },
      coupon:{
        type:String
      },
      discount:{
        type:String,
        default:'0'
      },
      sellerCompany:{
        type:String
      }
    }
  ]
  
});

const Users = mongoose.model("users", UsersSchema);

export default Users;

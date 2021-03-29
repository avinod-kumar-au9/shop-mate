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
  }
  
});

const SellerUsers = mongoose.model("seller_users", UsersSchema);

export default SellerUsers;

import mongoose from "mongoose";

const  OrderSchema = mongoose.Schema({
     
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
          type:String
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
          type:String
        },
        deliverAdress:{
          type:String
        },
       
      orderedDate:{
        type:Date,
        default:Date.now,
      },   
      deliveredDate:{
        type:Date,
        default:"",
      },   
      orderConformStatus:{
        type:String,
        default:'Pending'
      },
      userId:{
        type:String
      },
      sellerCompany:{
        type:String
      }
        
});

const Orders = mongoose.model("orders", OrderSchema);

export default Orders;
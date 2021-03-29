import Stripe from "stripe"
import dotenv from "dotenv"
dotenv.config()
const stripe = new Stripe(process.env.Stripe_Key);

export const StripePayment = async (req, res) => {
    
console.log("here");
    const {product,token} = req.body

    return stripe.customers.create({
        source:token.id
    }).then(customer =>{
        stripe.charges.create({
            amount: product.price,
            currency:"inr",
            customer:customer.id,
            receipt_email:token.email,
            description:"purchase of product.name"
        })
        .then(result=>{
               res.status(200).json(result)
        })
         
        .catch(err =>console.log(err))
    })
  };
import React, { useEffect, useState } from "react";

import StripeCheckout from "react-stripe-checkout";

const Payment = (props) => {
  const {Totalamt,paymentConform} = props

  const [product,setproduct,loaderRender] = useState({
      price:100,
      name:"Payment"
  });

  useEffect(()=>{
    var p =Totalamt * 100
    setproduct({
      ...product,
      price:p
    })
  },[Totalamt])

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "COntent-Type": "application/json",
    };

    return fetch("/api/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((resp) => {
       
        paymentConform()
      })
      .catch((err) => 
      console.log(err));
  };

  

  return (
    <div>
      <StripeCheckout
        stripeKey={process.env.REACT_APP_KEY}
        token={makePayment}
        amount={product.price}
        name={product.name}
        currency="INR"
        onClick={loaderRender}
      >
        <button className='btn btn-success float-right paybtn'>Pay Now</button>
      </StripeCheckout>


    </div>
  );
};

export default Payment;

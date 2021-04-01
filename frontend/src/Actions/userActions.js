import axios from "axios";
const url = "";

export function Clickdata(data) {
  return (dispatch) => {
    dispatch({
      type: "CLICK",
      payload: data,
    });
  };
}

export function Registerdata(fname, lname, mail, psw, props) {
  let route = "";
  if (props.includes("seller")) {
    route = "/api/seller/register";
  } else {
    route = "/api/customers/register";
  }

  const output = axios.post(`${url}${route}`, {
    firstname: fname,
    lastname: lname,
    email: mail,
    password: psw,
    image: "",
  });
  if (props.includes("seller")) {
    return (dispatch) => {
      output.then(({ data }) => {
        dispatch({
          type: "SELLERREGISTER",
          payload: data,
        });
      });
    };
  } else {
    return (dispatch) => {
      output.then(({ data }) => {
        dispatch({
          type: "REGISTER",
          payload: data,
        });
      });
    };
  }
}



export function Logindata(mail, psw, props) {
  let route = "";
  if (props.includes("seller")) {
    route = "/api/seller/login";
  } else {
    route = "/api/customers/login";
  }
  const output = axios.post(`${url}${route}`, {
    email: mail,
    password: psw,
  });
  if (props.includes("seller")) {
    return (dispatch) => {
      output.then(({ data }) => {
        dispatch({
          type: "SELLERLOGIN",
          payload: data,
        });
      });
    };
  } else {
    return (dispatch) => {
      output.then(({ data }) => {
        dispatch({
          type: "LOGIN",
          payload: data,
        });
      });
    };
  }
}

export function Googledata(fname, lname, mail) {
  const output = axios.post(`${url}/api/customers/googlelogin`, {
    firstname: fname,
    lastname: lname,
    email: mail,
  });
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "LOGIN",
        payload: data,
      });
    });
  };
}

export function Userinfo(props) {
  let route = "";
  let token = "";
  if (props.includes("seller")) {
    route = "/api/seller/userinfo";
    token = localStorage.getItem("token1");
  } else {
    route = "/api/customers/userinfo";
    token = localStorage.getItem("token");
  }

  if (token !== null || token !== undefined) {
    const output = axios.get(`${url}${route}`, {
      headers: { "x-access-token": token },
    });
    if (props.includes("seller")) {
    
      return (dispatch) => {
        output.then(({ data }) => {
          dispatch({
            type: "SELLERLOGIN",
            payload: data,
          });
        });
      };
    } else {
      return (dispatch) => {
        output.then(({ data }) => {
          dispatch({
            type: "LOGIN",
            payload: data,
          });
        });
      };
    }
  }
}

export function EmailRegistercheck(mail,props){
  let route = "";
  if (props.includes("seller")) {
    route = "/api/seller/emailregistercheck";
  } else {
    route = "/api/customers/emailregistercheck";
  }
  const output = axios.post(`${url}${route}`, {
    email: mail
  });
    return (dispatch) => {
      output.then(({ data }) => {
        dispatch({
          type: "FORGOTPSW",
          payload: data,
        });
      });
    };
}


export function ForgotPswdata(mail, psw, props) {
  let route = "";
  if (props.includes("seller")) {
    route = "/api/seller/forgotpsw";
  } else {
    route = "/api/customers/forgotpsw";
  }
  const output = axios.patch(`${url}${route}`, {
    email: mail,
    password: psw,
  });
  if (props.includes("seller")) {
    return (dispatch) => {
      output.then(({ data }) => {
        dispatch({
          type: "SELLERLOGIN",
          payload: data,
        });
      });
    };
  } else {
    return (dispatch) => {
      output.then(({ data }) => {
        dispatch({
          type: "LOGIN",
          payload: data,
        });
      });
    };
  }
}


export function ProfileUpdate(
  fname,
  lname,
  gender,
  mail,
  phonenum,
  oldemail
) {
  const output = axios.patch(`${url}/api/customers/profile`, {
    givenName: fname,
    familyName: lname,
    email: mail,
    gender: gender,
    phoneNumber: phonenum,
    oldemail: oldemail,
  });
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "LOGIN",
        payload: data,
      });
    });
  };
}

export function uploadprofileimg(Url, id) {
  const output = axios.put(
    `${url}/api/customers/uploadprofileimg`,
    { Url, id }
  );

  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "LOGIN",
        payload: data,
      });
    });
  };
}


export function addCart(pid,img,name,color,size,price,deli,id,coupon,com){ 
  const output = axios.patch(`${url}/api/customers/addcart/${id}`,{
      productId:pid,
      name:name,
      color:color,
      size:size,
      img:img,
     price:price,
     delivered:deli,
     coupon:coupon,
     sellerCompany:com
  })
  return (dispatch) =>{
      output.then(({data}) => {
          dispatch({
              type:'LOGIN',
              payload:data
          })
      })
  }
}

export function cartQuantityUpdate(id,quantity){ 
    var output = axios.patch(`${url}/api/customers/updatecart/${id}`,{quantity:quantity})
    return (dispatch) =>{
        output.then(({data}) => {
            dispatch({
                type:'LOGIN',
                payload:data
            })
        })
    }
}


export function cartitemDelete(id){ 
    var output = axios.patch(`${url}/api/customers/cartitemdelete/${id}`)
    return (dispatch) =>{
        output.then(({data}) => {
            dispatch({
                type:'DELETECART',
                payload:data
            })
        })
    }
}

export function addAdress(phone,pin,adress,id){ 
  var output = axios.patch(`${url}/api/customers/deliveryadress/${id}`,{
      phoneNumber:phone,
        pincode:pin,
        adress:adress
      })
  return (dispatch) =>{
      output.then(({data}) => {
          dispatch({
              type:'LOGIN',
              payload:data
          })
      })
  }
}

export function clearCart(id){ 
  var output = axios.patch(`${url}/api/customers/clearcart/${id}`)
  return (dispatch) =>{
      output.then(({data}) => {
          dispatch({
              type:'LOGIN',
              payload:data
          })
      })
  }
}

export function discountAdd(id){ 
  var output = axios.patch(`${url}/api/customers/discountadd/${id}`,
     {discount:50}
      )
  return (dispatch) =>{
      output.then(({data}) => {
          dispatch({
              type:'LOGIN',
              payload:data
          })
      })
  }
}

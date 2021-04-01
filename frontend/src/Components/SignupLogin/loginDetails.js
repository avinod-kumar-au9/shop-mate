import React, { useState, useEffect,useRef } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import {
  Clickdata,
  Registerdata,
  Logindata,
  ForgotPswdata,
  Googledata,
  EmailRegistercheck
} from "../../Actions/userActions";
import Login from "./LoginDisplay";
import axios from "axios";

const Logindisplay = (props) => {
  const [email, setEmail] = useState("");
  const [loginSignup, setLoginSignup] = useState("");
  const [fname, setFname] = useState("");
  const [ferr, setFerr] = useState("");
  const [lname, setLname] = useState("");
  const [passwords, setPassword] = useState("");
  const [errs, setErr] = useState("");
  const [cpsw, setCpsw] = useState("");
  const [emaerr, setEmaerr] = useState("");
  const [aerr, setErrall] = useState("");
  const [validate, setValidate] = useState(false);
  const [isGoing, setIsGoing] = useState(false);
  const [showpsw, setShowpsw] = useState("password");
  const [modalClose, setmodalClose] = useState("");
  const [spinner, setSpinner] = useState("");
  const [emailvalidate, setEmailvalidate] = useState(false);
  const [otpvalidata, setOtpvalidata] = useState(false);
  const [otp, setOtp] = useState(false);
  const closemodalafterlogin= useRef(null)


  useEffect(()=>{
    setSpinner('')
   
  },[])

  useEffect(() => {
    setLoginSignup(props.data.data);
    setFname("");
    setCpsw("");
    setEmail("");
    setLname("");
    setPassword("");
    setCpsw("");
    setErr("");
    setFerr("");
    setEmaerr("");
    setErrall("");
    setValidate(false);
    setShowpsw("password");
    setmodalClose("");
  }, [props.data.data]);

  useEffect(() => {
    setSpinner("");
    if (props.data.Rdata) {
      if (props.data.Rdata.message === "Registered Successfully") {
        toast(props.data.Rdata.message,{
        autoClose: 2000
      });
        setTimeout(() => {
          props.dispatch(Clickdata("login"));
        }, 1000);
      } else {
        setEmaerr(props.data.Rdata.message);
      }
    }
  }, [props.data.Rdata]);


  useEffect(() => {
    setSpinner("");
    if (props.SelleruserInfo.Rdata) {
      if (props.SelleruserInfo.Rdata.message === "Registered Successfully") {
        toast(props.SelleruserInfo.Rdata.message,{
          autoClose: 2000
        });
        setTimeout(() => {
          props.dispatch(Clickdata("login"));
        }, 1000);
      } else {
        setEmaerr(props.SelleruserInfo.Rdata.message);
      }
    }
  }, [props.SelleruserInfo.Rdata]);

 
  
  useEffect(() => {
    setSpinner("");
    if (props.data.Ldata) {
      if (props.data.Ldata.messagep) {
        setErrall(props.data.Ldata.messagep);
      } else if (props.data.Ldata.message === "Login Successfully") {      
        toast(props.data.Ldata.message, {          
          autoClose: 2000
          });
        setPassword("");
        setEmail("");
        
        setTimeout(() => {
          closemodalafterlogin.current.click()
        }, 2000);
        localStorage.setItem("token", props.data.Ldata.token);
      
      } else {
        setEmaerr(props.data.Ldata.message);
      }
    }
  }, [props.data.Ldata]);


  useEffect(() => {
    setSpinner("");
    if (props.SelleruserInfo.Ldata) {
      if (props.SelleruserInfo.Ldata.messagep) {
        setErrall(props.SelleruserInfo.Ldata.messagep);
      } else if (props.SelleruserInfo.Ldata.message === "Login Successfully") {
        toast(props.SelleruserInfo.Ldata.message, {
          autoClose: 2000,
          });
      
        setPassword("");
        setEmail("");
        
        setTimeout(() => {
          closemodalafterlogin.current.click()
        }, 2000);
        localStorage.setItem("token1", props.SelleruserInfo.Ldata.token);
       
      } else {
        
        setEmaerr(props.SelleruserInfo.Ldata.message);
      }
    }
  }, [props.SelleruserInfo.Ldata]);

  useEffect(() => {
    setSpinner("");
    if (props.data.Pdata) {
      if (props.data.Pdata.message === 'Mail exist') {
        setEmailvalidate(true);
        setEmaerr('')
      } else {
        setEmaerr('Email is not registered');
      }
    }
  }, [props.data.Pdata]);


  const registerRnder = () => {
    setSpinner("")
    props.dispatch(Clickdata("signup"));
  };

  const loginRender = () => {
    props.dispatch(Clickdata("login"));
  };

  const pswRender = () => {
    props.dispatch(Clickdata("forgotpsw"));
    setOtpvalidata(false)
    setEmailvalidate(false)
  };

  const fnameRender = (e) => {
    if (e.target.value.length < 3) {
      setFerr("Name should be atleast 3 characters");
    } else {
      setFerr("");
    }
    setFname(e.target.value);
  };

  const lnameRender = (e) => {
    setLname(e.target.value);
  };

  const mailRender = (e) => {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
      setValidate(true);
      setEmaerr("");
    } else {
      setValidate(false);
      setEmaerr("Please enter valid email");
    }
    setEmail(e.target.value);
  };

  const passwordRender = (e) => {
    if (e.target.value.length < 6) {
      setErr("Password should be atleast 6 characters");
    } else {
      setErr("");
    }
    setPassword(e.target.value);
  };

  const cpswRender = (e) => {
    setCpsw(e.target.value);
  };

  const otpRender = (e) => {
    setOtp(e.target.value);
  };

  const handleInputChange = () => {
    setIsGoing(!isGoing);
    if (showpsw === "password") {
      setShowpsw("text");
    } else {
      setShowpsw("password");
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    if (passwords !== cpsw) {
      setErrall("Passwords didn’t match");
    }else if (ferr || errs || !validate || !fname || !passwords) {
      setErrall("Please fill all fields");
    }else {
      setErrall("");
      setSpinner("true");
      axios
        .get(
          `https://emailverification.whoisxmlapi.com/api/v1?apiKey=at_NNjRtJeDX5g5bGgllgC7u8y6bgh9x&emailAddress=${email}`
        )
        .then((resp) => {
          if (resp.data.smtpCheck) {
            if (resp.data.smtpCheck === "false") {
              setErrall("Mail is not found in google mail server");
              setSpinner("");
            } else {
              setErr("");
              setErrall("");
              props.dispatch(
                Registerdata(
                  fname,
                  lname,
                  email,
                  passwords,
                  props.location.pathname
                )
              );
            }
          } else {
            setErrall("Something went wrong, comeback later");
            setSpinner("");
          }
        });
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    if (!validate || !passwords) {
      setErrall("Please fill both the fields");
    } else {
      setErrall("");
      setSpinner("true");
      props.dispatch(Logindata(email, passwords, props.location.pathname));
  
    }
  };

  const resetpswSubmit = (e) => {
    e.preventDefault();
    if (errs || !validate || !passwords) {
      setErrall("Please fill all the fields");
    } else if (passwords !== cpsw) {
      setErrall("Passwords didn’t match");
    } else {
      setErrall("");
      setSpinner("true");
      props.dispatch(ForgotPswdata(email, passwords, props.location.pathname));
    }
  };
  const responseGoogle = (response) => {
    if (!response && !response.accessToken) {
      alert("Error While Login");
    } if(response && response.accessToken) {
      setSpinner("true");
      localStorage.setItem("token", response.accessToken);
      props.dispatch(
        Googledata(
          response.profileObj.givenName,
          response.profileObj.familyName,
          response.profileObj.email
        )
      );
    }
  };


  const checkemailregister=(e)=>{
    e.preventDefault();
    setOtpvalidata(false)
    setOtp('')
    if(email){
      props.dispatch(EmailRegistercheck(email,props.location.pathname))
    }else{
      setEmaerr('Enter email ')
    }  
  }

  const checkotpvalidate=(e)=>{
    e.preventDefault();
    if(otp.length > 0){
      if(otp === props.data.Pdata.OTP){
        setOtpvalidata(true)
        setEmailvalidate(false)
        setEmaerr('')
      }else{
        setEmaerr('OTP not match')
      }
    }  
  }


  return (
    <div>
      <Login
        registerRnder={registerRnder}
        passwords={passwords}
        errs={errs}
        aerr={aerr}
        fname={fname}
        ferr={ferr}
        emaerr={emaerr}
        showpsw={showpsw}
        emailid={email}
        loginRender={loginRender}
        pswRender={pswRender}
        lnameRender={lnameRender}
        mailRender={mailRender}
        passwordRender={passwordRender}
        cpswRender={cpswRender}
        fnameRender={fnameRender}
        loginSignup={loginSignup}
        loginSubmit={loginSubmit}
        registerSubmit={registerSubmit}
        handleInputChange={handleInputChange}
        resetpswSubmit={resetpswSubmit}
        modalClose={modalClose}
        responseGoogle={responseGoogle}
        // logout={logout}
        auth={props.adata}
        spinner={spinner}
        closemodalafterlogin={closemodalafterlogin}
        checkemailregister={checkemailregister}
        emailvalidate={emailvalidate}
        otpvalidata={otpvalidata}
        checkotpvalidate={checkotpvalidate}
        otp={otp}
        otpRender={otpRender}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    data: state.logindata,
    adata: state.aouthdata,
    SelleruserInfo:state.SellerUserslogindata
  };
}

export default withRouter(connect(mapStateToProps)(Logindisplay));

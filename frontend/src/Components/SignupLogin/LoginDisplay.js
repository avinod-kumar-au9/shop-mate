import React from "react";
import "./Login.scss";
import { Link,withRouter } from "react-router-dom";
import loginImg from "../images/login-img.svg";
import signupImg from "../images/signup-img.svg";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "react-google-login";
import Config from "./Config.json";

const Login = (props) => {
  const {
    loginSignup,
    fnameRender,
    fname,
    lnameRender,
    lname,
    ferr,
    mailRender,
    emailid,
    emaerr,
    showpsw,
    passwordRender,
    passwords,
    cpswRender,
    cpsw,
    errs,
    isGoing,
    handleInputChange,
    aerr,
    registerSubmit,
    loginRender,
    pswRender,
    loginSubmit,
    registerRnder,
    resetpswSubmit,
    modalClose,
    responseGoogle,
    spinner,
    closemodalafterlogin,
    checkemailregister,
    otpvalidata,emailvalidate,otpRender,otp,checkotpvalidate
  } = props;

  const contentRender = () => {
    if (loginSignup === "signup") {
      return (
        <>
          <div className="d-flex">
            <div className="form-group">
              <div className="inputBox control-label col-sm-2">
                <input
                  className="psw"
                  type="text"
                  name="fname"
                  required
       
                  onChange={(e) => fnameRender(e)}
                  value={fname}
                />
                <label>FirstName</label>
              </div>
            </div>

            <div className="form-group">
              <div className="inputBox control-label col-sm-2">
                <input
                  type="char"
                  className="psw"
                  name="lname"
                  required
                  // onKeyUp="this.setAttribute('value', this.value)"
                  onChange={(e) => lnameRender(e)}
                  value={lname}
                />
                <label>LastName</label>
              </div>
            </div>
          </div>

          <p className="errmsg">{ferr}</p>
          <div className="form-group">
            <div className="inputBox control-label col-sm-2">
              <input
                type="email"
                name="email"
                required
                // onKeyUp="this.setAttribute('value', this.value);"
                onChange={(e) => mailRender(e)}
                value={emailid}
              />
              <label>Email</label>
            </div>
            <p className="errmsg2">{emaerr}</p>
          </div>

          <div className="d-flex ">
            <div className="form-group ">
              <div className="inputBox control-label col-sm-2">
                <input
                  className="psw"
                  type={showpsw}
                  required
                  // onKeyUp="this.setAttribute('value', this.value);"
                  onChange={(e) => passwordRender(e)}
                  value={passwords}
                />
                <label>Password</label>
              </div>
            </div>

            <div className="form-group d-inline">
              <div className="inputBox control-label col-sm-2">
                <input
                  className="psw"
                  type={showpsw}
                  name="csw"
                  required
                  // onKeyUp="this.setAttribute('value', this.value);"
                  onChange={(e) => cpswRender(e)}
                  value={cpsw}
                />
                <label>ConformPsw</label>
              </div>
            </div>
          </div>
          <span className="errmsg">{errs}</span>
          <div>
            <input
              className="ml-3"
              type="checkbox"
              checked={isGoing}
              onChange={(e) => handleInputChange(e)}
              value={passwords}
            />
            <label className="checkbox" >
              Show Password
            </label>
          </div>
          <p className="errmsg">{aerr}</p>
          <div className="form-group ">
            <div className="control-label footersection ">
              <button
                type="submit"
                className="btn btn-warning button mb-2"
                onClick={registerSubmit}
              >
                Register
              </button>
             
              { props.location.pathname.includes("seller") ? "" :
              <div style={{ width: "410px" }}>
                <GoogleLogin
                  clientId={Config.clintId}
                  
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>}
            </div>
            <p className="registerLink">
              All ready member?
              <span>
                <Link to='#' onClick={loginRender}>Login</Link>
              </span>
            </p>
          </div>
        </>
      );
    } else if (loginSignup === "login") {
      return (
        <>
          <div className="form-group">
            <div className="inputBox control-label col-sm-2">
              <input
                type="email"
                name="email"
                required
                // onKeyUp="this.setAttribute('value', this.value);"
                onChange={(e) => mailRender(e)}
                value={emailid}
              />
              <label>Email</label>
            </div>
          </div>
          <p className="errmsg2">{emaerr}</p>
          <div className="form-group">
            <div className="inputBox mt-4 control-label col-sm-2">
              <input
                type={showpsw}
                name="psw"
                required
                // onKeyUp="this.setAttribute('value', this.value);"
                onChange={(e) => passwordRender(e)}
                value={passwords}
              />
              <label>Passward</label>
              <Link to='#' onClick={pswRender}>Forgot?</Link>
            </div>
          </div>

          <div>
            <input
              className="ml-3"
              type="checkbox"
              checked={isGoing}
              onChange={(e) => handleInputChange(e)}
              value={passwords}
            />
            <label className="checkbox">
              Show Password
            </label>
          </div>
          <p className="errmsg">{aerr}</p>
          <div className="form-group ">
            <div className="control-label footersection">
              <button
                type="submit"
                className="btn btn-warning"
                data-dismiss={() => modalClose()}
                onClick={loginSubmit}
              >
                Login
              </button>
              <p className="registerLink">
                New to Shopmate?
                <span>
                  <Link to='#' onClick={registerRnder}> Create an account</Link>
                </span>
              </p>
            </div>
          </div>
        </>
      );
    } else if (loginSignup === "forgotpsw") {
      return (
        <>
          <div className="form-group">
          
            <div className="inputBox control-label col-sm-2">
              <input
                type="email"
                name="email"
                required
                // onKeyUp="this.setAttribute('value', this.value);"
                onChange={(e) => mailRender(e)}
                value={emailid}
              />
              <label>Email</label>
            </div>
            <button class='btn btn-danger mt-2 mailconformationbtn' onClick={checkemailregister}>Submit</button>
           
          </div>
          
          {emailvalidate && 
          <>
          <p className='mt-2 otpmsg'>OTP(one time password) has sent your email.
            Please enter the OTP in the field below to verify.</p>
          <div className="form-group ">
          <div className="inputBox control-label mt-4 col-sm-2">
            <input
              type='number'
              required
              onChange={(e) => otpRender(e)}
              value={otp}
            />
            <label>EnterOTP </label>
          </div>
          <button class='btn btn-danger mt-2 mailconformationbtn' onClick={checkotpvalidate}>Submit</button>
        </div>
          </>}
            
          <p className="errmsg2">{emaerr}</p>
          {otpvalidata &&
          <>
          <div className="form-group ">
            <div className="inputBox control-label mt-4 col-sm-2">
              <input
                type={showpsw}
                required
                // onKeyUp="this.setAttribute('value', this.value);"
                onChange={(e) => passwordRender(e)}
                value={passwords}
              />
              <label>Password</label>
            </div>
          </div>
          <p className="errmsg">{errs}</p>
          <div className="form-group">
            <div className="inputBox control-label mt-4 col-sm-2">
              <input
                type={showpsw}
                name="cpsw"
                required
                // onKeyUp="this.setAttribute('value', this.value);"
                onChange={(e) => cpswRender(e)}
                value={cpsw}
              />
              <label>ConformPsw</label>
            </div>
          </div>

          <div>
            <input
              className="ml-3"
              type="checkbox"
              checked={isGoing}
              onChange={(e) => handleInputChange(e)}
              value={passwords}
            />
            <label className="checkbox">
              Show Password
            </label>
          </div>
          <p className="errmsg">{aerr}</p>
          <div className="form-group ">
            <div className="control-label footersection">
              <button
                type="submit"
                className="btn btn-warning"
                data-dismiss={modalClose}
                onClick={resetpswSubmit}
              >
                Login
              </button>
              <p className="registerLink">
                New to Shopmate?
                <span>
                  <Link to='#' onClick={registerRnder}> Create an account</Link>
                </span>
              </p>
            </div>
          </div>
          </>}
        </>
      );
    }
  };

  return (
    <div className='logindetails'>
      <div
        className="modal fade myModal2"
        id="myModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content">
            <div className="modal-header">
              {spinner.length > 0 && (
                <center>
                  <div
                    className="spinner-border"
                    style={{ display: "center" }}
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </center>
              )}
 
              <button
                ref={closemodalafterlogin}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-5">
                  <div className="contact-info text-white">
                    {loginSignup === "signup" ? (
                      <>
                        <h4>Looks like you're new here!</h4>
                        <p className='mt-2'>Sign up with your email to get started</p>
                        <img src={signupImg} alt='' className="signupimg" />
                      </>
                    ) : (
                      <>
                        <h4>Login here</h4>
                        <p>Get access to your Orders and Recommendations</p>
                        <img src={loginImg} alt='' className="imglogin" />
                      </>
                    )}
                  </div>
                </div>
                <div className="col-md-7">
                  <form className="contact-form formrigth">{contentRender()}</form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login)

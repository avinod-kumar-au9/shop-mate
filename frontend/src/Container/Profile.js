import React, { useEffect } from "react";
import Sidebar from "../Components/profilepage/sidebar";
import ProfileDisplay from "../Components/profilepage/profileDetail";
import { connect } from "react-redux";
import "../Components/profilepage/profilepage.scss";
import {
  ProfileUpdate,
  uploadprofileimg,
  Userinfo
} from "../Actions/userActions";
import { withRouter, useHistory } from "react-router-dom";
import Loader from "./Loader";


const Profile = (props) => {

  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
    props.dispatch(Userinfo(props.location.pathname))
  },[])
  
  let history = useHistory();
  const logoutrender = () => {
    localStorage.removeItem("token");
    props.dispatch({
      type: "LOGIN",
      payload:""
    });
    props.history.push("/");
  };


  useEffect(() => {
    if(props.ldata){
    if ([localStorage.getItem("token")].includes(null, undefined) || !props.ldata.data) {
      props.dispatch({
        type: "TEST",
        payload: "err",
      });
      history.push("/");
    } 
  }
  }, [props.ldata]);

  const updatedata = (fname, lname, gender, email, phonenum) => {
    props.dispatch(
      ProfileUpdate(
        fname,
        lname,
        gender,
        email,
        phonenum,
        props.ldata.data.email
      )
    );
  };

  const callbackforprofileimgupload = (url, id) => {
    props.dispatch(uploadprofileimg(url, id));
  };

  if (props.ldata && props.ldata.data) {
 
      return (
        <div className="container mt-5 mb-5 ">
          <div className="row">
            <div className="col-lg-3 col-md-3 ">
              <Sidebar
                ldata={props.ldata}
                logoutrender={logoutrender}
                callbackforprofileimgupload={callbackforprofileimgupload}
              />
            </div>

            <div className="col-lg-9 col-md-9 ">
              <ProfileDisplay
                ldata={props.ldata}
                update={(a, b, c, d, e) => updatedata(a, b, c, d, e )}
              />
            </div>
          </div>
        </div>
      );
  } else {
    return (
      <Loader/>
    );
  }
};

function mapStateToProps(state) {
  return {
    ldata: state.logindata.Ldata,
    test: state.logindata,
  };
}

export default withRouter(connect(mapStateToProps)(Profile));

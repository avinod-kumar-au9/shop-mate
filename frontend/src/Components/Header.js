import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import "./header.scss";
import Login from "./SignupLogin/loginDetails";
import {
  Clickdata,
  Userinfo,
} from "../Actions/userActions";
import { SearhData } from "../Actions/searchAction";

const Header = (props) => {
  const [searchInputVal, setsearchInputVal] = useState("");
  const forcelyopenmodal = useRef(null);
 
  useEffect(() => {
    props.dispatch(Userinfo(props.location.pathname));
    
  },[]);

  useEffect(() => {
    if (props.test === "err") {
        forcelyopenmodal.current.click();
     
      props.dispatch({
        type: "TEST",
        payload: "",
      });
    }
  }, [props.test]);


  const clickHandler = () => {
    props.dispatch(Clickdata("login"));
  };

  const loginpart = () => {
    if (props.data && props.data.data){
        if(props.data.data.givenName.length > 6){
          return (
            <span className="nav-link text-white">
              {props.data.data.givenName.slice(0, 6)}..
            </span>
          );
        }else {
          return <span className="nav-link text-white">{props.data.data.givenName}</span>;
        } 
    }  else {
      return (
        <div
        
          className="nav-link text-white cursorpoint"
          data-toggle="modal"
          data-target="#myModal"
          style={{ textDecoration: "none" }}
          onClick={clickHandler}
          ref={forcelyopenmodal}
        >
          Login
        </div>
      );
    }
  };

  const sellerloginpart = () => {
    if (props.Sellerlogin && props.Sellerlogin.data) {
        if (props.Sellerlogin.data.givenName.length > 6) {
          return (
            <span className="nav-link text-white">
              {props.Sellerlogin.data.givenName.slice(0, 6)}..
            </span>
          );
        } else if (props.Sellerlogin.data.givenName) {
          return (
            <span className="nav-link text-white">
              {props.Sellerlogin.data.givenName}
            </span>
          );
        }
    } else {
      return (
        <div
       
          className="nav-link text-white cursorpoint"
          data-toggle="modal"
          data-target="#myModal"
          style={{ textDecoration: "none" }}
          onClick={clickHandler}
          ref={forcelyopenmodal}
        >
          Login
        </div>
      );
    }
  };

  const logoutrender = () => {
    localStorage.removeItem("token");
    props.dispatch({
      type: "LOGIN",
      payload:""
    });
    props.history.push("/");
  };

  const sellerlogoutrender = () => {
    localStorage.removeItem("token1");
    props.dispatch({
      type: "SELLERLOGIN",
      payload: "",
    });
    props.history.push("/seller");
  };

  const signuprender = () => {
    props.dispatch(Clickdata("signup"));
  };

  const searchInputHandler = (e) => {
    if (e.target.value) {
      setsearchInputVal(e.target.value);
      props.dispatch(SearhData(e.target.value));
    } else {
      setsearchInputVal("");
    }
  };

  const searchresultselectHandler = () => {
    setsearchInputVal("");
    if (props.location.pathname.includes("/list")) {
      props.dispatch({
        type: "FORCEUPDATEONSEARCHCLICK",
        payload: "some",
      });
    }
  };

  if (!props.location.pathname.includes("seller")) {
    return (
      <div className="headerdiv">
        <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
          <div className="navmain">
            <Link to="/" className="navbar-brand  navmain text-white" href="#">
              Shop Mate
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <div className="nav_search">
              <input
                value={searchInputVal}
                type="text"
                className="searchinput"
                placeholder="Search"
                name="Search"
                onChange={searchInputHandler}
              />
              <SearchIcon />
            </div>
            {searchInputVal ? (
              <div className="searchResultRow">
                {props.search
                  ? props.search.map((pro, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <Link
                            to={`/list?subCategory=${pro._id}`}
                            onClick={searchresultselectHandler}
                            className="searchresultCol"
                          >
                            <img
                              className="searchresultimage"
                              src={pro.image} alt=''
                            />
                          </Link>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/list?subCategory=${pro._id}`}
                            onClick={searchresultselectHandler}
                            className="searchresultCol"
                            key={idx}
                          >
                            {pro.name.toLowerCase().includes(searchInputVal) ? (
                              <p className="searchresulttitle">
                                {pro.name.substring(0, 18)}
                              </p>
                            ) : pro.brand
                                .toLowerCase()
                                .includes(searchInputVal) ? (
                              <p className="searchresulttitle">
                                {pro.brand.substring(0, 15)}
                              </p>
                            ) : pro.subCategory
                                .toLowerCase()
                                .includes(searchInputVal) &&
                              <p className="searchresulttitle">
                                {pro.subCategory.substring(0, 15)}
                              </p>
                            
                            }
                            <p className="searchresultcategory">in {pro._id}</p>
                          </Link>
                        </React.Fragment>
                      );
                    })
                  : ""}
              </div>
            ) : (
              ""
            )}

            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item dropdown ">
                <div className="d-flex dropbtn">
                  <div>{loginpart()}</div>
                  <div className="icons downarrow">
                    <i className="fas fa-chevron-down text-white"></i>
                  </div>
                  <div className="icons uparrow">
                    <i className="fas fa-chevron-up text-white"></i>
                  </div>
                </div>
                <div className="dropdown-content">
                  {(!props.data || (props.data && !props.data.data)) &&
                  <>
                     <div id="signupdisplay">
                        New Customer?{" "}
                        <Link
                        to='#'
                          className="ml-3"
                          data-toggle="modal"
                          data-target="#myModal"
                          style={{ textDecoration: "none" }}
                          onClick={signuprender}
                        >
                          Sign up
                        </Link>
                        </div> 
                        </>
                        } 
                      <div>
                        <Link
                          className="nav-link "
                          to="/profile"
                          style={{ textDecoration: "none" }}
                        >
                          <i className="fas fa-user-circle mr-1"></i>My Profile
                        </Link>
                      </div>
                      <div>
                        <Link
                          to="/orders"
                          className="nav-link "
                          style={{ textDecoration: "none" }}
                        >
                          <i className="fas fa-box-tissue mr-1"></i>Orders
                        </Link>
                      </div>
                      {props.data && props.data.data && props.data.data.role === 'admin' &&
                      <div>
                        {" "}
                        <Link
                        to="/admin"
                          className="nav-link "
                          style={{ textDecoration: "none" }}
                          
                        >
                          <i className="fas fa-sign-out-alt mr-1"></i>Admin
                        </Link>
                      </div>}
                      {props.data && props.data.data && props.data.data.givenName &&
                      <div>
                        {" "}
                        <div
                        
                          className="nav-link cursorpoint"
                          style={{ textDecoration: "none" }}
                          onClick={logoutrender}
                        >
                          <i className="fas fa-sign-out-alt mr-1"></i>Logout
                        </div>
                      </div>}
                   
                  
                </div>
              </li>

              <li className="nav-item dropdown">
                <div className="d-flex dropbtn">
                  <div>
                    <div 
                      className="nav-link text-white cursorpoint"
                      style={{ textDecoration: "none" }}
                    >
                      More
                    </div>
                  </div>
                  <div className="icons downarrow">
                    <i className="fas fa-chevron-down text-white"></i>
                  </div>
                  <div className="icons uparrow">
                    <i className="fas fa-chevron-up text-white"></i>
                  </div>
                </div>
                <div className="dropdown-content">
                  <div>
                    <Link
                      to="/seller"
                      className="nav-link "
                      style={{ textDecoration: "none" }}
                    >
                      <i className="fas fa-toolbox mr-1"></i>Sell on Shop Mate
                    </Link>
                  </div>
                </div>
              </li>
             
                <li className="nav-item">
                  <Link
                    to="/cart"
                    className="nav-link text-white d-flex"
                    style={{ textDecoration: "none" }}
                  >
               <span> <i className="fas fa-shopping-cart mr-1 "></i></span>
               {props.data && props.data.data && props.data.data.cart.length > 0 &&
               <span className='badge badge-warning' id='lblCartCount'>{props.data.data.cart.length} </span>}
               <span > Cart</span> 
                  </Link>
                </li>
             
            </ul>
          </div>
        </nav>

        <Login />
      </div>
    );
  } else {
    return (
      <div className="headerdiv">
        <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
          <div className="navmain">
            <Link
              to="/"
              className="navbar-brand ml-5 navmain text-white" 
            >
              Shop Mate
            </Link>
          </div>
          <div >
            <Link
              to="/seller"
              className="navbar-brand text-white ml-2"
             style={{fontSize:'16px'}}
            >
              Seller Hub
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0 sellerheder">
              <li className="nav-item dropdown ">
                <div className="d-flex dropbtn">
                  <div>{sellerloginpart()}</div>

                  <div className="icons downarrow">
                    <i className="fas fa-chevron-down text-white"></i>
                  </div>
                  <div className="icons uparrow">
                    <i className="fas fa-chevron-up text-white"></i>
                  </div>
                </div>
                <div className="dropdown-content">
                  {!props.Sellerlogin.data ? (
                    <>
                      <div id="signupdisplay">
                        New Customer?{" "}
                        <Link
                        to='#'
                          className="ml-3"
                          data-toggle="modal"
                          data-target="#myModal"
                          style={{ textDecoration: "none" }}
                          onClick={signuprender}
                        >
                          Sign up
                        </Link>
                      </div>
                      <div style={{visibility:"hidden"}}>hhh</div>
                      
                    </>
                  ) : (
                    <>
                      
                      <div>
                        {" "}
                        <Link
                        
                          className="nav-link cursorpoint"
                          style={{ textDecoration: "none" }}
                          onClick={sellerlogoutrender}
                        >
                          <i className="fas fa-sign-out-alt mr-1"></i>Logout
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </li>
              {props.Sellerlogin.data  && (
                <>
                  <li className="nav-item">
                    <Link
                      to="/seller/addproducts"
                      className="nav-link text-white"
                      style={{ textDecoration: "none" }}
                    >
                      AddProducts
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/seller/viewproducts"
                      className="nav-link text-white"
                      style={{ textDecoration: "none" }}
                    >
                      ViewProducts
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <Login />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    data: state.logindata.Ldata,
    test: state.logindata.test,
    search: state.SearchReducer.SearchResultApi,
    Sellerlogin: state.SellerUserslogindata.Ldata,
  };
}

export default withRouter(connect(mapStateToProps)(Header));

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { allorderslist, updateorderlist } from "../../Actions/orderAction";
import AdminDashboard from "../../Components/AdminDashboard/admin";
import Loader from "../Loader";
import {Userinfo}  from '../../Actions/userActions'

const Admin = (props) => {
  const { orderslist } = props;
  

  useEffect(() => {
    props.dispatch(allorderslist());
    props.dispatch(Userinfo(props.location.pathname))
  }, []);

  const callbackafterupdateclick = (state) => {
    props.dispatch(updateorderlist(state));
  };

  useEffect(() => {
    if (orderslist.updateordersList) {
      props.dispatch(allorderslist());
    }

    if ([localStorage.getItem("token")].includes(null, undefined) || (props.ldata && !props.ldata.data)) {
      props.dispatch({
        type: "TEST",
        payload: "err",
      });
      props.history.push("/");
    } else if (props.ldata) {
      if(props.ldata.data.role !== 'admin'){
        props.history.push("/?err=You are not admin");
      }
    }
  }, [orderslist.updateordersList, props.ldata]);


  if (props.ldata && props.ldata.data && orderslist.allordersList) {
        return (
          <div>
            <AdminDashboard
              allorderslist={orderslist.allordersList}
              callbackafterupdateclick={callbackafterupdateclick}
              updateordersList={orderslist.updateordersList}
            />
          </div>
        );
      } else {
        return (
          <Loader/>
        );
      }
    }

function mapStateToProps(state) {
  return {
    orderslist: state.orders,
    ldata: state.logindata.Ldata,
  };
}

export default connect(mapStateToProps)(Admin);

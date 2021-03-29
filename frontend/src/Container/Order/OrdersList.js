import React, { useEffect} from 'react'
import OrdersDisplay from '../../Components/Orders/OrderDisplay'
import {connect} from 'react-redux'
import Loader from "../Loader";
import {getOrderlistofpertiperson} from '../../Actions/orderAction'
import {Userinfo}  from '../../Actions/userActions'

const Orders = (props) => {
  const {ldata,allproductsData}=props
  useEffect(()=>{
    props.dispatch(Userinfo(props.location.pathname))
  },[])

  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  },[])
  useEffect(()=>{
   
    if(props.ldata){
      if ([localStorage.getItem("token")].includes(null, undefined) || !props.ldata.data) {
        props.dispatch({
          type: "TEST",
          payload: "err",
        });
        props.history.push("/");
      } 
    }
    if(ldata){
      if(ldata.data){
      props.dispatch(getOrderlistofpertiperson(ldata.data._id))
    }}
    
  },[ldata])
  
  if(ldata && ldata.data && allproductsData){
      return (
        <React.Fragment>
            <OrdersDisplay orderlist={allproductsData.orderList}/>
        </React.Fragment>
      )
  }
  else {
    return (
      <Loader/>
    );
  }
}


function mapStateToProps(state){
    return{
      ldata:state.logindata.Ldata, 
      allproductsData:state.orders
    }   
}
export default connect(mapStateToProps)(Orders)

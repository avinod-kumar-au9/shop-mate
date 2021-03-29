import React, { useEffect, useState } from 'react'
import AdressandSummary from '../../Components/Orders/AddressAndSummary'
import {connect} from 'react-redux'
import Loader from "../Loader";
import {addOrders,allProductDetail,stockupdate} from '../../Actions/orderAction'
import {cartQuantityUpdate,clearCart,addAdress,Userinfo}  from '../../Actions/userActions'


const Orders = (props) => {
  const {ldata,allproductsData}=props

  useEffect(()=>{
    props.dispatch(Userinfo(props.location.pathname))
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
    sessionStorage.setItem('page','order')
    props.dispatch(allProductDetail())
  
  },[props.ldata])

  const addadress=(pho,pin,adress)=>{
    props.dispatch(addAdress(pho,pin,adress,ldata.data._id))
  }

  const quantityUpdate=(id,q)=>{
     props.dispatch(cartQuantityUpdate(id,q))
    
  }

  const postorder=async(address)=>{
    var list = ldata.data.cart
    var result =  list.map(function(el) {
      var o = Object.assign({}, el);
      o.deliverAdress = address;
      o.userId = ldata.data._id;
      return o;
    })
    await addOrders(result) 
    await clearCart(ldata.data._id) 
    await stockupdate(result)
  }
 
  if(props.ldata && props.ldata.data && props.allproductsData){
      return (
        <React.Fragment>
            <AdressandSummary addAdress={(pho,pin,adress)=>addadress(pho,pin,adress)} 
            detaildata={ldata} 
            allProDetail={allproductsData.allproducts} Props={props} 
            quantity={(id,quantity)=>quantityUpdate(id,quantity)} 
            orders={(adress)=>postorder(adress)}/>
           
        </React.Fragment>
      )
  }else {
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
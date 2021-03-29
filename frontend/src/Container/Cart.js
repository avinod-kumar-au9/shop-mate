import React, { useEffect } from 'react'
import CartDisplay from '../Components/Cart/CartDisplay'
import {connect} from 'react-redux'
import Loader from "./Loader";
import {Userinfo,cartQuantityUpdate,cartitemDelete}  from '../Actions/userActions'
import {allProductDetail}  from '../Actions/orderAction'

const Cart = (props) => {
  useEffect(()=>{
    props.dispatch(Userinfo(props.location.pathname))
  },[])

  useEffect(() => {
    if(props.data){
      if ([localStorage.getItem("token")].includes(null, undefined) || !props.data.data) {
        props.dispatch({
          type: "TEST",
          payload: "err",
        });
        props.history.push("/");
      }   
    }
  
    sessionStorage.setItem('page','cart')
    props.dispatch(allProductDetail()) 

  },[props.data]);

  const quantityUpdate=(id,q)=>{
    props.dispatch(cartQuantityUpdate(id,q))
   
  }
  
  const cartdeleteItem=async(id)=>{
    await props.dispatch(cartitemDelete(id))
   await props.dispatch(Userinfo(props.location.pathname));
  }

if(props.data && props.data.data &&  props.allproductsData){
    return (
      <React.Fragment>
          <CartDisplay cartitem={props.data} 
          deleteItem={(id)=>cartdeleteItem(id)} 
          allProDetail={props.allproductsData}
           quantity={(id,quantity)=>quantityUpdate(id,quantity)} 
          />
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
        data:state.logindata.Ldata, 
        allproductsData:state.orders.allproducts
    }   
}
export default connect(mapStateToProps)(Cart)

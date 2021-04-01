import React, { useEffect, useState } from "react";
import DetailDisplay from "../Components/Details/DetailDisplay";
import RelatedItemDisplay from "../Components/Details/RelatedItemDisplay";
import { connect } from "react-redux";
import Menu from "../Components/Home/menu"
import {singleProductInfo,SimilarProductsList,addComments} from '../Actions/detailAction'
import {addCart} from '../Actions/userActions'
import Loader from "./Loader";

const Details = (props) => {
  var id = props.match.params.id
  const [productincart,setProductincart] = useState(false)
  window.scrollTo({
    top:0,
    behavior:"smooth"
  })
  useEffect(() => {
    props.dispatch(singleProductInfo(id))
    props.dispatch(SimilarProductsList(props.match.params.id));
    
  }, []);

  useEffect(()=>{
    if(props.logindata && props.logindata.data){
      if(props.logindata.data.cart.length > 0){
      for(var i=0;i <props.logindata.data.cart.length ;i++){
            if(props.logindata.data.cart[i].size === '0'){
            if(props.logindata.data.cart[i].productId === id){
                 setProductincart(true)
            }}
      }
    }}
  },[props.logindata])

  const postcomment=async(t,d,r)=>{
    await props.dispatch(addComments(props.logindata.data.givenName,t,d,r,id))
    await props.dispatch(singleProductInfo(id))
  }

  const login=()=>{
    props.dispatch({
      type: "TEST",
      payload: "err",
    });
    props.history.push(`/details/${id}`)
  }
  
  const cartdetail=async(pid,i,n,c,s,p,d,coupon,com)=>{
    await props.dispatch(addCart(pid,i,n,c,s,p,d,props.logindata.data._id,coupon,com))
  }

const callbacksimilarproductrerender=(id)=>{
  window.scrollTo({
    top:0,
    behavior:"smooth"
  })
  props.dispatch(singleProductInfo(id))
}

  if(props.Ddata.singleproduct){
  return (
    <React.Fragment>
      <Menu/>
      <DetailDisplay pdata={props.logindata} props={props} login={()=>login()}
       data={props.Ddata.singleproduct} productincart={productincart} commentpostdetails={(t,d,r)=>postcomment(t,d,r)} 
      cartdetail={(pid,i,n,c,s,p,d,coupon,com)=>cartdetail(pid,i,n,c,s,p,d,coupon,com)}/>
      <RelatedItemDisplay
        SimilarProductsApi={props.Ddata.SimilarProductsApi}
        callbacksimilarproductrerender={callbacksimilarproductrerender}
      />
    </React.Fragment>
  )}else {
    return (
      <Loader/>
    );
  }
};


function mapStateToProps(state) {
  return {
    Ddata:state.details,
    logindata:state.logindata.Ldata
  };
}

export default connect(mapStateToProps)(Details);

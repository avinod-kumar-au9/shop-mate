import Editproducts from "../../Components/SellerDashboard/EditProducts";
import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { UpdateProducts,SingleProduct } from "../../Actions/sellerActions";
import { toast } from 'react-toastify';
import Loader from "../Loader";

toast.configure()


const EditProducts = (props) => {

  const {EditStoreInfo,Sellerlogin}=props
  const [spinner,setspinner]=useState(false)


  useEffect(() => {
    props.dispatch(SingleProduct(props.match.params.id));
  }, []);

  const FullDataSubmitHandler = (e, state) => {
    e.preventDefault();
    props.dispatch(UpdateProducts(state));
    setspinner(true)
  };

  useEffect(()=>{

    if (EditStoreInfo.ProductsListApi === "success"){
      setspinner(false)
      toast("product updated successfully",{
        autoClose: 2000
      })
      props.history.push("/seller/viewproducts")
      
      props.dispatch({
        type: "ADDPRODUCTS",
        payload: "failure",
      })

    }

    if(props.Sellerlogin){
      if ([localStorage.getItem("token1")].includes(null, undefined) || !props.Sellerlogin.data) {
        props.dispatch({
          type: "TEST",
          payload: "err",
        });
        props.history.push("/seller");
      } 
    }

  },[EditStoreInfo.ProductsListApi,Sellerlogin])



  if (Sellerlogin && Sellerlogin.data && EditStoreInfo.SingleProductApi) {
        return (
          <Editproducts FullDataSubmitHandler={FullDataSubmitHandler} 
          SingleProductApi={EditStoreInfo.SingleProductApi}
          DeletedProductResp={EditStoreInfo.ProductsListApi}
          spinner={spinner}
          />
        );
      } else {
        return (
          <Loader/>
        );
      }

};

function mapStateToProps(state) {
  return {
    EditStoreInfo: state.SellerReducer,
    Sellerlogin: state.SellerUserslogindata.Ldata
  };
}

export default connect(mapStateToProps)(EditProducts);

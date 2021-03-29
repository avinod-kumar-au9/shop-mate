import SellerInfo from "../../Components/SellerDashboard/AddingProductDetails";
import { AddProducts } from "../../Actions/sellerActions";
import { connect } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader";
import {Userinfo}  from '../../Actions/userActions'

toast.configure();

const Seller = (props) => {
  const { SellerStoreInfo, Sellerlogin } = props;

  const FullDataSubmitHandler = (data) => {
    props.dispatch(AddProducts(data));
  };

  useEffect(()=>{
    props.dispatch(Userinfo(props.location.pathname))
  },[])

  useEffect(() => {
    if (SellerStoreInfo.ProductsListApi === "success") {
      toast("product added successfully",{
        autoClose: 2000
      });
      props.history.push("/seller/viewproducts");
      props.dispatch({
        type: "ADDPRODUCTS",
        payload: "failure",
      });
    }

    if(props.Sellerlogin){
      if ([localStorage.getItem("token1")].includes(null, undefined) || !props.Sellerlogin.data) {
        props.dispatch({
          type: "TEST",
          payload: "err",
        });
        props.history.push("/seller");
      } }
  },[SellerStoreInfo.ProductsListApi, Sellerlogin]);


  if (Sellerlogin && Sellerlogin.data) {
      return (
        <div>
          <SellerInfo
            FullDataSubmitHandler={FullDataSubmitHandler}
            Responseafteraddingproducts={SellerStoreInfo.ProductsListApi}
            Sellerlogin={Sellerlogin.data}
          />
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
    SellerStoreInfo: state.SellerReducer,
    Sellerlogin: state.SellerUserslogindata.Ldata,
  };
}

export default connect(mapStateToProps)(Seller);

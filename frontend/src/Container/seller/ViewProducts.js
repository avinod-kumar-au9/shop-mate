import React, { useEffect, useState } from "react";
import Viewproducts from "../../Components/SellerDashboard/ViewProducts";
import {
  SubCategoryProductsList,
  DeleteProduct,
  TotalProducts,
} from "../../Actions/sellerActions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../Loader";
import {Userinfo}  from '../../Actions/userActions'

toast.configure();

const ViewProducts = (props) => {
  const [subCategory, setsubCategory] = useState("");
  const { SellerStoreInfo ,Sellerlogin} = props;

  useEffect(() => {
    props.dispatch(TotalProducts());
    props.dispatch(Userinfo(props.location.pathname))
  }, []);

  const subcategorySelecthandler = (e) => {
    setsubCategory(e.target.value);
    props.dispatch(SubCategoryProductsList(e.target.value));
  };

  const deleteHandler = (id) => {
    props.dispatch(DeleteProduct(id));

    if (subCategory) {
      props.dispatch(SubCategoryProductsList(subCategory));
    } else {
      props.dispatch(TotalProducts());
    }
  };

  useEffect(() => {
    if (SellerStoreInfo.ProductsListApi === "success") {
      toast("product deleted successfully");
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
      } 
    }
  }, [SellerStoreInfo.ProductsListApi,Sellerlogin]);

  

  if (Sellerlogin && Sellerlogin.data && SellerStoreInfo.TotalProductsListApi) {
        return (
          <div>
            <Viewproducts
              TotalProductsListApi={SellerStoreInfo.TotalProductsListApi}
              subcategorySelecthandler={subcategorySelecthandler}
              deleteHandler={deleteHandler}
              Sellerlogin={Sellerlogin.data}
            />
          </div>
        )
      } else {
        return (
          <Loader/>
        );
      }

};

function mapStateToProps(state) {
  return {
    SellerStoreInfo: state.SellerReducer,
    Sellerlogin: state.SellerUserslogindata.Ldata
  };
}

export default connect(mapStateToProps)(ViewProducts);

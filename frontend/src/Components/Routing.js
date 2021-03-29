import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "../Container/Home";
import List from "../Container/List";
import Details from "../Container/Details";
import Cart from "../Container/Cart";
import Orders from "../Container/Order/OrdersList";
import OrdersPreview from "../Container/Order/orderPreview";
import Profile from "../Container/Profile";
import SellerAddproducts from "../Container/seller/addProducts";
import SellerHomepage from "../Container/seller/Homepage";
import ViewProducts from "../Container/seller/ViewProducts";
import EditProducts from "../Container/seller/Editproducts";
import Admin from '../Container/Admin/admin'

const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      
        <Route exact path="/" component={Home} />
        <Route exact path="/list" component={List} />
        <Route exact path="/details/:id" component={Details} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path='/orderpreview' component={OrdersPreview}/>
        <Route path="/seller/" exact component={SellerHomepage} />
        <Route path="/seller/addproducts" exact component={SellerAddproducts} />
        <Route path="/seller/viewproducts" exact component={ViewProducts} />
        <Route path="/seller/editproducts/:id" exact component={EditProducts} />
        <Route path="/admin" exact component={Admin} />
       
      
      <Footer />
    </BrowserRouter>
  );
};

export default Routing;

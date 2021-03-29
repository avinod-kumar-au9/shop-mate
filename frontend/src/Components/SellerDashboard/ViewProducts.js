import React, { useState, useEffect } from "react";
import ImageResizer from "react-image-resizer";
import { isMobileOnly, isTablet, isBrowser } from "react-device-detect";
import "./styles/viewProducts.scss";
import { withRouter } from "react-router-dom";

const ViewProducts = (props) => {
  const [category, setcategory] = useState("");
  const [responsivewidth, setresponsiveWidth] = useState(100);
  const [responsiveheight, setresponsiveHeight] = useState(80);

  const {
    TotalProductsListApi,
    subcategorySelecthandler,
    deleteHandler,
    Sellerlogin

  } = props;

  const categorySelecthandler = (e) => {
    setcategory(e.target.value);
  };



  useEffect(() => {
    if (isTablet) {
      setresponsiveWidth(80);
      setresponsiveHeight(70);
    }
    if (isMobileOnly) {
      setresponsiveWidth(50);
      setresponsiveHeight(50);
    }
    if (isBrowser) {
      setresponsiveWidth(100);
      setresponsiveHeight(70);
    }

    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
    
  }, []);



  const editClickHandler = (id) => {
    props.history.push(`/seller/editproducts/${id}`);
  };

  const style = {
    image: {
      
      marginLeft:"10px"
    },
  };

  return (
    <div className="viewListingsRow">
      <div className="viewListingsCol">
        <h4 style={{textAlign:"center",marginBottom:"20px"}}>My Listings</h4>

        <p style={{marginLeft:"20px"}}>Filters <i className="ri-filter-3-line"></i></p>
        <div style={{ marginBottom: "20px" }} className="col-lg-12">
          <select onChange={categorySelecthandler} className="custom-select">
            <option defaultValue value="">
              Choose Category
            </option>
            <option className="option">Electronics</option>
            <option className="option">Fashion</option>
            <option>HomeFurniture</option>
            <option>Sports</option>
            <option>Beauty</option>
          </select>
        </div>
        <div className="col-lg-12 selectDiv">
          <select
            onChange={(e) => subcategorySelecthandler(e)}
            className="custom-select"
          >
            <option defaultValue value="">
              Choose Sub-Category
            </option>

            {category === "Electronics" && (
              <>
                {" "}
                <option>Mobiles</option>
                <option>Laptops</option>
                <option>Televisions</option>{" "}
              </>
            )}

            {category === "Fashion" && (
              <>
                {" "}
                <option>Mens</option>
                <option>Womens</option>
                <option>Kids</option>{" "}
              </>
            )}

            {category === "HomeFurniture" && (
              <>
                {" "}
                <option>Kitchen</option>
                <option>Living Room</option>
                <option>Home Decor</option>{" "}
              </>
            )}

            {category === "Sports" && (
              <>
                {" "}
                <option>Cricket</option>
                <option>Football</option>
                <option>Skating</option>{" "}
              </>
            )}

            {category === "Beauty" && (
              <>
                {" "}
                <option>Personal Hygiene</option>
                <option>Hair care</option>{" "}
              </>
            )}
          </select>
        </div>
      </div>

      <div className="viewListingsCol">
        <div className="listingsRow">
          {TotalProductsListApi.length > 0 ?
            TotalProductsListApi.filter((data) => {
              return data.sellerId === Sellerlogin._id;
            }).map((product, idx) => {
              return (
                <React.Fragment key={idx}>
                  <div className="listingsCol">
                    <ImageResizer
                      src={product.image}
                      height={responsiveheight}
                      width={responsivewidth}
                      style={style.image} 
                    />
                  </div>

                  <div className="listingsCol">
                    <p className="listingTitle">
                      {product.name.charAt(0).toUpperCase() +
                        product.name.slice(1).substring(0, 60)}{" "}
                      ...
                    </p>
                    <p className="listingPrice">₹ {product.price.toLocaleString()}</p>
                    <p className="listingBrand">{product.brand}</p>
                    <div className="editgrp">
                      <i
                        onClick={() => editClickHandler(product._id)}
                        className="ri-edit-box-line editbutt"
                      ></i>
                      <i
                        onClick={() => deleteHandler(product._id)}
                        className="ri-delete-bin-line deletebutt"
                      ></i>
                    </div>
                  </div>
                </React.Fragment>
              );
            }) : <center>No Data Found</center>}
        </div>
      </div>
    </div>
  );
};

export default withRouter(ViewProducts);

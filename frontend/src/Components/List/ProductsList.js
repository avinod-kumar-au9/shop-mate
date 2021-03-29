import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import ImageResizer from "react-image-resizer";
import { isMobileOnly, isTablet, isBrowser } from "react-device-detect";
import "./styles/ProductsList.scss";

const ProductsList = (props) => {
  const {
    ProductsListApi,
    sortingpriceselectCallBack,
    currentcategory,
  } = props;
  const [postPerPage] = useState(8);
  const [activePage, setActivePage] = useState(1);
  const [responsiveWidth, setresponsiveWidth] = useState(250);
  const [responsiveHeight, setresponsiveHeight] = useState(200);

  const indexOfLastPost = activePage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const FilteredData = ProductsListApi.slice(indexOfFirstPost, indexOfLastPost);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (isTablet) {
      setresponsiveWidth(200);
      setresponsiveHeight(150);
    }
    if (isMobileOnly) {
      setresponsiveWidth(150);
      setresponsiveHeight(150);
    }
    if (isBrowser) {
      setresponsiveWidth(250);
      setresponsiveHeight(200);
    }
    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth <= 600) {
          setresponsiveWidth(150);
          setresponsiveHeight(150);
        } else if (window.innerWidth > 779) {
          setresponsiveWidth(200);
          setresponsiveHeight(150);
        } else if (window.innerWidth > 992) {
          setresponsiveWidth(250);
          setresponsiveHeight(200);
        }
      },
      false
    );
  }, []);

  const style = {
    image: {
      marginLeft: "10px",
    },
  };

  const priceSortingHandler = (e) => {
    if (e.target.innerHTML === "Price -- Low to High") {
      sortingpriceselectCallBack(1);
    } else {
      sortingpriceselectCallBack(-1);
    }
  };

  return (
    <div className="productsList">
      {/* this is written just to start from particular point */}
      <small style={{ visibility: "hidden",margin:"0" }}>dfffffffffff</small>
      {/* refer above */}

      <div className="linktext mt-2 mb-2">
        
          <Link
            to="/"
            className="pr-2"
            style={{ color: "black", textDecoration: "none" }}
          >
            Home
          </Link>
        
        <i style={{ fontSize: "10px" }} className="fas fa-chevron-right"></i>
        <div
          className="pr-2 pl-2"
          style={{ color: "black", textDecoration: "none" }}
        >
          {currentcategory.category
            ? currentcategory.category
            : currentcategory.subCategory}
        </div>
      </div>

      <div className="productsListcategorynametitle">
        {" "}
        <span className="productsListcategoryname">
          {currentcategory.category
            ? currentcategory.category
            : currentcategory.subCategory}
        </span>
        <span className="productsListlength">
          ({ProductsListApi.length.toLocaleString()} results found)
        </span>
      </div>
      <div className="productslistsorting">
        <span className="productslistssortby">Sort By</span>
        <span
          className="productslistspricelowtohigh"
          onClick={priceSortingHandler}
        >
          Price -- Low to High
        </span>
        <span
          className="productslistspricehightolow"
          onClick={priceSortingHandler}
        >
          Price -- High to Low
        </span>
      </div>
      <div className="listRow">
        {FilteredData.length > 0 ? (
          FilteredData.map((product, idx) => {
            return (
              <Link
                to={`/details/${product._id}`}
                style={{ textDecoration: "none" }}
                className="listCol"
                key={idx}
              >
                <ImageResizer
                  className="listimage"
                  src={product.image}
                  height={responsiveHeight}
                  width={responsiveWidth}
                  style={style.image}
                />
                <p style={{ color: "black" }} className="listText">
                  {product.name.charAt(0).toUpperCase() +
                    product.name.slice(1).substring(0, 30)}{" "}
                  . . .
                </p>
                <span style={{ marginLeft: "10px" }} className="listrating">
                  {product.rating}
                  <span className="material-icons listrating">star_border</span>
                </span>
                <p className="listprice">₹ {product.price.toLocaleString()}</p>
                <p className="listoffer">
                  {product.coupon && "Offer Available"}
                </p>
              </Link>
            );
          })
        ) : (
          <div>No Data Found</div>
        )}
      </div>

      <div className="pagiRow">
        <div className="pagiCol">
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={activePage}
            itemsCountPerPage={postPerPage}
            totalItemsCount={ProductsListApi.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsList;

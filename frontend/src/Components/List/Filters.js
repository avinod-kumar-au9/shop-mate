import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./styles/Filters.scss";
import { isMobileOnly } from "react-device-detect";

const Filters = (props) => {
  const {
    Uniquebrands,
    Uniquecategory,
    Uniquesubcategory,
    multipleFiltersCallback,
    refetchingBrandsOffersCallBack,
    liststatepassingtofilters
  } = props;
  const [state, setstate] = useState({
    category: "",
    subCategory: "",
    brand: '',
    minPrice: "",
    maxPrice: "",
    coupon: "",
    dummy: "",
    dummycategory: "",
    dummysubcategory: "",
  });
  const [filtersVisible, setfiltersVisible] = useState(true);
  const [categoriesVisible, setcategoriesVisible] = useState(true);
  const [brandVisible, setbrandVisible] = useState(true);
  const [priceVisible, setpriceVisible] = useState(true);
  const [offerVisible, setofferVisible] = useState(true);

  useEffect(() => {
    if (isMobileOnly) {
      setfiltersVisible(false);
      setcategoriesVisible(false);
      setbrandVisible(false);
      setpriceVisible(false);
      setofferVisible(false);
    }

    var queryParams = props.location.search.substr(1).split("=");
    if (queryParams[0] === "category") {
      setstate({
        ...state,
        category: queryParams[1],
        subCategory: "",
      });
    } else {
      setstate({
        ...state,
        category: "",
        subCategory: queryParams[1],
      });
    }
  },[]);

  useEffect(()=>{
 
    if (liststatepassingtofilters.category){
      setstate({
        ...state,
        category:liststatepassingtofilters.category,
        subCategory:"",
        brand:"",
        minPrice:"",
        maxPrice:"",
        coupon:"",
      })
    }

    if (liststatepassingtofilters.subCategory){
      setstate({
        ...state,
        subCategory:liststatepassingtofilters.subCategory,
        category:"",
        brand:"",
        minPrice:"",
        maxPrice:"",
        coupon:"",
      })
    }

  },[liststatepassingtofilters])

  const OfferClickHandler = (e) => {
    if (e.target.checked) {
      setstate({
        ...state,
        coupon: e.target.value,
        dummy: "some",
      });
    } else {
      setstate({
        ...state,
        coupon: "",
        dummy: "some",
      });
    }
  };

  // console.log(state);
  const BrandClickHandler = (e) => {
    setstate({
      ...state,
      brand: e.target.value,
      dummy: "some",
    })

  };

  const priceChangeHandler = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const priceClickhandler = () => {
    if (state.minPrice && state.maxPrice) {
      multipleFiltersCallback(state);
    }
  };

  const categoryClickHandler = (e) => {
    setstate({
      ...state,
      category: e.target.innerHTML,
      subCategory: "",
      dummy: "some",
      dummycategory: "some",
      brand:"",
      minPrice:"",
      maxPrice:"",
      coupon:"",
     
    })
  };
  const subcategoryClickHandler = (e) => {
    setstate({
      ...state,
      subCategory: e.target.innerHTML,
      category: "",
      dummy: "some",
      dummysubcategory: "some",
        brand:"",
        minPrice:"",
        maxPrice:"",
        coupon:"",
    });
  };

  useEffect(() => {
    if (state.dummy) {
      multipleFiltersCallback(state);
      setstate({
        ...state,
        dummy: "",
      });
    }

    if (state.dummycategory) {
      refetchingBrandsOffersCallBack("category", state.category);
      setstate({
        ...state,
        dummycategory: "",
      });
    }
    if (state.dummysubcategory) {
      refetchingBrandsOffersCallBack("subCategory", state.subCategory);
      setstate({
        ...state,
        dummysubcategory: "",
      });
    }
  }, [state.dummy, state.dummycategory, state.dummysubcategory]);

  const FiltersVisibleHandler = () => {
    if (filtersVisible) {
      setfiltersVisible(false);
    } else {
      setfiltersVisible(true);
    }
  };
  const categoriesVisibleHandler = () => {
    if (categoriesVisible) {
      setcategoriesVisible(false);
    } else {
      setcategoriesVisible(true);
    }
  };

  const brandVisibleHandler = () => {
    if (brandVisible) {
      setbrandVisible(false);
    } else {
      setbrandVisible(true);
    }
  };

  const priceVisibleHandler = () => {
    if (priceVisible) {
      setpriceVisible(false);
    } else {
      setpriceVisible(true);
    }
  };

  const offerVisibleHandler = () => {
    if (offerVisible) {
      setofferVisible(false);
    } else {
      setofferVisible(true);
    }
  };

  const clearallfiltersHandler=()=>{
    setstate({
      ...state,
      brand:"",
      minPrice:"",
      maxPrice:"",
      coupon:"",
      dummy: "some"
    })
  }

  const renderclearallfilters=()=>{
    if (state.brand || (state.minPrice && state.maxPrice) || state.coupon){
      return(
<p onClick={clearallfiltersHandler} className="FiltersClearAll">Clear All Filters</p>
      )
    }
  }

  return (
    <div className="filterRow">
      <h4 onClick={FiltersVisibleHandler} className="filtitle">
        Filters<i className="ri-filter-3-line"></i>
      </h4>
      {renderclearallfilters()}
      {filtersVisible ? (
        <>
          {" "}
          <div className="filterCol">
            <h4 onClick={categoriesVisibleHandler} className="filtertitle">
              CATEGORIES{" "}
              {categoriesVisible ? (
                <i className="ri-arrow-up-s-line mainarrowfilters"></i>
              ) : (
                <i className="ri-arrow-down-s-line mainarrowfilters"></i>
              )}
            </h4>
            
            {categoriesVisible && Uniquecategory.length > 0
              ? Uniquecategory.map((category, idx) => {
                  return (
                    <div key={idx} className="categoryfiltermaindiv">
                      <span className="material-icons categoryfilterarrow">
                        arrow_back_ios
                      </span>

                      <p
                        onClick={categoryClickHandler}
                        className="filtercategoryitem"
                        
                      >
                        {category}
                      </p>
                    </div>
                  );
                })
              : ""}

            {categoriesVisible && Uniquesubcategory.length > 0
              ? Uniquesubcategory.map((subcategory, idx) => {
                  return (
                    <p
                      onClick={subcategoryClickHandler}
                      className="filtersubcategoryitems"
                      key={idx}
                    >
                      {subcategory}
                    </p>
                  );
                })
              : ""}
          </div>
        
          <div className="filterCol">
            <h4 onClick={brandVisibleHandler} className="filtertitle">
              BRAND{" "}
              {brandVisible ? (
                <i className="ri-arrow-up-s-line mainarrowfilters"></i>
              ) : (
                <i className="ri-arrow-down-s-line mainarrowfilters"></i>
              )}
            </h4>
            {brandVisible && Uniquebrands.length > 0
              ? Uniquebrands.map((brandi, idx) => {
                const brandii = brandi.toLowerCase().trim()
                const brand= brandii.charAt(0).toUpperCase() + brandii.slice(1)
                  return (
                    <label
                      className="filterbrandname"
                      key={idx}
                      htmlFor={brandi}
                    >
                      <input
                        className="filterbrandcheck"
                        onChange={BrandClickHandler}
                        name="brand"
                        value={brandi}
                        type="radio"
                        id={brandi}
                        checked= {state.brand === brandi ? true : false }

                      />
                      {brand}
                    </label>
                  );
                })
              : ""}
          </div>
          <div className="filterCol">
            <h4 onClick={priceVisibleHandler} className="filtertitle">
              PRICE{" "}
              {priceVisible ? (
                <i className="ri-arrow-up-s-line mainarrowfilters"></i>
              ) : (
                <i className="ri-arrow-down-s-line mainarrowfilters"></i>
              )}
            </h4>
            {priceVisible && (
              <>
                <input
                  className="filterpriceinput filterpriceone"
                  onChange={priceChangeHandler}
                  value={state.minPrice}
                  type="number"
                  name="minPrice"
                  placeholder="min"
                />
                <span className="filterpriceto">to</span>
                <input
                  className="filterpriceinput"
                  name="maxPrice"
                  value={state.maxPrice}
                  type="number"
                  onChange={priceChangeHandler}
                  placeholder="max"
                />
                <button
                  className="filterpricebutton"
                  onClick={priceClickhandler}
                >
                  Go
                </button>{" "}
              </>
            )}
          </div>
          <div className="filterCol">
            <h4 onClick={offerVisibleHandler} className="filtertitle">
              OFFERS{" "}
              {offerVisible ? (
                <i className="ri-arrow-up-s-line mainarrowfilters"></i>
              ) : (
                <i className="ri-arrow-down-s-line mainarrowfilters"></i>
              )}
            </h4>
            {offerVisible && (
              <label className="filteroffername" htmlFor="offer">
                <input
                  className="filteroffercheck"
                  onChange={OfferClickHandler}
                  type="radio"
                  value="SAVE 50"
                  id="offer"
                  checked= {state.coupon ? true : false }

                />
                SAVE 50
              </label>
            )}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default withRouter(Filters);

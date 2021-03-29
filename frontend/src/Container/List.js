import React, { useEffect, useState } from "react";
import ProductsList from "../Components/List/ProductsList";
import FiltersList from "../Components/List/Filters";
import MenuBar from "../Components/Home/menu";
import {
  CategoryProductsList,
  Uniquebrands,
  Uniquecategory,
  UniqueSubcategory,
  UniqueOffers,
  MultipleFilters,
  FilterByprice,
} from "../Actions/listActions";
import { connect } from "react-redux";
import Loader from "./Loader";

const List = (props) => {
  const { ListStoreInfo } = props;
  const [state, setstate] = useState({
    category: "",
    subCategory: "",
  });

  
  var queryParams = props.location.search.substr(1).split("=");

  useEffect(() => {
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

    props.dispatch(CategoryProductsList(queryParams[0], queryParams[1]));
    props.dispatch(Uniquebrands(queryParams[0], queryParams[1]));
    props.dispatch(Uniquecategory(queryParams[0], queryParams[1]));
    props.dispatch(UniqueSubcategory(queryParams[0], queryParams[1]));
    props.dispatch(UniqueOffers(queryParams[0], queryParams[1]));
  }, []);

  useEffect(() => {
    if (ListStoreInfo.Forceupdateonmenuclick) {
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

      props.dispatch(CategoryProductsList(queryParams[0], queryParams[1]));
      props.dispatch(Uniquebrands(queryParams[0], queryParams[1]));
      props.dispatch(Uniquecategory(queryParams[0], queryParams[1]));
      props.dispatch(UniqueSubcategory(queryParams[0], queryParams[1]));
      props.dispatch(UniqueOffers(queryParams[0], queryParams[1]));

      props.dispatch({
        type: "FORCEUPDATEONMENUCLICK",
        payload: "",
      });
    }
    if (ListStoreInfo.Forceupdateonsearchclick) {
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

      props.dispatch(CategoryProductsList(queryParams[0], queryParams[1]));
      props.dispatch(Uniquebrands(queryParams[0], queryParams[1]));
      props.dispatch(Uniquecategory(queryParams[0], queryParams[1]));
      props.dispatch(UniqueSubcategory(queryParams[0], queryParams[1]));
      props.dispatch(UniqueOffers(queryParams[0], queryParams[1]));

      props.dispatch({
        type: "FORCEUPDATEONSEARCHCLICK",
        payload: "",
      });
    }
  }, [
    ListStoreInfo.Forceupdateonmenuclick,
    ListStoreInfo.Forceupdateonsearchclick,
  ]);

  const multipleFiltersCallback = (body) => {
    if (
      body.brand.length > 0 ||
      (body.minPrice && body.maxPrice) ||
      body.coupon
    ) {
      props.dispatch(MultipleFilters(body));
    } else {
      if (body.category) {
        props.dispatch(CategoryProductsList("category", body.category));
      } else {
        props.dispatch(CategoryProductsList("subCategory", body.subCategory));
      }
    }
  };

  const refetchingBrandsOffersCallBack = (categoryName, categoryVal) => {
    if (categoryName === "category") {
      setstate({
        ...state,
        category: categoryVal,
        subCategory: "",
      });
    } else {
      setstate({
        ...state,
        category: "",
        subCategory: categoryVal,
      });
    }
    props.dispatch(Uniquebrands(categoryName, categoryVal));
    props.dispatch(UniqueSubcategory(categoryName, categoryVal));
  };

  const MenuSubCategoryclickHandler = () => {
    props.dispatch({
      type: "FORCEUPDATEONMENUCLICK",
      payload: "some",
    });
  };

  const sortingpriceselectCallBack = (val) => {
    const body = {
      category: state.category,
      subCategory: state.subCategory,
      price: val,
    };

    props.dispatch(FilterByprice(body));
  };

  if (ListStoreInfo.ProductsListApi) {
    return (
      <React.Fragment>
        <MenuBar MenuSubCategoryclickHandler={MenuSubCategoryclickHandler} />
        <div className="ListdividerRow">
          <div className="ListdividerCol">
            <FiltersList
              Uniquebrands={ListStoreInfo.UniqueBrandsApi}
              Uniquecategory={ListStoreInfo.UniqueCategoryApi}
              Uniquesubcategory={ListStoreInfo.UniqueSubCategoryApi}
              Uniqueoffers={ListStoreInfo.UniqueOffersApi}
              multipleFiltersCallback={multipleFiltersCallback}
              refetchingBrandsOffersCallBack={refetchingBrandsOffersCallBack}
              liststatepassingtofilters={state}
            />
          </div>
          <div className="ListdividerCol">
            <ProductsList
              ProductsListApi={ListStoreInfo.ProductsListApi}
              sortingpriceselectCallBack={sortingpriceselectCallBack}
              currentcategory={state}
            />
          </div>
        </div>{" "}
      </React.Fragment>
    );
  } else {
    return (
     <Loader/>
    );
  }
};

function mapStateToProps(state) {
  return {
    ListStoreInfo: state.ListReducer,
  };
}


export default connect(mapStateToProps)(List);

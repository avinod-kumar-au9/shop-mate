import axios from "axios";
const url = "/api/";

export function CategoryProductsList(categoryName, productCategory) {
  let category = "";
  if (categoryName === "subCategory") {
    category = "productslistbysubcategory";
  } else {
    category = "productslistbycategory";
  }

  const output = axios.get(
    `${url}${category}?${categoryName}=${productCategory}`
  );
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "PRODUCTSLIST",
        payload: data,
      });
    });
  };
}

export function Uniquebrands(categoryName, productCategory) {
  const output = axios.get(
    `${url}uniquebrands?${categoryName}=${productCategory}`
  );
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "UNIQUEBRANDS",
        payload: data,
      });
    });
  };
}

export function UniqueOffers(categoryName, productCategory) {
  const output = axios.get(
    `${url}uniqueoffers?${categoryName}=${productCategory}`
  );
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "UNIQUEOFFERS",
        payload: data,
      });
    });
  };
}


export function Uniquecategory(categoryName, productCategory) {
  const output = axios.get(
    `${url}uniquecategory?${categoryName}=${productCategory}`
  );
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "UNIQUECATEGORY",
        payload: data,
      });
    });
  };
}


export function UniqueSubcategory(categoryName, productCategory) {
  const output = axios.get(
    `${url}uniquesubcategory?${categoryName}=${productCategory}`
  );
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "UNIQUESUBCATEGORY",
        payload: data,
      });
    });
  };
}


export function MultipleFilters(body) {
  const output= axios.post(`${url}multiplefilters`,     
      body 
    )
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "PRODUCTSLIST",
        payload: data,
      });
    });
  };
}

export function FilterByprice(body) {
  let route=""
  if (body.category){
    route= "filterbypricecategory"
  }else{
    route= "filterbypricesubcategory"
  }

  const output= axios.post(`${url}${route}`,  
      body
    )
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "PRODUCTSLIST",
        payload: data,
      });
    });
  };
}

import axios from "axios";
const url = "/api/";

export function AddProducts(body) {
  const output = fetch(`${url}addproducts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "ADDPRODUCTS",
        payload: "success",
      });
    });
  };
}

export function UpdateProducts(body) {
  const output = fetch(`${url}updateproducts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "UPDATEPRODUCTS",
        payload: "success",
      });
    });
  };
}

export function DeleteProduct(id) {
  const output = fetch(`${url}deleteproduct/${id}`, {
    method: "DELETE",
  });
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "DELETEPRODUCTS",
        payload: "success",
      });
    });
  };
}

export function SubCategoryProductsList(category) {
  const output = axios.get(
    `${url}productslistbysubcategory?subCategory=${category}`
  );
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "SUBCATEGORYPRODUCTSLIST",
        payload: data,
      });
    });
  };
}

export function SingleProduct(id) {
  const output = axios.get(`${url}singleproductinfo/${id}`);
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "SINGLEPRODUCT",
        payload: data,
      });
    });
  };
}

export function TotalProducts() {
  const output = axios.get(`${url}productslist`);
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "TOTALPRODUCTS",
        payload: data,
      });
    });
  };
}

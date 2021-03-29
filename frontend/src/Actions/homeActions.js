import axios from "axios";
const url = "/api/";

export function DiscountsList() {
  const output = axios.get(`${url}discountslist`);
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "DISCOUNTSlIST",
        payload: data,
      });
    });
  };
}

export function BestElectronicsList() {
  const output = axios.get(`${url}productslistbycategory?category=Electronics`);
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "BESTELECTRONICSlIST",
        payload: data,
      });
    });
  };
}
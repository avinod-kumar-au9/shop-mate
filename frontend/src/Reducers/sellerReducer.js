const ProductsStore = {
  ProductsListApi: "failure",
  TotalProductsListApi: "",
  SingleProductApi: "",
};

export default function SellerReducer(state, action) {
  state = state || ProductsStore;
  switch (action.type) {
    case "ADDPRODUCTS":
      return { ...state, ProductsListApi: action.payload };
    case "UPDATEPRODUCTS":
      return { ...state, ProductsListApi: action.payload };
    case "DELETEPRODUCTS":
      return { ...state, ProductsListApi: action.payload };
    case "SUBCATEGORYPRODUCTSLIST":
      return { ...state, TotalProductsListApi: action.payload };
    case "SINGLEPRODUCT":
      return { ...state, SingleProductApi: action.payload };
    case "TOTALPRODUCTS":
      return { ...state, TotalProductsListApi: action.payload };

    default:
      return state;
  }
}

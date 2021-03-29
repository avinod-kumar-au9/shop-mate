const DetailsStore = {
  SimilarProductsApi: "",
};

export default function detailProducts(state, action) {
  state = state || DetailsStore;
  switch (action.type) {
    case "SIMILARPRODUCTS":
      return { ...state, SimilarProductsApi: action.payload };
      case 'SINGLEPRODUCT':
        return{...state, singleproduct:action.payload}
      case 'COMMENTS':
        return{...state, comments:action.payload}

    default:
      return state;
  }
}



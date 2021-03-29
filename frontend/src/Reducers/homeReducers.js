const ProductsStore = {
  DiscountsApi: "",
  BestElectronicsApi: "",
};

export default function HomeReducer(state, action) {
  state = state || ProductsStore;
  switch (action.type) {
    case "DISCOUNTSlIST":
      return { ...state, DiscountsApi: action.payload };
    case "BESTELECTRONICSlIST":
      return { ...state, BestElectronicsApi: action.payload };

    default:
      return state;
  }
}

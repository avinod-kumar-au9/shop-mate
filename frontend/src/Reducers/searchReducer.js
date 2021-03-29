const SearchStore = {
    SearchResultApi: "",
    
  };
  
  export default function SearchReducer(state, action) {
    state = state || SearchStore;
    switch (action.type) {
      case "SEARCHRESULT":
        return { ...state, SearchResultApi: action.payload };
     
  
      default:
        return state;
    }
  }
  
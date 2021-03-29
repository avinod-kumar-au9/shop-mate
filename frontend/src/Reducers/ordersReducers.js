export default function allProducts(state={},action){    
    switch(action.type){
        case 'ALLPRODUCT':
            return{
                ...state,
                allproducts:action.payload,
            }
        case 'ORDERLIST':
            return{
                ...state,
                orderList:action.payload,
            }
        case "ALLORDERSLIST":
            return {
                ...state,
                allordersList: action.payload,
            };
            case "UPDATEORDERSLIST":
            return {
                ...state,
                updateordersList: action.payload,
            };
        default:
            return state
    }
}
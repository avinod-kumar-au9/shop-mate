
const initialize={
    Ldata:""
}


export default function loginSignupdata(state,action){  
    state = state || initialize;
    
    switch(action.type){
        case 'SELLERCLICK':
            return{...state, data:action.payload}
        case 'SELLERREGISTER':
            return{...state, Rdata:action.payload}
        case 'SELLERLOGIN':
            return{...state, Ldata:action.payload}
        case 'SELLERFORGOTPSW':
            return{...state, Pdata:action.payload}
        // case 'PROFILE':
        //     return{...state, profiledata:action.payload}
        
        default:
            return state
    }
}
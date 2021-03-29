
const initialize={
    test:"",
    Ldata:""
}


export default function loginSignupdata(state,action){  
    state = state || initialize;
    
    switch(action.type){
        case 'CLICK':
            return{...state, data:action.payload}
        case 'REGISTER':
            return{...state, Rdata:action.payload}
        case 'LOGIN':
            return{...state, Ldata:action.payload}
     
        case 'FORGOTPSW':
            return{...state, Pdata:action.payload}
        case 'TEST':
            return{...state, test:action.payload}
        default:
            return state
    }
}
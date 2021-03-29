
import axios from "axios"

export function SearhData(val){  
    const output= axios.get(`/api/search/${val}`)
    return (dispatch) =>{
        output.then(({data}) => {
            dispatch({
                type:'SEARCHRESULT',
                payload:data
            })
        })
       
    }
}
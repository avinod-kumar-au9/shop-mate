import axios from 'axios'
const url = '/api'


export function addOrders(list){ 
    var output = axios.post(`${url}/order`,
    list
        )
    return (dispatch) =>{
        output.then(({data}) => {
            dispatch({
                type:'ORDERSADD',
                payload:data
            })
        })
    }
  }
  
export function allProductDetail(){ 
    var output = axios.get(`${url}/productslist`)
    return (dispatch) =>{
        output.then(({data}) => {
            dispatch({
                type:'ALLPRODUCT',
                payload:data
            })
        })
    }
}
  
export function stockupdate(body){ 
    var output = axios.post(`${url}/stockupdate`,
      body
    )
    return (dispatch) =>{
        output.then(({data}) => {
            dispatch({
                type:'ALLPRODUCT',
                payload:data
            })
        })
    }
}

export function getOrderlistofpertiperson(id){ 
    var output = axios.get(`${url}/orderslist/${id}`)
    return (dispatch) =>{
        output.then(({data}) => {
            dispatch({
                type:'ORDERLIST',
                payload:data
            })
        })
    }
}

export function allorderslist() {
    var output = axios.get(`${url}/allorderslist`);
    return (dispatch) => {
      output.then(({ data }) => {
        dispatch({
          type: "ALLORDERSLIST",
          payload: data,
        });
      });
    };
  }
  
  export function updateorderlist(body) {
    var output = axios.patch(`${url}/updateorderslist`, body);
    return (dispatch) => {
      output.then(({ data }) => {
        dispatch({
          type: "UPDATEORDERSLIST",
          payload: data,
        });
      });
    };
  }
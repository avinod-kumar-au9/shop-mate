import axios from 'axios'
const url = '/api'

export function singleProductInfo(id){ 
    var output = axios.get(`${url}/singleproductinfo/${id}`)
    return (dispatch) =>{
        output.then(({data}) => {
            dispatch({
                type:'SINGLEPRODUCT',
                payload:data
            })
        })
    }
}

export function addComments(name,title,desc,rating,id){ 
    var output = axios.patch(`${url}/comment/${id}`,{
        name:name,
        title:title,
        description:desc,
        rating:rating
    })
    return (dispatch) =>{
        output.then(({data}) => {
            dispatch({
                type:'COMMENTS',
                payload:data
            })
        })
    }
}



export function SimilarProductsList(id) {
  const output = axios.get(`${url}/similarproducts?id=${id}`);
  return (dispatch) => {
    output.then(({ data }) => {
      dispatch({
        type: "SIMILARPRODUCTS",
        payload: data,
      });
    });
  };
}
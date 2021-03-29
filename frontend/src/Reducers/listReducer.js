


const ProductsStore={
    ProductsListApi:"",
    UniqueBrandsApi:"",
    UniqueCategoryApi:"",
    UniqueSubCategoryApi:"",
    UniqueOffersApi:"",
    Forceupdateonmenuclick:"",
    Forceupdateonsearchclick:""
}



export default function ListReducer(state,action){
    state= state || ProductsStore
    switch(action.type){
        case "PRODUCTSLIST":
            return{...state, ProductsListApi:action.payload}
        case "UNIQUEBRANDS":
            return{...state, UniqueBrandsApi:action.payload}
        case "UNIQUECATEGORY":
            return{...state, UniqueCategoryApi:action.payload}
        case "UNIQUESUBCATEGORY":
            return{...state, UniqueSubCategoryApi:action.payload}
        case "UNIQUEOFFERS":
            return{...state, UniqueOffersApi:action.payload}
        case "FORCEUPDATEONMENUCLICK":
            return{...state, Forceupdateonmenuclick:action.payload}
        case "FORCEUPDATEONSEARCHCLICK":
            return{...state, Forceupdateonsearchclick:action.payload}
        
        default:
            return state
    }
}
import { ProductReducer } from "./ProductReducer";

const initialState = {
    isLoading : false,
    errorMsg : "",
    categoryLoader: false,
    categoryError: null,
}

export const ErrorReducer = (state=initialState, action) => {
    switch (action.type) {
        case "IS_FETCHING": 
            return {
                ...state,
                isLoading : true,
                errorMsg : null,
        };
        case "IS_SUCCESS":
            return {
                ...state,
                isLoading : false,
                errorMsg : null,
        };
        case "IS_ERROR":
            return {
                ...state,
                isLoading : true,
                errorMsg : action.payload,
        };      
        case "CATEGORY_SUCCESS":
            return {
                ...state,
                categoryLoader:false,
                categoryError:null,
        };  
        case "CATEGORY_LOADER":
            return {
                ...state,
                categoryLoader:true,
                categoryError:null,
                errorMsg : null,
        };      
        default:
            state;
    }
    return state;
};
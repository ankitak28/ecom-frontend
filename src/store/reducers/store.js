import { configureStore } from "@reduxjs/toolkit";
import { ProductReducer } from "./ProductReducer";

export const store = configureStore({
    reducer : {
        products : ProductReducer,
        //errors : ErrorReducer 
    },
    preloadedState : {
        
    },
});
export default store;
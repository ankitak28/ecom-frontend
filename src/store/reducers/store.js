import { configureStore } from "@reduxjs/toolkit";
import { ProductReducer } from "./ProductReducer";
import { ErrorReducer } from "./ErrorReducer";
import { cartReducer } from "./CartReducer";

const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
    carts: { cart: cartItems },
};
export const store = configureStore({
    reducer: {
        products: ProductReducer,
        errors: ErrorReducer,
        carts: cartReducer
    },
    preloadedState: initialState,
});
export default store;
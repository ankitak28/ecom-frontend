import { configureStore } from "@reduxjs/toolkit";
import { ProductReducer } from "./ProductReducer";
import { ErrorReducer } from "./ErrorReducer";
import { cartReducer } from "./CartReducer";
import { authReducer } from "./authReducer";

const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
    auth: { user: user },
    carts: { cart: cartItems },
};
export const store = configureStore({
    reducer: {
        products: ProductReducer,
        errors: ErrorReducer,
        carts: cartReducer,
        auth: authReducer
    },
    preloadedState: initialState,
});
export default store;
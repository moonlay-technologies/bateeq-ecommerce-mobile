import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

const store = configureStore({
    reducer: {
        open: rootReducer.sidebar,
        cart: rootReducer.cart
    }
})

export default store
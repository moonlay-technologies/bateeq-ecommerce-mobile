import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isOpen: false
    },
    reducers: {
        setIsOpen: (state, action) => {
            state.isOpen = action.payload
        }
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        id: 'gid://shopify/Cart/c1-12b6765a4ef58d370b13d5480173e669',
    },
    reducers: {
        setCartId: (state, action) => {
            state.id = action.payload
        }
    }
})

console.log('CART SLICE', cartSlice)

export const { setIsOpen } = sidebarSlice.actions
export const { setCartId } = cartSlice.actions

const rootReducer = {
    sidebar: sidebarSlice.reducer,
    cart: cartSlice.reducer
}

export default rootReducer
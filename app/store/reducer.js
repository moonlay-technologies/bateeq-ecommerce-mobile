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
        id: ''
    },
    reducers: {
        setCartId: (state, action) => {
            state.id = action.payload
        }
    }
})
console.log('cartSlice,', cartSlice)

export const { setIsOpen } = sidebarSlice.actions
export const { setCartId } = cartSlice.actions

const rootReducer = {
    sidebar: sidebarSlice.reducer,
    cart: cartSlice.reducer
}

export default rootReducer
const initialState = {
    show: {
        loading: true,
        data: null
    },
    collections: {
        lists: {
            loading:true,
            params: {},
            data: []
        }
    }
}

/**
 * @name Checkout
 * @param state
 * @param {object} action
 * @param {object} action.type
 * @param {object} action.payload
 */
export default function (state = initialState, action){
    let { type, payload } = action
    switch (type){
        default:
            return state;
    }
}
const initialState = {
    token: null,
    userAddress: null,
    customerInfo: {
        id: null,
        email: null,
        first_name: null,
        last_name: null,
        phone: null,
    },
    defaultAddress: null,
}

/**
 *
 * @param {object} state
 * @param {object} action
 * @param {string} action.type
 * @param {object | string | null | Array} action.payload
 */
export default function(state = initialState, action){
    let { type, payload }= action
    switch (type){
        default:
            return state;
    }
}
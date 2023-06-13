import {CHANGE_THEME_MODE, COLLAPSE_SIDEBAR, THEME_MODE} from "../constants/theme";

const initialState = {
    mode: THEME_MODE,
    sidebar: {
        visible: false,
    },
    collections : {}
}

export default function (state = initialState, action){
    let { type,payload } = action

    switch (type){

        case COLLAPSE_SIDEBAR:
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    visible:  !state.sidebar.visible
                }
            }
        case CHANGE_THEME_MODE:
            return {
                ...state,
                mode: state.mode === THEME_MODE ? 'dark' : THEME_MODE
            }

        default:
            return state
    }
}
import { REQUEST } from '../actions/action.type';
import { CHANGE_THEME_MODE, COLLAPSE_SIDEBAR, THEME_MODE } from '../constants/theme';

const initialState = {
  mode: 'light',
  sidebar: {
    visible: false,
  },
  collections: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case COLLAPSE_SIDEBAR:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          visible: !state.sidebar.visible,
        },
      };
    case REQUEST(CHANGE_THEME_MODE):
      return {
        ...state,
        mode: payload,
      };

    default:
      return state;
  }
}

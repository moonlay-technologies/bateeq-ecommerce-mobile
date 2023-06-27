import { REQUEST } from '../actions/action.type';
import { NAVIGATE_TO, RESET_NAVIGATION } from '../constants/navigation';

const initialState = {
  navigationState: {
    loading: false,
    navigation: '',
  },
};

/**
 *
 * @param {object} state
 * @param {ObjectConstructor} action
 * @returns {object | string}
 */

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REQUEST(NAVIGATE_TO):
      return {
        navigationState: {
          loading: true,
          navigation: payload,
        },
      };

    case REQUEST(RESET_NAVIGATION):
      return {
        navigationState: {
          loading: false,
          navigation: '',
        },
      };

    default:
      return state;
  }
}

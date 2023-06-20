import { NAVIGATE_TO, RESET_NAVIGATION } from '../constants/navigation';
import { REQUEST } from './action.type';

/**
 * @returns {{ type: string }}
 */

export const navigateTo = () => {
  return {
    type: REQUEST(NAVIGATE_TO),
  };
};

/**
 * @returns {{ type: string }}
 */

export const resetNavigation = () => {
  return {
    type: REQUEST(RESET_NAVIGATION),
  };
};

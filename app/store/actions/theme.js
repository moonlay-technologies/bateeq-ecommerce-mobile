import { CHANGE_THEME_MODE, DRAWER_TOGGLE, THEME_MODE } from '../constants/theme';
import { REQUEST } from './action.type';

export const DrawerToggle = () => {
  return {
    type: DRAWER_TOGGLE,
  };
};

export const themeColor = payload => {
  return {
    type: REQUEST(CHANGE_THEME_MODE),
    payload,
  };
};

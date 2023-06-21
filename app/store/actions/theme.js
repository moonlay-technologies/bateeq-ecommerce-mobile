import { CHANGE_THEME_MODE, COLLAPSE_SIDEBAR, THEME_MODE } from '../constants/theme';
import { REQUEST } from './action.type';

export const CollapseSidebar = () => {
  return {
    type: COLLAPSE_SIDEBAR,
  };
};

export const themeColor = payload => {
  return {
    type: REQUEST(CHANGE_THEME_MODE),
    payload,
  };
};

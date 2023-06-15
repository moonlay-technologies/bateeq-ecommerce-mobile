import { REQUEST } from './action.type';
import { GET_CHECKOUT_ID } from '../constants/checkout';

/**
 * @param {object} payload
 * @return {{payload, type: string}}
 * @constructor
 */

// eslint-disable-next-line import/prefer-default-export
export const GetCheckoutId = payload => {
  return {
    type: REQUEST(GET_CHECKOUT_ID),
    payload,
  };
};

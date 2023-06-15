import { REQUEST } from './action.type';
import { CREATE_CHECKOUT, GET_CHECKOUT_ID } from '../constants/checkout';

/**
 * @param { object } payload
 * @return {{  type: string, payload }}
 * @constructor
 */

export const CreateCheckout = payload => {
  const { input } = payload.variables;

  return {
    type: REQUEST(CREATE_CHECKOUT),
    payload: input,
  };
};

/**
 * @param {object} payload
 * @return {{payload, type: string}}
 * @constructor
 */

export const GetCheckoutId = payload => {
  return {
    type: REQUEST(GET_CHECKOUT_ID),
    payload,
  };
};

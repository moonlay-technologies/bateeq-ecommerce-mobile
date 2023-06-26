import {
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  GET_ADDRESS_LIST,
  REFETCH_ADDRESS_LIST,
  UPDATE_ADDRESS,
  UPDATE_DEFAULT_ADDRESS,
} from '../constants/address';
import { REQUEST } from './action.type';

/**
 * @param {object} payload
 * @returns {{  payload, type: string }}
 * @constructor
 */

export function getAddressList(payload) {
  return {
    type: REQUEST(GET_ADDRESS_LIST),
    payload,
  };
}

/**
 * @returns {{ type: string }}
 * @constructor
 */

export function refetchAddressList() {
  return { type: REQUEST(REFETCH_ADDRESS_LIST) };
}

/**
 * @param {object} payload
 * @returns {{  payload, type: string }}
 * @constructor
 */

export function updateAddress(payload) {
  return {
    type: REQUEST(UPDATE_ADDRESS),
    payload,
  };
}

/**
 * @param {object} payload
 * @returns {{ payload, type: string }}
 * @constructor
 */

export function createAddress(payload) {
  return {
    type: REQUEST(CREATE_ADDRESS),
    payload,
  };
}

/**
 * @param {object} payload
 * @returns {{ payload, type: string }}
 * @constructor
 */

export function removeCustomerAddress(payload) {
  return {
    type: REQUEST(DELETE_ADDRESS),
    payload,
  };
}

/**
 * @param {object} payload
 * @returns {{ payload, type: string }}
 * @constructor
 */

export function updateDefaultCustomerAddress(payload) {
  return {
    type: REQUEST(UPDATE_DEFAULT_ADDRESS),
    payload,
  };
}

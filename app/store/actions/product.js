import { REQUEST } from './action.type';
import {
  GET_PROD_COLL_LATEST,
  GET_PROD_COLL_LATEST_SHOW,
  GET_PROD_COLL_OUR_CATEGORY,
  GET_PROD_COLL_SEARCH
} from '../constants/product';

/**
 *
 * @param {object} payload
 * @param {number} payload.first
 * @param {string} payload.query
 * @returns {{payload, type: string}}
 * @constructor
 */
export const CollectionSearch = payload => {
  return {
    type: REQUEST(GET_PROD_COLL_SEARCH),
    payload,
  };
};


/**
 *
 * @param {object} payload
 * @param {number} payload.first
 * @param {string | null} payload.after
 * @param {string | null} payload.
 * @returns {{payload, type: string}}
 * @constructor
 */
export function CollectionsOurCategory(payload){
  return {
    type: REQUEST(GET_PROD_COLL_OUR_CATEGORY),
    payload
  }
}

/**
 *
 * @param {object} payload
 * @param {number | 4} payload.first
 * @param {string | null} payload.after
 * @param {string} payload.query
 * @returns {{payload, type: string}}
 * @constructor
 */
export function CollectionProductLatest(payload){
  return{
    type: REQUEST(GET_PROD_COLL_LATEST),
    payload
  }
}

/**
 *
 * @param {object} payload
 * @param {string} payload.handle
 * @returns {{payload, type: string}}
 * @constructor
 */
export function CollectionProductLatestShow(payload){
  return{
    type: REQUEST(GET_PROD_COLL_LATEST_SHOW),
    payload
  }
}
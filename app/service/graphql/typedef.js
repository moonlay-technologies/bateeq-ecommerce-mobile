/**
 * @typedef gqlReturn
 * @property {Array|Object|String|Number|Boolean} data
 * @property {Boolean} loading
 * @property {Object} error
 * @property {NetworkStatus} networkStatus
 */

/**
 * @typedef customAttributes
 * @property {string} key
 * @property {string} value
 */


/**
 * @typedef lineItemsCheckout
 * @property {String} variantId
 * @property {Number | 0} quantity
 * @property {customAttributes[] | [] | undefined} customAttributes
 */

/**
 * @typedef ConstructMutationGql
 * @property {Object | {}} variables
 * @property {Object | {}} options
 */
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
    uri:"https://bateeqshop.myshopify.com"
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

/**
 *
 * @param {object} options
 * @param {object} options.query
 * @param {object} options.variables
 * @param {"query" | "mutation"} method
 * @returns {Promise<ApolloQueryResult<any>>}
 */
export const fetchApiGraphql = (options,method = 'query')=> {
    // if(typeof(client[method]) === 'undefined') return [ new Error(`client.[${method}] undefined`),null]
    return client.query({...options})
}
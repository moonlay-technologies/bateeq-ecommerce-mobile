import {GET_SUMMARY_PAGES} from "../constants/pages";
import {REQUEST} from "./action.type";

/**
 *
 * @param {object} payload
 * @returns {{type: string}}
 */
export function GetPagesSummary(payload){
    return {
        type:REQUEST(GET_SUMMARY_PAGES),
        payload
    }
}
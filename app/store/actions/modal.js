import {CLOSE, OPEN} from "./action.type";
import {PREVIEW_IMAGES_PRODUCT} from "../constants";

export function OpenPreviewProduct(payload = {}){
	return {
		type: OPEN(PREVIEW_IMAGES_PRODUCT),
		payload
	}
}
export function ClosePreviewProduct(payload = {}){
	return {
		type: CLOSE(PREVIEW_IMAGES_PRODUCT),
		payload
	}
}
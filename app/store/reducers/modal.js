import {PREVIEW_IMAGES_PRODUCT} from "../constants";
import {CLOSE, OPEN} from "../actions/action.type";

const initialState = {
	preview: {
		product: {
			type: "default", // "multiple" | "default"
			visible:false,
			initialIndex:0,
			images: []
		}
	}
}


export default function(state = initialState , action){
	let { type , payload } = action
	switch (type){
		case OPEN(PREVIEW_IMAGES_PRODUCT):
			return {
				...state,
				preview: {
					...state.preview,
					product: {
						...state.preview.product,
						visible: true,
						...payload,
					}
				}
			}
		case CLOSE(PREVIEW_IMAGES_PRODUCT):
			return {
				...state,
				preview: {
					...state.preview,
					product: {
						...state.preview.product,
						...payload,
						visible: false,
						images: []
					}
				}
			}
		default:
			return state
	}
}
import {REQUEST} from "./action.type";
import {NAVIGATE_TO} from "../constants/navigation";

export * from './theme';
export * from './cart';
export * from './user';
export * from './checkout';
export * from './address';
export * from './product';
export * from './navigation';
export * from './modal'

export function NAVIGATES(payload){
	return {
		type: REQUEST(NAVIGATE_TO),
		payload
	}
}
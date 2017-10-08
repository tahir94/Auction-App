import {
	LOCAL_DATA_SUCCESS, PRODUCT_DATA_SUCCESS, GET_BIDS,
	BID_DATA_SUCCESS, GET_BIDS_SUCCESS, BID_DATA
} from '../actions/products'
import { tassign } from 'tassign';


export interface ProductState {
	computerData: Array<any>;
	userLocalData: Object;
	categoryData: Array<any>;
	highestBid: Array<number>;
	bidsData: Array<any>;
	highestBidBy: string;
	isLoading: boolean;
	isProductDetails: boolean;
}

export const PRODUCT_INITIAL_STATE = {
	computerData: null,
	userLocalData: null,
	categoryData: null,
	bidsData: null,
	highestBid: null,
	highestBidBy: null,
	isLoading: false,
	isProductDetails: false
}

export const ProductReducer = (state: ProductState = PRODUCT_INITIAL_STATE, action) => {

	switch (action.type) {
		case LOCAL_DATA_SUCCESS:
			return tassign(state, { userLocalData: action.payload })

		case PRODUCT_DATA_SUCCESS:

			return tassign(state, { categoryData: action.payload, highestBid : action.highestBid, highestBidBy : action.highestBidBy })
		case BID_DATA:
			return tassign(state, { isLoading: true })

		case BID_DATA_SUCCESS:
			return tassign(state, { bidsData: action.payload })

		case GET_BIDS:
			return tassign(state, { isLoading: true, isProductDetails: false })

		case GET_BIDS_SUCCESS:
			return tassign(state, { isLoading: false, isProductDetails: true, bidsData: action.payload })


		default:
			return state;
	}

}
import { AUCTION_DETAIILS_SUCCESS, DEMO_AUCTION_SUCCESS } from '../actions/auction';
import { tassign } from 'tassign';


export interface AuctionState {
    categoriesData: Array<any>;
}

export const AUCTION_INITIAL_STATE = {
    categoriesData: null
}

export const AuctionReducer = (state: AuctionState = AUCTION_INITIAL_STATE, action) => {

    switch (action.type) {
        case AUCTION_DETAIILS_SUCCESS:

        case DEMO_AUCTION_SUCCESS:
            return tassign(state, { categoriesData: action.payload })

        default:
            return state;

    }
}
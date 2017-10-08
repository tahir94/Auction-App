import { combineReducers } from 'redux';
import { SignupState, SIGNUP_INITIAL_STATE, signupReducer } from './signup';
import { AuctionState, AUCTION_INITIAL_STATE, AuctionReducer } from './auction';
import { ProductState, PRODUCT_INITIAL_STATE, ProductReducer } from './products';


export interface AppState {
    signup: SignupState;
    auction: AuctionState
    product: ProductState
}

export const INITIAL_STATE = {
    signup: SIGNUP_INITIAL_STATE,
    auction: AUCTION_INITIAL_STATE,
    product: PRODUCT_INITIAL_STATE
}

export const RootReducer = combineReducers<AppState>({
    signup: signupReducer,
    auction: AuctionReducer,
    product: ProductReducer

})


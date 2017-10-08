import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../reducers/rootReducer';
import {
	GET_LOCAL_DATA, BID_DATA, GET_BIDS,
	GET_PRODUCT_DATA
} from '../../actions/products';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-computer-category',
	templateUrl: './computer-category.component.html',
	styleUrls: ['./computer-category.component.css']
})
export class ComputerCategoryComponent implements OnInit {
	currentUserId: string;
	isViewDetails: boolean = false;
	isComputersList: boolean = true;
	userDetails: Object;
	currentUserName: string;
	highestBidValue: string;
	highestBiddingUser: string;
	highestBidData: any;
	highestBid: number;
	highestBidBy : string;

	testArray = [];
	@select((s: AppState) => s.product.categoryData) categoryData;
	@select((s: AppState) => s.product.userLocalData) userLocalData;
	@select((s: AppState) => s.product.bidsData) userBids;
	@select((s: AppState) => s.product.isLoading) isLoading$: Observable<boolean>;
	@select((s: AppState) => s.product.highestBidBy) highestBidBy$: Observable<any>;
	@select((s: AppState) => s.product.highestBid) highestBid$: Observable<any>;
	@select((s: AppState) => s.product.isProductDetails) isProductDetails$: Observable<boolean>;
	constructor(private ngRedux: NgRedux<AppState>) {
		//  console.log(this.ngRedux.getState());

		this.highestBidBy$.subscribe((data) => {
			if (data !== null) {
				console.log(data);
				this.highestBidBy = data;
				
			}

		})
		this.highestBid$.subscribe((data) => {
			if (data !== null) {
				console.log(data);				
				this.highestBid = data
			}

		})
		this.userBids.subscribe((data) => {
			//  console.log(data);

		})

		this.userLocalData.subscribe((data) => {
			// console.log(data);
			if (data && data.uid) {

				this.currentUserId = data.uid;

			}
			if (data && data.name) {
				// console.log(data.name);
				this.currentUserName = data.name;
			}
		})

	}

	ngOnInit() {
		this.ngRedux.dispatch({
			type: GET_LOCAL_DATA
		})

		this.ngRedux.dispatch({
			type: GET_PRODUCT_DATA,
			category: 'computers'
		})
	}

	selectedUser = {
		selectedUid: '',
		selectedKey: ''
	}

	viewDetails(userViewDetails) {
		this.isViewDetails = true;
		this.isComputersList = false;
		this.userDetails = userViewDetails;

		this.selectedUser.selectedUid = userViewDetails.uid;
		this.selectedUser.selectedKey = userViewDetails.key;

		this.ngRedux.dispatch({
			type: GET_BIDS,
			payload: this.selectedUser
		})

		this.ngRedux.dispatch({
			type: GET_PRODUCT_DATA,
			payload: this.userDetails,
			category: 'computers',
			highValue: 0
		})

	}

	backButton() {
		this.isViewDetails = false;
		this.isComputersList = true;
	}
	userBidData = {
		uid: '',
		key: '',
		bidAmount: '',
		biddingBy: '',
		category: ''
	}

	bidAmount;
	submit(bidAmount, uid, key) {

		this.userBidData.uid = uid;
		this.userBidData.key = key;
		this.userBidData.bidAmount = bidAmount;
		this.userBidData.biddingBy = this.currentUserName;
		this.userBidData.category = 'computers'

		this.ngRedux.dispatch({
			type: BID_DATA,
			payload: this.userBidData
		})
		this.bidAmount = '';

	}

}

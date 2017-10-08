import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../reducers/rootReducer';
import { GET_PRODUCT_DATA, BID_DATA, GET_BIDS, GET_LOCAL_DATA } from '../../actions/products';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-tv-category',
	templateUrl: './tv-category.component.html',
	styleUrls: ['./tv-category.component.css']
})
export class TvCategoryComponent implements OnInit {
	currentUserId: string;
	isTVlist: boolean = true;
	isViewDetails: boolean = false;
	userDetails: Object;
	currentUserName: string;
	highestBidValue: Array<any>;
	highestBiddingUser: string;
	selectedUid: string;
	selectedKey: string;
	highestBid: number;
	highestBidBy : string;
	
	@select((s: AppState) => s.product.categoryData) categoryData;
	@select((s: AppState) => s.product.userLocalData) userLocalData;
	@select((s: AppState) => s.product.bidsData) userBids;
	@select((s: AppState) => s.product.isLoading) isLoading$: Observable<boolean>;
	@select((s: AppState) => s.product.highestBidBy) highestBidBy$: Observable<any>;
	@select((s: AppState) => s.product.highestBid) highestBid$: Observable<any>;
	@select((s: AppState) => s.product.isProductDetails) isProductDetails$: Observable<boolean>;

	constructor(private ngRedux: NgRedux<AppState>) {

		this.highestBidBy$.subscribe((data) => {
			if (data !== null) {
				
				this.highestBidBy = data
			}

		})
		this.highestBid$.subscribe((data) => {
			if (data !== null) {
				
				this.highestBid = data
			}

		})

		this.isLoading$.subscribe((data) => {
			// console.log(data);
		})

		this.userBids.subscribe((data) => {
			//  console.log(data);
		})

		this.userLocalData.subscribe((data) => {
			if (data && data.uid) {
				this.currentUserId = data.uid;
			}

			if (data && data.name) {
				this.currentUserName = data.name;
			}
		})
	}

	ngOnInit() {
		this.ngRedux.dispatch({
			type: GET_PRODUCT_DATA,
			category: "TV's"
		})

		this.ngRedux.dispatch({
			type: GET_LOCAL_DATA
		})
	}
	selectedUser = {
		selectedUid: '',
		selectedKey: ''
	}

	viewDetails(userViewDetails) {

		this.isViewDetails = true;
		this.isTVlist = false;
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
			category: "TV's",
			highValue: 0
		})
	}

	backButton() {
		this.isViewDetails = false;
		this.isTVlist = true;
	}

	userBidData = {
		uid: '',
		key: '',
		bidAmount: '',
		biddingBy: '',
		category: ''
	}

	submit(bidAmount, uid, key) {

		this.userBidData.uid = uid;
		this.userBidData.key = key;
		this.userBidData.bidAmount = bidAmount;
		this.userBidData.biddingBy = this.currentUserName;
		this.userBidData.category = "TV's"

		this.ngRedux.dispatch({
			type: BID_DATA,
			payload: this.userBidData
		})

	}
}

import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import {
	// GET_COMPUTER_DATA, COMPUTER_DATA_SUCCESS,
	GET_LOCAL_DATA, LOCAL_DATA_SUCCESS,
	GET_PRODUCT_DATA, PRODUCT_DATA_SUCCESS,
	BID_DATA, BID_DATA_SUCCESS, GET_BIDS, GET_BIDS_SUCCESS
} from '../actions/products';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';

@Injectable()

export class ProductsEpic {
	fetchCategoryData : FirebaseListObservable<any>;
	fetchBidsData : FirebaseListObservable<any>;
	BidsData : FirebaseListObservable<any>
	fetchUserBids : FirebaseListObservable<any>;
	categoryDataList = []
	bidsArray = [];
	userEmail: string;
	date: string;
	time: string;
	userEndDate: string;
	userEndTime: string;
	hours: any;
	minutes: any;
	isBidding;
	biddingBy: string;
	items: FirebaseListObservable<any>
	bidsData;
	usersUids = [];
	userBidData;
	myArray = ['7', '8', '10'];
	lastValue = 0;
	currentTimeStamp: any;
	categoryData;
	productBidsAmount = [];
	inProductBiddingBy;
	auctionKey;
	auctionUid;
	selectedAuctionUid;
	selectedAuctionKey;
	finalUid;
	highValue;
	highestBiddingBy: string;
	getBidSelectedUid: string;
	getBidSelectedKey; string;
	highestValArray = [];
	highestBidsAmount = []
	bidsByUserArray = []

	// testArray = [];
	largestValArrays = [];
	lastIndexesNums = [];
	// test
	largestNums

	monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
		'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	constructor(private afAuth: AngularFireAuth,
		private db: AngularFireDatabase,
		private router: Router) {

		let today = new Date();
		let month_value = today.getMonth();
		let getMonth = this.monthsArray[month_value];
		this.date = getMonth + ' ' + today.getDate() + ' ' + today.getFullYear();

		//HOURS

		let hrs = today.getHours().toString();
		if (hrs.length == 1) {
			this.hours = '0' + hrs;

		} else {
			this.hours = hrs;
		}

		//MINUTES
		let mins = today.getMinutes().toString();
		if (mins.length == 1) {
			this.minutes = '0' + mins;
		} else {
			this.minutes = mins;

		}

		this.time = this.hours + ":" + this.minutes;
		this.hours = parseInt(this.hours);
		this.minutes = parseInt(this.minutes);

		//  for current timestamp
		let currentDate = new Date();
		currentDate.setHours(this.hours);
		currentDate.setMinutes(this.minutes);
		this.currentTimeStamp = currentDate.getTime() / 10000;
		this.currentTimeStamp = parseInt(this.currentTimeStamp)

	}

	UserLocalData = (actions$: ActionsObservable<any>) => {
		return actions$.ofType(GET_LOCAL_DATA)
			.switchMap(() => {
				let userObject = localStorage.getItem('userObject');
				let parseUserObject = JSON.parse(userObject);
				return Observable.of({ type: LOCAL_DATA_SUCCESS, payload: parseUserObject })

			})
	}

	BidData = (actions$: ActionsObservable<any>) => {
		return actions$.ofType(BID_DATA)

			.switchMap(payload => {
				this.items = this.db.list('userbids/' + payload.payload.category + '/' + payload.payload.uid + '/' + payload.payload.key);
				this.items.update(this.afAuth.auth.currentUser.uid, { biddingBy: payload.payload.biddingBy, biddingAmount: payload.payload.bidAmount, key: payload.payload.key, uid: payload.payload.uid })
					.then(() => {
						this.items = this.db.list('userbids/' + payload.payload.category + '/' + payload.payload.uid + '/' + payload.payload.key, { preserveSnapshot: true })
						this.bidsArray = []
						this.items
							.subscribe(snapshots => {
								this.bidsArray = [];
								snapshots.forEach(snapshot => {
									this.bidsArray.push(snapshot.val())
									this.bidsArray = []
								});
							})
					})
				return Observable.of({ type: GET_BIDS_SUCCESS, payload: this.bidsArray })
			})
	}

	GetBids = (actions$: ActionsObservable<any>) => {
		return actions$.ofType(GET_BIDS)
			.switchMap((payload) => {
				this.getBidSelectedUid = payload.payload.selectedUid
				this.getBidSelectedKey = payload.payload.selectedKey

				this.items = this.db.list('userbids/', { preserveSnapshot: true })
				return this.items
					.switchMap(snapshots => {
						this.bidsArray = [];
						snapshots.forEach(snapshot => {
							snapshot.forEach(snapshot => {
								if (this.getBidSelectedUid == snapshot.key) {
									snapshot.forEach((snapshot) => {
										if (this.getBidSelectedKey == snapshot.key) {
											snapshot.forEach(param => {
												this.bidsData = param.val()
												this.bidsArray.push(this.bidsData)
											});
										}
									})
								}
							});
						});
						return Observable.of({ type: GET_BIDS_SUCCESS, payload: this.bidsArray })
					})
			})
	}

	Products = (actions$: ActionsObservable<any>) => {
		return actions$.ofType(GET_PRODUCT_DATA)
			.switchMap((payload) => {
				this.highValue = payload.highValue;
				let category = payload.category
				if (payload.payload) {
					this.selectedAuctionUid = payload.payload.uid;
					this.selectedAuctionKey = payload.payload.key;
				}

				this.fetchCategoryData = this.db.list("/categories/" + category, { preserveSnapshot: true });
				this.categoryDataList = [];
				this.highestValArray = [];
				return this.fetchCategoryData
					.switchMap(snapshots => {

						snapshots.forEach(snapshot => {
							snapshot.forEach(snapshot => {
								this.categoryData = snapshot.val();
								this.categoryData.key = snapshot.key;

								if (this.currentTimeStamp < snapshot.val().userTimeStamp) {
									this.categoryData.isBidding = true;
								}
								else {
									this.categoryData.isBidding = false;

									this.fetchUserBids = this.db.list('/userbids/' + category, { preserveSnapshot: true });
									this.highestBidsAmount = [];
									this.bidsByUserArray = [];
									this.largestValArrays = [];
									this.lastIndexesNums = [];
									this.fetchUserBids
										.subscribe(snapshots => {
											this.categoryDataList = [];
											snapshots.forEach(snapshot => {
												this.auctionUid = snapshot.key;
												snapshot.forEach(snapshot => {
													this.auctionKey = snapshot.key;
													this.productBidsAmount = []
													snapshot.forEach(snapshot => {
														if (this.selectedAuctionUid) {
															if (this.selectedAuctionUid == this.auctionUid && this.selectedAuctionKey == snapshot.val().key) {
																this.productBidsAmount.push(snapshot.val().biddingAmount)
																this.inProductBiddingBy = snapshot.val().biddingBy;												
																let largestValue = Math.max.apply(Math, this.productBidsAmount);											
																this.largestValArrays.push(largestValue);												
																this.largestNums = this.largestValArrays.pop();														
																this.lastIndexesNums.push(this.largestNums);												
																if(largestValue == snapshot.val().biddingAmount){																	
																	this.bidsByUserArray.push(snapshot.val().biddingBy)
																}
																this.highestBidsAmount.push(largestValue);
																				
															}
														}
													})
												})
											})
										})
								}
																
								this.categoryDataList.push(this.categoryData);
							});
						})
						return Observable.of({ type: PRODUCT_DATA_SUCCESS, payload: this.categoryDataList,highestBid : this.lastIndexesNums,highestBidBy : this.bidsByUserArray })
					})
			})
	}
}
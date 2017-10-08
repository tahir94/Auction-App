import { Component, OnInit } from '@angular/core';
import { SIGNOUT, SIGNOUT_SUCCESS } from '../../actions/signup';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../reducers/rootReducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AUCTION_DETAIILS } from '../../actions/auction';

@Component({
	selector: 'app-auction',
	templateUrl: './auction.component.html',
	styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
	auctionForm: FormGroup;
	date;
	auctionData: Object;
	minDate = new Date();
	selectedDate: string;
	categories = [
		{ value: 'mobile', viewValue: 'MOBILE' },
		{ value: 'computer', viewValue: 'COMPUTER' },
		{ value: 'tv', viewValue: 'TELEVISION' }
	];
	constructor(private fb: FormBuilder, private ngRedux: NgRedux<AppState>) {

	}


	ngOnInit() {

		this.auctionForm = this.fb.group({
			productName: [null, Validators.required],
			productDescription: [null, Validators.required],
			endDate: [null, Validators.required],
			endTime: [null, Validators.required],
			category: [null, Validators.required],
			biddingAmount: [null, Validators.required]
		})

	}
	signout() {
		this.ngRedux.dispatch({
			type: SIGNOUT,

		})
	}

	submit() {

		this.selectedDate = this.auctionForm.value.endDate.toString();
		this.selectedDate = this.selectedDate.slice(4, 15);

		this.date = this.auctionForm.value.endDate;
		let userEndTime = this.auctionForm.value.endTime;
		let userHours = userEndTime.slice(0, 2);
		let userMinutes = userEndTime.slice(3, 5);


		let newDate = new Date(this.date);
		newDate.setHours(userHours);
		newDate.setMinutes(userMinutes);
		let userTimeStamp: any = newDate.getTime() / 10000;
		userTimeStamp = parseInt(userTimeStamp);

		this.auctionForm.value.userTimeStamp = userTimeStamp;
		this.auctionForm.value.endDate = this.selectedDate;
		this.auctionData = this.auctionForm.value;


		this.ngRedux.dispatch({
			type: AUCTION_DETAIILS,
			payload: this.auctionData
		})

	}

}

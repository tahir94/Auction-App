import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../reducers/rootReducer';
import { GET_PRODUCT_DATA, GET_BIDS, BID_DATA, GET_LOCAL_DATA } from '../../actions/products';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-phone-category',
  templateUrl: './phone-category.component.html',
  styleUrls: ['./phone-category.component.css']
})
export class PhoneCategoryComponent implements OnInit {
  userEmail: string;
  userName: string;
  userId: string;
  isViewDetails: boolean = false;
  isCategoryList: boolean = true;
  currentUserId: string;
  currentUserName: string;
  highestBidValue: string;
  highestBiddingUser: string;
  highestBidData: any;
	highestBid: number;
  highestBidBy : string;
  
  @select((s: AppState) => s.product.categoryData) categoryData;
  @select((s: AppState) => s.product.userLocalData) userLocalData;
  @select((s: AppState) => s.product.bidsData) userBids;
  @select((s: AppState) => s.product.highestBidBy) highestBidBy$: Observable<any>;
  @select((s: AppState) => s.product.highestBid) highestBid$: Observable<any>;
  @select((s: AppState) => s.product.isProductDetails) isProductDetails$: Observable<boolean>;
  @select((s: AppState) => s.product.isLoading) isLoading$: Observable<boolean>;

  constructor(private ngRedux: NgRedux<AppState>,
    private afAuth: AngularFireAuth) {
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
    // console.log(this.ngRedux.getState());

    this.userBids.subscribe((data) => {
      // console.log(data);

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


    let userObject = localStorage.getItem('userObject');
    let parseUserObject = JSON.parse(userObject);
    this.userEmail = parseUserObject.email;
    this.userName = parseUserObject.name;
    this.userId = parseUserObject.uid;

    this.ngRedux.dispatch({
      type: GET_PRODUCT_DATA,
      category: 'phones'
    })
    this.ngRedux.dispatch({
      type: GET_LOCAL_DATA
    })
  }
  selectedUser = {
    selectedUid: '',
    selectedKey: ''
  }

  userDetails: Object;
  viewDetails(userViewDetails) {
    this.isViewDetails = true;
    this.userDetails = userViewDetails;
    this.isCategoryList = false;
    this.selectedUser.selectedUid = userViewDetails.uid;
    this.selectedUser.selectedKey = userViewDetails.key;

    this.ngRedux.dispatch({
      type: GET_BIDS,
      payload: this.selectedUser

    })
    this.ngRedux.dispatch({
      type: GET_PRODUCT_DATA,
      payload: this.userDetails,
      category: 'phones',
      highValue: 0
    })
  }

  backButton() {
    this.isViewDetails = false;
    this.isCategoryList = true;
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
    this.userBidData.category = "phones"

    this.ngRedux.dispatch({
      type: BID_DATA,
      payload: this.userBidData
    })
    this.bidAmount = '';
  }

}



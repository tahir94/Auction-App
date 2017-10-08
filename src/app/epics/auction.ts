import { Injectable } from '@angular/core';
import { AUCTION_DETAIILS,AUCTION_DETAIILS_SUCCESS,DEMO_AUCTION,DEMO_AUCTION_SUCCESS } from '../actions/auction';
import { ActionsObservable } from 'redux-observable';
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';

@Injectable()

export class AuctionEpic {
  userName : string;
  retriveCategories : FirebaseListObservable<any>;  
    
    constructor(private afAuth : AngularFireAuth,
                private db     : AngularFireDatabase,
                private router : Router ){
					if(localStorage.getItem('userObject')){
						let userObject = localStorage.getItem('userObject');
						let parseObject = JSON.parse(userObject);
                        this.userName   = parseObject.name ;
                       
					}
    }

    Auction = (actions$ : ActionsObservable<any>) => {
     return actions$.ofType(AUCTION_DETAIILS)
       .switchMap( ({payload})=>{
           payload.uid = this.afAuth.auth.currentUser.uid;
           payload.userName = this.userName;
    
           if(payload.category == 'mobile'){
           
            this.db.list('/categories/phones/' +this.afAuth.auth.currentUser.uid)
            .push(payload)
            this.router.navigate(['dashboard']); 
        }
           else if(payload.category == 'tv'){
            this.db.list("/categories/TV's/"+this.afAuth.auth.currentUser.uid)
            .push(payload)
            this.router.navigate(['dashboard']);  
        }
           else {
            this.db.list('/categories/computers/'+this.afAuth.auth.currentUser.uid)
            .push(payload)
            this.router.navigate(['dashboard']);    
        }

           
           return Observable.of({
               type : AUCTION_DETAIILS_SUCCESS,
               payload : payload
        })
       })
    }
}
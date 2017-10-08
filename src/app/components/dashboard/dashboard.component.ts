import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Router } from '@angular/router';
import { AppState } from '../../reducers/rootReducer';
import { SIGNOUT, SIGNOUT_SUCCESS } from '../../actions/signup';
import { Observable } from 'rxjs';
import { GET_LOCAL_DATA } from '../../actions/products';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  @select((s: AppState) => s.signup.currentUserEmail) CurrentUserEmail$: Observable<string>
  @select((s: AppState) => s.signup.currentUserEmail) currentUserUid$: Observable<string>
  @select((s: AppState) => s.signup.currentUserEmail) currentUserEmail: Observable<string>

  userEmail: string;
  userName: string;



  constructor(private ngRedux: NgRedux<AppState>, private router: Router) {

    // console.log('dashboard constructor ! ',this.ngRedux.getState());
    this.CurrentUserEmail$.subscribe((data) => {

    })
  }

  ngOnInit() {


    if (localStorage.getItem('userObject')) {
      let userObject = localStorage.getItem('userObject');
      let parseUserObject = JSON.parse(userObject);
      this.userEmail = parseUserObject.email;
      this.userName = parseUserObject.name

    }
  }

  signout() {
    this.ngRedux.dispatch({
      type: SIGNOUT,

    })
  }
}

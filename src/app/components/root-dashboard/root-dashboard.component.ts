import { Component, OnInit } from '@angular/core';
import { NgRedux,select } from 'ng2-redux';
import { AppState } from '../../reducers/rootReducer';
import { SIGNOUT,SIGNOUT_SUCCESS } from '../../actions/signup';

@Component({
  selector: 'dashboard',
  templateUrl: './root-dashboard.component.html',
  styleUrls: ['./root-dashboard.component.css']
})
export class RootDashboardComponent implements OnInit {

  constructor(private ngRedux : NgRedux<AppState>) { }

  ngOnInit() {
  }


  signout(){
    this.ngRedux.dispatch({
      type : SIGNOUT,
     
    })
   }

}

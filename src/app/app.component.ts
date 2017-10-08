import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from './reducers/rootReducer';
import { DEMO } from './actions/signup';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  demo = 'hello demo world';

  constructor(private ngRedux: NgRedux<AppState>) {
  
  }

  submit() {
    this.ngRedux.dispatch({
      type: DEMO,
      payload: this.demo
    })
  }
}

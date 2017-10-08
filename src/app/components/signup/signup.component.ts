import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../reducers/rootReducer';
import { SIGNUP } from '../../actions/signup';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  signupData: Object;

  @select((s: AppState) => s.signup.error) isError$: Observable<string>;
  @select((s: AppState) => s.signup.isLoading) isLoading$: Observable<boolean>;
  @select((s: AppState) => s.signup.isLoggedIn) isLoggedIn$: Observable<boolean>
  constructor(private fb: FormBuilder,
    private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {


    this.signupForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
    this.ngRedux.subscribe(() => {
      let getState = this.ngRedux.getState()
      // console.log(getState);  
    })
  }


  submit() {

    this.signupData = this.signupForm.value;
    this.ngRedux.dispatch({
      type: SIGNUP,
      payload: this.signupData
    })

  }
}

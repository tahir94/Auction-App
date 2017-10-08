import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators, } from "@angular/forms";
import { LOGIN } from '../../actions/signup';
import { NgRedux, select } from 'ng2-redux';
import { AppState } from '../../reducers/rootReducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginData: Object;
  error: string;

  @select((s: AppState) => s.signup.isLoading) loader
  @select((s: AppState) => s.signup.error) isError;
  @select((s: AppState) => s.signup.isLoggedIn) isLoggedIn$: Observable<boolean>
  constructor(private fb: FormBuilder,
    private ngRedux: NgRedux<AppState>,
    private router: Router) {

    let getLocalItems: any = localStorage.getItem('userObject')
    getLocalItems = JSON.parse(getLocalItems)

    if (getLocalItems) {
      if (getLocalItems.email) {
        this.router.navigate(['dashboard']);
      }
      else {
        this.router.navigate(['app-login']);
      }
    }

    this.isError.subscribe((data) => {

      if (data !== null) {
        this.error = data.replace('The user may have been deleted.', '')
      }
    })

    this.ngRedux.subscribe(() => {
      let getState = this.ngRedux.getState()
      // console.log(getState);  
    })

    this.loader.subscribe((data) => {
      // console.log(data);

    })
    this.isLoggedIn$.subscribe((data) => {
      // console.log(data);  
    })
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
    this.loader.subscribe((value) => {
      //  console.log(value);
    })
  }

  submit() {
    this.loginData = this.loginForm.value;

    this.ngRedux.dispatch({
      type: LOGIN,
      payload: this.loginData
    })
  }

}

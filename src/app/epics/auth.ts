import { Injectable } from '@angular/core';
import {
    DEMO, DEMO_SUCCESS, SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILED,
    LOGIN_SUCCESS, LOGIN, LOGIN_FAILED, SIGNOUT, SIGNOUT_SUCCESS
} from '../actions/signup'
import { ActionsObservable } from 'redux-observable';

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';


@Injectable()

export class AuthEpic {
    authState;
    userData: string;
    item: FirebaseObjectObservable<any>;
    constructor(private afAuth: AngularFireAuth,
        private db: AngularFireDatabase,
        private router: Router) {

        this.afAuth.authState.subscribe((auth) => {
            this.authState = auth;
        })
    }

    get authenticated(): any {
        return this.authState !== null;
    }

    get currentUserId(): any {
        return this.authenticated ? this.authState.uid : ''
    }

    Signup = (acitons$: ActionsObservable<any>) => {
        return acitons$.ofType('SIGNUP')
            .switchMap(({ payload }) => {
                return this.afAuth.auth.createUserWithEmailAndPassword(payload.email, payload.password)
                    .then((responce) => {
                        payload.uid = responce.uid;
                        this.db.list('/users').update(responce.uid, payload)
                        this.router.navigate(['dashboard'])
                        return { type: SIGNUP_SUCCESS, payload: payload }

                    })
                    .catch((error) => {
                        return { type: SIGNUP_FAILED, payload: error.message }

                    })
            })
    }

    Login = (actions$: ActionsObservable<any>) => {
        return actions$.ofType(LOGIN)
            .switchMap(({ payload }) => {
                let email = payload.email;
                let password = payload.password;

                return Observable.fromPromise(
                    this.afAuth.auth.signInWithEmailAndPassword(email, password)

                        .then((responce) => {
                            this.item = this.db.object('users/' + this.afAuth.auth.currentUser.uid, { preserveSnapshot: true });
                            this.item.subscribe(snapshot => {
                                this.userData = snapshot.val()
                                localStorage.setItem('userObject', JSON.stringify(this.userData));

                            });
                            this.router.navigate(['dashboard'])
                            return { type: LOGIN_SUCCESS, payload: responce }
                        })

                        .catch((error) => {
                            return {
                                type: LOGIN_FAILED,
                                payload: error.message
                            }
                        })
                )
            })
    }

    Signout = (actions$: ActionsObservable<any>) => {
        return actions$.ofType(SIGNOUT)
            .switchMap(() => {
                this.afAuth.auth.signOut();
                localStorage.removeItem('userObject');
                this.router.navigate(['../']);

                return Observable.of({
                    type: SIGNOUT_SUCCESS,

                })
            })
    }


}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutes } from './routes';
import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { combineReducers } from 'redux'
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { RootReducer, AppState, INITIAL_STATE } from './reducers/rootReducer';
import { createEpicMiddleware } from 'redux-observable';
import { AuthEpic, AuctionEpic, ProductsEpic } from './epics';


// angularfire2 imports
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth'


// material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { MdCardModule } from '@angular/material';
import { MdToolbarModule } from '@angular/material';
import { MdDatepickerModule } from '@angular/material';
import { MdNativeDateModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdProgressSpinnerModule } from '@angular/material';

import { AuctionComponent } from './components/auction/auction.component';
import { RootDashboardComponent } from './components/root-dashboard/root-dashboard.component';
import { TvCategoryComponent } from './components/tv-category/tv-category.component';
import { PhoneCategoryComponent } from './components/phone-category/phone-category.component';
import { ComputerCategoryComponent } from './components/computer-category/computer-category.component';
import { PhoneDetailsComponent } from './components/phone-details/phone-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    DashboardComponent,
    LoginComponent,
    AuctionComponent,
    RootDashboardComponent,
    TvCategoryComponent,
    PhoneCategoryComponent,
    ComputerCategoryComponent,
    PhoneDetailsComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutes,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgReduxModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdToolbarModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    MdListModule,
    MdIconModule,
    MdProgressSpinnerModule

  ],
  providers: [AuthGuard, AuthEpic, AuctionEpic, ProductsEpic],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(ngRedux: NgRedux<AppState>,
    private authEpics: AuthEpic,
    private auctionEpics: AuctionEpic,
    private productsEpics: ProductsEpic) {

    const middleware = [
      createEpicMiddleware(this.authEpics.Signup),
      createEpicMiddleware(this.authEpics.Login),
      createEpicMiddleware(this.authEpics.Signout),
      createEpicMiddleware(this.auctionEpics.Auction),
      createEpicMiddleware(this.productsEpics.UserLocalData),
      createEpicMiddleware(this.productsEpics.Products),
      createEpicMiddleware(this.productsEpics.BidData),
      createEpicMiddleware(this.productsEpics.GetBids)
    ]

    ngRedux.configureStore(RootReducer, INITIAL_STATE, middleware)
  }
}

import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './auth.guard';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RootDashboardComponent } from './components/root-dashboard/root-dashboard.component';
import { AuctionComponent } from './components/auction/auction.component';
import { ComputerCategoryComponent } from './components/computer-category/computer-category.component';
import { TvCategoryComponent } from './components/tv-category/tv-category.component';
import { PhoneCategoryComponent } from './components/phone-category/phone-category.component';
import { PhoneDetailsComponent } from './components/phone-details/phone-details.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'app-login', component: LoginComponent },
    { path: 'app-signup', component: SignupComponent },

    {
        path: 'dashboard', component: RootDashboardComponent, canActivate: [AuthGuard], children: [
            { path: '', component: DashboardComponent },
            { path: 'app-auction', component: AuctionComponent },
            { path: 'app-phone-category', component: PhoneCategoryComponent },
            { path: 'app-phone-details', component: PhoneDetailsComponent },
            { path: 'app-computer-category', component: ComputerCategoryComponent },
            { path: 'app-tv-category', component: TvCategoryComponent },

        ]
    },


]

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
export default AppRoutes;
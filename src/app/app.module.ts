import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersAdministrationComponent } from './Users/users-administration/users-administration.component';
import { UsersListComponent } from './Users/users-list/users-list.component';
import { AddUserComponent } from './Users/add-user/add-user.component';
import { UserComponent } from './Users/user/user.component';
import { GaragesAdministrationComponent } from './Garages/garages-administration/garages-administration.component';
import { GaragesListComponent } from './Garages/garages-list/garages-list.component';
import { GarageComponent } from './Garages/garage/garage.component';
import { LoginComponent } from './Login/login/login.component';
import { AdsAdministrationComponent } from './Ads/ads-administration/ads-administration.component';
import { AdsListComponent } from './Ads/ads-list/ads-list.component';
import { AddComponent } from './Ads/add/add.component';
import { AdComponent } from './Ads/ad/ad.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { StatsComponent } from './Dashboard/stats/stats.component';
import { LastAdsComponent } from './Dashboard/last-ads/last-ads.component';
import { LastUsersComponent } from './Dashboard/last-users/last-users.component';
import { ResultsAdsSearchComponent } from './Queries/results-ads-search/results-ads-search.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersAdministrationComponent,
    UsersListComponent,
    AddUserComponent,
    UserComponent,
    GaragesAdministrationComponent,
    GaragesListComponent,
    GarageComponent,
    LoginComponent,
    AdsAdministrationComponent,
    AdsListComponent,
    AddComponent,
    AdComponent,
    DashboardComponent,
    StatsComponent,
    LastAdsComponent,
    LastUsersComponent,
    ResultsAdsSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdComponent } from './Ads/ad/ad.component';
import { AdsAdministrationComponent } from './Ads/ads-administration/ads-administration.component';
import { AdsListComponent } from './Ads/ads-list/ads-list.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { GarageComponent } from './Garages/garage/garage.component';
import { GaragesAdministrationComponent } from './Garages/garages-administration/garages-administration.component';
import { GaragesListComponent } from './Garages/garages-list/garages-list.component';
import { LoginComponent } from './Login/login/login.component';
import { ResultsAdsSearchComponent } from './Queries/results-ads-search/results-ads-search.component';
import { AddUserComponent } from './Users/add-user/add-user.component';
import { UserComponent } from './Users/user/user.component';
import { UsersAdministrationComponent } from './Users/users-administration/users-administration.component';
import { UsersListComponent } from './Users/users-list/users-list.component';

const routes: Routes = [
  //LOGIN path
  {path:'login', component: LoginComponent},
  //HOMEPAGE path
  {path:'', component: DashboardComponent},
  //USERS related pages paths
  {path:'users/users-list', component : UsersListComponent},
  {path:'users/users-administration', component : UsersAdministrationComponent},
  {path:'users/user', component: UserComponent},
  {path:'users/add-user', component: AddUserComponent},
  //SEARCH RESULTS path  
  {path:'queries/ads-search-results', component: ResultsAdsSearchComponent},
  //GARAGES related pages paths
  {path:'garages/garages-list', component: GaragesListComponent},
  {path:'garages/garages-administration', component: GaragesAdministrationComponent},
  {path:'garages/garage', component: GarageComponent},
  //ADS related pages path  
  {path:'ads/ad', component: AdComponent},
  {path:'ads/ads-administartion', component: AdsAdministrationComponent},
  {path:'ads/ads-list', component: AdsListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

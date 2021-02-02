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
  //login path
  {path:'/Login', component: LoginComponent},
  //homepage path
  {path:'', component: DashboardComponent},
  //User related pages paths
  {path:'/Users/Users-list', component : UsersListComponent},
  {path:'/Users/users-administration', component : UsersAdministrationComponent},
  {path:'/Users/user', component: UserComponent},
  {path:'/Users/add-user', component: AddUserComponent},
  //search results path  
  {path:'/Queries/ads-search-results', component: ResultsAdsSearchComponent},
  //Garages related pages paths
  {path:'/Garages/garages-list', component: GaragesListComponent},
  {path:'/Garages/garages-administration', component: GaragesAdministrationComponent},
  {path:'/Garages/garage', component: GarageComponent},
  //Ads related pages path  
  {path:'/Ads/ad', component: AdComponent},
  {path:'/Ads/ads-administartion', component: AdsAdministrationComponent},
  {path:'/Ads/ads-list', component: AdsListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

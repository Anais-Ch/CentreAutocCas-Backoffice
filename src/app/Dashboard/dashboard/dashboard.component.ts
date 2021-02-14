import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GarageCollectionJsonld } from 'src/app/models/garage-collection';
import { ListingCollectionJsonld } from 'src/app/models/listing-collection';
import { UserCollection } from 'src/app/models/user-collection';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  public listUsers: number = 0;
  public listGarages: number =0;
  public listAds: number =0;

  constructor(
    private httpClient: HttpClient,
    
  ) { }

  ngOnInit(): void {

    this.httpClient.get<UserCollection>('https:/hb-bc-dwwm-2020.deploy.this-serv.com/api/users').subscribe((data)=>{
      this.listUsers = data['hydra:totalItems'];
      });

    this.httpClient.get<GarageCollectionJsonld>('https:/hb-bc-dwwm-2020.deploy.this-serv.com/api/users').subscribe((data)=>{
      this.listGarages = data['hydra:totalItems'];
      });

    this.httpClient.get<ListingCollectionJsonld>('https:/hb-bc-dwwm-2020.deploy.this-serv.com/api/users').subscribe((data)=>{
      this.listAds = data['hydra:totalItems'];
      });

  }

}

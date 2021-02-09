import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Garage } from 'src/app/models/garage';
import { GarageResourceJsonld } from 'src/app/models/garage-ressources';

@Component({
  selector: 'app-garage-form',
  templateUrl: './garage-form.component.html',
  styleUrls: ['./garage-form.component.scss']
})
export class GarageFormComponent implements OnInit {

  public garage: Garage = { //we fill the garage object to send a post request
      name: '',
      street: '',
      streetComplement: '',
      postalCode: '',
      city: '',
      owner: '',
  }; //set all objetc to '' by default

  constructor(
    private httpClient: HttpClient, //get http methode
  ) { }

  //submit methode
  public submit(): void {
    this.httpClient.post<GarageResourceJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages', this.garage).subscribe((garages) => {
    //alert to confirm it is sent  
    alert('garage created.');

    });
  }

  ngOnInit(): void {
  };


}

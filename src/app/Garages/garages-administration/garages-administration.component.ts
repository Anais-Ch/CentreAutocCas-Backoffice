import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';
import { Garage } from 'src/app/models/garage';
import { GarageResourceJsonld } from 'src/app/models/garage-ressources';

@Component({
  selector: 'app-garages-administration',
  templateUrl: './garages-administration.component.html',
  styleUrls: ['./garages-administration.component.scss']
})
export class GaragesAdministrationComponent implements OnInit {

  public garage: GarageResourceJsonld|null = null; //get garage object from

  public violationList: ConstraintViolationList|null = null; //get constraint violation list object


  constructor(

    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute, //add activatedRoute angualr service
    private router: Router,

  ) { }

  ngOnInit(): void {

    //retrieve params from URL (defined in app-routing.module.ts).
    this.activatedRoute.params.subscribe((params) => {
      
      this.httpClient.get<GarageResourceJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages/' + params.id).subscribe({

        next: (garage: GarageResourceJsonld) => {
          this.garage = garage;
        },

        error: (err: HttpErrorResponse) => {

          ///need to handle error better than this
          alert(err.status + ' - ' + err.statusText);
        },
      });
    });

    
  }


  //outside ngOnInit

  

  public submit(garage: Garage):void {
    this.httpClient.put<GarageResourceJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users/' + this.garage?.id, garage).subscribe({
     
      next: (createdGarage) => {
       
       this.router.navigate(['/garages/garages-list']);
      },
      
      error: (err: HttpErrorResponse) => {

        if(err.status === 422) {

          this.violationList = err.error;
        }
        else {

          alert(err.status + ' - An error occurred');
        }
      },
    });
  }




}

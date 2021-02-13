import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';
import { Garage } from 'src/app/models/garage';
import { GarageResourceJsonld } from 'src/app/models/garage-ressources';

@Component({
  selector: 'app-add-garage',
  templateUrl: './add-garage.component.html',
  styleUrls: ['./add-garage.component.scss']
})
export class AddGarageComponent implements OnInit {

  constructor(
    private httpClient: HttpClient, //http protocole
    private router: Router, // add router service

  ) { }

  public violationList: ConstraintViolationList|null = null; //declare violationList var for Input correspondance

  //make all the datas available from the ad-garage page, so we can use the form component for adding garages/ and modifiyinf them
  public garage: Garage = { //create user var to stock info in the object user
    name: '',
    street: undefined,
    streetComplement: undefined,
    postalCode: undefined,
    city: undefined,
    owner: '/api/users/',
  };

  ngOnInit(): void {
  }

  //Outside ngOnInit(): void

  public submit(garage:Garage): void{ //methode POST we use user:User argument to be able to adduser id later and specify to modify the users data
    this.httpClient.post<GarageResourceJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages', garage).subscribe({
      //use Html message(<div>) and ngIf to inform the user creation (to do)
      next: (createdGarage) => { //function for OK results
        //alert('User' + createdgarge[@id] + 'created.');
        //Redirect list /details after user creation 
        this.router.navigate(['/garages/garages-list']);
        alert("Garage created");
      },
      
      error : (err: HttpErrorResponse) => { //error message
        if (err.status === 422) {
          this.violationList = err.error; //retrieve error form api message
          //alert (violationList ['hydra:description']); // obosolete// print api message
        }
        else { // inform iuser that an error has occured (need to dispaly a better message (error unexpected))
          alert(err.status + '- An error as occured.');
        }
      },
    });
  }


}

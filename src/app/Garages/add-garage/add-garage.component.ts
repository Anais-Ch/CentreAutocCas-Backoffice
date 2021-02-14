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
        
        //Redirect list /details after user creation 
        this.router.navigate(['/garages/garages-list']);
        alert("Garage created");
      },
      
      error : (err: HttpErrorResponse) => { //error message
        if (err.status === 422) {
          this.violationList = err.error; //retrieve error form api message
          //alert (violationList ['hydra:description']); // obosolete// print api message
        }
        else if (err.status === 301) { //  ( unexpected error)

          alert(err.status + '- Page déplacée de manière permanente');
        }
        else if ((((err.status).toString()).substring(0)) === '3'){

          alert(err.status + '-Redirection')
        }
        else if (err.status === 400) {

          alert(err.status + '- Mauvaise requète, veuillez entrer des valeurs valides');

        }
        else if (err.status === 403){

          alert(err.status + '-Authorisation insuffisante pour la requète courante. -Accés interdit');

        }
        else if (err.status === 406) {

          alert(err.status + '-Requète non acceptable, format non pris en compte');

        }
        else if (err.status === 410) {

            alert(err.status + '-La ressource n\' est plus disponible et aucune redirection n\'est connue');
        }
        else if (err.status === 444) {

          alert(err.status + '-Absence de réponse serveur');
        }
        else if (err.status === 444) {

          alert(err.status + '-Erreur irrécupérable');
        }
        else if ((((err.status).toString()).substring(0)) === '4'){

          alert(err.status + '-Erreur Client')

        }
        else if (err.status === 500) {

          alert(err.status + 'Erreur interne du serveur');
        }

        else if (err.status === 502) {
          
          alert(err.status + '- mauvaise passerelle');
        }

        else if (err.status === 503) {

          alert(err.status + '- Service Indisponible- Le serveur est en cours de maintenance veuillez réessayer plsu tard');

        }

        else if (err.status === 504) {

          alert(err.status + '-Le portail a éxpiré');
        }

        else if (err.status === 508){

          alert(err.status + '- Limite de ressource atteinte');
        }
        else {
          alert(err.status +'- Erreur Serveur')
        }
      },
    });
  }


}

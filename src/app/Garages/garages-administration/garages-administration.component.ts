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

        error : (err: HttpErrorResponse) => { //error message
          if (err.status === 404) {

            alert(err.status + ' - ' + err.statusText)
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
          else if (err.status === 456) {
  
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
    });

    
  }


  //outside ngOnInit

  

  public submit(garage: Garage):void {
    this.httpClient.put<GarageResourceJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages/' + this.garage?.id, garage).subscribe({
     
      next: (createdGarage) => {
       
       this.router.navigate(['/garages/garages-list']);
      },
      
      error : (err: HttpErrorResponse) => { //error message
        if (err.status === 400) {

          alert(err.status + ' - ' + err.statusText)
          this.violationList = err.error; //retrieve error form api message
          //alert (violationList ['hydra:description']); // obosolete// print api message
        }
        else if (err.status === 301) { //  ( unexpected error)

          alert(err.status + '- Page déplacée de manière permanente');
        }
        else if ((((err.status).toString()).substring(0)) === '3'){

          alert(err.status + '-Redirection')
        }
        else if (err.status === 404) {

          alert(err.status + '- Page non trouvée');

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
        else if (err.status === 456) {

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

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';
import { Listing } from 'src/app/models/listing';
import { ListingRessourceJsonLd } from 'src/app/models/listing-ressource';

@Component({
  selector: 'app-ads-administration',
  templateUrl: './ads-administration.component.html',
  styleUrls: ['./ads-administration.component.scss']
})
export class AdsAdministrationComponent implements OnInit {

  public ad: ListingRessourceJsonLd|null = null; //get ad opbject

  public violationList: ConstraintViolationList|null = null; //get constraint violation list object


  constructor(
    

    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute, //add activatedRoute angular service
    private router: Router,



    
  ) { }

  ngOnInit(): void {

    //retrieve params from URL (defined in app-routing.module.ts).
    this.activatedRoute.params.subscribe((params) => {
      //params.Yourvar
      this.httpClient.get<ListingRessourceJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings/' + params.id).subscribe({
        
        next: (ad: ListingRessourceJsonLd) => {
        this.ad = ad;
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


  //outside ngOnInit function

  //create new ad and error status 

  public submit(ad: Listing): void {
    this.httpClient.put<ListingRessourceJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings/' + this.ad?.id, ad).subscribe({
     
      next: (createdUser) => {
        
        this.router.navigate(['/ads/ads-list']);
      },
      error : (err: HttpErrorResponse) => { //error message
        if (err.status === 400) {
          alert(err.status + ' - ' + err.statusText)
          this.violationList = err.error; //retrieve error form api message
          //alert (violationList ['hydra:description']); // obosolete// print api message
        
        }
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

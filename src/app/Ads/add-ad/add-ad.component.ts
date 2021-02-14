import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';
import { Listing } from 'src/app/models/listing';
import { ListingRessourceJsonLd } from 'src/app/models/listing-ressource';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})


export class AddAdComponent implements OnInit {

  constructor(

    private httpClient: HttpClient, //add http protocole to the component
    private router: Router, // add router angular service

  ) { }


  public violationList: ConstraintViolationList|null = null; //declare violationList var for Input correspondance

  //make all the datas available from the ad-user page, so we can use the form component for adding user/ and modifiyinf them
  public ad: Listing = { //create user var to stock info in the object user
    title: '',
    description: '',
    releaseYear: '',
    km: 0,
    price: '',
    brand: '',
    model: '',
    fuel: undefined,
    garage: '',
  };

  

  ngOnInit(): void {
  }

  // OUtside ngOnInit

  public submit(ad:Listing): void{
     //methode POST we use ad:listing argument to be able to add ad id later and specify to modify the ad data
    this.httpClient.post<ListingRessourceJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings', ad).subscribe({
     
    //use Html message(<div>) and ngIf to inform the user creation (to do)
      next: (createdAd) => { //function for OK results
        
        //Redirect list /details after user creation 
        this.router.navigate(['/ads/ads-list']);
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

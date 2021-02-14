import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';
import { GarageResourceJsonld } from 'src/app/models/garage-ressources';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss']
})


export class GarageComponent implements OnInit {

  public violationList: ConstraintViolationList|null = null; //declare violationList var for Input correspondance
  
  closeResult: string|undefined; //for modal

  public currentGarage: GarageResourceJsonld = {
    '@id': '',
    '@context':  '', 
    '@type': '',
    id:  0,
    name: '',
    street: undefined,
    streetComplement: undefined,
    postalCode: undefined, 
    city: undefined, 
    owner: '',
  }

  constructor(

    private httpClient: HttpClient, //add httpclient protocole to component
    public activatedRoute: ActivatedRoute,     
    public router: Router,
    private modalService: NgbModal, //for pop up  

  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( (params) => {
      this.httpClient.get<GarageResourceJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages/' + params.id).subscribe( {
        next: (currentGarage: GarageResourceJsonld) => {
          //console.log(user);
          this.currentGarage = currentGarage;
        },
        error : (err: HttpErrorResponse) => { //error message
          if (err.status === 422) {
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
      })
    });

  }


  ///Outside ngOnInit

  //Method DeleteUSer

    //retrieve user id in html call of the function
    public deletegarage(id: number): void {
      
      this.httpClient.delete('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages/'+ id).subscribe({
        next : () => {

          //redirection on users list
          this.router.navigate(['/garages/garages-list']);
        },
        error : (err: HttpErrorResponse) => { //error message

          if (err.status === 404) {
            alert(err.status + ' - ' + err.statusText)
            this.violationList = err.error; //retrieve error form api message
            //alert (violationList ['hydra:description']); // obosolete// print api message
            alert(err.status + ' - ' + err.statusText)
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
    }

   /////// FUNCTION FOR MODAL
   open(content: any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }

  
  ////MODALS
  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';

    } else {

      return  `with: ${reason}`;

    }

  }



}

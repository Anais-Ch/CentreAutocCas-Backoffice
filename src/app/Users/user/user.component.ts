import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UserJsonld } from 'src/app/models/user-jsonld';
import { User } from 'src/app/models/users';
import {ActivatedRoute, Router} from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public violationList: ConstraintViolationList|null = null; //declare violationList var for Input correspondance
  
  closeResult: string|undefined; //for modal
    

  public currentUser: UserJsonld = {
    '@id': '',
    '@context':  '', 
    '@type': '',
    id:  0,
    lastName: '',
    firstName: '',
    email: '',
    phone: undefined, 
    siret: undefined, 
    garages: [],


  }

  // var set to false to determine which btn delete was clicked
  public btnUser: boolean = false;


  //empty array to retrieve garage id
  public idGarage: Array<number> = [];


  //retrieve current id
  public currentGarageId: number|null = null;


  constructor(

    private httpClient: HttpClient, //add httpclient protocole to component
    public activatedRoute: ActivatedRoute,     
    public router: Router,
    private modalService: NgbModal, //for pop up  
  

  ) { }
    

  ngOnInit(): void {
    this.fillPage();

       
  }

  ////OUTISDE NG ON INIT

  ///// method FILLPAGE

  private fillPage(): void{

    this.activatedRoute.params.subscribe( (params) => {

        this.httpClient.get<UserJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users/' + params.id).subscribe( {
          
        next: (currentUser: UserJsonld) => {
            
          
            this.currentUser = currentUser;
            
            //retrieve garage id only  and push  oit in array idGarage
            for (let garage of currentUser.garages){
              
              //parseINT >> turninto an int , substring >> get part of the string defined between 13, garage.length ( 13th character to teh end of the string)

              this.idGarage.push(parseInt((garage.substring(13,(garage.length)))));

            };
            
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
  


  //Method DeleteUSer
    //retrieve user id in html call of the function
    public deleteUser(id: number): void {

      if(this.btnUser === true) {
        
        this.httpClient.delete('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users/'+ id).subscribe({
          next : () => {

            //redirection on users list
            this.router.navigate(['/users/users-list']);
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
        
        }
        else {
          
          
          this.httpClient.delete('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages/'+ id).subscribe({
            next : () => {

              //refresh page by calling  back fill page()
              this.fillPage();
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
        }
    };


    // set btn user to true
    public setDeleteUser(): void {
      
      this.btnUser= true;

    };

    public setDeleteGarage(i:number):void {
      this.btnUser =false;
      this.currentGarageId = this.idGarage[i]; //get the current id for delete from current 
      
    }

    //track by for refresh in


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

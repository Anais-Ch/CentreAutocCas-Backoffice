
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';
import { UserJsonld } from 'src/app/models/user-jsonld';


import { User } from 'src/app/models/users';



@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  

})


export class UserFormComponent implements OnInit {
 

  closeResult: string | undefined; //modal


 
  @Input()
  public idGarage: Array<number> = [];

  @Input()
  public user: User|null= null; //variable for ngIf on form

  @Input()
  public violationList: ConstraintViolationList|null = null;

  @Output()
  public formSubmit = new EventEmitter<User>(); //send info from form
  

  //retrieveErrors methode return an array 'arr'
  public retrieveErrors(fieldName:string): Array<string> {
    
    const arr: Array<string> = [];

    if (this.violationList !== null) {
      
      for (const err of this.violationList.violations) { //get array viilaton from constraintViolationlist interface
        
        if(err.propertyPath === fieldName) { //check if API message is one of the API KNown error
          
          arr.push(err.message); //if error is known push message from API in arrauy 'arrr' 
        }
      } 
    }

    return arr; // and print it in html
  }

  constructor(
    private httpClient: HttpClient, //bind httpclient to the component*
    private modalService:NgbModal, //for pop up
    public activatedRoute: ActivatedRoute, 
    private router: Router, //allow redirction to other pages
  ) { }

  public entrepot:string|null =null;

  ngOnInit(): void { 
   
    
    //check on url to determine which side of the form we are using
    if (this.CurrentUrl ===  this.addUserUrl){

        this.createUserUrl =true;  
    }

  }


  //OUTSIDE ngOnInit


  public createUserUrl: boolean = false;

  public CurrentUrl:string = (window.location.href).toString();

  public addUserUrl:string = 'http://localhost:4200/users/add-user';


  //submit method
  public submit(){ 
    if (this.user !== null) {
      this.formSubmit.emit(this.user);

      
    
    }
  }

  //Method DeleteUSer
    //retrieve user id in html call of the function
    public deleteUser(id: number): void {

      this.httpClient.delete('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages/'+ id).subscribe({
        next : () => {
         
          location.reload();
          
        },
        error : (err: HttpErrorResponse) => { //error message
         
          if (err.status === 404) {
            this.violationList = err.error; //retrieve error form api message
            alert (err.error['hydra:description']); 
           
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
    
    /// fonction to know which button as bee clicked

    

  







   /////// FUNCTION FOR MODAL
   open(content: any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }

  

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
